import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./common/Login";
import { Signup } from "./common/Signup";
import { Dashboard } from "./components/dashboard";
import { AddTask } from "./components/AddTask";
import { TaskList } from "./components/TaskList";
import { EditTask } from "./components/EditTask";
import { Bounce, ToastContainer } from "react-toastify";
import { ForgotPassword } from "./common/ForgotPassword";
import { ResetPassword } from "./common/ResetPassword";
import { Hero } from "./common/Hero";
import axios from "axios";


function App() {

  axios.defaults.baseURL = "http://localhost:3000"

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Hero></Hero>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<TaskList />} />
          <Route path="addtask" element={<AddTask></AddTask>}></Route>
          <Route path="tasklist" element={<TaskList></TaskList>}></Route>
          <Route path="edittask/:id" element={<EditTask></EditTask>}></Route>
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>      
        <Route path="/resetpassword/:token" element={<ResetPassword></ResetPassword>}></Route>  
      </Routes>
    </>
  );
}

export default App;
