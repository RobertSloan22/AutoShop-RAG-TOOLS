import express from 'express';
import Vehicle from '../models/vehicle.model.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all vehicles for a customer
router.get('/customer/:customerId', verifyToken, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ customerId: req.params.customerId });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single vehicle
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new vehicle
router.post('/', verifyToken, async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update vehicle
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete vehicle
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get vehicle service history
router.get('/:id/service-history', verifyToken, async (req, res) => {
    try {
        const serviceHistory = await ServiceRecord.find({ 
            vehicleId: req.params.id 
        })
        .sort({ serviceDate: -1 })
        .populate('technician', 'name');
        
        res.json(serviceHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 