import React from "react";

function Status({ formData }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Form Submission Status</h2>
      <p className="text-lg">
        {formData.submissionStatus
          ? "Your form was submitted successfully!"
          : "There was an error submitting your form. Please try again."}
      </p>
    </div>
  );
}

export default Status;
