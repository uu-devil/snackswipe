import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import "../styles/Login.css";

export default function Login() {
  const [userType, setUserType] = useState("");
  const [prnOrEmployeeId, setPrnOrEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State for the user's name
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setPrnOrEmployeeId("");
    setName("");
    setPassword("");
    setErrorMessage(""); // Reset error messages
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userType || !prnOrEmployeeId || !password || !name) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const requestData = {
      userType,
      prnOrEmployeeId: prnOrEmployeeId.trim(),
      name,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/snackswipe/api/login",
        requestData
      );

      if (response.status === 200) {
        console.log("Login successfully");
        localStorage.setItem("userType", userType);
        localStorage.setItem("name", name);
        localStorage.setItem("prnOrEmployeeId", prnOrEmployeeId);

        
        navigate("/dashboard");
        
        
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
      console.error("Login error:", error.response || error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="user-type-selection">
            <label>
              <input
                type="radio"
                name="userType"
                value="Student"
                checked={userType === "Student"}
                onChange={() => handleUserTypeChange("Student")}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="Staff"
                checked={userType === "Staff"}
                onChange={() => handleUserTypeChange("Staff")}
              />
              Staff
            </label>
          </div>

          {userType && (
            <div className="form-fields">
              <input
                type="text"
                placeholder={userType === "Student" ? "PRN No." : "Employee Id"}
                value={prnOrEmployeeId}
                onChange={(e) => setPrnOrEmployeeId(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          
          <button type="submit" className="login-button">
            Login
          </button>
        
          <p className="forgot-password" onClick={() => navigate("/forgot")}>
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
}
