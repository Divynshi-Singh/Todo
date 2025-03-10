import React, { useState, useEffect } from 'react';
const TodoAdd = ({ isOpen, onClose, onAddTodo }) => {
  const [newTodoText, setNewTodoText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState({ todo: '', alarm: '' });
  const [minDate, setMinDate] = useState('');


  useEffect(() => {
    const currentDate = new Date();

    const minDateString = currentDate.toISOString().slice(0, 16);
    setMinDate(minDateString);
  }, []);

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
    setError((prev) => ({ ...prev, todo: '' }));
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    setError((prev) => ({ ...prev, alarm: '' }));
  };

  const handleAddClick = () => {
    let valid = true;
    let newError = { todo: '', alarm: '' };
    if (!newTodoText.trim()) {
      newError.todo = 'Todo is required';
      valid = false;
    }

    if (!dueDate) {
      newError.alarm = 'Alarm is required';
      valid = false;
    }

    if (!valid) {
      setError(newError);
      return;
    }
    onAddTodo(newTodoText, dueDate);
    setNewTodoText('');
    setDueDate('');
    onClose();
    setError({ todo: '', alarm: '' });
  };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-white bg-opacity-100 z-50 mb-[90px] ">

        <div className="rounded-lg shadow-lg w-[280px] border rounded-[10px]" style={{
          background: 'white',
          border: '1px solid rgba(169, 169, 169, 0.3)'
        }}
        >
          {/* Heading */}
          <h1 className="text-xl" style={{ fontSize: '19px', paddingLeft: '7px' }}>
            Add Todo
          </h1>
          <div className="bg-white p-6 rounded-lg " >
            <textarea
              type="text"
              value={newTodoText}
              onChange={handleInputChange}
              className={`border rounded-[10px] h-[100px] w-[253px] ml-[10px]  ${error.todo || !newTodoText.trim() ? 'border-red-500' : 'border-gray-300'}`}

              style={{
                border: '1px solid rgba(169, 169, 169, 0.3)', // Light gray border for input field
              }}
            />
            {/* Todo error message */}
            {error.todo && <p className="text-[red] text-sm mt-1 pl-[10px]">{error.todo}</p>}
            <input
              type="datetime-local"
              value={dueDate}
              onChange={handleDateChange}
              min={minDate}

              className={`border rounded-[10px] mb-4 h-[40px] w-[253px] ml-[10px] ${error.alarm || !dueDate ? 'border-red-500' : 'border-gray-300'} mt-[7px]`}
              style={{
                border: '1px solid rgba(169, 169, 169, 0.3)',
              }}
            />
            {/* Alarm error message */}
            {error.alarm && <p className="text-[red] text-sm mt-1 pl-[10px]">{error.alarm}</p>}

            {/* Buttons */}
            <div className="flex justify-between space-x-4 mt-[15px] pb-[10px]">
              <button
                onClick={onClose}
                className="bg-gray-300 p-2 rounded text-sm ml-[12px] text-[blue] cursor-[pointer]"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddClick}
                className="bg-blue-500 p-2 rounded text-white text-sm mr-[17px] text-[blue] cursor-[pointer]"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                }}
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





