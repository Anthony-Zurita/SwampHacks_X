// an LLM was used to help generate this component that generates random letters for practice with a timer

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const LetterPractice = () => {
//below are the hooks to manage the different states of the practice component
  const [currentLetter, setCurrentLetter] = useState('');
  const [timeLeft, setTimeLeft] = useState(7);
  const [isActive, setIsActive] = useState(false);

// getRandomLetter is a helper function to get a random letter from the alphabet
  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

// the togglePractice function is used to flip between starting and stopping the practice session
  const togglePractice = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setCurrentLetter(getRandomLetter());
      setTimeLeft(7);
    }
  };

 // the useEffect hook is used to manage/update the timer and letter changes
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setCurrentLetter(getRandomLetter());
            return 7;
          }
          return time - 1;
        });
      }, 700);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

// below is the card component that houses the current letter, timer, and start/stop button
// it uses the hooks from before to update the condition data and display it
  return (
    <Card className="text-center">
      <Card.Body className="p-4">
        <h2 className="mb-4">ASL Letter Practice</h2>
        
        {isActive && (
          <div className="my-4">
            <div style={{ fontSize: '5rem', fontWeight: 'bold', padding: '2rem 0' }}>
              {currentLetter}
            </div>
            <div style={{ fontSize: '1.25rem' }}>Time remaining: {timeLeft}s</div>
          </div>
        )}

        <button
          onClick={togglePractice}
          className={`btn ${isActive ? 'btn-danger' : 'btn-primary'} btn-lg mt-3`}
        >
          {isActive ? 'Stop Practice' : 'Start Practice'}
        </button>

        {!isActive && (
          <p className="text-muted mt-3">
            Click Start Practice to begin. Each letter will be shown for 7 seconds.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default LetterPractice;