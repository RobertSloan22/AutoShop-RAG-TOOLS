import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/layout/Sidebar';
//import all components needed for the chat feature
import MessageContainer from "../../components/messages/MessageContainer";
import { Link } from "react-router-dom";
import Invoice from "../invoice/Invoice.jsx"
import Appointments from "../../components/appointments/Appointments";
import InvoiceModal from "../../components/invoice/InvoiceModal";
import CustomerSearch from "../../components/customers/CustomerSearch";
import DTCQueryInterface from "../../components/dtc/DTCQueryInterface";

//import the message container

const Overview = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Appointments Today', value: '8', icon: '📅' },
        { label: 'Vehicles In Service', value: '5', icon: '🚗' },
        { label: 'Pending Invoices', value: '3', icon: '📄' },
        { label: 'Low Stock Items', value: '12', icon: '⚠️' }
    ];

    const quickActions = [
        { label: 'New Appointment', action: () => navigate('/appointments/new'), icon: '📅' },
        { label: 'New Customer', action: () => navigate('/customers/new'), icon: '👥' },
        { label: 'New Service Record', action: () => navigate('/service-records/new'), icon: '🔧' },
        { label: 'Order Parts', action: () => navigate('/parts/order'), icon: '📦' }
    ];

    return (
        <>
        <Navbar />
        <MessageContainer />

        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <span className="text-2xl mb-2">{action.icon}</span>
                            <span className="text-white">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Appointments */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Today's Appointments</h2>
                    <div className="space-y-4">
                        {/* Add appointment list items here */}
                    </div>
                </div>

                {/* Recent Service Records */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Service Records</h2>
                    <div className="space-y-4">
                        {/* Add service record list items here */}
                    </div>
                </div>
            </div>
        </div>
      
        </>
    );
};

export default Overview; 