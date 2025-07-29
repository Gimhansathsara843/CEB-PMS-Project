import React, { useState } from 'react';

const AppointmentForm = ({ selectedDate, onClose, onAdd }) => {
  const [appId, setAppId] = useState('');
  const [session, setSession] = useState('Morning');
  const [inspector, setInspector] = useState('');

  const fakeApplications = [
    { id: 'APP001', address: '123 Main St', phone: '0771234567' },
    { id: 'APP002', address: '456 Park Ave', phone: '0719876543' },
    { id: 'APP003', address: '789 Lake Rd', phone: '0756789012' },
  ];

  const fakeInspectors = ['User A', 'User B'];

  const handleSubmit = () => {
    const appData = fakeApplications.find((app) => app.id === appId);
    if (appData && inspector) {
      const appointment = {
        applicationId: appId,
        session,
        inspector,
        date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
        ...appData,
      };
      onAdd(appointment);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Appointment</h3>
        <div className="space-y-3">
          <select
            className="w-full border p-2 rounded"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          >
            <option>Select application number</option>
            {fakeApplications.map((app) => (
              <option key={app.id} value={app.id}>{app.id}</option>
            ))}
          </select>

          <select
            className="w-full border p-2 rounded"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          <select
            className="w-full border p-2 rounded"
            value={inspector}
            onChange={(e) => setInspector(e.target.value)}
          >
            <option>Select inspector</option>
            {fakeInspectors.map((user, idx) => (
              <option key={idx} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded "
          >
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
