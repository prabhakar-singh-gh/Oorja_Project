import React, { useState } from 'react';
import schedule from '../../assets/schedule.svg';

const Table = ({ data, tab, selectedState, selectedDistrict }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleImageClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index); // Toggle the clicked index
  };



  const filteredData = data.filter(item => {
    const matchesState = selectedState ? item.location.state === selectedState : true;
    const matchesDistrict = selectedDistrict ? item.location.district === selectedDistrict : true;
    return matchesState && matchesDistrict;
  });

  const remainingData = data.filter(item => !filteredData.includes(item));

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-custom-nav md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
        <tr className="font-inter">
          <th className="py-4 w-[34%] font-normal text-left px-8">Asset ID</th>
          <th className="py-1 px-2 text-left w-[27%] font-normal">Location</th>
          <th className="py-1 px-2 text-left w-[17%] font-normal">Operator</th>
          <th className="py-1  w-[14%] font-normal ">
            {tab === 'active' ? (
              <div className=' text-left pl-2'><span>Started On</span></div>
            ) : tab === 'idle' ? (
              <div className='  text-left pl-[6px]'><span>Upcoming Session</span></div>
            ) : (
              <span className="py-1 pr-3  w-[16%] font-normal text-center ">Status</span>
            )}
          </th>
          <th className="py-1 px-2 text-left font-normal w-[10%]"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="6" className="bg-gray-50 h-2"></td>
        </tr>
        {filteredData.length > 0 && (
          <>
            {filteredData.map((item, index) => (
              <TableRow
                key={item.operator.phone} // Use item.id for unique key
                item={item}
                index={index}
                tab={tab}
                clickedIndex={clickedIndex}
                handleImageClick={handleImageClick}
              />
            ))}
          </>
        )}
        {remainingData.length > 0 && (
          <>
            {remainingData.map((item, index) => (
              <TableRow
                key={item.operator.phone} // Use item.id for unique key
                item={item}
                index={index + filteredData.length} // Adjust index for remaining items
                tab={tab}
                clickedIndex={clickedIndex}
                handleImageClick={handleImageClick}
              />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

const TableRow = ({ item, index, tab, clickedIndex, handleImageClick }) => (
  <tr className="border-t border-b md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] hover:border-b-2 hover:border-b-black group">
    <td className="py-4 lg:py-3 px-8">{item.id}</td>
    <td className="py-1 px-2">{item.location.district}, {item.location.state}</td>
    <td className="py-1 px-2">
      <div>{item.operator.name}</div>
      <div className="text-text-color text-sm">{item.operator.phone}</div>
    </td>
    <td className="py-1 px-2">
      {tab === 'active' ? (
        <div className="mr-9 text-custom-green">{item.startDateTime || 'N/A'}</div>
      ) : tab === 'idle' ? (
        <div className="mr-9 text-text-color">{item.startDateTime || 'N/A'}</div>
      ) : (
        <span className={`inline-block py-1 px-2  2xl:w-[70px] md:w-[42px] lg:w-[52px] xl:w-[62px] xl:rounded-3xl rounded-2xl font-inter text-center ml-10 ${item.status === "Inactive" ? "bg-red-50 text-text-colorRed" : item.status === "Active" ? "bg-green-50 text-custom-green" : "bg-custom-gray1 text-custom-gray3"}`}>
          {item.status}
        </span>
      )}
    </td>
    <td className="py-4 px-2 text-center relative group">
      <div
        className="relative flex justify-center items-center 2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 md:w-6 md:h-6 rounded-full hover:bg-custom-gray1 group-hover:visible invisible custom-hover"
        onClick={() => handleImageClick(index)} // Use index for click handling
      >
        <img
          src={schedule}
          alt="schedule"
          className="md:w-[2.5vh] md:h-[2.5vh] xl:w-[2.7vh] xl:h-[2.7vh]"
        />

<div className="z-10 absolute shadow-light py-[1px] 2xl:w-[6vw] md:w-[75px] md:right-1 md:bottom-8 lg:right-[-25px] xl:left-[-35px] text-center 2xl:bottom-10 border-none lg:w-[80px] xl:w-[100px] xl:text-[12px] bg-white text-black border border-gray-300  rounded-sm opacity-0 custom-hover:opacity-100 transition-opacity duration-300">
          View Schedule
        </div>
      </div>
     
        
     
    </td>
  </tr>
);

export default Table;
