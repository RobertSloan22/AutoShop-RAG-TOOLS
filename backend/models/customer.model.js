import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    zipCode: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    preferredContact: {
        type: String,
        enum: ['email', 'phone', 'text'],
        default: 'email'
    }
}, {
    timestamps: true
});

// Add text index for search functionality
customerSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
    phoneNumber: 'text'
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
