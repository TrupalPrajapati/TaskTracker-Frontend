import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export const DashboardTask = () => {

  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  const navigate = useNavigate();
  const location = useLocation();

  // Check the nav is active?
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            <div className="text-xl font-bold text-white">TaskTracker</div>
            
            <nav className="flex gap-8">
              <Link 
                to="addtask"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('addtask') 
                    ? 'bg-white text-blue-900' // if click then this style apply
                    : 'text-white' // by default this
                } hover:bg-white hover:text-blue-900`} 

              >
                + Add Task
              </Link>
              <Link 
                to="tasklist" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('tasklist') 
                    ? 'bg-white text-blue-900' // if click then this style apply
                    : 'text-white' // by default this
                } hover:bg-white hover:text-blue-900`}
              >
                📋 Task List
              </Link>
            </nav>
            
            <button className="text-white hover:bg-white hover:text-blue-900 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all" onClick={handleLogout} >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} TaskTracker</p>
          <p className="text-blue-200 mt-2 text-sm">Created by Trupal</p>
        </div>
      </footer>
    </div>
  )
}