
import React from 'react';

interface StatsBarProps {
  time: string;
  percentComplete: number;
  accuracy: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ time, percentComplete, accuracy }) => {
  return (
    <div className="stats-bar flex justify-between text-white py-2 px-4">
      <div className="stat-item text-center">
        <h3 className="text-xl">Time</h3>
        <p className="text-5xl font-bold">{time}</p>
      </div>
      
      <div className="stat-item text-center">
        <h3 className="text-xl">Percent Complete</h3>
        <p className="text-5xl font-bold">{percentComplete} %</p>
      </div>
      
      <div className="stat-item text-center">
        <h3 className="text-xl">Accuracy</h3>
        <p className="text-5xl font-bold">{accuracy} %</p>
      </div>
    </div>
  );
};

export default StatsBar;
