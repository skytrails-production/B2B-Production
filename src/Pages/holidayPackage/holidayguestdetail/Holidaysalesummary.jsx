import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import Custombutton from "../../../Custombuttom/Button";
import color from "../../../color/color";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Holidaysalesummary = ({ childCount, adultCount }) => {
  const [grandTotal, setgrandTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  const reducerForm = reducerState?.form?.formEntries;
  console.warn("reducerForm", reducerForm)
  if (reducerForm === undefined) {
    return (<div></div>)
  }
  return (

    <>


      <div className="priceSummary">
        <div className="head">
          <span>Price Summary</span>
        </div>


        <div className="priceChart">
          <div >
            <span className="text-bold">Rate</span>
          </div>
          <div >
            <span>Fare Break Up</span>
            <p>{'₹'}{(reducerForm.length - 1) *
              onePackage?.pakage_amount.amount *
              0.05 +
              (reducerForm?.length - 1) * onePackage?.pakage_amount.amount}</p>
          </div>
          <div >
            <div className="noOfTravellers">
              <span>Total Basic Cost</span>
              <span>{" "}
                Travellers {reducerForm?.length - 1} x{" "}₹
                {(onePackage?.pakage_amount.amount).toFixed(2)}</span>
            </div>
            <p>{'₹'}{((Number(reducerForm?.length - 1)) * Number(onePackage?.pakage_amount.amount)).toFixed(2)}</p>
          </div>
        </div>
        <div className="totCOmm">
          <div >
            <span className="feesTax">Fees & Taxes</span>
          </div>
          <div >
            <span>GST 5.0%</span>
            <p>{'₹'}{((reducerForm.length - 1) *
              onePackage?.pakage_amount.amount *
              0.05).toFixed(2)}</p>
          </div>
          <div >
            <span>Total GST</span>
            <p>{'₹'}{((reducerForm.length - 1) *
              onePackage?.pakage_amount.amount *
              0.05).toFixed(2)}</p>
          </div>
        </div>
        <div className="TotGst">
          <div >
            <span>Grand Total:</span>
            <p>{'₹'}{((reducerForm.length - 1) *
              onePackage?.pakage_amount?.amount *
              0.05 +
              (reducerForm?.length - 1) * onePackage?.pakage_amount?.amount).toFixed(2)}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Holidaysalesummary;




{/* <form action="/Holidayreviewbooking">
          <Box display="flex" justifyContent="center" width={"100%"}>
           
            <Custombutton title={"Proceed to Booking Review"}/>
          </Box>
        </form> */}














{/* <Box sx={{ flexGrow: 1 }} marginTop={2}>
        <Box
          py={1}
          backgroundColor="white"
          boxShadow="1px 1px 8px gray"
          borderRadius="10px"
        >
          <Typography justifyContent="center" display="flex" pt={3} fontSize="20px" font="bold" style={{ color: color.bluedark }}>
            Sale Summary
          </Typography>
          <Typography
            pt={1}
            paddingLeft="22px"
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "12px", fontWeight: "bold", color: "#666666" }}
          >
            GRAND TOTAL:-{ }
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // alignItems:"center",

            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "24px", color: "#252525", fontWeight: "bold", marginLeft: "20px" }}
              >
                Price
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: color.red1,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ₹{" "}
                {(reducerForm.length - 1) *
                  onePackage?.pakage_amount.amount *
                  0.05 +
                  (reducerForm.length - 1) * onePackage?.pakage_amount.amount}
              </Typography>

              <Typography
                sx={{
                  fontSize: "8px",
                  color: "#006FFF",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                (Inclusive of All Taxes )
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",

            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold", marginLeft: "20px" }}
              >
                Fare Breakup
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: color.red1, fontWeight: "bold", marginRight: "40px" }}
              >
                ₹{" "}
                {(reducerForm.length - 1) *
                  onePackage?.pakage_amount.amount *
                  0.05 +
                  (reducerForm.length - 1) * onePackage?.pakage_amount.amount}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "5px",
              marginX: "20px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold" }}
              >
                Total Basic Cost
              </Typography>
              <Typography
                sx={{ fontSize: "10px", color: color.red1, fontWeight: "bold" }}
              >
                {" "}
                ₹ Travellers {reducerForm.length - 1} x{" "}
                {onePackage?.pakage_amount.amount}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: color.red1, fontWeight: "bold", marginRight: "22px" }}
              >
                ₹{(reducerForm.length - 1) * onePackage?.pakage_amount.amount}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "8px",
              marginX: "20px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold", marginRight: "40px" }}
              >
                Fees & Taxes
              </Typography>
              <Typography
                sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold" }}
              >
                {" "}
                GST 5.0%
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: color.red1, fontWeight: "bold", marginRight: "20px" }}
              >
                ₹{" "}
                {(reducerForm.length - 1) *
                  onePackage?.pakage_amount.amount *
                  0.05}
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: color.red1, fontWeight: "bold" }}
              >
                ₹{" "}
                {(reducerForm.length - 1) *
                  onePackage?.pakage_amount.amount *
                  0.05}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{ backgroundColor: "gray", marginY: "2px", marginX: "15px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "5px",
              marginX: "20px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
              >
                Total GST
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: color.red1, fontWeight: "bold", marginRight: "22px" }}
              >
                ₹{" "}
                {(reducerForm.length - 1) *
                  onePackage?.pakage_amount.amount *
                  0.05}
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>




 */}
