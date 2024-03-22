import React, { useEffect, useState, useRef } from "react";
import interchange from "../../../Images/interchange.png";
import FlightIcon from "@mui/icons-material/Flight";
import { useDispatch, useSelector, useReducer } from "react-redux";
import {
  clearOneWayReducer,
  oneWayAction,
} from "../../../Redux/FlightSearch/OneWay/oneWay";
import {
  clearOneWayEMTReducer,
  oneWayEMTAction,
} from "../../../Redux/FlightSearch/OneWayEMT/oneWayEMT";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { clearPassengersReducer } from "../../../Redux/Passengers/passenger";
import "./OneWay.css";
import { motion, useAnimation } from "framer-motion";
import DatePicker from "react-datepicker";


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


const OneWay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const inputRef = useRef(null);
  const listFromRef = useRef(null);
  const listToRef = useRef(null);

  const [validationError, setValidationError] = useState("");

  // console.log("reducerState", reducerState);

  // multiselect conditions
  const [isLoading, setIsLoading] = useState(false);
  const [fromSearchResults, setFromSearchResults] = useState([]);
  const [toSearchResults, setToSearchResults] = useState([]);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [from, setFrom] = useState("");
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [to, setTO] = useState("");
  const [selectedTo, setSelectedTo] = useState(null);
  const [displayFrom, setdisplayFrom] = useState(true);
  const [displayTo, setdisplayTo] = useState(true);

  // error show

  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [dateError, setDateError] = useState("");
  const [toggleFrom, setToggleFrom] = useState(false)
  const [toggleTo, setToggleTo] = useState(false)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listToRef.current && !listToRef.current.contains(event.target)) {
        // Clicked outside the list, so close it
        setToggleTo(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listToRef]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listFromRef.current && !listFromRef.current.contains(event.target)) {
        setToggleFrom(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [listFromRef])

  // useEffect(() => {
  //   clearPassengersReducer();
  //   let mounted = true;

  //   const fetchSearchResults = async () => {
  //     setIsLoading(true);

  //     // make an API call to get search results

  //     const results = await axios.get(
  //       `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${fromQuery}`
  //     );
  //     if (mounted) {
  //       setFromSearchResults(results?.data?.data);
  //       setIsLoading(false);
  //     }
  //   };


  //   return () => {
  //     mounted = false;
  //   };
  // }, [fromQuery]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      // make an API call to get search results
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${fromQuery}`);
      setFromSearchResults(results?.data?.data);

    }
    const getData = setTimeout(() => {
      if (fromQuery.length >= 2) {
        fetchSearchResults();
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [fromQuery])

  useEffect(() => {
    const fetchSearchResults = async () => {
      // make an API call to get search results
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${toQuery}`);
      setToSearchResults(results?.data?.data);

    }
    const getData = setTimeout(() => {
      if (toQuery.length >= 2) {
        fetchSearchResults();
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [toQuery]);

  // Get the current date in the format "YYYY-MM-DD"
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    inputRef.current.value = today;
    inputRef.current.min = currentDate;
  }, []);

  useEffect(() => {
    dispatch(clearOneWayReducer());
    // dispatch(clearOneWayEMTReducer());
  }, [dispatch]);

  const handleFromClick = (result) => {
    setFrom(result.AirportCode);
    setSelectedFrom(result);
    setToggleFrom(false)
  }

  const handleToClick = (result) => {
    setTO(result.AirportCode);
    setSelectedTo(result);
    // setdisplayTo(false);
    setToggleTo(false);
  };

  const handleClick = () => {
    // console.log("Button CLicked");
    // inputRef.current.click();
    setDateError("");
  };

  // end

  const handleFromInputChange = (event) => {
    setFrom(event.target.value);
    setSelectedFrom(null);
    setFromError("");
  };

  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  const handleToInputChange = (event) => {
    setTO(event.target.value);
    setSelectedTo(null);
    setToError("");
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };
  const validateDeparture = (departure) => {
    const result1 = fromSearchResults.filter((item) => item.id === departure)
    const result2 = toSearchResults.filter((item) => item.id === departure)
    const result = (result1.length > 0 || result2.length > 0) ? true : false;
    // console.log(result1.length, "result1.....")

    return result

  }
  const validateArival = (departure) => {
    const result1 = toSearchResults.filter((item) => item.id === departure)
    const result2 = fromSearchResults.filter((item) => item.id === departure)
    const result = (result1.length > 0 || result2.length > 0) ? true : false;
    // console.log(result1.length, "result2.....")

    return result

  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const adultCount = formData.get("adult");
    const infantCount = formData.get("infant");
    const childCount = formData.get("child");
    // console.log(+adultCount + +infantCount + +childCount, "check")
    if (Number(adultCount) + Number(childCount) > 9) {
      alert(adultCount + childCount)
      setValidationError("Total Number of passenger should be less then 9");
      return;
    }
    if (Number(adultCount) < Number(infantCount)) {
      setValidationError("Infant count should be less than adult count");
      return;
    }

    if (!validateDeparture(formData.get("from")) || formData.get("from") === "") {
      setFromError("Enter A Valid Destination City");
      // console.warn(validateDeparture(formData.get("from")), "Enter A Valid Destination City")

      // alert("Enter A Valid Destination City")
      return;
    }
    if (!validateArival(formData.get("to")) || formData.get("to") === "") {
      setToError("Enter A Valid Arrival City");
      // alert("Enter A Valid Destination City")
      return;
    }
    // validateDeparture(formData.get("from"))


    if (!formData.get("to")) {
      setToError("Enter Arrival City");
      return;
    }
    if (!formData.get("departure")) {
      setDateError("Select Date");
      return;
    }

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: formData.get("adult"),
      ChildCount: formData.get("child"),
      InfantCount: formData.get("infant"),
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: "1",
      PreferredAirlines: null,
      Segments: [
        {
          Origin: formData.get("from"),
          Destination: formData.get("to"),
          FlightCabinClass: formData.get("class"),
          PreferredDepartureTime: formData.get("departure"),
          PreferredArrivalTime: formData.get("departure"),
        },
      ],
      Sources: null,
    };
    const emtPayload = {
      Adults: formData.get("adult"),
      Authentication: {
        Password: "EMT@uytrFYTREt",
        UserName: "EMTB2B",
        IpAddress: reducerState?.ip?.ipData,
      },
      Cabin: 0,
      Childs: formData.get("child"),
      FlightSearchDetails: [
        {
          BeginDate: formData.get("departure"),
          Origin: formData.get("from"),
          Destination: formData.get("to"),
        },
      ],
      Infants: formData.get("infant"),
      TraceId: "EMTB2B73fd0ca9fcf4436cbe8b59fded57e616",
      TripType: 0,
    };
    sessionStorage.setItem("adults", formData.get("adult"));
    sessionStorage.setItem("childs", formData.get("child"));
    sessionStorage.setItem("infants", formData.get("infant"));
    // console.log(payload, emtPayload);
    dispatch(oneWayAction(payload));
    // dispatch(oneWayEMTAction(emtPayload));
  }
  const handleRoundClick = async () => {
    const temp = await [from]
    await setFrom(to)
    await setTO(temp)
  }
  // style={{ width: "305px", height: "56px", position: "relative" }}
  // style={{ width: "305px", height: "56px" }}
 
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date) => setStartDate(date);
  const currentDate = new Date();
  
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="formFlightSearchOneWay" >
        <div className="container">

          <motion.div className="row rowcon" variants={variants} initial="initial"
            whileInView="animate">
            <motion.div variants={variants} className="col-xs-12 col-md-4 ps-0 mb-3 ">
              <div className="form_input " >

                <label className="form_lable">Departure</label>
                <input
                  name="from"
                  placeholder="Enter city or airport"
                  value={from}
                  onClick={() => { setToggleFrom(true); setToggleTo(false) }}
                  onChange={(event) => {
                    handleFromInputChange(event);
                    handleFromSearch(event.target.value);
                    // console.warn(fromSearchResults, "fromSearchResults")
                  }}
                  autoComplete="off"
                />
                {fromError !== "" && <span className="error">{fromError}</span>}
                {/* {isLoading && <div>Loading...</div>} */}
                {toggleFrom && (
                  <div
                    className="chooseAbsBox"
                    style={{ display: "block" }}
                    ref={listFromRef}
                  >
                    <ul>
                      <div className="chooseAbs">
                        {fromSearchResults.map((result) => (
                          <li
                            key={result._id}
                            onClick={() => handleFromClick(result)}
                          >
                            <strong>{result.AirportCode}</strong>{" "}
                            {result.name} {result.code}
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div onClick={() => handleRoundClick()} variants={variants} className="col-md-1 d-flex justify-content-center interchange ps-0 ">
              <img src={interchange} alt="name" className="align-self-center" />

            </motion.div>
            <motion.div variants={variants} className="col-xs-12 col-md-4 ps-0 mb-3">
              <div className="form_input " style={{ zIndex: 10, position: "relative" }}>

                <label className="form_lable">Arrival</label>
                <input
                  name="to"
                  placeholder="Enter city or airport"
                  value={to}
                  onClick={() => (setToggleTo(true))}
                  // onMouseLeave={() => (
                  //   setdisplayFrom(false),
                  //   setdisplayTo(false)
                  // )}
                  onChange={(event) => {
                    handleToInputChange(event);
                    handleToSearch(event.target.value);
                  }}
                  autoComplete="off"
                  style={{ border: "2px solid red" }}
                />
                {toError !== "" && <span className="error">{toError}</span>}
                {/* {isLoading && <div>Loading...</div>} */}
                {toggleTo && (
                  <div
                    className="chooseAbsBox"
                    style={{ display: "block" }}
                    ref={listToRef}
                  >
                    <ul>
                      <div className="chooseAbs">
                        {toSearchResults.map((result) => (
                          <li
                            key={result._id}
                            onClick={() => handleToClick(result)}
                          >
                            <strong>{result.AirportCode}</strong>{" "}
                            {result.name} {result.code}
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={variants} className="col-xs-12 col-md-3 ps-0 mb-3">
              <div className="form_input" onClick={handleClick}>
                <label className="form_lable">Departure Date</label>
                <DatePicker
                  type="date"
                  name="departure"
                  id="departure"
                  selected={startDate}
                  onChange={handleDateChange}
                 
                  ref={inputRef}
                  className="deaprture_input"
                  dateFormat="dd MMMyy"
                  minDate={startDate}
                // Use defaultValue to set the initial value

                />
                {dateError !== "" && <span className="error">{dateError}</span>}
              </div>
            </motion.div>
          </motion.div>


          <motion.div className="row" variants={variants} initial="initial"
            whileInView="animate">
            <motion.div variants={variants} className=" col-md-3 col-lg-4 col-sm-12 col-12 mb-3 ps-0">
              <div className="form_input">
                <label className="form_lable">Adult(12+ Yrs)</label>
                <select name="adult" id="" className="form_input_select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={variants} className=" col-md-3 col-lg-4 col-sm-12 col-12 mb-3 ps-0">
              <div className="form_input">
                <label className="form_lable">Child(2-12 Yrs)</label>
                <select name="child" id="" className="form_input_select">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </motion.div>
            <motion.div variants={variants} className=" col-md-3 col-lg-4 col-sm-12 col-12 mb-3 ps-0">
              <div className="form_input">
                <label className="form_lable">Infant({"<"} 2 Yrs)</label>
                <select name="infant" id="" className="form_input_select">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={variants} className=" col-md-3 col-lg-3 col-sm-12 col-12 mb-3 ps-0">
              <div className="form_input">
                <label className="form_lable">Class</label>
                <select name="class" id="" className="form_input_select">
                  <option value="1">All</option>
                  <option value="2">Ecomomy</option>
                  <option value="3">Premimum Economy</option>
                  <option value="4">Business</option>
                  <option value="5">Premimum Business</option>
                  <option value="6">First</option>
                </select>
              </div>
            </motion.div>



            <div className="col-xs-12">
              <div className="row bottom-row">
                {/* <div variants={variants} className="col-md-6 col-lg-6 col-12 col-sm-12 mb-3 ps-0">
                  <div className="form_input mb-0">
                    <label className="form_lable">Preferred Airline</label>
                    <select name="adult" id="" className="form_input_select1">
                      <option value="1">Select Airline </option>
                      <option value="2">Indigo</option>
                      <option value="3">Vistara</option>
                      <option value="4">SpiceJet</option>
                      <option value="5">Air India</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                </div> */}


                <div variants={variants} className="col-md-6 col-lg-6 col-12 col-sm-12 mb-3 ps-0" style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <button
                    type="submit"
                    className="flightFormSubmit-new" style={{display:"flex", justifyContent:"center", border:"none"}}>Search Flight <FlightIcon /></button>

                </div>
              </div>
            </div>
            <p class="validationError">{validationError}</p>
          </motion.div>


          {/* <label
      style={{
        fontSize: "20px",
        fontWeight: "400",
        marginBottom: '15px',
        border: '1px solid grey',
        padding: '10px',
        display: 'inline-block',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      Restrict my Search to:{" "}
      <span style={{ color: "#00BDC4" }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
          style={{ marginRight: "5px", width: '18px', height: '18px' }}
        />
        Select All / Unselect All
      </span>
    </label>

        <Box >
          <div>
            <div className="grid-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
              {options.map(({ label, value }) => (
                <label key={value} style={{width:'190px',height:'30px',gap:'10px',display:'flex'}}>
                  <input
                    type="checkbox"
                    value={label}
                    checked={selectAll ? true : selected.includes(label)}
                    onChange={handleCheckboxChange}
                    disabled={selectAll}
                    className="me-1"
                    style={{ width: '18px', height: '18px' }}
                  />
                   <p style={{marginTop:'-2px'}}>{label} </p>  
                </label>
              ))}
            </div>
          </div>
        </Box> */}

          {/* <Box className="row">
          <Flex direction="row" justifyContent="center">
            <button type="submit" id="cssbuttons-io-button">
              {" "}
              Search Flight
              <div id="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </Flex>
        </Box> */}
        </div>
      </form>
    </div>
  );
};

export default OneWay;
