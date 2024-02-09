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
import MultipleDataReturn from "./MultipleDataReturn";
import { swalModal } from "../../../../utils/swal"

const FlightReturnInternational = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  // console.warn(result[0], "resultnvjdfnvjdfnv")
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  const initialGoFlight = result ? result[0][0] : [];
  let initialReturnFlight = result ? result[0][1] : [];
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
  // console.warn(ongoFlight, "ongoFlight //////////////////")
  const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);
  console.warn(reducerState?.flightFare?.flightQuoteData


    , "statusQuote ", statusRule, "statusRule ")
  // console.warn(incomeGlight, "incomingFlight //////////////////")
  // console.warn(incomeGlight?.Segments[1], "incomingFlight segments //////////////////")
  useEffect(() => {
    if (reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined && reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0) {
      // swalModal("flight", reducerState?.flightFare?.flightQuoteData?.Error?.
      //   ErrorMessage
      //   , false)
      swalModal("flight","Something went wrong with your flight booking. Please check your details and try again."
        , false)
      navigate("/")
    }
    else if (!result) {
      navigate('/flights')
    }
  })
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
  const handleFareRuleAndQuote = (item, i) => {
    sessionStorage.setItem("flightDetailsONGo", JSON.stringify(result[i][0]));
    sessionStorage.setItem("flightDetailsIncome", JSON.stringify(result[i][1]));
    sessionStorage.setItem("flightDetailsIncome", JSON.stringify(result[i][1]));


    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      ResultIndex: `${item?.ResultIndex}`,
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
    <>
      {/* <div className="row"> */}
      <div className="col-10">
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
          {result &&
            result[0].map((item, i) => (
              // console.log(item)
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                style={{
                  backgroundColor: "#ffffffba",
                  padding: "10px",
                  gap: "5px",
                  width: "100%",
                  margin: "auto",
                  width: '100%',
                  borderRadius: '5px',
                  margin: '5px',
                  boxShadow: '-1px 7px 14px 4px rgba(223,220,242,1)'
                  // position: "fixed",
                  // left: 0,
                  // overflow: "hidden",
                  // bottom: "0px",
                  // zIndex: "2",
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
                  {item?.Segments[0].length === 1 ? (
                    <SingleDataReturn
                      flight={item?.Segments[0]}
                      wholeFlight={item}
                      index={item?.ResultIndex}
                      fare={item?.Fare?.PublishedFare}
                      IsLCC={item?.IsLCC}
                      showRadio={false}
                    />
                  ) : (
                    <MultipleDataReturn
                      flight={item?.Segments[0]}
                      wholeFlight={item}
                      index={item?.ResultIndex}
                      fare={item?.Fare?.PublishedFare}
                      IsLCC={item?.IsLCC}
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
                      flight={item?.Segments[1]}
                      wholeFlight={item}
                      index={item?.ResultIndex}
                      fare={item?.Fare?.PublishedFare}
                      IsLCC={item?.IsLCC}
                      showRadio={false}
                    />
                  ) : (
                    <MultipleDataReturn
                      flight={item?.Segments[1]}
                      wholeFlight={item}
                      index={item?.ResultIndex}
                      fare={item?.Fare?.PublishedFare}
                      IsLCC={item?.IsLCC}
                      showRadio={false}
                    />
                  )}
                  {/* <MultipleDataReturnInternational
                flight={ongoFlight?.Segments}
                wholeFlight={ongoFlight}
                stop={ongoFlight?.Segments.length}
                index={ongoFlight?.ResultIndex}
                fare={ongoFlight?.Fare?.PublishedFare}
                IsLCC={ongoFlight.IsLCC}
              /> */}
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
                    <p
                      className="flight_price"
                      
                     
                    >
                      {
                        `₹${Number(item?.Fare?.PublishedFare).toFixed(0)}`
                      }
                    </p>
                  </Box>

                  <button
                    className="flightBoolkInternationalButton"
                    onClick={() => handleFareRuleAndQuote(item, i)}

                  >
                    Book Now
                  </button>
                </Box>
              </Box>
            ))
          }

        </div>
      </div>


    </>


  );
};

export default FlightReturnInternational;
