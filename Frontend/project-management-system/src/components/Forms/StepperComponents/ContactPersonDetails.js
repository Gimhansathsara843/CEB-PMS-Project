import React, { useState, useEffect } from "react";

const ContactPersonDetails = ({ formData, setFormData, handleChange, customerData }) => {
  const [isSelected, setIsSelected] = useState(false);

  // Create state to manage manually entered data
  const [manualData, setManualData] = useState({
    contactidNo: formData.contactidNo||"",
    contactName: formData.contactName||"",
    contactAddress: formData.contactAddress||"",
    contactTelephone: formData.contactTelephone||"",
    contactMobile: formData.contactMobile||"",
    contactEmail: formData.contactEmail||"",
  });

  // Handles the checkbox selection to copy customer data
  const handleselect = () => {
    setIsSelected((prevState) => {
      const newState = !prevState;

      if (newState) {
        // When checkbox is selected, copy customer details to form data
        const fullAddress = [
          customerData.streetAddress,
          customerData.suburb,
          customerData.city,
          customerData.postalCode
        ].filter(Boolean).join(', ');

        setFormData({
          ...formData,
          contactidNo: customerData.idNo,
          contactName: customerData.fullName,
          contactAddress: fullAddress,
          contactTelephone:customerData.telephoneNo,
          contactMobile:  customerData.mobileNo,
          contactEmail: customerData.email,
        });
        // Update manual data state with customer data
        setManualData({
          contactidNo: customerData.idNo,
          contactName: customerData.fullName,
          contactAddress: fullAddress,
          contactTelephone: customerData.telephoneNo,
          contactMobile: customerData.mobileNo,
          contactEmail: customerData.email,
        });
      } else {
        // When checkbox is unselected, clear both form data and manual data
        setFormData({
          ...formData,
          contactidNo: '',
          contactName: '',
          contactAddress: '',
          contactTelephone: '',
          contactMobile: '',
          contactEmail: '',
        });
        setManualData({
          contactidNo: '',
          contactName: '',
          contactAddress: '',
          contactTelephone: '',
          contactMobile: '',
          contactEmail: '',
        });
      }

      return newState;
    });
  };

  return (
    <div className="form-box">
      <div className="checkbox-label">
        <label>
          <input
            type="checkbox"
            className="checkbox-input"
            style={{paddingLeft:"5px"}}
            checked={isSelected}
            onChange={handleselect}
          />
          <span><b>Same as Customer Details</b></span>
        </label>
      </div>
      <div className="form-box-inner">
        <div className="form-group">
          <label className="form-label" htmlFor="contactidNo">ID:</label>
          <input
            type="text"
            id="contactidNo"
            name="contactidNo"
            className="form-input"
            value={manualData.contactidNo}
            onChange={(e) => setManualData({ ...manualData, contactidNo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contactName">Contact Name:</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            className="form-input"
            value={manualData.contactName}
            onChange={(e) => setManualData({ ...manualData, contactName: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contactAddress">Contact Address:</label>
          <input
            type="text"
            id="contactAddress"
            name="contactAddress"
            className="form-input"
            value={manualData.contactAddress}
            onChange={(e) => setManualData({ ...manualData, contactAddress: e.target.value })}
          />
        </div>
      </div>
      <div className="form-box-inner">
        <div className="form-group">
          <label className="form-label" htmlFor="contactTelephone">Telephone No:</label>
          <input
            type="tel"
            id="contactTelephone"
            name="contactTelephone"
            className="form-input"
            value={manualData.contactTelephone}
            onChange={(e) => setManualData({ ...manualData, contactTelephone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="pmobileNo">Mobile no:</label>
          <input
            type="tel"
            id="contactMobile"
            name="contactMobile"
            className="form-input"
            value={manualData.contactMobile}
            onChange={(e) => setManualData({ ...manualData, contactMobile: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="pemail">Email:</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          className="form-input"
          value={manualData.contactEmail}
          onChange={(e) => setManualData({ ...manualData, contactEmail: e.target.value })}
        />
      </div>
    </div>
  );
};

export { ContactPersonDetails };
