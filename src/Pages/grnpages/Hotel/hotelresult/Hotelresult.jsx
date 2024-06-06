import React, { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import starsvg from "./starsvg.svg";
import starBlank from "./starBlank.svg";
import { hotelActionGrn } from "../../../../Redux/HotelGrn/hotel";
// import hotelFilter from "../../images/hotelFilter.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import {
  hotelGalleryRequest,
  singleHotelGRN,
  clearHotelReducer,
} from "../../../../Redux/HotelGrn/hotel";
import "./hotelresult.css";
import HotelLoading from "../../../Hotel/hotelLoading/HotelLoading";

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

export default function Popularfilter() {
  function All_Hotel_Reducer_Clear() {
    dispatch(clearHotelReducer());
    sessionStorage.removeItem("hotelFormData");
  }

  //grn
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);

  const dispatch = useDispatch();
  const [result, setResult] = useState(
    reducerState?.hotelSearchResultGRN?.hotels
  );
  useEffect(() => {
    setResult(reducerState?.hotelSearchResultGRN?.hotels);
    setHasMore(reducerState?.hotelSearchResultGRN?.hasMore);
  }, [reducerState?.hotelSearchResultGRN]);

  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [scrollLoding, setScrollLoading] = useState(false);

  const [searchId, setSearchId] = useState(
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id
  );

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 &&
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
        ?.regular?.length > 0
    ) {
      navigate("/hotels/hotelsearchs/HotelBooknowgrm");
      setLoading(false);
    }
  }, [
    reducerState?.hotelSearchResultGRN?.hotelDetails?.status ||
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images,
  ]);

  const handleClick = (item) => {
    // console.log(item)
    setLoading(true);
    const payload = {
      data: {
        rate_key: item?.min_rate?.rate_key,
        group_code: item?.min_rate?.group_code,
      },
      searchID: searchId,
      hotel_code: item?.hotel_code,
    };

    const galleryPayload = {
      hotel_id: item?.hotel_code,
    };
    // console.log(galleryPayload, 'payload')

    dispatch(hotelGalleryRequest(galleryPayload));
    dispatch(singleHotelGRN(payload));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const [sortOption, setSortOption] = useState("lowToHigh");
  const [searchInput, setSearchInput] = useState("");

  const maxPrice = result?.HotelResults?.reduce((max, hotel) => {
    return Math.max(max, hotel?.Price?.PublishedPriceRoundedOff || 0);
  }, 0);
  const minPrice = result?.HotelResults?.reduce((min, hotel) => {
    return Math.min(min, hotel?.Price?.PublishedPriceRoundedOff || Infinity);
  }, Infinity);

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };

  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice]);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleRadioChange = (event) => {
    setSearchInput("");
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

        case "location":
          return location === value;
        default:
          return false;
      }
    });
    const priceInRange = item?.Price?.PublishedPrice <= priceRangeValue;
    const searchFilter =
      hotelName?.includes(searchInput?.toLowerCase()) ||
      hotelAddress?.includes(searchInput?.toLowerCase());
    // return categoryFilters?.every((filter) => filter);
    return (
      categoryFilters?.every((filter) => filter) && searchFilter && priceInRange
    );
  })?.sort((a, b) =>
    sortOption === "lowToHigh"
      ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
      : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sortedAndFilteredResults]);

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  console.log(reducerState, "reducer state");

  // const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));

  const initialDisplayCount = 6;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(
      displayCount === initialDisplayCount
        ? result?.HotelResults?.length
        : initialDisplayCount
    );
  };
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [xMaxLocation, setxMaxLocation] = useState(0);
  const [valueShow, setValueShow] = useState(false);
  const handelClearOne = (item) => {
    let select = selectedCategory.filter((item1) => item1 !== item);
    setSelectedCategory(select);
  };

  const handleMouseMove = (e) => {
    // setCursorPosition({...pre, x: e.clientX, y: e.clientY });
    if (xMaxLocation === 0) {
      setxMaxLocation(e.clientX);
    }
    if (
      minPrice + 10 <= Number(priceRangeValue) &&
      Number(priceRangeValue) < maxPrice - 500
    ) {
      if (xMaxLocation < e.clientX) {
        setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
      } else {
        setCursorPosition((prevState) => ({ ...prevState, x: e.clientX }));
      }
    }
    if (xMaxLocation < e.clientX) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
    }
    // console.log(minPrice, Number(priceRangeValue), maxPrice)
    if (cursorPosition.y === 0) {
      setCursorPosition((prevState) => ({ ...prevState, y: e.clientY }));
    }
    // console.log(e.clientX,e.clientY,)
  };
  useEffect(() => {
    if (xMaxLocation < cursorPosition.x) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
      // console.log(xMaxLocation)
    }
  }, [cursorPosition]);

  useEffect(() => {
    if (!valueShow) {
      window.scrollTo(0, 0);
    }
  }, [sortedAndFilteredResults]);

  //grn

  //filtercomponent
  const [checkedItems, setCheckedItems] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const byPriceOptions = [
    { id: 1, name: "Low to High" },
    { id: 2, name: "High to Low" },
  ];

  const byLocalty = [
    { id: 1, name: "Dal Lake" },
    { id: 2, name: "Nishat" },
    { id: 1, name: "Raj Baagh" },
    { id: 2, name: "Boulevard Street" },
  ];

  const [checkboxItems, setCheckboxItems] = useState([
    { id: 1, name: "5 Star" },
    { id: 2, name: "4 Star" },
    { id: 3, name: "3 Star" },
    { id: 4, name: "2 Star" },
    { id: 5, name: "1 Star" },
  ]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) {
      // setScrollLoading(true);

      const payloadgrn = JSON.parse(sessionStorage.getItem("Payload"));
      const grnPayload = { ...payloadgrn };
      dispatch(hotelActionGrn(grnPayload, page));
    }
    console.log(page, "pageNumber");
  }, [page]);
  useEffect(() => {
    setScrollLoading(false);
  }, [result]);
  function fetchMoreData() {
    setPage((pre) => pre + 1);
  }
  const CheckboxList = ({ items, label }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (id) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    return (
      <div>
        <h3>{label}</h3>
        <div className="firstdivstar">
          {items.map((item) => (
            <div key={item.id} className="newfilterbox">
              <input
                className="newcheckbox"
                type="checkbox"
                id={`checkbox-${item.id}`}
                name={item.name}
                checked={checkedItems[item.id] || false}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`} className="itemnew">
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <HotelLoading />
      ) : (
        <section className="">
          <div className="container">
            <div className="row">
              <div className="d-none d-sm-block col-lg-3 pt-4 ">
                <div className="flightFilterBox filtersection">
                  <div className="filterTitles">
                    <div className="filterimgnew">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M9.33147 8V13.2533C9.35813 13.4533 9.29147 13.6667 9.13813 13.8067C9.07646 13.8685 9.0032 13.9175 8.92255 13.951C8.8419 13.9844 8.75545 14.0016 8.66813 14.0016C8.58082 14.0016 8.49437 13.9844 8.41372 13.951C8.33307 13.9175 8.25981 13.8685 8.19813 13.8067L6.85813 12.4667C6.78542 12.3956 6.73014 12.3087 6.6966 12.2127C6.66306 12.1167 6.65218 12.0142 6.6648 11.9133V8H6.6448L2.8048 3.08C2.69654 2.94102 2.64769 2.76484 2.66893 2.58995C2.69016 2.41507 2.77976 2.2557 2.91813 2.14667C3.0448 2.05333 3.1848 2 3.33147 2H12.6648C12.8115 2 12.9515 2.05333 13.0781 2.14667C13.2165 2.2557 13.3061 2.41507 13.3273 2.58995C13.3486 2.76484 13.2997 2.94102 13.1915 3.08L9.35147 8H9.33147Z"
                          fill="black"
                        />
                      </svg>
                      <p className="filterssnew">Filter</p>{" "}
                    </div>

                    <p className="clearall">Clear all</p>
                  </div>

                  <div className="innerFilter">
                    <div>
                      <h2 className="sidebar-titles">Star Rating</h2>
                      <CheckboxList items={checkboxItems} />
                      <h2 className="sidebar-titles">By Price</h2>
                      <CheckboxList items={byPriceOptions} />
                      <h2 className="sidebar-titles">By Locality</h2>
                      <CheckboxList items={byLocalty} />
                    </div>
                  </div>
                </div>
              </div>

              {/* for bigger device  */}

              <div className=" col-lg-9 col-md-12 pt-4">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.8 }}
                  className="col-lg-12"
                >
                  <motion.div
                    variants={variants}
                    className="hotelResultBoxSearch"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="hotelImages"
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="hotelImage">
                          <p className="sortby">Sort By</p>
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div className="hotelImage">
                            <p className="sortby">Price</p>
                          </div>
                          <select className="highSelect">
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                          </select>
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div className="hotelImage">
                            <p className="sortby">Price</p>
                          </div>
                          <select className="highSelect">
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="priceBookHotel"></div>
                  </motion.div>
                </motion.div>
                <InfiniteScroll
                  dataLength={result.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Thank you for exploring! You've reached the end.</b>
                    </p>
                  }
                >
                  {result?.length > 0 ? (
                    result?.map((result, index) => {
                      // const resultIndex = result?.ResultIndex;
                      const hotelCode = result?.hotel_code;
                      return (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.8 }}
                          className="col-lg-12"
                        >
                          <motion.div
                            variants={variants}
                            onClick={() => handleClick(result)}
                            className="hotelResultBoxSearch"
                            key={index}
                          >
                            <div>
                              <div className="hotelImage">
                                <img
                                  src={
                                    result?.images?.url ||
                                    "https://b2b.tektravels.com/Images/HotelNA.jpg"
                                  }
                                  alt="hotelImage"
                                />
                              </div>
                              <div className="hotelResultDetails">
                                <div className="hotleTitle">
                                  <p>{result?.name}</p>
                                </div>

                                <div className="hotelRating">
                                  <div>
                                    {Array.from(
                                      { length: result?.category },
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
                                  <p className="hotAddress">
                                    {result?.address}
                                  </p>
                                </div>

                                {result?.HotelLocation && (
                                  <div>
                                    <p className="hotAddressLocation">
                                      <span>
                                        <svg
                                          height="17"
                                          viewBox="0 0 32 32"
                                          width="17"
                                          xmlns="http://www.w3.org/2000/svg"
                                          id="fi_3138736"
                                        >
                                          <g id="Pin-2" data-name="Pin">
                                            <path
                                              fill="#d90429"
                                              d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"
                                            ></path>
                                          </g>
                                        </svg>
                                      </span>
                                      {result?.HotelLocation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="priceBookHotel">
                              <div className="priceBookHotelOne ">
                                {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                                <span>Offer Price</span>
                                <p>₹{result?.min_rate?.price}</p>
                                <button className="showmore">Show More</button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="filteredNotFound">
                      {/* <img src={hotelFilter} alt="filter" /> */}
                      <h1>Result not found</h1>
                    </div>
                  )}
                </InfiniteScroll>
              </div>
              {/* for bigger device  */}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
