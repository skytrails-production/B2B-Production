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
import OneWay from "../FlightForm/OneWay";
import { NavLink, Routes, Route } from "react-router-dom";
import Leftdetail from "./Leftdetail";
import Rightdetail from "./Rightdetail";
import { useDispatch, useSelector, useReducer } from "react-redux";

import { useNavigate } from "react-router-dom";
import Flightnavbar from "../Flightnavbar";
const Flight = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mealamount, setMealamount] = useState(0);
  // console.log("Props", props);
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  // console.log("reducerStateDemount", reducerState);
  // console.log("resultIndex", ResultIndex);
  function backRoute() {
    navigate("/FlightResult");
  }

  // function setaount(price) {
  //   console.log("setaount", setaount);
  //   setTotalAmount((prevAmount) => prevAmount + price);
  // }

  function setamount(price) {
    console.log("setaount", price);
    setTotalAmount((prevAmount) => prevAmount + price);
  }

  function setmeal(price) {
    setMealamount((prevamount) => 
      prevamount + price)
  }

  return (
    <div className="container-fluid margin-pecentage">
      <div className="row">
        <div className="col-lg-9">
          <Leftdetail totalAmount={totalAmount} setamount={setTotalAmount}  mealamount={mealamount} setmeal={setMealamount}/>
        </div>
        <div className="col-lg-3">
          <Rightdetail baggageamount={totalAmount}  mealamount={mealamount}/>
        </div>
      </div>
    </div>
  );
};

export default Flight;
