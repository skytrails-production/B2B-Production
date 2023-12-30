import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import Fairrule from "./Fairrule";
import Nonrefundable from "./Nonrefundable";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useDispatch, useSelector, useReducer } from "react-redux";

import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import Rangeslide from "./Rangeslide";
import Flightdetail from "./Flightdetail";

import "./flightresult.css";
import { Spacer } from "@chakra-ui/react";
import Swal from "sweetalert2";
const label = { inputProps: { "aria-label": "Checkbox demo" } };


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Popularfilter() {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;

  const OpenNewpage = () => {
    navigate("booknow");
  };
  return (
    <Flightdetail />
  );
}
