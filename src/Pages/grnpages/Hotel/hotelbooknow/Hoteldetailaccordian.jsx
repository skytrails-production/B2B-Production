import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import map from "../../../../Images/map.png";
import picture from "../../../../Images/picture.png";
import file from "../../../../Images/file.png";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import bed from "../../../../Images/bed.png";
import { Grid, Button } from "@mui/material";
import Link from "@mui/material/Link";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";

import { hotelBookRoomAction } from "../../../../Redux/Hotel/hotel";
import { hotelBookRoomActionGRN } from "../../../../Redux/HotelGrn/hotel";
import { HotelRoomSelectReqGRN } from "../../../../Redux/HotelGrn/hotel";
import availableRooms from "../../../../Images/Hotel/availableRooms.png";
import hotelMap from "../../../../Images/Hotel/hotelMap.png";
import hotelDetails from "../../../../Images/Hotel/hotelDetails.png";
import imageGallery from "../../../../Images/Hotel/imageGallery.png";
import HotelLoading from "../hotelLoading/HotelLoading";
import chevrondown from "../../../../Images/loading/chevrondown.svg";
import freeWifi from "../SVGs/freeWifi.svg";
import freeBreakfast from "../SVGs/freeBreakfast.svg";
import Bed from "../SVGs/Bed.svg";
import freeParking from "../SVGs/freeParking.svg";
import drinkingWater from "../SVGs/DrinkingWater.svg";
import expressCheckin from "../SVGs/expressCheckin.svg";
import welcomeDrink from "../SVGs/welcomeDrink.svg";
import freeGym from "../SVGs/freeGym.svg";
import Food from "../SVGs/Food.svg";
import "./hotelaccording.css";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "white" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);

  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  const [expanded, setExpanded] = useState("panel1");
  const [showRooms, setShowRooms] = useState(10);
  const [loader, setLoader] = useState(false);
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const [disabledOption, setDisabledOption] = useState(
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const hotelll = reducerState?.hotelSearchResult;
  useEffect(() => {
    if (HotelCode === undefined || ResultIndex === undefined) {
      navigate("/hotel/hotelsearch");
    }
  }, []);

  const searchId =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id;

  const handleClickSaveRoom = async () => {
    // setLoader(true);

    const payload = {
      data: {
        rate_key: selectedRoom?.rate_key,
        group_code: selectedRoom?.group_code,
      },

      searchID: searchId,
    };
    // Log the rate_key to the console
    console.log("Rate Key:", selectedRoom?.rate_key);
    dispatch(HotelRoomSelectReqGRN(payload));
    navigate("/hotels/hotelsearchs/guestDetails");
  };

  //grn
  const hotelinfoGRN =
    reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;

  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(
    hotelinfoGRN?.rates?.[selectedRoomIndex]
  );

  const handleRoomSelection = (index) => {
    setSelectedRoomIndex(index);
  };
  const handleShowMore = () => {
    setShowRooms((prev) => prev + 10);
  };
  useEffect(() => {
    setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex]);
  }, [selectedRoomIndex]);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ border: "none", marginY: "20px" }}
            >
              <AccordionSummary
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                }}
                aria-controls="panel1d-content"
                id="panel1d-header"
                // style={{ borderRadius:"4px",backgroundColor:"rgba(231, 60, 52, 0.15)"}}
              >
                <Grid container>
                  <Grid md={12}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <img src={availableRooms} style={{ width: "100%" }} />
                      </Box>
                      <Typography
                        ml={2}
                        color="#E73C34"
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        Available Room(s)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={6}>
                    <Box display="flex" justifyContent="end"></Box>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                  marginTop: "20px",
                }}
              >
                <div>
                  <div>
                    {hotelinfoGRN?.rates
                      ?.slice(0, showRooms)
                      .map((item, index) => (
                        <div className="roomCompo" key={index}>
                          <div
                            className="offer_area "
                            onClick={() => handleRoomSelection(index)}
                            style={{
                              cursor: "pointer",
                              border:
                                selectedRoomIndex === index
                                  ? "0.5px solid #e73c34"
                                  : "",
                            }}
                          >
                            <div>
                              <div className="insideOffer">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  style={{ width: "25px", height: "25px" }}
                                  value=""
                                  checked={selectedRoomIndex === index}
                                  onChange={() => handleRoomSelection(index)}
                                />
                                <div className="inneraccorHotel">
                                  {item?.rooms.map((room, e) => (
                                    <div className="ratePlan" key={e}>
                                      <p className="insideOfferText">
                                        {room?.room_type}
                                      </p>
                                    </div>
                                  ))}

                                  {item?.boarding_details?.[0] ===
                                  "Room Only" ? (
                                    <div className="othIncInner">
                                      <div className="d-flex justify-content-start align-items-center gap-2">
                                        <img src={Bed} alt="wifi" />
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          Room Only
                                        </p>
                                      </div>
                                    </div>
                                  ) : item?.boarding_details?.[0] ===
                                    "Bed and Breakfast" ? (
                                    <div className="othIncInner">
                                      <div className="d-flex justify-content-start align-items-center gap-2">
                                        <img src={freeBreakfast} alt="wifi" />
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          Free Breakfast
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="othIncInner">
                                      <div className="d-flex justify-content-start align-items-center gap-2">
                                        <img src={Food} alt="wifi" />
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.boarding_details?.[0]}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="othInc">
                                {item?.pan_required && (
                                  <div className="othIncInner">
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      <p className="panDesign">Pan Required</p>
                                    </div>
                                  </div>
                                )}
                                {item?.non_refundable && (
                                  <div className="othIncInner">
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      <p className="panDesign2">
                                        Non Refundable
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {item?.cancellation_policy && (
                                  <div className="othIncInner">
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      <p className="panDesign3">
                                        Refundable (Cancel Before{" "}
                                        {dayjs(
                                          item?.cancellation_policy
                                            ?.cancel_by_date
                                        ).format("DD MMM, YY")}
                                        )
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="othInc">
                                {item?.other_inclusions?.map((inclusion, e) => (
                                  <div className="othIncInner" key={e}>
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      {inclusion.toLowerCase() ===
                                        "free wifi" && (
                                        <>
                                          <img src={freeWifi} alt="wifi" />
                                          <p className="panDesign3">
                                            Free WiFi
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free internet" && (
                                        <>
                                          <img src={freeWifi} alt="wifi" />
                                          <p className="panDesign3">
                                            Free internet
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free breakfast" && (
                                        <>
                                          <img src={freeBreakfast} alt="wifi" />
                                          <p className="panDesign3">
                                            Free Breakfast
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "breakfast" && (
                                        <>
                                          <img src={freeBreakfast} alt="wifi" />
                                          <p className="panDesign3">
                                            Breakfast
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "continental breakfast" && (
                                        <>
                                          <img src={freeBreakfast} alt="wifi" />
                                          <p className="panDesign3">
                                            Continental breakfast
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free self parking" && (
                                        <>
                                          <img src={freeParking} alt="wifi" />
                                          <p className="panDesign3">
                                            Free self parking
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "parking" && (
                                        <>
                                          <img src={freeParking} alt="wifi" />
                                          <p className="panDesign3">
                                            Free Parking
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free parking" && (
                                        <>
                                          <img src={freeParking} alt="wifi" />
                                          <p className="panDesign3">
                                            Free Parking
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free valet parking" && (
                                        <>
                                          <img src={freeParking} alt="wifi" />
                                          <p className="panDesign3">
                                            Free Valet Parking
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "drinking water" && (
                                        <>
                                          <img src={drinkingWater} alt="wifi" />
                                          <p className="panDesign3">
                                            Drinking water
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "express check-in" && (
                                        <>
                                          <img
                                            src={expressCheckin}
                                            alt="wifi"
                                          />
                                          <p className="panDesign3">
                                            Express check-in
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "welcome drink" && (
                                        <>
                                          <img src={welcomeDrink} alt="wifi" />
                                          <p className="panDesign3">
                                            Welcome drink
                                          </p>
                                        </>
                                      )}
                                      {inclusion.toLowerCase() ===
                                        "free fitness center access" && (
                                        <>
                                          <img src={freeGym} alt="wifi" />
                                          <p className="panDesign3">Free Gym</p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="priceCheck">
                              <p className="price">₹ {item?.price}</p>
                              <div>
                                <h3>Select Room</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {hotelinfoGRN?.rates?.length > showRooms && (
                    <div className="mt-3 text-left">
                      <p
                        className="text-bold "
                        style={{ cursor: "pointer" }}
                        onClick={handleShowMore}
                      >
                        Show More Rooms
                        <svg
                          id="fi_3550091"
                          enable-background="new 0 0 1560 1560"
                          height="15"
                          viewBox="0 0 1560 1560"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <g>
                              <g>
                                <g>
                                  <path d="m1524 811.8h-1488c-17.7 0-32-14.3-32-32s14.3-32 32-32h1410.7l-194.2-194.2c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l248.9 248.9c9.2 9.2 11.9 22.9 6.9 34.9-5 11.9-16.7 19.7-29.6 19.7z"></path>
                                </g>
                                <g>
                                  <path d="m1274.8 1061c-8.2 0-16.4-3.1-22.6-9.4-12.5-12.5-12.5-32.8 0-45.3l249.2-249.2c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-249.2 249.2c-6.3 6.3-14.5 9.4-22.7 9.4z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </p>
                    </div>
                  )}
                </div>

                <Box></Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ border: "none", marginY: "20px" }}
            >
              <AccordionSummary
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                }}
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Grid container>
                  <Grid md={12}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <img src={imageGallery} style={{ width: "100%" }} />
                      </Box>
                      <Typography
                        ml={2}
                        color="#E73C34"
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        Image Gallery
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={6}>
                    <Box display="flex" justifyContent="end"></Box>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                  margin: " 20px 0px",
                }}
              >
                <Box my={3} overflow="scroll" height="270px">
                  <Grid container spacing={3} px={10}>
                    {hotelGallery?.map((img, key) => {
                      return (
                        <Grid item sm={6} lg={4}>
                          <Box>
                            <img src={img?.url} className="jacuzzy_img" />
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{ border: "none", marginY: "20px" }}
            >
              <AccordionSummary
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                }}
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Grid container>
                  <Grid md={12}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <img src={hotelDetails} style={{ width: "100%" }} />
                      </Box>
                      <Typography
                        ml={2}
                        color="#E73C34"
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        Hotel Details
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={6}>
                    <Box display="flex" justifyContent="end"></Box>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderRadius: "10.705px",
                  boxShadow: "0px 3px 6px #00000029",
                  margin: " 20px 0px",
                  border: "0.5px solid  #E73C34",
                  backgroundColor: "var(--white, #FFF)",
                }}
              >
                <Box display="flex" justifyContent="left">
                  <Box>
                    <img src={hotelDetails} style={{ width: "100%" }} />
                  </Box>
                  <Typography
                    sx={{
                      fontsize: "14px",
                      color: "#252525",
                      textAlign: "left",
                    }}
                    ml={2}
                    mb={2}
                  >
                    Hotel Details
                  </Typography>
                </Box>
                <Typography className="acc_para">
                  {hotelinfoGRN?.facilities.split(";").map((item, index) => (
                    <p key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M12.2734 7.77771C12.8906 7.77771 13.4727 7.8949 14.0195 8.12927C14.5664 8.36365 15.043 8.68396 15.4492 9.09021C15.8555 9.49646 16.1797 9.97693 16.4219 10.5316C16.6641 11.0863 16.7812 11.6683 16.7734 12.2777C16.7734 12.9027 16.6562 13.4847 16.4219 14.0238C16.1875 14.5629 15.8672 15.0394 15.4609 15.4535C15.0547 15.8676 14.5742 16.1918 14.0195 16.4261C13.4648 16.6605 12.8828 16.7777 12.2734 16.7777C11.6484 16.7777 11.0664 16.6605 10.5273 16.4261C9.98828 16.1918 9.51172 15.8715 9.09766 15.4652C8.68359 15.059 8.35938 14.5824 8.125 14.0355C7.89062 13.4886 7.77344 12.9027 7.77344 12.2777C7.77344 11.6605 7.89062 11.0785 8.125 10.5316C8.35938 9.98474 8.67969 9.50818 9.08594 9.10193C9.49219 8.69568 9.96875 8.37146 10.5156 8.12927C11.0625 7.88708 11.6484 7.7699 12.2734 7.77771Z"
                          fill="#E73C34"
                        />
                      </svg>
                      {item.trim()}
                    </p>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ border: "none", marginY: "20px" }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                }}
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Grid container>
                  <Grid md={12}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <img src={hotelMap} style={{ width: "100%" }} />
                      </Box>
                      <Typography
                        ml={2}
                        color="#E73C34"
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        Hotel Map
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={6}>
                    <Box display="flex" justifyContent="end"></Box>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{ fontsize: "14px", color: "#252525", textAlign: "left" }}
                  mb={1}
                >
                  Hotel Map Details
                </Typography>
                <Typography className="acc_para">
                  {/* <Alert severity="error"> */}{" "}
                  <a
                    href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <svg
                      id="fi_2642502"
                      enable-background="new 0 0 512 512"
                      height="25"
                      viewBox="0 0 512 512"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="m307.79 223.476-53.135 78.467-78.573 78.18c-29.222-37.139-61.132-73.116-80.587-116.631l42.352-64.879 64.957-62.668c-21.71 26.831-20.089 66.293 4.864 91.246 26.696 26.696 69.968 26.696 96.663 0 1.203-1.203 2.365-2.446 3.459-3.715z"
                          fill="#ecb72b"
                        ></path>
                        <path
                          d="m309.02 222.003c21.9-26.844 20.346-66.442-4.688-91.462-26.696-26.696-69.968-26.696-96.663 0-1.121 1.121-2.189 2.27-3.215 3.445l44.811-72.847 60.795-52.809c45.407 14.374 82.964 46.379 104.648 87.977l-44.352 71.516z"
                          fill="#5085f7"
                        ></path>
                        <path
                          d="m202.802 135.949-107.312 127.549c-10.643-23.783-17.562-49.817-18.276-79.529-.054-1.689-.081-3.391-.081-5.093 0-43.718 15.685-83.789 41.746-114.861z"
                          fill="#da2f2a"
                        ></path>
                        <path
                          d="m202.802 135.949-83.926-71.939c32.816-39.125 82.06-64.01 137.126-64.01 18.845 0 37.009 2.916 54.065 8.32z"
                          fill="#4274eb"
                        ></path>
                        <path
                          d="m434.867 178.865c0-29.779-7.278-57.859-20.151-82.558l-238.64 283.826c27.113 34.488 51.887 69.985 62.183 113.454.33 1.392.685 3.019 1.063 4.848 3.733 18.086 29.63 18.086 33.363 0 .378-1.829.733-3.456 1.063-4.848 27.448-115.892 157.807-175.118 161.043-309.618.046-1.696.076-3.397.076-5.104z"
                          fill="#60a850"
                        ></path>
                      </g>
                    </svg>{" "}
                    see on map
                  </a>
                  {/* </Alert> */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bookNowButton-new"
        onClick={handleClickSaveRoom}
      >
        Continue
      </button>
    </div>
  );
}
