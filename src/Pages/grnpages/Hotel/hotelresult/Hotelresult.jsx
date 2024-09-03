import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import starsvg from "./starsvg.svg";
import starBlank from "./starBlank.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import freeWifi from "../SVGs/freeWifi.svg";
import freeBreakfast from "../SVGs/freeBreakfast.svg";
import freeParking from "../SVGs/freeParking.svg";
import drinkingWater from "../SVGs/DrinkingWater.svg";
import expressCheckin from "../SVGs/expressCheckin.svg";
import welcomeDrink from "../SVGs/welcomeDrink.svg";
import freeGym from "../SVGs/freeGym.svg";
import {
  hotelGalleryRequest,
  singleHotelGRN,
  hotelActionGrn,
  clearHotelRoomAndGallery,
} from "../../../../Redux/HotelGrn/hotel";
import { MdOutlineFreeBreakfast } from "react-icons/md";
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
  //grn
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchId, setSearchId] = useState(
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
  );
 
  useEffect(() => {
    setSearchId(
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id
    );
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id]);

  // useEffect(() => {
  //   // dispatch(clearHotelReducerGrn());
  //   if (reducerState?.hotelSearchResultGRN?.hotels.length === 0) {
  //     dispatch(clearHotelRoomAndGallery());
  //     navigate("/hotels");
  //   }
  // }, []);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
        ?.length >= 0
    ) {
      setLoader(false);
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels]);

  useEffect(() => {
    setResult(
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
    );
    // setHasMore(reducerState?.hotelSearchResultGRN?.hasMore);
  }, [reducerState?.hotelSearchResultGRN]);
 

  const [scrollLoding, setScrollLoading] = useState(false);

  useEffect(() => {
    dispatch(clearHotelRoomAndGallery());
  }, []);

  const handleClick = (item) => {
    // setLoading(true);

    const payload = {
      data: {
        rate_key: item?.min_rate?.rate_key,
        group_code: item?.min_rate?.group_code,
      },
      searchID: item?.search_id,
      hotel_code: item?.hotel_code,
    };

    const galleryPayload = {
      hotel_id: item?.hotel_code,
    };

    dispatch(hotelGalleryRequest(galleryPayload));
    dispatch(singleHotelGRN(payload));
    navigate("/hotels/hotelsearchs/HotelBooknowgrm");
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const [sortOption, setSortOption] = useState("lowToHigh");
  const [searchInput, setSearchInput] = useState("");

  const maxPrice = result?.reduce((max, hotel) => {
    return Math.max(max, hotel?.min_rate?.price || 0);
  }, 0);
  const minPrice = result?.reduce((min, hotel) => {
    return Math.min(min, hotel?.min_rate?.price || Infinity);
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

  const allFacilities = result?.reduce((allFacilities, hotel) => {
    return allFacilities?.concat(
      hotel?.facilities?.split(";").map((facility) => facility?.trim())
    );
  }, []);

  const allUniqueFacilities = [...new Set(allFacilities)];
  const initialDisplayCount = 10;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(
      displayCount === initialDisplayCount
        ? allUniqueFacilities?.length
        : initialDisplayCount
    );
  };

 

  const sortedAndFilteredResults = result
    ?.filter((item) => {
      const hotelName = item?.name?.toLowerCase();
      const hotelAddress = item?.address?.toLowerCase();
      const starRating = item?.category;
      const categoryFilters = selectedCategory?.map((category) => {
        const [groupName, value] = category.split(":");
        switch (groupName) {
          case "star":
            return starRating === parseInt(value);

          case "facility":
            return item?.facilities
              ?.split(";")
              .map((f) => f.trim())
              .includes(value);
          default:
            return false;
        }
      });
      const priceInRange = item?.min_rate?.price <= priceRangeValue;
      const searchFilter =
        hotelName?.includes(searchInput?.toLowerCase()) ||
        hotelAddress?.includes(searchInput?.toLowerCase());
      return (
        categoryFilters?.every((filter) => filter) &&
        searchFilter &&
        priceInRange
      );
    })
    ?.sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.min_rate?.price - b?.min_rate?.price
        : b?.min_rate?.price - a?.min_rate?.price
    )
    ?.filter((item) => item?.images?.main_image !== "");

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [xMaxLocation, setxMaxLocation] = useState(0);
  const [valueShow, setValueShow] = useState(false);
  const handelClearOne = (item) => {
    let select = selectedCategory.filter((item1) => item1 !== item);
    setSelectedCategory(select);
  };

  const handleMouseMove = (e) => {
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
    if (cursorPosition.y === 0) {
      setCursorPosition((prevState) => ({ ...prevState, y: e.clientY }));
    }
  };
  useEffect(() => {
    if (xMaxLocation < cursorPosition.x) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
    }
  }, [cursorPosition]);

  useEffect(() => {
    if (xMaxLocation < cursorPosition.x) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
    }
  }, [cursorPosition]);

  //grn

  //filtercomponent

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) {
      // setScrollLoading(true);

      const payloadgrn = JSON.parse(sessionStorage.getItem("Payload"));
      const grnPayload = { ...payloadgrn };
      dispatch(hotelActionGrn(grnPayload, page));
    }
  }, [page]);
  useEffect(() => {
    setScrollLoading(false);
  }, [result]);

  return (
    <>
      {loader ? (
        <HotelLoading />
      ) : (
        <section className="">
          <div className="container">
            <div className="row">
              <div className="d-none d-sm-block col-lg-3 pt-4 ">
                <div className="flightFilterBox  filtersection">
                  <div className="filterTitle">
                    <p>Select Filters</p>
                  </div>
                  <div className="ClearFilterOneyOneContainer">
                    {selectedCategory.map((item, index) => (
                      <div
                        onClick={() => handelClearOne(item)}
                        className="ClearFilterOneyOneItemDev"
                      >
                        <div className="ClearFilterOneyOneItem">{item} </div>
                        <div className="ClearFilterOneyOneItemX">X</div>
                      </div>
                    ))}
                  </div>
                  <div className="innerFilter">
                    <div>
                      <label className="sidebar-label-container ps-0">
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
                      <div className="position-relative">
                        <input
                          type="range"
                          min={minPrice + 1}
                          max={maxPrice + 5001}
                          // step="5000"
                          value={priceRangeValue}
                          onChange={handlePriceRangeChange}
                          onMouseOver={() => setValueShow(true)}
                          onMouseLeave={() => {
                            setValueShow(false);
                            setCursorPosition({ x: 0, y: 0 });
                          }}
                          onMouseOut={() => {
                            setValueShow(false);
                            setCursorPosition({ x: 0, y: 0 });
                          }}
                          onMouseMove={(e) => handleMouseMove(e)}
                        />
                        {valueShow && (
                          <span
                            className="btn btn-secondary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Tooltip on top"
                            style={{
                              position: "fixed",
                              left: cursorPosition.x - 20,
                              top: cursorPosition.y - 60,
                            }}
                          >
                            {" "}
                            ₹{priceRangeValue}
                          </span>
                          // <span style={{ position: "absolute" }} id="tooltip"> ₹{priceRangeValue}</span>
                        )}
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
                          { value: "2", label: "⭐⭐" },
                          { value: "1", label: "⭐" },
                        ].map((starRating, index) => {
                          const itemCount = result?.filter(
                            (item) =>
                              item.category === parseInt(starRating.value)
                          ).length;

                          // Generate star icons based on the selected star rating
                          const stars = Array.from({ length: 5 }).map(
                            (_, i) => (
                              <img
                                key={i}
                                src={
                                  i < parseInt(starRating.value)
                                    ? starsvg
                                    : starBlank
                                }
                                alt={
                                  i < parseInt(starRating.value)
                                    ? "star"
                                    : "blank star"
                                }
                              />
                            )
                          );

                          return (
                            <label
                              className="sidebar-label-container exceptionalFlex"
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
                              <span style={{ marginTop: "8px" }}>
                                ({itemCount})
                              </span>
                              <span className="checkmark"></span>
                              <div
                                style={{ marginLeft: "30px", marginTop: "8px" }}
                              >
                                {stars}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      <Divider
                        sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                      />
                    </div>

                    <div>
                      <h2 className="sidebar-title">By Amenities</h2>

                      {result?.length > 0 && (
                        <div>
                          {/* Collect all facilities from all hotels */}
                          {result
                            ?.reduce((allFacilities, hotel) => {
                              return allFacilities?.concat(
                                hotel?.facilities
                                  ?.split(";")
                                  ?.map((facility) => facility.trim())
                              );
                            }, [])
                            ?.filter(
                              (facility, index, self) =>
                                self.indexOf(facility) === index
                            ) // Remove duplicates
                            ?.slice(0, displayCount)
                            ?.map((facility, index) => {
                              const noOfTimesCame = result.reduce(
                                (count, hotel) => {
                                  return (
                                    count +
                                    (hotel?.facilities
                                      ?.split(";")
                                      .map((f) => f.trim())
                                      .includes(facility)
                                      ? 1
                                      : 0)
                                  );
                                },
                                0
                              );

                              return (
                                <label
                                  className="sidebar-label-container exceptionalFlex"
                                  key={index}
                                >
                                  <input
                                    type="checkbox"
                                    onChange={handleRadioChange}
                                    value={facility}
                                    name="facility"
                                    checked={selectedCategory.includes(
                                      `facility:${facility}`
                                    )}
                                  />
                                  <span>({noOfTimesCame})</span>
                                  <span className="checkmark"></span>
                                  <span
                                    style={{
                                      marginLeft: "32px",
                                      marginTop: "8px",
                                    }}
                                  >
                                    {facility}
                                  </span>
                                </label>
                              );
                            })}
                        </div>
                      )}

                      <p
                        className="ShowMoreHotel"
                        style={{ cursor: "pointer" }}
                        onClick={handleShowMore}
                        // onClick={tryBtn}
                      >
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
                    </div>
                  </div>
                </div>
              </div>

              {/* for bigger device  */}

              <div className=" col-lg-9 col-md-12 pt-4">
                {/* <InfiniteScroll
                  dataLength={sortedAndFilteredResults.length}
                  next={fetchMoreData}
                  hasMore={true}
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
                > */}
                {result?.length > 0 ? (
                  sortedAndFilteredResults?.map((result, index) => {
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
                                <p className="hotAddress">{result?.address}</p>
                              </div>
                              <div className="breakCancel">
                                {result?.min_rate?.boarding_details?.[0] !==
                                  "Room Only" && (
                                  <span className="brcl1">
                                    <MdOutlineFreeBreakfast /> Breakfast
                                    Included
                                  </span>
                                )}
                              </div>

                              <div className="breakCancel">
                                {/* <span className="">
                                                                                    {result?.min_rate?.cancellation_policy?.cancel_by_date ? `cancellation till ${dayjs(result?.min_rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}` : ""}
                                                                                </span> */}
                                <div className="othInc">
                                  {result?.min_rate?.other_inclusions?.map(
                                    (inclusion, e) => (
                                      <div className="othIncInner" key={e}>
                                        <div className="d-flex justify-content-start align-items-center gap-2">
                                          {inclusion.toLowerCase() ==
                                            "free wifi" && (
                                            <>
                                              <img src={freeWifi} alt="wifi" />
                                              <p className="panDesign3">
                                                Free WiFi
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free internet" && (
                                            <>
                                              <img src={freeWifi} alt="wifi" />
                                              <p className="panDesign3">
                                                Free internet
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free breakfast" && (
                                            <>
                                              <img
                                                src={freeBreakfast}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                Free Breakfast
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "breakfast" && (
                                            <>
                                              <img
                                                src={freeBreakfast}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                Breakfast
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "continental breakfast" && (
                                            <>
                                              <img
                                                src={freeBreakfast}
                                                alt="wifi"
                                              />

                                              <p className="panDesign3">
                                                Continental breakfast
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free self parking" && (
                                            <>
                                              <img
                                                src={freeParking}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                {" "}
                                                Free self parking
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "parking" && (
                                            <>
                                              <img
                                                src={freeParking}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                {" "}
                                                Free Parking
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free parking" && (
                                            <>
                                              <img
                                                src={freeParking}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                {" "}
                                                Free Parking
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free valet parking" && (
                                            <>
                                              <img
                                                src={freeParking}
                                                alt="wifi"
                                              />

                                              <p className="panDesign3">
                                                {" "}
                                                Free Valet Parking
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "drinking water" && (
                                            <>
                                              <img
                                                src={drinkingWater}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                {" "}
                                                Drinking water
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "express check-in" && (
                                            <>
                                              <img
                                                src={expressCheckin}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                {" "}
                                                Express check-in
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "welcome drink" && (
                                            <>
                                              <img
                                                src={welcomeDrink}
                                                alt="wifi"
                                              />
                                              <p className="panDesign3">
                                                Welcome drink
                                              </p>
                                            </>
                                          )}
                                          {inclusion.toLowerCase() ==
                                            "free fitness center access" && (
                                            <>
                                              <img src={freeGym} alt="wifi" />
                                              <p className="panDesign3">
                                                Free Gym
                                              </p>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="priceBookHotel">
                            <div className="priceBookHotelOne ">
                              {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                              <span>
                                <del>
                                  {" "}
                                  ₹
                                  {result?.min_rate?.price +
                                    Math.floor(
                                      Math.random() * (1200 - 700 + 1)
                                    ) +
                                    700}
                                </del>
                              </span>
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
                    {/* <h1>Result not found</h1> */}
                  </div>
                )}
                {/* </InfiniteScroll> */}
              </div>
              {/* for bigger device  */}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
