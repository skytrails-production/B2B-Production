// import React, { useState, useEffect } from "react";
// import { apiURL } from "../../Constants/constant";
// import { useNavigate } from "react-router-dom";
// import "./SubAdminSignIn.css";
// import bg from "../../Images/bgsubadmin.jpg";
// import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import SubAdminAccess from "./subAdminDashboard/subAdminaccess";
// import {
//   subAdminLogin,
//   subAdminFailure,
// } from "../../Redux/SubAdminLogin/actionsubadminlogin";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { styled } from "@mui/material/styles";
// import { Grid, LinearProgress } from "@mui/material";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const MuiGridItem = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(2),
// }));

// const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   width: "100%",
//   borderRadius: theme.spacing(1),
// }));

// const SubAdminLoginForm = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const reducerState = useSelector((state) => state);
//   const subAdminData = reducerState?.subadminLogin?.isLogin;
//   useEffect(() => {
//     if (reducerState?.subadminLogin?.subadminloginData?.statusCode === 200) {
//       navigate("/subAdmin/dashboard");
//     }
//   }, [reducerState?.subadminLogin?.subadminloginData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `${apiURL.baseURL}/skytrails/api/subAdmin/subAdminLogin`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userName, password }),
//         }
//       );

//       const data = await response.json();
//       if (data?.statusCode === 200) {
//         localStorage.setItem("token", data.token);
//         dispatch(subAdminLogin(data));
//         toast.success("Login Successful!");
//       } else {
//         toast.error("Username or password is incorrect");
//         dispatch(subAdminFailure(data));
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   if (subAdminData) {
//     return (
//       <div>
//         <MuiGridItem
//           item
//           xs={12}
//           style={{ display: "flex", justifyContent: "center" }}
//         >
//           <CustomLinearProgress />
//         </MuiGridItem>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <ToastContainer position="top-center" autoClose={5000} />

//       {reducerState?.logIn?.isLogin || reducerState?.adminAuth?.isLogin ? (
//         <div>
//           <SubAdminAccess />
//         </div>
//       ) : (
//         <div className="mainsubadmin">
//           <div className="containersubadmin" style={{ marginTop: "50px" }}>
//             <div className="screensub">
//               <div className="screen__contentsub">
//                 <form className="loginsubadmin" onSubmit={handleSubmit}>
//                   <h4 style={{ marginTop: "-50px", fontStyle: "italic" }}>
//                     Admin Login
//                   </h4>

//                   <div className="login__fieldsub">
//                     <i className="login__iconsub">
//                       <FaUser />
//                     </i>
//                     <input
//                       type="text"
//                       className="login__inputsub"
//                       placeholder="Username"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="login__fieldsub">
//                     <i className="login__iconsub fas fa-lock">
//                       <FaLock />
//                     </i>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       className="login__inputsub"
//                       placeholder="Password"
//                       style={{ paddingRight: "60px" }} // Add some padding to accommodate the eye icon
//                     />
//                     <div
//                       className="eye-icon"
//                       onClick={togglePasswordVisibility}
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         right: "73px",
//                         transform: "translateY(-50%)",
//                       }}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </div>
//                   </div>

//                   <button className="button login__submitsub" type="submit">
//                     <span className="button__text">Login</span>
//                     <i className="button__iconsub fas fa-chevron-right">
//                       <FaSignInAlt />
//                     </i>
//                   </button>
//                 </form>
//               </div>
//               <div className="screen__backgroundsub">
//                 <span className="screen__background__shape screen__background__shape4"></span>
//                 <span className="screen__background__shape screen__background__shape3"></span>
//                 <span className="screen__background__shape screen__background__shape2"></span>
//                 <span className="screen__background__shape screen__background__shape1"></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubAdminLoginForm;

import React, { useState, useEffect } from "react";
import { apiURL } from "../../Constants/constant";
import { useNavigate } from "react-router-dom";
import "./SubAdminSignIn.css";
import bg from "../../Images/bgsubadmin.jpg";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SubAdminAccess from "./subAdminDashboard/subAdminaccess";
import {
  subAdminLogin,
  subAdminFailure,
} from "../../Redux/SubAdminLogin/actionsubadminlogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import {
  Grid,
  LinearProgress,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const MuiGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(1),
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const SubAdminLoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const subAdminData = reducerState?.subadminLogin?.isLogin;
  useEffect(() => {
    if (reducerState?.subadminLogin?.subadminloginData?.statusCode === 200) {
      navigate("/subAdmin/dashboard");
    }
  }, [reducerState?.subadminLogin?.subadminloginData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skytrails/api/subAdmin/subAdminLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      const data = await response.json();
      if (data?.statusCode === 200) {
        localStorage.setItem("token", data.token);
        dispatch(subAdminLogin(data));
        toast.success("Login Successful!");
      } else {
        toast.error("Username or password is incorrect");
        dispatch(subAdminFailure(data));
      }
    } catch (error) {
      console.error("Error during login", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skytrails/api/subAdmin/forgetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data?.statusCode === 200) {
        toast.success("Password reset link has been sent to your email.");
        setOpenForgotPassword(false);
      } else {
        toast.error(
          "Failed to send password reset link. Please check your email and try again."
        );
      }
    } catch (error) {
      console.error("Error during password reset", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (subAdminData) {
    return (
      <div>
        <MuiGridItem
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CustomLinearProgress />
        </MuiGridItem>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} />
      {reducerState?.logIn?.isLogin || reducerState?.adminAuth?.isLogin ? (
        <div>
          <SubAdminAccess />
        </div>
      ) : (
        <div className="mainsubadmin">
          <div className="containersubadmin" style={{ marginTop: "50px" }}>
            <div className="screensub">
              <div className="screen__contentsub">
                <form className="loginsubadmin" onSubmit={handleSubmit}>
                  <h4 style={{ marginTop: "-50px", fontStyle: "italic" }}>
                    Admin Login
                  </h4>

                  <div className="login__fieldsub">
                    <i className="login__iconsub">
                      <FaUser />
                    </i>
                    <input
                      type="text"
                      className="login__inputsub"
                      placeholder="Email"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="login__fieldsub">
                    <i className="login__iconsub fas fa-lock">
                      <FaLock />
                    </i>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="login__inputsub"
                      placeholder="Password"
                      style={{ paddingRight: "60px" }} // Add some padding to accommodate the eye icon
                    />
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        top: "37%",
                        right: "73px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                    <div className="forgot-password">
                      <a
                        href="#!"
                        onClick={() => setOpenForgotPassword(true)}
                        style={{ color: "#21325D" }}
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <button className="button login__submitsub" type="submit">
                    <span className="button__text">Login</span>
                    <i className="button__iconsub fas fa-chevron-right">
                      <FaSignInAlt />
                    </i>
                  </button>

                  {/* <div className="forgot-password">
                    <a
                      href="#!"
                      onClick={() => setOpenForgotPassword(true)}
                      style={{ color: "#21325D",fontWeight:"bold" }}
                    >
                      Forgot Password?
                    </a>
                  </div> */}
                </form>
              </div>
              <div className="screen__backgroundsub">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Forgot Password
          </Typography>
          <form onSubmit={handleForgotPasswordSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Link
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SubAdminLoginForm;
