import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const EditTask = () => {

  //get the id from the URL (task ID)
  const { id } = useParams();       
  console.log(id);
  const navigate = useNavigate();

  //get the token from the localstorage, so in evry api call the token is attached with the api so (grant access)
  const token = localStorage.getItem("token");

  //use useForm hook for manage forms 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //First we can apply get request so data is prefilled in form using reset property of useForm
  const getTaskByTaskId = async () => {
    try {
      const res = await axios.get(`/task/gettask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      reset(res.data.data); 
    } catch (error) {
      console.log("Error for fetch task:", error);
    }
  };

  //update api calling for update the task
  const updateTaskByTaskId = async (data) => {
    try {
      const res = await axios.put(
        `/task/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      toast.success('Task Updated!', {
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

      //after updation then user navigate to tasklist 
      navigate("/dashboard/tasklist");
    } catch (error) {
      console.error("Update failed:", error);

      toast.error('Updation is Failed', {
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
    }
  };

  //validation schema is created to show the error, it is used to validate the user data at the time of update
  const validationSchema = {
    titleValidator: {
      required: {
        value: true,
        message: "TItle is required",
      },
      minLength: {
        value: 3,
        message: "Title must be at least 3 characters"
      },
      maxLength: {
        value: 100,
        message: "Title cannot exceed 100 characters"
      }
    },
    descriptionValidator: {
      required: {
        value: true,
        message: "Description is required",
      },
      minLength: {
        value: 10,
        message: "Description should be at least 10 characters"
      },
      maxLength: {
        value: 500,
        message: "Description cannot exceed 500 characters"
       }
    },
    duedateValidator: {
      required: {
        value: true,
        message: "Due date is required",
      },
      validate: (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today || "Due date cannot be in the past";
      }
    },
    priorityValidator: {
      required: {
        value: true,
        message: "Priority is required",
      },
    },
    statusValidator: {
      required: {
        value: true,
        message: "Status is required",
      },
    },
  };

  //when the page render the getTask is called so the tasks are displayed in form
  useEffect(() => {
    getTaskByTaskId();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Task
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(updateTaskByTaskId)}>
          
          <div>
            <input
              {...register("title", validationSchema.titleValidator)}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-red-500 text-sm">
              {errors.title?.message}
            </span>
          </div>

          <div>
            <textarea
              {...register("description", validationSchema.descriptionValidator)}
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
            <span className="text-red-500 text-sm">
              {errors.description?.message}
            </span>
          </div>

          <div>
            <select
              {...register("priority", validationSchema.priorityValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <span className="text-red-500 text-sm">
              {errors.priority?.message}
            </span>
          </div>

          <div>
            <input
              type="date"
              {...register("dueDate", validationSchema.duedateValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-red-500 text-sm">
              {errors.dueDate?.message}
            </span>
          </div>

          <div>
            <select
              {...register("status", validationSchema.statusValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Status</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <span className="text-red-500 text-sm">
              {errors.status?.message}
            </span>
          </div>

          <input
            type="submit"
            value="Update Task"
            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};
