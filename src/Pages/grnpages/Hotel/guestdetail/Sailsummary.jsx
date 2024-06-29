import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./sailsummary.css";

import "./guestdetail.css";
import { Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector, useReducer } from "react-redux";

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
   
    const markUpPrice = reducerState?.logIn?.loginData?.data?.data?.markup?.hotel;
  
  return (
    <>
      <div className="priceSummary">
        <div className="head">
          <span>Sale Summary</span>
        </div>

        <div className="priceChart">
          <div>
            <span className="text-bold">Rate</span>
           
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
        
        <div className="TotGst">
          
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
