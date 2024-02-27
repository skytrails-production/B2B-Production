import * as React from "react";
import { useState, useEffect } from "react";
import "./Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import STLOGO from "../Images/ST-Main-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Redux/Auth/logIn/actionLogin";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import color from "../../src/color/color.js";
import {
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { apiURL } from "../Constants/constant.js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = () => {
  const [scrollYvalue, setScrollYValue] = useState(0);
  const reducerState = useSelector((state) => state);
  const [openModal, setOpenModal] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [userData, setUserData] = useState(null);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = () => {
    dispatch(logoutAction());
    navigate("/Login");
    
  };
 

  useEffect(() => {
    const updateSrollYPosition = () => {
      setScrollYValue(window.scrollY);
    };
    window.addEventListener("scroll", updateSrollYPosition);

    return () => window.removeEventListener("scroll", updateSrollYPosition);
  });

   const handlePayment = (e) => {
     e.preventDefault();
  //   const data = {
  //     _id: reducerState?.logIn?.loginData?.data?.data?.id,
  //     amount: amount,
  //   };

  //   // axios
  //     // .post(`${apiURL.baseURL}/updateBalance`, data)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //     handleRazorpay(res.data.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   handleRazorpay(data);

  //   // alert(amount);
  //   setAmount("");
  //   handleCloseModal();
   };

  // const handleRazorpay = (data) => {
  //   // console.log("handleRazorpay called");
  //   const options = {
  //     key: "rzp_test_rSxJ8wZCLzTJck",
  //     amount: amount * 100,
  //     currency: "INR",
  //     name: "The SkyTrails",
  //     description: "Test Transaction",
  //     image: STLOGO,
  //     order_id: data.id,
  //     handler: function (response) {
  //       // console.log(response);
  //       // Check if the Razorpay payment is successful
  //       if (response.razorpay_payment_id) {
  //         // Payment was successful, now update the user's balance
  //         const paymentData = {
  //           _id: reducerState?.logIn?.loginData?.data?.data?.id,
  //           amount: amount,
  //         };

  //         axios
  //           .post(`${apiURL.baseURL}/updateBalance`, paymentData)
  //           .then((balanceUpdateResponse) => {
  //             // console.log("new data response", balanceUpdateResponse);

  //             // Handle any further actions after a successful payment and database update
  //           })
  //           .catch((balanceUpdateError) => {
  //             console.error("Error updating user balance:", balanceUpdateError);
  //             // Handle the error from the database update, if needed.
  //           });
  //         // console.log(response)
  //         const paymentVerifyData = {
  //           razorpay_order_id: response.data.id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: data.razorpay_signature,
  //         };

  //         // console.log("paymentVeriy", paymentVerifyData);

  //         axios
  //           .post(`${apiURL.baseURL}/payVerify`, paymentVerifyData)
  //           .then((verificationResponse) => {
  //             // console.log(verificationResponse.data);

  //             // Handle any further actions after a successful payment verification
  //             // You can update the user's balance here if the payment was successful
  //           })
  //           .catch((verificationError) => {
  //             console.error("Error verifying payment:", verificationError);
  //             // Handle the error from the payment verification, if needed.
  //           });
  //       } else {
  //         // Payment was not successful, handle it as needed
  //         // console.log("Razorpay payment was not successful");
  //         // Handle the unsuccessful payment scenario, e.g., display an error message.
  //       }
  //     },
  //   };
  //   // console.log("option data", options)
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  //get user detail for update balance
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  useEffect(() => {
    // Make a GET request to the API endpoint
    axios
      .get(`${apiURL.baseURL}/skyTrails/user/${userId}`)
      .then((response) => {
        // Handle the response data
        const user = response.data.data;
        setUserData(user);
        // console.log("user data", response?.data?.data?.balance);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors, e.g., display an error message
      });
  }, []);
  return (
    <div
      className={scrollYvalue > 45 ? "header_scroll" : "header"}
      style={{ zIndex: "10px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          marginLeft: "-100px",
        }}
      >
        <a href="/">
          <img
            src={STLOGO}
            style={{ width: "100%", height: "220px" }}
            alt="logo"
          />
        </a>
      </div>
      <div style={{ alignItems: "center", gap: "25px", marginRight: "-110px" }}>
        <div
          className="welcome"
          style={{
            height: "50px",

            borderRadius: "0px 0px 0px 16px",
            background: "#D1EBFF",
            display: "inline-flex",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: "#000",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              textDecoration: "underline",
            }}
          >
            Contact your representative
          </p>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            |
          </div>

          <div style={{ width: 100.33, height: 20, position: "relative" }}>
            <div
              style={{
                width: 8,
                left: 70,
                height: 12,
                marginTop: "-7px",
                position: "absolute",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
              >
                <path
                  d="M3 7.33333H2.51333L5.91333 10.8733C6.32 11.3 6.02 12 5.43333 12C5.25333 12 5.08 11.9267 4.95333 11.7933L0.933333 7.60667C0.76 7.43333 0.666667 7.19333 0.666667 6.95333C0.666667 6.42667 1.09333 6 1.62 6H3C4.17333 6 5.14667 5.13333 5.30667 4H0.666667C0.3 4 0 3.7 0 3.33333C0 2.96667 0.3 2.66667 0.666667 2.66667H5.10667C4.73333 1.88 3.93333 1.33333 3 1.33333H0.666667C0.3 1.33333 0 1.03333 0 0.666667C0 0.3 0.3 0 0.666667 0H7.33333C7.7 0 8 0.3 8 0.666667C8 1.03333 7.7 1.33333 7.33333 1.33333H5.82667C6.14667 1.72 6.38667 2.17333 6.52667 2.66667H7.33333C7.7 2.66667 8 2.96667 8 3.33333C8 3.7 7.7 4 7.33333 4H6.65333C6.48 5.86667 4.90667 7.33333 3 7.33333Z"
                  fill="black"
                />
              </svg>
            </div>
            <div
              style={{
                left: 0,
                top: 0,
                position: "absolute",
                color: "black",
                fontSize: 16,
                fontFamily: "Montserrat",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Cash Bal:{" "}
            </div>
            <div
              style={{
                left: 80,
                top: 0,
                position: "absolute",
                color: "black",
                fontSize: 16,
                fontFamily: "Montserrat",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              {userData?.balance}
            </div>
          </div>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            |
          </div>
          <div
            onClick={handleOpenModal}
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              textDecoration: "underline",
              wordWrap: "break-word",
            }}
          >
            Recharge
          </div>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            |
          </div>

          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: "Montserrat",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              {" "}
              {reducerState?.logIn?.loginData?.data?.data?.username}
            </div>
            <div
              style={{
                width: 20,
                height: 20,
                position: "relative",
                opacity: 0.8,
              }}
            >
              <div
                style={{
                  width: 17.5,
                  height: 17.5,
                  left: 1.25,
                  top: -5,
                  position: "absolute",
                }}
                onClick={handleClick}
                id="menu"
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                cursor="pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <g opacity="0.8">
                    <path
                      d="M10.333 5C9.71494 5 9.11076 5.18328 8.59685 5.52666C8.08295 5.87004 7.68241 6.3581 7.44589 6.92911C7.20936 7.50013 7.14748 8.12847 7.26806 8.73466C7.38863 9.34085 7.68626 9.89767 8.1233 10.3347C8.56034 10.7717 9.11716 11.0694 9.72335 11.19C10.3295 11.3105 10.9579 11.2486 11.5289 11.0121C12.0999 10.7756 12.588 10.3751 12.9314 9.86116C13.2747 9.34725 13.458 8.74307 13.458 8.125C13.458 7.2962 13.1288 6.50134 12.5427 5.91529C11.9567 5.32924 11.1618 5 10.333 5Z"
                      fill="black"
                    />
                    <path
                      d="M10.333 1.25C8.60243 1.25 6.9107 1.76318 5.47177 2.72464C4.03284 3.6861 2.91133 5.05267 2.24907 6.65152C1.5868 8.25037 1.41352 10.0097 1.75114 11.707C2.08876 13.4044 2.92212 14.9635 4.14583 16.1872C5.36954 17.4109 6.92864 18.2442 8.62597 18.5819C10.3233 18.9195 12.0826 18.7462 13.6815 18.0839C15.2803 17.4217 16.6469 16.3002 17.6084 14.8612C18.5698 13.4223 19.083 11.7306 19.083 10C19.0804 7.68017 18.1576 5.45611 16.5173 3.81574C14.8769 2.17537 12.6528 1.25265 10.333 1.25ZM15.328 15.5788C15.3156 14.759 14.9815 13.9769 14.398 13.401C13.8144 12.8251 13.0279 12.5015 12.208 12.5H8.45801C7.63813 12.5015 6.85166 12.8251 6.26807 13.401C5.68447 13.9769 5.35047 14.759 5.33801 15.5788C4.20461 14.5667 3.40534 13.2343 3.04603 11.7579C2.68672 10.2815 2.78432 8.73084 3.32591 7.31116C3.8675 5.89148 4.82752 4.66979 6.07887 3.80785C7.33021 2.94592 8.81385 2.48439 10.3333 2.48439C11.8528 2.48439 13.3364 2.94592 14.5878 3.80785C15.8391 4.66979 16.7992 5.89148 17.3407 7.31116C17.8823 8.73084 17.9799 10.2815 17.6206 11.7579C17.2613 13.2343 16.4614 14.5667 15.328 15.5788Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div
            style={{
              marginLeft: "-25px",
            }}
          >
            <Menu
              id="menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleSubmit} style={{ width: "130px" }}>
                {reducerState?.logIn?.loginData?.data?.data
                  ? "Logout"
                  : "Login"}
              </MenuItem>
              {/* <MenuItem onClick={editPackage} style={{ fontSize: "15px" }}>
                My Package
              </MenuItem> */}
            </Menu>
          </div>
        </div>
        <div
          style={{
            width: "430px",
            height: "40px",
            marginLeft: "70px",
            marginTop: "20px",
          }}
        >
          <div
            className="Frame161"
            style={{
              width: 478,
              height: 36,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 25,
              display: "inline-flex",
            }}
          >
            <div
              className="UploadTcsPanDeclaration"
              style={{
                color: "#0048FF",
                fontSize: 16,
                fontFamily: "Montserrat",
                fontWeight: "400",
                textDecoration: "underline",
                wordWrap: "break-word",
              }}
            >
              Upload TCS PAN Declaration
            </div>
            <div
              className="Frame159"
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div
                className="JamWriteF"
                style={{ width: 24, height: 24, position: "relative" }}
              >
                <div
                  className="Vector"
                  style={{
                    width: 21.51,
                    height: 21.75,
                    left: 1.4,
                    top: 0.94,
                    position: "absolute",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.7888 1.47978L22.3788 2.06978C23.1918 2.88378 23.0688 4.32678 22.1018 5.29278L9.93481 17.4598L5.99281 18.9018C5.49781 19.0838 5.01581 18.8478 4.91781 18.3768C4.88469 18.2059 4.90028 18.0292 4.96281 17.8668L6.43281 13.8908L18.5658 1.75678C19.5328 0.790781 20.9758 0.665781 21.7888 1.47978ZM9.40381 2.68978C9.53513 2.68978 9.66517 2.71565 9.78649 2.7659C9.90782 2.81616 10.0181 2.88982 10.1109 2.98267C10.2038 3.07553 10.2774 3.18577 10.3277 3.3071C10.3779 3.42842 10.4038 3.55846 10.4038 3.68978C10.4038 3.8211 10.3779 3.95114 10.3277 4.07246C10.2774 4.19379 10.2038 4.30403 10.1109 4.39689C10.0181 4.48975 9.90782 4.56341 9.78649 4.61366C9.66517 4.66392 9.53513 4.68978 9.40381 4.68978H5.40381C4.87338 4.68978 4.36467 4.90049 3.98959 5.27557C3.61452 5.65064 3.40381 6.15935 3.40381 6.68978V18.6898C3.40381 19.2202 3.61452 19.7289 3.98959 20.104C4.36467 20.4791 4.87338 20.6898 5.40381 20.6898H17.4038C17.9342 20.6898 18.443 20.4791 18.818 20.104C19.1931 19.7289 19.4038 19.2202 19.4038 18.6898V14.6898C19.4038 14.4246 19.5092 14.1702 19.6967 13.9827C19.8842 13.7951 20.1386 13.6898 20.4038 13.6898C20.669 13.6898 20.9234 13.7951 21.1109 13.9827C21.2985 14.1702 21.4038 14.4246 21.4038 14.6898V18.6898C21.4038 19.7506 20.9824 20.7681 20.2322 21.5182C19.4821 22.2684 18.4647 22.6898 17.4038 22.6898H5.40381C4.34294 22.6898 3.32553 22.2684 2.57538 21.5182C1.82524 20.7681 1.40381 19.7506 1.40381 18.6898V6.68978C1.40381 5.62892 1.82524 4.6115 2.57538 3.86135C3.32553 3.11121 4.34294 2.68978 5.40381 2.68978H9.40381Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="Feedback"
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Feedback
              </div>
            </div>
            <div
              className="Frame160"
              style={{
                padding: 8,
                background: "#D2F8E7",
                borderRadius: 4,
                border: "1px #21325D solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div
                className="GstFaq"
                style={{
                  color: "#E73C33",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                GST FAQ
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-1rem",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              style={{
                cursor: "pointer",
                textDecoration: "none", // Remove underline by default
                transition: "text-decoration 0.3s ease", // Smooth transition
              }}
            >
              Enter Payment Detail
            </Typography>

            <CloseIcon
              onClick={handleCloseModal}
              style={{ cursor: "pointer" }}
            />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Paper
              elevation={3}
              style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
            >
              <form onSubmit={handlePayment}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel>Name</FormLabel>
                  <OutlinedInput
                    type="text"
                    value={
                      reducerState?.logIn?.loginData?.data?.data?.username || ""
                    }
                    readOnly
                    sx={{ width: "100%" }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel>Email address</FormLabel>
                  <OutlinedInput
                    type="email"
                    value={
                      reducerState?.logIn?.loginData?.data?.data?.email || ""
                    }
                    readOnly
                    placeholder="Enter your email"
                    sx={{ width: "100%" }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 6 }}>
                  <FormLabel>Amount</FormLabel>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </FormControl>

                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ margin: 0.1, backgroundColor: color.bluedark }}
                  >
                    Recharge Wallet
                  </Button>
                  <Button
                    className="cancel"
                    variant="contained"
                    onClick={handleCloseModal}
                    sx={{
                      margin: 0.5,
                      backgroundColor: color.red1,
                      margin: 0.1,
                      color: "white",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                {/* <span style={{ color: "red" }}>
                  {reducerState?.logIn?.loginData?.data?.data?.id}
                </span> */}
              </form>
            </Paper>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default Header;
