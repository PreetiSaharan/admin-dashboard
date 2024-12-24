import React from "react";
import Select from "react-select";
import "react-world-flags";

const countryOptions = [
  { value: "IN", label: "India", code: "+91", flag: "🇮🇳" },
  { value: "US", label: "United States", code: "+1", flag: "🇺🇸" },
  { value: "GB", label: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { value: "CA", label: "Canada", code: "+1", flag: "🇨🇦" },
  { value: "AU", label: "Australia", code: "+61", flag: "🇦🇺" },
  // Add more countries as needed
];

function BasicDetails({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default BasicDetails;
