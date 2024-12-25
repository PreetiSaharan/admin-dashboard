import React, { useState, useCallback } from "react";
import Select from "react-select";
import { validateFields } from "../utils/validateFields";

const countryOptions = [
  { value: "IN", label: "🇮🇳 India (+91)", code: "+91" },
  { value: "US", label: "🇺🇸 United States (+1)", code: "+1" },
  { value: "GB", label: "🇬🇧 United Kingdom (+44)", code: "+44" },
  { value: "CA", label: "🇨🇦 Canada (+1)", code: "+1" },
  { value: "AU", label: "🇦🇺 Australia (+61)", code: "+61" },
];

function BasicDetails({ formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const handleValidation = useCallback(() => {
    const validationErrors = validateFields(formData);
    setErrors(validationErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Debounce validation
    const debounceValidation = setTimeout(() => {
      handleValidation();
    }, 500);

    return () => clearTimeout(debounceValidation);
  };

  const handleCountryCodeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, countryCode: selectedOption.code }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <div className="flex items-center mb-4">
        <div className="w-1/3">
          <Select
            options={countryOptions}
            defaultValue={countryOptions[0]}
            onChange={handleCountryCodeChange}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-2/3 p-2 border rounded"
        />
      </div>
      {errors.phone && <p className="text-red-500">{errors.phone}</p>}
    </div>
  );
}

export default BasicDetails;
