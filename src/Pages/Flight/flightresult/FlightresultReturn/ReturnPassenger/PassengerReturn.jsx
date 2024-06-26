import React, { useEffect, useState } from "react";
import "./passenger.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { NavLink, Routes, Route } from "react-router-dom";
import Leftdetail from "./Leftdetail";
import Rightdetail from "./Rightdetail";
import { useDispatch, useSelector, useReducer } from "react-redux";

import { useNavigate } from "react-router-dom";

import Flightnavbar from "../../../Flightnavbar";
const Flight = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("Props", props);
  const ResultIndex = sessionStorage.getItem("ResultIndex");

  
  return (
    <div className="container bg-light">
      <div className="row">
        <div className="col-lg-9">
          <Leftdetail />
        </div>
        <div className="col-lg-3">
          <Rightdetail />
        </div>
      </div>
    </div>


  );
};

export default Flight;
