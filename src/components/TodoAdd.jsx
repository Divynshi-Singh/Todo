import React, { useState, useEffect } from 'react';
const TodoAdd = ({ isOpen, onClose, onAddTodo }) => {
  const [newTodoText, setNewTodoText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState({ todo: '', alarm: '' });
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const minDateString = currentDate.toISOString().slice(0, 16);
    setMinDate(minDateString); // Setting the min date as current date and time
  }, []);

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
    setError((prev) => ({ ...prev, todo: '' }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Ensure the selected date is in the valid format
    if (new Date(selectedDate) < new Date(minDate)) {
      setError((prev) => ({ ...prev, alarm: 'Alarm time must be in the future.' }));
    } else {
      setDueDate(selectedDate);
      setError((prev) => ({ ...prev, alarm: '' }));
    }
  };

  const handleAddClick = () => {
    let valid = true;
    let newError = { todo: '', alarm: '' };
    if (!newTodoText.trim()) {
      newError.todo = 'Todo is required';
      valid = false;
    }

    if (!dueDate) {
      newError.alarm = 'Alarm time is required';
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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
           zIndex: 50,
        }}
      >
        {/* Backdrop */}
        <div className="backdrop"></div>

        {/* Modal Content */}
        <div className="modal-content"
        
        style={{
          position: "fixed",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          background: "white",
          border: "1px solid rgba(169, 169, 169, 0.3)",
          padding: "10px",
          marginTop : " 13px",
        }}

        >
       
          {/* Heading */}
          <h1
            style={{
              fontSize: '19px',
              paddingLeft: '7px',
              fontFamily: 'system-ui',
              marginBottom: '10px',
              color: '#52565b',
            }}
          >
            Add Todo
          </h1>

          {/* Modal Body */}
          <div>
            <textarea
              type="text"
              value={newTodoText}
              onChange={handleInputChange}
              style={{
                width: '217px',
                height: '100px',
                marginLeft: '10px',
                padding: '7px',
                border: '1px solid rgba(169, 169, 169, 0.3)',
                borderRadius: '10px',
                resize: 'none',
              }}
              className={`border rounded-[10px] ${error.todo || !newTodoText.trim() ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {/* Todo error message */}
            {error.todo && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '5px', marginLeft: '10px' }}>
                {error.todo}
              </p>
            )}

            {/* Date input field */}

            <input
              type="datetime-local"
              value={dueDate}
              onChange={handleDateChange}
              min={minDate}
              className={`border rounded-[10px] mb-4 h-[40px] w-[217px] ml-[10px] pl-[12px] ${error.alarm || !dueDate ? 'border-red-500' : 'border-gray-300'
                } mt-[7px]`}
              style={{
                border: '1px solid rgba(169, 169, 169, 0.3)',
              }}
              inputMode="none" // Prevent typing
              onKeyDown={(e) => e.preventDefault()} // Prevent manual input
            />
            {/* Alarm error message */}
            {error.alarm && <p className="text-[red] text-sm mt-1 pl-[10px]">{error.alarm}</p>}

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
                paddingBottom: '10px',
              }}
            >
              <button
                onClick={onClose} // This will close the modal
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#00bbf9',
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '5px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddClick} // Adds the Todo
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#00bbf9',
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '5px',
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
