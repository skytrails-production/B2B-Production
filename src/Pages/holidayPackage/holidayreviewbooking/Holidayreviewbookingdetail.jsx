import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import EngineeringIcon from "@mui/icons-material/Engineering";

import HolidayRating from "../holidaypackageresult/HolidayRating";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import color from "../../../color/color";
import { getUserDataAction } from "../../../Redux/Auth/UserDataById/actionUserData";
import "./Holidayreviewbookingdetail.css"

const Holidayreviewbookingdetail = () => {

  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  const reducerForm = reducerState?.form?.formEntries;

  // console.log(onePackage);
  // console.log(reducerForm);

  const packageDetails = reducerState?.packageBookingRequest?.packageRequestData
  // console.log(packageDetails, 'package hotel')
  




  return (
    <>

      <div className="col-lg-12 mb-4">
        <div className="packageName">
          <p className="mb-3">{onePackage?.pakage_title}</p>
          <span>{`${onePackage?.days - 1}N`} / {`${onePackage?.days}D`}</span>
        </div>
      </div>


      {/*Traveller details   */}

      <div className="col-lg-12 my-3 " >
        <div className="headingGuestHoliday">
          <p>Traveller Details</p>
        </div>

        <div className="travellerDetailsForm">
          <div className="addGuest mb-2">
            <p>{reducerForm.length - 1} Travellers <span>- 1 Room | {reducerForm.length - 1} Adults</span></p>
          </div>
          {packageDetails.travellers.map((item, index) => (
            <>
              <div className="travellerData">
                <div>
                  <p>Name : <span>{item.name}</span> </p>
                </div>
                <div>
                  <p>DOB : <span>{item.dob}</span> </p>
                </div>
                <div>
                  <p>Gender : <span>{item.gender}</span> </p>
                </div>
              </div>
            </>

          ))
          }

        </div>

      </div>



      {/* package ininerary and inclusion  */}

      <div className="col-lg-12 my-3 " >
        <div className="headingGuestHoliday">
          <p></p>
        </div>

        {onePackage?.detailed_ltinerary?.map((item, index) => {
          return (
            <>
              <div className="travellerDetailsForm">
                <div className="addGuest mb-2">
                  <p>Day{index + 1}</p>
                </div>
                <div className="itinerary">
                  <p>{item}</p>
                </div>
              </div>
            </>
          );
        })}

      </div>


      {/* cancellation policy  */}


      <div className="col-lg-12 my-3">
        <div className="headingGuestHoliday">
          <p>Cancellation Policy</p>
        </div>

        <div className="travellerDetailsForm">

          <div className="itinerary">
            <p>{onePackage?.cancellation_Policy}</p>
          </div>
        </div>

      </div>

      {/* term and condition  */}

      <div className="col-lg-12 my-3">
        <div className="headingGuestHoliday">
          <p>Term & Condition</p>
        </div>

        <div className="travellerDetailsForm">

          <div className="itinerary">
            <p>{onePackage?.term_Conditions}</p>
          </div>
        </div>

      </div>

      {/* <Box>

        <Box className="main-head" mt={2}>
          <Typography className="holiday_txt" style={{ color: color.bluedark }}>
            Traveller Details
          </Typography>
          <Typography className="holiday_txt_b" py={1}>
            {reducerForm.length - 1} Travellers
            <Typography fontSize="14px" fontWeight="bold" color="#006FFF" px={1}>
              - 1 Room | {reducerForm.length - 1} Adults
            </Typography>
          </Typography>

          {
            packageDetails.travellers.map((item, index) => (
              <>
                <Typography className="holiday_txt_v" style={{ color: color.red1 }}>
                  Traveller 1 (Adult)
                </Typography>
                <Box>
                  <Box mt={1} display="flex">
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                    >
                      Name:
                    </Typography>

                    <Typography
                      ml={1}
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                    >
                      {item.name}
                    </Typography>

                  </Box>
                  <Box mt={1} display="flex">
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                    >
                      Date of Birth:
                    </Typography>
                    <Typography
                      ml={1}
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                    >
                      {item.dob}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                      ml={3}
                    >
                      Gender:
                    </Typography>
                    <Typography
                      ml={1}
                      sx={{
                        fontSize: "16px",
                        color: "#666666",
                        cursor: "pointer",
                      }}
                    >
                      {item.gender}
                    </Typography>
                  </Box>
                </Box>
              </>

            ))
          }

        </Box>


      </Box> */}
    </>
  );
};

export default Holidayreviewbookingdetail;
