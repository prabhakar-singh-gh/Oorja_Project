import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import Home from './components/Home';
import Home2 from './components/Home2';
import About from './components/About';
import DigitalAdvisor from './components/DigitalAdvisor';
import Layout from './components/Layout.jsx'; // Import the Layout component
import Episode from './components/Episode';
import ContentEditor from './components/ContentEditor';
import OorjaTeam from './components/OorjaTeam';
import IrrigationMainPage from './components/Irrigation/IrrigationMainPage';
import AddingSingleAsset from './components/Irrigation/AddingSingleAsset';
import { AssetProvider } from '../src/components/Irrigation/Context';
import BulkModalMap from './components/Irrigation/BulkModalMap';


const App = () => {
  return (
    <AssetProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  {/* Home page */}
          <Route path="irrigation" element={<IrrigationMainPage/>} />
          <Route path="contact" element={<DigitalAdvisor/>} />
          <Route path="oorja-team" element={<OorjaTeam />} />
        </Route>
        <Route path="/card-details/:id" element={<Episode/>} />
        <Route path="/content" element={<ContentEditor/>} />
        <Route path="/addAsset" element={<AddingSingleAsset/>} />
        <Route path="/map/:locationId" element={<BulkModalMap />} />
      </Routes>
    </Router>
    </AssetProvider>
    // <>
    // <Home2/>
    // </>
  );
};

export default App;
