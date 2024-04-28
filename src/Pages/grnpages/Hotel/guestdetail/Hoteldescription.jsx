import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "../hotelresult/Rating";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector, useReducer } from "react-redux";
import moment from "moment";
import {
  clearHotelReducer,
  hotelBookRoomActionGRN,
} from "../../../../Redux/HotelGrn/hotel";
import StarIcon from "@mui/icons-material/Star";
import { apiURL } from "../../../../Constants/constant";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
//import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import { balanceSubtractRequest } from "../../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import userApi from "../../../../Redux/API/api";
import { swalModal } from "../../../../utils/swal";
import "./Hoteldescription.css";
const Hoteldescription = () => {
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const authenticUser = reducerState?.logIn?.loginData?.status;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
 console.log(hotelMainReducer,"hotel============================");
  const passenger = reducerState?.passengers?.passengersData;
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  // const [sub, setSub] = useState(false);
  //const emailRef = useRef();

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  useEffect(() => {
    if (reducerState?.hotelSearchResultGRN?.bookRoom?.status === "confirmed") {
      setLoaderPayment(false);
      navigate("/hotel/hotelsearchGRM/guestDetails/review/ticket");
      return;
    }
  }, [reducerState?.hotelSearchResultGRN?.bookRoom?.status]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== undefined
    ) {
      swalModal(
        "py",
        "Booking Issue - Your refund will be processed within 7 working days. We apologize for any inconvenience caused.",
        true
      );
    }
  }, [reducerState?.hotelSearchResult?.bookRoom]);

  useEffect(() => {
    if (loaderPayment == true) {
      handleClickBooking();
    }
  }, [loaderPayment]);

  function generateMixedString() {
    const fixedText = "skyTrails_";
    const currentTime = Date.now().toString(); //add current time
    return fixedText + currentTime;
  }

  function generateMixedString() {
    const fixedText = "skyTrails_";
    const currentTime = Date.now().toString(); //add current time
    return fixedText + currentTime;
  }

  const mixedString = generateMixedString();

  const handleClickBooking = async () => {
    // console.log(userBalance,"userbalance", grandTotal, "grandTotal")

    if (userBalance >= grandTotal) {
      const payload = {
        search_id:
          reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data
            ?.search_id,
        hotel_code: hotelinfoGRN?.hotel_code,
        city_code: hotelinfoGRN?.city_code,
        group_code: hotelinfoGRN?.rate?.group_code,
        checkout: hotelMainReducer?.checkout,
        checkin: hotelMainReducer?.checkin,
        booking_comments: "Test booking",
        payment_type: "AT_WEB",
        agent_reference: mixedString,
        booking_items: [
          {
            room_code: hotelinfoGRN?.rate?.room_code,
            rate_key: hotelinfoGRN?.rate?.rate_key,
            rooms: passenger.map((item, index) => ({
              room_reference:
                hotelinfoGRN?.rate?.rooms?.[index]?.room_reference,
              paxes: [
                ...item.adults.map((adult) => ({
                  title: adult.Title,
                  name: adult.FirstName,
                  surname: adult.LastName,
                  type: "AD",
                })),
                ...item.children.map((child) => ({
                  title: child.Title,
                  name: child.FirstName,
                  surname: child.LastName,
                  type: "CH",
                  age: child.age,
                })),
              ],
            })),
          },
        ],
        holder: {
          title: passenger?.[0]?.adults?.[0]?.Title,
          name: passenger?.[0]?.adults?.[0]?.FirstName,
          surname: passenger?.[0]?.adults?.[0]?.LastName,
          email: passenger?.[0]?.adults?.[0]?.Email,
          phone_number: passenger?.[0]?.adults?.[0]?.Phoneno,
          client_nationality: "in",
          pan_number: passenger?.[0]?.adults?.[0]?.PAN,
        },
      };
      // console.log(payload)

      // const hotelDetailsPayload = {
      //   BookingId: await bookingId,
      //   EndUserIp: reducerState?.ip?.ipData,
      //   TokenId: reducerState?.ip?.tokenData,
      // };

      // console.log("hotelDetailsPayload", hotelDetailsPayload);
      // Dispatch the hotelBookRoomAction
      //  bookingStatus = true;
      // Swal.fire({
      //   title: "Congratulation!",
      //   text: "Your hotel is booked",
      //   icon: "success",
      //   timer: 5000,
      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `
      //   }
      // })
      // .then(() => {
      //   dispatch(clearHotelReducer());
      //   navigate("/");
      //   // Navigate to "/hotel" after the Swal dialog is closed
      // });
      // if(1>2){
      // setBookingSuccess(true);
      dispatch(hotelBookRoomActionGRN(payload));
      // dispatch(hotelBookRoomAction(payload));
    } else {
      // alert("Insufficent balance!! Please Recharge your Wallet");
      // navigate("/hotel");
      swalModal(
        "py",
        "Insufficient balance!! Please Recharge your Wallet!",
        true
      );
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Insufficient balance!! Please Recharge your Wallet!",
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
      // }).then(() => {
      //   // dispatch(clearHotelReducer());
      //   // navigate("/");
      //   // Navigate to "/hotel" after the Swal dialog is closed
      // });
    }
  };

  useEffect(() => {
    if (isDisableScroll) {
      document.body.classList.add("disableTrue");
      document.body.classList.remove("disableFalse");
    } else {
      document.body.classList.remove("disableTrue");
      document.body.classList.add("disableFalse");
    }
    return () => {
      document.body.classList.add("disableFalse");

      document.body.classList.remove("disableTrue");
    };
  }, [isDisableScroll]);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;
  const resultIndex = sessionStorage.getItem("ResultIndex");
  const hotelCode = sessionStorage.getItem("HotelCode");

  const hotelData =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;
  // console.log(resultIndex, hotelCode);
  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  // console.log("hotelDetails", hotelDetails);
  // console.log("passenger", passenger);
  // console.log("hotel block details", hotelBlockDetails)
  // console.log("hotel data", hotelData)
  // console.log("hotel Info", hotelInfo);

  const checkInDate = moment(hotelDetails?.CheckInDate).format("MMMM DD, YYYY");
  const checkOutDate = moment(hotelDetails?.CheckOutDate).format(
    "MMMM DD, YYYY"
  );
  const cancelDuedate = moment(hotelDetails?.LastCancellationDate).format(
    "MMMM DD, YYYY"
  );

  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails;
  // console.log("reducerState", reducerState);

  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);
  // console.log("totalAmount in last page", totalAmount);

  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.hotel;
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;

  // console.log("markup hotel", markUpamount)
  //const grandTotal = totalAmount + markUpamount;

  const grandTotal = 1;

  // useEffect(() => {
  //   if (
  //     reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
  //       ?.ErrorCode !== 0 &&
  //     reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
  //       ?.ErrorCode !== undefined
  //   ) {
  //     // swalModal("hotel",reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorMessage,false)
  //     swalModal("hotel","'We're sorry, but there was an issue with your hotel booking",false)
  //     // Swal.fire({
  //     //   icon: "error",
  //     //   title: "Oops...",
  //     //   text: reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
  //     //     ?.ErrorMessage,
  //     //   timer: 3000,
  //     //   showClass: {
  //     //     popup: `
  //     //         animate__animated
  //     //         animate__fadeInUp
  //     //         animate__faster
  //     //       `,
  //     //   },
  //     //   hideClass: {
  //     //     popup: `
  //     //         animate__animated
  //     //         animate__fadeOutDown
  //     //         animate__faster
  //     //       `,
  //     //   },
  //     // });
  //     navigate("/");
  //   }
  // }, [reducerState?.hotelSearchResult?.bookRoom?.BookResult]);

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  // const bookingResonse=reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorCode;

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.Error?.ErrorCode == 0
    ) {
      if (userId) {
        const balancePayload = {
          _id: userId,
          amount: grandTotal,
        };
        dispatch(balanceSubtractRequest(balancePayload));
        const payload = {
          userId: reducerState?.logIn?.loginData?.data?.data?.id,
          name: reducerState?.hotelSearchResult?.hotelDetails?.data?.data
            ?.GetBookingDetailResult?.HotelRoomsDetails[0]?.HotelPassenger[0]
            ?.FirstName,
          phone: passenger[0]?.Phoneno,
          email: passenger[0]?.Email,
          destination:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.City,
          bookingId: `${reducerState?.hotelSearchResult?.hotelDetails?.data?.data?.GetBookingDetailResult?.BookingId}`,
          CheckInDate:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.CheckInDate,
          CheckOutDate:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.CheckOutDate,
          hotelName:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.HotelName,
          hotelId:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.HotelId,
          cityName:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.City,
          country:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.CountryCode,
          address:
            reducerState?.hotelSearchResult?.hotelDetails?.data?.data
              ?.GetBookingDetailResult?.AddressLine1,
          room: reducerState?.hotelSearchResult?.hotelDetails?.data?.data
            ?.GetBookingDetailResult?.NoOfRooms,
          amount: grandTotal,
          noOfPeople: 2,
        };
        userApi.hotelBookingDataSave(payload);
      }
    }
  }, [
    reducerState?.hotelSearchResult?.hotelDetails?.data?.data
      ?.GetBookingDetailResult,
  ]);

  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  //const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  const hotelCancellationPolicies = reducerState?.hotelSearchResult?.blockRoom
    ?.BlockRoomResult?.HotelRoomsDetails
    ? reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
        ?.HotelRoomsDetails[0]
    : [];
  const cancellationStartingDate =
    hotelCancellationPolicies?.CancellationPolicies
      ? hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate
      : [];
  const cancellationFormattedStartingDate = moment(
    cancellationStartingDate
  ).format("MMMM DD, YYYY");
  const cancellationEndingDate = hotelCancellationPolicies?.CancellationPolicies
    ? hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate
    : "";
  const cancellationFormattedEndingDate = moment(cancellationEndingDate).format(
    "MMMM DD, YYYY"
  );

  const cancellationCharge = hotelCancellationPolicies?.CancellationPolicies
    ? hotelCancellationPolicies?.CancellationPolicies[0]?.Charge
    : null;

  // console.warn(userBalance, grandTotal, "userBalance >= grandTotal");

  // console.warn("reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode",reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode)

  // if (
  //   resultIndex === undefined ||
  //   hotelCode === undefined ||
  //   reducerState?.passengers?.passengersData?.length === 0 ||
  //   reducerState?.passengers?.passengersData === undefined
  // ) {
  //   // alert("navigate")
  //   // navigate("/hotel/hotelsearch/HotelBooknow/Reviewbooking")
  //   return <div>loading....</div>;
  // }

  return (
    <>
      <div className="container-fluid rmv-margin">
        {/* <div className="row">
          <div className="col-lg-12"> */}
        <div className="row">
          {/* booking details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
              {/* <div className="bookingDetailsGuestHeader-new">
                <p>Booking Details</p>
                <div
                  className="headText-new"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Booking Details</h2>
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
              </div> */}
              <div
                className="headText-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Booking Details</h2>
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
              <div className="bookingDetailsGuestBody">
                <div>
                  <p>Hotel Name:</p>
                  <p>{hotelinfoGRN?.name}</p>
                </div>
                <div>
                  <p>Address: </p>
                  <span>{hotelinfoGRN?.address}</span>
                </div>
                <div>
                  <div>
                    <p>Check In:</p>
                    <span>
                      {dayjs(hotelMainReducer?.checkin).format("DD MMM, YY")}
                    </span>
                  </div>
                  <div>
                    <p>Check Out:</p>
                    <span>
                      {dayjs(hotelMainReducer?.checkout).format("DD MMM, YY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* passenger details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
              <div
                className="headText-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Passenger Details</h2>
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
              {passenger?.map((item, index) => {
                return (
                  <div>
                    <label className="roomIndexGuest">Room {index + 1}</label>

                    {item?.adults.length > 0 &&
                      item?.adults?.map((i, adultIndex) => (
                        <div className="bookFlightPassInner">
                          <div className="bookAdultIndex">
                            <p>
                              Adult {adultIndex + 1}
                              {index === 0 && (
                                <span>
                                  {adultIndex == 0 ? "(Lead Guest)" : ""}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="passengerDetailsGuestBody">
                              <div>
                                <p>Name :</p>
                                {index === 0 && adultIndex == 0 && (
                                  <p>PAN : </p>
                                )}
                              </div>
                              <div>
                                <span>
                                  {i?.Title?.toUpperCase()}{" "}
                                  {i?.FirstName?.toUpperCase()}{" "}
                                  {i?.LastName?.toUpperCase()}
                                </span>
                                {index === 0 && <span>{i?.PAN}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {item?.children.length > 0 &&
                      item?.children?.map((i, childIndex) => (
                        <div className="bookFlightPassInner">
                          <div className="bookAdultIndex">
                            <p>Child {childIndex + 1}</p>
                          </div>
                          <div className="passengerDetailsGuestBody">
                            <div>
                              <p>Name :</p>
                              {/* <p>PAN : </p> */}
                            </div>
                            <div>
                              <span>
                                {i?.Title?.toUpperCase()}{" "}
                                {i?.FirstName?.toUpperCase()}{" "}
                                {i?.LastName?.toUpperCase()}
                              </span>
                              {/* <span>{i?.PAN}</span> */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* cancellation policy  */}

          <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div
                className="headText-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Cancellation and Charges</h2>
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
                        <p>{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
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
            </div>
          </div>

          {/* hotel Norms  */}

          <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div
                className="headText-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Hotel Norms</h2>
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

              <div className="guestDetailsNorms">
                <ul>
                  {hotelinfoGRN?.facilities.split(";").map((item, index) => (
                    <p key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M12.2734 7.77771C12.8906 7.77771 13.4727 7.8949 14.0195 8.12927C14.5664 8.36365 15.043 8.68396 15.4492 9.09021C15.8555 9.49646 16.1797 9.97693 16.4219 10.5316C16.6641 11.0863 16.7812 11.6683 16.7734 12.2777C16.7734 12.9027 16.6562 13.4847 16.4219 14.0238C16.1875 14.5629 15.8672 15.0394 15.4609 15.4535C15.0547 15.8676 14.5742 16.1918 14.0195 16.4261C13.4648 16.6605 12.8828 16.7777 12.2734 16.7777C11.6484 16.7777 11.0664 16.6605 10.5273 16.4261C9.98828 16.1918 9.51172 15.8715 9.09766 15.4652C8.68359 15.059 8.35938 14.5824 8.125 14.0355C7.89062 13.4886 7.77344 12.9027 7.77344 12.2777C7.77344 11.6605 7.89062 11.0785 8.125 10.5316C8.35938 9.98474 8.67969 9.50818 9.08594 9.10193C9.49219 8.69568 9.96875 8.37146 10.5156 8.12927C11.0625 7.88708 11.6484 7.7699 12.2734 7.77771Z"
                          fill="#E73C34"
                        />
                      </svg>
                      {item.trim()}
                    </p>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* booking history  */}

          {/* <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div className="bookingDetailsGuestHeader">
                <p>Booking History</p>
              </div>
              <div className="guestDetailsHistory">
                <button>View Voucher</button>
                <button>View Invoice</button>
              </div>

            </div>
          </div> */}
        </div>
      </div>

      {/* <Box textAlign="center" mt={2}>
        <Button
          className="continue_btn"
          type="submit"
          variant="contained"
          onClick={handleClickBooking}
        >
          Continue
        </Button>
      </Box> */}
      <div
        className="proceed-book-new-hotel mt-3"
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <button
          type="submit"
          onClick={handleClickBooking}
          style={{ border: "none" }}
          className="viewinvoice"
        >
          Pay Now
        </button>
      </div>
    </>
    // <Box p={3} backgroundColor="#F5F5F5" borderRadius="10px">
    //   {passenger?.map((name, index) => {
    //     return (
    //       <Box display="flex" justifyContent="space-between" mt={2}>
    //         <Box display="flex">
    //           <Typography
    //             sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
    //           >
    //             {name?.FirstName} {name?.LastName}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     );
    //   })}
    //   <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />

    // <Box textAlign="center" mt={2}>
    //   <Button
    //     className="continue_btn"
    //     type="submit"
    //     variant="contained"
    //     onClick={handleClickBooking}
    //   >
    //     Continue
    //   </Button>
    // </Box>
    // </Box>
  );
};

export default Hoteldescription;
