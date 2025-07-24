import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NewCustomerForm.css";
import ceb from "../../assets/img/ceb.png";


import { CustomerDetails } from "../Forms/StepperComponents/CustomerDetails";
import { ContactPersonDetails } from "../Forms/StepperComponents/ContactPersonDetails.js";
import { ServiceLocationDetails } from "../Forms/StepperComponents/ServiceLocationDetails";
import { ConnectionDetails } from "../Forms/StepperComponents/ConnectionDetails";

const NewCustomerStepper = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completedTabs, setCompletedTabs] = useState(Array(4).fill(false));
  const [customerExists, setCustomerExists] = useState(false);
  const history = useHistory();

  // Customer Details state
  const [customerDetails, setCustomerDetails] = useState({
    idNo: "",
    personalCorporate: "PER",
    idType: "",
    fullName: "",
    firstName: "",
    lastName: "",
    suburb: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    telephoneNo: "",
    mobileNo: "",
    email: "",
    preferredLanguage: "",
  });

  // Contact Person Details state
  const [contactPersonDetails, setContactPersonDetails] = useState({
    contactidNo: "",
    contactName: "",
    contactAddress: "",
    contactTelephone: "",
    contactMobile: "",
    contactEmail: "",
    deptId: "",
  });

  // Service Location Details state
  const [serviceLocationDetails, setServiceLocationDetails] = useState({
    deptId: "",
    serviceStreetAddress: "",
    serviceSuburb: "",
    serviceCity: "",
    servicePostalCode: "",
    assestmentNo: "",
    neigboursAccNo: "",
    customerType: "DOME",
  });

  // Connection Details state
  const [connectionDetails, setConnectionDetails] = useState({
    phase: "",
    connectionType: "",
    customerCategory: "PRIV",
    tariffCatCode: "DP",
    metalCrusher: "",
    sawMills: "",
    weldingPlant: "",
    tariffCode: "11",
    customerType: "DOME",
  });

  // Sync deptId whenever serviceLocationDetails.deptId changes
  useEffect(() => {
    setContactPersonDetails((prevDetails) => ({
      ...prevDetails,
      deptId: serviceLocationDetails.deptId, // Update deptId dynamically
    }));
  }, [serviceLocationDetails.deptId]);

  // Generic handlers for form state updates
  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleContactPersonDetailsChange = (e) => {
    const { name, value } = e.target;
    setContactPersonDetails({ ...contactPersonDetails, [name]: value });
  };

  const handleServiceLocationDetailsChange = (e) => {
    const { name, value } = e.target;
    setServiceLocationDetails({ ...serviceLocationDetails, [name]: value });
  };

  const handleConnectionDetailsChange = (e) => {
    const { name, value } = e.target;
    setConnectionDetails({ ...connectionDetails, [name]: value });
  };

  // Check if a form is completed - basic validation
  const isFormCompleted = (formData, requiredFields) => {
    if (!requiredFields || requiredFields.length === 0) return true;
    return requiredFields.every(
      (field) => formData[field] !== "" && formData[field] !== undefined
    );
  };
  const wiringLandDetailDto = {
    ...serviceLocationDetails,
    ...connectionDetails,
  };
  const applicantDto = { ...customerDetails };
  const applicationDto = { ...contactPersonDetails };


  // const fetchCustomerById = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8082/api/applicants/${id}`
  //     );
  //     if (response.data) {
  //       setCustomerExists(true);
  //       setCustomerDetails({
  //         ...response.data,
  //         mobileNo: response.data.mobileNo || "",
  //         email: response.data.email || "",
  //       });
  //     } else {
  //       setCustomerExists(false);
  //     }
  //   } catch (error) {
  //     setCustomerExists(false);
  //     console.error("Error fetching customer:", error);
  //   }
  // };

  // Add this useEffect for auto-search
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (customerDetails.id && customerDetails.id.length > 5) {
  //       fetchCustomerById(customerDetails.id);
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [customerDetails.id]);

  // Update completed steps when form changes
  useEffect(() => {
    const requiredCustomerFields = [
      "idNo",
      "fullName",
      "mobileNo",
      "streetAddress",
      "city",
      "preferredLanguage",
    ];
    const requiredServiceFields = [
      "deptId",
      "serviceStreetAddress",
      "serviceCity",
    ];
    const requiredConnectionFields = [
      "phase",
      "connectionType",
      "customerCategory",
      "tariffCatCode",
    ];
    const requiredContactFields = ["contactName", "contactMobile"];

    setCompletedTabs([
      isFormCompleted(customerDetails, requiredCustomerFields),
      isFormCompleted(serviceLocationDetails, requiredServiceFields),
      isFormCompleted(connectionDetails, requiredConnectionFields),
      isFormCompleted(contactPersonDetails, requiredContactFields),
    ]);
  }, [
    customerDetails,
    serviceLocationDetails,
    connectionDetails,
    contactPersonDetails,
  ]);
  const handleSubmit = async () => {
    // Basic validation for required fields
    // if (!customerDetails.id || !customerDetails.fullName) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const payload = {
      applicantDto,
      wiringLandDetailDto,
      applicationDto,
    };

    try {
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));

      const response = await fetch("http://localhost:9091/sps-3.3.5/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null); 

      if (response.ok) {
        console.log("Success Response:", responseData);
        alert("Application submitted successfully!");
        history.push({
          pathname: ("/success"),
          state: { 
            applicationNo: responseData.applicationNo, 
            customerName: customerDetails.fullName 
          }
        });
      } else {
        console.error("Failed Response:", responseData);
        alert(
          `Failed to submit application: ${
            responseData?.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application. Check the console for details.");
    }
  };


  const tabs = [
    {
      name: "Customer Details",
      content: (
        <CustomerDetails
          formData={customerDetails}
          handleChange={handleCustomerDetailsChange}
          setFormData={setCustomerDetails}
          customerExists={customerExists}
        />
      ),
    },
    {
      name: "Service Location Details",
      content: (
        <ServiceLocationDetails
          formData={serviceLocationDetails}
          handleChange={handleServiceLocationDetailsChange}
        />
      ),
    },
    {
      name: "Connection Details",
      content: (
        <ConnectionDetails
          formData={connectionDetails}
          handleChange={handleConnectionDetailsChange}
          handleSubmit={handleSubmit}
        />
      ),
    },
    {
      name: "Contact Person Details",
      content: (
        <ContactPersonDetails
          formData={contactPersonDetails}
          handleChange={handleContactPersonDetailsChange}
        />
      ),
    },
  ];

  const handleNext = () => {
    // Tab-specific validation
    if (activeTab === 0) {
      if (
        !customerDetails.idNo ||
        !customerDetails.fullName ||
        !customerDetails.mobileNo ||
        !customerDetails.streetAddress ||
        !customerDetails.city ||
        !customerDetails.preferredLanguage
      ) {
        alert("Please fill all required customer details");
        return;
      }
    } else if (activeTab === 1) {
      if (
        !serviceLocationDetails.deptId ||
        // !serviceLocationDetails.serviceStreetAddress 
        !serviceLocationDetails.serviceCity 
        // !serviceLocationDetails.ownership
      ) {
        alert("Please fill all required service location details");
        return;
      }
    } else if (activeTab === 2) {
      if (
        !connectionDetails.phase ||
        !connectionDetails.connectionType ||
        !connectionDetails.customerCategory ||
        !connectionDetails.tariffCatCode
      ) {
        alert("Please fill all required connection details");
        return;
      }
    } else if (activeTab === 3) {
      if (
        !contactPersonDetails.contactName ||
        !contactPersonDetails.contactMobile
      ) {
        alert("Please fill all required contact person details");
        return;
      }
    }

    // Mark current tab as completed
    const newCompletedTabs = [...completedTabs];
    newCompletedTabs[activeTab] = true;
    setCompletedTabs(newCompletedTabs);

    // Move to next tab if not last
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrev = () => {
    // Simply go back without validation
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="dashboard-header">
          <h1>New Connection Application Form</h1>
          <div className="ceb-logo">
            <img src={ceb} alt="ceb-logo"></img>
          </div>
        </div>

        <div className="form-container">
          <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-6xl mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-1">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-4 mt-4 relative w-full">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      className="relative flex-1 flex flex-col items-center"
                    >
                      {/* Connecting line (optional) */}
                      {index > 0 && (
                        <div
                          className={`absolute top-1/2 left-0 transform -translate-y-1/2 h-1 w-full ${
                            completedTabs[index - 1]
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                          style={{ zIndex: -1 }}
                        ></div>
                      )}

                      {/* Step circle */}
                      <div
                        className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                          completedTabs[index]
                            ? "bg-green-500 text-white border-green-600" // Completed - green
                            : index === activeTab
                            ? "bg-blue-500 text-white border-blue-600" // Active - blue
                            : "bg-gray-200 border-gray-400" // Incomplete - gray
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-xs mt-2">{tab.name}</span>
                    </div>
                  ))}
                </div>

                <div className="ml-0 p-0 bg-blueGray-100">
                  <h6 className=" py-0 text-xl text-center font-bold text-blueGray-700">
                    {tabs[activeTab].name}
                  </h6>
                  <div className="p-2 rounded w-full max-w-5xl">
                    {activeTab === 3 ? (
                      <ContactPersonDetails
                        formData={contactPersonDetails}
                        customerData={customerDetails}
                        setFormData={setContactPersonDetails}
                      />
                    ) : activeTab === 2 ? (
                      <ConnectionDetails
                        formData={connectionDetails}
                        // customerData={customerDetails}
                        setFormData={setConnectionDetails}
                      />
                    ) : (
                      tabs[activeTab].content
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="form-row-button">
                    {activeTab > 0 && (
                      <button
                        onClick={handlePrev}
                        className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-6 py-3  rounded shadow hover:shadow-md transition duration-150"
                      >
                        Previous
                      </button>
                    )}

                    {activeTab < tabs.length - 1 ? (
                      <button
                        onClick={handleNext}
                        className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition duration-150"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition duration-150"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerStepper;
