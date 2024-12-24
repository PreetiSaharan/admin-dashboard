import React from "react";

function Address({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <input
        type="text"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        placeholder="Address Line 2"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default Address;
