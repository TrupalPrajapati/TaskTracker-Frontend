import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "./TaskCard";
import { Pagination } from "./Pagination";
import Loader from "../common/Loader";
import { Bounce, toast } from "react-toastify";

export const TaskList = () => {
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const tasksPerPage = 5;
  const navigate = useNavigate();

  //get the token from the localstorage (for send with each req)
  const token = localStorage.getItem("token");

  //get the task by userid (userid decode from the backend)
  const getTaskByUserId = async () => {
    try {
      const res = await axios.get(
        `/task/gettask?sortBy=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      console.log(res.data);

      //actual data stored in taskData by setTaskData state
      console.log(res.data.data);
      setTaskData(res.data.data);
      setLoading(false); // hide loader after success
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setLoading(false); // hide loader after error
    }
  };

  //delete task by user using taskid (make sure pass the token bcz a user who has token only can delete the task)
  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(
        "/task/delete/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.message); // shows "Task deleted successfully"

      // Directly remove the deleted task from state
      setTaskData((prev) => prev.filter((task) => task._id !== id));

      toast("Task Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      getTaskByUserId();
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
    }
  };

  const handleUpdateTask = (id) => {
    navigate(`/dashboard/edittask/${id}`);
  };

  //when the page load the function runs for display the data
  useEffect(() => {
    getTaskByUserId();
  }, [sortBy]); //when sortBy change the getTask are rerendered

  const lastIndex = currentPage * tasksPerPage;
  const firstIndex = lastIndex - tasksPerPage;
  const currentTasks = taskData.slice(firstIndex, lastIndex);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="text-sm font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>

      {currentTasks.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              index={firstIndex + index}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No tasks available</div>
      )}
      <Pagination
        totalPosts={taskData.length}
        postsPerPage={tasksPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
