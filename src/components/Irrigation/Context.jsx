import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AssetContext = createContext();

// Create a Provider Component
export const AssetProvider = ({ children }) => {
    // Load initial state from localStorage or set to default
    const [assetDetails, setAssetDetails] = useState(() => {
        const savedAssets = localStorage.getItem('assetDetails');
        return savedAssets ? JSON.parse(savedAssets) : [];
    });
    
    const [landOwners, setLandOwners] = useState(() => {
        const savedLandOwners = localStorage.getItem('landOwners');
        return savedLandOwners ? JSON.parse(savedLandOwners) : []; // Initialize as an array
    });

    // Save assetDetails to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('assetDetails', JSON.stringify(assetDetails));
    }, [assetDetails]);

    // Save landOwners to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('landOwners', JSON.stringify(landOwners)); // Note the change from landOwner to landOwners
    }, [landOwners]);

    return (
        <AssetContext.Provider value={{ assetDetails, setAssetDetails, landOwners, setLandOwners }}>
            {children}
        </AssetContext.Provider>
    );
};
