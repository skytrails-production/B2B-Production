import React, { useEffect } from "react";

import Sailsummary from "./Sailsummary";
import { useDispatch, useSelector, useReducer } from "react-redux";
import Hoteldescription from "./Hoteldescription";

import Swal from "sweetalert2";

import { getUserDataAction } from "../../../../Redux/Auth/UserDataById/actionUserData";

import "./guestdetail.css";

const GuestdetailGrm = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #89CFF0",
    boxShadow: 24,
    borderRadius: 8,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.Error?.ErrorCode == 0
    ) {
      setTimeout(() => {
        if (userId) {
          const payload = userId;
          dispatch(getUserDataAction(payload));
        }
        // navigate("/")
      }, 2000);
    }
  }, [
    reducerState?.hotelSearchResult?.hotelDetails?.data?.data
      ?.GetBookingDetailResult,
  ]);

  return (
    <div className="container-fluid margin-pecentage">
      <div className="row">
        <div className="col-lg-9">
          <Hoteldescription />
        </div>
        <div className="col-lg-3">
          <Sailsummary />
        </div>
      </div>
    </div>
  );
};

export default GuestdetailGrm;
