// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { apiURL } from "../../Constants/constant";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const boxStyle = {
//   maxWidth: 400,
//   margin: "auto",
//   marginTop: "50px",
//   padding: "20px",
//   borderRadius: "10px",
//   boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//   textAlign: "center",
//   backgroundColor: "white",
// };

// const RMforgotpassword = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get("token");
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     console.log("passnotmatched")
//     try {
//       const response = await fetch(
//         `${apiURL.baseURL}/skyTrails/api/relationShipManager/resetPassword`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({
//             password: newPassword,
//             confirmpassword: confirmPassword,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (data.statusCode === 200) {
//         toast.success("Password has been reset successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//         navigate("/relationshipManager/Login");
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during password reset", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Box sx={boxStyle}>
//       <ToastContainer position="top-center" autoClose={5000} />
//       <Typography variant="h5" component="h1" gutterBottom>
//         Reset Password
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           placeholder="New Password"
//           type={showPassword ? "text" : "password"}
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment
//                 position="end"
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: "pointer" }}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </InputAdornment>
//             ),
//           }}
//           sx={{ minHeight: "56px" }}
//         />
//         <TextField
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           placeholder="Confirm Password"
//           type={showPassword ? "text" : "password"}
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment
//                 position="end"
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: "pointer" }}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </InputAdornment>
//             ),
//           }}
//           sx={{ minHeight: "56px" }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ minHeight: "56px" }}
//         >
//           Reset Password
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default RMforgotpassword;

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiURL } from "../../Constants/constant";
import { useNavigate, useLocation } from "react-router-dom";

const boxStyle = {
  maxWidth: 400,
  margin: "auto",
  marginTop: "50px",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  backgroundColor: "white",
};

const RMforgotpassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/relationShipManager/resetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            password: newPassword,
            confrmPassword: confirmPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password has been reset successfully!");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/relationshipManager/Login");
      } else {
        toast.error(
          data.message || "Failed to reset password. Please try again."
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

  return (
    <Box sx={boxStyle}>
      <ToastContainer position="top-center" autoClose={5000} />
      <Typography variant="h5" component="h1" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputAdornment>
            ),
          }}
         
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputAdornment>
            ),
          }}
         
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ minHeight: "56px" }}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default RMforgotpassword;
