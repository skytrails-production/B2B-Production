import Stepper from "../../../Components/Stepper";
import React, { useState } from "react";
import { Box, Grid, Typography, Link, Button } from "@mui/material";
import BusSaleSummary from "../busPassengerDetail/BusSaleSummary";
import Buscancellation from "../BusResult/Buscancellation";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import BusStepper from "../../../Components/BusStepper";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { busBookBack, busBookDetailsAction, clearBusSearchReducer } from "../../../Redux/busSearch/busSearchAction";
import userApi from "../../../Redux/API/api";
import { useEffect } from "react";
import Busbookingloader from "./Busbookingloader";
import axios from "axios";
import Swal from "sweetalert2";
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


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


const Busbookingconfirmation = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const passengerNames = JSON.parse(sessionStorage.getItem("busPassName"));
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.bus;
  console.log("passengerNames", passengerNames);
  // console.log("dispatchhhhhhh", dispatch);
  // console.log("_______________", reducerState);
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  //   const busId =
  //     reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.BusId;
  const [busId, setBusId] = useState(0);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  useEffect(() => {

    console.warn(
      reducerState
      , "testing Reducer state...");
    if (reducerState?.getBusResult?.isLoadingBook == true) setLoader(true);

  }, [reducerState?.getBusResult?.isLoadingBook]);
  useEffect(() => {
    if (reducerState?.getBusResult?.busBook?.data?.data?.BookResult) {
      if (userId) {
        const payload = userId;

        // console.log(payload,'userIdiii');
        dispatch(getUserDataAction(payload));

      }
      handleGetBookingDetails(
        reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.BusId
      );
     
      // console.log("busssssssssIdddd", busId);
      setLoader(false);
    }
  }, [reducerState?.getBusResult?.busBook?.data?.data?.BookResult]);
  useEffect(() => {
    if (
      reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult
    ) {
      busBookSave();
    }
    dispatch(busBookBack())
  }, [
    reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult,
  ]);

  const handleGetBookingDetails = (busIdParam) => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: busFullData?.TraceId,
      BusId: busIdParam,
      SeatId: 0,
      IsBaseCurrencyRequired: false,
    };
    // busBookSave()
    dispatch(busBookDetailsAction(payload));
  };

  const busBookSave = () => {
    const getDetails =
      reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult
        ?.Itinerary;
    const totalAmount =
      reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult
        ?.Itinerary?.Price?.PublishedPrice;

    const payloadSavedata = {
      userId: reducerState?.logIn?.loginData?.data?.data?.id,
      destination: getDetails?.Destination,
      origin: getDetails?.Origin,
      departureTime: getDetails?.DepartureTime,
      arrivalTime: getDetails?.ArrivalTime,
      travelName: getDetails?.TravelName,

      busType: getDetails?.BusType,
      pnr: getDetails?.TicketNo,
      busId: getDetails?.BusId,
      noOfSeats: getDetails?.NoOfSeats,
      amount: totalAmount + markUpamount,
      passenger: getDetails?.Passenger.map((item, index) => {
        return {
          title: item?.Title,
          firstName: item?.FirstName,
          lastName: item?.LastName,
          Email: passengerNames[index]?.Email,
          Phone: passengerNames[index]?.Phoneno,
          Address: item?.Address,
          seatNumber: item?.Seat?.SeatName,
          Price: item?.Seat?.Price?.PublishedPrice,
        };
      }),
      BoardingPoint: {
        Location: getDetails?.BoardingPointdetails?.CityPointLocation,
        Landmark: getDetails?.BoardingPointdetails?.CityPointLandmark,
        Address: getDetails?.BoardingPointdetails?.CityPointAddress,
        Contactnumber: getDetails?.BoardingPointdetails?.CityPointContactNumber,
      },
      CancelPolicy: getDetails?.CancelPolicy,
    };
    userApi.busBookingDataSave(payloadSavedata);
  };
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const passengerCount = parsedSeatData?.blockedSeatArray.length;
  const resultIndex = parsedSeatData?.resultIndex;
  const selectedBus = busFullData?.BusResults.find((bus) => bus.ResultIndex === resultIndex);
  console.log(selectedBus, "selectedBus")
  const cancellationPolicy = selectedBus?.CancellationPolicies;
  console.log(cancellationPolicy, "cancel policy")
  const departureDate = dayjs(selectedBus?.DepartureTime);
  const arrivalDate = dayjs(selectedBus?.ArrivalTime);
  console.log(cancellationPolicy, "cancel policy")
  // Format the dates
  const departureFormattedDate = departureDate.format("DD MMM, YY");
  const arrivalFormattedDate = arrivalDate.format("DD MMM, YY");
  const storedPassengerData = JSON.parse(sessionStorage.getItem("busPassName"));
  useEffect(() => {
    if (seatData === undefined || cancellationPolicy === undefined || storedPassengerData === undefined,resultIndex===undefined ||userId===undefined) {
      navigate("/")
    }
  })



  const cancelFromDate = cancellationPolicy !== undefined ? dayjs(cancellationPolicy[0]?.FromDate.slice(0, 9)) : undefined;
  const cancelToDateTime = cancellationPolicy !== undefined ? dayjs(cancellationPolicy[0]?.FromDate.slice(11, 18)) : undefined;
  const cancelFromDateFormatted = cancelFromDate?.format("DD MMM, YY");
  const cancelToDateTimeFormatted = cancelToDateTime?.format("DD MMM, YY");





  const handlePrint = () => {
    // Swal.fire({
    //   title: "Congratulation!",
    //   text: "Your Bus is booked",
    //   icon: "success"
    // }).then(() => {
    dispatch(clearBusSearchReducer());
    console.log("bus reducer cleared successfully", reducerState)
    navigate("/");
    // });
  }

  return (

    <>
      {loader ? (
        <Busbookingloader props={true} />
      ) : (
        <>


          <>
            <div className="container-xxl margin-pecentage">
              <div className="row">
                <motion.div variants={variants} initial="initial"
                  whileInView="animate" className="col-lg-9 order-lg-1  order-md-2 order-sm-2">
                  <div variants={variants} className="col-lg-12">
                    <div className="headingReview">
                      <p>Review Booking</p>
                    </div>
                  </div>
                  <motion.div variants={variants} className="col-lg-12 my-3">
                    <div className="busAllDetail">
                      <div>
                        <p>
                          Bus Details
                        </p>
                        <span>
                          {selectedBus?.TravelName}
                        </span>
                      </div>
                      <div>
                        <p>
                          Origin
                        </p>
                        <span>
                          {selectedBus?.BoardingPointsDetails &&
                            selectedBus.BoardingPointsDetails.length > 0 &&
                            selectedBus.BoardingPointsDetails[0].CityPointLocation}
                        </span>
                      </div>
                      <div>
                        <p>
                          Destination
                        </p>
                        <span>
                          {selectedBus?.DroppingPointsDetails &&
                            selectedBus.DroppingPointsDetails.length > 0 &&
                            selectedBus.DroppingPointsDetails[0].CityPointLocation}
                        </span>
                      </div>
                      <div>
                        <p>
                          Departure Date Time
                        </p>
                        <span>
                          {departureFormattedDate}
                        </span>
                      </div>
                      <div>
                        <p>
                          Arrival Date Time
                        </p>
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
                          <p>Email Id:</p>
                        </div>
                        <div>
                          <span>{passenger.FirstName} {passenger.LastName}</span>
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
                            const cancelFromDateFormatted = cancelFromDate.format("DD MMM, YY");
                            const cancelToDateTimeFormatted = cancelToDateTime.format("DD MMM, YY");

                            return (
                              <tr key={index}>
                                <td>
                                  from {item?.FromDate.slice(11, 16)} {cancelFromDateFormatted} to {item.ToDate.slice(11, 16)} {cancelToDateTimeFormatted}
                                </td>
                                <td>{item?.CancellationCharge}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>

                  <motion.div variants={variants} className="col-lg-12 mt-4 bookBus">
                    <button type="submit" onClick={handlePrint}>Print</button>
                  </motion.div>
                </motion.div>
                <div initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }} className="col-lg-3 mt-2 mb-md-4 mb-sm-4 order-lg-2  order-md-1 order-sm-1 ">
                  <BusSaleSummary />
                </div>
              </div>
            </div>
          </>




        </>
      )}
    </>

  );
};

export default Busbookingconfirmation;


