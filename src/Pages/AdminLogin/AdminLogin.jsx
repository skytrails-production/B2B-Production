import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthAction } from "../../Redux/Auth/AdminAuth/actionAdminAuth";
import newlogo from "../../Images/whitelogo1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";
import bg from "../../Images/bg-cover.jpg";
import { adminReducer } from "../../Redux/AdminLogin/adminReducer";
import { styled } from "@mui/material/styles";

import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  LinearProgress,
} from "@mui/material";
const MuiGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(1),
}));

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(reducerState,"reducerState")
  let adminData = reducerState?.adminAuth?.isLogin;

  const error = useSelector((state) => state?.adminAuth?.adminData?.error);
  const errorMessage = useSelector(
    (state) => state?.adminAuth?.adminData?.errorMessage
  );
  useEffect(() => {
    //console.log(errorMessage,"adminData",error);
    if (adminData) {
      navigate("/admin/dashboard");
    }
  }, [reducerState?.adminAuth]);

  useEffect(() => {
    if (error) {
      setFormError(errorMessage);
      setLoading(false);
    }
  }, [error, errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const payload = {
      username: email,
      password: password,
    };

    // Dispatch the action and wait for the response
    try {
      const response = await dispatch(adminAuthAction(payload));

      setFormError(""); // Clear any previous errors on success
    } catch (error) {
      console.error("Error occurred while authenticating:", error);
       // Set a timer to clear the error after 50 seconds
    setTimeout(() => {
      setFormError(""); // Clear error after 50 seconds
    }, 5000);
      // Error handling is done in the useEffect
    } finally {
      // Set loading back to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reducerState.adminAuth.isLogin) {
      const id = reducerState.adminAuth.adminData.id;
      navigate("/admin/dashboard", { state: { adminId: id } });
    }
  }, [reducerState.adminAuth, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormError("");
  };

  if (adminData) {
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
    <>
      {reducerState?.logIn?.isLogin || reducerState?.subadminLogin?.isLogin ? (
        <div>
          <SubAdminAccess />
        </div>
      ) : (
        <div>
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
            <header
              className="sectionad headers"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="headead">
                <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
                <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                  Admin Login
                </h2>
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
                <button className="btnadmin" disabled={loading}>
                  {" "}
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </form>
            </section>
            {formError && (
              <p style={{ color: "red", padding: "0px 0px 5px 50px" }}>
                {formError}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { adminAuthAction } from "../../Redux/Auth/AdminAuth/actionAdminAuth";
// import newlogo from "../../Images/whitelogo1.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./AdminLogin.css";
// import bg from "../../Images/bg-cover.jpg";
// import { styled } from "@mui/material/styles";
// import SubAdminAccess from "../subAdmin/subAdminDashboard/subAdminaccess";
// import { Grid, LinearProgress } from "@mui/material";
// import { useEffect } from "react";

// const MuiGridItem = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(2),
// }));

// const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   width: "100%",
//   borderRadius: theme.spacing(1),
// }));

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const reducerState = useSelector((state) => state);
//   const isLogin = useSelector((state) => state?.adminAuth?.isLogin);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!email.trim() || !password.trim()) {
//       setFormError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     const payload = {
//       username: email,
//       password: password,
//     };

//     try {
//       await dispatch(adminAuthAction(payload));
//       // Redirect on successful login
//       navigate("/admin/dashboard");
//     } catch (error) {
//       console.error("Error occurred while authenticating:", error);
//       setFormError("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//     setFormError("");
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//     setFormError("");
//   };

//   // useEffect(() => {
//   //   if (reducerState.adminAuth.isLogin) {
//   //     const id = reducerState.adminAuth.adminData.id;
//   //     navigate("/admin/dashboard", { state: { adminId: id } });
//   //   }
    
//   // }, [reducerState.adminAuth, navigate]);
//   console.log(reducerState,"reducerstatesssss");
//   useEffect(() => {
//     // Log the reducer state to see what's happening
//     console.log("Admin Auth State:", reducerState.adminAuth);
  
//     if (reducerState.adminAuth.isLogin) {
//       const id = reducerState.adminAuth.adminData.id;
//       console.log("Admin is logged in. Admin ID:", id);
//       navigate("/admin/dashboard", { state: { adminId: id } });
//     } else {
//       console.log("Admin is not logged in.");
//     }
//   }, [reducerState.adminAuth, navigate]);
  
//   return (
//     <>
//       {isLogin ? (
//         <div>
//           <MuiGridItem
//             item
//             xs={12}
//             style={{ display: "flex", justifyContent: "center" }}
//           >
//             <CustomLinearProgress />
//           </MuiGridItem>
//         </div>
//       ) : (
//         <div>
//           <div
//             className="coverletter"
//             style={{
//               width: "100%",
//               margin: "auto",
//               height: "250px",
//               overflow: "hidden",
//             }}
//           >
//             <img
//               src={bg}
//               alt=""
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </div>
//           <div className="Adminwrapper">
//             <header
//               className="sectionad headers"
//               style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
//             >
//               <div className="headead">
//                 <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
//                 <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
//                   Admin Login
//                 </h2>
//               </div>
//             </header>

//             <section className="section sign-in">
//               <form onSubmit={handleSubmit} className="formadmin">
//                 <div className="password-container">
//                   <input
//                     name="username"
//                     type="text"
//                     placeholder="Enter your Email Address"
//                     value={email}
//                     className="admininput"
//                     onChange={handleEmailChange}
//                   />
//                 </div>
//                 <div className="password-container">
//                   <div className="eye-icon" onClick={togglePasswordVisibility}>
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Enter Your Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     className="admininput"
//                   />
//                 </div>
//                 <button className="btnadmin" disabled={loading}>
//                   {loading ? "Loading..." : "Sign In"}
//                 </button>
//               </form>
//             </section>
//             {formError && (
//               <p style={{ color: "red", padding: "0px 0px 5px 50px" }}>
//                 {formError}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminLogin;
