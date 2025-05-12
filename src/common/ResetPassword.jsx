import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const ResetPassword = () => {

  //get the token from url 
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //new password with token send to the backend 
  const submitHandler = async (data) => {
    try {
      console.log("data:",data);
      console.log("Token:", token);
      
      const reqData = {
        token: token,
        password: data.password
      }
        
      const res = await axios.post("/user/resetpassword", reqData);
      console.log(res.data);
      

      toast.success("Password reset successfully!", {
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
      toast.error(error.response?.data?.error || "Failed to reset password.", {
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

  //validate password
  const validationSchema = {
    passwordValidator: {
        required: {
            value: true,
            message: "Password is Required",
        },
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
        }
    },
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-1">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <div>
            <input
              type="password"
              placeholder="Enter New Password"
              {...register("password", validationSchema.passwordValidator)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password?.message}
            </span>
          </div>

          <div>
            <input
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
              type="submit"
              placeholder="Reset Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
