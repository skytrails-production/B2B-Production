// AdminLogin.jsx

import React, { useState, useEffect } from "react";
import { Button, Typography, Link, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthAction } from "../../Redux/Auth/AdminAuth/actionAdminAuth";
import StLogo from "../../Images/ST-Main-Logo.png";
import { motion } from "framer-motion";
import "./AdminLogin.css";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login_field"
      style={{height:"auto"}}
    >
      <div className="background-animation">
        <motion.img
          src={StLogo}
          style={{ width: "180px", marginTop: "13px" }}
          alt="Logo"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/")}
        />
        <motion.h1 style={{ marginTop: "20px" }}>Admin Login</motion.h1>

        <form onSubmit={handleSubmit} className="form">
          <Box py={2}>
            <div className="form_input">
              <label className="form_lable">Email*</label>

              <input
                className="input-box"
                style={{ height: "60px", width: "100%" }}
                name="username"
                type="text"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </Box>
          <Box py={2}>
            <div className="form_input">
              <label className="form_lable">Password*</label>

              <input
                className="input-box"
                style={{ height: "60px", width: "100%" }}
                name="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </Box>
          {formError && (
            <Typography color="error" variant="body2">
              {formError}
            </Typography>
          )}
          <Box>
            <Typography className="forget_pass">Forgot Password</Typography>
            <Button
              className="loginButton"
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#0052D0",
                color: "white",
                width: "100%",
                borderRadius: "20px",
                marginTop: "10px",
              }}
            >
              Login
            </Button>
            <Box display="flex" justifyContent="center" mt={2} textAlign="center">
              <Typography color="black" fontSize="10px">
                By proceeding, you agree to skyTrails{" "}
                <Link href="#" underline="always" color="#FF8900">
                  {"Privacy Policy"}
                </Link>{" "}
                ,{" "}
                <Link href="#" underline="always" color="#FF8900">
                  {"User Agreement"}
                </Link>{" "}
                and{" "}
                <Link href="#" underline="always" color="#FF8900">
                  {"Terms of Service"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
