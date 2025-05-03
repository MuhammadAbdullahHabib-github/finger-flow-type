
import React from 'react';
import { cn } from "@/lib/utils";

interface KeyProps {
  char: string;
  isActive: boolean;
  size?: 'normal' | 'wide' | 'extraWide';
  fingerColor?: string;
}

const Key: React.FC<KeyProps> = ({ char, isActive, size = 'normal', fingerColor }) => {
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

interface KeyboardProps {
  activeKey: string | null;
  fingerColors: Record<string, string>;
}

const Keyboard: React.FC<KeyboardProps> = ({ activeKey, fingerColors }) => {
  const rows = [
    [
      { char: '~`', size: 'normal' as const },
      { char: '1', size: 'normal' as const },
      { char: '2', size: 'normal' as const },
      { char: '3', size: 'normal' as const },
      { char: '4', size: 'normal' as const },
      { char: '5', size: 'normal' as const },
      { char: '6', size: 'normal' as const },
      { char: '7', size: 'normal' as const },
      { char: '8', size: 'normal' as const },
      { char: '9', size: 'normal' as const },
      { char: '0', size: 'normal' as const },
      { char: '-', size: 'normal' as const },
      { char: '=', size: 'normal' as const },
      { char: 'Backspace', size: 'wide' as const },
    ],
    [
      { char: 'Tab', size: 'wide' as const },
      { char: 'Q', size: 'normal' as const },
      { char: 'W', size: 'normal' as const },
      { char: 'E', size: 'normal' as const },
      { char: 'R', size: 'normal' as const },
      { char: 'T', size: 'normal' as const },
      { char: 'Y', size: 'normal' as const },
      { char: 'U', size: 'normal' as const },
      { char: 'I', size: 'normal' as const },
      { char: 'O', size: 'normal' as const },
      { char: 'P', size: 'normal' as const },
      { char: '[', size: 'normal' as const },
      { char: ']', size: 'normal' as const },
      { char: '\\', size: 'normal' as const },
    ],
    [
      { char: 'Caps Lock', size: 'wide' as const },
      { char: 'A', size: 'normal' as const },
      { char: 'S', size: 'normal' as const },
      { char: 'D', size: 'normal' as const },
      { char: 'F', size: 'normal' as const },
      { char: 'G', size: 'normal' as const },
      { char: 'H', size: 'normal' as const },
      { char: 'J', size: 'normal' as const },
      { char: 'K', size: 'normal' as const },
      { char: 'L', size: 'normal' as const },
      { char: ';', size: 'normal' as const },
      { char: "'", size: 'normal' as const },
      { char: 'Enter', size: 'wide' as const },
    ],
    [
      { char: 'Shift', size: 'wide' as const },
      { char: 'Z', size: 'normal' as const },
      { char: 'X', size: 'normal' as const },
      { char: 'C', size: 'normal' as const },
      { char: 'V', size: 'normal' as const },
      { char: 'B', size: 'normal' as const },
      { char: 'N', size: 'normal' as const },
      { char: 'M', size: 'normal' as const },
      { char: ',', size: 'normal' as const },
      { char: '.', size: 'normal' as const },
      { char: '/', size: 'normal' as const },
      { char: 'Shift', size: 'wide' as const },
    ],
    [
      { char: ' ', size: 'extraWide' as const },
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
