import React from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Capchacode from "./Capchacode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLogo from "../../Images/whiteLogo.png"
import "./login.css";
import one from "../../Images/newLogin/1.png"
import two from "../../Images/newLogin/2.png"
import three from "../../Images/newLogin/3.png"
import four from "../../Images/newLogin/4.png"
import business from "../../Images/newLogin/business.png"
import check from "../../Images/newLogin/check.png"
import together from "../../Images/newLogin/together.png"
import Footer from "../../Layout/Footer";
import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";
const Login = () => {
  const reducerState = useSelector((state) => state);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sub, setSub] = useState(false);

  useEffect(() => {
    if (reducerState?.logIn?.isLogin) {
      navigate("/");
    }
  }, [reducerState, navigate]);
  useEffect(() => {
    if (reducerState?.logIn?.loginData?.error) {
      setSub(true)

      // console.warn("error",reducerState?.logIn?.loginData?.errormessage?.response?.data?.message


      // )
    }
  }, [reducerState?.logIn]);

  // console.warn(reducerState);

  const handlelinkRegister = () => {
    navigate("/Registration")
  }
  // if(reducerState?.subadminLogin?.isLogin ){
  //   navigate("/subAdminLogin")
  // }
  // else if(reducerState?.adminAuth?.isLogin ){
  //   navigate("/adminLogin")
  // }

  // console.log(reducerState, "reducer state")

  return (
    <>
      {reducerState?.subadminLogin?.isLogin || reducerState?.adminAuth?.isLogin ?
        <><SubAdminAccess/></> :

        <React.Fragment>



          <section class="hero-section-one " style={{ backgroundColor: "white" }}>
            <div className="container loginNav">
              <div className="logoLoginBox">
                <img src={whiteLogo} width={180} alt="" />
              </div>
              <div className="loginSign">
                <button onClick={() => navigate("/Registration")}>Sign Up Now</button>
              </div>
            </div>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                  <div class="hero-one-text">
                    <h1>The Smart Way to
                      Grow Your Business</h1>
                    <h5>Welcome to B2B Skytrails , a platform built exclusively for travel agents to fulfill all their
                      customer travel needs with
                      easy-to-use features and amazing deals.</h5>
                    <div class="afford">
                      <p>Most Affordable Deals ever</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 p-0">
                  <div class="wrapper d-flex align-items-center justify-content-end h-100">
                    <div class="card login-form">
                      <div class="card-body">
                        <h5 class="card-title text-center">Login Form</h5>
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>

                            <input name="email"
                              type="email"
                              placeholder="Enter your Email "
                              id="exampleInputEmail1"
                              class="form-control"
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                                setSub(false)
                              }} />
                          </div>
                          <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            {/* <input type="password" class="form-control" id="exampleInputPassword1"> */}

                            <input type="password"
                              placeholder="Enter Your Password"
                              class="form-control"
                              value={password}
                              onChange={(event) => {
                                setPassword(event.target.value);
                                setSub(false)
                              }} />
                            {sub &&
                              <span style={{ color: 'red', fontSize: '10px' }}>{reducerState?.logIn?.loginData?.errormessage?.response?.data?.message}</span>}
                          </div>

                          <Capchacode email={email} password={password} />
                          <div class="sign-up mt-4">
                            Don't have an account? <Link onClick={handlelinkRegister}>Create One</Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section class="gap section-business" style={{ background: "white" }}>
            <div class="container">
              <h3>The SkyTrails</h3>
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                  <div class="headingBusi two">
                    <h2>Everything Your Customer Needs is here </h2>
                  </div>
                  <div class="better-business">

                    <div class="count-style">
                      <div class="count-text">
                        <img src={one} alt="one" />
                      </div>
                      <div class="count-text">
                        <img src={two} alt="two" />
                      </div>
                      <div class="count-text">
                        <img src={three} alt="three" />
                      </div>
                      <div class="count-text">
                        <img src={four} alt="four" />
                      </div>

                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="business-img">
                    <img src={business} alt="img" />
                    {/* <img src="./images/dots-shaps.png" alt="dots-shaps" class="dots-shaps"> */}
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section class="together-gap" style={{ background: "white" }}>
            <div class="container">
              <div class="row align-items-center">

                <div class="col-lg-6 col-md-6">
                  <div class="togetherFirst">
                    <div class="together-img">
                      <img src={together} alt="Together" />
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="together ps-3">
                    <h2>What you will get.</h2>
                    <ul class="list">
                      <li><img src={check} alt="check" />Get easy access to booking and payment records
                      </li>
                      <li><img src={check} alt="check2" />Manage easy post-booking modifications on
                        flights</li>
                      <li><img src={check} alt="check3" />Enjoy the best-in-class cancellation policies
                        on hotels</li>
                    </ul>
                    <Link onClick={() => navigate("/Registration")} class="btn">Sign Up Now</Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <div>
            <Footer />
          </div>


        </React.Fragment>}
    </>
  );
};

export default Login;



