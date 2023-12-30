import * as React from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./busresult.css";
import { Grid } from "@mui/material";
import { display } from "@mui/system";
import { Button } from "@mui/material";
import Buscancellation from "./Buscancellation";
import BusBoardingPoint from './BusBoardingPoint';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Select Seat" {...a11yProps(0)} />
          <Tab label="Cancellation Policy" {...a11yProps(1)} />
          <Tab label="Boarding Point" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box display="flex">
          <Box className="main_tab">
            <Typography
              sx={{
                color: "#666666",
                fontWeight: "bold",
                fontSize: "10px",
                textAlign: "center",
                marginY: "20px",
              }}
            >
              Upper
            </Typography>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Typography textAlign="center">A</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Typography textAlign="center">B</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Typography textAlign="center">C</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Typography textAlign="center">D</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="main_tab" ml={2}>
            <Typography
              sx={{
                color: "#666666",
                fontWeight: "bold",
                fontSize: "10px",
                textAlign: "center",
                marginY: "20px",
              }}
            >
              Lower
            </Typography>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Typography textAlign="center">A</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Typography textAlign="center">B</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Typography textAlign="center">C</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Typography textAlign="center">D</Typography>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}></Grid>
                <Grid lg={2} mx={1}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
                <Grid lg={2}>
                  <Box display="flex">
                    <Box
                      sx={{
                        width: "40px",
                        height: "35px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box ml={2} p={5}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: "40px",
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  border: "1px solid gray",
                }}
              ></Box>
              <Typography
                sx={{ marginLeft: "10px", color: "#666666", fontSize: "10px" }}
              >
                Available Seat
              </Typography>
              <Box
                sx={{
                  width: "40px",
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: "#FF8900",
                }}
                ml={5}
              ></Box>
              <Typography
                sx={{ marginLeft: "10px", color: "#666666", fontSize: "10px" }}
              >
                Available Seat
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" py={2}>
              <Box
                sx={{
                  width: "40px",
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: "#FF00B2",
                }}
              ></Box>
              <Typography
                sx={{ marginLeft: "10px", color: "#666666", fontSize: "10px" }}
              >
                Reserved for ladies
              </Typography>
              <Box
                sx={{
                  width: "40px",
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: "#006FFF",
                }}
                ml={2}
              ></Box>
              <Typography
                sx={{ marginLeft: "10px", color: "#666666", fontSize: "10px" }}
              >
                Selected Seat
              </Typography>
            </Box>
            <Box px={4} mt={5}>
              <Box display="flex">
                <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Seats:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#006FFF",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    34
                  </Typography>
                </Box>
                <Box display="flex" ml={5}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Amount:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#006FFF",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    ₹2342
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box px={4} py={1}>
              <Box display="flex" mt={2}>
                <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Select Boarding Point:
                  </Typography>
                  <Box
                    ml={2}
                    sx={{
                      boxShadow: "0 3px 8px gray",
                      width: "100px",
                      height: "30px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <select style={{ border: "none", marginTop: "5px" }}>
                      <option>Select</option>
                      <option>vb</option>
                      <option>vb</option>
                    </select>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" mt={2}>
                <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Select Dropping Point:
                  </Typography>
                  <Box
                    ml={2}
                    sx={{
                      boxShadow: "0 3px 8px gray",
                      width: "100px",
                      height: "30px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <select style={{ border: "none", marginTop: "5px" }}>
                      <option>Select</option>
                      <option>vb</option>
                      <option>vb</option>
                    </select>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box display='flex' justifyContent='space-around'>
              <Button variant="contained" type="submit">Close</Button>
              <Button variant="contained" type="submit">Continue</Button>
            </Box>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Buscancellation/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BusBoardingPoint/>
      </TabPanel>
    </Box>
  );
}
