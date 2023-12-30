import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Flex, Spacer, Text } from "@chakra-ui/react";
// import Popularfilter from '../flightresult/Popularfilter';
import Sailsummary from "../guestdetail/Sailsummary";
import Reviewdescription from "./Reviewdescription";
import "./review.css";
import { useSelector } from "react-redux";
import HotelLoading from "../hotelLoading/HotelLoading";



const Guestdetail = () => {
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });


  // console.log(reducerState?.hotelSearchResult, "hotelreducer shaan")
  // const hotelll = reducerState?.hotelSearchResult?.isLoadingHotelRoom
  // console.log(hotelll, "hotelll")
  // useEffect(() => {
  //   if (reducerState?.hotelSearchResult?.isLoadingHotelRoom == true) {
  //     setLoader(true);
  //   }
  // }, [reducerState?.hotelSearchResult?.isLoadingHotelRoom]);

  // useEffect(() => {
  //   if (
  //     reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
  //       ?.HotelRoomsDetails.length >= 0
  //   ) {
  //     setLoader(false);
  //   }
  // }, [
  //   reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
  //     ?.HotelRoomsDetails,
  // ]);

  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const data = storedFormData?.dynamicFormData[0];
  // console.log(storedFormData)
  return (
    <React.Fragment>
      {loader ? (
        <HotelLoading />
      ) : (

        <div className="container-fluid margin-pecentage">
          <div className="row">
            <div className="col-lg-12">
              <div className="hotelBookNowOuter">
                <div className="hotelBookNowHeader">
                  <p>Your Search criteria:{storedFormData?.city},{' '} India</p>
                  <p>Duration: {storedFormData?.night}{' '}Nights</p>
                  <p>{storedFormData?.checkIn}- {storedFormData?.checkOut}</p>
                  <p>Guest(s): {totalAdults}Adult(s) </p>
                  <p>Room(s): {storedFormData?.room}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row gy-4">
            <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2">
              <Reviewdescription />
            </div>
            <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1">
              <Sailsummary />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Guestdetail;
