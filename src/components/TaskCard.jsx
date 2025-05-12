import React from 'react'

export const TaskCard = ({ task, index, onDelete, onUpdate }) => {
  return (
      <div className="bg-white shadow-md rounded-lg p-4 border relative">
      <div className="text-sm text-gray-400 absolute top-2 right-4">#{index + 1}</div>
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-700 mb-2">{task.description}</p>

      <div className="text-sm text-gray-600 mb-2">
        <strong>Status:</strong> {task.status}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Priority:</strong> {task.priority}
      </div>
      <div className="text-sm text-gray-600 mb-4">
        <strong>Due Date:</strong> {new Date(task.dueDate).toISOString().split("T")[0]}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onUpdate(task._id)}
          className="px-3 py-1 text-sm bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 hover:cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}


