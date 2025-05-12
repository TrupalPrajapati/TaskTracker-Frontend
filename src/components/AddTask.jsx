import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const AddTask = () => {
  //use useForm hook for manage forms 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //get the token from the localstorage, so in evry api call the token is attached with the api so (grant access)
  const token = localStorage.getItem("token");
  console.log(token);     

  //the form is submitted then this function is call and post form data to the database
  const submitHandler = async (data) => {
    console.log(data);    //check the data for debug
    try {
      // we pass the token in header with the post api so the token is valid or not (for post the data by the authorized user)
      const res = await axios.post("/task/addtask", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.data);

      toast.success('Task Added!', {
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
      
      //after add task, the user naviagte to tasklist so they can see their task
      navigate("/dashboard/tasklist");
    } catch (error) {
      console.log(error);

      toast.error('Fail to Add task', {
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

  //validation schema is created to show the error, it is used to validate the data 
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
      
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Add Task
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Add your task with priorities.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
          
          <div>
            <input
              type="text"
              placeholder="Title of Task"
              {...register("title", validationSchema.titleValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-red-500 text-sm mt-1">
              {errors.title?.message}
            </span>
          </div>

          <div>
            <textarea
              {...register(
                "description",
                validationSchema.descriptionValidator
              )}
              placeholder="Task Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <span className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </span>
          </div>

          <div>
            <select
              {...register("priority", validationSchema.priorityValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Task Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <span className="text-red-500 text-sm mt-1">
              {errors.priority?.message}
            </span>
          </div>

          <div>
            <input
              type="date"
              placeholder="Due Date"
              min={new Date().toISOString().split('T')[0]} 
              {...register("dueDate", validationSchema.duedateValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-red-500 text-sm mt-1">
              {errors.dueDate?.message}
            </span>
          </div>

          <div>
            <select
              {...register("status", validationSchema.statusValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Status</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <span className="text-red-500 text-sm mt-1">
              {errors.status?.message}
            </span>
          </div>

          <div>
            <input
              type="submit"
              placeholder="Add Task"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
