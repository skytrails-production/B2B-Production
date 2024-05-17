import React, { useEffect, useState } from "react";
import "./flightreviewbooking.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import OneWay from "../FlightForm/OneWay";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Fairsummary from "./Fairsummary";
import Flightbookingdetail from "./Flightbookingdetail";
import Rightdetail from "../passengerdetail/Rightdetail";
import { useDispatch, useSelector } from "react-redux";
import Flightnavbar from "../Flightnavbar";
import FlightLoader from "../FlightLoader/FlightLoader";
const FlightReviewbooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log(
    //   "reducerState?.flightBook?.flightBookDataGDS",
    //   reducerState?.passengers?.passengersData
    // );
    if (reducerState?.passengers?.passengersData) {
      setLoading(false);
    }
  }, [reducerState]);

  const [ssramount, setSsramount] = useState(null);
  const handleSsramount = (amount) => {
    setSsramount(amount);
  };

  if (loading) {
    return (
      <>
        <FlightLoader />
      </>
    )
  }
  return (
    <div className="container-fluid margin-pecentage">

      <div className="row">
        <div className="col-lg-9">
          <Flightbookingdetail  passSsramount={handleSsramount}/>
        </div>
        <div className="col-lg-3">
          <Rightdetail baggageamount={ssramount}  />
        </div>
      </div>

    </div>
  );
};

export default FlightReviewbooking;
