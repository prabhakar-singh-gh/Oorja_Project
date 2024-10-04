import React , {useState}from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const ViewCalender = ({ isCalendarOpen}) => {

  const [date, setDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1);
    setViewDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1);
    setViewDate(newDate);
  };

  const monthYearString = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={`w-full  border bg-white  xl:p-8 md:p-5 rounded-lg ${isCalendarOpen ? 'xl:rounded-b-[14px] border-t-0 xl:rounded-t-none md:rounded-b-[10px] md:rounded-t-none' : 'xl:rounded-[14px] md:rounded-[10px]'}`}>
      {/* Calendar section - 30% width */}

      <div className="flex justify-between items-center xl:mb-6 md:mb-4 ">
        <div className="flex items-center">
        
          <span className="text-[11px] xl:text-[15px] font-inter font-semibold">{monthYearString}</span>
          <button onClick={handlePrevMonth} className=" ml-3 mr-2 text-lg"><svg className='md:w-4 md:h-4 xl:w-6 xl:h-6' width="28" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 8L11 16L19 24" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
          <button onClick={handleNextMonth} className="text-lg"><svg  className='md:w-4 md:h-4 xl:w-6 xl:h-6' width="28" height="24" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.291 24L21.291 16L13.291 8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
        </div>
        <div className="flex space-x-4 text-[8px] xl:text-[12px] border px-3 py-1 border-custom-border rounded-[6px]">
          <div className="flex items-center">
            <span className="xl:w-3 xl:h-3 md:w-[8px] md:h-[8px] bg-custom-border rounded-full mr-1"></span>
            <span>Finish</span>
          </div>
          <div className="flex items-center">
            <span className="xl:w-3 xl:h-3 md:w-[8px] md:h-[8px] bg-custom-green rounded-full mr-1"></span>
            <span>Active</span>
          </div>
          <div className="flex items-center">
            <span className="xl:w-3 xl:h-3 md:w-[8px] md:h-[8px] bg-[#EF9F1C] rounded-full mr-1"></span>
            <span>Upcoming</span>
          </div>
        </div>
      </div>



      <div className='flex'>


      <div className="w-3/10  pr-4">
      <div className="calendar-container  border">
   
      <Calendar onChange={onChange} value={date} className="w-[18vw] " />
     
    </div>
      </div>

      {/* Chart section - 70% width */}
      <div className="w-7/10 pl-4">
        <h3 className="font-bold text-lg">Session Chart</h3>
        <div className="h-48 bg-gray-100 rounded-md">
          {/* Placeholder for chart - use a chart library like chart.js or any grid to display sessions */}
          <div className="grid grid-cols-6 gap-1 h-full">
            {/* Monday to Saturday */}
            <div className="bg-blue-200 p-2">Monday</div>
            <div className="bg-blue-200 p-2">Tuesday</div>
            <div className="bg-blue-200 p-2">Wednesday</div>
            <div className="bg-blue-200 p-2">Thursday</div>
            <div className="bg-blue-200 p-2">Friday</div>
            <div className="bg-blue-200 p-2">Saturday</div>
          </div>
          {/* Y-axis time - 6AM to 6PM */}
          {/* Add color blocks or indicators for sessions booked */}
        </div>
      </div>
    </div>
      </div>
  
  );
};

export default ViewCalender;
