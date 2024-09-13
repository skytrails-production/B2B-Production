import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import goa from "../../../Images/goa.jpg";
import FlightIcon from "@mui/icons-material/Flight";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RowingIcon from "@mui/icons-material/Rowing";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import HolidayRating from "../holidaypackageresult/HolidayRating";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import information from "../../../Images/information.png";
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
import "./holidaybooknowdetail.css";
import { textAlign } from "@mui/system";
import { Divider } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import color from "../../../color/color";
import { useNavigate } from "react-router";
const Bookingdetailpackage = () => {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  // console.log("One Package", onePackage);
  const [daysDetailsValues, setDaysDetails] = useState([]);
  const handleDaysDetail = (index, e) => {
    const newValues = [...daysDetailsValues];
    newValues[index] = e.target.value;
    setDaysDetails(newValues);
  };

  const savedDataString = sessionStorage.getItem("searchPackageData");
  const savedData = JSON.parse(savedDataString);
  const savedDestination = savedData?.destination?.toUpperCase();
  const savedDays = savedData?.days;
  // console.warn(savedDataString, "savedDataString,,,,,,,,,,,,,,,,")
  useEffect(() => {
    if (savedDataString === undefined || savedDataString === null) {
      return navigate("/holidayPackage/HolidaypackageResult");
    }
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (savedDataString === undefined || savedDataString === null) {
    return <>Loading......</>;
  }

  // console.log(onePackage, "one package")

  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="outerFilterBox">
              <div className="filterBox">
                <p className="searchDestination">
                  Seach Destination : <b>{savedDestination}</b>
                </p>
                {/* <p className="searchDestination">Days {' '} <b>{savedDays}</b></p> */}
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-4">
            <div className="packageName-new">
              <p className="mb-3">{onePackage?.pakage_title}</p>
              <span>
                {`${onePackage?.days - 1}N`} / {`${onePackage?.days}D`}
              </span>
            </div>
          </div>
          <div className="col-lg-12 mb-4 packageImgBox">
            <div className="PackageImg">
              <img src={onePackage?.pakage_img||onePackage?.package_img[0]} alt="" />
             
            </div>
            {/* <div className="packageLocation">
              <FmdGoodIcon />
            </div> */}
            {/* <div>
              <p>{savedDestination}</p>
              <span>(India)</span>
            </div> */}
          </div>

          <div className="col-lg-12 mb-4">
            <div className="TripHighlight">
              <p className="mb-3">Trip Highlights</p>

              <div className="col-lg-10">
                <div className="icon-boxHighlight-new">
                  {onePackage?.insclusions?.map((ele, index) => {
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
                    dangerouslySetInnerHTML={{ __html: onePackage?.overview }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-lg-3">
        <div className="sidePromo">
          <div className="col-lg-12 sidePromoImg">
            <img src={goa} alt="" />
          </div>
          <div className="promoBottom">
            <div className="promoTitle">
              <p>Luxurious Dubai Trip</p>
              <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <div className="promoIcons">
              <div className="singlePromoIcon">
                <span><TramIcon /></span>
                <p>Train</p>
              </div>
              <div className="singlePromoIcon">
                <span><ForestIcon /></span>
                <p>Nature</p>
              </div>
              <div className="singlePromoIcon">
                <span><LocalOfferIcon /></span>
                <p>50% Off</p>
              </div>

              <div className="singlePromoIcon">
                <span><WifiPasswordIcon /></span>
                <p>WIFI</p>
              </div>
            </div>

            <div className="promoDestination">
              <ul>
                <li>Mandovi river cruise</li>
                <li>North Dubai sightseeing</li>
              </ul>
              <div>
                <p>₹ 42,250 </p>
                <span>Per Person</span>
              </div>
            </div>
            <div className="promoBottomButton">
              <p>VIEW OTHER PACKAGES {" > "}</p>

              <button>CONFIRM THIS PACKAGE NOW</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <TabContext value={value} style={{}}>
              <Box sx={{ backgroundColor: "", borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  // textColor="#E73C34"
                  // indicatorColor="#E73C34"
                  aria-label="lab API tabs example"
                >
                  <Tab
                    className="bookin-package-tab-new"
                    label="ITINERARY"
                    value="1"
                  />
                  <Tab
                    className="bookin-package-tab-new"
                    label="HOTEL DETAILS"
                    value="2"
                  />
                  <Tab
                    className="bookin-package-tab-new"
                    label="INCLUSIONS &EXCLUSIONS"
                    value="3"
                  />
                  <Tab
                    className="bookin-package-tab-new"
                    label="TERMS & CONDITION"
                    value="4"
                  />
                  <Tab
                    className="bookin-package-tab-new"
                    label="CANCELLATION POLICY"
                    value="5"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="col-lg-12">
                  {/* <div className="dayPlan"> */}
                  {onePackage?.detailed_ltinerary?.map((item, index) => {
                    return (
                      <>
                        <Box style={{ background: "#FFFBFB" }}>
                          <Box py={1}> </Box>
                          <Accordion
                            style={{ background: "#FFFBFB", width: "100%" }}
                            defaultActiveKey={
                              index === 0 ? index.toString() : undefined
                            } // Set defaultActiveKey to index 0
                          >
                            <Accordion.Item
                              eventKey={index.toString()}
                              style={{ background: "#FFFBFB" }}
                            >
                              <Accordion.Header
                                style={{ background: "#FFFBFB" }}
                              >
                                <Typography
                                  color="Black"
                                  fontSize="15px"
                                  fontWeight="bold"
                                >
                                  Day {index + 1}
                                </Typography>
                              </Accordion.Header>
                              <Accordion.Body>
                                <Typography
                                  sx={{
                                    color: "#666666",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {/* {item} */}
                                  <div
                                    dangerouslySetInnerHTML={{ __html: item }}
                                  ></div>
                                </Typography>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Box>
                      </>
                    );
                  })}
                  {/* </div> */}
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="col-lg-12">
                  <div className="hotelDetailsTab">
                    <h5 className="mb-4">HOTEL DETAILS</h5>
                    {/* <p>{onePackage?.hotel_details}</p> */}
                    <p
                      style={{ fontSize: "16px" }}
                      dangerouslySetInnerHTML={{
                        __html: onePackage?.hotel_details,
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
                        <h5>Inclusion</h5>

                        {/* <p>{onePackage?.insclusion_note}</p> */}
                        <p
                          style={{ fontSize: "16px" }}
                          dangerouslySetInnerHTML={{
                            __html: onePackage?.insclusion_note,
                          }}
                        ></p>
                      </div>
                      <div className="col-lg-6">
                        <h5>Exclusion</h5>

                        {/* <p>{onePackage?.exclusion_note}</p> */}
                        <p
                          style={{ fontSize: "16px" }}
                          dangerouslySetInnerHTML={{
                            __html: onePackage?.exclusion_note,
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
                        <h5>Term & Condition</h5>

                        {/* <p>{onePackage?.term_Conditions}</p> */}
                        <p
                          style={{ fontSize: "16px" }}
                          dangerouslySetInnerHTML={{
                            __html: onePackage?.term_Conditions,
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
                        <h5>Cancellation Policy</h5>

                        {/* <p>{onePackage?.cancellation_Policy}</p> */}
                        <p
                          style={{ fontSize: "16px" }}
                          dangerouslySetInnerHTML={{
                            __html: onePackage?.cancellation_Policy,
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
      <div className="col-lg-12">
        <form onClick={() => navigate("/HolidayGuestDetail")}>
          {/* <Box textAlign="center" mt={3}>
            <Button
              style={{ backgroundColor: color.bluedark, color: "white" }}
              textAlign="center"
              display="flex"
              justifyContent="center"
              type="submit"
            >
              Continue
            </Button>
          </Box> */}
          <div className="holiday_but-new">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Bookingdetailpackage;
