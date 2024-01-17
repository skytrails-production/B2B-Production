import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./busform.css";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  busSearchAction,
  clearBusSearchReducer,
} from "../../../Redux/busSearch/busSearchAction";
import { apiURL } from "../../../Constants/constant.js";

import DateRangeIcon from '@mui/icons-material/DateRange';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import NavBarBox from "../../../Components/NavBarBox.jsx";
import BusLoading from "../busLoading/BusLoading.jsx"
import Swal from "sweetalert2";
import { PiBusDuotone } from "react-icons/pi";
import { GiIndiaGate } from "react-icons/gi";
import { BsBusFront } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";







// const variants = {
//   open: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
//   closed: {
//     transition: {
//       staggerChildren: 0.05,
//       staggerDirection: -1,
//     },
//   },
// };
// const itemVariants = {
//   open: {
//     y: 0,
//     opacity: 1,
//   },
//   closed: {
//     y: 50,
//     opacity: 0,
//   },
// };

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





const BusForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log(reducerState);
  const [isLoading, setIsLoading] = useState(false);
  const [fromSearchResults, setFromSearchResults] = useState([]);
  const [toSearchResults, setToSearchResults] = useState([]);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [from, setFrom] = useState({
    cityId: "",
    cityName: "",
  });
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [to, setTO] = useState({
    cityId: "",
    cityName: "",
  });
  const [selectedTo, setSelectedTo] = useState(null);
  const [displayFrom, setdisplayFrom] = useState(true);
  const [displayTo, setdisplayTo] = useState(true);
  const [loader, setLoader] = useState(false);
  const [subFrom, setSubfrom] = useState(false);
  const [subTo, setSubTo] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const inputRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [fromData, setFromData] = useState([]);
  const [origin, setOrigin] = useState([]);
  const listFromRef = useRef(null);
  const lisToRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listFromRef.current && !listFromRef.current.contains(event.target)) {
        // Clicked outside the list, so close it
        setSubfrom(false);
      }
    }


    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listFromRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (lisToRef.current && !lisToRef.current.contains(event.target) ) {
        // Clicked outside the list, so close it
        setSubTo(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lisToRef]);


  const [errors, setErrors] = useState({
    from: "",
    to: "",
    date: "",
  });
  useEffect(() => {
    console.warn(from, "from value")
  }, [from])

  useEffect(() => {
    dispatch(clearBusSearchReducer());

    sessionStorage.removeItem("busPassName")
    sessionStorage.removeItem("seatData")

  }, []);

  //============== copied -----=======//

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      setIsLoading(true);

      // make an API call to get search results

      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${fromQuery}`
      );
      if (mounted) {
        setFromSearchResults(results?.data?.data);
        setIsLoading(false);
      }
    };

    if (fromQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [fromQuery]);

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      setIsLoading(true);

      // make an API call to get search results

      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${toQuery}`
      );
      if (mounted) {
        setToSearchResults(results?.data?.data);
        setIsLoading(false);
      }
    };

    if (toQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [toQuery]);

  // console.log("from result", fromSearchResults);
  // console.log("to result", toSearchResults);

  const handleFromInputChange = (event) => {
    setErrors({ ...errors, from: "" });
    setFrom(event.target.value);
    setSelectedFrom(null);
  };

  const handleFromClick = (result) => {
    // console.log("result", result);
    // setFrom(result?.CityId);

    setFrom((prevState) => ({
      ...prevState,
      cityId: result?.CityId,
      cityName: result?.CityName,
    }));

    setSelectedFrom(result?.CityId);
    // setdisplayFrom(false);
    setSubfrom(false)
  };

  const handleToClick = (result) => {
    setTO({ cityId: result.CityId, cityName: result.CityName });
    setSelectedTo(result.CityId);
    // setdisplayTo(false);
    setSubTo(false)
  };

  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  const handleToInputChange = (event) => {
    setErrors({ ...errors, to: "" });
    setTO({ ...to, cityName: event.target.value });
    setSelectedTo(null);
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };

  const handleDateInputChange = () => {
    setErrors({ ...errors, date: "" }); // Clear the error when the user selects a date
  };

  // Form validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { from: "", to: "", date: "" };

    if (!from.cityId) {
      newErrors.from = "Please select a city or airport *";
      valid = false;
    }

    if (!to.cityId) {
      newErrors.to = "Please select a city or airport *";
      valid = false;
    }

    if (!startDate) {
      newErrors.date = "Please select a departure date *";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };
  useEffect(() => {
    if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode === 0) {
      setLoader(false)
      navigate("/BusResult");
    }
    else if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== 0 && reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== undefined) {
      Swal.fire({
        title: "Something went wrong",
        text: reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorMessage,
        // text:TicketDetails,
        icon: "question",
        timer: 3000,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      setLoader(false)
    }
    console.warn(reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode
      , "reducerState?.getBusResult?.data?.data?.BusSearchResult?.Error?.ErrorCode")
  }, [reducerState?.getBusResult])

  // form submit data
  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      const formData = new FormData(event.target);
      // Format the selected date as "MM/dd/yyyy"
      const selectedDate = startDate;
      let formattedDate = "";
      if (selectedDate) {
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const year = selectedDate.getFullYear();
        formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}`;
        }
        const payload = {
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          DateOfJourney: formattedDate,
          DestinationId: to.cityId,
          OriginId: from.cityId,
        };
        setLoader(true)
      // console.log("payload", payload);
      dispatch(busSearchAction(payload));

    } else {
      // Focus on the first empty field
      if (!from) {
        fromInputRef.current.focus();
      } else if (!to) {
        toInputRef.current.focus();
      } else if (!inputRef.current.value) {
        inputRef.current.focus();
      }
    }
  }

  // /BusResult



  // import React from "react";
  // import { InnerBarLogo } from "../data";
  // import { Link } from "react-router-dom";
  // import color from "../color/color";
  // import { useDispatch, useSelector } from "react-redux";
  // import "./maixBox.css"
  // import { motion } from "framer-motion";






  // function MainBox() {
  //   const reducerState = useSelector((state) => state);
  //   console.log(reducerState, "jfglkdsja;edj")
  //   return (


  //     <motion.div
  //       initial={{ opacity: 0, scale: 0.5 }}
  //       animate={{ opacity: 1, scale: 1 }}
  //       transition={{ duration: 0.5 }}
  //       className="centeredBox"
  //     >
  //       <div className="centered-box-top">
  //         <p>Services We Provide</p>
  //       </div>
  //       {InnerBarLogo.map(({ avatar, name, path }, index) => (
  //         <Link to={path} key={index} style={{ textDecoration: "none" }}>
  //           <motion.div
  //             className={`centeredBox-content ${index === 0 || index === 1 || index === 3 || index === 4 ? 'border-right-dashed' : ''} ${index < 3 ? 'border-bottom' : ''}`}
  //           >
  //             <motion.div
  //               initial={{ opacity: 0, scale: 0.5 }}
  //               animate={{ opacity: 1, scale: 1 }}

  //               transition={{
  //                 delay: 0.7,
  //                 type: "spring",
  //                 stiffness: 400,
  //                 damping: 40,
  //                 duration: 0.9
  //               }}
  //               className="centeredBox-avatar">{avatar}</motion.div>
  //             <motion.div
  //               initial={{ opacity: 0, scale: 0.5 }}
  //               animate={{ opacity: 1, scale: 1 }}

  //               transition={{
  //                 delay: 1,
  //                 type: "spring",
  //                 stiffness: 400,
  //                 damping: 40,
  //                 duration: 0.9
  //               }}
  //               className="centeredBox-name">{name}</motion.div>
  //           </motion.div>
  //         </Link>
  //       ))}
  //     </motion.div>
  //   );
  // }

  // export default MainBox;      

  if (loader) {
    return (<BusLoading />)
  }


  return (
    <div className="container  " id="margin-pecentage-large">
      <div className="row mt-0 px-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-lg-7 bgBusImg">

        </motion.div>
        <motion.div variants={variants} initial="initial"
          whileInView="animate" className="col-lg-5 bgBusForm">
          <form className="BusForm" onSubmit={handleSubmit}>
            <motion.div className="row">
              <motion.div variants={variants} className="col-xs-12 col-md-12">
                <div >
                  <label>FROM</label>
                  <div className="locationFrom">
                    {/* <FmdGoodIcon className="locationFromIcon" /> */}
                    <BsBusFront className="locationFromIcon" />
                    <input
                      name="from"
                      placeholder="Enter city or airport"
                      autoComplete="off"
                      value={from.cityName}
                      onChange={(event) => {
                        handleFromInputChange(event);
                        handleFromSearch(event.target.value);
                        // setSubfrom(true)
                        console.log(subFrom)

                      }}
                      onClick={() => setSubfrom(true)}
                      ref={fromInputRef}
                      style={{ width: "100%" }}
                    />

                    {/* {isLoading && <div>Loading...</div>} */}
                    {subFrom && (
                      <div
                        style={{
                          backgroundColor: "white",
                          display:"block" ,
                        }}
                        className="busFormRes"
                        ref={listFromRef}

                      >
                        <ul>
                          {fromSearchResults.map((result) => (
                            <li
                              key={result._id}
                              onClick={() => handleFromClick(result)}

                            >
                              <strong>{<GiIndiaGate />}</strong> {result.CityName}{" "}
                              {/* {result.CityId} */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {errors.from && <div className="error">{errors.from}</div>}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={variants} className="col-xs-12 col-md-12">
                <div className="">
                  <label >TO</label>
                  <div className="locationTo">
                    <FmdGoodIcon className="locationToIcon" />
                    <input
                      name="to"
                      placeholder="Enter city or airport"
                      autoComplete="off"
                      value={to.cityName}
                      onChange={(event) => {
                        handleToInputChange(event);
                        handleToSearch(event.target.value);
                      }}
                      ref={toInputRef}
                      onClick={() => setSubTo(true)}
                      style={{ width: "100%" }}
                    />

                    {/* {isLoading && <div>Loading...</div>} */}
                    {subTo && (
                      <div
                        style={{
                          backgroundColor: "white",

                          display: displayTo ? "block" : "none",
                        }}
                        className="busToRes"
                        ref={lisToRef}
                      >
                        <ul>
                          <Box
                            sx={{
                              mb: 2,
                              display: "flex",
                              flexDirection: "column",
                              maxHeight: 150,
                              overflow: "hidden",
                              overflowY: "scroll",
                            }}
                          >
                            {toSearchResults.map((result) => (
                              <li
                                key={result._id}
                                onClick={() => handleToClick(result)}
                              >
                                <strong>{<GiIndiaGate />}</strong> {result.CityName}{" "}

                              </li>
                            ))}
                          </Box>
                        </ul>
                      </div>
                    )}
                    {errors.to && <div className="error">{errors.to}</div>}
                  </div>
                </div>
              </motion.div>


              <motion.div variants={variants} className="col-xs-12 col-md-12">
                <div className="">
                  <label >DEPARTURE</label>

                  <div className="dateDepart">
                    <DateRangeIcon className="dateIcon" />
                    <DatePicker
                      selected={startDate}
                      name="departure"
                      id="departure"
                      autoComplete="off"
                      ref={inputRef}
                      style={{ width: "100%" }}
                      placeholderText="Select Date"
                      onChange={(date) => {
                        setStartDate(date);
                        handleDateInputChange();
                      }}
                      minDate={new Date()}
                      className="datePick"
                    />
                  </div>
                </div>
                {errors.date && <div className="error">{errors.date}</div>}
              </motion.div>

              <motion.div variants={variants} className="col-xs-6 col-md-12">
                <div className="BusSubmitForm">
                  <button type="submit">
                    Bus Search
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BusForm;
