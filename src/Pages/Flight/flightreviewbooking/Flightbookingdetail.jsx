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
import flightdir from "../../../Images/flgihtdir.png";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../Redux/Auth/logIn/actionLogin";
import { flightReducerClear } from "../../../Redux/FlightBook/actionFlightBook";
import "./flightreviewbooking.css";
import { apiURL } from "../../../Constants/constant";
import {
  bookAction,
  bookActionGDS,
  bookTicketGDS,
  bookActionReturn,
  bookActionGDSReturn,
  bookTicketGDSReturn,
} from "../../../Redux/FlightBook/actionFlightBook";
import axios from "axios";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { swalModal } from "../../../utils/swal";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { clearPassengersReducer } from "../../../Redux/Passengers/passenger";
import { clearOneWayReducer } from "../../../Redux/FlightSearch/OneWay/oneWay";
import { clearOneWayEMTReducer } from "../../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
// import {flightReducerClear} from "../../../Redux/FlightBook/actionFlightBook";
import { ClearAllActionReturn } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { useLocation } from "react-router-dom";
// import { clearOneWayReducer } from "../../../Redux/FlightSearch/OneWay/oneWay";

import FlightLoader from "../FlightLoader/FlightLoader";
import dayjs from "dayjs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Flightbookingdetail = ({ passSsramount, passssrmeal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [userData, setUserData] = useState(null);
  const [passengerAgreement, setPassengerAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const reducerState = useSelector((state) => state);
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
  // console.log(Passengers, "passenger ka data")
  const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const currentBalance = reducerState?.userData?.userData?.data?.data?.balance;

  useEffect(() => {
    if (reducerState?.flightBook?.flightBookDataGDS?.Response) {
      if (dummyPnrCheck) {
        balanceSubtractOneWay();
        navigate("/Flightbookingconfirmation");
      } else {
        getTicketForNonLCC();
      }
    }

    //  else if (reducerState?.flightBook?.flightBookDataGDS?.Error) {
    //   setLoading(false);
    //   alert(reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage);
    // }
  }, [reducerState?.flightBook?.flightBookDataGDS]);
  useEffect(() => {
    if (reducerState?.flightBook?.flightBookDataGDS?.Error !== "") {
      setLoading(false);
      // alert(reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage);
    }
  }, [reducerState?.flightBook?.flightBookDataGDS]);

  const location = useLocation();
  const { baggageDetails, ssramount, mealdetails, ssrmeal } = location.state;
  // totalAmount(ssramount);
  //Balance Substraction useEffect implemented below
  passSsramount(ssramount);
  passssrmeal(ssrmeal);
  // console.log(ssrmeal,"dgfdgfdgfdgfdgf")
  // console.log("bsvhjsbdvhjsdhjsdddddddddddddddddddddddd",baggageDetails,ssramount);
  // console.log("mealdetailsfgcgcgh",mealdetails,ssrmeal)

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
        setBookingConfirmed(true);
        navigate("/Flightbookingconfirmation", {
          state: {
            baggageDetails: baggageDetails,
            ssramount: ssramount,
            mealdetails: mealdetails,
            ssrmeal: ssrmeal,
          },
        });
      }
    }
  }, [reducerState?.flightBook?.flightTicketDataGDS]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "" &&
      reducerState?.flightBook?.flightBookData?.Response
    ) {
      if (fareValue && fareValueReturn) {
        balanceSubtractOneWay();
      } else {
        balanceSubtractOneWay();
        setLoading(false);
        setBookingConfirmed(true);
        navigate("/Flightbookingconfirmation", {
          state: {
            baggageDetails: baggageDetails,
            ssramount: ssramount,
            mealdetails: mealdetails,
            ssrmeal: ssrmeal,
          },
        });
      }
    }
  }, [reducerState?.flightBook?.flightBookData?.Response]);

  useEffect(() => {
    if (reducerState?.flightBook?.flightBookDataGDSReturn?.Response) {
      setLoading(false);
      getTicketForNonLCCReturn();
      navigate("/Flightbookingconfirmation", {
        state: {
          baggageDetails: baggageDetails,
          ssramount: ssramount,
          mealdetail: mealdetails,
          ssrmeal: ssrmeal,
        },
      });
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

          // Passengers: PassengersReturn.map((item, index) => {
          //   return {
          //     ...item,
          //     Email: apiURL.flightEmail,
          //     ContactNo: apiURL.phoneNo,
          //   };
          // }),
          Passengers: PassengersReturn.map((item, index) => {
            if (index < baggageDetails.length && index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
                MealDynamic: [mealdetails[index]],
              };
            } else if (index < baggageDetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
              };
            } else if (index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                MealDynamic: [mealdetails[index]],
              };
            } else {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,
              };
            }
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
      setBookingConfirmed(true);
      navigate("/Flightbookingconfirmation");
    }
  }, [reducerState?.flightBook?.flightBookDataReturn?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
        ?.Error?.ErrorMessage == ""
    ) {
      balanceSubtractReturn();
      setLoading(false);
      setBookingConfirmed(true);
      navigate("/Flightbookingconfirmation");
    }
  }, [reducerState?.flightBook?.flightTicketDataGDSReturn]);

  //Handling return booking here(flow Here is Non-Lcc to Non-Lcc OR Non-Lcc to Lcc)
  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
    ) {
      setLoading(true);
      // swalModal("flight",reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,true);
      swalModal(
        "flight",
        "Something went wrong with your flight booking. Please check your details and try again.",
        true
      );

      // Swal.fire({
      //   title: "Hii Encounter An Error",
      //   text: `${reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage}`,
      //   icon: "question",
      //   timer: 5000,

      //   showClass: {
      //     popup: `
      //         animate__animated
      //         animate__fadeInUp
      //         animate__faster
      //       `,
      //   },
      //   hideClass: {
      //     popup: `
      //         animate__animated
      //         animate__fadeOutDown
      //         animate__faster
      //       `,
      //   },
      // });

      dispatch(flightReducerClear());
      dispatch(ClearAllActionReturn());
      dispatch(clearOneWayReducer());
      dispatch(clearOneWayEMTReducer());
      dispatch(clearPassengersReducer());
      sessionStorage.removeItem("infants");
      sessionStorage.removeItem("ResultIndex");
      sessionStorage.removeItem("childs");
      sessionStorage.removeItem("adults");
      sessionStorage.setItem("passengers", {
        passengersData: [],
        passengerDataReturn: [],

        isLoading: false,

        isError: false,

        showSuccessMessage: false,
      });
      sessionStorage.getItem("oneWay", {
        oneWayData: [],

        isLoading: false,

        isError: false,

        showSuccessMessage: false,
      });
      sessionStorage.getItem("oneWayEMT", {
        oneWayEMTData: [],

        isLoading: false,

        isError: false,

        showSuccessMessage: false,
      });
      sessionStorage.getItem("flightBook", {
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
      sessionStorage.getItem("flightFare", {
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

      navigate("/");
    }
  }, [
    reducerState?.flightBook?.flightBookData?.Error?.ErrorCode,
    reducerState?.flightBook?.flightBookData?.Error?.ErrorCode,
  ]);

  useEffect(() => {
    if (
      ResultIndex === undefined ||
      ResultIndex === null ||
      ResultIndexReturn === undefined ||
      ResultIndexReturn === null
    ) {
      navigate("/passengerdetail");
    }
  });

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
          // Passengers: PassengersReturn.map((item, index) => {
          //   return {
          //     ...item,
          //     Email: apiURL.flightEmail,
          //     ContactNo: apiURL.phoneNo,
          //   };
          // }),
          Passengers: PassengersReturn.map((item, index) => {
            if (index < baggageDetails.length && index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
                MealDynamic: [mealdetails[index]],
              };
            } else if (index < baggageDetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,
                Baggage: [baggageDetails[index]],
              };
            } else if (index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                MealDynamic: [mealdetails[index]],
              };
            } else {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,
              };
            }
          }),
        };
        dispatch(bookActionGDSReturn(payloadGDSReturn));
      }
    }
  }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);

  const handleSubmit = (e) => {
    if (fareValue && fareValueReturn) {
      // console.log("returnInitiated")
      if (
        fareValue?.Fare?.BaseFare +
          fareValue?.Fare?.Tax +
          fareValue?.Fare?.OtherCharges +
          markUpamount +
          fareValueReturn?.Fare?.BaseFare +
          fareValueReturn?.Fare?.Tax +
          fareValueReturn?.Fare?.OtherCharges +
          ssrmeal +
          ssramount +
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
          // Passengers: Passengers.map((item, index) => {
          //   return {
          //     ...item,
          //     Email: apiURL.flightEmail,
          //     ContactNo: apiURL.phoneNo,
          //   };
          // }),
          Passengers: Passengers.map((item, index) => {
            if (index < baggageDetails.length && index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
                MealDynamic: [mealdetails[index]],
              };
            }
            if (index < baggageDetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
              };
            }
            if (index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                MealDynamic: [mealdetails[index]],
              };
            } else {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,
              };
            }
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
        swalModal(
          "py",
          "Insufficeint balance!! Please Recharge your Wallet",
          true
        );
        // Swal.fire({
        //   title: "An Error Occured",
        //   text: "Insufficeint balance!! Please Recharge your Wallet",
        //   icon: "error",
        //   timer: 5000,
        //   showClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeInUp
        //       animate__faster
        //     `,
        //   },
        //   hideClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeOutDown
        //       animate__faster
        //     `,
        //   },
        // });
        navigate("/");
      }
    } else {
      console.log("returnInitiated");
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
          // Passengers: Passengers.map((item, index) => {
          //   return {
          //     ...item,
          //     Email: apiURL.flightEmail,
          //     ContactNo: apiURL.phoneNo,
          //   };
          // }),
          Passengers: Passengers.map((item, index) => {
            if (index < baggageDetails.length && index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
                MealDynamic: [mealdetails[index]],
              };
            } else if (index < baggageDetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                Baggage: [baggageDetails[index]],
              };
            } else if (index < mealdetails.length) {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,

                MealDynamic: [mealdetails[index]],
              };
            } else {
              return {
                ...item,
                Email: apiURL.flightEmail,
                ContactNo: apiURL.phoneNo,
              };
            }
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
        swalModal(
          "py",
          "Insufficeint balance!! Please Recharge your Wallet",
          true
        );
        // Swal.fire({
        //   title: "An Error Occured",
        //   text: "Insufficeint balance!! Please Recharge your Wallet",
        //   icon: "error",
        //   timer: 5000,
        //   showClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeInUp
        //       animate__faster
        //     `,
        //   },
        //   hideClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeOutDown
        //       animate__faster
        //     `,
        //   },
        // });
        // alert("Insufficeint balance!! Please Recharge your Wallet");
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
        reducerState?.oneWay?.oneWayData?.data?.tvoTraceId ||
        reducerState?.return?.returnData?.data?.tvoTraceId,
      // Passengers: Passengers.map((item, index) => {
      //   return {
      //     ...item,
      //     Email: apiURL.flightEmail,
      //     ContactNo: apiURL.phoneNo,
      //   };
      // }),

      Passengers: Passengers.map((item, index) => {
        if (index < baggageDetails.length && index < mealdetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            Baggage: [baggageDetails[index]],
            MealDynamic: [mealdetails[index]],
          };
        } else if (index < baggageDetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            Baggage: [baggageDetails[index]],
          };
        } else if (index < mealdetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            MealDynamic: [mealdetails[index]],
          };
        } else {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
          };
        }
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
      // Passengers: PassengersReturn.map((item, index) => {
      //   return {
      //     ...item,
      //     Email: apiURL.flightEmail,
      //     ContactNo: apiURL.phoneNo,
      //   };
      // }),
      Passengers: PassengersReturn.map((item, index) => {
        if (index < baggageDetails.length && index < mealdetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            Baggage: [baggageDetails[index]],
            MealDynamic: [mealdetails[index]],
          };
        } else if (index < baggageDetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            Baggage: [baggageDetails[index]],
          };
        } else if (index < mealdetails.length) {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,

            MealDynamic: [mealdetails[index]],
          };
        } else {
          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
          };
        }
      }),
    };
    dispatch(bookActionReturn(payloadLccReturn));
  };
  //Balance Subtract function implemented below
  const balanceSubtractOneWay = (onewayBooking, returnBooking) => {
    if (userId) {
      const balancePayload = {
        _id: userId,
        amount: !dummyPnrCheck
          ? fareValue?.Fare?.BaseFare +
            fareValue?.Fare?.Tax +
            fareValue?.Fare?.OtherCharges +
            markUpamount +
            ssramount +
            ssrmeal
          : 99,
        bookingType: "Flight booking",
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
          ssramount +
          ssrmeal +
          markUpamount,
        bookingType: "Flight booking",
      };

      dispatch(balanceSubtractRequest(balancePayload));
    }
  };

  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  // console.log(fareQuoteData, "fare quote data")

  const img = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const airlineName = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineName;
  const airlineCode = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const flightNumber = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const originCity =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const DestinationCity =
    fareQuoteData?.Segments?.[0]?.[fareQuoteData?.Segments?.[0]?.length - 1]
      ?.Destination?.Airport?.CityName;
  const flightFare = fareQuoteData?.Fare?.PublishedFare;
  const originTerminal =
    fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal;
  const destinationTerminal =
    fareQuoteData?.Segments?.[0]?.[0]?.Destination?.Airport?.Terminal;

  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");

  const timeDuration = `${Math.floor(
    fareQuoteData?.Segments?.[0]?.[0]?.Duration / 60
  )}hr ${fareQuoteData?.Segments?.[0]?.[0]?.Duration % 60}min`;

  if (loading) {
    return (
      <>
        <FlightLoader />
      </>
    );
  }

  if (bookingConfirmed) {
    Swal.fire({
      title: "Booking Confirmed",
      icon: "success",
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
    dispatch(flightReducerClear());
    dispatch(ClearAllActionReturn());
    dispatch(clearOneWayReducer());
    dispatch(clearOneWayEMTReducer());
    sessionStorage.getItem("oneWay", {
      oneWayData: [],

      isLoading: false,

      isError: false,

      showSuccessMessage: false,
    });
    sessionStorage.getItem("oneWayEMT", {
      oneWayEMTData: [],

      isLoading: false,

      isError: false,

      showSuccessMessage: false,
    });
    sessionStorage.getItem("flightBook", {
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
    sessionStorage.getItem("flightFare", {
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

    navigate("/");
  }

  return (
    <div>
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

      <div className="col-lg-12 my-3">
        <Accordion
          style={{
            background: "#FFFBFB",
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

              background: "#FFFBFB",
              borderRadius: 4,
            }}
          >
            <Typography
              style={{
                color: "#E73C34",
                fontSize: 19,
                fontFamily: "Montserrat",
                fontWeight: "500",
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
                    QP: {rule.Origin} - {rule.Destination}
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
          <div className="flightDetButton" style={{ fontSize: "16px" }}>
            <button
              style={{ fontSize: "16px" }}
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

export default Flightbookingdetail;
