import express from 'express';
import { Retriever } from '../bmw-dtc-agent/Retriever.js';

const router = express.Router();
let retriever = null;

// Initialize the retriever
(async () => {
    try {
        retriever = await Retriever.initialize();
        console.log('DTC Retriever initialized successfully');
    } catch (error) {
        console.error('Failed to initialize DTC Retriever:', error);
    }
})();

router.post('/dtc-query', async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!retriever) {
            throw new Error('Retriever not initialized');
        }

        const response = await retriever.query(query);
        res.json({ response });
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ 
            error: 'Failed to process query',
            details: error.message 
        });
    }
});

export default router; 