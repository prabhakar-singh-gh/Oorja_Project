import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

  import alertsvg from '../assets/alertsvg.svg'
  import logOutBtn from '../assets/logOutBtn.svg'
import OorjaNameSvg from '../assets/oorja.svg';
import homesvg from '../assets/homepage.svg';
import irrigation from '../assets/irrigation.svg';
import digitalAdvidor from '../assets/Digital_Advisor.svg';
import seeOrder from '../assets/see_order.svg';
import soliTest from '../assets/soliTesting.svg';
import farmers from '../assets/farmers.svg';
import transactions from '../assets/transactions.svg';
import oorjaTeam from '../assets/oorjaTeam.svg';
import parameters from '../assets/parameters.svg';
import showHistory from '../assets/showHistory.svg'
import soilTestingDate from '../assets/soilTestingDate.svg'
import irrigationdate from '../assets/irrigationdate.svg'
import date1 from '../assets/date1.svg'
import irrigationBtn from '../assets/irrigationBtn.svg'
import soilTestingColor from '../assets/soilTestingColor.svg'
import Chart from "./Chart";
  
  export default function Home2() {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen  rounded-lg border"
      >
        <ResizablePanel defaultSize={18}>
          <div className="flex h-full  justify-center p-6  ">
           
            
        <nav className='flex flex-col items-center h-full  '>
          <div className="mb-6 flex items-center">
            <img src={OorjaNameSvg} alt="Oorja Name" className=" " />
          </div>
          <div>
            <ul className="mt-4 lg:mt-14 w-full flex flex-col items-center justify-center ">
              <li className=" ">
                 <img src={homesvg} alt="homepage" className="w-[15vw]" /> 
              </li>
              <li className="flex justify-center items-center w-full">
                <img src={irrigation} alt="irrigation" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
               <img src={digitalAdvidor} alt="digital_Advisor" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={seeOrder} alt="seeOrder" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={soliTest} alt="soilTesting" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={farmers} alt="farmers" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={transactions} alt="transactions" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={oorjaTeam} alt="oorjaTeam" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
              <li className="flex justify-center w-full">
                 <img src={parameters} alt="parameters" className="md:w-[200px]  lg:w-[230px] h-auto" /> 
              </li>
            </ul>
          </div>
        </nav>
   
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
          <div>
          <ResizablePanelGroup
      direction="vertical"
      className="min-h-[99vh] w-full "
    >
      <ResizablePanel defaultSize={10}>
        <div className="flex h-full items-center justify-between p-6">
        <div className="flex items-center space-x-2">
        <span   role="img" 
        aria-label="wave" 
        className="text-[2vw] wave-animation">👋</span>
        <span className="font-bold text-[2vw]">Hello There !</span>
      </div>
      <div className="flex items-center space-x-3">
        <img src={alertsvg}  alt='alert' className='w-[2.5vw]'
          onClick={() => alert('Alert button clicked')} 
         
        />
         
        <img src={logOutBtn} alt='logOut' className='w-[8vw]'
          onClick={() => console.log('Sign out button clicked')} 
          
        />
         
      </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={89} >
      <div className="flex  md:flex-row flex-col p-4 gap-4 bg-custom-gray">
          <div className="w-[55vw] h-[45.5vh] bg-custom-gray flex flex-col gap-5">
          <div className="bg-white h-[16vh] flex justify-between items-center  p-4 rounded-[15px] ">
     
     <div className="flex flex-col items-center gap-3">
       <span className="text-[1.2vw] font-inter font-custom-black">App User</span>
       <span className="text-[1.7vw] font-inter font-semibold font-custom-black">10,000</span>
     </div>

    
     <div className="flex flex-col items-center gap-3">
       <span className="text-[1.2vw] font-inter font-custom-black">Offline User</span>
       <span className="text-[1.7vw]  font-inter font-semibold font-custom-black">500</span>
     </div>

    
     <div className="flex flex-col items-center gap-3  ">
      <img src={showHistory } alt='show History' className='h-[4vh] w-[8vw]  ' />
      <span className="text-[1.7vw]  font-inter font-semibold font-custom-black invisible">500</span>
     </div>
   </div>
   <div className="flex gap-5">
   <div className="w-[26.6vw] h-[27vh] bg-white rounded-xl p-6 box-border flex flex-col justify-between">

   <div className="flex justify-between">
        <img src={soilTestingDate} alt='seed service' className='w-[8.5vw]' />
        <img src={date1} alt='seed service' className='w-[10vw]' />
     </div>
     <div className="bg-white flex ml-3  gap-2  lg:gap-10 ">
  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Requested</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">21</span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">InProgress</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">21</span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Refunds</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">120</span>
  </div>
</div>
   </div>
   <div className="w-[26.6vw] h-[27vh] bg-white rounded-xl p-6 box-border flex flex-col justify-between">
   <div className="flex justify-between">
        <img src={soilTestingColor} alt='seed service' className='w-[8vw]' />
        <img src={date1} alt='seed service' className='w-[10vw]' />
     </div>

     <div className="bg-white flex   gap-2    lg:gap-6 ml-3 ">
  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Requested</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">21</span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">InProgress</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">21</span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Completed</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">120</span>
  </div>
  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Rejected</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">120</span>
  </div>
</div>

   </div>
   </div>
          </div>
          <div className="w-[25vw] h-[45.5vh] bg-white p-6 flex flex-col gap-6 rounded-xl" >
          <div className="flex justify-between md:ml-[-12px]  lg:ml-0">
        <img src={irrigationdate} alt='seed service' className='w-[8vw]' />
        <img src={date1} alt='seed service' className='w-[10vw]' />
     </div>
     <div className="bg-white flex flex-col   h-full justify-evenly ml-2  ">
  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Water Consumed</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">2100 m<sup>3</sup></span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Number Of Assets</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">30</span>
  </div>

  <div className="flex flex-col">
    <span className="text-[0.8vw] text-text-color font-inter font-custom-black">Subscription</span>
    <span className="text-[1.4vw] font-inter font-normal font-custom-black">120</span>
  </div>
</div>
          </div>
     </div>
     <div className="bg-custom-gray w-full h-screen pl-4 pr-4 pb-4 box-border">
     <div className="h-[37vh] bg-white p-2 rounded-[15px]">
          <div className='w-full flex justify-between mb-2 pl-2 pt-2'>
           <h2 className='font-semibold text-[1.35vw] ml-4'>Revenue</h2>
           <div className=" flex justify-center items-center gap-2 text-left pr-4 pt-1 ">
            <span className=' text-[1.1vw]'>From</span>
            <img src={irrigationBtn} alt='irigation' className='w-[7vw]'/>
    </div>
          </div>
         <div className=' flex gap-1 items-center lg:pl-8 md:pl-3 md:w-70vw'>
        <span className='-rotate-90 transform origin-bottom-left absolute text-[0.8vw] text-gray-600 font-semibold'>Rupees (&#8377;)</span> 
        <Chart/>
          </div> 
        </div>
</div>
     


      </ResizablePanel>
      
    </ResizablePanelGroup>
    
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
  