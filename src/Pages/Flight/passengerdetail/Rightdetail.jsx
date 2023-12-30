import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Link from "@mui/icons-material/Link";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import "./passenger.css";
import { Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import Headers from "../../../Components/Headers";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyValue = ({ data, value }) => {
  // console.log("----------------------");
  // console.log(data);
  // console.log(value);
  // console.log("----------------------");
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {data}:
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <div
            style={{
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "400",
              wordWrap: "break-word",
              width: "100px",
              textAlign: "left",
              marginLeft: "70px"

            }}
          >
            Rs. {value}.00
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default function Popularfilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("reducerState", reducerState);
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.flight;

  // console.log("fareValue 🤞", fareValue);

  let total = 0;








  return (
    <>

      {fareQuote === 0 ? (
        <>
          {fareValue?.Segments?.map((dat, index) => {
            return dat?.map((data1) => {
              const dateString = data1?.Origin?.DepTime;
              const date = new Date(dateString);
              const day = date.getDate();
              const month = date.toLocaleString("default", {
                month: "short",
              });
              const year = date.getFullYear();
              const formattedDate = `${day} ${month} ${year}`;
              return (
                <>
                  <div className="priceSummary">
                    <div className="head">
                      <span>Price Summary</span>
                    </div>
                    {/* <div className="hotName">
                      <p>hotel name</p>
                    </div> */}
                    <div className="totCOmm">
                      <div >
                        <span>{formattedDate}</span>
                        <p>{data1?.Airline?.FlightNumber}</p>
                        <p>{data1?.Airline?.FareClass} Class</p>
                      </div>

                    </div>
                    <div className="priceChart">
                      <div >
                        <span className="text-bold">From</span>
                        <p className="text-bold">{data1?.Origin?.Airport?.AirportCode}</p>
                      </div>
                      <div >
                        <span className="text-bold">To</span>
                        <p className="text-bold">{data1?.Destination?.Airport?.AirportCode}</p>
                      </div>
                      {/* <div >
                        <span>Other Tax</span>
                        <p>{'₹'}500</p>
                      </div>
                      <div >
                        <span className="text-bold">No of Rooms</span>
                        <p className="text-bold">2</p>
                      </div> */}
                    </div>
                    <div className="totCOmm">
                      {fareValue?.FareBreakdown?.map((data) => {
                        return (
                          <div className="">
                            {data?.PassengerType === 1 && (
                              <>
                                <span>Adult x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>

                              </>
                            )}
                            {data?.PassengerType === 2 && (
                              <>
                                <span>Child x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                              </>
                            )}
                            {data?.PassengerType === 3 && (
                              <>
                                <span>Infant x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                              </>
                            )}


                          </div>
                        );
                      })}

                    </div>

                    <div className="TotGst">
                      <div>
                        <span>Total TAX: </span>
                        <p>{'₹'}{markUpamount}</p>
                      </div>
                      <div >
                        <span>Grand Total:</span>
                        <p>{'₹'}{fareValue?.Fare?.BaseFare +
                          fareValue?.Fare?.Tax +
                          fareValue?.Fare?.OtherCharges +
                          markUpamount}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            });
          })}
        </>
      ) : (
        <>
          <div>
            <p>session expired</p>
          </div>
        </>
      )}

    </>
  );
}



