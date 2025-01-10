import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RowingIcon from "@mui/icons-material/Rowing";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
// import HolidayRating from "../holidaypackageresult/HolidayRating";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import information from "../../../Images/information.png";
import StarIcon from "@mui/icons-material/Star";
import CommitIcon from "@mui/icons-material/Commit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CabinIcon from "@mui/icons-material/Cabin";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeckIcon from "@mui/icons-material/Deck";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import LandslideIcon from "@mui/icons-material/Landslide";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import PoolIcon from "@mui/icons-material/Pool";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ForestIcon from "@mui/icons-material/Forest";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
// import "./holidaybooknowdetail.css";
import { textAlign } from "@mui/system";
import { Divider } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router";
import "./ViewPackages.css";

import { FaPlane, FaBus, FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { Carousel } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are imported

const ViewPackageDetails = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const viewDataSession = sessionStorage.getItem("selectedPackage");
  const viewData = JSON.parse(viewDataSession);

  // console.log(viewData, "view data session");

  // Save the fetched package details in localStorage
  //   localStorage.setItem('packageDetails', JSON.stringify(packageDetails));
  const storedPackageDetails = JSON.parse(
    localStorage.getItem("packageDetails")
  );
  console.log(
    storedPackageDetails?.data?.inclusions,
    "storedPackageDetails?.data?.detailed_ltinerary"
  );

  //storedPackageDetails?.data?.images?.stays

  //const dayData = storedPackageDetails?.data?.images?.stays.filter((item) => item. itineraryDay === dayNumber);

  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          {/* <div className="col-lg-12 mb-4">
                        <div className="outerFilterBox">
                            <div className="filterBox">
                                <p className="searchDestination">Seach Destination{' '}: <b>{savedDestination}</b></p>
                            </div>
                        </div>
                    </div> */}
          <div className="col-lg-12 mb-4">
            <div className="packageName">
              <p className="mb-3">{storedPackageDetails?.data?.title}</p>
              <span>
                {`${storedPackageDetails?.data.days - 1}N`} /{" "}
                {`${storedPackageDetails?.data?.days}D`}
              </span>
            </div>
          </div>

          <div>
            {/* {storedPackageDetails?.data?.images?.destinations?.length > 0 && (
              <div className="Destinations">
                <h2>Destinations</h2>
                <div className="carouselContainer">
                  <Carousel autoplay>
                    {storedPackageDetails?.data?.images?.destinations.length ? (
                      storedPackageDetails?.data?.images?.destinations?.map(
                        (imgUrl, index) => (
                          <div key={index} className="PackageImg">
                            <img
                              src={imgUrl}
                              alt={`Package Image ${index + 1}`}
                              style={{ width: "100%", height: "auto" }} // Adjust width and height
                            />
                          </div>
                        )
                      )
                    ) : (
                      <div>
                        <img
                          src={storedPackageDetails?.data?.images?.destinations}
                          alt="Fallback"
                          style={{ width: "100%", height: "auto" }} // Adjust width and height
                        />
                      </div>
                    )}
                  </Carousel>
                </div>
               
              </div>
            )} */}

            {/* Activities Section */}
            {/* {storedPackageDetails?.data?.images?.activities?.length > 0 && (
              <div className="Activities">
                <h2>Activities</h2>
                {storedPackageDetails?.data?.images?.activities.map(
                  (activity, index) => (
                    <div key={index} className="ActivityDetails">
                      <h3>{activity.title}</h3>
                    </div>
                  )
                )}
              </div>
            )} */}
          </div>

          <div className="col-lg-12 mb-4 packageImgBox">
            <div className="packageLocation">
              <FmdGoodIcon />
            </div>
            <div>
              <p>
                {storedPackageDetails?.data?.destination
                  ?.map((item) => item.addMore)
                  .join(", ")}
              </p>
              <span>{storedPackageDetails?.data?.country}</span>
            </div>
          </div>

          <div className="col-lg-12 mb-4 packageDetails">
            <h3 className="mb-3  bg-gray-700 " >Package HighLight </h3>
            {storedPackageDetails.data.packageHighLight.map((element, i) => {
              return (
                <div key={i}>
                  <p>{element}</p>
                </div>
              );
            })}
          </div>
          <div className="col-lg-12 mb-4">
            <div className="TripHighlight">
              <p className="mb-3">Inclusions</p>

              <div className="col-lg-10">
                <div className="icon-boxHighlight">
                  {storedPackageDetails?.data?.inclusions?.map((ele, index) => {
                    console.log(ele, "elementssssssssssss");
                    if (
                      ele?.flexibility ||
                      ele?.train ||
                      ele?.bus ||
                      ele?.cab ||
                      ele?.moterBike ||
                      ele?.hotel ||
                      ele?.homeStays ||
                      ele?.guestHouse ||
                      ele?.cruise ||
                      ele?.sightSeeing ||
                      ele?.guide ||
                      ele?.meals ||
                      ele?.breakfast ||
                      ele?.drink ||
                      ele?.visa ||
                      ele?.travelInsurance ||
                      ele?.wildlife ||
                      ele?.heritage ||
                      ele?.adventure ||
                      ele?.beach ||
                      ele?.hillStation ||
                      ele?.nature ||
                      ele?.wellness ||
                      ele?.hiddenGem ||
                      ele?.tax ||
                      ele?.discount ||
                      ele?.waterActivities ||
                      ele?.optionalActivities ||
                      ele?.flexibleBooking ||
                      ele?.wifi
                    ) {
                      console.log(`Inclusion ${index}:`, ele);
                      return (
                        <div key={index}>
                          {ele?.flexibility && (
                            <div className="singleIcon">
                              <span>
                                <CommitIcon />
                              </span>
                              <p>Flexibility</p>
                            </div>
                          )}
                          {ele?.train && (
                            <div className="singleIcon">
                              <span>
                                <TramIcon />
                              </span>
                              <p>Train</p>
                            </div>
                          )}
                          {ele?.bus && (
                            <div className="singleIcon">
                              <span>
                                <DirectionsBusIcon />
                              </span>
                              <p>Bus</p>
                            </div>
                          )}
                          {ele?.cab && (
                            <div className="singleIcon">
                              <span>
                                <DirectionsCarIcon />
                              </span>
                              <p>Cab</p>
                            </div>
                          )}
                          {ele?.moterBike && (
                            <div className="singleIcon">
                              <span>
                                <TwoWheelerIcon />
                              </span>
                              <p>Moterbike</p>
                            </div>
                          )}
                          {ele?.hotel && (
                            <div className="singleIcon">
                              <span>
                                <ApartmentIcon />
                              </span>
                              <p>Hotel</p>
                            </div>
                          )}
                          {ele?.homeStays && (
                            <div className="singleIcon">
                              <span>
                                <HolidayVillageIcon />
                              </span>
                              <p>Homestays</p>
                            </div>
                          )}
                          {ele?.guestHouse && (
                            <div className="singleIcon">
                              <span>
                                <LocationCityIcon />
                              </span>
                              <p>Guesthouse</p>
                            </div>
                          )}
                          {ele?.camp && (
                            <div className="singleIcon">
                              <span>
                                <CabinIcon />
                              </span>
                              <p>Camp</p>
                            </div>
                          )}
                          {ele?.cruise && (
                            <div className="singleIcon">
                              <span>
                                <BlurOnIcon />
                              </span>
                              <p>Cruise</p>
                            </div>
                          )}
                          {ele?.sightSeeing && (
                            <div className="singleIcon">
                              <span>
                                <DeckIcon />
                              </span>
                              <p>Sightseeing</p>
                            </div>
                          )}
                          {ele?.guide && (
                            <div className="singleIcon">
                              <span>
                                <EngineeringIcon />
                              </span>
                              <p>Guide</p>
                            </div>
                          )}
                          {ele?.meals && (
                            <div className="singleIcon">
                              <span>
                                <FastfoodIcon />
                              </span>
                              <p>Meals</p>
                            </div>
                          )}
                          {ele?.breakfast && (
                            <div className="singleIcon">
                              <span>
                                <DinnerDiningIcon />
                              </span>
                              <p>Daily Breakfast</p>
                            </div>
                          )}
                          {ele?.drink && (
                            <div className="singleIcon">
                              <span>
                                <LiquorIcon />
                              </span>
                              <p>Complimentary Drink</p>
                            </div>
                          )}
                          {ele?.visa && (
                            <div className="singleIcon">
                              <span>
                                <ArticleIcon />
                              </span>
                              <p>Visa</p>
                            </div>
                          )}
                          {ele?.travelInsurance && (
                            <div className="singleIcon">
                              <span>
                                <AccountBalanceIcon />
                              </span>
                              <p>Travel Insurance</p>
                            </div>
                          )}
                          {ele?.safeTravel && (
                            <div className="singleIcon">
                              <span>
                                <ParaglidingIcon />
                              </span>
                              <p>Safe to Travel</p>
                            </div>
                          )}
                          {ele?.wildlife && (
                            <div className="singleIcon">
                              <span>
                                <NaturePeopleIcon />
                              </span>
                              <p>Wildlife</p>
                            </div>
                          )}
                          {ele?.heritage && (
                            <div className="singleIcon">
                              <span>
                                <LandslideIcon />
                              </span>
                              <p>Heritage</p>
                            </div>
                          )}
                          {ele?.adventure && (
                            <div className="singleIcon">
                              <span>
                                <KitesurfingIcon />
                              </span>
                              <p>Adventure</p>
                            </div>
                          )}
                          {ele?.beach && (
                            <div className="singleIcon">
                              <span>
                                <PoolIcon />
                              </span>
                              <p>Beach</p>
                            </div>
                          )}
                          {ele?.hillStation && (
                            <div className="singleIcon">
                              <span>
                                <DownhillSkiingIcon />
                              </span>
                              <p>Hill Station</p>
                            </div>
                          )}
                          {ele?.nature && (
                            <div className="singleIcon">
                              <span>
                                <ForestIcon />
                              </span>
                              <p>Nature</p>
                            </div>
                          )}
                          {ele?.wellness && (
                            <div className="singleIcon">
                              <span>
                                <SelfImprovementIcon />
                              </span>
                              <p>Wellness</p>
                            </div>
                          )}
                          {ele?.hiddenGem && (
                            <div className="singleIcon">
                              <span>
                                <FitnessCenterIcon />
                              </span>
                              <p>Hidden Gem</p>
                            </div>
                          )}
                          {ele?.tax && (
                            <div className="singleIcon">
                              <span>
                                <FolderDeleteIcon />
                              </span>
                              <p>Price Inclusive Tax</p>
                            </div>
                          )}
                          {ele?.discount && (
                            <div className="singleIcon">
                              <span>
                                <LocalOfferIcon />
                              </span>
                              <p>50% Off</p>
                            </div>
                          )}
                          {ele?.waterActivities && (
                            <div className="singleIcon">
                              <span>
                                <KayakingIcon />
                              </span>
                              <p>Water Activities</p>
                            </div>
                          )}
                          {ele?.optionalActivities && (
                            <div className="singleIcon">
                              <span>
                                <SportsKabaddiIcon />
                              </span>
                              <p>Optional Activities</p>
                            </div>
                          )}
                          {ele?.flexibleBooking && (
                            <div className="singleIcon">
                              <span>
                                <BookmarkAddIcon />
                              </span>
                              <p>Flexible Booking</p>
                            </div>
                          )}
                          {ele?.wifi && (
                            <div className="singleIcon">
                              <span>
                                <WifiPasswordIcon />
                              </span>
                              <p>WIFI</p>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mb-4">
            <div className="tripOverview">
              <div className="col-lg-10">
                <div className="overviewBox">
                  <span>Overview</span>
                  {/* <p>{onePackage?.overview}</p> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: storedPackageDetails?.data?.overview,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <TabContext value={value} style={{}}>
              <Box
                sx={{
                  borderBottom: 1,
                  backgroundColor: "#DFE6F7",
                  borderColor: "divider",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="ITINERARY" value="1" />
                  <Tab label="HOTEL DETAILS" value="2" />
                  <Tab label="INCLUSIONS &EXCLUSIONS" value="3" />
                  <Tab label="TERMS & CONDITION" value="4" />
                  <Tab label="CANCELLATION POLICY" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="col-lg-12">
                  {storedPackageDetails?.data?.detailed_ltinerary
                    ?.sort((a, b) => a.dayNumber - b.dayNumber) // Sort by dayNumber
                    ?.map((item, index) => {
                      return (
                        <Box
                          key={item._id}
                          mb={2}
                          boxShadow={3}
                          p={2}
                          borderRadius={2}
                        >
                          <Accordion
                            style={{
                              width: "100%",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              overflow: "hidden",
                            }}
                            defaultActiveKey={
                              index === 0 ? index.toString() : undefined
                            }
                          >
                            <Accordion.Item eventKey={index.toString()}>
                              <Accordion.Header
                                style={{ backgroundColor: "#f9f9f9" }}
                              >
                                <Typography
                                  sx={{
                                    color: "#333",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Day {item.dayNumber}: {item.title}
                                </Typography>
                              </Accordion.Header>
                              <Accordion.Body
                                style={{
                                  padding: "16px",
                                  backgroundColor: "#fff",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#555",
                                    fontSize: "14px",
                                    lineHeight: "1.6",
                                  }}
                                >
                                  <p>
                                    <strong
                                      style={{
                                        fontSize: "16px",
                                        color: "#444",
                                      }}
                                    >
                                      Description:
                                    </strong>
                                  </p>
                                  <div
                                    style={{ marginBottom: "12px" }}
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></div>

                                  {/* Flight Events */}
                                  {item.flightEvents.length > 0 && (
                                    <div style={{ marginBottom: "16px" }}>
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                          color: "#444",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <FaPlane
                                          style={{ marginRight: "8px" }}
                                        />
                                        Flight Events:
                                      </Typography>
                                      {item.flightEvents.map((flight, idx) => (
                                        <Box key={idx} pl={2}>
                                          <p>Type: {flight.type}</p>
                                          <p>
                                            From: {flight.from} (
                                            {flight.fromAirPortCode})
                                          </p>
                                          <p>
                                            To: {flight.to} (
                                            {flight.toAirPortCode})
                                          </p>
                                        </Box>
                                      ))}
                                    </div>
                                  )}

                                  {/* Transfer Events */}
                                  {item.transferEvents.length > 0 && (
                                    <div style={{ marginBottom: "16px" }}>
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                          color: "#444",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <FaBus style={{ marginRight: "8px" }} />
                                        Transfer Events:
                                      </Typography>
                                      {item.transferEvents.map(
                                        (transfer, idx) => (
                                          <Box key={idx} pl={2}>
                                            <p>Type: {transfer.type}</p>
                                            <p>Title: {transfer.title}</p>
                                            <p>From: {transfer.fromLocation}</p>
                                            <p>To: {transfer.toLocation}</p>
                                          </Box>
                                        )
                                      )}
                                    </div>
                                  )}

                                  {/* Leisure Day Events */}
                                  {item.leisureDayEvents.length > 0 && (
                                    <div style={{ marginBottom: "16px" }}>
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                          color: "#444",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <FaBed style={{ marginRight: "8px" }} />
                                        Leisure Day Events:
                                      </Typography>
                                      {item.leisureDayEvents.map(
                                        (event, idx) => (
                                          <Box key={idx} pl={2}>
                                            <p>Event: {event}</p>
                                          </Box>
                                        )
                                      )}
                                    </div>
                                  )}

                                  {/* Attraction Events */}
                                  {item.attractionEvents.length > 0 && (
                                    <div style={{ marginBottom: "16px" }}>
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                          color: "#444",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <FaMapMarkerAlt
                                          style={{ marginRight: "8px" }}
                                        />
                                        Attraction Events:
                                      </Typography>
                                      {item.attractionEvents.map(
                                        (attraction, idx) => (
                                          <Box key={idx} pl={2}>
                                            <p>Attraction: {attraction}</p>
                                          </Box>
                                        )
                                      )}
                                    </div>
                                  )}
                                </Typography>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Box>
                      );
                    })}
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="col-lg-12">
                  <div className="hotelDetailsTab">
                    <h2 className="mb-4">HOTEL DETAILS</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: storedPackageDetails?.data?.hotel_details,
                      }}
                    ></p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="col-lg-12">
                  <div className="inclusionTab">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <h2>Inclusion</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: storedPackageDetails?.data?.insclusion_note,
                          }}
                        ></p>
                      </div>
                      <div className="col-lg-6">
                        <h2>Exclusion</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: storedPackageDetails?.data?.exclusion_note,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div className="col-lg-12">
                  <div className="tandC">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Term & Condition</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: storedPackageDetails?.data?.term_Conditions,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="5">
                <div className="col-lg-12">
                  <div className="cancelTab">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Cancellation Policy</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              storedPackageDetails?.data?.cancellation_Policy,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPackageDetails;
