import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
// import map from "../../../Images/map.png";
// import picture from "../../../Images/picture.png";
//import file from "../../../Images/file.png";
import Box from "@mui/material/Box";
//import jacuzzii from "../../../Images/jacuzzii.jpg";
//import jacuzzy from "../../../Images/jacuzzy.jpg";
//import bed from "../../../Images/bed.png";
import { Grid, Button } from "@mui/material";
import Link from "@mui/material/Link";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
//import Custombutton from "../../../Custombuttom/Button";
import { hotelBlockRoomAction } from "../../../../../Redux/Hotel/hotel";

import availableRooms from "../../../../../Images/Hotel/availableRooms.png";
import hotelMap from "../../../../../Images/Hotel/hotelMap.png";
import hotelDetails from "../../../../../Images/Hotel/hotelDetails.png";
import imageGallery from "../../../../../Images/Hotel/imageGallery.png";
import HotelLoading from "../../hotelLoading/HotelLoading";
import freeWifi from "../../SVGs/freeWifi.svg";
import freeBreakfast from "../../SVGs/freeBreakfast.svg";
import Bed from "../../SVGs/Bed.svg";
import freeParking from "../../SVGs/freeParking.svg";
import drinkingWater from "../../SVGs/DrinkingWater.svg";
import expressCheckin from "../../SVGs/expressCheckin.svg";
import welcomeDrink from "../../SVGs/welcomeDrink.svg";
import freeGym from "../../SVGs/freeGym.svg";
import Food from "../../SVGs/Food.svg";
import dayjs from "dayjs";
import "./hotelaccording.css";
import "../../hotelresult/hotelresult.css";
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
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
  );

 
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;
 
  const [disabledOption, setDisabledOption] = useState(
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
  );
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  const hotelll = reducerState?.hotelSearchResult;
  useEffect(() => {
    if (HotelCode === undefined || ResultIndex === undefined) {
      navigate("/hotel/hotelsearch");
    }
  }, []);
  
  //Below is the functionality applied for the multiRoom selection
  const roomComponent = (RoomIndex, RoomIndexArr, col, row) => {
   
    const firstFilteredArray = hotelRoom?.HotelRoomsDetails.map(
      (item, index) => {
       
        if (disabledOption?.includes(item.RoomIndex)) {
          return { ...item, disabled: false };
        } else {
          return { ...item, disabled: true };
        }
      }
    );
    
    const filteredComponent = firstFilteredArray.filter((item, index) => {
      return item.RoomIndex == RoomIndex;
    });
    
    const dateString = filteredComponent[0]?.LastCancellationDate;
    const date1 = new Date(dateString);
    const time1 = date1.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date1.getDate();
    const month = date1.toLocaleString("default", {
      month: "short",
    });
    const year = date1.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    if (ResultIndex === undefined || HotelCode === undefined) {
      return (
        <>
          <HotelLoading />
        </>
      );
    }
    return (
      // <Box className="offer_area" p={2}>
      //   <Grid container>
      //     <Grid md={3}>
      //       <Box display="grid" justifyContent="left" textAlign="left">
      //         <Typography
      //           sx={{
      //             fontSize: "12px",
      //             fontWeight: "bold",
      //             color: "#666666",
      //           }}
      //         >
      //           {filteredComponent[0]?.RoomTypeName}
      //         </Typography>
      //         <Typography
      //           sx={{
      //             fontSize: "12px",
      //             fontWeight: "bold",
      //             color: "#006FFF",
      //           }}
      //         >
      //           {filteredComponent[0]?.RoomPromotion}
      //         </Typography>
      //         <Typography>
      //           <Link
      //             sx={{
      //               fontSize: "8px",
      //               fontWeight: "bold",
      //               color: "#FF8900",
      //             }}
      //           >
      //             Show Room Description
      //           </Link>
      //         </Typography>
      //       </Box>
      //     </Grid>
      //     <Grid md={3} alignItems="center" display="flex">
      //       <Box>
      //         <Typography
      //           sx={{
      //             fontSize: "8px",
      //             fontWeight: "bold",
      //             color: "#666666",
      //             alignItems: "center",
      //           }}
      //         >
      //           {filteredComponent[0]?.RatePlanName}
      //         </Typography>
      //       </Box>
      //     </Grid>
      //     <Grid md={3} alignItems="center" display="flex">
      //       <Box>
      //         <Typography
      //           sx={{
      //             fontSize: "8px",
      //             fontWeight: "bold",
      //             color: "#FF0000",
      //             alignItems: "center",
      //           }}
      //         >
      //           Last Cancellation till:{formattedDate}
      //         </Typography>
      //       </Box>
      //     </Grid>
      //     <Grid md={3} alignItems="center" display="flex" justifyContent="end">
      //       <Box>
      //         <Typography
      //           sx={{
      //             fontSize: "8px",
      //             fontWeight: "bold",
      //             color: "#006FFF",
      //           }}
      //           mr={2}
      //         >
      //           ₹{filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
      //         </Typography>
      //       </Box>
      //       <Box>
      //         <input
      //           className="radio"
      //           type="checkbox"
      //           style={{ width: "25px", height: "25px" }}
      //           value={`${filteredComponent[0]?.RoomIndex}`}
      //           disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
      //           checked={!filteredComponent[0].disabled}
      //           onClick={(e) => {
      //             setDisabledOption(RoomIndexArr);
      //           }}
      //         />
      //       </Box>
      //     </Grid>
      //   </Grid>
      // </Box>

      // <div className="offer_area-new p-2">
      //   <div className="checkromm-tick-new">
      //     <div className="roomTypeName">
      //       <p className="first">{filteredComponent[0]?.RoomTypeName}</p>
      //     </div>

      //     <div className="ratePlan-new">
      //     <p className="price">
      //       ₹{filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
      //     </p>
      //       {/* <p className="text">{filteredComponent[0]?.RatePlanName}</p> */}
      //     </div>
      //   </div>
      //   {/* <div className="roomTypeName">
      //     <p className="first">
      //       {filteredComponent[0]?.RoomTypeName}
      //     </p>
      //   </div> */}

      //   {/* <div className="ratePlan">

      //     <input
      //       className="form-check-input"
      //       type="checkbox"
      //       style={{ width: "25px", height: "25px" }}
      //       value={filteredComponent[0]?.RoomIndex}
      //       disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
      //       checked={!filteredComponent[0].disabled}
      //       onClick={(e) => {
      //         setDisabledOption(RoomIndexArr);
      //       }}
      //     />
      //     <p className="text">
      //       {filteredComponent[0]?.RatePlanName}
      //     </p>
      //   </div> */}
      //   <p className="text">Last Cancellation till: {formattedDate}</p>
      //   <div className="priceCheck-new">
      //     {/* <p className="price">
      //       ₹{filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
      //     </p> */}
      //     <input
      //         className="form-check-input"
      //         type="checkbox"
      //         style={{ width: "25px", height: "25px" }}
      //         value={filteredComponent[0]?.RoomIndex}
      //         disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
      //         checked={!filteredComponent[0].disabled}
      //         onClick={(e) => {
      //           setDisabledOption(RoomIndexArr);
      //         }}
      //       />
      //     <p className="second-new">{filteredComponent[0]?.RoomPromotion}</p>
      //   </div>
      // </div>

      <div>
        <div>
          <div className="roomCompo">
            <div
              className="offer_area"
              //onClick={() => handleRoomSelection(index)}
              style={{
                cursor: "pointer",
                border:
                  selectedRoomIndex === filteredComponent[0]?.RoomIndex
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
                    value={filteredComponent[0]?.RoomIndex}
                    disabled={
                      row >= 0 && col > 0 && filteredComponent[0].disabled
                    }
                    checked={!filteredComponent[0].disabled}
                    onClick={(e) => {
                      setDisabledOption(RoomIndexArr);
                    }}
                  />
                  <div className="inneraccorHotel">
                    <div className="ratePlan">
                      <p className="insideOfferText">
                        {" "}
                        {filteredComponent[0]?.RoomTypeName}
                      </p>
                    </div>

                    {filteredComponent[0]?.Inclusion?.[0] === "Room Only" ? (
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
                    ) : filteredComponent[0]?.Inclusion?.[0] ===
                      "Breakfast buffet" ? (
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
                            {filteredComponent[0]?.Inclusion?.[0]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="othInc" style={{ display: "flex" }}>
                  <div className="othIncInner">
                    <div className="d-flex justify-content-start align-items-center gap-2">
                      <p className="panDesign">Pan Required</p>
                    </div>
                  </div>
                  {/* <div className="othIncInner">
                    {filteredComponent[0]?.CancellationPolicies.length > 0 &&
                      filteredComponent[0]?.CancellationPolicies?.map(
                        (policy) => (
                          <div className="othIncInner" key={policy.id}>
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <p className="panDesign2" style={{display:"flex"}}>
                                {policy.Charge === 100
                                  ? "Non Refundable"
                                  : policy.Charge === 0
                                  ? "Refundable"
                                  : `${policy.Charge}% Charge applicable`}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                  </div> */}
                  <div className="othIncInner" style={{ display: "flex" }}>
                    {filteredComponent[0]?.CancellationPolicies?.length > 0 &&
                      filteredComponent[0].CancellationPolicies.map(
                        (policy) => (
                          <div className="othIncPolicy" key={policy.id}>
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              {/* Refundable or Charge Percentage */}
                              <div
                                className="panDesign2"
                                style={{ display: "flex" }}
                              >
                                {policy.Charge === 100
                                  ? "Non Refundable"
                                  : policy.Charge === 0
                                  ? "Refundable"
                                  : `${policy.Charge}% Charge applicable`}
                              </div>

                              {/* Date Range Display */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <p>
                                  {new Date(
                                    policy.FromDate
                                  ).toLocaleDateString()}
                                </p>
                                <p>to</p>
                                <p>
                                  {new Date(policy.ToDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className="othInc">
                  {filteredComponent?.other_inclusions?.map((inclusion, e) => (
                    <div className="othIncInner" key={e}>
                      <div className="d-flex justify-content-start align-items-center gap-2">
                        {inclusion.toLowerCase() === "free wifi" && (
                          <>
                            <img src={freeWifi} alt="wifi" />
                            <p className="panDesign3">Free WiFi</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "free internet" && (
                          <>
                            <img src={freeWifi} alt="wifi" />
                            <p className="panDesign3">Free internet</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "free breakfast" && (
                          <>
                            <img src={freeBreakfast} alt="wifi" />
                            <p className="panDesign3">Free Breakfast</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "breakfast" && (
                          <>
                            <img src={freeBreakfast} alt="wifi" />
                            <p className="panDesign3">Breakfast</p>
                          </>
                        )}
                        {inclusion.toLowerCase() ===
                          "continental breakfast" && (
                          <>
                            <img src={freeBreakfast} alt="wifi" />
                            <p className="panDesign3">Continental breakfast</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "free self parking" && (
                          <>
                            <img src={freeParking} alt="wifi" />
                            <p className="panDesign3">Free self parking</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "parking" && (
                          <>
                            <img src={freeParking} alt="wifi" />
                            <p className="panDesign3">Free Parking</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "free parking" && (
                          <>
                            <img src={freeParking} alt="wifi" />
                            <p className="panDesign3">Free Parking</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "free valet parking" && (
                          <>
                            <img src={freeParking} alt="wifi" />
                            <p className="panDesign3">Free Valet Parking</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "drinking water" && (
                          <>
                            <img src={drinkingWater} alt="wifi" />
                            <p className="panDesign3">Drinking water</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "express check-in" && (
                          <>
                            <img src={expressCheckin} alt="wifi" />
                            <p className="panDesign3">Express check-in</p>
                          </>
                        )}
                        {inclusion.toLowerCase() === "welcome drink" && (
                          <>
                            <img src={welcomeDrink} alt="wifi" />
                            <p className="panDesign3">Welcome drink</p>
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
                <p className="price">
                  ₹ {filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
                </p>
                <div>
                  <h3>Select Room</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {hotelinfoGRN?.rates?.length > showRooms && (
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
        )} */}
      </div>
    );
  };
  const handleChoosenRoom = () => {
    const choosenRoom = [];
    const option = disabledOption;
    option?.map((matchedItem, index) => {
      hotelRoom?.HotelRoomsDetails.map((item, index) => {
        if (item.RoomIndex == matchedItem) {
          choosenRoom.push(item);
        }
      });
    });

    return choosenRoom;
  };
  
  const handleClick = () => {
    sessionStorage.setItem("HotelIndex", disabledOption);
    const smoking =
      hotelRoom?.HotelRoomsDetails[disabledOption]?.SmokingPreference;
    var SmokingPreference;
    if (smoking == "NoPreference") {
      SmokingPreference = 0;
    }
    if (smoking == "Smoking") {
      SmokingPreference = 1;
    }
    if (smoking == "NonSmoking") {
      SmokingPreference = 2;
    }
    if (smoking == "Either") {
      SmokingPreference = 3;
    }
  
    const payload = {
      ResultIndex: ResultIndex,
      HotelCode: HotelCode,
      HotelName: hotelInfo?.HotelDetails?.HotelName,
      GuestNationality: "IN",
      NoOfRooms:
        reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.NoOfRooms,

      ClientReferenceNo: 0,
      IsVoucherBooking: true,

      //   {
      //     RoomIndex: hotelRoom?.HotelRoomsDetails[ratingOption]?.RoomIndex,
      //     RoomTypeCode:
      //       hotelRoom?.HotelRoomsDetails[ratingOption]?.RoomTypeCode,
      //     RoomTypeName:
      //       hotelRoom?.HotelRoomsDetails[ratingOption]?.RoomTypeName,
      //     RatePlanCode:
      //       hotelRoom?.HotelRoomsDetails[ratingOption]?.RatePlanCode,
      //     BedTypeCode: null,
      //     SmokingPreference: SmokingPreference,
      //     Supplements: null,
      //     Price: {
      //       CurrencyCode:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.CurrencyCode,
      //       RoomPrice:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.RoomPrice,
      //       Tax: hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.Tax,
      //       ExtraGuestCharge:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price
      //           ?.ExtraGuestCharge,
      //       ChildCharge:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.ChildCharge,
      //       OtherCharges:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.OtherCharges,
      //       Discount:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.Discount,
      //       PublishedPrice:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.PublishedPrice,
      //       PublishedPriceRoundedOff:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price
      //           ?.PublishedPriceRoundedOff,
      //       OfferedPrice:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.OfferedPrice,
      //       OfferedPriceRoundedOff:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price
      //           ?.OfferedPriceRoundedOff,
      //       AgentCommission:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price
      //           ?.AgentCommission,
      //       AgentMarkUp:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.AgentMarkUp,
      //       ServiceTax:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.ServiceTax,
      //       TCS: hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.TCS,
      //       TDS: hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.TDS,
      //       ServiceCharge:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.ServiceCharge,
      //       TotalGSTAmount:
      //         hotelRoom?.HotelRoomsDetails[ratingOption]?.Price?.TotalGSTAmount,
      //       GST: {
      //         CGSTAmount:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.CGSTAmount,
      //         CGSTRate:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.CGSTRate,
      //         CessAmount:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.CessAmount,
      //         CessRate:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.CessRate,
      //         IGSTAmount:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.IGSTAmount,
      //         IGSTRate:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.IGSTRate,
      //         SGSTAmount:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.SGSTAmount,
      //         SGSTRate:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.SGSTRate,
      //         TaxableAmount:
      //           hotelRoom?.HotelRoomsDetails[ratingOption]?.GST?.TaxableAmount,
      //       },
      //     },
      //   },
      // ],
      HotelRoomsDetails: handleChoosenRoom().map((item, index) => {
        return {
          RoomIndex: item?.RoomIndex,
          RoomTypeCode: item?.RoomTypeCode,
          RoomTypeName: item?.RoomTypeName,
          RatePlanCode: item?.RatePlanCode,
          BedTypeCode: null,
          SmokingPreference: SmokingPreference,
          Supplements: null,
          Price: {
            CurrencyCode: item?.Price?.CurrencyCode,
            RoomPrice: item?.Price?.RoomPrice,
            Tax: item?.Price?.Tax,
            ExtraGuestCharge: item.Price?.ExtraGuestCharge,
            ChildCharge: item?.Price?.ChildCharge,
            OtherCharges: item?.Price?.OtherCharges,
            Discount: item?.Price?.Discount,
            PublishedPrice: item?.Price?.PublishedPrice,
            PublishedPriceRoundedOff: item?.Price?.PublishedPriceRoundedOff,
            OfferedPrice: item?.Price?.OfferedPrice,
            OfferedPriceRoundedOff: item?.Price?.OfferedPriceRoundedOff,
            AgentCommission: item?.Price?.AgentCommission,
            AgentMarkUp: item?.Price?.AgentMarkUp,
            ServiceTax: item?.Price?.ServiceTax,
            TCS: item?.Price?.TCS,
            TDS: item?.Price?.TDS,
            ServiceCharge: item?.Price?.ServiceCharge,
            TotalGSTAmount: item?.Price?.TotalGSTAmount,
          },
          GST: {
            CGSTAmount: item?.GST?.CGSTAmount,
            CGSTRate: item?.GST?.CGSTRate,
            CessAmount: item?.GST?.CessAmount,
            CessRate: item?.GST?.CessRate,
            IGSTAmount: item?.GST?.IGSTAmount,
            IGSTRate: item?.GST?.IGSTRate,
            SGSTAmount: item?.GST?.SGSTAmount,
            SGSTRate: item?.GST?.SGSTRate,
            TaxableAmount: item?.GST?.TaxableAmount,
          },
        };
      }),
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      // TraceId:
      //   reducerState?.hotelSearchResult?.ticketData?.data?.data
      //     ?.HotelSearchResult?.TraceId,
      TraceId:
        reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.TraceId,
    };
    // dispatch(hotelBlockRoomAction(payload));
    navigate("ReviewbookingTbo",{state:payload})
  };

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
                {/* <Box> */}
                {hotelRoom?.RoomCombinations?.RoomCombination.map(
                  (item1, index1) => {
                    return (
                      <div className="container">
                        <div className="roomCompo-new">
                          {item1?.RoomIndex?.map((item2, index2) => (
                            <div
                              className=""
                              key={index2}
                              style={{ width: "100%" }}
                            >
                              {roomComponent(
                                item2,
                                item1?.RoomIndex,
                                index2,
                                index1
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
                {/* </Box> */}

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
                    {hotelInfo?.HotelDetails?.Images?.map((img, key) => {
                      return (
                        <Grid item sm={6} lg={4}>
                          <Box>
                            <img src={img} className="jacuzzy_img" />
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
                  borderRadius: "20px",
                  boxShadow: "0px 3px 6px #00000029",
                  margin: " 20px 0px",
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hotelInfo?.HotelDetails?.Description,
                    }}
                  />
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
                  <Alert severity="error">
                    {" "}
                    Currently Map Details is Not Available !!!
                  </Alert>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      {/* <Box className="accordian_area">
        <Custombutton
          type={"submit"}
          title={"continue"}
          onClick={handleClick}
        />
      </Box> */}
      <button type="submit" className="bookNowButton-new" onClick={handleClick}>
        Continue
      </button>
    </div>
  );
}
