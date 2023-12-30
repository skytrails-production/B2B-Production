import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { packageBookingAction } from "../../../Redux/HolidayBookingRequest/actionBooking";

import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import HolidayRangeslider from "./HolidayRangeslider";
import building from "../../../Images/building.png";
import night from "../../../Images/night.png";
import beds from "../../../Images/beds.png";
import unitednations from "../../../Images/unitednations.png";
import addgroup from "../../../Images/addgroup.png";
import review from "../../../Images/review.png";
import HolidayRating from "./HolidayRating";
import { useNavigate } from "react-router-dom";
import "./Holidaypackageresult.css";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HolidatLeftPackage = (props) => {
  const dispatch = useDispatch();

  // console.log("props", props);

  const { packageId, userId } = props;

  // console.log("package data", packageId);
  // console.log("user data", userId);

  const [child, setChild] = useState(0);
  const [adult, setAdult] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactNumber: {
      phone: "",
    },
    departureCity: "",
    adults: adult,
    child: child,
    selectRoom: "",
    checkIndate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHolidayRequest = (event) => {
    event.preventDefault();

    const payload = {
      pakageid: packageId,
      userId: userId,
      email: formData.email,
      fullName: formData.fullName,
      contactNumber: {
        contryCode: "+91",
        phone: formData.contactNumber,
      },
      departureCity: formData.departureCity,
      adults: adult,
      child: child,
      selectRoom: 1,
      checkIndate: formData.checkIndate,
    };
    // console.log("payload", payload);
    dispatch(packageBookingAction(payload));
    event.target.reset();
    setAdult(0);
    setChild(0);
  };

  const navigate = useNavigate();
  const Clickback = () => {
    navigate("HolidayPackage");
  };

  return (
    <div>
      <Box className="header_top" mt={1} border="1px solid gray">
        <Box>
          <form onSubmit={handleHolidayRequest}>
            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Enter Your Details and Proceed{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                To Book
              </Typography>
            </Box>
            <Box>
              <div className="container">
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="package_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your Full Name"
                      name="fullName"
                      className="package_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Contact Number</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="contactNumber"
                      className="package_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Departure City</label>
                    <input
                      type="text"
                      placeholder="Enter City"
                      name="departureCity"
                      className="package_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Adults</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box style={{ display: "flex", fontSize: "14px" }}>
                      <Button
                        onClick={() =>
                          adult === 0 ? setAdult(0) : setAdult(adult - 1)
                        }
                        variant="outlined"
                      >
                        <RemoveIcon style={{ fontSize: "16px" }} />
                      </Button>
                      <input
                        style={{
                          color: "#006FFF",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          fontSize: "16px",
                          border: "none",
                          width: "55px",
                          textAlign: "center",
                        }}
                        value={adult}
                      />
                      <Button
                        onClick={() => setAdult(adult + 1)}
                        variant="outlined"
                      >
                        <AddIcon style={{ fontSize: "16px" }} />{" "}
                      </Button>
                    </Box>
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Child</label>

                    <div
                      style={{
                        display: "flex",
                        marginTop: "15px",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box style={{ display: "flex", fontSize: "14px" }}>
                        <Button
                          onClick={() =>
                            child === 0 ? setChild(0) : setChild(child - 1)
                          }
                          variant="outlined"
                        >
                          <RemoveIcon style={{ fontSize: "16px" }} />
                        </Button>
                        <input
                          style={{
                            color: "#006FFF",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            fontSize: "16px",
                            border: "none",
                            width: "55px",
                            textAlign: "center",
                          }}
                          value={child}
                        />
                        <Button
                          onClick={() => setChild(child + 1)}
                          variant="outlined"
                        >
                          <AddIcon style={{ fontSize: "16px" }} />{" "}
                        </Button>
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="form_package">
                    <label className="package_lable">Select Room</label>
                    {/* <select className="package_select">
                      <option>Select</option>
                      <option>Glamping tents x1</option>
                    </select> */}
                    <select
                      name="selectRoom"
                      className="form_input_select"
                      value={formData.selectRoom}
                      onChange={handleChange}
                      style={{ textAlign: "start", paddingLeft: "10px" }}
                    >
                      <option defaultChecked>Select Room Type</option>
                      <option value="Glamping tents x1">
                        Glamping tents x1
                      </option>
                      <option value="Glamping tents x1">
                        Glamping tents x1
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-xs-12 col-md-14">
                  <div className="form_package">
                    <label className="package_lable">Check-In Date</label>
                    <input
                      type="date"
                      name="checkIndate"
                      className="package_input"
                      placeholder="dd-mm-yy"
                      onChange={handleChange}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              p={3}
            >
              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
                >
                  Amounts
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#4e4c4ca1",
                    fontWeight: "bold",
                    marginX: "10px",
                  }}
                >
                  Starting date
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", color: "blaxk", fontWeight: "bold" }}
                >
                  ₹10,485
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "12px", color: "black", textAlign: "center" }}
            >
              Taxes and discounts are calculated at checkout.
            </Typography>
            <Box py={2}>
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                Next{" "}
              </Button>
            </Box>
            <Box display="flex" alignItems="center" textAlign="center">
              <Checkbox />
              <Typography
                sx={{
                  fontSize: "13px",
                }}
              >
                Send me updates for this booking on
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "12px", color: "#4e4c4ca1", textAlign: "center" }}
              px={8}
            >
              I accept the Terms of Use and Privacy Policy of Tripoto.
            </Typography>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default HolidatLeftPackage;

//css of this page
