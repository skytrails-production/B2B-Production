import * as React from "react";
import moment from "moment";
import { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs, { Dayjs } from "dayjs";
//import Rating from "../hotelresult/Rating";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import Link from "@mui/material/Link";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import "./review.css";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../../../../Redux/Passengers/passenger";
import { useLocation } from "react-router-dom";
//import Custombutton from "../../../Custombuttom/Button";
import HotelLoading from "../../hotelLoading/HotelLoading";
import Swal from "sweetalert2";
import {
  validatePhoneNumber,
  validateEmail,
  validateName,
  validatePAN,
} from "../../../../../utils/validation";
import { swalModal } from "../../../../../../src/utils/swal";
const styleLoader = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "transparent",
  display: "flex",
  justifyContent: "center",
};

const Flightdetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const location = useLocation();
  const blockroomPayload = location.state;

  const noOfRooms =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.RoomGuests;
  console.log(noOfRooms, "hotelssroommmssss");

  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const HotelIndex = sessionStorage.getItem("HotelIndex");

  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");

  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const [passengerData, setPassengerData] = useState([]);
  const [sub, setSub] = useState(false);
   console.log(passengerData,"PassengerData");
  
  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error
        ?.ErrorCode !== 0
    ) {
      // swalModal(
      //   "flight",
      //   "Something went wrong with your flight booking. Please check your details and try again.",
      //   false
      // );
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops! Something went wrong",
      //   text: reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error?.ErrorMessage,
      //   timer: 3000,
      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `,
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `,
      //   },
      // });
      // navigate("/");
      // navigate("/hotels/hotelsearchs/HotelBooknowTbo")
    }
  }, []);

  useEffect(() => {
    if (bookingStatus == 1) {
      setBookingSuccess(false);
      navigate("/Guestdetail");
    }
  }, [bookingStatus]);
  useEffect(() => {
    if (
      HotelIndex === undefined ||
      HotelIndex === null ||
      ResultIndex === undefined ||
      ResultIndex === null ||
      HotelCode === undefined ||
      HotelCode === null
    ) {
      navigate("/hotel/hotelsearch");
    }
  }, []);

  const [PAN, setPAN] = useState("");

  console.log(PAN,"PANNNNSSSSSSSSSSSS")

  useEffect(() => {
    const allPassengerData = handleSettingPassengerArr(noOfRooms);

    setPassengerData(allPassengerData);
  }, []);

  const handleSettingPassengerArr = (roomCombination) => {
    const passengerData = [];

    const childTempelate = {
      Title: "mr",
      FirstName: "",
      MiddleName: null,
      LastName: "",
      Phoneno: null,
      Email: null,
      PaxType: "",
      LeadPassenger: Boolean(),
      Age: "",
      PassportNo: null,
      PassportIssueDate: "0001-01-01T00: 00: 00",
      PassportExpDate: "0001-01-01T00: 00: 00",
      PAN: "",
      roomIndex: "",
    };

    roomCombination?.map((item, indexRoom) => {
      const adultCount = item?.NoOfAdults;
      const childCount = item?.NoOfChild;
      if (adultCount > 0) {
        Array.from({ length: adultCount }, (value, index) => {
          if (index == 0) {
            passengerData.push({
              // ...adultTempelate,
              roomIndex: indexRoom,
              PaxType: 1,
              adultIndex: index,
              LeadPassenger: true,
            });
          } else {
            passengerData.push({
              // ...adultTempelate,
              roomIndex: indexRoom,
              PaxType: 1,
              adultIndex: index,
              LeadPassenger: false,
            });
          }
        });
      }
      if (childCount > 0) {
        Array.from({ length: childCount }, (value, index) => {
          passengerData.push({
            ...childTempelate,
            roomIndex: indexRoom,
            Age: item?.ChildAge[index],
            PaxType: 2,
            childIndex: index,
            LeadPassenger: false,
          });
        });
      }
    });
    return passengerData;
  };

  const emailRef = useRef();
  const phoneRef = useRef();
  const [emailVal, setEmail] = useState(false);
  const [contactVal, setContact] = useState(false);

  const [accordionExpanded, setAccordionExpanded] = React.useState(false);
  const handleAccordionChange = (index) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? index : false);
  };

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const hotelRoomName =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.HotelRoomsDetails[0]?.RoomTypeName;

  const hotelCancellationPolicies = reducerState?.hotelSearchResult?.blockRoom
    ?.BlockRoomResult?.HotelRoomsDetails
    ? reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
        ?.HotelRoomsDetails[0]
    : undefined;

  const cancellationStartingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate;
  const cancellationFormattedStartingDate = moment(
    cancellationStartingDate
  ).format("MMMM DD, YYYY");
  const cancellationEndingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate;
  const cancellationFormattedEndingDate = moment(cancellationEndingDate).format(
    "MMMM DD, YYYY"
  );

  const cancellationCharge =
    hotelCancellationPolicies?.CancellationPolicies[0]?.Charge;

  const hotelData = hotelRoom?.HotelRoomsDetails[HotelIndex];

  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const isLoad = reducerState?.hotelSearchResult?.blockRoom;

  useEffect(() => {
    if (isLoad?.length == 0) {
      setLoader(true);
    }
  }, [isLoad]);

  useEffect(() => {
    if (isLoad?.length >= 0) {
      setLoader(false);
    }
  }, [isLoad]);

  const dateString = hotelData?.LastCancellationDate;
  const date1 = new Date(dateString);
  const time1 = date1.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = date1.getDate();
  const month = date1.toLocaleString("default", {
    month: "short",
  });
  const year = date1.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const handleServiceChange = (e, roomIndex, knowIndex) => {
    console.log(e,roomIndex, knowIndex,"44444444444");
    if (
      roomIndex !== undefined &&
      roomIndex !== null &&
      knowIndex?.adultIndex !== undefined &&
      knowIndex?.adultIndex !== null
    ) {
      const { name, value } = e.target;
      if(name==="PAN" && roomIndex===0 && knowIndex?.adultIndex==0){
        setPAN(e.target.value);
      }
      const filteredPassenger = passengerData.filter((item, index) => {
        return (
          item.roomIndex == roomIndex &&
          item?.adultIndex == knowIndex?.adultIndex
        );
      });

      const newFilteredPassenger = { ...filteredPassenger[0] };
      newFilteredPassenger[name] = value;
      const indexFind = passengerData.indexOf(filteredPassenger[0]);
      if (indexFind !== -1) {
        passengerData[indexFind] = newFilteredPassenger;
      }
    } else if (
      roomIndex !== undefined &&
      roomIndex !== null &&
      knowIndex?.childIndex !== undefined &&
      knowIndex?.childIndex !== null
    ) {
      const { name, value } = e.target;
      const filteredPassenger = passengerData.filter((item, index) => {
        return (
          item.roomIndex == roomIndex &&
          item?.childIndex == knowIndex?.childIndex
        );
      });

      const newFilteredPassenger = { ...filteredPassenger[0] };
      newFilteredPassenger[name] = value;
      const indexFind = passengerData.indexOf(filteredPassenger[0]);
      if (indexFind !== -1) {
        passengerData[indexFind] = newFilteredPassenger;
      }
    }

    const eml = document.getElementById("Email1").value;
    const con = document.getElementById("phoneNumber1").value;
    const val = validateEmail(eml);
    const valCon = validatePhoneNumber(con);
    setEmail(() => val);
    setContact(() => valCon);
  };

  const handleClickSavePassenger = () => {
    setSub(true);
    if (!validation()) {
      setTimeout(() => {
        setSub(false);
      }, 2000);
      return;
    }

    dispatch(PassengersAction(passengerData));

    navigate("/GuestdetailTbo");
  };

  const result = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  // // Calculate total number of guests
  // const totalAdult = data.NoOfAdults || 0;
  // const totalChild = data.NoOfChild || 0;

  const [expandedOther, setExpandedOther] = React.useState(false);

  const handleOtherChange = (panel) => (event, notexpanted) => {
    setExpandedOther(notexpanted ? panel : false);
  };
  // function validatePAN(panNumber) {
  //   const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //   return regex.test(panNumber);
  // }
  // function validatePhoneNumber(phoneNumber) {
  //   // Define the regular expression pattern for a valid phone number
  //   var phonePattern = /^\d{10}$/;

  //   // Test the phone number against the pattern
  //   return phonePattern.test(phoneNumber);
  // }
  // function validateEmail(email) {
  //   // Define the regular expression pattern for a valid phone number
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   // Test the phone number against the pattern
  //   return emailRegex.test(email);
  // }

  function validation() {
    const email = document.getElementById("Email1").value;
    const contact = document.getElementById("phoneNumber1").value;
    const em = validateEmail(email);
    const con = validatePhoneNumber(contact);
    const other = passengerData.filter(
      (item) =>
        toString(item.Age) === "" ||
        !validateName(item.FirstName) ||
        !validateName(item.LastName) ||
        
       item.PaxType==0? validatePAN(item.PAN): false 
    );

    const result = em && con && other.length === 0;

    return result;
  }

  const handlePassengerDataChange = (
    event,
    roomIndex,
    passengerIndex,
    field,
    isChild = false
  ) => {
    const newData = [...passengerData];
    if (!newData[roomIndex][isChild ? "children" : "adults"]) {
      newData[roomIndex][isChild ? "children" : "adults"] = [];
    }
    if (!newData[roomIndex][isChild ? "children" : "adults"][passengerIndex]) {
      newData[roomIndex][isChild ? "children" : "adults"][passengerIndex] = {
        Title: "Mr.",
        FirstName: "",
        LastName: "",
        PAN: "",
      };
    }

    // newData[roomIndex][isChild ? "children" : "adults"][passengerIndex][field] =
    //   event.target.value;
    // setPassengerData(newData);
  };

  return (
    <>
      {loader ? (
        <HotelLoading />
      ) : (
        <div className="container-fluid rmv-margin">
          {/* <div className="row">
          <div className="col-lg-12"> */}
          <div className="row">
            {/* hotel details area  */}

            <div className="col-lg-12">
              <div className="hotelDetails-new">
                <div style={{ display: "flex" }}>
                  <div className="leftnewdiv">
                    <div className="hotelgrn text-start">
                      <p className="hotelName-new  ">
                        {" "}
                        {hotelInfo?.HotelDetails?.HotelName}{" "}
                      </p>{" "}
                      {/* //<p className="choosename">Choose Another Hotel</p> */}
                    </div>
                    <div className="leftnewdiv">
                      <p className="text-start">
                        {" "}
                        <b>Address:</b> {hotelInfo?.HotelDetails?.Address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "100px" }}>Check In:</p>
                      </b>{" "}
                      <p>
                        {/* {
                        reducerState?.hotelSearchResultGRN?.ticketData?.data
                          ?.data?.CheckInDate
                      } */}
                        {dayjs(
                          reducerState?.hotelSearchResultGRN?.ticketData?.data
                            ?.data?.CheckInDate
                        ).format("DD MMM, YY")}
                      </p>
                    </p>

                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "100px" }}>Check Out:</p>
                      </b>{" "}
                      <p>
                        {dayjs(
                          reducerState?.hotelSearchResultGRN?.ticketData?.data
                            ?.data?.CheckOutDate
                        ).format("DD MMM,YY")}
                      </p>
                    </p>

                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "162px" }}>Night(s) :</p>
                      </b>{" "}
                      <p className="text-start"> {storedFormData?.night}</p>
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
              {/* </div>
            </div> */}
            </div>

            {/* room details area  */}

            <div className="col-lg-12 " style={{ marginTop: "12px" }}>
              <div className="col-lg-12">
                <div
                  className="headText-new"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Room Details</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="8" fill="#E73C34" />
                    <path
                      d="M2.66602 8H12.9993"
                      stroke="white"
                      stroke-width="2.66667"
                    />
                  </svg>
                </div>
              </div>
              <div className="roomDetails">
                <div className="row">
                  <div className="col-lg-9 mb-md-3">
                    {/* <p className="title ">{hotelData?.RoomTypeName}</p>
                    <p>{hotelData?.RoomPromotion}</p>
                    <p>{hotelData?.RatePlanName}</p> */}
                    <p className="text-hotelName"> {hotelRoomName}</p>
                  </div>
                  <div className="col-lg-3 adultss ">
                    <p>{totalAdults} Adult(s)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* guest details section  */}

          <div className="row">
            <div className="col-lg-12">
              <div
                className="headText-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Guest Room Details</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#E73C34" />
                  <path
                    d="M2.66602 8H12.9993"
                    stroke="white"
                    stroke-width="2.66667"
                  />
                </svg>
              </div>
            </div>

            <div className="headForm bookGuest" style={{ marginTop: "1rem" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    {noOfRooms?.length > 0 &&
                      Array.from(
                        { length: noOfRooms?.length },
                        (_, roomIndex) => (
                          <Box
                            sx={{ marginBottom: "15px", marginLeft: "-15px" }}
                          >
                            <div mb={2} key={roomIndex} className="services">
                              <div
                                //  expanded={true}

                                expanded={accordionExpanded === roomIndex}
                                onChange={handleAccordionChange(roomIndex)}
                                sx={{
                                  marginBottom: "15px",
                                  backgroundColor: "rgba(187, 187, 187, 0.30)",
                                }}
                              >
                                <div>
                                  {noOfRooms[roomIndex]?.NoOfAdults > 0 &&
                                    Array.from(
                                      {
                                        length:
                                          noOfRooms[roomIndex]?.NoOfAdults,
                                      },
                                      (_, adultIndex) => (
                                        <div className="guestDetailsForm">
                                          <div className="guest1">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="15"
                                              height="16"
                                              viewBox="0 0 15 16"
                                              fill="none"
                                            >
                                              <path
                                                d="M7.5 8C8.14897 8 8.78337 7.80756 9.32297 7.44701C9.86256 7.08646 10.2831 6.574 10.5315 5.97443C10.7798 5.37486 10.8448 4.71511 10.7182 4.07861C10.5916 3.44211 10.2791 2.85745 9.82019 2.39856C9.3613 1.93967 8.77664 1.62716 8.14014 1.50055C7.50364 1.37394 6.84389 1.43892 6.24432 1.68727C5.64475 1.93562 5.13229 2.35619 4.77174 2.89579C4.41119 3.43539 4.21875 4.06978 4.21875 4.71875C4.21875 5.58899 4.56445 6.42359 5.17981 7.03895C5.79516 7.6543 6.62976 8 7.5 8ZM7.5 8.9375C5.46621 8.9375 1.40625 10.1938 1.40625 12.6875V14.5625H13.5938V12.6875C13.5938 10.1938 9.53379 8.9375 7.5 8.9375Z"
                                                fill="#071C2C"
                                              />
                                            </svg>
                                            <p>Room {roomIndex + 1}</p>
                                          </div>
                                          <p>
                                            Adult {adultIndex + 1}
                                            {adultIndex == 0
                                              ? "(Lead Guest)"
                                              : ""}
                                          </p>
                                          <Grid container spacing={2}>
                                            {" "}
                                            {/* This creates a row with proper spacing */}
                                            <Grid item xs={12} sm={6} md={3}>
                                              {" "}
                                              {/* Title box with 3 columns width */}
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    className="form_label"
                                                    style={{ color: "#000000" }}
                                                  >
                                                    Title
                                                  </label>
                                                  <select
                                                    className="form-select"
                                                    name="Title"
                                                    onChange={(e) =>
                                                      handlePassengerDataChange(
                                                        e,
                                                        roomIndex,
                                                        adultIndex,
                                                        "Title"
                                                      )
                                                    }
                                                  >
                                                    <option value="Mr.">
                                                      Mr
                                                    </option>
                                                    <option value="Ms.">
                                                      Miss
                                                    </option>
                                                    <option value="Mrs.">
                                                      Mrs
                                                    </option>
                                                    <option value="Mstr.">
                                                      Mstr
                                                    </option>
                                                  </select>
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                              {" "}
                                              {/* First Name input with 3 columns width */}
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    className="form_label"
                                                    style={{ color: "#000000" }}
                                                  >
                                                    First name*
                                                  </label>
                                                  <input
                                                    name="FirstName"
                                                    placeholder="Enter your name"
                                                    onChange={(e) =>
                                                      setTimeout(() => {
                                                        handleServiceChange(
                                                          e,
                                                          roomIndex,
                                                          {
                                                            adultIndex:
                                                              adultIndex,
                                                          }
                                                        );
                                                      }, 500)
                                                    }
                                                  />
                                                  {sub &&
                                                    passengerData[roomIndex]
                                                      ?.FirstName === "" && (
                                                      <span className="error">
                                                        {
                                                          passengerData[
                                                            roomIndex
                                                          ].FirstName
                                                        }
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                              {" "}
                                              {/* Last Name input with 3 columns width */}
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    className="form_label"
                                                    style={{ color: "#000000" }}
                                                  >
                                                    Last name*
                                                  </label>
                                                  <input
                                                    name="LastName"
                                                    placeholder="Enter your last name"
                                                    onChange={(e) =>
                                                      setTimeout(() => {
                                                        handleServiceChange(
                                                          e,
                                                          roomIndex,
                                                          {
                                                            adultIndex:
                                                              adultIndex,
                                                          }
                                                        );
                                                      }, 300)
                                                    }
                                                  />
                                                  {sub &&
                                                    passengerData.filter(
                                                      (item) =>
                                                        item.roomIndex ===
                                                          roomIndex &&
                                                        item.adultIndex ===
                                                          adultIndex
                                                    )[0]?.LastName === "" && (
                                                      <span className="error">
                                                        Enter Last Name
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                              {" "}
                                              {/* Pan Number input with 3 columns width */}
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    className="form_label"
                                                    style={{ color: "#000000" }}
                                                  >
                                                    Pan Number*
                                                  </label>
                                                  <input
                                                    name="PAN"
                                                    type="text"
                                                    placeholder="Write in Capital"
                                                    onChange={(e) =>
                                                      setTimeout(() => {
                                                        handleServiceChange(
                                                          e,
                                                          roomIndex,
                                                          {
                                                            adultIndex:
                                                              adultIndex,
                                                          }
                                                        );
                                                      }, 300)
                                                    }
                                                  />
                                                  {sub &&
                                                    !validatePAN(
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                            roomIndex &&
                                                          item.adultIndex ===
                                                            adultIndex
                                                      )[0]?.PAN
                                                    ) && (
                                                      <span className="error">
                                                        Enter PAN
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      )
                                    )}
                                  {noOfRooms[roomIndex]?.NoOfChild > 0 &&
                                    Array.from(
                                      {
                                        length: noOfRooms[roomIndex]?.NoOfChild,
                                      },
                                      (_, childIndex) => (
                                        <div className="guestDetailsForm">
                                         <p>Child {childIndex + 1}</p> 
                                          <Grid container spacing={2} style={{marginTop:"1px"}}>
                                            <Grid item xs={12} sm={6} md={3}>
                                              {" "}
                                              {/* Title box with 3 columns width */}
                                            
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    className="form_label"
                                                    style={{ color: "#000000" }}
                                                  >
                                                      Title*
                                                  </label>
                                                  <select
                                                    className="form-select"
                                                    name="Title"
                                                    onChange={(e) =>
                                                      handlePassengerDataChange(
                                                        e,
                                                        roomIndex,
                                                        childIndex,
                                                        "Title"
                                                      )
                                                    }
                                                  >
                                                    <option value="Mr.">
                                                      Mr
                                                    </option>
                                                    <option value="Ms.">
                                                      Miss
                                                    </option>
                                                    <option value="Mrs.">
                                                      Mrs
                                                    </option>
                                                    <option value="Mstr.">
                                                      Mstr
                                                    </option>
                                                  </select>
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    hotel_form_input
                                                    className="form_lable"
                                                  >
                                                    First name*
                                                  </label>
                                                  <input
                                                    name="FirstName"
                                                    placeholder="Enter your name"
                                                    // value={passengerData.FirstName}
                                                    onChange={(e) =>
                                                      setTimeout(() => {
                                                        handleServiceChange(
                                                          e,
                                                          roomIndex,
                                                          {
                                                            childIndex:
                                                              childIndex,
                                                          }
                                                        );
                                                        {
                                                        }
                                                      })
                                                    }
                                                  />
                                                  {sub &&
                                                    passengerData.filter(
                                                      (item) =>
                                                        item.roomIndex ===
                                                          roomIndex &&
                                                        item.childIndex ===
                                                          childIndex
                                                    )[0].FirstName === "" && (
                                                      <span className="error">
                                                        Enter First Name{" "}
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={6}
                                              md={3}
                                              py={1}
                                            >
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    hotel_form_input
                                                    className="form_lable"
                                                  >
                                                    Last name*
                                                  </label>
                                                  <input
                                                    name="LastName"
                                                    placeholder="Enter your last name"
                                                    // value={passengerData.LastName}
                                                    onChange={(e) =>
                                                      setTimeout(() => {
                                                        handleServiceChange(
                                                          e,
                                                          roomIndex,
                                                          {
                                                            childIndex:
                                                              childIndex,
                                                          }
                                                        );
                                                      })
                                                    }
                                                  />
                                                  {sub &&
                                                    passengerData.filter(
                                                      (item) =>
                                                        item.roomIndex ===
                                                          roomIndex &&
                                                        item.childIndex ===
                                                          childIndex
                                                    )[0].LastName === "" && (
                                                      <span className="error">
                                                        Enter Last Name{" "}
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={6}
                                              md={3}
                                              py={1}
                                            >
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    hotel_form_input
                                                    className="form_lable"
                                                  >
                                                    age*
                                                  </label>
                                                  <input
                                                    name="Age"
                                                    type="text"
                                                    placeholder="Enter Age"
                                                    value={
                                                      noOfRooms[roomIndex]
                                                        ?.ChildAge[childIndex]
                                                    }
                                                    // onChange={(e) =>
                                                    //   handleServiceChange(
                                                    //     e,
                                                    //     roomIndex,
                                                    //     { childIndex: childIndex }
                                                    //   )
                                                    // }
                                                  />
                                                  {sub &&
                                                    passengerData.filter(
                                                      (item) =>
                                                        item.roomIndex ===
                                                          roomIndex &&
                                                        item.childIndex ===
                                                          childIndex
                                                    )[0].Age === "" && (
                                                      <span className="error">
                                                        Enter Age{" "}
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={6}
                                              md={3}
                                              py={1}
                                            >
                                              <Box>
                                                <div className="form_input">
                                                  <label
                                                    hotel_form_input
                                                    className="form_lable"
                                                  >
                                                    Pan Number*
                                                  </label>
                                                  <input
                                                    name="PAN"
                                                    type="text"
                                                    placeholder="Enter PanNo"
                                                     value={passengerData[0]?.PAN}
                                                     readOnly

                                                    //  value={
                                                    //   noOfRooms[roomIndex]
                                                    //     ?.PAN[childIndex]
                                                    // }
                                                    // onChange={(e) =>
                                                    //   setTimeout(() => {
                                                    //     handleServiceChange(
                                                    //       e,
                                                    //       roomIndex,
                                                    //       {
                                                    //         childIndex:
                                                    //           childIndex,
                                                    //       }
                                                    //     );
                                                    //   })
                                                    // }
                                                  />
                                                  {sub &&
                                                    !validatePAN(
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                            0 
                                                      )[0].PAN
                                                    ) && (
                                                      <span className="error">
                                                        Enter PAN{" "}
                                                      </span>
                                                    )}
                                                </div>
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>
                          </Box>
                        )
                      )}
                  </div>
                  <div className="row padd g-3">
                    <div className="col-lg-4 col-md-6">
                      <div className="form_input">
                        <label className="form_lable">Enter Email*</label>
                        <input
                          name="Email"
                          id="Email1"
                          ref={emailRef}
                          placeholder="Enter your Email"
                          // value={passengerData.Email}
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />
                        {sub && !emailVal && (
                          <span id="error1">Enter a Valid Email</span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="form_input">
                        <label className="form_lable">Enter Phone</label>
                        <input
                          name="Phoneno"
                          id="phoneNumber1"
                          ref={phoneRef}
                          placeholder="Enter your Phone Number"
                          // value={passengerData.Phoneno}
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />

                        {sub && !contactVal && (
                          <span id="error1">Enter a Valid Number</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="services">
                {/* <Accordion
                  expanded={expandedOther === "panel1"}
                  onChange={handleOtherChange("panel1")}
                  sx={{
                    marginBottom: "15px",
                    backgroundColor: "rgba(187, 187, 187, 0.30)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <label>Add Note</label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>No data</div>
                  </AccordionDetails>
                </Accordion> */}
                <Accordion
                  expanded={expandedOther === "panel2"}
                  onChange={handleOtherChange("panel2")}
                  sx={{
                    marginBottom: "15px",
                    backgroundColor: "rgba(187, 187, 187, 0.30)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <label>Cancellation and Charges</label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="hotelNameAccord">
                      <p>{hotelRoomName}</p>
                    </div>
                    <div className="otherDetailsData">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="cancelAccord">
                            <span>Cancelled on or After</span>
                            <p>{cancellationFormattedStartingDate}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="cancelAccord">
                            <span>Cancelled on or Before</span>
                            <p>{cancellationFormattedEndingDate}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="cancelAccord">
                            <span>Cancellation Charges</span>
                            <p>{cancellationCharge}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="proceed-book-new-hotel"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <Custombutton
                  title={"Proceed to Booking Review"}
                  type={"submit"}
                  onClick={handleClickSavePassenger}
                /> */}
                <button
                  type="submit"
                  onClick={handleClickSavePassenger}
                  className="proceed-book-new-hotel"
                  style={{ border: "none" }}
                >
                  Proceed to Booking Review
                </button>
              </div>
            </div>

            <Modal open={bookingSuccess}>
              <Box sx={styleLoader}>
                <CircularProgress size={70} thickness={4} />
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Flightdetail;
