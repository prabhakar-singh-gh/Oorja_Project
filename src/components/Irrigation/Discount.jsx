import React , {useState} from 'react'
import deleteIcon from '../../assets/deleteIcon.svg'

function Discount() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [selectedOption, setSelectedOption] = useState('Members');
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown after selecting
      };
      const [isOpen1, setIsOpen1] = useState(false);
      const toggleDropdown1 = () => setIsOpen1(!isOpen1);
      const [selectedOption1, setSelectedOption1] = useState('All');
      const options1 = ['Option 1', 'Option 2', 'Option 3'];
      const handleOptionClick1 = (option) => {
          setSelectedOption1(option);
          setIsOpen1(false); // Close the dropdown after selecting
        };
  
  return (
    <>
    <p className=' mt-10  mb-2'>Discount</p>
    <div className='w-full  py-4 bg-white xl:rounded-[8px] md:rounded-[5px] xl:px-5 md:px-3'>
  <div className="flex items-center  justify-between">
      {/* Input with % */}
      <div className="flex items-center ">
        <span className='font-semibold'>1.</span>
        <input type="number" className="w-10 h-11 p-1 outline-none border rounded ml-2 pl-3 text-[12px]  custom-number-input" placeholder="% " />
        <span className="ml-2 font-semibold">%</span>
      </div>

      {/* Custom dropdown */}
      <div className='flex gap-3 xl:mr-28 '>
        <span className='md:text-[11px] xl:text-[15px] font-semibold'>For</span>
      <div className="relative inline-block  ">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className=" bg-white border xl:w-[150px] xl:h-[25px] text-left mt-[1px] px-2 py-[1px] rounded-sm flex items-center justify-between focus:outline-none"
      >
        <span className='xl:text-[12px] md:text-[10px]'>{selectedOption}</span>
        <svg className="ml-2" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.5L5 4.5L1 0.5" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-[130px] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-2 py-1 cursor-pointer hover:bg-gray-100 xl:text-[10px] md:text-[8px]"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>


   {/* 2nd Dropdown */}
   <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown1}
        className=" bg-white border xl:w-[150px] xl:h-[25px] text-left mt-[1px] px-2 py-[1px] rounded-sm flex items-center justify-between focus:outline-none"
      >
        <span className='xl:text-[12px] md:text-[10px]'>{selectedOption1}</span>
        <svg className="ml-2" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.5L5 4.5L1 0.5" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen1 && (
        <div className="absolute left-0 w-[130px] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options1.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick1(option)}
              className="px-2 py-1 cursor-pointer hover:bg-gray-100 xl:text-[10px] md:text-[8px]"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>

    </div>
      {/* Duration with time inputs */}
      <div className="flex items-center xl:space-x-3 space-x-1">
        <span className='md:text-[10px] xl:text-[12px] font-inter'>Duration</span>
        <div className='border border-custom-border flex items-center rounded-sm xl:p-2 p-1 xl:gap-4'>
       <span className='text-text-color md:text-[10px] xl:text-[12px]'>11/06/24, 11:15</span>
        <span><svg  className='md:w-4 md:h-4 xl:w-6 xl:h-6' width="28" height="24" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.291 24L21.291 16L13.291 8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
        <span className='text-text-color md:text-[10px] xl:text-[12px]'>11/06/24, 11:15</span>
        </div>

        <img src={deleteIcon} className='xl:w-5 xl:h-5 md:w-3 md:h-3'/>
       
      </div>
    </div>

    </div>
    </>
  )
}

export default Discount