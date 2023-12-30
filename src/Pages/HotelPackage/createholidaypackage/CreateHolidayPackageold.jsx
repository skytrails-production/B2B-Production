import {
  Box,
  Button,
  FormControl,
  Grid,
  NativeSelect,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import color from "../../../color/color";
import Editor from "react-simple-wysiwyg";
import "./CreatePackage.css";
//   import "./selectclickbutton.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
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
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createPackageAction } from "../../../Redux/CreatePackage/actionCreatePackage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "react-bootstrap/Accordion";
import { GrAddCircle } from "react-icons/gr";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateHolidayPackage = () => {
  // const [inputList, setInputList] = useState([{ addMore: "" }]);
  // Redux- saga
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  // console.log("create Package", reducerState);
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [input, setInput] = React.useState("");
  const [chipData, setChipData] = React.useState([]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAddChip = () => {
    if (input.trim() !== "") {
      setChipData((chips) => [...chips, { key: Date.now(), addMore: input }]);

      setInput("");
    }
  };
  const inputList = chipData.map((item) => ({ addMore: item.addMore }));

  // console.log("inputList", inputList);
  //  console.log("chipdata", chipData);
  // function textEditorChange(e) {
  //   setHtml(e.target.value);
  // }

  // handle input change
  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // handle click event of the Add button
  // const handleAddClick = () => {
  //   setInputList([...inputList, { addMore: "" }]);
  // };

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

  // Text editor Onchange
  const [html, setHtml] = useState("");
  const [daysDetailsValues, setDaysDetails] = useState([]);

  const handleDaysDetail = (index, e) => {
    const newValues = [...daysDetailsValues];
    newValues[index] = e.target.value;
    setDaysDetails(newValues);
    // setHtml(newValues);
  };
  console.warn("days", html);
  console.warn("daysDetailsValues", daysDetailsValues);

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
    dispatch(createPackageAction(formData1));
    // event.target.reset();
    // setDaysDetails([]);
    // setCheckedItem({
    //   flexibility: false,
    //   train: false,
    //   bus: false,
    //   cab: false,
    //   motorbike: false,
    //   hotel: false,
    //   homeStays: false,
    //   guestHouse: false,
    //   camp: false,
    //   cruise: false,
    //   sightSeeing: false,
    //   guide: false,
    //   meals: false,
    //   breakfast: false,
    //   drink: false,
    //   visa: false,
    //   travelInsurance: false,
    //   safeTravel: false,
    //   wildlife: false,
    //   heritage: false,
    //   adventure: false,
    //   beach: false,
    //   hillStation: false,
    //   nature: false,
    //   wellness: false,
    //   hiddenGem: false,
    //   tax: false,
    //   discount: false,
    //   waterActivities: false,
    //   optionalActivities: false,
    //   flexibleBooking: false,
    //   wifi: false,
    // })
  };

  return (
    <div>
      <Grid>
        <form onSubmit={handleCreatePackage}>
          <Grid item xs={2} md={8}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "white",
            
               
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
                  Create Holiday Package
                </Typography>
              </Box>
             
              <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1, marginLeft:"10px"}}>
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

            <div style={{ flex: 1, marginLeft: "20px", marginRight:"20px" }}>
              <Box >
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

              <Box style={{ paddingTop: "10px",width:"48%",marginTop:"10px",marginLeft:"10px"}}>
                <Typography style={{ fontSize: "16px" }}>
                  What destinations does this package cover?
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                {/* <Typography style={{ fontSize: "10px" }}>
                  Please select from auto suggestions
                </Typography> */}
                <Typography style={{ fontSize: "14px", paddingTop: "3px" }}>
                  Destinations..
                </Typography>
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 1,
                    m: 0,
                  }}
                  component="ul"
                >
                  {chipData.map((data, index) => {
                    let icon;
                    return (
                      <ListItem key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.addMore}
                          onDelete={handleDelete(data)}
                          variant={index % 2 == 0 ? "outlined" : "filled"}
                        />
                      </ListItem>
                    );
                  })}
                </Paper>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "8px",
                    gap: "5px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add Destination"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddChip();
                      }
                    }}
                    style={{ padding: "3px" }}
                  />
                  <Button
                    onClick={handleAddChip}
                    variant="contained"
                    endIcon={<AddIcon />}
                    style={{ backgroundColor: color.bluedark }}
                  >
                    Add
                  </Button>
                </div>
              </Box>

              <Box my={5} style={{marginLeft:"20px"}}>
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

              <Box my={2} style={{marginLeft:"20px"}}>
                 <Typography style={{ fontSize: "16px" }}>
                  What is the schedule?<span style={{ color: "red" }}>*</span>
                </Typography>
                <Box display="flex" gap="15px">
                  <Box display="flex" alignItems="center" gap="5px">
                    <Box>
                      <input
                        type="radio"
                        name="schedule"
                        id="schedule"
                        value="fixed departure"
                        width="32px"
                      />
                    </Box>
                    <Box>
                      <Typography
                        style={{ fontSize: "14px", color: "#252525" }}
                      >
                        Flexible
                      </Typography>
                      <Typography
                        style={{ fontSize: "10px", color: "#666666" }}
                      >
                        can be booked anytime
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap="5px">
                    <Box>
                      <input
                        type="radio"
                        name="schedule"
                        id="schedule"
                        value="flexible departure"
                      />
                    </Box>
                    <Box>
                      <Typography
                        style={{ fontSize: "14px", color: "#252525" }}
                      >
                        Fixed Departure
                      </Typography>
                      <Typography
                        style={{ fontSize: "10px", color: "#666666" }}
                      >
                        Departure are scheduled
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography style={{ fontSize: "16px",marginLeft:"20px"}}>
                  Set up package pricing<span style={{ color: "red" }}>*</span>
                </Typography>
                <Box display="flex" style={{marginLeft:"20px"}}>
                  <Box ml={1}>
                    <FormControl>
                      <NativeSelect>
                        <option value={10} style={{ padding: "4px" }}>
                          INR
                        </option>
                        {/* <option value={10}>INR</option>
                        <option value={10}>INR</option>
                        <option value={10}>INR</option> */}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box display="flex" width="30" ml={1}>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      style={{ textDecoration: "none" }}
                      onChange={handleAmount}
                    />
                    <span
                      style={{
                        display: "block",
                        alignSelf: "end",
                        paddingLeft: "3px",
                      }}
                    >
                      Per Person
                    </span>
                  </Box>
                </Box>
              </Box>

              <Box style={{ fontSize: "16px", marginLeft: "29px" }}>
                <Typography style={{ fontSize: "16px", marginTop: "29px" }}>
                  Inclusions / Exclusions<span style={{ color: "red" }}>*</span>
                </Typography>
                <Typography style={{ fontSize: "10px", color: "#FF8900" }}>
                  Select ( ) for inclusion / ( ) for exclusions / leave
                  unselected for Not Applicable
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
                      <Box
                        display="flex"
                        textAlign="center"
                        alignItems="center"
                      >
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
                          checked={checkedItem.flexibility === "true"}
                          {...label}
                          icon={<CheckCircleOutlineIcon />}
                          checkedIcon={<CheckCircleIcon />}
                        />
                        <Checkbox
                          {...label}
                          value="false"
                          name="flexibility"
                          checked={checkedItem.flexibility === "false"}
                          onChange={handleChange}
                          icon={<HighlightOffIcon />}
                          checkedIcon={<CancelIcon />}
                        />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                          checked={checkedItem.train === "true"}
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
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
              <Box my={2} style={{marginLeft:"25px"}}>
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
                  ></textarea>
                </Typography>
              </Box>
              <Box my={2}>
                <Typography style={{ fontSize: "16px", color: "#252525",marginLeft:"20px"  }}>
                  Inclusion Note
                </Typography>
                <Typography style={{ fontSize: "14px", color: "#666666",marginLeft:"20px" }}>
                  {/* <input type="text" name="insclusion_note" placeholder="Add Details" style={{ textDecoration: 'none', width: '100%' }} /> */}
                  <textarea
                    className="style_Textarea"
                    name="insclusion_note"
                    id="insclusion_note"
                    placeholder="Add Inclusion Note ..."
                    cols="100"
                    rows="5"
                  ></textarea>
                </Typography>
              </Box>
              <Box my={2}>
                <Typography style={{ fontSize: "16px", color: "#252525",marginLeft:"20px" }}>
                  Exclusion Note
                  <p> What's explicitly excluded?</p>
                </Typography>
                <Typography style={{ fontSize: "14px", color: "#666666",marginLeft:"20px"  }}>
                  {/* <input type="text" name="exclusion_note" placeholder="Add Hotel Details" style={{ textDecoration: 'none', width: '100%' }} /> */}
                  <textarea
                    className="style_Textarea"
                    name="exclusion_note"
                    id="exclusion_note"
                    placeholder="Add Exclusion Note ..."
                    cols="100"
                    rows="5"
                  ></textarea>
                </Typography>
              </Box>
              <Box my={2} style={{marginLeft:"20px"}}>
                <Typography style={{ fontSize: "16px", color: "#252525" }}>
                  Detailed Itinerary<span style={{ color: "red" }}>*</span>
                </Typography>
                {Array.from({ length: days }, (_, i) => (
                  <>
                    <Accordion style={{ width: "700px" }}>
                      <Accordion.Item eventKey={i}>
                        <Accordion.Header>
                          <p>{`Days ${i + 1}`}</p>
                        </Accordion.Header>
                        <Accordion.Body>
                          {/* ⬇️⬇️⬇️⬇️⬇️ Text editor */}

                          <span
                            key={i}
                            type="text"
                            name="detailed_ltinerary"
                            placeholder={`Days ${i + 1}`}
                            // value={daysDetailsValues[i] || ""}
                            // onChange={(event) => handleDaysDetail(i, event)}
                          >
                            <Editor
                              name="detailed_ltinerary"
                              value={daysDetailsValues[i]}
                              onChange={(event) => handleDaysDetail(i, event)}
                            />
                          </span>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </>
                ))}
              </Box>
              <Box my={2} marginLeft="20px">
                <Typography style={{ fontSize: "16px", color: "#252525" }}>
                  Overview<span style={{ color: "red" }}>*</span>
                </Typography>

                <textarea
                  className="style_Textarea"
                  name="overview"
                  placeholder="Add Overview Detailed...."
                  cols="95"
                  rows="5"
                ></textarea>

              </Box>
              <Box my={2}  marginLeft="20" >
                <Typography style={{ fontSize: "16px", color: "#252525",marginLeft:"20px"}}>
                  Select Tags<span style={{ color: "red" }}>*</span>
                </Typography>
                <Typography style={{ fontSize: "14px", color: "#666666",marginLeft:"20px" }}>
                  
                </Typography>
              </Box>

              <div className="tag__Container">
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
                    <input
                      type="checkbox"
                      name="solo"
                      onChange={handleTagChange}
                    />
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
              <Box my={2} style={{marginLeft:"20px"}}>
                <Typography style={{ fontSize: "16px", color: "#252525" }}>
                  <p style={{marginLeft:"8px",fontSize:"20px"}}>
                    Term & Conditions<span style={{ color: "red" }}>*</span>{" "}
                  </p>
                  <textarea
                    className="style_Textarea"
                    name="term_Conditions"
                    placeholder="Enter Term And Condition"
                    cols="83"
                    rows="5"
                  ></textarea>
                </Typography>
                Write a descriptive summary of the T&C.....
                <Typography style={{ fontSize: "14px", color: "#666666",marginLeft:"5px"}}>
                  
                  <textarea
                    className="style_Textarea"
                    name="term_Conditions"
                    placeholder="Enter Term And Condition"
                    cols="95"
                    rows="5"
                  ></textarea>
                </Typography>
              </Box>
              <Box my={2} style={{marginLeft:"20px"}}>
                <Typography style={{ fontSize: "20px", color: "#252525" }}>
                  <p>
                    {" "}
                    Cancellation Policy<span style={{ color: "red" }}>
                      *
                    </span>{" "}
                  </p>

                  <textarea
                    className="style_Textarea"
                    name="cancellation_Policy"
                    placeholder="Cancellation Policy...."
                    cols="83"
                    rows="5"
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
                   
                    style={{
                      border: "1px solid",
                      borderColor:color.red1,
                      borderRadius: "10px",
                      color:color.red1,
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
                      border: "1px solid #707070",
                      borderRadius: "10px",
                     backgroundColor:color.bluedark,
                      color: "#fff",
                      marginBottom:"20px",
                      
                    }}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} md={2}></Grid>
        </form>
      </Grid>
    </div>
  );
};

export default CreateHolidayPackage;
