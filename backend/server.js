import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import customerRoutes from './routes/customerRoutes.js';
import dtcRoutes from './routes/dtc.routes.js';
import vehicleRoutes from "./routes/vehicle.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import partsRoutes from "./routes/parts.routes.js";
import technicianRoutes from "./routes/technician.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use('/api/customers', customerRoutes);
app.use(dtcRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/technicians", technicianRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist-electron")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist-electron", "index.html"));
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-yt.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
