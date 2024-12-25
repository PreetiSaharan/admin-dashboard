import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import BasicDetails from "./BasicDetails";
import Address from "./Address";
import FileUpload from "./FileUpload";
import MultiFileUpload from "./MultiFileUpload";
import Status from "./Status";
import ProgressBar from "./ProgressBar";
import { validateFields } from "../utils/validateFields"; // Import the validation function

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    singleFile: null,
    multiFiles: [],
    geolocation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  // Check if the user is authenticated (i.e., has an auth token)
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // If not authenticated, redirect to login page
      navigate("/login");
    }
  }, [navigate]); // Depend on navigate to re-run when necessary
  
  // Validate the form fields whenever formData or currentStep changes
  useEffect(() => {
    const errors = validateFields(formData);
    setFormErrors(errors);

    // Check if the current step fields are valid
    const isValid = currentStep === 1
      ? !errors.name && !errors.email && !errors.phone // Step 1
      : currentStep === 2
      ? !errors.addressLine1 && !errors.city && !errors.state && !errors.pincode // Step 2
      : true; // Other steps don't require validation for now

    setIsNextDisabled(!isValid); // Disable Next button if any errors exist
  }, [formData, currentStep]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFormSubmit = async () => {
    // API call for form submission (mocked for now)
    alert("Form submitted successfully!");
  };

  const steps = [
    <BasicDetails formData={formData} setFormData={setFormData} />,
    <Address formData={formData} setFormData={setFormData} setIsNextDisabled={setIsNextDisabled} />,
    <FileUpload formData={formData} setFormData={setFormData} />,
    <MultiFileUpload formData={formData} setFormData={setFormData} />,
    <Status formData={formData} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-4">
        {steps[currentStep - 1]}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              className={`py-2 px-4 rounded-lg ${
                isNextDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
              onClick={nextStep}
              disabled={isNextDisabled}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
