import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import Popularfilter from "../flightresult/Popularfilter";
import "./flightresult.css";
import Flightnavbar from "../Flightnavbar";
const Flightresult = () => {
  
  return (
    <React.Fragment>
      <div className="container-fluid margin-pecentage" style={{ padding: "10px 15px" }}>
        <Popularfilter />
      </div>
    </React.Fragment>
  );
};

export default Flightresult;
