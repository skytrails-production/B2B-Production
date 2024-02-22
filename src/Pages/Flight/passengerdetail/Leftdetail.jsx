import React, { useEffect, useState } from "react";
import { dangerouslySetInnerHTML } from "react";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import Grid from "@mui/material/Grid";
import Accordion from "react-bootstrap/Accordion";
import "./passenger.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import flightdir from "../../../Images/flgihtdir.png"
import groupimg from "../../../Images/Groupl.png";
import {
  bookAction,
  bookActionGDS,
} from "../../../Redux/FlightBook/actionFlightBook";
import { PassengersAction } from "../../../Redux/Passengers/passenger";
import Headers from "../../../Components/Headers";
import FlightLoader from "../FlightLoader/FlightLoader";
import Alert from "@mui/material/Alert";
import { FalseAllActionReturn, quoteActionReturn, ruleActionReturn, setLoading } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";

const Leftdetail = () => {


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
  console.warn("resucer state.....................", reducerState)
  useEffect(()=>{
    if(adults===null || adults===undefined || childs===undefined|| childs===null||infants===undefined|| infants===null|| ResultIndex===undefined || ResultIndex===null||data===undefined || null){
      navigate("/Flightresult")
    }
  })

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
  console.warn("seLoding dispatch cleanup complete 1111111111111111111111",reducerState?.flightFare)
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
    return result
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setSub(true)

    // const payloadGDS = {
    //   ResultIndex: ResultIndex,
    //   Passengers: passengerData,

    //   EndUserIp: reducerState?.ip?.ipData,
    //   TokenId: reducerState?.ip?.tokenData,
    //   TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    // };

    const formData = new FormData(event.target);
    console.warn(passengerData, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7")

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
    const emailVal = await passengerList.filter((item) =>

      // console.warn(passengerList[0].Email, "***********************************************nooooooooooooooooooooooooooooo")

      !isValidEmail(item.Email, item.ContactNo)


    )

    if (valid.length === 0 && emailVal.length === 0) {

      if (fareValue?.IsLCC === false) {
        dispatch(PassengersAction(passengerData));
        navigate("/Flightresult/passengerdetail/flightreviewbooking");
      } else {
        dispatch(PassengersAction(passengerData));
        navigate("/Flightresult/passengerdetail/flightreviewbooking");
      }
    } else {
      // alert("Please fill all the details");
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000);
    }

    // if()

    // const payload = {
    //   PreferredCurrency: null,
    //   ResultIndex: ResultIndex,
    //   AgentReferenceNo: "sonam1234567890",
    //   Passengers: [
    //     {
    //       Title: formData.get("title"),
    //       FirstName: formData.get("name"),
    //       LastName: formData.get("lastname"),
    //       PaxType: 1,
    //       DateOfBirth: formData.get("dateofbirth"),
    //       Gender: formData.get("gender"),
    //       PassportNo: "",
    //       PassportExpiry: "",
    //       AddressLine1: formData.get("address"),
    //       AddressLine2: "",
    //       Fare: {
    //         Currency:fareValue?.Fare?.Currency,
    //         BaseFare: fareValue?.Fare?.BaseFare,
    //         Tax: fareValue?.Fare?.Tax,
    //         YQTax: fareValue?.Fare?.YQTax,
    //         AdditionalTxnFeePub: fareValue?.Fare?.AdditionalTxnFeePub,
    //         AdditionalTxnFeeOfrd: fareValue?.Fare?.AdditionalTxnFeeOfrd,
    //         OtherCharges: fareValue?.Fare?.OtherCharges,
    //         Discount:fareValue?.Fare?.Discount,
    //         PublishedFare: fareValue?.Fare?.PublishedFare,
    //         OfferedFare: fareValue?.Fare?.OfferedFare,
    //         TdsOnCommission: fareValue?.Fare?.TdsOnCommission,
    //         TdsOnPLB: fareValue?.Fare?.TdsOnPLB,
    //         TdsOnIncentive: fareValue?.Fare?.TdsOnIncentive,
    //         ServiceFee: fareValue?.Fare?.ServiceFee
    //       },
    //       City: formData.get("city"),
    //       CountryCode: "IN",
    //       CountryName: formData.get("country"),
    //       Nationality: "IN",
    //       ContactNo: formData.get("mobilenumber"),
    //       Email: formData.get("email"),
    //       IsLeadPax: true,
    //       FFAirlineCode: "6E",
    //       FFNumber: "123",
    //       Baggage: [
    //         {
    //           AirlineCode: fareValue?.Segments[0]?.Airline?.AirlineCode,
    //           FlightNumber: fareValue?.Segments[0]?.Airline?.FlightNumber,
    //           WayType: ,
    //           Code: ,
    //           Description: ,
    //           Weight: 0,
    //           Currency: "INR",
    //           Price: 0,
    //           Origin: "DEL",
    //           Destination: "DXB",
    //         },
    //       ],
    //       MealDynamic: [
    //         {
    //           AirlineCode: "6E",
    //           FlightNumber: "23",
    //           WayType: 2,
    //           Code: "No Meal",
    //           Description: 2,
    //           AirlineDescription: "",
    //           Quantity: 0,
    //           Currency: "INR",
    //           Price: 0,
    //           Origin: "DEL",
    //           Destination: "DXB",
    //         },
    //       ],
    //       SeatDynamic: [
    //         {
    //           AirlineCode: "6E",
    //           FlightNumber: "2978",
    //           CraftType: "A320-180",
    //           Origin: "DEL",
    //           Destination: "DXB",
    //           AvailablityType: 1,
    //           Description: 2,
    //           Code: "2A",
    //           RowNo: "2",
    //           SeatNo: "A",
    //           SeatType: 1,
    //           SeatWayType: 2,
    //           Compartment: 1,
    //           Deck: 1,
    //           Currency: "INR",
    //           Price: 300,
    //         },
    //       ],
    //       GSTCompanyAddress: "",
    //       GSTCompanyContactNumber: "",
    //       GSTCompanyName: "",
    //       GSTNumber: "",
    //       GSTCompanyEmail: "",
    //     },
    //   ],
    //   EndUserIp: reducerState?.ip?.ipData,
    //   TokenId: reducerState?.ip?.tokenData,
    //   TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    // };
    // dispatch(bookAction(payload));

    // sessionStorage.setItem("Passengers", payload?.Passengers);
    // navigate("flightreviewbooking");

  }

  // Add form

  // const handleServiceChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...serviceList];
  //   list[index][name] = value;
  //   setServiceList(list);
  // };

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
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const datet = new Date();

  // Set the minimum date to 12 years ago
  // const minDateValue = new Date(datet);
  const maxDateValue = new Date(datet);
  maxDateValue.setFullYear(datet.getFullYear() - 12);
  const minDateValueChild = new Date(datet);
  const maxDateValueChild = new Date(datet);
  const minDateValueInfer = new Date(datet);

  minDateValueChild.setFullYear(datet.getFullYear() - 11)
  maxDateValueChild.setFullYear(datet.getFullYear() - 2)
  minDateValueInfer.setFullYear(datet.getFullYear() - 2)





  const currentDate = formatDate(datet)
  const maxDate = formatDate(maxDateValue)
  const minDateChild = formatDate(minDateValueChild)
  const maxDateChild = formatDate(maxDateValueChild)
  const minDateInfer = formatDate(maxDateValueChild)




  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  // console.log(fareQuoteData, "fare quote data");


  const img = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const airlineName = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineName;
  const airlineCode = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const flightNumber = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const originCity = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const DestinationCity = fareQuoteData?.Segments?.[0]?.[fareQuoteData?.Segments[0].length-1]?.Destination?.Airport?.CityName;
  const flightFare = fareQuoteData?.Fare?.PublishedFare;
  const originTerminal = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal;
  const destinationTerminal = fareQuoteData?.Segments?.[0]?.[fareQuoteData?.Segments[0].length-1]?.Destination?.Airport?.Terminal;



console.log(fareQuoteData?.Segments[0],'length')

  // const time = `${Math.floor(fareQuoteData?.Segments?.[0]?.[0]?.Duration / 60)}hr ${fareQuoteData?.Segments?.[0]?.[0]?.Duration % 60
  //   }min`;
  // const dateString = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime;
  // const date1 = new Date(dateString);
  // const time1 = date1.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const day = date1.getDate();
  // const month = date1.toLocaleString("default", {
  //   month: "short",
  // });
  // const year = date1.getFullYear();
  // const formattedDate = `${day} ${month} ${year}`;

  // const dateString1 = fareQuoteData?.Segments?.[0]?.[0]?.Destination?.ArrTime;
  // const date2 = new Date(dateString1);
  // const time2 = date2.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const day1 = date2.getDate();
  // const month1 = date2.toLocaleString("default", {
  //   month: "short",
  // });







  const timeDuration = `${Math.floor(fareQuoteData?.Segments?.[0]?.[0]?.Duration / 60)}hr ${fareQuoteData?.Segments?.[0]?.[0]?.Duration % 60
    }min`;
  const dateString = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime;
  const date1 = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date1.toLocaleString("en-US", options);
  const [month, day, year, time, ampm] = formattedDate.split(" ");
  const desiredFormat = `${day}${month}-${year} ${time} ${ampm}`;


  const dateString1 = fareQuoteData?.Segments?.[0]?.[0]?.Destination?.ArrTime;
  const date2 = new Date(dateString1);
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate1 = date2.toLocaleString("en-US", options1);
  const [month1, day1, year1, time1, ampm1] =
    formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;


  if(fareQuoteData?.Segments[0].length===2){
  const dateTime = new Date(fareQuoteData?.Segments[0][1]?.Destination?.ArrTime);

// Format date (30, Dec-2023)
const options = { day: '2-digit', month: 'short', year: 'numeric' };
var formattedDateStop = dateTime.toLocaleDateString('en-US', options);

// Format time (9:00 AM)
const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
var formattedTimeStop = dateTime.toLocaleTimeString('en-US', optionsTime);

  }

  // console.warn(minDateChild, "minDateChild", maxDateChild, "maxDateChild", 'currentDate&&&&&&&&&&&&&&&&&&&&&&&&&78888888888888888888')

  return (
    <div>
      {alert &&
        <Alert className="alert_passenger" onClick={() => {
          // dispatch(signUpActionClear());
        }} severity="error">
          Please fill all the details
        </Alert>}

      <div className="singleFlightBox justify-content-evenly">
        <div className="singleFlightBoxOne">
          <div><img src={`${process.env.PUBLIC_URL}/FlightImages/${img}.png`} /> </div>
          <span>{airlineName}</span>
          <p>{airlineCode}{" "}{flightNumber}</p>
        </div>
        <div className="singleFlightBoxTwo">
          <span>{originCity}</span>
          {/* <p>{time1.substr(0, 5)}</p> */}
          <p>{desiredFormat.slice(0, 12)}</p>
          <p>{desiredFormat.slice(13)}</p>
          <p>Terminal{' '}{originTerminal}</p>
        </div>
        <div className="singleFlightBoxThree">
          <h4>{fareQuoteData?.Segments[0].length===2?`${timeDuration} ${" - "} ${Math.floor(fareQuoteData?.Segments?.[0]?.[1]?.Duration / 60)}hr ${fareQuoteData?.Segments?.[0]?.[1]?.Duration % 60
    }min`:`${timeDuration}`}</h4>
          <div><img src={flightdir} /></div>
          <p>{fareQuoteData?.Segments[0].length===2?`${fareQuoteData?.Segments[0].length-1} stop via ${DestinationCity}`:'Direct Flight'}</p>
          <span>Refundable</span>
        </div>
        <div className="singleFlightBoxFour">
  {fareQuoteData?.Segments[0].length === 2 ? (
    <>
      <span>{fareQuoteData?.Segments[0][fareQuoteData?.Segments[0].length-1]?.Destination?.Airport?.CityName}</span>           
      <p>{formattedDateStop}</p>
      <p>{formattedTimeStop}</p>
      <p>Terminal {fareQuoteData?.Segments[0][fareQuoteData?.Segments[0].length-1]?.Destination?.Airport?.Terminal}</p>
    </>
  ) : (
    <>
      <span>{DestinationCity}</span>
      <p>{desiredFormat1.slice(0, 12)}</p>
      <p>{desiredFormat1.slice(13)}</p>
      <p>Terminal {destinationTerminal}</p>
    </>
  )}
</div>

        <div className="singleFlightBoxFive">
          <span>₹{flightFare}</span>
          <p>Publish</p>
        </div>
      </div>

      <div className="col-lg-12">
        <div class="headingflightPassenger">
          <p>Passenger Details</p>
          <span>Total Adult(s) :{' '} {adults} Child:{' '} {childs} Infants: {' '} {infants}</span>
        </div>
      </div>


      <form className="p-0" onSubmit={(e) => handleSubmit(e)} validate>
        <div className="">
          <form className="p-0" onSubmit={handleSubmit}>
            <Box>
              {Array.from({ length: adults }, (err, i) => {
                return (
                  <div className="mb-2">
                    <div className="p-2 mb-2 passenTitle">
                      Passenger {i + 1} {i == 0 ? "( Lead )" : ""}
                    </div>
                    <div className="col-lg-12"
                    >
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

                              {passengerData[i].FirstName == "" && sub && <span id="error1">Enter First Name</span>}

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
                              {passengerData[i].LastName == "" && sub && <span id="error1">Enter Last Name</span>}
                            </div>
                          </Box>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6" >
                          <div className="hotel_form_input">
                            <label className="form_lable">Gender*</label>
                            <select
                              name="Gender"
                              className="form_input_select"
                              onChange={(e) =>
                                handleServiceChange(e, i)
                              }
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
                              {passengerData[i].DateOfBirth == "" && sub && <span id="error1">Enter DOB</span>}
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
                              {!validateEmail1(passengerData[i].Email) && sub && <span id="error1">Enter Email</span>}
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
                              {!validatePhoneNumber(passengerData[i].ContactNo) == true && sub && <span id="error1">Enter Contact</span>}
                            </div>
                          </Box>
                        </div>

                        {isPassportRequired === true ? (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label className="form_lable">PassportNo*</label>
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
              <Box
                className="mid_header"
                p={5}
                mt={25}
              >
                {Array.from({ length: childs }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <div className=" p-2 ">Child {i + 1}</div>
                      <div className="col-lg-12"   >
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                              {passengerData[Number(adults) + i].FirstName == "" && sub && <span id="error1">Enter First Name</span>}


                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                              {passengerData[Number(adults) + i].LastName == "" && sub && <span id="error1">Enter Last Name</span>}

                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                              {passengerData[Number(adults) + i].DateOfBirth == "" && sub && <span id="error1">Enter DOB</span>}
                            </div>
                          </div>


                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6" >
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
                            <div className="col-lg-4 col-md-6 col-sm-6" >
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
              <Box
                className="mid_header"
                p={5}
                mt={25}
              >
                {Array.from({ length: infants }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <span className=" p-2 ">Infant {i + 1}</span>
                      <div className=" col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                              {passengerData[i + Number(adults) + Number(childs)].FirstName == "" && sub && <span id="error1">Enter First Name</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                              {passengerData[i + Number(adults) + Number(childs)].LastName == "" && sub && <span id="error1">Enter Last Name</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
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
                          <div className="col-lg-4 col-md-6 col-sm-6" >

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
                              {passengerData[i + Number(adults) + Number(childs)].DateOfBirth == "" && sub && <span id="error1">Enter DOB</span>}
                            </div>
                          </div>
                          {isPassportRequired == true ? (
                            <div className="col-lg-4 col-md-6 col-sm-6" >
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
                            <div className="col-lg-4 col-md-6 col-sm-6" >
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

        {/* <Box className="mid_header" p={5} mt={25}>
          <Typography className="Top_txt">Travellers</Typography>

          <div className="services">
            <Box className="mid_header" p={5} mt={25}>
              <Box p={15} display="flex">
                <Box>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      First name*
                    </label>
                    <input name="name" placeholder="Enter your name" />
                  </div>
                </Box>
                <Box marginLeft={15}>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      Last name*
                    </label>
                    <input name="lastname" placeholder="Enter your last name" />
                  </div>
                </Box>
              </Box>
              <Box p={15} display="flex">
                <Box>
                  <div className="hotel_form_input">
                    <label className="form_lable">Gender*</label>
                    <select name="gender" className="hotel_input_select">
                      <option value="1">Female</option>
                      <option value="2">Male</option>
                      <option value="3">Transgender</option>
                    </select>
                  </div>
                </Box>
                <Box marginLeft={15}>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      Mobile*
                    </label>
                    <input
                      name="mobilenumber"
                      type="text"
                      placeholder="Enter your number"
                    />
                  </div>
                </Box>
                <Box marginLeft={15}>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      Date Of Birth*
                    </label>
                    <input
                      type="date"
                      name="dateofbirth"
                      className="deaprture_input"
                    />
                  </div>
                </Box>
              </Box>
              <Box p={15} display="flex">
                <Box>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      Email**
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </Box>
                <Box marginLeft={15}>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      Address*
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder="Enter your Address"
                    />
                  </div>
                </Box>
                <Box marginLeft={15}>
                  <div className="form_input">
                    <label hotel_form_input className="form_lable">
                      City*
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Enter your City"
                    />
                  </div>
                </Box>
              </Box>
              <Box p={15} display="flex">
                <Box>
                  <div className="form_input">
                    <label className="form_lable">Country*</label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Enter your Country"
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </div>
        </Box> */}


        <div className="col-lg-12">
          <div class="headingflightPassenger">
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
                  <span>{data1[0]?.Origin?.Airport?.AirportCode}-
                    {data1[len - 1]?.Destination?.Airport?.AirportCode}</span>
                </div>
                <div>
                  <p>Cabin</p>
                  <span>{data1[0]?.CabinBaggage ? data1[0]?.CabinBaggage : "7 Kg"}</span>
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
              <p>Select Excess Baggage
                (Extra charge will be applicable):</p>
              <ul>
                <li>No Excess / Extra Baggage</li>
              </ul>
            </div>
            <div>
              <p>Select Excess Baggage
                (Extra charge will be applicable):</p>
              <ul>
                <li>Add No Meal Rs. 0</li>
              </ul>
            </div>
          </div>
        </div>


        <div className="col-lg-12 accor_dian">
          {fareRule &&
            fareRule.length > 0 &&
            fareRule.map((dat) => {
              return (
                <Box my={2}>
                  <Accordion
                    defaultActiveKey={null}
                  >
                    <Accordion.Item>
                      <Accordion.Header>
                        <p>Detailed Fare Rules</p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="htmlFare"
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
          <div class="headingflightPassenger">
            <p>Fare Rule</p>
            <span>{data?.Origin}-{data?.Destination}</span>
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


        <div className="col-lg-12 mt-5 mb-4 leftDetBut">
          <button
            type="submit"
          >
            Proceed to Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Leftdetail;
