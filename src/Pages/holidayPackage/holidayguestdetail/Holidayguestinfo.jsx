import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  Modal,
  Box as MuiBox,
} from "@mui/material";
import {
  VStack,
  Input,
  Select,
  HStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HolidayRating from "../holidaypackageresult/HolidayRating";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { MdDeleteForever } from "react-icons/md";
import "./holidayguestdetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getPackageBookingAction } from "../../../Redux/getHolidayBooking/packageBookingAction";
import { packageBookingAction } from "../../../Redux/HolidayBookingRequest/actionBooking";
import { deleteFormEntry } from "../../../Redux/HolidayPackageTravellerDetails/HolidayPackageTravellerDetailsAction";
import { addFormEntry } from "../../../Redux/HolidayPackageTravellerDetails/HolidayPackageTravellerDetailsAction";
import { FaPlus } from "react-icons/fa";
import Custombutton from "../../../Custombuttom/Button";
import successGif from "../../../Images/successGif.png";
import color from "../../../color/color";
import Swal from "sweetalert2";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
const Holidayguestinfo = ({ setadultCount, setchildCount }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #89CFF0",
    boxShadow: 24,
    borderRadius: 8,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "male",
  });
  const [requestData, setrequestData] = useState({
    email: "",
    countryCode: "+91",
    mobile: "",
    departureCity: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const requestSuccess =
    reducerState?.packageBookingRequest?.showSuccessMessage;
  const [showSuccess, setShowsuccess] = useState(requestSuccess);
  const [add, setAdd] = useState(false);
  const [sub, setSub] = useState(false);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  const reducerForm = reducerState?.form?.formEntries;
 
  // console.log("package Req", reducerState);
  // console.log("onePackageee", onePackage);
  // console.log("reducerForm", reducerForm);

  const packageId =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data?._id;
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;



  const savedDataString = sessionStorage.getItem("searchPackageData");
  const savedData = JSON.parse(savedDataString);
  const savedDestination = savedData.destination.toUpperCase();
  const savedDays = savedData.days;
  // console.log(reducerForm,"reducer form.................")

  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setrequestData({
      ...requestData,
      [name]: value,
    });
    // console.log("======================", requestData);
  };
  const handleSuccessandNavigate = () => {
    setShowsuccess((prev) => !prev);
    setTimeout(() => {
      setShowsuccess((prev) => prev);
      navigate("/Holidayreviewbooking");
    }, 2000);
  };

  const handlePersonRemove = (index) => {
    // Dispatch an action to delete the form entry from Redux
    dispatch(deleteFormEntry(index));
  };

  const handlePersonAdd = () => {
    if (validationAdd()) {
      setAdd(true)
      return
    }
    else{
      dispatch(addFormEntry(formData));
      setFormData({
        name: "",
        dob: "",
        gender: "male",
      });
      setAdd(false)
    }
   
  };
  function validateEmail(email) {
    // Define the regular expression pattern for a valid phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the phone number against the pattern
    return emailRegex.test(email);
  }
  function validatePhoneNumber(phoneNumber) {
    // Define the regular expression pattern for a valid phone number
    var phonePattern = /^\d{10}$/;

    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
  }
  function validationAdd() {
    if (formData.name === "" || formData.dob === "" || formData.gender === "") {
      return true
    }
  }
  function validationSub() {
    if (!validateEmail(requestData.email) || !validatePhoneNumber(requestData.mobile) || requestData.departureCity === "") {
      return true
    }
  }
  const handleBookingPackage = (event) => {
    event.preventDefault();
    setSub(true)
    if (reducerForm.slice(1).length === 0 || validationSub()) {
      return
    }

    if (
      userBalance >=
      (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05 +
      (reducerForm.length - 1) * onePackage?.pakage_amount.amount
    ) {

      const formData = new FormData();
      const payload = {
        pakageid: packageId,
        userId: userId,
        travellers: reducerForm.slice(1),
        email: requestData.email,
        fullName: "jhhkjds",
        contactNumber: {
          contryCode: requestData.countryCode,
          phone: requestData.mobile,
        },

        sale_summary: {
          price:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05 +
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount,
          fare_breakup:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05 +
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount,
          total_basic_cost:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount,
          coupon_discount: "-7382",
          fee_taxes:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05,
          gst:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05,
          total_gst:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05,
        },
        departureCity: requestData.departureCity,
        adults: "2",
        child: "0",
      };

      // console.log("payload", payload);
      const holidayData = new FormData();
      holidayData.append("data", JSON.stringify(payload));
      dispatch(packageBookingAction(payload));
      if (userId) {
        const balancePayload  = {
          _id: userId,
          amount:
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05 +
            (reducerForm.length - 1) * onePackage?.pakage_amount.amount,
        };

        // dispatch(balanceSubtractRequest(balancePayload));
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Balance is insufficient for this transaction.",
        footer: "Please recharge",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");

        }
      }).catch((data) => {
        // console.log("dataddddddddddd", data);
      })
    }
    // handleSuccessandNavigate();
  };
  // if()
  // console.warn("result", reducerState, "reducer state")
  useEffect(()=>{
    // console.warn("new resucerstate'''''''''''''''''''''''''''''''''''",reducerState)  
    if(reducerState?.packageBookingRequest?.isError==false && reducerState?.packageBookingRequest?.isLoading===false
      && reducerState?.packageBookingRequest?.showSuccessMessage) {
        if (userId) {
          const balancePayload  = {
            _id: userId,
            amount:
              (reducerForm.length - 1) * onePackage?.pakage_amount.amount * 0.05 +
              (reducerForm.length - 1) * onePackage?.pakage_amount.amount,
          };
  
          dispatch(balanceSubtractRequest(balancePayload));
        }
     
        navigate("/")
      }
    },[reducerState?.packageBookingRequest])

  return (
    <>

      <div className="row">

        <div className="col-lg-12 mb-4">
          <div className="packageName-new">
            <p className="mb-3">{onePackage?.pakage_title}</p>
            <span>{`${onePackage?.days - 1}N`} / {`${onePackage?.days}D`}</span>
          </div>
        </div>
        <div className="col-lg-12 d-flex mb-4">
          <div className="packageLocation">
            <FmdGoodIcon />

          </div>
          <div>
            <p>{savedDestination}</p>
            <span>(India)</span>
          </div>
        </div>

        <div className="col-lg-12 my-3">
          <div className="headingGuestHoliday">
            <p>Traveller Details</p>
          </div>
          <div className="travellerDetailsForm">
            <div className="addGuest mb-2">
              <p></p>
            </div>
            {/* <div>
              <p>{reducerForm.length - 1} Travellers</p>
            </div> */}
            <div className="formBoxInner">
              <div className="row">
                <div className="col-lg-4">
                  <div class="form-floating md-mb-3">
                    <input type="text" class="form-control" name="name" value={formData.name} onChange={handlePersonChange} id="floatingInput" placeholder="Enter Your Name" />
                    <label for="floatingInput">Enter Your Name</label>
                  </div>
                  {add && formData.name === "" && <span id="error1">Enter name</span>}
                </div>
                <div className="col-lg-4">
                  <div class="form-floating md-mb-3">
                    <input type="date" class="form-control" name="dob" max={(new Date()).toISOString().split('T')[0]} value={formData.dob} onChange={handlePersonChange} id="floatingInput" placeholder="Enter Your DOB" />
                    <label for="floatingInput">Date of Birth</label>
                  </div>
                  {add && formData.dob === "" && <span id="error1">Enter DOB</span>}
                </div>
                <div className="col-lg-4">
                  <div class="form-floating md-mb-3">
                    <select class="form-select" name="gender" value={formData.gender} onChange={handlePersonChange} id="floatingSelect" aria-label="Floating label select example">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <label for="floatingSelect">Choose Your Gender</label>
                  </div>
                  {add && formData.gender === "" && <span id="error1">Enter DOB</span>}
                </div>
               
                <div className="col-lg-12 addedGuest">
                  {reducerForm.slice(1).map((singleService, index) => {
                    return (
                      <div className="row">
                        <div className="col-lg-4">
                          <p>{singleService.name}</p>
                        </div>
                        <div className="col-lg-3">
                          <p>{singleService.dob}</p>
                        </div>
                        <div className="col-lg-3">
                          <p>{singleService.gender}</p>
                        </div>
                        <div className="col-lg-2">
                          <p><MdDeleteForever
                            onClick={() => handlePersonRemove(index)}
                            cursor="pointer"
                          /></p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="addGuest mt-4 mb-2">
                  <p></p>
                </div>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-4">
                      <div class="form-floating md-mb-3">
                        <input type="email" class="form-control" name="email" value={requestData.email} onChange={handleRequestChange} id="floatingInput" placeholder="Enter Your Email" />
                        <label for="floatingInput">Enter Your Email</label>
                      </div>
                      {sub && !validateEmail(requestData.email) && <span id="error1">Enter Email</span>}

                    </div>
                    <div className="col-lg-2">
                      <div class="form-floating md-mb-3">
                        <select class="form-select" name="countryCode" value={requestData.countryCode} onChange={handleRequestChange} id="floatingSelect" aria-label="Floating label select example">
                          <option selected value="+91">+91</option>
                          {/* <option value="+511">+511</option> */}
                          {/* <option value="other">Other</option> */}
                        </select>
                        <label for="floatingSelect">Select Country Code</label>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div class="form-floating md-mb-3">
                        <input type="text" class="form-control" name="mobile" value={requestData.mobile} onChange={handleRequestChange} id="floatingInput" placeholder="Enter Your Email" />
                        <label for="floatingInput">Enter Phone Number</label>
                      </div>
                      {sub && !validatePhoneNumber(requestData.mobile) && <span id="error1">Phone Number</span>}
                    </div>
                   
                    <div className="col-lg-3">
                      <div class="form-floating md-mb-3">
                        <input type="text" class="form-control" name="departureCity" value={requestData.departureCity} onChange={handleRequestChange} id="floatingInput" placeholder="Enter Your Email" />
                        <label for="floatingInput">Departure City</label>
                      </div>
                      {sub && requestData.departureCity === "" && <span id="error1">Enter Departure City </span>}
                    </div>

                    <div className="col-lg-3 mt-4 ">
                  <button className="btnAddGuest-new" onClick={handlePersonAdd}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 3.5V12.5M12.5 8H3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Add Guest</button>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* package ininerary and inclusion  */}

        <div className="col-lg-12 my-3 " >
          <div className="headingGuestHoliday">
            <p>Trip Details</p>
          </div>

          {onePackage?.detailed_ltinerary?.map((item, index) => {
            return (
              <>
                <div className="travellerDetailsForm">
                  <div className="addGuest mb-2">
                    <p>Day{index + 1}</p>
                  </div>
                  <div className="itinerary">
                    {/* <p>{item}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: item }}></div>
                  </div>
                </div>
              </>
            );
          })}

        </div>

        {/* cancellation policy  */}


        <div className="col-lg-12 my-3">
          <div className="headingGuestHoliday">
            <p>Cancellation Policy</p>
          </div>

          <div className="travellerDetailsForm">

            <div className="itinerary">
              {/* <p>{onePackage?.cancellation_Policy}</p> */}
              <p dangerouslySetInnerHTML={{ __html: onePackage?.cancellation_Policy }}></p>
            </div>
          </div>

        </div>

        {/* term and condition  */}

        <div className="col-lg-12 my-3">
          <div className="headingGuestHoliday">
            <p>Term & Condition</p>
          </div>

          <div className="travellerDetailsForm">

            <div className="itinerary">
              {/* <p>{onePackage?.term_Conditions}</p> */}
              <p dangerouslySetInnerHTML={{ __html: onePackage?.term_Conditions }}></p>
            </div>
          </div>

        </div>

        <div className="col-lg-12 my-3">
          <div className="proceedToBookHoliPack">

            <button type="submit" onClick={handleBookingPackage}>Proceed To Book  </button>
          </div>
        </div>

      </div>



      <Box>
        {/* <form action="/Holidayreviewbooking">



          <Box className="main-head" my={2} mt={8}>
            <Typography className="holiday_txt" textDecoration="underline">
              
            </Typography>
            {onePackage?.detailed_ltinerary?.map((item, index) => {
              return (
                <>
                  <Box key={index}>
                    <Typography sx={{ color: "orange", fontWeight: "bold" }}>
                      Day{index + 1}
                    </Typography>
                    <Typography>{item}</Typography>
                  </Box>
                </>
              );
            })}
          </Box>
          <Box className="main-head" mt={8}>
            <Typography className="holiday_txt" textDecoration="underline">
              Cancellation & Date Change
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
            >
              Package Cancellation Policy
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
            >
              Cancellation & Charges:
            </Typography>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#252525",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  Cancellation Time
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#006FFF",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  Till 03 Feb 23
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#006FFF",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  After 03 Feb 23
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#252525",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  Cancellation Charges
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#FF8900",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  ₹2,000 Cancellation Fee
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#FF8900",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  Non Refundable
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#666666",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Note: These are non-refundable amounts as per the current components
              attached. In the case of component change/modifications, the policy
              will change accordingly.
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
            >
              Package Cancellation Policy
            </Typography>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#252525",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  Date Change Possible
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#006FFF",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  Till 03 Feb 23
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#006FFF",
                    fontWeight: "300",
                    textAlign: "left",
                  }}
                >
                  After 03 Feb 23
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#252525",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  Date Change
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#FF8900",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  ₹0 Date Change Fee
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#FF8900",
                    fontWeight: "300",
                    textAlign: "right",
                  }}
                >
                  Date cannot be changed
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#666666",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Note: These are non-refundable amounts as per the current components
              attached. In the case of component change/modifications, the policy
              will change accordingly. Date Change fees don't include any fare
              change in the components on the new date. Fare difference as
              applicable will be charged separately. Date Change will depend on
              the availability of the components on the new requested date.
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            width={"100%"}
            marginTop={12}
          >
            <Custombutton
              title={""}
              type={"submit"}
              onClick={handleBookingPackage}
            />
          </Box>
        </form> */}
        {/* <Modal
          open={showSuccess}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <MuiBox sx={{ ...style, width: 350 }}>
            <img src={successGif} alt="sucess gif" style={{ width: "100%" }} />
            <Typography
              textAlign="center"
              paddingLeft={3}
              paddingTop={2}
              fontWeight="bold"
            >
              Thanku!!Your booking is done
            </Typography>
          </MuiBox>
        </Modal> */}
      </Box>

    </>
  );
};

export default Holidayguestinfo;
