import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import FlightresultOne from "./FlightresultOne";
import FlightReturn from "./FlightReturn";
import SingleDataReturn from "./SingleDataReturn";
import MultipleDataReturn from "./MultipleDataReturn";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  quoteAction,
  ruleAction,
  quoteActionReturn,
  ruleActionReturn,
} from "../../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import FlightLoader from "../../FlightLoader/FlightLoader";

import "./FlightresultReturn.css";
import Flightnavbar from "../../Flightnavbar";
const FlightresultReturn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const result = reducerState?.return?.returnData?.data?.data?.Response?.Results;
  useEffect(() => {
    if (result === undefined) {
      navigate("/")
    }
  }, [result])
  
  // console.log(result, "resultCheck", reducerState)
  let initialGoFlight;
  let initialReturnFlight;
  let destination
  let origin
  let onGoTime
  let IncomeTime

  if (reducerState?.return?.returnData?.data?.data?.Response?.Results !== undefined) {
    initialGoFlight = result[0][0];
    initialReturnFlight = result[1][0];
    destination =
      result[0][0]?.Segments[0][0]?.Destination?.Airport?.CityName;
    origin = result[0][0]?.Segments[0][0]?.Origin?.Airport?.CityName;
    onGoTime = result[0][0]?.Segments[0][0]?.Destination?.ArrTime;
    IncomeTime = result[1][0]?.Segments[0][0]?.Destination?.ArrTime;
  }

  // const initialGoFlight = result[0][0]  ;
  // const initialReturnFlight = result[1][0] ;
  const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
  const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);

  useEffect(() => {
    setOngoFlight(initialGoFlight);
    setIncomeFlight(initialReturnFlight);
  }, [initialGoFlight, initialReturnFlight]);
  useEffect(()=>{
    sessionStorage.setItem("flightDetailsONGo", JSON.stringify(initialGoFlight));
    sessionStorage.setItem("flightDetailsIncome", JSON.stringify(initialReturnFlight));
  },[])



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


  const handleFareRuleAndQuote = async () => {
    // console.log(ongoFlight, "ongoFlight");
    // console.log(incomeGlight, "incomeGlight");
    setLoading(true);
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      ResultIndex: `${ongoFlight?.ResultIndex}`,
    };
    const payloadReturn = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      ResultIndex: `${incomeGlight?.ResultIndex}`,
    };
    // console.log(payload);
    await dispatch(ruleAction(payload));
    await dispatch(quoteAction(payload));
    await dispatch(ruleActionReturn(payloadReturn));
    await dispatch(quoteActionReturn(payloadReturn));
    setLoading(false)
    navigate("/FlightresultReturn/Passengerdetail");

    // console.log("reducerrrState", reducerState);
  };


  // console.log(result[1][0]?.Segments[0][0]?.Destination?.ArrTime,"Hellllllllll")


  // convert date in formate


  function convertISOToCustomFormat(isoDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(isoDate);
    const day = days[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const dayOfMonth = date.getUTCDate();

    return `${day}, ${dayOfMonth} ${month}`;
  }
  const onGoingTime = convertISOToCustomFormat(onGoTime);
  const onComingTime = convertISOToCustomFormat(IncomeTime);
  if (result === undefined) {

    navigate("/")
    return
  }


  if (loading) {
    return (
      <div>
        <FlightLoader />
      </div>)
  }



  return (
    // <div>

    <>
      {/* <div className="row"> */}
      <div className="col-6">
        <div className="row">
          <div className="col-lg-12">
            <div className="returnheadicons">
              <div>
                <p>Flight</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Departure</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Duration</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Arrival</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Offer Fare</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Select</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <FlightresultOne sendDataToParent={receiveChildData} />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-lg-12">
            <div className="returnheadicons">
              <div>
                <p>Flight</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Departure</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Duration</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Arrival</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Offer Fare</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
              <div>
                <p>Select</p>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <FlightReturn sendDataToParent={receiveChildData} />
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}




      {/* <Box
        display={"flex"}
        gap={"10px"}
        justifyContent={"center"}
        className="bokesh"
      >
        <Box
          backgroundColor="#BBBBBB"
          paddingX="8px"
          paddingY="8px"
          borderRadius="10px"
          width="-webkit-autofill"
          marginTop="10px"
          marginBottom="10px"
        >
          <Box
            backgroundColor="#FFFFFF"
            height="104px"
            padding="24px"
            display="flex"
            width="442px"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt="5px"
            borderRadius="8px"
          >
            <Box>
              <Typography
                className="flight_price_total"
                variant="h1"
                component="h2"
              >
                {origin} <ArrowRightAltIcon /> {destination} {onGoingTime}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              width="400px"
              alignItems="center"
              fontSize="10px"
              mt="8px"
              color="#071C2C"
            >
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Duration
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Arrival
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Price
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                textAlign="center"
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                Departure
              </Box>
            </Box>
          </Box>



          <FlightresultOne sendDataToParent={receiveChildData} />
        </Box>
        <Box
          backgroundColor="#BBBBBB"
          paddingX="8px"
          paddingY="8px"
          marginTop="10px"
          marginBottom="10px"
          borderRadius="10px"
        >
          <Box
            backgroundColor="#FFFFFF"
            height="104px"
            padding="24px"
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt="5px"
            borderRadius="8px"
          >
            <Box>
              <Typography
                className="flight_price_total"
                variant="h1"
                component="h2"
              >
                {destination} <ArrowRightAltIcon /> {origin} {onComingTime}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flex={1}
              width="100%"
              alignItems="center"
              fontSize="10px"
              mt="8px"
              color="#071C2C"
            >
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Duration
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Arrival
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                textAlign="center"
              >
                Price
              </Box>
              <Box
                border="1px solid #071C2C"
                flex={1}
                textAlign="center"
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                Departure
              </Box>
            </Box>
          </Box>
          <FlightReturn sendDataToParent={receiveChildData} />
        </Box>
      </Box> */}


      {/* fixed bottom  */}
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        style={{
          backgroundColor: "white",
          padding: "10px",
          gap: "5px",
          width: "100%",
          margin: "auto",
          position: "fixed",
          left: 0,
          overflow: "hidden",
          bottom: "0px",
          zIndex: "2",
        }}
      >
        <Box
          sx={{
            // border: "1px solid blue",
            // backgroundColor: 'white',
            flex: 1,
            borderRadius: "10px",
            padding: "5px",
            maxWidth: "418px",
          }}
        >
          {ongoFlight?.Segments[0].length === 1 ? (
            <SingleDataReturn
              flight={ongoFlight?.Segments[0][0]}
              wholeFlight={ongoFlight}
              index={ongoFlight?.ResultIndex}
              fare={ongoFlight?.Fare?.PublishedFare}
              IsLCC={ongoFlight?.IsLCC}
              showRadio={false}
            />
          ) : (
            <MultipleDataReturn
              flight={ongoFlight?.Segments[0]}
              wholeFlight={ongoFlight}
              index={ongoFlight?.ResultIndex}
              fare={ongoFlight?.Fare?.PublishedFare}
              IsLCC={ongoFlight?.IsLCC}
              showRadio={false}
            />
          )}
        </Box>
        <Box
          sx={{
            // border: "1px solid red",
            // backgroundColor: 'white',
            flex: 1,
            borderRadius: "10px",
            padding: "5px",
            maxWidth: "418px",
          }}
        >
          {incomeGlight?.Segments[0].length === 1 ? (
            <SingleDataReturn
              flight={incomeGlight?.Segments[0][0]}
              wholeFlight={incomeGlight}
              index={incomeGlight?.ResultIndex}
              fare={incomeGlight?.Fare?.PublishedFare}
              IsLCC={incomeGlight?.IsLCC}
              showRadio={false}
            />
          ) : (
            <MultipleDataReturn
              flight={incomeGlight?.Segments[0]}
              wholeFlight={incomeGlight}
              index={incomeGlight?.ResultIndex}
              fare={incomeGlight?.Fare?.PublishedFare}
              IsLCC={incomeGlight?.IsLCC}
              showRadio={false}
            />
          )}
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            // border: "1px solid red",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography
              className="flight_price_total"
              variant="h1"
              component="h2"
              style={{}}
            >
              Total Price
            </Typography>
            <Typography
              className="flight_price"
              variant="h1"
              component="h2"
              style={{
                color: "blue",
              }}
            >
              {
                ` ₹ ${(Number(ongoFlight?.Fare?.PublishedFare) +
                  Number(incomeGlight?.Fare?.PublishedFare)
                ).toFixed(2)
                }`
              }
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleFareRuleAndQuote}
            style={{
              width: "100px",
              borderRadius: "10px",
              // border: "10px solid red",
              height: "40px",
              fontSize: "11px",
              marginTop: "10px"
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </>
  )
}


export default FlightresultReturn;
