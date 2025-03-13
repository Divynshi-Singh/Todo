import React, { useState, useEffect } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi, FaBatteryFull } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { IoAlarmOutline } from "react-icons/io5";
import TodoAddEdit from "./TodoAddEDit";
import TodoDelete from "./TodoDelete";
import { MdEdit } from "react-icons/md"; // Edit icon
import moment from "moment";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // Add mode for managing different modals
  const [selectedTodoIds, setSelectedTodoIds] = useState(() => {
    const savedSelectedIds = localStorage.getItem("selectedTodoIds");
    return savedSelectedIds ? new Set(JSON.parse(savedSelectedIds)) : new Set();
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [alarmStatusColors, setAlarmStatusColors] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${hours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkAlarmStatus = () => {
      const updatedStatusColors = { ...alarmStatusColors };
      todos.forEach((todo) => {
        if (todo.dueDate) {
          const currentTime = moment();
          const alarmTime = moment(todo.dueDate);

          if (selectedTodoIds.has(todo.id)) {
            updatedStatusColors[todo.id] = "green";
          } else if (alarmTime.isBefore(currentTime)) {
            updatedStatusColors[todo.id] = "red";
          } else {
            updatedStatusColors[todo.id] = "purple";
          }
        }
      });
      setAlarmStatusColors(updatedStatusColors);
    };

    checkAlarmStatus();
    const interval = setInterval(checkAlarmStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [todos, selectedTodoIds]);

  const handleAddClick = () => {
    setIsModalOpen(true);
    setModalMode("add"); 
    setEditingTodo(null);
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo); 
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAddTodo = (newTodoText, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      dueDate: dueDate || null,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (id, newText, newDueDate) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate } : todo
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
    setSelectedTodoIds((prevIds) => {
      const newSelectedIds = new Set(prevIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      localStorage.setItem("selectedTodoIds", JSON.stringify([...newSelectedIds]));
      return newSelectedIds;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 overflow-hidden">
      <div className="w-[320px] h-[600px] p-6 rounded-lg shadow-lg relative" style={{ background: "white" }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold pl-[9px] text-[15px]" style={{ fontWeight: "600", color: "rgb(55, 54, 54)" }}>
            {time}
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
            <li
              key={todo.id}
              className={`flex items-center space-x-4 p-[7px] rounded-lg ${todo.completed ? "bg-green-100" : "bg-white"
                }`}
              style={{
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                borderBottom: "1px solid rgb(235, 229, 229)", // Apply border to the entire list item
              }}
            >
              <input
                type="checkbox"
                checked={selectedTodoIds.has(todo.id)}
                onChange={() => handleCheckboxChange(todo.id)}
                className="checkbox"
              />
              <span className={`text-content flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>
                {todo.text}
                {todo.dueDate && (
                  <div className="flex items-center space-x-2 mt-2">
                    <IoAlarmOutline size={15} className="text-[gray] pt-[5px]" />
                    <span className="text-sm text-gray-600 pt-[5px] text-[13px] text-[gray]">{todo.dueDate && moment(todo.dueDate).format("MMMM D, YYYY HH:mm")}</span>
                  </div>
                )}
              </span>

              <div
                className={`w-[10px] h-[10px] border rounded-full m-[4px]`}
                style={{
                  border: "none",
                  backgroundColor:
                    alarmStatusColors[todo.id] === "red"
                      ? "red"
                      : alarmStatusColors[todo.id] === "green"
                        ? "green"
                        : "rgb(182, 120, 255)",
                }}
              ></div>

              <button onClick={() => handleEditClick(todo)} className="cursor-pointer border-none bg-transparent">
                <MdEdit size={15} />
              </button>
              <TodoDelete todo={todo} onDelete={handleDeleteTodo} />
            </li>
          ))}
        </ul>
              </div>
      <TodoAddEdit
        todo={editingTodo}
        mode={modalMode} 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={handleAddTodo}
        onEdit={handleEditTodo}
      />
    </div>
  );
};

export default TodoApp;
