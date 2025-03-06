import React, { useState } from 'react';
import AddTodo from './AddTodo'; 

const TodoApp = () => {
  const initialTodos = [
    { id: 1, text: 'Start making a presentation', completed: false },
    { id: 2, text: 'Pay for rent', completed: false },
    { id: 3, text: 'Buy a milk', completed: false },
    { id: 4, text: "don't forget to pick up Princy from school", completed: false },
    { id: 5, text: "Buy a chocolate", completed: false },
  ];

  const [todos, setTodos] = useState(initialTodos);

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

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-500">
      <div className="w-[330px] h-[500px] p-6 rounded-lg shadow-lg bg-white"
       style={{ background: 'white' }}
      >
        <h1 className="text-center text-2xl font-semibold mb-4">To-Do List</h1>

        {/* Pass the addTodo function as a prop to AddTodo */}
        <AddTodo addTodo={addTodo} />

        {/* Render the todo list */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center space-x-4 p-[10px] rounded-lg ${todo.completed ? 'bg-green-100' : 'bg-white'
                }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
                className="w-7 h-7 rounded-full border-2 border-gray-300 "
              />
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''
                  }`}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

