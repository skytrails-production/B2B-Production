import React, { useEffect, useState } from "react";
// import "./flightreviewbooking.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Rightdetail from "../ReturnPassenger/RightdetailINC";
import { useDispatch, useSelector } from "react-redux";

// import FlightLoader from "../FlightLoader/FlightLoader";

import FlightReturnBookingDetails from "./FlightReturnBookingDetailsINC"
import FlightLoader from "../../../FlightLoader/FlightLoader";

const FlightReturnReviewbooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    const adults = sessionStorage.getItem("adults");
    const childs = sessionStorage.getItem("childs");
    const infants = sessionStorage.getItem("infants");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // console.log(
        //   "reducerState?.flightBook?.flightBookDataGDS",
        //   reducerState?.passengers?.passengersData
        // );
        if (reducerState?.passengers?.passengersData) {
            setLoading(false);
        }
    }, [reducerState]);

    if (loading) {
        <FlightLoader />
    }
    return (
        <div className="container-fluid margin-pecentage">

            <div className="row">
                <div className="col-lg-9">
                    <FlightReturnBookingDetails />
                </div>
                <div className="col-lg-3">
                    <Rightdetail />
                </div>
            </div>

        </div>
    );
};

export default FlightReturnReviewbooking;
