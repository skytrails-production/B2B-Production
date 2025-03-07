import React, { useRef, useState, useEffect } from "react";
// import QRCode from "qrcode.react";

import { useSelector } from "react-redux";
import {
  findAirlineByCode,
  ticketDetails,
  flightBookErrorCheck,
  saveDB,
  findSeatMealBaggagePrice,
} from "../../../utility/flightUtility/BookwarperUtility";
import { standardizeFlightFareResponse } from "../../../utility/flightUtility/standardizeFlightResponse";
import { useReactToPrint } from "react-to-print";
import { ChevronLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { returnReducer } from "../../../Redux/FlightSearch/Return/returnReducer";
import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { useDispatch } from "react-redux";
const NewBookTicket = () => {
   const [sub, setSub] = useState(false);
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch()
  console.log(reducerState, "reducerState");
  const [loader, setLoader] = useState(true);
  const book1 = flightBookErrorCheck("onward");
  const book2 = flightBookErrorCheck("return");
  const [hasSaved, setHasSaved] = useState(false);
  const adult = sessionStorage.getItem("adults");
  const child = sessionStorage.getItem("childs");
  const infant = sessionStorage.getItem("infants");
  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const dDate = reducerState?.searchFlight?.flightDetails?.date;
  const rDate = reducerState?.searchFlight?.flightDetails?.returnDate;
  const className = reducerState?.searchFlight?.flightDetails?.FlightCabinClass;
  
  console.log(book1, book2, dDate, rDate, "bookResult");
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [FlightFareOnward, setFlightFareOnward] = useState([]);
  const [FlightFareReturn, setFlightFareReturn] = useState([]);
  const ticketData = {
    pnr: "ABC123",
    flightNo: "6E-123",
    airline: "Indigo",
    departure: "Delhi (DEL) - 10:30 AM",
    arrival: "Mumbai (BOM) - 1:00 PM",
    duration: "2h 30m",
    boardingTime: "10:00 AM",
    gate: "A12",
    passengers: [
      {
        name: "Mohit Joshi",
        seat: "12A",
        class: "Economy",
      },
      {
        name: "John Doe",
        seat: "12B",
        class: "Economy",
      },
      {
        name: "Jane Smith",
        seat: "12C",
        class: "Economy",
      },
    ],
  };
  

  const navigate = useNavigate();
  const TicketCard = ({ type }) => {
    const ticket =
      // async () => {
      // return
      ticketDetails(type);
    // };
    console.log(ticket, "ticketOnway");
    let flightInfo = ticket?.flight;
    let {
      arrivalTime,
      departureTime,
      destination,
      flightName,
      flightNumber,
      layover,
      origin,
      terminal1,
    } = flightInfo;
    let flightNameCode = flightName + "-" + flightNumber;

    return (
      <>
        {/* Main Content */}
        <div className="flex flex-wrap">
          {/* Flight Details */}
          <div className="w-full p-6 sm:w-3/4">
            <h2 className="mb-2 text-2xl font-semibold text-indigo-800 capitalize md:mb-4">
              Flight Ticket {type}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4">
              <div>
                <p className="text-gray-700">
                  <strong>PNR:</strong> {ticket?.PNR || undefined}
                </p>
                <p className="text-gray-700">
                  <strong>Flight No:</strong>{" "}
                  {flightNameCode || ticketData.flightNo}
                </p>
                <p className="text-gray-700">
                  <strong>Airline:</strong>{" "}
                  {findAirlineByCode(flightName)?.airlineName}
                </p>
                <p className={ticket?.PNR ? "text-green-500" : "text-red-500"}>
                  <strong className="text-gray-700">Status:</strong>{" "}
                  {ticket?.PNR ? "Confirmed" : "Failed"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Departure:</strong>{" "}
                  {`${origin} (${origin}) - ${departureTime} ` || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Arrival:</strong>{" "}
                  {`${destination} (${destination}) - ${arrivalTime} ` || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {layover || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {type == "onward" ? dDate : rDate}
                </p>
              </div>
            </div>

            {/* Passenger List */}
            <div className="mt-2 md:mt-6">
              {ticket?.passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="py-2 border-b border-gray-200 md:py-4"
                >
                  <p className="text-gray-700">
                    <strong>Passenger Name:</strong>{" "}
                    {passenger?.firstName + " " + passenger?.lastName}
                  </p>
                  {/* <p className="text-gray-700">
                    <strong>Seat:</strong> {passenger.seat}
                  </p> */}
                  <p className="text-gray-700">
                    <strong>Class:</strong> {passenger?.class || className}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Boarding Pass and QR Code */}
          <div className="w-full p-2 border-t border-gray-200 sm:w-1/4 bg-indigo-50 md:p-6 md:border-t-0 md:border-l">
            <div className="text-center">
              <p className="text-lg font-semibold text-indigo-800">
                Boarding Pass
              </p>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">PNR:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {ticket?.PNR || undefined}
                </p>
              </div>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">Boarding Time:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {ticket?.boardingTime || ""}
                </p>
              </div>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">Gate:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {`Terminal ${terminal1}` || ticketData?.gate}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-center mt-6">
              <QRCodeSVG
                fgColor="#3730A3"
                bgColor="#EEF2FF"
                value={qrValue}
                size={100}
              />
            </div> */}
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col items-center p-2 bg-indigo-100 border-t border-indigo-200 md:p-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-700">
            <p>
              <strong>Boarding Time:</strong> {ticket?.boardingTime || ""}
            </p>
            <p>
              <strong>Gate:</strong>{" "}
              {`Terminal ${terminal1}` || ticketData.gate}
            </p>
          </div>
        </div>
      </>
    );
  };
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setLoading(false), // Hide loader after printing
  });

  const handleDownload = () => {
    setLoading(true);
    handlePrint();
  };
    useEffect(() => {
      if (Onward) {
        const onwardData = standardizeFlightFareResponse(
          Onward,
          adult,
          child,
          infant
        ); // Get standardized data
        setFlightFareOnward(onwardData); // Update state with data
      }
      if (Return) {
        const returnData = standardizeFlightFareResponse(
          Return,
          adult,
          child,
          infant
        ); // Get standardized data
  
        setFlightFareReturn(returnData); // Update state with data
      }
    }, []);
    const totalOnward =
    FlightFareOnward?.Adt?.Total +
    FlightFareOnward?.Chd?.Total +
    FlightFareOnward?.Inf?.Total;

  const totalReturn =
    FlightFareReturn?.Adt?.Total +
    FlightFareReturn?.Chd?.Total +
    FlightFareReturn?.Inf?.Total;

    
  const FlightPaymentLoader = ({
    message = "We’re booking your flight...",
  }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
        {/* Dots Animation */}
        <div className="flex mb-6 space-x-4">
          <div className="w-6 h-6 delay-100 bg-white rounded-full animate-bounce"></div>
          <div className="w-6 h-6 delay-200 bg-white rounded-full animate-bounce"></div>
          <div className="w-6 h-6 delay-300 bg-white rounded-full animate-bounce"></div>
        </div>

        {/* Text */}
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Booking Your Flight...
        </h1>
        <p className="mt-2 text-gray-100">
          Please wait while we process your booking.
        </p>
      </div>
    );
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrint]);
  const markUP =
      reducerState?.markup?.markUpData?.data?.result?.[0]?.flightMarkup;
    // console.log(markUP, "markUp");
  
    const seatbaggagePrice = findSeatMealBaggagePrice();
    const combinedAddOnPrice =
      (seatbaggagePrice?.seatPrice > 0 ? seatbaggagePrice?.seatPrice : 0) +
      (seatbaggagePrice?.mealPrice > 0 ? seatbaggagePrice?.mealPrice : 0) +
      (seatbaggagePrice?.baggagePrice > 0 ? seatbaggagePrice?.baggagePrice : 0);
  
  const balanceSubtract = (price) => {
    if (userId) {
      const balancePayload = {
        _id: userId,
        amount:
          Number(price) ,
        bookingType: "Flight booking",
      };

      dispatch(balanceSubtractRequest(balancePayload));
    }
  };
  useEffect(() => {
    if (!Return && !book1?.loading && !hasSaved) {



      
      saveDB("onward");
      const grandTotal = Number(totalOnward + (Return ? totalReturn : 0));
      const newGrandTotal = (grandTotal + grandTotal * markUP)?.toFixed();
      // console.log(grandTotal, "grand total");
      let lastFinalPrice = (
        Number(newGrandTotal) + Number(combinedAddOnPrice)
      )?.toFixed();
      
   
      if(ticketDetails("onward")?.PNR){
        console.log("onward call");
        balanceSubtract(lastFinalPrice)
      }
      setHasSaved(true);
      
    } else if (!book1?.loading && !book2?.loading && !hasSaved) {
     
      saveDB("onward");
      saveDB("return");
      if(ticketDetails("onward")?.PNR){
        const grandTotal = Number(totalOnward + (Return ? totalReturn : 0));
      const newGrandTotal = (grandTotal + grandTotal * markUP)?.toFixed();
      // console.log(grandTotal, "grand total");
      let lastFinalPrice = (
        Number(newGrandTotal) + Number(combinedAddOnPrice)
      )?.toFixed();
        balanceSubtract(lastFinalPrice)
      }
      if(ticketDetails("return")?.PNR){
        const grandTotal = Number(( totalReturn ));
      const newGrandTotal = (grandTotal + grandTotal * markUP)?.toFixed();
      // console.log(grandTotal, "grand total");
      let lastFinalPrice = (
        Number(newGrandTotal) + Number(combinedAddOnPrice)
      )?.toFixed();
        balanceSubtract(lastFinalPrice)
      }
      
      setHasSaved(true);
    }
  }, [book1, book2, hasSaved]);

  return (
    <>
      {book1?.loading || (Return ? book2?.loading : false) ? (
        <FlightPaymentLoader />
      ) : (
        <div className="min-h-screen p-2 bg-gray-100 md:p-6 ">
          <div className="flex items-center justify-between w-full max-w-4xl pt-3 mx-auto text-center rounded-b-lg">
            <p
              onClick={() => navigate("/")}
              className="flex items-center text-base font-semibold text-gray-700 cursor-pointer flec-row"
            >
              <ChevronLeft size={18} className="text-base text-gray-700" /> Back
              to Home
            </p>
            <p
              onClick={handlePrint}
              className="flex items-center gap-2 text-base font-semibold text-gray-700 cursor-pointer flec-row"
            >
              <Printer size={18} className="text-base text-gray-700" /> Download
              PDF
            </p>
          </div>
          <div className="flex items-center justify-center min-h-screen p-2 bg-gray-100 md:p-6">
            <div
              ref={componentRef}
              className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              {/* Header Section */}
              <div className="flex items-center justify-between p-6 text-white bg-indigo-600 border-b border-gray-200 rounded-t-md">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <h1 className="hidden text-2xl font-bold md:flex">
                    TheSkyTrails
                  </h1>
                </div>
                {/* <button
              onClick={handlePrint}
              className="px-4 py-2 font-semibold text-indigo-600 bg-white rounded-lg shadow-md hover:bg-indigo-100"
            >
              Print Ticket
            </button> */}
              </div>
              <div className="flex flex-col gap-2 bg-white">
                <TicketCard type="onward" />

                {Return && <TicketCard type="return" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBookTicket;
