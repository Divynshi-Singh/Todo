import React, { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";

const AddTodo = ({ addTodo }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    const handleAddClick = () => {
        setIsTaskModalOpen(true);
    };

    const handleCancel = () => {
        setIsTaskModalOpen(false);
        setNewTodo('');
    };

    const handleDone = () => {
        if (newTodo.trim() !== '') {
            addTodo(newTodo);
            setNewTodo('');
        }
        setIsTaskModalOpen(false);
    };

    return (
        <div>
            {/* Plus icon on the right side */}
            <div className="flex justify-end">
                <button
                    onClick={handleAddClick}
                    className="p-2 rounded-full border-none"
                >
                    <GoPlusCircle size={25} style={{ color: 'blue' }} />
                </button>
            </div>

            {/* Task Modal */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[300px] px-4">
                        {/* Modal Title */}
                        <textarea
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)} // Update newTodo state as user types
                            className="w-[250px] h-[150px] p-2 border border-gray-300 rounded-lg focus:outline-none mb-4"
                            placeholder="Describe your task here..."
                        />

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={handleCancel}
                                className="text-blue-500 p-2 rounded-lg border-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDone}
                                className="text-blue-500 p-2 rounded-lg border-none"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTodo;




