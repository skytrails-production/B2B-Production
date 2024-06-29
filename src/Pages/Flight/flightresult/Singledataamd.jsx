import React, {useState,useEffect} from "react";
import flightdir from "../../../Images/flgihtdir.png";
import dayjs from "dayjs";
import { useDispatch, useSelector, useReducer } from "react-redux";
import Luggage from "./Luggage";
import { FaArrowRight } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { FaArrowRight } from 'react-icons/fa';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Singledataamd(props) {
  const navigate = useNavigate();
  // console.log(props, "props");
const dispatch = useDispatch();
const reducerState = useSelector((state) => state);

  const amdresponse = props?.flight?.flightDetails;
  const ResultIndex = props?.flight;
  // console.log("bjhhjbhjbjbjbjbhjbj",ResultIndex);
  const moment = require("moment");

  function dateConversion(startTime, endTime) {
    const startingtime = moment(startTime, "HHmm");
    let endtiming = moment(endTime, "HHmm");
    if (startingtime.isAfter(endtiming)) {
      endtiming = endtiming.add(1, "day");
    }

    const timedifference = endtiming.diff(startingtime, "minutes");

    const hours = Math.floor(timedifference / 60);
    const minutes = timedifference % 60;
    return `${hours}hr ${minutes}min`;
  }
// console.log("reducerState//////singledata////////////////////",reducerState)

const flightname = reducerState?.flightnameReducer?.data?.data;

// console.log("citynames",citynames[0],flightname[0]);



const img = amdresponse?.flightInformation?.companyId?.marketingCarrier;
const description = props?.flight?.fare?.[0]?.pricingMessage?.description || props?.flight[0]?.fare?.[0]?.pricingMessage?.description;

let renderDescription = null;

if (Array.isArray(description)) {
 
  renderDescription = null;
} else if (typeof description === 'string') {

  const words = description.split(' ');

  const formattedDescription = words
    .map((word, index) => (index === 0 ? word : word.toLowerCase()))
    .join(' ');

 
  renderDescription = <p style={{ color: "green" }}>{formattedDescription}</p>;
} else {
  
  renderDescription = null;
}


const locationdeparture =
amdresponse?.flightInformation?.location?.[1]?.locationId;

const locationarrival =
amdresponse?.flightInformation?.location?.[0]?.locationId;



const [getairlineName, setGetAirlineName] = useState('');
const [departurename, setdeparturename] = useState("");
const [arrivalname, setarrivalnamename] = useState("");

    useEffect(() => {
      // Extract the marketing carrier code from the amadeusItem object
      const marketingCarrier = img;
      // const cityname = img;

      // Find the airline object that matches the marketing carrier code
      const matchedAirline = flightname.find(
        airline => airline.airlineCode === marketingCarrier,
      );

      // console.log("matchedAirline",matchedAirline)

      // const citynamevalue = 

      // Set the airline name if a match is found
      if (matchedAirline) {
        setGetAirlineName(matchedAirline.airlineName);
      } else {
        setGetAirlineName('No matching airline found');
      }
    }, []);

    useEffect(() => {
      const cityAirline = citynames.find(
        cityairline => cityairline.id === locationdeparture,
      );


      const arrivalAirline = citynames.find(
        cityairlinearrival => cityairlinearrival.id === locationarrival,
      );

      // console.log("cityAirline",arrivalAirline)

      if (cityAirline) {
        setdeparturename(cityAirline.name);
      } else {
        setdeparturename('No matching airline found');
      }


      if (arrivalAirline) {
        setarrivalnamename(arrivalAirline.name);
      } else {
        setarrivalnamename('No matching airline found');
      }
    }, []);


    // console.log("cityname",cityname)

// console.log("getairlineName",getairlineName);


const citynames = reducerState?.CitynameReducer?.data?.data;
function findAirlineByCode(code) {
  const data = citynames?.find(citynames => citynames?.airlineCode === code)

  return data?.airlineName;
}
function findAirportByCode(code) {
  const data = citynames?.find(citynames => citynames?.AirportCode === code)

  return data?.name;
  }













  const handleClick = () => {
    navigate("/Passengerdetailamd", {state: {ResultIndex }});
  }
  // console.log("props",props);

  const flightclass =  props?.flight?.fareDetails?.groupOfFares?.productInformation?.cabinProduct
?.rbd || props?.flight?.[0]?.fareDetails?.groupOfFares?.productInformation?.cabinProduct
?.rbd;
// console.log("flightclass",flightclass, props)
  
  const flightnumber = amdresponse?.flightInformation?.flightOrtrainNumber;

 

  const fare = props?.flight?.TotalPublishFare;
  const faredata = props?.flight?.monetaryDetail?.[0]?.amount;
  const datearrival = moment(
    amdresponse?.flightInformation?.productDateTime?.dateOfArrival,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  const arrivaltime = moment(
    amdresponse?.flightInformation?.productDateTime?.timeOfArrival,
    "HHmm"
  ).format("h:mm A");
  const datedeparture = moment(
    amdresponse?.flightInformation?.productDateTime?.dateOfDeparture,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  const departuretime = moment(
    amdresponse?.flightInformation?.productDateTime?.timeOfDeparture,
    "HHmm"
  ).format("h:mm A");
  const seats =  ResultIndex?.fareDetails?.groupOfFares?.productInformation?.cabinProduct?.avlStatus;
  // console.log("seats",seats)
  const dateconversion = dateConversion(departuretime, arrivaltime);
  // const CabinBaggage = props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance === "15" ? "7KG " : " Included "
  // const seats = props?.flight?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct?.avlStatus || props?.flight?.fareDetails?.groupOfFares?.[1]?.productInformation?.cabinProduct?.avlStatus;

  //   console.log("seats",locationarrival,fare,arrivaltime,dateconversion);

  // console.log(datearrival, "flight amd");
  const weightbaggage = props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "K" ? "KG" : `${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier}`
  const baggage = props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.quantityCode
  === "W" ? `${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} ${weightbaggage}` : `(${(props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance)} × 23KG) `;


  // const [showModal, setShowModal] = useState(false);

  // const handleClick1 = () => {
  //   setShowModal(true);
  // };

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const namestate = reducerState?.searchReducer?.search[0]?.name;
  const namedestnation = reducerState?.searchReducer?.search[1]?.name;

  const overallduration = props?.flight?.propFlightGrDetail?.flightProposal[1]?.ref;
const hours = Math.floor(overallduration / 100); // Get the first two digits
    const minutes = overallduration % 100;

    const formattedTime = `${hours}hr ${minutes < 10 ? '0' : ''}${minutes}min`;

// console.log("props",formattedTime);

 

  return (
    <div className="singleFlightBox">
      <div className="singleFlightBoxOne" style={{alignItems:"flex-start"}}>
        <div>
          <img
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImg"
            style={{height:"50px",width:"50px",borderRadius:"33%"}}
          />{" "}
        </div>
        <span> {getairlineName} </span>
        <p>
          {img} {flightnumber}
        </p>
        <p style={{color:"green",fontSize:"8px"}}>{renderDescription}</p>
      </div>
      <div className="singleFlightBoxTwo">
        {/* <span> {locationarrival} </span> */}
        <span>{arrivalname}</span>
        <p>{datedeparture} </p>
        <p style={{ fontSize: "14px" }}>{departuretime}</p>
      </div>
      <div className="singleFlightBoxThree">
        <h4>{dateconversion}</h4>
        <div>
          <img src={flightdir} />
        </div>

        {/* <p>Direct Flight</p> */}
        {/* <span> {seats} Seats Left</span> */}
      </div>
      <div className="singleFlightBoxFour">
        {/* <span>{locationdeparture}</span> */}
       
        <span>{departurename}</span>

        <p>{datearrival}</p>
        <p style={{ fontSize: "14px" }}>{arrivaltime}</p>
      </div>
      <div className="singleFlightBoxFive">
        <span>₹{faredata}</span>
        <p>Publish</p>
      </div>
      <div className="singleFlightBoxSix">
      <Luggage
        destination={locationdeparture}
        origin={locationarrival}
        cabin="7 kg"
        checkin={baggage}
        fareClass={flightclass}
      />
      {/* <Nonrefundable /> */}
    </div>
    <div>
      <div className="singleFlightBoxSeven">
        <button
        onClick={() => {
          handleClick();
        }}
        >
         
          Book
          
        </button>
       
      </div>


     


        <div>
        <Button style={{color:"#E73C34",border:"none"}} onClick={handleOpen}> View details <FaArrowRight/></Button>
      
      <Modal
        aria-labelledby="flight-details-modal-title"
        aria-describedby="flight-details-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
       className="modalcolor rmvBG"
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}  className="modalcolor">
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <Typography id="flight-details-modal-title" variant="h6" component="h2">
                Flight Details
              </Typography>
              <span className="close1" onClick={handleClose} style={{cursor: 'pointer'}}>&times;</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div>
                <div style={{display:"flex",flexDirection:"row",gap:"20px", color:"red", fontSize:"25px"}}>
                  {/* <p>{namestate}</p>  */}
                  <p>{findAirportByCode(locationarrival)}</p>
                  <p style={{color:"black"}}><FaArrowRight/></p>
                  <p>{findAirportByCode(locationdeparture)}</p>
                  <div style={{fontSize:"18px",color:"black", display:"flex", gap:"12px",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
                    <p>{datedeparture},</p>
                    <p>{formattedTime}</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{display:"flex",gap:"12px"}}>
                  <div style={{height:"50px",width:"50px",borderRadius:"33%"}}>
                    <img
                      style={{height:"50px",width:"50px",borderRadius:"33%"}}
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
                      alt="flightImg"
                    />
                  </div>
                  <p style={{display:"flex",justifyContent:"center",alignItems:"center", fontSize:"18px"}}>{getairlineName}</p>
                </div>
              </div>
              <div style={{margin:"12px", backgroundColor:"#E73D3487"}}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"12px"}}>
                  <div>
                    <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
                      <p>{departuretime}</p>
                      <p>{findAirportByCode(locationarrival)}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <IoEllipsisVerticalOutline />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
                      <p>{arrivaltime}</p>
                      <p>{findAirportByCode(locationdeparture)}</p>
                    </div>
                  </div>
                  {/* <div>
                    <div style={{display:"flex",flexDirection:"row",gap:"25px"}}>
                      <div><p>Checkin </p>  <p>{baggage}</p></div>
                      <div><p>FareClass </p>  <p>{flightclass}</p></div>
                    </div>
                  </div> */}
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
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontSize:"20px",fontWeight:"bold"}}> ₹{faredata}</div>
                <div className="singleFlightBoxSeven">
                  <Button variant="contained" onClick={() => {
                    handleClick();
                  }}>Book</Button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>




      </div>

      {/* {reducerState?.return?.returnData?.data?.data?.Response?.Results[1] ? (
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
                        {dayjs(results[1][0]?.Segments[0][0]?.Origin?.DepTime).format("DD MMM, YY")}
                      </span>
                      <p style={{ paddingBottom: "5px", margin: 0 }}>
                        {dayjs(results[1][0]?.Segments[0][0]?.Origin?.DepTime).format("h:mm A")}
                      </p>

                     
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
                          {dayjs(results[1][0]?.Segments[0][0]?.Destination?.ArrTime).format("DD MMM, YY")}
                        </span>
                        <p style={{ paddingBottom: "5px", margin: 0 }}>
                          {dayjs(results[1][0]?.Segments[0][0]?.Destination?.ArrTime).format("h:mm A")}
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
    )} */}
    </div>
  );
}

export default Singledataamd;
