import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import Rating from "../hotelresult/Rating";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector, useReducer } from "react-redux";
import moment from "moment";
import {
  clearHotelReducer,
  hotelBookRoomAction,
} from "../../../../../Redux/Hotel/hotel";
import StarIcon from "@mui/icons-material/Star";
import { apiURL } from "../../../../../Constants/constant";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
//import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import { balanceSubtractRequest } from "../../../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import userApi from "../../../../../Redux/API/api";
import { swalModal } from "../../../../../utils/swal";

const Hoteldescription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  const OpenNewpage = () => {
    navigate("booknow");
  };
  const reducerState = useSelector((state) => state);

  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const passenger = reducerState?.passengers?.passengersData;
  console.log(passenger, "passengersdata");

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;
  const resultIndex = sessionStorage.getItem("ResultIndex");
  const hotelCode = sessionStorage.getItem("HotelCode");
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);

  const hotelData =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

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

  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);

  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.hotel;
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;

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
      swalModal(
        "hotel",
        "'We're sorry, but there was an issue with your hotel booking",
        false
      );

      navigate("/");
    }
  }, [reducerState?.hotelSearchResult?.bookRoom?.BookResult]);

  const handleClickBooking = async () => {
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
          reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.TraceId,
      };

      const hotelDetailsPayload = {
        BookingId: await bookingId,
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
      };

      dispatch(hotelBookRoomAction([payload, hotelDetailsPayload]));
      // dispatch(hotelBookRoomAction(payload));
    } else {
      swalModal(
        "py",
        "Insufficient balance!! Please Recharge your Wallet!",
        true
      );
    }
  };

  // balance subtract and update

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.Error?.ErrorCode === 0
    ) {
      if (userId) {
        const balancePayload = {
          _id: userId,
          amount: grandTotal,
          bookingType: "Hotel booking",
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

        Swal.fire({
          title: "Booking Successful",
          text: "Your booking was successful! Thank you for booking with us.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        swalModal(
          "py",
          "Insufficient balance!! Please Recharge your Wallet!",
          true
        );
      }
    }
  }, [reducerState?.hotelSearchResult?.hotelDetails]);

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

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode === 0
    ) {
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
      // Swal.fire({
      //   icon: "success",
      //   title: "Hotel Booking Success",
      //   text: `Booking Id: ${reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId} and Confirmation Number id ${reducerState?.hotelSearchResult?.reducerState?.hotelSearchResult?.bookRoom?.Error?.ErrorCode?.BookResult?.ConfirmationNo}`,
      //   didOpen: () => {
      //     navigate("/");
      //   },

      //   // timer: 3000,
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
      // navigate("/");
    }
  }, [reducerState?.hotelSearchResult?.bookRoom]);

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

          {/* booking details  */}

          <div className="col-lg-12">
            <div className="bookingDetailsGuest">
              <div
                className="bookingDetailsGuestHeader-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>Booking Details</p>
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
                      {dayjs(
                        reducerState?.hotelSearchResultGRN?.ticketData?.data
                          ?.data?.CheckInDate
                      ).format("DD MMM, YY")}
                    </span>
                  </div>
                  <div>
                    <p>Check Out:</p>
                    <span>
                      {dayjs(
                        reducerState?.hotelSearchResultGRN?.ticketData?.data
                          ?.data?.CheckOutDate
                      ).format("DD MMM,YY")}
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
                className="bookingDetailsGuestHeader-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>Passenger Details</p>
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
              {passenger?.map((name, index) => {
                let data = { title: "", index: "" };
                if (name.LeadPassenger) {
                  data = {
                    title: "Adult(LeadPassenger)",
                    index: name.adultIndex + 1,
                  };
                } else if (name.PaxType === 1) {
                  data = { title: "Adult", index: name.adultIndex + 1 };
                } else if (name.PaxType === 2) {
                  data = { title: "Child", index: name.childIndex + 1 };
                } else {
                  data = { title: "Infant", index: name.adultIndex + 1 };
                }
                return (
                  <div>
                    <div className="bookAdultIndex">
                      <p
                        style={{
                          color: "#000",
                          fontFamily: "Montserrat",
                          fontSize: "16.144px",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                      >{`${data.title} ${data.index}`}</p>
                    </div>

                    <div className="passengerDetailsGuestBody">
                      <div>
                        <p>Name :</p>
                        {name.PaxType === 1 ? <p>PAN :</p> : null}

                      </div>
                      <div>
                        <span>
                          {name?.FirstName?.toUpperCase()}{" "}
                          {name?.LastName?.toUpperCase()}
                        </span>
                        <span>{name?.PAN}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* cancellation policy  */}

          <div className="col-lg-12 mt-3">
            <div className="bookingDetailsGuest">
              <div
                className="bookingDetailsGuestHeader-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>Cancellation and Charges</p>
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
              <div
                className="otherDetailsDataGuest"
                style={{ backgroundColor: "#ffe7e7" }}
              >
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
              <div
                className="bookingDetailsGuestHeader-new"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>Hotel Facilities</p>
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
                  {hotelInfo?.HotelDetails?.HotelFacilities[0]
                    ?.split(",")
                    .map((facility, index) => (
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
                        {facility.trim()}
                      </p>
                      // <li key={index}>{facility}</li>
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          // onClick={handleClickBooking}
          onClick={handleOpen} // Open modal on button click
          style={{ border: "none" }}
        >
          Pay Now
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box
          className="modalStyle"
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Confirm Booking
          </Typography>
          <Typography id="confirmation-modal-description" sx={{ mt: 2, mb: 3 }}>
            Are you sure you want to confirm the booking?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                handleClickBooking();
                handleClose();
              }}
              variant="contained"
              sx={{ backgroundColor: "#21325D" }}
            >
              Confirm
            </Button>
            <Button
              sx={{ backgroundColor: "rgb(231,60,52)" }}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Hoteldescription;
