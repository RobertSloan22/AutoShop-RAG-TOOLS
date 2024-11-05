import express from 'express';
import { 
    createCustomer,
    updateCustomer,
    getCustomer,
    getCustomerVehicles,
    getCustomerInvoices,
    searchCustomers,
    getAllCustomers
} from '../controllers/customerController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();
// Get all customers
router.get('/all', verifyToken, getAllCustomers);
// Search endpoint (should come before /:id routes to avoid conflicts)
router.get('/search', verifyToken, searchCustomers);

// Create new customer
router.post('/', verifyToken, createCustomer);

// Get customer by ID
router.get('/:id', verifyToken, getCustomer);

// Update customer
router.put('/:id', verifyToken, updateCustomer);

// Get customer's vehicles
router.get('/:id/vehicles', verifyToken, getCustomerVehicles);

// Get customer's invoices
router.get('/:id/invoices', verifyToken, getCustomerInvoices);

export default router; 