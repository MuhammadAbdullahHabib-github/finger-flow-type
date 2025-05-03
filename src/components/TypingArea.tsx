
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingAreaProps {
  targetText: string;
  userInput: string;
  currentIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ targetText, userInput, currentIndex }) => {
  return (
    <div className="typing-area bg-white p-6 rounded-lg border-4 border-orange-500 shadow-lg min-h-[200px] flex items-center">
      <div className="text-3xl text-gray-500 leading-relaxed tracking-wide text-left whitespace-pre-wrap">
        {targetText.split('').map((char, index) => {
          let className = 'text-gray-400'; // Default style
          
          if (index < userInput.length) {
            // Character has been typed
            className = userInput[index] === char ? 'text-typing-correct' : 'text-typing-incorrect';
          }
          
          if (index === currentIndex) {
            // Current character to type is highlighted with a different background
            className = cn(className, 'bg-black text-white');
          }
          
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;
