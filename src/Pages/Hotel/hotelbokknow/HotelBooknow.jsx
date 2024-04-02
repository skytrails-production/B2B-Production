import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import "./hotelbooknow.css";
import { Divider, Grid, Typography } from "@mui/material";
import bed from "../../../Images/bed.png";
import availableRooms from "../../../Images/Hotel/availableRooms.png";
import hotelMap from "../../../Images/Hotel/hotelMap.png";
import hotelDetails from "../../../Images/Hotel/hotelDetails.png";
import imageGallery from "../../../Images/Hotel/imageGallery.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Link from "@mui/material/Link";
import Rating from "../hotelresult/Rating";
import Hoteldetailaccordian from "./Hoteldetailaccordian";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  hotelBlockRoomAction,
  hotelRoomAction,
  hotelSearchInfoAction,
} from "../../../Redux/Hotel/hotel";
import HotelLoading from "../hotelLoading/HotelLoading";
import Swal from "sweetalert2";
import { swalModal } from "../../../utils/swal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const HotelBooknow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("State Data ????????????????????", reducerState);
  const [loader, setLoader] = useState(false);

  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error
        ?.ErrorCode !== undefined
    ) {
      // swalModal("py",reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult.Error?.ErrorMessage,true)
      swalModal(
        "py",
        "'We're sorry, but there was an issue with your hotel booking",
        true
      );
      // Swal.fire({
      //   title: "Failed!",
      //   text: reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult
      //     .Error?.ErrorMessage,
      //   icon: "question",
      //   timer: 3000,
      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `
      //   }
      // })
      sessionStorage.removeItem("HotelCode");
      sessionStorage.removeItem("ResultIndex");
      navigate("/");
    }
  }, [
    reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error
      ?.ErrorCode,
  ]);

  useEffect(() => {
    if (
      ResultIndex === undefined ||
      ResultIndex === null ||
      HotelCode === undefined ||
      HotelCode === null
    ) {
      navigate("/hotel/hotelsearch");
    } else {
      const payload = {
        ResultIndex: ResultIndex,
        HotelCode: HotelCode,
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
        TraceId:
          reducerState?.hotelSearchResult?.ticketData?.data?.data
            ?.HotelSearchResult?.TraceId,
      };

      dispatch(hotelSearchInfoAction(payload));
      dispatch(hotelRoomAction(payload));
    }
  }, []);
  console.warn(ResultIndex, HotelCode, "ResultIndex,HotelCode");

  useEffect(() => {
    if (reducerState?.hotelSearchResult?.isLoadingHotelRoom == true) {
      setLoader(true);
    }
  }, [reducerState?.hotelSearchResult?.isLoadingHotelRoom]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
        ?.HotelRoomsDetails?.length >= 0
    ) {
      setLoader(false);
    }
  }, [
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.HotelRoomsDetails,
  ]);

  useEffect(() => {
    if (reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult) {
      navigate("Reviewbooking");
    }
  });

  const hotelll = reducerState?.hotelSearchResult;
  // console.log(hotelll, "hotelll");

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };
  const hotelContactNo = hotelInfo?.HotelDetails?.HotelContactNo;
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  const data = storedFormData?.dynamicFormData[0];
  // console.log(storedFormData);

  return (
    <>
      {loader ? (
        <HotelLoading />
      ) : (
        <>
          {/* step by step updating part */}

          <div className="container-fluid margin-pecentage">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                <div className="hotelBookNowOuter-new">
                  <div className="hotelBookNowHeader-new">
                    {/* <p>Your Search criteria:{storedFormData?.city},{' '} India</p>
                    <p>Duration: {storedFormData?.night}{' '}Nights</p>
                    <p>{storedFormData?.checkIn}- {storedFormData?.checkOut}</p>
                    <p>Guest(s): {totalAdults}Adult(s) </p>
                    <p>Room(s): {storedFormData?.room}</p> */}
                    <div className="serach-hotel-discribe-new">
                      <p className="serach-hotel-discribe-new-content">City</p>
                      <p className="serach-hotel-discribe-new-content1">{storedFormData?.city} </p>
                    </div>
                    {/* <div className="serach-hotel-discribe-new">
                      <p>Duration</p>
                      <p>{storedFormData?.night}</p>
                    </div> */}
                    <div className="serach-hotel-discribe-new">
                      <p className="serach-hotel-discribe-new-content">Check-In</p>
                      <p className="serach-hotel-discribe-new-content1">{storedFormData?.checkIn}</p>
                    </div>
                    <div className="serach-hotel-discribe-new">
                      <p className="serach-hotel-discribe-new-content"> Check-out</p>
                      <p className="serach-hotel-discribe-new-content1">{storedFormData?.checkOut}</p>
                    </div>
                    <div className="serach-hotel-discribe-new">
                      <p className="serach-hotel-discribe-new-content">Rooms</p>
                      <p className="serach-hotel-discribe-new-content1">{storedFormData?.room}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 mb-0">
                <div className="availabilityOuter">
                  <div className="availabilityInner-new">
                    <div>
                      <div>
                        <p>Available Room(s)</p>
                        <img src={availableRooms} alt="logo" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>Image Gallery</p>
                        <img src={imageGallery} alt="logo" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>Hotel Details</p>
                        <img src={hotelDetails} alt="logo" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>Hotel Map</p>
                        <img src={hotelMap} alt="logo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Box className="book_content" mt={3}>
              <Box py={1}>
                <Box className="accordian_area w-100">
                  <Hoteldetailaccordian />
                </Box>
              </Box>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default HotelBooknow;
