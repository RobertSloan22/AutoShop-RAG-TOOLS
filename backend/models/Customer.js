const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleType: { type: String, required: true },
    vehicleMake: { type: String,
        enum: ['bmw', 'mercedes', 'audi', 'volkswagen', 'ford', 'chevrolet', 'honda', 'toyota', 'nissan', 'hyundai', 'kia', 'other'],
        required: true },
    vehicleModel: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    vin: { type: String, required: true },
    color: { type: String,
        enum: ['red', 'blue', 'green', 'black', 'white', 'gray', 'yellow', 'orange', 'purple', 'pink', 'brown', 'silver', 'gold', 'other'],
        required: true },
    mileage: { type: Number, required: true },
    engine: { 
        type: String,
        enum: ['4-cylinder', '6-cylinder', '8-cylinder', 'electric'],
        required: true 
    },
    transmission: { 
        type: String, 
        enum: ['automatic', 'manual', 'cvt'],
        required: true 
    },
    fuelType: { 
        type: String,
        enum: ['gasoline', 'diesel', 'electric', 'hybrid'],
        required: true 
    }
});

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    vehicles: [vehicleSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
module.exports = mongoose.model('Vehicle', vehicleSchema);
