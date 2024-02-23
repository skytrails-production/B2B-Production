import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import "./busresult.css";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Modal,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { Button } from "react-bootstrap";
import Link from "@mui/material/Link";
import Busmoredetail from "./Busmoredetail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { height, width } from "@mui/system";
// import { CheckBox } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { apiURL } from "../../../Constants/constant";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import dayjs from "dayjs";
import busArrow from "../../../Images/busArrow.png";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import { swalModal } from "../../../utils/swal";

const variants = {
  // initial: {
  //   y: 50,
  //   opacity: 0,
  // },
  // animate: {
  //   y: 0,
  //   opacity: 1,
  //   transition: {
  //     duration: 0.5,
  //     staggerChildren: 0.1,
  //   },
  // },
};

const Busdetail = () => {
  const name = [];
  const upperArray = [];
  const lowerArray = [];
  const [blockedSeatArray, setBlockedSeatArray] = useState([]);
  const [resulttIndex, setResulttIndex] = useState("");

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [selectedDropPoint, setSelectedDropPoint] = useState("");
  const [flatArray, setFlatArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [sub, setSub] = useState(false);
  const [subIndex, setSubIndex] = useState(0);
  const [seatLayoutData, setSeatLayoutData] = useState({});
  const [layout, setLayout] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortOption, setSortOption] = useState("lowToHigh");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log(reducerState);
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  // console.log(busFullData);
  const busDataResult =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
      ?.BusResults;
  // console.log("bus res", busDataResult);
  useEffect(() => {
    if (busDataResult === undefined) {
      navigate("/");
    }
    // console.warn("busDataResult", busDataResult)
  }, []);

  const maxPrice = busDataResult?.reduce((max, hotel) => {
    return Math.max(max, hotel?.BusPrice?.PublishedPriceRoundedOff || 0);
  }, 0);

  const minPrice = busDataResult?.reduce((min, hotel) => {
    return Math.min(min, hotel?.BusPrice?.PublishedPriceRoundedOff || Infinity);
  }, Infinity);

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 501);

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };

  useEffect(() => {
    setPriceRangeValue(maxPrice + 501);
  }, [maxPrice]);

  useEffect(() => {
    if (
      seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorCode !== 0 &&
      seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorCode !==
        undefined
    ) {
      // swalModal("bus",seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorMessage,false)
      swalModal(
        "bus",
        "Your bus reservation couldn't be processed. Double-check your details and attempt booking again.",
        false
      );
      // Swal.fire({
      //   title: seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorMessage,
      //   text: "Redirecting to home page...",
      //   // text:TicketDetails,
      //   icon: "question",
      //   timer: 3000,
      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `,
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `,
      //   },
      // });
      navigate("/");
    }
  }, [seatLayoutData]);

  const handleBuslayout = async (resultIndex) => {
    // console.log("resultIndexxxxxxxxxxxx", resultIndex);

    const requestData = {
      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: resultIndex,
      TraceId: busFullData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
    };

    try {
      axios
        .post(`${apiURL.baseURL}/skyTrails/bus/seatlayout`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setSeatLayoutData(response.data);
          console.warn(response.data.data, "response data");
          setSub(false);
          setSubIndex(0);

          const finalLayout = handleSeatLayoutStringTwo(
            response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails
              ?.HTMLLayout
          );
          // console.log(
          //   "finalLayout",
          //   response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails
          //     ?.HTMLLayout
          // );

          setLayout((prev) => finalLayout);
          const SeatDetailsArray =
            response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails
              ?.SeatLayout?.SeatDetails;
          // console.log("seatDetailssAraayyy", SeatDetailsArray);

          let singleArray = SeatDetailsArray?.reduce(
            (acc, currentArray) => [...acc, ...currentArray],
            []
          );
          setFlatArray(singleArray);
          busDataResult.map((item, index) => {
            if (item?.ResultIndex === resultIndex) {
              setOrigin(item?.BoardingPointsDetails);
              setDestination(item?.DroppingPointsDetails);
              setSelectedOrigin(item?.BoardingPointsDetails[0]?.CityPointIndex);
              setSelectedDropPoint(
                item?.DroppingPointsDetails[0]?.CityPointIndex
              );
            }
          });
          setResulttIndex(resultIndex);

          // console.log("flattArayyyyyy",flatArray)
          setModal((prev) => !prev);
        });
    } catch (error) {
      setSub(false);
      setSubIndex(0);

      console.error("Try-Catch Error:", error);
    }
  };
  // console.log(layout);
  // console.log(seatLayoutData);
  // console.log("flattArayyyyyy", flatArray);
  // console.log("originnnnnnnnn", origin);
  flatArray?.forEach((obj) => {
    if (obj?.IsUpper === true) {
      upperArray?.push(obj);
    } else if (obj?.IsUpper === false) {
      lowerArray?.push(obj);
    }
  });

  // console.log(upperArray, lowerArray);
  function handleSeatLayoutStringTwo(inputString) {
    // Your bus seat layout string
    let busSeatLayoutString = `${inputString}`;

    // Create an empty array to store the seat objects
    let seatObjects = [];

    // Create a temporary div element to parse the string
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = busSeatLayoutString;
    // console.log("temppdivvvvvvvvvv", tempDiv);
    // Select all seat div elements
    let seatDivs = tempDiv.querySelectorAll(
      ".hseat, .bhseat, .vhseat, .bhseat, .bseat, .vseat, .nseat, .rhseat"
    );
    // console.log(seatDivs);

    // Iterate through each seat div and differentiate between upper/lower and left/right sides
    seatDivs.forEach((seatDiv) => {
      // Check if the seat div is inside the upper part of the bus
      if (seatDiv.closest(".outerseat")) {
        const upperCheck = seatDiv.closest(".outerseat");
        const lowerDivCheck = upperCheck.querySelector(".lower");
        if (lowerDivCheck) {
          seatObjects.push({
            type: "lower",
            id: seatDiv.id,
            class: seatDiv.getAttribute("class"),
            top: seatDiv.style.top,
            left: seatDiv.style.left,
            onclick: seatDiv.getAttribute("onclick"),
          });
        }

        // Conditionally check for SeatType 2 and add sleeper seat
        else {
          seatObjects.push({
            type: "upper",
            id: seatDiv.id,
            class: seatDiv.getAttribute("class"),
            top: seatDiv.style.top,
            left: seatDiv.style.left,
            onclick: seatDiv.getAttribute("onclick"),
          });
        }
      }
      // Check if the seat div is inside the lower part of the bus
      else if (seatDiv.closest(".outerlowerseat")) {
        seatObjects.push({
          type: "lower",
          id: seatDiv.id,
          class: seatDiv.getAttribute("class"),
          top: seatDiv.style.top,
          left: seatDiv.style.left,
          onclick: seatDiv.getAttribute("onclick"),
        });
      }
    });

    // Log the array of seat objects
    // console.log(seatObjects);
    return seatObjects;
  }
  function addOrRemoveSeat(e, object) {
    // console.log("hiiiiiiiiiiiiiiiiiiiii");
    // console.log(e);
    // console.log(e.target.checked);
    // console.log(index)
    if (e.target.checked) {
      setBlockedSeatArray([...blockedSeatArray, object]);
      // console.log(blockedSeatArray);
    } else {
      // const element = object;
      // const index = blockedSeatArray.indexOf(element);
      // const slicedArray=blockedSeatArray.splice(index, 1)
      // setBlockedSeatArray(slicedArray);
      const updatedBlockedSeatArray = blockedSeatArray.filter(
        (seatObject) => seatObject !== object
      );
      setBlockedSeatArray(updatedBlockedSeatArray);
      // console.log(blockedSeatArray);
    }
  }
  function handleClose() {
    setBlockedSeatArray([]);
    setSelectedDropPoint("");
    setSelectedOrigin("");
    setOrigin([]);
    setDestination([]);
    setModal((prev) => !prev);
  }

  async function handleContinue() {
    if (
      blockedSeatArray.length === 0 ||
      selectedOrigin === "" ||
      destination.length === 0 ||
      selectedDropPoint === "" ||
      origin === ""
    ) {
      return;
    }
    const dataToSave = await {
      blockedSeatArray: blockedSeatArray,
      selectedOrigin: Number(selectedOrigin),
      selectedDropPoint: Number(selectedDropPoint),
      resultIndex: resulttIndex,
    };

    // Save the combined state object to session storage
    await sessionStorage.setItem("seatData", JSON.stringify(dataToSave));
    console.warn(
      selectedOrigin,
      selectedDropPoint,
      "selectedOrigin,selectedDropPoint"
    );
    navigate("/BusPassengerDetail");
  }

  // useEffect(()=>{

  //   console.warn(origin,"origin jdidsfuidfnuvire",selectedOrigin ,"selectedOrigin......")
  //   console.warn(origin,"origin jdidsfuidfnuvire",selectedOrigin ,"selectedOrigin......")
  //   if(origin.length > 0){
  //     setSelectedOrigin(origin[0].CityPointIndex)
  //   }
  //   if(selectedDropPoint.length > 0){
  //     setSelectedDropPoint(destination[0].CityPointIndex)
  //   }

  // },[origin])

  // filter box

  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionRef = useRef(null);
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // const handleRadioChange = (event) => {
  //   const selectedValue = event.target.value;
  //   if (selectedValue === "All") {
  //     setSelectedCategory([]);
  //     document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
  //       checkbox.checked = false;
  //     });
  //   } else {
  //     // If other checkbox is selected, update selectedCategory as before
  //     setSelectedCategory((prevSelectedCategory) => {
  //       if (prevSelectedCategory.includes(selectedValue)) {
  //         return prevSelectedCategory.filter(
  //           (value) => value !== selectedValue
  //         );
  //       } else {
  //         return [...prevSelectedCategory, selectedValue];
  //       }
  //     });
  //   }
  // };

  // console.log(selectedCategory, "selected category")

  // const sortedAndFilteredResults = busDataResult
  //   ?.filter((item) => {
  //     const depTime = new Date(item?.DepartureTime);
  //     const hour = depTime.getHours();

  //     const categoryFilters = selectedCategory?.map((category) => {
  //       switch (category) {
  //         case "before6AM":
  //           return hour < 6;
  //         case "6AMto12PM":
  //           return hour >= 6 && hour < 12;
  //         case "12PMto6PM":
  //           return hour >= 12 && hour < 18;
  //         case "after6PM":
  //           return hour >= 18;
  //         case "Non AC":
  //           return item?.BusType?.toLowerCase().includes("non a/c");
  //         case "AC":
  //           return !item?.BusType?.toLowerCase().includes("non a/c");
  //         case "Sleeper":
  //           return item?.BusType?.toLowerCase().includes("sleeper");
  //         case "Seater":
  //           return item?.BusType?.toLowerCase().includes("seater");
  //         case "800":
  //           return item?.BusPrice?.PublishedPriceRoundedOff <= 800;
  //         case "1200":
  //           return (
  //             item?.BusPrice?.PublishedPriceRoundedOff > 800 &&
  //             item?.BusPrice?.PublishedPriceRoundedOff <= 1200
  //           );
  //         case "2000":
  //           return (
  //             item?.BusPrice?.PublishedPriceRoundedOff > 1200 &&
  //             item?.BusPrice?.PublishedPriceRoundedOff <= 2000
  //           );
  //         case "3000":
  //           return (
  //             item?.BusPrice?.PublishedPriceRoundedOff > 2000 &&
  //             item?.BusPrice?.PublishedPriceRoundedOff <= 3000
  //           );
  //         case "3001":
  //           return item?.BusPrice?.PublishedPriceRoundedOff > 3000;
  //         default:
  //           return true;
  //       }
  //     });

  //     return categoryFilters?.every((filter) => filter);
  //   })
  //   .sort((a, b) =>
  //     sortOption === "lowToHigh"
  //       ? a?.BusPrice?.PublishedPriceRoundedOff -
  //         b?.BusPrice?.PublishedPriceRoundedOff
  //       : b?.BusPrice?.PublishedPriceRoundedOff -
  //         a?.BusPrice?.PublishedPriceRoundedOff
  //   );

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    const radioGroupName = event.target.name;

    // console.log('selectedValue:', selectedValue);
    // console.log('radioGroupName:', radioGroupName);

    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
      return;
    }

    setSelectedCategory((prevSelectedCategory) => {
      let updatedCategory = [...prevSelectedCategory];

      // Check if the selected value is already in the array
      const isValueSelected = updatedCategory.some(
        (category) => category === `${radioGroupName}:${selectedValue}`
      );

      // If the value is selected, filter it out; otherwise, add it
      updatedCategory = isValueSelected
        ? updatedCategory.filter(
            (category) => category !== `${radioGroupName}:${selectedValue}`
          )
        : [
            ...updatedCategory.filter(
              (category) => !category.startsWith(`${radioGroupName}:`)
            ),
            `${radioGroupName}:${selectedValue}`,
          ];
      // console.log('updatedCategory:', updatedCategory);
      return updatedCategory;
    });
  };
  const sortedAndFilteredResults = busDataResult
    ?.filter((item) => {
      const depTime = new Date(item?.DepartureTime);
      const hour = depTime.getHours();

      const categoryFilters = selectedCategory?.map((category) => {
        const [groupName, value] = category.split(":");

        switch (groupName) {
          case "departTime":
            switch (value) {
              case "before6AM":
                return hour < 6;
              case "6AMto12PM":
                return hour >= 6 && hour < 12;
              case "12PMto6PM":
                return hour >= 12 && hour < 18;
              case "after6PM":
                return hour >= 18;
            }

          case "ac":
            switch (value) {
              case "Non AC":
                return item?.BusType?.toLowerCase().includes("non a/c");
              case "AC":
                return !item?.BusType?.toLowerCase().includes("non a/c");
            }

          case "seat":
            switch (value) {
              case "Sleeper":
                return item?.BusType?.toLowerCase().includes("sleeper");
              case "Seater":
                return item?.BusType?.toLowerCase().includes("seater");
            }

          // case "priceRange":
          //   switch (value) {
          //     case "800":
          //       return item?.BusPrice?.PublishedPriceRoundedOff <= 800;
          //     case "1200":
          //       return (
          //         item?.BusPrice?.PublishedPriceRoundedOff > 800 &&
          //         item?.BusPrice?.PublishedPriceRoundedOff <= 1200
          //       );
          //     case "2000":
          //       return (
          //         item?.BusPrice?.PublishedPriceRoundedOff > 1200 &&
          //         item?.BusPrice?.PublishedPriceRoundedOff <= 2000
          //       );
          //     case "3000":
          //       return (
          //         item?.BusPrice?.PublishedPriceRoundedOff > 2000 &&
          //         item?.BusPrice?.PublishedPriceRoundedOff <= 3000
          //       );
          //     case "3001":
          //       return item?.BusPrice?.PublishedPriceRoundedOff > 3000;
          //   }

          default:
            return true;
        }
      });
      const priceInRange =
        item?.BusPrice?.PublishedPriceRoundedOff <= priceRangeValue;
      return categoryFilters?.every((filter) => filter) && priceInRange;
    })
    .sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.BusPrice?.PublishedPriceRoundedOff -
          b?.BusPrice?.PublishedPriceRoundedOff
        : b?.BusPrice?.PublishedPriceRoundedOff -
          a?.BusPrice?.PublishedPriceRoundedOff
    );

  // console.log(sortedAndFilteredResults, "sortedAndFilteredResults");

  return (
    <>
      <div className="container-xxl margin-pecentage">
        <div className="row">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-lg-3 mt-2"
          >
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
                <AccordionDetails>
                  <div className="flightFilterBox">
                    <div className="filterTitle">
                      <p>Select Filters</p>
                    </div>
                    {/* <div className="innerFilter">
                      <div>
                        <h2 className="sidebar-title">Sort By</h2>
                        <select
                          className="highSelect"
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                        </select>
                      </div>

                      <div>
                        <h2 className="sidebar-title">Suggesterd to you</h2>

                        <div>
                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="All"
                              name="test"
                            />
                            <span className="checkmark"></span>All
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="Non AC"
                              name="test"
                            />
                            <span className="checkmark"></span>Non AC
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="AC"
                              name="test"
                            />
                            <span className="checkmark"></span>AC
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="Seater"
                              name="test"
                            />
                            <span className="checkmark"></span>Seater
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="Sleeper"
                              name="test"
                            />
                            <span className="checkmark"></span>Sleeper
                          </label>
                        </div>
                        <Divider
                          sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                        />
                      </div>

                      <div>
                        <h2 className="sidebar-title">Departure Time</h2>

                        <div>
                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="before6AM"
                              name="test"
                            />
                            <span className="checkmark"></span>Before 6 AM
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="6AMto12PM"
                              name="test"
                            />
                            <span className="checkmark"></span>6 AM - 12 PM
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="12PMto6PM"
                              name="test"
                            />
                            <span className="checkmark"></span>12 PM - 6 PM
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="after6PM"
                              name="test"
                            />
                            <span className="checkmark"></span>After 6 PM
                          </label>
                        </div>

                        <Divider
                          sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                        />
                      </div>

                      <div>
                        <h2 className="sidebar-title">By Price</h2>

                        <div>
                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="800"
                              name="test"
                            />
                            <span className="checkmark"></span>₹0 - 800
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="1200"
                              name="test"
                            />
                            <span className="checkmark"></span>₹800 - 1200
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="2000"
                              name="test"
                            />
                            <span className="checkmark"></span>₹1200 - 2000
                          </label>

                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="3000"
                              name="test"
                            />
                            <span className="checkmark"></span>₹2000 - 3000
                          </label>
                          <label className="sidebar-label-container">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="3001"
                              name="test"
                            />
                            <span className="checkmark"></span>₹3000 and Above
                          </label>
                        </div>
                        <Divider
                          sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                        />
                      </div>
                    </div> */}
                    <div className="innerFilter">
                      <div className="busDepartureMain">
                        <h2 className="sidebar-title">Sort By</h2>
                        <select
                          className="highSelect"
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                        </select>
                      </div>
                      <div className="PackageDepartureMain">
                        <h2 className="sidebar-title">By Price</h2>
                        <div>
                          <input
                            type="range"
                            min={minPrice + 1}
                            max={maxPrice + 501}
                            step="500"
                            value={priceRangeValue}
                            onChange={handlePriceRangeChange}
                          />
                          <span>
                            Max price ₹{""}
                            {priceRangeValue}
                          </span>
                        </div>
                        <Divider
                          sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                        />
                      </div>
                      <div>
                        <div>
                          <label className="sidebar-label-container ps-0">
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value="All"
                              name="test"
                              checked={selectedCategory.includes("test:All")}
                            />
                            {/* <span className="checkmark"></span> */}
                            <span
                              style={{
                                color:
                                  selectedCategory.length > 0 ? "red" : "gray",
                              }}
                            >
                              Clear Filter
                            </span>
                          </label>
                        </div>
                        <Divider
                          sx={{
                            marginBottom: "15px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>

                      <div className="busDepartureMain">
                        <h2 className="sidebar-title">Bus Type</h2>

                        <div>
                          {/* <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="All"
                          name="test"
                        />
                        <span className="checkmark"></span>All
                      </label> */}

                          <label className="sidebar-label-container ps-0">
                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="NonAC"
                                name="ac"
                                checked={selectedCategory.includes("ac:NonAC")}
                              />
                              {/* <span className="checkmark"></span>Non AC */}
                              <div>
                                <span className="checkedSVG pe-2">
                                  <svg
                                    id="fi_13285168"
                                    height="19"
                                    width="19"
                                    enable-background="new 0 0 25 25"
                                    viewBox="0 0 492 492"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <g>
                                        <path d="m372.16 321.72h-181.02c-2.76 0-5-2.24-5-5s2.24-5 5-5h181.03c11.06 0 20.06-9 20.06-20.06v-89.84c0-11.06-9-20.06-20.06-20.06h-41.07c-2.76 0-5-2.24-5-5s2.24-5 5-5h41.07c16.57 0 30.06 13.48 30.06 30.06v89.84c-.01 16.58-13.49 30.06-30.07 30.06zm-208.62 0h-43.19c-16.57 0-30.06-13.48-30.06-30.06v-89.84c0-16.57 13.48-30.06 30.06-30.06h183.15c2.76 0 5 2.24 5 5s-2.24 5-5 5h-183.14c-11.06 0-20.06 9-20.06 20.06v89.84c0 11.06 9 20.06 20.06 20.06h43.19c2.76 0 5 2.24 5 5s-2.24 5-5.01 5z"></path>
                                      </g>
                                      <g>
                                        <path d="m345.88 321.72c-2.76 0-5-2.24-5-5v-28.11c0-2.3-1.87-4.17-4.17-4.17h-108.29c-2.76 0-5-2.24-5-5s2.24-5 5-5h108.29c7.81 0 14.17 6.36 14.17 14.17v28.11c0 2.76-2.24 5-5 5zm-199.24 0c-2.76 0-5-2.24-5-5v-28.11c0-7.81 6.36-14.17 14.17-14.17h45.02c2.76 0 5 2.24 5 5s-2.24 5-5 5h-45.02c-2.3 0-4.17 1.87-4.17 4.17v28.11c0 2.76-2.24 5-5 5z"></path>
                                      </g>
                                      <g>
                                        <path d="m318.38 303.08h-108.6c-2.76 0-5-2.24-5-5s2.24-5 5-5h108.6c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path>
                                      </g>
                                      <g>
                                        <path d="m367.88 206.82h-61.85c-2.76 0-5-2.24-5-5s2.24-5 5-5h61.85c2.76 0 5 2.24 5 5s-2.23 5-5 5zm-89.43 0h-75.58c-2.76 0-5-2.24-5-5s2.24-5 5-5h75.58c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path>
                                      </g>
                                      <g>
                                        <path d="m367.88 239.82h-94.85c-2.76 0-5-2.24-5-5s2.24-5 5-5h94.85c2.76 0 5 2.24 5 5s-2.23 5-5 5zm-122.44 0h-42.58c-2.76 0-5-2.24-5-5s2.24-5 5-5h42.58c2.76 0 5 2.24 5 5s-2.23 5-5 5z"></path>
                                      </g>
                                      <g>
                                        <path d="m363.61 275.27c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm0-22c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
                                      </g>
                                      <g>
                                        <path d="m128.91 275.27c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.17 16-16 16zm0-22c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
                                      </g>
                                    </g>
                                    <g>
                                      <g>
                                        <path d="m246.26 467.74c-59.03 0-114.53-22.99-156.27-64.73s-64.73-97.24-64.73-156.27 22.99-114.53 64.73-156.27 97.24-64.73 156.27-64.73 114.53 22.99 156.27 64.73 64.73 97.24 64.73 156.27-22.99 114.53-64.73 156.27-97.24 64.73-156.27 64.73zm0-431.9c-54.03 0-108.07 20.57-149.2 61.7-39.85 39.85-61.8 92.84-61.8 149.2s21.95 109.35 61.8 149.2c82.27 82.27 216.13 82.27 298.4 0 39.85-39.85 61.8-92.84 61.8-149.2s-21.95-109.35-61.8-149.2c-41.13-41.13-95.17-61.7-149.2-61.7z"></path>
                                      </g>
                                      <g>
                                        <path d="m246.19 448.16c-48.05 0-96.16-17.12-134.5-51.62-1.02-.92-1.62-2.21-1.65-3.58s.49-2.7 1.46-3.67l277.32-277.32c.97-.97 2.3-1.5 3.67-1.46s2.67.63 3.58 1.65c71.59 79.56 68.34 201.22-7.41 276.97-39.25 39.25-90.82 59.03-142.47 59.03zm-123.85-55.58c75.63 64.43 188.5 60.21 259.24-10.52 70.74-70.74 74.96-183.6 10.52-259.24zm-21.15-8.5c-.04 0-.08 0-.11 0-1.36-.03-2.66-.62-3.58-1.63-34.99-38.3-53.66-88.03-52.56-140.02 1.1-52.15 22.03-101.19 58.93-138.09s85.94-57.83 138.09-58.93c51.99-1.11 101.71 17.56 140.02 52.56 1.01.92 1.6 2.21 1.63 3.58.03 1.36-.5 2.68-1.46 3.65l-277.43 277.41c-.94.94-2.21 1.47-3.53 1.47zm145.11-328.87c-49.03 0-97.97 18.82-135.36 56.2-71.29 71.29-75.08 184.67-9.54 260.38l269.92-269.92c-36.01-31.16-80.56-46.66-125.02-46.66z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <span>Non AC</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container ps-0">
                            {/* <span className="checkmark"></span>AC */}

                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="AC"
                                name="ac"
                                checked={selectedCategory.includes("ac:AC")}
                              />
                              {/* <span className="checkmark"></span>AC */}
                              <div>
                                <span className="checkedSVG pe-2">
                                  <svg
                                    id="fi_4343580"
                                    enable-background="new 0 0 501.213 501.213"
                                    height="19"
                                    viewBox="0 0 501.213 501.213"
                                    width="19"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m475.242 370.564-6.416-29.306-35.375 7.745-40.056-25.666 47.514-10.403-6.417-29.306-76.819 16.819-32.065-20.546v-58.65l31.991-20.766 76.918 16.365 6.243-29.343-47.575-10.122 39.904-25.903 35.42 7.536 6.243-29.343-26.826-5.708 5.707-26.826-29.344-6.243-7.536 35.421-39.903 25.903 10.122-47.575-29.343-6.243-16.365 76.918-31.626 20.529-44.032-22.016v-37.015l55.606-55.607-21.212-21.213-34.394 34.394v-47.574l25.606-25.607-21.212-21.213-19.394 19.393-19.393-19.393-21.213 21.213 25.606 25.607v47.574l-34.393-34.394-21.213 21.213 55.606 55.607v37.016l-44.084 22.042-31.796-20.373-16.82-76.82-29.306 6.416 10.403 47.514-40.056-25.666-7.746-35.375-29.304 6.416 5.866 26.792-26.792 5.866 6.416 29.306 35.375-7.745 40.056 25.666-47.514 10.403 6.417 29.306 76.819-16.819 32.065 20.546v58.65l-31.991 20.767-76.919-16.365-6.243 29.343 47.575 10.122-39.902 25.902-35.42-7.536-6.243 29.343 26.826 5.708-5.707 26.826 29.344 6.243 7.536-35.421 39.903-25.903-10.122 47.575 29.343 6.243 16.365-76.918 31.626-20.529 44.032 22.016v37.016l-55.608 55.607 21.213 21.213 34.394-34.393v47.574l-25.607 25.606 21.213 21.213 19.394-19.393 19.393 19.393 21.213-21.213-25.606-25.607v-47.573l34.393 34.393 21.213-21.213-55.606-55.607v-37.016l44.084-22.042 31.796 20.374 16.82 76.82 29.306-6.417-10.403-47.513 40.056 25.666 7.746 35.375 29.306-6.417-5.866-26.792zm-179.636-91.728-45 22.5-45-22.5v-56.459l45-22.5 45 22.5z"></path>
                                    </g>
                                  </svg>
                                </span>
                                <span>AC</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container ps-0">
                            {/* <span className="checkmark"></span>Seater */}

                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="Seater"
                                name="seat"
                                checked={selectedCategory.includes(
                                  "seat:Seater"
                                )}
                              />
                              {/* <span className="checkmark"></span>Seater */}
                              <div>
                                <span className="checkedSVG pe-2">
                                  <svg
                                    id="fi_6151135"
                                    height="19"
                                    viewBox="0 0 128 128"
                                    width="19"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="41.77"
                                      cy="103.939"
                                      r="8.34"
                                      transform="matrix(.973 -.23 .23 .973 -22.763 12.377)"
                                    ></circle>
                                    <path d="m41.77 93.617a10.017 10.017 0 0 1 9.01 5.3 12.772 12.772 0 0 0 4.63-9.35 20.4 20.4 0 0 0 -3.1-11.82 100.4 100.4 0 0 1 -6.37-11.747 89.7 89.7 0 0 1 -6.81-21.64c-.24-1.32-.5-2.59-.78-3.79a9.427 9.427 0 0 0 -9.19-7.34c-.43 0-.82.04-1.24.08l-.16.01a11.208 11.208 0 0 0 -1.227.263v-4.083a9.215 9.215 0 0 0 9-7.995l1.467-11.105a9.214 9.214 0 0 0 -7.91-10.333c-.39-.05-8.49-1.026-10.34 7.92l-1.47 11.113a9.211 9.211 0 0 0 7.253 10.21v5.027a10.945 10.945 0 0 0 -5.7 13.153l15.25 49.56a10.19 10.19 0 0 1 7.687-3.433z"></path>
                                    <path d="m110.59 99.547a11.309 11.309 0 0 0 -4.45-7.73 11.54 11.54 0 0 0 -8.65-2.32l-41.37 5.52a14.06 14.06 0 0 1 -4.51 5.8 10.019 10.019 0 0 1 .5 3.14 10.354 10.354 0 0 1 -10.34 10.343c-.34 0-.67-.02-1-.05v4.24h62.36s9.151-3.902 7.46-18.943z"></path>
                                    <path d="m40.77 120.487v1.39a6.116 6.116 0 0 0 6.11 6.11h50.85a6.114 6.114 0 0 0 6.1-6.11v-1.45l-.09.06z"></path>
                                  </svg>
                                </span>
                                <span>Seater</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container ps-0">
                            {/* <span className="checkmark"></span>Sleeper */}

                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="Sleeper"
                                name="seat"
                                checked={selectedCategory.includes(
                                  "seat:Sleeper"
                                )}
                              />
                              {/* <span className="checkmark"></span>Seater */}
                              <div>
                                <span className="checkedSVG pe-2">
                                  <svg
                                    id="fi_9567116"
                                    height="19"
                                    viewBox="0 0 50 50"
                                    width="19"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="XMLID_3876_">
                                      <path
                                        id="XMLID_3879_"
                                        d="m4.9436 27.8333v-15.6249c0-1.0816-.8768-1.9584-1.9583-1.9584-1.0816 0-1.9584.8768-1.9584 1.9584v25.5833c0 1.0816.8768 1.9584 1.9584 1.9584 1.0815 0 1.9583-.8768 1.9583-1.9584v-3.6689l40.1129-.0943v3.6689c0 1.0816.8768 1.9584 1.9583 1.9584s1.9583-.8768 1.9583-1.9584v-3.6689-5.1227-1.1668z"
                                      ></path>
                                      <path
                                        id="XMLID_3878_"
                                        d="m48.9731 26.1557h-29.7708v-7.375c0-2.1401 1.7349-3.875 3.875-3.875h18.0729c4.3205 0 7.8229 3.5024 7.8229 7.8229z"
                                      ></path>
                                      <circle
                                        id="XMLID_3877_"
                                        cx="12.234"
                                        cy="20.531"
                                        r="4.781"
                                      ></circle>
                                    </g>
                                  </svg>
                                </span>
                                <span>Sleeper</span>
                              </div>
                            </div>
                          </label>
                        </div>
                        {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
                      </div>

                      <div className="busDepartureMain">
                        <h2 className="sidebar-title">Departure Time</h2>

                        <div>
                          <label className="sidebar-label-container  ps-0">
                            {/* <span className="checkmark"></span> */}

                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="before6AM"
                                name="departTime"
                                checked={selectedCategory.includes(
                                  "departTime:before6AM"
                                )}
                              />
                              <div>
                                <span className="checkedSVG pe-2">
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
                                <span>Before 6 AM</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container  ps-0">
                            {/* <span className="checkmark"></span> */}
                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="6AMto12PM"
                                name="departTime"
                                checked={selectedCategory.includes(
                                  "departTime:6AMto12PM"
                                )}
                              />
                              <div>
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
                                <span>6 AM - 12 PM</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container  ps-0">
                            {/* <span className="checkmark"></span> */}
                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="12PMto6PM"
                                name="departTime"
                                checked={selectedCategory.includes(
                                  "departTime:12PMto6PM"
                                )}
                              />
                              <div>
                                <span className="checkedSVG pe-2">
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
                                <span>12 PM - 6 PM</span>
                              </div>
                            </div>
                          </label>

                          <label className="sidebar-label-container  ps-0">
                            {/* <span className="checkmark"></span> */}
                            <div className="svgBOx">
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value="after6PM"
                                name="departTime"
                                checked={selectedCategory.includes(
                                  "departTime:after6PM"
                                )}
                              />
                              <div>
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
                                <span>After 6 PM</span>
                              </div>
                            </div>
                          </label>
                        </div>

                        {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
                      </div>

                      {/* <div>
                    <h2 className="sidebar-title">By Price</h2>

                    <div>
                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="800"
                          name="priceRange"
                          checked={selectedCategory.includes("priceRange:800")}
                        />
                        <span className="checkmark"></span>₹0 - 800
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="1200"
                          name="priceRange"
                          checked={selectedCategory.includes("priceRange:1200")}
                        />
                        <span className="checkmark"></span>₹800 - 1200
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="2000"
                          name="priceRange"
                          checked={selectedCategory.includes("priceRange:2000")}
                        />
                        <span className="checkmark"></span>₹1200 - 2000
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="3000"
                          name="priceRange"
                          checked={selectedCategory.includes("priceRange:3000")}
                        />
                        <span className="checkmark"></span>₹2000 - 3000
                      </label>
                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="3001"
                          name="priceRange"
                          checked={selectedCategory.includes("priceRange:3001")}
                        />
                        <span className="checkmark"></span>₹3000 and Above
                      </label>
                    </div>
                    <Divider
                      sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                    />
                  </div> */}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </motion.div>
          <motion.div className="col-lg-9">
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="row top_head"
            >
              {sortedAndFilteredResults &&
              sortedAndFilteredResults.length > 0 ? (
                sortedAndFilteredResults?.map((item, index) => {
                  const departureDate = dayjs(item?.DepartureTime);
                  const arrivalDate = dayjs(item?.ArrivalTime);

                  // Format the dates
                  const departureFormattedDate =
                    departureDate.format("DD MMM, YY");
                  const arrivalFormattedDate = arrivalDate.format("DD MMM, YY");
                  return (
                    <>
                      <motion.div
                        variants={variants}
                        className="col-lg-12 busResultBox"
                      >
                        <div className="busSearchOne">
                          <p>{item?.TravelName}</p>
                        </div>
                        <div className="busSearchTwo">
                          <div>
                            <div>
                              {/* <p>{item?.BoardingPointsDetails && item.BoardingPointsDetails.length > 0 && item.BoardingPointsDetails[0].CityPointLocation}</p> */}
                              <p>{busFullData?.Origin}</p>
                            </div>
                            <div>
                              {/* <p>{item?.DepartureTime?.slice(11, 16)}</p> */}
                              <p>
                                {dayjs(item?.DepartureTime).format("h:mm A")}
                              </p>
                            </div>
                            <div>
                              <span>{departureFormattedDate}</span>
                            </div>
                          </div>
                          <div className="busImage">
                            <img src={busArrow} />
                          </div>
                          <div>
                            <div>
                              {/* <p>{item?.DroppingPointsDetails && item.DroppingPointsDetails.length > 0 && item.DroppingPointsDetails[0].CityPointLocation}</p> */}
                              <p>{busFullData?.Destination}</p>
                            </div>
                            <div>
                              <p>{dayjs(item?.ArrivalTime).format("h:mm A")}</p>
                            </div>
                            <div>
                              <span>{arrivalFormattedDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="busSearchFour">
                          <div className="">
                            <p>₹ {item?.BusPrice?.BasePrice}</p>
                          </div>

                          <button
                            onClick={() => {
                              handleBuslayout(item?.ResultIndex);
                              setSub(true);
                              setSubIndex(index);
                            }}
                          >
                            {sub && subIndex === index ? (
                              <div className="buslodingBtn"></div>
                            ) : (
                              "Select Seat"
                            )}
                          </button>
                        </div>
                      </motion.div>
                      <div className="col-lg-12">
                        <div className="busType">
                          <p>{item?.BusType}</p>
                          <Busmoredetail />
                          <p>{item?.AvailableSeats} Seats Available</p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="filteredNotFound">
                  {/* <img src={busFilter} alt="filter image" /> */}
                  <h1>Result not found</h1>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Modal
        open={modal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          className="layOutParent"
          sx={{
            height: "600px",
            width: "800px",
            bgcolor: "background.paper",
            backdropFilter: "blur(5px)",
            border: "1px solid red",
            alignSelf: "center",
            opacity: 0.9,
            display: "flex",
          }}
        >
          {/* //seat div started */}
          <Box
            sx={{
              height: "100%",
              width: "60%",
            }}
          >
            <Box class="outerseat">
              <Box class="busSeatlft">
                <Box class="upper"></Box>
              </Box>
              <Box class="busSeatrgt">
                <Box class="busSeat">
                  <Box class="seatcontainer clearfix">
                    {layout?.map((item, index) => {
                      if (item?.type === "upper") {
                        const divStyle = {
                          top: item?.top || 0,
                          left: item?.left || 0,
                        };

                        return (
                          <Box
                            class={item?.class}
                            id={item?.id}
                            style={{
                              ...divStyle,
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              position: "absolute",
                              justifyContent: "center",
                              alignItems: "center",
                              border: `2px solid ${
                                item?.SeatType === 2 ? "green" : "blue"
                              }`, // Change the border color based on SeatType // Change the border color based on SeatType // Change the color based on SeatType
                            }}
                          >
                            <Checkbox
                              onChange={(e) =>
                                addOrRemoveSeat(e, upperArray?.[index], index)
                              }
                              disabled={
                                upperArray?.[index]?.SeatStatus === true
                                  ? false
                                  : true
                              }
                            />
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box class="outerlowerseat">
              <Box class="busSeatlft">
                <Box class="lower"></Box>
              </Box>
              <Box class="busSeatrgt">
                <Box class="busSeat">
                  <Box class="seatcontainer clearfix">
                    {layout?.map((item, index) => {
                      if (item?.type === "lower") {
                        const divStyle = {
                          top: item?.top || 0,

                          left: item?.left || 0,
                        };

                        return (
                          <Box
                            class={item?.class}
                            id={item?.id}
                            style={{
                              ...divStyle,
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              border: "1px solid red",
                              // padding: "2px",
                              position: "absolute",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              onChange={(e) =>
                                addOrRemoveSeat(
                                  e,
                                  lowerArray?.[index - upperArray.length],
                                  index
                                )
                              }
                              disabled={
                                lowerArray?.[index - upperArray.length]
                                  ?.SeatStatus === true
                                  ? false
                                  : true
                              }
                            />
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "50%",
              border: "3px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "80%",
                width: "100%",
                border: "2px solid black",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  paddingTop: "5px",
                  width: "70%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {" "}
                  <Typography>Seats:</Typography>
                  {blockedSeatArray?.map((seat, index) => {
                    return (
                      <Typography
                        sx={{
                          color: "blue",
                        }}
                      >
                        {seat?.SeatName}
                      </Typography>
                    );
                  })}
                </Box>
                <Box>
                  {() => {
                    const totalSeatPrice = blockedSeatArray.reduce(
                      (totalPrice, seat) => {
                        return totalPrice + (seat?.SeatFare || 0);
                      },
                      0
                    );
                    return (
                      <div style={{ display: "flex" }}>
                        <Typography>Price:</Typography>
                        <h2
                          style={{
                            color: "blue",
                            marginTop: "3px",
                            width: "20px",
                          }}
                        >
                          {totalSeatPrice}
                        </h2>
                      </div>
                    );
                  }}
                </Box>
              </Box>

              <Box
                style={{
                  width: "70%",
                  margin: "auto",
                  gap: "70px",
                  display: "flex",
                }}
              >
                <label>Origin</label>
                <select
                  value={selectedOrigin} // Bind the selected value to the state variable.
                  onChange={(e) => setSelectedOrigin(e.target.value)} // Use onChange to handle value changes.
                  style={{ borderRadius: "10px", width: "120px" }}
                >
                  {origin.map((name, index) =>
                    index === 0 ? (
                      <option key={index} selected value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>
                    ) : (
                      <option key={index} value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>
                    )
                  )}
                </select>
              </Box>

              <Box
                style={{
                  width: "70%",
                  margin: "auto",
                  marginTop: "20px",
                  display: "flex",
                  gap: "30px",
                }}
              >
                <label>Destination</label>
                <select
                  value={selectedDropPoint}
                  onChange={(e) => setSelectedDropPoint(e.target.value)}
                  style={{ borderRadius: "10px", width: "120px" }}
                >
                  {destination.map((name, index) =>
                    index === 0 ? (
                      <option key={index} selected value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>
                    ) : (
                      <option key={index} value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>
                    )
                  )}
                </select>
              </Box>

              <Box
                style={{
                  width: "60%",
                  display: "flex",
                  gap: "20px",
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                <Button
                  onClick={handleClose}
                  style={{ backgroundColor: "#21325D", color: "white" }}
                >
                  Close
                </Button>
                <Button
                  onClick={handleContinue}
                  style={{ backgroundColor: "#21325D", color: "white" }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Busdetail;

{
  /* <div className="row top_head">

  <div className="col-lg-2">
    <div>
      <p>{item?.TravelName}</p>
    </div>
  </div>
  <div className="col-lg-3">
    <div>

      <p>{item?.BusType}</p>
      <Busmoredetail />
    </div>
  </div>
  <div className="col-lg-1">
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#252525",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          paddingLeft: "10px",
        }}
      >
        {item?.DepartureTime?.slice(12, 16)}
      </Typography>
    </Box>
  </div>
  <div className="col-lg-1">
    <Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#252525",
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        {item?.ArrivalTime?.slice(12, 16)}
      </Typography>
    </Box>
  </div>

  <div className="col-lg-1">
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#252525",
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        {item?.AvailableSeats}
      </Typography>
    </Box>
  </div>
  <div className="col-lg-2">
    <Box>
      <Typography
        sx={{
          fontSize: "14px",

          color: "#000",
          display: "flex",
          alignItems: "left",
          textAlign: "left",
          fontFamily: "Montserrat",

          fontStyle: "normal",
          fontWeight: "500px"
        }}
      >
        ₹ {item?.BusPrice?.BasePrice}
      </Typography>
    </Box>
  </div>
  <div className="col-lg-2">
    <Box>
      <Button
        textAlign="left"
        onClick={() => handleBuslayout(item?.ResultIndex)}
        style={{ backgroundColor: "#21325D", color: "white", fontSize: "14px" }}
      >
        Book Now
      </Button>
    </Box>
  </div>
</div> */
}
