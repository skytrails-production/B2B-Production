import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Modal } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Flex, Spacer, Text } from "@chakra-ui/react";
// import Popularfilter from '../flightresult/Popularfilter';
import Sailsummary from "./Sailsummary";
import { useDispatch, useSelector } from "react-redux";
import Hoteldescription from "./Hoteldescription";

import { getUserDataAction } from "../../../../../Redux/Auth/UserDataById/actionUserData";

import "./guestdetail.css";
//import { clearHotelReducer } from "../../../Redux/Hotel/hotel";
const GuestdetailTbo = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #89CFF0",
    boxShadow: 24,
    borderRadius: 8,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;

  const getBookingDetails = reducerState?.hotelSearchResult;

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.hotel;
  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.Error?.ErrorCode == 0
    ) {
      setTimeout(() => {
        if (userId) {
          const payload = userId;
          dispatch(getUserDataAction(payload));
        }
        // navigate("/")
      }, 2000);
    }
  }, [
    reducerState?.hotelSearchResult?.hotelDetails?.data?.data
      ?.GetBookingDetailResult,
  ]);

  return (
    <div className="container-fluid margin-pecentage">
      <div className="row">
        <div className="col-lg-9">
          <Hoteldescription />
        </div>
        <div className="col-lg-3">
          <Sailsummary />
        </div>
      </div>
    </div>
  );
};

export default GuestdetailTbo;

{
  /* <Modal
            open={bookingStatus == 1 ? true : false}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 350 }}>
              <img
                src={successGif}
                alt="sucess gif"
                style={{ width: "100%" }}
              />
              <Typography
                textAlign="center"
                paddingLeft={3}
                paddingTop={2}
                fontWeight="bold"
              >
                Thanku!!Your booking is done..
              </Typography>
            </Box>
          </Modal> */
}
