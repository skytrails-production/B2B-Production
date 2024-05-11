import React, { useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  LinearProgress,
} from "@mui/material";
import { apiURL } from "../../../Constants/constant";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventIcon from "@mui/icons-material/Event";

import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import FlightIcon from "@material-ui/icons/Flight";
import { useSelector } from "react-redux";

const sectionIcons = [
  { name: "Flight", icon: <FlightIcon /> },
  { name: "Hotel", icon: <HotelIcon /> },
  { name: "Bus", icon: <DirectionsBusIcon /> },
  { name: "TotalBooking", icon: <PersonIcon /> },
  { name: "Subadmin", icon: <PersonIcon /> },
  { name: "User", icon: <PersonIcon /> },
  { name: "Agent", icon: <PersonIcon /> },
  { name: "Total Cancel", icon: <CancelIcon /> },
  { name: "Total Change Request", icon: <ChangeCircleIcon /> },
  { name: "Event Booking", icon: <EventIcon /> },
];

const MuiCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const MuiGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const MuiCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const MuiCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "#E73C33",
  color: theme.palette.secondary.contrastText,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(1),
}));

const Default = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const reducerState = useSelector((state) => state);
  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/adminDashBoard`
        );
        setDashboardData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const sectionTitles = [
    { key: "NoOfHotelBookings", title: "Hotel" },
    { key: "NoOfFlightBookings", title: "Flight" },
    { key: "NoOfBusBookings", title: "Bus" },
    { key: "TotalBooking", title: "TotalBooking" },
    { key: "NoOfSubAdmin", title: "Subadmin" },
    { key: "NoOfUser", title: "User" },
    { key: "NoOfAgent", title: "Agent" },
    { key: "totalCancelled", title: "Total Cancel" },
    { key: "totalChangeRequests", title: "Total Change Request" },
    { key: "TotalEventBooking", title: "Event Booking" },
  ];
  const lineChartData = Object.keys(dashboardData).map((sectionKey) => ({
    name: sectionTitles.find((item) => item.key === sectionKey)?.title,
    value: dashboardData[sectionKey],
  }));

  const renderIcon = (name) => {
    const sectionIcon = sectionIcons.find((item) => item.name === name)?.icon;
    return sectionIcon;
  };

  return (
    <Grid container spacing={3}>
      {loading ? (
        <MuiGridItem
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CustomLinearProgress />
        </MuiGridItem>
      ) : (
        <>
          {access === "REQUEST_HANDLER" ||
          access === "ADS_HANDLER" ||
          access === "EVENT_HANDLER" ||
          access === "COUPON_CODE_HANDLER" ||
          access === "VISA_PROCESSING" ||
          access === "BOOKING_MANAGER" ||
          access === "USER_MANAGER" ? (
            lineChartData.map((data, index) => (
              <MuiGridItem item xs={12} sm={6} md={4} key={index}>
                <MuiCard>
                  <MuiCardHeader
                    title={data.name}
                    avatar={renderIcon(data.name)}
                    titleTypographyProps={{ variant: "subtitle1" }}
                  />
                  <Divider />
                  <MuiCardContent
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <MuiTypography variant="body1" gutterBottom>
                      {data.value}
                    </MuiTypography>
                  </MuiCardContent>
                </MuiCard>
              </MuiGridItem>
            ))
          ) : (
            <MuiGridItem item xs={12}>
              <Typography variant="h4" align="center">
                Welcome to Skytrails
              </Typography>
            </MuiGridItem>
          )}
        </>
      )}
    </Grid>
  );
};

export default Default;
