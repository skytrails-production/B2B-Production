import React, { useState, useEffect } from "react";
import flightdir from "../../../Images/flgihtdir.png";
import "./MultiData.css";
import dayjs from "dayjs";
import Luggage from "./Luggage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
// import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector, useReducer } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa";
// import { useDispatch, useSelector, useReducer } from "react-redux";
// import Modal from './Modal';

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

function Multidataamd(props) {
  // console.log("props",props);
  const navigate = useNavigate();
  const amdresponse = props?.flight?.flightDetails;

  const [departurename, setdeparturename] = useState("");
const [arrivalname, setarrivalnamename] = useState("");

  // const amdresult = props?.flight?.fareDetails?.groupOfFares  ;

  // amdresult?.map((fare, index) => {
  //   console.log("fare", fare);
  //   const flight = fare?.productInformation?.cabinProduct?.rbd;

  //   console.log("flight///////////////////////////////////////////////////////////////////////////////",flight)
  // })

  // console.log("amdresponse..............................................",amdresponse);
  const ResultIndex = props?.flight;
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const moment = require("moment");
  // console.log(reducerState, "reducerState");

  const flightname = reducerState?.flightnameReducer?.data?.data;
  const ispassportrequired =
    reducerState?.searchReducer?.search[0]?.CountryCode ||
    reducerState?.searchReducer?.search[1]?.CountryCode;
  // console.log("flightname",flightname);

  const handleClick = () => {
    navigate("/Passengerdetailamd", { state: { ResultIndex } });
  };

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

  // const amdresponse1 = props?.flight;
  // console.log("amdresponse////////////////////////////////",props?.flight)
  const CabinBaggage =
    props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.freeAllowance === "15"
      ? "7KG "
      : " Included ";
  // const seats = props?.flight?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct?.avlStatus || props?.flight?.fareDetails?.groupOfFares?.[1]?.productInformation?.cabinProduct?.avlStatus;

  const weightbaggage =
    props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.unitQualifier === "K"
      ? "KG"
      : `${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier}`;

  const baggage =
    props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.quantityCode === "W"
      ? `${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} ${weightbaggage}`
      : `(${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} × 23KG) `;

  // console.log("ResultIndex",props?.flight?.baggage);
  const img = amdresponse?.[0]?.flightInformation?.companyId?.marketingCarrier;

  const [getairlineName, setGetAirlineName] = useState("");

  useEffect(() => {
    // Extract the marketing carrier code from the amadeusItem object
    const marketingCarrier = img;

    // Find the airline object that matches the marketing carrier code
    const matchedAirline = flightname.find(
      (airline) => airline.airlineCode === marketingCarrier
    );

    // Set the airline name if a match is found
    if (matchedAirline) {
      setGetAirlineName(matchedAirline.airlineName);
    } else {
      setGetAirlineName("No matching airline found");
    }
  }, []);

  const locationarrival =
    amdresponse?.[0]?.flightInformation?.location?.[0]?.locationId;
  const locationdeparture =
  props?.flight?.flightDetails?.[
    props.flight.flightDetails.length - 1
  ]?.flightInformation?.location?.[1]?.locationId;
  const citynames = reducerState?.CitynameReducer?.data?.data;

  useEffect(() => {
    const cityAirline = citynames.find(
      cityairline => cityairline.id === locationdeparture,
    );


    const arrivalAirline = citynames.find(
      cityairlinearrival => cityairlinearrival.id === locationarrival,
    );

    console.log("cityAirline",arrivalAirline)

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



  function findAirlineByCode(code) {
    const data = citynames?.find(citynames => citynames?.airlineCode === code)
  
    return data?.airlineName;
  }
  function findAirportByCode(code) {
    const data = citynames?.find(citynames => citynames?.AirportCode === code)
  
    return data?.name;
  }



  const flightnumber = amdresponse?.[0]?.flightInformation?.flightOrtrainNumber;
  // console.log("flightnumber",amdresponse?.[0]?.flightInformation?.flightOrtrainNumber);

  const fare = props?.flight?.TotalPublishFare;
  const fareamount = props?.flight?.monetaryDetail?.[0]?.amount;

  // console.log("fareamountjhbjhbhjbjbjbjbjbhjbjbjhb",fareamount)
  const datearrival = moment(
    amdresponse?.[amdresponse.length - 1]?.flightInformation?.productDateTime
      ?.dateOfArrival,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  // console.log("datearrival",datearrival);
  const arrivaltime = moment(
    amdresponse?.[0]?.flightInformation?.productDateTime?.timeOfArrival,
    "HHmm"
  ).format("h:mm A");
  const datedeparture = moment(
    amdresponse?.[0]?.flightInformation?.productDateTime?.dateOfDeparture,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  // const departuretime = moment(amdresponse?.flightInformation[amdresponse?.flightInformation-1]?.productDateTime?.timeOfDeparture, "HHmm").format("h:mm A");
  // const dateconversion = dateConversion(departuretime,arrivaltime);
  const departuretime = moment(
    amdresponse?.[0]?.flightInformation?.productDateTime?.timeOfDeparture,
    "HHmm"
  ).format("h:mm A");
  const flightclass =
    props?.flight?.fareDetails?.groupOfFares?.[0]?.productInformation
      ?.cabinProduct?.rbd ||
    props?.flight?.[0]?.fareDetails?.groupOfFares?.[0]?.productInformation
      ?.cabinProduct?.rbd;
  // console.log("flightclass",props?.flight?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct
  //   ?.rbd);

  // ////////////////////////////////////////modal //////////////////////////////////////////////////////////
  // const [showModal, setShowModal] = useState(false);

  // const handleClick1 = () => {
  //   setShowModal(true);
  // };

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  const namestate = reducerState?.searchReducer?.search[0]?.name;
  const namedestnation = reducerState?.searchReducer?.search[1]?.name;

  const overallduration =
    props?.flight?.propFlightGrDetail?.flightProposal[1]?.ref;
  const hours = Math.floor(overallduration / 100); // Get the first two digits
  const minutes = overallduration % 100;

  const formattedTime = `${hours}hr ${minutes < 10 ? "0" : ""}${minutes}min`;

  // console.log("props",formattedTime);

  // //////////////////////////////////////////////////////////////////////////////////

  const amdarrival = moment(
    props?.flight?.flightDetails?.[props.flight.flightDetails.length - 1]
      ?.flightInformation?.productDateTime?.timeOfArrival,
    "HHmm"
  ).format("h:mm A");
  // console.log("kjsndjksndfknsdfknskdfnksdnfk", props?.flight)
  // console.log("arrivallocation/////////////////////////",props?.flight?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct?.avlStatus)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const description = props?.flight?.fare?.[0]?.pricingMessage?.description || props?.flight[0]?.fare?.[0]?.pricingMessage?.description;


  // console.log("description",description);



  let renderDescription = null;

  if (Array.isArray(description)) {

    renderDescription = null;
  } else if (typeof description === "string") {
   
    const words = description.split(" ");

   
    const formattedDescription = words
      .map((word, index) => (index === 0 ? word : word.toLowerCase()))
      .join(" ");
    renderDescription = (
      <p style={{ color: "green" }}>{formattedDescription}</p>
    );
  } else {
    
    renderDescription = null;
  }

  const arrivallocation =
    props?.flight?.flightDetails?.[props.flight.flightDetails.length - 1]
      ?.flightInformation?.location?.[1]?.locationId;


  return (
    <div className="singleFlightBox">
      <div className="singleFlightBoxOne" style={{ alignItems: "flex-start" }}>
        <div>
          <img
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImg"
            style={{ height: "50px", width: "50px", borderRadius: "33%" }}
          />{" "}
        </div>
        <span> {getairlineName} </span>
        <p>
          {img} {flightnumber}
        </p>
        <p style={{ color: "green", fontSize: "8px" }}>{renderDescription}</p>
      </div>
      <div className="singleFlightBoxTwo">
        {/* <span> {locationarrival} </span> */}
        <span>{arrivalname}</span>
        <p>{datedeparture} </p>
        <p style={{ fontSize: "14px" }}>{departuretime}</p>
      </div>
      <div className="singleFlightBoxThree">
        <h4>{formattedTime}</h4>
        <div>
          <img src={flightdir} />
        </div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props?.flight?.flightDetails.length - 1} Stops
          </p>
        </div>

        {/* <p>Direct Flight</p> */}

        {/* <span>{flight?.NoOfSeatAvailable} Seats Left</span> */}
      </div>
      <div className="singleFlightBoxFour">
        <span>
          {/* {
            props?.flight?.flightDetails?.[
              props.flight.flightDetails.length - 1
            ]?.flightInformation?.location?.[1]?.locationId
          } */}
          <span>{departurename}</span>
        </span>

        <p>{datearrival}</p>
        <p style={{ fontSize: "14px" }}>{amdarrival}</p>
      </div>
      <div className="singleFlightBoxFive">
        <span>₹{fareamount}</span>
        <p>Publish</p>
      </div>
      <div className="singleFlightBoxSix">
        <Luggage
          destination={arrivallocation}
          origin={locationarrival}
          cabin="7kg"
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
            {/* Book */}
            Book
          </button>
        </div>

        {/* <div>
        <button style={{color:"#E73C34",border:"none"}} onClick={handleClick1}>View details <FaArrowRight/></button>

        {showModal && (
        <div className="modal1">
          <div className="modal-content1">
          <div>
          <span style={{fontSize:"20px",fontWeight:"bold"}}>Flight Details</span>
            <span className="close1" onClick={handleClose}>&times;</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div>
            <div style={{display:"flex",flexDirection:"row",gap:"20px", color:"red", fontSize:"25px"}}>
            <p>{namestate}</p> 
            <p style={{color:"black"}}><FaArrowRight/></p>
            <p>{namedestnation}</p>

            <div style={{fontSize:"18px",color:"black", display:"flex", gap:"12px",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
              <p>{datedeparture},</p>
              <p style={{fontWeight:"bold"}}>{props?.flight?.flightDetails.length-1} Stops,</p>
              <p>{formattedTime}</p>
              
            </div>

            </div>



            <div>
            <div style={{display:"flex",gap:"12px"}}>
            <div  style={{height:"50px",width:"50px",borderRadius:"33%"}}>
          <img
          style={{height:"50px",width:"50px",borderRadius:"33%"}}
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
            alt="flightImg"
          />{" "}
          </div>
          <p style={{display:"flex",justifyContent:"center",alignItems:"center", fontSize:"18px"}}>{getairlineName}</p>
          </div>
        </div>


<div style={{overflow:"scroll",height:"400px"}}>
        {amdresponse?.map((flight, item, flightsArray) => {
          
          const departuretime1 = moment(flight?.flightInformation?.productDateTime?.timeOfDeparture,"HHmm").format("h:mm A");

  const amdarrival = moment( flight?.flightInformation?.productDateTime?.timeOfArrival, "HHmm").format("h:mm A");
  const departtime = flight?.flightInformation?.location?.[1]?.locationId;
 const locationarrival =
 flight?.flightInformation?.location?.[0]?.locationId;


 
 const durationtime =  flight?.flightInformation?.attributeDetails?.attributeDescription;
 const hours = Math.floor(durationtime / 100); 
    const minutes = durationtime % 100;

    const formattedTime = `${hours}hr ${minutes < 10 ? '0' : ''}${minutes}min`;





                            let layoverTime = null;
  if (item > 0) {
    const previousFlight = flightsArray[item - 1];
    const previousArrivalTime = moment(previousFlight?.flightInformation?.productDateTime?.timeOfArrival, "HHmm");
    const currentDepartureTime = moment(flight?.flightInformation?.productDateTime?.timeOfDeparture, "HHmm");

    const layoverDuration = moment.duration(currentDepartureTime.diff(previousArrivalTime));
    const layoverHours = Math.floor(layoverDuration.asHours());
    const layoverMinutes = layoverDuration.minutes();
    layoverTime = `${layoverHours}hr ${layoverMinutes < 10 ? '0' : ''}${layoverMinutes}min`;
  }


























  

          return(
            <div>

            <div key={item} style={{margin:"12px", backgroundColor:"#E73D3487"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"12px"}}>
           <div style={{}}>
           <div>
           
           <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
            <p> {departuretime1}</p>
           <p>{locationarrival}</p>
           </div>
           <div style={{textAlign:"center",display:"flex",flexDirection:"row",gap:"12px", justifyContent:"center",alignItems:"center"}}>

            <IoEllipsisVerticalOutline/>
            
            </div>
          

            <div style={{display:"flex",flexDirection:"row",padding:"12px",gap:"12px"}}>
            <p> {amdarrival}</p>
           <p>{departtime}</p>
           </div>

           </div>

           <div>

           </div>
          
          
           </div>

           <div>
           
           {item > 0 && (
        <div style={{ padding: "12px", textAlign: "center" }}>
          <div style={{ color: "black", fontWeight: "400", fontSize: "18px" }}>
            Layover Time: {layoverTime}
          </div>
        </div>
      )}

        
           </div>
           <div>
          <div style={{display:"flex",flexDirection:"row",gap:"25px"}}>
          <div><p>Baggage</p> <p>Adult</p></div>
          <div><p>Checkin </p>  <p>{baggage}</p></div>
          <div><p>Cabin </p><p>7 kg</p></div>
         
          </div>
           </div>
        
        </div>
          
        </div>

        </div>

          )
          
        })}


        </div>

       
      
          
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{fontSize:"20px",fontWeight:"bold"}}> ₹{fareamount}</div>
            <div className="singleFlightBoxSeven"><button  onClick={() => {
            handleClick();
          }}>Book</button></div>
            </div>

            </div>
            
          </div>
        </div>
      )}
        </div> */}

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
            {/* <Box sx={style} className="modalcolor">
              <div>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Flight Details
                </span>
                <span className="close1" onClick={handleClose}>
                  &times;
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    color: "red",
                    fontSize: "25px",
                  }}
                >
                  <p>{namestate}</p>
                  <p style={{ color: "black" }}>
                    <FaArrowRight />
                  </p>
                  <p>{namedestnation}</p>

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
                    <p>{formattedTime}</p>
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
                      {getairlineName}
                    </p>
                  </div>
                </div>

                <div style={{ overflow: "scroll", height: "400px" }}>
                  {amdresponse?.map((flight, item, flightsArray) => {
                    const departuretime1 = moment(
                      flight?.flightInformation?.productDateTime
                        ?.timeOfDeparture,
                      "HHmm"
                    ).format("h:mm A");
                    const amdarrival = moment(
                      flight?.flightInformation?.productDateTime?.timeOfArrival,
                      "HHmm"
                    ).format("h:mm A");
                    const departtime =
                      flight?.flightInformation?.location?.[1]?.locationId;
                    const locationarrival =
                      flight?.flightInformation?.location?.[0]?.locationId;

                    const durationtime =
                      flight?.flightInformation?.attributeDetails
                        ?.attributeDescription;
                    const hours = Math.floor(durationtime / 100);
                    const minutes = durationtime % 100;
                    const formattedTime = `${hours}hr ${
                      minutes < 10 ? "0" : ""
                    }${minutes}min`;

                    let layoverTime = null;
                    if (item > 0) {
                      const previousFlight = flightsArray[item - 1];
                      const previousArrivalTime = moment(
                        previousFlight?.flightInformation?.productDateTime
                          ?.timeOfArrival,
                        "HHmm"
                      );
                      const currentDepartureTime = moment(
                        flight?.flightInformation?.productDateTime
                          ?.timeOfDeparture,
                        "HHmm"
                      );

                      const layoverDuration = moment.duration(
                        currentDepartureTime.diff(previousArrivalTime)
                      );
                      const layoverHours = Math.floor(
                        layoverDuration.asHours()
                      );
                      const layoverMinutes = layoverDuration.minutes();
                      layoverTime = `${layoverHours}hr ${
                        layoverMinutes < 10 ? "0" : ""
                      }${layoverMinutes}min`;
                    }

                    return (
                      <div
                        key={item}
                        style={{ margin: "12px", backgroundColor: "#E73D3487" }}
                      >
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
                              justifyContent: "space-evenly",
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
                                <p> {departuretime1}</p>
                                <p>{locationarrival}</p>
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
                                <p> {amdarrival}</p>
                                <p>{departtime}</p>
                              </div>
                            </div>
                            <div>
                              {item > 0 && (
                                <div
                                  style={{
                                    padding: "12px",
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Layover Time: {layoverTime}
                                  </div>
                                </div>
                              )}
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
                                  <p>Baggage</p> <p>Adult</p>
                                </div>
                                <div>
                                  <p>Checkin </p> <p>{baggage}</p>
                                </div>
                                <div>
                                  <p>Cabin </p>
                                  <p>7 kg</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      

                    );
                    
                  })}
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {" "}
                    ₹{fareamount}
                  </div>
                  <div className="singleFlightBoxSeven">
                    <button
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </Box> */}


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
      <p>{namestate}</p>
      <p style={{ color: "black" }}>
        <FaArrowRight />
      </p>
      <p>{namedestnation}</p>
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
        <p>{formattedTime}</p>
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
          {getairlineName}
        </p>
      </div>
    </div>
    <div style={{ overflow: "scroll", height: "400px" }}>
      {amdresponse?.map((flight, item, flightsArray) => {
        const departuretime1 = moment(
          flight?.flightInformation?.productDateTime?.timeOfDeparture,
          "HHmm"
        ).format("h:mm A");
        const amdarrival = moment(
          flight?.flightInformation?.productDateTime?.timeOfArrival,
          "HHmm"
        ).format("h:mm A");
        const departtime = flight?.flightInformation?.location?.[1]?.locationId;
        const locationarrival = flight?.flightInformation?.location?.[0]?.locationId;
        const durationtime = flight?.flightInformation?.attributeDetails?.attributeDescription;
        const hours = Math.floor(durationtime / 100);
        const minutes = durationtime % 100;
        const formattedTime = `${hours}hr ${minutes < 10 ? "0" : ""}${minutes}min`;

        let layoverTime = null;
        if (item > 0) {
          const previousFlight = flightsArray[item - 1];
          const previousArrivalTime = moment(
            previousFlight?.flightInformation?.productDateTime?.timeOfArrival,
            "HHmm"
          );
          const currentDepartureTime = moment(
            flight?.flightInformation?.productDateTime?.timeOfDeparture,
            "HHmm"
          );

          const layoverDuration = moment.duration(currentDepartureTime.diff(previousArrivalTime));
          const layoverHours = Math.floor(layoverDuration.asHours());
          const layoverMinutes = layoverDuration.minutes();
          layoverTime = `${layoverHours}hr ${layoverMinutes < 10 ? "0" : ""}${layoverMinutes}min`;
        }

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
                      <p>{departuretime1}</p>
                      <p>{findAirportByCode(locationarrival)}</p>
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
                      <p>{amdarrival}</p>
                      <p>{findAirportByCode(departtime)}</p>
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
      <div style={{ fontSize: "20px", fontWeight: "bold" }}> ₹{fareamount}</div>
      <div className="singleFlightBoxSeven">
        <button onClick={handleClick}>Book</button>
      </div>
    </div>
  </div>
</Box>

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

export default Multidataamd;
