import React, { useState } from 'react';

const AppointmentCard = ({ app, onCancel, onShowDetails }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <div
        className="bg-blue-100 text-sm p-1 rounded mb-1 cursor-pointer"
        onClick={() => onShowDetails(app)} // show details popup
      >
        {app.applicationId}
      </div>
      {showInfo && (
        <div className="bg-white shadow p-2 text-sm rounded">
          <div><strong>Address:</strong> {app.address}</div>
          <div><strong>Phone:</strong> {app.phone}</div>
          <button
            onClick={onCancel}
            className="mt-2 text-red-600 hover:underline text-sm"
          >
            Cancel Visiting
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
