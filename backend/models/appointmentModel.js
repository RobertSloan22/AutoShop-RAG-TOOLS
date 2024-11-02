import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  time: {
    type: Date,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
