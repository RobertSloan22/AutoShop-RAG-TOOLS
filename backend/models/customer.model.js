import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    notes: { type: String },
    preferredContact: { type: String, enum: ['email', 'phone', 'text'] }
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
