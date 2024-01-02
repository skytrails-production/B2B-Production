import React from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import loginback from '../../Images/loginback.jpg'
import Alert from "@mui/material/Alert";
import Capchacode from "./Capchacode";
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
import redlogo from '../../Images/ST-Main-Logo.png'
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";

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



    </React.Fragment>
  );
};

export default Login;



