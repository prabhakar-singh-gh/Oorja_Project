import React , {useState , useEffect} from 'react';
import deleteIcon from '../../assets/deleteIcon.svg'
import locationPoint from '../../assets/locationPoint1.svg'
import { useNavigate } from 'react-router-dom'; 



const DataBulkModal = ({ data, setShowDataModal }) => {
    const navigate = useNavigate();

    
      const [checkedItems, setCheckedItems] = useState(Array(data.length).fill(false));
      const [savedItems, setSavedItems] = useState([]);
      const [datas, setDatas] = useState(data)
      const [remainingItems, setRemainingItems] = useState(data);



   console.log(data , "DATA")



      const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index]; // Toggle checked state
        
        // Update the savedItems array
        const updatedSavedItems = updatedCheckedItems.reduce((acc, isChecked, idx) => {
          if (isChecked) {
            acc.push(data[idx]); // Add the item to savedItems if checked
          }
          return acc;
        }, []);
        
        setCheckedItems(updatedCheckedItems);
        setSavedItems(updatedSavedItems);
      };
      
      const handleSave = () => {
        // Create a single list of saved items from the checked state
        const newSavedItems = datas.reduce((acc, item, index) => {
          if (checkedItems[index]) {
            acc.push(item); // Add checked items to the saved list
          }
          return acc;
        }, []);
    
        // Update the saved items state with the new list
        setSavedItems((prevSavedItems) => [...prevSavedItems, ...newSavedItems]);
    
        // Remove saved items from the original data
        const updatedData = datas.filter((_, index) => !checkedItems[index]);
        setDatas(updatedData); // Update main list with remaining items
    
        // Optionally save to local storage
        localStorage.setItem('savedItems', JSON.stringify([...savedItems, ...newSavedItems]));
    
        // Reset checked items after saving
        setCheckedItems(Array(updatedData.length).fill(false)); // Reset checked state for the updated list
      };



      const handleSaveRemaining = () => {
        const newSavedRemainingItems = remainingItems.reduce((acc, item, index) => {
          if (checkedItems[index]) {
            const currentDate = new Date();
            const formattedDateTime = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`; // Format date and time
            acc.push({ ...item, status: "Idle", startDateTime: formattedDateTime }); // Add new properties
          }
          return acc;
        }, []);
    
        // Update saved items with new remaining items
        setSavedItems((prevSavedItems) => [...prevSavedItems, ...newSavedRemainingItems]);
        
        // Optionally save to local storage
        localStorage.setItem('savedRemainingItems', JSON.stringify(newSavedRemainingItems));
        console.log(newSavedRemainingItems , "SAVE")
        setShowDataModal(false)
        // Remove saved remaining items from the remaining items list
        const updatedRemainingItems = remainingItems.filter((_, index) => !checkedItems[index]);
        setRemainingItems(updatedRemainingItems); // Update remaining items
        setCheckedItems(Array(updatedRemainingItems.length).fill(false)); // Reset checked state
      };

   
     



 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-8 py-12">
      <div className="bg-white p-8 rounded-md shadow-lg w-full ">
        <div className="flex justify-between items-center mb-4">
          <h2 className=" font-semibold md:text-[1.8vw] lg:text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1.3vw]">Bulk Add Asset</h2>
          <button onClick={() => setShowDataModal(false)}>  <img src={deleteIcon} className='w-5 h-5'/></button>
        </div>

        {/* Display the uploaded data */}
        <div>
          <table className="w-full overflow-y-auto border-collapse">
            <thead>
              <tr className='bg-custom-nav '>
                <th className="p-2  w-[2%]  border-gray-300">
                   
                </th>
                <th className="px-6 py-3 font-inter font-normal md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-left">Asset ID</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-left font-inter font-normal">Rate</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center font-inter font-normal">Location</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-inter font-normal">Radius <span className='lg:text-[10px] md:text-[8px] text-text-color'>in meters</span></th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-inter font-normal">Soil Testing</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-inter font-normal">Seed Service</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] xl:w-[9%] font-inter font-normal">Operator</th>
                <th className="p-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] xl:w-[9%] font-inter font-normal">Landowner</th>
              </tr>
            </thead>
            <tr>
    <td colSpan="6" className="bg-white h-2"></td>
  </tr>
            <tbody>
              {datas.map((item, index) => (  // Adjusted to iterate until the second last index
                <tr key={index}>
                  <td className="p-2 py-1 border-t border-b border-gray-300">
                  <div
                      className={`mr-2 p-[1px] py-[1px] w-4 md:w-3 xl:h-[1.5vh] xl:w-3 2xl:h-[2vh] 2xl:w-[0.9vw] border-2 rounded-[3px] flex justify-center items-center cursor-pointer ${
                        checkedItems[index]
                          ? 'border-custom-green'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleCheckboxChange(index)} // Toggle checkbox state on click
                    >
                      <div
                        className={`2xl:w-[0.6vw] 2xl:h-[1.3vh] xl:w-[0.5vw] xl:h-[0.9vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh] ${
                          checkedItems[index] ? 'bg-custom-green1' : 'bg-white'
                        } rounded-[2px]`}
                      ></div>
                    </div>
                  </td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">{item.assetId}</td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">{item.rate}</td>
                  <td 
  className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center" 
  onClick={() => {
    const radiusValue = Number(item['radius']); // Convert radius to a number
    if (!isNaN(radiusValue)) {
      navigate(`/map/${index}`, { state: { index: index, location: item.location, radius: radiusValue } });
    } else {
      console.error("Invalid radius value:", item['radius']);
      // Optionally handle invalid radius here (e.g., alert or default value)
    }
  }}
>
  <span className='flex justify-center items-center gap-1'>
    <img src={locationPoint} className='w-4 h-4' />
    <span className="flex gap-2 justify-center">
      {item.location.split(', ').map((loc, idx) => (
        <span key={idx} className="text-text-color">
          {parseFloat(loc).toFixed(3)} {/* Formatting to 3 decimal places */}
        </span>
      ))}
    </span>
  </span>
</td>


                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]  text-center">{item['radius']}</td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]  text-center">{item['soil testing']}</td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center">{item['seed service']}</td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.1vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw]  text-center">
                    {/* Split the operator into name and number */}
                    {item.operator.split(', ').map((part, idx) => (
                      <div key={idx} className={`${idx === 1 ? 'text-text-color xl:text-[0.8vw] md:text-[9px]' : ' border rounded-[5px]'}`}>
                        <span>{part}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border-t border-b border-gray-300 md:text-[1.1vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw]  text-center">
                    {/* Split the operator into name and number */}
                    {item.LandOwner.split(', ').map((part, idx) => (
                      <div key={idx}  className={`${idx === 1 ? 'text-text-color xl:text-[0.8vw] md:text-[9px]' : ' '}`}>
                        {part}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end mt-8'>
        <div className='flex gap-3 '>
            <button className='border border-custom-black xl:py-[7px] md:py-[6px] xl:px-6 md:px-4 xlrounded-[6px] md:rounded-[4px] md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]' onClick={handleSave} >Save List</button>
            <button className='border  border-custom-black bg-custom-black text-white xl:py-[7px] md:py-[6px] xl:px-6 md:px-4 xlrounded-[6px] md:rounded-[4px] md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] ' onClick={ handleSaveRemaining}>Add Selected Asset</button>
        </div>
      </div>
      </div>


      


    </div>
  );
};

export default DataBulkModal;
