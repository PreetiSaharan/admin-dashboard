import React, {useState, useEffect} from "react";
import { validateFields } from "../utils/validateFields";

function FileUpload({ formData, setFormData, setIsNextDisabled }) {
  const [errors, setErrors] = useState({});
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/png"))) {
      setFormData({ ...formData, singleFile: file });
    } else {
      alert("Please upload a valid file (PNG or PDF)");
    }
  };

  useEffect(() => {
      const validationErrors = validateFields(formData); // Validate the form data
      setErrors(validationErrors);
  
      // Check if the form is valid
      const isValid = Object.keys(validationErrors).length === 0;
  
      //console.log(formData);
      //console.log(Object.keys(validationErrors).length);
      setIsNextDisabled(!isValid); // Disable Next button if form is not valid
    }, [formData, setIsNextDisabled]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
      <input
        type="file"
        accept=".png,.pdf"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      {errors.singleFile && <span className="text-red-500">{errors.singleFile}</span>}
      {formData.singleFile && (
        <p className="mt-4 text-sm text-gray-600">
          Selected File: {formData.singleFile.name}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
