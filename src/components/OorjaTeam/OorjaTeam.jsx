import React, { useState } from "react";
import alertsvg from "../../assets/alertsvg.svg";
import userImage from "../../assets/userImage.svg";
import searchIcon from "../../assets/searchIcon.svg";
import inviteMember from "../../assets/inviteMember.svg";
import addBtnGreen from "../../assets/addBtnGreen.svg";
import editBtngreen from "../../assets/editBtnGreen.svg";
import { Switch } from "@headlessui/react";
import greenLine from "../../assets/greenLine.svg";
import EditAssetsModal from "./EditAssetsModal";


function OorjaTeam() {
  const [name, setName] = useState("Abhinav");
  const [enabled1, setEnabled1] = useState(true);
  const [enabled2, setEnabled2] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isDigitalAdvisorChecked, setIsDigitalAdvisorChecked] = useState(false);
  const [isFarmAdvisorChecked, setIsFarmAdvisorChecked] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSave , setIsSave] = useState(false)

console.log(selectedMember, "Selected");


const [assetList, setAssetList] = useState(() => {
  const asset = localStorage.getItem('assetList');
  return asset ? JSON.parse(asset) : []; // Initialize as an array
});
   console.log(assetList);
   
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePic: userImage,
      role: "Digital Advisor",
      phoneNo: "123-456-7890",
      email: "john.doe@example.com",
      status: "Onboarded",
      dateAdded: "10/09/2024",
      assetAssigned: [
        {
          assetId: "Asset010",
          id: 1,

          location: "Aliganj, Uttar Pradesh",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      profilePic: userImage,
      role: "Farm Advisor",
      phoneNo: "234-567-8901",
      email: "jane.doe@example.com",
      status: "Pending",
      dateAdded: "12/09/2024",
      assetAssigned: [
        {
          assetId: "Asset010",
          id: 1,

          location: "Aliganj, Uttar Pradesh",
        },
      ],
    },
  ]); // State for team members

  const assets = [
    { id: 1, assetId: "ASSET001", location: "Gomti Nagar, Uttar Pradesh" },
    { id: 2, assetId: "ASSET002", location: "Aliganj, Uttar Pradesh" },
    { id: 3, assetId: "ASSET003", location: "Indira Nagar, Uttar Pradesh" },
    { id: 4, assetId: "ASSET004", location: "Vibhuti Khand, Uttar Pradesh" },
    { id: 5, assetId: "ASSET005", location: "Hazratganj, Uttar Pradesh" },
  ];



  const [openDropdownId, setOpenDropdownId] = useState(null);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  
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

  const locationMatchesSearchTerm = (location) => {
    return location.toLowerCase().includes(searchTerm.toLowerCase());
  };


  // Sort and prioritize matching results (either in asset name or location)
  const sortedAssets = [...assets].sort((a, b) => {
    const aMatches = locationMatchesSearchTerm(a.location);
    const bMatches = locationMatchesSearchTerm(b.location);
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const toggleOptions = (e, memberId) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === memberId ? null : memberId);
  };

  const handleOptionClick1 = (e, option, memberId) => {
    e.stopPropagation();
    // Open the modal
    setIsModalOpen(true);
    setOpenDropdownId(null);
  };
  const handleOptionClick2 = (e, option, memberId) => {
    e.stopPropagation();

    setOpenDropdownId(null);
  };

  const removeMember = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers); // Update members list
    setShowComponent(false); // Hide the component after removal
  };

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setShowComponent(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
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
  const saveEditedAssets = () => {
    // Logic for saving the selected assets
    // This could involve sending the selected assets to an API, updating the state, etc.
    
    // Example: Sending selectedAssets to an API
    // fetch('/api/saveAssets', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(selectedAssets),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     setShowModal(false); // Close modal after saving
    //     setSelectedAssets([]); // Clear selected assets
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };
  


  // Handle invite member click (show modal)
  const handleInviteMember = () => {
    setShowModal(true);
  };
  const handleSubmit = (assets) => {
    if (!email || !phoneNo) {
      alert("Both Email and Phone Number are mandatory fields.");
      return;
    }

    if (!isDigitalAdvisorChecked && !isFarmAdvisorChecked) {
      alert(
        "Please select at least one role: Digital Advisor or Farm Advisor."
      );
      return;
    }
    addNewMember(assets); // Call addNewMember function
    setShowModal(false); // Close the modal
    setSelectedAssets([]);
    setIsSave(false)
  };
  const handleisModalSubmit = (assets) => {
    if (!email || !phoneNo) {
      alert("Both Email and Phone Number are mandatory fields.");
      return;
    }

    if (!isDigitalAdvisorChecked && !isFarmAdvisorChecked) {
      alert(
        "Please select at least one role: Digital Advisor or Farm Advisor."
      );
      return;
    }

    setIsModalOpen(false); // Close the modal
  };
  // Update role based on checkbox selection
  const updateRole = () => {
    if (isDigitalAdvisorChecked && isFarmAdvisorChecked) {
      return "Digital Farm Advisor";
    }
    if (isDigitalAdvisorChecked) {
      return "Digital Advisor";
    }
    if (isFarmAdvisorChecked) {
      return "Farm Advisor";
    }
    return "";
  };

  // Add new member with selected role
  const addNewMember = (asset) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    const newMember = {
      id: members.length + 1,
      name: "John Doe",
      profilePic: userImage,
      role: updateRole(),
      phoneNo,
      email,
      status: "Pending",
      dateAdded: formattedDate,
      assetAssigned: asset,
    };
    setMembers([...members, newMember]);
    setShowModal(false); // Close modal after adding the member
    setEmail("");
    setPhoneNo("");
    setIsDigitalAdvisorChecked(false);
    setIsFarmAdvisorChecked(false);
  };

  // Filter members based on role filter
  const filteredMembers =
    roleFilter === "All"
      ? members
      : members.filter((member) => member.role === roleFilter);

  // Conditional rendering based on active tab
  const renderContent = () => {
    let displayedMembers = [];

    // Filter members based on the selected tab
    if (activeTab === "all") {
      displayedMembers = filteredMembers;
    } else if (activeTab === "onboarded") {
      displayedMembers = filteredMembers.filter(
        (member) => member.status === "Onboarded"
      );
    } else if (activeTab === "pending") {
      displayedMembers = filteredMembers.filter(
        (member) => member.status === "Pending"
      );
    }


    

    return (
      <div className="h-[60vh] overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-custom-nav md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]  ">
            <tr className="font-inter">
              <th className="py-4 px-2 w-[16%] font-normal">Name</th>
              <th className="py-1 px-2 text-left w-[27%] font-normal">
                Role
                <select
                  className="border rounded px-1 py-1 ml-2 md:text-[1vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] outline-none"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="Digital Advisor">Digital Advisor</option>
                  <option value="Farm Advisor">Farm Advisor</option>
                  <option value="Digital Farm Advisor">
                    Digital Farm Advisor
                  </option>
                </select>
              </th>
              <th className="py-1 px-2 text-left w-[16%] font-normal">
                Phone Number
              </th>
              <th className="py-1 px-2 text-left w-[16%] font-normal">
                Email ID
              </th>
              <th className="py-1 px-2 text-left font-normal w-[16%]">
                Status
              </th>
              <th className="py-1 px-2"></th>
            </tr>
          </thead>
          <tr>
    <td colSpan="6" className="bg-gray-50 h-2"></td>
  </tr>
          <tbody>
            {displayedMembers.map((member) => (
              <tr
                key={member.id}
                onClick={() => handleRowClick(member)}
                className="border-t border-b md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] hover:border-b-2 hover:border-b-black"
              >
                <td className="py-4 lg:py-3 px-4 flex items-center space-x-2">
                  <img
                    src={member.profilePic}
                    alt={member.name}
                    className=" md:w-[2.2vw] lg:w-[2.4vw] rounded-full"
                  />
                  <span>{member.name}</span>
                </td>
                <td className="py-1 px-2">{member.role}</td>
                <td className="py-1 px-2">{member.phoneNo}</td>
                <td className="py-1 px-2">{member.email}</td>
                <td>
                  <span
                    className={`lg:px-4 py-2 px-2 rounded-3xl font-inter ${
                      member.status === "Pending"
                        ? "bg-red-50 text-text-colorRed"
                        : "bg-green-50 text-custom-green"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-left relative">
                  <button
                    className="font-bold"
                    onClick={(e) => toggleOptions(e, member.id)}
                  >
                    ⋮
                  </button>
                  {openDropdownId === member.id && (
                    <div className="absolute right-8 mt-1 md:w-[10vw] lg:w-[8vw] bg-white border border-gray-300 rounded shadow-lg z-10">
                      <button
                        className="block text-center w-full  py-2 hover:bg-gray-100  md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.8vw]"
                        onClick={(e) =>
                          handleOptionClick1(e, "Resend Invite", member.id)
                        }
                      >
                        Resend Invite
                      </button>
                      <button
                        className="block w-full text-red-600  py-2 hover:bg-gray-100  md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.8vw]"
                        onClick={(e) =>
                          handleOptionClick2(e, "Cancel Request", member.id)
                        }
                      >
                        Cancel Request
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* { Model For 3 vertical Dots button Option } */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-2 rounded-lg shadow-lg md:w-[40%] lg:w-[30%] ">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="md:text-[2.5vw] lg:text-[2vw] xl:text-[2vw] 2xl:text-[2vw]"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col px-6">
                <h2 className="font-semibold md:text-[1.6vw] lg:text-[1.2vw] xl:text-[1.4vw] 2xl:text-[1.2vw]">
                  Resend Invite
                </h2>
                <h3 className=" mt-2 mb-4 md:text-[1.1vw] lg:text-[0.8vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-custom-gray3">
                  Do you want to resend a joining invitation to ‘advisor name’ ?
                </h3>
              </div>

              <div className="w-full px-6">
                <div className="mb-4">
                  <label className="block md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded px-3 py-2 w-full  2xl:h-11 xl:h-9 lg:h-8 md:h-7 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="border rounded px-3 py-2 w-full 2xl:h-11 xl:h-9 lg:h-8 md:h-7 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                  />
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                  <span className="md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
                    Role
                  </span>
                  <div className="flex items-center">
                  <label className="inline-flex items-center relative mr-4">
  <input
    type="checkbox"
    checked={isDigitalAdvisorChecked}
    onChange={() => setIsDigitalAdvisorChecked(!isDigitalAdvisorChecked)}
    className="absolute opacity-0 cursor-pointer"
  />

  <span
    className={`border-2 ${isDigitalAdvisorChecked ? 'border-custom-green' : 'border-gray-300'}  flex justify-center items-center 2xl:w-[1.1vw] 2xl:h-[2.3vh] xl:w-[1.3vw] xl:h-[2.3vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh] border  rounded-sm`}
    style={{
    
      boxSizing: 'border-box',
    }}
  >
    <span
      className={`2xl:w-[0.7vw] 2xl:h-[1.4vh] xl:w-[0.9vw] xl:h-[1.5vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.8vw] h-[1.3vh]  rounded-[2px] ${isDigitalAdvisorChecked ? 'bg-green-500' : 'bg-transparent'}`}
    />
  </span>
  <span className="ml-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
    Digital Advisor
  </span>
</label>

                    <label className="inline-flex items-center relative">
  <input
    type="checkbox"
    checked={isFarmAdvisorChecked}
    onChange={() => setIsFarmAdvisorChecked(!isFarmAdvisorChecked)}
    className="absolute opacity-0 cursor-pointer"
  />
  <span
    className={`border-2 ${isFarmAdvisorChecked ? 'border-custom-green' : 'border-gray-300'} flex justify-center 2xl:pr-[1px]  items-center 2xl:w-[1.1vw] 2xl:h-[2.3vh] xl:w-[1.3vw] xl:h-[2.3vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh] border rounded-sm`}
    style={{
     
    
      boxSizing: 'border-box',
    }}
  >
    <span
      className={`2xl:w-[0.7vw] 2xl:h-[1.4vh] xl:w-[0.9vw] xl:h-[1.5vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  rounded-[2px] ${isFarmAdvisorChecked ? 'bg-green-500' : 'bg-transparent'} `}
    />
  </span>
  <span className="ml-2 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
    Farm Advisor
  </span>
</label>
                  </div>
                </div>

                <div className="flex justify-end items-end 2xl:mt-12 xl:mt-10 mt-8 ">
                  <button
                    onClick={() => {
                      handleisModalSubmit();
                      // Close the modal
                    }}
                    className="bg-custom-black text-white 2xl:py-3 2xl:px-6 md:px-4 md:py-2 xl:py-[10px] xl:px-5 rounded-md xl:mb-4 mb-2  md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                  >
                    Confirm and Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* Modal Close for 3 vertical dots option */}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-grow bg-custom-gray">
        <nav className="bg-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[2vw]">Oorja Team</span>
          </div>
          <div className="flex items-center space-x-3 md:px-2 lg:px-6">
            <img src={alertsvg} alt='alert' className='w-[1.7vw] xl:mr-4' onClick={() => alert('Alert button clicked')} />
            <span className='font-semibold text-[1vw]'>{name}</span>
            <img src={userImage} alt='userImage' className='w-[2.2vw] rounded-full' onClick={() => console.log('Sign out button clicked')} />
          </div>
        </nav>

        {/* Below NavBar Section */}
        <div className="py-2 px-8 flex justify-between items-center h-[15vh] bg-gray-50">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`${
                activeTab === "all" ? "underline-custom text-light-green" : ""
              } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-text-color`}
            >
              All Members
            </button>
            <button
              onClick={() => setActiveTab("onboarded")}
              className={`${
                activeTab === "onboarded" ? "underline-custom text-light-green" : ""
              } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]   text-text-color`}
            >
              Onboarded
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`${
                activeTab === "pending" ? "underline-custom text-light-green" : ""
              } md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]  text-text-color`}
            >
              Pending
            </button>
          </div>

          {/* Search bar with button */}
          <div className="flex space-x-3  2xl:gap-12 md:gap-4 lg:gap-4 xl:gap-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for an employee"
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
            <button
              onClick={handleInviteMember}
              className="md:py-1.5 md:w-[14vw] flex items-center justify-center bg-custom-black border text-sm text-white
               md:text-[1.1vw] md:h-7 md:gap-1
               lg:text-[1vw] lg:w-[12vw] lg:h-8 lg:gap-1
               xl:text-[0.9vw] xl:w-[10vw] xl:h-10 xl:gap-1
               2xl:text-[0.8vw] 2xl:w-[10vw] 2xl:h-11 2xl:py-4 rounded 2xl:gap-1"
            >
              <img
                src={inviteMember}
                className="md:w-[2.2vw] md:h-[2.2vw]
                 lg:w-[1.9vw] lg:h-[1.9vw]
                 xl:w-[1.7vw] xl:h-[1.7vw]
                 2xl:w-[1.4vw] 2xl:h-[1.4vw]"
                alt="Invite Members"
              />
              Invite Members
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className=" overflow-y-auto">{renderContent()}</div>



        {/*Team Member Profile  Modal  */}
        {selectedMember && showComponent && (
          <div className="fixed inset-0  bg-black bg-opacity-50 z-50">
            <div className="fixed top-0 right-0 h-full bg-white  shadow-lg transform transition-all duration-300 ease-in-out overflow-y-auto z-50 md:w-1/2 lg:w-5/12 xl:w-1/3 2xl:w-1/3">
              <div
                className="p-6 border relative 2xl:h-[10vh] xl:h-[9vh]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255, 241, 241, 0.4) 0%, rgba(244, 233, 255, 0.4) 33.33%, rgba(237, 233, 255, 0.4) 66.67%, rgba(255, 225, 225, 0.4) 100%)",
                }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4  text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <img 
                  src={selectedMember.profilePic}
                  alt={selectedMember.name}
                  className="2xl:w-[4vw] 2xl:top-9 xl:top-10 xl:w-[4.5vw] left-16 rounded-full absolute "
                />
              </div>
              <div className="p-10">
                <div className=" xl:mt-8 2xl:mt-2 flex flex-col xl:gap-1 2xl:gap-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="w-1/3  md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                      <span>Name </span>
                    </p>
                    <div className="rounded-md border border-gray-300 p-2 w-2/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                      {selectedMember.name}
                    </div>
                  </div>

                  {/* Phone Number Row */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="w-1/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                      <span>Phone </span>
                    </p>
                    <div className="rounded-md border border-gray-300 p-2 w-2/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                      {selectedMember.phoneNo}
                    </div>
                  </div>

                  {/* Email Row */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="w-1/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                      <span>Email </span>
                    </p>
                    <div className="rounded-md border border-gray-300 p-2 w-2/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                      {selectedMember.email}
                    </div>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p className="w-1/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400 ">
                      {" "}
                      <span>Role </span>
                    </p>

                    <div className={`flex items-center w-2/3 mb-2 `}>
                      {/* Check for "Digital Advisor" Role */}
                      {selectedMember.role === "Digital Advisor" && (
                        <div className="flex items-center">
                          <div className="mr-2 p-[1px] py-[1px] 2xl:w-[1vw] 2xl:h-[2.1vh] xl:w-[1.2vw] xl:h-[2.2vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh]  border-2 border-custom-green rounded-[3px] flex justify-center items-center">
                            {" "}
                            <div className="2xl:w-[0.6vw] 2xl:h-[1.3vh] xl:w-[0.7vw] xl:h-[1.4vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  bg-custom-green1 rounded-[2px]"></div>
                          </div>{" "}
                          {/* Small green box */}
                          <span className="md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                            Digital Advisor
                          </span>
                        </div>
                      )}

                      {/* Check for "Farm Advisor" Role */}
                      {selectedMember.role === "Farm Advisor" && (
                        <div className="flex items-center">
                          <div className="mr-2 p-[1px] py-[1px] 2xl:w-[1vw] 2xl:h-[2.1vh]  xl:w-[1.2vw] xl:h-[2.2vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh]  border-2 border-custom-green rounded-[3px] flex justify-center items-center">
                            {" "}
                            <div className="2xl:w-[0.6vw] 2xl:h-[1.3vh] xl:w-[0.7vw] xl:h-[1.4vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  bg-custom-green1 rounded-[2px]"></div>
                          </div>{" "}
                          {/* Small green box */}
                          <span className="md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                            Farm Advisor
                          </span>
                        </div>
                      )}

                      {/* Check for "Digital Farm Advisor" Role */}
                      {selectedMember.role === "Digital Farm Advisor" && (
                        <div className="flex items-center">
                          <div className="mr-2  p-[1px] py-[1px] 2xl:w-[1vw] 2xl:h-[2.1vh]  xl:w-[1.2vw] xl:h-[2.2vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh]  border-2 border-custom-green rounded-[3px] flex justify-center items-center">
                            {" "}
                            <div className="2xl:w-[0.6vw] 2xl:h-[1.3vh] xl:w-[0.7vw] xl:h-[1.4vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  bg-custom-green1 rounded-[2px]"></div>
                          </div>{" "}
                          {/* Small green box */}
                          <span className="mr-4 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                            Digital Advisor
                          </span>
                          <div className="mr-2 p-[1px] py-[1px] 2xl:w-[1vw] 2xl:h-[2.1vh]  xl:w-[1.2vw] xl:h-[2.2vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh]  border-2 border-custom-green rounded-[3px] flex justify-center items-center">
                            {" "}
                            <div className="2xl:w-[0.6vw] 2xl:h-[1.3vh] xl:w-[0.7vw] xl:h-[1.4vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  bg-custom-green1 rounded-[2px]"></div>
                          </div>{" "}
                          {/* Small green box */}
                          <span className="md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] ">
                            Farm Advisor
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Conditionally render Asset Assigned row if the role is "Farm Advisor" or "Digital Farm Advisor" */}
                  {(selectedMember.role === "Farm Advisor" ||
                    selectedMember.role === "Digital Farm Advisor") && (
                    <div className="flex justify-between items-center mb-2">
                      <p className="w-1/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                        {" "}
                        <span>Asset Assigned </span>
                      </p>
                      <div className=" p-2 w-2/3 flex gap-3 items-center">
                        <div className=" md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.8vw] flex gap-3">
                          <span className="bg-bg-btn p-2 rounded-md">
                            {selectedMember.assetAssigned?.[0]?.id}
                          </span>{" "}
                          <span className="p-2 bg-bg-btn rounded-full">
                            +{selectedMember.assetAssigned.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <button
                            className="text-blue-500"
                            onClick={() => {
                             setShowEditModal(true)// Open asset modal for editing
                            }}
                          >
                            <img
                              src={editBtngreen}
                              className="md:w-[1.8vw] lg:w-[1.28vw] xl:w-[1.3vw]"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Row */}
                  <div className="flex justify-between items-center mt-3 mb-6">
                    <p className="w-1/3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                      {" "}
                      <span>Status </span>
                    </p>
                    <div className="w-2/3 flex gap-3">
                      <span
                        className={`lg:py-1 lg:px-2 md:px-3 md:rounded-2xl lg:rounded-3xl flex items-center  md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]  ${
                          selectedMember.status === "Pending"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {selectedMember.status}
                      </span>
                      <span className="  md:text-[1vw] lg:text-[0.9vw] xl:text-[0.9vw] 2xl:text-[0.8vw]  py-1.5">
                        {selectedMember.status == "Pending"
                          ? `invited on ${selectedMember.dateAdded}`
                          : `on ${selectedMember.dateAdded}`}
                      </span>
                    </div>
                  </div>

                  {(selectedMember.role === "Farm Advisor" ||
                    selectedMember.role === "Digital Farm Advisor") && (
                    <div className="flex justify-around gap-3 mb-3 2xl:mt-0 xl:mt-4">
                      <div className="w-3/5 flex flex-col gap-9">
                        <p className="   flex gap-3 md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-gray-400">
                          <span>Soil Testing </span>
                          <Switch
                            checked={enabled1}
                          
                            className={`relative inline-flex items-center w-8  h-5 rounded-full  ${
                              enabled1 ? "bg-custom-green" : "bg-gray-200"
                            }`}
                          >
                            <span className="sr-only">Enable Soil Testing</span>
                            <span
                              className={`transform transition-transform ${
                                enabled1 ? "translate-x-3" : "translate-x-1"
                              } inline-block w-4 h-4 bg-white rounded-full`}
                            />
                          </Switch>
                        </p>
                        {enabled1 && (
                          <div className=" border border-gray-300 rounded-xl lg:px-3 lg:py-2 py-2 px-2  items-center flex gap-4 xl:mt-2 2xl:mt-0">
                            {/* Content to show when the switch is enabled */}
                            <div className="w-[0.3vw] h-full rounded-2xl bg-green-200">
                              <img src={greenLine} className="h-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="md:text-[1.2vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[0.9vw] ">
                                Soil Test Completed
                              </p>
                              <p className="md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.2vw] 2xl:text-[1.2vw] font-bold text-custom-green ">
                                200
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-2/3 flex flex-col gap-9">
                        <p className=" flex gap-4 md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[0.9vw] text-gray-400 ">
                          <span>Seed Service </span>
                          <Switch
                            checked={enabled2}
                          
                            className={`relative inline-flex items-center  rounded-full w-8  h-5 ${
                              enabled2 ? "bg-custom-green" : "bg-gray-200"
                            }`}
                          >
                            <span className="sr-only">Enable Soil Testing</span>
                            <span
                              className={`transform transition-transform ${
                                enabled2 ? "translate-x-3" : "translate-x-[2px]"
                              } inline-block w-4 h-4 bg-white rounded-full`}
                            />
                          </Switch>
                        </p>
                        {enabled2 && (
                          <div className=" border border-gray-300 rounded-xl lg:px-3 lg:py-2 py-2 px-2  items-center flex gap-4 xl:mt-2 2xl:mt-0">
                            {/* Content to show when the switch is enabled */}
                            <div className="w-[0.35vw] h-full rounded-2xl bg-green-200">
                              <img src={greenLine} />
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="md:text-[1.2vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[0.9vw] ">
                                Seed Orders Completed
                              </p>
                              <p className="md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.2vw] 2xl:text-[1.2vw] font-bold text-custom-green ">
                                200
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={`rounded-xl border border-gray-300 flex ${ selectedMember.role === "Digital Advisor" ? "2xl:mt-10 xl xl:mt-10" : "" }`}>
                    <div className=" flex-1 lg:px-3 lg:py-2 py-2 px-2  items-center flex gap-4">
                      <div className="w-[0.3vw] h-full rounded-2xl bg-green-200">
                        <img src={greenLine} className="h-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="md:text-[1.2vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[0.9vw] ">
                          Modules Created
                        </p>
                        <p className="md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.2vw] 2xl:text-[1.2vw] font-bold text-custom-green">
                          200
                        </p>
                      </div>
                    </div>

                    <div className=" flex-1 lg:px-3 lg:py-2 py-2  items-center ">
                      <div className="flex flex-col gap-2">
                        <p className="md:text-[1.2vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[0.9vw] ">
                          Episode Created
                        </p>
                        <p className="md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.2vw] 2xl:text-[1.2vw] font-bold text-custom-green">
                          200
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`flex justify-end absolute right-6 bottom-6 ${ selectedMember.role === "Digital Advisor" ? "absolute right-6 bottom-6" : ""}`}>
                  <button
                    onClick={() => removeMember(selectedMember.id)}
                    className="border border-red-600 text-red-600 px-4 py-2  md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] rounded-sm"
                  >
                    Remove Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Team Member Profile Modal Close */}

        {/*Invite Member  Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-2 rounded-lg shadow-lg md:w-[48%] lg:w-[40%] xl:w-[34%] 2xl:w-[32%]">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="md:text-[2.5vw] lg:text-[2vw] xl:text-[2vw] 2xl:text-[2vw]"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col px-6">
                <h2 className="font-semibold md:text-[1.6vw] lg:text-[1.2vw] xl:text-[1.4vw] 2xl:text-[1.2vw]">
                  Invite Member
                </h2>
                <h3 className=" mt-2 mb-4 md:text-[1.1vw] lg:text-[0.8vw] xl:text-[0.9vw] 2xl:text-[0.8vw] text-custom-gray3">
                Choose to send invite via email, mobile number or both
                </h3>
              </div>

              <div className="w-full px-6">
                <div className="mb-4">
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ID"
                    className="border rounded px-3 py-2 w-full  2xl:h-11 xl:h-9 lg:h-8 md:h-7 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                  />
                </div>
                <div className="mb-4">
               
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Enter Mobile Number"
                    className="border rounded px-3 py-2 w-full 2xl:h-11 xl:h-9 lg:h-8 md:h-7 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
                  />
                </div>
                <div className="w-full flex justify-between relative items-center  mb-4">
                  <span className={`${isFarmAdvisorChecked && isSave ? "absolute top-0" : ""} md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-text-color`}>
                    Role
                  </span>
                  <div className={`flex items-center  ${isSave ? "flex-col gap-3 md:pl-28 xl:pl-40" : ""}`}>
                  <label className={`inline-flex  items-center relative mr-4 ${isSave && !isDigitalAdvisorChecked ? "hidden" : " "} ${isSave ? "md:mr-6 lg:relative lg:right-9 xl:ml-10 w-[11vw]" : ""}`}>
  <input
    type="checkbox"
    checked={isDigitalAdvisorChecked}
    onChange={() => setIsDigitalAdvisorChecked(!isDigitalAdvisorChecked)}
    className="absolute opacity-0 cursor-pointer"
    disabled={isSave}
  />

  <span
    className={`border-2 ${isDigitalAdvisorChecked ? 'border-custom-green' : 'border-gray-300'} flex justify-center items-center 2xl:w-[1.1vw] 2xl:h-[2.3vh] xl:w-[1.3vw] xl:h-[2.3vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh] border  rounded-sm`}
    style={{
    
      boxSizing: 'border-box',
    }}
  >
    <span
      className={`2xl:w-[0.7vw] 2xl:h-[1.4vh] xl:w-[0.9vw] xl:h-[1.5vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.8vw] h-[1.3vh]  rounded-[2px] ${isDigitalAdvisorChecked ? 'bg-green-500' : 'bg-transparent'}`}
    />
  </span>
  <span className="ml-2 md:text-[1.2vw] lg:text-[0.9vw] xl:text-[1vw] 2xl:text-[0.9vw]">
    Digital Advisor
  </span>
</label>

                    <label className={`inline-flex items-center relative ${isSave ? "2xl:pr-4  xl:mr-14 md:mr-6 lg:mr-24 md:w-[11vw] ":""}`}>
  <input
    type="checkbox"
    checked={isFarmAdvisorChecked}
    onChange={() => setIsFarmAdvisorChecked(!isFarmAdvisorChecked)}
    className="absolute opacity-0 cursor-pointer"
    disabled={isSave}
  />
  <span
    className={`border-2 ${isFarmAdvisorChecked ? 'border-custom-green' : 'border-gray-300'} flex justify-center 2xl:pr-[1px]  items-center 2xl:w-[1.1vw] 2xl:h-[2.3vh] xl:w-[1.3vw] xl:h-[2.3vh] lg:w-[1.3vw] lg:h-[2.2vh]  w-[1.5vw] h-[2.1vh] border  rounded-sm`}
    style={{
      boxSizing: 'border-box',
    }}
  >
    <span
      className={`2xl:w-[0.7vw] 2xl:h-[1.4vh] xl:w-[0.9vw] xl:h-[1.5vh] lg:w-[0.8vw] lg:h-[1.4vh] w-[0.9vw] h-[1.3vh]  rounded-[2px] ${isFarmAdvisorChecked ? 'bg-green-500' : 'bg-transparent'} `}
    />
  </span>
  <span className="ml-2 md:text-[1.2vw] lg:text-[0.9vw] xl:text-[1vw] 2xl:text-[0.9vw]">
    Farm Advisor
  </span>
</label>
                  </div>
                </div>

                <div
                  className={`flex items-center xl:mb-12 md:mb-6 lg:mb-8 md:gap-2 lg:gap-0 ${
                    isFarmAdvisorChecked ? "visible" : "invisible"
                  }`}
                >
                  <span className="md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-text-color">
                   Asset Assigned
                  </span>
                  <img
                    src={addBtnGreen}
                    className={`md:w-[3vw] md:h-[3vh] lg:w-[3.6vw] lg:h-[3.6vh] ${isSave ? "invisible": ""}`}
                    onClick={() => {
                      setShowModal(false); // Close current modal
                      setShowAssetModal(true); // Open asset modal
                    }}
                  />
                  <div
                    className={`flex px-5 gap-3 ${
                      selectedAssets.length ? "visible" : "invisible"
                    }`}
                  >
                    <div className={`text-gray-500 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.8vw] flex gap-3`}>
                      <span className="bg-bg-btn px-2 py-1 rounded-sm">{selectedAssets?.[0]?.id}</span> <span className="bg-bg-btn px-1 py-1 rounded-full">+{selectedAssets.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          setShowModal(false);
                          setShowAssetModal(true); // Open asset modal for editing
                        }}
                      >
                        <img
                          src={editBtngreen}
                          className="md:w-[1.8vw] lg:w-[1.28vw] xl:w-[1.3vw]"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <button
                    onClick={() => {
                      handleSubmit(selectedAssets);
                      // Close the modal
                    }}
                    className={`${
                      isFarmAdvisorChecked || isDigitalAdvisorChecked ? 'bg-custom-black text-white' : 'bg-btn-color'
                    } text-gray-600 py-2 px-6 rounded-md mb-4 md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] `}
                  >
                   {isSave ? "Save" : "Send Invite"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Invite Member Modal Closed */}

       {/* Modal For Assets */}
        {showAssetModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white  rounded-lg shadow-lg 2xl:w-[38%] md:w-[55%] lg:w-[50%] xl:w-[45%]">
              <div className="flex justify-end ">
                <button
                  onClick={() => setShowAssetModal(false)} // Close asset modal
                  className="md:text-[2.5vw] lg:text-[2vw] xl:text-[2.2vw] 2xl:text-[2.2vw] px-2"
                >
                  &times;
                </button>
              </div>
              <div className="px-10">
                <h2 className="font-semibold md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.2vw] 2xl:text-[1.2vw] mb-2">Asset Assigned</h2>
                <p className="md:text-[1.2vw] lg:text-[1vw] xl:text-[0.8vw] 2xl:text-[0.8vw] mb-4 text-custom-gray3">
                  Choose to send invite via email, mobile number, or both
                </p>
              </div>

              <div className="mb-4 px-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for assets"
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

              <div className="flex relative  mb-2 bg-custom-nav md:py-2  xl:py-3">
                <div className=" 2xl:pr-9 xl:pr-16 flex-1  md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center " style={{fontWeight:"500"}}>
                  Asset ID
                </div>
                <div className=" border flex-1 md:text-[1.3vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]" style={{fontWeight:"500"}}>
                  <span className="xl:px-7 md:px-10 lg:px-11 2xl:px-4">Location</span>
                </div>
              </div>

              <div className="">
            
              <table className="w-full border-collapse">
        <tbody>
        {assetList.map((asset) => {
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
      if (selectedAssets.length > 0) {
        setShowAssetModal(false); 
        setShowModal(true); 
        setIsSave(true)
      }
    }}
    className={`py-2 px-6 rounded-md md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw] ${
      selectedAssets.length > 0 ? 'bg-custom-black text-white' : 'bg-btn-color'
    }`}
    disabled={selectedAssets.length === 0} // Optional: disable the button if no asset is selected
  >
                  Assign
                </button>
              </div>
            </div>
          </div>
        )}
         {/* Assets Modal Closed */}

         {/* Edit Modal Is Open */}
         {showEditModal && (
   <EditAssetsModal
   assets={assetList}
   selectedAssets={selectedAssets}
   setSelectedAssets={setSelectedAssets}
   setShowEditModal={setShowEditModal}
   saveEditedAssets={saveEditedAssets}
 />
)}

      </div>
    </div>
  );
}

export default OorjaTeam;
