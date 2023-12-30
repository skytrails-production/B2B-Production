import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import HolidayPackagedetail from "../holidaypackageresult/HolidayPackagedetail";
import HolidatLeftPackage from "../holidaypackageresult/HolidatLeftPackage";
import { Box, Typography, Button } from "@mui/material";
import Bookingdetailpackage from './Bookingdetailpackage';

const Holidaybooknow = () => {
  return (
    <div className='container-fluid margin-pecentage'>
      <div className="row">
        <div className='col-lg-9'>
          <HolidatLeftPackage />
        </div>
        <div className='col-lg-3'>
          <Bookingdetailpackage />
        </div>
      </div>
    </div>
  )
}

export default Holidaybooknow;
