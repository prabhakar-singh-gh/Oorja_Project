import React, { useState } from 'react';

const Tab = ({ setTab , tab ,data }) => {
  console.log(tab)
  return (
    <div className="tab flex justify-between lg:space-x-8 md:space-x-6">
      <span
        onClick={() => setTab('all')}
        className={`${
           tab === "all" ? "underline-custom text-light-green" : ""
          } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
      >
        All Assets
      </span>
      <span
        onClick={() => setTab('active')}
        className={`${
            tab === "active" ? "underline-custom text-light-green" : ""
           } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
      >
        Active 200
      </span>
      <span
        onClick={() => setTab('idle')}
        className={`${
            tab === "idle" ? "underline-custom text-light-green" : ""
           } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-custom-gray3 cursor-pointer`}
      >
        Idle 200
      </span>
    </div>
  );
};

export default Tab;
