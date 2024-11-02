const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const customerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            vehicles: [{
                vehicleType: req.body.vehicleType,
                vehicleNumber: req.body.vehicleNumber,
                vin: req.body.vin,
                color: req.body.color,
                mileage: req.body.mileage,
                engine: req.body.engine,
                transmission: req.body.transmission,
                fuelType: req.body.fuelType
            }]
        };

        const customer = new Customer(customerData);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(400).json({ 
            error: error.message,
            details: error.errors // Include mongoose validation errors if any
        });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCustomerVehicles = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer.vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCustomerInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ customerId: req.params.id });
        res.json(invoices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 