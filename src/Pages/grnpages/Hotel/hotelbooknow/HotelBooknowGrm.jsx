import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import "./hotelbooknow.css";
import { Divider, Grid, Typography } from "@mui/material";
import bed from "../../../../Images/bed.png";
import availableRooms from "../../../../Images/Hotel/availableRooms.png";
import hotelMap from "../../../../Images/Hotel/hotelMap.png";
import hotelDetails from "../../../../Images/Hotel/hotelDetails.png";
import imageGallery from "../../../../Images/Hotel/imageGallery.png";

import Hoteldetailaccordian from "./Hoteldetailaccordian";
import StarIcon from "@mui/icons-material/Star";

import { useDispatch, useSelector, useReducer } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
//import { clearHotelSelectedRoom } from "../../../../Redux/HotelGrn/hotel";
import HotelLoading from "../hotelLoading/HotelLoading";
import Swal from "sweetalert2";
import { swalModal } from "../../../../utils/swal";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import CustomModal from "../swal/model";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const HotelBooknowGrm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
 
  const [loader, setLoader] = useState(true);
  const [showRooms, setShowRooms] = useState(10);
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors
        ?.length > 0
    ) {
      swalModal("hotel", "room not found", false);
      <CustomModal />;
      navigate("/hotels/hotelsearchs");
    }
  }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 &&
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
        ?.regular?.length > 0
    ) {
      // navigate("/hotels/hotelsearchs/HotelBooknowgrm");
      setLoader(false);
    }
  }, [
    reducerState?.hotelSearchResultGRN?.hotelDetails?.status ||
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images,
  ]);

  // useEffect(() => {
  //   dispatch(clearHotelSelectedRoom());
  // }, []);

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

      sessionStorage.removeItem("HotelCode");
      sessionStorage.removeItem("ResultIndex");
      navigate("/");
    }
  }, [
    reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error
      ?.ErrorCode,
  ]);

 

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

  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));

  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;

  return (
    <>
      {loader ? (
        <HotelLoading />
      ) : (
        <>
          {/* step by step updating part */}

          <div className="container-fluid margin-pecentage">
            <div className="row">
              <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                <div className="hotelBookNowOuter-new">
                  <div className="hotelBookNowHeader-new">
                    <div className="serach-hotel-discribe-new">
                      <p className="serach-hotel-discribe-new-content">
                        City, Property Name Or Location
                      </p>
                      <p className="serach-hotel-discribe-new-content1">
                        {storedFormData?.city}{" "}
                      </p>
                    </div>

                    <div className="serach-hotel-discribe-new">
                      <div style={{ display: "flex", gap: "5px" }}>
                        <p className="serach-hotel-discribe-new-content">
                          Check-In
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.29357 14.7072C7.1061 14.5197 7.00078 14.2654 7.00078 14.0002C7.00078 13.735 7.1061 13.4807 7.29357 13.2932L10.5866 10.0002L7.29357 6.70721C7.19806 6.61497 7.12188 6.50462 7.06947 6.38262C7.01706 6.26061 6.98947 6.12939 6.98832 5.99661C6.98716 5.86384 7.01247 5.73216 7.06275 5.60926C7.11303 5.48636 7.18728 5.37471 7.28117 5.28082C7.37507 5.18693 7.48672 5.11267 7.60961 5.06239C7.73251 5.01211 7.86419 4.98681 7.99697 4.98796C8.12975 4.98912 8.26097 5.0167 8.38297 5.06911C8.50498 5.12152 8.61532 5.1977 8.70757 5.29321L12.7076 9.29321C12.895 9.48074 13.0004 9.73505 13.0004 10.0002C13.0004 10.2654 12.895 10.5197 12.7076 10.7072L8.70757 14.7072C8.52004 14.8947 8.26573 15 8.00057 15C7.73541 15 7.4811 14.8947 7.29357 14.7072Z"
                            fill="#071C2C"
                          />
                        </svg>
                      </div>

                      <p className="serach-hotel-discribe-new-content1">
                        {dayjs(hotelMainReducer?.checkin).format("DD MMM, YY")}
                      </p>
                    </div>
                    <div className="serach-hotel-discribe-new">
                      <div style={{ display: "flex", gap: "5px" }}>
                        <p className="serach-hotel-discribe-new-content">
                          {" "}
                          Check-out
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.29357 14.7072C7.1061 14.5197 7.00078 14.2654 7.00078 14.0002C7.00078 13.735 7.1061 13.4807 7.29357 13.2932L10.5866 10.0002L7.29357 6.70721C7.19806 6.61497 7.12188 6.50462 7.06947 6.38262C7.01706 6.26061 6.98947 6.12939 6.98832 5.99661C6.98716 5.86384 7.01247 5.73216 7.06275 5.60926C7.11303 5.48636 7.18728 5.37471 7.28117 5.28082C7.37507 5.18693 7.48672 5.11267 7.60961 5.06239C7.73251 5.01211 7.86419 4.98681 7.99697 4.98796C8.12975 4.98912 8.26097 5.0167 8.38297 5.06911C8.50498 5.12152 8.61532 5.1977 8.70757 5.29321L12.7076 9.29321C12.895 9.48074 13.0004 9.73505 13.0004 10.0002C13.0004 10.2654 12.895 10.5197 12.7076 10.7072L8.70757 14.7072C8.52004 14.8947 8.26573 15 8.00057 15C7.73541 15 7.4811 14.8947 7.29357 14.7072Z"
                            fill="#071C2C"
                          />
                        </svg>
                      </div>

                      <p className="serach-hotel-discribe-new-content1">
                        <p>
                          {dayjs(hotelMainReducer?.checkout).format(
                            "DD MMM, YY"
                          )}
                        </p>
                      </p>
                    </div>
                    <div className="serach-hotel-discribe-new">
                      <div style={{ display: "flex", gap: "5px" }}>
                        <p className="serach-hotel-discribe-new-content">
                          Rooms & Guests
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.29357 14.7072C7.1061 14.5197 7.00078 14.2654 7.00078 14.0002C7.00078 13.735 7.1061 13.4807 7.29357 13.2932L10.5866 10.0002L7.29357 6.70721C7.19806 6.61497 7.12188 6.50462 7.06947 6.38262C7.01706 6.26061 6.98947 6.12939 6.98832 5.99661C6.98716 5.86384 7.01247 5.73216 7.06275 5.60926C7.11303 5.48636 7.18728 5.37471 7.28117 5.28082C7.37507 5.18693 7.48672 5.11267 7.60961 5.06239C7.73251 5.01211 7.86419 4.98681 7.99697 4.98796C8.12975 4.98912 8.26097 5.0167 8.38297 5.06911C8.50498 5.12152 8.61532 5.1977 8.70757 5.29321L12.7076 9.29321C12.895 9.48074 13.0004 9.73505 13.0004 10.0002C13.0004 10.2654 12.895 10.5197 12.7076 10.7072L8.70757 14.7072C8.52004 14.8947 8.26573 15 8.00057 15C7.73541 15 7.4811 14.8947 7.29357 14.7072Z"
                            fill="#071C2C"
                          />
                        </svg>
                      </div>

                      <p className="serach-hotel-discribe-new-content1">
                        {hotelMainReducer?.no_of_rooms}Room,
                        {hotelMainReducer?.no_of_adults}
                        Adults,{storedFormData?.noOfChild}Children
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-0 col-lg-12 col-md-12 col-sm-12">
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

export default HotelBooknowGrm;
