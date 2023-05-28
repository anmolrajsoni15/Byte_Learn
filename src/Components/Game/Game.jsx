import React, { useEffect, useState, useRef } from "react";
import "./Game.css";
import { useNavigate } from "react-router-dom";

function Game() {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [options, setOptions] = useState([]);

  const navigate = useNavigate();

  const inputFieldsRef = useRef([]);
  const checkButtonRef = useRef(null);
  const optionsContainerRef = useRef(null);

  useEffect(() => {
    initializeGame();
  },[]);

  function generateOptions() {
    const newOptions = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 500) + 1;
      newOptions.push(randomNumber);
    }
    setOptions(newOptions);
  }

  function addInputDragEvents() {
    inputFieldsRef.current.forEach((input) => {
      input.draggable = true;
      input.ondragstart = handleInputDragStart;
    });
  }

  function initializeGame() {
    setInputValues(["", "", "", "", ""]);
    generateOptions();
    checkButtonRef.current.disabled = true;
    addInputDragEvents();
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.value);
  }

  function handleInputDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.value);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const draggedValue = event.dataTransfer.getData('text/plain');
    const target = event.target.closest('.input-container input');
    if (target && target.value !== draggedValue) {
      const previousInput = inputFieldsRef.current.find(
        (input) => input.value === draggedValue
      );
  
      if (previousInput && previousInput !== target) {
        previousInput.value = '';
        previousInput.style.borderColor = '';
      }
      target.value = draggedValue;
      event.dataTransfer.clearData();
      target.style.borderColor = '#0070ff';
      target.style.boxShadow =
        'rgb(0 112 255 / 53%) 0px 0px 14px 2px, rgb(29 55 72 / 63%) 0px 0px 7px 3px inset';
      target.style.backgroundColor = 'rgb(230 244 247)';
  
      const droppedOption = optionsContainerRef.current.querySelector(
        `.option[data-value="${draggedValue}"]`
      );
      if (droppedOption) {
        optionsContainerRef.current.removeChild(droppedOption);
      }
  
      checkButtonRef.current.disabled =
        inputFieldsRef.current.filter((input) => input.value !== '').length !==
        inputFieldsRef.current.length;
      checkButtonRef.current.classList.toggle(
        'enabled',
        !checkButtonRef.current.disabled
      );

      const newInputValues = inputFieldsRef.current.map((input) => input.value);
      setInputValues(newInputValues);
    }
  }

  function checkAnswer() {
    const values = inputValues.map((value) => parseInt(value) || 0);
    const sortedValues = values.slice().sort((a, b) => a - b);
    console.log(values, sortedValues);
    const resultMessage =
      JSON.stringify(values) === JSON.stringify(sortedValues)
        ? "Correct! You sorted the numbers correctly."
        : "Wrong! Please try again.";

    navigate(`/result?message=${resultMessage}`);
  }

  function handleInputChange(event, index) {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  }

  return (
    <div className="Container">
      <h1>Arrange the numbers in ascending order</h1>
      <div className="input-container">
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            placeholder="Drop"
            readOnly
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onChange={(event) => handleInputChange(event, index)}
            ref={(el) => (inputFieldsRef.current[index] = el)}
          />
        ))}
      </div>
      <div className="options-container" ref={optionsContainerRef}>
        {options.map((option, index) => (
          <div
            key={index}
            className="option"
            draggable="true"
            onDragStart={handleDragStart}
            data-value={option}
          >
            {option}
          </div>
        ))}
      </div>
      <button
        className={`check-button ${
          inputValues.filter((value) => value === "").length === 0 && "enabled"
        }`}
        onClick={checkAnswer}
        ref={checkButtonRef}
      >
        Check Answer
      </button>
    </div>
  );
}

export default Game;
