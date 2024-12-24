import React from "react";

function FileUpload({ formData, setFormData }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/png"))) {
      setFormData({ ...formData, singleFile: file });
    } else {
      alert("Please upload a valid file (PNG or PDF)");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
      <input
        type="file"
        accept=".png,.pdf"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      {formData.singleFile && (
        <p className="mt-4 text-sm text-gray-600">
          Selected File: {formData.singleFile.name}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
