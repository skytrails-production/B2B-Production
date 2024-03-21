import React, { useState, useEffect } from "react";
import Stepper from "../../../Components/Stepper";
import { Box, Grid, Typography, Link, Button } from "@mui/material";
import BusSaleSummary from "../busPassengerDetail/BusSaleSummary";
import Buscancellation from "../BusResult/Buscancellation";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  busBookAction,
  clearBusSearchReducer,
} from "../../../Redux/busSearch/busSearchAction";
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import "./busreviewbooking.css";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../../Constants/constant";
import { motion } from "framer-motion";
import {swalModal} from "../../../utils/swal"

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

const BusReviewBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [publishedPrice, setPublishedPrice] = useState(0);
  const [offerPrice, setOfferedPrice] = useState(0);
  const [tds, setTds] = useState(0);
  const [userData, setUserData] = useState(null);
  const isNavigate = reducerState?.getBusResult?.isLoadingBook || true;

  // console.log("======================", reducerState);
  const busBlockData =
    reducerState?.getBusResult?.busBlock?.data?.data?.BlockResult;
  // console.log("************************", busBlockData);
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  // console.log(busFullData, "bus full data");
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const passengerCount = parsedSeatData?.blockedSeatArray.length;
  const resultIndex = parsedSeatData?.resultIndex;
  const boardingPoint = parsedSeatData?.selectedOrigin;
  const droppingPoint = parsedSeatData?.selectedDropPoint;
  const seatObject = parsedSeatData?.blockedSeatArray;
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.bus;

  // console.log(seatObject);
  // console.log(reducerState, "reducer state");

  const published = seatObject.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return accumulator + currentValue?.Price?.BasePrice;
  },
  0);
  const offeredPrice = seatObject.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue?.Price?.OfferedPrice;
    },
    0
  );
  const tdsTotal =
    markUpamount +
    seatObject.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.Price?.TDS;
    }, 0);
  useEffect(() => {
    setOfferedPrice(offeredPrice);
    setPublishedPrice(published);
    setTds(tdsTotal);
  }, []);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  //    // Make a GET request to the API endpoint
  //    axios
  //  .get(`${apiURL.baseURL}/skyTrails/user/${userId}`)
  //      .then((response) => {
  //        // Handle the response data
  //        const user = response.data.data;
  //        setUserData(user);
  //        console.log("user data", response?.data?.data?.balance);
  //      })
  //      .catch((error) => {
  //        console.error(error);
  //        // Handle errors, e.g., display an error message
  //      });
  //  }, []);
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;
  const handleBookBus = async () => {
    try {
      const payload = {
        EndUserIp: reducerState?.ip?.ipData,
        ResultIndex: JSON.stringify(resultIndex),
        TraceId: busBlockData?.TraceId,
        TokenId: reducerState?.ip?.tokenData,
        BoardingPointId: boardingPoint,
        DroppingPointId: droppingPoint,
        Passenger: busBlockData?.Passenger,
      };
      if (userBalance >= tds + publishedPrice) {
        dispatch(busBookAction(payload));

        // If dispatch is successful, navigate to the specified route
        // navigate("/Busbookingconfirmation");

        // if (userId) {
        //   const balancePayload = {
        //     _id: userId,
        //     amount: tds + publishedPrice,
        //   };

        //   // dispatch(balanceSubtractRequest(balancePayload));
        // }
      } else {
        // swalModal("py","Balance is insufficient for this transaction.",true);
        Swal.fire({
          // icon: "error",
          // title: "Oops...",
          text: "Balance is insufficient for this transaction.",
          footer: "Please recharge",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Login");
          }
        });
      }

      // Dispatch the busBookAction asynchronously

      // Log the reducerState
    } catch (error) {
      // Handle any errors that occurred during dispatching the action
      console.error("Error occurred while booking bus:", error);
    }
  };

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorCode === 0 &&
      reducerState?.getBusResult?.showSuccessMessage
    ) {
      if (userId) {
        const balancePayload = {
          _id: userId,
          amount: tds + publishedPrice,
        };

        dispatch(balanceSubtractRequest(balancePayload));

        Swal.fire({
          icon: "success",
          timer: 3000,
          title: "Booking Sucessfull",
          text: "Thank you for booking with The Skytrails",
        });
        navigate("/Busbookingconfirmation");
      }
    } else if (
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorCode === 0 &&
      reducerState?.getBusResult?.showSuccessMessage === false
    ) {
      dispatch(clearBusSearchReducer());
      navigate("/");
    } else if (
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorCode !== undefined
    ) {
      // swalModal("py",reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error?.ErrorMessage,true)
      swalModal("py","Your bus reservation couldn't be processed. Double-check your details and attempt booking again.",true)
      // Swal.fire({
      //   icon: "error",
      //   title: "Booking Failed",
      //   text: reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
      //     ?.ErrorMessage,
      // });
      dispatch(clearBusSearchReducer());
      navigate("/");

      // console.warn(
      //   reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
      //     ?.ErrorMessage,
      //   "bussssssssssssssssss"
      // );
    }
  }, [reducerState?.getBusResult?.busBook]);

  const selectedBus = busFullData?.BusResults?.find(
    (bus) => bus?.ResultIndex === resultIndex
  );
  // console.log(selectedBus, "selectedBus")
  const cancellationPolicy = selectedBus?.CancellationPolicies;

  // console.log(cancellationPolicy, "cancel policy");
  const departureDate = dayjs(selectedBus?.DepartureTime);
  const arrivalDate = dayjs(selectedBus?.ArrivalTime);
  const storedPassengerData = JSON.parse(sessionStorage.getItem("busPassName"));
  // console.log(cancellationPolicy, "cancel policy");
  // Format the dates
  const departureFormattedDate = departureDate.format("DD MMM, YY");
  const arrivalFormattedDate = arrivalDate.format("DD MMM, YY");
  useEffect(() => {
    if (
      storedPassengerData === undefined ||
      cancellationPolicy === undefined ||
      userId == undefined
    ) {
      navigate("/");
    }
  });

  const cancelFromDate =
    cancellationPolicy !== undefined
      ? dayjs(cancellationPolicy[0]?.FromDate.slice(0, 9))
      : undefined;
  const cancelToDateTime =
    cancellationPolicy !== undefined
      ? dayjs(cancellationPolicy[0]?.FromDate.slice(11, 18))
      : undefined;
  const cancelFromDateFormatted = cancelFromDate?.format("DD MMM, YY");
  const cancelToDateTimeFormatted = cancelToDateTime?.format("DD MMM, YY");

  // console.warn(reducerState, "reducer Statemkskjdnvd");
  return (
    <>
      <div className="container-xxl margin-pecentage">
        <div className="row">
          <motion.div
            variants={variants}
            initial="initial"
            whileInView="animate"
            className="col-lg-9 order-lg-1  order-md-2 order-sm-2"
          >
            <motion.div variants={variants} className="col-lg-12">
              <div className="headingReview-new">
                <p>Review Booking</p>
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-12 my-3">
              <div className="busAllDetail">
                <div>
                  <p>Bus Details</p>
                  <span>{selectedBus?.TravelName}</span>
                </div>
                <div>
                  <p>Origin</p>
                  <span>
                    {selectedBus?.BoardingPointsDetails &&
                      selectedBus.BoardingPointsDetails.length > 0 &&
                      selectedBus.BoardingPointsDetails[0].CityPointLocation}
                  </span>
                </div>
                <div>
                  <p>Destination</p>
                  <span>
                    {selectedBus?.DroppingPointsDetails &&
                      selectedBus.DroppingPointsDetails.length > 0 &&
                      selectedBus.DroppingPointsDetails[0].CityPointLocation}
                  </span>
                </div>
                <div>
                  <p>Departure Date Time</p>
                  <span>{departureFormattedDate}</span>
                </div>
                <div>
                  <p>Arrival Date Time</p>
                  <span>
                    <span>{arrivalFormattedDate}</span>
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-12 my-3">
              <div className="passengerDetBox">
                <p>Passenger Details</p>
                <span>{passengerCount} Adult(s)</span>
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-8 my-3">
              {storedPassengerData.map((passenger, index) => (
                <div key={index} className="passDetails">
                  <div>
                    <p>Name:</p>
                    <p>Age:</p>
                    <p>Email:</p>
                  </div>
                  <div>
                    <span>
                      {passenger.FirstName} {passenger.LastName}
                    </span>
                    <span>{passenger.Age} Years Old</span>
                    <span>{passenger.Email}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={variants} className="col-lg-12 my-3">
              <div className="passengerDetBox">
                <p>Cancellation Policy</p>
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-8 my-3">
              <div className="CancelRulesBus">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Cancellation Time</th>
                      <th scope="col">Cancellation Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationPolicy?.map((item, index) => {
                      const cancelFromDate = dayjs(item?.FromDate.slice(0, 10));
                      const cancelToDateTime = dayjs(item?.ToDate.slice(0, 10)); // Make sure ToDate is the correct property name
                      const cancelFromDateFormatted =
                        cancelFromDate.format("DD MMM, YY");
                      const cancelToDateTimeFormatted =
                        cancelToDateTime.format("DD MMM, YY");

                      return (
                        <tr key={index}>
                          <td>
                            from {item?.FromDate.slice(11, 16)}{" "}
                            {cancelFromDateFormatted} to{" "}
                            {item.ToDate.slice(11, 16)}{" "}
                            {cancelToDateTimeFormatted}
                          </td>
                          <td>{item?.CancellationCharge}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div variants={variants} className="col-lg-12 mt-4 bookBus-new">
              <button onClick={handleBookBus}>Book Ticket</button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-lg-3 order-lg-2 mb-md-4 mb-sm-4  order-md-1 order-sm-1"
          >
            <BusSaleSummary />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BusReviewBooking;

// <div className="flightContainer">
//   <Box>
//     <Stepper />
//   </Box>
//   <Box sx={{ flexGrow: 1 }}>
//     <Grid container spacing={2}>
//       <Grid item xs={9}>
//         <Box className="Bus_box">

//           <div
//             style={{
//               width: '95%',
// height: '60px',
// paddingLeft: '20px',
// paddingRight: '20px',
// paddingTop: '14px',
// paddingBottom: '14px',

//               background: "#DBE5FF",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.16)",
//               borderRadius: "8px",
//               justifyContent: "flex-start",
//               alignItems: "center",

//               display: "flex",
//             }}
//           >
//             <div
//               style={{
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 gap: "188px",
//                 display: "flex",
//               }}
//             >
//               <div
//                 style={{
//                   color: "#21325D",
//                   fontSize: "28px",
//                   fontFamily: "Montserrat",
//                   fontWeight: 600,
//                   wordWrap: "break-word",
//                 }}
//               >
//                 Review Booking
//               </div>
//             </div>
//           </div>

//           <Box display="flex" justifyContent="space-between" width="95%">
//             <Box
//               mt={2}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//               }}
//             >
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Travel:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Ashok Travels Mandsaur Group
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   From:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Delhi
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Departure:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   11 Jan, 2023, 19:00
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Seat No.(s):
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   1
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Boarding Point:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Others
//                 </Typography>
//               </Box>
//             </Box>
//             <Box
//               mt={2}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//               }}
//             >
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Bus Type:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Ashok Travels Mandsaur Group
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   To:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Delhi
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Arrival:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   12 Jan, 2023, 13:00
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   No. of Pax:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   1
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Dropping Point:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Borivali West
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         <Box className="Bus_box" mt={2}>
//           <Box>
//             {/* <Typography
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 color: "#252525",
//               }}
//             >
//               Passenger Details
//             </Typography> */}
//             <div
//               style={{
//                 width: '95%',
// height: '60px',
// paddingLeft: '20px',
// paddingRight: '20px',
// paddingTop: '14px',
// paddingBottom: '14px',
//                 background: "#E4E4E4",
//                 borderRadius: "8px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <div
//                 style={{
//                   color: "black",
//                   fontSize: "24px",
//                   fontFamily: "Montserrat",
//                   fontWeight: 600,
//                   wordWrap: "break-word",
//                 }}
//               >
//                 Passenger Details
//               </div>
//               <div
//                 style={{
//                   color: "#0048FF",
//                   fontSize: "16px",
//                   fontFamily: "Montserrat",
//                   fontWeight: 600,
//                   wordWrap: "break-word",
//                 }}
//               >
//                 (1 Adult)
//               </div>
//             </div>
//           </Box>

//           <Box
//             display="flex"
//             justifyContent="space-between"
//             marginTop="10px"
//           >
//             <Box mt={2} textAlign="left">
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Name:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Shivsm singh
//                 </Typography>
//               </Box>
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Phone No:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   +91 89782 57788
//                 </Typography>
//               </Box>
//             </Box>

//             <Box mt={2} textAlign="left">
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Gender:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Male
//                 </Typography>
//               </Box>
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Email:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Sdfser@gmail.com
//                 </Typography>
//               </Box>
//             </Box>

//             <Box mt={2} textAlign="left">
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Age:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   40
//                 </Typography>
//               </Box>
//               <Box display="flex">
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#666666",
//                   }}
//                 >
//                   Address:
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     color: "#006FFF",
//                   }}
//                   ml={2}
//                 >
//                   Chor Bazar ke Piche Adher Gali Kali Pahdai ke Uper
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         {/* <Box className="Bus_box" mt={2} style={{border:"10px solid red"}}>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 color: "#252525",
//               }}
//             >
//               Cancellation Policy:
//             </Typography>
//           </Box>
//           <Box mt={2}>
//             <Buscancellation />
//           </Box>
//         </Box> */}
//         <Box
//           className="Bus_box"
//           mt={2}
//           style={{ borderRadius: "8px", padding: "16px", width: "95%" }}
//         >
//           <Typography
//             sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               color: "#252525",
//             }}
//           >
//             Cancellation Policy:
//           </Typography>
//           <Box mt={2}>
//             <Buscancellation />
//           </Box>
//         </Box>

//         <Box className="Bus_box" mt={2}>
//           <div
//             style={{
//               width: 822,
//               height: 49,
//               paddingLeft: 20,
//               paddingRight: 20,
//               paddingTop: 10,
//               paddingBottom: 10,
//               background: "#DFE6F7",
//               borderRadius: 4,
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: 10,
//               display: "inline-flex",
//             }}
//           >
//             <div
//               style={{
//                 color: "black",
//                 fontSize: 24,
//                 fontFamily: "Montserrat",
//                 fontWeight: "600",
//                 wordWrap: "break-word",
//               }}
//             >
//               Terms & Conditions{" "}
//             </div>
//           </div>
//           <div
//             style={{
//               color: "#E73C33",
//               fontSize: 16.14,
//               fontFamily: "Montserrat",
//               fontWeight: "500",
//               wordWrap: "break-word",
//               marginTop: "10px",
//               marginBottom: "10px",
//             }}
//           >
//             Note: You can earn more commission if you checked Travel
//             Insurance
//           </div>
//           {/* <Box display="flex">
//             <ReadMoreIcon />
//             <Typography
//               ml={2}
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: "bold",
//                 color: "#252525",
//               }}
//             >
//               I have reviewed and agreed on the rates and commission offered
//               for this booking.
//             </Typography>
//           </Box> */}
//           <div
//             style={{
//               width: 728,
//               height: 44,
//               paddingLeft: 24,
//               paddingRight: 24,
//               paddingTop: 12,
//               paddingBottom: 12,
//               border: "1px #BBBBBB solid",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: 5,
//               display: "inline-flex",
//               marginTop: "10px",
//               marginBottom: "20px",
//             }}
//           >
//             <input className="inputSelect" type="checkbox" />
//             <div
//               style={{
//                 color: "black",
//                 fontSize: 16.14,
//                 fontFamily: "Montserrat",
//                 fontWeight: "500",
//                 wordWrap: "break-word",
//               }}
//             >
//               I have reviewed and agreed on the fare and commission offered
//               on this booking.
//             </div>
//           </div>
//         </Box>
//       </Grid>
//       <Grid item xs={3}>
//         <BusSaleSummary />
//       </Grid>
//     </Grid>
//   </Box>
//   {/* <form action="/Busbookingconfirmation"> */}

//   <div
//     style={{
//       display: "flex",
//       marginTop: "10px",
//       marginBottom: "10px",
//       gap: "40px",
//     }}
//   >
//     <div
//       style={{
//         color: "#000080",
//         fontSize: 20.14,
//         fontFamily: "Montserrat",
//         fontWeight: "500",
//         wordWrap: "break-word",
//         marginLeft: "15px",
//       }}
//     >
//       You have 2,000,000 as your Cash balance
//     </div>
//     <form
//       // action="/Flightbookingconfirmation"
//       className="formFlightSearch"
//       textAlign="center"
//     >
//       <button
//         style={{
//           width: 241,
//           height: 63,
//           paddingLeft: 63.63,
//           paddingRight: 63.63,
//           paddingTop: 21.21,
//           paddingBottom: 21.21,
//           background: "#21325D",
//           borderRadius: 5.3,
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 15.91,
//           display: "inline-flex",
//           border: "1px solid #21325D",
//           color: "white",
//           cursor: "pointer",
//           marginTop: "-35px",
//         }}
//         type="submit"
//         onClick={handleBookBus}
//       >
//         Book Ticket
//       </button>
//     </form>
//   </div>
// </div>
