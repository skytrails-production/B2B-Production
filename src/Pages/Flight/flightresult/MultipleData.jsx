import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fairrule from "./Fairrule";
import "./MultiData.css";
import Nonrefundable from "./Nonrefundable";
import { useDispatch, useSelector, useReducer } from "react-redux";
import LuggageIcon from "@mui/icons-material/Luggage";
import Luggage from "./Luggage";
import flightdir from "../../../Images/flgihtdir.png"
import dayjs from "dayjs";
import {
  quoteAction,
  ruleAction,
  setLoading,
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import FlightLoader from "../FlightLoader/FlightLoader";
import Swal from "sweetalert2";
import { swalModal } from "../../../utils/swal"

const MultipleData = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(false);
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  // console.log("isLoadingRuleDone", statusRule);
  // console.log("isLoadingQuoteDone", statusQuote);

  const flight = props.flight;
  const IsLCC = props.IsLCC;
  // console.log("flight single", flight);

  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results ||
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  const indexKey = props.index;
  const fare =
    reducerState?.logIn?.loginData.length > 0
      ? `${Math.round(
        Number(props.fare) +
        Number(reducerState?.logIn?.loginData?.data?.data?.markup?.flight)
      )}`
      : Math.round(Number(props.fare));
  // const fare = `${Math.round(
  //   props.fare + reducerState?.logIn?.loginData?.data?.data?.markup?.flight
  // )}`;
  const img = flight[0]?.Airline?.AirlineCode;
  const stop = props.stop;

  // console.log("Results", results);
  const handleClick = (ResultIndex) => {
    // console.log("Handel Click Index Key", ResultIndex);
    // navigate("passengerdetail");
    setLoader(true);
    sessionStorage.setItem("ResultIndex", ResultIndex);
    // console.warn("resultIndex", ResultIndex)
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      ResultIndex: ResultIndex,
    };
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
  };
  useEffect(() => {
    if (statusQuote && statusRule) {
      if (
        reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode == 0 &&
        reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode == 0
      ) {
        navigate("/passengerdetail");
        dispatch(setLoading("hjbb"));
        setLoader(false);
      } else if (
        reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
        reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== 0
      ) {
        // swalModal('flight',reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,false);
        swalModal('flight', 'Something went wrong with your flight booking. ', false);
        // Swal.fire({
        //   title: "Hii Encountered an Error",
        //   text: `${reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage}`,
        //   icon: "question",
        //   timer: 5000,
        //   showClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeInUp
        //       animate__faster
        //     `
        //   },
        //   hideClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeOutDown
        //       animate__faster
        //     `
        //   }
        // });
        // console.log("insideSweet");
      }
    }
  }, [statusQuote, statusRule]);

  const time = `${Math.floor(flight[0]?.Duration / 60)}hr ${flight[0].Duration % 60
    }min`;

  const time3 = `${Math.floor(flight[1]?.Duration / 60)}hr ${flight[1].Duration % 60
    }min`;


  // console.log("flightData", flight)


  const dateString = flight[0]?.Origin?.DepTime;
  const dateString1 = flight[1]?.Destination?.ArrTime;
  const date2 = new Date(dateString1);
  const time2 = date2.toLocaleTimeString();

  const day2 = date2.getDate();
  const month2 = date2.toLocaleString("default", {
    month: "short",
  });
  const year2 = date2.getFullYear();
  const formattedDate2 = `${day2} ${month2} ${year2}`;

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const [month, day, year, tim, ampm] = formattedDate.split(" ");
  const desiredFormat = `${day}${month}-${year} ${tim} ${ampm}`;


  const date1 = new Date(dateString1);
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate1 = date1.toLocaleString("en-US", options1);
  const [month1, day1, year1, time1, ampm1] =
    formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;



  if (loader) {
    return <FlightLoader />;
  }
  return (
    <div key={indexKey} className="singleFlightBox">
      <div className="singleFlightBoxOne">
        <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`} alt="flightImage"/> </div>
        <span>{flight[0]?.Airline?.AirlineName}</span>
        <p>{flight[0]?.Airline?.AirlineCode}{" "}{flight[0]?.Airline?.FlightNumber}</p>
      </div>
      <div className="singleFlightBoxTwo">
        <span>{flight[0]?.Origin?.Airport?.CityName}</span>
        <p>{dayjs(flight[0]?.Origin?.DepTime).format("DD MMM, YY")}</p>
        <p style={{ fontSize: "14px" }}>{dayjs(flight[0]?.Origin?.DepTime).format("h:mm A")}</p>
      </div>
      <div className="singleFlightBoxThree">
        <h4>{time}{" - "}{time3}</h4>
        <div><img src={flightdir} /></div>
        <p>{`${flight.length - 1} stop via ${flight[0]?.Destination?.Airport?.CityName}`}</p>
        {/* <span>{flight?.NoOfSeatAvailable} Seats Left</span> */}
      </div>
      <div className="singleFlightBoxFour">
        <span>{flight[flight.length - 1]?.Destination?.Airport?.CityName}</span>
        <p>{dayjs(flight[flight.length - 1]?.Destination?.ArrTime).format("DD MMM, YY")}</p>
        <p style={{ fontSize: "14px" }}>{dayjs(flight[flight.length - 1]?.Destination?.ArrTime).format("h:mm A")}</p>
      </div>
      <div className="singleFlightBoxFive">
        <span>₹{fare}</span>
        <p>Publish</p>
      </div>
      <div className="singleFlightBoxSix">
        <Luggage
          destination={flight?.Destination?.Airport?.AirportCode}
          origin={flight?.Origin?.Airport?.AirportCode}
          cabin={flight?.CabinBaggage}
          checkin={flight?.Baggage}
          fareClass={flight?.Airline?.FareClass}
        />

        <Nonrefundable />
      </div>
      <div className="singleFlightBoxSeven">
        <button onClick={() => { handleClick(indexKey) }}>Book</button>
      </div>

    </div>
  );
};

export default MultipleData;



