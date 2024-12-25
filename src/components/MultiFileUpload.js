import React, { useEffect, useState } from "react";
import { validateFields } from "../utils/validateFields";

function MultiFileUpload({ formData, setFormData, setIsNextDisabled }) {
  const [errors, setErrors] = useState({});
  const handleMultiFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type === "application/pdf" || file.type.startsWith("image/png")
    );

    if (validFiles.length > 5) {
      alert("You can upload a maximum of 5 files.");
      return;
    }

    setFormData({ ...formData, multiFiles: validFiles });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geolocation = `${position.coords.latitude}, ${position.coords.longitude}`;
        setFormData((prev) => ({ ...prev, geolocation }));
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, [setFormData]);

  useEffect(() => {
      const validationErrors = validateFields(formData); // Validate the form data
      setErrors(validationErrors);
      // Check if the form is valid
      const isValid = Object.keys(validationErrors).length === 0;
  
      setIsNextDisabled(!isValid); // Disable Next button if form is not valid
    }, [formData, setIsNextDisabled]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Multiple Files</h2>
      <input
        type="file"
        accept=".png,.pdf"
        multiple
        onChange={handleMultiFileChange}
        className="w-full p-2 border rounded"
      />
       {errors.multiFiles && <span className="text-red-500">{errors.multiFiles}</span>}
      {formData.multiFiles.length > 0 && (
        <ul className="mt-4 text-sm text-gray-600">
          {formData.multiFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      {formData.geolocation && (
        <p className="mt-4 text-sm text-green-600">
          Geolocation Recorded: {formData.geolocation}
        </p>
      )}
    </div>
  );
}

export default MultiFileUpload;
