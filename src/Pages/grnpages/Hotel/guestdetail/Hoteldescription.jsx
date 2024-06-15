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

  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  console.log(hotelMainReducer, "hotel============================");
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
    if (loaderPayment == true) {
      handleClickBooking();
    }
  }, [loaderPayment]);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;

  const getBookingDetails = reducerState?.hotelSearchResultGRN?.bookRoom;

  // const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
  //   return accumulator + item?.Price?.PublishedPriceRoundedOff;
  // }, 0);

  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.hotel;
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  // console.log(userId, "---------------userid");
  // const bookingResonse=reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorCode;
  const nonRefundable =
    getBookingDetails?.hotel?.booking_items?.[0]?.non_refundable;
  const cancelDetails =
    getBookingDetails?.hotel?.booking_items?.[0]?.cancellation_policy;
  const grandTotal = getBookingDetails?.price?.total + markUpamount;
  // const grandTotal = 1;
  useEffect(() => {
    if (
      userId &&
      reducerState?.hotelSearchResultGRN?.bookRoom?.status === "confirmed"
    ) {
     
      const payload = {
        userId: reducerState?.logIn?.loginData?.data?.result?._id,
        agnet_reference: getBookingDetails?.agent_reference,
        booking_date: getBookingDetails?.booking_date,
        booking_id: getBookingDetails?.booking_id,
        booking_reference: getBookingDetails?.booking_reference,
        checkin: getBookingDetails?.checkin,
        checkout: getBookingDetails?.checkout,
        total: getBookingDetails?.price?.total,
        holder: {
          title: passenger?.[0]?.adults?.[0]?.Title,
          name: passenger?.[0]?.adults?.[0]?.FirstName,
          surname: passenger?.[0]?.adults?.[0]?.LastName,
          email: passenger?.[0]?.adults?.[0]?.Email,
          phone_number: passenger?.[0]?.adults?.[0]?.Phoneno,
          client_nationality: "in",
          pan_number: passenger?.[0]?.adults?.[0]?.PAN,
        },
        hotel: {
          address: getBookingDetails?.hotel?.address,
          name: getBookingDetails?.hotel?.name,
          price: getBookingDetails?.price?.total,
          imageUrl: hotelDetails?.images?.url,
          phoneNumber: "",
          geolocation: {
            latitude: getBookingDetails?.hotel?.geolocation?.latitude,
            longitude: getBookingDetails?.hotel?.geolocation?.longitude,
          },
          category: getBookingDetails?.hotel?.category,
          city_code: getBookingDetails?.hotel?.city_code,
          country_code: getBookingDetails?.hotel?.country_code,
          paxes: getBookingDetails?.hotel?.paxes?.map((item) => ({
            age: item.age || "",
            name: item.name,
            pax_id: item.pax_id,
            surname: item.surname,
            title: item.title,
            type: item.type,
          })),
          rooms: getBookingDetails?.hotel?.booking_items?.[0].rooms?.map(
            (item) => ({
              description: item?.description,
              no_of_adults: item?.no_of_adults,
              no_of_children: item?.no_of_children,
              no_of_rooms: item?.no_of_rooms,
            })
          ),
          non_refundable: nonRefundable,
          cancellation_policy:
            nonRefundable === false
              ? {
                  amount_type: cancelDetails?.amount_type,
                  cancel_by_date: cancelDetails?.cancel_by_date,
                  details: [
                    {
                      from: cancelDetails?.details?.[0]?.from,
                    },
                  ],
                }
              : null,
        },
        bookingType: "HOTELS",
      };
      userApi.hotelBookingDetailsSaveGRN(payload);
    }
  }, [reducerState?.hotelSearchResultGRN?.bookRoom]);

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

      dispatch(hotelBookRoomActionGRN(payload));
      const balancePayload = {
        _id: userId,
        amount: grandTotal,
        bookingType: "Hotel booking",
      };

      dispatch(balanceSubtractRequest(balancePayload));
    } else {
      swalModal(
        "py",
        "Insufficient balance!! Please Recharge your Wallet!",
        true
      );
    }
  };

  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  //const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element
  console.log(reducerState, "reducer state");
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

  return (
    <>
      <div className="container-fluid rmv-margin">
        {/* <div className="row">
          <div className="col-lg-12"> */}
        <div className="row">
          {/* booking details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
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
        </div>
      </div>

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
  );
};

export default Hoteldescription;
