import React, { useState, useEffect } from "react";
import Flightbookingdetailamd from "./Flightbookingdetailamd";
import Rightdetail from "../passengerdetail/Rightdetail";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Rightdetailamd from "../passengerdetail/Rightdetailamd";

function FlightReviewbookingamd() {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { amdata, airesellRes } = location.state || {};
  // console.log("amdata", amdata);
  useEffect(() => {
    // console.log(
    //   "reducerState?.flightBook?.flightBookDataGDS",
    //   reducerState?.passengers?.passengersData
    // );
    if (reducerState?.passengers?.passengersData) {
      setLoading(false);
    }
  }, [reducerState]);

  return (
    <>
      <div className="container-fluid margin-pecentage">
        <div className="row">
          <div className="col-lg-9">
            <Flightbookingdetailamd amdata={amdata} airesellRes={airesellRes}/>
          </div>
          <div className="col-lg-3">

          <Rightdetailamd amdata={amdata}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightReviewbookingamd;
