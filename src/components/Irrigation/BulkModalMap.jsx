import React, { useState , useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import backArrow from '../../assets/backArrow.svg'; // Update the path as necessary
import searchIcon from '../../assets/searchIcon.svg'; // Update the path as necessary
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Subtract from '../../assets/Subtract.png'
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};


function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (event) => {
      onMapClick(event);
    },
  });
  return null;
}


const BulkModalMap = () => {

  const navigate = useNavigate();
  const data = useLocation();
  const {index , location , radius} = data.state

  const locationParts = location.split(", ");

  const [searchQuery, setSearchQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [center, setCenter] = useState([parseFloat(locationParts[0]), parseFloat(locationParts[1])]); // Default values
  const[Radius , setRadius] = useState(radius)


  const [newDistrict, setNewDistrict] = useState('');
  const [newState, setNewState] = useState('');


console.log(center , "LAt lOg" , Radius);

  useEffect(() => {
    if (location) {
      const splitLocation = location.split(',').map(coord => parseFloat(coord.trim()))
     setCenter(splitLocation);
    }
  }, [location])





  const handleMapClick = (e) => {
    setCenter([e.latlng.lat, e.latlng.lng]);
  };

  // Function to handle radius change
  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    // Retrieve uploadedData from localStorage
    const storedData = localStorage.getItem('uploadedData');
    let uploadedData = storedData ? JSON.parse(storedData) : [];
  
    // Update the specific index with the new location and radius
    const updatedData = uploadedData.map((item, idx) =>
      idx === index ? { ...item, location: center.join(', '), 'radius': Radius , state: newState,        // Add new state here
        district: newDistrict } : item
    );
  
    // Save the updated data back to localStorage
    localStorage.setItem('uploadedData', JSON.stringify(updatedData));
  
    // Save modal state in localStorage
    localStorage.setItem('showModal', 'true');
  
    // Navigate back to the previous page
    navigate(-1);
  };
  

  // Function to update latitude and longitude
  const handleUpdateLatLon = async () => {
    try {
      // Fetch updated location details (state and district) using the new lat/lon
      const locationData = await fetchLocation(center[0], center[1]);

      if (locationData.address) {
        // Set new district and state in state variables
        setNewDistrict(locationData.address.county || locationData.address.city || '');
        setNewState(locationData.address.state || '');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };
  const fetchLocationBySearchTerm = async (searchTerm) => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode the search term to make it URL-safe
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedSearchTerm}&format=json&addressdetails=1&limit=1`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  };

  const fetchLocation = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(async () => {
        const locations = await  fetchLocationBySearchTerm(searchQuery);
        if (locations.length > 0) {
          const { lat, lon } = locations[0];
          setCenter([parseFloat(lat), parseFloat(lon)]);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);


  useEffect(() => {
    handleUpdateLatLon(); // Call the function when the component mounts or when `center` changes
  }, [center]);
  const greenIcon = new L.Icon({
    iconUrl: Subtract,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });






  return (
    <div className="h-screen flex flex-col relative">
      {/* Back Button */}
      <div className='lg:h-[10vh] md:h-[8vh] bg-white md:px-4 lg:px-5 xl:px-7 flex items-center'>
        <div className='flex md:gap-5 lg:gap-6 items-center'>
          <img 
            src={backArrow} 
            onClick={() => window.history.back()} 
            className='2xl:w-[1.6vw] 2xl:h-[1.6vh] xl:w-[1.5vw] xl:h-[1.5vh] lg:w-[1.9vw] lg:h-[1.9vh] md:w-[2vw] md:h-[2vh] 2xl:mt-1 xl:mt-[3px] lg:mt-[1px] md:mt-[1px]' 
            alt="Back" 
          />
          <h1 className='2xl:text-[1.6vw] xl:text-[1.8vw] lg:text-[2.2vw] md:text-[2.4vw] font-inter'>Pin your pump location</h1>
          <h4 className='2xl:mt-2 2xl:text-[13px] xl:text-[14px] lg:text-[13px] xl:mt-[5px] md:text-[11px] lg:mt-[5px] md:mt-[5px] text-custom-gray3'>Click to pin location</h4>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-grow relative">
        <MapContainer center={center} zoom={16} className="h-full w-full" zoomControl={false} style={{ zIndex: 10 }} onClick={handleMapClick}>
        <MapUpdater center={center} />
        <MapClickHandler onMapClick={handleMapClick} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={center}  icon={greenIcon} />
          <Circle center={center} radius={Radius} color="transparent" fillColor="#4493A2" fillOpacity={0.3} />
        </MapContainer>

        {/* Search Bar */}
        <div className="absolute top-6 left-6 bg-white shadow-lg p-2 rounded-sm z-50 flex">
          <img src={searchIcon} className='2xl:w-[2.6vw] 2xl:h-[2.6vh] xl:w-[2.2vw] xl:h-[2.2vh] lg:w-[2.3vw] lg:h-[2.3vh] md:w-[2vw] md:h-[2vh] 2xl:mt-1 xl:mt-[3px] lg:mt-[1px] md:mt-[1px]' alt="Search" />
          <input
            type="text"
            placeholder="Search for a location or enter coordinates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded outline-none 2xl:w-[28vw] 2xl:h-[4vh] xl:w-[28vw] xl:h-[3vh] lg:w-[32vw] lg:h-[2.7vh] md:w-[33vw] md:h-[2.4vh] 2xl:text-[0.9vw] xl:text-[0.9vw] lg:text-[12px] md:text-[10px]"
          />
        </div>

        {/* Radius Input and Confirm Button */}
        <div className="absolute bottom-12 right-16 flex items-center gap-3 bg-transparent rounded-lg z-50">
          <div className="flex items-center mr-4 px-4 py-1 rounded-lg bg-white">
            <span className="mr-2 2xl:text-[13px] md:text-[11px] font-semibold font-inter">Radius</span>
            <input
              type="number"
              min="100"
              max="1000"
              value={Radius || ''}
              onChange={handleRadiusChange}
              className="border p-1 w-20 text-center 2xl:text-[16px] md:text-[15px] rounded-lg"
            />
            <span className='2xl:text-[13px] md:text-[11px] ml-2 font-semibold font-inter'>Meters</span>
          </div>

          {/* Confirm Button */}
          <button className="bg-custom-black text-white md:text-[10px] xl:text-[14px] 2xl:text-[13px] px-4 py-2 rounded" onClick={ handleConfirm}>
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkModalMap;
