import Invoice from "../models/invoice.model.js";

// Create a new invoice
export const createInvoice = async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error("Error in createInvoice: ", error);
        res.status(500).json({ error: "Error creating invoice" });
    }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error in getAllInvoices: ", error);
        res.status(500).json({ error: "Error fetching invoices" });
    }
};

// Get single invoice by ID
export const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error("Error in getInvoiceById: ", error);
        res.status(500).json({ error: "Error fetching invoice" });
    }
};

// Update invoice
export const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedInvoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error("Error in updateInvoice: ", error);
        res.status(500).json({ error: "Error updating invoice" });
    }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        console.error("Error in deleteInvoice: ", error);
        res.status(500).json({ error: "Error deleting invoice" });
    }
};

// Get invoices by customer email
export const getInvoicesByCustomer = async (req, res) => {
    try {
        const customerEmail = req.params.email;
        const invoices = await Invoice.find({ customerEmail })
            .sort({ createdAt: -1 });
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error in getInvoicesByCustomer: ", error);
        res.status(500).json({ error: "Error fetching customer invoices" });
    }
};