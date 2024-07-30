import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBell, FaSync, FaCalendar, FaTimes } from 'react-icons/fa';
import { addTask, deleteTask } from '../utils/taskSlice';
import TaskListComponent from './TaskListComponent';
import TaskCard from './TaskCard';

const TasksContainer = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isListView = useSelector((state) => state.listView.isListView);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const pendingTasks = useSelector((state) => state.tasks.uncompletedTasks);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [inputFocused, setInputFocused] = useState(false);

  const handleAddTask = () => {
    const taskTitle = inputRef.current.value;
    if (taskTitle) {
      dispatch(addTask(taskTitle));
      inputRef.current.value = '';
      setInputFocused(false);
    }
  };

  const handleRemoveAllIncompleteTasks = () => {
    tasks.forEach(task => {
      if (!task.isCompleted) {
        dispatch(deleteTask(task.id));
      }
    });
  };

  const handleRemoveAllCompletedTasks = () => {
    tasks.forEach(task => {
      if (task.isCompleted) {
        dispatch(deleteTask(task.id));
      }
    });
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    if (!inputRef.current.value) {
      setInputFocused(false);
    }
  };

  const handleClearInput = () => {
    inputRef.current.value = '';
    setInputFocused(false);
  };

  return (
    <div className={`p-4 overflow-y-auto h-fit mt-3 min-w-[50vw] max-w-[75vw] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-lg shadow-lg`}>
      <div className={`mt-3 p-5 rounded-md ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="relative my-2">
          <input 
            type="text" 
            placeholder="Add a task..." 
            ref={inputRef} 
            onFocus={handleInputFocus} 
            onBlur={handleInputBlur} 
            className={`border-0 py-2 px-3 w-full mb-2 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`} 
          />
          {inputFocused && (
            <FaTimes 
              className="absolute right-2 top-3 text-xl cursor-pointer" 
              onClick={handleClearInput} 
            />
          )}
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex">
            <FaBell className={`text-xl mr-5 ml-3 cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}`} />
            <FaSync onClick={handleAddTask} className={`text-xl mr-5 ml-3 cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}`} />
            <FaCalendar className={`text-xl mr-5 ml-3 cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}`} />
          </div>
          <button 
            onClick={handleAddTask} 
            className="bg-[#51a553] text-white px-2 py-1 rounded-lg hover:bg-[#367937] active:bg-[#1d531e] transition duration-300"
          >
            Add Task
          </button>
        </div>
      </div>

      <div>
        {pendingTasks > 0 && (
          <div className="mb-4">
            {isListView ? (
              tasks.filter(task => !task.isCompleted).map(task => (
                <TaskListComponent key={task.id} data={task} />
              ))
            ) : (
              <div className="flex w-full justify-start flex-wrap">
                {tasks.filter(task => !task.isCompleted).map(task => (
                  <TaskCard key={task.id} data={task} />
                ))}
              </div>
            )}
            <div className="w-full flex justify-end">
              {pendingTasks > 2 && (
                <button 
                  onClick={handleRemoveAllIncompleteTasks} 
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700 transition duration-300"
                >
                  Remove All Incomplete Tasks
                </button>
              )}
            </div>
          </div>
        )}

        {completedTasks > 0 && (
          <div>
            <h3 className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Completed Tasks</h3>
            {isListView ? (
              tasks.filter(task => task.isCompleted).map(task => (
                <TaskListComponent key={task.id} data={task} />
              ))
            ) : (
              <div className="flex w-full justify-start flex-wrap">
                {tasks.filter(task => task.isCompleted).map(task => (
                  <TaskCard key={task.id} data={task} />
                ))}
              </div>
            )}
            <div className="w-full flex justify-end">
              {completedTasks > 2 && (
                <button 
                  onClick={handleRemoveAllCompletedTasks} 
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700 transition duration-300"
                >
                  Remove All Completed Tasks
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
