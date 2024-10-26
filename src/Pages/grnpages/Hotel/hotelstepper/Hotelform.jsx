import { apiURL } from "../../../../Constants/constant";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Select } from "antd";
import "./hotelstepper.css";
import {
  clearHotelReducerGrn,
  hotelActionGrn,
  clearHotelBlockRoomtry,
} from "../../../../Redux/HotelGrn/hotel";
import { hotelAction } from "../../../../Redux/Hotel/hotel";
import Loader from "../Loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

import SecureStorage from "react-secure-storage";
import dayjs from "dayjs";
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
let FromTimeout;
let FromCurrentValue;

// const initialSelectedFromData = {
//   cityCode: "124054",
//   cityName: "New Delhi",
//   countryCode: "IN",
//   countryName: "India",
// };

const initialSelectedFromData = {
  cityName: "Delhi",
  tboCityCode: 130443,
  tboCountryName: "India",
  tboCountryCode: "IN",
  tbostateProvince: "DELHI",
  tbostateProvinceCode: "DL",
  grnCityCode: 124054,
  grnCountryName: "India",
  grnCountryCode: "IN",
};
const initialSelectedToData = {
  countryCode: "IN",
  countryCode3: "IND",
  countryName: "India",
};

// Select city data logic

const fetchFromCity = (value, callback) => {
  if (FromTimeout) {
    clearTimeout(FromTimeout);
    FromTimeout = null;
  }
  FromCurrentValue = value;

  const cityData = () => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/tboandgrn/citylist?keyword=${value}`)
      .then((response) => {
        if (FromCurrentValue === value) {
          const { data } = response.data;
          const cityList = data.cityList.map((item) => ({
            value: `city-${item?.grnCityCode}`,
            name: item?.cityName,
            code: item?.grnCountryCode,
            cityCode: item?.grnCountryName,
            tboCityCode: item?.tboCityCode,
            tboCountryCode: item?.tboCountryCode,
            tboCountryName: item?.tboCountryName,
            tbostateProvince: item?.tbostateProvince,
            tbostateProvinceCode: item?.tbostateProvinceCode,
            item,
            type: "city",
          }));

          const hotelList = data.hotelList.map((item) => ({
            value: `hotel-${item.hotelCode}`,
            name: item.hotelName,
            code: item.cityCode,
            cityCode: item.countryCode,
            address: item.address,
            countryName: item.countryName,
            // cityName: item.cityName,
            item,
            type: "hotel",
          }));

          const combinedList = [...cityList, ...hotelList];
          callback(combinedList);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  if (value) {
    FromTimeout = setTimeout(cityData, 300);
  } else {
    callback([]);
  }
};

const FromSearchInput = (props) => {
  const { onItemSelect } = props;
  const [fromData, setFromData] = useState([]);
  const [fromValue, setFromValue] = useState(initialSelectedFromData.cityName);
  const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);
  const [FromPlaceholder, setFromPlaceholder] = useState("");
  const [FromDisplayValue, setFromDisplayValue] = useState(
    initialSelectedFromData.cityName
  );
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setFromData([
      {
        value: `city-${initialSelectedFromData.cityCode}`,
        name: initialSelectedFromData.cityName,
        code: initialSelectedFromData.countryCode,
        cityCode: initialSelectedFromData.countryName,
        item: initialSelectedFromData,
        type: "city",
      },
    ]);
  }, []);

  const handleFromSearch = (newValue) => {
    fetchFromCity(newValue, setFromData);
  };

  const handleFromChange = (newValue) => {
    const selected = fromData.find((d) => d.value === newValue);
    setFromValue(selected ? selected.name : newValue);
    setFromDisplayValue(selected ? selected.name : newValue);
    setSelectedItem(selected ? selected.item : null);
    setInputStyle({ caretColor: "transparent" });
    if (selected) {
      onItemSelect(selected.item);
    }
  };

  const handleFromFocus = () => {
    setFromPlaceholder("From");
    setFromDisplayValue("");
    setInputStyle({});
  };

  const handleFromBlur = () => {
    setFromPlaceholder("");
    setFromDisplayValue(fromValue);
    setInputStyle({ caretColor: "transparent" });
  };

  const renderFromOption = (option) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {option.type === "city" ? (
          <i class="fa-solid fa-city"></i>
        ) : (
          <i class="fa-solid fa-bed"></i>
        )}
        <div>
          {option.type === "city" ? (
            <>
              <div className="ellipsisHotelDropdown">
                {option.name} ({option.code})
              </div>
              <div style={{ color: "gray" }}>{option.cityCode}</div>
            </>
          ) : (
            <>
              <div className="ellipsisHotelDropdown">
                {option.name} - ({option.countryName})
              </div>
              <div className="ellipsisHotelDropdown" style={{ color: "gray" }}>
                {option.address}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Select
      showSearch
      className="hotel_input_select"
      style={inputStyle}
      value={FromDisplayValue}
      placeholder={FromPlaceholder || props.placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleFromSearch}
      onChange={handleFromChange}
      onFocus={handleFromFocus}
      onBlur={handleFromBlur}
      notFoundContent={null}
      options={fromData.map((d) => ({
        value: d.value,
        label: renderFromOption(d),
      }))}
    />
  );
};

// select city data logic

const HotelForm = () => {
  const today = dayjs();

  const [newDepartDate, setNewDepartDate] = useState(today);
  const [newReturnDate, setNewReturnDate] = useState(today.add(1, "day"));

  const [searchTerm, setSearchTerm] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [cityid, setCityid] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDates = new Date();
  const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [SelectedcityCode, setCityCode] = useState("");
  const [SelectedtboCityCode, setTboCityCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(clearHotelBlockRoomtry())
    dispatch(clearHotelReducerGrn());
  }, []);

  // error manage
  const [errors, setErrors] = useState({
    cityError: "",
    checkInError: "",
    checkOutError: "",
  });

  const [condition, setCondition] = useState(1);
  const [formDataDynamic, setFormData] = useState([
    {
      NoOfAdults: 1,
      NoOfChild: 0,
      ChildAge: [],
    },
  ]);
  // const initialSelectedCityData = {
  //   cityCode: "124054",
  //   cityName: "New Delhi",
  //   countryCode: "IN",
  //   countryName: "India",
  // };

  const initialSelectedCityData = {
    cityName: "Delhi",
    tboCityCode: 130443,
    tboCountryName: "India",
    tboCountryCode: "IN",
    tbostateProvince: "DELHI",
    tbostateProvinceCode: "DL",
    grnCityCode: 124054,
    grnCountryName: "India",
    grnCountryCode: "IN",
  };

  const [selectNationality, setSelectNationality] = useState(
    initialSelectedToData
  );
  const [isSingleHotelSearched, setIsSIngleHotelSerched] = useState(false);

  const futureDate = new Date(currentDates);
  futureDate.setDate(currentDates.getDate() + 1);

  const [checkIn, setCheckIn] = useState(currentDates);
  const [checkOut, setCheckOut] = useState(futureDate);

  const [searchTermLast, setSearchTermLast] = useState(initialSelectedCityData);
  const reducerState = useSelector((state) => state);
 
  useEffect(() => {
    const storedData = SecureStorage.getItem("revisitHotelDataGRN");
    const parsedStoredData = JSON.parse(storedData);

    if (storedData) {
      setSearchTermLast(parsedStoredData[0]);
    }
  }, []);

  const initialvalue = {
    City: "",
    nationality: "IN",
    star: 5,
    departure: "",
    checkOutDeparture: "",
  };
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState();
  const [values, setValues] = useState(initialvalue);
  const [error, setError] = useState({
    nationality: false,
  });
  const [sub, setSub] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setToggleSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);

  useEffect(() => {
    if (reducerState?.hotelSearchResultGRN?.isLoading === true) {
      setLoader(true);
    }
  }, [reducerState?.hotelSearchResultGRN?.isLoading]);

  //fetch city Logic implemented below

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchCities();
      } else {
        setResults([]);
      }
    }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/tboandgrn/citylist?keyword=${searchTerm}`
      );
      setResults(response.data);

      setLoading(false);
    } catch (error) {
    
      setLoading(false);
    }
  };
  const handleConditionChange = (event) => {
    const newCondition = parseInt(event.target.value);
    setCondition(newCondition);
    const newFormData = Array.from({ length: newCondition }, () => ({
      NoOfAdults: 1,
      NoOfChild: 0,
      ChildAge: [],
    }));
    setFormData(newFormData);
  };

  const handleFormChange = (index, key, value) => {
    const updatedFormData = [...formDataDynamic];
    if (key === "NoOfAdults" && value > 8) {
      value = 8; // Limit the number of adults to a maximum of 8
    }
    updatedFormData[index][key] = value;

    // Set ChildAge to null when NoOfChild is 0
    if (key === "NoOfChild" && value === 0) {
      updatedFormData[index]["ChildAge"] = null;
    }

    setFormData(updatedFormData);
  };

  const handleChildAgeChange = (index, childIndex, value) => {
    const updatedFormData = [...formDataDynamic];
    updatedFormData[index].ChildAge[childIndex] = value;
    setFormData(updatedFormData);
  };

  const handleDeleteRoom = () => {
    if (condition > 1) {
      setCondition(condition - 1);
      setFormData(formDataDynamic.slice(0, condition - 1));
    }
  };

  const handleResultClick = (city) => {
    setSearchTerm(city.cityName); // Set the input field's value to the selected city
    //Below is cityId to send in payload
    setCityid(city.countryName);
    setCountryCode(city.countrycode);
    // setResults([]); // Clear the results
    setToggleSearch(false);
    // setErrors("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    setError({
      nationality: false,
    });
  };

  // const handleStartDateChange = async (date) => {
  //   console.log(`handleStartDateChange`, "datessss");
  //   setValues({ ...values, departure: date });

  //   setErrors((pre) => ({ ...pre, departure: "" }));

  //   if (values?.checkOutDeparture && values?.checkOutDeparture <= date) {
  //     const increasedDate = new Date(date);
  //     increasedDate.setDate(increasedDate.getDate() + 1);
  //     console.log(
  //       increasedDate.setDate(increasedDate.getDate() + 1),
  //       "increasedatessss"
  //     );
  //     setValues({
  //       ...values,
  //       checkOutDeparture: increasedDate,
  //       departure: date,
  //     });
  //   }
  //   setNewDepartDate(dayjs(date).format("DD MMM, YY"));
  // };

  const handleStartDateChange = async (date) => {
    setValues({ ...values, departure: date });
    setErrors((prev) => ({ ...prev, departure: "" }));
   

    if (!values?.checkOutDeparture || values?.checkOutDeparture <= date) {
      // Parse the provided date
      const givenDate = new Date(date);

      // Add one day to the date
      const minDate = new Date(givenDate);
      minDate.setDate(minDate.getDate() + 1);
      setMinReturnDate(minDate);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setValues({ ...values, checkOutDeparture: nextDay, departure: date });
    }
    // setNewDepartDate(dayjs(date).format("DD MMM, YY"));
  };

  const handleEndDateChange = (date) => {
    setValues({ ...values, checkOutDeparture: date });
    setErrors((pre) => ({ ...pre, checkOutDeparture: "" }));
    setNewReturnDate(dayjs(date).format("DD MMM, YY"));
  };

  const currentDate = new Date(values.departure);
  const toDate = new Date(values.checkOutDeparture);
  const timeDifference = toDate.getTime() - currentDate.getTime();
  const nightdays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  function handleSubmit(event) {
    setIsSIngleHotelSerched(true);

    event.preventDefault();

    let hasError = false;

    if (values?.departure === "" || values?.checkOutDeparture === "") {
      searchTerm === ""
        ? setErrors((prev) => ({
            ...prev,
            cityError: "Please enter a city name",
          }))
        : setErrors((prev) => ({ ...prev, cityError: "" }));
      values?.departure === ""
        ? setErrors((prev) => ({
            ...prev,
            departure: "Please enter a city name",
          }))
        : setErrors((prev) => ({ ...prev, departure: "" }));
      values?.checkOutDeparture === ""
        ? setErrors((prev) => ({
            ...prev,
            checkOutDeparture: "Please enter a city name",
          }))
        : setErrors((prev) => ({ ...prev, checkOutDeparture: "" }));
      hasError = true;
    } else {
      sessionStorage.setItem("SessionExpireTime", new Date());

      const dynamicFormData = formDataDynamic.map((data) => ({
        adults: data.NoOfAdults || 0,
        children_ages: data.ChildAge || [],
      }));

      sessionStorage.setItem("searchLastterm", JSON.stringify(searchTermLast));

      if (selectedFrom.hotelName) {
       
        const payload = {
          rooms: [...dynamicFormData],
          rates: "concise",
          hotel_codes: [`${selectedFrom.hotelCode}`],
          currency: "INR",
          client_nationality: selectNationality?.countryCode || "In",
          checkin: dayjs().format("YYYY-MM-DD"),
          checkout: dayjs(newReturnDate).format("YYYY-MM-DD"),
          cutoff_time: 30000,
          version: "2.0",
        };

        sessionStorage.setItem("grnPayload", JSON.stringify(payload));
        dispatch(hotelActionGrn(payload));
        // navigate("/st-hotel/hotelresult");
      } else {
        const payload = {
          rooms: [...dynamicFormData],
          rates: "concise",
          cityCode: selectedFrom.grnCityCode,
          currency: "INR",
          client_nationality: selectNationality?.countryCode || "In",
          checkin: dayjs(values?.departure).format("YYYY-MM-DD"),
          checkout: dayjs(values?.checkOutDeparture).format("YYYY-MM-DD"),
          cutoff_time: 30000,
          version: "2.0",
          tboCityCode: selectedFrom.tboCityCode,
          EndUserIp: reducerState.ip.ipData,
          TokenId: reducerState.ip.tokenData,
        };

        sessionStorage.setItem("grnPayload", JSON.stringify(payload));
        dispatch(hotelActionGrn(payload));
        navigate("/hotels/hotelsearchs");
      }
      // sessionStorage.setItem("Payload", JSON.stringify(payload));

      SecureStorage.setItem(
        "revisitHotelDataGRN",
        JSON.stringify([
          {
            cityCode: searchTermLast.tboCityCode,
            cityName: searchTermLast.cityName,
            countryCode: searchTermLast.tboCountryCode,
            countryName: searchTermLast.tboCountryName,
            checkin: dayjs(values?.departure).format("YYYY-MM-DD"),
            checkout: dayjs(values?.checkOutDeparture).format("YYYY-MM-DD"),
            rooms: [...dynamicFormData],
          },
        ])
      );

      const formFields = {
        city: searchTermLast.cityName,
        checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
        checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
        room: condition,
        star,
        night: nightdays,
        nationality,
        dynamicFormData,
        noOfAdults: formDataDynamic[0]?.NoOfAdults || 1,
        noOfChild: formDataDynamic[0]?.NoOfChild || 0,
      };
      const pageNumber = 1;

      sessionStorage.setItem("hotelFormData", JSON.stringify(formFields));
      //dispatch(hotelActionGrn(payload, pageNumber));
      navigate("/hotels/hotelsearchs");

      if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels) {
        setOpen(false);
      }
      setOpen(true);
    }
  }

  const sessionData = new FormData();

  //   // Extract specific fields

  const star = sessionData.get("star");

  const nationality = sessionData.get("nationality");

  const handleFromSelect = (item) => {
     setSelectedFrom(item);
  };

  return (
    <>
      {/* {loader ? (
        <Loader />
      ) : ( */}
      <form onSubmit={handleSubmit}>
        <motion.div
          className="row rowcon g-2 gx-3"
          variants={variants}
          initial="initial"
          whileInView="animate"
        >
          <motion.div
            variants={variants}
            className=" col-md-12 col-lg-12 col-xs-12 ps-0 mb-3"
          >
            <div>
              <label className="form_label">City</label>
              <FromSearchInput
                className="grnFrom"
                placeholder="Search"
                style={{ width: "100%" }}
                onItemSelect={handleFromSelect}
              />
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">Check In Date</label>
              <DatePicker
                selected={values?.departure}
                onChange={handleStartDateChange}
                name="checkIn"
                dateFormat="dd MMMyy"
                placeholderText="Select Check-In Date"
                isClearable
                // id="datepic"
                minDate={new Date()}
                autoComplete="off"
              />
              {errors?.departure !== "" && (
                <span className="error">{errors?.departure}</span>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">Check Out Date</label>
              <DatePicker
                selected={values?.checkOutDeparture}
                onChange={handleEndDateChange}
                name="checkOut"
                dateFormat="dd MMMyy"
                placeholderText="Select Check-Out Date"
                minDate={minReturnDate || new Date()}
                // Disable dates before Check-In date
                isClearable
                // id="datepic"
                autoComplete="off"
              />
              {errors?.checkOutDeparture !== "" && (
                <span className="error">{errors?.checkOutDeparture}</span>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">No. of Rooms</label>
              <select
                name="room"
                required
                value={condition}
                onChange={handleConditionChange}
                className="hotel_input_select"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
              {/* Add validation error message if needed */}
            </div>
          </motion.div>

          {/* <Box> */}
          <motion.div
            variants={variants}
            className="col-lg-12 col-md-12 col-xs-12 ps-0 mb-3"
          >
            {condition > 0 &&
              Array.from({ length: condition }).map((_, index) => (
                <div key={index} className="room-container">
                  <div
                    className={`col-lg-4 col-md-4 col-xs-4 ps-0 mb-3 d-flex  ${
                      formDataDynamic[index]?.NoOfChild > 0
                        ? "align-items-start"
                        : "align-items-center"
                    }`}
                    style={{ fontWeight: "600px", color: "#111928" }}
                  >
                    <h5>ROOM DETAILS- {index + 1}</h5>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-4 ps-0 mb-3 d-flex justify-content-center">
                      <div className="hotel_form_input">
                        <label className="form_label">
                          No. of Adults (12+ Years)
                        </label>
                        <select
                          value={formDataDynamic[index]?.NoOfAdults || 1}
                          required
                          className="hotel_input_select"
                          onChange={(e) =>
                            handleFormChange(
                              index,
                              "NoOfAdults",
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-4 ps-0 mb-3 d-flex justify-content-center">
                      <div className="hotel_form_input">
                        <label className="form_label">
                          No. of Child (0-12 Years)
                        </label>
                        <select
                          value={formDataDynamic[index]?.NoOfChild || 0}
                          required
                          className="hotel_input_select"
                          name="noOfChild"
                          onChange={(e) =>
                            handleFormChange(
                              index,
                              "NoOfChild",
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[0, 1, 2, 3, 4].map((childCount) => (
                            <option key={childCount} value={childCount}>
                              {childCount}
                            </option>
                          ))}
                        </select>
                        {formDataDynamic[index]?.NoOfChild > 0 && (
                          <div className="child-age-container">
                            <label>Child Age:</label>
                            {Array.from({
                              length: formDataDynamic[index]?.NoOfChild || 0,
                            }).map((_, childIndex) => (
                              <div key={childIndex} className="child-age-input">
                                <select
                                  value={
                                    formDataDynamic[index]?.ChildAge?.[
                                      childIndex
                                    ] || ""
                                  }
                                  required
                                  className="hotel_input_select"
                                  onChange={(e) =>
                                    handleChildAgeChange(
                                      index,
                                      childIndex,
                                      e.target.value
                                    )
                                  }
                                >
                                  {/* Assuming the age range is from 1 to 12 */}
                                  {Array.from({ length: 11 }, (_, i) => (
                                    <option key={i} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {condition > 1 && (
              <button onClick={handleDeleteRoom} className="delete-button">
                <FaTrash />
              </button>
            )}
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">Star Rating*</label>
              <select
                name="star"
                required
                value={values.star}
                onChange={handleInputChange}
                className="hotel_input_select"
              >
                <option value={5}>5 Star</option>
                <option value={4}>4 Star</option>
                <option value={3}>3 Star</option>
                <option value={2}>2 Star</option>
                <option value={1}>1 Star</option>
              </select>
              {error && values.star === "" && (
                <label className="error_label">
                  Please Select a Star Rating{" "}
                </label>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">No. of Nights</label>
              <input
                type="number"
                required
                min="0"
                name="night"
                value={nightdays}
                className="hotel_input_select"
                disabled
              />
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3"
          >
            <div className="hotel_form_input">
              <label className="form_label">Nationality</label>
              <input
                type="text"
                required
                name="nationality"
                value={values.nationality}
                onChange={handleInputChange}
                placeholder="IN"
                disabled
              />
              {error && values.nationality.length < 1 ? (
                <label
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  Please Enter this Field{" "}
                </label>
              ) : (
                ""
              )}
            </div>
          </motion.div>

          <motion.div variants={variants} className="row button-row">
            <div className="col-lg-12 col-md-12 col-xs-12 pe-0 mb-3 d-flex justify-content-center hotelFormbutton-new align-items-center">
              <button type="submit" style={{ border: "none", color: "#000" }}>
                Search Hotel
              </button>
            </div>
          </motion.div>
        </motion.div>
      </form>
      {/* )} */}
    </>
  );
};

export default HotelForm;
