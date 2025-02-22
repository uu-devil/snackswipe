import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import axios from 'axios'; // Import axios for HTTP requests

export default function Signup() {
  const [userType, setUserType] = useState("");
  const [courseOrDept, setCourseOrDept] = useState("");
  const [other, setOther] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [prnOrEmployeeId, setPrnOrEmployeeId] = useState(""); // PRN or Employee ID based on user type
  const [createdDate] = useState(new Date().toISOString());

  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCourseOrDept("");
    setOther("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userType || !courseOrDept || !email || !password || !confirmPassword || !name || !prnOrEmployeeId) {
      alert("Please fill all fields before proceeding.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const requestData = {
      userType,
      name,
      prnOrEmployeeId: prnOrEmployeeId.trim(), // PRN or Employee ID
      courseOrDept: courseOrDept === "Other" ? other : courseOrDept,
      email,
      password,
      createdDate
    };

    try {
      const response = await axios.post("http://localhost:8080/snackswipe/api/register", requestData);
      if (response.status === 200) {
        alert("Registration Successful!");
        console.log("Request Data: ", requestData);

        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">SignUp</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
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

          <div className="form-fields">
            <label>Course/Dept Name:</label>
            <select
              value={courseOrDept}
              onChange={(e) => setCourseOrDept(e.target.value)}
              required
            >
              <option value="">Select Course/Dept</option>
              <option value="DAC">DAC</option>
              <option value="DBDA">DBDA</option>
              <option value="DESD">DESD</option>
              <option value="DITISS">DITISS</option>
              <option value="HPC">HPC</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {userType === "Student" && (
            <div className="form-fields">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="PRN No."
                value={prnOrEmployeeId}
                onChange={(e) => setPrnOrEmployeeId(e.target.value)}
                required
              />
              {courseOrDept === "Other" && (
                <input
                  type="text"
                  placeholder="Specify your course"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              )}
            </div>
          )}

          {userType === "Staff" && (
            <div className="form-fields">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Employee ID"
                value={prnOrEmployeeId}
                onChange={(e) => setPrnOrEmployeeId(e.target.value)}
                required
              />
              {courseOrDept === "Other" && (
                <input
                  type="text"
                  placeholder="Specify your department"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              )}
            </div>
          )}

          <div className="form-fields">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
