import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import { FaWifi, FaBatteryFull, FaPen, FaTrashAlt } from 'react-icons/fa'; // Edit and Delete icons
import { GiNetworkBars } from 'react-icons/gi'; // Network icon
import { GoPlusCircle } from 'react-icons/go'; // Plus icon for adding todo

const TodoApp = () => {
  const initialTodos = [
    { id: 1, text: 'Start making a presentation', completed: false },
    { id: 2, text: 'Pay for rent', completed: false },
    { id: 3, text: 'Buy a milk', completed: false },
    { id: 4, text: "don't forget to pick up Princy from school", completed: false },
    { id: 5, text: "Buy a chocolate", completed: false },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [time, setTime] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [editId, setEditId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for edit modal

  // Update the time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime(`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (text) => {
    const newTodoItem = {
      id: todos.length + 1,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
  };

  const handleAddClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };





  const handleEdit = (id, text) => {
    setEditText(text);
    setEditId(id);
    setIsEditModalOpen(true); // Open edit modal when clicking edit
  };

  const handleSaveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditText('');
    setEditId(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="w-[320px] h-[550px] p-6 rounded-lg shadow-lg" style={{ background: 'white' }}>
        {/* Time and Icons Bar */}
        <div className="flex justify-between items-center mb-4" style={{ padding: "4px" }}>
          <span className="text-sm text-gray-800">{time}</span> {/* Display current time */}
          <div className="flex space-x-6 p-[2px]">
            <GiNetworkBars className="text-black p-[2px]" /> {/* Network Icon */}
            <FaWifi className="text-black p-[2px]" /> {/* Wifi Icon */}
            <FaBatteryFull className="text-black p-[2px]" /> {/* Battery Icon */}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-[#252A31]" style={{ paddingLeft: "7px" }}>
            Today
          </h1>
          <button onClick={handleAddClick} className="p-2 rounded-full border-none" style={{ backgroundColor: "transparent" }}>
            <GoPlusCircle size={25} style={{ color: "blue" }} />
          </button>
        </div>

        {/* Pass the addTodo function and modal state to AddTodo component */}
        <AddTodo addTodo={addTodo} isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} />

        {/* Render the todo list */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center space-x-4 p-[10px] rounded-lg ${todo.completed ? 'bg-green-100' : 'bg-white'}`}
              style={{
                width: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              {/* Checkbox for completion */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)} // Toggle completion on change
                className="w-5 h-5"
              />

              {/* Todo Text */}
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
                style={{
                  display: 'block',
                  width: '100%',
                  borderBottom: '1px solid #D3D3D3',
                  paddingBottom: '5px',
                  boxSizing: 'border-box',
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {todo.text}
              </span>

              {/* Edit and Delete Icons */}
              <FaPen
                className="text-blue-500 cursor-pointer "
                onClick={() => handleEdit(todo.id, todo.text)}
              />
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Todo Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px] z-60"
            style={{
              paddingLeft: "45px",

            }}
          >
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-[250px] h-[150px] p-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Edit your task..."
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)} // Close modal on cancel
                className="p-2 rounded-lg border-none"
                style={{ color: "blue" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit} // Save edited text
                className="p-2 rounded-lg border-none"
                style={{
                  color: "blue",
                  marginRight: "40px"
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TodoApp;


