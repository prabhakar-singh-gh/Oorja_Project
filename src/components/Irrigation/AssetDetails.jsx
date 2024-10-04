import React , {useState} from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import edit from '../../assets/edit.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import backIcon from '../../assets/backIcon.svg'
import AssetInfo from './AssetInfo';
import viewCalander from '../../assets/viewCalander.svg'
import closeCalender from '../../assets/closeClander.svg'
import ViewCalendar from './ViewCalender';
import Discount from './Discount';


function AssetDetails() {

  const navigate = useNavigate()
    const data = useLocation();

    const { item } = data.state || {};
    console.log(item , "Data Received");
    


    const [currentImage, setCurrentImage] = useState(viewCalander);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  

  const handleImageClick = () => {
    // Toggle between the two images
    setCurrentImage(currentImage === viewCalander ? closeCalender : viewCalander);
    setIsCalendarOpen(!isCalendarOpen);
  };


 const handleBack = ()=>{
    navigate('/irrigation')
 }


  return (
   <>
   
   <div>

<nav className="bg-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 px-3">
            <img src={backIcon} alt='backBtn' className='xl:w-6 xl:h-6 md:w-4 md:h-4 mt-[2px] cursor-pointer' onClick={ handleBack}/>
            <span className="font-semibold text-[1.6vw]">Asset Details {` > ${item.id} `}</span>
          </div>
          <div className="flex items-center gap-6  pr-10">
            <div className='flex gap-2 text-[12px]'> 
                <img src={edit} alt='edit' className='w-[1vw] ' onClick={() => alert('Alert button clicked')} /><span>Edit Details</span>
                </div>
           <div className='flex text-[12px] gap-1'>
           <span className='font-semibold text-[1vw]'></span>
           <img src={deleteIcon} alt='userImage' className='w-[1vw] ' onClick={() => console.log('Sign out button clicked')} /><span>Delete Pump</span>
           </div>
           
          </div>
        </nav>

     <AssetInfo item={item}/>
   
    <div className='w-full  h pl-4 pt-3 pr-6 2xl:pl-7 2xl:pt-4 2xl:pr-12 mt-4'>
    <h2 className='md:text-[13px] xl:text-[16px] font-inter' style={{fontWeight:"600"}}>Asset Schedule</h2>
    <div className={`w-full xl:py-3 md:py-2 border flex mt-3 justify-between bg-white ${isCalendarOpen ? 'xl:rounded-t-[14px] xl:rounded-b-none md:rounded-t-[10px] md:rounded-b-none' : 'xl:rounded-[14px] md:rounded-[10px]'}`}>

        <div className='flex items-center pl-2 gap-3 xl:gap-5 '>
            <span className={`${item.status === 'Active' ? "bg-green-100" : 'bg-custom-gray1'} border-none xl:w-32 md:w-20 text-[9px] xl:py-1 md:py-[2px] xl:text-[14px] rounded-[26px] text-center border`}>{item.status === 'Active' ? "Active" : 'Idle'}</span>
            <button className='border border-text-color text-[8px]  xl:text-[11px] font-inter rounded-[4px] px-2 xl:py-1 md:py-[1px] '>Book a Session</button>
        </div>
        <div className='flex justify-center items-center'>
        <svg className='xl:h-8 h-6' width="2" height="48" viewBox="0 0 2 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.833984" y1="2.18558e-08" x2="0.833982" y2="48" stroke="#9D9D9D"/>
</svg>

        </div>
        <div>
          <span className=' text-[9px]  xl:text-[14px]'>Upcoming {`<>`}</span>
          <span className=' text-[9px]  xl:text-[14px]'>{item.operator?.name}</span>
        </div>
        <div class="flex items-center  xl:gap-7 md:gap-3">
  <div>
    <p className=" text-text-color md:text-[9px] xl:text-[11px]">From</p>
    <p className=' md:text-[9px] xl:text-[11px]'>11/06/24, 11:15</p>
  </div>
  <div>
    <p className="text-text-color md:text-[9px] xl:text-[11px]">To</p>
    <p className=' md:text-[9px] xl:text-[11px]'>11/06/24, 11:15</p>
  </div>
</div>

        <div className='flex justify-center items-center pr-2'>
          <img  
        src={currentImage} 
        alt="Toggle Image" 
        className='xl:w-18 xl:h-8 md:w-17 md:h-5' 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }} 
      />
        </div>
        
    </div>
    {isCalendarOpen && <ViewCalendar isCalendarOpen = {isCalendarOpen}/>}
   {!isCalendarOpen &&  <Discount/>}
   
    </div>
 
   </div>
   
   
   </>
  )
}

export default AssetDetails