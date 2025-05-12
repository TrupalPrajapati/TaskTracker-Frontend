import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //user email is pass to the api so backend check the user is exist or not(if exist then give theme a email for reset password)
  const submitHandler = async (data) => {
    try {
      const res = await axios.post(`/user/forgotpassword`, data);
      console.log(res.data);

      toast("Password reset link sent to your email", {
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
    } catch (error) {
      toast.error("Failed to send reset link", {
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
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-1">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
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
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
              type="submit"
              placeholder="Send Reset Link"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
