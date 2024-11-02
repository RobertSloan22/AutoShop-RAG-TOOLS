import express from "express";
import { 
    createInvoice, 
    getAllInvoices, 
    getInvoiceById, 
    updateInvoice, 
    deleteInvoice,
    getInvoicesByCustomer 
} from "../controllers/invoice.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Protected routes (require authentication)
router.post("/create", protectRoute, createInvoice);
router.get("/all", protectRoute, getAllInvoices);
router.get("/:id", protectRoute, getInvoiceById);
router.put("/:id", protectRoute, updateInvoice);
router.delete("/:id", protectRoute, deleteInvoice);
router.get("/customer/:email", protectRoute, getInvoicesByCustomer);

export default router;