import React ,{useState , useEffect} from 'react';
import edit from '../../assets/edit.svg'
import locationPoint from '../../assets/locationPoint.svg'
import { Switch } from '@headlessui/react';

const SingleAssetModal = ({  setModalOpen ,setLandOwnerModal,setTempAsset ,  onClosed, assetDetails,setAssetDetails, onInputChange , onEdit , updateAssetDetails , setIsEdit}) => {
console.log(assetDetails,"Asset Passed");
const [isValid, setIsValid] = useState(false);





const [isSoilTestEnabled, setIsSoilTestEnabled] = useState(true);
const [isSeedOrderEnabled, setIsSeedOrderEnabled] = useState(false);

// New function to toggle the switches
const toggleSwitch = (switchType) => {
  if (switchType === 'soilTest') {
    setIsSoilTestEnabled((prevState) => !prevState); // Toggle soilTest state
  } else if (switchType === 'seedOrder') {
    setIsSeedOrderEnabled((prevState) => !prevState); // Toggle seedOrder state
  }
};

const formatCoordinate = (coordinate) => {
    // Check if the coordinate is a number and return formatted string
    return typeof coordinate === 'number' ? coordinate.toFixed(3) : 'N/A';
};
// Handle input change
const [savedOperators, setSavedOperators] = useState([]);

// Modified handleInputChange logic for name and phone number auto-fill
const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setTempAsset((prevDetails) => {
      const updatedDetails = { ...prevDetails };
 
  
      if (name === 'name') {
        const matchedOperator = savedOperators.find((operator) => operator.name === value);
        if (matchedOperator) {
          updatedDetails.name = value;
          updatedDetails.phoneNumber = matchedOperator.phoneNumber;
        } else {
          updatedDetails.name = value;
          updatedDetails.phoneNumber = '';
        }
      } else if (name === 'phoneNumber') {
        // Regex pattern for validating phone numbers
     
  
        // Validate the phone number format
        if (/^\d*$/.test(value) && value.length <= 10) { // Allow empty input
          updatedDetails[name] = value;
        } else {
          console.warn('Invalid phone number format'); // Optional: Handle invalid input
        }
      } else {
        updatedDetails[name] = value;
      }
  
      return updatedDetails;
    });
  };
  
// Save the operator details if name and phone number are provided
const saveOperator = () => {
    console.log(assetDetails, "DETAILS");
    const { name, phoneNumber, assetId, rate, pincode, village, block, tahsil } = assetDetails;

    if (!name || !phoneNumber || !assetId || !rate || !pincode || !village || !block || !tahsil) {
        alert("All Fields Mandatory");
        return; // Stop further execution if validation fails
    }
    
    if (name && phoneNumber) {
        const existingOperator = savedOperators.find((operator) => operator.name === name);
        if (!existingOperator) {
            // Add new operator if not already in the list
            setSavedOperators((prevOperators) => {
                const newOperators = [...prevOperators, { name, phoneNumber }];
                console.log("New operators state:", newOperators);
                return newOperators;
            });
          
            console.log("Operator saved:", { name, phoneNumber }); // Log the saved operator details
          
            setModalOpen(false)
            setLandOwnerModal(true)
           
        } else {
            console.log("Operator already exists:", existingOperator);
            alert('Operator already exists.'); // Notify the user
        }

    } else {
        alert('Please enter both name and phone number.');
    }
  
};

const handleClosed = ()=>{
    onClosed()
    setIsEdit(true)
}


useEffect(() => {
  const validateAssetDetails = () => {
    // Check if all keys have non-empty values
    const hasEmptyValue = Object.values(assetDetails).some(value => {
      // Check for empty string, null, or undefined
      return value === '' || value === null || value === undefined;
    });

    // Check if phone number is exactly 10 digits
    const isPhoneNumberValid = assetDetails.phoneNumber && /^\d{10}$/.test(assetDetails.phoneNumber);

    // Set isValid based on checks
    setIsValid(!hasEmptyValue && isPhoneNumberValid);
  };

  validateAssetDetails();
}, [assetDetails]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-[16px] shadow-lg 2xl:w-[40vw] md:w-[55vw] xl:w-[42vw] relative">
        
        {/* Cross Button */}
        <button onClick={handleClosed} className="absolute top-2 right-4 text-[2.2vw] font-normal">
          &times;
        </button>
        
        <h2 className="text-2xl font-semibold lg:text-[17px] xl:text-[18px] mb-2 font-inter">Asset Details</h2>
        
        {/* Asset ID and Rate in one row */}
        <div className="flex  flex-col mb-6">
          <div className="w-3/5 mb-2">
            <label className='md:text-[11px] xl:text-[12px] font-inter '>Asset ID</label>
            <input
              type="text"
              name="assetId"
              value={assetDetails?.assetId || ''} // Control the input with assetDetails state
              onChange={onInputChange}
              className="border rounded-sm p-3 w-full mt-2 px-3 outline-none font-inter md:text-[11px] xl:text-[12px] "
              placeholder='type your asset Id'
            />
          </div>
          <div className="w-3/5 ">
            <label className='md:text-[11px] xl:text-[12px]  font-inter'>Rate in ₹/m³</label>
            <input
              type="number"
              name="rate"
              value={assetDetails?.rate || ''} // Control the input with assetDetails state
              onChange={onInputChange} 
              className="border rounded-sm p-3 w-full mt-2  px-3 outline-none font-inter md:text-[11px] xl:text-[12px]"
              placeholder='type rate amount'
           
            />
          </div>
        </div>
        
        {/* Location row */}
        <div className="flex justify-between items-center mb-2">
          <span className=" md:text-[11px] xl:text-[12px] font-inter">Location</span>
          <div className='flex gap-3 justify-center items-center'>    
            <span className="text-gray-600 md:text-[11px] xl:text-[12px] flex justify-center items-center gap-1">
                <img src={locationPoint} className='w-4 h-4' />
                {formatCoordinate(assetDetails?.lat)}, {formatCoordinate(assetDetails?.lon)}
                </span>
          <button onClick={() => onEdit(assetDetails?.lat, assetDetails?.lon ) } className=" border border-text-color rounded-sm p-[2px] px-[5px] gap-1 flex justify-center items-center  md:text-[9px] xl:text-[11px]">
            <img src={edit} className='md:w-3 md:h-3' />
            <span >Edit on map</span>
            </button>
          </div>
      
        </div>

        {/* State, District, Pincode in one row */}
        <div className="flex justify-between mb-4">
          <div className="w-1/3 md:text-[11px] xl:text-[12px] ">
            <label className=' text-text-color ' >State</label>
            <input
              type="text"
              name="state"
              disabled
              value={assetDetails?.state}
              onChange={handleInputChange}
              className="border outline-none mt-1 px-3 border-custom-border bg-background-color3 text-text-color  rounded-sm p-1 py-3 w-full"
            />
          </div>
          <div className="w-1/3 ml-4 md:text-[11px] xl:text-[12px]">
            <label className=' text-text-color'>District</label>
            <input
              type="text"
              name="district"
              disabled
              value={assetDetails?.district}
              onChange={handleInputChange}
              className="border outline-none mt-1 px-3 border-custom-border  text-text-color  bg-background-color3 rounded-sm p-1 py-3 w-full"
            />
          </div>
          <div className="w-1/3 ml-4 md:text-[11px] xl:text-[12px]">
            <label className=' text-text-color'>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={assetDetails?.pincode || ''} // Control the input with assetDetails state
              onChange={onInputChange}
              className="border outline-none mt-1 px-3  border-custom-border  rounded-sm p-1 py-3 w-full"
            />
          </div>
        </div>

        {/* Village, Block, Tahsil in one row */}
        <div className="flex justify-between mb-4">
          <div className="w-1/3 md:text-[11px] xl:text-[12px]">
            <label className=' text-text-color'>Village</label>
            <input
              type="text"
              name="village"
              value={assetDetails?.village || ''} // Control the input with assetDetails state
              onChange={onInputChange} 
              className="border outline-none mt-1 px-3 border-custom-border  rounded-sm p-1 py-3 w-full"
            />
          </div>
          <div className="w-1/3 ml-4 md:text-[11px] xl:text-[12px]">
            <label className=' text-text-color'>Block</label>
            <input
              type="text"
              name="block"
              value={assetDetails?.block || ''} // Control the input with assetDetails state
              onChange={onInputChange}
              className="border outline-none mt-1 px-3 border-custom-border  rounded-sm p-1 py-3 w-full"
            />
          </div>
          <div className="w-1/3 ml-4 md:text-[11px] xl:text-[12px]">
            <label className=' text-text-color'>Tahsil</label>
            <input
              type="text"
              name="tahsil"
              value={assetDetails?.tahsil || ''} // Control the input with assetDetails state
              onChange={onInputChange} 
              className="border outline-none  mt-1 px-3 border-custom-border  rounded-sm p-1 py-3 w-full"
            />
          </div>
        </div>

        {/* Soil Test and Seed Order switches in one line */}
      
       <div>  <label className='md:text-[11px] xl:text-[12px] font-inter '>Testing</label></div>
       <div className="flex items-center mb-4 mt-3">
      {/* Soil Test Switch */}
      <div className="flex items-center">
        <span className="md:text-[11px] xl:text-[12px] md:w-16 font-inter">Soil Test</span>
        <Switch
          checked={isSoilTestEnabled}
          onChange={() => toggleSwitch('soilTest')} // Use the new toggleSwitch function
          className={`${
            isSoilTestEnabled ? 'bg-[#48A244]' : 'bg-gray-200'
          } relative inline-flex items-center rounded-full lg:w-[40px] lg:h-[24px] md:w-[40px] md:h-[24px] ml-2 transition-colors`}>
          <span
            className={`${
              isSoilTestEnabled ? 'translate-x-[17px]' : 'translate-x-[3px]'
            } inline-block w-[20px] h-[19px] transform bg-white rounded-full transition-transform `}
          />
        </Switch>
      </div>

      {/* Seed Order Switch */}
      <div className="flex items-center px-28">
        <span className="md:text-[11px] xl:text-[12px] md:w-16 xl:w-20 font-inter">Seed Order</span>
        <Switch
          checked={isSeedOrderEnabled}
          onChange={() => toggleSwitch('seedOrder')} // Use the new toggleSwitch function
          className={`${
            isSeedOrderEnabled ? 'bg-[#48A244]' : 'bg-gray-200'
          } relative inline-flex items-center rounded-full lg:w-[40px] lg:h-[24px] md:w-[40px] md:h-[24px] ml-2 transition-colors `}>
          <span
            className={`${
              isSeedOrderEnabled ? 'translate-x-[17px]' : 'translate-x-[3px]'
            } inline-block w-[20px] h-[19px] transform bg-white rounded-full transition-transform `}
          />
        </Switch>
      </div>
    </div>


        {/* Name and Phone Number in one row */}
        <div className="flex justify-between mb-4">
          {/* Operator Name Input */}
          <div className="w-1/2 relative">
  <label className="md:text-[11px] xl:text-[12px] font-inter ">Operator</label>
  <input
    type="text"
    name="name"
    value={assetDetails?.name}
    onChange={handleInputChange}
    className="border p-1 mt-2 px-3 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm  pr-8" // Add padding to the right
    placeholder="Name"
  />
  <span className="absolute right-2 top-14 transform -translate-y-1/2">
  <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-[2px] lg:mt-0 md:w-2 md:h-2 xl:h-3 xl:w-3'>
          <path d="M1 1L7.5 7L14 1" stroke="black" strokeLinecap="round" />
        </svg>
  </span>
</div>


          {/* Phone Number Input */}
          <div className="w-1/2 ml-4">
            <label className="md:text-[11px] xl:text-[12px] font-inter invisible">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={assetDetails?.phoneNumber }
              onChange={handleInputChange} // Use the existing onInputChange function
              className="border p-1 mt-2 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-3"
              placeholder="Phone No."
              disabled={!!savedOperators.find((operator) => operator.name === assetDetails.name)} // Disable if name exists
            />
          </div>
        </div>
        <div className=' flex justify-end'>
        <button onClick={saveOperator} className={`bg-btn-color text-text-color2  md:px-5 xl:px-6 py-2 rounded md:text-[11px] xl:text-[12px] font-inter ${isValid ? 'bg-custom-black text-white' : ''}  `}>
         Next
        </button>
        </div>
      
      </div>
    </div>
  );
};

export default SingleAssetModal;
