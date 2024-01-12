// AdminLogin.jsx

import React, { useState, useEffect } from "react";
import { Button, Typography, Link, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthAction } from "../../Redux/Auth/AdminAuth/actionAdminAuth";
import newlogo from "../../Images/whitelogo1.png";
import { motion } from "framer-motion";
import "./AdminLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  let adminData = reducerState?.adminAuth?.adminData?.data?.roles[0];

  useEffect(() => {
    if (adminData === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [adminData, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }

    const payload = {
      username: email,
      password: password,
    };

    dispatch(adminAuthAction(payload));
  };
  const [password1, setPassword1] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="Adminwrapper">
      <header className="sectionad headers">
        <div className="headead">
          <img src={newlogo} style={{ width: "80%" }} alt="Logo"></img>
          <h2>Admin Login</h2>
        </div>
      </header>

      <section className="section sign-in">
        <form onSubmit={handleSubmit} className="formadmin">
          <input
            name="username"
            type="text"
            placeholder="Enter your Email Address"
            value={email}
            className="admininput"
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="admininput"
          />

          <button className="btnadmin">Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default AdminLogin;
