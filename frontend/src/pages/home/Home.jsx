import MessageContainer from "../../components/messages/MessageContainer";
import Appointments from "../../components/appointments/Appointments";
import NewCustomerForm from "../../components/customers/NewCustomerForm";
import InvoiceList from "../invoice/Invoice";
import { Container } from "@mui/material";
import VehicleDetailsModal from "../../components/vehicle/VehicleDetailsModal";
// from components/customers/NewCustomerForm
import CustomerForm from '../../components/customers/CustomerForm';
import EditCustomer from '../../components/customers/EditCustomer';
import NewCustomer from '../../components/customers/NewCustomer';
const Home = () => {
    return (
		<>
        <Container maxWidth="xl" className="py-6">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			 <NewCustomerForm />
				
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                </div>
            </div>
        </Container>
		</>
    );
};

export default Home;
