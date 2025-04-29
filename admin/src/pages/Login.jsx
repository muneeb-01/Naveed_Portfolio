import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "react-toastify"; // Importing toastify
import { apiClient } from "../lib/api-client";
import { LOGIN_ROUTE } from "../utils/constants";
import { useAppStore } from "../Store/index";

export default function Login() {
  const { setUserInfo } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard/home");
      console.log(userInfo);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill out all the required fields.");
      return;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // API call for login
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Login successful!");
        console.log(response);
        setUserInfo(response.data.admin);
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    // Clear form fields after submission
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#222" }}>
            Sign In
          </h1>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "0.5rem" }}>
            Enter your details below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {" "}
          {/* Connecting the form submission */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#555",
                  fontWeight: "500",
                }}
              >
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@example.com"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#555",
                  fontWeight: "500",
                }}
              >
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#777",
                  }}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
                color: "#555",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span>Keep me logged in</span>
              </div>
              <Link
                to="/reset-password"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Sign In
            </button>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#007bff",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
