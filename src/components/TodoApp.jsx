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
    return savedTodos ? JSON.parse(savedTodos) : []; // Return empty array if no todos exist in localStorage
  });

  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodoIds, setSelectedTodoIds] = useState(() => {
    // Load selectedTodoIds from localStorage,
    const savedSelectedIds = localStorage.getItem('selectedTodoIds');
    return savedSelectedIds ? new Set(JSON.parse(savedSelectedIds)) : new Set();
  });
  useEffect(() => {
    localStorage.setItem('selectedTodoIds', JSON.stringify([...selectedTodoIds]));
  }, [selectedTodoIds]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${hours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
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

  const handleEditTodo = (id, newText, newDueDate) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Save to localStorage after editing
  };

  const handleCheckboxChange = (id) => {
    setSelectedTodoIds(prevIds => {
      const newSelectedIds = new Set(prevIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  const renderDueDateAndTime = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${formattedMinutes}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 overflow-hidden">
      <div className="w-[320px] h-[600px] p-6 rounded-lg shadow-lg relative" style={{ background: 'white' }}>
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base text-[#52565b]" style={{ paddingLeft: '11px', fontFamily: "system-ui" }}>
            Today
          </h1>
          <button onClick={handleAddClick} className="p-2 rounded-full border-none bg-transparent pr-[9px]">
            <GoPlusCircle size={24} style={{ color: '#00bbf9', cursor: 'pointer' }} />
          </button>
        </div>
        {todos.length === 0 && (
          <div className="text-[gray] pl-[18px] pt-[8px]" style={{ fontSize: '20px' }}>
            Enter a Task...
          </div>
        )}
        <ul className="space-y-2 pl-[10px] max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center space-x-4 p-[7px] rounded-lg ${todo.completed ? 'bg-green-100' : 'bg-white'}`}
              style={{
                width: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
                borderBottom: '1px solid rgb(235, 229, 229)',  // Apply border to the entire list item
              }}
            >
              <input
                type="checkbox"
                checked={selectedTodoIds.has(todo.id)}
                onChange={() => handleCheckboxChange(todo.id)}
                className="checkbox"
              />
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
                style={{
                  display: 'block',
                  width: 'calc(100% - 30px)',
                  paddingLeft: '10px',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: "system-ui",
                  color: "#545151",
                  overflow: 'hidden',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  textOverflow: 'ellipsis',
                }}
              >
                {todo.text}
                {todo.dueDate && (
                  <div className="flex items-center space-x-2 mt-2">
                    <IoAlarmOutline size={15} className="text-[gray]" />
                    <span className="text-sm text-gray-600" style={{ fontSize: '13px', color: 'gray' }}>
                      {renderDueDateAndTime(todo.dueDate)}
                    </span>
                  </div>
                )}
              </span>
              <TodoEditDelete todo={todo} onEdit={handleEditTodo} onDelete={handleDeleteTodo} selectedTodoIds={selectedTodoIds} />
            </li>
          ))}
        </ul>
      </div>
      <TodoAdd isOpen={isModalOpen} onClose={handleCloseModal} onAddTodo={handleAddTodo} />
    </div>
  );
};
export default TodoApp;




