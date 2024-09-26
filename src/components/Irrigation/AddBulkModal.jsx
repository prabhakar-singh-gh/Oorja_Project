import React, { useState, useCallback } from 'react';
import Papa from 'papaparse'; // Import PapaParse
import csvSymbol from '../../assets/csvSymbol.svg';
import cursor from '../../assets/cursor.svg';

const AddBulkModal = ({ setShowAddBulkModal, setShowDataModal, handleUploadedData }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleUpload(e.target.files[0]); // Directly handle file upload on selection
  };

  const handleUpload = (file) => {
    if (file) {
      // Check if the file is a CSV or Excel
      if (file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        Papa.parse(file, {
          complete: (result) => {

            const filteredData = result.data.filter((row) => {
                // Keep rows where there is more than just the assetId
                return row.assetId && Object.keys(row).some(key => key !== 'assetId' && row[key]);
              });
            // Send the parsed data to the parent component

            localStorage.setItem('uploadedData', JSON.stringify(filteredData));
            handleUploadedData(filteredData)
    
                // Save the updated data to localStorage
              
    
              
              
    
              setShowAddBulkModal(false);
              setShowDataModal(true); // Show the data modal after upload
            },
          header: true, // Set to true if your CSV has headers
        });
      } else {
        alert("Please upload a valid CSV or Excel file.");
      }
    } else {
      alert("Please select a file");
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-[16px] shadow-lg ">
        <div className="flex justify-between gap-[8vw] items-center md:mb-6 xl:mb-8">
          <span className="md:text-[15px] xl:text-[18px] font-medium">Bulk Add Asset</span>
          <button className="border border-text-color flex justify-center items-center px-2 py-[5px] font-inter rounded-sm md:text-[11px] xl:text-[13px] "> 
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Sample
          </button>
        </div>
        <div className="p-5 rounded-[16px] flex flex-col items-center text-center mb-4 bg-background-color1 custom-border"
             onDragEnter={handleDragEnter}
             onDragLeave={handleDragLeave}
             onDragOver={(e) => e.preventDefault()} // Prevent default behavior
             onDrop={handleDrop}
             // Change border color on drag
        >
          {/* First Line */}
          <p className="mb-4 flex gap-2">
            <img src={csvSymbol} alt="csvFile" className='md:w-4 md:h-4 xl:w-5 xl:h-5' />
            <span className='font inter text-custom-gray3 md:text-[11px] xl:text-[14px] '>Upload CSV or Excel file to bulk upload</span>
          </p>

          {/* Second Line */}
          <p className="mb-4 flex gap-2">
            <img src={cursor} alt="csvFile" className='md:w-4 md:h-4 xl:w-5 xl:h-5' />
            <span className='font inter text-custom-gray3 md:text-[11px] xl:text-[14px] '>Drag and Drop here</span>
          </p>

          {/* Third Line */}
          <p className="text-custom-gray3 text-sm mb-5">or</p>

          {/* Fourth Line (Button) */}
          <button 
            className="border border-text-color flex justify-center items-center py-[5px] px-3 rounded"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className='md:text-[11px] xl:text-[13px]'>Browse from computer</span>
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
            accept=".csv, .xlsx" // Allow CSV and Excel file types
          />
        </div>
      </div>
    </div>
  );
};

export default AddBulkModal;
