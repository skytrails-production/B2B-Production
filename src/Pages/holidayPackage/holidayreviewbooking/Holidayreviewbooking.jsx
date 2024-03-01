import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Flex, Spacer, Text, HStack, Box } from "@chakra-ui/react";
import HolidayPackagedetail from "../holidaypackageresult/HolidayPackagedetail";
import HolidatLeftPackage from "../holidaypackageresult/HolidatLeftPackage";
import Holidayreviewbookingdetail from "./Holidayreviewbookingdetail";
import Holidayreviewsalesummary from "./Holidayreviewsalesummary";
import { styled } from "@mui/material/styles";
import { Box as MuiBox } from "@mui/material";
import Paper from "@mui/material/Paper";
import color from "../../../color/color";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import {Holidaysalesummary} from "../holidayguestdetail/Holidaysalesummary"
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
const HolidayGuestDetail = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  // console.warn("Reducer state", reducerState);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  useEffect(() => {
    if (userId) {
      const payload = userId;

      // console.log(payload,'userIdiii');
      dispatch(getUserDataAction(payload));
    }
  }, []);
  useEffect(() => {
    console.warn("Reducer state");
  }, [reducerState.packageBook, reducerState.packageBookingRequest])
  return (
    <div className="container-fluid margin-pecentage">
      <div className="row">
        <div className="col-lg-9">
          <Holidayreviewbookingdetail />
        </div>
        <div className="col-lg-3">
          <Holidayreviewsalesummary />
        </div>
      </div>
    </div>

  );
};

export default HolidayGuestDetail;
