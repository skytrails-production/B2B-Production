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
import { swalModal } from "../../../../../utils/swal";
import { balanceSubtractRequest } from "../../../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { clearPassengersReducer } from "../../../../../Redux/Passengers/passenger";
import { clearOneWayReducer } from "../../../../../Redux/FlightSearch/OneWay/oneWay";
import { clearOneWayEMTReducer } from "../../../../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
import FlightLoader from "../../../FlightLoader/FlightLoader";
import dayjs from "dayjs";
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
    function convertDateFormat(inputDate) {


        // Convert the input date to a JavaScript Date object
        let dateObj = new Date(inputDate);

        // Format the date as YYYY-MM-DDTHH:MM:SS
        let formattedDatee = dateObj.toISOString().split('.')[0];

        return formattedDatee;
    }

    const reducerState = useSelector((state) => state);
    // console.warn(
    //     "reducer state..........................",
    //     reducerState,
    //     //   sessionStorage?.getItem("flightDetailsONGo")
    // );
    const markUpamount =
        reducerState?.userData?.userData?.data?.data?.markup?.flight;

    // console.log(userBalance,"hdhdhd")
    const isPassportRequired =
        reducerState?.flightFare?.flightQuoteData?.Results
            ?.IsPassportRequiredAtTicket;
    const ResultIndex =
        sessionStorage.getItem("ResultIndex")

    const ResultIndexReturn =
        JSON.parse(sessionStorage.getItem("ResultIndex"))
    // console.log(ResultIndexReturn, "resultIdex")


    const fareQuote =
        reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
    // const flightReviewDetails =
    //   reducerState?.flightBook?.flightBookDataGDS?.Response;
    const fareRules = reducerState?.flightFare?.flightRuleDataReturn
        ?.FareRules;
    const fareValue = reducerState?.flightFare?.flightQuoteDataReturn?.Results;
    const fareValueReturn =
        reducerState?.flightFare?.flightQuoteDataReturn?.Results;
    // console.log(fareValue, "😍Fare value", fareValueReturn);
    const Passengers = reducerState?.passengers?.passengersData;
    // console.log(Passengers, "passenger ka data");
    const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
    const userId = reducerState?.logIn?.loginData?.data?.data?.id;
    const currentBalance = reducerState?.userData?.userData?.data?.data?.balance;










    const fareQuoteData = reducerState?.flightFare?.
        flightQuoteDataReturn
        ?.Results;
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
    const isPasswordsRequired = reducerState?.flightFare?.flightQuoteData?.Results?.
        IsPassportRequiredAtTicket;
    const flightDeparture =
        reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments[0]?.[0];
    const flightReturn = isPassportRequired ? reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments[1]?.[0] :
        reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments[0]?.[0];
    // console.warn(isPassportRequired, "ispasswordrequird", flightReturn, "flightReturn")

    // console.log(flightDeparture, "flight departure");
    // console.log(flightReturn, "flight return ");

    const duration1 = `${Math.floor(flightDeparture?.Duration / 60)}hr ${flightDeparture?.Duration % 60
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

    const duration3 = `${Math.floor(flightReturn?.Duration / 60)}hr ${flightReturn?.Duration % 60
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
    const FlightDeparture = reducerState?.flightFare?.
        flightQuoteDataReturn
        ?.Results?.Segments[0]
    const FlightReturn = reducerState?.flightFare?.
        flightQuoteDataReturn
        ?.Results?.Segments[1]
    const result = reducerState?.flightFare?.flightQuoteDataReturn?.Results
    let layoverHours = 0;
    let layoverMinutes = 0;
    let layoverDuration = 0;


    const arrivalTime = dayjs(FlightReturn?.[0]?.Origin?.DepTime);

    const departureTime = dayjs(FlightReturn?.[FlightReturn?.length - 1]?.Destination?.ArrTime);
    layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
    layoverHours = Math.floor(layoverDuration / 60); // Extract hours
    layoverMinutes = layoverDuration % 60;
    // console.log(desiredFormat4, "desired format");
    // console.log(desiredFormat3, "desired format");
    useEffect(() => {
        if (reducerState?.flightBook?.flightBookDataGDSReturn?.Response) {
            getTicketForNonLCCReturn();
        } else if (reducerState?.flightBook?.flightBookDataGDSReturn?.Error) {
            setLoading(false);
            // alert(reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage);
            // swalModal('py', reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage, true)
            swalModal('py', 'Something went wrong with your flight booking. Please check your details and try again.', true)
            navigate('/')
        }
    }, [reducerState?.flightBook?.flightBookDataGDSReturn]);


    function createMarkup(data) {
        return { __html: data };
    }




    useEffect(() => {
        if (
            reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
                ?.Error?.ErrorCode == 0 ||
            reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
                ?.Error?.ErrorCode == 0 ||
            reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorCode == 0
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
    }, [reducerState?.flightBook]);




    const handleSubmit = (e) => {
        if (fareValue && fareValueReturn) {
            if (
                // fareValue?.Fare?.BaseFare +
                // fareValue?.Fare?.Tax +
                // fareValue?.Fare?.OtherCharges +
                // markUpamount +
                // fareValueReturn?.Fare?.BaseFare +
                // fareValueReturn?.Fare?.Tax +
                // fareValueReturn?.Fare?.OtherCharges +
                // markUpamount <=
                1 <=
                currentBalance
            ) {
                e.preventDefault();
                // console.log("payloadGDSpayloadGDSpayloadGDSpayloadGDSpayloadGDS")
                const payloadGDS = {
                    ResultIndex: ResultIndexReturn,
                    EndUserIp: reducerState?.ip?.ipData,
                    TokenId: reducerState?.ip?.tokenData,
                    TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
                    Passengers: Passengers.map((item, index) => {
                        return {
                            ...item,
                            Email: apiURL.flightEmail,
                            ContactNo: apiURL.phoneNo,
                            PassportExpiry: convertDateFormat(item.PassportExpiry),
                        };
                    }),
                };

                if (fareValue?.IsLCC === false) {
                    dispatch(bookActionGDS(payloadGDS));
                    setLoading(true);
                }
                if (fareValue?.IsLCC === true) {
                    // console.log("lccExecutedOneWay");
                    getTicketForLCCReturn();

                    setLoading(true);
                }
            } else {

                swalModal('flight', "Insufficeint balance!! Please Recharge your Wallet", true)

                // bookingConfirmed();
                // navigate("/");
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
                    ResultIndex: ResultIndexReturn,
                    EndUserIp: reducerState?.ip?.ipData,
                    TokenId: reducerState?.ip?.tokenData,
                    TraceId:

                        reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
                    Passengers: Passengers.map((item, index) => {
                        return {
                            ...item,
                            FirstName: "",

                            Email: apiURL.flightEmail,
                            ContactNo: apiURL.phoneNo,
                            PassportExpiry: convertDateFormat(item.PassportExpiry),
                        };
                    }),
                };

                if (fareValue?.IsLCC === false) {
                    dispatch(bookActionGDS(payloadGDS));
                    setLoading(true);
                }
                if (fareValue?.IsLCC === true) {

                    getTicketForLCC();
                    setLoading(true);
                }
            } else {

                swalModal("py", "Insufficeint balance!! Please Recharge your Wallet", true);

                // bookingConfirmed();
                // navigate("/");
            }
        }
    };
    const handleSubmitINC = (e) => {


        console.log("fareValue", fareValue)
        e.preventDefault()
        if (
            fareValue?.Fare?.BaseFare +
            fareValue?.Fare?.Tax +
            fareValue?.Fare?.OtherCharges +
            markUpamount +
            fareValueReturn?.Fare?.BaseFare +
            fareValueReturn?.Fare?.Tax +
            fareValueReturn?.Fare?.OtherCharges +
            markUpamount <=
            // 1 <=
            currentBalance
        ) {
            if (fareValue?.IsLCC === true) {
                console.log("ifffffff", fareValue)
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
                                PassportExpiry: convertDateFormat(item.PassportExpiry),
                            };
                        }),
                    };
                    dispatch(bookActionReturn(payloadLccReturn));
                };
                getTicketForLCCReturn()

            }
            else {
                console.log("else", fareValue)
                const payloadGDS = {
                    ResultIndex: ResultIndexReturn,
                    EndUserIp: reducerState?.ip?.ipData,
                    TokenId: reducerState?.ip?.tokenData,
                    TraceId:

                        reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
                    Passengers: Passengers.map((item, index) => {
                        return {
                            ...item,


                            Email: apiURL.flightEmail,
                            ContactNo: apiURL.phoneNo,
                            PassportExpiry: convertDateFormat(item.PassportExpiry),
                        };
                    }),
                };
                dispatch(bookActionGDSReturn(payloadGDS));
            }
        }
        else {
            swalModal('flight', "Insufficeint balance!! Please Recharge your Wallet", true)

        }

    }

    const getTicketForNonLCC = () => {
        console.log(reducerState?.flightBook?.flightBookDataGDS?.TraceId, "reducerState?.flightBook?.flightBookDataGDS?.Response?.TraceId")
        const payLoadInternational = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: reducerState?.flightBook?.flightBookDataGDS?.TraceId,
            PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
            BookingId:
                reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,

        };

        dispatch(bookTicketGDS(payLoadInternational));

    };
    const getTicketForNonLCCReturn = () => {

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
                    PassportExpiry: convertDateFormat(item.PassportExpiry),
                };
            }),
        };

        dispatch(bookTicketGDSReturn(payLoadInternational));

    };

    const getTicketForLCC = () => {
        const payloadLcc = {
            ResultIndex: ResultIndexReturn,
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
                    PassportExpiry: convertDateFormat(item.PassportExpiry),
                };
            }),
        };
        dispatch(bookAction(payloadLcc));
    };
    console?.log(reducerState?.return?.returnData?.data?.data?.Response?.TraceId, "TraceID")
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
                    Number(fareValue?.Fare?.BaseFare) + Number(
                        fareValue?.Fare?.Tax) +
                    Number(fareValue?.Fare?.OtherCharges) +
                    Number(markUpamount),
                bookingType: "Flight booking"
            };

            dispatch(balanceSubtractRequest(balancePayload));
        }
    };

    const balanceSubtractReturn = () => {
        if (userId) {
            const balancePayload = {
                _id: userId,
                amount:
                    Number(fareValueReturn?.Fare?.BaseFare) +
                    Number(fareValueReturn?.Fare?.Tax) +
                    Number(fareValueReturn?.Fare?.OtherCharges) +
                    Number(markUpamount),
                // amount: 1,
                bookingType: "Flight booking"
            };

            dispatch(balanceSubtractRequest(balancePayload));
        }
    };

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
                        <div className="singleDataReturnBox" style={{ backgroundColor: "rgba(231, 60, 52, 0.15)" }}>
                            <div className="returnBoxOne">
                                <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightDeparture?.Airline?.AirlineCode}.png`} alt="flightImg" /> </div>
                                <span>{FlightDeparture?.[0]?.Origin?.Airport?.CityName}</span>
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
                                <div className="boxThreeDirect">{1 < FlightDeparture?.length ? `${FlightDeparture?.length} stop via ${FlightDeparture?.[0]?.Destination?.Airport?.CityName}` : "Direct"}</div>
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
                                <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${FlightReturn?.[0]?.Airline?.AirlineCode}.png`} alt="flightImg" /> </div>
                                <span>{FlightReturn?.[0]?.Airline?.AirlineName}</span>
                                <p>{FlightReturn?.[0]?.Airline?.AirlineCode}{" "}{FlightReturn?.[0]?.Airline?.FlightNumber}</p>
                            </div>
                            <div className="returnBoxTwo">
                                <span>{FlightReturn?.[0]?.Origin?.Airport?.CityName}</span>
                                <p>{dayjs(FlightReturn?.[0]?.Origin?.DepTime).format("DD MMM, YY")}</p>
                                <p>{dayjs(FlightReturn?.[0]?.Origin?.DepTime).format("h:mm A")}</p>
                            </div>
                            <div className="returnBoxThree">
                                <h4>{`${layoverHours} hr ${layoverMinutes} min `}</h4>
                                <div><img src={flightdir} /></div>
                                <div className="boxThreeDirect">{1 < FlightReturn?.length ? `${flightReturn?.length} stop via ${FlightReturn?.[0]?.Destination?.Airport?.CityName}` : "Direct"}</div>
                            </div>
                            <div className="returnBoxFour">
                                <span>{result?.Segments[1][result?.Segments[1]?.length - 1]?.Destination?.Airport?.CityName}</span>
                                <p>{dayjs(result?.Segments[1][result?.Segments[1]?.length - 1]?.Destination?.ArrTime).format("DD MMM, YY")}</p>
                                <p>{dayjs(result?.Segments[1][result?.Segments[1]?.length - 1]?.Destination?.ArrTime).format("h:mm A")}</p>
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
                    onSubmit={handleSubmitINC}
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
