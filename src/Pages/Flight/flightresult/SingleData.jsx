import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fairrule from "./Fairrule";
import "./SingleData.css";
import { FaArrowRight } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Nonrefundable from "./Nonrefundable";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { tokenAction } from "../../../Redux/ResultIndex/resultIndex";
import Luggage from "./Luggage";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
// import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { filterProps } from "framer-motion";
import flightdir from "../../../Images/flgihtdir.png";
import {
  quoteAction,
  ruleAction,
  setLoading,
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import FlightLoader from "../FlightLoader/FlightLoader";
import Swal from "sweetalert2";
import dayjs from "dayjs";








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













function SingleData(props) {
  // console.log("Props", props);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  // console.log("isLoadingRuleDone", statusRule);
  // console.log("isLoadingQuoteDone", statusQuote);
  const flight = props.flight;
  const IsLCC = props.IsLCC;
  // console.log("flight single", flight);
  const results =
    reducerState?.oneWay?.oneWayData?.data?.result ||
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  // console.log("Redux State", results);
  const indexKey = props.index;
  const fare =
    reducerState?.logIn?.loginData.length > 0
      ? `${Math.round(
          Number(props.fare) +
            Number(reducerState?.logIn?.loginData?.data?.data?.markup?.flight)
        )}`
      : Math.round(Number(props.fare));


      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

  // console.log(fare);
  const img = flight?.Airline?.AirlineCode;
  // console.log("reducerstate..........................................",reducerState);

  const duration = `${Math.floor(flight?.Duration / 60)}hr ${
    flight.Duration % 60
  }min`;

  // console.log("reducerState",reducerState);

  const handleClick = (ResultIndex) => {
    setLoader(true);
    sessionStorage.setItem("ResultIndex", ResultIndex);
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.tvoTraceId,
      ResultIndex: ResultIndex,
    };
    // console.log("payload", payload);
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
  };

  // console.log(
  //   "reducerrState",
  //   reducerState,
  //   reducerState?.oneWay?.oneWayData?.data?.tvoTraceId
  // );

  useEffect(() => {
    if (statusQuote && statusRule) {
      if (
        reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode == 0 &&
        reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode == 0
      ) {
        // navigate("/Flightresult/passengerdetail");
        navigate("/passengerdetail");
        dispatch(setLoading("hjbb"));
        // dispatch(setLoading("hjbb"));
        setLoader(false);
      } else if (
        reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
        reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== 0
      ) {
        Swal.fire({
          title: "Hii Encountered an Error",
          text: `${reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage}`,
          icon: "question",
          timer: 5000,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
        navigate("/flights");
      }
    }
  }, [statusQuote, statusRule]);
  // console.log("reducerStateDemount", reducerState);

  if (loader) {
    return <FlightLoader />;
  }
  return (
    <div className="singleFlightBox" key={indexKey}>
      <div className="singleFlightBoxOne">
        <div>
          <img
          style={{
            height:"50px",width:"50px",borderRadius:"33%"
          }}
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImg"
          />{" "}
        </div>
        <span>{flight?.Airline?.AirlineName}</span>
        <p>
          {flight?.Airline?.AirlineCode} {flight?.Airline?.FlightNumber}
        </p>
      </div>
      <div className="singleFlightBoxTwo">
        <span>{flight?.Origin?.Airport?.CityName}</span>
        <p>{dayjs(flight?.Origin?.DepTime).format("DD MMM, YY")}</p>
        <p style={{ fontSize: "14px" }}>
          {dayjs(flight?.Origin?.DepTime).format("h:mm A")}
        </p>
      </div>
      <div className="singleFlightBoxThree">
        <h4>{duration}</h4>
        <div>
          <img src={flightdir} />
        </div>

        {/* <p>Direct Flight</p> */}
        <span>{flight?.NoOfSeatAvailable} Seats Left</span>
      </div>
      <div className="singleFlightBoxFour">
        <span>{flight?.Destination?.Airport?.CityName}</span>
        {/* <p>{desiredFormat1.slice(0, 12)}</p> */}
        <p>{dayjs(flight?.Destination?.ArrTime).format("DD MMM, YY")}</p>
        <p style={{ fontSize: "14px" }}>
          {dayjs(flight?.Destination?.ArrTime).format("h:mm A")}
        </p>
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
      <p>{flight?.Origin?.Airport?.CityName}</p>
      <p style={{ color: "black" }}>
        <FaArrowRight />
      </p>
      <p>{flight?.Destination?.Airport?.CityName}</p>
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
        <p>{dayjs(flight?.Origin?.DepTime).format("DD MMM, YY")}</p>
        <p> {dayjs(flight?.Origin?.DepTime).format("h:mm A")}</p>
      </div>
    </div>
    <div>
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "33%",
          }}
        >
          <img
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "33%",
            }}
             src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImg"
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
         {flight?.Airline?.AirlineName}
        </p>
      </div>
    </div>
    <div style={{margin:"12px", backgroundColor:"#E73D3487"}}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"12px"}}>
                  <div>
                    <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
                      <p>{dayjs(flight?.Origin?.DepTime).format("h:mm A")}</p>
                      <p>{flight?.Origin?.Airport?.CityName}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <IoEllipsisVerticalOutline />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
                      <p>{dayjs(flight?.Destination?.ArrTime).format("h:mm A")}</p>
                      <p>{flight?.Destination?.Airport?.CityName}</p>
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
                        <p>{flight?.Baggage}</p>
                      </div>
                      <div>
                        <p>Cabin</p>
                        <p>7 kg</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}> ₹{fare}</div>
      <div className="singleFlightBoxSeven">
        <button  onClick={() => {
            handleClick(indexKey);
          }}>Book</button>
      </div>
    </div>
  </div>
</Box>

          </Modal>
        </div>



      </div>

      {reducerState?.return?.returnData?.data?.data?.Response?.Results[1] ? (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ backgroundColor: "blue", pending: "10px" }}
        >
          {(() => {
            const imgReturn = results[1][0]?.AirlineCode;
            const timeReturn = `${Math.floor(
              results[1][0]?.Segments[0][0]?.Duration / 60
            )}hr ${results[1][0]?.Segments[0][0]?.Duration % 60}min`;

            const dateStringReturn =
              results[1][0]?.Segments[0][0]?.Origin?.DepTime;
            const dateReturn = new Date(dateStringReturn);
            const timeReturn1 = dateReturn.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const dayReturn = dateReturn.getDate();
            const monthReturn = dateReturn.toLocaleString("default", {
              month: "short",
            });
            const yearReturn = dateReturn.getFullYear();

            const formattedDateReturn = `${dayReturn} ${monthReturn} ${yearReturn}`;

            // arrival
            const dateStringReturn1 =
              results[1][0]?.Segments[0][0]?.Destination?.ArrTime;
            const dateReturn1 = new Date(dateStringReturn1);
            const timeReturn2 = dateReturn1.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const dayReturn1 = dateReturn1.getDate();
            const monthReturn1 = dateReturn1.toLocaleString("default", {
              month: "short",
            });
            const yearReturn1 = dateReturn1.getFullYear();

            const formattedDateReturn1 = `${dayReturn1} ${monthReturn1} ${yearReturn1}`;
            const fareReturn = Math.round(results[1][0]?.Fare?.PublishedFare);

            return (
              <>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Box
                        sx={{
                          width: "auto",
                          height: "40px",
                          backgroundColor: "white",
                        }}
                      >
                        <img
                          src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${imgReturn}.png`}
                          alt="flight"
                          style={{
                            width: "-webkit-fill-available",
                            height: "40px",
                            backgroundColor: "white",
                          }}
                        />
                      </Box>
                      <Box px={1}>
                        <Typography className="flight_name">
                          {results[1][0]?.Segments[0][0]?.Airline?.AirlineName}
                        </Typography>
                        <Typography className="flight_class">
                          {results[1][0]?.Segments[0][0]?.Airline?.AirlineCode}{" "}
                          {results[1][0]?.Segments[0][0]?.Airline?.FlightNumber}
                        </Typography>
                        <Typography className="mt-2">
                          {IsLCC ? (
                            <span
                              className="text-danger"
                              style={{ fontSize: "12px" }}
                            >
                              Not Available
                            </span>
                          ) : (
                            <span
                              className="text-success"
                              style={{ fontSize: "12px" }}
                            >
                              Available
                            </span>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    md={2}
                    sm={1}
                    py={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box px={1}>
                      <Typography className="flight_name">
                        <span style={{ fontSize: "11px" }}>
                          {dayjs(
                            results[1][0]?.Segments[0][0]?.Origin?.DepTime
                          ).format("DD MMM, YY")}
                        </span>
                        <p style={{ paddingBottom: "5px", margin: 0 }}>
                          {dayjs(
                            results[1][0]?.Segments[0][0]?.Origin?.DepTime
                          ).format("h:mm A")}
                        </p>

                        {/* <p>{dayjs(flight?.Destination?.ArrTime).format("DD MMM, YY")}</p> */}
                        {/* <p style={{ fontSize: "14px" }}>{dayjs(flight?.Destination?.ArrTime).format("h:mm A")}</p> */}
                      </Typography>
                      <Typography className="flight_class">
                        {
                          results[1][0]?.Segments[0][0]?.Origin?.Airport
                            ?.CityName
                        }
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={2} sm={2} py={4}>
                    <Box display="flex" justifyContent="center">
                      <Box>
                        <Box px={1} textAlign="center">
                          <Typography className="flight_class">
                            {timeReturn}
                          </Typography>
                        </Box>
                        <Box px={1} textAlign="center">
                          <Typography className="flight_class">
                            Direct Flight
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid display="flex" justifyContent="center">
                    <Box px={1}>
                      <Typography className="flight_name">
                        {" "}
                        <Typography className="flight_name">
                          <span style={{ fontSize: "11px" }}>
                            {dayjs(
                              results[1][0]?.Segments[0][0]?.Destination
                                ?.ArrTime
                            ).format("DD MMM, YY")}
                          </span>
                          <p style={{ paddingBottom: "5px", margin: 0 }}>
                            {dayjs(
                              results[1][0]?.Segments[0][0]?.Destination
                                ?.ArrTime
                            ).format("h:mm A")}
                          </p>
                        </Typography>
                      </Typography>
                      <Typography className="flight_class">
                        {
                          results[1][0]?.Segments[0][0]?.Destination?.Airport
                            ?.CityName
                        }
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Typography className="flight_price">
                      ₹{fareReturn}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box px={1}>
                    <Typography className="flight_price">
                      ₹{fareReturn}
                    </Typography>
                  </Box>
                </Grid>
              </>
            );
          })()}
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}

export default SingleData;
