import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .put(updateAppointment)
  .delete(deleteAppointment);

export default router;
