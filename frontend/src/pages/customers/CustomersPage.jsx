import React from 'react';
import { Link } from 'react-router-dom';
import CustomerSearch from '../../components/customers/CustomerSearch';
import { useInvoice } from '../../context/InvoiceContext';

const CustomersPage = ({ children }) => {
    const { invoices, loading } = useInvoice();
    const activeInvoices = invoices.filter(invoice => invoice.status === 'active');

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Customers</h1>
                    <Link
                        to="/customers/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add New Customer
                    </Link>
                </div>
                
                <div className="mb-6">
                    <CustomerSearch />
                </div>

                {/* Active Invoices Section */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">Active Invoices</h2>
                    {loading ? (
                        <div className="text-white">Loading invoices...</div>
                    ) : activeInvoices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeInvoices.map((invoice) => (
                                <div key={invoice._id} className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white font-medium">
                                                {invoice.customerName}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                Invoice #{invoice.invoiceNumber}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(invoice.invoiceDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/invoice/${invoice._id}`}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No active invoices</p>
                    )}
                </div>

                {/* Main Content (Children) */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
