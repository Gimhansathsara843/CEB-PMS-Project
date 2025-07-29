import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import AppointmentForm from './AppointmentForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ appointments, setAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formVisible, setFormVisible] = useState(false);
  const [formDate, setFormDate] = useState(null);
  const [detailsAppointment, setDetailsAppointment] = useState(null);

  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates(selectedDate);

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    setFormDate(date);            // Trigger form for calendar date
    setFormVisible(true);
  };

  const handleGridClick = ({ date, session }) => {
    setFormDate(date);
    setFormVisible(true);
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    setFormVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Calendar in rounded div */}
      <div className="w-full lg:w-1/4 p-4 rounded-xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Select Date</h2>
        <Calendar onChange={handleCalendarSelect} value={selectedDate} />
      </div>

      {/* Weekly Table Grid in rounded div */}
      <div className="w-full lg:w-3/4 px-4">
        <div className="bg-white rounded-xl shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-900">Weekly Schedule</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Table-Based Weekly Grid */}
          <div className="overflow-x-auto border rounded-xl border-gray-300">
            <table className="min-w-full table-fixed text-sm text-center border-collapse">
              {/* Header Row */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-[100px] px-4 py-2 border-r border-gray-300 text-left">Session</th>
                  {weekDates.map((date, i) => (
                    <th
                      key={i}
                      className="px-4 py-2 border-r border-gray-300 last:border-r-0"
                    >
                      <div className="text-xs font-semibold text-gray-600">
                        {days[date.getDay()]}
                      </div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body Rows */}
              <tbody>
                {['Morning', 'Evening'].map((session) => (
                  <tr key={session} className="border border-gray-300">
                    <td
                      className={`text-black font-semibold text-sm tracking-wide border px-4 py-2 ${
                        session === 'Morning' ? 'bg-blue-100' : ''
                      }`}
                    >
                      {session}
                    </td>

                    {weekDates.map((date, i) => {
                      const dateKey = formatDateKey(date);
                      const sessionAppointments = appointments.filter(
                        (app) => app.date === dateKey && app.session === session
                      );

                      return (
                        <td
                          key={i}
                          className="h-[100px] px-2 py-2 align-top border cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => handleGridClick({ date, session })}
                        >
                          {sessionAppointments.map((app, idx) => (
                            <div key={idx} onClick={(e) => e.stopPropagation()}>
                              <AppointmentCard
                                app={app}
                                onCancel={() =>
                                  setAppointments((prev) =>
                                    prev.filter((a) => a !== app)
                                  )
                                }
                                onShowDetails={() => setDetailsAppointment(app)}
                              />
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Appointment Form */}
      {formVisible && (
        <AppointmentForm
          selectedDate={formDate}
          onClose={() => setFormVisible(false)}
          onAdd={handleAddAppointment}
        />
      )}

      {/* Appointment Details Modal */}
      {detailsAppointment && (
        <div
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
          onClick={() => setDetailsAppointment(null)}
        >
          <div
            className="bg-white p-6 rounded-md w-[400px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Applicant Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Application ID:</strong> {detailsAppointment.applicationId}
              </div>
              <div>
                <strong>Address:</strong> {detailsAppointment.address}
              </div>
              <div>
                <strong>Phone:</strong> {detailsAppointment.phone}
              </div>
              <div>
                <strong>Session:</strong> {detailsAppointment.session}
              </div>
              <div>
                <strong>Date:</strong> {detailsAppointment.date}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDetailsAppointment(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAppointments((prev) =>
                    prev.filter((a) => a !== detailsAppointment)
                  );
                  setDetailsAppointment(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel Visiting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
