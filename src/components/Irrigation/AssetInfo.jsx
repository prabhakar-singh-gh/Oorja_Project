import React , {useState} from 'react'
import greenLine from "../../assets/greenLine.svg";
import { Switch } from '@headlessui/react';






function AssetInfo({item}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Overall');

    const [isSoilTestEnabled, setIsSoilTestEnabled] = useState(true);
    const [isSeedOrderEnabled, setIsSeedOrderEnabled] = useState(false);

    const [isDuesOpen, setIsDuesOpen] = useState(false);
    const [selectedDuesOption, setSelectedDuesOption] = useState('Last 6 Month');
    const options = ['Option 1', 'Option 2', 'Option 3'];




// New function to toggle the switches


const toggleSwitch = (switchType) => {
  if (switchType === 'soilTest') {
    setIsSoilTestEnabled((prevState) => !prevState); // Toggle soilTest state
  } else if (switchType === 'seedOrder') {
    setIsSeedOrderEnabled((prevState) => !prevState); // Toggle seedOrder state
  }
};

  
   
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false); // Close the dropdown after selecting
    };

 
  
    const duesOptions = ['Option 1', 'Option 2', 'Option 3'];
  
    const toggleDuesDropdown = () => setIsDuesOpen(!isDuesOpen);
  
    const handleDuesOptionClick = (option) => {
      setSelectedDuesOption(option);
      setIsDuesOpen(false); // Close the dropdown after selecting
    };










  return (
    <div>


<div className=" pl-4 pt-3 pr-6 2xl:pl-7 2xl:pt-4 2xl:pr-12">
  <div className="w-full h-full bg-gray-100">
  
       <div className='w-full flex md:gap-2 xl:gap-4 2xl:gap-0'>
        <div className='w-1/2  '>
           <div className='w-full  flex 1920px:justify-between 1920px:pr-6 xl:gap-4 md:gap-2'>
           
           <div className="flex    2xl:w-[18vw] w-[20vw] p-4 md:p-1 lg:p-3 xl:p-4 2xl:p-3 bg-white rounded-xl">
                  <div className="rounded-xl">
                    <img
                      src={greenLine}
                      alt="greenLine"
                      className=" md:w-[5px] 2xl:w-[6px] object-cover rounded-xl"
                      style={{ minHeight: "100%" }}
                    />
                  </div>


            <div className='w-full h-full  flex flex-col xl:gap-3 md:gap-5'>
                <div className='flex justify-between relative xl:pl-3 md:pl-1'>
                <span className=' xl:text-[14px] md:text-[8px] font-inter md:mt-1 lg:mt-0' >Total Revenue</span>
                <div className="relative inline-block xl:w-[100px] h-[20px] md:h-[10px] md:w-[50px]">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border text-left mt-[1px] px-2 py-[1px] rounded-sm flex items-center justify-between focus:outline-none"
      >
        <span className='xl:text-[10px] md:text-[8px]'>{selectedOption}</span>
        <svg className="ml-2" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.5L5 4.5L1 0.5" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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
 

            </div>
            <p className=' xl:pl-3 md:pl-1 xl:text-[18px] md:text-[10px] font-inter text-custom-green font-semibold'>  ₹ 1,00,000.00</p>
            </div>

              
                </div>


                <div className="flex   2xl:w-[18vw] w-[20vw] p-4 md:p-1 lg:p-3 xl:p-4 2xl:p-3 bg-white rounded-xl">
                  <div className="rounded-xl">
                    <img
                      src={greenLine}
                      alt="greenLine"
                      className=" md:w-[5px] 2xl:w-[6px] object-cover rounded-xl"
                      style={{ minHeight: "100%" }}
                    />
                  </div>


            <div className='w-full h-full  flex flex-col xl:gap-3 md:gap-5'>
                <div className='flex justify-between relative xl:pl-3 md:pl-1'>
                <span className=' xl:text-[14px] md:text-[8px] font-inter md:mt-1 lg:mt-0' >Pending Dues</span>
                <div className="relative inline-block xl:w-[100px] h-[20px] md:h-[12px] md:w-[60px]">
  {/* Dropdown Trigger */}
  <button
    onClick={toggleDuesDropdown}
    className="w-full bg-white border text-left mt-[1px] xl:px-2 py-[1px] rounded-sm flex items-center justify-between focus:outline-none"
  >
    <span className="xl:text-[10px] md:text-[7px]">{selectedDuesOption}</span>
    <svg className="ml-2 md:w-2 md:h-2" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 0.5L5 4.5L1 0.5" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>

  {/* Dropdown Menu */}
  {isDuesOpen && (
    <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
      {duesOptions.map((option, index) => (
        <div
          key={index}
          onClick={() => handleDuesOptionClick(option)}
          className="px-2 py-[2px] cursor-pointer hover:bg-gray-100 xl:text-[10px] md:text-[7px] text-sm truncate"
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>
 

            </div>
            <p className=' xl:pl-3 md:pl-1 xl:text-[18px] md:text-[10px] font-inter text-custom-green font-semibold'>  ₹ 20,000.00</p>
            </div>

              
                </div>


           
           

           </div>
           <div className='w-full mt-3  justify-between flex items-end  2xl:pr-5'>
           <div className="flex bg-white  rounded-lg items-center justify-between  mt-3 w-full px-3 xl:py-3 md:py-1 lg:py-2 ">
  {/* First 50% section */}
  <div className="flex items-center ">
      {/* Soil Test Switch */}
      <div className="flex items-center">
        <span className="md:text-[9px] xl:text-[12px] font-inter">Soil Test</span>
        <Switch
          checked={isSoilTestEnabled}
          onChange={() => toggleSwitch('soilTest')} // Use the new toggleSwitch function
          className={`${
            isSoilTestEnabled ? 'bg-[#48A244]' : 'bg-gray-200'
          } relative inline-flex items-center rounded-full xl:w-[38px] xl:h-[22px] lg:w-[30px] lg:h-[18px]  md:w-[27px] md:h-[17px] lg:ml-2 md:ml-2 transition-colors`}>
          <span
            className={`${
              isSoilTestEnabled ? 'xl:translate-x-[17px] md:translate-x-[14px]' : 'xl:translate-x-[3px]  md:translate-x-[1px]'
            } inline-block xl:w-[19px] xl:h-[18px] md:w-[14px] md:h-[14px] transform bg-white rounded-full transition-transform `}
          />
        </Switch>
      </div>

      {/* Seed Order Switch */}
      <div className="flex items-center xl:px-12 lg:px-5 md:ml-2 ">
        <span className="md:text-[9px] xl:text-[12px] md:w-16 xl:w-20 font-inter">Seed Service</span>
        <Switch
          checked={isSeedOrderEnabled}
          onChange={() => toggleSwitch('seedOrder')} // Use the new toggleSwitch function
          className={`${
            isSeedOrderEnabled ? 'bg-[#48A244]' : 'bg-gray-200'
          } relative inline-flex items-center rounded-full xl:w-[38px] xl:h-[22px] lg:w-[30px] lg:h-[18px]  md:w-[27px] md:h-[17px] lg:ml-2 transition-colors `}>
          <span
            className={`${
              isSeedOrderEnabled ?'xl:translate-x-[17px] md:translate-x-[14px]' : 'xl:translate-x-[3px]  md:translate-x-[1px]'
            } inline-block xl:w-[19px] xl:h-[18px] md:w-[14px] md:h-[14px]  transform bg-white rounded-full transition-transform `}
          />
        </Switch>
      </div>
    </div>

  {/* Second 50% section */}
  <div className="w-1/3 flex justify-end">
    <span className="text-xs md:text-[9px] xl:text-[12px] text-custom-green font-inter text-right">Edit Other Feature</span>
  </div>
</div>


           </div>
        </div>
      
      
      
      
        <div className="w-1/2 border border-[#C6F8C3] lg:p-4 md:p-2 flex flex-col gap-4 bg-[#e6f6e6] md:rounded-[13px] xl:rounded-[12px]">
  
         <div className='w-full flex xl:mt-3 md:gap-0 lg:gap-0'>
              <div className=' w-1/2'>
                <span className='text-custom-green font-inter  md:text-[6px] lg:text-[7px] xl:text-[12px]'>Advisor</span>
                <p className='md:text-[7px] lg:text-[8px] font-inter xl:text-[14px]'>{item.operator?.name} | {item.operator.phone}</p>
              </div>
              <div className=' w-1/2'>
                <span className='text-custom-green font-inter  md:text-[6px] lg:text-[7px] xl:text-[12px]'>Operator</span>
                <p className='md:text-[7px]  lg:text-[8px] font-inter xl:text-[14px]'>{item.operator?.name} | {item.operator.phone}</p>
              </div>
         </div>
         <div className=' w-full flex '>
              <div className='w-1/2'>
                <span className='text-custom-green font-inter md:text-[6px] lg:text-[7px] xl:text-[12px]'>Location</span>
                <p className='md:text-[7px] font-inter lg:text-[8px] xl:text-[14px]'>{item.location?.district} , {item.location?.state}</p>
              </div>
              <div className='w-1/2'>
                <span className='text-custom-green font-inter md:text-[6px] lg:text-[7px] xl:text-[12px]'>Asset Rate</span>
                <p className='md:text-[7px] font-inter lg:text-[8px]  xl:text-[14px]'> ₹ {item.rate}/m³ </p>
              </div>
         </div>
        
 


         </div>

       </div>
  </div>
</div>

    </div>
  )
}

export default AssetInfo