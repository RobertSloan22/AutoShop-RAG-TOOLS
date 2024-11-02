import mongoose from 'mongoose';

const serviceRecordSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['maintenance', 'repair', 'diagnostic', 'inspection'],
        required: true
    },
    mileage: Number,
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician'
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'waiting-parts', 'cancelled'],
        default: 'scheduled'
    },
    parts: [{
        partId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Part'
        },
        quantity: Number,
        price: Number
    }],
    labor: [{
        description: String,
        hours: Number,
        rate: Number
    }],
    totalCost: Number,
    notes: String,
    diagnosticCodes: [{
        code: String,
        description: String
    }],
    recommendations: [{
        service: String,
        priority: {
            type: String,
            enum: ['high', 'medium', 'low']
        },
        estimatedCost: Number
    }]
}, { timestamps: true });

export default mongoose.model('ServiceRecord', serviceRecordSchema); 