import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import map from "../../../Images/map.png";
import picture from "../../../Images/picture.png";
import file from "../../../Images/file.png";
import Box from "@mui/material/Box";
import jacuzzii from "../../../Images/jacuzzii.jpg";
import jacuzzy from "../../../Images/jacuzzy.jpg";
import bed from "../../../Images/bed.png";
import { Grid, Button } from "@mui/material";
import Link from "@mui/material/Link";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../../Custombuttom/Button";
import { hotelBlockRoomAction } from "../../../Redux/Hotel/hotel";

import availableRooms from "../../../Images/Hotel/availableRooms.png"
import hotelMap from "../../../Images/Hotel/hotelMap.png"
import hotelDetails from "../../../Images/Hotel/hotelDetails.png"
import imageGallery from "../../../Images/Hotel/imageGallery.png"
import HotelLoading from "../hotelLoading/HotelLoading";

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
  // console.log("State Data", reducerState);
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  const [expanded, setExpanded] = useState("panel1");
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const [disabledOption, setDisabledOption] = useState(
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
  );
  // console.log("initialDisabledOption", disabledOption);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  const hotelll = reducerState?.hotelSearchResult;
  useEffect(() => {
    if (HotelCode === undefined || ResultIndex === undefined) {
      navigate("/hotel/hotelsearch")
    }
  }, [])
  // console.log(hotelll, "hotelll");
  //Below is the functionality applied for the multiRoom selection
  const roomComponent = (RoomIndex, RoomIndexArr, col, row) => {
    // console.log(RoomIndexArr, "RoomIndexArr");
    // console.log(RoomIndex, "RoomIndex", col, row);
    const firstFilteredArray = hotelRoom?.HotelRoomsDetails.map(
      (item, index) => {
        // console.log("disabled", disabledOption[0]);
        if (disabledOption.includes(item.RoomIndex)) {
          return { ...item, disabled: false };
        } else {
          return { ...item, disabled: true };
        }
      }
    );
    // console.log("firstFilteredArray", firstFilteredArray);
    const filteredComponent = firstFilteredArray.filter((item, index) => {
      return item.RoomIndex == RoomIndex;
    });
    // console.log("filteredComponent", filteredComponent);
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
      )
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


      <div className="offer_area-new p-2">
      <div className="checkromm-tick-new">
      <div className="roomTypeName">
          <p className="first">
            {filteredComponent[0]?.RoomTypeName}
          </p>
        </div>

        <div className="ratePlan-new">

<input
  className="form-check-input"
  type="checkbox"
  style={{ width: "25px", height: "25px" }}
  value={filteredComponent[0]?.RoomIndex}
  disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
  checked={!filteredComponent[0].disabled}
  onClick={(e) => {
    setDisabledOption(RoomIndexArr);
  }}
/>
<p className="text">
  {filteredComponent[0]?.RatePlanName}
</p>
</div>

      </div>
        {/* <div className="roomTypeName">
          <p className="first">
            {filteredComponent[0]?.RoomTypeName}
          </p>
        </div> */}

        {/* <div className="ratePlan">

          <input
            className="form-check-input"
            type="checkbox"
            style={{ width: "25px", height: "25px" }}
            value={filteredComponent[0]?.RoomIndex}
            disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
            checked={!filteredComponent[0].disabled}
            onClick={(e) => {
              setDisabledOption(RoomIndexArr);
            }}
          />
          <p className="text">
            {filteredComponent[0]?.RatePlanName}
          </p>
        </div> */}
        <p className="text">
          Last Cancellation till: {formattedDate}
        </p>
        <div className="priceCheck-new">
          <p className="price">
            ₹{filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
          </p>
          <p className="second-new">
            {filteredComponent[0]?.RoomPromotion}
          </p>
        </div>
      </div >

    );
  };
  const handleChoosenRoom = () => {
    const choosenRoom = [];
    const option = disabledOption;
    option.map((matchedItem, index) => {
      hotelRoom?.HotelRoomsDetails.map((item, index) => {
        if (item.RoomIndex == matchedItem) {
          choosenRoom.push(item);
        }
      });
    });

    return choosenRoom;
  };
  // console.log(handleChoosenRoom(), "chooseRoom");
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
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.NoOfRooms,
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
      TraceId:
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.TraceId,
    };
    dispatch(hotelBlockRoomAction(payload));
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
                sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029"}}
                aria-controls="panel1d-content"
                id="panel1d-header"
                // style={{ borderRadius:"4px",backgroundColor:"rgba(231, 60, 52, 0.15)"}}
              >
                <Grid container>
                  <Grid md={12} >
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
                            <div className="" key={index2}  style={{width:"100%"}}>
                              {roomComponent(item2, item1?.RoomIndex, index2, index1)}
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
                sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
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
                sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
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
                    sx={{ fontsize: "14px", color: "#252525", textAlign: "left" }}
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
                sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
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
      <button type="submit" className="bookNowButton-new" onClick={handleClick}>Continue</button>
    </div>
  );
}
