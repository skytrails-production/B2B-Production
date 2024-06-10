import React, { useEffect, useState } from "react";
// import { dangerouslySetInnerHTML } from "react";
import { Box } from "@chakra-ui/react";

import Accordion from "react-bootstrap/Accordion";
import "./passenger.css";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import groupimg from "../../../../../Images/Groupl.png";
import flightdir from "../../../../../Images/flgihtdir.png";
// import {
//   bookAction,
//   bookActionGDS,
// } from "../../../../../Redux/FlightBook/actionFlightBook";
import {
  PassengersAction,
  PassengersActionReturn,
} from "../../../../../Redux/Passengers/passenger";
import FlightLoader from "../../../FlightLoader/FlightLoader";
// import { setLoading } from "../../../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import Alert from '@mui/material/Alert';
import { isValidPassportNumber } from "../../../../../../src/utils/validation"
import dayjs from "dayjs";
const Leftdetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const reducerState = useSelector((state) => state);
  // const ResultIndex = sessionStorage.getItem("ResultIndex");
  const [farePrice, setFarePrice] = useState("");
  const [farePriceReturn, setFarePriceReturn] = useState("");
  const [sub, setSub] = useState(false);
  const [showAleart, setShowAleart] = useState(false);
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
  const fareValueReturn =
    isPassportRequired ? reducerState?.flightFare?.flightQuoteData?.Results :
      reducerState?.flightFare?.flightQuoteDataReturn?.Results;
  const fareRule = isPassportRequired ?
    reducerState?.flightFare?.flightRuleData?.FareRules
    : reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
  // const fareRuleReturn =
  // reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
  const data = reducerState?.oneWay?.oneWayData?.data?.data?.Response;
  const result = reducerState?.flightFare?.flightQuoteData?.Results

  const flightDeparture = reducerState?.flightFare?.flightQuoteData?.Results?.Segments[0]?.[reducerState?.flightFare?.flightQuoteData?.Results?.Segments[0]?.length - 1];
  const flightReturn = isPassportRequired ? reducerState?.flightFare?.flightQuoteData?.Results?.Segments[1] : reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments[0];
  useEffect(() => {
    if (adults === undefined || adults === null || childs === undefined || childs === null || infants === undefined || infants === null) {
      navigate("/FlightresultReturn")
    }
  })
  // console.log(flightDeparture, "flight departure")
  console.log(flightReturn, "flight return ")


  const passengerTemplate = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 1,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    AddressLine1: "gaya",
    AddressLine2: "",
    Fare: farePrice[0],
    // Fare: 1,
    City: "Gurgaon",
    CountryCode: "IN",
    CellCountryCode: "+91-",
    ContactNo: "",
    Nationality: "IN",
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
    Fare: farePrice[1],
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
    Fare: farePrice[2],
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };
  let totalPassenger = Number(adults) + Number(childs) + Number(infants);
  const passengerLists = [];
  const passengerChildLists = [];
  const passengerInfantLists = [];


  useEffect(() => {
    if (fareValue && fareValueReturn) {
      const fareDetails = fareValue?.Fare;
      const fareBreakdown = fareValue?.FareBreakdown;
      const fareBreakdownReturn = fareValueReturn?.FareBreakdown;
      // console.log("fareBreakdownReturn: ", fareBreakdownReturn);
      // console.log("fareBreakdown", fareBreakdown);
      const arr = [];
      const arrReturn = [];

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

        };
        arr.push(obj1);
        // console.log(arr[1]);
        setFarePrice(arr);
      });
      fareBreakdownReturn?.map((price, index) => {
        let objReturn = {
          Currency: price?.Currency,
          BaseFare: price?.BaseFare / price?.PassengerCount,
          Tax: price?.Tax / price?.PassengerCount,
          YQTax: price?.YQTax / price?.PassengerCount,
          AdditionalTxnFeePub:
            price?.AdditionalTxnFeePub / price?.PassengerCount,
          AdditionalTxnFeeOfrd:
            price?.AdditionalTxnFeeOfrd / price?.PassengerCount,
        };
        arrReturn.push(objReturn);
        setFarePriceReturn(arrReturn);
      });
    }
  }, [fareValue, fareValueReturn]);


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


  const [passengerList, setPassengerList] = useState(passengerLists);
  const allPassenger = [
    passengerLists,
    passengerChildLists,
    passengerInfantLists,
  ];
  const [passengerData, setPassengerData] = useState(allPassenger.flat());
  const [isGST, setIsGst] = useState(false);

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


  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  function validatePhoneNumber(phoneNumber) {
    var phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  }
  function validateEmail1(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidEmail(email, phoneNumber, passport) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\d{10}$/;
    const result2 = validatePhoneNumber(phoneNumber);
    const result1 = validateEmail1(email);
    const result3 = isPassportRequired ? isValidPassportNumber(passport) : true;
    const result = result1 && result2 && result3;
    return result
  }
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split("-");
    const newDate = new Date(year, month - 1, day);
    const outputDate = newDate.toISOString().slice(0, 19).replace("T", "T00:00:00");

    return outputDate;
  }
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


  function handleSubmit(event) {
    event.preventDefault();
    setSub(true)

    const valid = passengerData.filter(
      (item) =>
        item.FirstName === "" || item.LastName === "" || item.DateOfBirth === ""
    );

    const emailVal = passengerList.filter((item) =>
      !isValidEmail(item.Email, item.ContactNo, item.PassportNo)
    )

    if (valid.length !== 0 && emailVal.length !== 0) {
      setShowAleart(true)
      setTimeout(() => {
        setShowAleart(false)
      }, 3000);
      return
    }




    const passengerDataReturn = passengerData?.map((item, index) => {
      if (item?.PaxType == 1) {
        return {
          ...item,
          PassportExpiry: isPassportRequired ? convertDateFormat(item.PassportExpiry) : "",
          Fare: farePriceReturn[0],
        };
      } else if (item?.PaxType == 2) {
        return {
          ...item,
          PassportExpiry: isPassportRequired ? convertDateFormat(item.PassportExpiry) : "",
          Fare: farePriceReturn[1],
        };
      } else {
        return {
          ...item,
          PassportExpiry: isPassportRequired ? convertDateFormat(item.PassportExpiry) : "",
          Fare: farePriceReturn[2],
        };
      }
    });
    // console.log("passengerData", passengerData, passengerDataReturn);

    dispatch(PassengersAction(passengerData));
    dispatch(PassengersActionReturn(passengerDataReturn))

    navigate("/Flightresult/passengerdetail/flightReturnreviewbooking");
  }




  const duration1 = `${Math.floor(flightDeparture?.Duration / 60)}hr ${flightDeparture?.Duration % 60
    }min`;



  const [Loading, setLoading] = useState(true);


  useEffect(() => {
    if (flightDeparture?.Airline?.AirlineCode === undefined) {
      setLoading(true)


    }
    else (setLoading(false))
  }, [flightDeparture?.Airline?.AirlineCode])

  if (Loading) {
    return (<div>
      <FlightLoader />
    </div>)
  }


  let layoverHours = 0;
  let layoverMinutes = 0;
  let layoverDuration = 0;


  const arrivalTime = dayjs(flightReturn?.[0]?.Origin?.DepTime);
  const departureTime = dayjs(flightReturn?.[flightReturn?.length - 1]?.Destination?.ArrTime);
  layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
  layoverHours = Math.floor(layoverDuration / 60); // Extract hours
  layoverMinutes = layoverDuration % 60;



  return (
    <div>
      <div style={{
        position: "fixed",
        top: "20%",
        left: 0,
        display: "flex",
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 99999

      }}>
        {showAleart &&
          <Alert severity="error">Please fill all the details</Alert>}
      </div>

      <div className="col-lg-12">
        <div className="row">

          <div className="col-lg-6">
            <div className="singleDataReturnBox" style={{ backgroundColor: "rgba(231, 60, 52, 0.15)" }}>
              <div className="returnBoxOne">
                <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightDeparture?.Airline?.AirlineCode}.png`} alt="flightImg" /> </div>
                <span>{flightDeparture?.Airline?.AirlineName}</span>
                <p>{flightDeparture?.Airline?.AirlineCode}{" "}{flightDeparture?.Airline?.FlightNumber}</p>
              </div>
              <div className="returnBoxTwo">
                <span>{flightDeparture?.Origin?.Airport?.CityName}</span>

                <p>{dayjs(flightDeparture?.Origin?.DepTime).format("DD MMM, YY")}</p>
                <p>{dayjs(flightDeparture?.Origin?.DepTime).format("h:mm A")}</p>
              </div>
              <div className="returnBoxThree">
                <h4>{duration1}</h4>
                <div><img src={flightdir} /></div>
              </div>
              <div className="returnBoxFour">
                <span>{isPassportRequired ? result?.Segments[0][result?.Segments[0]?.length - 1]?.Destination?.Airport?.CityName : flightDeparture?.Destination?.Airport?.CityName}</span>
                <p>{dayjs(flightDeparture?.Destination?.ArrTime).format("DD MMM, YY")}</p>
                <p>{dayjs(flightDeparture?.Destination?.ArrTime).format("h:mm A")}</p>
              </div>

            </div>
          </div>
          <div className="col-lg-6">
            <div className="singleDataReturnBox" style={{ backgroundColor: "rgba(231, 60, 52, 0.15)" }}>
              <div className="returnBoxOne">
                <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightReturn?.[0]?.Airline?.AirlineCode}.png`} alt="flightImg" /> </div>
                <span>{flightReturn?.[0]?.Airline?.AirlineName}</span>
                <p>{flightReturn?.[0]?.Airline?.AirlineCode}{" "}{flightReturn?.[0]?.Airline?.FlightNumber}</p>
              </div>
              <div className="returnBoxTwo">
                <span>{flightReturn?.[0]?.Origin?.Airport?.CityName}</span>
                <p>{dayjs(flightReturn?.[0]?.Origin?.DepTime).format("DD MMM, YY")}</p>
                <p>{dayjs(flightReturn?.[0]?.Origin?.DepTime).format("h:mm A")}</p>
              </div>
              <div className="returnBoxThree">
                <h4>{`${layoverHours} hr ${layoverMinutes} min `}</h4>
                <div><img src={flightdir} /></div>
              </div>
              <div className="returnBoxFour">
                <span>{isPassportRequired ? result?.Segments[1][result?.Segments[1]?.length - 1]?.Destination?.Airport?.CityName : flightReturn?.[flightReturn?.length - 1]?.Destination?.Airport?.CityName}</span>
                <p>{dayjs(flightReturn?.[flightReturn?.length - 1]?.Destination?.ArrTime).format("DD MMM, YY")}</p>
                <p>{dayjs(flightReturn?.[flightReturn?.length - 1]?.Destination?.ArrTime).format("h:mm A")}</p>
              </div>

            </div>
          </div>
        </div>
      </div>


      <div className="col-lg-12">
        <div class="headingflightPassenger-new">
          <p>Passenger Details</p>
          <span>Total Adult(s) :{' '} {adults} Child:{' '} {childs} Infants: {' '} {infants}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <form onSubmit={handleSubmit}>
            <Box className="mid_header1" p={5}>
              {Array.from({ length: adults }, (err, i) => {
                return (
                  <div className="mb-2">
                    <div className="p-2 mb-2 passenTitle">
                      Passenger {i + 1}
                    </div>
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <Box>
                            <div className="form_input">
                              <label className="form_lable">Title*</label>
                              <select
                                name="Title"
                                className="form_input_select"
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
                                className="form_input_input"
                                name="FirstName"
                                placeholder="Enter your name"
                                onChange={(e) => handleServiceChange(e, i)}
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
                                id="br"
                                name="LastName"
                                placeholder="Enter your last name"
                                onChange={(e) => handleServiceChange(e, i)}
                              />
                              {passengerData[i].LastName == "" && sub && <span id="error1">Enter Last Name</span>}
                            </div>
                          </Box>
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
                                max={maxDate}
                                onChange={(e) => handleServiceChange(e, i)}
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
                                placeholder="Enter Contact"
                                onChange={(e) => handleServiceChange(e, i)}
                              />
                              {!validatePhoneNumber(passengerData[i].ContactNo) == true && sub && <span id="error1">Enter Contact</span>}
                            </div>
                          </Box>
                        </div>
                        {
                          isPassportRequired &&

                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label hotel_form_input className="form_lable">
                                  Passport Number
                                </label>
                                <input
                                  type="text"
                                  name="PassportNo"
                                  placeholder="Enter Passport No"
                                  onChange={(e) => handleServiceChange(e, i)}
                                />
                                {!isValidPassportNumber(passengerData[i].PassportNo) && sub && <span id="error1">Enter Contact</span>}
                              </div>
                            </Box>
                          </div>
                        }
                        {
                          isPassportRequired &&

                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <Box>
                              <div className="form_input">
                                <label hotel_form_input className="form_lable">
                                  Passport Expiry
                                </label>
                                <input
                                  type="date"
                                  name="PassportExpiry"
                                  // placeholder=""
                                  onChange={(e) => handleServiceChange(e, i)}
                                // onChange={(e) => convertDateFormat(e.target.value)}
                                />
                                {/* {!validatePhoneNumber(passengerData[i].ContactNo) == true && sub && <span id="error1">Enter Contact</span>} */}
                              </div>
                            </Box>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </Box>
            {childs > 0 && (
              <Box
                className="mid_header1"
                p={5}
                mt={25}>
                <Typography className="p-2 Top_txt text-dark">
                  Childs: {childs}
                </Typography>
                {Array.from({ length: childs }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <span className=" p-2 ">Passenger {i + 1}</span>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6" >
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                First name*
                              </label>
                              <input
                                type="text"
                                name="FirstName"
                                placeholder="Enter your name"
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                              />
                              {passengerData[Number(adults) + i].FirstName == "" && sub && <span id="error1">Enter First Name</span>}
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 col-sm-6" >
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Last name
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
                                max={maxDateChild}
                                min={minDateChild}
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                              />
                              {passengerData[Number(adults) + i].DateOfBirth == "" && sub && <span id="error1">Enter DOB</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Passport Number
                              </label>
                              <input
                                type="text"
                                name="PassportNo"
                                // max={maxDateChild}
                                // min={minDateChild}
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                              />
                              {!isValidPassportNumber(passengerData[Number(adults) + i].PassportNo) && sub && <span id="error1">Enter a valid passport</span>}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6" >
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                Passport Expiry
                              </label>
                              <input
                                type="date"
                                name="PassportExpiry"
                                // max={maxDateChild}
                                // min={minDateChild}
                                onChange={(e) =>
                                  handleServiceChange(e, i + Number(adults))
                                }
                              />
                              {/* {!isValidPassportNumber(passengerData[Number(adults) + i].DateOfBirth) && sub && <span id="error1">Enter a valid passport</span>} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Box>
            )}
            {infants > 0 && (
              <Box
                className="mid_header1"
                p={5}
                mt={25}>
                <Typography className="p-2 Top_txt text-dark">
                  Infants: {infants}
                </Typography>
                {Array.from({ length: infants }, (err, i) => {
                  return (
                    <div className="mb-2">
                      <span className=" p-2 ">Infant {i + 1}</span>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-6" >
                            <div className="form_input">
                              <label hotel_form_input className="form_lable">
                                First name*
                              </label>
                              <input
                                name="FirstName"
                                placeholder="Enter your name"
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
                          {
                            isPassportRequired &&

                            <div className="col-lg-4 col-md-6 col-sm-6" >

                              <div className="form_input">
                                <label hotel_form_input className="form_lable">
                                  Passport Number
                                </label>
                                <input
                                  type="text"
                                  name="PassportNo"
                                  className="deaprture_input form_input_select"
                                  // required
                                  // min={minDateInfer}
                                  // max={currentDate}
                                  onChange={(e) =>
                                    handleServiceChange(
                                      e,
                                      i + Number(adults) + Number(childs)
                                    )
                                  }
                                />
                                {!isValidPassportNumber(passengerData[i + Number(adults) + Number(childs)].PassportNo) && sub && <span id="error1">Enter a valid Passport Number</span>}
                              </div>
                            </div>
                          }
                          {
                            isPassportRequired &&

                            <div className="col-lg-4 col-md-6 col-sm-6" >

                              <div className="form_input">
                                <label hotel_form_input className="form_lable">
                                  Passport Expiry
                                </label>
                                <input
                                  type="date"
                                  name="PassportExpiry"
                                  className="deaprture_input form_input_select"
                                  // required
                                  // min={minDateInfer}
                                  // max={currentDate}
                                  onChange={(e) =>
                                    handleServiceChange(
                                      e,
                                      i + Number(adults) + Number(childs)
                                    )
                                  }
                                />

                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Box>
            )}

            {/* <div
              style={{
                width: "100%",
                height: 45,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                background: "rgba(231, 60, 52, 0.15)",
                borderRadius: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 16,
                display: "inline-flex",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Montserrat",
                  fontWeight: "600",

                  wordWrap: "break-word",
                }}
              >
                Add GST Details
              </div>
              <div style={{ width: 16, height: 16, position: "relative" }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    left: 0,
                    top: 0,
                    position: "absolute",

                    borderRadius: 9999,
                  }}
                />

                <div
                  style={{
                    width: 10.33,
                    height: 0,
                    left: 28,
                    top: 3,
                    position: "absolute",
                    transform: "rotate(90deg)",
                    transformOrigin: "0 0",
                  }}
                  onClick={() => setIsGst(!isGST)}
                >
                  {" "}
                  <img src={groupimg} alt="" />
                </div>
              </div>
            </div>
            {isGST &&
              <Box className="mid_header1" p={5} mt={25}>
                

                <div className="mb-2">
            
                  <Box p={15} display="flex" flexWrap="wrap" gap="10px" justifyContent="space-between">
                    <Box marginLeft={15} flex={1} minWidth="200px" >
                      <div className="form_input1">
                        <label className="form_lable">
                          GST Number
                          <span
                            style={{
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          name="Nationality"
                          type="text"
                          placeholder="Enter your Country"
                          onChange={(e, i) => handleServiceChange(e, i)}
                        />
                      </div>
                    </Box>
                    <Box
                      marginLeft={15}
                      flex={1}
                      minWidth="200px"
                    >
                      <div className="form_input1">
                        <label hotel_form_input className="form_lable">
                          GST Company Name
                          <span
                            style={{
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          name="ContactNo"
                          type="text"
                          placeholder="Enter GST Number"
                          onChange={(e, i) => handleServiceChange(e, i)}
                        />
                      </div>
                    </Box>
                    <Box marginLeft={15} minWidth="200px"
                      flex={1}>
                      <div className="form_input1">
                        <label hotel_form_input className="form_lable">
                          GST Company Contact
                          <span
                            style={{
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          name="Email"
                          type="email"
                          placeholder="company name"
                          onChange={(e, i) => handleServiceChange(e, i)}
                        />
                      </div>
                    </Box>
                    <Box marginLeft={15} flex={1} minWidth="200px">
                      <div className="form_input1">
                        <label className="form_lable">
                          Company Address
                          <span
                            style={{
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          name="Email"
                          type="email"
                          placeholder="Company Address"
                          onChange={(e, i) => handleServiceChange(e, i)}
                        />
                      </div>
                    </Box>

                    <Box marginLeft={15} flex={1} minWidth="200px">
                      <div className="form_input1">
                        <label className="form_lable">
                          GST Company Email
                          <span
                            style={{
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          name="Nationality"
                          type="text"
                          placeholder="Enter Company Email"
                          onChange={(e, i) => handleServiceChange(e, i)}
                        />
                      </div>
                    </Box>
                  </Box>
                </div>
              
              </Box>} */}
            <Box
          
              p={5}

              mt={25}
            >
              <div
                style={{
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Montserrat",

                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Baggage & Meal Services
              </div>{" "}
            </Box>
          </form>
        </div>



        <div className="col-lg-12" style={{ background: "rgba(231, 60, 52, 0.15)", }}>
          <div class="headingflightPassenger" style={{ background: "rgba(231, 60, 52, 0.15)" }}>
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


        <div className="col-lg-12" style={{ background: "rgba(231, 60, 52, 0.15)" }}>
          <div class="headingflightPassenger" style={{ background: "rgba(231, 60, 52, 0.15)" }}>
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


        <div className="col-lg-12 mt-5 mb-4 leftDetBut-new">
          <button
            type="submit"
            style={{ border: "none" }}
          >
            Proceed to Book
          </button>
        </div>

      </form>
    </div>
  );
};

export default Leftdetail;
