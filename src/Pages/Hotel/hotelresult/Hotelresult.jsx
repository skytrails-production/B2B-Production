import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import hotelNotFound from "../../../Images/hotelNotFound.jpg";
import { Grid, Radio, Typography, Button } from "@mui/material";
import RangeSlider from "./RangeSlider";
import HotelDetails from "./HotelDetails";
import building from "../../../Images/building.png";
import night from "../../../Images/night.png";
import beds from "../../../Images/beds.png";
import unitednations from "../../../Images/unitednations.png";
import addgroup from "../../../Images/addgroup.png";
import review from "../../../Images/review.png";
import Rating from "./Rating";
import starsvg from "../../../Images/star.svg";
import starBlank from "../../../Images/starBlank.svg";
import Link from "@mui/material/Link";
import "./hotelresult.css";
import { Spacer } from "@chakra-ui/react";
import Loader from "../../Loader/Loader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearHotelReducer } from "../../../Redux/Hotel/hotel";
import HotelLoading from "../hotelLoading/HotelLoading";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Popularfilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.warn("State Data", reducerState?.hotelSearchResult);

  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  const handleClick = (resultIndex, hotelCode) => {
    navigate("HotelBooknow");
    sessionStorage.setItem("ResultIndex", resultIndex);
    sessionStorage.setItem("HotelCode", hotelCode);
  };
  function All_Hotel_Reducer_Clear() {
    dispatch(clearHotelReducer());
    sessionStorage.removeItem("hotelFormData");
  }
  const handleModifySearchClick = async () => {
    await All_Hotel_Reducer_Clear();
    navigate("/hotel");
  };
  useEffect(() => {
    sessionStorage.removeItem("ResultIndex");
    sessionStorage.removeItem("HotelCode");
  }, []);
  useEffect(() => {
    if (result?.length === 0 || result === undefined) {
      All_Hotel_Reducer_Clear();
      navigate("/hotel");
    }
  }, [result]);

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

  const [sortOption, setSortOption] = useState("lowToHigh");
  const [filterRating, setFilterRating] = useState(null);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };

  const maxPrice = result?.HotelResults?.reduce((max, hotel) => {
    return Math.max(max, hotel?.Price?.PublishedPriceRoundedOff || 0);
  }, 0);
  const minPrice = result?.HotelResults?.reduce((min, hotel) => {
    return Math.min(min, hotel?.Price?.PublishedPriceRoundedOff || Infinity);
  }, Infinity);

  // console.log(result, "resulthotelll.////////////////////////////////////////////////////////////////////");

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001);

  // const handleSearchChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };

  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice]);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    const radioGroupName = event.target.name;
    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[type="checkbox"]').forEach((radio) => {
        radio.checked = false;
      });
      return;
    }
    setSelectedCategory((prevSelectedCategory) => {
      let updatedCategory = [...prevSelectedCategory];
      const isValueSelected = updatedCategory.some(
        (category) => category === `${radioGroupName}:${selectedValue}`
      );
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

      return updatedCategory;
    });
  };

  // console.log(selectedCategory, "selected category");

  const sortedAndFilteredResults = result?.HotelResults?.filter((item) => {
    const hotelName = item?.HotelName?.toLowerCase();
    const hotelAddress = item?.HotelLocation?.toLowerCase();
    const starRating = item?.StarRating;
    // const publishedPrice = item?.Price?.PublishedPrice;
    const location = item?.HotelLocation;
    const categoryFilters = selectedCategory?.map((category) => {
      const [groupName, value] = category.split(":");
      switch (groupName) {
        case "star":
          return starRating === parseInt(value);
        // case "price":
        //   switch (value) {
        //     case "2000":
        //       return publishedPrice <= 2000;
        //     case "3000":
        //       return publishedPrice > 2000 && publishedPrice <= 3000;
        //     case "6500":
        //       return publishedPrice > 3000 && publishedPrice <= 6500;
        //     case "9999":
        //       return publishedPrice > 6500 && publishedPrice <= 10000;
        //     case "10000":
        //       return publishedPrice > 10000;
        //   }
        case "location":
          return location === value;
        default:
          return false;
      }
    });
    const priceInRange = item?.Price?.PublishedPrice <= priceRangeValue;
    // const searchFilter =
    //   hotelName?.includes(searchInput?.toLowerCase()) ||
    //   hotelAddress?.includes(searchInput?.toLowerCase());
    // return categoryFilters?.every((filter) => filter);
    return (
      // categoryFilters?.every((filter) => filter) && searchFilter && priceInRange
      categoryFilters?.every((filter) => filter) && priceInRange
    );
  })?.sort((a, b) =>
    sortOption === "lowToHigh"
      ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
      : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
  );

  // console.log("sortedAndFilteredResults",sortedAndFilteredResults);

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  const initialDisplayCount = 6;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(
      displayCount === initialDisplayCount
        ? result?.HotelResults?.length
        : initialDisplayCount
    );
  };

  // Calculate total number of guests
  const totalAdult = data?.NoOfAdults || 0;
  const totalChild = data?.NoOfChild || 0;

  // console.log("shaan", sortedAndFilteredResults)
  if (result?.length === 0 || result === undefined) {
    // navigate("/hotel")
    return (
      <>
        <HotelLoading />
      </>
    );
  }
  return (
    <div className="row">
      <div className="col-lg-3 col-md-12 ">
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
             
              <div className="innerFilter">
                <div>
                  <label
                    className="sidebar-label-container-new  ps-0"
                    style={{ paddingLeft: "35px" }}
                  >
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
                        color: selectedCategory.length > 0 ? "red" : "gray",
                      }}
                    >
                      Clear Filter
                    </span>
                  </label>
                </div>

                <div>
                  <h2 className="sidebar-title">Sort By Price</h2>
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
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    <input
                      type="range"
                      min={minPrice + 1}
                      max={maxPrice + 5001}
                      step="5000"
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
                  <h2 className="sidebar-title">By Rating</h2>
                  <div>
                    {[
                      { value: "5", label: "⭐⭐⭐⭐⭐" },
                      { value: "4", label: "⭐⭐⭐⭐" },
                      { value: "3", label: "⭐⭐⭐" },
                    ].map((starRating, index) => {
                      const itemCount = result?.HotelResults?.filter(
                        (item) => item.StarRating === parseInt(starRating.value)
                      ).length;

                      // Generate star icons based on the selected star rating
                      const stars = Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          src={
                            i < parseInt(starRating.value) ? starsvg : starBlank
                          }
                          alt={
                            i < parseInt(starRating.value)
                              ? "star"
                              : "blank star"
                          }
                        />
                      ));

                      return (
                        <label
                          className="sidebar-label-container exceptionalFlex"
                          style={{ paddingLeft: "35px" }}
                          key={index}
                        >
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={starRating.value}
                            name="star"
                            checked={selectedCategory.includes(
                              `star:${starRating.value}`
                            )}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>
                          <div>{stars}</div>
                        </label>
                      );
                    })}
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>

                <div>
                  <h2 className="sidebar-title">By Locality</h2>
                  <div>
                    {[
                      ...new Set(
                        result?.HotelResults?.filter(
                          (item) =>
                            item?.HotelLocation !== null &&
                            item?.HotelLocation !== ""
                        )?.map((item) => item?.HotelLocation)
                      ),
                    ]
                      .slice(0, displayCount)
                      .map((location, index) => {
                        const locationCount = result?.HotelResults?.filter(
                          (item) => item.HotelLocation === location
                        ).length;

                        return (
                          <label
                            className="sidebar-label-container exceptionalFlex"
                            style={{ paddingLeft: "35px" }}
                            key={index}
                          >
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value={location}
                              name="location"
                              checked={selectedCategory.includes(
                                `location:${location}`
                              )}
                            />
                            <span>({locationCount})</span>
                            <span className="checkmark"></span>
                            {location}
                          </label>
                        );
                      })}

                    {result?.HotelResults?.length > initialDisplayCount && (
                      <p className="ShowMoreHotel" onClick={handleShowMore}>
                        {displayCount === initialDisplayCount ? (
                          <>
                            Show More
                            <svg
                              height="20"
                              viewBox="0 0 24 24"
                              width="25"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2722987"
                            >
                              <g id="_16" data-name="16">
                                <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path>
                              </g>
                            </svg>
                          </>
                        ) : (
                          <>
                            Show Less
                            <svg
                              className="rotttt"
                              height="20"
                              viewBox="0 0 24 24"
                              width="25"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2722987"
                            >
                              <g id="_16" data-name="16">
                                <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path>
                              </g>
                            </svg>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>

                {/* <div>
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    {[
                      { value: "2000", min: "0", max: "2000", label: "₹0-2,000" },
                      { value: "3000", min: "2000", max: "3000", label: "₹2,000-3,000" },
                      { value: "6500", min: "3000", max: "6500", label: "₹3,000-6,500" },
                      { value: "9999", min: "6500", max: "10000", label: "₹6,500-10,000" },
                      { value: "10000", min: "10000", max: "10000000", label: "₹10,000 and Above" }
                    ].map((priceRange, index) => {
                      // Count the number of items in each price category
                      const itemCount = result?.HotelResults?.filter(item =>
                        item?.Price?.PublishedPrice >= priceRange.min && item?.Price?.PublishedPrice <= priceRange.max
                      ).length;

                      return (
                        <label className="sidebar-label-container exceptionalFlex" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={priceRange.value}
                            name="price"
                            checked={selectedCategory.includes(`price:${priceRange.value}`)}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>{priceRange.label}

                        </label>
                      );
                    })}
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div> */}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="col-lg-9 col-md-12 ">
        {/* <div className="col-lg-12">
          <div className="outerFilterBox">
            <div className="filterBox">
              <p>Showing {sortedAndFilteredResults?.length} Results</p>
              <div>
                <label>Sort By:</label>
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>

              <div>
                <label>Rating:</label>
                <select value={filterRating} onChange={handleFilterChange}>
                  <option value="">All Ratings</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        <div className="col-lg-12">
          {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
            sortedAndFilteredResults?.map((result, index) => {
              const resultIndex = result?.ResultIndex;
              const hotelCode = result?.HotelCode;
              return (
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                  className="col-lg-12"
                >
                  <motion.div
                    variants={variants}
                    onClick={(e) => handleClick(resultIndex, hotelCode)}
                    className="hotelResultBoxSearch-new"
                    key={index}
                  >
                    <div>
                      <div className="hotelImage">
                        <img
                          src={
                            result?.HotelPicture ===
                            "https://b2b.tektravels.com/Images/HotelNA.jpg"
                              ? hotelNotFound
                              : result?.HotelPicture
                          }
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = hotelNotFound;
                          }}
                          alt="package-img"
                        />
                      </div>
                      <div className="hotelResultDetails">
                        <div className="hotleTitle">
                          <p>{result?.HotelName}</p>
                        </div>

                        <div className="hotelRating">
                          <div>
                            {Array.from(
                              { length: result?.StarRating },
                              (_, index) => (
                                <img
                                  key={index}
                                  src={starsvg}
                                  alt={`Star ${index + 1}`}
                                />
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="hotAddress">{result?.HotelAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className="priceBookHotel">
                      <div className="priceBookHotelOne ">
                        {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                        <span>Offer Price</span>
                        <p>₹{result?.Price?.PublishedPrice}</p>
                        <h6 className="showmorehotel">
                          Show More
                          <ArrowForwardIosIcon />
                        </h6>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            <div className="filteredNotFound">
              {/* <img src={hotelFilter} alt="filter image" /> */}
              <h1>Result not found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
