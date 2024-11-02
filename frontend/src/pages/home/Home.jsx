import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import Invoice from "../invoice/Invoice.jsx"
import Appointments from "../../components/appointments/Appointments";
import InvoiceModal from "../../components/invoice/InvoiceModal";
import CustomerSearch from "../../components/customers/CustomerSearch";
import DTCQueryInterface from "../../components/dtc/DTCQueryInterface";
import InvoiceList from "../invoice/Invoice";
import NewInvoice from "../invoice/NewInvoice";

const Home = () => {
	return (
		<>
	

			
					<InvoiceList/>
			<MessageContainer />
					<Appointments/>
		</>
	);
};

export default Home;
