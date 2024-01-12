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
// import TagFacesIcon from "@mui/icons-material/TagFaces";
import color from "../../../color/color";
import Editor from "react-simple-wysiwyg";
import "./CreatePackage.css";
//   import "./selectclickbutton.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// import DeleteIcon from "@mui/icons-material/Delete";
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
// import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createPackageAction,createPackageActionClear } from "../../../Redux/CreatePackage/actionCreatePackage";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "react-bootstrap/Accordion";
import { GrAddCircle } from "react-icons/gr";
import Swal from "sweetalert2";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateHolidayPackage = () => {
  // const [inputList, setInputList] = useState([{ addMore: "" }]);
  // Redux- saga
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [loader,setLoader]=useState(false);
  const navigate = useNavigate();
  console.log("createPackage", reducerState);
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
      marginLeft: "-6px",
      marginTop: "10px",
    },
    input: {
      color: "color.bluedark",
      padding: "7px",
      fontSize: "16px",
      border: "2px solid blue",
      borderRadius: "5px",
      width: "55px",
      textAlign: "center",
    },
    button: {
      backgroundColor: color.bluedark,
      color: "#fff",
      borderRadius: "25px",
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
  const [inclusion,setInclusion]=useState("");
  const [exclusion,setExclusion]=useState("");
  const [termAndCondition,setTermAndCondition]=useState("");
  const[cancellation,setCancellation]=useState("")
  const[overView,setOverView]=useState("")


  const handleHotel = (e) => {
    setHotelDetails(e.target.value);
  };

  const [days, setDays] = useState(1);
  const [sub, setSub] = useState(false);

  // Text editor Onchange
  const [html, setHtml] = useState("");
  const [daysDetailsValues, setDaysDetails] = useState([]);

  const handleDaysDetail = (index, e) => {
    const newValues = [...daysDetailsValues];
    newValues[index] = e.target.value;
    setDaysDetails(newValues);
    // setHtml(newValues);
  };
   useEffect(() => {
    if (reducerState?.createPackage?.showSuccessMessage == true) {
      setLoader(false)
       Swal.fire({
         icon: "success",
         title: "Done.",
         text: ` Your Package is created Sucessfully `,
         showCancelButton: false,
         confirmButtonText: "OK",
       }).then((result) => {
         if (result.isConfirmed) {
           navigate("/");
           dispatch(createPackageActionClear());
         }
       });

    }
   }, [reducerState?.createPackage]);

  // Form handle code
  const handleCreatePackage = (event) => {
    event.preventDefault();
     setLoader(true)
    setSub(true);
    const file1 = document.getElementById("user_card_document").files[0];
    console.warn(
      filterTrueProps(tag).length,
      filterTrueProps(tag).length,
      "filrter prooooddsndjndhnhjnnnnnnnnnnnnnnnnnnn"
    );

    const formData = new FormData(event.target);
    if (
      exclusion === "" ||
      file1.length === 0 ||
      chipData.length === 0 ||
      amount === 0 ||
      termAndCondition === "" ||
      cancellation === "" ||
      filterTrueProps(checkedItem) === 0 ||
      filterTrueProps(tag) === 0
    ) {
      setTimeout(() => {
        setSub(false);
      }, 7000);
      return;
    } else {
      const payload = {
        userId: userId,
        pakage_title: formData.get("package_title"),
        destination: inputList,
        country: formData.get("country"),
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
        insclusion_note: inclusion,
        exclusion_note: exclusion,
        detailed_ltinerary: daysDetailsValues,
        overview: overView,
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
        term_Conditions: termAndCondition,
        cancellation_Policy: cancellation,
      };
      // console.log("payload", payload);
      const formData1 = new FormData();
      formData1.append("file", file1);
      formData1.append("data", JSON.stringify(payload));
      // console.log(formData1);
      dispatch(createPackageAction(formData1));

     
    }
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
  function validation(event) {
    const formData = new FormData(event.target);
    const file1 = document.getElementById("user_card_document").files[0];
    if (
      formData.get("exclusion_note") === "" ||
      file1.length === 0 ||
      chipData.length === 0 ||
      amount === 0 ||
      formData.get("term_Conditions") === "" ||
      formData.get("cancellation_Policy") === ""
    ) {
      return false;
    }
  }
  const filterTrueProps = (obj) => {
    const filteredObj = {};
    for (const key in obj) {
      if (obj[key]) {
        filteredObj[key] = obj[key];
      }
    }
    return Object.keys(filteredObj).length;
  };
  
  return (
    <div className="container-xxl">
      {/* for heading text of packages */}

      <div className="row">
        <div className="col-lg-12">
          <div className="headerBoxOuter">
            <div className="headerBox">
              <p>Create a Holiday Package</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleCreatePackage}>
              <div className="createHolidayPackage">
                <div class="mb-3">
                  <label class="form-label">
                    Package Title <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="form-floating">
                    <input
                      type="text"
                      name="package_title"
                      id="package_title"
                      class="form-control"
                      placeholder="Enter Your Package Title"
                    />
                    <label for="floatingInput">
                      Give a Name to this Package
                    </label>
                  </div>
                  {sub &&
                    document.getElementById("package_title").value === "" && (
                      <span id="error1">Package Name is required</span>
                    )}
                </div>
                <div class="mb-3">
                  <label class="form-label">
                    Upload a picture of the package{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="user_card_document"
                    id="user_card_document"
                    class="form-control input_file"
                    placeholder="Enter Your Package Title"
                  />
                  {sub &&
                    document.getElementById("user_card_document").files
                      .length === 0 && <span id="error1">Upload Image</span>}
                </div>
                <div class="mb-3">
                  <label class="form-label">
                    Enter Country <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="user_card_document"
                    class="form-control input_file"
                    placeholder="Enter Country"
                  />
                  {sub &&
                    document.getElementById("user_card_document").files
                      .length === 0 && <span id="error1">Enter Country</span>}
                </div>

                <div className="mb-5">
                  <label className="form-label">
                    What destinations does this package cover?{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  {chipData.length > 0 && (
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 1,
                        m: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      component="ul"
                    >
                      {chipData.map((data, index) => {
                        let icon;
                        return (
                          <ListItem key={data.key} width="565px" height="50px">
                            <Chip
                              icon={icon}
                              label={data.addMore}
                              onDelete={handleDelete(data)}
                              variant={index % 2 === 0 ? "outlined" : "filled"}
                            />
                          </ListItem>
                        );
                      })}
                    </Paper>
                  )}

                  <div className="groupinpbut">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="inputwithButton form-control"
                        placeholder="Add Destination"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddChip();
                          }
                        }}
                      />
                      <label className="flootting" for="floatingInput">
                        Give a Name to this Package
                      </label>
                    </div>

                    <Button
                      onClick={handleAddChip}
                      variant="contained"
                      endIcon={<AddIcon />}
                      style={{ backgroundColor: color.bluedark }}
                      className="insideButton"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                {sub && chipData.length === 0 && (
                  <span id="error1">Package Name is required</span>
                )}

                <div class="mb-3 pt-4 mt-5">
                  <label class="form-label">How Many Days ?</label>
                  <Box style={styles1.container}>
                    <Button
                      onClick={() =>
                        days === 1 ? setDays(1) : setDays(days - 1)
                      }
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
                    <Button
                      onClick={() => setDays(days + 1)}
                      style={styles1.button}
                    >
                      <AddIcon style={{ fontSize: "16px" }} />
                    </Button>
                  </Box>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    What is the schedule?{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Box
                    display="flex"
                    gap="15px"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      borderRadius: "4px",
                      padding: "5px",
                      border: "1px solid #5C85A4",
                      backgroundColor: "#FFFBFB",
                      width: "400px",
                      height: "80px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap="5px">
                      <Box className="radio">
                        <input
                          type="radio"
                          name="schedule"
                          id="schedule"
                          value="fixed departure"
                          width="32px"
                          checked
                        />
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            fontSize: "20px",
                            color: "#000",

                            fontFamily: "Montserrat",
                          }}
                        >
                          Flexible
                        </Typography>
                        {/* <Typography
                        style={{ fontSize: "10px", color: "#666666" }}
                      >
                        can be booked anytime
                      </Typography> */}
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap="5px">
                      <Box className="radio">
                        <input
                          type="radio"
                          name="schedule"
                          id="schedule"
                          value="flexible departure"
                        />
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            fontSize: "20px",
                            color: "#000",

                            fontFamily: "Montserrat",
                          }}
                        >
                          Fixed Departure
                        </Typography>
                        {/* <Typography
                        style={{ fontSize: "10px", color: "#666666" }}
                      >
                        Departure are scheduled
                      </Typography> */}
                      </Box>
                    </Box>
                  </Box>
                </div>
                <div class="mb-3">
                  <label class="form-label">
                    Set up package price <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="pricing">
                    <FormControl style={{ border: "1px sold black" }}>
                      <NativeSelect
                        style={{
                          fontSize: "20px",
                          color: "#000",

                          fontFamily: "Montserrat",
                        }}
                      >
                        <option
                          value={10}
                          style={{
                            fontSize: "20px",
                            color: "#000",

                            fontFamily: "Montserrat",
                          }}
                        >
                          INR
                        </option>
                      </NativeSelect>
                    </FormControl>
                    <Box display="flex" ml={1}>
                      <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        onChange={handleAmount}
                        class="form-control"
                      />
                    </Box>
                    <label class="form-label">Per Person</label>
                  </div>
                  {sub && amount === 0 && <span id="error1">Amount</span>}
                </div>

                <Box style={{ fontSize: "16px" }}>
                  <Typography
                    style={{
                      color: "#5C85A4",

                      fontFamily: "Montserrat",
                      fontsize: "24px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    Select ( + ) for inclusion / ( - ) for exclusions / leave
                    unselected for Not Applicable
                  </Typography>

                  <label class="form-label">
                    Inclusions / Exclusions{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </Box>
                <Grid container>
                  <Grid item lg={5} md={5} sm={12} mt={3}>
                    <Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          textAlign="center"
                          gap="10px"
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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

                  {/* for space in between */}
                  <Grid item lg={2} md={2} mt={3}></Grid>
                  <Grid item lg={5} md={5} sm={12} mt={3}>
                    <Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                        <Box display="flex" gap="10px">
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
                </Grid>
                {/* ------------------------------ */}
                <Box my={2}>
                  <label class="form-label">Hotel Details</label>
                  <div class="form-floating">
                    <Editor
                      class="form-control"
                      onChange={(e) => setHotelDetails(e.target.value)}
                      value={hotelDetails}
                      name="hotel_details"
                      placeholder="Add Hotel Details ..."
                      id="hotel_details"
                      containerProps={{ style: { resize: "vertical" } }}
                    ></Editor>
                    {/* <label for="floatingTextarea2">Add Hotel Details ...</label> */}
                  </div>
                </Box>

                <Grid container>
                  <Grid item lg={12} md={12} sm={12}>
                    <Box my={2}>
                      <label class="form-label">Inclusion Note</label>
                      <div class="form-floating">
                        <Editor
                          class="form-control"
                          name="insclusion_note"
                          placeholder="Add Inclusion Note ..."
                          id="insclusion_note"
                          value={inclusion}
                          onChange={(e) => setInclusion(e.target.value)}
                          containerProps={{ style: { resize: "vertical" } }}
                        ></Editor>
                        {/* <label for="floatingTextarea2">
                          Add Inclusion Note
                        </label> */}
                      </div>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item lg={12} md={12} sm={12}>
                    <Box my={2}>
                      <label class="form-label">Exclusion Note</label>
                      <div class="form-floating">
                        <Editor
                          containerProps={{ style: { resize: "vertical" } }}
                          class="form-control"
                          name="exclusion_note"
                          placeholder="Add Exclusion Note ..."
                          id="exclusion_note"
                          value={exclusion}
                          onChange={(e) => setExclusion(e.target.value)}
                        ></Editor>
                        {/* <label for="floatingTextarea2">
                          Add Exclusion Note
                        </label> */}
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Box my={2}>
                  <label class="form-label">
                    {" "}
                    Detailed Itinerary<span style={{ color: "red" }}>*</span>
                  </label>
                  {Array.from({ length: days }, (_, i) => (
                    <>
                      <Accordion style={{ marginBottom: "10px" }}>
                        <Accordion.Item eventKey={i}>
                          <Accordion.Header
                            style={{
                              backgroundColor: "#FFFBFB",
                            }}
                          >
                            <p
                              style={{ fontSize: "20px", color: "#000000" }}
                            >{`Days ${i + 1}`}</p>
                          </Accordion.Header>
                          <Accordion.Body>
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
                                containerProps={{
                                  style: { resize: "vertical",height:"300px",overflow:"scroll" },
                                }}
                              />
                            </span>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      {sub && daysDetailsValues.length === 0 && (
                        <span id="error1">Detailed Itinerary</span>
                      )}
                    </>
                  ))}
                </Box>

                <Grid container>
                  <Grid item lg={12} md={12} sm={12}>
                    <Box my={2}>
                      <label class="form-label">Overview</label>
                      <div class="form-floating">
                        <Editor
                          class="form-control"
                          name="overview"
                          placeholder="overview"
                          id="exclusion_note"
                          value={overView}
                          containerProps={{ style: { resize: "vertical" } }}
                          onChange={(e) => setOverView(e.target.value)}
                        ></Editor>
                      </div>
                    </Box>
                  </Grid>
                </Grid>

                <div class="mb-3">
                  <label class="form-label">
                    Select Tags <span style={{ color: "red" }}>*</span>
                  </label>

                  <br />
                  <label class="form-label">
                    Select tags most relevant to your packages
                  </label>
                </div>

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

                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label class="form-label">
                          Term & Conditions{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div class="form-floating">
                          <Editor
                            class="form-control"
                            name="term_Conditions"
                            placeholder="Enter Term And Condition"
                            id="term_Conditions"
                            containerProps={{ style: { resize: "vertical" } }}
                            value={termAndCondition}
                            onChange={(e) =>
                              setTermAndCondition(e.target.value)
                            }
                          ></Editor>
                        </div>
                        {sub &&
                          document.getElementById("term_Conditions").value ===
                            "" && (
                            <span id="error1">EnterTerm & Conditions</span>
                          )}
                      </Box>
                    </div>
                    {/* <div className="col-lg-6 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label class="form-label">
                          {" "}
                          Write a descriptive summary of the T&C.....{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div class="form-floating">
                          <textarea
                            class="form-control"
                            name="term_Conditions"
                            placeholder="Enter Term And Condition"
                            id="descriptive_summary"
                            style={{ height: "100px" }}
                          ></textarea>
                          <label for="floatingTextarea2">
                            Enter Term & Conditions
                          </label>
                        </div>
                        {sub &&
                          document.getElementById("descriptive_summary")
                            .value === "" && (
                            <span id="error1">descriptive Summary</span>
                          )}
                      </Box>
                    </div> */}
                  </div>
                </div>

                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label class="form-label">
                          Cancellation Policy
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div class="form-floating">
                          <Editor
                            class="form-control"
                            name="cancellation_Policy"
                            placeholder="Cancellation Policy...."
                            id="cancellation_Policy"
                            containerProps={{ style: { resize: "vertical" } }}
                            value={cancellation}
                            onChange={(e) => setCancellation(e.target.value)}
                          ></Editor>
                        </div>
                        {sub &&
                          document.getElementById("cancellation_Policy")
                            .value === "" && (
                            <span id="error1">Term & Conditions</span>
                          )}
                      </Box>
                    </div>
                    {/* <div className="col-lg-6 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label class="form-label">
                          {" "}
                          Write a descriptive summary of the Cancellation
                          Policy...... <span style={{ color: "red" }}>*</span>
                        </label>
                        <div class="form-floating">
                          <textarea
                            class="form-control"
                            name="term_Conditions"
                            placeholder="Descriptive Cancellation Policy...."
                            id="descriptive_cancellation"
                            style={{ height: "100px" }}
                          ></textarea>
                          <label for="floatingTextarea2">
                            Descriptive Cancellation Policy....
                          </label>
                        </div>
                        {sub &&
                          document.getElementById("descriptive_cancellation")
                            .value === "" && (
                            <span id="error1">
                              Descriptive Cancellation Policy
                            </span>
                          )}
                      </Box>
                    </div> */}
                  </div>
                </div>

                {/* <Box
                  my={2}
                  marginLeft="20px"
                  display="flex"
                  justifyContent="start"
                >
                  <Box mx={1}>
                    <Button
                      style={{
                        textDecoration: "underline",
                        borderColor: color.red1,
                        color: "#000000",
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
                        borderRadius: "px",
                        backgroundColor: color.bluedark,
                        color: "#fff",
                        marginBottom: "20px",
                      }}
                    >
                      Submit Request
                    </Button>
                  </Box>
                </Box> */}

                <div className="buttonBoxPackage">
                  {/* <button className="draft">Save As Draft</button> */}
                  <button type="submit" class="packageSubmit">
                    {loader ? (
                      <div id="packageloadingdetails"></div>
                    ) : (
                      "Submit Request"
                    )}{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHolidayPackage;
