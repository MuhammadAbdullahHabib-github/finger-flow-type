
import React, { useState, useEffect } from 'react';
import TypingArea from './TypingArea';
import StatsBar from './StatsBar';
import ControlBar from './ControlBar';
import Hand from './Hand';
import Keyboard from './Keyboard';
import { keyToFingerMap } from '@/utils/keyboardUtils';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.",
  "Jackdaws love my big sphinx of quartz. Five or six big jet planes zoomed quickly by the tower.",
  "Crazy Fredrick bought many very exquisite opal jewels. The five boxing wizards jump quickly."
];

const TypingTutor = () => {
  const [targetText, setTargetText] = useState(sampleTexts[0]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeKey, setActiveKey] = useState(null);
  const [activeFingers, setActiveFingers] = useState([]);
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (startTime && currentIndex < targetText.length) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, currentIndex, targetText.length]);
  
  // Key press handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger on modifier keys
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      if (currentIndex >= targetText.length) return;
      
      // Start timer on first keypress
      if (currentIndex === 0 && !startTime) {
        setStartTime(Date.now());
      }
      
      const keyPressed = e.key;
      const expectedChar = targetText[currentIndex];
      
      // Update activeKey and activeFingers
      const lowerKey = keyPressed.toLowerCase();
      setActiveKey(lowerKey);
      
      if (keyToFingerMap[lowerKey]) {
        const { hand, finger } = keyToFingerMap[lowerKey];
        setActiveFingers([`${hand}-${finger}`]);
      } else {
        setActiveFingers([]);
      }
      
      // Only proceed if the input matches what we're expecting
      if (keyPressed === expectedChar) {
        // Correct input
        setUserInput(prev => prev + keyPressed);
        setCurrentIndex(currentIndex + 1);
      } else {
        // Incorrect input
        setMistakes(mistakes + 1);
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, targetText, startTime, mistakes]);
  
  // Calculate stats
  const percentComplete = Math.floor((currentIndex / targetText.length) * 100);
  const accuracy = userInput.length > 0 
    ? Math.floor(((userInput.length - mistakes) / userInput.length) * 100) 
    : 100;
  
  // Format the elapsed time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Reset the exercise
  const handleReset = () => {
    setUserInput('');
    setStartTime(null);
    setElapsedTime(0);
    setMistakes(0);
    setCurrentIndex(0);
    setActiveKey(null);
    setActiveFingers([]);
  };
  
  // Switch to a different exercise
  const handleSwitchExercise = () => {
    const currentIndex = sampleTexts.indexOf(targetText);
    const nextIndex = (currentIndex + 1) % sampleTexts.length;
    setTargetText(sampleTexts[nextIndex]);
    handleReset();
  };
  
  // Prepare finger colors mapping for the keyboard
  const fingerColors = {};
  Object.entries(keyToFingerMap).forEach(([key, mapping]) => {
    fingerColors[key] = mapping.color;
  });
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8 text-orange-500">Typing Tutor</h1>
      
      <StatsBar 
        time={formatTime(elapsedTime)} 
        percentComplete={percentComplete} 
        accuracy={accuracy} 
      />
      
      <div className="my-6 w-full max-w-4xl">
        <TypingArea 
          targetText={targetText} 
          userInput={userInput} 
          currentIndex={currentIndex} 
        />
      </div>
      
      <div className="flex justify-center items-center my-8 w-full">
        <Hand side="left" activeFingers={activeFingers} />
        <div className="mx-4 flex-grow max-w-3xl">
          <Keyboard activeKey={activeKey} fingerColors={fingerColors} />
        </div>
        <Hand side="right" activeFingers={activeFingers} />
      </div>
      
      <ControlBar onReset={handleReset} onSwitchExercise={handleSwitchExercise} />
    </div>
  );
};

export default TypingTutor;
