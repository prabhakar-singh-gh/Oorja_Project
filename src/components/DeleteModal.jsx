import React from 'react';
import { Dialog } from '@headlessui/react'; // Import Dialog from Headless UI
import deleteIcon from '../assets/deleteIcon.svg'; // Replace with your delete icon path

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
      <div className="bg-white p-4 sm:p-4 lg:p-8 rounded-lg shadow-lg z-10 md:w-[30vw] lg:w-[26vw] xl:w-[23vw] 2xl:w-[22vw]">
        <div className="flex flex-col items-center">
          <div className='bg-red-50 rounded-full flex items-center justify-center xl:h-[4.3vh] xl:w-[2.5vw] py-4 md:w-[3.5vw] md:h-[2vh] lg:w-[3vw] lg:h-[2vh] 2xl:h-[5vh] 2xl:w-[2.5vw] '> <img src={deleteIcon} alt="delete" className="w-[2.2vw] h-[2.5vh] mb-4 mt-3 " /></div>
         
          <p className="lg:text-[2vw] md:text-[1.9vw] font-semibold mb-1 text-center">Are you sure?</p>
          <p className="text-text-color 2xl:mb-5 xl:mb-4 lg:mb-3 md:mb-3 text-center md:text-[1.2vw] lg:text-[0.9vw] xl:text-[0.9vw] 2xl:text-[0.8vw]">Are you sure you want to delete this module</p>
          <div className="flex flex-col sm:flex-row gap-2">
           
            <button
              onClick={onClose}
              className="bg-white lg:text-[0.9vw] md:text-[1.1vw]  border border-gray-500 xl:px-3 xl:py-2 rounded-sm  w-[8.3vw] lg:w-[8.8vw] xl:w-[8.5vw] h-[4vh] lg:h-[4.5vh]  xl:h-[4.6vh] 2xl:h-[5vh] "
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="bg-custom-black lg:text-[0.9vw] md:text-[1.1vw] text-white  border border-gray-500 xl:px-3 xl:py-2 rounded-sm hover:bg-custom-black w-[8.3vw] lg:w-[8.8vw] xl:w-[8.5vw] h-[4vh] lg:h-[4.5vh] xl:h-[4.6vh] 2xl:h-[5vh]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
