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
          <th className="py-1 px-4 text-left w-[14%] font-normal">
            {tab === 'active' ? (
              <div><span>Started On</span></div>
            ) : tab === 'idle' ? (
              <div><span>Upcoming Session</span></div>
            ) : (
              <span className="py-1 pl-11 text-right w-[16%] font-normal">Status</span>
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
        <span className={`inline-block py-1 px-2 rounded-3xl font-inter text-center ml-10 ${item.status === "Inactive" ? "bg-red-50 text-text-colorRed" : item.status === "Active" ? "bg-green-50 text-custom-green" : "bg-custom-gray1 text-custom-gray3"}`}>
          {item.status}
        </span>
      )}
    </td>
    <td className="py-4 px-2 text-center relative group">
      <div
        className="relative flex justify-center items-center 2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 md:w-6 md:h-6 rounded-full hover:bg-custom-gray1 group-hover:visible invisible"
        onClick={() => handleImageClick(index)} // Use index for click handling
      >
        <img
          src={schedule}
          alt="schedule"
          className="md:w-[2.5vh] md:h-[2.5vh] xl:w-[2.7vh] xl:h-[2.7vh]"
        />
      </div>
      {clickedIndex === index && (
        <div className="z-10 absolute py-1 xl:py-2 2xl:w-[8vw] right-1 text-center w-[65px] xl:right-5 lg:w-[100px] xl:w-[100px] xl:text-[12px] bg-white text-black border border-gray-300 shadow-md shadow-custom rounded-sm">
          View Schedule
        </div>
      )}
    </td>
  </tr>
);

export default Table;
