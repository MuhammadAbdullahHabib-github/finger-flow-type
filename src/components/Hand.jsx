
import React from 'react';
import { cn } from '@/lib/utils';
import { Hand as HandIcon } from 'lucide-react';

const Finger = ({ name, active, color, label }) => {
  return (
    <div 
      className={cn(
        'relative rounded-full flex items-center justify-center w-9 h-9 border-2 border-gray-300',
        active ? `${color} animate-pulse-finger` : 'bg-typing-hand'
      )}
    >
      <span className="text-black font-bold text-xs">{label}</span>
    </div>
  );
};

const Hand = ({ side, activeFingers }) => {
  const fingerColors = {
    pinky: 'bg-typing-finger-pinky',
    ring: 'bg-typing-finger-ring',
    middle: 'bg-typing-finger-middle',
    index: 'bg-typing-finger-index',
    thumb: 'bg-typing-finger-thumb'
  };

  return (
    <div className={cn(
      "relative",
      side === 'left' ? 'mr-4' : 'ml-4'
    )}>
      <div className="absolute text-3xl text-typing-hand">
        <HandIcon size={150} className={side === 'right' ? 'transform -scale-x-100' : ''} />
      </div>
      
      <div className={cn(
        "relative z-10 w-44 h-44 flex items-center",
        side === 'left' ? 'justify-end' : 'justify-start'
      )}>
        <div className={cn(
          "flex gap-1",
          side === 'left' ? 'flex-row' : 'flex-row-reverse'
        )}>
          <Finger 
            name={`${side}-pinky`} 
            label={side === 'left' ? 'A' : 'P'}
            active={activeFingers.includes(`${side}-pinky`)} 
            color={fingerColors.pinky} 
          />
          <Finger 
            name={`${side}-ring`} 
            label={side === 'left' ? 'S' : 'O'}
            active={activeFingers.includes(`${side}-ring`)} 
            color={fingerColors.ring} 
          />
          <Finger 
            name={`${side}-middle`} 
            label={side === 'left' ? 'D' : 'I'}
            active={activeFingers.includes(`${side}-middle`)} 
            color={fingerColors.middle} 
          />
          <Finger 
            name={`${side}-index`} 
            label={side === 'left' ? 'F' : 'J'}
            active={activeFingers.includes(`${side}-index`)} 
            color={fingerColors.index} 
          />
        </div>
      </div>
    </div>
  );
};

export default Hand;
