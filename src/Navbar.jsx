import React from 'react';
import alertsvg from './assets/alertsvg.svg'
import logOutBtn from './assets/logOutBtn.svg'

const Navbar = () => {
  return (
    <nav className="bg-white p-3 flex justify-between items-center">
    
      <div className="flex items-center space-x-2">
        <span   role="img" 
        aria-label="wave" 
        className="text-[2vw] wave-animation">👋</span>
        <span className="text-[1.7vw] font-inter" style={{fontWeight:"500"}}>Hello there!</span>
      </div>
      
    
      <div className="flex items-center space-x-3 px-7">
        <img src={alertsvg}  alt='alert' className='w-[2vw]'
          onClick={() => alert('Alert button clicked')} 
         
        />
         
        <img src={logOutBtn} alt='logOut' className='w-[7vw]'
          onClick={() => console.log('Sign out button clicked')} 
          
        />
         
      </div>
    </nav>
  );
};

export default Navbar;
