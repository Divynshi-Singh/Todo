import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md"; // Edit icon
import { FaTrashAlt } from "react-icons/fa"; // Delete icon
import moment from "moment"; // Import moment to handle date comparisons

const TodoEditDelete = ({ todo, onEdit, onDelete, selectedTodoIds }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || ""); // State for the due date (alarm)
  const [alarmStatusColor, setAlarmStatusColor] = useState("purple"); // State for circle color
  const [isDeleting, setIsDeleting] = useState(false); // State to manage delete confirmation
  const [error, setError] = useState({}); // To manage error state for date input

  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  const handleDueDateChange = (e) => {
    const inputDate = e.target.value;
    const isValidDate = moment(inputDate, "YYYY-MM-DDTHH:mm", true).isValid(); // Check if the date is valid

    if (isValidDate) {
      setDueDate(inputDate); // Update the state if the date is valid
      setError({ ...error, alarm: null }); // Clear the error
    } else {
      setError({ ...error, alarm: "Invalid date format" }); // Set error message for invalid date
    }
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
    if (selectedTodoIds.has(todo.id)) {
      setAlarmStatusColor("green");
    } else {
      checkAlarmStatus();
    }

    const interval = setInterval(checkAlarmStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [dueDate, selectedTodoIds, todo.id]);

  const minDate = moment().format("YYYY-MM-DDTHH:mm"); // Current date and time

  return (
    <div className="flex items-center">
      <div
        className={`w-[10px] h-[10px] border rounded-full m-[4px]`}
        style={{
          border: "none",
          backgroundColor:
            alarmStatusColor === "red"
              ? "red"
              : alarmStatusColor === "green"
              ? "green"
              : "rgb(182, 120, 255)",
        }}
      ></div>

      <button
        onClick={() => setIsEditing(true)}
        className="cursor-pointer"
        style={{ border: "none", background: "none" }}
      >
        <MdEdit size={14} />
      </button>

      <button
        onClick={handleDeleteConfirmation}
        className="cursor-pointer"
        style={{ border: "none", background: "none" }}
      >
        <FaTrashAlt size={14} />
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className="relative rounded-lg shadow-lg w-[261px] bg-white p-6 border rounded-[10px]"
            style={{
              position: "fixed",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              border: "1px solid rgba(169, 169, 169, 0.3)", // Light gray border
            }}
          >
            <h1
              className="text-xl text-[#52565b]"
              style={{ fontSize: "19px", paddingLeft: "7px", fontFamily: "system-ui" }}
            >
              Edit Todo
            </h1>

            <div className="bg-white p-6 rounded-lg">
              <textarea
                type="text"
                value={newText}
                onChange={handleEditChange}
                className="border rounded-[10px] mb-4 h-[100px] w-[237px] ml-[10px]"
                style={{
                  resize: 'none',
                  border: "1px solid rgba(169, 169, 169, 0.3)",
                }}
              />

              <input
                type="datetime-local"
                value={dueDate}
                onChange={handleDueDateChange}
                min={minDate} // Prevent selecting a date earlier than now
                className={`border rounded-[10px] mb-4 h-[40px] w-[237px] ml-[10px] ${error.alarm ? "border-red-500" : "border-gray-300"} mt-[7px]`}
                style={{
                  border: "1px solid rgba(169, 169, 169, 0.3)",
                  
                }}
                inputMode="none"
                onKeyDown={(e) => e.preventDefault()} // Prevent any typing
              />
              {/* Alarm error message */}
              {error.alarm && (
                <p className="text-[red] text-sm mt-1 pl-[10px]">{error.alarm}</p>
              )}

              {/* Buttons */}
              <div className="flex justify-between space-x-4 mt-[15px] pb-[10px]">
                <button
                  className="bg-gray-300 p-2 rounded text-sm ml-[12px] text-[#00bbf9] cursor-pointer"
                  onClick={handleCancelEdit}
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
                  className="bg-blue-500 p-2 rounded text-white text-sm mr-[17px] text-[#00bbf9] cursor-pointer"
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

      {isDeleting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[280px] h-[120px]"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
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
