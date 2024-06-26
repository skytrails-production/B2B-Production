import React, { useEffect, useState } from "react";
import FlightLoader from "./FlightLoader/FlightLoader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StyledTabs from "./FlightFormContainer";
import { swalModal } from "../../utils/swal";
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
  const dispatch = useDispatch();

  // console.log("reducerState", reducerState);
  function AllFlightCLEAR_Function() {
    dispatch(ClearAllActionReturn());

    dispatch(flightReducerClear());

    dispatch(clearOneWayReducer());
    // await dispatch(clearOneWayEMTReducer())
    dispatch(clearPassengersReducer());
    sessionStorage.removeItem("infants");
    sessionStorage.removeItem("ResultIndex");
    sessionStorage.removeItem("childs");
    sessionStorage.removeItem("adults");
    sessionStorage.removeItem("flightDetailsONGo");
    sessionStorage.removeItem("flightDetailsIncome");

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
    // navigate("/flights")
    AllFlightCLEAR_Function();
    // console.warn("reducerState::::::::::::::::::::::::::::::::: Clear ALll Actionn", reducerState)
  }, []);
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

    const oneWayResults = reducerState?.oneWay?.oneWayData?.data?.result;
    const returnResults =  reducerState?.return?.returnData?.data?.data?.Response?.Results;
    // console.log(reducerState?.oneWay?.oneWayData, "onewayresult");

    // if (oneWayResults) {
    //   navigate("/Flightresult");
    // }
    if (reducerState?.oneWay?.oneWayData?.status === 200) {
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
    reducerState?.oneWay?.oneWayData?.data?.result,
    reducerState?.return?.returnData?.data?.data?.Response?.Results,
  ]);

  useEffect(() => {
    // console.log(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode, reducerState, "reducerState?.oneWay?.oneWayData?.data?.data?.Response")
    if (
      reducerState?.oneWay?.oneWayData?.data?.result?.Response?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.oneWay?.oneWayData?.data?.responseMessage !== undefined
    ) {
      setLoader(false);
      // swalModal(
      //   "flight",
      //   reducerState?.oneWay?.oneWayData?.data?.responseMessage,
      //   false
      // );
      return;
    } else if (
      reducerState?.return?.returnData?.data?.data?.Response?.Error
        ?.ErrorCode !== undefined &&
      reducerState?.return?.returnData?.data?.data?.Response?.Error
        ?.ErrorCode !== 0
    ) {



      swalModal(
        "flight",
        reducerState?.oneWay?.oneWayData?.data?.responseMessage
          ,
        false
      );
      swalModal(
          "flight",
          reducerState?.oneWay?.oneWayData?.data?.responseMessage,
          false
        );
      navigate("/");
      return;
    }
  },  [reducerState?.oneWay?.oneWayData?.data?.result,reducerState?.oneWay?.oneWayData?.data?.result]);

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
