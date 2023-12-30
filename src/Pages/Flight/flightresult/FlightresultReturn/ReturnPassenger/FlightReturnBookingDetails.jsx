import { Typography, Box, Grid, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import flightdir from "../../../../../Images/flgihtdir.png";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../flightreviewbooking/flightreviewbooking.css";
import { apiURL } from "../../../../../Constants/constant";
import {
  bookAction,
  bookActionGDS,
  bookTicketGDS,
  bookActionReturn,
  bookActionGDSReturn,
  bookTicketGDSReturn,
  flightReducerClear,
} from "../../../../../Redux/FlightBook/actionFlightBook";
import { ClearAllActionReturn } from "../../../../../Redux/FlightFareQuoteRule/actionFlightQuote";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { balanceSubtractRequest } from "../../../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { clearPassengersReducer } from "../../../../../Redux/Passengers/passenger";
import { clearOneWayReducer } from "../../../../../Redux/FlightSearch/OneWay/oneWay";
import { clearOneWayEMTReducer } from "../../../../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
import FlightLoader from "../../../FlightLoader/FlightLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const FlightReturnBookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [userData, setUserData] = useState(null);
  const [passengerAgreement, setPassengerAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);

  const reducerState = useSelector((state) => state);
  console.warn(
    "reducer state..........................",
    reducerState,
    sessionStorage?.getItem("flightDetailsONGo")
  );
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;

  // console.log(userBalance,"hdhdhd")
  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
  const ResultIndex =
    sessionStorage.getItem("ResultIndex") ||
    JSON.parse(
      sessionStorage?.getItem("flightDetailsONGo") !== "undefined"
        ? sessionStorage?.getItem("flightDetailsONGo")
        : '{"result":true}'
    )?.ResultIndex;
  const ResultIndexReturn =
    sessionStorage.getItem("ResultIndex") ||
    JSON.parse(
      sessionStorage?.getItem("flightDetailsIncome") !== "undefined"
        ? sessionStorage?.getItem("flightDetailsIncome")
        : '{"result":true}'
    )?.ResultIndex;
  useEffect(() => {
    if (
      ResultIndex === undefined ||
      ResultIndex === null ||
      ResultIndexReturn === undefined ||
      ResultIndexReturn === null
    ) {
      navigate("/FlightresultReturn/Passengerdetail");
    }
  }, []);
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
  // console.log(fareValue, "😍Fare value", fareValueReturn);
  const Passengers = reducerState?.passengers?.passengersData;
  // console.log(Passengers, "passenger ka data");
  const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const currentBalance = reducerState?.userData?.userData?.data?.data?.balance;
  async function bookingConfirmed() {
    // Swal.fire({
    //   title: "Booking Confirmed",
    //   icon: "success"
    // })
    await dispatch(flightReducerClear());
    await dispatch(ClearAllActionReturn());
    await dispatch(clearOneWayReducer());
    await dispatch(clearOneWayEMTReducer());
    await dispatch(clearPassengersReducer());
    await sessionStorage.getItem("oneWay", {
      oneWayData: [],

      isLoading: false,

      isError: false,

      showSuccessMessage: false,
    });
    await sessionStorage.getItem("oneWayEMT", {
      oneWayEMTData: [],

      isLoading: false,

      isError: false,

      showSuccessMessage: false,
    });
    await sessionStorage.getItem("flightBook", {
      flightBookData: {},
      flightBookDataGDS: {},
      flightTicketDataGDS: {},
      flightBookDataReturn: {},
      flightBookDataGDSReturn: {},
      flightTicketDataGDSReturn: {},
      isLogin: false,
      isLoading: false,
      isError: false,
    });
    await sessionStorage.getItem("flightFare", {
      flightRuleData: {},
      flightQuoteData: {},
      flightRuleDataReturn: {},
      flightQuoteDataReturn: {},
      isLogin: false,
      isLoadingRuleDone: false,
      isLoadingQuoteDoneReturn: false,
      isLoadingRuleDoneReturn: false,
      isLoadingQuoteDone: false,
      isError: false,
    });
    await sessionStorage("passengers", {
      passengersData: [],
      passengerDataReturn: [],

      isLoading: false,

      isError: false,

      showSuccessMessage: false,
    });
    await sessionStorage.removeItem("ResultIndex");
    await sessionStorage.removeItem("infants");
    await sessionStorage.removeItem("childs");
    await sessionStorage.removeItem("adults");

    navigate("/");
  }

  useEffect(() => {
    if (reducerState?.flightBook?.flightBookDataGDS?.Response) {
      getTicketForNonLCC();
    } else if (reducerState?.flightBook?.flightBookDataGDS?.Error) {
      setLoading(false);
      alert(reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage);
    }
  }, [reducerState?.flightBook?.flightBookDataGDS]);
  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
    ) {
      Swal.fire({
        title: "Booking Failed",
        text: reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
        icon: "error",
      });
      bookingConfirmed();
    }
  }, [reducerState?.flightBook?.flightBookData?.Error?.ErrorCode]);

  //Balance Substraction useEffect implemented below
  useEffect(() => {
    if (
      reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response?.Error
        ?.ErrorMessage == ""
    ) {
      // balanceSubtractOneWay();
      if (fareValue && fareValueReturn) {
        // console.log("hhdjgdj")
        balanceSubtractOneWay();
      } else {
        balanceSubtractOneWay();
        setLoading(false);
        // Swal.fire({
        //     title:"Booking Sucessfull",
        //     icon:"success"

        // })
        // bookingConfirmed()
        navigate("/Flightreturnbookingconfirmation");
      }
    }
  }, [reducerState?.flightBook?.flightTicketDataGDS]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage == "" &&
      reducerState?.flightBook?.flightBookData?.Response
    ) {
      if (fareValue && fareValueReturn) {
        balanceSubtractOneWay();
      } else {
        balanceSubtractOneWay();
        setLoading(false);
        // Swal.fire({
        //     title:"Booking Sucessfull",
        //     icon:"success"

        // })
        // bookingConfirmed()
        navigate("/Flightreturnbookingconfirmation");
      }
    }
  }, [reducerState?.flightBook?.flightBookData]);

  useEffect(() => {
    if (reducerState?.flightBook?.flightBookDataGDSReturn?.Response) {
      setLoading(false);
      getTicketForNonLCCReturn();
      navigate("/Flightbookingconfirmation");
    } else if (reducerState?.flightBook?.flightBookDataGDSReturn?.Error) {
      setLoading(false);
      let error =
        reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorMessage;
      alert(error);
    } else {
    }
  }, [reducerState?.flightBook?.flightBookDataGDSReturn]);

  function createMarkup(data) {
    return { __html: data };
  }

  // Handling return booking here(flow Here is LCC to LCC  OR LCC to Non-LCC)
  useEffect(() => {
    // console.log("bookingLCC");
    if (fareValueReturn?.IsLCC) {
      if (
        reducerState?.flightBook?.flightBookData?.Response &&
        reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage == ""
      ) {
        getTicketForLCCReturn();
      }
    } else if (fareValueReturn?.IsLCC === false) {
      if (
        reducerState?.flightBook?.flightBookData?.Response &&
        reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage == ""
      ) {
        //  getTicketForLCCReturn();
        const payloadGDSReturn = {
          ResultIndex: ResultIndexReturn,
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId:
            reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
            reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
          Passengers: PassengersReturn.map((item, index) => {
            return {
              ...item,
              Email: apiURL.flightEmail,
              ContactNo: apiURL.phoneNo,
            };
          }),
        };
        dispatch(bookActionGDSReturn(payloadGDSReturn));
      }
    }
  }, [reducerState?.flightBook?.flightBookData?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage == ""
    ) {
      balanceSubtractReturn();

      setLoading(false);
      // Swal.fire({
      //     title:"Booking Sucessfull",
      //     icon:"success"

      // })
      // bookingConfirmed()
      navigate("/Flightreturnbookingconfirmation");
    }
  }, [reducerState?.flightBook?.flightBookDataReturn?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
        ?.Error?.ErrorMessage == ""
    ) {
      balanceSubtractReturn();
      setLoading(false);
      // Swal.fire({
      //     title:"Booking Sucessfull",
      //     icon:"success"

      // })
      // bookingConfirmed()
      navigate("/Flightreturnbookingconfirmation");
    }
  }, [reducerState?.flightBook?.flightTicketDataGDSReturn]);

  //Handling return booking here(flow Here is Non-Lcc to Non-Lcc OR Non-Lcc to Lcc)

  useEffect(() => {
    if (fareValueReturn?.IsLCC) {
      if (
        reducerState?.flightBook?.flightBookDataGDS?.Response &&
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == ""
      ) {
        getTicketForLCCReturn();
      }
    } else if (fareValueReturn?.IsLCC === false) {
      if (
        reducerState?.flightBook?.flightBookDataGDS?.Response &&
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == ""
      ) {
        // getTicketForLCC();
        const payloadGDSReturn = {
          ResultIndex: ResultIndexReturn,
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId:
            reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
            reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
          Passengers: PassengersReturn.map((item, index) => {
            return {
              ...item,
              Email: apiURL.flightEmail,
              ContactNo: apiURL.phoneNo,
            };
          }),
        };
        dispatch(bookActionGDSReturn(payloadGDSReturn));
      }
    }
  }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);

  const handleSubmit = (e) => {
    if (fareValue && fareValueReturn) {
      if (
        fareValue?.Fare?.BaseFare +
          fareValue?.Fare?.Tax +
          fareValue?.Fare?.OtherCharges +
          markUpamount +
          fareValueReturn?.Fare?.BaseFare +
          fareValueReturn?.Fare?.Tax +
          fareValueReturn?.Fare?.OtherCharges +
          markUpamount <=
        currentBalance
      ) {
        e.preventDefault();
        const payloadGDS = {
          ResultIndex: ResultIndex,
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId:
            reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
            reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
          Passengers: Passengers.map((item, index) => {
            return {
              ...item,
              Email: apiURL.flightEmail,
              ContactNo: apiURL.phoneNo,
            };
          }),
        };

        if (fareValue?.IsLCC === false) {
          dispatch(bookActionGDS(payloadGDS));
          setLoading(true);
        }
        if (fareValue?.IsLCC === true) {
          // console.log("lccExecutedOneWay");
          getTicketForLCC();

          setLoading(true);
        }
      } else {
        // alert("Insufficeint balance!! Please Recharge your Wallet");
        // navigate("/flights");
        Swal.fire({
          title: "Insufficeint balance!! Please Recharge your Wallet",
          icon: "error",
          timer: 5000,
          showClass: {
            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
          },
          hideClass: {
            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
          },
        });
        bookingConfirmed();
        navigate("/");
      }
    } else {
      if (
        fareValue?.Fare?.BaseFare +
          fareValue?.Fare?.Tax +
          fareValue?.Fare?.OtherCharges +
          markUpamount <=
        currentBalance
      ) {
        e.preventDefault();
        const payloadGDS = {
          ResultIndex: ResultIndex,
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId:
            reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
            reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
          Passengers: Passengers.map((item, index) => {
            return {
              ...item,
              Email: apiURL.flightEmail,
              ContactNo: apiURL.phoneNo,
            };
          }),
        };

        if (fareValue?.IsLCC === false) {
          dispatch(bookActionGDS(payloadGDS));
          setLoading(true);
        }
        if (fareValue?.IsLCC === true) {
          // console.log("lccExecutedOneWay");
          getTicketForLCC();
          setLoading(true);
        }
      } else {
        // alert("Insufficeint balance!! Please Recharge your Wallet");
        Swal.fire({
          title: "Insufficeint balance!! Please Recharge your Wallet",
          icon: "error",
          timer: 5000,
          showClass: {
            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
          },
          hideClass: {
            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
          },
        });
        bookingConfirmed();
        navigate("/");
      }
    }
  };

  const getTicketForNonLCC = () => {
    const payLoadDomestic = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
    };
    const payLoadInternational = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
      Passport: Passengers.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    if (isPassportRequired) {
      dispatch(bookTicketGDS(payLoadInternational));
    } else {
      dispatch(bookTicketGDS(payLoadDomestic));
    }
  };
  const getTicketForNonLCCReturn = () => {
    const payLoadDomestic = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.BookingId,
    };
    const payLoadInternational = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.BookingId,
      Passport: Passengers.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    if (isPassportRequired) {
      dispatch(bookTicketGDSReturn(payLoadInternational));
    } else {
      dispatch(bookTicketGDSReturn(payLoadDomestic));
    }
  };

  const getTicketForLCC = () => {
    const payloadLcc = {
      ResultIndex: ResultIndex,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId:
        reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
        reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      Passengers: Passengers.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    dispatch(bookAction(payloadLcc));
  };
  const getTicketForLCCReturn = () => {
    const payloadLccReturn = {
      ResultIndex: ResultIndexReturn,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      Passengers: PassengersReturn.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    dispatch(bookActionReturn(payloadLccReturn));
  };
  //Balance Subtract function implemented below
  const balanceSubtractOneWay = (onewayBooking, returnBooking) => {
    if (userId) {
      const balancePayload = {
        _id: userId,
        amount:
          fareValue?.Fare?.BaseFare +
          fareValue?.Fare?.Tax +
          fareValue?.Fare?.OtherCharges +
          markUpamount,
      };

      dispatch(balanceSubtractRequest(balancePayload));
    }
  };

  const balanceSubtractReturn = () => {
    if (userId) {
      const balancePayload = {
        _id: userId,
        amount:
          fareValueReturn?.Fare?.BaseFare +
          fareValueReturn?.Fare?.Tax +
          fareValueReturn?.Fare?.OtherCharges +
          markUpamount,
      };

      dispatch(balanceSubtractRequest(balancePayload));
    }
  };

  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  // console.log(fareQuoteData, "fare quote data");

  const img = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const airlineName = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineName;
  const airlineCode = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const flightNumber = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const originCity =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const DestinationCity =
    fareQuoteData?.Segments?.[0]?.[0]?.Destination?.Airport?.CityName;
  const flightFare = fareQuoteData?.Fare?.PublishedFare;
  const originTerminal =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal;
  const destinationTerminal =
    fareQuoteData?.Segments?.[0]?.[0]?.Destination?.Airport?.Terminal;

  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");

  //departure flight data in passenger page

  const flightDeparture =
    reducerState?.flightFare?.flightQuoteData?.Results?.Segments[0]?.[0];
  const flightReturn =
    reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments[0]?.[0];

  // console.log(flightDeparture, "flight departure");
  // console.log(flightReturn, "flight return ");

  const duration1 = `${Math.floor(flightDeparture?.Duration / 60)}hr ${
    flightDeparture?.Duration % 60
  }min`;
  const dateString = flightDeparture?.Origin?.DepTime;
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

  const dateString1 = flightDeparture?.Destination?.ArrTime;
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
  const [month1, day1, year1, time1, ampm1] = formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;
  // console.log(desiredFormat1, "desired format");
  // console.log(desiredFormat, "desired format");

  const duration3 = `${Math.floor(flightReturn?.Duration / 60)}hr ${
    flightReturn?.Duration % 60
  }min`;
  const dateString3 = flightReturn?.Origin?.DepTime;
  const date3 = new Date(dateString3);
  const options3 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate3 = date3.toLocaleString("en-US", options3);
  const [month3, day3, year3, time3, ampm3] = formattedDate3.split(" ");
  const desiredFormat3 = `${day3}${month3}-${year3} ${time3} ${ampm3}`;

  const dateString4 = flightReturn?.Destination?.ArrTime;
  const date4 = new Date(dateString4);
  const options4 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate4 = date4.toLocaleString("en-US", options4);
  const [month4, day4, year4, time4, ampm4] = formattedDate4.split(" ");
  const desiredFormat4 = `${day4}${month4}-${year4} ${time4} ${ampm4}`;
  // console.log(desiredFormat4, "desired format");
  // console.log(desiredFormat3, "desired format");

  if (loading) {
    return (
      <>
        <FlightLoader />
      </>
    );
  }
  // if(reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage !== ""){
  //     alert("reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage")
  // }

  return (
    <div>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-6">
            <div className="singleDataReturnBox">
              <div className="returnBoxOne">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/FlightImages/${flightDeparture?.Airline?.AirlineCode}.png`}
                  />{" "}
                </div>
                <span>{flightDeparture?.Airline?.AirlineName}</span>
                <p>
                  {flightDeparture?.Airline?.AirlineCode}{" "}
                  {flightDeparture?.Airline?.FlightNumber}
                </p>
              </div>
              <div className="returnBoxTwo">
                <span>{flightDeparture?.Origin?.Airport?.CityName}</span>
                <p>{desiredFormat.slice(0, 12)}</p>
                <p>{desiredFormat.slice(13)}</p>
              </div>
              <div className="returnBoxThree">
                <h4>{duration1}</h4>
                <div>
                  <img src={flightdir} />
                </div>
              </div>
              <div className="returnBoxFour">
                <span>{flightDeparture?.Destination?.Airport?.CityName}</span>
                <p>{desiredFormat1.slice(0, 12)}</p>
                <p>{desiredFormat1.slice(13)}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="singleDataReturnBox">
              <div className="returnBoxOne">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/FlightImages/${flightReturn?.Airline?.AirlineCode}.png`}
                  />{" "}
                </div>
                <span>{flightReturn?.Airline?.AirlineName}</span>
                <p>
                  {flightReturn?.Airline?.AirlineCode}{" "}
                  {flightReturn?.Airline?.FlightNumber}
                </p>
              </div>
              <div className="returnBoxTwo">
                <span>{flightReturn?.Origin?.Airport?.CityName}</span>
                <p>{desiredFormat3.slice(0, 12)}</p>
                <p>{desiredFormat3.slice(13)}</p>
              </div>
              <div className="returnBoxThree">
                <h4>{duration3}</h4>
                <div>
                  <img src={flightdir} />
                </div>
              </div>
              <div className="returnBoxFour">
                <span>{flightReturn?.Destination?.Airport?.CityName}</span>
                <p>{desiredFormat4.slice(0, 12)}</p>
                <p>{desiredFormat4.slice(13)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div class="headingflightPassenger">
          <p>Passenger Details</p>
          <span>
            Total Adult(s) : {adults} Child: {childs} Infants: {infants}
          </span>
        </div>
      </div>

      <div className="col-lg-8 my-3">
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
                    {passenger.Gender === 1
                      ? "Male"
                      : passenger.Gender === 2
                      ? "Female"
                      : "Transgender"}
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

      <div className="col-lg-12 my-3">
        <Accordion
          style={{
            background: "#DFE6F7",
            borderRadius: 4,
            // position:"relative"
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{
              height: 49,

              background: "#DFE6F7",
              borderRadius: 4,
            }}
          >
            <Typography
              style={{
                color: "black",
                fontSize: 24,
                fontFamily: "Montserrat",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              Fare Rules{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ height: "auto" }}>
            <Box className="Top_header" p={5}>
              {fareRules?.map((rule) => (
                <Box>
                  <div
                    style={{
                      color: "black",
                      fontSize: 16.14,
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    QP: {rule?.Origin} - {rule?.Destination}
                  </div>
                  <div
                    dangerouslySetInnerHTML={createMarkup(rule?.FareRuleDetail)}
                    style={{ padding: "20px" }}
                  />
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="col-lg-12 my-3">
        <div class="headingflightPassenger">
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
          border: "1px #BBBBBB solid",
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
        <form
          className="formFlightSearch"
          textAlign="center"
          onSubmit={handleSubmit}
        >
          <div className="flightDetButton">
            <button
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
              {loading ? "Loading..." : "Ticket"}{" "}
            </button>
          </div>
        </form>
      </div>

      {/* <Modal
                open={loading}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <CircularProgress />
                </Box>
            </Modal> */}
    </div>
  );
};

export default FlightReturnBookingDetails;
