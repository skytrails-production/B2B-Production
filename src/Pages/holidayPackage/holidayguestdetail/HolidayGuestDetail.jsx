import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Box as MuiBox} from "@mui/material/";
import Modal from "@mui/material/Modal";
import {
  Flex,
  Spacer,
  Text,
  HStack,
  Box,

} from "@chakra-ui/react";
import HolidayPackagedetail from "../holidaypackageresult/HolidayPackagedetail";
import HolidatLeftPackage from "../holidaypackageresult/HolidatLeftPackage";
import Holidayguestinfo from "./Holidayguestinfo";
import Holidaysalesummary from "./Holidaysalesummary";
import "./holidayguestdetail.css";
import { styled } from "@mui/material/styles";
import { Box as MuiBox } from "@mui/material";
import Paper from "@mui/material/Paper";
// import  {successGIF} from "../../../Images";

import successGif from "../../../Images/successGif.png"

import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import color from "../../../color/color"
const HolidayGuestDetail = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [childCount, setchildCount] = useState(0);
  const [adultCount, setadultCount] = useState(0);
  const reducerState = useSelector((state) => state);
  const requestSuccess =
    reducerState?.packageBookingRequest?.showSuccessMessage;
  const [showSuccess, setShowsuccess] = useState(requestSuccess);


  return (
    <div>



      {/* <Modal
        open={showSuccess}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <MuiBox sx={{ ...style, width: 200 }}>
          <img
            src={successGif}
            alt="sucess gif"
            style={{ width: "100%" }}
          />
          <Button>Close Child Modal</Button>
        </MuiBox>
      </Modal> */}
      <div className="container p-3 bg-light">
        <div className="row">
          <div className="col-lg-9">
            <Holidayguestinfo />
          </div>

          <div className="col-lg-3">
            <Holidaysalesummary
              childCount={childCount}
              adultCount={adultCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayGuestDetail;
