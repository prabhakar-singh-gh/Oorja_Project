import React, { useState, useRef } from 'react';
import addCoverPhoto from '../assets/addCoverPhoto.svg'
import edit from '../assets/edit.svg'
import backIcon from '../assets/backIcon.svg'
import EpisodeZeroState from './EpisodeZeroState';
import searchIcon from '../assets/searchIcon.svg'; 
import cancelBtn from '../assets/cancelBtn.svg'; // Update the path as needed

import { useParams, useLocation, Link } from 'react-router-dom';
function Episode() {

    const { id } = useParams(); // Get the id from URL parameters
  const location = useLocation();
  const { module } = location.state || {};

 
 
  const [backgroundImage, setBackgroundImage] = useState(''); // State to store background image URL
  const fileInputRef = useRef(null); // Ref for the file input
  const divRef = useRef(null); // Ref for the target div
  const [imageUploaded, setImageUploaded] = useState(false);
  

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchIconClick = () => {
    setIsSearchVisible(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCancelClick = () => {
    setSearchTerm('');
    setIsSearchVisible(false);
  };


  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result); // Set background image URL
        if (divRef.current) {
          divRef.current.style.backgroundImage = `url(${reader.result})`;
          setImageUploaded(true); // Update background image directly
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  
  return (
    <>
    <div className='flex flex-col w-full min-h-screen bg-background-color'>
        <div className='w-full flex'>
        <div className='relative w-4/12 h-[23vh] bg-white p-[1%]'>
        <div className='p-4'>

  <div className='flex items-start'>
   <div ><Link to={'/contact'}><img src={backIcon} alt='backBtn' className='min-h-[3.5vh] min-w-[2vw] mr-[1vh] cursor-pointer'  /></Link></div>
    
    
   
    <div className='flex flex-col justify-between h-full gap-8'>
     
    <div > <span className='lg:text-[2.6vh] md:text-[2.5vh] font-inter font-semibold lg:py-1'>Episode(s)</span>
      <p className='font-inter lg:text-[2vh] md:text-[1.7vh] line-clamp-1'>{module.description}</p>
      </div>
      <div className='flex flex-col xl:flex-row absolute bottom-5 gap-1 xl:gap-[1.5vw] lg:gap-1 xl:items-center mt-[1vh]'>
        <div className='flex gap-[1vh] items-center'>
          <span className=' md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]'>Version :</span>
          <select className="border border-gray-200 rounded-md font-inter px-1 bg-white shadow-sm focus:outline-none 2xl:w-[7.3vw] 2xl:h-[4vh] xl:w-[7.3vw] xl:h-[3.5vh] lg:w-[8vw] lg:h-[3.5vh] md:w-[8.2vw] md:h-[3.3vh] md:text-[1.5vh] lg:text-[1.5vh] ">
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </div>
        <div className="relative">
      {!isSearchVisible && (
        <div>
          <img
            src={searchIcon}
            alt='Search Icon'
            className='w-4 h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 md:mt-[2px] lg:mt-0 cursor-pointer'
            onClick={handleSearchIconClick}
          />
        </div>
      )}
      {isSearchVisible && (
        <div className="relative w-full ">
          <input
            type="text"
            placeholder="Search for episodes"
            value={searchTerm}
            onChange={handleInputChange}
            className="border outline-none p-1 pl-8 lg:pl-8  rounded-md w-full text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[0.8vw] h-8 md:h-6 lg:h-6 xl:h-8 2xl:h-7"
          />
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 md:mt-[2px] lg:mt-[2px] xl:mt-0"
          />
          {searchTerm && (
            <button
              onClick={handleCancelClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 "
            >
              <img
                src={cancelBtn}
                alt="Cancel"
                className="w-4 h-4 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 md:mt-[3px] lg:mt-1 xl:mt-0"
              />
            </button>
          )}
        </div>
      )}
    </div>
      </div>
    </div>
  </div>
</div>

  </div>

            <div  className='relative w-8/12 h-[23vh] bg-white group' ref={divRef}style={{ 
        backgroundImage: `linear-gradient(to right, white, transparent), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat:'no-repeat'
      }}>
     {!imageUploaded && (
            <button
              className='absolute bottom-5 right-12 bg-white border border-gray-300 lg:p-3 md:h-[5vh] lg:h-[4.5vh] 2xl:h-[5vh] p-2 rounded-full flex justify-between items-center md:gap-2 lg:gap-2'
              onClick={handleButtonClick}
            >
              <img src={addCoverPhoto} alt="icon" className='md:w-[2vw] lg:w-[18px]' />
              <label className='font-bold md:text-[1.4vw] lg:text-[12px] md:mb-[1px] lg:mb-0'>Add Cover Photo</label>
            </button>
          )}
          {imageUploaded && (
            <button
              className='absolute bottom-5 right-12 bg-white border border-gray-300 lg:p-3 md:h-[5vh] lg:h-[5vh] p-2 rounded-full flex justify-between items-center md:gap-2 lg:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              onClick={handleButtonClick}
            >
              <img src={edit} alt="icon" className='md:w-[2vw] lg:w-[18px]' />
              <label className='font-bold md:text-[1.4vw] lg:text-[12px] md:mb-[1px] lg:mb-0'>Change the Cover Photo</label>
            </button>
          )}

  
  <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
</div>

        </div>
       <EpisodeZeroState/>

    </div>
    
    </>
  )
}

export default Episode