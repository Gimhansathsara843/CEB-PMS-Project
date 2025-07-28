import React, { useEffect, useState } from "react";
import axios from "axios";
import {api} from "../../../apiService";

// eslint-disable-next-line react-hooks/rules-of-hooks

const CustomerDetails = ({ formData, setFormData, handleChange }) => {
  const [customerExists, setCustomerExists] = useState(false);

  // Function for automatically selecting the radio of idtype
  const handleSelectIdType = (e) => {
    const selectValue = e.target.value;
    setFormData((prevdetails) => ({
      ...prevdetails,
      personalCorporate: selectValue,
      idType: selectValue === "PER" ? "NIC" : "BusRegNo",
    }));
    if (selectValue === "PER") {
      document.getElementById("NIC").checked = true;
    } else if (selectValue === "COR") {
      document.getElementById("BusRegNo").checked = true;
    } else {
      document.getElementById("NIC").checked = false;
      document.getElementById("BusRegNo").checked = false;
    }
  };

  const handlefind = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/materialdata-0.0.1-SNAPSHOT/api/applicants/${formData.idNo}`
      // );
      const response = await api.findApplicant(formData.idNo)
      if (response.data) {
        setCustomerExists(true);
        setFormData((prev) => ({
          ...prev,
          idNo: prev.idNo || response.data.idNo, 
          idType: prev.idType || response.data.idType,
          personalCorporate:
            response.data.personalCorporate || prev.personalCorporate,
          fullName: response.data.fullName || prev.fullName,
          firstName: response.data.firstName || prev.firstName,
          lastName: response.data.lastName || prev.lastName,
          streetAddress: response.data.streetAddress || prev.streetAddress,
          suburb: response.data.suburb || prev.suburb,
          city: response.data.city || prev.city,
          postalCode: response.data.postalCode || prev.postalCode,
          telephoneNo: response.data.telephoneNo || prev.telephoneNo,
          mobileNo: response.data.mobileNo || prev.mobileNo,
          email: response.data.email || prev.email,
        }));
      } else {
        setCustomerExists(false);
      }
    } catch (error) {
      console.error("error fetcing data", error);
      setCustomerExists(false);
    }
  };

  return (
    <div className="dashboard-card">
      <div className="form-box-board">
      <div className="form-box">
        <div className="form-row">
            <div className="form-box-inner">
              <div className="form-group">
                <label className="form-label" htmlFor="suburb">
                  Temp ID:
                </label>
                <input
                    type="text"
                    id="tempId"
                    name="tempId"
                    className="form-input"
                  //  value={formData.suburb}
                    onChange={handleChange}
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    // readOnly={customerExists}
                    required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="suburb">
                  Application No:
                </label>
                <input
                    type="text"
                    id="applicationNo"
                    name="applicationNo"
                    className="form-input"
                   // value={formData.suburb}
                    onChange={handleChange}
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    // readOnly={customerExists}
                    required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="suburb">
                  Online Application No:
                </label>
                <input
                    type="text"
                    id="onlineApllicationNo"
                    name="onlineApllicationNo"
                    className="form-input"
                   // value={formData.suburb}
                    onChange={handleChange}
                    onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    // readOnly={customerExists}
                    required
                />
              </div>

            </div>
          <div className="">
            <button value="find" onClick={handlefind} className="find-button-search">
              search
            </button>
          </div>
        </div>
      </div>
      </div>
      <br/>
      <div className="form-box-board">
      <div className="form-box">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Personal/Corporate</label>
            <select
              id="type"
              name="personalCorporate"
              className="form-select-halfhalf"
              onChange={handleSelectIdType}
              value={formData.personalCorporate}
              disabled={customerExists}
            >
              <option value="PER">Personal</option>
              <option value="COR">Corporate</option>
            </select>
          </div>
        </div>

        <div className="form-box-inner">
          <div className="form-group">
            <div className="form-group-inline">
              <div className="form-row">
                <label className="form-label required" htmlFor="IdType">
                  ID Type:
                </label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      id="NIC"
                      name="idType"
                      value="NIC"
                      className="radio-input"
                      checked={formData.idType === "NIC"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          idType: e.target.value,
                        }))
                      }
                      disabled={customerExists}
                    />
                    <span>NIC</span>
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      id="BusRegNo"
                      name="idType"
                      value="BRN"
                      className="radio-input"
                      checked={formData.idType === "BRN"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          idType: e.target.value,
                        }))
                      }
                      disabled={customerExists}
                    />
                    <span>Business Reg No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inline">
              <label className="form-idlabel required" htmlFor="id">
                ID:
              </label>
              <input
                type="text"
                id="idNo"
                name="idNo"
                className="form-input"
                required
                value={formData.idNo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-inline">
              <button value="find" onClick={handlefind} className="find-button">
                Find
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label required" htmlFor="fullName">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input"
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            required
            value={formData.fullName}
            onChange={handleChange}
            readOnly={customerExists}
          />
        </div>
        <div className="form-box-inner">
          <div className="form-group">
            <label className="form-label required" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              required
              value={formData.firstName}
              onChange={handleChange}
              readOnly={customerExists}
            />
          </div>
          <div className="form-group">
            <label className="form-label required" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              required
              value={formData.lastName}
              onChange={handleChange}
              // readOnly={customerExists}
            />
          </div>
        </div>

        <div className="form-box-inner">
          <div className="form-group">
            <label className="form-label required" htmlFor="streetAddress">
              Home/Company No:
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              className="form-input"
              value={formData.streetAddress}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}            
              onChange={handleChange}
              // readOnly={customerExists}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="suburb">
              Street Name:
            </label>
            <input
              type="text"
              id="suburb"
              name="suburb"
              className="form-input"
              value={formData.suburb}
              onChange={handleChange}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              // readOnly={customerExists}
              required
            />
          </div>
        </div>
        <div className="form-box-inner">
          <div className="form-group">
            <label className="form-label required" htmlFor="city">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              // readOnly={customerExists}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="postalCode">
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="form-input"
              value={formData.postalCode}
              onChange={handleChange}
              // readOnly={customerExists}
            />
          </div>
        </div>

        <div className="form-box-inner">
          <div className="form-group">
            <label className="form-label" htmlFor="telephoneNo">
              Telephone No:
            </label>
            <input
              type="tel"
              id="telephoneNo"
              name="telephoneNo"
              className="form-input"
              placeholder="0xxxxxxxx"
              value={formData.telephoneNo}
              onChange={handleChange}
              // readOnly={customerExists}
            />
          </div>
          <div className="form-group">
            <label className="form-label required" htmlFor="mobileNo">
              Mobile No:
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              className="form-input"
              placeholder="07xxxxxxxx"
              pattern="07[0-9]{8}"
              title="Phone number must start with 07 and be 10 digits total"
              required
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-box-inner">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
                type="email"
                id="email"
                name="email"
                className="form-select-halfhalf"
                value={formData.email}
                onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-row">
          <label
            className="form-label required"
            htmlFor="language"
            style={{ minWidth: "120px" }}
          >
            Preferred Language:
          </label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="preferredLanguage"
                value="SI"
                className="radio-input"
                checked={formData.preferredLanguage === "SI"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredLanguage: e.target.value,
                  }))
                }
                // disabled={customerExists}
              />
              <span>Sinhala</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="preferredLanguage"
                value="TA"
                className="radio-input"
                checked={formData.preferredLanguage === "TA"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredLanguage: e.target.value,
                  }))
                }
                // disabled={customerExists}
              />
              <span>Tamil</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="preferredLanguage"
                value="EN"
                className="radio-input"
                checked={formData.preferredLanguage === "EN"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredLanguage: e.target.value,
                  }))
                }
                // disabled={customerExists}
              />
              <span>English</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export { CustomerDetails };
