import React, { useState } from "react";
import { checkValidData } from "../utils/validate";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim()) {
      setSubmitted(true); // Display success message
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-black text-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        {submitted ? (
          <div className="text-center">
            <p className="text-green-300 text-lg font-medium">
              If your email is registered, you will receive password reset instructions shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)} // Allow the user to go back
              className="mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Go Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Enter your email address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="example@example.com"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-red-700 text-white py-2 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Send Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
