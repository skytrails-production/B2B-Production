import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { BanerImage } from "../../banner";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import "./Banner.css";
const Banner = () => {
  const reducerState = useSelector((state) => state);

  return (
    <Flex
      
      
      bg="red.500"
      className="banners"
    >
      {BanerImage.map(({ avatar }, index) => {
        return (
          <Box w="100%" h="28%" className="bannerImgBox" key={index}>
            <motion.img
              style={{ width: "100%", height: "100%"}}
              src={avatar}
              alt="Banner"
              initial={{ opacity: 0, translateY: -100 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 2, delay: 1 }} // Adjust the delay for the slow-motion effect
             
            />


          </Box>
        );
      })}
    </Flex>
  );
};

export default Banner;
