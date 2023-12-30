import React from 'react'
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
function Holidaynavbar() {
  return (
    <div style={{width:"80%",margin:"auto"}}>
      
      
      <Box
            position="fixed"
            width={"80%"}
            display="flex"
            justifyContent={"space-around"}
            boxShadow="base"

           height="80px"
            top={200}
             background="#21325D"
            zIndex={4}
           margin={"auto"}
           
          >
            <HStack p="5px">
              <Box
                display="flex"
                justifyContent="center"
                w="25px"
                h="25px"
                borderRadius="50%"
                bg="#0096FF"
                color="white"
              >
                <Text>1</Text>
              </Box>

              <Box color="white" fontWeight="bold">
              Holiday Package Search
              </Box>
            </HStack>
            <HStack p="5px">
              <Box
                display="flex"
                justifyContent="center"
                // align="center"
                w="25px"
                h="25px"
                borderRadius="50%"
                bg="#0096FF"
                color="white"
              >
                <Text>2</Text>
              </Box>

              <Box fontWeight="normal" color="white">Holiday package Result</Box>
            </HStack>
            <HStack p="5px">
              <Box
                display="flex"
                justifyContent="center"
                w="25px"
                h="25px"
                borderRadius="50%"
                bg="#0096FF"
                color="white"
              >
                <Text>3</Text>
              </Box>

              <Box fontWeight="normal" color="white">Guest Details</Box>
            </HStack>
            <HStack p="5px">
              <Box
                display="flex"
                justifyContent="center"
                // align="center"
                w="25px"
                h="25px"
                borderRadius="50%"
                bg="#0096FF"
                color="white"
              >
                <Text>4</Text>
              </Box>

              <Box fontWeight="normal" color="white">Review Booking</Box>
            </HStack>
            <HStack p="5px">
              <Box
                display="flex"
                justifyContent="center"
                // align="center"
                w="25px"
                h="25px"
                borderRadius="50%"
                bg="#0096FF"
                color="white"
              >
                <Text>5</Text>
              </Box>

              <Box fontWeight="normal" color="white">Booking Confirmation</Box>
            </HStack>
          </Box>
    </div>
  )
}

export default Holidaynavbar
