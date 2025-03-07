import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import whiteLogo from "../../Images/The hawai yatra final logo.png";
import color from "../../color/color";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";
import Footer from "../login/Footer.jsx";
// import Footer from "../../Layout/Footer";
import { clearErrorMsg } from "../../Redux/Auth/logIn/actionLogin.js";
import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";

import api from "../../Redux/API/api.js"
import Swal from "sweetalert2"


function Loginnew() {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    console.log(userId, "userIDDDDDD"

    )
    const reducerState = useSelector((state) => state);
    const togetherSectionRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log(reducerState,"data")

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ confirmPassword: "", password: "" });
    const [formError, setFormError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormError("");
        if (reducerState?.logIn?.isError) {
            dispatch(clearErrorMsg());
        }
    };


    const handleReset = async (e) => {
        e.preventDefault()
        if (!formData.password.trim() || !formData?.confirmPassword.trim()) {
            setFormError("Please fill Filds");
            return;
        }
        else if (formData?.confirmPassword !== formData.password) {
            setFormError("Password not match");
            return;
        }
        else {
            setLoading(true)
            let payload = {
                "password": formData?.password,
                "confirmpassword": formData?.confirmPassword
            }
            const data = await api?.resetPassword(userId, payload)
            setLoading(false)
            console.log(data?.data?.statusCode

                , "forget data")
                if(data?.data?.statusCode===200){
                    Swal.fire({
                        title: "Password changed successfully",
                        text: "Log in to your account",
                        icon: "success",
                        showClass: {
                          popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                          popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                      });
                  navigate("/Login")
                }
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

                                        <div class="card login-form">
                                            <div class="card-body">
                                                <h5 class="card-title " style={{ fontWeight: "bold" }}>
                                                    Change password
                                                </h5>
                                                <form>
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
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="exampleInputPassword1"
                                                            className="form-label"
                                                        >
                                                            Confirm password
                                                        </label>
                                                        <div style={{ position: "relative" }}>
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                name="confirmPassword"
                                                                placeholder="Confirm password"
                                                                className="form-control"
                                                                value={formData.confirmPassword}
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
                                                        position="relative"
                                                    >
                                                        {
                                                            loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>

                                                                <div className="loaderCon"></div>
                                                            </div> :
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
                                                                    Change password
                                                                </Button>}

                                                    </Box>
                                                    {!formError ==="" && (
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



                </React.Fragment>
            )}
        </>
    );
}

export default Loginnew;
