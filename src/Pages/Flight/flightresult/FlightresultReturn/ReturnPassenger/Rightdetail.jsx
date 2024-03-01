import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Link from "@mui/icons-material/Link";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import "./passenger.css";
import { Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyValue = ({ data, value }) => {
  // console.log("----------------------");
  // console.log(data);
  // console.log(value);
  // console.log("----------------------");
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography
            sx={{
              color: "#616161",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            {data}:
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box textAlign="right">
          <Typography
            sx={{
              color: "#FF8900",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            Rs. {value}.00
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default function Popularfilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("reducerState", reducerState);
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const isPasswordsRequiredBaseFair = reducerState?.flightFare?.flightQuoteData?.Results?.Fare?.PublishedFare


  const fareofall = reducerState?.flightFare;
  const isPasswordsRequired = reducerState?.flightFare?.flightQuoteData?.Results?.
    IsPassportRequiredAtTicket
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;
  // console.log(isPasswordsRequiredBaseFair, "isPasswordsRequired", markUpamount, "markupamount")

  // console.log("fareValue 🤞", fareofall);


  // flight departure


  // time and day

  const fareValueDepart = reducerState?.flightFare?.flightQuoteData?.Results;

  const departDate =  fareValueDepart?.Segments?.[0]?.[0]?.Origin?.DepTime;
  const dateDepart = new Date(departDate);
  const departDay = dateDepart.getDate();
  const departMonth = dateDepart.toLocaleString("default", {
    month: "short",
  });
  const departYear = dateDepart.getFullYear();
  const formattedDepart = `${departDay} ${departMonth} ${departYear}`;


  // class and flight number 

  const departFlightNumber =isPasswordsRequired?fareValueDepart?.Segments?.[1]?.[0]?.Airline?.FlightNumber : fareValueDepart?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const departFlightClass =isPasswordsRequired?fareValueDepart?.Segments?.[1]?.[0]?.Airline?.FareClass : fareValueDepart?.Segments?.[0]?.[0]?.Airline?.FareClass;


  // depart depart and arrival city 

  const departDepartureCity = fareValueDepart?.Segments?.[0]?.[0]?.Origin?.Airport?.AirportCode;
  const departDestinationCity = fareValueDepart?.Segments?.[0]?.[0]?.Destination?.Airport?.AirportCode;


  // flight departure







  // flight return 

  const fareValueReturn =isPasswordsRequired?reducerState?.flightFare?.flightQuoteData?.Results: reducerState?.flightFare?.flightQuoteDataReturn?.Results;

  // isPasswordsRequired?fareValueReturn?.Segments?.[0]?.[1]?.Origin?.DepTime : fareValueReturn?.Segments?.[0]?.[0]?.Origin?.DepTime
  const ReturnDate =isPasswordsRequired?fareValueReturn?.Segments?.[1]?.[0]?.Origin?.DepTime :fareValueReturn?.Segments?.[0]?.[0]?.Origin?.DepTime;
  const dateReturn = new Date(ReturnDate);
  const ReturnDay = dateReturn.getDate();
  const ReturnMonth = dateReturn.toLocaleString("default", {
    month: "short",
  });
  const ReturnYear = dateReturn.getFullYear();
  const formattedReturn = `${ReturnDay} ${ReturnMonth} ${ReturnYear}`;


  // class and flight number 

  const ReturnFlightNumber = fareValueReturn?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const ReturnFlightClass = fareValueReturn?.Segments?.[0]?.[0]?.Airline?.FareClass;


  // depart depart and arrival city 

  const ReturnDepartureCity = fareValueReturn?.Segments?.[0]?.[0]?.Origin?.Airport?.AirportCode;
  const ReturnDestinationCity = fareValueReturn?.Segments?.[0]?.[0]?.Destination?.Airport?.AirportCode;



  const totalFare = (isPasswordsRequired ? isPasswordsRequiredBaseFair :
    fareValueDepart?.Fare?.PublishedFare +
    markUpamount +
    fareValueReturn?.Fare?.PublishedFare +
    markUpamount
  );

  // console.log(fareValueDepart, "fare departure")
  // console.log(fareValueReturn, "fare return")

  // console.log(totalFare, "totalFare")

  let total = 0;

  return (

    <>
      <div className="priceSummary">
        <div className="head">
          <span>Price Summary</span>
        </div>
        <div className="cat">
          <p className="p-2">Depature:</p>
        </div>
        <div className="totCOmm">
          <div >
            <span>{formattedDepart}</span>
            <p>{departFlightNumber}</p>
            <p>{departFlightClass} Class</p>
          </div>

        </div>
        <div className="priceChart">
          <div >
            <span className="text-bold">From</span>
            <p className="text-bold">{departDepartureCity}</p>
          </div>
          <div >
            <span className="text-bold">To</span>
            <p className="text-bold">{departDestinationCity}</p>
          </div>
        </div>
        <div className="totCOmm">
          {fareValueDepart?.FareBreakdown?.map((data) => {
            return (
              <div className="">
                {data?.PassengerType === 1 && (
                  <>
                    <span>Adult x {data?.PassengerCount}</span>
                    <p>{'₹'}{data?.BaseFare + data?.Tax}</p>

                  </>
                )}
                {data?.PassengerType === 2 && (
                  <>
                    <span>Child x {data?.PassengerCount}</span>
                    <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                  </>
                )}
                {data?.PassengerType === 3 && (
                  <>
                    <span>Infant x {data?.PassengerCount}</span>
                    <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                  </>
                )}


              </div>
            );
          })}

        </div>










        {/* arrival  */}

        <div className="cat">
          <p className="p-2">Return:</p>
        </div>

        <div className="totCOmm">
          <div >
            <span>{formattedReturn}</span>
            <p>{ReturnFlightNumber}</p>
            <p>{ReturnFlightClass} Class</p>
          </div>

        </div>
        <div className="priceChart">
          <div >
            <span className="text-bold">From</span>
            <p className="text-bold">{ReturnDepartureCity}</p>
          </div>
          <div >
            <span className="text-bold">To</span>
            <p className="text-bold">{ReturnDestinationCity}</p>
          </div>
        </div>
        {
          !isPasswordsRequired && <div className="totCOmm">
            {fareValueReturn?.FareBreakdown?.map((data) => {
              return (
                <div className="">
                  {data?.PassengerType === 1 && (
                    <>
                      <span>Adult x {data?.PassengerCount}</span>
                      <p>{'₹'}{data?.BaseFare + data?.Tax}</p>

                    </>
                  )}
                  {data?.PassengerType === 2 && (
                    <>
                      <span>Child x {data?.PassengerCount}</span>
                      <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                    </>
                  )}
                  {data?.PassengerType === 3 && (
                    <>
                      <span>Infant x {data?.PassengerCount}</span>
                      <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                    </>
                  )}


                </div>
              );
            })}

          </div>
        }


        <div className="TotGst">
          <div>
            <span>Total TAX: </span>
            <p>{'₹'}{markUpamount + markUpamount}</p>
          </div>
          <div >
            <span>Grand Total:</span>
            <p>
              {'₹'}{totalFare}
            </p>
          </div>
        </div>
      </div>
    </>

  );
}

















