import React from "react";
import crossBtn from "../assets/crossBtn.svg";

function ContentEditor() {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-blue-500">
        {/* Left side - Text */}
        <div className="text-white text-lg font-bold">My Website</div>

        {/* Right side - Preview and Cancel buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-custom-black font-inter text-white 
                    px-4 py-1.5 text-[10px]
                   sm:px-5 sm:py-1.5 sm:text-[10px]
                   md:px-6 md:py-1.8 md:text-[12px]
                   lg:px-6 lg:py-1.8 lg:text-[12px]
                   xl:px-7 xl:py-2 xl:text-[12px]
                   2xl:px-8 2xl:py-2.5 2xl:text-[13px]  rounded "
          >
            Preview
          </button>

          <button className=" text-white px-4 py-2 rounded">
            <img src={crossBtn} alt="cancel" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default ContentEditor;
