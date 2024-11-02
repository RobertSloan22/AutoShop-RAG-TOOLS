// Create a new Context for customers 

import { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const selectCustomerAndVehicle = (customer, vehicle) => {
        setCurrentCustomer(customer);
        setCurrentVehicle(vehicle);
    };

    const clearSelection = () => {
        setCurrentCustomer(null);
        setCurrentVehicle(null);
    };

    const searchCustomers = async (searchTerm) => {
        try {
            const response = await fetch(`/api/customers/search?term=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching customers:', error);
        }
    };

    return (
        <CustomerContext.Provider value={{ 
            currentCustomer, 
            currentVehicle,
            searchResults,
            selectCustomerAndVehicle,
            clearSelection,
            searchCustomers
        }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => useContext(CustomerContext);


