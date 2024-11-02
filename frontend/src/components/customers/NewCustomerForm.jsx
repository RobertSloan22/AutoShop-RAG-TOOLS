import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewCustomerForm = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Customer Information
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        zipCode: '',
        
        // Vehicle Information
        vehicleType: '',
        vehicleNumber: '',
        vin: '',
        color: '',
        mileage: '',
        engine: '',
        transmission: '',
        fuelType: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('/api/customers', formData);
            if (response.data) {
                toast.success('Customer created successfully!');
                if (onSuccess) {
                    onSuccess(response.data);
                }
            }
        } catch (error) {
            console.error('Error creating customer:', error);
            const errorMessage = error.response?.data?.error || 
                               error.response?.data?.details || 
                               'Error creating customer';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="vehicleType"
                        placeholder="Vehicle Type"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="vehicleNumber"
                        placeholder="Vehicle Number"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="vin"
                        placeholder="VIN"
                        value={formData.vin}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="number"
                        name="mileage"
                        placeholder="Mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <input
                        type="text"
                        name="engine"
                        placeholder="Engine"
                        value={formData.engine}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    />
                    <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    >
                        <option value="">Select Transmission</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                        <option value="cvt">CVT</option>
                    </select>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white rounded ${
                    loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {loading ? 'Creating...' : 'Create Customer'}
            </button>
        </form>
    );
};

export default NewCustomerForm;