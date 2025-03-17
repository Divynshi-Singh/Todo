import React, { useState } from "react";
import { IoAlarmOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import TodoDeleteModal from "./TodoDeleteModel";

const TodoItem = ({ todo, onEdit, onCheckboxChange, isChecked, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const OpenDeleteOpen = () => {
        setIsDeleteModalOpen(true);
    };

    const CloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        onDelete(todo.id);
        setIsDeleteModalOpen(false);
    };

    return (
        <li
            key={todo.id}
            className={`flex items-center space-x-4 p-[7px] rounded-lg ${todo.completed ? "bg-green-100" : "bg-white"}`}
            style={{
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                borderBottom: "1px solid rgb(235, 229, 229)",
            }}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onCheckboxChange(todo.id)}
                className="checkbox"
            />
            {/* Todo Text and Due Date */}
            <span className={`text-content flex-1 ${todo.completed ? "" : ""}`}>
                {todo.text}
                {todo.dueDate && (
                    <div className="flex items-center space-x-2 mt-2">
                        <IoAlarmOutline size={15} className="text-[gray] pt-[5px]" />
                        <span className="text-sm text-gray-600 pt-[5px] text-[13px]">
                            {moment(todo.dueDate).format("MMMM D, YYYY h:mm")}
                        </span>
                    </div>
                )}
            </span>

            {/* Alarm Status Indicator */}
            <div
                className={`w-[10px] h-[10px] border-none rounded-full m-[4px]`}
                style={{ backgroundColor: todo.alarmStatusColor }}
            ></div>

            {/* Edit and Delete Buttons */}
            <button onClick={() => onEdit(todo)} className="cursor-pointer border-none bg-transparent">
                <MdEdit size={15} />
            </button>
            <button onClick={OpenDeleteOpen} className="cursor-pointer border-none bg-transparent">
                <FaTrashAlt size={14} />
            </button>

            {/* Todo Delete Modal */}
            {isDeleteModalOpen && (
                <TodoDeleteModal
                    todo={todo}
                    onClose={CloseDeleteModal}
                    onDelete={handleDeleteConfirm}
                />
            )}
        </li>
    );
};

export default TodoItem;