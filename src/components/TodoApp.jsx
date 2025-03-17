import React, { useState, useEffect } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi, FaBatteryFull } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import TodoAddEdit from "./TodoAddEdit"; 
import TodoItem from "./TodoItem";
import moment from "moment";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false); 
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodoStatusColor = (dueDate, isTodoCompleted) => {
    const currentTime = moment();
    const alarmTime = moment(dueDate);
    let alarmStatusColor = "rgb(182, 120, 255)";
    if (isTodoCompleted) {
      alarmStatusColor = "green"; 
    } else if (alarmTime.isBefore(currentTime)) {
      alarmStatusColor = "red"; 
    }
    return alarmStatusColor
  }

  useEffect(() => {
    const checkAlarmStatus = () => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.dueDate) {
            const alarmStatusColor= fetchTodoStatusColor(todo.dueDate, todo.completed)
            return { ...todo, alarmStatusColor };
          }
          return todo;
        })
      );
    };
    checkAlarmStatus();
    const interval = setInterval(checkAlarmStatus, 60000);
    return () => clearInterval(interval);
  }, []); // Re-run when todos change

  const handleAddClick = () => {
    setIsAddEditModalOpen(true);
    setEditingTodo(null); // Ensure we're not editing a todo
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setIsAddEditModalOpen(true);
  };

  const handleAddTodo = (newTodoText, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false, // New todos start as incomplete
      dueDate: dueDate || null,
      alarmStatusColor: "rgb(182, 120, 255)",
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (id, newText, newDueDate) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate, alarmStatusColor: "purple" } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed, alarmStatusColor: fetchTodoStatusColor(todo.dueDate, !todo.completed) } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 overflow-hidden">
      <div className="w-[320px] h-[600px] p-6 rounded-lg shadow-lg relative" style={{ background: "white" }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold pl-[9px] text-[15px]" style={{ fontWeight: "600", color: "rgb(55, 54, 54)" }}>
            {moment().format("hh:mm A")}
          </span>
          <div className="flex space-x-6 p-[2px]">
            <GiNetworkBars className="text-black p-[2px]" />
            <FaWifi className="text-black p-[2px]" />
            <FaBatteryFull className="text-black p-[2px]" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base text-[#52565b] pl-[11px] font-[system-ui]">Today</h1>
          <button onClick={handleAddClick} className="p-2 rounded-full border-none bg-transparent pr-[9px]">
            <GoPlusCircle size={24} style={{ color: "#00bbf9", cursor: "pointer" }} />
          </button>
        </div>

        {todos.length === 0 && <div className="text-[gray] pl-[18px] pt-[8px] text-[20px]">Enter a Task...</div>}

        <ul className="space-y-2 pl-[10px] max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditClick}
              onDelete={handleDeleteTodo}
              toggleTaskCompletion={handleCheckboxChange} // Use handleCheckboxChange here
              isChecked={todo.completed} // Directly use the 'completed' field for checkbox state
            />
          ))}
        </ul>
      </div>

      {/* Todo Add/Edit Modal */}
      {isAddEditModalOpen && (
        <TodoAddEdit
          todo={editingTodo}
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          onAddTodo={handleAddTodo}
          onEditTodo={handleEditTodo}
        />
      )}
    </div>
  );
};

export default TodoApp;