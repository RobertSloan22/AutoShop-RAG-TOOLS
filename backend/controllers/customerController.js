import Customer from '../models/customer.model.js';
import Vehicle from '../models/vehicle.model.js';
import Invoice from '../models/invoice.model.js';

export const createCustomer = async (req, res) => {
    try {
        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const customerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            notes: req.body.notes
        };

        const customer = new Customer(customerData);
        await customer.save();

        let vehicle;
        if (req.body.year && req.body.make) {
            const vehicleData = {
                customerId: customer._id,
                year: parseInt(req.body.year),
                make: req.body.make,
                model: req.body.model,
                trim: req.body.trim,
                vin: req.body.vin,
                licensePlate: req.body.licensePlate,
                color: req.body.color,
                mileage: parseInt(req.body.mileage),
                engine: req.body.engine,
                transmission: req.body.transmission,
                fuelType: req.body.fuelType,
                isAWD: req.body.isAWD,
                is4x4: req.body.is4x4,
                notes: req.body.vehicleNotes
            };

            vehicle = new Vehicle(vehicleData);
            await vehicle.save();
        }

        res.status(201).json({
            customer: customer.toObject(),
            vehicle: vehicle ? vehicle.toObject() : null
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(400).json({ 
            error: error.message,
            details: error.errors
        });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            notes: req.body.notes
        };

        const customer = await Customer.findByIdAndUpdate(
            customerId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCustomerWithVehicle = async (req, res) => {
    try {
        const customerId = req.params.id;
        const { customerData, vehicleData } = req.body;

        // Update customer
        const customer = await Customer.findByIdAndUpdate(
            customerId,
            {
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                address: customerData.address,
                city: customerData.city,
                zipCode: customerData.zipCode,
                notes: customerData.notes
            },
            { new: true, runValidators: true }
        );

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Handle vehicle update/creation
        let vehicle;
        if (vehicleData._id) {
            // Update existing vehicle
            vehicle = await Vehicle.findByIdAndUpdate(
                vehicleData._id,
                {
                    year: vehicleData.year,
                    make: vehicleData.make,
                    model: vehicleData.model,
                    trim: vehicleData.trim,
                    vin: vehicleData.vin,
                    licensePlate: vehicleData.licensePlate,
                    color: vehicleData.color,
                    mileage: vehicleData.mileage,
                    engine: vehicleData.engine,
                    transmission: vehicleData.transmission,
                    fuelType: vehicleData.fuelType,
                    isAWD: vehicleData.isAWD,
                    is4x4: vehicleData.is4x4,
                    notes: vehicleData.notes
                },
                { new: true }
            );
        } else if (vehicleData.make && vehicleData.model) {
            // Create new vehicle
            vehicle = new Vehicle({
                ...vehicleData,
                customerId: customer._id
            });
            await vehicle.save();
        }

        res.json({
            customer: customer.toObject(),
            vehicle: vehicle ? vehicle.toObject() : null
        });
    } catch (error) {
        console.error('Error in updateCustomerWithVehicle:', error);
        res.status(400).json({ error: error.message });
    }
};

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ customerId: req.params.id });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ customerId: req.params.id });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchCustomers = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const customers = await Customer.find({
            $or: [
                { firstName: new RegExp(searchTerm, 'i') },
                { lastName: new RegExp(searchTerm, 'i') },
                { email: new RegExp(searchTerm, 'i') },
                { phoneNumber: new RegExp(searchTerm, 'i') }
            ]
        }).limit(10);
        
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Delete associated vehicles
        await Vehicle.deleteMany({ customerId: req.params.id });
        
        // Delete associated invoices
        await Invoice.deleteMany({ customerId: req.params.id });

        res.json({ message: 'Customer and associated data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};