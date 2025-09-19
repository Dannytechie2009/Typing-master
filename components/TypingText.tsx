import React from 'react';

interface TypingTextProps {
  text: string;
  userInput: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, userInput }) => {
  return (
    <div className="text-left select-none">
      {text.split('').map((char, index) => {
        let color = 'text-slate-500';
        const isCurrent = index === userInput.length;
        const isTyped = index < userInput.length;

        if (isCurrent) {
          color = 'text-cyan-300 animate-pulse';
        } else if (isTyped) {
          color = char === userInput[index] ? 'text-green-400' : 'text-red-500 bg-red-900/50';
        }

        return (
          <span key={index} className={`${color} ${isCurrent ? 'border-b-2 border-cyan-300' : ''}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(TypingText);
