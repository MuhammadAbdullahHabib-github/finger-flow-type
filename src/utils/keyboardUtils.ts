
export type FingerName = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
export type HandSide = 'left' | 'right';

interface KeyMapping {
  hand: HandSide;
  finger: FingerName;
  color: string;
}

// Define which finger should be used for each key
export const keyToFingerMap: Record<string, KeyMapping> = {
  // Left hand
  '`': { hand: 'left', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '1': { hand: 'left', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  'q': { hand: 'left', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  'a': { hand: 'left', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  'z': { hand: 'left', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  
  '2': { hand: 'left', finger: 'ring', color: 'bg-typing-finger-ring' },
  'w': { hand: 'left', finger: 'ring', color: 'bg-typing-finger-ring' },
  's': { hand: 'left', finger: 'ring', color: 'bg-typing-finger-ring' },
  'x': { hand: 'left', finger: 'ring', color: 'bg-typing-finger-ring' },
  
  '3': { hand: 'left', finger: 'middle', color: 'bg-typing-finger-middle' },
  'e': { hand: 'left', finger: 'middle', color: 'bg-typing-finger-middle' },
  'd': { hand: 'left', finger: 'middle', color: 'bg-typing-finger-middle' },
  'c': { hand: 'left', finger: 'middle', color: 'bg-typing-finger-middle' },
  
  '4': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  '5': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  'r': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  'f': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  'v': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  't': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  'g': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  'b': { hand: 'left', finger: 'index', color: 'bg-typing-finger-index' },
  
  // Right hand
  '6': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  '7': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'y': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'h': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'n': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'u': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'j': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  'm': { hand: 'right', finger: 'index', color: 'bg-typing-finger-index' },
  
  '8': { hand: 'right', finger: 'middle', color: 'bg-typing-finger-middle' },
  'i': { hand: 'right', finger: 'middle', color: 'bg-typing-finger-middle' },
  'k': { hand: 'right', finger: 'middle', color: 'bg-typing-finger-middle' },
  ',': { hand: 'right', finger: 'middle', color: 'bg-typing-finger-middle' },
  
  '9': { hand: 'right', finger: 'ring', color: 'bg-typing-finger-ring' },
  'o': { hand: 'right', finger: 'ring', color: 'bg-typing-finger-ring' },
  'l': { hand: 'right', finger: 'ring', color: 'bg-typing-finger-ring' },
  '.': { hand: 'right', finger: 'ring', color: 'bg-typing-finger-ring' },
  
  '0': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '-': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '=': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  'p': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '[': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  ']': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '\\': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  ';': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  "'": { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  '/': { hand: 'right', finger: 'pinky', color: 'bg-typing-finger-pinky' },
  
  // Space is thumb
  ' ': { hand: 'right', finger: 'thumb', color: 'bg-typing-finger-thumb' },
};

// Sample typing exercises
export const typingExercises = [
  "d k kdkd d dkkdd dkddd dddk kkdd ddd kd d dk dk k dkd kdk ddkkk dkkd k kkkk kkkd ddkk dd kkd kkk kd kk ddd k kdk kkd k dk k kk kd kddd kdd dkk",
  "asl; asl; as;l a;sl la;s ;asl lsa; ;als sa;l las; ;las a;ls ;sal",
  "fj fj fjfj fj jffj fjf jfj fjfj jf jf fj fj fjj ff jj ff jf fj fj",
  "qwer tyui asdf ghjk zxcv bnm, qaz wsx edc rfv tgb yhn ujm",
  "The quick brown fox jumps over the lazy dog. Five boxing wizards jump quickly."
];

export function getFingerIdForKey(key: string): string | null {
  const lowerKey = key.toLowerCase();
  const mapping = keyToFingerMap[lowerKey];
  if (!mapping) return null;
  return `${mapping.hand}-${mapping.finger}`;
}

export function getActiveFingers(key: string): string[] {
  const fingerId = getFingerIdForKey(key);
  return fingerId ? [fingerId] : [];
}

export function getKeyFingerColor(key: string): string {
  const lowerKey = key.toLowerCase();
  return keyToFingerMap[lowerKey]?.color || '';
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
