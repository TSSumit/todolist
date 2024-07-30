import React from 'react';
import { useSelector } from 'react-redux';

const RingPieChart = () => {
  const pendingCount = useSelector((state) => state.tasks.uncompletedTasks);
  const doneCount = useSelector((state) => state.tasks.completedTasks);
  const totalTasks = pendingCount + doneCount;

  // Prevent division by zero and handle cases with no tasks
  // const pendingPercentage = totalTasks === 0 ? 0 : (pendingCount / totalTasks) * 100;
  const donePercentage = totalTasks === 0 ? 0 : (doneCount / totalTasks) * 100;

  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const doneOffset = circumference * (1 - donePercentage / 100);
  // const pendingOffset = circumference * (1 - pendingPercentage / 100);

  return (
    <div className="flex flex-col justify-center items-center">
      <svg width="151" height="151" viewBox="0 0 151 151" className="transform rotate-90">
        <circle
          cx="76"
          cy="76"
          r={radius}
          fill="none"
          stroke="#D1D5DB" // background ring color (light gray)
          strokeWidth="30"
        />
        {totalTasks > 0 && (
          <>
            <circle
              cx="76"
              cy="76"
              r={radius}
              fill="none"
              stroke="#A0EDA4" // donePercentage ring color
              strokeWidth="30"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={doneOffset}
              className="transition-all duration-300 ease-in-out"
            />
            <circle
              cx="76"
              cy="76"
              r={radius}
              fill="none"
              stroke="#3F9142" // pendingPercentage ring color
              strokeWidth="30"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference + doneOffset} // offset for pending percentage
              className="transition-all duration-300 ease-in-out"
            />
          </>
        )}
      </svg>
      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col items-center mx-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="mt-2">Completed: {doneCount}</span>
        </div>
        <div className="flex flex-col items-center mx-4">
          <div className="w-3 h-3 rounded-full bg-green-900"></div>
          <span className="mt-2">Pending: {pendingCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RingPieChart;
