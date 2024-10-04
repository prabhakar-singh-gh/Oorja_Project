import React, { useState, useRef } from 'react';
import { Switch } from '@headlessui/react'; 
import { Link } from 'react-router-dom';
import alertsvg from '../../assets/alertsvg.svg';
import userImage from '../../assets/userImage.svg';
import searchIcon from '../../assets/searchIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import dragIcon from '../../assets/dragIcon.svg';
import DeleteModal from './DeleteModal';
import farmImg1 from '../../assets/farmImg1.svg' //
import farmImg2 from '../../assets/farmImg2.svg' //

function DigitalAdvisor() {
  const [name] = useState('Abhinav');
  const [filter, setFilter] = useState('all');
  const [modules, setModules] = useState([
    { id: 0, title: 'Module 1', description: 'This is a description for Module 1. It contains important information.', published: true, image: farmImg1 },
    { id: 1, title: 'Module 2', description: 'This is a description for Module 2. It contains different important information.', published: false, image: farmImg2 },
  ]);
  console.log(modules)

  // New state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
console.log(uploaded , "UP")
  const handleDeleteClick = (id) => {
    setCurrentIndex(id); // Set the id of the card to be deleted
    setIsModalOpenDelete(true); // Open the modal
  };
  
  const confirmDelete = () => {
    const updatedCards = modules.filter((module) => module.id !== currentIndex); // Filter by id instead of index
    setModules(updatedCards); // Update the modules list by removing the selected module
    setIsModalOpenDelete(false); // Close the modal
    setCurrentIndex(null); // Clear the current id
  };
  
 
  const cancelDelete = () => {
    setIsModalOpenDelete(false); // Simply close the modal
    setCurrentIndex(null); // Clear the current index
  };
 

  const togglePublished = (id) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, published: !module.published } : module
    ));
  };

  const filteredModules = modules.filter(module => {
    if (filter === 'all') return true;
    if (filter === 'published') return module.published;
    if (filter === 'unpublished') return !module.published;
    return true;
  });

  // Modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setUploaded(false);
    setDescription('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleFile(file);
   
  };

  const handleFile = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
    if (file && validImageTypes.includes(file.type)) {
      setFile(URL.createObjectURL(file)); // Store file preview URL
    
      setUploaded(true);
    } else {
      setFile(null); // Clear file
      setUploaded(false);
     
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {

    if (!file || !description) {
        setError('Please upload a valid image file.');
        return; // Prevent saving if no valid image is uploaded
      }
    const newModule = {
      id: modules.length + 1,
      title: `Module ${modules.length + 1}`,
      description: description,
      published: false,
      image: file, // Default placeholder image
    };
    setModules([...modules, newModule]);
    closeModal();
    setFile(null);
   
  };

  return (
    <>
    <div className='h-screen bg-custom-gray'>
      <div>
        <nav className="bg-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[2vw]">Digital Advisor Modules</span>
          </div>
          <div className="flex items-center space-x-3 md:px-2 lg:px-6">
            <img src={alertsvg} alt='alert' className='w-[1.7vw] xl:mr-4' onClick={() => alert('Alert button clicked')} />
            <span className='font-semibold text-[1vw]'>{name}</span>
            <img src={userImage} alt='userImage' className='w-[2.2vw] rounded-full' onClick={() => console.log('Sign out button clicked')} />
          </div>
        </nav>
      </div>
      <div className='w-full bg-custom-gray px-6 xl:py-8 md:py-6 flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-6'>
            <button 
              onClick={() => setFilter('all')} 
              className={`text-[1vw] ${filter === 'all' ? 'inline-block border-b-2 border-custom-green  text-custom-green ' : 'text-text-color'}`}
            >
              All Modules
            </button>
            <button 
              onClick={() => setFilter('published')} 
              className={`text-[1vw] ${filter === 'published' ? 'inline-block border-b-2 border-custom-green  text-custom-green ' :  'text-text-color'}`}
            >
              Published
            </button>
            <button 
              onClick={() => setFilter('unpublished')} 
              className={`text-[1vw] ${filter === 'unpublished' ? 'inline-block border-b-2 border-custom-green  text-custom-green ' : 'text-text-color'}`}
            >
              Unpublished
            </button>
          </div>
          <div className='flex gap-7 items-center px-3'>
            <div>
              <img src={searchIcon} alt='searchIcon' className='w-5' />
            </div>
            <div className='flex gap-2 items-center'>
              <span className='text-[1vw]'>Version :</span>
              <select className="border border-gray-300 font-inter  rounded-md bg-white shadow-sm focus:outline-none xl:w-[7.3vw] xl:h-[4vh] lg:w-[8vw] lg:h-[3.5vh] md:w-[8.2vw] md:h-[3.3vh] text-[0.9vw] px-1">
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
              </select>
            </div>
            <div>
              <button 
                className='text-white bg-custom-black xl:w-[10.3vw] xl:h-[4.8vh] 2xl:h-[5.3vh] lg:w-[10vw] lg:h-[4.5vh] md:w-[10vw] md:h-[4vh] rounded-sm text-[0.9vw] '
                onClick={openModal}
              >
                Add New Module
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredModules.map((module) => (
         <div key={module.id} className="bg-white p-3 rounded-lg  border border-gray-300">
         <Link to={`/card-details/${module.id}`} 
           state={{ module }} 
         
         className="block">
{/* This block makes the card clickable */}
<div className="relative w-full h-48 mb-2 rounded-lg">
<img
  src={module.image}
  alt="Uploaded"
  className="absolute inset-0 w-full h-full object-cover rounded-md"
/>
</div>
<div className="h-12 overflow-hidden">
<p className=" line-clamp-2 lg:text-[1vw] md:text-[1.2vw]">
  {module.description}
</p>
</div>
</Link>
       
        <hr className="" /> {/* Line between description and status */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center justify-between space-x-2">
            <p className="text-custom-gray3 md:text-[1.2vw] lg:text-[0.8vw]">Status:</p>
            <Switch
              checked={module.published}
              onChange={() => togglePublished(module.id)}
              className={`${
                module.published ? 'bg-green-600' : 'bg-gray-300'
              } relative inline-flex items-center h-4 rounded-full w-7 transition-colors duration-300 ease-in-out`}
            >
              <span
                className={`${
                  module.published ? 'translate-x-3' : 'translate-x-[0.1vw]'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
              />
            </Switch>

            <p className="md:text-[1.2vw] lg:text-[0.8vw] ml-1 text-custom-gray2">
              {module.published ? '(Published)' : '(Unpublished)'}
            </p>
          </div>
          <button
            onClick={() => handleDeleteClick(module.id)}
            className="text-red-500 hover:text-red-700"
          >
          <img src={deleteIcon} alt='delete' className='w-[1.9vw] h-[2.4vh]'/>
          </button>
        </div>
      </div>
        ))}
      </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white xl:p-4 p-3 rounded-xl lg:w-[24vw] xl:w-[22vw] 2xl:w-[20vw] md:w-[28vw]">
            <div className='w-full flex justify-end'>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg className="w-5 h-5 text-black mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className='flex gap-2 items-center'>
                <span className='md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]'>Version :</span>
                <select className="border border-gray-200 rounded-md bg-white shadow-sm focus:outline-none w-[9vw] h-[3.2vh] lg:w-[7vw] lg:h-[3.7vh] md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-center border-2 border-dotted border-gray-600 p-4 rounded-lg h-[28vh] xl:mb-4 md:mb-2 bg-background-color2"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              {uploaded ? (
                <p className="text-green-500 text-[1vw]">Image uploaded</p>
              ) : (
                <>
                  <img src={dragIcon} alt="Drag icon" className="w-[2.3vw] h-[3.7vh]" />
                  <p className="text-text-color mb-2 text-[1vw]">Click to Upload or Drag & Drop</p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full h-[6vh] border border-gray-300 rounded-md p-2 focus:outline-none md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                placeholder="name The module"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="text-white rounded-sm w-[6vw] h-[5vh] text-[1vw] bg-custom-black"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

<DeleteModal
        isOpen={isModalOpenDelete}
        onClose={cancelDelete}
        onDelete={confirmDelete}
      />
      </div>
    </>
  );
}

export default DigitalAdvisor