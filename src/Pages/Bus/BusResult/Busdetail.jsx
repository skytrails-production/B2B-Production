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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import dayjs from "dayjs";
import busArrow from '../../../Images/busArrow.png'
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import {swalModal} from "../../../utils/swal"


const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
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
  // console.log(reducerState)
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  // console.log(busFullData);
  const busDataResult =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
      ?.BusResults;
  // console.log("bus res", busDataResult);
  useEffect(() => {
    if (busDataResult === undefined) {
      navigate("/")
    }
    // console.warn("busDataResult", busDataResult)
  }, [])
  useEffect(() => {
    if (seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorCode !== 0 && seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorCode !== undefined) {
      // swalModal("bus",seatLayoutData?.data?.GetBusSeatLayOutResult?.Error?.ErrorMessage,false)
      swalModal("bus","Your bus reservation couldn't be processed. Double-check your details and attempt booking again.",false)
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
      navigate("/")
    }

  }, [seatLayoutData])



  const handleBuslayout = async (resultIndex) => {
    // console.log("resultIndexxxxxxxxxxxx", resultIndex);


    const requestData = {
      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: resultIndex,
      TraceId: busFullData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
    };

    try {

      axios.post(`${apiURL.baseURL}/skyTrails/bus/seatlayout`, requestData, {
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
              setSelectedOrigin(item?.BoardingPointsDetails[0]?.CityPointIndex)
              setSelectedDropPoint(item?.DroppingPointsDetails[0]?.CityPointIndex)
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
      blockedSeatArray.length === 0 || selectedOrigin === "" || destination.length === 0 ||
      selectedDropPoint === "" || origin === ""
    ) {
      return
    }
    const dataToSave = await {
      blockedSeatArray: blockedSeatArray,
      selectedOrigin: Number(selectedOrigin)
      ,
      selectedDropPoint: Number(selectedDropPoint)
      ,
      resultIndex: resulttIndex,
    };

    // Save the combined state object to session storage
  await  sessionStorage.setItem("seatData", JSON.stringify(dataToSave));
    console.warn(selectedOrigin, selectedDropPoint, "selectedOrigin,selectedDropPoint")
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

  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setExpanded(false);
      } else {
        setExpanded('panel1');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };


  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      // If other checkbox is selected, update selectedCategory as before
      setSelectedCategory((prevSelectedCategory) => {
        if (prevSelectedCategory.includes(selectedValue)) {
          return prevSelectedCategory.filter((value) => value !== selectedValue);
        } else {
          return [...prevSelectedCategory, selectedValue];
        }
      });
    }
  };

  // console.log(selectedCategory, "selected category")

  const sortedAndFilteredResults = busDataResult?.filter((item) => {
    const depTime = new Date(item?.DepartureTime);
    const hour = depTime.getHours();

    const categoryFilters = selectedCategory?.map((category) => {
      switch (category) {
        case "before6AM":
          return hour < 6;
        case "6AMto12PM":
          return hour >= 6 && hour < 12;
        case "12PMto6PM":
          return hour >= 12 && hour < 18;
        case "after6PM":
          return hour >= 18;
        case "Non AC":
          return item?.BusType?.toLowerCase().includes("non a/c");
        case "AC":
          return !item?.BusType?.toLowerCase().includes("non a/c");
        case "Sleeper":
          return item?.BusType?.toLowerCase().includes("sleeper");
        case "Seater":
          return item?.BusType?.toLowerCase().includes("seater");
        case "800":
          return item?.BusPrice?.PublishedPriceRoundedOff <= 800;
        case "1200":
          return item?.BusPrice?.PublishedPriceRoundedOff > 800 && item?.BusPrice?.PublishedPriceRoundedOff <= 1200;
        case "2000":
          return item?.BusPrice?.PublishedPriceRoundedOff > 1200 && item?.BusPrice?.PublishedPriceRoundedOff <= 2000;
        case "3000":
          return item?.BusPrice?.PublishedPriceRoundedOff > 2000 && item?.BusPrice?.PublishedPriceRoundedOff <= 3000;
        case "3001":
          return item?.BusPrice?.PublishedPriceRoundedOff > 3000;
        default:
          return true;
      }
    });

    return categoryFilters?.every((filter) => filter);
  }).sort(
    (a, b) =>
      sortOption === "lowToHigh"
        ? a?.BusPrice?.PublishedPriceRoundedOff - b?.BusPrice?.PublishedPriceRoundedOff
        : b?.BusPrice?.PublishedPriceRoundedOff - a?.BusPrice?.PublishedPriceRoundedOff
  );


  return (
    <>

      <div className="container-xxl margin-pecentage">
        <div className="row">
          <motion.div initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} className="col-lg-3 mt-2">

            <div className="packResFilterBox" >
              <Accordion ref={accordionRef} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ width: '100%', border: "none" }}
                >
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                    <Typography style={{
                      fontFamily: 'Montserrat',
                      fontSize: '12px',
                      fontWeight: '400',
                      textAlign: 'center'

                    }} ><FilterAltIcon style={{ fontWeight: "600", fontFamily: "Montserrat", fontSize: '14px' }} /> Filter</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flightFilterBox">
                    <div className="filterTitle">
                      <p>Select Filters</p>
                    </div>
                    <div className="innerFilter">


                      <div>
                        <h2 className="sidebar-title">Sort By</h2>
                        <select className="highSelect" value={sortOption} onChange={handleSortChange}>
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                        </select>
                      </div>

                      <div>
                        <h2 className="sidebar-title">Suggesterd to you</h2>

                        <div>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="All" name="test" />
                            <span className="checkmark"></span>All
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="Non AC" name="test" />
                            <span className="checkmark"></span>Non AC
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="AC" name="test" />
                            <span className="checkmark"></span>AC
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="Seater" name="test" />
                            <span className="checkmark"></span>Seater
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="Sleeper" name="test" />
                            <span className="checkmark"></span>Sleeper
                          </label>

                        </div>
                        <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
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

                        <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                      </div>

                      <div>
                        <h2 className="sidebar-title">By Price</h2>

                        <div>
                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="800" name="test" />
                            <span className="checkmark"></span>₹0 - 800
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="1200" name="test" />
                            <span className="checkmark"></span>₹800 - 1200
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="2000" name="test" />
                            <span className="checkmark"></span>₹1200 - 2000
                          </label>

                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="3000" name="test" />
                            <span className="checkmark"></span>₹2000 - 3000
                          </label>
                          <label className="sidebar-label-container">
                            <input type="checkbox" onChange={handleRadioChange} value="3001" name="test" />
                            <span className="checkmark"></span>₹3000 and Above
                          </label>

                        </div>
                        <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                      </div>

                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

            </div>
          </motion.div>
          <motion.div className="col-lg-9">
            <motion.div variants={variants} initial="initial"
              whileInView="animate" className="row top_head">
              {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
                sortedAndFilteredResults?.map((item, index) => {

                  const departureDate = dayjs(item?.DepartureTime);
                  const arrivalDate = dayjs(item?.ArrivalTime);

                  // Format the dates
                  const departureFormattedDate = departureDate.format("DD MMM, YY");
                  const arrivalFormattedDate = arrivalDate.format("DD MMM, YY");
                  return (
                    <>
                      <motion.div variants={variants} className="col-lg-12 busResultBox">
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
                              <p>{dayjs(item?.DepartureTime).format("h:mm A")}</p>
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

                          <button onClick={() => {
                            handleBuslayout(item?.ResultIndex); setSub(true);
                            setSubIndex(index);
                          }}>{(sub && subIndex === index) ? <div className="buslodingBtn" ></div> : 'Select Seat'}</button>

                        </div>
                      </motion.div>
                      <div className="col-lg-12">
                        <div className="busType">
                          <p>{item?.BusType}</p>
                          <Busmoredetail />
                          <p>{item?.AvailableSeats} {' '}Seats Available</p>
                        </div>
                      </div>
                    </>
                  );
                })

              ) :

                (
                  <div className="filteredNotFound">
                    {/* <img src={busFilter} alt="filter image" /> */}
                    <h1>Result not found</h1>
                  </div>
                )
              }
            </motion.div>
          </motion.div>
        </div>
      </div >



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
                              border: `2px solid ${item?.SeatType === 2 ? "green" : "blue"
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
                  {(() => {
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
                  })}
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
                  {origin.map((name, index) => (
                    (index === 0 ? <option key={index} selected value={name?.CityPointIndex}>
                      {name?.CityPointName}
                    </option> :

                      <option key={index} value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>)
                  ))}
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
                  {destination.map((name, index) => (

                    (index === 0 ? <option key={index} selected value={name?.CityPointIndex}>
                      {name?.CityPointName}
                    </option> :

                      <option key={index} value={name?.CityPointIndex}>
                        {name?.CityPointName}
                      </option>)
                  ))}
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




{/* <div className="row top_head">

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
</div> */}