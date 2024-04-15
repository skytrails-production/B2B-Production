import React, { useEffect } from "react";
import Hotelstepper from "./hotelstepper/Hotelstepper";
//import { clearHotelReducer } from "../../Redux/Hotel/hotel";
import { useDispatch } from "react-redux";

const Hotels = () => {

  return (
    <React.Fragment>
      <Hotelstepper />
    </React.Fragment>
  );
};

export default Hotels;
