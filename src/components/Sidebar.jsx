import React , {useState , useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import OorjaNameSvg from '../assets/oorja.svg';
import homesvg from '../assets/homepage.svg';
import irrigation from '../assets/irrigation.svg';
import digitalAdvidor from '../assets/Digital_Advisor.svg';
import digitalAdvidorActive from '../assets/Digital_AdvisorActive.svg';
import seeOrder from '../assets/see_order.svg';
import soliTest from '../assets/soliTesting.svg';
import farmers from '../assets/farmers.svg';
import transactions from '../assets/transactions.svg';
import oorjaTeam from '../assets/oorjaTeam.svg';
import oorjaTeamActive from '../assets/oorjaTeamActive.svg';
import parameters from '../assets/parameters.svg';
import Homelink from '../assets/Homelink.svg'
import logoutbtn1 from '../assets/logoutbtn1.svg'
import irrigationActive from '../assets/irrigationActive.svg'

const Sidebar = () => {

  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || 'home');
const navigate = useNavigate()

  const handleLogOut = ()=>{
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
   }

  // Update localStorage whenever the activeLink changes
  useEffect(() => {
    if (activeLink) {
      localStorage.setItem('activeLink', activeLink);
    }
  }, [activeLink]);
  const handleLinkClick = (link) => {
    console.log(activeLink)
    setActiveLink(link);
  };
  return (
    <aside className="min-w-[18vw]  min-h-screen bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.03)] border border-white p-2">
      <div className="sidebar-section flex flex-col ">
        <nav className='flex flex-col justify-center items-center  h-full mb-10 '>
          <div className="mt-6 flex items-center">
            <img src={OorjaNameSvg} alt="Oorja Name" className=" lg:w-[139px] h-auto" />
          </div>
          <div>
            <ul className="mt-4  lg:mt-14 w-full flex flex-col items-center justify-center ">
              <li className="">
              <Link to="/" onClick={() => handleLinkClick('home')}>
                  <img
                    src={activeLink === 'home' ? homesvg : Homelink}
                    alt="homepage"
                    className="w-[15vw]"
                  />
                </Link>
              </li>
              <li className="flex justify-center items-center w-full  mt-[4px]">
                <Link to="/irrigation"  onClick={() => handleLinkClick('irrigation')}>
                <img   src={activeLink === 'irrigation' ? irrigationActive : irrigation}
                    alt="homepage"
                    className="w-[15vw]"/></Link>
              </li>
              <li className="flex justify-center w-full  mt-[4px]">
              <Link to="/contact" onClick={() => handleLinkClick('digitalAdvidor')}>
                  <img
                    src={activeLink === 'digitalAdvidor' ? digitalAdvidorActive : digitalAdvidor}
                    alt="digital_Advisor"
                    className="w-[15vw]" 
                  />
                </Link>
              </li>
              <li className="flex justify-center w-full   mt-[4px]">
                <Link to="/conten"><img src={seeOrder} alt="seeOrder" className="w-[15vw]"  /></Link>
              </li>
              <li className="flex justify-center w-full   mt-[4px]">
                <Link to="/contac"><img src={soliTest} alt="soilTesting" className="w-[15vw]"  /></Link>
              </li>
              <li className="flex justify-center w-full   mt-[4px]">
                <Link to="/contac"><img src={farmers} alt="farmers" className="w-[15vw]" /></Link>
              </li>
              <li className="flex justify-center w-full  mt-[4px]">
                <Link to="/contac"><img src={transactions} alt="transactions" className="w-[15vw]"  /></Link>
              </li>
              <li className="flex justify-center w-full   mt-[4px]">
              <Link to="/oorja-team" onClick={() => handleLinkClick('oorjaTeam')}>
                  <img
                    src={activeLink === 'oorjaTeam' ? oorjaTeamActive : oorjaTeam}
                    alt="digital_Advisor"
                    className="w-[15vw]" 
                  />
                </Link>
              </li>
              <li className="flex justify-center w-full">
                <Link to="/contact"><img src={parameters} alt="parameters" className="w-[15vw]"  /></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
       {/* Conditional Logout Button */}
       {activeLink !== 'home' && (
        <div className=" flex justify-center w-full">
          <button className="w-[15vw] "onClick={handleLogOut}>
            <img src={logoutbtn1} alt="Logout" />
          </button>
        </div>
      )}
    
    </aside>
  );
};

export default Sidebar;
