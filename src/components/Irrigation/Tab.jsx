import React, { useState } from 'react';

const Tab = ({ setTab , tab ,data ,allAsset }) => {

  const activeCount = allAsset.filter(item => item.status === 'Active').length;
const idleCount = allAsset.filter(item => item.status === 'Idle').length;
  console.log(allAsset , "Active All");
  console.log(activeCount , idleCount , "Count");
  
  
  return (
    <div className="tab flex justify-between lg:space-x-8 md:space-x-6">
    <span
      onClick={() => setTab('all')}
      className={`${
        tab === "all" ? "underline text-light-green underline-offset-8 decoration-[0.2vh]" : ""
      } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
    >
      All Assets
    </span>
    <span
      onClick={() => setTab('active')}
      className={`${
        tab === "active" ? "underline text-light-green underline-offset-8 decoration-[0.2vh]" : ""
      } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
    >
     {`Active (${activeCount})`}
    </span>
    <span
      onClick={() => setTab('idle')}
      className={`${
        tab === "idle" ? "underline text-light-green underline-offset-8 decoration-[0.2vh]" : ""
      } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
    >
     {`Idle (${idleCount})`}
    </span>
  </div>
  
  );
};

export default Tab;
