import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./flightbookingconfirmation.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Rightdetail from "../passengerdetail/Rightdetail";
import Flightconfirmationdetail from "./Flightconfirmationdetail";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import userApi from "../../../Redux/API/api";
import Swal from "sweetalert2";
import {swalModal} from "../../../utils/swal"
import FlightLoader from "../FlightLoader/FlightLoader";
const FlightReviewbooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const PassengersSaved = reducerState?.passengers?.passengersData;
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;
  const dummyPnrCheck = JSON.parse(
    sessionStorage.getItem("6989_n578j_j848433")
  );
  // console.log("reducerState", reducerState);
  const TicketDetails =
    reducerState?.flightBook?.flightBookDataGDS?.Response ||
    reducerState?.flightBook?.flightBookData?.Response;
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [alert, setAlert] = useState(true);
  const oneWayCheck = reducerState?.flightFare?.flightQuoteData?.Results;
  const returnCheck = reducerState?.flightFare?.flightQuoteDataReturn?.Results;
  const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
  const bookingDataNonLcc =
    reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
      ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;
  const bookingDataLccReturn =
    reducerState?.flightBook?.flightBookDataReturn?.Response;
  const bookingDataNonLccReturn =
    reducerState?.flightBook?.flightBookDataGDSReturn?.data?.data?.Response
      ?.Response;
  console.log(bookingDataNonLcc,bookingDataLcc, "bookingDataNonLcc");
  const addBookingDetailsReturn = () => {
    if (bookingDataLccReturn) {
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
      console.log("nonlccCheck",bookingDataNonLcc);
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

  const addBookingDetails = () => {
    if (bookingDataLcc) {
      console.log("lccCheck",bookingDataLcc);
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
        ticketType: dummyPnrCheck ? "Dummy Ticket" : "Original Ticket",
        totalAmount:
          bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare +
          markUpamount,
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
                  : PassengersSaved[index]?.Email,
              addressLine1: item?.addressLine1,
              city: item?.City,
              TicketNumber: dummyPnrCheck
                ? ""
                : item?.Ticket?.TicketNumber || "",
              amount: item?.Fare?.PublishedFare?.toFixed(),
            };
          }
        ),
      };
      userApi.flightBookingDataSave(payloadNonLcc);
    }
  };
  const debouncedAddBookingDetails = debounce(addBookingDetails, 500);
  const debouncedAddBookingDetailsReturn = debounce(
    addBookingDetailsReturn,
    1000
  );
  useEffect(() => {
    updateBalance();
    debouncedAddBookingDetails();
    if (returnCheck) debouncedAddBookingDetailsReturn();
  }, []);

  const updateBalance = () => {
    if (userId) {
      const payload = userId;
      dispatch(getUserDataAction(payload));
    }
  };
  console.warn(TicketDetails, "ticlit Detaild0000000000000000000000000");

  if (TicketDetails == undefined) {
    navigate("/flights");
    swalModal("flight",'Encountered an error',false)
    // Swal.fire({
    //   title: "Hii Encountered an error",
    //   text: "Redirecting to home page...",
    //   // text:TicketDetails,
    //   icon: "question",
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
    return (
      <>
        <FlightLoader />
      </>
    );
  }

  return (
    <div className="container-fluid margin-pecentage">
      <div className="row">
        <div className="col-lg-9">
          <Flightconfirmationdetail ticket={TicketDetails} />
        </div>
        <div className="col-lg-3">
          <Rightdetail />
        </div>
      </div>
    </div>
  );
};

export default FlightReviewbooking;
