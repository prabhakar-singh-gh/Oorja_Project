import React , {useState ,useContext}from 'react'
import saveBtn from '../../assets/saveBtn.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import { AssetContext } from './Context';
import { useNavigate } from 'react-router-dom'; 
function LandOwnerModal({  setLandOwnerModal ,  setModalOpen }) {

    const [isMember, setIsMember] = useState(true);
    const [savedEntries, setSavedEntries] = useState([]);
    const [formData, setFormData] = useState({ name: '', phoneNumber: ''  });
    const {landOwners, setLandOwners } = useContext(AssetContext);
    const [owner , setOwner] = useState({name:'' , phoneNumber:'' , startDateTime:'' })

    console.log(landOwners , "Owner" , owner)

    const navigate = useNavigate(); 
      const handleLandOwnerDetails = (event) => {
        const { name, value } = event.target;
        // Update state with new input values
        setOwner({
          ...owner,
          [name]: value,
        });
      };

    const handleCheckboxChange = () => {
        setIsMember(!isMember);
      };
    
    
      // Handle input change
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Save the entry
      const handleSave = () => {
        if (formData.name && formData.phoneNumber) {
          setSavedEntries([...savedEntries, formData]); // Add new entry to the list
          setFormData({ name: '', phoneNumber: '' }); // Clear input fields
        }
      };
    
      // Delete an entry
      const handleDelete = (index) => {
        const updatedEntries = savedEntries.filter((_, i) => i !== index);
        setSavedEntries(updatedEntries);
      };
const handleModal = ()=>{
    setLandOwnerModal(false)
    setModalOpen(true)
}
const handleSaveModal = ()=>{
    const { name, phoneNumber } = owner; // Destructure to get name and phoneNumber

   
    if (!name || !phoneNumber) {
       
        alert("Please enter both the landowner name and phone number.");
        return; // Stop further execution if validation fails
    }
    const currentDate = new Date();

    // Format the date and time as 'YYYY-MM-DD HH:mm'
    const formattedDateTime = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    // Update the formData state with the current date and time in the required format
    const updatedOwner = {
        ...owner,
        startDateTime: formattedDateTime,  // Store formatted date and time
    };

    console.log('Updated Owner:', updatedOwner);
  // Update the landOwners state
  setLandOwners((prev) => {
    const newOwners = [...prev, updatedOwner];
    console.log('New Land Owners:', newOwners); // Log the new owners array
    return newOwners;
});

// Delay navigation until after state update
setLandOwnerModal(false);
setTimeout(() => {
    navigate('/irrigation');
}, 0);
}
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg 2xl:w-[40vw] md:w-[55vw] xl:w-[42vw] relative">
      <button onClick={handleModal}  className="absolute top-2 right-4 text-[2.2vw] font-normal">
          &times;
        </button>
        <h2 className="text-2xl font-semibold lg:text-[17px] xl:text-[18px] mb-2 font-inter">Land Owner</h2>

        <div>
      <div className="flex justify-between mb-4">
        {/* Operator Name Input */}
        <div className="w-1/2">
          <input
            type="text"
            name="name"
            value={owner.name} // Bind state to the input
            onChange={handleLandOwnerDetails}
            className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
            placeholder="Name"
          />
        </div>

        {/* Phone Number Input */}
        <div className="w-1/2 ml-4">
          <input
            type="tel"
            name="phoneNumber"
            value={owner.phoneNumber} // Bind state to the input
            onChange={handleLandOwnerDetails}
            className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
            placeholder="Phone No."
          />
        </div>
      </div>

      {/* Custom Checkbox */}
      <div className="flex items-center mt-4">
        {/* Checkbox Container */}
        <div
          className="md:w-[14px] md:h-[14px] xl:w-[15px] xl:h-[15px] p-[1px] border-2 border-custom-green rounded-sm cursor-pointer"
          onClick={handleCheckboxChange}
        >
          {/* Inner Box */}
          <div className={`w-full h-full ${isMember ? 'bg-custom-green' : 'bg-white'} flex justify-center items-center rounded-[2px]`}>
            {/* Tick mark only if checked */}
            {isMember && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[11px] w-[11px] text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Text for checkbox */}
        <label className="ml-2 md:text-[12px] xl:text-[13px]">Also a member</label>
      </div>
    </div>

    <h2 className="text-2xl font-semibold lg:text-[17px] xl:text-[18px] mb-2 font-inter mt-3">Members</h2>
    <div>
      {/* Name and Phone Number Inputs */}
      <div className="flex gap-4 mb-4">
        {/* Name Input */}
        <div className="w-[48%] relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
            placeholder="Name"
          />
           <span className="absolute right-4 top-5 transform -translate-y-1/2">
  <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-[2px] lg:mt-0 md:w-2 md:h-2 xl:h-3 xl:w-3'>
          <path d="M1 1L7.5 7L14 1" stroke="black" strokeLinecap="round" />
        </svg>
  </span>
        </div>

        {/* Phone Number Input */}
        <div className="w-[45%] relative">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
            placeholder="Phone No."
          />

          {/* Show tick button when both fields are filled */}
          {formData.name && formData.phoneNumber && (
            <button
              className="absolute right-[-30px] top-1/2 transform -translate-y-1/2  text-white rounded-full p-1"
              onClick={handleSave}
            >
            <img src={saveBtn} className='w-5 h-5'/>
            </button>
          )}
        </div>
      </div>

      {/* Display Saved Entries as Separate Name and Phone Boxes */}
      <div className="mt-4">
        {savedEntries.length > 0 ? (
          savedEntries.map((entry, index) => (
            <div key={index} className="flex gap-4 mb-2">
              {/* Name Box */}
              <div className="w-[48%]">
                <input
                  type="text"
                  value={entry.name}
                  className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
                  disabled
                />
              </div>

              {/* Phone Box and Delete Button */}
              <div className="w-[45%] relative">
                <input
                  type="tel"
                  value={entry.phoneNumber}
                  className="border p-1 w-full md:text-[11px] xl:text-[12px] py-3 outline-none rounded-sm px-1"
                  disabled
                />
                {/* Delete button below the tick */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute right-[-30px] bottom-2  text-white p-1 rounded-full"
                >
                <img src={deleteIcon} className='w-5 h-5'/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 hidden">No entries saved yet.</p>
        )}
      </div>
    </div>

    <div className=' flex justify-between '>
        <p className={`mt-4 md:text-[11px] xl:text-[12px] text-custom-green ${savedEntries.length > 0 ? "visible" : "invisible"} `}>Added Member Successfully</p>
        <button
          disabled={savedEntries.length <= 0} 
        onClick={handleSaveModal}  className={`bg-btn-color  md:px-5 xl:px-6 py-2 rounded md:text-[11px] xl:text-[12px] mt-4 font-inter ${savedEntries.length > 0 ? 'bg-custom-black text-white' : "text-text-color2 "}  `}>
        Save
        </button>
        </div>

      </div>
    </div>
  )
}

export default LandOwnerModal