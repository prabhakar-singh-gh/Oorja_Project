import React, { useState, useContext , useEffect } from "react";
import IrrigationNavBar from "./IrrigationNavBar";
import greenLine from "../../assets/greenLine.svg";
import Tab from "./Tab";
import Table from "./Table";
import searchIcon from "../../assets/searchIcon.svg";
import plusWhite from "../../assets/plusWhite.svg";
import plusBlack from "../../assets/plusBlack.svg";
import CustomDropdown from "./CustomDropdown";
import statesAndDistricts from "./statesAndDistricts";
import { AssetContext } from "./Context";
import AddBulkModal from "./AddBulkModal";
import DataBulkModal from "./DataBulkModal";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


function IrrigationMainPage() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("all");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showAddBulkModal, setShowAddBulkModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const { assetDetails,   landOwners } = useContext(AssetContext);
  const [uploadedData, setUploadedData] = useState(() => {
    // Retrieve saved data from localStorage when the component mounts
    const savedData = localStorage.getItem('uploadedData');
    return savedData ? JSON.parse(savedData) : []; // Return parsed data if available, otherwise return an empty array
  });
console.log(uploadedData , "DATA");

  const [savedAssetData, setSavedAssetData] = useState(() => {
    // Retrieve saved data from localStorage when the component mounts
    const savedData = localStorage.getItem('savedRemainingItems');
    return savedData ? JSON.parse(savedData) : []; // Return parsed data if available, otherwise return an empty array
  });
// Loading state


 
console.log(savedAssetData , "SAveData")
 



  useEffect(() => {
    // Check if 'showModal' is set in localStorage
    const modalState = localStorage.getItem('showModal');
    if (modalState === 'true') {
      setShowDataModal(true); // Open the modal if showModal is true
      localStorage.removeItem('showModal'); // Clear the modal state after use
    }

    // Load the updated data from localStorage
   
  }, []);


  // This function will be passed down to AddBulkModal to handle the parsed data
  const handleUploadedData = (data) => {
    setUploadedData(data); // Store the parsed CSV data
  };

  console.log(assetDetails, "Tab", landOwners);
  const allAssets = [
    {
      id: "A001",
      location: { district: "Agra", state: "Uttar Pradesh" },
      operator: { name: "John", phone: "1234567890" },
      status: "Active",
      startDateTime: "2024-09-19 10:00",
    },
    {
      id: "A002",
      location: { district: "Mumbai", state: "Maharashtra" },
      operator: { name: "Doe", phone: "0987654321" },
      status: "Active",
      startDateTime: "2024-09-18 02:30",
    },
    {
      id: "A003",
      location: { district: "Bangalore", state: "Karnataka" },
      operator: { name: "Jane", phone: "1122334455" },
      status: "Idle",
      startDateTime: "2024-09-20 11:00",
    },
    // More assets can be added here
  ];

  // Assume `allAssets` and `assetDetails` are already defined

// Start with a copy of allAssets to avoid modifying the original array
const updatedAssets = [...allAssets]; 

// Retrieve and parse saved assets from localStorage
const savedAssets = localStorage.getItem('savedRemainingItems');
let parsedSavedAssets = [];

if (savedAssets) {
  parsedSavedAssets = JSON.parse(savedAssets);
}

// Loop through assetDetails and add new assets to updatedAssets
assetDetails.forEach((assetDetail, index) => {
  const existingAsset = allAssets.find(
    (asset) => asset.id === assetDetail.assetId
  ); // Try to match by assetId

  const newAsset = {
    id: 
      assetDetail.assetId || 
      (existingAsset ? existingAsset.id : `A00${updatedAssets.length + 1}`), // Use assetId or auto-generate id
    location: {
      district: 
        assetDetail.district || 
        (existingAsset ? existingAsset.location.district : "Unknown"),
      state: 
        assetDetail.state || 
        (existingAsset ? existingAsset.location.state : "Unknown"),
    },
    operator: {
      name: 
        assetDetail.name || 
        (existingAsset ? existingAsset.operator.name : "Unknown"),
      phone: 
        assetDetail.phoneNumber || 
        (existingAsset ? existingAsset.operator.phone : "Unknown"),
    },
    status: existingAsset ? existingAsset.status : allAssets[0].status,
    startDateTime: landOwners[index]?.startDateTime || "Default DateTime", // Default or keep original
    radius: assetDetail.radius || "Unknown", // Additional details from assetDetail
    rate: assetDetail.rate || "Unknown",
    lat: assetDetail.lat || "Unknown",
    lon: assetDetail.lon || "Unknown",
    pincode: assetDetail.pincode || "Unknown",
    village: assetDetail.village || "Unknown",
    block: assetDetail.block || "Unknown",
    tahsil: assetDetail.tahsil || "Unknown",
    soilTest: assetDetail.soilTest || false,
    seedOrder: assetDetail.seedOrder || false,
  };

  // Push the new asset to the updatedAssets array
  updatedAssets.unshift(newAsset);
});

// Loop through parsedSavedAssets and add them to updatedAssets
parsedSavedAssets.forEach(savedAsset => {
  const operatorDetails = savedAsset.operator ? savedAsset.operator.split(',') : [];
  const operatorName = operatorDetails[0] ? operatorDetails[0].trim() : "Unknown";
  const operatorPhone = operatorDetails[1] ? operatorDetails[1].trim() : "Unknown";
  const newSavedAsset = {
    id: savedAsset.assetId || `A00${updatedAssets.length + 1}`, // Use existing ID or generate new one
    location: {
      district: savedAsset.district || "Unknown",
      state: savedAsset.state || "Unknown",
    },
    operator: {
      name: operatorName || "Unknown",
      phone: operatorPhone || "Unknown",
    },
    status: savedAsset.status || "Unknown",
    startDateTime: savedAsset.startDateTime || "Default DateTime", // Default or keep original
    radius: savedAsset.radius || "Unknown",
    rate: savedAsset.rate || "Unknown",
    lat: savedAsset.lat || "Unknown",
    lon: savedAsset.lon || "Unknown",
    pincode: savedAsset.pincode || "Unknown",
    village: savedAsset.village || "Unknown",
    block: savedAsset.block || "Unknown",
    tahsil: savedAsset.tahsil || "Unknown",
    soilTest: savedAsset.soilTest || false,
    seedOrder: savedAsset.seedOrder || false,
  };

  // Push the saved asset to the updatedAssets array
  updatedAssets.unshift(newSavedAsset);
});
localStorage.setItem('assetList', JSON.stringify(updatedAssets));
// Now updatedAssets contains all new assets and saved assets
console.log(updatedAssets , "Updates"); // For debugging or further processing


  const filteredData = updatedAssets.filter((asset) => {
    if (tab === "active") return asset.status === "Active";
    if (tab === "idle") return asset.status === "Idle";
    return true; // 'all' shows all assets
  });

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedDistrict(""); // Reset district when state changes
  };

  const toggleDropdown = () => {
    console.log("Button clicked, toggling dropdown");
    setIsOpen(!isOpen);
  };

  const openBulkModal = () => {
    setShowAddBulkModal(true)
    setIsOpen(false)
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-grow bg-custom-gray">
          <IrrigationNavBar />

          <div className=" w-full md:p-4 lg:p-5 xl:p-6 2xl:p-6  bg-gray-50">
            <div className=" w-full full  flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex 1920px:w-[15vw]  2xl:w-[18vw] w-[20vw] p-4 md:p-2 lg:p-3 xl:p-4 2xl:p-3 bg-white rounded-xl">
                  <div className="rounded-xl">
                    <img
                      src={greenLine}
                      alt="greenLine"
                      className=" md:w-[5px] 2xl:w-[6px] object-cover rounded-xl"
                      style={{ minHeight: "100%" }}
                    />
                  </div>

                  <div className="relative md:ml-2 xl:ml-3 flex flex-col w-full">
                    <div className=" flex flex-col">
                      <h2 className="absolute top-[-3px]  2xl:text-[13px] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[14px] font-inter text-[#000000]  ">
                        Revenue From
                      </h2>

                      <div className="flex justify-between mt-4 xl:mt-6 lg:mt-5">
                        <div className="flex flex-col mt-1">
                          <span className="md:text-[1.5vw] 2xl:text-[1.2vw] xl:text-[1.3vw] lg:text-[1.4vw] font-inter font-semibold text-custom-green">
                            ₹ 6000
                          </span>
                          <span className="md:text-[1vw] lg:text-[0.9vw] 2xl:text-[0.8vw]  text-text-color mt-1">
                            Members
                          </span>
                        </div>
                        <div className="flex flex-col mt-1">
                          <span className="md:text-[1.5vw] 2xl:text-[1.2vw] xl:text-[1.3vw] lg:text-[1.4vw] font-inter font-semibold text-custom-green">
                            ₹ 6000
                          </span>
                          <span className="md:text-[1vw] lg:text-[0.9vw] 2xl:text-[0.8vw] text-text-color mt-1">
                            Non-Members
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 md:pr-4 lg:pr-10 2xl:pr-12  relative">
                  {(tab === "active" || tab == "idle") && (
                    <button className=" border border-custom-black py-2 px-5 rounded 2xl:text-[0.9vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
                      Save Assets
                    </button>
                  )}
                  <button className=" border border-custom-black py-2 px-5 rounded 2xl:text-[0.9vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
                    Book Session
                  </button>
                  <button
                    onClick={toggleDropdown}
                    className="bg-custom-black  text-white py-[6px] px-3 lg:py-2 lg:px-4 rounded 2xl:text-[0.9vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw] flex items-center"
                  >
                    <div className="flex items-center justify-center lg:w-[18px] lg:h-[19px] md:w-[16px] md:h-[17px]">
                    <img src={plusWhite} className="w-4 h-4"/>
                    </div>
                    <span className="ml-2">Add Assets</span>
                  </button>

                  {isOpen && (
                    <div className="absolute z-10 md:top-6 md:right-2 lg:right-8 lg:top-8 xl:w-36 xl:top-9 2xl:right-10 xl:right-8 mt-2 md:w-26 lg:w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-2 px-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <span
                        
                          onClick={openBulkModal}
                          className="gap-2 md:px-2 md:py-1 xl:py-2 text-gray-700 hover:bg-gray-100 2xl:text-[0.9vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw] flex justify-center items-center"
                         
                        >
                         <img src={plusBlack} className="w-4 h-4"/>
                          <span style={{fontWeight:'600'}}>Add in bulk</span>
                        </span>


                        <Link
  to="/addAsset"
  className="gap-2 md:px-2 md:py-1  xl:py-2 text-gray-700 hover:bg-gray-100 2xl:text-[0.9vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw] flex justify-center items-center"
  role="menuitem"
>
  <img src={plusBlack} className="w-4 h-4" alt="Add Asset"/>
  <span style={{fontWeight:'600'}}>Single Asset</span>
</Link>

                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex  justify-end   relative">
                <div className="absolute left-0 bottom-0">
                  {" "}
                  <Tab setTab={setTab} tab={tab} data={filteredData} allAsset={ updatedAssets} />{" "}
                </div>
                <div className="flex items-center space-x-2">
                  {/* Search Icon */}
                  <div className="relative  md:mr-2 xl:mr-3">
                    <img
                      src={searchIcon}
                      className="md:w-3 md:h-3 xl:w-4 xl:h-4"
                      alt="Search"
                    />
                  </div>

                  {/* Custom Dropdown for States */}
                  <CustomDropdown
                    options={["None", ...Object.keys(statesAndDistricts)]}
                    selectedOption={selectedState}
                    setSelectedOption={handleStateChange}
                    placeholder=" State"
                  />

                  {/* Custom Dropdown for Districts */}
                  <CustomDropdown
                    options={
                      selectedState !== "None"
                        ? statesAndDistricts[selectedState]
                        : []
                    }
                    selectedOption={selectedDistrict}
                    setSelectedOption={setSelectedDistrict}
                    placeholder="District"
                    disabled={selectedState === "None" || selectedState === ""} // Disable if state is "None"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="">
            <Table
              data={filteredData}
              tab={tab}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
            />
          </div>
        </div>
      </div>


       {/* {Add Bul modal} */}
       {showAddBulkModal && (
              <AddBulkModal
              setShowAddBulkModal={setShowAddBulkModal}
              setShowDataModal={setShowDataModal}
              handleUploadedData={handleUploadedData}
              />
       )}

         {/* Data Display Modal */}
      {showDataModal && <DataBulkModal data={uploadedData} setShowDataModal={setShowDataModal} />}
    
       
    </>
  );
}

export default IrrigationMainPage;
