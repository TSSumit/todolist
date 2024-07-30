import React from 'react';
import { useSelector } from 'react-redux';
import { FaTasks, FaCalendarAlt, FaStar, FaMapSigns, FaUser, FaPlus } from 'react-icons/fa';
import profilePhoto from '../images/profilePhoto.png'; 
import RingPieChart from '../utils/RingPieChart';

const Dropdown = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const pendingCount = useSelector((state) => state.tasks.uncompletedTasks); 
  const doneCount = useSelector((state) => state.tasks.completedTasks); 
  const totalCount=pendingCount+doneCount;
  

  

  return (
    <div className={`flex flex-col items-center rounded-md  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} h-fit w-64 mt-14 p-4`}>
      <div className="flex flex-col items-center mb-2">
        <img src={profilePhoto} alt='Profile' className="rounded-full w-24 h-24 -mt-16"/>
        <span className="text-lg">Hey, ABCD</span>
      </div>
      <div className={`flex flex-col  py-4 my-2  w-full rounded-sm ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className={`flex items-center gap-3 cursor-pointer py-1 px-4 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'}`}>
            <FaTasks />
            <span>All Tasks</span>
        </div>
        <div className={`flex items-center gap-3 cursor-pointer py-1 px-4  rounded-md ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'}`}>
            <FaCalendarAlt />
            <span>Today</span>
        </div>
        <div className={`flex items-center gap-3 cursor-pointer py-1 px-4 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'}`}>
            <FaStar />
            <span>Important</span>
        </div>
        <div className={`flex items-center gap-3 cursor-pointer py-1 px-4 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'}`}>
            <FaMapSigns />
            <span>Planned</span>
        </div>
        <div className={`flex items-center gap-3 cursor-pointer py-1 px-4 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'}`}>
            <FaUser />
            <span>Assigned to me</span>
        </div>
      </div>
      <div className={`flex flex-col py-4 my-2  w-full rounded-sm ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className={`flex items-center gap-2 cursor-pointer py-1 px-4 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'}`}>
            <FaPlus />
            <span>Add List</span>
        </div>
      </div>
      <div className={`text-center flex flex-col py-4 my-2  w-full rounded-sm ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div>Total Tasks: {totalCount}</div>
        {totalCount > 0 && (
          <div className="flex flex-col justify-center items-center">
            <RingPieChart />
            <div className="flex  mt-2">
              <span className="flex items-center m-2">
                <span className="block w-2 h-2 rounded-full bg-green-700 mr-2"></span>Pending
              </span>
              <span className="flex items-center m-2">
                <span className="block w-2 h-2 rounded-full bg-green-300 mr-2"></span>Done
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
