import React, { useState } from 'react'
import alertsvg from "../../assets/alertsvg.svg";
import userImage from "../../assets/userImage.svg";
function IrrigationNavBar() {

    const [name , setName] = useState("Abhinav")
  return (
   <div>

<nav className="bg-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[2vw]">Irrigation</span>
          </div>
          <div className="flex items-center space-x-3 md:px-2 lg:px-6">
            <img src={alertsvg} alt='alert' className='w-[1.7vw] xl:mr-4' onClick={() => alert('Alert button clicked')} />
            <span className='font-semibold text-[1vw]'>{name}</span>
            <img src={userImage} alt='userImage' className='w-[2.2vw] rounded-full' onClick={() => console.log('Sign out button clicked')} />
          </div>
        </nav>
   </div>
  )
}

export default IrrigationNavBar