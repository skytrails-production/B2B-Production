import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text, HStack } from "@chakra-ui/react";

// import HotelNavBar from './HotelNavbar/HotelNavBar';
// import OneWay from './HotelForm/OneWay';
// import { NavLink, Routes,Route } from 'react-router-dom';
// import HotelAllRoute from './HotelAllRoute/HotelAllRought';
import Hotelresults from "../hotelresult/Hotelresult";

import { clearHotelReducer } from "../../../../Redux/Hotel/hotel";
import { useDispatch } from "react-redux";

const HotelSearchs = () => {

  return (
    <div className="container-fluid margin-pecentage">
    <Hotelresults/>
     
    </div>
  );
};

export default HotelSearchs;
