import React, { useState, useEffect } from "react";
const TodoAdd = ({ isOpen, onClose, onAddTodo }) => {
  const [todoData, setTodoData] = useState({
    newTodoText: "",
    dueDate: "",
    error: { todo: "", alarm: "" },
    minDate: "",
  });

  useEffect(() => {
    const currentDate = new Date();
    const minDateString = currentDate.toISOString().slice(0, 16);
    setTodoData((prev) => ({
      ...prev,
      minDate: minDateString, // Setting the min date as current date and time
    }));
  }, []);

  useEffect(() => {
    // Reset errors whenever modal is opened
    if (isOpen) {
      setTodoData((prev) => ({
        ...prev,
        error: { todo: "", alarm: "" },
        newTodoText: "",
        dueDate: "",
      }));
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setTodoData((prev) => ({
      ...prev,
      newTodoText: e.target.value,
      error: { ...prev.error, todo: "" }, // Clear error when text changes
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Ensure the selected date is in the valid format
    if (new Date(selectedDate) < new Date(todoData.minDate)) {
      setTodoData((prev) => ({
        ...prev,
        error: { ...prev.error, alarm: "Alarm time must be in the future." },
      }));
    } else {
      setTodoData((prev) => ({
        ...prev,
        dueDate: selectedDate,
        error: { ...prev.error, alarm: "" }, // Clear alarm error
      }));
    }
  };

  const handleAddClick = () => {
    let valid = true;
    let newError = { todo: "", alarm: "" };

    if (!todoData.newTodoText.trim()) {
      newError.todo = "Todo is required";
      valid = false;
    }

    if (!todoData.dueDate) {
      newError.alarm = "Alarm time is required";
      valid = false;
    }

    if (!valid) {
      setTodoData((prev) => ({ ...prev, error: newError }));
      return;
    }

    onAddTodo(todoData.newTodoText, todoData.dueDate);

    // Clear the form
    setTodoData({
      newTodoText: "",
      dueDate: "",
      error: { todo: "", alarm: "" },
      minDate: todoData.minDate,
    });

    onClose();
  };

  const handleCancelClick = () => {
    setTodoData({
      newTodoText: "",
      dueDate: "",
      error: { todo: "", alarm: "" },
      minDate: todoData.minDate,
    });
    onClose(); // Close modal
  };

  return (
    isOpen && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[50]">
        {/* Backdrop */}
        <div className="backdrop"></div>

        {/* Modal Content */}
        <div className="modal-content fixed top-[45%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[1000] bg-white border border-[rgba(169,169,169,0.3)] p-[10px] mt-[13px]">
          {/* Heading */}
          <h1 className="text-[19px] pl-[7px] font-[system-ui] mb-[10px] text-[#52565b]">
            Add Todo
          </h1>

          {/* Modal Body */}
          <div>
            <textarea
              value={todoData.newTodoText}
              onChange={handleInputChange}
              className={`w-[217px] h-[100px] ml-[10px] p-[7px] rounded-[10px] resize-none border border-[rgba(169,169,169,0.3)] ${
                todoData.error.todo || !todoData.newTodoText.trim()
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {todoData.error.todo && (
              <p className="text-[red] text-xs mt-1 ml-2 pl-[10px]">
                {todoData.error.todo}
              </p>
            )}
            {/* Date input field */}

            <input
              type="datetime-local"
              value={todoData.dueDate}
              onChange={handleDateChange}
              min={todoData.minDate}
              className={` rounded-[10px] mb-4 h-[40px] w-[217px] ml-[10px] pl-[12px] mt-[7px] border-[rgba(169,169,169,0.3)] ${
                todoData.error.alarm || !todoData.dueDate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              inputMode="none" // Prevent typing
              onKeyDown={(e) => e.preventDefault()} // Prevent manual input
            />
            {/* Alarm error message */}
            {todoData.error.alarm && (
              <p className="text-[red] text-sm mt-1 pl-[10px]">{todoData.error.alarm}</p>
            )}

            <div className="flex justify-between mt-[15px] pb-[10px]">
              <button
                onClick={handleCancelClick}
                className="bg-transparent border-none text-[#00bbf9] cursor-pointer px-4 py-2 text-[17px] rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddClick}
                className="bg-transparent border-none text-[#00bbf9] cursor-pointer px-4 py-2 text-[17px] rounded"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TodoAdd;



