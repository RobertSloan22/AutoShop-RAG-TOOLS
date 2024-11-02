import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    vin: {
        type: String,
        unique: true,
        sparse: true
    },
    licensePlate: String,
    color: String,
    mileage: Number,
    engine: String,
    transmission: String,
    notes: String,
    maintenanceHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceRecord'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'in-service'],
        default: 'active'
    }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema); 