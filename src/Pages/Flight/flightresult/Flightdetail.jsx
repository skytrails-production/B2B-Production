import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fairrule from "./Fairrule";
import Nonrefundable from "./Nonrefundable";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useDispatch, useSelector, useReducer } from "react-redux";
import image from "../../../Images/FlightImages/1AC.png";
import SingleData from "./SingleData";
import MultipleData from "./MultipleData";
import { tokenAction } from "../../../Redux/ResultIndex/resultIndex";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FlightLoader from "../FlightLoader/FlightLoader";
import Divider from "@mui/material/Divider";

const Flightdetail = () => {
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results || reducerState?.return?.returnData?.data?.data?.Response?.Results;

  useEffect(() => {
    if (results === undefined || results?.length === 0) {
      navigate("/flights");
    }
  }, [results]);



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

  if (results === undefined || results.length === 0) {
    return (<div><FlightLoader /></div>)
  }



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




  // console.log(selectedCategory, "selected")



  const filteredData = results[0]?.filter((item) => {
    const segmentLength = item?.Segments[0].length;
    const depTime = new Date(item?.Segments?.[0][0]?.Origin?.DepTime);
    const hour = depTime.getHours();
    const airlineName = item?.Segments?.[0][0]?.Airline?.AirlineName
    const categoryFilters = selectedCategory.map((category) => {
      switch (category) {
        case "1":
          return segmentLength === 1;
        case "2":
          return segmentLength === 2;
        case "before6AM":
          return hour < 6;
        case "6AMto12PM":
          return hour >= 6 && hour < 12;
        case "12PMto6PM":
          return hour >= 12 && hour < 18;
        case "after6PM":
          return hour >= 18;
        default:
          return airlineName === category;
      }
    });
    return categoryFilters.every((filter) => filter);
  });


  // const filteredData = results[0]?.filter((item) => {
  //   const segmentLength = item?.Segments[0].length;
  //   const depTime = new Date(item?.Segments?.[0][0]?.Origin?.DepTime);
  //   const hour = depTime.getHours();

  //   return (
  //     selectedCategory === null ||
  //     selectedCategory === item?.Segments?.[0][0]?.Airline?.AirlineName ||
  //     (selectedCategory === "1" && segmentLength === 1) ||
  //     (selectedCategory === "2" && segmentLength === 2) ||
  //     (selectedCategory === "before6AM" && hour < 6) ||
  //     (selectedCategory === "6AMto12PM" && hour >= 6 && hour < 12) ||
  //     (selectedCategory === "12PMto6PM" && hour >= 12 && hour < 18) ||
  //     (selectedCategory === "after6PM" && hour >= 18) ||
  //     (selectedCategory === "" && true)
  //   );
  // })

  const newFilteredData = [filteredData];

  return newFilteredData?.map((res) => {
    let result = res;
    result =
      filter === 1
        ? res.sort((a, b) => a.Fare.OfferedFare - b.Fare.OfferedFare)
        : res.sort(
          (a, b) =>
            a.Segments[0].map((i) => i.Duration) -
            b.Segments[0].map((i) => i.Duration)
        );


    return (
      <div div className="row">
        <div className="col-lg-3">
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
              <div style={{ color: '#0048FF', textDecoration: 'underline', textAlign: "right", paddingRight: "15px" }} >

              </div>
              <AccordionDetails>
                <div className="flightFilterBox">
                  <div className="filterTitle">
                    <p>Select Filters</p>
                  </div>
                  <div className="innerFilter">
                    <div>
                      <h2 className="sidebar-title">Suggesterd to you</h2>

                      <div>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="All" name="test" />
                          <span className="checkmark"></span>All
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="1" name="test" />
                          <span className="checkmark"></span>Non Stop
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="2" name="test" />
                          <span className="checkmark"></span>One Stop
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="SpiceJet" name="test" />
                          <span className="checkmark"></span>SpiceJet
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="Vistara" name="test" />
                          <span className="checkmark"></span>Vistara
                        </label>

                      </div>
                      <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                    </div>

                    <div>
                      <h2 className="sidebar-title">Departure Time</h2>

                      <div>
                        <label className="sidebar-label-container">
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value="before6AM"
                            name="test"
                          />
                          <span className="checkmark"></span>Before 6 AM
                        </label>

                        <label className="sidebar-label-container">
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value="6AMto12PM"
                            name="test"
                          />
                          <span className="checkmark"></span>6 AM - 12 PM
                        </label>

                        <label className="sidebar-label-container">
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value="12PMto6PM"
                            name="test"
                          />
                          <span className="checkmark"></span>12 PM - 6 PM
                        </label>

                        <label className="sidebar-label-container">
                          <input
                            type="checkbox" onChange={handleRadioChange}
                            value="after6PM"
                            name="test"
                          />
                          <span className="checkmark"></span>After 6 PM
                        </label>
                      </div>

                      <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                    </div>

                    <div>
                      <h2 className="sidebar-title">Airlines</h2>

                      <div>
                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="Air India" name="test" />
                          <span className="checkmark"></span>Air India
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="Indigo" name="test" />
                          <span className="checkmark"></span>Indigo
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="SpiceJet" name="test" />
                          <span className="checkmark"></span>SpiceJet
                        </label>

                        <label className="sidebar-label-container">
                          <input type="checkbox" onChange={handleRadioChange} value="Vistara" name="test" />
                          <span className="checkmark"></span>Vistara
                        </label>

                      </div>
                      <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                    </div>



                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

          </div>
        </div>
        <div className="col-lg-9">
          <div className="flgihtdetailsTabBox">
            <div className={`flightdetailsTabs ${filter === 1 ? "flightdetailsTabsActive" : ""}`} onClick={() => setFilter(1)}>
              Cheapest
            </div>
            <div className={`flightdetailsTabs ${filter === 2 ? "flightdetailsTabsActive" : ""}`} onClick={() => setFilter(2)}>
              Fastest
            </div>
            <div className={`flightdetailsTabs ${filter === 3 ? "flightdetailsTabsActive" : ""}`} onClick={() => setFilter(3)}>
              Best
            </div>
          </div>
          {result?.map((flight1) => {
            const ResultIndex = flight1.id || flight1?.ResultIndex;
            return (
              <div key={ResultIndex} >
                {flight1?.Segments?.map((flight, Index) => {
                  const length = flight.length;
                  return length === 1 ? (
                    <SingleData
                      flight={flight[0]}
                      stop={length}
                      index={ResultIndex}
                      fare={flight1?.Fare?.PublishedFare}
                      IsLCC={flight1.IsLCC}
                    />
                  ) : (
                    <MultipleData
                      flight={flight}
                      stop={length}
                      index={ResultIndex}
                      fare={flight1?.Fare?.PublishedFare}
                      IsLCC={flight1.IsLCC}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

export default Flightdetail;
