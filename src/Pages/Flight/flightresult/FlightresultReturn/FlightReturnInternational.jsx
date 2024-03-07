import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightresultOne from "./FlightresultOne";
import FlightReturn from "./FlightReturn";
import SingleDataReturn from "./SingleDataReturn";
import SingleDataReturnInternational from "./SingleDataReturnInternational";
import MultipleDataReturnInternational from "./MultipleDataReturnInternational";
import {
  quoteAction,
  ruleAction,
  setLoading,
} from "../../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import MultipleDataReturn from "./MultipleDataReturn";
import { swalModal } from "../../../../utils/swal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import FlightLoader from "../FlightLoader/FlightLoader";
import Divider from "@mui/material/Divider";
import filterImg from "../../../../Images/filter.png";

const FlightReturnInternational = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const accordionRef = useRef(null);
  const result =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  const [filter, setFilter] = useState(1);
  const [takeOff, SetTakeOffetFilter] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(["Price"]);
  const [expanded, setExpanded] = React.useState("panel1");
  // console.warn(result[0], "resultnvjdfnvjdfnv")
  let statusRule = reducerState?.flightFare?.isLoadingRuleDone || false;
  let statusQuote = reducerState?.flightFare?.isLoadingQuoteDone || false;
  const initialGoFlight = result ? result[0][0] : [];
  let initialReturnFlight = result ? result[0][1] : [];
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
  // console.warn(ongoFlight, "ongoFlight //////////////////")
  const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);
  const minPrice = result ? result[0][0]?.Fare?.PublishedFare : 0;
  const maxPrice = result
    ? result[0][result[0]?.length - 1].Fare.PublishedFare
    : 100000;
  const Published_Fare = result
    ? result[0][result[0].length - 1].Fare.PublishedFare
    : null;
  const [priceRange, setPriceRange] = useState(Published_Fare);
  const [takeOffIndex, setTakeOffIndex] = useState(-1);
  const [landIndex, setLandIndex] = useState(-1);
  const [startTakeOffIndex, setStartTakeOffIndex] = useState(-1);
  const [endTakeOffIndex, setEndTakeOffIndex] = useState(-1);
  const [airlinesIndex, setAirlinesIndex] = useState(-1);
  const Airlines = [];
  const Airliness = [];

  // , "statusQuote ", statusRule, "statusRule ")
  // console.log(reducerState, "reducer state")
  // console.warn(incomeGlight, "incomingFlight //////////////////")
  // console.warn(incomeGlight?.Segments[1], "incomingFlight segments //////////////////")
  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !==
        undefined &&
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0
    ) {
      // swalModal("flight", reducerState?.flightFare?.flightQuoteData?.Error?.
      //   ErrorMessage
      //   , false)
      swalModal(
        "flight",
        "Something went wrong with your flight booking. Please check your details and try again.",
        false
      );
      navigate("/");
    } else if (!result) {
      navigate("/flights");
    }
  });
  useEffect(() => {
    sessionStorage.setItem("flightDetailsONGo", JSON.stringify(ongoFlight));
    setOngoFlight(initialGoFlight);
    setIncomeFlight(initialReturnFlight);
  }, [initialGoFlight, initialReturnFlight]);
  useEffect(() => {
    if (statusQuote && statusRule) {
      navigate("/FlightresultReturn/Passengerdetail");
      dispatch(setLoading("data"));
    }
  }, [statusQuote, statusRule]);
  const receiveChildData = (data) => {
    // console.log("callbackData", data);
    const onnGoingFlight =
      JSON.parse(sessionStorage.getItem("flightDetailsONGo")) ||
      initialGoFlight;
    const incomingFlight =
      JSON.parse(sessionStorage.getItem("flightDetailsIncome")) ||
      initialReturnFlight;
    if (data) {
      setOngoFlight(onnGoingFlight);
      setIncomeFlight(incomingFlight);
    }
  };
  const handleFareRuleAndQuote = (item, i) => {
    // console.warn(item, "item?.ResultIndex", result)
    sessionStorage.setItem("flightDetailsONGo", JSON.stringify(result[0][i]));
    sessionStorage.setItem("flightDetailsIncome", JSON.stringify(result[0][i]));
    // sessionStorage.setItem("flightDetailsIncome", JSON.stringify(result[i][1]));

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      ResultIndex: `${item?.ResultIndex}`,
    };
    // console.log(payload);
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
    // console.log("reducerrrState", reducerState);
  };


  // useEffect(() => {
  //   const uniqueData = result
  //     ? result[0].filter((item, index, array) => {
  //         const isUnique = !array.slice(0, index).some((prevItem) => {
  //           console.log(
  //             prevItem.Segments[0]?.[0]?.Origin
  //               ?.DepTime,
  //             "hii",
  //             item.Segments[0][0]?.Origin?.DepTime,
  //             "hello"
  //           );
  //           return (
  //             prevItem.AirlineCode === item.AirlineCode &&
  //             prevItem.Segments[0]?.[prevItem.Segments[0].length - 1]?.Origin
  //               ?.DepTime === item.Segments[0][prevItem.Segments[0].length - 1]?.Origin?.DepTime
  //           );
  //         });
  //         return isUnique;
  //       })
  //     : [];
  //   // setFlightList(uniqueData);
  //   console.log("uniqueData", uniqueData, result[0]);
  // }, []);

  // result &&  result[0].map((item) => {
  //   console.log(item.Segments[0].length===1
  //     , "segment items")
  // })
  // console.log("ongoFlight", ongoFlight);
  // console.log("incomeGlight", incomeGlight);
  // console.log("reducerrrState", reducerState);
  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };
  const handleChange = () => () => {
    // setExpanded(newExpanded ? panel : false);
  };
  const clearFilter = () => {
    setSelectedCategory(["Price"]);
    setTakeOffIndex(-1);
    setLandIndex(-1);
    setAirlinesIndex(-1);
    // document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
    //   checkbox.checked = false;
    // });
  };
  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All") {
      setSelectedCategory(["Price"]);
      document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      // If other checkbox is selected, update selectedCategory as before
      setSelectedCategory((prevSelectedCategory) => {
        if (prevSelectedCategory.includes(selectedValue)) {
          return prevSelectedCategory.filter(
            (value) => value !== selectedValue
          );
        } else {
          return [...prevSelectedCategory, selectedValue];
        }
      });
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setExpanded(false);
      } else {
        setExpanded("panel1");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const filteredData = result
    ? result[0]?.filter((item) => {
        const segmentLength = item?.Segments[0].length;
        const segmentLengthStart = item?.Segments[0]?.length;
        const segmentLengthLand = item?.Segments[1]?.length;
        const depTime = new Date(item?.Segments?.[0][0]?.Origin?.DepTime);
        const depTimeStartTakeOff1 = new Date(
          item?.Segments?.[0][0]?.Origin?.DepTime
        );
        const arrTimeStartLand1 = new Date(
          item?.Segments?.[0][
            item?.Segments[0]?.length - 1
          ]?.Destination?.ArrTime
        );
        const depTimeEndTakeOff1 = new Date(
          item?.Segments?.[1][0]?.Origin?.DepTime
        );
        const arrTimeEndLand1 = new Date(
          item?.Segments?.[1][
            item?.Segments[1]?.length - 1
          ]?.Destination?.ArrTime
        );
        const hour = depTime.getHours();
        const hourStart = depTime.getHours();
        const hourLand = depTime.getHours();
        const depTimeStartTakeOff = depTimeStartTakeOff1?.getHours();
        const arrTimeStartLand = arrTimeStartLand1?.getHours();
        const depTimeEndTakeOff = depTimeEndTakeOff1?.getHours();
        const arrTimeEndLand = arrTimeEndLand1?.getHours();
        const airlineName = item?.Segments?.[0][0]?.Airline?.AirlineName;
        const airlineName1 = item?.Segments?.[1][0]?.Airline?.AirlineName;
        if (!Airlines.includes(airlineName)) {
          Airlines.push(airlineName);
          Airliness.push({
            AirlineName: airlineName,
            AirlineCode: item?.Segments?.[0][0]?.Airline?.AirlineCode,
          });
        }
        if (!Airlines.includes(airlineName1)) {
          Airlines.push(airlineName1);
          Airliness.push({
            AirlineName: airlineName,
            AirlineCode: item?.Segments?.[1][0]?.Airline?.AirlineCode,
          });
        }
        // console.log(depTimeEndTakeOff, "result ........................")
        const categoryFilters = selectedCategory.map((category) => {
          switch (category) {
            case "Price":
              return (
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "1":
              return (
                segmentLength === 1 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "2":
              return (
                segmentLength === 2 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "before6AM":
              return (
                hour < 6 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "6AMto12PM":
              return (
                hour >= 6 &&
                hour < 12 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "12PMto6PM":
              return (
                hour >= 12 &&
                hour < 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "after6PM":
              return (
                hour >= 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoffNon":
              return (
                segmentLengthStart === 1 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoffStop":
              return (
                segmentLengthStart === 2 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoffbefore6AM":
              return (
                depTimeStartTakeOff < 6 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoff6AMto12PM":
              return (
                depTimeStartTakeOff >= 6 &&
                depTimeStartTakeOff < 12 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoff12PMto6PM":
              return (
                depTimeStartTakeOff >= 12 &&
                depTimeStartTakeOff < 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startTakeoffafter6PM":
              return (
                depTimeStartTakeOff >= 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLandNon":
              return (
                segmentLengthLand === 1 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLandStop":
              return (
                segmentLengthLand === 2 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLandbefore6AM":
              return (
                arrTimeStartLand < 6 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLand6AMto12PM":
              return (
                arrTimeStartLand >= 6 &&
                arrTimeStartLand < 12 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLand12PMto6PM":
              return (
                arrTimeStartLand >= 12 &&
                arrTimeStartLand < 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "startLandafter6PM":
              return (
                arrTimeStartLand >= 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndTakeoffbefore6AM":
              return (
                depTimeEndTakeOff < 6 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndTakeoff6AMto12PM":
              return (
                depTimeEndTakeOff >= 6 &&
                depTimeEndTakeOff < 12 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndTakeoff12PMto6PM":
              return (
                depTimeEndTakeOff >= 12 &&
                depTimeEndTakeOff < 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndTakeoffafter6PM":
              return (
                depTimeEndTakeOff >= 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndLandbefore6AM":
              return (
                arrTimeEndLand < 6 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndLand6AMto12PM":
              return (
                arrTimeEndLand >= 6 &&
                arrTimeEndLand < 12 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndLand12PMto6PM":
              return (
                arrTimeEndLand >= 12 &&
                arrTimeEndLand < 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "EndLandafter6PM":
              return (
                arrTimeEndLand >= 18 &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
            case "Airlines":
              return (
                (airlineName === Airlines[airlinesIndex] ||
                  airlineName1 === Airliness[airlinesIndex]) &&
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );

            default:
              return (
                minPrice <= item?.Fare?.PublishedFare &&
                item?.Fare?.PublishedFare <= priceRange
              );
          }
        });
        return categoryFilters.every((filter) => filter);
      })
    : [];
  // useEffect(() => {
  //   console.log(
  //     // result[0][0]?.Segments?.[1][0]
  //     // result[0][0]?.Segments
  //     // selectedCategory,
  //     filteredData,
  //     // priceRange
  //     // takeOffIndex, selectedCategory
  //     Airlines, "alirelin",
  //     Airliness

  //     , 'filtered data')
  // }, [])
  const startTakeOffChangeList = [
    ["startTakeoffNon", "startTakeoffStop"],
    ["startLandNon", "startLandStop"],
  ];
  const TakeOffChangeList = [
    [
      "startTakeoffbefore6AM",
      "startTakeoff6AMto12PM",
      "startTakeoff6AMto12PM",
      "startTakeoffafter6PM",
    ],
    [
      "EndTakeoffbefore6AM",
      "EndTakeoff6AMto12PM",
      "EndTakeoff12PMto6PM",
      "EndTakeoffafter6PM",
    ],
  ];
  const LandChangeList = [
    [
      "startLandbefore6AM",
      "startLand6AMto12PM",
      "startLand12PMto6PM",
      "startLandafter6PM",
    ],
    [
      "EndLandbefore6AM",
      "EndLand6AMto12PM",
      "EndLand12PMto6PM",
      "EndLandafter6PM",
    ],
  ];
  const handleTakeOffChange = (index) => {
    if (takeOffIndex === -1) {
      setSelectedCategory((pre) => [
        ...pre,
        TakeOffChangeList[takeOff ? 0 : 1][index],
      ]);
      setTakeOffIndex(index);
    } else if (takeOffIndex === index) {
      setSelectedCategory((pre) =>
        pre.filter((item) => item !== TakeOffChangeList[takeOff ? 0 : 1][index])
      );
      setTakeOffIndex(-1);
    } else {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== TakeOffChangeList[takeOff ? 0 : 1][takeOffIndex]
        )
      );
      setSelectedCategory((pre) => [
        ...pre,
        TakeOffChangeList[takeOff ? 0 : 1][index],
      ]);
      setTakeOffIndex(index);
    }
  };
  const handleLandChange = (index) => {
    if (landIndex === -1) {
      setSelectedCategory((pre) => [
        ...pre,
        LandChangeList[takeOff ? 0 : 1][index],
      ]);
      setLandIndex(index);
    } else if (landIndex === index) {
      setSelectedCategory((pre) =>
        pre.filter((item) => item !== LandChangeList[takeOff ? 0 : 1][index])
      );
      setLandIndex(-1);
    } else {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== LandChangeList[takeOff ? 0 : 1][landIndex]
        )
      );
      setSelectedCategory((pre) => [
        ...pre,
        LandChangeList[takeOff ? 0 : 1][index],
      ]);
      setLandIndex(index);
    }
  };
  const handleStartTakeOffChange = (index) => {
    if (startTakeOffIndex == -1) {
      setSelectedCategory((pre) => [...pre, startTakeOffChangeList[0][index]]);
      setStartTakeOffIndex(index);
    } else if (startTakeOffIndex == index) {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== startTakeOffChangeList[0][startTakeOffIndex]
        )
      );
      setStartTakeOffIndex(-1);
    } else {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== startTakeOffChangeList[0][startTakeOffIndex]
        )
      );
      setSelectedCategory((pre) => [...pre, startTakeOffChangeList[0][index]]);
      setStartTakeOffIndex(index);
    }
  };
  const handleEndTakeOffChange = (index) => {
    if (endTakeOffIndex == -1) {
      setSelectedCategory((pre) => [...pre, startTakeOffChangeList[1][index]]);
      setEndTakeOffIndex(index);
    } else if (endTakeOffIndex == index) {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== startTakeOffChangeList[1][endTakeOffIndex]
        )
      );
      setEndTakeOffIndex(-1);
    } else {
      setSelectedCategory((pre) =>
        pre.filter(
          (item) => item !== startTakeOffChangeList[0][endTakeOffIndex]
        )
      );
      setSelectedCategory((pre) => [...pre, startTakeOffChangeList[0][index]]);
      setEndTakeOffIndex(index);
    }
  };
  const handleAirlinesChange = (index) => {
    if (airlinesIndex == -1) {
      setSelectedCategory((pre) => [...pre, "Airlines"]);
      setAirlinesIndex(index);
    } else if (airlinesIndex == index) {
      setSelectedCategory((pre) => pre.filter((item) => item !== "Airlines"));
      setAirlinesIndex(-1);
    } else {
      // setSelectedCategory(pre => pre.filter(item => item !== startTakeOffChangeList[0][endTakeOffIndex]));
      // setSelectedCategory(pre => [...pre, startTakeOffChangeList[0][index]]);
      setAirlinesIndex(index);
    }
  };
  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="packResFilterBox">
            <Accordion
              ref={accordionRef}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ width: "100%", border: "none" }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "center",
                    }}
                  >
                    <FilterAltIcon
                      style={{
                        fontWeight: "600",
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                      }}
                    />{" "}
                    Filter
                  </Typography>
                </div>
              </AccordionSummary>
              <div
                style={{
                  color: "#0048FF",
                  textDecoration: "underline",
                  textAlign: "right",
                  paddingRight: "15px",
                }}
              ></div>
              <AccordionDetails>
                <div className="flightFilterBox">
                  {/* <div className="filterTitle">
                    <p>Select Filters</p>
                  </div> */}
                  <div onClick={() => clearFilter()} className="filterTitle">
                    <p>Clear Filters</p>
                  </div>

                  <div className="innerFilter">
                    <div>
                      <h5>Price  range </h5>
                      <div class="wrapperRange">
                        <div className="slider-value">
                          <span>{priceRange}</span>
                        </div>
                        <div class="Inputrange">
                          <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            id="rangeInputPrice"
                          />
                        </div>
                        <div className="price_range">
                          <div>₹{minPrice}</div>
                          <div>₹{maxPrice}</div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="stops_filter">STOPS</div> */}
                    <div>
                      <h2 className="sidebar-title">
                        Stops from{" "}
                        {takeOff
                          ? result[0][0]?.Segments?.[0][0]?.Origin?.Airport
                              ?.CityName
                          : result[0][0]?.Segments?.[1][0]?.Origin?.Airport
                              ?.CityName}
                      </h2>
                      <div style={{ width: "100%", display: "flex" }}>
                        <div
                          className={`timeContainer ${
                            startTakeOffIndex === 0 && "timeContainerTimeActive"
                          }`}
                          onClick={() => handleStartTakeOffChange(0)}
                        >
                          <span className="checkedSVG pe-2 redd">
                            <svg
                              id="fi_2089699"
                              enable-background="new 0 0 515.556 515.556"
                              height="19"
                              viewBox="0 0 515.556 515.556"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path>
                            </svg>
                          </span>
                          <span className="timeContainerTime">Non-Stop</span>
                        </div>
                        <div
                          className={`timeContainer ${
                            startTakeOffIndex === 1 && "timeContainerTimeActive"
                          }`}
                          onClick={() => handleStartTakeOffChange(1)}
                        >
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 32 32"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_4212317"
                            >
                              <g id="_62-Stopwatch" data-name="62-Stopwatch">
                                <path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path>
                                <path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="timeContainerTime">One Stop </span>
                        </div>
                      </div>

                      {/* <div className="sidebar-label-container-outer-div"> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="All" name="test" />
                          <span className="checkmark"></span>All
                        </label> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value={"startTakeoffNon"} name="test" />
                          <span className="checkmark"></span>Non Stop
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value={"startTakeoffStop"} name="test" />
                          <span className="checkmark"></span>One Stop
                        </label> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="SpiceJet" name="test" />
                          <span className="checkmark"></span>SpiceJet
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="Vistara" name="test" />
                          <span className="checkmark"></span>Vistara
                        </label> */}

                      {/* </div> */}
                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>
                    <div className="filter_Box_X">
                      <h2 className="sidebar-title">
                        Stops from{" "}
                        {!takeOff
                          ? result[0][0]?.Segments?.[0][0]?.Origin?.Airport
                              ?.CityName
                          : result[0][0]?.Segments?.[1][0]?.Origin?.Airport
                              ?.CityName}
                      </h2>
                      <div style={{ width: "100%", display: "flex" }}>
                        <div
                          className={`timeContainer ${
                            endTakeOffIndex === 0 && "timeContainerTimeActive"
                          }`}
                          onClick={() => handleEndTakeOffChange(0)}
                        >
                          <span className="checkedSVG pe-2 redd">
                            <svg
                              id="fi_2089699"
                              enable-background="new 0 0 515.556 515.556"
                              height="19"
                              viewBox="0 0 515.556 515.556"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path>
                            </svg>
                          </span>
                          <span className="timeContainerTime">Non-Stop</span>
                        </div>
                        <div
                          className={`timeContainer ${
                            endTakeOffIndex === 1 && "timeContainerTimeActive"
                          }`}
                          onClick={() => handleEndTakeOffChange(1)}
                        >
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 32 32"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_4212317"
                            >
                              <g id="_62-Stopwatch" data-name="62-Stopwatch">
                                <path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path>
                                <path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="timeContainerTime">One Stop </span>
                        </div>
                      </div>

                      {/* <div> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="All" name="test" />
                          <span className="checkmark"></span>All
                        </label> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="startLandNon" name="test" />
                          <span className="checkmark"></span>Non Stop
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="startLandStop" name="test" />
                          <span className="checkmark"></span>1 Stop
                        </label> */}

                      {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="SpiceJet" name="test" />
                          <span className="checkmark"></span>2 Stop's
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="Vistara" name="test" />
                          <span className="checkmark"></span>2+ Stop's
                        </label> */}

                      {/* </div> */}
                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>
                    <div className="FlightTimingContainer">
                      {/* <div>Flight Timing</div> */}
                      <div className="FlightTimingToggle">
                        <div
                          className={
                            takeOff
                              ? "FlightToggleActive"
                              : "FlightToggleInActive"
                          }
                          onClick={() => {
                            SetTakeOffetFilter(true);
                            clearFilter();
                          }}
                        >
                          {" "}
                          Onward 
                        </div>
                        <div
                          className={
                            !takeOff
                              ? "FlightToggleActive"
                              : "FlightToggleInActive"
                          }
                          onClick={() => {
                            SetTakeOffetFilter(false);
                            clearFilter();
                          }}
                        >
                          Return
                        </div>
                      </div>
                    </div>

                    <div className="filter_Box_X">
                      <h2 className="sidebar-title">
                        {" "}
                        Take Off from {" "}
                        {takeOff
                          ? result[0][0]?.Segments?.[0][0]?.Origin?.Airport
                              ?.CityName
                          : result[0][0]?.Segments?.[1][0]?.Origin?.Airport
                              ?.CityName}
                      </h2>

                      {/* <div className="sidebar-label-container-outer-div">
                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startTakeoffbefore6AM" : "EndTakeoffbefore6AM"}
                            name="test"
                          />
                          <span className="checkmark"></span>Before 6 AM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startTakeoff6AMto12PM" : "EndTakeoff6AMto12PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>6 AM - 12 PM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startTakeoff12PMto6PM" : "EndTakeoff12PMto6PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>12 PM - 6 PM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startTakeoffafter6PM" : "EndTakeoffafter6PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>After 6 PM
                        </label>
                      </div> */}
                      <div style={{ width: "100%" }}>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div
                            className={`timeContainer ${
                              takeOffIndex === 0 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleTakeOffChange(0)}
                          >
                            <span className="checkedSVG pe-2 redd">
                              <svg
                                id="Capa_1"
                                enable-background="new 0 0 512 512"
                                height="19"
                                viewBox="0 0 512 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                                <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                                <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                                <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                                <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                                <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                                <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                                <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                                <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                                <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                              </svg>
                            </span>
                            <span className="timeContainerTime">
                              Before 6 AM
                            </span>
                          </div>
                          <div
                            className={`timeContainer ${
                              takeOffIndex === 1 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleTakeOffChange(1)}
                          >
                            <span className="checkedSVG pe-2">
                              <svg
                                height="19"
                                viewBox="0 0 64 64"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_2955890"
                              >
                                <g id="Sun">
                                  <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                  <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                  <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                  <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                  <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                  <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                  <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                  <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                  <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                                </g>
                              </svg>
                            </span>
                            <span className="timeContainerTime">6AM-12PM</span>
                          </div>
                        </div>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div
                            className={`timeContainer ${
                              takeOffIndex === 2 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleTakeOffChange(2)}
                          >
                            <span className="checkedSVG pe-2 redd">
                              <svg
                                id="fi_3223045"
                                height="19"
                                viewBox="0 0 512 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                                <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                                <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                                <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                                <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                                <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                                <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                                <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                                <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                              </svg>
                            </span>
                            <span className="timeContainerTime">12PM-6PM</span>
                          </div>
                          <div
                            className={`timeContainer ${
                              takeOffIndex === 3 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleTakeOffChange(3)}
                          >
                            <span className="checkedSVG pe-2">
                              <svg
                                height="19"
                                viewBox="0 -41 512.00002 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_1146677"
                              >
                                <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                                <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                              </svg>
                            </span>
                            <span className="timeContainerTime">
                              After 6 PM
                            </span>
                          </div>
                        </div>
                      </div>

                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>
                    <div>
                      <h2 className="sidebar-title">
                        Landing at{" "}
                        {!takeOff
                          ? result[0][0]?.Segments?.[0][0]?.Origin?.Airport
                              ?.CityName
                          : result[0][0]?.Segments?.[1][0]?.Origin?.Airport
                              ?.CityName}
                      </h2>

                      {/* <div>
                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startLandbefore6AM" : "EndLandbefore6AM"}
                            name="test"
                          />
                          <span className="checkmark"></span>Before 6 AM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startLand6AMto12PM" : "EndLand6AMto12PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>6 AM - 12 PM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startLand12PMto6PM" : "EndLand12PMto6PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>12 PM - 6 PM
                        </label>

                        <label className="sidebar-label-container" >
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value={takeOff ? "startLandafter6PM" : "EndLandafter6PM"}
                            name="test"
                          />
                          <span className="checkmark"></span>After 6 PM
                        </label>
                      </div> */}
                      <div style={{ width: "100%" }}>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div
                            className={`timeContainer ${
                              landIndex === 0 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleLandChange(0)}
                          >
                            <span className="checkedSVG pe-2 redd">
                              <svg
                                id="Capa_1"
                                enable-background="new 0 0 512 512"
                                height="19"
                                viewBox="0 0 512 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                                <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                                <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                                <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                                <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                                <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                                <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                                <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                                <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                                <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                              </svg>
                            </span>
                            <span className="timeContainerTime">
                              Before 6 AM
                            </span>
                          </div>
                          <div
                            className={`timeContainer ${
                              landIndex === 1 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleLandChange(1)}
                          >
                            <span className="checkedSVG pe-2">
                              <svg
                                height="19"
                                viewBox="0 0 64 64"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_2955890"
                              >
                                <g id="Sun">
                                  <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                  <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                  <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                  <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                  <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                  <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                  <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                  <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                  <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                                </g>
                              </svg>
                            </span>
                            <span className="timeContainerTime">6AM-12PM</span>
                          </div>
                        </div>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div
                            className={`timeContainer ${
                              landIndex === 2 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleLandChange(2)}
                          >
                            <span className="checkedSVG pe-2 redd">
                              <svg
                                id="fi_3223045"
                                height="19"
                                viewBox="0 0 512 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                                <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                                <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                                <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                                <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                                <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                                <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                                <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                                <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                              </svg>
                            </span>
                            <span className="timeContainerTime">12PM-6PM</span>
                          </div>
                          <div
                            className={`timeContainer ${
                              landIndex === 3 && "timeContainerTimeActive"
                            }`}
                            onClick={() => handleLandChange(3)}
                          >
                            <span className="checkedSVG pe-2">
                              <svg
                                height="19"
                                viewBox="0 -41 512.00002 512"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_1146677"
                              >
                                <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                                <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                              </svg>
                            </span>
                            <span className="timeContainerTime">
                              After 6 PM
                            </span>
                          </div>
                        </div>
                      </div>

                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>

                    <div>
                      <h2 className="sidebar-title">Airlines</h2>

                      <div>
                        {/* <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="Air India" name="test" />
                          <span className="checkmark"></span>Air India
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="Indigo" name="test" />
                          <span className="checkmark"></span>Indigo
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="SpiceJet" name="test" />
                          <span className="checkmark"></span>SpiceJet
                        </label>

                        <label className="sidebar-label-container" >
                          <input type="checkbox" onChange={handleRadioChange} value="Vistara" name="test" />
                          <span className="checkmark"></span>Vistara
                        </label> */}
                        {Airliness.map((item, index) => (
                          <div
                            onClick={() => handleAirlinesChange(index)}
                            className={`AirelinesFilter ${
                              airlinesIndex === index && "AirelineFliterActive"
                            }`}
                          >
                            <div>
                              <img
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "contain",
                                }}
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item.AirlineCode}.png`}
                              alt="flightImg" />{" "}
                            </div>
                            <div>{item.AirlineName}</div>
                          </div>
                        ))}
                      </div>
                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-lg-12">
              <div className="returnheadicons">
                <div>
                  <p>Flight</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p>Departure</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p>Duration</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p>Arrival</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p>Offer Fare</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p>Select</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5"
                        stroke="#21325D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {filteredData.length === 0 ? (
                <div className="returnheadicons1">
                  <div className="filterNoResultImgDev">
                    <img
                      src={filterImg}
                      style={{ width: "50px", height: "50px" }}
                      alt="filterImg"
                    />
                  </div>
                  <div className="filter_noresult_inner_dev">
                    <div className="filter_noresult_inner_dev1">
                      Too many filters applied!
                    </div>
                    <div>
                      We couldn't find any flights with all the filters you’ve
                      selected. Try removing some filters
                    </div>
                    <div
                      className="clearFilterDivBTN"
                      onClick={() => clearFilter()}
                    >
                      Clear Filter
                    </div>
                  </div>
                </div>
              ) : (
                filteredData.map((item, i) => (
                  // console.log(item)
                  <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    style={{
                      backgroundColor: "#ffffffba",
                      padding: "10px",
                      gap: "5px",
                      width: "100%",
                      margin: "auto",
                      width: "100%",
                      borderRadius: "5px",
                      margin: "5px",
                      boxShadow: "-1px 7px 14px 4px rgba(223,220,242,1)",
                      // position: "fixed",
                      // left: 0,
                      // overflow: "hidden",
                      // bottom: "0px",
                      // zIndex: "2",
                    }}
                  >
                    <Box
                      sx={{
                        // border: "1px solid blue",
                        // backgroundColor: 'white',
                        flex: 1,
                        borderRadius: "10px",
                        padding: "5px",
                        maxWidth: "418px",
                      }}
                    >
                      {item.Segments[0].length === 1 ? (
                        <SingleDataReturnInternational
                          flight={item?.Segments[0][0]}
                          wholeFlight={item}
                          index={item?.ResultIndex}
                          fare={item?.Fare?.PublishedFare}
                          IsLCC={item?.IsLCC}
                          showRadio={false}
                        />
                      ) : (
                        <MultipleDataReturnInternational
                          flight={item?.Segments[0]}
                          wholeFlight={item}
                          index={item?.ResultIndex}
                          fare={item?.Fare?.PublishedFare}
                          IsLCC={item?.IsLCC}
                          showRadio={false}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        // border: "1px solid red",
                        // backgroundColor: 'white',
                        flex: 1,
                        borderRadius: "10px",
                        padding: "5px",
                        maxWidth: "418px",
                      }}
                    >
                      {item?.Segments[1].length === 1 ? (
                        <SingleDataReturnInternational
                          flight={item?.Segments[1][0]}
                          wholeFlight={item}
                          index={item?.ResultIndex}
                          fare={item?.Fare?.PublishedFare}
                          IsLCC={item?.IsLCC}
                          showRadio={false}
                        />
                      ) : (
                        <MultipleDataReturnInternational
                          flight={item?.Segments[1]}
                          wholeFlight={item}
                          index={item?.ResultIndex}
                          fare={item?.Fare?.PublishedFare}
                          IsLCC={item?.IsLCC}
                          showRadio={false}
                        />
                      )}
                      {/* <MultipleDataReturnInternational
                flight={ongoFlight?.Segments}
                wholeFlight={ongoFlight}
                stop={ongoFlight?.Segments.length}
                index={ongoFlight?.ResultIndex}
                fare={ongoFlight?.Fare?.PublishedFare}
                IsLCC={ongoFlight.IsLCC}
              /> */}
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "5px",
                        // border: "1px solid red",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <Typography
                          className="flight_price_total"
                          variant="h1"
                          component="h2"
                          style={{}}
                        >
                          Total Price
                        </Typography>
                        <p className="flight_price">
                          {`₹${Number(item?.Fare?.PublishedFare).toFixed(0)}`}
                        </p>
                      </Box>

                      <button
                        className="flightBoolkInternationalButton"
                        onClick={() => handleFareRuleAndQuote(item, i)}
                      >
                        Book Now
                      </button>
                    </Box>
                  </Box>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightReturnInternational;
