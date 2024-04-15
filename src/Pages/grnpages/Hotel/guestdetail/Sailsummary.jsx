import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Link from "@mui/icons-material/Link";
import "./sailsummary.css";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";

import "./guestdetail.css";
import { Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Popularfilter() {
  const reducerState = useSelector((state) => state);

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
    console.log(reducerState, "reducer state")

    const markUpPrice = reducerState?.logIn?.loginData?.data?.data?.markup?.hotel;
    console.log(markUpPrice,"-----------");
  console.log(Number(hotelinfoGRN?.rate?.price) + Number(markUpPrice),"======================");
  return (
    <>
      <div className="priceSummary">
        <div className="head">
          <span>Sale Summary</span>
        </div>

        <div className="priceChart">
          <div>
            <span className="text-bold">Rate</span>
            {/* <p>{hotelData?.Price?.RoomPrice}</p> */}
          </div>
          <div>
            <span>Published</span>
            <p>
              {"₹"} {Number(hotelinfoGRN?.rate?.price).toFixed(0)}
            </p>
          </div>
          <div>
            <span>Other Tax</span>
            <p>
              {"₹"}
              {markUpPrice}
            </p>
          </div>
          <div>
            <span className="text-bold">No of Rooms</span>
            <p className="text-bold">{hotelinfoGRN?.rate?.rooms.length}</p>
          </div>
        </div>
        {/* <div className="totCOmm">
          <div >
            <span>Total</span>
            <p>{'₹'}8,673.00</p>
          </div>
          <div >
            <span>Comm. Earned</span>
            <p>{'₹'}8,673.00</p>
          </div>
          <div >
            <span>TDS</span>
            <p>{'₹'}8,673.00</p>
          </div>
        </div> */}
        <div className="TotGst">
          {/* <div >
            <span>Total GST:</span>
            <p>{'₹'}673.00</p>
          </div> */}
          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}{" "}
              {(
                Number(hotelinfoGRN?.rate?.price) + Number(markUpPrice)
              ).toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}