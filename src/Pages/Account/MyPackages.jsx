import React, { useState } from "react";

import "./FlightTicket.css";



const MyPackages = () => {
  const [allPackages, setAllPackages] = useState(true);
  const [approvedPackages, setApprovedPackages] = useState(false);
  const [rejectPackages, setRejectPackages] = useState(false);
  const handleFlightButtonClick = () => {
    setAllPackages(true);
    setApprovedPackages(false);
    setRejectPackages(false);
  };

  const handleHotelButtonClick = () => {
    setAllPackages(false);
    setApprovedPackages(true);
    setRejectPackages(false);
  };

  const handleBusButtonClick = () => {
    setAllPackages(false);
    setApprovedPackages(false);
    setRejectPackages(true);
  };
 

 

  return (
    <div className="container">
      <div className="buttonBox">
        <button onClick={handleFlightButtonClick}>All Packages</button>
        <button onClick={handleHotelButtonClick}>Approved Packages</button>
        <button onClick={handleBusButtonClick}>Reject Packages</button>
       
      </div>
      {allPackages && <h1>All Packages</h1>}
      {approvedPackages && <h1>Approved Packages</h1>}
      {rejectPackages && <h1>Reject Packges</h1>}
    </div>
  );
};

export default MyPackages;
