import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import "./App.css";
import googleLogo from "./google-logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [buttonColor, setButtonColor] = useState("#007bff");


  const debouncedInput = useDebounce(input, 500)


  useEffect(() => {
    validateInput(debouncedInput);
  }, [debouncedInput]);




  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const validateInput = (value) => {
    if (value === "") {
      setError("");
      setIsValid(false);
      setButtonColor("#007bff");
    } else if (/^\d{1,10}$/.test(value)) {
      if (value.length === 10) {
        setError("");
        setIsValid(true);
        setButtonColor("#007bff");
      } else {
        setError("Phone Number must be 10 digits long");
        setIsValid(false);
        setButtonColor("#aaa");
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setError("");
        setIsValid(true);
        setButtonColor("#007bff");
      } else {
        setError("Enter a Valid Email Address");
        setIsValid(false);
        setButtonColor("#aaa");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      toast.success("All good!");
    }
  };

  const handleToastClose = () => {
    setInput("");
  };

  return (
    <>
      <div className="container">
        <h1>Login to Dashboard</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="input">Email or Mobile Number</label>
            <br />
            <input
              type="text"
              id="input"
              value={input}
              onChange={handleChange}
              className={`input ${error ? "error" : ""}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={error !== ""}
            style={{ backgroundColor: buttonColor }}
            className="submit-button"
          >
            Next
          </button>
          <div className="separator">or</div>
          <button className="google-button">
            <div className="google-logo">
              <img src={googleLogo} alt="Google Logo" />
            </div>
            Sign in with Google
          </button>

        </form>

        <ToastContainer
          autoClose={3000}
          onClose={handleToastClose}
        />


      </div>

      <div className="footer-container">
        <footer>
          <p>Protected by reCaptcha. Google</p>
          <p>
            <a href="https://static.googleusercontent.com/media/www.google.com/en//intl/en/policies/privacy/google_privacy_policy_en.pdf" className="blue-link">Privacy Policy</a> & <a href="https://policies.google.com/terms?hl=en-US" className="blue-link">Terms of Service</a> apply.
          </p>
        </footer>
      </div>
    </>

  );
}

export default App;
