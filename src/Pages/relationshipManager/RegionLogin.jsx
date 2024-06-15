

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import bg from "../../Images/bg-cover.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ab from "../../Images/The hawai yatra final logo.png";
import { FiLogOut } from "react-icons/fi";

const RegionLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFormError("Please fill out all details!");
      return;
    }
    setLoading(true);
    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/relationShipManager/login`,
        payload
      );
      if (response.status === 200) {
        setToken(response?.data?.result?.token);
        localStorage.setItem("token", response.data.result.token);
        localStorage.setItem("ID", response.data.result._id);
        setIsLoggedIn(true);
        navigate("/relationshipManager/dashboard");
      } else {
        setFormError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setFormError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormError("");
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/relationShipManager/forgetPassword`,
        { email: forgotPasswordEmail }
      );

      if (response.status === 200) {
        toast.success("Password reset link has been sent to your email.");
        setOpenForgotPassword(false);
      } else {
        toast.error("Failed to send password reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "10.9rem",
        }}
      >
        <div
          className="coverletter"
          style={{
            width: "100%",
            height: "450px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={bg}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className="luchi"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            top: "-200px",
            position: "relative",
          }}
        >
          <form
            style={{
              width: "468px",
              padding: "20px",
              backgroundColor: "#f8f7f666",
              borderRadius: "6%",
              boxShadow: "rgb(4 1 22 / 95%) 0px 0px 4px",
              marginBottom: "40px",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <img
                src={ab}
                alt=""
                style={{
                  width: "260px",
                  marginLeft: "80px",
                  boxShadow: "0px 0px 30px 2px",
                  borderRadius: "5%",
                }}
              />
              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: "20px",
                  fontWeight: "700",
                  backgroundColor: "#0f0f60",
                  height: "80px",
                  borderRadius: "5px",
                  fontFamily: "auto",
                  paddingTop: "15px",
                }}
              >
                Relationship Manager Login
              </h3>
              <input
                type="text"
                placeholder="Enter your Email Address or Contact Number"
                value={email}
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "5px",
                  border: "1px solid #0f0f60",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#280765",
                }}
                onChange={handleEmailChange}
              />
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                style={{
                  width: "80%",
                  padding: "10px",
                  marginBottom: "15px",
                  border: "1px solid #0f0f60",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  paddingRight: "40px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#280765",
                }}
                onChange={handlePasswordChange}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "33%",
                  right: "55px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#280765",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="forgot-password">
              <a
                href="#!"
                onClick={() => setOpenForgotPassword(true)}
                style={{ color: "#21325D" }}
              >
                Forgot Password?
              </a>
            </div>
            <button
              style={{
                width: "70%",
                padding: "10px",
                backgroundColor: "#0f0f60",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "auto",
                marginRight: "auto",
                height: "50px",
                fontFamily: "auto",
                fontWeight: "700",
                fontSize: "22px",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            {formError && (
              <p style={{ color: "red", marginTop: "10px" }}>{formError}</p>
            )}
          </form>
        </div>
      </div>

      {openForgotPassword && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#0f0f60",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setOpenForgotPassword(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  backgroundColor: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegionLogin;
