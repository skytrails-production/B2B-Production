import React, { useState, useEffect } from "react";

// import Popularfilter from '../flightresult/Popularfilter';
import Sailsummary from "../guestdetail/Sailsummary";
import Reviewdescription from "./Reviewdescription";
import "./review.css";
import { useSelector } from "react-redux";
import HotelLoading from "../hotelLoading/HotelLoading";
import { Navigate, useNavigate } from "react-router-dom";




const ReviewbookingGrn = () => {
  // const [loader, setLoader] = useState(true);
  const navigate  = useNavigate();
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  

  useEffect(()=>{
    if(reducerState?.hotelSearchResultGRN?.hotelRoom?.errors?.length>0){
      navigate("/hotels")
    }

  }, [reducerState?.hotelSearchResultGRN?.hotelRoom])

  

  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  return (
    <React.Fragment>

      {/* {loader ? (
        <HotelLoading />
      ) : ( */}
        <div className="container-fluid margin-pecentage">
          <div className="row gy-4">
            <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2">
              <Reviewdescription />
            </div>
            <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1">
              <Sailsummary />
            </div>
          </div>
        </div>
      {/* )} */}
    </React.Fragment>
  );
};

export default ReviewbookingGrn;
