import Stepper from "../../../Components/Stepper";
import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import "./busresult.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import Busdetail from "./Busdetail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import { clearBusSearchReducer } from "../../../Redux/busSearch/busSearchAction";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BusLoading from "../busLoading/BusLoading";
const BusResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const busFullData = reducerState;
  // console.log("full data", busFullData);
  const busDataResult = reducerState?.getBusResult;
  // console.log("bus data", busDataResult);
  const [loader, setLoader] = useState(false);

  // Loader Code
  useEffect(() => {
    if (reducerState?.getBusResult?.isLoading == true) {
      setLoader(true);
    }
  }, [reducerState?.getBusResult?.isLoading]);

  useEffect(() => {
    if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult) {
      navigate("/BusResult");
      setLoader(false);
    }
  }, [reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult]);

  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setExpanded(false);
      } else {
        setExpanded('panel1');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [selectedAC, setSelectedAC] = useState(false);
  const [selectedNonAC, setSelectedNonAC] = useState(false);
  const [selectedSleeper, setSelectedSleeper] = useState(false);
  const [selectedSeater, setSelectedSeater] = useState(false);

  const handleACClick = () => {
    setSelectedAC(true);
    setSelectedNonAC(false);
  };

  const handleNonACClick = () => {
    setSelectedAC(false);
    setSelectedNonAC(true);
  };


  const handleSleeperClick = () => {
    setSelectedSleeper(true);
    setSelectedSeater(false);
  };

  const handleSeaterClick = () => {
    setSelectedSleeper(false);
    setSelectedSeater(true);
  };


  const handleClearFilter = () => {
    setSelectedAC(false);
    setSelectedNonAC(false)
    setSelectedSleeper(false)
    setSelectedSeater(false)
  }



  return (
    <>
      {loader ? (
        <BusLoading />
      ) : (

        <Busdetail />
      )}
    </>

    // <BusLoading />
  );
};

export default BusResult;
