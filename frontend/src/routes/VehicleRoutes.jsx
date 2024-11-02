import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VehicleList from '../pages/vehicles/VehicleList';
import VehicleDetails from '../pages/vehicles/VehicleDetails';

const VehicleRoutes = () => {
    return (
        <Routes>
            <Route index element={<VehicleList />} />
            <Route path=":id" element={<VehicleDetails />} />
        </Routes>
    );
};

export default VehicleRoutes; 