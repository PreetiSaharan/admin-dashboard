import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import Address from "./Address";
import FileUpload from "./FileUpload";
import MultiFileUpload from "./MultiFileUpload";
import Status from "./Status";
import ProgressBar from "./ProgressBar";

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFormSubmit = async () => {
    // API call to XANO for form submission
    try {
      const response = await fetch("https://xano.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit form data");
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  const steps = [
    <BasicDetails formData={formData} setFormData={setFormData} />,
    <Address formData={formData} setFormData={setFormData} />,
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
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={nextStep}
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
