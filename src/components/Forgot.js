import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Forgot.css";

export default function ForgotPassword() {
  const [userType, setUserType] = useState("");
  const [prnOrEmployeeId, setPrnOrEmployeeId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (!email || !userType || !prnOrEmployeeId || !newPassword) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:8080/snackswipe/api/reset-password", {
        email,
        userType,
        prnOrEmployeeId,
        newPassword,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data || "Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Reset Password</h1>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form className="forgot-password-form" onSubmit={handlePasswordReset}>
      <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>User Type (Student/Staff)</label>
        <input
          type="text"
          placeholder="User Type (Student/Staff)"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        />
        <label>PRN/EmployeeID</label>
        <input
          type="text"
          placeholder="PRN or Employee ID"
          value={prnOrEmployeeId}
          onChange={(e) => setPrnOrEmployeeId(e.target.value)}
          required
        />
        <label>New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
