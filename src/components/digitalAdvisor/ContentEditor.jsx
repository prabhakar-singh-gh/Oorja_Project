import React, { useState } from "react";
import crossBtn from "../../assets/crossBtn.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import heading from "../../assets/heading.svg";
import image from "../../assets/image.svg";
import videoLink from "../../assets/videoLink.svg";
import text from "../../assets/text.svg";
import table from "../../assets/table.svg";
import pdf from "../../assets/pdf.svg";
import webLink from "../../assets/webLink.svg";
import InputContentDisplay from "./ContentEditorComponents/InputContentDisplay";
import ImageContentDisplay from "./ContentEditorComponents/ImageContentDisplay";

function ContentEditor({ isOpen, onClose, selectedItem }) {
  if (!isOpen) return null;

  const [selectedContent, setSelectedContent] = useState(null);
  const [savedContent, setSavedContent] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  
  console.log(savedContent , "Content")
  // New state to track if we are editing

  const handleImageClick = (contentType) => {
    setSelectedContent(contentType);
  };

  const handleSave = (inputValue) => {
    // Only save if inputValue is not empty
    if (inputValue.trim()) {
      setSavedContent((prev) => ({
        ...prev,
        [selectedContent]: inputValue,
      }));
    }
    setSelectedContent(null); // Hide the input box after saving
    setIsEditing(false); // Reset editing state
  };

  const handleDelete = (key) => {
    setSavedContent((prev) => {
      const newContent = { ...prev };
      delete newContent[key]; // Remove the content by key
      return newContent;
    });
    setIsEditing(true); // Enable editing after deleting an item
    setSelectedContent(key); // Set selectedContent to the key so input box shows up for editing
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center xl:px-7 xl:py-10 md:px-5 md:py-8 justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg w-full h-full relative overflow-y-scroll">
          <nav className="flex items-center justify-between p-4 bg-white border-b">
            {/* Left side - Text */}
            <div className="xl:text-[22px] md:text-[17px] xl:px-3 md:px-2 font-semibold font-inter">
              {selectedItem}
            </div>

            {/* Right side - Preview and Cancel buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-custom-black font-inter text-white md:px-4 md:py-1 md:text-[11px] xl:px-7 xl:py-2 xl:text-[13px] rounded">
                Preview
              </button>

              <button className="text-white px-4 py-2 rounded" onClick={onClose}>
                <img
                  src={crossBtn}
                  alt="cancel"
                  className="md:w-4 md:h-4 xl:w-5 xl:h-5"
                />
              </button>
            </div>
          </nav>

          <div className="w-full flex justify-center ">
            <div className="w-[50%] h-[100%]  mt-3 ">
              <h4 className="text-text-color text-center mt-1 md:text-[10px] xl:text-[13px] mb-4">
                You can choose to add any of the given formats for the content.
              </h4>
              {Object.keys(savedContent).length > 0 && 
              Object.keys(savedContent).map((key) => (
                <div key={key} className="relative mt-4 group">
                  <input
                    type="text"
                    value={savedContent[key]}
                    disabled={!isEditing} // Disable the input unless editing
                    className={`w-full xl:p-5 md:p-3 border border-gray-300 xl:rounded-[12px] md:rounded-[9px] mb-4 ${isEditing ? "bg-white" : ""}`}
                  />
                 
                  <button
                    className="absolute top-4 right-[-35px] p-1  text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => handleDelete(key)}
                  >
                    <img src= {deleteIcon} className="md:w-4 md:h-4 xl:w-5 xl:h-5"/>
                  </button>
                </div>
              ))}
              

              {/* Show input box for editing */}
              {selectedContent && (
                <InputContentDisplay
                  selectedContent={selectedContent}
                  handleSave={handleSave}
                  initialValue={savedContent[selectedContent] || ""}
                />
              )}
               {selectedContent === 'Image' && (
                <ImageContentDisplay
                  handleSave={handleSave}
                  initialValue={savedContent[selectedContent] || ""}
                />
              )}


              <div className="w-full border border-custom-border rounded-[16px]">
                <div className="w-full h-[15px] bg-[#C6F8C3] rounded-t-[16px]"></div>
                <div className="w-full flex justify-evenly items-center flex-wrap p-6  ">
                  {/* Image 1 - Heading */}
                  <div className="flex flex-col items-center">
                    <img
                      src={heading}
                      alt="Heading"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                      onClick={() => handleImageClick("Heading")}
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Heading
                    </p>
                  </div>

                  {/* Image 2 - Image */}
                  <div className="flex flex-col items-center">
                    <img
                      src={image}
                      alt="Image"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                      onClick={() => handleImageClick("Image")}
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Image
                    </p>
                  </div>

                  {/* Image 3 - Video Link */}
                  <div className="flex flex-col items-center">
                    <img
                      src={videoLink}
                      alt="Video Link"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Video Link
                    </p>
                  </div>

                  {/* Image 4 - Text */}
                  <div className="flex flex-col items-center">
                    <img
                      src={text}
                      alt="Text"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Text
                    </p>
                  </div>

                  {/* Image 5 - Table */}
                  <div className="flex flex-col items-center">
                    <img
                      src={table}
                      alt="Table"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Table
                    </p>
                  </div>

                  {/* Image 6 - PDF */}
                  <div className="flex flex-col items-center">
                    <img
                      src={pdf}
                      alt="PDF"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      PDF
                    </p>
                  </div>

                  {/* Image 7 - Web Links */}
                  <div className="flex flex-col items-center">
                    <img
                      src={webLink}
                      alt="Web Links"
                      className="xl:w-8 xl:h-8 md:w-6 md:h-6 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-text-color md:text-[11px] xl:text-[13px]">
                      Web Links
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentEditor;
