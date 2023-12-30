import React, { useEffect, useState } from "react";
import FlightLoader from "./FlightLoader/FlightLoader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StyledTabs from "./FlightFormContainer";

import Swal from "sweetalert2";
import "./Flight.css";
import { ClearAllActionReturn } from "../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { flightReducerClear } from "../../Redux/FlightBook/actionFlightBook";
import { clearOneWayReducer } from "../../Redux/FlightSearch/OneWay/oneWay";
import { clearOneWayEMTReducer } from "../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
import { clearPassengersReducer } from "../../Redux/Passengers/passenger";

const Flight = () => {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()

  // console.log("reducerState", reducerState);
  async function AllFlightCLEAR_Function() {
    await dispatch(ClearAllActionReturn())
    await dispatch(flightReducerClear())


    await dispatch(clearOneWayReducer())
    // await dispatch(clearOneWayEMTReducer())
    await dispatch(clearPassengersReducer())
    sessionStorage.removeItem("infants")
    sessionStorage.removeItem("ResultIndex")
    sessionStorage.removeItem("childs")
    sessionStorage.removeItem("adults")
    sessionStorage.removeItem("flightDetailsONGo")
    sessionStorage.removeItem("flightDetailsIncome")

    sessionStorage.setItem("passengers")
    // sessionStorage.setItem("passengers", {
    //   passengersData: [],
    //   passengerDataReturn: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    sessionStorage.getItem('oneWay')
    // sessionStorage.getItem('oneWay', {
    //   oneWayData: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    sessionStorage.getItem('oneWayEMT')
    //   oneWayEMTData: [],

    //   isLoading: false,

    //   isError: false,

    //   showSuccessMessage: false,
    // })
    sessionStorage.getItem('flightBook')
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
    sessionStorage.getItem('flightFare')
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
    navigate("/flights")
    AllFlightCLEAR_Function()
    // console.warn("reducerState::::::::::::::::::::::::::::::::: Clear ALll Actionn", reducerState)
  }, [])
  useEffect(() => {
    if (
      reducerState?.oneWay?.isLoading ||
      reducerState?.return?.isLoading === true
    ) {
      setLoader(true);
    }
  }, [reducerState?.oneWay?.isLoading || reducerState?.return?.isLoading]);
  // useEffect(() => {
  //   if (reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results||reducerState?.return?.returnData?.data?.data?.Response?.Results) {
  //     navigate("/Flightresult");
  //     setLoader(false);
  //   }
  // }, [reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results||reducerState?.return?.returnData?.data?.data?.Response?.Results]);

  useEffect(() => {
    const oneWayResults =
      reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;
    const returnResults =
      reducerState?.return?.returnData?.data?.data?.Response?.Results;

    if (oneWayResults) {
      navigate("/Flightresult");
    } else if (returnResults) {
      // navigate("/FlightresultReturn");
      if (returnResults[1] !== undefined) {
        navigate("/FlightresultReturn");
      } else {
        navigate("/FlightResultInternational");
      }
    }

    if (oneWayResults || returnResults) {
      setLoader(false);
    }
  }, [
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results,
    reducerState?.return?.returnData?.data?.data?.Response?.Results,
  ]);
  const error =
    reducerState?.oneWay?.isError;
  useEffect(() => {

    if (error) {
      setLoader(false);
      Swal.fire({
        title: "Hii Encountered Error Flight",
        text: `${error}`,
        icon: "question",
        timer: 5000,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  }, [reducerState?.oneWay?.oneWayData?.data?.data?.Response]);

  if (loader) {
    return <FlightLoader />;
  }

  return (
    // <>
    //   {loader ? (
    //     <FlightLoader />
    //   ) : (
    //     <div>
    //       <Box
    //         display={"flex"}
    //         justifyContent={"center"}
    //         alignSelf={"center"}
    //         alignItems={"center"}
    //       >
    //         {/* <Flightnavbar/> */}

    //       </Box>
    //       <StyledTabs />
    //     </div>

    //   )}
    // </>
    // <>
    //   <FlightLoader />
    // </>

    <div className="container-xxl " id="margin-pecentage-large">
      <StyledTabs />
    </div>
  );
};

export default Flight;
