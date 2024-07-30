import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaEllipsisV, FaEdit, FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toggleCompleted, toggleImportant, deleteTask, editTask } from '../utils/taskSlice';

const TaskListComponent = ({ data }) => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.taskTitle);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(data.id));
  };

  const handleToggleImportant = () => {
    dispatch(toggleImportant(data.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(data.id));
  };

  const handleEditTask = () => {
    if (isEditing) {
      dispatch(editTask({ id: data.id, taskTitle: editedTitle }));
      setIsMenuOpen(false); // Close the menu on save
    }
    setIsEditing(!isEditing);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, inputRef]);

  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-400 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ height: '60px', width: '100%' }}>
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={data.isCompleted}
          onChange={handleToggleCompleted}
          className={`form-checkbox h-3 w-3 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            className={`border p-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            ref={inputRef}
          />
        ) : (
          <span className={data.isCompleted ? 'line-through' : ''}>{data.taskTitle}</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <FaStar
          className={`cursor-pointer ${data.isImportant ? 'text-yellow-500' : 'text-gray-400'} ${isDarkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-600'}`}
          onClick={handleToggleImportant}
        />
        <div className="relative" ref={menuRef}>
          <FaEllipsisV
            className={`cursor-pointer ${isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
            onClick={handleMenuToggle}
          />
          {isMenuOpen && (
            <div className={`absolute z-10 right-0 mt-2 w-fit bg-white border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'} rounded-lg shadow-lg`}>
              <button
                className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-white text-black hover:bg-gray-100'}`}
                onClick={handleEditTask}
              >
                {isEditing ? (
                  <span className='flex items-center'>
                    <FaSave className='w-4 h-4 my-1 mx-2' />
                    Save
                  </span>
                ) : (
                  <span className='flex items-center'>
                    <FaEdit className='w-4 h-4 my-1 mx-2' />
                    Edit
                  </span>
                )}
              </button>
              <button
                className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-white text-black hover:bg-gray-100'}`}
                onClick={handleDeleteTask}
              >
                <span className='flex items-center'>
                  <MdDelete className='w-5 h-5 my-1 mx-2' />
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListComponent;
