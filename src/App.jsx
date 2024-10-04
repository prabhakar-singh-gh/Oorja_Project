import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,  } from 'react-router-dom';

// Import your components
import Home from './components/HomePage/Home';
import LoginPage from './components/LoginPage'; // Import the Login component
// import Home2 from './Home2.jsx';
// import About from './About.jsx';
import DigitalAdvisor from './components/digitalAdvisor/DigitalAdvisor';
import Layout from './components/Layout'; // Import the Layout component
import Episode from './components/digitalAdvisor/Episode';
import ContentEditor from './components/digitalAdvisor/ContentEditor';
import OorjaTeam from './components/OorjaTeam/OorjaTeam';
import IrrigationMainPage from './components/Irrigation/IrrigationMainPage';
import AddingSingleAsset from './components/Irrigation/AddingSingleAsset.jsx';
import { AssetProvider } from './components/Irrigation/Context.jsx';
import BulkModalMap from './components/Irrigation/BulkModalMap.jsx';
import AssetDetails from './components/Irrigation/AssetDetails.jsx';

const App = () => {
 
 
 
  const isAuthenticated = localStorage.getItem('isAuthenticated');


  return (
    <AssetProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Home />} /> {/* Home page */}
            <Route path="irrigation" element={<IrrigationMainPage />} />
            <Route path="contact" element={<DigitalAdvisor />} />
            <Route path="oorja-team" element={<OorjaTeam />} />
            <Route path="assetDetails" element={<AssetDetails />} />
          </Route>
          <Route path="/login" element={<LoginPage  />} />
          <Route path="/card-details/:id" element={<Episode />} />
          {/* <Route path="/contentEditor/:id" element={<ContentEditor />} />  */}
          <Route path="/addAsset" element={<AddingSingleAsset />} />
          <Route path="/map/:locationId" element={<BulkModalMap />} />
        </Routes>
      </Router>
    </AssetProvider>
  );
};

export default App;
