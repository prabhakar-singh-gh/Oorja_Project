import React, { useState, useRef, useEffect } from 'react';
import addCoverPhoto from '../assets/addCoverPhoto.svg';
import saveBtn from '../assets/saveBtn.svg'
import cancelBtn from '../assets/cancelBtn.svg'
import edit from '../assets/edit.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import ExistingInputsModal from './ExistingInputsModal';
import axios from 'axios';

const EpisodeZeroState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNewClick = () => {
    setInputValue('');
    setEditIndex(null);
    setIsInputVisible(true);
    setIsDropdownOpen(false);
  };

  const handleExistingClick = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (!inputValue.trim()) {
      alert('Please enter the module name');
      return;
    }
    if (editIndex !== null) {
      const updatedList = [...inputList];
      updatedList[editIndex] = inputValue;
      setInputList(updatedList);
      setEditIndex(null);
    } else {
      setInputList([inputValue, ...inputList]);
    }
    setIsInputVisible(false);
    setInputValue('');
  };

  const handleCancelClick = () => {
    setIsInputVisible(false);
    setInputValue('');
    setEditIndex(null);
  };

  const handleEditClick = (index) => {
    setInputValue(inputList[index]);
    setEditIndex(index);
    setIsInputVisible(true);
  };

  const handleDeleteClick = (index) => {
    const updatedList = inputList.filter((_, i) => i !== index);
    setInputList(updatedList);
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index) => {
    if (draggedItem === null) return;

    const updatedList = [...inputList];
    const draggedElement = updatedList[draggedItem];

    updatedList.splice(draggedItem, 1);
    updatedList.splice(index, 0, draggedElement);

    setDraggedItem(index);
    setInputList(updatedList);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const shouldShowExplanatoryText = !isInputVisible && inputList.length === 0;

  return (
    <div className="xl:px-16 py-8 md:px-12  flex flex-col gap-4">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-white border border-dashed border-black rounded-lg flex gap-2 items-center justify-center md:w-[10vw] md:h-[5vh] lg:w-[9vw] lg:h-[5.5vh] xl:w-[7.2vw] xl:h-[4.8vh] 2xl:h-[5.2vh] 2xl:w-[6.5vw]"
        >
          <div className='flex gap-2 items-center'>
            <span className='text-sm md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1vw]'>Add</span>
            <img
              src={addCoverPhoto}
              alt="Add Icon"
              className='md:w-[1.8vw] lg:w-[1.6vw] xl:w-[1.3vw]' 
            />
          </div>
        </button>
        {shouldShowExplanatoryText && (
          <p className={`md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-text-color mt-2`}>
            You can choose to add a brand new episode or add an existing one which is in-use in another module
          </p>
        )}

        {isDropdownOpen && (
          <div className="absolute md:left-12 md:-mt-7 lg:left-16 lg:-mt-10 gap-[2px] md:w-[10] lg:w-[30] xl:w-[32] flex flex-col bg-white border border-gray-300 shadow-right-bottom rounded-md">
            <div
              onClick={handleNewClick}
              className="cursor-pointer px-2 mt-2 md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]"
            >
              New
            </div>
            <div
              onClick={handleExistingClick}
              className="cursor-pointer px-2 mb-2 md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]"
            >
              Existing
            </div>
          </div>
        )}
      </div>

      <div className='h-auto w-full  content '>
        {isInputVisible && (
          <div className="flex items-center md:p-1 md:my-1 xl:p-2 xl:my-2 gap-2 md:mb-2 lg:mb-4 border bg-white rounded-md">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add Title of the episode"
              className="  flex-1 outline-none md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]"
              ref={inputRef}
            />
            <button
              onClick={handleSaveClick}
              className=" text-white  py-1 rounded-md"
              
            >
             <img src={saveBtn} alt='saveBtn' className='w-[2vw] h-[3vh]'/>
            </button>
            <button
              onClick={handleCancelClick}
              className=" text-white px-2 py-1 rounded-md mr-3"
            >
              <img src={cancelBtn} alt='cancelBtn' className='w-[2vw] h-[3vh]'/>
            </button>
          </div>
        )}

        {inputList.map((input, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
            className={`border md:p-1 md:my-1 xl:p-2 xl:my-2 flex justify-between items-center group bg-white rounded-md transition-shadow duration-300 ${
                draggedItem === index ? 'shadow-lg' : ''
              }`}
              style={{
                boxShadow: draggedItem === index ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
              }}
          >
            <span className='md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]'>{input}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditClick(index)}
                className=" text-white py-1 rounded-md"
              >
                <img src={edit} alt='editBtn' className='w-[2vw] h-[3vh]'/>
              </button>
              <button
                onClick={() => handleDeleteClick(index)}
                className=" text-white rounded-md px-2 py-1 mr-3"
              >
                <img src={deleteIcon} alt='deleteBtn' className='w-[2vw] h-[3vh]'/>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ExistingInputsModal
          inputs={inputList}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default EpisodeZeroState;