import React, { useState, useEffect } from "react";
import { validateFields } from "../utils/validateFields"; // Import the validation function

function Address({ formData, setFormData, setIsNextDisabled }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const validationErrors = validateFields(formData); // Validate the form data
    setErrors(validationErrors);

    // Check if the form is valid
    const isValid =
      !validationErrors.addressLine1 &&
      !validationErrors.city &&
      !validationErrors.state &&
      !validationErrors.pincode;
    
    setIsNextDisabled(!isValid); // Disable Next button if form is not valid
  }, [formData, setIsNextDisabled]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Address Details</h2>

      <input
        type="text"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        placeholder="Address Line 1"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.addressLine1 && <span className="text-red-500">{errors.addressLine1}</span>}

      <input
        type="text"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        placeholder="Address Line 2"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.addressLine2 && <span className="text-red-500">{errors.addressLine2}</span>}

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.city && <span className="text-red-500">{errors.city}</span>}

      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.state && <span className="text-red-500">{errors.state}</span>}

      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.pincode && <span className="text-red-500">{errors.pincode}</span>}

      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full p-2 border rounded"
      />
      {errors.country && <span className="text-red-500">{errors.country}</span>}
    </div>
  );
}

export default Address;
