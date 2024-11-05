import express from 'express';
import { 
    createVehicle, 
    getVehicle, 
    updateVehicle, 
    deleteVehicle, 
    getCustomerVehicles,
    getVehicleServiceHistory,
    getAllVehicles
} from '../controllers/vehicleController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();
// Get all vehicles
router.get('/', verifyToken, getAllVehicles);
// Get all vehicles for a customer
router.get('/customer/:customerId', verifyToken, getCustomerVehicles);

// Get single vehicle
router.get('/:id', verifyToken, getVehicle);

// Add new vehicle
router.post('/', verifyToken, createVehicle);

// Update vehicle
router.put('/:id', verifyToken, updateVehicle);

// Delete vehicle
router.delete('/:id', verifyToken, deleteVehicle);

// Get vehicle service history
router.get('/:id/service-history', verifyToken, getVehicleServiceHistory);

export default router; 