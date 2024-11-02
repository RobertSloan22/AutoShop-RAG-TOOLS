import { InvoiceForm } from '../../components/invoice/InvoiceForm';
import { useCustomer } from '../../context/CustomerContext';

const NewInvoice = () => {
    const { selectedCustomer } = useCustomer();

    const handleSubmit = async (formData) => {
        // Handle the API call to create new invoice
        const response = await fetch('/api/invoices/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create invoice');
        }
    };

    return (
        <div>
            <InvoiceForm 
                initialData={{
                    customerName: selectedCustomer?.name,
                    customerEmail: selectedCustomer?.email,
                    phoneNumber: selectedCustomer?.phone,
                    address: selectedCustomer?.address,
                    city: selectedCustomer?.city,
                    zip: selectedCustomer?.zip,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default NewInvoice; 