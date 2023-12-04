// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

// GET all appointments
router.get('/', getAppointments);

// POST create a new appointment
router.post('/', createAppointment);

// PATCH update an appointment
router.patch('/:appointmentId', updateAppointment);

// DELETE delete an appointment
router.delete('/:appointmentId', deleteAppointment);

module.exports = router;
