import express from 'express';
import Customer from '../models/customer.model.js';

const router = express.Router();

// Add console.log for debugging
router.get('/search', async (req, res) => {
    try {
        const { term } = req.query;
        console.log('Search term received:', term); // Debug log

        const customers = await Customer.find({
            $or: [
                { firstName: { $regex: term, $options: "i" } },
                { lastName: { $regex: term, $options: "i" } }
            ]
        }).limit(10);

        console.log('Customers found:', customers); // Debug log
        res.json(customers);
    } catch (error) {
        console.error('Customer search error:', error); // Detailed error log
        res.status(500).json({ error: error.message });
    }
});

export default router; 