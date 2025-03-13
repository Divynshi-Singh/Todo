
import React, { useState, useEffect } from "react";
import moment from "moment";
const TodoAddEdit = ({
    todo,
    onAddTodo,
    onEdit,
    isOpen,
    onClose,
  }) => {
    const [newText, setNewText] = useState(todo ? todo.text : ""); // Text for todo
    const [dueDate, setDueDate] = useState(todo ? todo.dueDate : ""); // Due date (alarm)
    const [error, setError] = useState({ todo: "", alarm: "" });
    useEffect(() => {
      if (todo) {
        setNewText(todo.text);
        setDueDate(todo.dueDate);
      } else {
        setNewText("");
        setDueDate("");
      }
    }, [todo]);
  
   
    const minDate = moment().format("YYYY-MM-DDTHH:mm");
    const handleInputChange = (e) => {
      setNewText(e.target.value);
    };
  
    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
  
      if (new Date(selectedDate) < new Date(minDate)) {
        setError({ ...error, alarm: "Alarm time must be in the future." });
      } else {
        setDueDate(selectedDate);
        setError({ ...error, alarm: "" });
      }
    };
  
    const handleSubmit = () => {
      let valid = true;
      let newError = { todo: "", alarm: "" };
  
      if (!newText.trim()) {
        newError.todo = "Todo is required";
        valid = false;
      }
  
      if (!dueDate) {
        newError.alarm = "Alarm time is required";
        valid = false;
      }
  
      if (!valid) {
        setError(newError);
        return;
      }
  
      if (todo) {
        onEdit(todo.id, newText, dueDate);
      } else {
        onAddTodo(newText, dueDate);
      }
  
      setNewText("");
      setDueDate("");
      onClose(); // Close modal after submit
    };
  
    const handleCancel = () => {
      setNewText("");
      setDueDate("");
      setError({ todo: "", alarm: "" });
      onClose(); // Close modal on cancel
     
    };
    
    return (
      isOpen && (
        <div className="backdrop">
          {/* Backdrop */}
          <div className="  absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 z-40" onClick={onClose}></div>
  
          {/* Modal Content */}
          <div className=" modal-content fixed top-[45%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white border border-[rgba(169,169,169,0.3)] p-[10px] mt-[13px] z-50">
            <h1 className="text-[19px] pl-[7px] font-[system-ui] mb-[10px] text-[#52565b]">
              {todo ? "Edit Todo" : "Add Todo"}
            </h1>
  
            {/* Modal Body */}
            <div>
              <textarea
                value={newText}
                onChange={handleInputChange}
                className={`w-[217px] h-[100px] ml-[10px] p-[7px] rounded-[10px] resize-none border border-[rgba(169,169,169,0.3)] ${
                  error.todo || !newText.trim() ? "border-red-500" : "border-gray-300"
                }`}
              />
  
              {error.todo && (
                <p className="text-[red] text-xs mt-1 ml-2 pl-[10px]">{error.todo}</p>
              )}
  
              <input
                type="datetime-local"
                value={dueDate}
                onChange={handleDateChange}
                min={minDate}
                className={`rounded-[10px] mb-4 h-[40px] w-[217px] ml-[10px] pl-[12px] mt-[7px] border-[rgba(169,169,169,0.3)] ${
                  error.alarm || !dueDate ? "border-red-500" : "border-gray-300"
                }`}
                inputMode="none"
                onKeyDown={(e) => e.preventDefault()} // Prevent manual input
              />
              {error.alarm && (
                <p className="text-[red] text-sm mt-1 pl-[10px]">{error.alarm}</p>
              )}
  
              <div className="flex justify-between mt-[15px] pb-[10px]">
                <button
                  onClick={handleCancel}
                  className="bg-transparent border-none text-[#00bbf9] cursor-pointer px-4 py-2 text-[17px] rounded"
                >
                  Cancel
                </button>
  
                <button
                  onClick={handleSubmit}
                  className="bg-transparent border-none text-[#00bbf9] cursor-pointer px-4 py-2 text-[17px] rounded"
                >
                  {todo ? "Edit" : "Done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default TodoAddEdit;
  







