import React, { useState, useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fairrule from "./Fairrule";
import "./MultiData.css";
import Nonrefundable from "./Nonrefundable";
import { useDispatch, useSelector, useReducer } from "react-redux";
import LuggageIcon from "@mui/icons-material/Luggage";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Luggage from "./Luggage";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import flightdir from "../../../Images/flgihtdir.png";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";
import {
  quoteAction,
  ruleAction,
  setLoading,
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import FlightLoader from "../FlightLoader/FlightLoader";
import Swal from "sweetalert2";
import { swalModal } from "../../../utils/swal";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MultipleData = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(false);
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  // console.log("isLoadingRuleDone", statusRule);
  // console.log("isLoadingQuoteDone", statusQuote);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const flight = props.flight;
  const IsLCC = props.IsLCC;
  // console.log("flight single", props);
  // console.log("reducerstate",reducerState);

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
      TraceId: reducerState?.oneWay?.oneWayData?.data?.tvoTraceId,
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
        swalModal(
          "flight",
          "Something went wrong with your flight booking. ",
          false
        );
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

  const time = `${Math.floor(flight[0]?.Duration / 60)}hr ${
    flight[0].Duration % 60
  }min`;

  const time3 = `${Math.floor(flight[1]?.Duration / 60)}hr ${
    flight[1].Duration % 60
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
  const [month1, day1, year1, time1, ampm1] = formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;



  if (loader) {
    return <FlightLoader />;
  }
  return (
    <div key={indexKey} className="singleFlightBox">
      <div className="singleFlightBoxOne">
        <div>
          <img
          style={{
            height:"50px",width:"50px",borderRadius:"33%"
          }}
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImage"
          />{" "}
        </div>
        <span>{flight[0]?.Airline?.AirlineName}</span>
        <p>
          {flight[0]?.Airline?.AirlineCode} {flight[0]?.Airline?.FlightNumber}
        </p>
      </div>
      <div className="singleFlightBoxTwo">
        <span>{flight[0]?.Origin?.Airport?.CityName}</span>
        <p>{dayjs(flight[0]?.Origin?.DepTime).format("DD MMM, YY")}</p>
        <p style={{ fontSize: "14px" }}>
          {dayjs(flight[0]?.Origin?.DepTime).format("h:mm A")}
        </p>
      </div>
      <div className="singleFlightBoxThree">
        <h4>
          {time}
          {" - "}
          {time3}
        </h4>
        <div>
          <img src={flightdir} />
        </div>
        <p>{`${flight.length - 1} stop via ${
          flight[0]?.Destination?.Airport?.CityName
        }`}</p>
        {/* <span>{flight?.NoOfSeatAvailable} Seats Left</span> */}
      </div>
      <div className="singleFlightBoxFour">
        <span>{flight[flight.length - 1]?.Destination?.Airport?.CityName}</span>
        <p>
          {dayjs(flight[flight.length - 1]?.Destination?.ArrTime).format(
            "DD MMM, YY"
          )}
        </p>
        <p style={{ fontSize: "14px" }}>
          {dayjs(flight[flight.length - 1]?.Destination?.ArrTime).format(
            "h:mm A"
          )}
        </p>
      </div>
      <div className="singleFlightBoxFive">
        <span>₹{fare}</span>
        <p>Publish</p>
      </div>
      <div className="singleFlightBoxSix">
        <Luggage
          destination={flight?.[flight.length-1]?.Destination?.Airport?.AirportCode}
          origin={flight?.[0]?.Origin?.Airport?.AirportCode}
          cabin="7KG"
          checkin={flight?.[0]?.Baggage}
          fareClass={flight?.[0]?.Airline?.FareClass}
        />

        <Nonrefundable />
      </div>

      <div>
      <div className="singleFlightBoxSeven">
        <button
          onClick={() => {
            handleClick(indexKey);
          }}
        >
          Book
        </button>
      </div>

      <div>
          <Button
            style={{ color: "#E73C34", border: "none" }}
            onClick={handleOpen}
          >
            {" "}
            View details <FaArrowRight />
          </Button>
          <Modal
            aria-labelledby="flight-details-modal-title"
            aria-describedby="flight-details-modal-description"
            open={open}
            className="modalcolor rmvBG"
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
           

            <Box sx={style} className="modalcolor">
  <div>
    <span style={{ fontSize: "20px", fontWeight: "bold" }}>Flight Details</span>
    <span className="close1" onClick={handleClose}>&times;</span>
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        color: "red",
        fontSize: "25px",
      }}
    >
      <p>{flight[0]?.Origin?.Airport?.CityName}</p>
      <p style={{ color: "black" }}>
        <FaArrowRight />
      </p>
      <p>{flight[flight.length - 1]?.Destination?.Airport?.CityName}</p>
      <div
        style={{
          fontSize: "18px",
          color: "black",
          display: "flex",
          gap: "12px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>{dayjs(flight[0]?.Origin?.DepTime).format("DD MMM, YY")}</p>
        <p> {dayjs(flight[0]?.Origin?.DepTime).format("h:mm A")}</p>
      </div>
    </div>
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          // style={{
          //   height: "50px",
          //   width: "50px",
          //   borderRadius: "33%",
          // }}
        >
          <img
            style={{
            height:"50px",width:"50px",borderRadius:"33%"
          }}
           src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImage"
          />
        </div>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          {flight[0]?.Airline?.AirlineName}
        </p>
      </div>
    </div>
    <div style={{ overflow: "scroll", height: "400px" }}>
      {flight?.map((flight, item, flightsArray) => {
        const arrivaldate1 = dayjs(flight?.Origin?.DepTime).format("DD MMM YY");
  const deptime = dayjs(flight?.Origin?.DepTime).format("DD MMM, YY");
  const arrivaldate = dayjs(flight?.Origin?.DepTime).format("h:mm A");
  const aarivaltime = dayjs(flight?.Destination?.ArrTime).format("h:mm A");

  const originname = flight?.Origin?.Airport?.CityName;
  const destinationname = flight?.Destination?.Airport?.CityName;
  const departtime = flight?.flightInformation?.location?.[1]?.locationId;
  const locationarrival = flight?.flightInformation?.location?.[0]?.locationId;
  const durationtime = flight?.flightInformation?.attributeDetails?.attributeDescription;
  const hours = Math.floor(durationtime / 100);
  const arrivaltime = dayjs(flight?.Destination?.ArrTime).format("h:mm A");
  const minutes = durationtime % 100;
  const baggage = flight?.Baggage;

  let layoverTime = null;

  if (item > 0) {
    const previousFlight = flightsArray[item - 1];
    const previousArrivalDate = previousFlight?.Destination?.ArrTime;
    const previousArrivalTime = dayjs(previousFlight?.Destination?.ArrTime);
    const currentDepartureDate = flight?.Origin?.DepTime;
    const currentDepartureTime = dayjs(flight?.Origin?.DepTime);

    const prevArrivalDateTime = dayjs(previousArrivalDate);
    const currDepartureDateTime = dayjs(currentDepartureDate);

    const layoverDuration = currDepartureDateTime.diff(prevArrivalDateTime, 'minute');
    const layoverHours = Math.floor(layoverDuration / 60);
    const layoverMinutes = layoverDuration % 60;

    layoverTime = `${layoverHours}hr ${layoverMinutes < 10 ? "0" : ""}${layoverMinutes}min`;
  }

  // Output layoverTime
  {/* console.log(`Layover Time for flight ${item}: ${layoverTime}`); */}



        

        return (
          <React.Fragment key={item}>
            {item > 0 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "black", fontWeight: "400", fontSize: "18px" }}>
                  Layover Time: {layoverTime}
                </div>
              </div>
            )}
            <div style={{ margin: "12px", backgroundColor: "#E73D3487" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "12px",
                        gap: "12px",
                      }}
                    >
                      <p>{arrivaldate}</p>
                      <p>{(originname)}</p>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IoEllipsisVerticalOutline />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "12px",
                        gap: "12px",
                      }}
                    >
                      <p>{arrivaltime}</p>
                      <p>{destinationname}</p>
                    
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "25px",
                      }}
                    >
                      <div>
                        <p>Baggage</p>
                        <p>Adult</p>
                      </div>
                      <div>
                        <p>Checkin</p>
                        <p>{baggage}</p>
                      </div>
                      <div>
                        <p>Cabin</p>
                        <p>7 kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}> ₹{fare}</div>
      <div className="singleFlightBoxSeven">
        <button onClick={() => {
            handleClick(indexKey);
          }}>Book</button>
      </div>
    </div>
  </div>
</Box>

          </Modal>
        </div>
        </div>
    </div>
  );
};

export default MultipleData;
