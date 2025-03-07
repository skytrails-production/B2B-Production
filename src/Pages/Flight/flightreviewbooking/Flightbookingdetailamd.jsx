import Divider from "@mui/material/Divider";
import {
  Typography,
  Box,
  Grid,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import api from "../../../Redux/API/api";
import flightdir from "../../../Images/flgihtdir.png";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../Redux/Auth/logIn/actionLogin";
import { flightReducerClear } from "../../../Redux/FlightBook/actionFlightBook";
import "./flightreviewbooking.css";
import { apiURL } from "../../../Constants/constant";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import userApi from "../../../Redux/API/api";
import Swal from "sweetalert2";

import { swalModal } from "../../../utils/swal";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { clearPassengersReducer } from "../../../Redux/Passengers/passenger";
import { clearOneWayReducer } from "../../../Redux/FlightSearch/OneWay/oneWay";
import { clearOneWayEMTReducer } from "../../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
import { ClearAllActionReturn } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import FlightLoader from "../FlightLoader/FlightLoader";
import dayjs from "dayjs";
import Flightloaderamd from "../FlightLoader/Flightloaderamd";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Flightbookingdetailamd = ({ amdata, airesellRes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [savepnrvalue, setSavepnrvalue] = useState("");
  const [loader, setLoader] = useState(false);
  const [xmlData, setXmlData] = useState(" ");
  const [userData, setUserData] = useState(null);
  const [passengerAgreement, setPassengerAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [stopps, setStopps] = useState(null);
  // const [airesellRes, setAiresellRes] = useState(null);
  const reducerState = useSelector((state) => state);
  // const location = useLocation();
  // const { amdata } = location.state;
  // console.log("amdata?..................................................", amdata);
  const moment = require("moment");
  let xmlContinue = "";
  let dataElementsMaster = "";
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;
  const dummyPnrCheck = JSON.parse(
    sessionStorage.getItem("6989_n578j_j848433")
  );
  // console.log(dummyPnrCheck,"hdhdhd")

  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
  const ResultIndex =
    sessionStorage?.getItem("ResultIndex") ||
    JSON.parse(sessionStorage.getItem("flightDetailsONGo"))?.ResultIndex;
  const ResultIndexReturn =
    sessionStorage.getItem("ResultIndex") ||
    JSON.parse(sessionStorage?.getItem("flightDetailsIncome"))?.ResultIndex;
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const adultCount = sessionStorage.getItem("adults");
  const childCount = sessionStorage.getItem("childs");
  const infantCount = sessionStorage.getItem("infants");
  const { XMLParser } = require("fast-xml-parser");

  // console.log(
  //   "passengerAgreement",
  //   passengerAgreement,
  //   "paymentOption",
  //   paymentOption,
  //   ResultIndex
  // );
  // console.log("reducerState", reducerState);

  const fareQuote =
    reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
  // const flightReviewDetails =
  //   reducerState?.flightBook?.flightBookDataGDS?.Response;
  const fareRules = reducerState?.flightFare?.flightRuleData?.FareRules;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValueReturn =
    reducerState?.flightFare?.flightQuoteDataReturn?.Results;

  const Passengers = reducerState?.passengers?.passengersData;
  const passengerData = reducerState?.passengers?.passengersData;
  // console.log(Passengers, "passenger ka data")
  const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
  const userId =  reducerState?.logIn?.loginData?.data?.data?.id;
const currentBalance = reducerState?.userData?.userData?.data?.data?.balance;
  const imgvalue =
      amdata?.flightDetails?.flightInformation?.companyId?.marketingCarrier ||
    amdata?.flightDetails?.[0]?.flightInformation?.companyId?.marketingCarrier;
  // console.log("amdata", amdata);
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

  // console.log( amdata?.flightDetails?.[amdata?.flightDetails.length-1]?.flightInformation?.productDateTime
  //   ?.timeOfArrival," amdata?.flightDetails?.[amdata?.flightDetails.length-1]?.flightInformation?.productDateTime.timeOfArrival");

  // console.log(
  //   "bookingDataLcc?.FlightItinerary?.Passenger",
  //   reducerState?.flightBook
  // );

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
  // console.log("imgvalue", seats);

  function createMarkup(data) {
    return { __html: data };
  }

  // useState(() => {
  //   console.log(reducerState, "reducerstate");
  // }, [reducerState]);

  function convertDateFormatAmd(originalDate) {
    // Convert to Date object
    const dateObj = new Date(originalDate);

    // Get day
    const day = dateObj.getDate();

    // Get month in abbreviated form
    const monthAbbrev = dateObj.toLocaleString("default", { month: "short" });

    // Get year in abbreviated form
    const yearAbbrev = dateObj.getFullYear().toString().slice(-2);

    // Form the desired format
    const convertedDate = `${day}${monthAbbrev}${yearAbbrev}`;

    return convertedDate;
  }

  // console.log("passengerData",passengerData);

  // const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  // ////////////////////////
  // const statusaircelldata = sessionStorage.getItem("statusaircell");
  const xmlpassengerData = async () => {
    // setLoading(true);
    for (let i = 0; i < Number(adultCount) + Number(childCount); i++) {
      // console.log(passengerData[i], i, "iiiiiiiiiiiiii");

      xmlContinue += `<travellerInfo>
        <elementManagementPassenger>
            <reference>
                <qualifier>PR</qualifier>
                <number>${i + 1}</number>
            </reference>
            <segmentName>NM</segmentName>
        </elementManagementPassenger>
        <passengerData>
            <travellerInformation>
                <traveller>
                    <surname>${passengerData[i]?.LastName}</surname>
                    <quantity>${
                      passengerData[i]?.PaxType === 1 ? adultCount : childCount
                    }</quantity>
                </traveller>
                <passenger>
                    <firstName>${passengerData[i]?.FirstName}</firstName>
                    <type>${
                      passengerData[i]?.PaxType === 1 ? "ADT" : "CHD"
                    }</type>
                </passenger>
                </travellerInformation>
                ${
                  passengerData[i]?.PaxType !== 1
                    ? `<dateOfBirth>
                        <dateAndTimeDetails>
                            <qualifier>706</qualifier>
                            <date>${convertDateFormatAmd(
                              passengerData[i]?.DateOfBirth
                            )}</date>
                        </dateAndTimeDetails>
                      </dateOfBirth>`
                    : ""
                }
        </passengerData>
        ${
          i < infantCount
            ? ` <passengerData>
            <travellerInformation>
                <traveller>
                    <surname>${
                      //   ,
                      passengerData[Number(adultCount) + Number(childCount) + i]
                        ?.LastName
                    }</surname>
                    <quantity>${infantCount}</quantity>
                </traveller>
                <passenger>
                    <firstName>${
                      passengerData[Number(adultCount) + Number(childCount) + i]
                        ?.FirstName
                    }</firstName>
                    <type>${
                      "INF"
                      // passengerData[i]?.PaxType === 1 ? "ADT" : "CHD"
                      // : passengerData[i]?.PaxType === 2
                      // ? "CHD"
                      // :
                    }</type>
                </passenger>
                </travellerInformation>
                ${
                  // passengerData[i]?.PaxType !== 1
                  // ?
                  `<dateOfBirth>
                        <dateAndTimeDetails>
                            <qualifier>706</qualifier>
                            <date>${convertDateFormatAmd(
                              passengerData[
                                Number(adultCount) + Number(childCount) + i
                              ]?.DateOfBirth
                            )}</date>
                        </dateAndTimeDetails>
                      </dateOfBirth>`
                  // : ""
                }
        </passengerData>`
            : ""
        }
    </travellerInfo>`;
      dataElementsMaster += `<dataElementsIndiv>
              <elementManagementData>
                  <reference>
                      <qualifier>OT</qualifier>
                      <number>${i + 1}</number>
                  </reference>
                  <segmentName>AP</segmentName>
              </elementManagementData>
              <freetextData>
                  <freetextDetail>
                      <subjectQualifier>3</subjectQualifier>
                      <type>P02</type>
                  </freetextDetail>
                  <longFreetext>${passengerData[0]?.Email}</longFreetext>
              </freetextData>
              <referenceForDataElement>
                  <reference>
                      <qualifier>PR</qualifier>
                      <number>${i + 1}</number>
                  </reference>
              </referenceForDataElement>
          </dataElementsIndiv>
          <dataElementsIndiv>
              <elementManagementData>
                  <reference>
                      <qualifier>OT</qualifier>
                      <number>${i + 1}</number>
                  </reference>
                  <segmentName>AP</segmentName>
              </elementManagementData>
              <freetextData>
                  <freetextDetail>
                      <subjectQualifier>3</subjectQualifier>
                      <type>7</type>
                      <status>A</status>
                  </freetextDetail>
                  <longFreetext>${passengerData[0]?.ContactNo}</longFreetext>
              </freetextData>
              <referenceForDataElement>
                  <reference>
                      <qualifier>PR</qualifier>
                      <number>${i + 1}</number>
                  </reference>
              </referenceForDataElement>
          </dataElementsIndiv>`;
    }
    // console.log(
    //   "xmlContinuegggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    //   xmlContinue
    // );
    let amadiesPayload = `<PNR_AddMultiElements
      xmlns="http://xml.amadeus.com/PNRADD_17_1_1A">
      <pnrActions>
          <optionCode>0</optionCode>
      </pnrActions>
   ${xmlContinue}
    
      <dataElementsMaster>
          <marker1 />
          ${dataElementsMaster}
          
            <dataElementsIndiv>
              <elementManagementData>
                  <reference>
                      <qualifier>OT</qualifier>
                      <number>1</number>
                  </reference>
                  <segmentName>TK</segmentName>
              </elementManagementData>
              <ticketElement>
                  <passengerType>PAX</passengerType>
                  <ticket>
                      <indicator>OK</indicator>
                  </ticket>
              </ticketElement>
          </dataElementsIndiv>
          <dataElementsIndiv>
              <elementManagementData>
                  <segmentName>FP</segmentName>
              </elementManagementData>
              <formOfPayment>
                  <fop>
                      <identification>CA</identification>
                  </fop>
              </formOfPayment>
          </dataElementsIndiv>
          <dataElementsIndiv>
              <elementManagementData>
                  <segmentName>RF</segmentName>
              </elementManagementData>
              <freetextData>
                  <freetextDetail>
                      <subjectQualifier>3</subjectQualifier>
                      <type>P22</type>
                  </freetextDetail>
                  <longFreetext>62</longFreetext>
              </freetextData>
          </dataElementsIndiv>
          <dataElementsIndiv>
              <elementManagementData>
                  <segmentName>OS</segmentName>
              </elementManagementData>
              <freetextData>
                  <freetextDetail>
                      <subjectQualifier>3</subjectQualifier>
                      <type>P27</type>
                      <companyId>${
                        sesstioResultIndex?.flightDetails?.flightInformation
                          ?.companyId?.marketingCarrier ||
                        sesstioResultIndex?.flightDetails[0]?.flightInformation
                          ?.companyId?.marketingCarrier
                      }</companyId>

                  </freetextDetail>
                  <longFreetext>PAX CTCM ${
                    passengerData[0]?.ContactNo
                  }</longFreetext>
              </freetextData>
          </dataElementsIndiv>
         
      </dataElementsMaster>
  </PNR_AddMultiElements>`;
    // console.log(amadiesPayload, "xmlContinue");
    fetchDataAmadesContinue(amadiesPayload);
  };

  const farepricepnrwithbookingclass = async (ress) => {
    // console.log(airesellRes?.data?.MessageID, "ffffffffffffffffffffffffff");
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/farepricepnrwithbookingclass`,
      data: {
        amadeusMessageID: ress?.MessageID,
        amadeusUniqueID: ress?.UniqueID,
        amadeusSessionID: ress?.SessionId,
        amadeusSequenceNumber: ress?.SequenceNumber,
        amadeusSecurityToken: ress?.SecurityToken,
        flightCode:
          sesstioResultIndex?.flightDetails?.flightInformation?.companyId
            ?.marketingCarrier,
      },
      headers: {
        "Content-Type": "application/json",

        //  token: token,
      },
    });
    // console.log(res, "farepricepnrwithbookingclass");
    if (res?.data?.status === 200) {
      // fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
      fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
    }
  };
  const fetchDataAmadesticketcreatetstfrompricing = async (ress) => {
    // console.log(airesellRes?.data?.MessageID, "ffffffffffffffffffffffffff");
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/ticketcreatetstfrompricing`,
      data: {
        amadeusMessageID: ress?.MessageID,
        amadeusUniqueID: ress?.UniqueID,
        amadeusSessionID: ress?.SessionId,
        amadeusSequenceNumber: ress?.SequenceNumber,
        amadeusSecurityToken: ress?.SecurityToken,
        totalPax: parseInt(adultCount) + parseInt(childCount),
      },
      headers: {
        "Content-Type": "application/json",

        //  token: token,
      },
    });
    // console.log(res, "farepricepnrwithbookingclass");
    if (res?.data?.status === 200) {
      // fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
      fetchDataSavepnr(res?.data?.data?.headers);
    }
  };

  const fetchDataSavepnr = async (ress) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${apiURL.baseURL}/skyTrails/amadeus/savepnr`,
        data: {
          amadeusMessageID: ress?.MessageID,
          amadeusUniqueID: ress?.UniqueID,
          amadeusSessionID: ress?.SessionId,
          amadeusSequenceNumber: ress?.SequenceNumber,
          amadeusSecurityToken: ress?.SecurityToken,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const pnr = res?.data?.data?.headers?.Pnr;
      if (res?.data?.status === 200 && res?.data?.data?.headers?.Pnr) {
        sessionStorage.setItem("PNR", pnr);
        setXmlData(res?.data?.data?.data);
        setLoader(false);
      } else {
        setLoader(false);
        Swal.fire("Booking Failed");
        navigate("/flights");
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // Use useEffect to handle side effects when xmlData changes
  useEffect(() => {
    const parseXmlData = async () => {
      if (xmlData) {
        // console.log("xmlData received:", xmlData);
        const parser = new XMLParser();
        const result = await parser.parse(xmlData);
        let valueconvert;

        if (xmlData !== "") {
          valueconvert = await result["soapenv:Envelope"]["soapenv:Body"][
            "PNR_Reply"
          ];

          setJsonData(valueconvert);
          // setStopps(valueconvert?.originDestinationDetails?.itineraryInfo)
        }
        // console.log("xmldataconverter", valueconvert);
        // console.log("jsonData", jsonData);
        // console.log("res?.data?.data", res?.data?.data?.data);
      }
    };

    parseXmlData();
  }, [xmlData]);

  useEffect(() => {
    if (jsonData?.pnrHeader?.reservationInfo?.reservation?.controlNumber) {
      api.flightbookingamedius(amdpayload);
      balanceSubtractOneWay();
      if (userId) {
        const payload = userId;

        // console.log(payload,'userIdiii');
        dispatch(getUserDataAction(payload));
      }

      navigate("/bookedTicketSucess");
      // setLoading(false);
    }
  }, [jsonData]);

  const fetchDataAmadesContinue = async (amadiesPayload) => {
    // console.log("airesellRes", airesellRes);
    setLoader(true);
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/pnraddmultielements`,
      data: amadiesPayload,
      // headers: { ...airesellRes?.data?.headers, "Content-Type": "text/xml" },
      headers: {
        "Content-Type": "text/xml",
        amadeusMessageID: airesellRes?.data?.headers?.MessageID,
        amadeusUniqueID: airesellRes?.data?.headers?.UniqueID,
        amadeusSessionID: airesellRes?.data?.headers?.SessionId,
        amadeusSequenceNumber: airesellRes?.data?.headers?.SequenceNumber,
        amadeusSecurityToken: airesellRes?.data?.headers?.SecurityToken,
        //  token: token,
      },
    });
    // console.log(res?.data, "amallllllllllllllllllll");
    if (res?.data?.status === 200) {
      farepricepnrwithbookingclass(res?.data?.data?.headers);
    }
  };

  const amdsubtractcheck = async () => {
    if (
      Number(amdata?.monetaryDetail?.[0]?.amount) + Number(markUpamount) >=
      currentBalance
    ) {
      // console.log("Recharge your wallet");
      Swal.fire("Recharge Your Wallet");
    } else {
      xmlpassengerData();
    }
  };

  // //////////////////////////////////////////////////////////////////////////////////////////////////
  const citynames = reducerState?.CitynameReducer?.data?.data;
  const [departurename, setdeparturename] = useState("");
  const [arrivalname, setarrivalnamename] = useState("");

  useEffect(() => {
    const cityAirline = citynames.find(
      (cityairline) => cityairline.id === arrival
    );

    const arrivalAirline = citynames.find(
      (cityairlinearrival) => cityairlinearrival.id === departure
    );

    // console.log("cityAirline",arrivalAirline)

    if (cityAirline) {
      setdeparturename(cityAirline.name);
    } else {
      setdeparturename("No matching airline found");
    }

    if (arrivalAirline) {
      setarrivalnamename(arrivalAirline.name);
    } else {
      setarrivalnamename("No matching airline found");
    }
  }, []);

  function findAirportByCode(code) {
    const data = citynames?.find(citynames => citynames?.AirportCode === code)
  
    return data;
    }


  const flightname = reducerState?.flightnameReducer?.data?.data;
  function findAirlineByCode(code) {
    const data = flightname?.find(flightname => flightname?.airlineCode === code)

    return data?.airlineName;
  }


  // ////////////////////////////////////////////////////////////////////////////////////////

  let depTimeString = String(
    jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.depTime
  );
  let depDateString = String(
    jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.depDate
  );
  let arrTimeString1 = String(
    jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.arrTime
  );
  let arrDateString = String(
    jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.arrDate
  );

  const passengerDataa = passengerData.length;
  // console.log("passengerDataa//////////",parseInt(amdata?.TotalPublishFare) / passengerDataa);

  if (depTimeString && depTimeString.length === 2) {
    depTimeString = "00" + depTimeString;
  }
  if (arrTimeString1 && arrTimeString1.length === 2) {
    arrTimeString1 = "00" + arrTimeString1;
  }
  if (depTimeString && depTimeString.length === 3) {
    depTimeString = "0" + depTimeString;
  }
  if (arrTimeString1 && arrTimeString1.length === 3) {
    arrTimeString1 = "0" + arrTimeString1;
  }
  if (depDateString && depDateString.length === 5) {
    depDateString = "0" + depDateString;
  }
  if (depDateString && depDateString.length === 4) {
    depDateString = "00" + depDateString;
  }
  if (arrDateString && arrDateString.length === 4) {
    arrDateString = "00" + arrDateString;
  }
  if (arrDateString && arrDateString.length === 5) {
    arrDateString = "0" + arrDateString;
  }

  const departureMoment = moment(
    `${depDateString} ${depTimeString}`,
    "DDMMYYYY HHmm"
  );
  const depTimeISO1 = departureMoment.toISOString();
  // console.log("jsonData////////",jsonData)
  // console.log("`Departure ISO:",arrTimeString1,arrDateString);  // Output: "2024-09-26T10:15:00.000Z"

  // Parse and format the arrival time and date
  const arrivalMoment = moment(
    `${arrDateString} ${arrTimeString1}`,
    "DDMMYYYY HHmm"
  );
  const arrTimeISO1 = arrivalMoment.toISOString();

  const PassportRequired =
    reducerState?.searchReducer?.search[0]?.CountryCode !== "IN " ||
    reducerState?.searchReducer?.search[1]?.CountryCode !== "IN ";

  // console.log(`Arrival ISO: ${arrTimeISO1}`);

  // console.log("amdata?.flight",reducerState);

  let nonStop = [
    {
      Airline: {
        AirlineCode:
          jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.companyDetail?.identification,
        AirlineName:
        findAirlineByCode(jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.companyDetail?.identification),
        FlightNumber:
          jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.productDetails?.identification,
        FareClass:
          jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.productDetails?.classOfService,
      },
      Origin: {
        AirportCode:
          jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.boardpointDetail?.cityCode,
        AirportName: reducerState?.searchReducer?.search?.[0]?.code,
        CityName: reducerState?.searchReducer?.search?.[0]?.name,
        Terminal:
          jsonData?.originDestinationDetails?.itineraryInfo?.flightDetail
            ?.arrivalStationInfo?.terminal,
        DepTime: depTimeISO1,
      },
      Destination: {
        AirportCode:
          jsonData?.originDestinationDetails?.itineraryInfo?.travelProduct
            ?.offpointDetail?.cityCode,
        AirportName: reducerState?.searchReducer?.search?.[1]?.code,
        CityName: reducerState?.searchReducer?.search?.[1]?.name,
        Terminal:
          jsonData?.originDestinationDetails?.itineraryInfo?.flightDetail
            ?.departureInformation?.departTerminal,
        ArrTime: arrTimeISO1,
      },
      Baggage:
        (amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
          ?.quantityCode ||
          amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.quantityCode) === "W"
          ? `${
              amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance ||
              amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance
            } ${
              amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.unitQualifier ||
              amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.unitQualifier === "K"
                ? "KG"
                : `${
                    amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                      ?.unitQualifier ||
                    amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                      ?.unitQualifier
                  }`
            }`
          : `(${
              amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance ||
              amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance
            } × 23KG)`,
    },
  ];

  let times = jsonData?.originDestinationDetails?.itineraryInfo
    ?.elementManagementItinerary
    ? nonStop
    : jsonData?.originDestinationDetails?.itineraryInfo.map(
        (itinerary, index) => {
          let depTime = String(itinerary?.travelProduct?.product?.depTime);
          let depDate = String(itinerary?.travelProduct?.product?.depDate);
          let arrTime = String(itinerary?.travelProduct?.product?.arrTime);
          let arrDate = String(itinerary?.travelProduct?.product?.arrDate);

          if (depTime && depTime.length === 2) {
            depTime = "00" + depTime;
          }
          if (arrTime && arrTime.length === 2) {
            arrTime = "00" + arrTime;
          }
          if (depTime && depTime.length === 3) {
            depTime = "0" + depTime;
          }
          if (arrTime && arrTime.length === 3) {
            arrTime = "0" + arrTime;
          }
          if (depDate && depDate.length === 5) {
            depDate = "0" + depDate;
          }
          if (depDate && depDate.length === 4) {
            depDate = "00" + depDate;
          }
          if (arrDate && arrDate.length === 4) {
            arrDate = "00" + arrDate;
          }
          if (arrDate && arrDate.length === 5) {
            arrDate = "0" + arrDate;
          }

          const depDateTimeString = `${depDate}${depTime}`;

          const departureMoment = moment(
            `${depDate} ${depTime}`,
            "DDMMYYYY HHmm"
          );
          const depTimeISO = departureMoment.toISOString();

          // Parse arrDate and arrTime into ISO format for arrival
          const arrDateTimeString = `${arrDate}${arrTime}`;

          const arrivalMoment = moment(
            `${arrDate} ${arrTime}`,
            "DDMMYYYY HHmm"
          );
          const arrTimeISO = arrivalMoment.toISOString();

          return {
            depTime: depTimeISO,
            depDate,
            arrTime: arrTimeISO,
            arrDate,
          };
        }
      );

  const passport = reducerState?.passengersData?.[0]?.PassportNo;
  const pnrvalue =
    jsonData?.pnrHeader?.reservationInfo?.reservation?.controlNumber;
  const amdpayload = {
    userId: userId,
    bookingId: `Sky${jsonData?.pnrHeader?.reservationInfo?.reservation?.controlNumber}`,
    oneWay: true,
    ticketType: "Original Ticket",
    pnr: jsonData?.pnrHeader?.reservationInfo?.reservation?.controlNumber,
    origin: reducerState?.searchReducer?.search?.[0]?.name,
    destination: reducerState?.searchReducer?.search?.[1]?.name,
    paymentStatus: "success",
    totalAmount:
      Number(amdata?.monetaryDetail?.[0]?.amount) + Number(markUpamount),

    airlineDetails: jsonData?.originDestinationDetails?.itineraryInfo
      ?.elementManagementItinerary
      ? nonStop
      : jsonData?.originDestinationDetails?.itineraryInfo.map(
          (stopss, index) => {
            const depTimeISO = times[index]?.depTime;
            const arrTimeISO = times[index]?.arrTime;

            const originname =
              stopss?.travelProduct?.boardpointDetail?.cityCode;

            return {
              Airline: {
                AirlineCode:
                  stopss?.travelProduct?.companyDetail?.identification,
                AirlineName:
                findAirlineByCode(stopss?.travelProduct?.companyDetail?.identification),
                FlightNumber:
                  stopss?.travelProduct?.productDetails?.identification,
                FareClass:
                  stopss?.travelProduct?.productDetails?.classOfService,
              },
              Origin: {
                AirportCode: stopss?.travelProduct?.boardpointDetail?.cityCode,
                AirportName: findAirportByCode(stopss?.travelProduct?.boardpointDetail?.cityCode)?.code,
                CityName: findAirportByCode(stopss?.travelProduct?.boardpointDetail?.cityCode)?.name,
                Terminal: stopss?.flightDetail?.arrivalStationInfo?.terminal,
                DepTime: depTimeISO,
              },
              Destination: {
                AirportCode: stopss?.travelProduct?.offpointDetail?.cityCode,
                // AirportName: reducerState?.searchReducer?.search?.[1]?.code,
                // CityName: reducerState?.searchReducer?.search?.[1]?.name,
                AirportName:findAirportByCode( stopss?.travelProduct?.offpointDetail?.cityCode)?.code,
                CityName: findAirportByCode(stopss?.travelProduct?.offpointDetail?.cityCode)?.name,
                Terminal:
                  stopss?.flightDetail?.departureInformation?.departTerminal,
                ArrTime: arrTimeISO,
              },
              Baggage:
                (amdata?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails
                  ?.quantityCode ||
                  amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                    ?.quantityCode) === "W"
                  ? `${
                      amdata?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.freeAllowance ||
                      amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                        ?.freeAllowance
                    } ${
                      amdata?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.unitQualifier ||
                      amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                        ?.unitQualifier === "K"
                        ? "KG"
                        : `${
                            amdata?.flight?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.unitQualifier ||
                            amdata?.flight?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.unitQualifier
                          }`
                    }`
                  : `(${
                      amdata?.baggage?.freeBagAllownceInfo?.baggageDetails
                        ?.freeAllowance ||
                      amdata?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.freeAllowance
                    } × 23KG)`,
            };
          }
        ),

    passengerDetails: passengerData.map((passenger) => ({
      title: passenger.Title,
      firstName: passenger.FirstName,
      lastName: passenger.LastName,
      gender: passenger.Gender,
      ContactNo: passenger.ContactNo,
      DateOfBirth: passenger.DateOfBirth,
      email: passenger.Email,
      passportNo: PassportRequired ? passenger.PassportNo : "",
      passportExpiry: PassportRequired ? passenger.PassportExpiry : "",
      city: passenger.City,
      TicketNumber: "hold",
      // amount: amdata?.TotalPublishFare,
      amount: parseInt(amdata?.monetaryDetail?.[0]?.amount) / passengerDataa,
    })),
    // ],
    baggage: [],
    // [
    // {
    //     "AirlineCode": "IX",
    //     "FlightNumber": "876",
    //     "WayType": 2,
    //     "Code": "PBAB",
    //     "Description": 2,
    //     "Weight": 5,
    //     "Currency": "INR",
    //     "Price": 2500,
    //     "Origin": "DEL",
    //     "Destination": "BOM"
    // }
    // ],
  };
  // console.log(
  //   "payload.........................../././././././././././././",
  //   amdpayload
  // );

  let sesstioResultIndex = amdata;

  const balanceSubtractOneWay = () => {
    if (userId) {
      const balancePayload = {
        _id: userId,
        amount:
          Number(amdata?.monetaryDetail?.[0]?.amount) + Number(markUpamount),
        bookingType: "Flight booking",
      };

      dispatch(balanceSubtractRequest(balancePayload));
    }
  };

  // const balanceSubtractReturn = () => {
  //   if (userId) {
  //     const balancePayload = {
  //       _id: userId,
  //       amount:
  //         fareValueReturn?.Fare?.BaseFare +
  //         fareValueReturn?.Fare?.Tax +
  //         fareValueReturn?.Fare?.OtherCharges +
  //         markUpamount,
  //       bookingType: "Flight booking",
  //     };

  //     dispatch(balanceSubtractRequest(balancePayload));
  //   }
  // };

  if (loader) {
    return (
      <>
        <Flightloaderamd />
      </>
    );
  }

  // if (bookingConfirmed) {
  //   Swal.fire({
  //     title: "Booking Confirmed",
  //     icon: "success",
  //     timer: 5000,
  //     showClass: {
  //       popup: `
  //         animate__animated
  //         animate__fadeInUp
  //         animate__faster
  //       `,
  //     },
  //     hideClass: {
  //       popup: `
  //         animate__animated
  //         animate__fadeOutDown
  //         animate__faster
  //       `,
  //     },
  //   });
  //   dispatch(flightReducerClear());
  //   dispatch(ClearAllActionReturn());
  //   dispatch(clearOneWayReducer());
  //   dispatch(clearOneWayEMTReducer());
  //   sessionStorage.getItem("oneWay", {
  //     oneWayData: [],

  //     isLoading: false,

  //     isError: false,

  //     showSuccessMessage: false,
  //   });
  //   // sessionStorage.getItem("oneWayEMT", {
  //   //   oneWayEMTData: [],

  //   //   isLoading: false,

  //   //   isError: false,

  //   //   showSuccessMessage: false,
  //   // });
  //   // sessionStorage.getItem("flightBook", {
  //   //   flightBookData: {},
  //   //   flightBookDataGDS: {},
  //   //   flightTicketDataGDS: {},
  //   //   flightBookDataReturn: {},
  //   //   flightBookDataGDSReturn: {},
  //   //   flightTicketDataGDSReturn: {},
  //   //   isLogin: false,
  //   //   isLoading: false,
  //   //   isError: false,
  //   // });
  //   // sessionStorage.getItem("flightFare", {
  //   //   flightRuleData: {},
  //   //   flightQuoteData: {},
  //   //   flightRuleDataReturn: {},
  //   //   flightQuoteDataReturn: {},
  //   //   isLogin: false,
  //   //   isLoadingRuleDone: false,
  //   //   isLoadingQuoteDoneReturn: false,
  //   //   isLoadingRuleDoneReturn: false,
  //   //   isLoadingQuoteDone: false,
  //   //   isError: false,
  //   // });

  //   navigate("/");
  // }

  return (
    <div>
      <div className="singleFlightBox justify-content-evenly">
        <div className="singleFlightBoxOne">
          <div>
            {" "}
            <img
              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${imgvalue}.png`}
              alt="flightImg"
            />
          </div>
          <span>{imgvalue}</span>
          <p>
            {/* {airlineCode}  */}
            {airlinenumber}{" "}
          </p>
        </div>
        <div className="singleFlightBoxTwo">
          {/* <span>{arrival}</span> */}
          <span>{departurename}</span>

          {/* <p>{time1.substr(0, 5)}</p> */}
          <p>
            {/* {dayjs(fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime).format(
              "DD MMM, YY"
            )} */}
            {datedeparture}
          </p>
          <p>
            {/* {dayjs(fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime).format(
              "h:mm A"
            )} */}
            {departuretime}
          </p>
          {/* <p>
            Terminal
            
          </p> */}
        </div>
        <div className="singleFlightBoxThree">
          <h4>
            {/* {fareQuoteData?.Segments[0].length === 2
              ? `${timeDuration} ${" - "} ${Math.floor(
                  fareQuoteData?.Segments?.[0]?.[1]?.Duration / 60
                )}hr ${fareQuoteData?.Segments?.[0]?.[1]?.Duration % 60}min`
              : `${timeDuration}`}  */}
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
          {/* <span>{departure}</span> */}
          <span>{arrivalname}</span>
          <p>{datearrival}</p>
          <p>{arrivaltime}</p>
          {/* <p>
            Terminal
            
          </p> */}
        </div>
        <div className="singleFlightBoxFive">
          <span>₹ {Number(amdata?.monetaryDetail?.[0]?.amount)} </span>
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

      <div className="my-3 col-lg-8">
        {Passengers?.map((passenger, key) => {
          return (
            <>
              <div>
                <p>
                  Passenger {key + 1}{" "}
                  <span
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                      wordWrap: "break-word",
                    }}
                  >
                    (
                    {passenger.PaxType === 1
                      ? "Adult"
                      : passenger.PaxType === 2
                      ? "Child"
                      : "Infant"}
                    )
                  </span>
                </p>
              </div>

              <div key={key} className="passDetails">
                <div>
                  <p>Name:</p>
                  <p>Gender</p>
                  {passenger.Email && <p>Email:</p>}
                  {/* {passenger.AddressLine1 && (
                  <p>Address:</p>
                )} */}
                </div>
                <div>
                  <span>
                    {passenger.Title} {passenger.FirstName} {passenger.LastName}
                  </span>
                  <span>
                    {passenger.Gender === "2"
                      ? "Male"
                      : passenger.Gender === "1"
                      ? "Transgender"
                      : "Female"}
                  </span>
                  <span>{passenger.Email}</span>
                  {/* {passenger.AddressLine1 && (
                  <span>
                    {passenger.AddressLine1}, {passenger.City},{" "}
                    {passenger.Nationality}
                  </span>
                )} */}
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="my-3 col-lg-12">
        <div class="headingflightPassenger-new">
          <p>Term & Condition</p>
        </div>
      </div>
      <div
        style={{
          color: "#E73C33",
          fontSize: 16.14,
          fontFamily: "Montserrat",
          fontWeight: "500",
          wordWrap: "break-word",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Note: You can earn more commission if you checked Travel Insurance
      </div>
      <div
        style={{
          height: 44,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 5,
          display: "inline-flex",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          className="inputSelect"
          type="checkbox"
          value={paymentOption}
          onChange={() => {
            setPaymentOption(!paymentOption);
            setPassengerAgreement(!passengerAgreement);
          }}
        />
        <div
          style={{
            color: "black",
            fontSize: 16.14,
            fontFamily: "Montserrat",
            fontWeight: "500",
            wordWrap: "break-word",
          }}
        >
          I have reviewed and agreed on the fare and commission offered on this
          booking.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
          gap: "40px",
        }}
      >
        {/* <form
          className="formFlightSearch"
          textAlign="center"
          // onSubmit={handleSubmit}
          onSubmit={() => amdsubtractcheck()}
        > */}
        <div className="flightDetButton" style={{ fontSize: "16px" }}>
          <button
            style={{ fontSize: "16px" }}
            onClick={() => amdsubtractcheck()}
            type="submit"
            disabled={
              !passengerAgreement || !paymentOption
                ? true
                : loading
                ? true
                : false
            }
          >
            {" "}
            ticket
          </button>
        </div>
        {/* </form> */}
        {/* <button onClick={() => amdsubtractcheck()}>ticket</button> */}
      </div>
      <Modal
        open={loading}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <CircularProgress />
        </Box>
      </Modal>
    </div>
  );
};

export default Flightbookingdetailamd;
