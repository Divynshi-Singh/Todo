import React, { useState } from "react";

const AddTodo = ({ addTodo, isTaskModalOpen, setIsTaskModalOpen }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleCancel = () => {
        setIsTaskModalOpen(false);
        setNewTodo("");
    };

    const handleDone = () => {
        if (newTodo.trim() !== "") {
            addTodo(newTodo);
            setNewTodo("");
        }
        setIsTaskModalOpen(false);
    };

    return (
        <>
            {/* Task Modal */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center "

                    style={{
                        padding: "33px",

                    }}

                >
                    <div className="bg-white p-6 rounded-lg w-[300px]">


                        <textarea
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="w-[250px] h-[150px] p-2 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Task here..."
                        />

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleCancel}
                                className="p-2 rounded-lg border-none"
                                style={{ color: "blue" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDone}
                                className="p-2 rounded-lg border-none"
                                style={{
                                    color: "blue",
                                    marginRight: "40px",

                                }}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>


    );
};

export default AddTodo;

