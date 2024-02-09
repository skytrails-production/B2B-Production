

import React, { useEffect } from "react";
import { InnerBarLogo } from "../data";
import { Link } from "react-router-dom";
import color from "../color/color";
import { useDispatch, useSelector } from "react-redux";
import "./maixBox.css"
import { motion } from "framer-motion";
import { ClearAllActionReturn } from "../Redux/FlightFareQuoteRule/actionFlightQuote";
import { flightReducerClear } from "../Redux/FlightBook/actionFlightBook";
import { clearOneWayReducer } from "../Redux/FlightSearch/OneWay/oneWay";
import { clearPassengersReducer } from "../Redux/Passengers/passenger";




const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};


function MainBox() {
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  function AllFlightCLEAR_Function() {
    dispatch(ClearAllActionReturn())

    dispatch(flightReducerClear())


    dispatch(clearOneWayReducer())
    // await dispatch(clearOneWayEMTReducer())
    dispatch(clearPassengersReducer())
    sessionStorage.removeItem("infants")
    sessionStorage.removeItem("ResultIndex")
    sessionStorage.removeItem("childs")
    sessionStorage.removeItem("adults")
    sessionStorage.removeItem("flightDetailsONGo")
    sessionStorage.removeItem("flightDetailsIncome")

    // sessionStorage.setItem("passengers")
    // sessionStorage.setItem("passengers", {
    //   passengersData: [],
    //   passengerDataReturn: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    // sessionStorage.getItem('oneWay')
    // sessionStorage.getItem('oneWay', {
    //   oneWayData: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    // sessionStorage.getItem('oneWayEMT')
    //   oneWayEMTData: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    // sessionStorage.getItem('flightBook')
    //   flightBookData: {},
    //   flightBookDataGDS: {},
    //   flightTicketDataGDS: {},
    //   flightBookDataReturn: {},
    //   flightBookDataGDSReturn: {},
    //   flightTicketDataGDSReturn: {},
    //   isLogin: false,
    //   isLoading: false,
    //   isError: false,
    // });
    // sessionStorage.getItem('flightFare')
    //   flightRuleData: {},
    //   flightQuoteData: {},
    //   flightRuleDataReturn: {},
    //   flightQuoteDataReturn: {},
    //   isLogin: false,
    //   isLoadingRuleDone: false,
    //   isLoadingQuoteDoneReturn: false,
    //   isLoadingRuleDoneReturn: false,
    //   isLoadingQuoteDone: false,
    //   isError: false
    // })

  }
  useEffect(() => {
    AllFlightCLEAR_Function()
  }, []);
  // console.log(reducerState, "jfglkdsja;edj");
  return (


    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="centeredBox"
    >
      <div className="centered-box-top">
        <p>Services We Provide</p>
      </div>
      {InnerBarLogo.map(({ avatar, name, path }, index) => (
        <Link to={path} key={index} style={{ textDecoration: "none" }}>
          <motion.div
            className={`centeredBox-content ${index === 0 || index === 1 || index === 3 || index === 4 ? 'border-right-dashed' : ''} ${index < 3 ? 'border-bottom' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}

              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.9
              }}
              className="centeredBox-avatar">{avatar}</motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}

              transition={{
                delay: 1,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.9
              }}
              className="centeredBox-name">{name}</motion.div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}

export default MainBox;
