import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaEdit, FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toggleCompleted, toggleImportant, deleteTask, editTask } from '../utils/taskSlice';

const TaskCard = ({ data }) => {
  const dispatch = useDispatch();
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
    }
    setIsEditing(!isEditing);
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
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, inputRef]);

  return (
    <div className={`p-5 border border-gray-400 rounded-md m-2 min-w-60 max-w-80  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} >
      <div className="flex items-center space-x-4 mb-2">
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
      <div className="flex items-center justify-end  space-x-3">
        <FaStar
          className={`cursor-pointer ${data.isImportant ? 'text-yellow-400' : 'text-gray-400'} ${isDarkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-600'}`}
          onClick={handleToggleImportant}
        />
        <div className="relative" ref={menuRef}>
          <button onClick={handleEditTask} className="focus:outline-none">
            {isEditing ? (
              <span className="flex items-center">
                <FaSave className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex items-center">
                <FaEdit className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
        <button onClick={handleDeleteTask} className="focus:outline-none">
          <span className="flex items-center">
            <MdDelete className="w-5 h-5 text-red-500 hover:text-red-700" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
