import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Flex, Spacer, Text, HStack, Box } from "@chakra-ui/react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import HolidayPackagedetail from "../holidaypackageresult/HolidayPackagedetail";
import HolidatLeftPackage from "../holidaypackageresult/HolidatLeftPackage";
import { Box as MuiBox, Typography, Button } from "@mui/material";
import Bookingdetailpackage from './Bookingdetailpackage';
import { useSelector } from 'react-redux';
import colors from "../../../color/color";
const Holidaybooknow = () => {
  const reducerState = useSelector((state) => state);
  // console.log("package Req", reducerState);

  const packageId = reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data?._id

  const userId = reducerState?.logIn?.loginData?.data?.data?.id

  // console.log("package Id", packageId);
  // console.log("user Id", userId);


  return (
    <div className='container-fluid margin-pecentage'>
      <div className="row">
        <Bookingdetailpackage />
      </div>
    </div>
  );
}

export default Holidaybooknow;
