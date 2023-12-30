import { Grid, Box, Typography, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../MultiData.css";
import Nonrefundable from "../Nonrefundable";
import { useDispatch, useSelector, useReducer } from "react-redux";
import Luggage from "../Luggage";
import flightdir from "../../../../Images/flgihtdir.png";

const MultipleDataReturn = (props) => {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const flight = props.flight;
  const wholeFlight = props.wholeFlight
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
  const img = flight[0]?.Airline?.AirlineCode;
  const stop = props.stop;
  const results =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;


  const time = `${Math.floor(flight[0]?.Duration / 60)}hr ${flight[0].Duration % 60
    }min`;

  const dateString = flight[0]?.Origin?.DepTime;
  const date1 = new Date(dateString);
  const time1 = date1.toLocaleTimeString();

  const day1 = date1.getDate();
  const month1 = date1.toLocaleString("default", {
    month: "short",
  });
  const year1 = date1.getFullYear();
  const formattedDate1 = `${day1} ${month1} ${year1}`;

  const dateString1 = flight[1]?.Destination?.ArrTime;
  const date2 = new Date(dateString1);
  const time2 = date2.toLocaleTimeString();

  const day2 = date2.getDate();
  const month2 = date2.toLocaleString("default", {
    month: "short",
  });
  const year2 = date2.getFullYear();
  const formattedDate2 = `${day2} ${month2} ${year2}`;
  // console.log("flightDetails: ", data);
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
    <div
      style={{}}



      onClick={() => {
        props.onSelect(props.index);
        handleClick(props.wholeFlight, props.index);
      }}>

      <div className="singleDataReturnBox">
        <div className="returnBoxOne">
          <div><img src={`${process.env.PUBLIC_URL}/FlightImages/${img}.png`} /> </div>
          <span>{flight[0]?.Airline?.AirlineName}</span>
          <p>{flight[0]?.Airline?.FlightNumber}{" "}{flight[0]?.Airline?.FlightNumber}</p>
        </div>
        <div className="returnBoxTwo">
          <span>{flight[0]?.Origin?.Airport?.CityName}</span>
          <p>{time1.substr(0, 5)}</p>
        </div>
        <div className="returnBoxThree">
          <h4>{time}</h4>
          <div><img src={flightdir} /></div>
          <p>{`1 stop via ${flight[0]?.Destination?.Airport?.CityName}`}</p>
          <span>{flight?.NoOfSeatAvailable} Seats Left</span>
        </div>
        <div className="returnBoxFour">
          <span>{flight[1]?.Destination?.Airport?.CityName}</span>
          <p>{time2.substr(0, 5)}</p>
        </div>
        <div className="returnBoxFive">
          <span>₹{fare}</span>
          <p>Publish</p>
        </div>
        <div className="singlereturnBoxSix">
          {props.showRadio && (<Radio
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
        width="410px"
        height="86px"
        alignItems="space-between"
        justifyContent="space-between"
        padding="5px"

      >
        <Box
          sx={{
            width: "auto",
            display: "flex",
            alignItems: 'center',
            height: "30px",
            gap: '7px'


          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/FlightImages/${img}.png`}
            alt="flight"
            style={{
              width: "60px",
              height: "30px",
            }}
          />
          <Box>

            <Typography style={{ color: '#071C2C', fontSize: '16px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
              {flight[0]?.Airline?.AirlineName}
            </Typography>
            <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>
              {flight[0]?.Airline?.FlightNumber}
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          style={{
            display: "flex",
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
                {flight[0]?.Origin?.Airport?.CityName}
              </Typography>
            </Box>
          </Grid>
          <Grid >
            <Box display="flex" justifyContent="center">
              <Box display="flex" flexDirection='column' alignItems="center" justifyContent='center'>
                <Box px={1} textAlign="center">
                  <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '700' }}>{time}</Typography>
                </Box>
                <Box backgroundColor="#DFD049" display="flex" justifyContent='center' alignItems='center' width="77px" height='2px'>
                  <Box display="flex" justifyContent='center' alignItems='center' style={{
                    width: '8px',
                    height: "8px",
                    borderRadius: "100%"
                  }}>
                    <Box backgroundColor='#5E5B5B' width="4px"
                      height="4px" borderRadius="8px" />
                  </Box>
                </Box>


                <Box px={1} textAlign="center">
                  <Typography style={{ color: '#BBBBBB', fontSize: '12px', fontFamily: 'Montserrat', fontWeight: '700' }}>
                    {`1 stop via ${flight[0]?.Destination?.Airport?.CityName}`}
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
                {flight[1]?.Destination?.Airport?.CityName}
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
    </div >
  );
};


export default MultipleDataReturn;
