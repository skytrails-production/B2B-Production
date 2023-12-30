import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightresultOne from "./FlightresultOne";
import FlightReturn from "./FlightReturn";
import SingleDataReturn from "./SingleDataReturn";
import MultipleDataReturnInternational from "./MultipleDataReturnInternational";
import {
  quoteAction,
  ruleAction,
  setLoading,
} from "../../../../Redux/FlightFareQuoteRule/actionFlightQuote";

const FlightReturnInternational = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  const initialGoFlight = result[0][0];
  let initialReturnFlight = result[0][0];
  const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
  const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);
  useEffect(() => {
     sessionStorage.setItem("flightDetailsONGo", JSON.stringify(ongoFlight));
    setOngoFlight(initialGoFlight);
    setIncomeFlight(initialReturnFlight);
  }, [initialGoFlight, initialReturnFlight]);
  useEffect(() => {
    if (statusQuote && statusRule) {
      navigate("/FlightresultReturn/Passengerdetail");
      dispatch(setLoading("data"));
    }
  }, [statusQuote, statusRule]);
  const receiveChildData = (data) => {
    // console.log("callbackData", data);
    const onnGoingFlight =
      JSON.parse(sessionStorage.getItem("flightDetailsONGo")) ||
      initialGoFlight;
    const incomingFlight =
      JSON.parse(sessionStorage.getItem("flightDetailsIncome")) ||
      initialReturnFlight;
    if (data) {
      setOngoFlight(onnGoingFlight);
      setIncomeFlight(incomingFlight);
    }
  };
  const handleFareRuleAndQuote = () => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      ResultIndex: `${ongoFlight?.ResultIndex}`,
    };
    // console.log(payload);
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
    // console.log("reducerrrState", reducerState);
  };
  // console.log("ongoFlight", ongoFlight);
  // console.log("incomeGlight", incomeGlight);
  // console.log("reducerrrState", reducerState);

  return (
    <Box>
      <Box>
        <Box
          sx={{
            border: "1px solid red",
          }}
        >
          <MultipleDataReturnInternational
            flight={ongoFlight?.Segments}
            wholeFlight={ongoFlight}
            stop={ongoFlight?.Segments.length}
            index={ongoFlight?.ResultIndex}
            fare={ongoFlight?.Fare?.PublishedFare}
            IsLCC={ongoFlight.IsLCC}
          />
        </Box>
        <Button variant="contained" onClick={handleFareRuleAndQuote}>
          Book Now
        </Button>
      </Box>

      <Box
        display={"flex"}
        gap={"10px"}
        border={"2px solid red"}
        justifyContent={"center"}
      >
        <Box>
          <FlightresultOne sendDataToParent={receiveChildData} />
        </Box>
        <Box>
          <FlightReturn sendDataToParent={receiveChildData} />
        </Box>
      </Box>
    </Box>
  );
};

export default FlightReturnInternational;
