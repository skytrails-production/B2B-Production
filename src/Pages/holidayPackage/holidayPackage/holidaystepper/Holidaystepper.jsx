import React from "react";
import "./holidaystepper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import HolidayForm from "../holidayform/HolidayForm";

const Holidaystepper = () => {
  return (
    <div className="flightContainer">
      <Flex
        w="100%"
        h="50"
        mb="20"
        borderRadius="20px"
        m="auto"
        className="shadow-sm p-3 mb-5 bg-white rounded "
      >
        <Flex w="19%" h="90%">
          <Box w="25px" h="25" borderRadius="50%" bg="#1DBCF0" color="white">
            <Text ml="6px">1</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Holiday Package Searchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhgffhhgf
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box w="25px" h="25" borderRadius="50%" bg="#1DBCF0" color="white">
            <Text ml="6px">2</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Holiday Package Result
          </Text>
        </Flex>
        <Spacer />

        <Flex w="19%" h="90%">
          <Box w="25px" h="25" borderRadius="50%" bg="#1DBCF0" color="white">
            <Text ml="6px">3</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Guest Details
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box w="25px" h="25" borderRadius="50%" bg="#1DBCF0" color="white">
            <Text ml="6px">4</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Review Booking
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box w="25px" h="25" borderRadius="50%" bg="#1DBCF0" color="white">
            <Text ml="6px">5</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Booking Confirmation
          </Text>
        </Flex>
      </Flex>
      <div>
        <HolidayForm />
      </div>
      {/* <div className='flightNavBarContainer'>
  <HotelAllRoute  />
  </div> */}
    </div>
  );
};

export default Holidaystepper;
