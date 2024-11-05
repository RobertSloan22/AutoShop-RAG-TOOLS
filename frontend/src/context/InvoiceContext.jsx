import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

const InvoiceContext = createContext();

export const useInvoice = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        try {
            const res = await api.get('/api/invoices/all');
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
