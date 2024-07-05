import * as React from "react";
import { styled } from "@mui/material/styles";
import  { useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Link from "@mui/icons-material/Link";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import "./passenger.css";
import { Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import Headers from "../../../Components/Headers";
import { width } from "@mui/system";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyValue = ({ data, value }) => {
  // console.log("----------------------");
  // console.log(data);
  // console.log(value);
  // console.log("----------------------");
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {data}:
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <div
            style={{
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
              width: "100px",
              textAlign: "left",
              marginLeft: "70px",
            }}
          >
            Rs. {value}.00
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default function Rightdetailamd({ amdata }) {
  const dispatch = useDispatch();
  const moment = require("moment");
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("amdata", amdata);
  const adult = sessionStorage.getItem("adults");
  const child =  sessionStorage.getItem("childs");
  const infant = sessionStorage.getItem("infants");
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // console.log("adult,child",adult,child);


  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;

  let total = 0;

  const departure =
    amdata?.flightDetails?.flightInformation?.location?.[0]?.locationId ||
    amdata?.flightDetails?.[0]?.flightInformation?.location?.[0]?.locationId;
    const arrival =
    amdata?.flightDetails?.flightInformation?.location?.[1]?.locationId ||
    amdata?.flightDetails?.[amdata?.flightDetails.length-1]?.flightInformation?.location?.[1]?.locationId;

    const datedeparture = moment(
      amdata?.flightDetails?.flightInformation?.productDateTime
        ?.dateOfDeparture ||
        amdata?.flightDetails?.[0]?.flightInformation?.productDateTime
          ?.dateOfDeparture,
      "DDMMYYYY"
    ).format("DD MMM, YY");

    const citynames = reducerState?.CitynameReducer?.data?.data;

    function findAirportByCode(code) {
      const data = citynames?.find(citynames => citynames?.AirportCode === code)
    
      return data.name;
      }

    // console.log("amdata?.flightDetails",amdata?.flightDetails)

     const airlinenumber =
    amdata?.flightDetails?.flightInformation?.flightOrtrainNumber ||
    amdata?.flightDetails?.[0]?.flightInformation?.flightOrtrainNumber;

    const adultamount = amdata?.[0]?.paxFareDetail?.totalFareAmount || amdata?.paxFareDetail?.totalFareAmount  ;
    const chilsamount = amdata?.[1]?.paxFareDetail?.totalFareAmount ;
    const infantamount = amdata?.[2]?.paxFareDetail?.totalFareAmount ;

    const  childmultiply =  chilsamount*child;

    const infantmultiplicity = infantamount*infant;
    const totalTax = amdata?.monetaryDetail?.[1]?.amount    ;
   

    const multiplydata =  adultamount*adult;

    const baseamount = amdata?.monetaryDetail?.[0]?.amount;
    const grandtotalamount =Number( baseamount) +Number( markUpamount);
    // console.log("adultamount",childtax,adulttaxtax, totalTax, amdata?.paxFareDetail?.totalTaxAmount);
    // console.log()

  return (
    <>
      {/* {fareQuote === 0 ? (
        <> */}
      <div className="priceSummary">
        <div className="head">
          <span>Price Summary</span>
        </div>
      
        <div style={{display:"flex", justifyContent:"space-between", padding:"12px"}}>
         <p>{datedeparture}</p>
         <p>{airlinenumber}</p>
        </div>

        {/* {amdata} */}
        {amdata?.flightDetails?.flightInformation ? 
        <>
          <div className="totCOmm">
         <div>
         <p style={{fontWeight:"bold"}}>
         From</p>
          <p style={{ color: "black" }}>{findAirportByCode(departure)}</p>
          </div>
 <div> <p style={{fontWeight:"bold"}}>To</p>
  <p style={{ color: "black" }}>{findAirportByCode(arrival)}</p></div> 

        </div>
        </> : 
         <div>
         <div>
      {amdata?.flightDetails.map((flight, index) => {
        const datedeparture = moment(
          flight.flightInformation.productDateTime?.dateOfDeparture,
          "DDMMYYYY"
        ).format("DD MMM, YY");

        return (
          <div className="totCOmm" key={index}>
          <div className="head" style={{border:"none"}}>
              {/* <p style={{ fontWeight: "bold" }}>Departure Date</p> */}
              <p style={{ color: "black" }}>{datedeparture}</p>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>From</p>
              <p style={{ color: "black" }}>
                {findAirportByCode(flight.flightInformation.location[0].locationId)}
              </p>
              <p style={{ color: "black" }}>
                {/* Terminal: {flight.flightInformation.location[0].terminal} */}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>To</p>
              <p style={{ color: "black"}}>
                {findAirportByCode(flight.flightInformation.location[1].locationId)}
              </p>
              <p style={{ color: "black" }}>
                {/* Terminal: {flight.flightInformation.location[1].terminal} */}
              </p>
            </div>
            
          </div>
        );
      })}
    </div>
    </div> }
        {/* <div className="totCOmm">
         <div>
         <p style={{fontWeight:"bold"}}>
         From</p>
          <p style={{ color: "black" }}>{departure}</p>
          </div>
 <div> <p style={{fontWeight:"bold"}}>To</p>
  <p style={{ color: "black" }}>{arrival}</p></div> 

        </div> */}

        {/* <div className="totCOmm">
         <div style={{borderBottom:"none"}}>
         <p>
         Adult(s) ({adult} × {adultamount}) 
         </p>
        <p>{multiplydata}</p>
        </div> 
        <div style={{borderBottom:"none"}}>
        {child > 0 &&  `Child(s) (${child} × ${chilsamount})` }
         <p> {child > 0 && `${childmultiply}`}</p>
        </div> 
        <div style={{borderBottom:"none"}}>
        {infant > 0 &&  `infant(s) (${infant} × ${infantamount})` }
         <p> {infant > 0 && `${infantmultiplicity}`}</p>
        </div>
        </div> */}

        <div className="TotGst">
        {/* <div>
            <span>Other Tax : </span>
            <p>
              {"₹"}
              {totalTax}
            </p>
          </div> */}
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
      <div style={{display:"flex",flexDirection:"row ",justifyContent:"space-between",width:"100%"}}>
      <div>
      <button onClick={toggleDetails} style={{background:"none",border:"none",padding:"0px",marginRight:"2px"}}>
        {showDetails ? '-' : '+'}
      </button>
        <span>Base Fare : </span>
        </div>
        {/* <p>{totalAmount}</p> */}
        <p>
          {"₹"}
          {baseamount}
        </p>
      </div>
      
      {showDetails && (
        <div className="totCOmm" style={{width:"100%"}}>
          <div style={{ borderBottom: "none" }}>
            <p>
              Adult(s) ({adult} × {adultamount})
            </p>
            <p>{"₹"} {multiplydata} </p>
          </div>
          <div style={{ borderBottom: "none" }}>
            {child > 0 && (
              <>
                <p>Child(s) ({child} × {chilsamount})</p>
                <p>{"₹"} {childmultiply}</p>
              </>
            )}
          </div>
          <div style={{ borderBottom: "none" }}>
            {infant > 0 && (
              <>
                <p>Infant(s) ({infant} × {infantamount})</p>
                <p>{"₹"} {infantmultiplicity}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
          <div>
            <span>Others Tax : </span>
            {/* <p>{totalAmount}</p> */}
            <p>
              {"₹"}
              {/* {markUpamount + totalTax} */}
              {markUpamount}
            </p>
          </div>
          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}
              {/* {amdata.TotalPublishFare + markUpamount} */}
              {grandtotalamount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
