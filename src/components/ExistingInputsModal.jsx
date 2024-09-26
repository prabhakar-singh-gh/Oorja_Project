import React, { useState } from 'react';
import crossBtn from '../assets/crossBtn.svg';
import searchIcon from '../assets/searchIcon.svg'; // Import your search icon here

const ExistingInputsModal = ({ inputs, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredInputs = inputs.filter(input =>
    input.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="relative w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
            <input
              type="text"
              placeholder="Search for episodes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border outline-none p-1 pl-10 lg:pl-12 pr-4 rounded-md w-full text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[0.8vw] h-8 md:h-8 lg:h-9 xl:h-9 2xl:h-10"
            />
            <img
              src={searchIcon}
              alt="Search"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
            />
          </div>
          <button onClick={onClose} className="text-red-500 mt-2 md:mt-0 md:ml-4">
            <img src={crossBtn} alt="Cancel" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7" />
          </button>
        </div>
        <div>
          {filteredInputs.length > 0 ? (
            filteredInputs.map((input, index) => (
              <div key={index} className="border p-2 my-2 bg-white rounded-md text-sm md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1vw]">
                {input}
              </div>
            ))
          ) : (
            <p className="ttext-sm md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1vw]">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExistingInputsModal;
