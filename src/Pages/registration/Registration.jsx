import React from "react";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Input, Typography } from "@mui/material";
// import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
// import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Flex, space, Spacer, Text } from "@chakra-ui/react";
import Popularfilter from "../Flight/flightresult/Popularfilter";
import tra from "../../Images/tra.png";
import LockIcon from "@mui/icons-material/Lock";
import { InnerBarLogo } from "../../data";
import { logindata } from "../../logindata";
import { logindataaa } from "../../logindataaa";
import { NavLink } from "react-router-dom";
import NavBarBox from "../../Components/NavBarBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import Alert from "@mui/material/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { fontWeight } from "@mui/system";
import {
  signUpAction,
  signUpActionClear,
} from "../../Redux/Auth/SignUp/actionSignUp";
import "./registration.css";
import logo from "../../../src/Images/ST-Main-Logo.png";
import color from "../../color/color";
import newbanner from "../../../src/Images/newBanner1.jpg";
import r1 from "../../Images/regestration/r1.svg";
import r2 from "../../Images/regestration/r2.svg";
import r3 from "../../Images/regestration/r3.svg";
import r4 from "../../Images/regestration/r4.svg";
import r5 from "../../Images/regestration/r5.svg";
import one from "../../Images/regestration/1.png";
import two from "../../Images/regestration/2.png";
import three from "../../Images/regestration/3.png";
import four from "../../Images/regestration/4.png";
import five from "../../Images/regestration/5.png";
import whiteLogo from "../../Images/The hawai yatra final logo.png";
import { motion } from "framer-motion";
import { apiURL } from "../../Constants/constant";
import {
  validatePincode,
  validatePassword,
  validatePAN,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../../utils/validation";
const Login = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  const [password, setPassword] = useState("");
  const [AttemptedNext, setAttemptedNext] = useState("");
  const [referalcodeerror, setreferalcodeerror] = useState("");
  const [pan, setPan] = useState("");
  const [ReferalCode, setReferalCode] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [personalDetail, setPersonalDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: {
      country_code: "+91",
      mobile_number: "",
    },

    address_details: {
      residential_address: "",
      address_2: "",
      telephone_number: "",
      pincode: "",
      country: "",
      state: "",
      city: "",
    },
    password: "",
  });
  const [agencyDetails, setAgencyDetails] = useState({
    agency_name: "",
    pan_number: "",
    agency_mobile: {
      country_code: "+91",
      mobile_number: "",
    },
    address: "",
    address_2: "",
    fax: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    business_type: "Solo Proprietor",
    office_space: "Owned",
    IATA_registration_id: "Yes",
    IATA_code: "",
    TDS: "",
    TDS_percentage: "",
    references: "",
    consolidators: "",
    remarks: "",
    // document_details: {
    //   pan_card_document: formData.append('file', file),
    // },
  });
  const [agencyGSTDetails, setAgency_GSTDetails] = useState({
    agency_name: "",
    agency_classification: "Resistered",
    agency_GSTIN: "",
    state: "",
    state_code: "",
    provisional_GSTIN: "",
    contact_person: "",
    phone_number: "",
    telephone_number: "",
    email: "",
    correspondance_mail_id: "",
    GST_registration_status: "",
    HSN_SAC_code: "",
    composition_levy: "Yes",
    address_line1: "",
    address_line2: "",
    pincode: "",
    agency_city: "",
    supply_type: "Tax",
  });

  useEffect(() => {
    if (reducerState?.logIn?.loginData?.data?.data) {
      navigate("/");
    }
  }, [reducerState, navigate]);
  function handlePersonalDetail(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.warn(formData, "from");
  }
  // console.log(reducerState.signUp,"reducer state");

  async function handlereferalcode(e) {
    setReferalCode(e.target.value);
    if (8 <= e.target.value.length) {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/agent/checkValidReferralCode/${e.target.value}`
        );
        if (response.status === 200) {
          console.log(
            "Referral code applied successfully",
            response.data.responseMessage
          );
          setreferalcodeerror(response.data.responseMessage);
          setTimeout(() => {
            setreferalcodeerror("");
          }, 4000);
        } else {
          setreferalcodeerror(response.data.responseMessage);
          setTimeout(() => {
            setreferalcodeerror("");
          }, 4000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  // const validatePersonalDetails = () => {

  //   switch (currentStep) {
  //     case 1:

  //       if (
  //         !validateName(personalDetail.first_name) ||
  //         personalDetail.last_name === "" ||
  //         !validateEmail(personalDetail.email) ||
  //         !validatePhoneNumber(personalDetail.mobile.mobile_number)
  //       ) {
  //         return false;
  //       }
  //       break;
  //     case 2:

  //       if (
  //         personalDetail.address_details.residential_address === "" ||
  //         !validatePincode(personalDetail.address_details.pincode) ||
  //         personalDetail.address_details.pincode === "" ||
  //         personalDetail.address_details.country === "" ||
  //         personalDetail.address_details.state === "" ||
  //         personalDetail.address_details.city === ""
  //       ) {
  //         return false;
  //       }
  //       break;
  //     case 3:

  //       if (
  //         !validatePassword(personalDetail.password) ||
  //         !validatePAN(agencyDetails.pan_number) ||
  //         !pan ||
  //         agencyDetails.agency_name === ""
  //       ) {
  //         return false;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return true;
  // };

  const handleNext = () => {
    setAttemptedNext(true);
    // setSub(true);

    // if (!validatePersonalDetails()) {
    //   return;
    // }

    // }

    setCurrentStep(currentStep + 1);

    // }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setAttemptedNext(false);
  };

  function handleSubmit() {
    setSub(true);
    if (!personalDetailValidations()) {
      return;
    }
    // if (
    //   !agencyDetailsValidations()) {
    //   setAgencyPage(2)
    //   setSub({ ...sub, agencyDetailsSub: true })
    //   return
    // }
    // if (
    //   !agencyGSTDetailsValidation()) {
    //   setSub({ ...sub, agencyGSTDetailsSub: true })
    //   return
    // }

    // console.warn("File " + file)

    // console.log("File", file);

    // const formData = new FormData(event.target);

    const payload = {
      personal_details: personalDetail,
      agency_details: agencyDetails,
      agency_gst_details: agencyGSTDetails,
      referralCode: ReferalCode,
    };
    // console.warn(personalDetail, "personalDetail", agencyDetails, "agencyDetails", agencyGSTDetails, "agencyGSTDetails", payload, "payload")
    const formData1 = new FormData();
    formData1.append("file", pan);
    formData1.append("data", JSON.stringify(payload));
    // console.warn(formData1, pan, "payload@@@@@@@@@@@@@@@@@@@@@@")
    dispatch(signUpAction({ file: pan, data: JSON.stringify(payload) }));
    // return;

    setPersonalDetails({
      first_name: "",
      last_name: "",
      email: "",
      mobile: {
        country_code: "+91",
        mobile_number: "",
      },

      address_details: {
        residential_address: "",
        address_2: "",
        telephone_number: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
      },
      password: "",
    });
    setAgencyDetails({
      agency_name: "",
      pan_number: "",
      agency_mobile: {
        country_code: "+91",
        mobile_number: "",
      },
      address: "",
      address_2: "",
      fax: "",
      pincode: "",
      country: "",
      state: "",
      city: "",
      business_type: "Solo Proprietor",
      office_space: "Owned",
      IATA_registration_id: "Yes",
      IATA_code: "",
      TDS: "",
      TDS_percentage: "",
      references: "",
      consolidators: "",
      remarks: "",
      // document_details: {
      //   pan_card_document: formData.append('file', file),
      // },
    });
    setAgency_GSTDetails({
      agency_name: "",
      agency_classification: "Resistered",
      agency_GSTIN: "",
      state: "",
      state_code: "",
      provisional_GSTIN: "",
      contact_person: "",
      phone_number: "",
      telephone_number: "",
      email: "",
      correspondance_mail_id: "",
      GST_registration_status: "",
      HSN_SAC_code: "",
      composition_levy: "Yes",
      address_line1: "",
      address_line2: "",
      pincode: "",
      agency_city: "",
      supply_type: "Tax",
    });
    setSub(false);
  }

  function personalDetailValidations() {
    if (
      !validateName(personalDetail.first_name) ||
      personalDetail.last_name === "" ||
      !validateEmail(personalDetail.email) ||
      !validatePhoneNumber(personalDetail.mobile.mobile_number) ||
      personalDetail.address_details.residential_address === "" ||
      !validatePincode(personalDetail.address_details.pincode) ||
      personalDetail.address_details.pincode === "" ||
      personalDetail.address_details.country === "" ||
      personalDetail.address_details.state === "" ||
      personalDetail.address_details.city === "" ||
      !validatePassword(personalDetail.password) ||
      !validatePAN(agencyDetails.pan_number) ||
      !pan ||
      agencyDetails.agency_name === ""
    ) {
      return false;
    } else {
      return true;
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <section class="hero-section-two">
        <div className="registrationNNContainer">
          {/* step by step updating part */}

          <div>
            <div>
              <Grid container px={10}>
                <div className="container loginNav">
                  <div className="logoLoginBox">
                    <img
                      onClick={() => navigate("/Login")}
                      src={whiteLogo}
                      width={180}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="loginSign">
                    <button onClick={() => navigate("/Login")}>Log In</button>
                  </div>
                </div>

                <Grid item xs={12} sm={12} lg={12}>
                  {/* <Paper
                    className="paper_pin"
                    style={{ height: "auto", width: "100%", borderRadius: "20px", marginTop: "10px" }}
                  > */}
                  {reducerState.signUp?.showSuccessMessage && (
                    <Alert
                      onClick={() => {
                        dispatch(signUpActionClear());
                      }}
                      severity="success"
                    >
                      Thankyou ! for Registering, we'll contact you ASAP
                    </Alert>
                  )}

                  <div className="boxContainerRegstration ">
                    {/* <div className="boxContainerRegstration_innerdiv" >
                        <motion.div style={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}

                        >

                          
                        </motion.div>
                      </div> */}

                    <Box
                      flex={1}
                      style={{
                        display: "contents",
                      }}
                    >
                      <div
                        className="registerContainer"
                        style={{ background: "rgba(249, 255, 252, 0.4)" }}
                      >
                        <div>
                          <div style={{}}>
                            <Grid
                              container
                              spacing={2}
                              display="flex"
                              justifyContent="center"
                              p={"10px"}
                            >
                              <div className="Regestration_inputFilds_Container">
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                  style={{ color: "#1E1E1E" }}
                                >
                                  Personal Details
                                </Typography>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className="Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label
                                      htmlFor="first_name"
                                      className="form_lable_regestration"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="first_name"
                                      name="first_name"
                                      placeholder=" Enter First Name"
                                      className="input_size"
                                      value={personalDetail.first_name}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          first_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateName(
                                        personalDetail.first_name
                                      ) && (
                                        <span id="error1">
                                          Enter a valid first name
                                        </span>
                                      )}
                                  </div>
                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      name="last_name"
                                      placeholder=" Enter Last Name"
                                      className="input_size"
                                      value={personalDetail.last_name}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          last_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateName(
                                        personalDetail.last_name
                                      ) && (
                                        <span id="error1">
                                          Enter valid last name
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                  style={{ color: "#1E1E1E" }}
                                >
                                  Address
                                </Typography>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Residential Address
                                    </label>
                                    <input
                                      type="text"
                                      name="residential_address"
                                      placeholder="Residential Address"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details
                                          .residential_address
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            residential_address: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details
                                        .residential_address === "" && (
                                        <span id="error1">
                                          Enter residential_address
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      {" "}
                                      Address 2
                                    </label>
                                    <input
                                      type="text"
                                      name="address_2"
                                      placeholder=" Enter Address 2"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details.address_2
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            address_2: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      name="city"
                                      placeholder=" Enter Your City"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.city
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            city: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.city ===
                                        "" && (
                                        <span id="error1">Enter Your City</span>
                                      )}
                                  </div>

                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      State/Province*
                                    </label>
                                    <input
                                      type="text"
                                      name="state"
                                      placeholder=" State"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details.state
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            state: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.state ===
                                        "" && (
                                        <span id="error1">Enter State</span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Pin Code
                                    </label>
                                    <input
                                      type="number"
                                      name="pincode"
                                      placeholder=" Enter Pin Code"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.pincode
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            pincode: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePincode(
                                        personalDetail.address_details.pincode
                                      ) && (
                                        <span id="error1">Enter Pin Code</span>
                                      )}
                                  </div>

                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      name="country"
                                      placeholder=" Enter Your Country"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.country
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            country: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.country ===
                                        "" && (
                                        <span id="error1">Enter country</span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      Mobile Number
                                    </label>
                                    <input
                                      type="text"
                                      name="mobile_number"
                                      placeholder="+91"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.mobile.mobile_number
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          mobile: {
                                            country_code: "+91",
                                            mobile_number: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePhoneNumber(
                                        personalDetail.mobile.mobile_number
                                      ) && (
                                        <span id="error1">
                                          Enter Mobile Number
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Agency Name
                                    </label>
                                    <input
                                      type="text"
                                      name="agency_name"
                                      placeholder=" Enter Agency Name"
                                      className="input_size"
                                      value={agencyDetails.agency_name}
                                      onChange={(e) =>
                                        setAgencyDetails({
                                          ...agencyDetails,
                                          agency_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      agencyDetails.agency_name === "" && (
                                        <span id="error1">
                                          Enter Agency Name
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                  style={{ color: "#1E1E1E" }}
                                >
                                  Contact Information
                                </Typography>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      PAN
                                    </label>
                                    <input
                                      style={{ padding: "4px" }}
                                      name="pan_card_document"
                                      id="pan_card_document"
                                      type="file"
                                      className="input_size"
                                      onChange={(e) =>
                                        setPan(e.target.files[0])
                                      }
                                    />
                                    {sub && !pan && (
                                      <span id="error1">Enter Pan Number</span>
                                    )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      PAN Number
                                    </label>
                                    <input
                                      type="text"
                                      name="agency_pan_number"
                                      placeholder=" Enter PAN Number"
                                      className="input_size"
                                      value={agencyDetails.pan_number}
                                      onChange={(e) =>
                                        setAgencyDetails({
                                          ...agencyDetails,
                                          pan_number: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePAN(
                                        agencyDetails.pan_number
                                      ) && (
                                        <span id="error1">
                                          Enter a valid pan number
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder=" Enter Your Email"
                                      className="input_size"
                                      required
                                      value={personalDetail.email}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateEmail(personalDetail.email) && (
                                        <span id="error1">
                                          Enter Your Email{" "}
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Password*
                                    </label>
                                    <div style={{ position: "relative" }}>
                                      <input
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        placeholder="Enter Your Password"
                                        className="input_size"
                                        required
                                        value={personalDetail.password}
                                        onChange={(e) =>
                                          setPersonalDetails({
                                            ...personalDetail,
                                            password: e.target.value,
                                          })
                                        }
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
                                        {showPassword ? (
                                          <FaEyeSlash />
                                        ) : (
                                          <FaEye />
                                        )}
                                      </div>
                                    </div>
                                    {sub &&
                                      !validatePassword(
                                        personalDetail.password
                                      ) && (
                                        <span id="error1">
                                          Level up! 8+ char, mix cases, 1+
                                          number.{" "}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                  style={{ color: "#1E1E1E" }}
                                >
                                  Referal Code
                                </Typography>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Referal Code
                                    </label>
                                    <input
                                      type="text"
                                      name="Referal "
                                      placeholder=" Enter Your Referal Code"
                                      className="input_size w-50"
                                      value={ReferalCode}
                                      onChange={(e) => handlereferalcode(e)}
                                    />
                                  </div>
                                </div>

                                {referalcodeerror && (
                                  <div className="error-message">
                                    {referalcodeerror}
                                  </div>
                                )}
                              </div>
                            </Grid>
                          </div>
                          <div className="Regestration_btn_div">
                            <button
                              onClick={() => {
                                handleSubmit();
                              }}
                              className="regestration_Submit_Button"
                              style={{ border: "none" }}
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      </div>
                    </Box>
                    {/* <Box flex={1} style={{ display: "contents" }} >
      <div className="registerContainer" style={{ background: "rgba(249, 255, 252, 0.4)" }}>
        <div>
          {currentStep === 1 && (
            <div>
             
              <Typography sx={{ fontSize: "22px", fontWeight: "bold" }} style={{ color: "#1E1E1E" }}>Personal Details</Typography>
             
              <div className="Regestration_inputFilds_Container">
                                <div
                                  
                                  className="Regestration_box_container"
                                >
                                  <div className="form_input_regestration">
                                    <label
                                      htmlFor="first_name"
                                      className="form_lable_regestration"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="first_name"
                                      name="first_name"
                                      placeholder=" Enter First Name"
                                      className="input_size"
                                      value={personalDetail.first_name}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          first_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateName(
                                        personalDetail.first_name
                                      ) && (
                                        <span id="error1">
                                          Enter a valid first name
                                        </span>
                                      )}
                                  </div>
                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      name="last_name"
                                      placeholder=" Enter Last Name"
                                      className="input_size"
                                      value={personalDetail.last_name}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          last_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateName(
                                        personalDetail.last_name
                                      ) && (
                                        <span id="error1">
                                          Enter valid last name
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      Mobile Number
                                    </label>
                                    <input
                                      type="text"
                                      name="mobile_number"
                                      placeholder="+91"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.mobile.mobile_number
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          mobile: {
                                            country_code: "+91",
                                            mobile_number: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePhoneNumber(
                                        personalDetail.mobile.mobile_number
                                      ) && (
                                        <span id="error1">
                                          Enter Mobile Number
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder=" Enter Your Email"
                                      className="input_size"
                                      required
                                      value={personalDetail.email}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateEmail(personalDetail.email) && (
                                        <span id="error1">
                                          Enter Your Email{" "}
                                        </span>
                                      )}
                                  </div>
                                 
                                </div>
                              </div>
                              
             
            </div>
          )}
          {currentStep === 2 && (
            <div>
            
              <Typography sx={{ fontSize: "22px", fontWeight: "bold" }} style={{ color: "#1E1E1E" }}>Contact Information</Typography>
             
              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Residential Address
                                    </label>
                                    <input
                                      type="text"
                                      name="residential_address"
                                      placeholder="Residential Address"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details
                                          .residential_address
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            residential_address: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details
                                        .residential_address === "" && (
                                        <span id="error1">
                                          Enter residential_address
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      {" "}
                                      Address 2
                                    </label>
                                    <input
                                      type="text"
                                      name="address_2"
                                      placeholder=" Enter Address 2"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details.address_2
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            address_2: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                  
                                  </div>
                                </div>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      name="city"
                                      placeholder=" Enter Your City"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.city
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            city: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.city ===
                                        "" && (
                                        <span id="error1">Enter Your City</span>
                                      )}
                                  </div>

                                  <div
                                    className="form_input_regestration"
                                    mx={2}
                                  >
                                    <label className="form_lable_regestration">
                                      State/Province*
                                    </label>
                                    <input
                                      type="text"
                                      name="state"
                                      placeholder=" State"
                                      className="input_size"
                                      value={
                                        personalDetail.address_details.state
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            state: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.state ===
                                        "" && (
                                        <span id="error1">Enter State</span>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Pin Code
                                    </label>
                                    <input
                                      type="number"
                                      name="pincode"
                                      placeholder=" Enter Pin Code"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.pincode
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            pincode: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePincode(
                                        personalDetail.address_details.pincode
                                      ) && (
                                        <span id="error1">Enter Pin Code</span>
                                      )}
                                  </div>

                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      name="country"
                                      placeholder=" Enter Your Country"
                                      className="input_size"
                                      required
                                      value={
                                        personalDetail.address_details.country
                                      }
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          address_details: {
                                            ...personalDetail.address_details,
                                            country: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {sub &&
                                      personalDetail.address_details.country ===
                                        "" && (
                                        <span id="error1">Enter country</span>
                                      )}
                                  </div>
                                </div>
                              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
             <Typography sx={{ fontSize: "22px", fontWeight: "bold" }} style={{ color: "#1E1E1E" }}>Agency Info</Typography>
             
              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      PAN
                                    </label>
                                    <input
                                      style={{ padding: "4px" }}
                                      name="pan_card_document"
                                      id="pan_card_document"
                                      type="file"
                                      className="input_size"
                                      onChange={(e) =>
                                        setPan(e.target.files[0])
                                      }
                                    />
                                    {sub && !pan && (
                                      <span id="error1">Enter Pan Number</span>
                                    )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      PAN Number
                                    </label>
                                    <input
                                      type="text"
                                      name="agency_pan_number"
                                      placeholder=" Enter PAN Number"
                                      className="input_size"
                                      value={agencyDetails.pan_number}
                                      onChange={(e) =>
                                        setAgencyDetails({
                                          ...agencyDetails,
                                          pan_number: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePAN(
                                        agencyDetails.pan_number
                                      ) && (
                                        <span id="error1">
                                          Enter a valid pan number
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder=" Enter Your Email"
                                      className="input_size"
                                      required
                                      value={personalDetail.email}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validateEmail(personalDetail.email) && (
                                        <span id="error1">
                                          Enter Your Email{" "}
                                        </span>
                                      )}
                                  </div>
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Agency Name
                                    </label>
                                    <input
                                      type="text"
                                      name="agency_name"
                                      placeholder=" Enter Agency Name"
                                      className="input_size"
                                      value={agencyDetails.agency_name}
                                      onChange={(e) =>
                                        setAgencyDetails({
                                          ...agencyDetails,
                                          agency_name: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      agencyDetails.agency_name === "" && (
                                        <span id="error1">
                                          Enter Agency Name
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Password*
                                    </label>
                                    <input
                                      type="password"
                                      name="password"
                                      placeholder="Enter Your Password"
                                      className="input_size"
                                      required
                                      value={personalDetail.password}
                                      onChange={(e) =>
                                        setPersonalDetails({
                                          ...personalDetail,
                                          password: e.target.value,
                                        })
                                      }
                                    />
                                    {sub &&
                                      !validatePassword(
                                        personalDetail.password
                                      ) && (
                                        <span id="error1">
                                          Level up! 8+ char, mix cases, 1+
                                          number.{" "}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              

            </div>
          )}

          {currentStep === 4 && (
            <div>
           
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold" }} style={{ color: "#1E1E1E" }}>Referral Code</Typography>
                   
                    <div className="Regestration_inputFilds_Container">
                                <div className=" Regestration_box_container">
                                  <div className="form_input_regestration">
                                    <label className="form_lable_regestration">
                                      Referal Code
                                    </label>
                                    <input
                                      type="text"
                                      name="Referal "
                                      placeholder=" Enter Your Referal Code"
                                      className="input_size w-50"
                                      value={ReferalCode}
                                      onChange={(e) => handlereferalcode(e)}
                                    />
                                    
                                  </div>
                                </div>
                               
                                {referalcodeerror && (
        <div className="error-message">
            {referalcodeerror}
        </div>
    )}
                              </div>
            </div>
          )}
                  
                   
                   {currentStep !== 5 && (
            <div className="Regestration_btn_div-new">
              {currentStep === 4 ? (
                <button onClick={handleSubmit} className="regestration_Submit_Button-new">Create</button>
              ) : (
                <button onClick={handleNext} className="regestration_Submit_Button-new">Next</button>
              )}
              {currentStep > 1 && <button onClick={handlePrevious} className="regestration_Submit_Button-new">Previous</button>}
            </div>
          )}
        </div>
      </div>
    </Box>  */}
                  </div>
                  {/* </Paper> */}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
