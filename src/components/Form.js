import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import BasicDetails from "./BasicDetails";
import Address from "./Address";
import FileUpload from "./FileUpload";
import MultiFileUpload from "./MultiFileUpload";
import Status from "./Status";
import ProgressBar from "./ProgressBar";
import { validateFields } from "../utils/validateFields"; // Import the validation function
import { SUBMIT_URL } from "../utils/constants";

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
    //geolocation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    const endpoint = SUBMIT_URL;
   
    const authToken = localStorage.getItem("authToken");
    
    const userpayload ={
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      pincode: formData.pincode
    }
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userpayload),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
          }
          
          if(data.id){
            
            setIsSubmitted(true);
            alert("Form submitted successfully!");
            //setErrorMessage(null);
          }
          //navigate("/submitted");
        } catch (error) {
          //setErrorMessage(error.message);
        }
    
    
  };

  const steps = [
    <BasicDetails formData={formData} setFormData={setFormData} />,
    <Address formData={formData} setFormData={setFormData} setIsNextDisabled={setIsNextDisabled} />,
    <FileUpload formData={formData} setFormData={setFormData} setIsNextDisabled={setIsNextDisabled} />,
    <MultiFileUpload formData={formData} setFormData={setFormData} setIsNextDisabled={setIsNextDisabled} />,
    <Status formData={formData} isSubmitted={isSubmitted} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-4">
        {steps[currentStep - 1]}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && ((!isSubmitted &&
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              onClick={prevStep}
            >
              Back
            </button>
          ))}
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
          ) : ((!isSubmitted && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={handleFormSubmit}
              disabled = {isSubmitted}
            >
              Submit
            </button>
          )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Form;
