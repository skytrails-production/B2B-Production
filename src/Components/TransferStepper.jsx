import React from "react";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import color from "../color/color";
const TransferStepper = () => {
  return (
    <div>
      <Flex
        w="100%"
        h="50"
        mb="20"
        borderRadius="20px"
        m="auto"
        className="shadow-sm p-3 mb-5 bg-white rounded "
      >
        <Flex w="19%" h="90%">
          <Box
            display="flex"
            w="25px"
            h="25px"
            borderRadius="50%"
            style={{ backgroundColor: color.bluedark }}
            color="white"
          >
            <Text ml="6px" textAlign="center">
              1
            </Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Transfer Search
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box
            w="25px"
            h="25"
            borderRadius="50%"
            bg="#1DBCF0"
            color="white"
            style={{ backgroundColor: color.bluedark }}
          >
            <Text ml="6px">2</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Transfer Result
          </Text>
        </Flex>
        <Spacer />

        <Flex w="19%" h="90%">
          <Box
            w="25px"
            h="25"
            borderRadius="50%"
            bg="#1DBCF0"
            color="white"
            style={{ backgroundColor: color.bluedark }}
          >
            <Text ml="6px">3</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Passenger Details
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box
            w="25px"
            h="25"
            borderRadius="50%"
            bg="#1DBCF0"
            color="white"
            style={{ backgroundColor: color.bluedark }}
          >
            <Text ml="6px">4</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Review Booking
          </Text>
        </Flex>
        <Spacer />
        <Flex w="19%" h="90%">
          <Box
            w="25px"
            h="25"
            borderRadius="50%"
            bg="#1DBCF0"
            color="white"
            style={{ backgroundColor: color.bluedark }}
          >
            <Text ml="6px">5</Text>
          </Box>
          <Text ml="10" fontWeight="bold">
            Booking Confirmation
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default TransferStepper;
