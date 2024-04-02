import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const BusSaleSummary = () => {
  const reducerState = useSelector((state) => state);
  // console.log("reducerState", reducerState);
  const markUpamount =
    reducerState?.userData?.userData?.data?.data?.markup?.bus;
  const [publishedPrice, setPublishedPrice] = useState(0);
  const [offerPrice, setOfferedPrice] = useState(0);
  const [tds, setTds] = useState(0);
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const seatObject = parsedSeatData?.blockedSeatArray;
  // console.log(seatObject);
  const published = seatObject?.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return accumulator + currentValue?.Price?.BasePrice;
  },
    0);
  const offeredPrice = seatObject?.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue?.Price?.OfferedPrice;
    },
    0
  );
  const tdsTotal = markUpamount + seatObject?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue?.Price?.TDS;
  }, 0);
  useEffect(() => {
    setOfferedPrice(offeredPrice);
    setPublishedPrice(published);
    setTds(tdsTotal);
  }, []);
  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <Box
    //     py={1}
    //     backgroundColor="#fff"
    //     boxShadow="0px 2px 8px 2px rgba(0, 0, 0, 0.15)"
    //     borderRadius="8px"
    //     padding="24px 20px"



    //   >
    //     <Typography
    //       textAlign="center"
    //       sx={{ padding: "16px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#B8CCFF", fontFamily: "Montserrat", width: "95%", margin: "auto", borderRadius: "4px" }}
    //       pt={1}
    //     >
    //       Fare Summary
    //     </Typography>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginY: "5px",
    //         marginX: "20px",
    //       }}
    //     ></Box>

    //     <div
    //       style={{
    //         width: '260px',
    //         height: '49px',
    //         padding: '8px',
    //         background: '#B8CCFF',

    //         borderRadius: '4px',
    //         borderBottom: '0.50px #071C2C solid',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //         display: 'flex',
    //         margin: 'auto'
    //       }}
    //     >
    //       <div
    //         style={{
    //           paddingTop: '8px',
    //           paddingBottom: '8px',
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             justifyContent: 'flex-start',
    //             alignItems: 'flex-start',
    //             gap: '72px',
    //             display: 'inline-flex',
    //           }}
    //         >
    //           <div
    //             style={{
    //               color: '#071C2C',
    //               fontSize: '16px',
    //               fontFamily: 'Montserrat',
    //               fontWeight: 600,
    //               lineHeight: '16.67px',
    //               wordWrap: 'break-word',
    //             }}
    //           >
    //             Published Price:
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           gap: '70px',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             color: '#071C2C',
    //             fontSize: '16px',
    //             fontFamily: 'Montserrat',
    //             fontWeight: 600,
    //             wordWrap: 'break-word',
    //           }}
    //         >
    //           ₹{publishedPrice}
    //         </div>
    //       </div>
    //     </div>

    //     {/* <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginY: "5px",
    //         marginX: "20px",
    //       }}
    //     >
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "10px", color: "#666666", fontWeight: "bold" }}
    //         >
    //           Offered Price:
    //         </Typography>
    //       </Box>
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
    //         >
    //           ₹{offerPrice}
    //         </Typography>
    //       </Box>
    //     </Box> */}
    //     {/* <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginY: "5px",
    //         marginX: "20px",
    //       }}
    //     >
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "10px", color: "#666666", fontWeight: "bold" }}
    //         >
    //           Taxes:
    //         </Typography>
    //       </Box>
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
    //         >
    //           ₹{tds}
    //         </Typography>
    //       </Box>
    //     </Box> */}

    //     <div
    //       style={{
    //         width: '260px',
    //         height: '49px',
    //         padding: '8px',
    //         background: '#B8CCFF',

    //         borderRadius: '4px',
    //         borderBottom: '0.50px #071C2C solid',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //         display: 'flex',
    //         margin: 'auto',
    //         marginTop: "10px"
    //       }}
    //     >
    //       <div
    //         style={{
    //           paddingTop: '8px',
    //           paddingBottom: '8px',
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             justifyContent: 'flex-start',
    //             alignItems: 'flex-start',
    //             gap: '72px',
    //             display: 'inline-flex',
    //           }}
    //         >
    //           <div
    //             style={{
    //               color: '#071C2C',
    //               fontSize: '16px',
    //               fontFamily: 'Montserrat',
    //               fontWeight: 600,
    //               lineHeight: '16.67px',
    //               wordWrap: 'break-word',
    //             }}
    //           >
    //             Taxes:
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           gap: '70px',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             color: '#071C2C',
    //             fontSize: '16px',
    //             fontFamily: 'Montserrat',
    //             fontWeight: 600,
    //             wordWrap: 'break-word',
    //           }}
    //         >
    //           ₹{tds}
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         width: '260px',
    //         height: '49px',
    //         padding: '8px',
    //         background: '#B8CCFF',

    //         borderRadius: '4px',
    //         borderBottom: '0.50px #071C2C solid',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //         display: 'flex',
    //         margin: 'auto',
    //         marginTop: "10px"
    //       }}
    //     >
    //       <div
    //         style={{
    //           paddingTop: '8px',
    //           paddingBottom: '8px',
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             justifyContent: 'flex-start',
    //             alignItems: 'flex-start',
    //             gap: '72px',
    //             display: 'inline-flex',
    //           }}
    //         >
    //           <div
    //             style={{
    //               color: '#071C2C',
    //               fontSize: '16px',
    //               fontFamily: 'Montserrat',
    //               fontWeight: 600,
    //               lineHeight: '16.67px',
    //               wordWrap: 'break-word',
    //             }}
    //           >
    //             Grand Total:
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           flexDirection: 'column',
    //           justifyContent: 'flex-start',
    //           alignItems: 'flex-start',
    //           gap: '70px',
    //           display: 'inline-flex',
    //         }}
    //       >
    //         <div
    //           style={{
    //             color: '#071C2C',
    //             fontSize: '16px',
    //             fontFamily: 'Montserrat',
    //             fontWeight: 600,
    //             wordWrap: 'break-word',
    //           }}
    //         >
    //           ₹{tds + publishedPrice}
    //         </div>
    //       </div>
    //     </div>






    //     {/* <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginY: "5px",
    //         marginX: "20px",
    //       }}
    //     >
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "12px", color: "#006FFF", fontWeight: "bold" }}
    //         >
    //           Grand Total
    //         </Typography>
    //       </Box>
    //       <Box>
    //         <Typography
    //           sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
    //         >
    //           ₹{tds+publishedPrice}
    //         </Typography>
    //       </Box>
    //     </Box> */}
    //   </Box>
    // </Box>

    <div className="saleSummaryBus">
      <div className="fareSummary-new">
        <p>Fare Summary</p>
      </div>
      <div className="publishedTax">
        <div>
          <p>Published Price:</p>
          <span>₹{publishedPrice.toFixed(2)}</span>
        </div>
        <div>
          <p>Taxes:</p>
          <span> ₹{markUpamount}</span>
        </div>
      </div>
      <div className="busGrandTotal">
        <p>Grand Total:</p>
        <span>₹{markUpamount + publishedPrice}</span>
      </div>
    </div>
  );
};

export default BusSaleSummary;
