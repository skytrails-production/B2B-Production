import STLOGO from "../Images/ST-Main-Logo.png";
import * as React from "react";
import { useState, useEffect } from "react";
import "./Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Swal from "sweetalert2";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Redux/Auth/logIn/actionLogin";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import color from "../../src/color/color.js";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  
  getUserDataAction,
} from "../Redux/Auth/UserDataById/actionUserData";
import {
  FormControl,
  FormLabel,
  
} from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import "./Headers.css"
import { apiURL } from "../Constants/constant.js";

function Headers() {
  const [scrollYvalue, setScrollYValue] = useState(0);
  const reducerState = useSelector((state) => state);
  const [openModal, setOpenModal] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [mobileNumber, setMobileNumber] = useState('');
  // const [userData, setUserData] = useState(null);
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



  // easy Buzz payment

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
// console.log(reducerState, "reducer State")

const isValidMobileNumber = (mobileNumber) => {
  // Validate if the mobile number is 10 digits and doesn't start with 0-5
  return /^[6-9]\d{9}$/.test(mobileNumber);
};

  const handlePayment = async (event) => {      
    event.preventDefault();
    if (!isValidMobileNumber(mobileNumber)) {
      await Swal.fire({
         title: 'Invalid Mobile Number',
         text: 'Please Enter a Valid 10-digit Mobile Number not starting with 0-5',
         icon: 'error',
         confirmButtonText: 'OK',
       });
       return;
     }
    //  if (!isValidMobileNumber(amount)) {
    //   await Swal.fire({
    //      title: 'Amount',
    //      text: 'Please Enter a Valid Amount',
    //      icon: 'error',
    //      confirmButtonText: 'OK',
    //    });
    //    return;
    //  }

    const payload = {
      userId:userId,
      firstname: reducerState?.logIn?.loginData?.data?.data?.username,
      phone:mobileNumber,
      amount:amount,
      email: reducerState?.logIn?.loginData?.data?.data?.email,
      productinfo: "wallet",
      bookingType: "Recharge Wallet",
      surl:`${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
      furl:`${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`
    };

    try {
      
      const response = await fetch(`${apiURL.baseURL}/skyTrails/easebuzzPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        proceedPayment(data.result.access, "prod", data.result.key);
        // console.log("API call successful:", data);
        setAmount("");
        setMobileNumber("");
        handleCloseModal();
      } else {
        console.error("API call failed with status:", response.status);
        const errorData = await response.json();
        // console.error("Error details:", errorData);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("API call failed with an exception:", error.message);
    }

     
  };


  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        // console.log(response, "response");
        if (response.status === "success") {
          try {
            // console.log(response, "response", response.easepayid);
            const easepayid=response.easepayid;
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(`
              ${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=${response.txnid}`, {easepayid: easepayid}
            );

          setTimeout(()=>{
            dispatch(getUserDataAction(reducerState?.logIn?.loginData?.data?.data?.id));
          },10000);

          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(`
              ${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            // console.log(verifyResponse.data);
            // Handle verifyResponse as needed
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };


  
//razorpay Payment

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     _id: reducerState?.logIn?.loginData?.data?.data?.id,
  //     amount: amount,
  //   };

  //   // axios
  //   //   .post(`${apiURL.baseURL}/updateBalance`, data)
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
  // };

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
  //         console.log(response,"response razorpay")
  //         const paymentData = {
  //           _id: reducerState?.logIn?.loginData?.data?.data?.id,
  //           amount: amount,
  //           paymentId:response.razorpay_payment_id
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

  //         setTimeout(()=>{
  //           dispatch(getUserDataAction(reducerState?.logIn?.loginData?.data?.data?.id));
  //         },10000);

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
  // const userId = reducerState?.logIn?.loginData?.data?.data?.id;


  // console.log("userIdnew", userId, reducerState)


  useEffect(() => {
    // Make a GET request to the API endpoint
    //  console.log("ID",id);
    if (userId) {
      const payload = userId;

      // console.log(payload,'userIdiii');
      dispatch(getUserDataAction(payload));
    }

    //     if(userId){
    //       const balancePayload={
    //         _id:userId,
    //         amount:100
    //       }

    //  dispatch(balanceSubtractRequest(balancePayload))
    //     }
    // console.log( dispatch(getUserDataAction(payload)),'working dispatch')

    // axios
    //   .get(`${apiURL.baseURL}/skyTrails/user/${userId}`)
    //   .then((response) => {
    //     // Handle the response data
    //     const user = response.data.data;
    //     setUserData(user);
    //     console.log("user data", response?.data?.data?.balance);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle errors, e.g., display an error message
    //   });

  }, [userId, dispatch]);

  const userData = reducerState?.userData?.userData?.data?.data;


  const location = useLocation();
  const { pathname } = location;

  if (pathname === '/admin/dashboard') {
    return null; // If the path matches '/admin/dashboard', the header is not rendered
  }

  const isAdminPath = pathname === "/adminLogin" || pathname === "/admin/dashboard "|| pathname==="/subAdminLogin" || pathname==="/addSubAdmin" ||pathname==="/subAdmin/dashboard"||pathname==="/addAgent"||pathname==="/addAdvertisement"||pathname==="/addWebAdvertisement";

  if (isAdminPath) {
    return null; // Don't render the InnerNavbar for admin paths
  }
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img src={STLOGO} className="logo" alt="logo" />
        </Link>
      </div>
      <div className="info-container">
        <div className="welcome">
          <p className="welcome-text">
            Contact your representative
          </p>
          <div className="seperator">|</div>

          <div className="balance-container">
            <div className="balanceBox">
              <p>Cash Bal: <CurrencyRupeeIcon /> {userData?.balance.toFixed(2) || reducerState?.logIn?.loginData?.data?.data?.balance.toFixed(2)}</p>
            </div>
          </div>
          <div className="seperator">|</div>
          <div onClick={handleOpenModal} className="rechargeBox">Recharge</div>
          <div className="seperator">|</div>

          <div className="profileBox">
            <div
              className="profileName">
              {" "}{reducerState?.logIn?.loginData?.data?.data?.username}
            </div>
            <div className="profileIcon">
              <div
                className="profileMenu"
                onClick={handleClick}
                id="menu"
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                cursor="pointer"
              >
                <AccountCircleIcon />
              </div>
            </div>
          </div>

          <div>
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
              <MenuItem onClick={handleSubmit} style={{ width: "130px" }} >
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
        {/* <div
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
                padding: 6,
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
        </div> */}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          width: '100%',
          padding: '10px',
        }}
      >
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ cursor: 'pointer', flexGrow: 1, textAlign: 'center' }}
          >
            Enter Payment Detail
          </Typography>
          <CloseIcon onClick={handleCloseModal} style={{ cursor: 'pointer' }} />
        </Box>

        
          <form onSubmit={handlePayment}>
                {/* <FormControl fullwidth sx={{ marginBottom: 2 }}>
                  <FormLabel>Name</FormLabel>
                  <OutlinedInput
                    type="text"
                    value={
                      reducerState?.logIn?.loginData?.data?.data?.username || ""
                    }
                    readOnly
                    sx={{ width: "100%" }}
                  />
                </FormControl> */}

                {/* <FormControl fullwidth sx={{ marginBottom: 2 }}>
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
                </FormControl> */}

<FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel>Mobile Number</FormLabel>
                  <OutlinedInput
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}                    
                    placeholder="Enter Mobile Number"
                    sx={{ width: "100%" }}
                  />
                </FormControl>

                <FormControl fullwidth sx={{ marginBottom: 6 }}>
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
            </Box>
          </Box>
      </Modal>
    </div>
  );
}

export default Headers;
