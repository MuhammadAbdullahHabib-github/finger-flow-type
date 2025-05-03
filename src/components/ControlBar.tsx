
import React from 'react';
import { Button } from "@/components/ui/button";

interface ControlBarProps {
  onReset: () => void;
  onSwitchExercise: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ onReset, onSwitchExercise }) => {
  return (
    <div className="flex justify-center gap-4 my-4">
      <Button 
        onClick={onReset} 
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-xl"
      >
        Reset
      </Button>
      <Button 
        onClick={onSwitchExercise} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-xl"
      >
        Switch-Up
      </Button>
    </div>
  );
};

export default ControlBar;
