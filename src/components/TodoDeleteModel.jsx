import React from "react";

const TodoDeleteModal = ({ onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <div className="backdrop">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[280px] h-[120px]"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          background: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <p className="text-sm text-center mb-4 pt-[20px]">Do you really want to delete this todo?</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-300 p-2 rounded text-sm text-blue-500 cursor-pointer p-[8px] ml-[50px] border-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 p-2 rounded text-sm text-white cursor-pointer mr-[50px] text-[white] border-none"
            style={{ background: "rgb(68, 68, 214)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDeleteModal;
