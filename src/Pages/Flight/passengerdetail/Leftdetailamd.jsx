import React, { useEffect, useState } from "react";
import Luggage from "../flightresult/Luggage";
import { dangerouslySetInnerHTML } from "react";
import { Box, Flex, Spacer, Text, background } from "@chakra-ui/react";
// import Grid from "@mui/material/Grid";
import Accordion from "react-bootstrap/Accordion";
import "./passenger.css";
// import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import flightdir from "../../../Images/flgihtdir.png";
import groupimg from "../../../Images/Groupl.png";
import {
  bookAction,
  bookActionGDS,
} from "../../../Redux/FlightBook/actionFlightBook";
import { PassengersAction } from "../../../Redux/Passengers/passenger";
import Headers from "../../../Components/Headers";
import FlightLoader from "../FlightLoader/FlightLoader";
import Alert from "@mui/material/Alert";
import {
  FalseAllActionReturn,
  quoteActionReturn,
  ruleActionReturn,
  setLoading,
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import dayjs from "dayjs";
// import LuggageIcon from "@mui/icons-material/Luggage";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import CloseIcon from "@mui/icons-material/Close";
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
// import LuggageIcon from '@mui/icons-material/Luggage';

const style = {
  background: "#fff",
  minWidth: "700px",
  padding: "30px",
  position: "fixed",
  transform: "translate(-50%, -50%)",
  top: "50%",
  zIndex: "100",
  left: "50%",
  borderRadius: "2px",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "white",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

const Leftdetail = ({ amdata, airesellRes }) => {
  // console.log("amddata", amdata);
  // const airesellRes = airesellRes;
  // console.log("airesellRes",airesellRes);
  const ameduesresponse = amdata;
  const moment = require("moment");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const reducerState = useSelector((state) => state);
  // console.log("reducerState", reducerState);
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const [farePrice, setFarePrice] = useState("");

  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const isPassportRequired =
    reducerState?.searchReducer?.search[0]?.CountryCode !== "IN " ||
    reducerState?.searchReducer?.search[1]?.CountryCode !== "IN ";
  // console.log("fareValue", fareValue);
  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const data = reducerState?.oneWay?.oneWayData?.data?.data?.Response;
  //error show state
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [dateError, setDateError] = useState("");
  const [sub, setSub] = useState(false);
  const [alert, setAlert] = useState(false);
  // console.warn("resucer state.....................", reducerState)
  // useEffect(() => {
  //   if (
  //     adults === null ||
  //     adults === undefined ||
  //     childs === undefined ||
  //     childs === null ||
  //     infants === undefined ||
  //     infants === null ||
  //     ResultIndex === undefined ||
  //     ResultIndex === null ||
  //     data === undefined ||
  //     null
  //   ) {
  //     navigate("/Flightresult");
  //   }
  // });

  const passengerTemplate = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 1,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    AddressLine1: "test",
    AddressLine2: "test2",
    Fare: farePrice,
    City: "gurgaon",
    CountryCode: "IN",
    CellCountryCode: "+91-",
    ContactNo: "",
    Nationality: "",
    Email: "",
    IsLeadPax: true,
    FFAirlineCode: null,
    FFNumber: "",
    GSTCompanyAddress: "",
    GSTCompanyContactNumber: "",
    GSTCompanyName: "",
    GSTNumber: "",
    GSTCompanyEmail: "",
  };
  const childPassenger = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 2,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };
  const infantPassenger = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 3,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };
  let totalPassenger = Number(adults) + Number(childs) + Number(infants);
  const passengerLists = [];
  const passengerChildLists = [];
  const passengerInfantLists = [];
  // useEffect(() => {
  //   // dispatch(setLoading(reducerState?.flightFare))

  //   dispatch(FalseAllActionReturn(reducerState?.flightFare))
  //   console.warn("seLoding dispatch cleanup complete",reducerState?.flightFare)
  // }, [])
  // console.warn(
  //   "seLoding dispatch cleanup complete 1111111111111111111111",
  //   reducerState?.flightFare
  // );

  useEffect(() => {
    if (fareValue) {
      let fareDetails = fareValue?.Fare;
      let fareBreakdown = fareValue?.FareBreakdown;
      // console.log("fareDetails: ", fareDetails);
      let arr = [];
      fareBreakdown.map((price, key) => {
        let obj1 = {
          Currency: price?.Currency,
          BaseFare: price?.BaseFare / price?.PassengerCount,
          Tax: price?.Tax / price?.PassengerCount,
          YQTax: price?.YQTax / price?.PassengerCount,
          AdditionalTxnFeePub:
            price?.AdditionalTxnFeePub / price?.PassengerCount,
          AdditionalTxnFeeOfrd:
            price?.AdditionalTxnFeeOfrd / price?.PassengerCount,
          // OtherCharges: price?.OtherCharges / price?.PassengerCount,
          // Discount: price?.Discount / price?.PassengerCount,
          // PublishedFare: +price?.BaseFare + +price?.Tax / price?.PassengerCount,
          // OfferedFare: price?.OfferedFare / price?.PassengerCount,
          // TdsOnCommission: price?.TdsOnCommission / price?.PassengerCount,
          // TdsOnPLB: price?.TdsOnPLB / price?.PassengerCount,
          // TdsOnIncentive: price?.TdsOnIncentive / price?.PassengerCount,
          // ServiceFee: price?.ServiceFee / price?.PassengerCount,
        };
        arr.push(obj1);
        // console.log(arr[1]);
        setFarePrice(arr);
      });

      // let obj = {
      //   Currency: fareDetails.Currency,
      //   BaseFare: fareDetails.BaseFare / totalPassenger,
      //   Tax: fareDetails.Tax / totalPassenger,
      //   YQTax: fareDetails.YQTax / totalPassenger,
      //   AdditionalTxnFeePub: fareDetails.AdditionalTxnFeePub / totalPassenger,
      //   AdditionalTxnFeeOfrd: fareDetails.AdditionalTxnFeeOfrd / totalPassenger,
      //   OtherCharges: fareDetails.OtherCharges / totalPassenger,
      //   Discount: fareDetails.Discount / totalPassenger,
      //   PublishedFare: fareDetails.PublishedFare / totalPassenger,
      //   OfferedFare: fareDetails.OfferedFare / totalPassenger,
      //   TdsOnCommission: fareDetails.TdsOnCommission / totalPassenger,
      //   TdsOnPLB: fareDetails.TdsOnPLB / totalPassenger,
      //   TdsOnIncentive: fareDetails.TdsOnIncentive / totalPassenger,
      //   ServiceFee: fareDetails.ServiceFee / totalPassenger,
      // };
      // setFarePrice(obj);
    }
  }, [fareValue]);
  // console.log("farePrice", farePrice);
  for (let i = 0; i < adults; i++) {
    passengerLists.push({
      ...passengerTemplate,
      IsLeadPax: i === 0, // Set the first passenger as the lead passenger
    });
  }

  for (let i = 0; i < childs; i++) {
    passengerChildLists.push({
      ...childPassenger,
      IsLeadPax: false, // Set the first passenger as the lead passenger
    });
  }
  for (let i = 0; i < infants; i++) {
    passengerInfantLists.push({
      ...infantPassenger,
      IsLeadPax: false, // Set the first passenger as the lead passenger
    });
  }
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  // const [passengerData,setPassengerData] = useState(allPassenger.flat())

  const [passengerList, setPassengerList] = useState(passengerLists);
  const allPassenger = [
    passengerLists,
    passengerChildLists,
    passengerInfantLists,
  ];
  const [passengerData, setPassengerData] = useState(allPassenger.flat());
  const handleServiceChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...passengerData];
    if (i < adults) {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[0];
      }
    }
    if (i >= adults && i < +adults + +childs) {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[1];
      }
    } else {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[2];
      }
    }
    list[i][name] = value;
    setPassengerData(list);
  };
  // console.log("passengerData", passengerData);
  // console.warn("passengerTemplate", passengerList);

  // useEffect(() => {
  //   if (reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode == 0) {
  //     navigate("flightreviewbooking");
  //   } else {
  //     alert(
  //       `${reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage}`
  //     );
  //   }
  // }, [reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode, navigate]);

  const hii = { h11: "hii", h1: "h2", h3: "h3", h4: "" };
  // const ps = Object.keys(hii)

  // async function validate() {
  //   const ps1 = await Object.values(passengerTemplate).filter((x) => x !== "");
  //   const ps2 = await Object.values(childPassenger).filter((x) => x !== "");
  //   const ps3 = await Object.values(infantPassenger).filter((x) => x !== "");

  //   if (ps1.length > 0 || ps2.length > 0 || ps3.length > 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // validate();
  function validatePhoneNumber(phoneNumber) {
    // Define the regular expression pattern for a valid phone number
    var phonePattern = /^\d{10}$/;

    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
  }
  function validateEmail1(email) {
    // Define the regular expression pattern for a valid phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the phone number against the pattern
    return emailRegex.test(email);
  }

  function isValidEmail(email, phoneNumber) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\d{10}$/;

    // Test the phone number against the pattern
    const result2 = validatePhoneNumber(phoneNumber);

    // Test the email against the regular expression
    const result1 = validateEmail1(email);
    const result = result1 && result2;
    // console.warn(result, "Please fill all the details/////");
    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSub(true);

    // const payloadGDS = {
    //   ResultIndex: ResultIndex,
    //   Passengers: passengerData,

    //   EndUserIp: reducerState?.ip?.ipData,
    //   TokenId: reducerState?.ip?.tokenData,
    //   TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    // };

    const formData = new FormData(event.target);
    // console.warn(
    //   passengerData,
    //   "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7"
    // );

    // if (!formData.get("FirstName")) {
    //   setFromError("Enter First Name");
    //   return;
    // }
    // if (!formData.get("to")) {
    //   setToError("Enter Arrival City");
    //   return;
    // }
    // if (!formData.get("departure")) {
    //   setDateError("Select Date");
    //   return;
    // }
    // console.warn(passengerList, "passengerListemailValnooooooooooooooooooooooooooooo");
    const valid = await passengerData.filter(
      (item) =>
        item.FirstName === "" || item.LastName === "" || item.DateOfBirth === ""
    );
    // const res= isValidEmail(passengerList[0].Email)
    const emailVal = await passengerList.filter(
      (item) =>
        // console.warn(passengerList[0].Email, "***********************************************nooooooooooooooooooooooooooooo")

        !isValidEmail(item.Email, item.ContactNo)
    );

    if (valid.length === 0 && emailVal.length === 0) {
      // if (fareValue?.IsLCC === false) {
      dispatch(PassengersAction(passengerData));
      navigate("/Flightresult/passengerdetail/flightreviewbookingamd", {
        state: { amdata: ameduesresponse, airesellRes: airesellRes },
      });
      // console.log("ameduesresponse",amdata)
      // } else {
      //   dispatch(PassengersAction(passengerData));
      //   navigate("/Flightresult/passengerdetail/flightreviewbookingamd", {
      //     state: { amdata: ameduesresponse },
      //   });
      // }
    } else {
      // alert("Please fill all the details");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  // end
  // console.log("fareQuoteData", reducerState);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const datet = new Date();

  const maxDateValue = new Date(datet);
  maxDateValue.setFullYear(datet.getFullYear() - 12);
  const minDateValueChild = new Date(datet);
  const maxDateValueChild = new Date(datet);
  const minDateValueInfer = new Date(datet);

  minDateValueChild.setFullYear(datet.getFullYear() - 11);
  maxDateValueChild.setFullYear(datet.getFullYear() - 2);
  minDateValueInfer.setFullYear(datet.getFullYear() - 2);

  const currentDate = formatDate(datet);
  const maxDate = formatDate(maxDateValue);
  const minDateChild = formatDate(minDateValueChild);
  const maxDateChild = formatDate(maxDateValueChild);
  const minDateInfer = formatDate(maxDateValueChild);

  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  // console.log("reducerState", reducerState);

  if (fareQuoteData?.Segments[0].length === 2) {
    const dateTime = new Date(
      fareQuoteData?.Segments[0][1]?.Destination?.ArrTime
    );

    // Format date (30, Dec-2023)
    const options = { day: "2-digit", month: "short", year: "numeric" };
    var formattedDateStop = dateTime.toLocaleDateString("en-US", options);

    // Format time (9:00 AM)
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    var formattedTimeStop = dateTime.toLocaleTimeString("en-US", optionsTime);
  }

  // /////////////////////////////////////amd response/////////////////////////

  const imgvalue =
    amdata?.flightDetails?.flightInformation?.companyId?.marketingCarrier ||
    amdata?.flightDetails?.[0]?.flightInformation?.companyId?.marketingCarrier;

  const airlinenumber =
    amdata?.flightDetails?.flightInformation?.flightOrtrainNumber ||
    amdata?.flightDetails?.[0]?.flightInformation?.flightOrtrainNumber;

  const departure =
    amdata?.flightDetails?.flightInformation?.location?.[1]?.locationId ||
    amdata?.flightDetails?.[amdata?.flightDetails.length - 1]?.flightInformation
      ?.location?.[1]?.locationId;

  const arrival =
    amdata?.flightDetails?.flightInformation?.location?.[0]?.locationId ||
    amdata?.flightDetails?.[0]?.flightInformation?.location?.[0]?.locationId;

  const arrivaltime = moment(
    amdata?.flightDetails?.flightInformation?.productDateTime?.timeOfArrival ||
      amdata?.flightDetails?.[amdata?.flightDetails.length - 1]
        ?.flightInformation?.productDateTime?.timeOfArrival,
    "HHmm"
  ).format("h:mm A");

  const departuretime = moment(
    amdata?.flightDetails?.flightInformation?.productDateTime
      ?.timeOfDeparture ||
      amdata?.flightDetails?.[0]?.flightInformation?.productDateTime
        ?.timeOfDeparture,
    "HHmm"
  ).format("h:mm A");

  const datedeparture = moment(
    amdata?.flightDetails?.flightInformation?.productDateTime
      ?.dateOfDeparture ||
      amdata?.flightDetails?.[0]?.flightInformation?.productDateTime
        ?.dateOfDeparture,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  const datearrival = moment(
    amdata?.flightDetails?.flightInformation?.productDateTime?.dateOfArrival ||
      amdata?.flightDetails?.[amdata?.flightDetails.length - 1]
        ?.flightInformation?.productDateTime?.dateOfArrival,
    "DDMMYYYY"
  ).format("DD MMM, YY");
  const seats =
    amdata?.fareDetails?.groupOfFares?.productInformation?.cabinProduct
      ?.avlStatus;

  const flightclass =
    amdata?.fareDetails?.groupOfFares?.productInformation?.cabinProduct?.rbd ||
    amdata?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct
      ?.rbd ||
    amdata?.[0]?.fareDetails?.groupOfFares?.productInformation?.cabinProduct
      ?.rbd ||
    amdata?.[0]?.fareDetails?.groupOfFares?.[0]?.productInformation
      ?.cabinProduct?.rbd;

  // console.log(" amdata?.[0]?.fareDetails?.groupOfFares?.[0]?.productInformation?.cabinProduct?.rbd", amdata?.[0]?.fareDetails?.groupOfFares?.productInformation?.cabinProduct?.rbd);

  const CabinBaggage =
    amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.freeAllowance === "15"
      ? "7KG "
      : " Included ";

  // const cabinbaggage
  // console.log("CabinBaggag......................................................e", amdata)
  const weightbaggage =
    amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.unitQualifier ||
    amdata?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "K"
      ? "KG"
      : `${
          amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.unitQualifier ||
          amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.unitQualifier
        }`;
  // const baggage = props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.quantityCode
  // === "W" ? `${props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} ${weightbaggage}` : `(${(props?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance)} × 23KG) `;

  const baggage =
    (amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
      ?.quantityCode ||
      amdata?.baggage?.freeBagAllownceInfo?.baggageDetails?.quantityCode) ===
    "W"
      ? `${
          amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.freeAllowance ||
          amdata?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance
        } ${weightbaggage}`
      : `(${
          amdata?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance ||
          amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.freeAllowance
        } × 23KG)`;
  // console.log("imgvalue", amdata);

  // //////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {alert && (
        <Alert className="alert_passenger" onClick={() => {}} severity="error">
          Please fill all the details
        </Alert>
      )}

      <div className="singleFlightBox justify-content-evenly">
        <div className="singleFlightBoxOne">
          <div>
            <img
              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${imgvalue}.png`}
              alt="flightImg"
            />{" "}
          </div>
          <span>{imgvalue}</span>
          <p>
            {/* {airlineCode} {flightNumber} */}
            {airlinenumber}
          </p>
        </div>
        <div className="singleFlightBoxTwo">
          <span>{arrival}</span>
          {/* <p>{time1.substr(0, 5)}</p> */}
          <p>{datedeparture}</p>
          <p>{departuretime}</p>
          {/* <p>Terminal {originTerminal}</p> */}
        </div>
        <div className="singleFlightBoxThree">
          <h4>
            {/* {fareQuoteData?.Segments[0].length === 2
              ? `${timeDuration} ${" - "} ${Math.floor(
                  fareQuoteData?.Segments?.[0]?.[1]?.Duration / 60
                )}hr ${fareQuoteData?.Segments?.[0]?.[1]?.Duration % 60}min`
              : `${timeDuration}`} */}
            {/* {seats} */}
          </h4>
          <div>
            <img src={flightdir} />
          </div>
          <p style={{ color: "red" }}>
            {/* {fareQuoteData?.Segments[0].length === 2
              ? `${
                  fareQuoteData?.Segments[0].length - 1
                } stop via ${DestinationCity}`
              : "Direct Flight"} */}
            {/* {seats} Seats Left */}
          </p>
          {/* <span>Refundable</span> */}
        </div>
        <div className="singleFlightBoxFour">
          <>
            <span>{departure}</span>
            <p>{datearrival}</p>
            <p>{arrivaltime}</p>
            <p>
              {/* Terminal */}
              {/* {destinationTerminal} */}
            </p>
          </>
        </div>

        <div className="singleFlightBoxFive">
          <span>₹{amdata?.monetaryDetail?.[0]?.amount}</span>
          <p>Publish</p>
        </div>
      </div>

      <div className="col-lg-12">
        <div class="headingflightPassenger-new">
          <p>Passenger Details</p>
          <span>
            Total Adult(s) : {adults} Child: {childs} Infants: {infants}
          </span>
        </div>
      </div>

      <form className="p-0" onSubmit={(e) => handleSubmit(e)} validate>
        <div className="">
          <form className="p-0" onSubmit={handleSubmit}>
            <Box>
              {Array.from({ length: adults }, (err, i) => {
                return (
                  <div className="mb-2">
                    <div
                      className="p-2 mb-2 passenTitle"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_163_1749)">
                          <path
                            d="M7.5 7.55921C8.14897 7.55921 8.78337 7.36676 9.32297 7.00622C9.86256 6.64567 10.2831 6.13321 10.5315 5.53364C10.7798 4.93407 10.8448 4.27432 10.7182 3.63782C10.5916 3.00132 10.2791 2.41665 9.82019 1.95776C9.3613 1.49887 8.77664 1.18636 8.14014 1.05975C7.50364 0.933146 6.84389 0.998126 6.24432 1.24648C5.64475 1.49483 5.13229 1.91539 4.77174 2.45499C4.41119 2.99459 4.21875 3.62899 4.21875 4.27796C4.21875 5.1482 4.56445 5.9828 5.17981 6.59815C5.79516 7.2135 6.62976 7.55921 7.5 7.55921ZM7.5 8.49671C5.46621 8.49671 1.40625 9.75296 1.40625 12.2467V14.1217H13.5938V12.2467C13.5938 9.75296 9.53379 8.49671 7.5 8.49671Z"
                            fill="#071C2C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_163_1749">
                            <rect
                              width="15"
                              height="15"
                              fill="white"
                              transform="translate(0 0.0592041)"
                            />
                          </clipPath>
                        </defs>
                      </svg>{" "}
                      Passenger {i + 1} {i == 0 ? "( Lead )" : ""}
                    </div>
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-6">
                          <Box>
                            <div className="form_input">
                              <label className="form_lable">Title*</label>
                              <select
                                name="Title"
                                onChange={(e) => handleServiceChange(e, i)}
                              >
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                                <option value="Miss">Miss</option>
                              </select>
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          {" "}
                          <Box>
                            <div className="form_input">
                              <label className="form_lable">First name*</label>
                              <input
                                name="FirstName"
                                placeholder="Enter your name"
                                onChange={(e) => handleServiceChange(e, i)}
                                required
                              />

                              {passengerData[i].FirstName == "" && sub && (
                                <span id="error1">Enter First Name</span>
                              )}
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <Box>
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Last Name*
                              </label>
                              <input
                                name="LastName"
                                placeholder="Enter your last name"
                                onChange={(e) => handleServiceChange(e, i)}
                                required
                              />
                              {passengerData[i].LastName == "" && sub && (
                                <span id="error1">Enter Last Name</span>
                              )}
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                          <div className="hotel_form_input">
                            <label className="form_lable">Gender*</label>
                            <select
                              name="Gender"
                              className="form_input_select"
                              onChange={(e) => handleServiceChange(e, i)}
                            >
                              <option value="1">Female</option>
                              <option value="2">Male</option>
                              <option value="3">Others</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          {" "}
                          <Box>
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Date Of Birth*
                              </label>
                              <input
                                type="date"
                                name="DateOfBirth"
                                onChange={(e) => handleServiceChange(e, i)}
                                required
                                // value={maxDate}
                                // min={minDate}
                                max={maxDate}
                              />
                              {passengerData[i].DateOfBirth == "" && sub && (
                                <span id="error1">Enter DOB</span>
                              )}
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <Box>
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Email*
                              </label>
                              <input
                                type="email"
                                name="Email"
                                placeholder="Enter Email"
                                onChange={(e) => handleServiceChange(e, i)}
                              />
                              {!validateEmail1(passengerData[i].Email) &&
                                sub && <span id="error1">Enter Email</span>}
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <Box>
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                ContactNo*
                              </label>
                              <input
                                type="number"
                                name="ContactNo"
                                placeholder="Enter ContactNo"
                                onChange={(e) => handleServiceChange(e, i)}
                                required
                              />
                              {!validatePhoneNumber(
                                passengerData[i].ContactNo
                              ) == true &&
                                sub && <span id="error1">Enter Contact</span>}
                            </div>
                          </Box>
                        </div>

                        {/* {isPassportRequired  ? (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportNo*
                                </label>
                                <input
                                  name="PassportNo"
                                  type="text"
                                  required
                                  placeholder="Enter Passport No"
                                  onChange={(e) => handleServiceChange(e, i)}
                                />
                              </div>
                            </Box>
                          </div>
                        ) : (
                          ""
                        )}
                        {isPassportRequired  ? (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportExpiry*
                                </label>
                                <input
                                  name="PassportExpiry"
                                  type="date"
                                  required
                                  placeholder="Enter Passport date"
                                  onChange={(e) => handleServiceChange(e, i)}
                                />
                              </div>
                            </Box>
                          </div>
                        ) : (
                          ""
                        )} */}

                        {isPassportRequired && (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportNo*
                                </label>
                                <input
                                  name="PassportNo"
                                  type="text"
                                  required
                                  placeholder="Enter Passport No"
                                  onChange={(e) => handleServiceChange(e, i)}
                                />
                              </div>
                            </Box>
                          </div>
                        )}

                        {isPassportRequired && (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportExpiry*
                                </label>
                                <input
                                  name="PassportExpiry"
                                  type="date"
                                  required
                                  placeholder="Enter Passport date"
                                  onChange={(e) => handleServiceChange(e, i)}
                                />
                              </div>
                            </Box>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Box>
            {childs > 0 && (
              <Box className="mid_header" p={5} mt={25}>
                {Array.from({ length: childs }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <div className=" p-2 ">Child {i + 1}</div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                First name*
                              </label>
                              <input
                                name="FirstName"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                                required
                              />
                              {passengerData[Number(adults) + i].FirstName ==
                                "" &&
                                sub && (
                                  <span id="error1">Enter First Name</span>
                                )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Last name*
                              </label>
                              <input
                                name="LastName"
                                placeholder="Enter your last name"
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                                required
                              />
                              {passengerData[Number(adults) + i].LastName ==
                                "" &&
                                sub && <span id="error1">Enter Last Name</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="hotel_form_input">
                              <label className="form_lable">Gender*</label>
                              <select
                                name="Gender"
                                className="form_input_select"
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                              >
                                <option value="1">Female</option>
                                <option value="2">Male</option>
                                <option value="3">Transgender</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Date Of Birth*
                              </label>
                              <input
                                type="date"
                                name="DateOfBirth"
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                                required
                                max={maxDateChild}
                                min={minDateChild}
                              />
                              {passengerData[Number(adults) + i].DateOfBirth ==
                                "" &&
                                sub && <span id="error1">Enter DOB</span>}
                            </div>
                          </div>

                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <Box>
                                <div className="form_input">
                                  <label className="form_lable">
                                    Passport No*
                                  </label>
                                  <input
                                    name="PassportNo"
                                    type="text"
                                    required
                                    placeholder="Enter Passport No"
                                    onChange={(e) =>
                                      handleServiceChange(e, i + Number(adults))
                                    }
                                  />
                                </div>
                              </Box>
                            </div>
                          ) : (
                            ""
                          )}
                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <Box>
                                <div className="form_input">
                                  <label className="form_lable">
                                    Passport Expiry*
                                  </label>
                                  <input
                                    name="PassportExpiry"
                                    type="date"
                                    required
                                    placeholder="Enter Passport date"
                                    onChange={(e) =>
                                      handleServiceChange(e, i + Number(adults))
                                    }
                                  />
                                </div>
                              </Box>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Box>
            )}
            {infants > 0 && (
              <Box className="mid_header" p={5} mt={25}>
                {Array.from({ length: infants }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <span className=" p-2 ">Infant {i + 1}</span>
                      <div className=" col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                First name*
                              </label>
                              <input
                                name="FirstName"
                                placeholder="Enter your name"
                                required
                                onChange={(e) =>
                                  handleServiceChange(
                                    e,
                                    i + Number(adults) + Number(childs)
                                  )
                                }
                              />
                              {passengerData[
                                i + Number(adults) + Number(childs)
                              ].FirstName == "" &&
                                sub && (
                                  <span id="error1">Enter First Name</span>
                                )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Last name*
                              </label>
                              <input
                                name="LastName"
                                placeholder="Enter your last name"
                                required
                                onChange={(e) =>
                                  handleServiceChange(
                                    e,
                                    i + Number(adults) + Number(childs)
                                  )
                                }
                              />
                              {passengerData[
                                i + Number(adults) + Number(childs)
                              ].LastName == "" &&
                                sub && <span id="error1">Enter Last Name</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="hotel_form_input">
                              <label className="form_lable">Gender*</label>
                              <select
                                name="Gender"
                                className="form_input_select"
                                onChange={(e) =>
                                  handleServiceChange(
                                    e,
                                    i + Number(adults) + Number(childs)
                                  )
                                }
                              >
                                <option value="1">Female</option>
                                <option value="2">Male</option>
                                <option value="3">Others</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Date Of Birth*
                              </label>
                              <input
                                type="date"
                                name="DateOfBirth"
                                className="deaprture_input form_input_select"
                                required
                                min={minDateInfer}
                                max={currentDate}
                                onChange={(e) =>
                                  handleServiceChange(
                                    e,
                                    i + Number(adults) + Number(childs)
                                  )
                                }
                              />
                              {passengerData[
                                i + Number(adults) + Number(childs)
                              ].DateOfBirth == "" &&
                                sub && <span id="error1">Enter DOB</span>}
                            </div>
                          </div>
                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportNo*
                                </label>
                                <input
                                  name="PassportNo"
                                  type="text"
                                  required
                                  placeholder="Enter Passport No"
                                  onChange={(e) =>
                                    handleServiceChange(
                                      e,
                                      i + Number(adults) + Number(childs)
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <div className="form_input">
                                <label className="form_lable">
                                  PassportExpiry*
                                </label>
                                <input
                                  name="PassportExpiry"
                                  type="date"
                                  required
                                  placeholder="Enter Passport date"
                                  onChange={(e) =>
                                    handleServiceChange(
                                      e,
                                      i + Number(adults) + Number(childs)
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Box>
            )}
          </form>
        </div>

        <div className="col-lg-12">
          <div class="headingflightPassenger-new">
            <p>Baggage Details</p>
          </div>

          <Grid container style={{ width: "100%" }}>
            <Grid item style={{ width: "100%" }}>
              <TableContainer
                component={Paper}
                style={{ boxShadow: "none", width: "100%" }}
              >
                <Table
                  aria-label="customized table"
                  style={{
                    boxShadow: "none",
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          Sector
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          Cabin
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          Check-In
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          Fare Class
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {arrival}-{departure}
                      </StyledTableCell>
                      <StyledTableCell align="right">7KG</StyledTableCell>
                      <StyledTableCell align="right">{baggage}</StyledTableCell>
                      <StyledTableCell align="right">
                        {flightclass}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>

        {/* <div className="col-lg-12">
          {fareValue?.Segments?.map((data1, index) => {
            const len = data1.length;
            return (
              <div className="BaggageSector">
                <div>
                  <p>Sector</p>
                  <span>
                    {data1[0]?.Origin?.Airport?.AirportCode}-
                    {data1[len - 1]?.Destination?.Airport?.AirportCode}
                  </span>
                </div>
                <div>
                  <p>Cabin</p>
                  <span>
                    {data1[0]?.CabinBaggage ? data1[0]?.CabinBaggage : "7 Kg"}
                  </span>
                </div>
                <div>
                  <p>Check-In</p>
                  <span>{data1[0]?.Baggage}</span>
                </div>
              </div>
            );
          })}

          <div className="listBox">
            <div>
              <p>Select Excess Baggage (Extra charge will be applicable):</p>
              <ul>
                <li>No Excess / Extra Baggage</li>
              </ul>
            </div>
            <div>
              <p>Select Excess Baggage (Extra charge will be applicable):</p>
              <ul>
                <li>Add No Meal Rs. 0</li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* <div className="col-lg-12 accor_dian">
          {fareRule &&
            fareRule.length > 0 &&
            fareRule.map((dat) => {
              return (
                <Box my={2}>
                  <Accordion defaultActiveKey={null}>
                    <Accordion.Item>
                      <Accordion.Header>
                        <p>Detailed Fare Rules</p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div
                          className="htmlFare"
                          dangerouslySetInnerHTML={{
                            __html: dat?.FareRuleDetail,
                          }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Box>
              );
            })}
        </div> */}

        {/* <div className="col-lg-12">
          <div class="headingflightPassenger-new">
            <p>Fare Rule</p>
            <span>
              {data?.Origin}-{data?.Destination}
            </span>
          </div>
        </div> */}

        {/* <div className="col-lg-12">
          <div className="fareRuleleft">
            <div>
              <div>
                <p>Cancellation</p>
                <span>INR 3500 from 0 To 3 Days before dept</span>
                <span>INR 3000 from 4 Days & above before dept</span>
              </div>
              <div>
                <p>Reissue</p>
                <span>INR 3250 from 0 To 3 Days before dept</span>
                <span>INR 2750 from 4 Days & above before dept</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="col-lg-12 mt-5 mb-4 leftDetBut-new">
          <button type="submit" style={{ border: "none" }}>
            Proceed to Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Leftdetail;
