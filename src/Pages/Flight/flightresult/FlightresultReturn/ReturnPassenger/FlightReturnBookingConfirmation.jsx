import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "../../../flightbookingconfirmation/flightbookingconfirmation.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {  useNavigate } from "react-router-dom";
import Rightdetail from "./Rightdetail"
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction } from "../../../../../Redux/Auth/UserDataById/actionUserData";
import userApi from "../../../../../Redux/API/api";
import FlightReturnConfirmationDetails from "./FlightReturnConfirmationDetails";
import OneWay from "../../../FlightForm/OneWay";





const FlightReturnBookingConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    // console.log("reducerState", reducerState);
    const TicketDetails =
        reducerState?.flightBook?.flightBookDataGDS?.Response ||
        reducerState?.flightBook?.flightBookData?.Response;
    const userId = reducerState?.logIn?.loginData?.data?.data?.id;
    const [alert, setAlert] = useState(true);
     const PassengersSaved = reducerState?.passengers?.passengersData;
     const markUpamount =
       reducerState?.userData?.userData?.data?.data?.markup?.flight;
    const oneWayCheck = reducerState?.flightFare?.flightQuoteData?.Results;
    const returnCheck = reducerState?.flightFare?.flightQuoteDataReturn?.Results;
    const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
    const bookingDataNonLcc =
        reducerState?.flightBook?.flightBookDataGDS?.Response;
    const bookingDataLccReturn =
        reducerState?.flightBook?.flightBookDataReturn?.Response;
    const bookingDataNonLccReturn =
        reducerState?.flightBook?.flightBookDataGDSReturn?.Response;
   const addBookingDetailsReturn = () => {
     if (bookingDataLccReturn) {
       // console.log("lccCheck");
       const payloadLCC = {
         userId: reducerState?.logIn?.loginData?.data?.data?.id,
         bookingId: `${bookingDataLccReturn?.BookingId}`,
         oneWay: false,
         pnr: bookingDataLccReturn?.PNR,
         origin: bookingDataLccReturn?.FlightItinerary?.Origin,
         destination: bookingDataLccReturn?.FlightItinerary?.Destination,
         paymentStatus: "success",
         totalAmount:
           bookingDataLccReturn?.FlightItinerary?.Fare?.PublishedFare?.toFixed() + markUpamount,
         airlineDetails: bookingDataLccReturn?.FlightItinerary?.Segments.map(
           (item, index) => {
             return {
               Airline: {
                 AirlineCode: item.Airline.AirlineCode,
                 AirlineName: item.Airline.AirlineName,
                 FlightNumber: item.Airline.FlightNumber,
                 FareClass: item.Airline.FareClass,
               },
               Origin: {
                 AirportCode: item.Origin.Airport.AirportCode,
                 AirportName: item.Origin.Airport.AirportName,
                 CityName: item.Origin.Airport.CityName,
                 Terminal: item.Origin.Airport.Terminal,
                 DepTime: item.Origin.DepTime,
               },
               Destination: {
                 AirportCode: item.Destination.Airport.AirportCode,
                 AirportName: item.Destination.Airport.AirportName,
                 CityName: item.Destination.Airport.CityName,
                 Terminal: item.Destination.Airport.Terminal,
                 ArrTime: item.Destination.ArrTime,
               },
               Baggage: item.Baggage,
             };
           }
         ),
         passengerDetails:
           bookingDataLccReturn?.FlightItinerary?.Passenger?.map(
             (item, index) => {
               return {
                 title: item?.Title,
                 firstName: item?.FirstName,
                 lastName: item?.LastName,
                 gender: item?.Gender,
                 ContactNo:
                   PassengersSaved[index]?.ContactNo == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 DateOfBirth: item?.DateOfBirth,
                 email:
                   PassengersSaved[index]?.Email == undefined
                     ? ""
                     : PassengersSaved[index]?.Email,
                 addressLine1: item?.addressLine1,
                 city: item?.City,
                 TicketNumber: item?.Ticket?.TicketNumber,
                 amount: item?.Fare?.PublishedFare?.toFixed(),
               };
             }
           ),
       };
       userApi.flightBookingDataSave(payloadLCC);
     } else {
       // console.log("nonlccCheck");
       const payloadNonLcc = {
         userId: reducerState?.logIn?.loginData?.data?.data?.id,
         bookingId: `${bookingDataNonLccReturn?.BookingId}`,
         oneWay: true,
         pnr: bookingDataNonLccReturn?.PNR,
         origin: bookingDataNonLccReturn?.FlightItinerary?.Origin,
         destination: bookingDataNonLccReturn?.FlightItinerary?.Destination,
         paymentStatus: "success",
         totalAmount:
           bookingDataNonLccReturn?.FlightItinerary?.Fare?.PublishedFare?.toFixed() +
           markUpamount,
         airlineDetails: bookingDataNonLccReturn?.FlightItinerary?.Segments.map(
           (item, index) => {
             return {
               Airline: {
                 AirlineCode: item.Airline.AirlineCode,
                 AirlineName: item.Airline.AirlineName,
                 FlightNumber: item.Airline.FlightNumber,
                 FareClass: item.Airline.FareClass,
               },
               Origin: {
                 AirportCode: item.Origin.Airport.AirportCode,
                 AirportName: item.Origin.Airport.AirportName,
                 CityName: item.Origin.Airport.CityName,
                 Terminal: item.Origin.Airport.Terminal,
                 DepTime: item.Origin.DepTime,
               },
               Destination: {
                 AirportCode: item.Destination.Airport.AirportCode,
                 AirportName: item.Destination.Airport.AirportName,
                 CityName: item.Destination.Airport.CityName,
                 Terminal: item.Destination.Airport.Terminal,
                 ArrTime: item.Destination.ArrTime,
               },
               Baggage: item.Baggage,
             };
           }
         ),
         passengerDetails:
           bookingDataNonLccReturn?.FlightItinerary?.Passenger?.map(
             (item, index) => {
               return {
                 title: item?.Title,
                 firstName: item?.FirstName,
                 lastName: item?.LastName,
                 gender: item?.Gender,
                 ContactNo:
                   PassengersSaved[index]?.ContactNo == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 DateOfBirth: item?.DateOfBirth,
                 email:
                   PassengersSaved[index]?.Email == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 addressLine1: item?.addressLine1,
                 city: item?.City,
                 TicketNumber: item?.Ticket?.TicketNumber,
                 amount: item?.Fare?.PublishedFare?.toFixed(),
               };
             }
           ),
       };
       userApi.flightBookingDataSave(payloadNonLcc);
     }
   };

     const addBookingDetails = () => {
       if (bookingDataLcc) {
         // console.log("lccCheck");
         const payloadLCC = {
           userId: reducerState?.logIn?.loginData?.data?.data?.id,
           bookingId: `${bookingDataLcc?.BookingId}`,
           oneWay: true,
           pnr: bookingDataLcc?.PNR,
           origin: bookingDataLcc?.FlightItinerary?.Origin,
           destination: bookingDataLcc?.FlightItinerary?.Destination,
           paymentStatus: "success",
           totalAmount:
             bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare?.toFixed() + markUpamount,
           airlineDetails: bookingDataLcc?.FlightItinerary?.Segments.map(
             (item, index) => {
               return {
                 Airline: {
                   AirlineCode: item.Airline.AirlineCode,
                   AirlineName: item.Airline.AirlineName,
                   FlightNumber: item.Airline.FlightNumber,
                   FareClass: item.Airline.FareClass,
                 },
                 Origin: {
                   AirportCode: item.Origin.Airport.AirportCode,
                   AirportName: item.Origin.Airport.AirportName,
                   CityName: item.Origin.Airport.CityName,
                   Terminal: item.Origin.Airport.Terminal,
                   DepTime: item.Origin.DepTime,
                 },
                 Destination: {
                   AirportCode: item.Destination.Airport.AirportCode,
                   AirportName: item.Destination.Airport.AirportName,
                   CityName: item.Destination.Airport.CityName,
                   Terminal: item.Destination.Airport.Terminal,
                   ArrTime: item.Destination.ArrTime,
                 },
                 Baggage: item.Baggage,
               };
             }
           ),
           passengerDetails: bookingDataLcc?.FlightItinerary?.Passenger?.map(
             (item, index) => {
               return {
                 title: item?.Title,
                 firstName: item?.FirstName,
                 lastName: item?.LastName,
                 gender: item?.Gender,
                 ContactNo:
                   PassengersSaved[index]?.ContactNo == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 DateOfBirth: item?.DateOfBirth,
                 email:
                   PassengersSaved[index]?.Email == undefined
                     ? ""
                     : PassengersSaved[index]?.Email,
                 addressLine1: item?.addressLine1,
                 city: item?.City,
                 TicketNumber: item?.Ticket?.TicketNumber,
                 amount: item?.Fare?.PublishedFare?.toFixed(),
               };
             }
           ),
         };
         userApi.flightBookingDataSave(payloadLCC);
       } else {
         // console.log("nonlccCheck");
         const payloadNonLcc = {
           userId: reducerState?.logIn?.loginData?.data?.data?.id,
           bookingId: `${bookingDataNonLcc?.BookingId}`,
           oneWay: true,
           pnr: bookingDataNonLcc?.PNR,
           origin: bookingDataNonLcc?.FlightItinerary?.Origin,
           destination: bookingDataNonLcc?.FlightItinerary?.Destination,
           paymentStatus: "success",
           totalAmount:
             bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare?.toFixed() + markUpamount,
           airlineDetails: bookingDataNonLcc?.FlightItinerary?.Segments.map(
             (item, index) => {
               return {
                 Airline: {
                   AirlineCode: item.Airline.AirlineCode,
                   AirlineName: item.Airline.AirlineName,
                   FlightNumber: item.Airline.FlightNumber,
                   FareClass: item.Airline.FareClass,
                 },
                 Origin: {
                   AirportCode: item.Origin.Airport.AirportCode,
                   AirportName: item.Origin.Airport.AirportName,
                   CityName: item.Origin.Airport.CityName,
                   Terminal: item.Origin.Airport.Terminal,
                   DepTime: item.Origin.DepTime,
                 },
                 Destination: {
                   AirportCode: item.Destination.Airport.AirportCode,
                   AirportName: item.Destination.Airport.AirportName,
                   CityName: item.Destination.Airport.CityName,
                   Terminal: item.Destination.Airport.Terminal,
                   ArrTime: item.Destination.ArrTime,
                 },
                 Baggage: item.Baggage,
               };
             }
           ),
           passengerDetails: bookingDataNonLcc?.FlightItinerary?.Passenger?.map(
             (item, index) => {
               return {
                 title: item?.Title,
                 firstName: item?.FirstName,
                 lastName: item?.LastName,
                 gender: item?.Gender,
                 ContactNo:
                   PassengersSaved[index]?.ContactNo == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 DateOfBirth: item?.DateOfBirth,
                 email:
                   PassengersSaved[index]?.Email == undefined
                     ? ""
                     : PassengersSaved[index]?.ContactNo,
                 addressLine1: item?.addressLine1,
                 city: item?.City,
                 TicketNumber: item?.Ticket?.TicketNumber,
                 amount: item?.Fare?.PublishedFare?.toFixed(),
               };
             }
           ),
         };
         userApi.flightBookingDataSave(payloadNonLcc);
       }
     };
    const debouncedAddBookingDetails = debounce(addBookingDetails, 500);
    const debouncedAddBookingDetailsReturn = debounce(addBookingDetailsReturn, 60000);
    useEffect(() => {
        updateBalance();
        debouncedAddBookingDetails();
        debouncedAddBookingDetailsReturn()
    }, []);


    const updateBalance = () => {
        if (userId) {
            const payload = userId;
            dispatch(getUserDataAction(payload));
        }
    };

    return (
        <div className="container-fluid margin-pecentage">

            <div className="row">
                <div className="col-lg-9">
                    <FlightReturnConfirmationDetails ticket={TicketDetails} />
                </div>
                <div className="col-lg-3">
                    <Rightdetail />
                </div>
            </div>
        </div>
    );
}; 

export default FlightReturnBookingConfirmation





// const FlightReviewbooking = () => {
    

// export default FlightReviewbooking;

