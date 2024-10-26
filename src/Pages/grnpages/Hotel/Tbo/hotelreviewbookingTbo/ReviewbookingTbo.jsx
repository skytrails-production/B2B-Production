import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Flex, Spacer, Text } from "@chakra-ui/react";
// import Popularfilter from '../flightresult/Popularfilter';
import Sailsummary from "../guestdetailTbo/Sailsummary";
import Reviewdescription from "./Reviewdescription";
import "./review.css";
import { useDispatch, useSelector } from "react-redux";
import HotelLoading from "../../hotelLoading/HotelLoading";
import { useLocation } from 'react-router-dom';
import { hotelBlockRoomAction } from "../../../../../Redux/Hotel/hotel";



const Guestdetail = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const blockroomPayload = location.state;
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });
  const dispatch=useDispatch()
  useEffect(()=>{
 dispatch(hotelBlockRoomAction(blockroomPayload));
  },[])
  

  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const data = storedFormData?.dynamicFormData[0];
 
  return (
    <React.Fragment>
      {loader ? (
        <HotelLoading />
      ) : (

        <div className="container-fluid margin-pecentage">
         

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
