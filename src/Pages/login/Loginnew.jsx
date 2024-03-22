import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLogo from "../../Images/The hawai yatra final logo.png";
import color from "../../color/color";
import "./login.css";
import Footer from "../login/Footer.jsx";
// import Footer from "../../Layout/Footer";
import { clearErrorMsg, loginAction } from "../../Redux/Auth/logIn/actionLogin";
import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";
import patnershipimg1 from "../../Images/responsible-tourism-society-of-india-logo-700x273-1-1 1.png";
import patnershipimg2 from "../../Images/image 1212.png";
import patnershipimg3 from "../../Images/indigo-vector-logo-2022 1.png";
import patnershipimg4 from "../../Images/lemon-tree-hotels-logo-2A55C28509-seeklogo 1.png";
import patnershipimg5 from "../../Images/jumeirah-logo-B7B760C975-seeklogo 1.png";
import patnershipimg6 from "../../Images/2560px-Marriott_Logo 1.png";
import calenderimg from "../../Images/Calendar New 1.svg";
import offerimg from "../../Images/Offer 2.svg";
import recordsimg from "../../Images/Online records 1.svg";
import Cotactus from "./Cotactus.jsx";

function Loginnew() {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const togetherSectionRef = useRef(null);

  // console.log(reducerState,"data")

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormError("");
    if (reducerState?.logIn?.isError) {
      dispatch(clearErrorMsg());
    }
  };

  const scrollToSection = () => {
    togetherSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      dispatch(loginAction(formData));
      setFormError("");
    } catch (error) {
      setFormError(error);
    }
  };

  useEffect(() => {
    if (reducerState?.logIn?.isLogin) {
      navigate("/");
    }
  }, [reducerState, navigate]);
  useEffect(() => {
    if (reducerState?.logIn?.loginData?.error) {
      // setSub(true);

      //  console.warn("error",reducerState?.logIn?.loginData?.errormessage?.response?.data?.message)
      setFormError(
        reducerState?.logIn?.loginData?.errormessage?.response?.data?.message
      );
    }
  }, [reducerState?.logIn]);

  // console.warn(reducerState);

  const handlelinkRegister = () => {
    navigate("/Registration");
  };

  return (
    <>
      {reducerState?.subadminLogin?.isLogin ||
      reducerState?.adminAuth?.isLogin ? (
        <>
          <SubAdminAccess />
        </>
      ) : (
        <React.Fragment>
          <section class="hero-section-one ">
            <div className="container loginNav">
              <div className="logoLoginBox">
              
              <img  src={whiteLogo} width={180} alt="" />
          
               
              </div>
              <div className="loginSign">
                <button onClick={() => navigate("/Registration")}>
                  Sign Up Now
                </button>
              </div>
            </div>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                  <div class="hero-one-text-new">
                    <h1>
                      Smarter solutions to all your{" "}
                      <span> business needs </span>{" "}
                    </h1>
                  </div>
                  {/* <h1>hello</h1> */}
                </div>
                <div class="col-lg-6 col-md-6 p-0">
                  <div class="wrapper d-flex align-items-center justify-content-end h-100 bg-rgba(235, 245, 255, 0.50);">
                    <div class="card login-form">
                      <div class="card-body">
                        <h5 class="card-title " style={{ fontWeight: "bold" }}>
                          Login Form
                        </h5>
                        <form>
                          <div class="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              class="form-label"
                            >
                              Email
                            </label>

                            <input
                              name="email"
                              type="email"
                              placeholder="Enter your Email "
                              id="exampleInputEmail1"
                              class="form-control"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div class="mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              class="form-label"
                            >
                              Password
                            </label>
                            {/* <input type="password" class="form-control" id="exampleInputPassword1"> */}

                            <input
                              type="password"
                              name="password"
                              placeholder="Enter Your Password"
                              class="form-control"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* <Capchacode email={email} password={password} /> */}
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: color.bluedark,
                                color: "white",
                                width: "100%",
                                height: "50px",
                                borderRadius: "8px",
                              }}
                              className="loginbutton"
                              onClick={handleSubmit}
                            >
                              Login
                            </Button>
                          </Box>
                          {formError && (
                            <p
                              style={{
                                color: "red",
                                padding: "0px 0px 5px 50px",
                              }}
                            >
                              {formError}
                            </p>
                          )}
                          <div class="sign-up1 mt-4">
                            Not registered yet?{" "}
                            <Link
                              onClick={handlelinkRegister}
                              className="create-account"
                            >
                              Create One
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="together-gap" style={{}}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="Overseasonjourneycontent">
                    <div className="Overseasonjourneytext">
                      <div className="Overseasonjourneytext1">
                        The Hawai Yatra Services
                      </div>
                      <div className="Overseasonjourneytext2">
                        Easy To use interface to streamline all your buisness
                        requirements
                      </div>
                    </div>
                    <button
                    style={{border:"none"}}
                      className="journeyconnect"
                      onClick={scrollToSection}
                    >
                      Connect With Us
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="overseasoncontent-grid">
                    <div className="overseasoncontent-grid1">
                      <div className="overseason-grid1">
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">We Provide</div>
                          <div className="service-card-number">
                            Visa Assistance
                          </div>
                        </div>
                      </div>

                      <div className="overseason-grid2">
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">Guranting You</div>
                          <div className="service-card-number">
                            Lowest Rates
                          </div>
                        </div>
                      </div>

                      <div className="overseason-grid3">
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">Flexible</div>
                          <div className="service-card-number">
                            Cancellation Policy
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="overseasoncontent-grid2">
                      <div className="note-member">
                        <div className="membersdetail">
                          <div className="total-member">Wide range of </div>
                          <div className="total-member-no">10+ Products</div>
                        </div>
                      </div>

                      <div className="succesful-visa">
                        <div className="membersdetail">
                          <div className="total-member">
                            Customize Visa Assistance
                          </div>
                          <div className="total-member-no">2600+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="together-gap" style={{ padding: "0px" }}>
            <div className="container">
              <div className="patner-container">
                <div className="recognized-patner-value">
                  <p className="patner-heading">Recognized Partnership</p>
                </div>
                <div className="patner-logo">
                  <img src={patnershipimg1} alt="" />
                  <img src={patnershipimg2} alt="" />
                  <img src={patnershipimg3} alt="" />
                  <img src={patnershipimg4} alt="" />
                  <img src={patnershipimg5} alt="" />
                  <img src={patnershipimg6} alt="" />
                </div>
              </div>
            </div>
          </section>

          <section class="together-gap" style={{}}>
            <div className="about-us-value">
              <div className="heading1">Why choose The Hawai Yatra ? </div>
              <div className="travel-content-para">
                We offer you simple one stop solution to all travel business
                needs with precision.{" "}
              </div>
              <div className="about-us-grid row g-4">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-us-grid-1">
                    <div className="about-grid-img">
                      <img
                        src={calenderimg}
                        // style={{ height: "80px", width: "80px" }}
                        alt=""
                      />
                    </div>
                    <div className="about-us-grid-content">
                      <div className="about-us-content-2">
                        Manage easy post booking modification on flights.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-us-grid-1">
                    <div className="about-grid-img">
                      <img
                        src={offerimg}
                        // style={{ height: "80px", width: "80px" }}
                        alt=""
                      />
                    </div>
                    <div className="about-us-grid-content">
                      <div className="about-us-content-2 mb-3">
                        Offering the most amazing deals.
                        {/* <br/> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-us-grid-1">
                    <div className="about-grid-img">
                      <img
                        src={recordsimg}
                        // style={{ height: "80px", width: "80px" }}
                        alt=""
                      />
                    </div>
                    <div className="about-us-grid-content">
                      <div
                        className="about-us-content-2"
                        style={{ marginBottom: "18px" }}
                      >
                        Get easy access to booking and payment records.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="together-gap"
            style={{ padding: "0px" }}
            ref={togetherSectionRef}
          >
            <Cotactus />
          </section>

          <section class="together-gap" style={{ padding: "0px" }}>
            <Footer />
          </section>
        </React.Fragment>
      )}
    </>
  );
}

export default Loginnew;
