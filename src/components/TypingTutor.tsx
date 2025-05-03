
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Keyboard from './Keyboard';
import Hand from './Hand';
import TypingArea from './TypingArea';
import StatsBar from './StatsBar';
import ControlBar from './ControlBar';
import { 
  typingExercises, 
  getActiveFingers, 
  formatTime,
  getKeyFingerColor
} from '@/utils/keyboardUtils';

const TypingTutor: React.FC = () => {
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [targetText, setTargetText] = useState<string>(typingExercises[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [activeFingers, setActiveFingers] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [totalKeysPressed, setTotalKeysPressed] = useState<number>(0);
  const [fingerColors, setFingerColors] = useState<Record<string, string>>({});
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate statistics
  const percentComplete = Math.floor((userInput.length / targetText.length) * 100);
  const accuracy = totalKeysPressed > 0 
    ? Math.floor(((totalKeysPressed - errors) / totalKeysPressed) * 100) 
    : 100;
  
  // Start or reset the timer
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }, []);
  
  // Stop the timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  // Reset the typing exercise
  const handleReset = useCallback(() => {
    setUserInput('');
    setCurrentKey(null);
    setActiveFingers([]);
    setIsStarted(false);
    setSeconds(0);
    setErrors(0);
    setTotalKeysPressed(0);
    stopTimer();
  }, [stopTimer]);
  
  // Switch to a different exercise
  const handleSwitchExercise = useCallback(() => {
    const nextIndex = (exerciseIndex + 1) % typingExercises.length;
    setExerciseIndex(nextIndex);
    setTargetText(typingExercises[nextIndex]);
    handleReset();
  }, [exerciseIndex, handleReset]);
  
  // Handle key press events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    // Ignore modifier keys and special keys
    if (e.ctrlKey || e.altKey || e.metaKey || key === 'Shift' || key === 'Control' || key === 'Alt') {
      return;
    }
    
    // Start the timer on first key press
    if (!isStarted) {
      setIsStarted(true);
      startTimer();
    }
    
    if (key === 'Escape') {
      handleReset();
      return;
    }
    
    // Only process actual character inputs
    if (key.length === 1) {
      e.preventDefault();
      
      setCurrentKey(key.toLowerCase());
      setActiveFingers(getActiveFingers(key));
      
      // Update finger colors for the keyboard
      const color = getKeyFingerColor(key);
      setFingerColors(prev => ({ ...prev, [key.toLowerCase()]: color }));
      
      // Update typing statistics
      setTotalKeysPressed(prev => prev + 1);
      if (targetText[userInput.length] !== key) {
        setErrors(prev => prev + 1);
      }
      
      // Update user input
      setUserInput(prev => {
        const newInput = prev + key;
        
        // Check if exercise is completed
        if (newInput.length >= targetText.length) {
          stopTimer();
        }
        
        return newInput;
      });
    } else if (key === 'Backspace') {
      // Handle backspace
      setUserInput(prev => prev.slice(0, -1));
    }
  }, [isStarted, startTimer, targetText, userInput, stopTimer, handleReset]);
  
  // Setup and cleanup event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopTimer();
    };
  }, [handleKeyDown, stopTimer]);
  
  // Update the next key to type
  useEffect(() => {
    if (userInput.length < targetText.length) {
      const nextKey = targetText[userInput.length].toLowerCase();
      setCurrentKey(nextKey);
      setActiveFingers(getActiveFingers(nextKey));
      
      // Update finger colors
      const color = getKeyFingerColor(nextKey);
      setFingerColors(prev => ({ ...prev, [nextKey]: color }));
    } else {
      setCurrentKey(null);
      setActiveFingers([]);
    }
  }, [userInput, targetText]);
  
  return (
    <div className="typing-tutor min-h-screen flex flex-col bg-gradient-to-b from-typing-background to-blue-900 text-white p-4">
      <div className="container mx-auto">
        {/* Stats Bar */}
        <StatsBar 
          time={formatTime(seconds)} 
          percentComplete={percentComplete} 
          accuracy={accuracy} 
        />
        
        {/* Typing Area */}
        <div className="my-6">
          <TypingArea 
            targetText={targetText} 
            userInput={userInput} 
            currentIndex={userInput.length} 
          />
        </div>
        
        {/* Controls */}
        <ControlBar 
          onReset={handleReset} 
          onSwitchExercise={handleSwitchExercise} 
        />
        
        {/* Keyboard and Hands */}
        <div className="keyboard-and-hands flex justify-center items-end mt-6 relative">
          <Hand side="left" activeFingers={activeFingers} />
          <Keyboard activeKey={currentKey} fingerColors={fingerColors} />
          <Hand side="right" activeFingers={activeFingers} />
        </div>
      </div>
    </div>
  );
};

export default TypingTutor;
