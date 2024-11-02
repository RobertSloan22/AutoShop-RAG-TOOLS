import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';
import enUS from 'date-fns/locale/en-US';
import AppointmentList from './AppointmentsList';
import MessageContainer from '../messages/MessageContainer';
// import customersearch


const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({
    customerName: '',
    phoneNumber: '',
    vehicle: '',
    complaint: '',
    notes: '',
    time: new Date().toISOString().slice(0, 16),
    start: new Date(),
    end: new Date()
  });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get('/api/appointments');
      // Add debug logging to see what we're getting from the API
      console.log('Raw appointments from API:', data);
      
      const formattedAppointments = data.map(apt => ({
        ...apt,
        start: new Date(apt.start),
        end: new Date(apt.end),
        time: new Date(apt.start).toISOString().slice(0, 16),
        title: `${apt.customerName} - ${apt.vehicle}` // Ensure each appointment has a title
      }));
      
      // Debug log to verify the formatted appointments
      console.log('Formatted appointments:', formattedAppointments);
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSelect = ({ start, end }) => {
    setSelectedAppointment({
      ...selectedAppointment,
      time: start.toISOString().slice(0, 16),
      start,
      end
    });
  };

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event);
    setShowAppointmentModal(true);
  };

  const handleSaveAppointment = async (appointment) => {
    try {
      const newAppointment = {
        ...appointment,
        title: `${appointment.customerName} - ${appointment.vehicle}`,
        start: new Date(appointment.time),
        end: new Date(new Date(appointment.time).setHours(new Date(appointment.time).getHours() + 1))
      };

      if (appointment._id) {
        // Update existing appointment
        await axios.put(`/api/appointments/${appointment._id}`, newAppointment);
      } else {
        // Create new appointment
        await axios.post('/api/appointments', newAppointment);
      }
      
      await fetchAppointments(); // Refresh appointments list

      // Reset form
      setSelectedAppointment({
        customerName: '',
        phoneNumber: '',
        vehicle: '',
        complaint: '',
        notes: '',
        time: new Date().toISOString().slice(0, 16),
        start: new Date(),
        end: new Date()
      });
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  // Update calendarStyles to use transparent backgrounds
  const calendarStyles = {
    // Add this at the top of your calendarStyles
    '*': {
        color: 'white !important'
    },
    
    // Calendar container
 
    // Header text
    '.rbc-header': {
      color: 'white',
      backgroundColor: 'transparent',
    },
    '.rbc-view-header': {
      color: 'white',
      backgroundColor: 'transparent',
    },
    // Time gutter
    '.rbc-time-gutter': {
      color: 'white',
      backgroundColor: 'transparent',
    },
    // Event styling
    '.rbc-event': {
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      color: 'white',
      border: 'none',
    },
    '.rbc-event-content': {
      backgroundColor: 'transparent',
    },
    '.rbc-event-label': {
      backgroundColor: 'transparent',
    },
    '.rbc-selected': {
      backgroundColor: 'rgba(59, 130, 246, 0.8) !important',
    },
    '.rbc-event-overlaps': {
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    },
    '.rbc-event-continues-after': {
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    },
    '.rbc-event-continues-prior': {
      backgroundColor: 'transparent',
    },
    // Today's date highlight
    '.rbc-today': {
      backgroundColor: 'transparent',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      color: 'white',
    },
    // Off-range dates
    '.rbc-off-range': {
      color: 'rgba(128, 128, 128, 0.5)',
      backgroundColor: 'transparent',
    },
    // Time slots
    '.rbc-time-slot': {
      color: 'gray',
      backgroundColor: 'transparent',
    },
    // Current time indicator
    '.rbc-current-time-indicator': {
      backgroundColor: 'rgba(239, 68, 68, 0.7)',
    },
    // Additional styles to ensure transparency
    '.rbc-day-bg': {
      backgroundColor: 'transparent',
    },
    '.rbc-month-row': {
      backgroundColor: 'transparent',
    },
    '.rbc-month-row-bg': {
      backgroundColor: 'transparent',
    },
    '.rbc-toolbar': {
      color: 'white',
      marginBottom: '1rem',
    },
    '.rbc-toolbar button': {
      color: 'white !important',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textTransform: 'none',
      fontWeight: 'normal',
    },
    '.rbc-toolbar button:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white !important',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    '.rbc-toolbar button.rbc-active': {
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      color: 'white !important',
      border: '1px solid rgba(59, 130, 246, 0.7)',
    },
    '.rbc-toolbar button.rbc-active:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      color: 'white !important',
    },
    '.rbc-toolbar button:focus': {
      color: 'white !important',
    },
    '.rbc-toolbar button:disabled': {
      color: 'rgba(255, 255, 255, 0.5) !important',
    },
    '.rbc-btn-group button': {
      color: 'white !important',
    },

    // Month/Week/Day/Agenda text
    '.rbc-toolbar-label': {
      color: 'white',
      fontWeight: 'bold',
    }

    // Header cells (day names)

  };

  return (
    <>
    <MessageContainer/>
    <div className="flex">
      <div className="ml-auto min-h-screen p-4 text-white">
        <div className="flex flex-col justify-end min-w-96 mx-auto pt-20">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 [&_*]:text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Calendar</h2>
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Create Appointment
              </button>
            </div>
            
            {/* Modal */}
            {showAppointmentModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Create Appointment</h2>
                    <button
                      onClick={() => setShowAppointmentModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <AppointmentForm
                    onSave={(appointment) => {
                      handleSaveAppointment(appointment);
                      setShowAppointmentModal(false);
                    }}
                    selectedAppointment={selectedAppointment}
                  />
                </div>
              </div>
            )}

            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              style={{
                color: 'white',
                height: '70vh', 
                width: '70vw',
                ...calendarStyles 
              }}
              selectable
              onSelectSlot={handleSelect}
              onSelectEvent={handleSelectEvent}
              defaultView='month'
              className="text-white"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Appointments;
