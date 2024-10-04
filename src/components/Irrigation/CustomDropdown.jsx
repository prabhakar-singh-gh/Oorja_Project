import React, { useState } from 'react';
const CustomDropdown = ({ options, selectedOption, setSelectedOption, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`border  py-2 px-4 md:px-2 md:py-1 xl:px-3 xl:py-0 flex justify-between md:gap-1 xl:gap-2 items-center cursor-pointer md:rounded-sm xl:rounded-lg 2xl:rounded-sm md:h-[3vh] xl:h-[4vh] 2xl:h-[3.5vh]  ${disabled ? ' cursor-not-allowed' : ''}`}// Added pr-10 for spacing
        onClick={toggleDropdown}
      >
        <span className={`text-left 2xl:w-[150px] md:w-[100px] xl:w-[160px]  overflow-hidden text-ellipsis whitespace-nowrap md:text-[9px] xl:text-[15px] 2xl:text-[14px]`}>
          {selectedOption || placeholder}
        </span>
        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-[2px] lg:mt-0 md:w-2 md:h-2 xl:h-3 xl:w-3'>
          <path d="M1 1L7.5 7L14 1" stroke="black" strokeLinecap="round" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute  z-10 bg-white border rounded shadow-lg mt-1 w-full  max-h-[200px] overflow-y-auto ">
          {options.map((option, index) => (
            <div
              key={index}
              className="md:py-1 md:px-2 md:text-[8px] xl:text-[14px] hover:bg-gray-200 cursor-pointer "
              onClick={() => handleOptionClick(option)}
            >
            {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
