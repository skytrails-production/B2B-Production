import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {  Flex, Spacer, Text } from "@chakra-ui/react";
import HolidayPackagedetail from "../holidaypackageresult/HolidayPackagedetail";
import HolidatLeftPackage from "../holidaypackageresult/HolidatLeftPackage";
import Holidayreviewbookingdetail from './Holidayreviewbookingdetail';

import Holidayreviewsalesummary from './Holidayreviewsalesummary';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Divider from '@mui/material/Divider';
import { Grid, Radio, Typography, Button } from '@mui/material';





const HolidayGuestDetail = () => {
  return (
    <div>
    <div className="flightContainer">
        {/* step by step updating part */}

        <Flex
          w="100%"
          h="50"
          mb="20"
          borderRadius="20px"
          m="auto"
          className="shadow-sm p-3 mb-5 backgroundColor-white rounded "
        >
          <Flex w="19%" h="90%">
            <Box width="25px" height="25px" borderRadius="50%" backgroundColor="#1DBCF0" color="white">
              <Text ml="6px">1</Text>
            </Box>
            <Text ml="10" fontWeight="bold">
              Holiday Package Search
            </Text>
          </Flex>
          <Spacer />
          <Flex w="19%" h="90%">
            <Box width="25px" height="25px" borderRadius="50%" backgroundColor="#1DBCF0" color="white">
              <Text ml="6px">2</Text>
            </Box>
            <Text ml="10" fontWeight="bold">
              Holiday Package Result
            </Text>
          </Flex>
          <Spacer />

          <Flex w="19%" h="90%">
            <Box width="25px" height="25px" borderRadius="50%" backgroundColor="#1DBCF0" color="white">
              <Text ml="6px">3</Text>
            </Box>
            <Text ml="10" fontWeight="bold">
              Guest Details
            </Text>
          </Flex>
          <Spacer />
          <Flex w="19%" h="90%">
            <Box width="25px" height="25px" borderRadius="50%" backgroundColor="#1DBCF0" color="white">
              <Text ml="6px">4</Text>
            </Box>
            <Text ml="10" fontWeight="bold">
              Review Booking
            </Text>
          </Flex>
          <Spacer />
          <Flex w="19%" h="90%">
            <Box width="25px" height="25px" borderRadius="50%" backgroundColor="#1DBCF0" color="white">
              <Text ml="6px">5</Text>
            </Box>
            <Text ml="10" fontWeight="bold">
              Booking Confirmation
            </Text>
          </Flex>
        </Flex>
        <div>
          <Grid container spacing={3}>
            <Grid sm={12} xs={12} md={9} item>
              <Box>
                <Holidayreviewbookingdetail/>
              </Box>
            </Grid>
            <Grid sm={12} xs={12} md={3} item>
              
              <Box>
              <Holidayreviewsalesummary />
              </Box>
              
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default HolidayGuestDetail
