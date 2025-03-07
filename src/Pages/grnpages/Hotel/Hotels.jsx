import React, { useEffect } from "react";
import Hotelstepper from "./hotelstepper/Hotelstepper";
//import { clearHotelReducerGrn } from "../../Redux/Hotel/hotel";
import { useDispatch } from "react-redux";
import { clearHotelReducerGrn } from "../../../Redux/HotelGrn/hotel";
import {useSelector } from "react-redux";
const Hotels = () => {
  const reducerState = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearHotelReducerGrn());
  }, []);
  return (
    <React.Fragment>
      <Hotelstepper />
    </React.Fragment>
  );
};

export default Hotels;
