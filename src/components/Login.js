import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { checkValidData } from "../utils/validate";
import ForgotPassword from "./ForgotPassword";
import { LOGIN_URL, SIGNUP_URL } from "../utils/constants";

const Login = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  /*
  // Check if the user is already authenticated (i.e., has an authToken)
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/form"); // Redirect to the form page if already authenticated
    }
  }, [navigate]);
  */

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear error message when toggling forms
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSignIn = async () => {
    // Validate the form data
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    if (message) {
      setErrorMessage(message);
      return;
    }

    // Prepare payload for API call
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!isSignInForm) {
      payload.name = nameRef.current.value;
    }

    const endpoint = isSignInForm ? LOGIN_URL : SIGNUP_URL;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(isSignInForm ? "Sign In Successful" : "Sign Up successful");
      setErrorMessage(null);

      // Save authToken to localStorage after successful login/signup
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
      }

      // Redirect to the form page after successful authentication
      navigate("/form");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen object-cover">
      {showForgotPassword ? (
        <ForgotPassword />
      ) : (
        <form
          className="bg-black shadow-2xl w-2/6 rounded-lg text-white mt-8 mx-auto right-0 left-0 bg-opacity-90 text-center absolute"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-2xl p-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (
            <input
              ref={nameRef}
              type="text"
              placeholder="Name"
              className="p-2 my-2 w-5/6 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          )}
          <input
            ref={emailRef}
            type="text"
            placeholder="Email Id"
            className="p-2 mx-2 my-2 w-5/6 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            required
          />
          <input
            ref={passwordRef}
            type="text"
            placeholder="Password"
            className="p-2 my-2 w-5/6 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            required
          />
          <p className="p-2 m-2 font-bold text-red-700">{errorMessage}</p>
          <button
            onClick={handleSignIn}
            type="submit"
            className="bg-red-700 p-3 m-4 w-5/6 rounded-lg hover:bg-red-800"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          {isSignInForm && (
            <p className="mt-4 px-5 cursor-pointer hover:underline" onClick={handleForgotPassword}>
              Forgot Password
            </p>
          )}
          <p className="px-5 pb-5 cursor-pointer hover:underline" onClick={toggleSignInForm}>
            {isSignInForm ? "New to portal? Sign Up now" : "Already a user? Sign In now"}
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
