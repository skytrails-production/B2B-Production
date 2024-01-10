import { Typography } from "@material-ui/core";
import { Grid, Box, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import PinDropIcon from "@mui/icons-material/PinDrop";
import "./holidayform.css";
import { useDispatch, useSelector } from "react-redux";
import { searchPackageAction } from "../../../Redux/SearchPackage/actionSearchPackage";
import { clearHolidayReducer } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import { packageBookingActionClear } from "../../../Redux/HolidayBookingRequest/actionBooking.js"
import color from "../../../../src/color/color.js"

import { motion } from "framer-motion";
import { clearHolidayPackage } from "../../../Redux/HolidayPackageTravellerDetails/HolidayPackageTravellerDetailsAction.js";
import axios from "axios";






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








const HolidayForm = () => {


  const reducerState = useSelector((state) => state);
  const [destination, setDestination] = useState("goa");
  const [daysSearch, setDaySearch] = useState(0);
  const [Query, setToQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const populearSearch = ['uttarakhand', 'goa', 'kashmir', 'andaman', 'karala', 'himachal pradesh']
  const [result, setResult] = useState([]);
  const [error, setError] = useState({
    destination: "",
    daysSearch: "",
  });
  const filteredPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;

  const dispatch = useDispatch();
  const destinationInputRef = useRef(null);
  const daysSearchInputRef = useRef(null);
  const [sub, setSub] = useState(false)


  console.warn("reducer state ", reducerState)

  useEffect(() => {
    dispatch(clearHolidayReducer());
    dispatch(packageBookingActionClear());
    dispatch(clearHolidayPackage());
    sessionStorage.removeItem("searchPackageData")
    console.warn("reducer state useEffect", reducerState)

  }, []);
  useEffect(() => {
    const fetchSearchResults = async () => {
      //make a API call to get search results
      const results = await axios.get(`http://localhost:8000/skyTrails/packagecitylist?keyword=${Query}`);
      await setResult(results?.data?.data);
      // console.warn(result)
    }
    const getData = setTimeout(() => {
      if (Query.length >= 2) {
        fetchSearchResults()
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [Query]);
  useEffect(() => {
    console.warn(result, "result........")
  }, [result])

  const navigate = useNavigate();
  useEffect(() => {
    if (filteredPackage) {
      navigate("HolidaypackageResult");
    }
  }, [filteredPackage, navigate]);
  const clickUs = () => {
    // Validate the form before submission
    const isValid = validateForm();

    if (isValid) {
      const payload = {
        destination,
        days: daysSearch,
      };
      // console.log(payload);
      dispatch(searchPackageAction(payload));
      sessionStorage.setItem("searchPackageData", JSON.stringify(payload));
    } else {
      // Focus on the first empty field
      if (!destination.trim()) {
        destinationInputRef.current.focus();
      } else if ( isNaN(daysSearch) || daysSearch <= 0) {
        daysSearchInputRef.current.focus();
      }
    }
  };

  // Form validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { destination: "", daysSearch: "" };

    if (!destination.trim()) {
      newErrors.destination = "Destination is required";
      valid = false;
    }

    // if (isNaN(daysSearch) || daysSearch <= 0) {
    //   newErrors.daysSearch = "Days must be a positive number";
    //   valid = false;
    // }

    setError(newErrors);

    return valid;
  };

  const handleDestinationChange = (e) => {
    // setError({ ...error, destination: "" }); 
    // Clear the error when the user types in the destination field
    setSearchTerm(e.target.value);
    setToQuery(e.target.value);
  };
  const handleDestinationChangeClick = (e, item) => {
    e.stopPropagation();
    setDestination(item);
    setSearchTerm(item);
    setToQuery("");
    setResult([]);
    setSub(false)
    console.warn(item, "item................")
  }

  const handleDaysSearchChange = (e) => {
    setError({ ...error, daysSearch: "" }); // Clear the error when the user types in the days field
    setDaySearch(e.target.value);
  };


  return (
    <React.Fragment>

      <div className="row">
        <div className="col-lg-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="holidayFirstPage">

          </motion.div>
        </div>
        <motion.div className="col-lg-5" variants={variants} initial="initial"
          whileInView="animate">
          <div className="row holidayForm">

            <motion.div onClick={(e) => { e.stopPropagation(); setSub(true) }} variants={variants} className="col-lg-12">
              <label className="label">Destination</label>
              <div class="form-floating mb-3">
                <input type="text" value={searchTerm} onChange={(e) => handleDestinationChange(e)} name="destination" placeholder="Search From Destination" class="form-control" id="filled-basic" required />
                <label className="label" for="floatingInput">Search From Destination</label>
                {sub && <div className="holidayPackagefromchild">
                  {/* <div className="holidayPackagefromchildSearchDev">
                    <input value={searchTerm} onChange={(e) => handleDestinationChange(e)} />
                  </div> */}
                  {result.length === 0 ?
                    <div className="packageScroll">


                      <div className="dest-citypicker-title">Popular Destinations</div>
                      <div className="dest-city-container" >
                        {populearSearch?.map((item, index) => (
                          <div onClick={(e) => handleDestinationChangeClick(e,item)}
                            className="dest-city-container-div" key={index}>{item}</div>
                        ))}
                      </div>
                    </div> : <div className="packageScroll">


                      {/* <div className="dest-citypicker-title">Popular Destinations</div> */}
                      <div className="dest-city-container" >
                        {result?.map((item, index) => (
                          <div onClick={(e) => handleDestinationChangeClick(e,item)}
                            className="dest-city-container-div" key={index}>{item}</div>
                        ))}
                      </div>
                    </div>}

                </div>}
              </div>
              {error.destination && (
                <Typography color="error">{error.destination}</Typography>
              )}
            </motion.div>
            {/* <motion.div variants={variants} className="col-lg-12">
              <label className="lable">Days</label>
              <div class="form-floating mb-3">
                <input className="input" type="number" name="destination" placeholder="Days" class="form-control" id="filled-basic" onChange={handleDaysSearchChange} required />
                <label className="label" for="floatingInput">Days</label>
              </div>
              {error.daysSearch && (
                <Typography color="error">{error.daysSearch}</Typography>
              )}
            </motion.div> */}

            <motion.div variants={variants} className="col-lg-12">
              <div className="buttonBoxHoliday">
                <button
                  onClick={clickUs}
                  variant="contained"
                >
                  Search Holiday Package
                </button>
              </div>
            </motion.div>
          </div>


        </motion.div>
      </div>




    </React.Fragment>
  );
};

export default HolidayForm;





// <div className="container margin-pecentage-large ">
//   <div className="row mt-0 px-2">
//     <div className="col-lg-7 bgBusImg">

//     </div>
//     <motion.div variants={variants} initial="initial"
//       whileInView="animate" className="col-lg-5 bgBusForm">
//       <form className="BusForm" onSubmit={handleSubmit}>
//         <motion.div className="row">
//           <motion.div variants={variants} className="col-xs-12 col-md-12">
//             <div >
//               <label>FROM</label>
//               <div className="locationFrom">
//                 <FmdGoodIcon className="locationFromIcon" />
//                 <input
//                   name="from"
//                   placeholder="Enter city or airport"
//                   autoComplete="off"
//                   value={from.cityId}
//                   onChange={(event) => {
//                     handleFromInputChange(event);
//                     handleFromSearch(event.target.value);
//                   }}
//                   ref={fromInputRef}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               {isLoading && <div>Loading...</div>}
//             </div>
//           </motion.div>

//           <motion.div variants={variants} className="col-xs-12 col-md-12">
//             <div className="">
//               <label >TO</label>
//               <div className="locationTo">
//                 <FmdGoodIcon className="locationToIcon" />
//                 <input
//                   name="to"
//                   placeholder="Enter city or airport"
//                   autoComplete="off"
//                   value={to}
//                   onChange={(event) => {
//                     handleToInputChange(event);
//                     handleToSearch(event.target.value);
//                   }}
//                   ref={toInputRef}
//                 />
//               </div>
//               {isLoading && <div>Loading...</div>}
//               {toSearchResults && toSearchResults.length > 0 && (
//                 <div
//                   style={{
//                     backgroundColor: "white",

//                     display: displayTo ? "block" : "none",
//                   }}
//                   className="busToRes"
//                 >
//                   <ul>
//                     <Box
//                       sx={{
//                         mb: 2,
//                         display: "flex",
//                         flexDirection: "column",
//                         maxHeight: 150,
//                         overflow: "hidden",
//                         overflowY: "scroll",
//                       }}
//                     >
//                       {toSearchResults.map((result) => (
//                         <li
//                           key={result._id}
//                           onClick={() => handleToClick(result)}
//                         >
//                           <strong>{result.CityId}</strong> {result.CityName}{" "}
//                           {result.CityId}
//                         </li>
//                       ))}
//                     </Box>
//                   </ul>
//                 </div>
//               )}
//               {errors.to && <div className="error">{errors.to}</div>}
//             </div>
//           </motion.div>


//           <motion.div variants={variants} className="col-xs-12 col-md-12">
//             <div className="">
//               <label >DEPARTURE</label>

//               <div className="dateDepart">
//                 <DateRangeIcon className="dateIcon" />
//                 <DatePicker
//                   selected={startDate}
//                   name="departure"
//                   id="departure"
//                   autoComplete="off"
//                   ref={inputRef}
//                   style={{ width: "100%" }}
//                   placeholderText="Select Date"
//                   onChange={(date) => {
//                     setStartDate(date);
//                     handleDateInputChange();
//                   }}
//                   minDate={new Date()}
//                   className="datePick"
//                 />
//               </div>
//             </div>
//             {errors.date && <div className="error">{errors.date}</div>}
//           </motion.div>

//           <motion.div variants={variants} className="col-xs-6 col-md-12">
//             <div className="BusSubmitForm">
//               <button type="submit">
//                 Bus Search
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       </form>
//     </motion.div>
//   </div>
// </div>
