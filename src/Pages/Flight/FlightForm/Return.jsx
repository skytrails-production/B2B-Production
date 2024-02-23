import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import "./Return.css";
import transfer from "../../../Images/transfer.png";
import interchange from '../../../Images/interchange.png'
// import { fontWeight } from '@mui/system'
import { Button } from "react-bootstrap";
import { Grid, GridItem, Flex, Box } from "@chakra-ui/react";
import "./OneWay.css";
import FlightIcon from '@mui/icons-material/Flight';
import { useDispatch, useSelector, useReducer } from "react-redux";
import {
  clearReturnReducer,
  returnAction,
} from "../../../Redux/FlightSearch/Return/return";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { Stack } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";

const options = [
  { label: "GPS", value: "1" },
  { label: "Fly Dubai", value: "2" },
  { label: "Air Arobia", value: "3" },
  { label: "Zoom Air", value: "4" },
  { label: "Other untl LCC", value: "5" },
  { label: "Air Asia", value: "6" },
  { label: "Air India Express", value: "7" },
  { label: "Air Cost", value: "8" },
  { label: "NokScoot", value: "9" },
  { label: "Salman Air", value: "10" },
  { label: "Inter Sky", value: "11" },
  { label: "Triger Airways", value: "12" },
  { label: "SpiceJet", value: "13" },
  { label: "GOFIRTS", value: "14" },
  { label: "Alliance Air", value: "15" },
  { label: "Akasa Air", value: "16" },
  { label: "Fly Scoot", value: "17" },
  { label: "Indigo", value: "18" },
  { label: "Bhutan Airlines", value: "19" },
  { label: "TruJet", value: "20" },
  { label: "Mega Maldives", value: "21" },
];





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



const Return = () => {




  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isLoading, setIsLoading] = useState(false);
  const [fromSearchResults, setFromSearchResults] = useState([]);
  const [toSearchResults, setToSearchResults] = useState([]);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [from, setFrom] = useState("");
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [to, setTO] = useState("");
  const [selectedTo, setSelectedTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(""); // To store the selected departure date
  const [returnDate, setReturnDate] = useState(""); // To store the selected return date
  const [minReturnDate, setMinReturnDate] = useState(""); // To store the minimum return date
  const [displayFrom, setdisplayFrom] = useState(false);
  const [displayTo, setdisplayTo] = useState(true);


  // error show

  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [dateError, setDateError] = useState("");
  const [sub, setSub] = useState(false);
  const listFromRef = useRef(null);
  const listToRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listFromRef.current && !listFromRef.current.contains(event.target)) {
        setdisplayFrom(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [listFromRef])
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listToRef.current && !listToRef.current.contains(event.target)) {
        setdisplayTo(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [listToRef])


  // useEffect(() => {
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

  //   if (fromQuery.length >= 2) {
  //     fetchSearchResults();
  //   }
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



  // useEffect(() => {
  //   let mounted = true;

  //   const fetchSearchResults = async () => {
  //     setIsLoading(true);

  //     // make an API call to get search results

  //     const results = await axios.get(
  //       `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${toQuery}`
  //     );
  //     if (mounted) {
  //       setToSearchResults(results?.data?.data);
  //       setIsLoading(false);
  //     }
  //   };

  //   if (toQuery.length >= 2) {
  //     fetchSearchResults();
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  // }, [toQuery]);
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

  useEffect(() => {
    dispatch(clearReturnReducer());
  }, [dispatch]);


  const handleFromClick = (result) => {
    setFrom(result.AirportCode);
    setSelectedFrom(result);
    setdisplayFrom(false);
  };

  const handleToClick = (result) => {
    setTO(result.AirportCode);
    setSelectedTo(result);
    setdisplayTo(false);
  };
  function handleCheckboxChange(event) {
    const { value } = event.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  function handleSelectAllChange(event) {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelected(options.map((item) => item.label));
    } else {
      setSelected([]);
    }
  }

  const handleFromInputChange = (event) => {
    setFrom(event.target.value);
    setSelectedFrom(null);
  };
  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  const handleToInputChange = (event) => {
    setTO(event.target.value);
    setSelectedTo(null);
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };
  const handleDepartureDateChange = (event) => {
    const selectedDepartureDate = event.target.value;
    setDepartureDate(selectedDepartureDate);


    // Calculate the minimum return date (1 day after the selected departure date)
    const newMinReturnDate = new Date(selectedDepartureDate);
    newMinReturnDate.setDate(newMinReturnDate.getDate());
    if (returnDate && returnDate < selectedDepartureDate) {
      setReturnDate(selectedDepartureDate)

    }
    setMinReturnDate(newMinReturnDate.toISOString().split("T")[0]);
  };
  const validateDeparture = (departure) => {
    const result1 = fromSearchResults.filter((item) => item.id === departure)
    const result = result1.length > 0 ? true : false;
    // console.log(result1.length, "result1.....")

    return result

  }
  const validateArive = (departure) => {
    const result1 = toSearchResults.filter((item) => item.id === departure)
    const result = result1.length > 0 ? true : false;
    // console.log(result1.length, "result2.....")

    return result

  }
  function handleSubmit(event) {
    event.preventDefault();
    setSub(true)
    const formData = new FormData(event.target);
    // if (!formData.get("from")) {
    //   setFromError("Enter Destination City");
    //   return;
    // }
    if (!validateDeparture(formData.get("from")) || formData.get("from") === "") {
      setFromError("Enter A Valid Destination City");
      console.warn(validateDeparture(formData.get("from")), "Enter A Valid Destination City")
      setTimeout(() => {
        setFromError("")
      }, 5000);

      // alert("Enter A Valid Destination City")
      return;
    }
    if (!validateArive(formData.get("to")) || formData.get("to") === "") {
      setToError("Enter A Valid Arival City");
      console.warn(toError, validateDeparture(formData.get("to")), "Enter A Valid Arival City")
      setTimeout(() => {
        setToError("")
      }, 5000);

      // alert("Enter A Valid Destination City")
      return;
    }
    // if (!formData.get("to")) {
    //   setToError("Enter Arrival City");
    //   return;
    // }
    // if (!formData.get("departure")) {
    //   setDateError("Select Date");
    //   return;
    // }
    // if (!formData.get("return")) {
    //   setDateError("Select Date");
    //   return;
    // }
    if (formData.get("departure") === "" || formData.get("return") === "") {
      return
    }


    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: formData.get("adult"),
      ChildCount: formData.get("child"),
      InfantCount: formData.get("infant"),
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: "2",
      PreferredAirlines: null,
      Segments: [
        {
          Origin: formData.get("from"),
          Destination: formData.get("to"),
          FlightCabinClass: formData.get("class"),
          PreferredDepartureTime: formData.get("departure"),
          PreferredArrivalTime: formData.get("departure"),
        },
        {
          Origin: formData.get("to"),
          Destination: formData.get("from"),
          FlightCabinClass: formData.get("class"),
          PreferredDepartureTime: formData.get("departure1"),
          PreferredArrivalTime: formData.get("departure1"),
        },
      ],
      Sources: null,
    };

    sessionStorage.setItem("adults", formData.get("adult"));
    sessionStorage.setItem("childs", formData.get("child"));
    sessionStorage.setItem("infants", formData.get("infant"));
    dispatch(returnAction(payload));
  }


  const handleRoundClick = async () => {
    const temp = await [from]
    await setFrom(to)
    await setTO(temp)
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="formFlightSearchOneWay" >
        <div className="container">
          <motion.div variants={variants} initial="initial"
            whileInView="animate" className="row">
            <motion.div variants={variants} className="col-xs-12 col-md-3 col-lg-3 ps-0 mb-3">
              <div className="form_input" style={{ zIndex: 10, position: "relative" }}>
                <label for="from" className="form_lable" > FROM</label>
                <input
                  name="from"
                  placeholder="Enter city or airport"
                  value={from}
                  autoComplete="off"
                  onClick={() => (setdisplayFrom(true))}

                  onChange={(event) => {
                    handleFromInputChange(event);
                    handleFromSearch(event.target.value);

                  }}

                />
                {sub === true && fromError && <p id="error1">Enter city or airport </p>}
                {/* {isLoading && displayFrom && <div>Loading...</div>} */}
                {fromSearchResults && fromSearchResults.length > 0 && fromQuery.length >= 2 && (
                  <div className="chooseAbsBox" ref={listFromRef} style={{ display: displayFrom ? "block" : "none" }}>
                    <ul>
                      <div className="chooseAbs">
                        {fromSearchResults.map((result) => (
                          <li
                            key={result._id}
                            onClick={() => handleFromClick(result)}
                          >
                            <strong>{result.AirportCode}</strong> {result.name}{" "}
                            {result.code}
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div onClick={() => handleRoundClick()} variants={variants} className="col-xs-12 col-md-1 col-lg-1 d-flex interchange justify-content-center ps-0">
              <img src={interchange} alt="name" className="align-self-center" />
            </motion.div>

            <motion.div variants={variants} className="col-xs-12 col-md-2 col-lg-3 ps-0 mb-3">
              <div className="form_input" style={{ zIndex: 10, position: "relative" }}>

                <label for="to" className="form_lable">
                  TO
                </label>
                <input
                  name="to"
                  placeholder="Enter city or airport"
                  value={to}
                  autoComplete="off"
                  onClick={() => { setdisplayTo(true) }}

                  onChange={(event) => {
                    handleToInputChange(event);
                    handleToSearch(event.target.value);
                  }}
                />
                {sub === true && toError !== "" && <p id="error1">Enter city or airport </p>}
                {/* {isLoading && displayTo && <div>Loading...</div>} */}
                {displayTo && (
                  <div className="chooseAbsBox" ref={listToRef} style={{ display: "block" }}>
                    <ul>
                      <div className="chooseAbs">
                        {toSearchResults.map((result) => (
                          <li
                            key={result._id}
                            onClick={() => handleToClick(result)}
                          >
                            <strong>{result.AirportCode}</strong> {result.name}{" "}
                            {result.code}
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={variants} className="col-xs-12 col-md-3 col-lg-3 ps-0 mb-3">
              <div className="form_input">
                <label for="departure" className="form_lable">
                  DEPARTURE
                </label>

                <input
                  type="date"
                  name="departure"
                  id="departure"
                  className="deaprture_input"
                  placeholder="Enter city or airport"
                  min={new Date().toISOString().split("T")[0]}
                  value={departureDate}
                  onChange={handleDepartureDateChange}
                  autoComplete="off"
                />
                {sub === true && departureDate === "" && <p id="error1">Enter date</p>}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-xs-12 col-md-3 col-lg-2 ps-0 mb-3" >
              <div className="form_input">
                <label for="departure" className="form_lable">
                  RETURN
                </label>

                <input
                  type="date"
                  name="departure1"
                  id="departure1"
                  className="deaprture_input"
                  placeholder="Enter city or airport"
                  min={minReturnDate ? minReturnDate : new Date().toISOString().split("T")[0]}
                  value={returnDate}
                  autoComplete="off"
                  onChange={(event) => setReturnDate(event.target.value)}
                ></input>
                {sub === true && returnDate === "" && <p id="error1">Enter date</p>}
              </div>
            </motion.div>

          </motion.div>



          {/* <div className="row"> */}
          {/* <div className="col-xs-9"> */}
          <motion.div className="row" variants={variants} initial="initial"
            whileInView="animate">

            <motion.div className="col-lg-4 col-md-6 col-12 mb-3 ps-0 mb-3" variants={variants}>
              <div className="form_input">

                <label className="form_lable">Adult(12+)</label>

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


            <motion.div className="col-lg-4 col-md-6 col-12 mb-3 ps-0 mb-3" variants={variants}>
              <div className="form_input">

                <label className="form_lable">Child(2-11)</label>
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
            <motion.div className="col-lg-4 col-md-6 col-12 mb-3 ps-0 mb-3" variants={variants} style={{ position: "relative" }}>
              <div className="form_input" style={{ position: "absolute", zIndex: "1" }} >
                <label className="form_lable">Infant(Under 2 Yrs)</label>
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

            <motion.div className="col-lg-3 col-md-6 col-12 mb-3 ps-0 mb-3" variants={variants}>
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
          </motion.div>
          {/* </div> */}
          {/* </div> */}

          <div className="col-xs-12">
            <div className="row bottom-row">
              {/* <motion.div className="col-md-6 col-lg-6 col-12 col-sm-12 mb-3 ps-0" variants={variants} initial="initial"
                whileInView="animate" >
                <motion.div variants={variants} className="form_input mb-0" >
                  <label className="form_lable">Preferred Airline</label>

                  <select name="adult" id="" className="form_input_select1">
                    <option value="1">Select Airline </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </motion.div>
              </motion.div> */}

              <motion.div variants={variants} initial="initial"
                whileInView="animate" className="col-md-6 col-lg-6 col-12 col-sm-12 mb-3 ps-0" >
                <motion.button
                  variants={variants}
                  type="submit"
                  className="flightFormSubmit" >Search Flight <FlightIcon />
                </motion.button>
              </motion.div>
            </div>
          </div>
          {/* <Box className="row">



        <Flex direction="row" justifyContent="center" marginLeft="330px">
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
    </div >
  );
};

export default Return;
