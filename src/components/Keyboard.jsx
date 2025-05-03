
import React from 'react';
import { cn } from "@/lib/utils";

const Key = ({ char, isActive, size = 'normal', fingerColor }) => {
  const sizeClasses = {
    normal: 'w-12 h-12',
    wide: 'w-20 h-12',
    extraWide: 'w-28 h-12'
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-md font-bold text-lg border-2 border-gray-300 shadow-md',
        sizeClasses[size],
        isActive 
          ? `${fingerColor || 'bg-typing-blue'} text-white`
          : 'bg-white text-gray-800'
      )}
    >
      {char}
    </div>
  );
};

const Keyboard = ({ activeKey, fingerColors }) => {
  const rows = [
    [
      { char: '~`', size: 'normal' },
      { char: '1', size: 'normal' },
      { char: '2', size: 'normal' },
      { char: '3', size: 'normal' },
      { char: '4', size: 'normal' },
      { char: '5', size: 'normal' },
      { char: '6', size: 'normal' },
      { char: '7', size: 'normal' },
      { char: '8', size: 'normal' },
      { char: '9', size: 'normal' },
      { char: '0', size: 'normal' },
      { char: '-', size: 'normal' },
      { char: '=', size: 'normal' },
      { char: 'Backspace', size: 'wide' },
    ],
    [
      { char: 'Tab', size: 'wide' },
      { char: 'Q', size: 'normal' },
      { char: 'W', size: 'normal' },
      { char: 'E', size: 'normal' },
      { char: 'R', size: 'normal' },
      { char: 'T', size: 'normal' },
      { char: 'Y', size: 'normal' },
      { char: 'U', size: 'normal' },
      { char: 'I', size: 'normal' },
      { char: 'O', size: 'normal' },
      { char: 'P', size: 'normal' },
      { char: '[', size: 'normal' },
      { char: ']', size: 'normal' },
      { char: '\\', size: 'normal' },
    ],
    [
      { char: 'Caps Lock', size: 'wide' },
      { char: 'A', size: 'normal' },
      { char: 'S', size: 'normal' },
      { char: 'D', size: 'normal' },
      { char: 'F', size: 'normal' },
      { char: 'G', size: 'normal' },
      { char: 'H', size: 'normal' },
      { char: 'J', size: 'normal' },
      { char: 'K', size: 'normal' },
      { char: 'L', size: 'normal' },
      { char: ';', size: 'normal' },
      { char: "'", size: 'normal' },
      { char: 'Enter', size: 'wide' },
    ],
    [
      { char: 'Shift', size: 'wide' },
      { char: 'Z', size: 'normal' },
      { char: 'X', size: 'normal' },
      { char: 'C', size: 'normal' },
      { char: 'V', size: 'normal' },
      { char: 'B', size: 'normal' },
      { char: 'N', size: 'normal' },
      { char: 'M', size: 'normal' },
      { char: ',', size: 'normal' },
      { char: '.', size: 'normal' },
      { char: '/', size: 'normal' },
      { char: 'Shift', size: 'wide' },
    ],
    [
      { char: ' ', size: 'extraWide' },
    ]
  ];

  return (
    <div className="keyboard-container bg-gray-800 p-4 rounded-lg border-4 border-orange-500 select-none">
      <div className="flex flex-col gap-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key, keyIndex) => (
              <Key
                key={`${rowIndex}-${keyIndex}`}
                char={key.char}
                size={key.size}
                isActive={activeKey === key.char.toLowerCase()}
                fingerColor={fingerColors[key.char.toLowerCase()]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
