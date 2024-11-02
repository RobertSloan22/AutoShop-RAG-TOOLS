import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from '../models/customer.model.js';
import Invoice from '../models/invoice.model.js';

// Load environment variables
const envResult = dotenv.config();
if (envResult.error) {
    console.error('Error loading .env file:', envResult.error);
    process.exit(1);
}

// Verify MONGO_URI is set
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

console.log('MongoDB URI found in environment variables');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join(__dirname, '../../filename.csv');

const processCSV = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const customerMap = new Map(); // To track unique customers
        const results = [];

        // Read CSV file
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        console.log(`Read ${results.length} records from CSV`);

        for (const row of results) {
            try {
                const customerName = row.customer.split(',');
                const lastName = customerName[0].trim();
                const firstName = customerName[1]?.trim() || '';

                // Create unique customer key
                const customerKey = `${firstName}-${lastName}-${row.address}`;

                if (!customerMap.has(customerKey)) {
                    const customer = new Customer({
                        firstName,
                        lastName,
                        address: row.address,
                        city: row.city,
                        zip: row.zip
                    });

                    await customer.save();
                    customerMap.set(customerKey, customer._id);
                    console.log(`Created customer: ${firstName} ${lastName}`);
                }

                // Create invoice
                const customerId = customerMap.get(customerKey);
                
                // Parse date
                const dateParts = row.Date.split('/');
                const date = new Date(
                    2000 + parseInt(dateParts[2]), // Year
                    parseInt(dateParts[0]) - 1,    // Month (0-based)
                    parseInt(dateParts[1])         // Day
                );

                const invoice = new Invoice({
                    customerId,
                    invoiceNumber: row.invoice,
                    date,
                    serviceType: row['Item Description'],
                    amount: parseFloat(row.Amount.replace(/[$,]/g, ''))
                });

                await invoice.save();
                console.log(`Created invoice: ${row.invoice}`);
            } catch (error) {
                console.error(`Error processing row:`, row, error);
                continue; // Skip to next row if there's an error
            }
        }

        console.log('Data import completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

processCSV();