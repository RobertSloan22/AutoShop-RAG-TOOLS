import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

const InvoiceContext = createContext();

export const useInvoice = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        try {
            const res = await axios.get('/api/invoices/all', {
                baseURL: process.env.API_URL || 'http://localhost:5000',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setInvoices(res.data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <InvoiceContext.Provider value={{ invoices, setInvoices, loading, fetchInvoices }}>
            {children}
        </InvoiceContext.Provider>
    );
};
