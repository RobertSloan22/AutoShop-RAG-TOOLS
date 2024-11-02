import React, { useState } from 'react';
import CustomerDetails from './CustomerDetails';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CustomerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (term.length >= 2) {
            setLoading(true);
            try {
                console.log('Searching with URL:', `/api/customers/search?term=${term}`);
                
                const response = await axios.get(`/api/customers/search?term=${term}`);
                console.log('Search response:', response.data);
                
                setSearchResults(response.data);
                setShowResults(true);
            } catch (error) {
                console.error('Search error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setShowResults(false);
        setSearchTerm('');
    };

    return (
        <div className="relative">
            <div className="flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search customers..."
                    className="bg-gray-700 text-white px-4 py-2 rounded w-64"
                />
                {loading && (
                    <div className="ml-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                )}
            </div>
            
            {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-gray-800 rounded-lg shadow-lg z-50">
                    {searchResults.map(customer => (
                        <div
                            key={customer._id}
                            onClick={() => handleCustomerClick(customer)}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                        >
                            {customer.firstName} {customer.lastName}
                        </div>
                    ))}
                </div>
            )}

            {showResults && searchResults.length === 0 && searchTerm.length >= 2 && (
                <div className="absolute top-full mt-1 w-full bg-gray-800 rounded-lg shadow-lg z-50 p-4 text-gray-400">
                    No customers found
                </div>
            )}

            {selectedCustomer && (
                <CustomerDetails
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}
        </div>
    );
};

export default CustomerSearch;
