import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import hotelNotFound from "../../../Images/hotelNotFound.jpg"
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
import mainImage from "../../../Images/mainImage.png";
import starsvg from "../../../Images/star.svg"
import starBlank from "../../../Images/starBlank.svg"
import Link from "@mui/material/Link";
import "./hotelresult.css";
import { Spacer } from "@chakra-ui/react";
import Loader from "../../Loader/Loader";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearHotelReducer } from "../../../Redux/Hotel/hotel";
import HotelLoading from "../hotelLoading/HotelLoading";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  console.warn("State Data", reducerState?.hotelSearchResult);

  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  const handleClick = (resultIndex, hotelCode) => {
    navigate("HotelBooknow");
    sessionStorage.setItem("ResultIndex", resultIndex);
    sessionStorage.setItem("HotelCode", hotelCode);
  };
  function All_Hotel_Reducer_Clear() {
    dispatch(clearHotelReducer());
    sessionStorage.removeItem("hotelFormData")
  }
  const handleModifySearchClick = async () => {
    await All_Hotel_Reducer_Clear()
    navigate("/hotel");
  };
  useEffect(() => {
    sessionStorage.removeItem("ResultIndex")
    sessionStorage.removeItem("HotelCode")

  }, []);
  useEffect(() => {
    if (result?.length === 0 || result === undefined) {
      All_Hotel_Reducer_Clear()
      navigate("/hotel");
    }
  }, [result])


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

  const [sortOption, setSortOption] = useState("lowToHigh");
  const [filterRating, setFilterRating] = useState(null);


  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };


  const [selectedCategory, setSelectedCategory] = useState([]);

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


  console.log(selectedCategory, "selected category");






  const sortedAndFilteredResults = result?.HotelResults
    ?.filter((item) => {
      console.log("Item:", item);
      const starRating = item?.StarRating;
      const publishedPrice = item?.Price?.PublishedPrice;
      const categoryFilters = selectedCategory?.map((category) => {
        switch (category) {
          case "5":
            return item?.StarRating === 5;
          case "4":
            return item?.StarRating === 4;
          case "3":
            return item?.StarRating === 3;
          case "2":
            return item?.StarRating === 2;
          case "1":
            return item?.StarRating === 1;
          case "2000":
            return publishedPrice <= 2000;
          case "3000":
            return publishedPrice > 2000 && publishedPrice <= 3000;
          case "6500":
            return publishedPrice > 3000 && publishedPrice <= 6500;
          case "9999":
            return publishedPrice > 6500 && publishedPrice <= 10000;
          case "10000":
            return publishedPrice > 10000;
          default:
            return false;
        }
      });
      return categoryFilters?.every((filter) => filter);
      console.log("Category Filters:", categoryFilters);
    })
    ?.sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
        : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
    );



  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });


  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  // Calculate total number of guests
  const totalAdult = data?.NoOfAdults || 0;
  const totalChild = data?.NoOfChild || 0;

  // console.log("shaan", sortedAndFilteredResults)
  if (result?.length === 0 || result === undefined) {
    // navigate("/hotel")
    return (<>
      <HotelLoading />
    </>)
  }
  return (

    <div className="row">
      <div className="col-lg-3 col-md-12 ">
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
                  <h2 className="sidebar-title">Sort By</h2>
                  <select className="highSelect" value={sortOption} onChange={handleSortChange}>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>

                <div>
                  <h2 className="sidebar-title">By Rating</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="5"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                      </div>
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="4"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="3"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="2"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="1"
                        name="test"
                      />
                      <div>
                        <span className="checkmark">
                        </span>
                        <div>
                          <img src={starsvg} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                        </div>
                      </div>
                    </label>


                  </div>

                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Price</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="2000" name="test" />
                      <span className="checkmark"></span>₹0-2,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="3000" name="test" />
                      <span className="checkmark"></span>₹2,000-3,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="6500" name="test" />
                      <span className="checkmark"></span>₹3,000-6,500
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="9999" name="test" />
                      <span className="checkmark"></span>₹6,500-10,000
                    </label>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="10000" name="test" />
                      <span className="checkmark"></span>₹10,000 and Above
                    </label>

                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>



              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="col-lg-9 col-md-12 ">


        <div className="col-lg-12">
          <div className="outerFilterBox">
            <div className="filterBox">
              <p>Showing {' '}{sortedAndFilteredResults?.length} {' '} Results</p>
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
        </div>

        <div className="col-lg-12">
          {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
            sortedAndFilteredResults?.map((result, index) => {
              const resultIndex = result?.ResultIndex;
              const hotelCode = result?.HotelCode;
              return (
                <motion.div variants={variants} initial="initial"
                  whileInView="animate" className="col-lg-12" >

                  <motion.div variants={variants} onClick={(e) => handleClick(resultIndex, hotelCode)} className="hotelResultBoxSearch" key={index}>
                    <div>
                      <div className="hotelImage">
                        <img
                          src={result?.HotelPicture === "https://b2b.tektravels.com/Images/HotelNA.jpg" ? hotelNotFound : result?.HotelPicture}
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
                            {Array.from({ length: result?.StarRating }, (_, index) => (
                              <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="hotAddress">
                            {result?.HotelAddress}
                          </p>
                        </div>


                      </div>
                    </div>

                    <div className="priceBookHotel">
                      <div className="priceBookHotelOne ">
                        {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                        <span>Offer Price</span>
                        <p>₹{result?.Price?.PublishedPrice}</p>
                        <h4>Show More<ArrowForwardIosIcon /></h4>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })
          ) :

            (
              <div className="filteredNotFound">
                {/* <img src={hotelFilter} alt="filter image" /> */}
                <h1>Result not found</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>

  );
}
