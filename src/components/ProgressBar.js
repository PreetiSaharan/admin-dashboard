import React from "react";

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full max-w-2xl bg-gray-200 rounded-lg h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-4"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
