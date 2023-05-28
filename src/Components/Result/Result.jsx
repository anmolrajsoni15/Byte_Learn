import React, { useEffect, useRef, useState } from 'react';
import './Result.css';

function ResultPage() {
  const [message, setMessage] = useState('');
  const backColor = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams.get('message'));
    setMessage(queryParams.get('message'));
  }, []);

  const isCorrect = message === 'Correct! You sorted the numbers correctly.';
  useEffect(() => {
    backColor.current.style.backgroundColor = isCorrect ? '#d3febd' : '#ffbbbb';
  }, [isCorrect]);

  function resetGame() {
    window.location.href = '/';
  }

  return (
    <div className="body" ref={backColor}>
      <div className="container">
        <h1 className='head'>Result</h1>
        <div>
          {isCorrect ? (
            <div className="correct">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <circle
                  className="path circle"
                  fill="none"
                  stroke="#73AF55"
                  strokeWidth="6"
                  strokeMiterlimit="10"
                  cx="65.1"
                  cy="65.1"
                  r="62.1"
                />
                <polyline
                  className="path check"
                  fill="none"
                  stroke="#73AF55"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  points="100.2,40.2 51.5,88.8 29.8,67.5 "
                />
              </svg>
              <p className="result-message">
                {message}
              </p>
            </div>
          ) : (
            <div className="wrong">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <circle
                  className="path circle"
                  fill="none"
                  stroke="#d33333"
                  strokeWidth="6"
                  strokeMiterlimit="10"
                  cx="65.1"
                  cy="65.1"
                  r="62.1"
                />
                <line
                  className="path line"
                  fill="none"
                  stroke="#d33333"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  x1="34.4"
                  y1="37.9"
                  x2="95.8"
                  y2="92.3"
                />
                <line
                  className="path line"
                  fill="none"
                  stroke="#d33333"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  x1="95.8"
                  y1="38"
                  x2="34.4"
                  y2="92.2"
                />
              </svg>
              <p className="result-message">{message}</p>
            </div>
          )}
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
