import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLogo from "../../Images/The hawai yatra final logo.png";
import color from "../../color/color";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import calenderimg from "../../Images/calenderimg1.png";
import offerimg from "../../Images/offerimg.png";
import recordsimg from "../../Images/paymenimg.png";
import Cotactus from "./Cotactus.jsx";
import Patners from "./Patners.jsx";
import api from "../../Redux/API/api.js"
import { IoIosDownload } from "react-icons/io";


function Loginnew() {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const togetherSectionRef = useRef(null);
  const [isForget, setIsForget] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


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
    // console.log("reducer",reducerState);
    if (!formData.email.trim() || !formData.password.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      dispatch(loginAction(formData));
      setFormError("");
    } catch (error) {
      setFormError(error);
      console.log(error,"error")
    }
  };
  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.email.trim()) {
      setFormError("Please fill Email Address");
      return;
    }
    else {
      // setSetLoading(true)
      let payload = {
        "email": formData.email
      }
      const data = await api?.forgetPasswordLink(payload)
      console.log(data, "forget data")
      setLoading(false)
    }

  }

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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                <img src={whiteLogo} width={180} alt="" />
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
                    {!isForget ?
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
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Password
                              </label>
                              <div style={{ position: "relative" }}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Enter Your Password"
                                  className="form-control"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                />
                                <div
                                  className="eye-icon"
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                  }}
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                              </div>
                            </div>

                            {/* <Capchacode email={email} password={password} /> */}
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              width="100%"
                              position="relative"
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
                                Submit
                              </Button>
                              <div className="forgetBTN" onClick={() => (setIsForget(true), setFormError(""))}>Forget Password ?</div>
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
                      </div> :
                      <div class="card login-form">
                        <div class="card-body">

                          <h5 className="create-account" onClick={() => setIsForget(false)}>
                            BACK
                          </h5>
                          <h5 class="card-title " style={{ fontWeight: "bold" }}>
                            Forget Password
                          </h5>
                          <p style={{ color: "#4a4a4a", fontSize: "10px" }}>{
                            "We will send you a reset lik on your registered E-mail ID "}</p>

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
                            {/* <div className="mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >
                              Password
                            </label>
                            <div style={{ position: "relative" }}>
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Your Password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                              />
                              <div
                                className="eye-icon"
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "10px",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                }}
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </div>
                            </div>
                          </div> */}

                            {/* <Capchacode email={email} password={password} /> */}
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              width="100%"
                            >{
                                loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>

                                  <div className="loaderCon"></div>
                                </div>
                                  :

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
                                    onClick={handleReset}
                                  >
                                    Reset

                                  </Button>}
                            </Box>
                            {!formError === "" && (
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
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="together-gap" style={{ background: "#FFFEFB" }}>
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
                      style={{ border: "none" }}
                      className="journeyconnect"
                      onClick={scrollToSection}
                    >
                      Connect With Us
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="overseasoncontent-grid">
                    <div
                      className="overseasoncontent-grid1"
                      style={{ width: "50%" }}
                    >
                      <div
                        className="overseason-grid1"
                        style={{ width: "100%" }}
                      >
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">We Provide</div>
                          <div className="service-card-number">
                            Visa Assistance
                          </div>
                        </div>
                      </div>

                      <div
                        className="overseason-grid2"
                        style={{ width: "100%" }}
                      >
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">Promising you to</div>
                          <div className="service-card-number">
                            Beat any price
                          </div>
                        </div>
                      </div>

                      <div
                        className="overseason-grid3"
                        style={{ width: "100%" }}
                      >
                        <div className="servicecardjourneygrid">
                          <div className="service-card1">Flexible</div>
                          <div className="service-card-number">
                            Cancellation Policy
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="overseasoncontent-grid2"
                      style={{ width: "50%" }}
                    >
                      <div className="note-member" style={{ width: "100%" }}>
                        <div className="membersdetail">
                          <div className="total-member">Wide range of </div>
                          <div className="total-member-no">50+ Products</div>
                        </div>
                      </div>

                      <div className="succesful-visa" style={{ width: "100%" }}>
                        <div className="membersdetail">
                          <div className="total-member">Customization</div>
                          <div className="total-member-no">
                            Visa Assisstance
                          </div>
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
                  {/* <img src={patnershipimg1} alt="" /> */}
                  {/* <img src={patnershipimg2} alt="" />
                  <img src={patnershipimg3} alt="" />
                  <img src={patnershipimg4} alt="" />
                  <img src={patnershipimg5} alt="" />
                  <img src={patnershipimg6} alt="" /> */}
                  <Patners />
                </div>
              </div>
            </div>
          </section>

          <section
            class="together-gap"
            style={{ padding: "0px", background: "#FFFEFB" }}
          >
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
                      <img src={calenderimg} style={{ width: "100%" }} alt="" />
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
                      <img src={offerimg} style={{ width: "100%" }} alt="" />
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
                      <img src={recordsimg} style={{ width: "100%" }} alt="" />
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
            style={{ padding: "0px", background: "white" }}
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
