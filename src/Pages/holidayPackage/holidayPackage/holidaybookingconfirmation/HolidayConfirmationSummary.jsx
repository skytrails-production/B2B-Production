import React from 'react'
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HolidayConfirmationSummary = () => {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Box py={1}
        backgroundColor="white"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
      >
        <Typography justifyContent="center" display="flex" pt={3}>
          Sale Summary
        </Typography>
        <Typography
          pt={1}
          paddingLeft="22px"
          justifyContent="start"
          display="flex"
          sx={{ fontSize: "12px", fontWeight: "bold", color: "#666666" }}
        >
          GRAND TOTAL - 2 Adults
        </Typography>
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
              Price
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "20px", color: "#FF8900", fontWeight: "bold" }}
            >
              ₹55,485
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
            marginY: "5px",
            marginX: "20px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Fare Breakup
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
            >
              ₹55,485
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
              sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold" }}
            >
              {" "}
              23,691 x 2 Travellers
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
            >
              ₹47,382
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
              sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold" }}
            >
              Coupon Discount
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              {" "}
              GRANDOFFER <Link sx={{ cursor: "pointer" }}>Edit</Link>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
            >
              - ₹7,382
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
              sx={{ fontSize: "10px", color: "#252525", fontWeight: "bold" }}
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
              sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
            >
              + ₹1,892
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              ₹1,892
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
              sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
            >
              ₹ 41.40
            </Typography>
          </Box>
        </Box>
        <form action="/">
          <Box my={2} textAlign="center">
            <Button variant="contained" type="submit" style={{borderRadius:'10px'}}>
            Print
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default HolidayConfirmationSummary
