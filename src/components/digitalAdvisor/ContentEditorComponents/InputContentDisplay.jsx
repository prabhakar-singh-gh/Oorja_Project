import React, { useState, useRef, useEffect } from 'react';

const InputContentDisplay = ({ selectedContent, handleSave }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
console.log(inputValue)


  // Detects clicks outside the input field and triggers save
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleSave(inputValue);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue, handleSave]);

  // Render input based on selected content
  if (selectedContent === 'Heading') {
    return (
      <div ref={inputRef} className="mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border xl:p-5 md:p-3 w-full xl:rounded-[12px] md:rounded-[9px] outline-none"
          placeholder="Add Heading"
        />
      </div>
    );
  }

  // Add other content types here based on selectedContent
  return null;
};

export default InputContentDisplay;
