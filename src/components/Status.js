import React from "react";

function Status({ formData, isSubmitted }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Form Submission Status</h2>
      <p className="text-lg">
        {isSubmitted
          ? "Your form was submitted successfully!"
          : "Please submit the form."}
      </p>
    </div>
  );
}

export default Status;
