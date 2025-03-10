import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md"; // edit icon
import { FaTrashAlt } from "react-icons/fa"; // Delete icon
import moment from "moment"; // Import moment to handle date comparisons

const TodoEditDelete = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || ""); // State for the due date (alarm)
  const [alarmStatusColor, setAlarmStatusColor] = useState("purple"); // State for circle color
  const [isDeleting, setIsDeleting] = useState(false); // State to manage delete confirmation

  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value); // Handle the change for the due date
  };

  const handleEditSubmit = () => {
    // Passing the new text and due date while editing
    onEdit(todo.id, newText, dueDate);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setIsDeleting(false);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
  };
  useEffect(() => {
    const checkAlarmStatus = () => {
      if (dueDate) {
        const currentTime = moment(); 
        const alarmTime = moment(dueDate); 
        if (alarmTime.isBefore(currentTime)) {
          setAlarmStatusColor("red");
        } else {
          setAlarmStatusColor("purple");
        }
      }
    };
    checkAlarmStatus();

    const interval = setInterval(checkAlarmStatus, 60000); 

    return () => clearInterval(interval); 
  }, [dueDate]);

  return (
    <div className="flex items-center">
  
<div
        className={`w-[10px] h-[10px] border rounded-full  mr-4`} 
        style={{
          border: "none",
          backgroundColor: alarmStatusColor === "red" ? "red" : "rgb(182, 120, 255)" // Light purple color
        }}
      ></div>

      {/* Edit Button with a new icon */}
      <button
        onClick={() => setIsEditing(true)} 
        className="cursor-pointer"
        style={{ border: "none", background: "none" }}
      >
        <MdEdit size={14} />
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDeleteConfirmation}
        className="cursor-pointer"
        style={{ border: "none", background: "none" }}
      >
        <FaTrashAlt size={14} />
      </button>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center ">
          <div
            className="relative rounded-lg shadow-lg w-[280px] bg-white p-6 border rounded-[10px]"
            style={{
              position: "fixed",
              top: "43%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              border: "1px solid rgba(169, 169, 169, 0.3)", // Light gray border
            }}
          >
            <h1 className="text-xl" style={{ fontSize: "19px", paddingLeft: "7px" }}>
              Edit Todo
            </h1>

            <div className="bg-white p-6 rounded-lg">
              {/* Input field for editing */}
              <textarea
                type="text"
                value={newText}
                onChange={handleEditChange}
                className="border rounded-[10px] mb-4 h-[100px] w-[253px] ml-[10px]"
                style={{
                  border: "1px solid rgba(169, 169, 169, 0.3)", // Light gray border
                }}
              />

              {/* Input field for setting alarm */}
              <input
                type="datetime-local"
                value={dueDate}
                onChange={handleDueDateChange}
                className="border rounded-[10px] mb-4 h-[40px] w-[253px] ml-[10px] mt-[7px]"
                placeholder="Set Alarm"
                style={{
                  border: "1px solid rgba(169, 169, 169, 0.3)", // Light gray border
                }}
              />

              {/* Buttons */}
              <div className="flex justify-between space-x-4 mt-[15px] pb-[10px]">
                <button
                  className="bg-gray-300 p-2 rounded text-sm ml-[12px] text-[blue] cursor-pointer"
                  onClick={handleCancelEdit} // Cancel edit
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="bg-blue-500 p-2 rounded text-white text-sm mr-[17px] text-[blue] cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[350px] h-[120px]"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)", // Added box-shadow here
            }}
          >
            <p className="text-sm text-center mb-4 pt-[20px]">Do you really want to delete this todo?</p>

            <div className="flex justify-between space-x-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 p-2 rounded text-sm text-blue-500 cursor-pointer p-[8px] ml-[50px] border-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 p-2 rounded text-sm text-white cursor-pointer mr-[50px] text-[white] border-none"
                style={{ background: "rgb(68, 68, 214)" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoEditDelete;

