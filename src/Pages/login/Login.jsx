import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Input, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Flex, space, Spacer, Text } from "@chakra-ui/react";
import Popularfilter from "../Flight/flightresult/Popularfilter";
import StLogo from "../../Images/ST-Main-Logo.png";
import loginback from '../../Images/loginback.jpg'
import LockIcon from "@mui/icons-material/Lock";
import { InnerBarLogo } from "../../data";
import { logindata } from "../../logindata";
import { logindataaa } from "../../logindataaa";
import { NavLink } from "react-router-dom";
import NavBarBox from "../../Components/NavBarBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import Alert from "@mui/material/Alert";
import Capchacode from "./Capchacode";
import flight from "../../Images/flight.png";
import hotelbed from "../../Images/hotelbed.png";
import schoolbus from "../../Images/schoolbus.png";
import taxi from "../../Images/taxi.png";
import accounting from "../../Images/accounting.png";
import forex from "../../Images/forex.png";
import passport from "../../Images/passport.png";
import binoculars from "../../Images/binoculars.png";
import beachchair from "../../Images/beach-chair.png";
import insurence from "../../Images/insurence.png";
import luggagex from "../../Images/luggagex.png";
import airportt from "../../Images/airportt.png";
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
import redlogo from '../../Images/ST-Main-Logo.png'
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Button } from "@mui/material";
import { fontWeight } from "@mui/system";
import {
  FaPlane, // Flight icon
  FaHotel, // Hotel icon
  // Add more icons here for other items
  FaGlobe, // Islandhopper icon
  FaBus, // Transfer icon
  FaBinoculars, // Sightseeing icon
  FaPassport, // Visa icon
  FaShieldAlt, // Insurance icon
  FaUser, // Administration icon
} from "react-icons/fa";
import { GiCardboardBox } from "react-icons/gi";

import color from "../../color/color.js";
const Login = () => {
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (reducerState?.logIn?.loginData?.data?.data) {
      navigate("/");
    }
  }, [reducerState, navigate]);



  const handlelinkRegister = () => {
    navigate("/Registration")
  }

  return (
    <React.Fragment>
      <div className="loginContainer">
        <div className="loginContainerInner">
          <div className="loginImg">
            <img src={loginback} alt="" />
            <div className="overlay">
              <h3>Time to Travel the World !</h3>
            </div>
            <div className="abs-logo">
              <img src={redlogo} alt="" />
            </div>
          </div>
          <form className="loginForm" action="/">
            {reducerState.logIn.loginData?.data?.data?.message && (
              <Alert severity="success">
                Thankyou ! for Registering, we'll contact you ASAP
              </Alert>
            )}
            <div>
              <p>Login to Your Account</p>
            </div>
            <div>
              <div className="mailBox">
                <label htmlFor="">Enter Your Email</label>
                <MailIcon className="mailIcon" />
                <input name="email"
                  type="email"
                  placeholder="Enter your Email "
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="passwordBox">
                <HttpsIcon className="passIcon" />
                <label htmlFor="">Enter Your Password</label>
                <input type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
              </div>
              <Capchacode email={email} password={password} />
              <div className="text-center" >
                <Link className="reges" onClick={handlelinkRegister}>
                  Create Your New Account ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <form action="/">
          {reducerState.logIn.loginData?.data?.data?.message && (
            <Alert severity="success">
              Thankyou ! for Registering, we'll contact you ASAP
            </Alert>
          )}
          <Box className="login_field" style={{ marginTop: "10px" }}>
            <Typography
              className="Login_min"
              font="Bold"
              style={{ color: color.bluedark }}
            >
              Login
            </Typography>
            <Box py={2} >
              <div className="form_input">
                <label className="form_lable">Email*</label>

                <input
                  style={{ height: "60px", width: "400px" }}
                  name="email"
                  type="email"
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
                  style={{ height: "60px", width: "400px" }}
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </Box>
            <Box>
              <Capchacode email={email} password={password} />

              <Typography className="forget_pass" style={{ textAlign: "center" }}>
                Forgot Password
              </Typography>

              <Box
                display="flex"
                justifyContent="center"
                mt={2}
                textAlign="center"
              >

              </Box>
            </Box>
          </Box>
        </form> */}


    </React.Fragment>
  );
};

export default Login;



{/* <form onSubmit={() => navigate("/Registration")}>
  <Box textAlign="right" >
    <Button
      type="submit"
      variant="contained"
      startIcon={<AccountCircleIcon />}
      style={{
        backgroundColor: "white",
        color: "#254B70",
        fontWeight: "bold",
        borderRadius: "10px",
        marginTop: "100px",
      }}
    >
      Register
    </Button>
  </Box>
</form> */}
