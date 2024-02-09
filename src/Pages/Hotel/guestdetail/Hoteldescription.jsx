import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "../hotelresult/Rating";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector, useReducer } from "react-redux";
import moment from "moment";
import {
  clearHotelReducer,
  hotelBookRoomAction,
} from "../../../Redux/Hotel/hotel";
import StarIcon from "@mui/icons-material/Star";
import { apiURL } from "../../../Constants/constant";
import Swal from "sweetalert2";

import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import userApi from "../../../Redux/API/api";
import { swalModal } from "../../../utils/swal";

const Hoteldescription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OpenNewpage = () => {
    navigate("booknow");
  };
  const reducerState = useSelector((state) => state);
  console.warn(reducerState, "reducer State;;;;;;;;;;;;;;;;;;;;;;;;;;");
  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const passenger = reducerState?.passengers?.passengersData;

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;
  const resultIndex = sessionStorage.getItem("ResultIndex");
  const hotelCode = sessionStorage.getItem("HotelCode");
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);

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
  const grandTotal = totalAmount + markUpamount;
  useEffect(() => {
    if (
      resultIndex === undefined ||
      hotelCode === undefined ||
      reducerState?.passengers?.passengersData?.length === 0 ||
      reducerState?.passengers?.passengersData === undefined
    ) {
      // alert("navigate")
      navigate("/hotel/hotelsearch/HotelBooknow/Reviewbooking");
    }
  }, []);
  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== undefined
    ) {
      // swalModal("hotel",reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorMessage,false)
      swalModal("hotel","'We're sorry, but there was an issue with your hotel booking",false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
      //     ?.ErrorMessage,
      //   timer: 3000,
      //   showClass: {
      //     popup: `
      //         animate__animated
      //         animate__fadeInUp
      //         animate__faster
      //       `,
      //   },
      //   hideClass: {
      //     popup: `
      //         animate__animated
      //         animate__fadeOutDown
      //         animate__faster
      //       `,
      //   },
      // });
      navigate("/");
    }
  }, [reducerState?.hotelSearchResult?.bookRoom?.BookResult]);



  const handleClickBooking = async () => {
    // console.log(userBalance,"userbalance", grandTotal, "grandTotal")

    if (userBalance >= grandTotal) {
      const payload = {
        ResultIndex: resultIndex,
        HotelCode: hotelCode,
        HotelName: hotelBlockDetails?.HotelName,
        GuestNationality: "IN",
        NoOfRooms: hotelDetails?.length,
        ClientReferenceNo: 0,
        IsVoucherBooking: true,
        HotelRoomsDetails: hotelDetails?.map((item, hotelIndex) => {
          return {
            RoomIndex: item?.RoomIndex,
            RoomTypeCode: item?.RoomTypeCode,
            RoomTypeName: item?.RoomTypeName,
            RatePlanCode: item?.RatePlanCode,
            BedTypeCode: null,
            SmokingPreference: 0,
            Supplements: null,
            Price: item?.Price,
            HotelPassenger: passenger
              .map((itemPassenger, index) => {
                if (itemPassenger?.roomIndex === hotelIndex) {
                  return {
                    ...itemPassenger,
                    Email: apiURL.flightEmail,
                    Phoneno: apiURL.phoneNo,
                  };
                } // If the condition is not met, return the original item
              })
              .filter(Boolean),
          };
        }),

        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
        TraceId:
          reducerState?.hotelSearchResult?.ticketData?.data?.data
            ?.HotelSearchResult?.TraceId,
      };
      // console.log(payload)

      const hotelDetailsPayload = {
        BookingId: await bookingId,
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
      };
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
      dispatch(hotelBookRoomAction([payload, hotelDetailsPayload]));
      // dispatch(hotelBookRoomAction(payload));
    } else {
      // alert("Insufficent balance!! Please Recharge your Wallet");
      // navigate("/hotel");
      swalModal('py',"Insufficient balance!! Please Recharge your Wallet!",true)
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

  // balance subtract and update

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
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

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

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };
  console.warn(userBalance, grandTotal, "userBalance >= grandTotal");
  useEffect(() => {
    if (reducerState?.hotelSearchResult?.bookRoom?.BookResult
?.Error?.ErrorCode === 0) {

  const payload = {
    ResultIndex: resultIndex,
    HotelCode: hotelCode,
    HotelName: hotelBlockDetails?.HotelName,
    GuestNationality: "IN",
    NoOfRooms: hotelDetails?.length,
    ClientReferenceNo: 0,
    IsVoucherBooking: true,
    HotelRoomsDetails: hotelDetails?.map((item, hotelIndex) => {
      return {
        RoomIndex: item?.RoomIndex,
        RoomTypeCode: item?.RoomTypeCode,
        RoomTypeName: item?.RoomTypeName,
        RatePlanCode: item?.RatePlanCode,
        BedTypeCode: null,
        SmokingPreference: 0,
        Supplements: null,
        Price: item?.Price,
        HotelPassenger: passenger
          .map((itemPassenger, index) => {
            if (itemPassenger?.roomIndex === hotelIndex) {
              return {
                ...itemPassenger,
                Email: apiURL.flightEmail,
                Phoneno: apiURL.phoneNo,
              };
            } // If the condition is not met, return the original item
          })
          .filter(Boolean),
      };
    }),

    EndUserIp: reducerState?.ip?.ipData,
    TokenId: reducerState?.ip?.tokenData,
    TraceId:
      reducerState?.hotelSearchResult?.ticketData?.data?.data
        ?.HotelSearchResult?.TraceId,
  };
  // dispatch(hotelBookRoomAction(payload));
      Swal.fire({
        icon: "success",
        title: "Hotel Booking Success",
        text: `Booking Id: ${reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId} and Confirmation Number id ${reducerState?.hotelSearchResult?.reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode?.BookResult?.ConfirmationNo}`,
        didOpen: () => {navigate("/")},

        // timer: 3000,
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      });
      // navigate("/");
    }
  },[reducerState?.hotelSearchResult?.bookRoom]);
  console.warn("reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode",reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode)

  if (
    resultIndex === undefined ||
    hotelCode === undefined ||
    reducerState?.passengers?.passengersData?.length === 0 ||
    reducerState?.passengers?.passengersData === undefined
  ) {
    // alert("navigate")
    // navigate("/hotel/hotelsearch/HotelBooknow/Reviewbooking")
    return <div>loading....</div>;
  }

  return (
    <>
      <div className="container-fluid rmv-margin">
        {/* <div className="row">
          <div className="col-lg-12"> */}
        <div className="row">
          {/* hotel details area  */}

          <div className="col-lg-12">
            <div className="hotelDetails">
              <div>
                <p className="hotelName">
                  {hotelInfo?.HotelDetails?.HotelName}
                </p>
                <Box alignItems="right">
                  <Box>{star(hotelInfo?.HotelDetails?.StarRating)}</Box>
                </Box>
              </div>
              <div>
                <p className="text-start w-50">
                  {" "}
                  <b>Address:</b> {hotelInfo?.HotelDetails?.Address}
                </p>

                <div>
                  <p className="text-end">
                    {" "}
                    <b>Check In:</b>
                    {
                      reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckInDate
                    }
                  </p>
                  <p className="text-end">
                    <b>Check Out:</b>
                    {
                      reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckOutDate
                    }
                  </p>
                </div>
              </div>
              <div>
                <div className="contact">
                  <p>{storedFormData?.city}, India</p>
                  <p>
                    <b>Contact: </b>
                    {hotelInfo?.HoteDetails?.HotelContactNo
                      ? hotelInfo.HotelDetails.HotelContactNo
                      : "Not Available"}
                  </p>
                </div>
                <p>
                  <b>Night(s) </b>
                  {storedFormData?.night}
                </p>
              </div>
            </div>
            {/* </div>
            </div> */}
          </div>

          {/* booking details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
              <div className="bookingDetailsGuestHeader">
                <p>Booking Details</p>
              </div>
              <div className="bookingDetailsGuestBody">
                <div>
                  <p>Hotel Name:</p>
                  <p>{hotelInfo?.HotelDetails?.HotelName}</p>
                </div>
                <div>
                  <p>Address: </p>
                  <span>{hotelInfo?.HotelDetails?.Address}</span>
                </div>
                <div>
                  <div>
                    <p>Check In:</p>
                    <span>
                      {
                        reducerState?.hotelSearchResult?.ticketData?.data?.data
                          ?.HotelSearchResult?.CheckInDate
                      }
                    </span>
                  </div>
                  <div>
                    <p>Check Out:</p>
                    <span>
                      {
                        reducerState?.hotelSearchResult?.ticketData?.data?.data
                          ?.HotelSearchResult?.CheckOutDate
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* passenger details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
              <div className="bookingDetailsGuestHeader">
                <p>Passenger Details</p>
              </div>
              {passenger?.map((name, index) => {
                return (
                  <div className="passengerDetailsGuestBody">
                    <div>
                      <p>Name :</p>
                      <p>PAN : </p>
                    </div>
                    <div>
                      <span>
                        {name?.FirstName?.toUpperCase()}{" "}
                        {name?.LastName?.toUpperCase()}
                      </span>
                      <span>{name?.PAN}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* cancellation policy  */}

          <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div className="bookingDetailsGuestHeader">
                <p>Cancellation and Charges</p>
              </div>
              <div className="otherDetailsDataGuest">
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
            </div>
          </div>

          {/* hotel Norms  */}

          <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div className="bookingDetailsGuestHeader">
                <p>Hotel Facilities</p>
              </div>
              <div className="guestDetailsNorms">
                <ul>
                  {hotelInfo?.HotelDetails?.HotelFacilities.map(
                    (facility, index) => (
                      <li key={index}>{facility}</li>
                    )
                  )}
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
      <div className="guestDetailsHistory mt-3">
        <button type="submit" onClick={handleClickBooking}>
          Continue
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
