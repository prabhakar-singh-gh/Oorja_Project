import React, { useState, useEffect ,useContext } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import searchIcon from '../../assets/searchIcon.svg';
import backArrow from '../../assets/backArrow.svg';
import L from 'leaflet';
import SingleAssetModal from './SingleAssetModal';
import LandOwnerModal from './LandOwnerModal';
import { AssetContext } from './Context';
// Custom hook to move the map to a new center
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

// Function to fetch location from OpenStreetMap Nominatim API
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

// New component to handle map clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (event) => {
      onMapClick(event);
    },
  });
  return null;
}

const AddingSingleAsset = () => {
  const [center, setCenter] = useState([26.864, 81.0215]); // Default location
  const [radius, setRadius] = useState(300); // Default radius
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [landOwnerModal, setLandOwnerModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Modal state
  const { assetDetails, setAssetDetails } = useContext(AssetContext);// Asset details as array of objects

console.log(assetDetails , "ASSET")
  const handleEdit = (lat, lon ) => {
    setCenter([lat, lon]); // Set the map center to the asset's location
    setModalOpen(false);
    setIsEdit(true);
    // Close the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      // Fetch location details using lat and lon
      const locationData = await fetchLocation(center[0], center[1]);
      let newDistrict = '';
      let newState = '';

      if (locationData.address) {
        newDistrict = locationData.address.county || locationData.address.city || '';
        newState = locationData.address.state || '';
      }

      // Add a new asset to the asset details
      const newAsset = {
        radius : radius , 
        assetId: '',
        rate: '',
        lat: center[0],
        lon: center[1],
        state: newState,
        district: newDistrict,
        pincode: '',
        village: '',
        block: '',
        tahsil: '',
        soilTest: true,
        seedOrder: false,
        name: '',
        phoneNumber: '',
      };

      setAssetDetails((prevAssets) => {
        if (isEdit) {
          return prevAssets.map((asset, index) => 
            asset.lat === newAsset.lat ? { ...asset, ...newAsset } : asset
          );
        }
        return [...prevAssets, newAsset];
      });

      setModalOpen(true); // Open the modal after confirmation
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };
  const updateAssetDetails = (updatedAsset) => {
    setAssetDetails((prevAssets) =>
      prevAssets.map((asset) =>
        asset.lat === updatedAsset.lat ? updatedAsset : asset // Assuming each asset has a unique id
      )
    );
  };
  const [latestAsset, setLatestAsset] = useState({});

  useEffect(() => {
    // Synchronize latestAsset with the last asset in assetDetails
    setLatestAsset(assetDetails[assetDetails.length - 1] || {});
  }, [assetDetails , radius]);

  const handleUpdateLatLon =async () => {
   
        try {
            // Fetch updated location details (state and district) using the new lat/lon
            const locationData = await fetchLocation(center[0], center[1]);
      
            let newDistrict = '';
            let newState = '';
      
            if (locationData.address) {
              newDistrict = locationData.address.county || locationData.address.city || '';
              newState = locationData.address.state || '';
            }
      
            // Update the asset details with the new lat/lon and location info
            setAssetDetails((prevAssets) => {
              const updatedAssets = prevAssets.map((asset, index) => {
                if (index === prevAssets.length - 1) {
                  // Update only the latest asset
                  return {
                    ...asset,
                    lat: center[0],
                    lon: center[1],
                    state: newState,
                    district: newDistrict,
                    radius : radius
                  };
                }
                return asset; // Keep the rest of the assets unchanged
              });
      
              return updatedAssets; // Return the updated list
            });
        setModalOpen(true)
            setIsEdit(false); // Exit edit mode
          } catch (error) {
            console.error('Error fetching location details:', error);
          }
  };
  // Debounce search: triggers 1 second after the user stops typing
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(async () => {
        const locations = await fetchLocation(searchQuery);
        if (locations.length > 0) {
          const { lat, lon } = locations[0];
          setCenter([parseFloat(lat), parseFloat(lon)]);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const handleRadiusChange = (event) => {
    setRadius(Number(event.target.value));
  };

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Handle map click to change location
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setCenter([lat, lng]);
  };
  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'pincode' || name === "rate" ) {
        // For pincode, allow only numbers and limit to 6 digits
        if (/^\d*$/.test(value) && value.length <= 6) {
          setLatestAsset((prevDetails) => ({
            ...prevDetails,
            [name]: value,
          }));
        }
      } else {
        // For other fields (like village), allow any text
       setLatestAsset((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      }

    
  };
  return (
    <div className="h-screen flex flex-col relative">
      {/* Back Button */}
      <div className='lg:h-[10vh] md:h-[8vh] bg-white md:px-4 lg:px-5 xl:px-7 flex items-center'>
        <div className='flex md:gap-5 lg:gap-6 items-center'>
          <img src={backArrow} onClick={() => window.history.back()} className='2xl:w-[1.6vw] 2xl:h-[1.6vh] xl:w-[1.5vw] xl:h-[1.5vh] lg:w-[1.9vw] lg:h-[1.9vh] md:w-[2vw] md:h-[2vh] 2xl:mt-1 xl:mt-[3px] lg:mt-[1px] md:mt-[1px]' />
          <h1 className='2xl:text-[1.6vw] xl:text-[1.8vw] lg:text-[2.2vw] md:text-[2.4vw] font-inter'>Pin your pump location</h1>
          <h4 className='2xl:mt-2 2xl:text-[13px] xl:text-[14px] lg:text-[13px] xl:mt-[5px] md:text-[11px] lg:mt-[5px] md:mt-[5px] text-custom-gray3'>Click to pin location</h4>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-grow relative">
        <MapContainer center={center} zoom={16} className="h-full w-full" zoomControl={false} style={{ zIndex: 10 }}>
          <MapUpdater center={center} />
          <MapClickHandler onMapClick={handleMapClick} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={center} icon={greenIcon} eventHandlers={{ click: () => console.log('Marker clicked!') }} />
          <Circle center={center} radius={radius} color="transparent" fillColor="#4493A2" fillOpacity={0.3} />
        </MapContainer>

        {/* Search Bar */}
        <div className="absolute top-6 left-6 bg-white shadow-lg p-2 rounded-sm z-50 flex">
          <img src={searchIcon} className='2xl:w-[2.6vw] 2xl:h-[2.6vh] xl:w-[2.2vw] xl:h-[2.2vh] lg:w-[2.3vw] lg:h-[2.3vh] md:w-[2vw] md:h-[2vh] 2xl:mt-1 xl:mt-[3px] lg:mt-[1px] md:mt-[1px]' />
          <input
            type="text"
            placeholder="Search for a location or enter coordinates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded outline-none 2xl:w-[28vw] 2xl:h-[4vh] xl:w-[28vw] xl:h-[3vh] lg:w-[32vw] lg:h-[2.7vh] md:w-[33vw] md:h-[2.4vh] 2xl:text-[0.9vw] xl:text-[0.9vw] lg:text-[12px] md:text-[10px]"
          />
        </div>

        {/* Radius Input and Confirm Button */}
        {!isEdit ? (   <div className="absolute bottom-12 right-16 flex items-center bg-transparent rounded-lg z-50">
          <div className="flex items-center mr-4 px-4 py-1 rounded-lg bg-white">
            <span className="mr-2 2xl:text-[13px] md:text-[11px] font-semibold font-inter">Radius</span>
            <input
              type="number"
              min="100"
              max="1000"
              value={radius}
              onChange={handleRadiusChange}
              className="border p-1 w-20 text-center 2xl:text-[16px] md:text-[15px]"
            />
            <span className='2xl:text-[13px] md:text-[11px] ml-2 font-semibold font-inter'>Meters</span>
          </div>

          {/* Confirm Button */}
          <button className="bg-custom-black text-white md:text-[10px] xl:text-[14px] 2xl:text-[13px] px-4 py-2 rounded" onClick={handleConfirm}>
            Confirm & Proceed
          </button>
        </div>):(
            <div className="absolute bottom-12 right-16 flex items-center bg-transparent rounded-lg z-50">
            <div className="flex items-center mr-4 px-4 py-1 rounded-lg bg-white">
              <span className="mr-2 2xl:text-[13px] md:text-[11px] font-semibold font-inter">Radius</span>
              <input
                type="number"
                min="100"
                max="1000"
                value={radius}
                onChange={handleRadiusChange}
                className="border p-1 w-20 text-center 2xl:text-[16px] md:text-[15px]"
              />
              <span className='2xl:text-[13px] md:text-[11px] ml-2 font-semibold font-inter'>Meters</span>
            </div>
  
            {/* Confirm Button */}
            <button className="bg-custom-black text-white md:text-[10px] xl:text-[14px] 2xl:text-[13px] px-4 py-2 rounded" onClick={handleUpdateLatLon}>
              Confirm & Proceed
            </button>
          </div>
        )}
     
         {modalOpen && (
             <SingleAssetModal
             setModalOpen = { setModalOpen}
             onClosed={handleCloseModal}
             assetDetails={latestAsset}
             isEdit={isEdit}
             setAssetDetails={setLatestAsset}
             onEdit={handleEdit}
             onInputChange={onInputChange}
             updateAssetDetails = {updateAssetDetails}
             setIsEdit= {setIsEdit}
             setLandOwnerModal = {setLandOwnerModal}
           />
         )
         }

{landOwnerModal && (
             <LandOwnerModal
              setLandOwnerModal = {setLandOwnerModal}
              setModalOpen = { setModalOpen}
           />
         )
         }


       
      </div>
    </div>
  );
};

export default AddingSingleAsset;
