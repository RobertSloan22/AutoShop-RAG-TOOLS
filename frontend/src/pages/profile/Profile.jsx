import { Grid, Container, AppBar, Toolbar } from '@mui/material';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import Invoice from "../invoice/Invoice.jsx"
import Appointments from "../../components/appointments/Appointments";
import InvoiceModal from "../../components/invoice/InvoiceModal";
import CustomerSearch from "../../components/customers/CustomerSearch";
import DTCQueryInterface from "../../components/dtc/DTCQueryInterface";
// import invoice and new invoice from invoice folder
import InvoiceContainer from "../invoice/Invoice";
import NewInvoice from "../invoice/NewInvoice";
// import service list from service folder
import ServiceList from "../services/ServiceList";


const Profile = () => {
	return (
		<>
			<AppBar position="static">
				<Toolbar className="bg-gray-800">
					<div className="flex justify-between items-center w-full">
						<Link to="/" className="text-white font-bold">Chat App</Link>
						<CustomerSearch/>
						
						<div className="space-x-4">
							<Link to="/invoices" className="text-gray-300 hover:text-white">DTC-Query</Link>
							<Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
							<Link to="/activant" className="text-gray-300 hover:text-white">Activant</Link>
						</div>
					</div>
				</Toolbar>
			</AppBar>

			<DTCQueryInterface/>	
			<MessageContainer/>
		</>
	);
};

export default Profile;
