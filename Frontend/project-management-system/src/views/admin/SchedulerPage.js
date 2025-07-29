import React, { useState } from 'react';
import CalendarGrid from "components/Scheduler/CalendarGrid";
//import AppointmentForm from "components/Scheduler/AppointmentForm";

const SchedulerPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateClick = ({ date, session }) => {
    setSelectedSlot({ date, session });
    setShowForm(true);
  };

  const handleAddAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">CEB Appointment Scheduler</h1>

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 max-w-7xl mx-auto">
        <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
          <CalendarGrid
            appointments={appointments}
            setAppointments={setAppointments}
            onDateClick={handleDateClick}
          />
        </div>
      </div>

      {/* {showForm && (
        <AppointmentForm
          selectedDate={selectedSlot}
          onAdd={handleAddAppointment}
          onClose={() => setShowForm(false)}
        />
      )} */}
    </div>
  );
};

export default SchedulerPage;
