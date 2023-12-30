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
// import Rangeslide from './Rangeslide';
// import Flightdetail from './Flightdetail';

import "./flightreviewbooking.css";
import { Spacer } from "@chakra-ui/react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Popularfilter() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        backgroundColor="white"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        p={2}
      >
        <Typography color="#616161" fontSize="12px" fontWeight="bold">
          Sale Summary
        </Typography>
        <Typography
          pt={1}
          paddingLeft="4px"
          justifyContent="start"
          display="flex"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Superior Room
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              06 Feb 23
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              G8323{" "}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              M Class
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "3px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Dept:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
            >
              DEL
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              @1820 hrs
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Arrive:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
            >
              BOM
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              @2035 hrs
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "2px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Typography
          sx={{ fontSize: "12px", color: "#616161", fontWeight: "bold" }}
        >
          Fare / Pax Type
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            ></Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Published
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Offered
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "2px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Adult:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs. 1,578.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs. 1,578.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            OT Tax:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs. 561.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs. 561.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            YQ Tax:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs.750.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.750.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            YR Tax:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs.60.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.60.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            T. Fee and S.Charges:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs.450.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.450.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "black", fontWeight: "bold" }}
          >
            Total:
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#0052D0", fontWeight: "bold" }}
          >
            Rs.3,399.00
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.3,399.00
          </Typography>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "2px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Typography
          sx={{ fontSize: "12px", color: "#616161", fontWeight: "bold" }}
          py={1}
        >
          Total Fare
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Adult x 1
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs. 3,399.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Excess Baggage (0KG )
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs. 00.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Meal (0Platter )
          </Typography>
          <Typography
            sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs. 00.00
          </Typography>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "2px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Box className="box_one" my={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Total Pub. Fare
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs. 3399.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Comm. Earned (-)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Transaction Fee (-)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              TDS (+)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              PLB Earned (-)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              TDS on Incntv (+)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              TDS on PLB (+)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Total GST (+)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.0.00
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "10px",
              marginX: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
            >
              Incntv Earned (-)
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "#FF8900", fontWeight: "bold" }}
            >
              Rs.81.00
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor: "gray",
            marginY: "2px",
            marginX: "5px",
            height: "2px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
          py={1}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Total Payable:
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.3480.00
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "5px",
            marginX: "5px",
          }}
          pb={1}
        >
          <Typography
            sx={{ fontSize: "10px", color: "#616161", fontWeight: "bold" }}
          >
            Total Commission Earned:
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
          >
            Rs.480.00
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
