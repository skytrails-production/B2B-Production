import { Grid, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../MultiData.css";
import Nonrefundable from "../Nonrefundable";
import { useDispatch, useSelector, useReducer } from "react-redux";
import Luggage from "../Luggage";

const MultipleDataReturnInternational = (props) => {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const flight = props.flight;
  const wholeFlight = props.wholeFlight;
  const IsLCC = props.IsLCC;
  // console.log("flight multiple", flight);
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
  const img = flight?.Airline?.AirlineCode;
  const stop = props.stop;
  const results =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  // console.log("Results", results);
  const handleClick = (allDetails, ResultIndex) => {
    const slicedResultIndex = ResultIndex.slice(0, 2);
    // console.log("Handel Click Index Key", slicedResultIndex);
    // console.log("hghfdsjgdsjsfd", props.flight);

    if (slicedResultIndex == "OB") {
      sessionStorage.setItem("flightDetailsONGo", JSON.stringify(allDetails));
    }
    if (slicedResultIndex == "IB") {
      sessionStorage.setItem("flightDetailsIncome", JSON.stringify(allDetails));
    }
  };

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        props.onSelect(props.index);
        handleClick(props.wholeFlight, props.index);
      }}
      border={props.isSelected ? "2px solid red" : ""}
    >
      <Box>
        {/* {console.log("flightInternational", flight)} */}
        {flight?.map((data, index) => {
          const img = data[0]?.Airline?.AirlineCode;

          const time = `${Math.floor(data[0]?.Duration / 60)}hr ${
            data[0].Duration % 60
          }min`;

          const dateString = data[0]?.Origin?.DepTime;
          const date1 = new Date(dateString);
          const time1 = date1.toLocaleTimeString();

          const day1 = date1.getDate();
          const month1 = date1.toLocaleString("default", {
            month: "short",
          });
          const year1 = date1.getFullYear();
          const formattedDate1 = `${day1} ${month1} ${year1}`;

          const dateString1 = data[0]?.Destination?.ArrTime;
          const date2 = new Date(dateString1);
          const time2 = date2.toLocaleTimeString();

          const day2 = date2.getDate();
          const month2 = date2.toLocaleString("default", {
            month: "short",
          });
          const year2 = date2.getFullYear();
          const formattedDate2 = `${day2} ${month2} ${year2}`;
          // console.log("flightDetails: ", data);
          return (
            <div>
              <Box display="flex" justifyContent="space-between">
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid md={2} sm={2} py={3}>
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
                          src={`${process.env.PUBLIC_URL}/FlightImages/${img}.png`}
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
                          {data[0]?.Airline?.AirlineName}
                        </Typography>
                        <Typography className="flight_class">
                          {data[0]?.Airline?.AirlineCode}{" "}
                          {data[0]?.Airline?.FlightNumber}
                        </Typography>
                        <Typography>
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
                          {formattedDate1}
                        </span>
                        <p style={{ paddingBottom: "5px", margin: 0 }}>
                          {time1}
                        </p>
                      </Typography>
                      <Typography className="flight_class">
                        {data[0]?.Origin?.Airport?.CityName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={2} sm={2} py={4}>
                    <Box display="flex" justifyContent="center">
                      <Box>
                        <Box px={1} textAlign="center">
                          <Typography className="flight_class">
                            {time}
                          </Typography>
                        </Box>
                        <Box px={1} textAlign="center">
                          <Typography className="flight_class">
                            {stop - 1} Stops
                          </Typography>
                        </Box>
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
                          {formattedDate2}
                        </span>
                        <p style={{ paddingBottom: "5px", margin: 0 }}>
                          {time2}
                        </p>
                      </Typography>
                      <Typography className="flight_class">
                        {data[0]?.Destination?.Airport?.CityName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    md={2}
                    sm={2}
                    py={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box px={1}>
                      <Typography className="flight_price">₹{fare}</Typography>
                    </Box>
                  </Grid>
                  <Grid
                    md={2}
                    sm={2}
                    py={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box px={1}>
                      <Typography className="flight_price">₹{fare}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* {index === flight[0].length - 1 && ( */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  className="seat_left"
                  display="flex"
                  alignItems="center"
                >
                  {data[0]?.NoOfSeatAvailable} Seats Left
                </Typography>
                <Box display="flex">
                  <Luggage
                    destination={data[0]?.Destination?.Airport?.AirportCode}
                    origin={data[0]?.Origin?.Airport?.AirportCode}
                    cabin={data[0]?.CabinBaggage}
                    checkin={data[0]?.Baggage}
                    fareClass={data[0]?.Airline?.FareClass}
                  />
                  {/* <Fairrule /> */}
                  <Nonrefundable />
                </Box>
                <Grid
                  md={2}
                  sm={2}
                  py={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <button
                      onClick={() => {
                        // console.log("indexKey inside loop", indexKey);
                        handleClick(indexKey);
                      }}
                    >
                      <div class="svg1-wrapper1-1">
                        <div class="svg1-wrapper1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="15"
                            height="15"
                            id="svg1"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              fill="currentColor"
                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span id="span1">Book Now</span>
                    </button> */}
                </Grid>
              </Box>
              {/* )} */}
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultipleDataReturnInternational;
