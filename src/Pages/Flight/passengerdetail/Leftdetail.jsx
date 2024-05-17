import React, { useEffect, useState } from "react";
import { dangerouslySetInnerHTML } from "react";
import { Box, Flex, Spacer, Text, background } from "@chakra-ui/react";
import Grid from "@mui/material/Grid";
import Accordion from "react-bootstrap/Accordion";
import "./passenger.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
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
import LuggageIcon from "@mui/icons-material/Luggage";
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

const Leftdetail = ({ totalAmount, setamount }) => {
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
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
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
  useEffect(() => {
    if (
      adults === null ||
      adults === undefined ||
      childs === undefined ||
      childs === null ||
      infants === undefined ||
      infants === null ||
      ResultIndex === undefined ||
      ResultIndex === null ||
      data === undefined ||
      null
    ) {
      navigate("/Flightresult");
    }
  });

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
    console.warn(result, "Please fill all the details/////");
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
      if (fareValue?.IsLCC === false) {
        dispatch(PassengersAction(passengerData));
        navigate("/Flightresult/passengerdetail/flightreviewbooking", {
          state: {
            baggageDetails: baggageData,
            ssramount: baggageFare,
          },
        });
      } else {
        dispatch(PassengersAction(passengerData));
        navigate("/Flightresult/passengerdetail/flightreviewbooking", {
          state: { baggageDetails: baggageData, ssramount: baggageFare },
        });
      }
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
  console.log("reducerState", reducerState);

  const img = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const airlineName = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineName;
  const airlineCode = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const flightNumber = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const originCity =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const DestinationCity =
    fareQuoteData?.Segments?.[0]?.[fareQuoteData?.Segments[0].length - 1]
      ?.Destination?.Airport?.CityName;
  const flightFare = fareQuoteData?.Fare?.PublishedFare;
  const originTerminal =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal;
  const destinationTerminal =
    fareQuoteData?.Segments?.[0]?.[fareQuoteData?.Segments[0].length - 1]
      ?.Destination?.Airport?.Terminal;

  const timeDuration = `${Math.floor(
    fareQuoteData?.Segments?.[0]?.[0]?.Duration / 60
  )}hr ${fareQuoteData?.Segments?.[0]?.[0]?.Duration % 60}min`;

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

  const [baggagessr, setBaggagessr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBaggageAdded, setIsBaggageAdded] = useState(false);
  const [baggageList, setBaggageList] = useState([]);
  const [baggageData, setBaggageData] = useState([]);
  const [baggageFare, setBaggageFare] = useState(0);
  const [baggageBool, setBaggageBool] = useState(true);
  const [selectedBaggages, setSelectedBaggages] = useState([]);

  

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const numbersbaggaege = Number(adults) + Number(childs);
  const handleBaggageChange = (price, operation, index, baggage) => {
    const selectedQuantity = selectedBaggages[index] || 0;

    if (operation === "+" && getTotalSelectedBaggages() < numbersbaggaege) {
      setSelectedBaggages({
        ...selectedBaggages,
        [index]: selectedQuantity + 1,
      });
      updateTotalAmount(price);
      setIsBaggageAdded(true);
      if (baggageData?.length < Number(adults) + Number(childs)) {
        setBaggageData((pre) => [...baggageData, baggage]);
        let arr = [...baggageList];
        arr[index] = arr[index] + 1;
        setBaggageList(arr);
        setBaggageFare((pre) => pre + baggage?.Price);
      }
    } else if (operation === "-" && selectedQuantity > 0) {
      setSelectedBaggages({
        ...selectedBaggages,
        [index]: selectedQuantity - 1,
      });
      updateTotalAmount(-price);
      if (baggageData?.length && 0 < baggageList[index]) {
        let arr = [...baggageList];
        arr[index] = arr[index] - 1;
        setBaggageList(arr);
        setBaggageBool(true);
        let ssrcc = true;
        let sub = baggageData.filter((bagg) => {
          if (bagg?.Weight === baggage?.Weight && ssrcc) {
            setBaggageBool(false);
            ssrcc = false;
            return false;
          } else {
            return true;
          }
        });
        setBaggageData(sub);
        setBaggageFare((pre) => pre - baggage?.Price);
      }
    }
  };

  const updateTotalAmount = (price) => {
    const newAmount = totalAmount + price;
    // Prevent the total amount from going negative
    const updatedAmount = newAmount < 0 ? 0 : newAmount;
    setamount(updatedAmount);
  };

  // Function to calculate the total number of selected baggages
  const getTotalSelectedBaggages = () => {
    return Object.values(selectedBaggages).reduce((acc, curr) => acc + curr, 0);
  };

  // console.log("selectedBaggages", selectedBaggages);
  // Function to handle confirming the selection
  const handleBaggageSelection = () => {
    setIsBaggageAdded(true);
    setOpen(false);
  };

  const handleAddBaggageClick = async () => {
    setOpen(true);
    setIsLoading(true);
    // console.log("reducerstate", reducerState);
    try {
      const payload = {
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
        TraceId:
          reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
        ResultIndex: ResultIndex,
      };

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/flight/ssr`,
        payload
      );

      // console.log("API Response:", response?.data);
      setIsLoading(false);
      setBaggagessr(response?.data);
      // setOpen(true);
    } catch (error) {
      // console.error("Error calling API:", error);
      setIsLoading(false);
    }
  };

  const handlecloseicon = () => {
    setOpen(false);
  };

  // const [baggageList,setBaggageList] = useState("");
  // const [baggageListNub,setBaggageListNub] = useState("")

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
              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
              alt="flightImg"
            />{" "}
          </div>
          <span>{airlineName}</span>
          <p>
            {airlineCode} {flightNumber}
          </p>
        </div>
        <div className="singleFlightBoxTwo">
          <span>{originCity}</span>
          {/* <p>{time1.substr(0, 5)}</p> */}
          <p>
            {dayjs(fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime).format(
              "DD MMM, YY"
            )}
          </p>
          <p>
            {dayjs(fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime).format(
              "h:mm A"
            )}
          </p>
          <p>Terminal {originTerminal}</p>
        </div>
        <div className="singleFlightBoxThree">
          <h4>
            {fareQuoteData?.Segments[0].length === 2
              ? `${timeDuration} ${" - "} ${Math.floor(
                  fareQuoteData?.Segments?.[0]?.[1]?.Duration / 60
                )}hr ${fareQuoteData?.Segments?.[0]?.[1]?.Duration % 60}min`
              : `${timeDuration}`}
          </h4>
          <div>
            <img src={flightdir} />
          </div>
          <p>
            {fareQuoteData?.Segments[0].length === 2
              ? `${
                  fareQuoteData?.Segments[0].length - 1
                } stop via ${DestinationCity}`
              : "Direct Flight"}
          </p>
          <span>Refundable</span>
        </div>
        <div className="singleFlightBoxFour">
          <>
            <span>{DestinationCity}</span>
            <p>
              {dayjs(
                fareQuoteData?.Segments?.[0]?.[
                  fareQuoteData?.Segments?.[0]?.length - 1
                ]?.Destination?.ArrTime
              ).format("DD MMM, YY")}
            </p>
            <p>
              {dayjs(
                fareQuoteData?.Segments?.[0]?.[
                  fareQuoteData?.Segments?.[0]?.length - 1
                ]?.Destination?.ArrTime
              ).format("h:mm A")}
            </p>
            <p>Terminal {destinationTerminal}</p>
          </>
        </div>

        <div className="singleFlightBoxFive">
          <span>₹{flightFare}</span>
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
                              {/* <option value="3">Transgender</option> */}
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

                        {isPassportRequired === true ? (
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
                        {isPassportRequired === true ? (
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
        </div>

        <div className="col-lg-12">
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

          <div
            style={{
              // border: "1px solid black",
              padding: "2px ",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* <div>
              <LuggageIcon /> Add Luggage{" "}
            </div> */}
            <div>
              <Button
                onClick={handleAddBaggageClick}
                style={{
                  border: "1px solid red",
                  padding: "8px",
                  fontSize: "15px",
                  color: "#000",
                }}
              >
                <span>
                  <LuggageIcon />
                </span>{" "}
                Add Baggage{" "}
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="baggagewrapper">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          color: "#000000",
                          fontWeight: "500",
                          paddingBottom: "12px",
                        }}
                      >
                        {" "}
                        Add Extra Baggage
                      </p>
                      <div
                        onClick={handlecloseicon}
                        style={{ cursor: "pointer" }}
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    <div className="sectrossrc">
                      <div className="ssrc-sctive">
                        <div>
                          <img
                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`}
                            alt="flightImg"
                            style={{ height: "38px" }}
                          />{" "}
                        </div>
                        <div>
                          <span>
                            {
                              reducerState?.flightFare?.flightRuleData
                                ?.FareRules?.[0]?.Origin
                            }
                          </span>{" "}
                          -
                          <span>
                            {
                              reducerState?.flightFare?.flightRuleData
                                ?.FareRules?.[0]?.Destination
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="appendBottomssrc"
                      style={{ marginTop: "12px" }}
                    >
                      <div className="appendBottomssrcheading">
                        Included Check-in baggage per person{" "}
                        <span> 15 KG </span>
                      </div>

                      <div className="baggagelist">
                        {isLoading ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div className="spinnerssr"></div>
                          </div>
                        ) : (
                          <div className="extrabaggagesection">
                            <div>
                              <div>
                                {/* {baggagessr?.data?.Response?.Err} */}
                                {/* {baggagessr?.data?.Response?.Error?.ErrorCode !=== 0 ? (
  <div
    style={{
      fontSize: "24px",
      textAlign: "center",
      color: "red",
    }}
  >
    {baggagessr?.data?.Response?.Error?.ErrorMessage}
  </div>
) : (
  <> */}
                                {baggagessr?.data?.Response?.Baggage?.[0]
                                  ?.slice(1)
                                  .map((baggage, index) => (
                                    <div className="baglistItem" key={index}>
                                      <p className="paravaluessrc">
                                        <span>
                                          <LuggageIcon />
                                        </span>
                                        <span>
                                          Additional {baggage.Weight} kg
                                        </span>
                                      </p>
                                      <div
                                        className="paravaluessrc"
                                        style={{ position: "relative" }}
                                      >
                                        <div className="finalrpicessrc">
                                          ₹ {baggage.Price}
                                        </div>
                                        <div
                                          className="plusaddssr"
                                          onClick={() =>
                                            handleBaggageChange(
                                              baggage.Price,
                                              "-",
                                              index,
                                              baggage
                                            )
                                          }
                                        >
                                          -
                                        </div>
                                        <div className="finalrpicessrc">
                                          <div className="finalrpicessrc">
                                            {selectedBaggages[index] || 0}
                                          </div>
                                        </div>
                                        <div
                                          className="plusaddssr"
                                          onClick={() =>
                                            handleBaggageChange(
                                              baggage.Price,
                                              "+",
                                              index,
                                              baggage
                                            )
                                          }
                                        >
                                          +
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                {/* </> */}
                                {/* } */}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* {isBaggageAdded && ( */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          {getTotalSelectedBaggages()} of {numbersbaggaege}{" "}
                          Baggage(s) Selected
                        </div>
                        <div>Total Amount: ₹{totalAmount}</div>
                        <button
                          className="ssrcbutton"
                          onClick={handleBaggageSelection}
                        >
                          Book
                        </button>
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>

        <div className="col-lg-12 accor_dian">
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
        </div>

        <div className="col-lg-12">
          <div class="headingflightPassenger-new">
            <p>Fare Rule</p>
            <span>
              {data?.Origin}-{data?.Destination}
            </span>
          </div>
        </div>

        <div className="col-lg-12">
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
        </div>

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
