import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Bounce, toast } from "react-toastify";


export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHadler = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/user/login", data);
      console.log(res);
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log(res.data.data);

      toast.success('Login Success!', {
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

      navigate("/dashboard");
      
    } catch (error) {
      console.log(error);

      toast.error('Login Failed', {
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
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-1">
          Login
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit(submitHadler)} className="space-y-5">
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

            <p className="text-right text-sm mt-1">
              <Link
                to="/forgotpassword"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>

          <p className="text-sm text-center">
            Create Account?{" "}
            <span>
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Signup
              </Link>
            </span>
          </p>

          <div>
            <input
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
