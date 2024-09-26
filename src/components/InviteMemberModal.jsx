import React, { useState } from 'react';
import alertsvg from '../assets/alertsvg.svg';
import userImage from '../assets/userImage.svg';
import searchIcon from '../assets/searchIcon.svg';
import inviteMember from '../assets/inviteMember.svg';
import InviteMemberModal from './InviteMemberModal';

function OorjaTeam() {
  const [name, setName] = useState('Abhinav');
  const [activeTab, setActiveTab] = useState('all'); // State for managing active tab
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', profilePic: userImage, role: 'Digital Advisor', phoneNo: '123-456-7890', email: 'john.doe@example.com', status: 'Onboarded' },
    { id: 2, name: 'Jane Doe', profilePic: userImage, role: 'Farm Advisor', phoneNo: '234-567-8901', email: 'jane.doe@example.com', status: 'Pending' },
  ]); // State for team members
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [newMemberRole, setNewMemberRole] = useState('Digital Advisor'); // Role selection for the modal
  const [roleFilter, setRoleFilter] = useState('All'); // Filter state for roles
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [isDigitalAdvisorChecked, setIsDigitalAdvisorChecked] = useState(false);
  const [isFarmAdvisorChecked, setIsFarmAdvisorChecked] = useState(false);

  // Handle invite member click (show modal)
  const handleInviteMember = () => {
    setShowModal(true);
  };

  // Add new member with selected role
  const addNewMember = () => {
    const newMember = {
      id: members.length + 1,
      name: 'John Doe',
      profilePic: userImage,
      role: isDigitalAdvisorChecked && isFarmAdvisorChecked ? 'Digital Farm Advisor' : isDigitalAdvisorChecked ? 'Digital Advisor' : 'Farm Advisor',
      phoneNo,
      email,
      status: 'Pending', // Default status for new member
    };
    setMembers([...members, newMember]);
    setShowModal(false); // Close modal after adding the member
    setEmail('');
    setPhoneNo('');
    setIsDigitalAdvisorChecked(false);
    setIsFarmAdvisorChecked(false);
  };

  // Filter members based on role filter
  const filteredMembers = roleFilter === 'All'
    ? members
    : members.filter((member) => member.role === roleFilter);

  // Conditional rendering based on active tab
  const renderContent = () => {
    let displayedMembers = [];

    // Filter members based on the selected tab
    if (activeTab === 'all') {
      displayedMembers = filteredMembers;
    } else if (activeTab === 'onboarded') {
      displayedMembers = filteredMembers.filter(member => member.status === 'Onboarded');
    } else if (activeTab === 'pending') {
      displayedMembers = filteredMembers.filter(member => member.status === 'Pending');
    }

    return (
      <div className="">
        <table className="min-w-full bg-white">
          <thead className="bg-custom-nav md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
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
                  <option value="Digital Farm Advisor">Digital Farm Advisor</option>
                </select>
              </th>
              <th className="py-1 px-2 text-left w-[16%] font-normal">Phone Number</th>
              <th className="py-1 px-2 text-left w-[16%] font-normal">Email ID</th>
              <th className="py-1 px-2 text-left font-normal w-[16%]">Status</th>
              <th className="py-1 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {displayedMembers.map((member) => (
              <tr key={member.id} className="border-t md:text-[1.2vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]">
                <td className="py-1 px-4 flex items-center space-x-2">
                  <img src={member.profilePic} alt={member.name} className=" md:w-[2.2vw] lg:w-[2.4vw] rounded-full" />
                  <span>{member.name}</span>
                </td>
                <td className="py-1 px-2">{member.role}</td>
                <td className="py-1 px-2">{member.phoneNo}</td>
                <td className="py-1 px-2">{member.email}</td>
                <td ><span className={`lg:px-4 py-1 px-2 rounded-3xl ${
    member.status === 'Pending'
      ? 'bg-red-100 text-red-600'
      : 'bg-green-100 text-green-600'
  }`}>{member.status}</span></td>
                <td className="py-1 px-2 text-left">
                  <button className="font-bold">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="flex items-center space-x-3">
            <img
              src={alertsvg}
              alt="alert"
              className="w-[2.5vw]"
              onClick={() => alert('Alert button clicked')}
            />
            <span className="font-semibold text-[1vw]">{name}</span>
            <img
              src={userImage}
              alt="userImage"
              className="w-[2.5vw] rounded-full"
              onClick={() => console.log('Sign out button clicked')}
            />
          </div>
        </nav>

        {/* Below NavBar Section */}
        <div className="py-2 px-8 flex justify-between items-center h-[15vh] bg-gray-100">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`${activeTab === 'all' ? 'underline-custom' : ''} md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]`}
            >
              All Members
            </button>
            <button
              onClick={() => setActiveTab('onboarded')}
              className={`${activeTab === 'onboarded' ? 'underline-custom' : ''} md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]`}
            >
              Onboarded
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`${activeTab === 'pending' ? 'underline-custom' : ''} md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw]`}
            >
              Pending
            </button>
          </div>

          {/* Search bar with button */}
          <div className="flex space-x-3 border 2xl:gap-12 md:gap-4 lg:gap-4 xl:gap-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for an employee"
                className="border outline-none pl-7 rounded-md w-full py-1 md:text-[1vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
              />
              <img
                src={searchIcon}
                alt="search"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-[1.5vw]"
              />
            </div>
            <button
              onClick={handleInviteMember}
              className="bg-custom-nav text-white py-1 px-4 rounded-md font-semibold text-[1vw] lg:text-[1vw] xl:text-[1vw] 2xl:text-[0.9vw]"
            >
              Invite Member
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="px-8 py-4 h-[75vh] overflow-y-auto">{renderContent()}</div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[60%] max-w-md">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Invite Member</h2>
                <button onClick={() => setShowModal(false)} className="text-xl">&times;</button>
              </div>
              <h3 className="text-lg mt-2 mb-4">Please fill in the details</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isDigitalAdvisorChecked}
                    onChange={() => setIsDigitalAdvisorChecked(!isDigitalAdvisorChecked)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Digital Advisor</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={isFarmAdvisorChecked}
                    onChange={() => setIsFarmAdvisorChecked(!isFarmAdvisorChecked)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Farm Advisor</span>
                </label>
                {isDigitalAdvisorChecked && isFarmAdvisorChecked && (
                  <p className="mt-2 text-red-500">Note: You cannot select both roles.</p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={addNewMember}
                  className="bg-custom-nav text-white py-2 px-4 rounded-md"
                >
                  Send Invite
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OorjaTeam;
