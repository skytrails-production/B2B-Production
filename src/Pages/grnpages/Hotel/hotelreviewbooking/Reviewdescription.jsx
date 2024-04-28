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
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "../hotelresult/Rating";
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
import { PassengersAction } from "../../../../Redux/Passengers/passenger";
//import Custombutton from "../../../Custombuttom/Button";
import HotelLoading from "../hotelLoading/HotelLoading";
import Swal from "sweetalert2";
import {
  validatePhoneNumber,
  validateEmail,
  validateName,
  validatePAN,
} from "../../../../utils/validation";
import { swalModal } from "../../../../../src/utils/swal";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
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
  //grnn
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const authenticUser = reducerState?.logIn?.loginData?.status;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);

  // const noOfRooms =
  //   reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
  //     ?.RoomGuests;

  const HotelIndex = sessionStorage.getItem("HotelIndex");
  // console.log(noOfRooms, "noOfRooms");
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  // console.log(bookingStatus);

  const [sub, setSub] = useState(false);
  // console.warn("reducerstate::::::::::::::::", reducerState)

  // console.log("State Data", reducerState);

  const handleSettingPassengerArr = (roomCombination) => {
    const passengerData = [];
    const adultTempelate = {
      Title: "mr",
      FirstName: "",
      MiddleName: null,
      LastName: "",
      Phoneno: "",
      Email: "",
      PaxType: "",
      LeadPassenger: Boolean(),
      Age: "",
      PassportNo: null,
      PassportIssueDate: "0001-01-01T00: 00: 00",
      PassportExpDate: "0001-01-01T00: 00: 00",
      PAN: "",
      roomIndex: "",
    };

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
    // console.log(roomCombination);
    roomCombination?.map((item, indexRoom) => {
      const adultCount = item?.NoOfAdults;
      const childCount = item?.NoOfChild;
      if (adultCount > 0) {
        Array.from({ length: adultCount }, (value, index) => {
          if (index == 0) {
            passengerData.push({
              ...adultTempelate,
              roomIndex: indexRoom,
              PaxType: 1,
              adultIndex: index,
              LeadPassenger: true,
            });
          } else {
            passengerData.push({
              ...adultTempelate,
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

  const phoneRef = useRef();
  const [emailVal, setEmail] = useState(false);
  const [contactVal, setContact] = useState(false);

  const [accordionExpanded, setAccordionExpanded] = React.useState(false);
  const handleAccordionChange = (index) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? index : false);
  };

  //grn

  //grn

  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const hotelRoomName =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.HotelRoomsDetails[0]?.RoomTypeName;
  // console.log("hotel Room Name", hotelRoomName)
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
  // console.log("Hotel information", reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.HotelDetails?.HotelPolicy);
  const cancellationCharge =
    hotelCancellationPolicies?.CancellationPolicies[0]?.Charge;

  const hotelData = hotelRoom?.HotelRoomsDetails[HotelIndex];
  // console.log("hotel Data", hotelData);
  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;
  // console.log(hotelCancellationPolicies?.CancellationPolicies[0]);

  const isLoad = reducerState?.hotelSearchResult?.blockRoom;

  useEffect(() => {
    if (isLoad?.length == 0) {
      setLoader(true);
      // console.log("truehai bhai");
    }
  }, [isLoad]);

  useEffect(() => {
    if (isLoad?.length >= 0) {
      setLoader(false);
      // console.log("truehai bhai");
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

  // const handleClickBooking = async () => {

  //   // sessionStorage.setItem("HotelIndex", HotelIndex);

  //   const email = emailRef.current.value;
  //   const phoneno = phoneRef.current.value;
  //   const smoking = hotelRoom?.HotelRoomsDetails[HotelIndex]?.SmokingPreference;
  //   var SmokingPreference;
  //   if (smoking == "NoPreference") {
  //     SmokingPreference = 0;
  //   }
  //   if (smoking == "Smoking") {
  //     SmokingPreference = 1;
  //   }
  //   if (smoking == "NonSmoking") {
  //     SmokingPreference = 2;
  //   }
  //   if (smoking == "Either") {
  //     SmokingPreference = 3;
  //   }
  //   const payload = {
  //     ResultIndex: ResultIndex,
  //     HotelCode: HotelCode,
  //     HotelName: hotelInfo?.HotelDetails?.HotelName,
  //     GuestNationality: "IN",
  //     NoOfRooms:
  //       reducerState?.hotelSearchResult?.ticketData?.data?.data
  //         ?.HotelSearchResult?.NoOfRooms,
  //     ClientReferenceNo: 0,
  //     IsVoucherBooking: true,
  //     HotelRoomsDetails: [
  //       {
  //         RoomIndex: hotelRoom?.HotelRoomsDetails[HotelIndex]?.RoomIndex,
  //         RoomTypeCode: hotelRoom?.HotelRoomsDetails[HotelIndex]?.RoomTypeCode,
  //         RoomTypeName: hotelRoom?.HotelRoomsDetails[HotelIndex]?.RoomTypeName,
  //         RatePlanCode: hotelRoom?.HotelRoomsDetails[HotelIndex]?.RatePlanCode,
  //         BedTypeCode: null,
  //         SmokingPreference: SmokingPreference,
  //         Supplements: null,
  //         Price: {
  //           CurrencyCode:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.CurrencyCode,
  //           RoomPrice:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.RoomPrice,
  //           Tax: hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.Tax,
  //           ExtraGuestCharge:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.ExtraGuestCharge,
  //           ChildCharge:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.ChildCharge,
  //           OtherCharges:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.OtherCharges,
  //           Discount: hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.Discount,
  //           PublishedPrice:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.PublishedPrice,
  //           PublishedPriceRoundedOff:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price
  //               ?.PublishedPriceRoundedOff,
  //           OfferedPrice:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.OfferedPrice,
  //           OfferedPriceRoundedOff:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price
  //               ?.OfferedPriceRoundedOff,
  //           AgentCommission:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.AgentCommission,
  //           AgentMarkUp:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.AgentMarkUp,
  //           ServiceTax:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.ServiceTax,
  //           TCS: hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.TCS,
  //           TDS: hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.TDS,
  //           ServiceCharge:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.ServiceCharge,
  //           TotalGSTAmount:
  //             hotelRoom?.HotelRoomsDetails[HotelIndex]?.Price?.TotalGSTAmount,
  //           GST: {
  //             CGSTAmount:
  //               hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.CGSTAmount,
  //             CGSTRate: hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.CGSTRate,
  //             CessAmount:
  //               hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.CessAmount,
  //             CessRate: hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.CessRate,
  //             IGSTAmount:
  //               hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.IGSTAmount,
  //             IGSTRate: hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.IGSTRate,
  //             SGSTAmount:
  //               hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.SGSTAmount,
  //             SGSTRate: hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.SGSTRate,
  //             TaxableAmount:
  //               hotelRoom?.HotelRoomsDetails[HotelIndex]?.GST?.TaxableAmount,
  //           },
  //         },
  //         HotelPassenger: passengerData,
  //       },
  //     ],
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //     TraceId:
  //       reducerState?.hotelSearchResult?.ticketData?.data?.data
  //         ?.HotelSearchResult?.TraceId,
  //   };

  //   const hotelDetailsPayload = {
  //     BookingId: await bookingId,
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //   };
  //   console.log("hotelDetailsPayload", hotelDetailsPayload);
  //   // Dispatch the hotelBookRoomAction
  //   //  bookingStatus = true;
  //   setBookingSuccess(true);
  //   dispatch(hotelBookRoomAction([payload, hotelDetailsPayload]));
  // };
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;
  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  console.log(
    storedFormData,
    "-----------------------storeddataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  // const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

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

  // dispatch(PassengersAction(passengerData));

  // console.log("passengerData", passengerData);

  // console.warn("passengerDataNew", emailRef,"sss");

  //grn  start

  const variants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  // useEffect(() => {
  //     if (bookingStatus == 1) {
  //         setBookingSuccess(false);
  //         navigate("/Guestdetail");
  //     }
  // }, [bookingStatus]);

  const emailRef = useRef();

  // new values

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  // new values

  // console.log(galleryItems)

  // passenger details adding

  const [passengerData, setPassengerData] = useState([]);

  const initializePassengerData = async () => {
    const initialData = await hotelinfoGRN?.rate?.rooms?.map((room) => {
      const adults = Array.from({ length: room.no_of_adults }, () => ({
        Title: "Mr.",
        FirstName: "",
        LastName: "",
        type: "AD",
        PAN: "",
        Email: "",
        Phoneno: "",
      }));
      const children = Array.from(
        { length: room.no_of_children },
        (i, index) => ({
          Title: "Mr.",
          FirstName: "",
          LastName: "",
          type: "CH",
          age: room?.children_ages?.[index],
        })
      );
      return { adults, children };
    });
    setPassengerData(initialData);
  };

  useEffect(() => {
    initializePassengerData();
  }, [hotelinfoGRN]);
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

    newData[roomIndex][isChild ? "children" : "adults"][passengerIndex][field] =
      event.target.value;
    setPassengerData(newData);
  };

  // passenger details adding

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);

  // useEffect(() => {

  // }, [reducerState?.hotelSearchResultGRN?.hotelGallery?.])

  // console.log('reducer state', reducerState);
  // console.log('passengerdata', passengerData);

  const handleClickSavePassenger = async () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      // console.log("passenger data is hittting")

      dispatch(PassengersAction(passengerData));

      const payload = {
        rate_key: hotelinfoGRN?.rate?.rate_key,
        group_code: hotelinfoGRN?.rate?.group_code,
      };

      try {
        setLoader(true);
        const res = await axios({
          method: "POST",
          url: `${apiURL.baseURL}/skyTrails/grnconnect/bundledrates?searchId=${reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.search_id}`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      navigate("/GuestdetailGrm");
      setLoader(false);
    }
    // console.log('Passenger Data:', passengerData);
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
                      <p className="hotelName-new  ">{hotelinfoGRN?.name} </p>{" "}
                      <p className="choosename">Choose Another Hotel</p>
                    </div>
                    <div className="leftnewdiv">
                      <p className="text-start">
                        {" "}
                        <b>Address:</b> {hotelinfoGRN?.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "100px" }}>Check In:</p>
                      </b>{" "}
                      <p>
                        {dayjs(hotelMainReducer?.checkin).format("DD MMM, YY")}
                      </p>
                    </p>

                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "100px" }}>Check Out:</p>
                      </b>{" "}
                      <p>
                        {dayjs(hotelMainReducer?.checkout).format("DD MMM, YY")}
                      </p>
                    </p>

                    <p style={{ display: "flex" }}>
                      <b>
                        <p style={{ width: "162px" }}>Night(s) :</p>
                      </b>{" "}
                      <p className="text-start">{storedFormData?.night}</p>
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
                  <h2> Room Details</h2>
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
                    <p className="title ">
                      {hotelinfoGRN?.rate?.rooms?.[0]?.description}
                    </p>
                    <p>{hotelData?.RoomPromotion}</p>
                    <p>{hotelData?.RatePlanName}</p>
                    <p className="text-hotelName"> {hotelRoomName}</p>
                  </div>
                  <div className="col-lg-3 adultss ">
                    <p>
                      {hotelMainReducer?.no_of_adults} Adult(s){" "}
                      {/* {hotelMainReducer?.no_of_rooms} Room(s){" "} */}
                    </p>
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
                <h2> Guest Room Details</h2>
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

            <div className="headForm">
              <div className="row">
                <div className="col-lg-12 bookGuest mt-3">
                  {hotelinfoGRN?.rate?.rooms?.map((item, roomIndex) => {
                    return (
                      <div key={roomIndex}>
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
                          <label className="roomIndexGuest">
                            Guest {roomIndex + 1}
                          </label>
                        </div>
                        {item?.no_of_adults > 0 &&
                          Array.from(
                            { length: item?.no_of_adults },
                            (_, adultIndex) => (
                              <div className="bookFlightPassInner">
                                <div className="bookAdultIndex">
                                  <p>
                                    Adult {adultIndex + 1}
                                    {roomIndex === 0 && (
                                      <span>
                                        {adultIndex == 0 ? "(Lead Guest)" : ""}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="row g-3 mb-3">
                                  <div className="col-lg-3 col-md-3">
                                    <label htmlFor="floatingInput">Title</label>
                                    <select
                                      className="form-select "
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
                                      <option value="Mr.">Mr</option>
                                      <option value="Ms.">Miss</option>
                                      <option value="Mrs.">Mrs</option>
                                      <option value="Mstr.">Mstr</option>
                                    </select>
                                  </div>
                                  <div className="col-lg-3 col-md-3">
                                    <label htmlFor="floatingInput">
                                      First Name
                                    </label>
                                    <input
                                      name="FirstName"
                                      className="form-control"
                                      onChange={(e) =>
                                        handlePassengerDataChange(
                                          e,
                                          roomIndex,
                                          adultIndex,
                                          "FirstName"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-3">
                                    <label htmlFor="floatingInput">
                                      Last Name
                                    </label>
                                    <input
                                      name="LastName"
                                      className="form-control"
                                      onChange={(e) =>
                                        handlePassengerDataChange(
                                          e,
                                          roomIndex,
                                          adultIndex,
                                          "LastName"
                                        )
                                      }
                                    />
                                  </div>

                                  {roomIndex === 0 && adultIndex === 0 && (
                                    <>
                                      <div className="col-lg-3 col-md-3">
                                        <label htmlFor="floatingInput">
                                          Pan Number
                                        </label>
                                        <input
                                          name="PAN"
                                          type="text"
                                          placeholder="Write in Capital"
                                          className="form-control"
                                          onChange={(e) =>
                                            handlePassengerDataChange(
                                              e,
                                              roomIndex,
                                              adultIndex,
                                              "PAN"
                                            )
                                          }
                                        />
                                      </div>

                                      <div className="col-lg-5 col-md-5">
                                        <label htmlFor="floatingInput">
                                          Enter Email
                                        </label>
                                        <input
                                          name="Email"
                                          id="Email1"
                                          className="form-control"
                                          ref={emailRef}
                                          onChange={(e) =>
                                            handlePassengerDataChange(
                                              e,
                                              roomIndex,
                                              adultIndex,
                                              "Email"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-lg-5 col-md-5">
                                        <label htmlFor="floatingInput">
                                          Enter Phone
                                        </label>
                                        <input
                                          name="Phoneno"
                                          id="phoneNumber1"
                                          className="form-control"
                                          onChange={(e) =>
                                            handlePassengerDataChange(
                                              e,
                                              roomIndex,
                                              adultIndex,
                                              "Phoneno"
                                            )
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div className="col-lg-12">
              <div className="accordianSection">
                {noOfRooms?.length > 0 &&
                  Array.from({ length: noOfRooms?.length }, (_, roomIndex) => (
                    <Box sx={{ marginBottom: "15px" }}>
                      <div mb={2} key={roomIndex} className="services" py={1}>
                        <Accordion
                          //  expanded={true}

                          expanded={accordionExpanded === roomIndex}
                          onChange={handleAccordionChange(roomIndex)}
                          sx={{
                            marginBottom: "15px",
                            backgroundColor: "rgba(187, 187, 187, 0.30)",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ background: "rgba(231, 60, 52, 0.15)" }}
                          >
                            <label>Room {roomIndex + 1}</label>
                          </AccordionSummary>
                          <AccordionDetails style={{ background: "none" }}>
                            <div>
                              {noOfRooms[roomIndex]?.NoOfAdults > 0 &&
                                Array.from(
                                  { length: noOfRooms[roomIndex]?.NoOfAdults },
                                  (_, adultIndex) => (
                                    <div className="guestDetailsForm">
                                      <p>
                                        Adult {adultIndex + 1}
                                        {adultIndex == 0 ? "(Lead Guest)" : ""}
                                      </p>
                                      <Grid container spacing={3} my={1}>
                                        <Grid item xs={12} sm={12} md={4}>
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
                                                    console.warn(
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                            roomIndex &&
                                                          item.adultIndex ===
                                                            adultIndex
                                                      )[0].FirstName,
                                                      "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55"
                                                    );

                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 500)
                                                }
                                              />

                                              {sub &&
                                                passengerData[roomIndex]
                                                  .FirstName === "" && (
                                                  <span className="error">
                                                    {
                                                      passengerData[roomIndex]
                                                        .FirstName
                                                    }
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
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
                                                      { adultIndex: adultIndex }
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
                                          sm={12}
                                          md={4}
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
                                                type="number"
                                                placeholder="Enter Age"
                                                // value={passengerData.Age}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
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
                                          sm={12}
                                          md={4}
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
                                                placeholder="Write in Capital"
                                                // value={passengerData.PAN}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 300)
                                                }
                                              />
                                              {sub &&
                                                !validatePAN(
                                                  sub &&
                                                    passengerData.filter(
                                                      (item) =>
                                                        item.roomIndex ===
                                                          roomIndex &&
                                                        item.adultIndex ===
                                                          adultIndex
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
                              {noOfRooms[roomIndex]?.NoOfChild > 0 &&
                                Array.from(
                                  {
                                    length: noOfRooms[roomIndex]?.NoOfChild,
                                  },
                                  (_, childIndex) => (
                                    <div className="guestDetailsForm">
                                      Child {childIndex + 1}
                                      <Grid container spacing={3} my={1}>
                                        <Grid item xs={12} sm={12} md={4}>
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
                                                      { childIndex: childIndex }
                                                    );
                                                    {
                                                      console.warn(
                                                        passengerData.filter(
                                                          (item) =>
                                                            item.roomIndex ===
                                                              roomIndex &&
                                                            item.childIndex ===
                                                              childIndex
                                                        ),
                                                        "dddddddddddddddddddd"
                                                      );
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
                                          sm={12}
                                          md={4}
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
                                                    console.warn(
                                                      "Last name child",
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                            roomIndex &&
                                                          item.childIndex ===
                                                            childIndex
                                                      )[0].LastName
                                                    );
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { childIndex: childIndex }
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
                                          sm={12}
                                          md={4}
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
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                PanNo*
                                              </label>
                                              <input
                                                name="PAN"
                                                type="text"
                                                placeholder="Enter PanNo"
                                                // value={passengerData.PAN}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { childIndex: childIndex }
                                                    );
                                                  })
                                                }
                                              />
                                              {sub &&
                                                !validatePAN(
                                                  passengerData.filter(
                                                    (item) =>
                                                      item.roomIndex ===
                                                        roomIndex &&
                                                      item.childIndex ===
                                                        childIndex
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
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </Box>
                  ))}
              </div>
            </div> */}

            {/* <div className="col-lg-12">
              <div className="headText-new mb-4">
                <h2>Other Details</h2>
              </div>
            </div> */}

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
                    <form>
                      <div className="bookFlightPassInner">
                        {hotelinfoGRN?.rate?.non_refundable === true ? (
                          <div className="row g-3 ">
                            <div className="hotelNameAccord">
                              <p>Non Refundable</p>
                            </div>
                          </div>
                        ) : (
                          <div className="row g-3 ">
                            <div className="hotelNameAccord">
                              <p>
                                {hotelinfoGRN?.rate?.rooms?.[0]?.description}
                              </p>
                            </div>
                            <div className="otherDetailsData">
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="cancelAccord">
                                    <span>Cancelled by date</span>
                                    <p>
                                      {dayjs(
                                        hotelinfoGRN?.rate?.cancellation_policy
                                          ?.cancel_by_date
                                      ).format("DD MMM, YY")}
                                    </p>
                                  </div>
                                </div>
                                {/* <div className="col-lg-4">
                                                                    <div className="cancelAccord">
                                                                        <span>Cancelled on or Before</span>
                                                                        <p>20 march</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="cancelAccord">
                                                                        <span>Cancellation Charges</span>
                                                                        <p>100%</p>
                                                                    </div>
                                                                </div> */}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </AccordionDetails>
                </Accordion>

                {/* <Accordion
                  expanded={expandedOther === "panel3"}
                  onChange={handleOtherChange("panel3")}
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
                    <label>Amenities</label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.HotelRoomsDetails[0]?.Amenity.map(
                        (item) => (
                          <li>{item}</li>
                        )
                      )}
                    </ul>
                  </AccordionDetails>
                </Accordion> */}
                {/* <Accordion
                  expanded={expandedOther === "panel4"}
                  onChange={handleOtherChange("panel4")}
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
                    <label>Hotel Norms</label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      {reducerState?.hotelSearchResult?.hotelInfo
                        ?.HotelInfoResult?.HotelDetails?.HotelPolicy
                        ? reducerState?.hotelSearchResult?.hotelInfo
                            ?.HotelInfoResult?.HotelDetails?.HotelPolicy
                        : "No data"}
                    </div>
                  </AccordionDetails>
                </Accordion> */}
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="proceed-book-new-hotel"
                style={{ display: "flex", justifyContent: "center" }}
              >
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
