import React, { useState } from 'react';
import searchIcon from "../assets/searchIcon.svg";// Adjust this import based on your file structure

const EditAssetsModal = ({ assets, selectedAssets, setShowEditModal, saveEditedAssets , setSelectedAssets}) => {
  const [searchTerm, setSearchTerm] = useState('');
console.log(selectedAssets , "SELECT");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAssetSelection = (asset) => {
    setSelectedAssets(prevSelected => {
      if (prevSelected.some(item => item.operator.phone === asset.operator.phone)) {
        return prevSelected.filter(item => item.operator.phone !== asset.operator.phone);
      } else {
        return [...prevSelected, asset];
      }
    });
  };

  // Function to highlight the search term in text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="" style={{fontWeight:"500"}}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Determine if the location matches the search term
  // const locationMatchesSearchTerm = (location) => {
  //   return location.toLowerCase().includes(searchTerm.toLowerCase());
  // };

  // Sort assets: items with a matching location come first
  // const sortedAssets = [...assets].sort((a, b) => {
  //   const aMatches = locationMatchesSearchTerm(a.location);
  //   const bMatches = locationMatchesSearchTerm(b.location);
  //   if (aMatches && !bMatches) return -1;
  //   if (!aMatches && bMatches) return 1;
  //   return 0;
  // });

  return (
   
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg 2xl:w-[38%] lg:w-[48%] md:w-[55%]">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowEditModal(false)} // Close edit modal
              className="md:text-[2.5vw] lg:text-[2vw] xl:text-[2vw] 2xl:text-[2vw] px-2"
            >
              &times;
            </button>
          </div>
          <div className="px-10">
            <h2 className="font-bold text-lg mb-2">Edit Assigned Assets</h2>
            <p className="md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] mb-4">
              You can modify the selected assets for this member.
            </p>
          </div>

          <div className="mb-4 px-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for an asset"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border outline-none pl-7 rounded-md w-full text-sm
                 md:text-[1.2vw] md:h-7 md:w-[25vw]
                 lg:text-[1.1vw] lg:h-8 lg:pl-8 lg:w-[30vw]
                 xl:text-[0.9vw] xl:h-11 xl:pl-10 xl:w-[35vw]
                 2xl:text-[0.8vw] 2xl:h-11 2xl:pl-12 2xl:w-[30vw]"
              />
              <img
                src={searchIcon}
                alt="Search"
                className="absolute left-2 top-3.5 transform -translate-y-1/2
                 w-4 h-4 md:w-4 md:h-4
                 lg:w-4.2 lg:h-4.2 lg:top-4
                 xl:w-5 xl:h-5 xl:top-5
                 2xl:w-6 2xl:h-6 2xl:top-6"
              />
            </div>
          </div>

          <div className="flex relative mb-2 bg-custom-nav md:py-2 xl:py-3">
            <div className="2xl:pr-9 xl:pr-16 flex-1 md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center" style={{ fontWeight: "500" }}>
              Asset ID
            </div>
            <div className="flex-1 md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]" style={{ fontWeight: "500" }}>
              <span className="xl:px-0 md:px-6 lg:px-11 2xl:px-3">Location</span>
            </div>
          </div>

          <div>
            <table className="w-full border-collapse">
              <tbody>
              {assets.map((asset) => {
          const isSelected = selectedAssets.some(
            (item) => item.operator.phone === asset.operator.phone
          );

          return (
            <tr
              key={asset.operator.phone}
              className={`cursor-pointer ${
                isSelected ? 'bg-gray-100' : ''
              }`}
            >
              <td className="p-2 2xl:w-[55%] md:w-[58%] border border-t border-b px-10 border-gray-300">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleAssetSelection(asset)}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <span
                    className={`border-2 ${
                      isSelected ? 'border-custom-green' : 'border-gray-300'
                    } flex justify-center items-center 2xl:pr-[1px] 2xl:w-[1.1vw] 2xl:h-[2.3vh] xl:w-[1.3vw] xl:h-[2.3vh] lg:w-[1.3vw] lg:h-[2.2vh] w-[1.5vw] h-[2.1vh] border rounded-sm`}
                    style={{
                      boxSizing: 'border-box',
                    }}
                  >
                    <span
                      className={`2xl:w-[0.7vw] 2xl:h-[1.4vh] xl:w-[0.9vw] xl:h-[1.5vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh] rounded-[2px] ${
                        isSelected ? 'bg-custom-green1' : 'bg-transparent'
                      }`}
                    />
                  </span>
                </label>

                <span className="ml-2 md:px-4 lg:px-8 md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
                  {asset.id}
                </span>
              </td>

              <td className="p-2 border-t border-b border-gray-300 md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
                {asset.location.district},   {asset.location.state}
              </td>
            </tr>
          );
        })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end py-4 mb-3 px-7">
            <button
              onClick={() => {
                setShowEditModal(false);
                saveEditedAssets(selectedAssets); // Function to save edited assets
              }}
              className="bg-btn-color py-2 px-6 rounded-md md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default EditAssetsModal;
