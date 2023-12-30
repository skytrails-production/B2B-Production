import {
  Box,
  Button,
  FormControl,
  Grid,
  NativeSelect,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./packageUpdate.css";
//   import "./selectclickbutton.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CommitIcon from "@mui/icons-material/Commit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CabinIcon from "@mui/icons-material/Cabin";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeckIcon from "@mui/icons-material/Deck";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import LandslideIcon from "@mui/icons-material/Landslide";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import PoolIcon from "@mui/icons-material/Pool";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ForestIcon from "@mui/icons-material/Forest";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "react-bootstrap/Accordion";
import { GrAddCircle } from "react-icons/gr";
import { updatePackageAction } from "../../../../../Redux/Auth/updatePackage/packageUpdateData";

import { searchOnePackageAction } from "../../../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import color from "../../../../../color/color";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EditHolidayPackage = () => {
  const location = useLocation();

  let className = "";

  if (location.pathname === "/admin/dashboard/EditHolidayPackage") {
    className = "main__container_width_75";
  } else if (location.pathname === "/EditHolidayPackage") {
    className = "main__container_width_100";
  }

  // Redux- saga
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();

  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  const inclusions =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data?.insclusions?.map(
      (ele) => ele
    );
  // console.log("train", inclusions);
  // console.log("===========================");
  // console.log("one pakcage", onePackage);

  const package_id = sessionStorage.getItem("package_id");
  // console.log("package_id 296", package_id);

  // Get value in form
  useEffect(() => {
    const payload = {
      id: package_id,
    };
    // console.log(payload);
    dispatch(searchOnePackageAction(payload));
  }, []);

  //  state form form
  const [package_title, setPackage_title] = useState(onePackage?.pakage_title);

  const handleUpdate = () => {};

  const [inputList, setInputList] = useState([{ addMore: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { addMore: "" }]);
  };

  // console.log("input List", inputList);

  const [tag, setTag] = useState({
    domestic: false,
    international: false,
    budget: false,
    holiday: false,
    mid_range: false,
    luxury: false,
    honeymoon: false,
    anniversary: false,
    weekend_gateway: false,
    couples: false,
    family: false,
    solo: false,
    group: false,
    girl_only: false,
    boy_only: false,
    family_with_children: false,
    business: false,
    bagpacker: false,
    nature: false,
    wildlife: false,
    historical: false,
    piligrimage: false,
    offbeat: false,
    sightseeing: false,
    recreation: false,
    adventure: false,
    dining: false,
    shopping: false,
    nightlife: false,
    relaxation: false,
  });

  const handleTagChange = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.checked,
    });
  };

  const [checkedItem, setCheckedItem] = useState({
    flexibility: false,
    train: false,
    bus: false,
    cab: false,
    motorbike: false,
    hotel: false,
    homeStays: false,
    guestHouse: false,
    camp: false,
    cruise: false,
    sightSeeing: false,
    guide: false,
    meals: false,
    breakfast: false,
    drink: false,
    visa: false,
    travelInsurance: false,
    safeTravel: false,
    wildlife: false,
    heritage: false,
    adventure: false,
    beach: false,
    hillStation: false,
    nature: false,
    wellness: false,
    hiddenGem: false,
    tax: false,
    discount: false,
    waterActivities: false,
    optionalActivities: false,
    flexibleBooking: false,
    wifi: false,
  });
  const handleChange = (event) => {
    setCheckedItem({
      ...checkedItem,
      [event.target.name]: event.target.value,
    });
  };

  const [amount, setAmount] = useState(0);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const [hotelDetails, setHotelDetails] = useState("");

  const handleHotel = (e) => {
    setHotelDetails(e.target.value);
  };

  const [days, setDays] = useState(1);

  const [daysDetailsValues, setDaysDetails] = useState([]);
  const handleDaysDetail = (index, e) => {
    const newValues = [...daysDetailsValues];
    newValues[index] = e.target.value;
    setDaysDetails(newValues);
  };
  // console.log("daysDetailsValues", daysDetailsValues);

  // Form handle code
  const handleCreatePackage = (event) => {
    event.preventDefault();
    const file1 = document.getElementById("user_card_document").files[0];

    const formData = new FormData(event.target);
    const payload = {
      pakage_title: formData.get("pakage_title"),
      destination: inputList,
      days: days,
      schedule: {
        flexible: true,
        fixed_departure: false,
      },
      pakage_amount: {
        currency: "INR",
        amount: amount,
      },
      insclusions: [
        { flexibility: checkedItem.flexibility },
        { train: checkedItem.train },
        { bus: checkedItem.bus },
        { cab: checkedItem.cab },
        { moterBike: checkedItem.motorbike },
        { hotel: checkedItem.hotel },
        { homeStays: checkedItem.homeStays },
        { guestHouse: checkedItem.guestHouse },
        { cruise: checkedItem.cruise },
        { sightSeeing: checkedItem.sightSeeing },
        { guide: checkedItem.guide },
        { meals: checkedItem.meals },
        { breakfast: checkedItem.breakfast },
        { drink: checkedItem.drink },
        { visa: checkedItem.visa },
        { travelInsurance: checkedItem.travelInsurance },
        { wildlife: checkedItem.wildlife },
        { heritage: checkedItem.heritage },
        { adventure: checkedItem.adventure },
        { beach: checkedItem.beach },
        { hillStation: checkedItem.hillStation },
        { nature: checkedItem.nature },
        { wellness: checkedItem.wellness },
        { hiddenGem: checkedItem.hiddenGem },
        { tax: checkedItem.tax },
        { discount: checkedItem.discount },
        { waterActivities: checkedItem.waterActivities },
        { optionalActivities: checkedItem.optionalActivities },
        { flexibleBooking: checkedItem.flexibleBooking },
        { wifi: checkedItem.wifi },
      ],
      hotel_details: hotelDetails,
      insclusion_note: formData.get("insclusion_note"),
      exclusion_note: formData.get("exclusion_note"),
      detailed_ltinerary: daysDetailsValues,
      overview: formData.get("overview"),
      select_tags: [
        { domestic: tag.domestic },
        { international: tag.international },
        { budget: tag.budget },
        { holiday: tag.holiday },
        { mid_range: tag.mid_range },
        { luxury: tag.luxury },
        { honeymoon: tag.honeymoon },
        { anniversary: tag.anniversary },
        { weekend_gateway: tag.weekend_gateway },
        { couples: tag.couples },
        { family: tag.family },
        { solo: tag.solo },
        { group: tag.group },
        { girl_only: tag.girl_only },
        { boy_only: tag.boy_only },
        { family_with_children: tag.family_with_children },
        { bagpacker: tag.bagpacker },
        { nature: tag.nature },
        { wildlife: tag.wildlife },
        { historical: tag.historical },
        { piligrimage: tag.piligrimage },
        { offbeat: tag.offbeat },
        { sightseeing: tag.sightseeing },
        { recreation: tag.recreation },
        { nature: tag.nature },
        { adventure: tag.adventure },
        { dining: tag.dining },
        { shopping: tag.shopping },
        { nightlife: tag.nightlife },
        { relaxation: tag.relaxation },
        { nature: tag.nature },
      ],
      term_Conditions: formData.get("term_Conditions"),
      cancellation_Policy: formData.get("cancellation_Policy"),
    };
    // console.log("payload", payload);
    const formData1 = new FormData();
    formData1.append("file", file1);
    formData1.append("data", JSON.stringify(payload));
    // console.log(formData1);
    dispatch(updatePackageAction(formData1));
    event.target.reset();
  };
  const styles = {
    container: {
      marginTop: "1rem",
      marginLeft:"-15px",
      padding: "20px",
      
    },
    label: {
      fontSize: "16px",
      marginBottom: "5px",
      display: "flex",
      alignItems: "center",
    },
    required: {
      color: "red",
      marginLeft: "5px",
    },
    suggestions: {
      fontSize: "10px",
      marginBottom: "10px",
    },
    destination: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    input: {
      borderRadius: "10px",
      padding: "5px",
      border: "1px solid #707070",
      marginRight: "10px",
    },
    addButton: {
      backgroundColor:color.bluedark,
      color: "white",
      borderRadius: "5px",
      padding: "5px 15px",
      border: "none",
      cursor: "pointer",
    },

    actionButtons: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
    },
    deleteButton: {
      backgroundColor: "red",
      color: "white",
      borderRadius: "5px",
      padding: "5px 15px",
      border: "none",
      cursor: "pointer",
    },
  };

  const styles1 = {
    container: {
      display: "flex",
      marginLeft:"-6px",
      marginTop:"10px"
    },
    input: {
      color:"color.bluedark",
      paddingLeft: "15px",
      paddingRight: "15px",
      fontSize: "16px",
      border:"color.bluedark",
      borderRadius: "5px",
      width: "55px",
      textAlign: "center",
    },
    button: {
      backgroundColor:color.bluedark,
      color: "#fff",
      borderRadius: "5px",
      marginLeft: "5px",
      marginRight: "5px",
    },
  };
  
  const styles3 = {
    container: {
      marginBottom: "16px",
    },
  };
  const [selectedSchedule, setSelectedSchedule] = React.useState(
    onePackage?.schedule?.flexible ? "flexible" : "fixed"
  );

  const handleScheduleChange = (event) => {
    setSelectedSchedule(event.target.value);
  };
  const styles4 = {
    container: {
      marginBottom: "16px",
    },
    select: {
      width: "80px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
     
    },
    input: {
      border: "1px solid #ccc",
      padding: "8px",
      borderRadius: "4px",
      width: "120px",
      marginRight: "10px",
      boxSizing: "border-box",
    },
  };
  return (
    <div>
      <form onSubmit={handleCreatePackage}>
        <Box
          className={`main__container ${className}`}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 6px gray",
            padding: "30px",
          }}
        >
          <Box>
            <Typography
              style={{
                fontSize: "18px",
                color: "#006FFF",
                textAlign: " center",
              }}
            >
              Update Holiday Package {package_id}
            </Typography>
          </Box>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <Typography style={{ fontSize: "16px" }}>
                {" "}
                Give the package a title <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                style={{
                  boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.29)",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderRadius: "10px",
                  padding: "5px",
                  background: "#EFEFEF", // Changed background color
                  width: "100%", // Adjusted width to fill available space
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  name="package_title"
                  placeholder="Enter Your Package Title"
                  value={package_title || ""}
                  onChange={(e) => setPackage_title(e.target.value)}
                  style={{
                    border: "none",
                    textDecoration: "none",
                    width: "100%",
                    padding: "5px", // Added padding for input
                    borderRadius: "5px", // Added border radius for input
                  }}
                />
              </Box>
            </div>

            <div style={{ flex: 1, marginLeft: "20px" }}>
              <Box>
                <Typography style={{ fontSize: "16px", color: "#252525" }}>
                  Upload a picture of the package{" "}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <Typography style={{ fontSize: "10px", color: "#666666" }}>
                  Please select from auto suggestions
                </Typography>
                <input
                  style={{
                    border: "1px solid grey",
                    padding: "5px",
                    width: "100%", // Adjusted width to fill available space
                    borderRadius: "10px",
                    color: "#006FFF",
                  }}
                  name="user_card_document"
                  id="user_card_document"
                  type="file"
                />
              </Box>
            </div>
          </div>

          <div style={styles.container}>
            <div style={styles.label}>
              <Typography style={{ fontSize: "16px" }}>
                What destinations does this package cover?
                <span style={styles.required}>*</span>
              </Typography>
            </div>
            <Typography style={styles.suggestions}>
              Please select from auto suggestions
            </Typography>

            {inputList.map((x, i) => (
              <div key={i} style={styles.destination}>
                {onePackage?.destination?.map((ele, id) => (
                  <input
                    key={id}
                    style={styles.input}
                    name="addMore"
                    placeholder="+ Add more destinations"
                    value={ele?.addMore}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                ))}

                <div style={styles.actionButtons}>
                  {inputList.length !== 1 && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleRemoveClick(i)}
                    >
                      Delete
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button style={styles.addButton} onClick={handleAddClick}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Box my={1}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              How Many Days?
            </Typography>
            <Box style={styles1.container}>
              <Button
                onClick={() => (days === 0 ? setDays(0) : setDays(days - 1))}
                style={styles1.button}
              >
                <RemoveIcon style={{ fontSize: "16px" }} />
              </Button>
              <input
                style={styles1.input}
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
              <Button onClick={() => setDays(days + 1)} style={styles1.button}>
                <AddIcon style={{ fontSize: "16px" }} />
              </Button>
            </Box>
          </Box>

          <Box my={2} style={styles3.container}>
      <Typography style={{ fontSize: "16px" }}>
        What is the schedule?<span style={{ color: "red" }}>*</span>
      </Typography>
      <RadioGroup
        aria-label="schedule"
        name="schedule"
        value={selectedSchedule}
        onChange={handleScheduleChange}
      >
        <FormControlLabel
          value="fixed"
          control={<Radio color="primary" />}
          label={
            <Box display="flex" alignItems="center" >
              <Typography style={{ fontSize: "14px", color: "#252525", marginRight: "8px" }}>
                Fixed Departure
              </Typography>
              <Typography style={{ fontSize: "10px", color: "#666666" }}>
                Departures are scheduled
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="flexible"
          control={<Radio color="primary" />}
          label={
            <Box display="flex" alignItems="center">
              <Typography style={{ fontSize: "14px", color: "#252525", marginRight: "8px" }}>
                Flexible Departure
              </Typography>
              <Typography style={{ fontSize: "10px", color: "#666666" }}>
                Departures are flexible
              </Typography>
            </Box>
          }
        />
      </RadioGroup>
    </Box>

    <Box my={2} style={styles4.container}>
      <Typography style={{ fontSize: "16px",marginBottom:"10px"}}>
        Set up package pricing<span style={{ color: "red" }}>*</span>
      </Typography>
      <Box display="flex" alignItems="center">
        <FormControl style={{marginRight:"10px"}}>
          <NativeSelect style={styles4.select}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            {/* Add more currency options if needed */}
          </NativeSelect>
        </FormControl>
        <div style={styles4.inputContainer}>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={onePackage?.pakage_amount?.amount}
            onChange={handleAmount}
            style={styles4.input}
          />
          <span>Per Person</span>
        </div>
      </Box>
    </Box>

          <Box>
            <Typography style={{ fontSize: "20px", marginTop: "29px" }}>
              Inclusions / Exclusions<span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography style={{ fontSize: "15px", color:color.red1 }}>
              Select ( ) for inclusion / ( ) for exclusions / leave unselected
              for Not Applicable
            </Typography>
          </Box>
          <Grid container spacing={10}>
            <Grid item lg={1}></Grid>
            <Grid item lg={5} mt={3}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                 
                >
                  <Box display="flex" textAlign="center" alignItems="center">
                    <CommitIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Flexibility
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="flexibility"
                      onChange={handleChange}
                      checked={
                        inclusions?.[0].flexibility == true ? true : false
                      }
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="flexibility"
                      defaultChecked={inclusions?.[0].flexibility == true}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <TramIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Train
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="train"
                      onChange={handleChange}
                      //   defaultChecked={inclusions?.[0].flexibility == true ? true : false}
                      checked={
                        inclusions?.[0].flexibility == true ? true : false
                      }
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="train"
                      checked={checkedItem.train === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <DirectionsBusIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Bus
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="bus"
                      onChange={handleChange}
                      checked={checkedItem.bus === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      value="false"
                      name="bus"
                      onChange={handleChange}
                      checked={checkedItem.bus === "false"}
                      {...label}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <DirectionsCarIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Cab
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="cab"
                      onChange={handleChange}
                      checked={checkedItem.cab === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="cab"
                      checked={checkedItem.cab === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <TwoWheelerIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Moterbike
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="moterBike"
                      onChange={handleChange}
                      checked={checkedItem.moterBike === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="moterBike"
                      checked={checkedItem.moterBike === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <ApartmentIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Hotel
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="hotel"
                      onChange={handleChange}
                      checked={checkedItem.hotel === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="hotel"
                      checked={checkedItem.hotel === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <HolidayVillageIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Homestays
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="homeStays"
                      onChange={handleChange}
                      checked={checkedItem.homeStays === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="homeStays"
                      checked={checkedItem.homeStays === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <LocationCityIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Guesthouse
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="guestHouse"
                      onChange={handleChange}
                      checked={checkedItem.guestHouse === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="guestHouse"
                      checked={checkedItem.guestHouse === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <CabinIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Camp
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="camp"
                      onChange={handleChange}
                      checked={checkedItem.camp === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="camp"
                      checked={checkedItem.camp === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <BlurOnIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Cruise
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="cruise"
                      onChange={handleChange}
                      checked={checkedItem.cruise === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="cruise"
                      checked={checkedItem.cruise === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <DeckIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Sightseeing
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="sightSeeing"
                      onChange={handleChange}
                      checked={checkedItem.sightSeeing === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="sightSeeing"
                      checked={checkedItem.sightSeeing === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <EngineeringIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Guide
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="guide"
                      onChange={handleChange}
                      checked={checkedItem.guide === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="guide"
                      checked={checkedItem.guide === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <FastfoodIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Meals
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      {...label}
                      value="true"
                      name="meals"
                      onChange={handleChange}
                      checked={checkedItem.meals === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="meals"
                      checked={checkedItem.meals === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <DinnerDiningIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Daily Breakfast
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="breakfast"
                      onChange={handleChange}
                      checked={checkedItem.breakfast === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="breakfast"
                      checked={checkedItem.breakfast === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <LiquorIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Complimentary Drink
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="drink"
                      onChange={handleChange}
                      checked={checkedItem.drink === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="drink"
                      checked={checkedItem.drink === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <ArticleIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Visa
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="visa"
                      onChange={handleChange}
                      checked={checkedItem.visa === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="visa"
                      checked={checkedItem.visa === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5} mt={3}>
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <AccountBalanceIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Travel Insurance
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="travelInsurance"
                      onChange={handleChange}
                      checked={checkedItem.travelInsurance === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="travelInsurance"
                      checked={checkedItem.travelInsurance === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <ParaglidingIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Safe to Travel
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="safeTravel"
                      onChange={handleChange}
                      checked={checkedItem.safeTravel === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="safeTravel"
                      checked={checkedItem.safeTravel === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <NaturePeopleIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Wildlife
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="wildlife"
                      onChange={handleChange}
                      checked={checkedItem.wildlife === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="wildlife"
                      checked={checkedItem.wildlife === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <LandslideIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Heritage
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="heritage"
                      onChange={handleChange}
                      checked={checkedItem.heritage === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="heritage"
                      checked={checkedItem.heritage === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <KitesurfingIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Adventure
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="adventure"
                      onChange={handleChange}
                      checked={checkedItem.adventure === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="adventure"
                      checked={checkedItem.adventure === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <PoolIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Beach
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="beach"
                      onChange={handleChange}
                      checked={checkedItem.beach === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="beach"
                      checked={checkedItem.beach === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <DownhillSkiingIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Hill Station
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="hillStation"
                      onChange={handleChange}
                      checked={checkedItem.hillStation === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="hillStation"
                      checked={checkedItem.hillStation === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <ForestIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Nature
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="nature"
                      onChange={handleChange}
                      checked={checkedItem.nature === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="nature"
                      checked={checkedItem.nature === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <SelfImprovementIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Wellness
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="wellness"
                      onChange={handleChange}
                      checked={checkedItem.wellness === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="wellness"
                      checked={checkedItem.wellness === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <FitnessCenterIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Hidden Gem
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="hiddenGem"
                      onChange={handleChange}
                      checked={checkedItem.hiddenGem === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="hiddenGem"
                      checked={checkedItem.hiddenGem === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <FolderDeleteIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Price Inclusive Tax
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="tax"
                      onChange={handleChange}
                      checked={checkedItem.tax === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="tax"
                      checked={checkedItem.tax === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <LocalOfferIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      50% Off
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="discount"
                      onChange={handleChange}
                      checked={checkedItem.discount === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="discount"
                      checked={checkedItem.discount === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <KayakingIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Water Activities
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="waterActivities"
                      onChange={handleChange}
                      checked={checkedItem.waterActivities === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="waterActivities"
                      checked={checkedItem.waterActivities === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <SportsKabaddiIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Optional Activities
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="optionalActivities"
                      onChange={handleChange}
                      checked={checkedItem.optionalActivities === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="optionalActivities"
                      checked={checkedItem.optionalActivities === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <BookmarkAddIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Flexible Booking
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="flexibleBooking"
                      onChange={handleChange}
                      checked={checkedItem.flexibleBooking === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="flexibleBooking"
                      checked={checkedItem.flexibleBooking === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <WifiPasswordIcon />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      WIFI
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Checkbox
                      value="true"
                      name="wifi"
                      onChange={handleChange}
                      checked={checkedItem.wifi === "true"}
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <Checkbox
                      {...label}
                      value="false"
                      name="wifi"
                      checked={checkedItem.wifi === "false"}
                      onChange={handleChange}
                      icon={<HighlightOffIcon />}
                      checkedIcon={<CancelIcon />}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={1}></Grid>
          </Grid>
          {/* ------------------------------ */}
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Hotel Details<span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
              {/* + Add Hotel Details */}
              {/* <input type="text" name="hotel_details" placeholder="Add Hotel Details" style={{ textDecoration: 'none', width: '100%' }} onChange={handleHotel} /> */}
              <textarea
                className="style_Textarea"
                name="hotel_details"
                id="hotel_details"
                placeholder="Add Hotel Details ..."
                cols="100"
                rows="5"
                onChange={handleHotel}
                value={onePackage?.hotel_details}
              ></textarea>
            </Typography>
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Inclusion Note
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
              {/* <input type="text" name="insclusion_note" placeholder="Add Details" style={{ textDecoration: 'none', width: '100%' }} /> */}
              <textarea
                className="style_Textarea"
                name="insclusion_note"
                id="insclusion_note"
                placeholder="Add Inclusion Note ..."
                cols="100"
                rows="5"
                value={onePackage?.insclusion_note}
              ></textarea>
            </Typography>
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Exclusion Note
              <p> What's explicitly excluded?</p>
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
              {/* <input type="text" name="exclusion_note" placeholder="Add Hotel Details" style={{ textDecoration: 'none', width: '100%' }} /> */}
              <textarea
                className="style_Textarea"
                name="exclusion_note"
                id="exclusion_note"
                placeholder="Add Exclusion Note ..."
                cols="100"
                rows="5"
                value={onePackage?.exclusion_note}
              ></textarea>
            </Typography>
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Detailed Itinerary<span style={{ color: "red" }}>*</span>
            </Typography>
            {Array.from({ length: onePackage?.days }, (_, i) => (
              <>
                <Accordion style={{ width: "700px" }}>
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>
                      <p>{`Days ${i + 1}`}</p>
                    </Accordion.Header>
                    <Accordion.Body>
                      {/* {
            onePackage?.detailed_ltinerary?.map((ele,index)=>{
              // console.log("data 1786",ele)

              return(
               
              )
            })
          } */}

                      <>
                        <textarea
                          className="style_Textarea day_Textarea"
                          type="text"
                          name="detailed_ltinerary"
                          placeholder={`${onePackage?.detailed_ltinerary[i]} ${
                            i + 1
                          }`}
                          value={`${onePackage?.detailed_ltinerary[i]} ${
                            i + 1
                          }`}
                          // placeholder={`Days ${i + 1}`}
                          onChange={(event) => handleDaysDetail(i, event)}
                        ></textarea>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            ))}
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Overview<span style={{ color: "red" }}>*</span>
            </Typography>

            <textarea
              className="style_Textarea"
              name="overview"
              placeholder="Add Overview Detailed...."
              cols="95"
              rows="5"
              value={onePackage?.overview}
            ></textarea>
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              Select Tags<span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
              Select tags most relevant to your packages
            </Typography>
          </Box>

          <div className="tag__Container" >
            <div className="relevant__tag">
              <label class="label__container">
                <input
                  type="checkbox"
                  name="domestic"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Domestic</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="international"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">International</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="budget"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Budget</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="holiday"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Holiday</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="luxury"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Luxury</span>
              </label>
            </div>

            <div className="relevant__tag">
              <label class="label__container">
                <input
                  type="checkbox"
                  name="couples"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Couples</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="family"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">family</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="honeymoon"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Honeymoon</span>
              </label>

              <label class="label__container">
                <input type="checkbox" name="solo" onChange={handleTagChange} />
                <div class="checkmark"></div>
                <span className="tag__title">Solo</span>
              </label>
            </div>

            <div className="relevant__tag">
              <label class="label__container">
                <input
                  type="checkbox"
                  name="group"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Group</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="Girl Only"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Girl Only</span>
              </label>
              <label class="label__container">
                <input
                  type="checkbox"
                  name="Boy Only"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Boy Only</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="anniversary"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Anniversary</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="Business"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Business</span>
              </label>
            </div>

            <div className="relevant__tag">
              <label class="label__container">
                <input
                  type="checkbox"
                  name="Bagpacker"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Bagpacker</span>
              </label>
              <label class="label__container">
                <input
                  type="checkbox"
                  name="Nature"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Nature</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="Wildlife"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Wildlife</span>
              </label>
              <label class="label__container">
                <input
                  type="checkbox"
                  name="historical"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">historical</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="domestic"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Domestic</span>
              </label>
            </div>

            <div className="relevant__tag">
              <label class="label__container">
                <input
                  type="checkbox"
                  name="weekend gateway"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Weekend Gateway</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="mid-Range"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Mid-Range</span>
              </label>

              <label class="label__container">
                <input
                  type="checkbox"
                  name="Family With Children"
                  onChange={handleTagChange}
                />
                <div class="checkmark"></div>
                <span className="tag__title">Family With Children</span>
              </label>
            </div>
          </div>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              <p>
                Term & Conditions<span style={{ color: "red" }}>*</span>{" "}
              </p>
              <textarea
                className="style_Textarea"
                name="term_Conditions"
                placeholder="Enter Term And Condition"
                cols="83"
                rows="5"
                value={onePackage?.term_Conditions}
              ></textarea>
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
            
              <p>
              Write a descriptive summary of the T&C.....<span style={{ color: "red" }}>*</span>{" "}
              </p>
              <textarea
                className="style_Textarea"
                name="term_Conditions"
                placeholder="Enter Term And Condition"
                cols="95"
                rows="5"
              ></textarea>
            </Typography>
          </Box>
          <Box my={2}>
            <Typography style={{ fontSize: "16px", color: "#252525" }}>
              <p>
                {" "}
                Cancellation Policy<span style={{ color: "red" }}>*</span>{" "}
              </p>

              <textarea
                className="style_Textarea"
                name="cancellation_Policy"
                placeholder="Cancellation Policy...."
                cols="83"
                rows="5"
                value={onePackage?.cancellation_Policy}
              ></textarea>
            </Typography>
            <Typography style={{ fontSize: "14px", color: "#666666" }}>
              <p>
                Write a descriptive summary of the Cancellation Policy......
              </p>
              <textarea
                className="style_Textarea"
                name="cancellation_Policy"
                placeholder="Descriptive Cancellation Policy...."
                cols="95"
                rows="5"
              ></textarea>
            </Typography>
          </Box>
          <Box my={2} display="flex" justifyContent="center">
            <Box mx={1}>
              <Button
                sx={{border:color.red1}}
                style={{
                  border:"none",
                  borderRadius: "10px",
                  backgroundColor:color.bluedark,
                  color: "white"
                  
                }}
              >
                Save As Draft
              </Button>
            </Box>
            <Box mx={1}>
              <Button
                variant="primary"
                type="submit"
                style={{
                  border:"none",
                  borderRadius: "10px",
                  backgroundColor:color.bluedark,
                  color: "white"
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EditHolidayPackage;
