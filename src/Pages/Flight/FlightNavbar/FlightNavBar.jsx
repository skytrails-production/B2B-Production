import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FlightNavBar.css";
import { NavLink } from "react-router-dom";
import OneWay from "../FlightForm/OneWay";
const FlightNavBar = () => {
  return (
    <div className="flightFlex">
      <div className="col-xm-6 col-sm-3 alldiv">
        {/* One Way */}
        <NavLink to="/flights/oneway" className="linknav">
          {/* <OneWay/> */}
          One Way
        </NavLink>
      </div>

      <div className="col-xm-6 col-sm-3  alldiv">
        <NavLink to="/flights/return" className="linknav">
          Return
        </NavLink>
      </div>

      <div className="col-xm-6 col-sm-3  alldiv">
        <NavLink to="/flights/offShare" className="linknav">
          Off Share
        </NavLink>
      </div>

      <div className="col-xm-6 col-sm-3  alldiv">
        <NavLink to="/flights/multiStop" className="linknav">
          Multi Stop
        </NavLink>
      </div>

      <div className="col-xm-6 col-sm-3  alldiv">
        <NavLink to="/flights/calenderfare" className="linknav">
          Calendar Fare
        </NavLink>
      </div>

      <div className="col-xm-6 col-sm-3  alldiv">
        <NavLink to="/flights/advanceSearch" className="linknav">
          Advance Search
        </NavLink>
      </div>
    </div>
  );
};

export default FlightNavBar;
