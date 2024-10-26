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

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import "./review.css";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../../../Redux/Passengers/passenger";
//import Custombutton from "../../../Custombuttom/Button";
import HotelLoading from "../hotelLoading/HotelLoading";

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

  
  const HotelIndex = sessionStorage.getItem("HotelIndex");
 
  
 

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
    
  const hotelData = hotelRoom?.HotelRoomsDetails[HotelIndex];
 
 

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
 
 

  const [expandedOther, setExpandedOther] = React.useState(false);

  const handleOtherChange = (panel) => (event, notexpanted) => {
    setExpandedOther(notexpanted ? panel : false);
  };
  
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

  

  const emailRef = useRef();

  // new values

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  

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

  

  const handleClickSavePassenger = async () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      
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
                      {/* //<p className="choosename">Choose Another Hotel</p> */}
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

         
            <div className="col-lg-12">
              <div className="services">
             
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
                               
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </AccordionDetails>
                </Accordion>

               
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
