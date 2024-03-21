import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Checkbox, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../SingleData.css";
import Nonrefundable from "../Nonrefundable";
import { useDispatch, useSelector, useReducer } from "react-redux";
import Luggage from "../Luggage";
import { PropagateLoader } from "react-spinners";
// import flightdir from "../../../Images/flgihtdir.png"
import flightdir from "../../../../Images/flgihtdir.png";
import { convertTimeToAMPM } from "../../../../utils/Constantfunction";

function SingleDataReturn(props) {
  // console.log("Props", props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reducerState = useSelector((state) => state);
  const flight = props.flight;
  // console.log(flight,"flight props")
  const wholeFlight = props.wholeFlight;
  const IsLCC = props.IsLCC;

  // console.log("flight single", props);

  const results =
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

  // console.log(fare);
  const img = flight?.Airline?.AirlineCode;

  const time = `${Math.floor(flight?.Duration / 60)}hr ${
    flight.Duration % 60
  }min`;
  // console.log(
  //   flight?.Duration,
  //   "Hours:",
  //   Math.floor(flight?.Duration / 60),
  //   "Minutes:",
  //   flight.Duration % 60,
  //   "Index Key",
  //   indexKey
  // );
  //  console.log("flight", flight);

  const dateString = flight?.Origin?.DepTime;
  const date1 = new Date(dateString);
  const time1 = date1.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = date1.getDate();
  const month = date1.toLocaleString("default", {
    month: "short",
  });
  const year = date1.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const dateString1 = flight?.Destination?.ArrTime;
  const date2 = new Date(dateString1);
  const time2 = date2.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day1 = date2.getDate();
  const month1 = date2.toLocaleString("default", {
    month: "short",
  });
  const year1 = date2.getFullYear();
  const formattedDate1 = `${day1} ${month1} ${year1}`;

  const handleClick = (allDetails, ResultIndex) => {
    const slicedResultIndex = ResultIndex.slice(0, 2);
    // console.warn(
    //   "Handel Click Index Key",
    //   slicedResultIndex,
    //   allDetails,
    //   ResultIndex
    // );

    // console.log("hghfdsjgdsjsfd", props.flight);

    if (slicedResultIndex == "OB") {
      sessionStorage.setItem("flightDetailsONGo", JSON.stringify(allDetails));
    }
    if (slicedResultIndex == "IB") {
      sessionStorage.setItem("flightDetailsIncome", JSON.stringify(allDetails));
    }
  };

  return (
    <div
      onClick={() => {
        props.onSelect(props.index);
        handleClick(props.wholeFlight, props.index);
      }}
    >
      <div
        className="singleDataReturnBox"
        style={{ marginLeft: "3px", marginRight: "3px", backgroundColor:"rgba(231, 60, 52, 0.15)" }}
      >
        <div className="returnBoxOne">
          <div>
            <img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`} alt="flightImg"/>{" "}
          </div>
          <span>{flight?.Airline?.AirlineName}</span>
          <p>
            {flight?.Airline?.AirlineCode} {flight?.Airline?.FlightNumber}
          </p>
        </div>
        <div className="returnBoxTwo">
          <span>{flight?.Origin?.Airport?.CityName}</span>
          <p>{convertTimeToAMPM(dateString)}</p>
        </div>
        <div className="returnBoxThree">
          <h4>{time}</h4>
          <div>
            <img src={flightdir} />
          </div>
          <p>Direct Flight</p>
        </div>
        <div className="returnBoxFour">
          <span>{flight?.Destination?.Airport?.CityName}</span>
          <p>{convertTimeToAMPM(dateString1)}</p>
        </div>
        <div className="returnBoxFive">
          <span>₹{fare}</span>
          <p>Publish</p>
        </div>
        <div className="singlereturnBoxSix">
          {/* <button onClick={() => { handleClick(indexKey) }}>Book</button> */}
          {props.showRadio && (
            <Radio
              checked={props.isSelected}
              onClick={props.onSelect}
              color="primary"
            />
          )}
        </div>
      </div>

      {/* <Box
        display="flex"
        flexDirection="column"
        width="418px"
        height="86px"
        alignItems="space-between"
        justifyContent="space-between"

      >
        <Box
          sx={{
            width: "auto",
            display: "flex",
            // backgroundColor: 'blue',
            alignItems: 'center',
            height: "30px",
            gap: '7px'


          }}
        >
          <img
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flight"
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "white",
            }}
          />
          <Box>

            <Typography style={{ color: '#071C2C', fontSize: '16px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
              {flight?.Airline?.AirlineName}
            </Typography>
            <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
              {flight?.Airline?.FlightNumber}
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          style={{
            display: "flex",
            // backgroundColor: "yellow",
            height: "32px",
            justifyContent: "space-between",
          }}
        >

          <Grid display="flex" justifyContent="center">
            <Box >
              <Typography textAlign='center' style={{
                color: '#071C2C', fontSize: '16px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'
              }}>

                {time1.substring(0, 5)}
              </Typography>
              <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
                {flight?.Origin?.Airport?.CityName}
              </Typography>
            </Box>
          </Grid>
          <Grid >
            <Box display="flex" justifyContent="center">
              <Box>
                <Box px={1} textAlign="center">
                  <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '700' }}>{time}</Typography>
                </Box>
                <Box style={{ width: 76, height: 0, border: '2px #49DF4F solid' }} />
                <Box px={1} textAlign="center">
                  <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '700' }}>
                    Direct Flight
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid display="flex" justifyContent="center">
            <Box >
              <Typography textAlign='center' style={{
                color: '#071C2C', fontSize: '16px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'
              }}>

                {time2.substring(0, 5)}
              </Typography>
              <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
                {flight?.Destination?.Airport?.CityName}
              </Typography>
            </Box>
          </Grid>
          <Grid

            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box >
              <Typography style={{
                color: '#071C2C', fontSize: '16px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'
              }}>₹{fare}</Typography>
              <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
                Per Adult
              </Typography>
            </Box>
            {props.showRadio && (<Radio
              checked={props.isSelected}
              onClick={props.onSelect}
              color="primary"
            />
            )}
          </Grid>
        </Grid>


      </Box> */}
    </div>
  );
}

export default SingleDataReturn;
