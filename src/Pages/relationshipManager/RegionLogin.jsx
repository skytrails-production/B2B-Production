import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import bg from "../../Images/bg-cover.jpeg";
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";
const RegionLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
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
        console.log(
          response?.data?.result?.token,

          "8115199076"
        );
        localStorage.setItem("token", response.data.result.token);
        navigate("/relationshipManager/dashboard");
      } else {
        setFormError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
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
  const handlemove=()=>{
    navigate('/relationshipManager/dashboard');
  }

  return (
    <>
      <div
        className="coverletter"
        style={{
          // borderRadius: "15px",
          width: "100%",
          marginTop: "-740px",
          height: "350px", // Adjusted height
          overflow: "hidden", // Ensures the border radius is applied correctly
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
          top: "0px",
          position: "relative",
          marginTop: "-70px",
        }}
      >
        <form
          style={{
            width: "468px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          onSubmit={handleSubmit}
        >
          <div>
           <img
            src={ab}
            alt=""
            style={{width:'200px',marginLeft:'80px'}}
            />
            <h2
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "700",
                backgroundColor:'#0f0f60',
                height:'80px',
                borderRadius:'5px',
                fontFamily:'auto',
                paddingTop:'15px'
              }}>
            
              Relationship Manager Login
            </h2>
            <input
              type="text"
              placeholder="Enter your Email Address or Contact Number"
              value={email}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #0f0f60",
                borderRadius: "4px",
                boxSizing: "border-box",
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
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #0f0f60",
                borderRadius: "4px",
                boxSizing: "border-box",
                paddingRight: "40px",
              }}
              onChange={handlePasswordChange}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "33%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
              marginLeft:'auto',
              marginRight:'auto',
              height:'50px',
              fontFamily:'auto',
              fontWeight:'700',
              fontSize:'22px',
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
    </>
  );
};

export default RegionLogin;
