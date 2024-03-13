import React, { useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
} from "@mui/material";
import { apiURL } from "../../../Constants/constant";
import axios from "axios";
import "./Home.css";

const Default = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/adminDashBoard`
        );
        setDashboardData(response.data.result);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      className="welcome-container"
    >
      <div className="typing-animation">Welcome to the skyTrails</div>
    </Grid>
  );
};

export default Default;
