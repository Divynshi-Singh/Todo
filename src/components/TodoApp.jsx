import React, { useState, useEffect } from 'react';
import { GiNetworkBars } from 'react-icons/gi';
import { FaWifi, FaBatteryFull } from 'react-icons/fa'; 
import { GoPlusCircle } from 'react-icons/go'; 
import { IoAlarmOutline } from 'react-icons/io5'; 
import TodoAdd from './TodoAdd'; 
import TodoEditDelete from './TodoEditDelete'; 

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: 'Start making a presentation', completed: false },
      { id: 2, text: 'Pay for rent', completed: false },
      { id: 3, text: 'Buy milk', completed: false },
      { id: 4, text: "Don't forget to pick up Princy from school", completed: false },
      { id: 5, text: "Buy chocolate", completed: false },
    ];
  });
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedTodo, setSelectedTodo] = useState(null); 
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am'; 
      hours = hours % 12; // Convert to 12-hour format
      hours = hours ? hours : 12; 
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${hours}:${formattedMinutes} ${ampm}`); 
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleAddTodo = (newTodoText, dueDate) => {
    const newTodo = { id: Date.now(), text: newTodoText, completed: false, dueDate: dueDate || null };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setSelectedTodo(null); 
  };
  const renderDueDateAndTime = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Format the time in "hh:mm" format
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${formattedMinutes}`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 overflow-hidden">
      <div className="w-[310px] h-[600px] p-6 rounded-lg shadow-lg relative" style={{ background: 'white' }}>
        {/* Time and Icons Bar */}
        <div className="flex justify-between items-center mb-4" style={{ padding: '6px' }}>
          <span className="text-sm font-bold" style={{ fontSize: '15px', fontWeight: '600', color: 'rgb(55, 54, 54)', paddingLeft: '9px' }}>
            {time}
          </span>
          <div className="flex space-x-6 p-[2px]">
            <GiNetworkBars className="text-black p-[2px]" />
            <FaWifi className="text-black p-[2px]" />
            <FaBatteryFull className="text-black p-[2px]" />
          </div>
        </div>

        {/* Today Title and Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base font-normal text-[#252A31]" style={{ paddingLeft: '10px' }}>
            Today
          </h1>
          <button onClick={handleAddClick} className="p-2 rounded-full border-none bg-transparent pr-[9px]">
            <GoPlusCircle size={24} style={{ color: 'blue', cursor: 'pointer' }} />
          </button>
        </div>

        {/* Render the todo list */}
        <ul className="space-y-2 pl-[10px] max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
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
              {/* Circular Checkbox for completion */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {}}
                className="checkbox"
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
                  fontSize: '16px',
                  // fontWeight: '500',
                  paddingLeft: "10px",
                  lineHeight: '1.8',
                  // fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                {todo.text}
                {todo.dueDate && (
                  <div className="flex items-center space-x-2 mt-2">
                    {/* Alarm Icon */}
                    <IoAlarmOutline size={15} className="text-gray-600" />
                    <span className="text-sm text-gray-600" style={{fontSize:"13px"}}>
                      {renderDueDateAndTime(todo.dueDate)}
                    </span>
                  </div>
                )}
              </span>

              {/* Edit and Delete Icons */}
              <TodoEditDelete todo={todo} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Component */}
      <TodoAdd isOpen={isModalOpen} onClose={handleCloseModal} onAddTodo={handleAddTodo} />
    </div>
  );
}
export default TodoApp;


