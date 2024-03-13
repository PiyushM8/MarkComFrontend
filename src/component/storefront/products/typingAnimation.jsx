import React, { useState, useEffect } from 'react';

const TypingAnimation = ({text}) => {
  const [typedText, setTypedText] = useState('');
  const [typingForward, setTypingForward] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (typingForward) {
        if (charIndex < text.length) {
          setTypedText(prevText => prevText + text.charAt(charIndex));
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          setTypingForward(false);
          setCharIndex(prevIndex => prevIndex - 1);
        }
      } else {
        if (charIndex > 0) {
            setTypedText(prevText => prevText.slice(0, -1));
            setCharIndex(prevIndex => prevIndex - 1);
        } else {
            setTypingForward(true);
            setCharIndex(prevIndex => prevIndex + 1);
        }
      }
      console.log(charIndex)
    }, 200); // Typing speed

    // Cleanup function to clear interval
    return () => clearInterval(typingInterval);
  }, [charIndex, typingForward]);

  return (
    <h1>
      Welcome to {typedText}
    </h1>
  );
};

export default TypingAnimation;