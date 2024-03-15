import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Agent_ProfileRequest } from "../../Redux/AgentProfiltLogin/actionAgentProfiltLogin";
import newlogo from "../../Images/whitelogo1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../AdminLogin/AdminLogin.css";
import bg from "../../Images/bg-cover.jpeg";
import { adminReducer } from "../../Redux/AdminLogin/adminReducer";
import { styled } from '@mui/material/styles';
import loginImg from "./agentProfilelogin.jpg"
import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import axios from "axios";
import "./adminProglieLogin.css"
import { Agent_ProfileLogout } from "../../Redux/AgentProfiltLogin/actionAgentProfiltLogin";
const MuiGridItem = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    width: '100%',
    borderRadius: theme.spacing(1),
}));


const AgentProfileLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState(false);
    const [loading, setLoading] = useState(false);
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();


    // console.log(reducerState,"reducerState")


    let adminData = reducerState?.agentProfileReducer
        ?.isLogin;

    const error = useSelector(state => state?.agentProfileReducer
        ?.agentProfileloginData?.error);
    const errorMessage = useSelector(state => state?.agentProfileReducer
        ?.agentProfileloginData?.errormessage);

    useEffect(() => {
        if (adminData) {
            console.log(adminData, "adminData")
            navigate("/agentProfile/dashboard")
        }
    }, [adminData]);

    useEffect(() => {
        if (error) {
            setFormError(errorMessage?.response?.data?.message);
            setLoading(false);
        }

    }, [error, errorMessage]);
    useEffect(() => {
        console.log(reducerState?.agentProfileReducer)
    }, [reducerState?.agentProfileReducer])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            setFormError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        const payload = {
            email: email,
            password: password,
        };


        // Dispatch the action and wait for the response


        try {

            await dispatch(Agent_ProfileRequest(payload));

            setFormError(""); // Clear any previous errors on success
        } catch (error) {
            console.error("Error occurred while authenticating:", error);
            // Error handling is done in the useEffect
        } finally {
            // Set loading back to false regardless of success or failure
            setLoading(false);
        }

    };



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        if (error) {
            dispatch(Agent_ProfileLogout())
        }
        setEmail(event.target.value);
        setFormError("");
    };

    const handlePasswordChange = (event) => {
        if (error) {
            dispatch(Agent_ProfileLogout())
        }
        setPassword(event.target.value);
        setFormError("");
    };


    if (adminData) {
        return <div><MuiGridItem item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomLinearProgress />
        </MuiGridItem></div>
    }
    return (
        <>
            {reducerState?.logIn?.isLogin || reducerState?.subadminLogin?.isLogin ? <div><SubAdminAccess /></div> :
                <div className="adminProfileLoginContainerMain">
                    <div
                        className="coverletter"
                        style={{

                            // borderRadius: "15px",
                            width: "100%",
                            margin: "auto",
                            height: "250px", // Adjusted height
                            overflow: "hidden", // Ensures the border radius is applied correctly
                        }}
                    >
                        <img
                            src={bg}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="Adminwrapper">
                        {/* Cover Layout */}
                        <header className="sectionad headers" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                            <div className="headead">
                                <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
                                <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Agent Profile Login</h2>
                            </div>
                        </header>

                        <section className="section sign-in">
                            <form onSubmit={handleSubmit} className="formadmin">
                                <div className="password-container">
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Enter your Email Address"
                                        value={email}
                                        className="admininput"
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="password-container">
                                    <div className="eye-icon" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="admininput"
                                    />
                                </div>
                                <button className="btnadmin" disabled={loading}> {loading ? "Loading..." : "Sign In"}</button>
                            </form>
                        </section>
                        {formError && <p style={{ color: "red", padding: "0px 0px 5px 50px" }}>{formError}</p>}
                    </div>
                </div>
                // <div className="adminProfileLoginContainerMain" >
                //     <div className="adminProfileLoginContainer" >
                //         <div className="adminProfileLoginImage" ><img src={loginImg} alt="" /></div>
                //         <div className="adminProfileLoginLeft" >
                //             <div className="adminProfileLoginHeloContainer">
                //                 <div>Hello!</div>
                //                 <div>Good Morning</div>
                //             </div>
                //             <div className="adminProfileLoginfrom"  >
                //                 <div className="adminProfileLoginTextDev">
                //                     <p>Login </p>
                //                     <span>Your account</span>
                //                 </div>
                //                 <div className="adminProfileLoginfrom ">




                //                     <div className="adminProfileLoginInputContainer">
                //                         <p>Username</p>
                //                         <div className="adminProfileLoginInputDivC">
                //                             <input name="username"
                //                                 type="text"
                //                                 // placeholder="Enter your Email Address"
                //                                 value={email}
                //                                 // className="admininput"
                //                                 onChange={handleEmailChange} />
                //                         </div>
                //                     </div>

                //                     <div className="adminProfileLoginInputContainer">
                //                         <p>Password</p>
                //                         <div className="adminProfileLoginInputPassword adminProfileLoginInputDivC">

                //                             <input type={showPassword ? "text" : "password"}
                //                                 name="password"
                //                                 // placeholder="Enter Your Password"
                //                                 value={password}
                //                                 onChange={handlePasswordChange} />
                //                             <div className="euye" onClick={togglePasswordVisibility}>
                //                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
                //                             </div>

                //                         </div>
                //                     </div>
                //                     <div className=" agentProfleForget">
                //                         forget password?
                //                     </div>
                //                     <div className="adminProfileLoginInputBtnDev">
                //                         <div onClick={(e) => handleSubmit(e)} className="adminProfileLoginInputBtn">

                //                             Login
                //                         </div>
                //                     </div>

                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>


            }
        </>
    );
};

export default AgentProfileLogin
