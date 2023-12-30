import React, { useState } from "react";
import FlightChangeReq from "./FlightChangeReq";
import HotelChangeReq from "./HotelChangeReq";
import "./FlightTicket.css";
import BusChangeReq from "./BusChangeReq";
import HolidayChangeReq from "./HolidayChangeReq";
import { GiTreasureMap } from "react-icons/gi";
import FixDeparture from "./FixDeparture";

const FlightTicket = () => {
  const [showFlightChangeReq, setShowFlightChangeReq] = useState(true);
  const [showHotelChangeReq, setShowHotelChangeReq] = useState(false);
  const [showBusChangeReq, setShowBusChangeReq] = useState(false);
  const [showHolidayChangeReq, setShowHolidayChangeReq]=useState(false);
  const [showFixDeparture, setShowFixDeparture]=useState(false);

  const handleFlightButtonClick = () => {
    setShowFlightChangeReq(true);
    setShowHotelChangeReq(false);
    setShowBusChangeReq(false);
    setShowHolidayChangeReq(false);
    setShowFixDeparture(false);
  };

  const handleHotelButtonClick = () => {
    setShowFlightChangeReq(false);
    setShowHotelChangeReq(true);
    setShowBusChangeReq(false);
    setShowHolidayChangeReq(false);
    setShowFixDeparture(false);
  };

  const handleBusButtonClick = () => {
    setShowFlightChangeReq(false);
    setShowHotelChangeReq(false);
    setShowBusChangeReq(true);
    setShowHolidayChangeReq(false);
    setShowFixDeparture(false);
  };
  const handleHolidayButtonClick = () => {
    setShowFlightChangeReq(false);
    setShowHotelChangeReq(false);
    setShowBusChangeReq(false);
    setShowHolidayChangeReq(true);
    setShowFixDeparture(false);
  };
  const handleFixDepartureButtonClick = () =>{    
      setShowFlightChangeReq(false);
      setShowHotelChangeReq(false);
      setShowBusChangeReq(false);
      setShowHolidayChangeReq(false);
      setShowFixDeparture(true);
  }

  return (
    <div className="container">
      <div className="buttonBox">
        <button onClick={handleFlightButtonClick}>Flight</button>
        <button onClick={handleHotelButtonClick}>Hotel</button>
        <button onClick={handleBusButtonClick}>Bus</button>
        <button onClick={handleHolidayButtonClick}>Holiday</button>
        <button onClick={handleFixDepartureButtonClick}>FixDeparture</button>
      </div>
      {showFlightChangeReq && <FlightChangeReq />}
      {showHotelChangeReq && <HotelChangeReq />}
      {showBusChangeReq && <BusChangeReq />}
      {showHolidayChangeReq && <HolidayChangeReq />}
      {showFixDeparture && <FixDeparture /> }
    </div>
  );
};

export default FlightTicket;
