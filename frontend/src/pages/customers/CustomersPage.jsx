import React from 'react';
import { Link } from 'react-router-dom';
import CustomerSearch from '../../components/customers/CustomerSearch';
import { useInvoice } from '../../context/InvoiceContext';
import NewCustomerForm from '../../components/customers/NewCustomerForm';
import UnifiedDashboard from '../dashboard/UnifiedDashboard';
import { useNavigate } from 'react-router-dom';
import CustomerForm from '../../components/customers/CustomerForm';
import EditCustomer from '../../components/customers/EditCustomer';
import Overview from '../dashboard/Overview';
import NewCustomer from '../../components/customers/NewCustomer';
import CustomerDetails from './CustomerDetails';
const CustomersPage = ({ children }) => {
    const { invoices, loading } = useInvoice();
    const activeInvoices = invoices.filter(invoice => invoice.status === 'active');

    return (
        <>
       
         <div className="bg-gray-800 rounded-lg p-6">

        </div>
        <div className="bg-gray-800 rounded-lg p-6">

        </div>
        <div className="flex w-[70vw]">
            
            <div className="flex-1 p-6 space-y-6">
                <div className="flex justify-between items-center">
            
                   
                                    </div>
                <div className="bg-gray-800 rounded-lg p-6">
                
                </div>

            </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
     
        <CustomerForm />
        </div>
        </>
    );
};

export default CustomersPage;
