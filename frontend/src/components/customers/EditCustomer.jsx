import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import CustomerForm from './CustomerForm';

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch customer details
                const customerRes = await axiosInstance.get(`/customers/${id}`);
                
                // Attempt to fetch vehicle data, but don't fail if none exists
                let vehicleData = {};
                try {
                    const vehiclesRes = await axiosInstance.get(`/customers/${id}/vehicles`);
                    if (vehiclesRes.data && vehiclesRes.data.length > 0) {
                        vehicleData = vehiclesRes.data[0];
                    }
                } catch (vehicleError) {
                    console.log('No vehicle data found or error fetching vehicles');
                }

                // Initialize all fields with empty values first
                const initialData = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    city: '',
                    zipCode: '',
                    notes: '',
                    year: '',
                    make: '',
                    model: '',
                    trim: '',
                    vin: '',
                    licensePlate: '',
                    color: '',
                    mileage: '',
                    engine: '',
                    transmission: '',
                    fuelType: '',
                    isAWD: false,
                    is4x4: false,
                    vehicleNotes: ''
                };

                // Then overlay with any existing data
                const combinedData = {
                    ...initialData,
                    ...customerRes.data,
                    ...vehicleData,
                    vehicleNotes: vehicleData.notes || ''
                };

                setCustomerData(combinedData);
                console.log('Loaded customer data:', combinedData);

            } catch (error) {
                console.error('Error fetching customer:', error);
                setError(error.response?.data?.message || 'Error loading customer data');
                toast.error('Failed to load customer information');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCustomerData();
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            
            // Split data into customer and vehicle information
            const customerUpdate = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
                notes: formData.notes
            };

            const vehicleUpdate = {
                customerId: id,
                year: formData.year,
                make: formData.make,
                model: formData.model,
                trim: formData.trim,
                vin: formData.vin,
                licensePlate: formData.licensePlate,
                color: formData.color,
                mileage: formData.mileage,
                engine: formData.engine,
                transmission: formData.transmission,
                fuelType: formData.fuelType,
                isAWD: formData.isAWD,
                is4x4: formData.is4x4,
                notes: formData.vehicleNotes
            };

            // Update customer
            await axiosInstance.put(`/customers/${id}`, customerUpdate);

            // Handle vehicle update/creation
            try {
                const vehiclesRes = await axiosInstance.get(`/customers/${id}/vehicles`);
                if (vehiclesRes.data && vehiclesRes.data.length > 0) {
                    await axiosInstance.put(`/vehicles/${vehiclesRes.data[0]._id}`, vehicleUpdate);
                } else {
                    await axiosInstance.post('/vehicles', vehicleUpdate);
                }
            } catch (vehicleError) {
                console.error('Error updating vehicle:', vehicleError);
                toast.warning('Customer updated but vehicle information may not have saved correctly');
            }

            toast.success('Customer information updated successfully');
            navigate(`/customers/${id}`);

        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error(error.response?.data?.message || 'Error updating customer information');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-8">
                <p>{error}</p>
                <button 
                    onClick={() => navigate('/customers')}
                    className="mt-4 text-blue-500 hover:text-blue-400"
                >
                    Return to Customers
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Customer</h2>
            {customerData && (
                <CustomerForm 
                    customer={customerData}
                    onSubmit={handleSubmit}
                    isEditing={true}
                />
            )}
        </div>
    );
};

export default EditCustomer;