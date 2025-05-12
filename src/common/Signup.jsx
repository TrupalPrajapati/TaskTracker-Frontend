import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/user/signup", data);
      console.log(res.data.data);
      console.log(res);
      console.log(res.data);

      toast.success('Signup Successfully', {
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

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error('Signup Fail', {
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

  const validationSchema = {
    nameValidator: {
        required: {
            value: true,
            message: "Name is Required",
        },
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters"
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Name should only contain letters"
        }
    },
    emailValidator: {
        required: {
            value: true,
            message: "Email is Required",
        },
        pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    passwordValidator: {
        required: {
            value: true,
            message: "Password is Required",
        },
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
      }
    },
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-1">
          Sign up
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Create Your Account to get Started
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", validationSchema.nameValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <span className="text-red-500 text-sm mt-1 block">
              {errors.name?.message}
            </span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email", validationSchema.emailValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email?.message}
            </span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Password"
              {...register("password", validationSchema.passwordValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password?.message}
            </span>
          </div>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <span>
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </span>
          </p>

          <div>
            <input
              type="submit"
              value="signup"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
