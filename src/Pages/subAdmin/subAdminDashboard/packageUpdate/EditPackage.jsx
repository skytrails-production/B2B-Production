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
//import { updatePackageAction } from "../../../../../Redux/Auth/updatePackage/packageUpdateData";
import { updatePackageAction } from "../../../../Redux/Auth/updatePackage/packageUpdateData";
import { searchOnePackageAction } from "../../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import color from "../../../../color/color";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Editor from "react-simple-wysiwyg";
import Swal from "sweetalert2";
import { apiURL } from "../../../../Constants/constant";
import axios from "axios";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EditHolidayPackage = ({ onClose, packageData }) => {


  const location = useLocation();


  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  // const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [loader, setLoader] = useState(false);




  const navigate = useNavigate();
  // const onePackage = reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;


  const selectedPackage = JSON.parse(sessionStorage.getItem("selectedPackage"));

  // console.log(selectedPackage, "one package")


  const [packageTitle, setPackageTitle] = useState(selectedPackage?.pakage_title)
  const [packageCountry, setPackageCountry] = useState(selectedPackage?.country)
  const [days, setDays] = useState(selectedPackage?.days);
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [input, setInput] = React.useState("");


  const [chipData, setChipData] = useState([]);
  // console.log(chipData, "chip data")

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem('selectedPackage'));

    if (storedData) {
      setChipData(storedData?.destination);
    }
  }, []);


  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.addMore !== chipToDelete.addMore));
    // updateSessionStorage();
  };

  const handleAddChip = () => {
    if (input.trim() !== "") {
      setChipData((chips) => [...chips, { key: input.trim(), addMore: input }]);
      // updateSessionStorage();
      setInput("");
    }
  };

  const inputList = chipData.map((item) => ({ addMore: item.addMore }));





  // amount logic 


  const [amount, setAmount] = useState(selectedPackage?.pakage_amount?.amount);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

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


  useEffect(() => {
    const storedData = selectedPackage?.select_tags;


    if (storedData) {
      const initialCheckedItem = {};
      storedData.forEach((item) => {
        const key = Object.keys(item)[0];
        initialCheckedItem[key] = item[key] === true;
      });
      setTag(initialCheckedItem);
    }
  }, []);

  // console.log(tag, "tag data")

  const handleTagChange = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.checked,
    });
  };




  // const handleChange = (event) => {
  //   setCheckedItem({
  //     ...checkedItem,
  //     [event.target.name]: event.target.value,
  //   });
  // };


  // logic of inclusion radio buttons 


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

  useEffect(() => {
    const storedData = selectedPackage?.insclusions;

    if (storedData) {
      const initialCheckedItem = {};
      storedData.forEach((item) => {
        const key = Object.keys(item)[0];
        initialCheckedItem[key] = item[key] === 'true' || item[key] === true;;
      });
      setCheckedItem(initialCheckedItem);
    }
  }, []);

  const storedData = selectedPackage?.insclusions;
  console.log(selectedPackage?.insclusions, "storedData")
  console.log(checkedItem, "checked item")

  const handleChange = (event) => {
    const { name, checked } = event.target;

    setCheckedItem((prevCheckedItem) => ({
      ...prevCheckedItem,
      [name]: checked,
    }));

  };



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





  // logic for schedule


  const [scheduleType, setScheduleType] = useState({
    flexible: false,
    fixed_departure: false,
  });

  useEffect(() => {
    const storedData = selectedPackage?.schedule;
    if (storedData) {
      setScheduleType(storedData);
    }
  }, []);

  const handleRadioChange = (event) => {
    const selectedScheduleType = event.target.value;

    setScheduleType({
      flexible: selectedScheduleType === 'flexible',
      fixed_departure: selectedScheduleType === 'fixed_departure',
    });
  };

  // console.log(scheduleType, "schedule type")
  // useEffect(() => {
  //   if (selectedPackage && selectedPackage?.schedule) {
  //     setScheduleType(selectedPackage?.schedule?.fixed_departure === true ? 'fixed_departure' : 'flexible');
  //   }
  // }, []);

  // const handleRadioChange = (event) => {
  //   setScheduleType(event.target.value);
  // };



  // logic for hotel details 


  const [hotelDetails, setHotelDetails] = useState(selectedPackage?.hotel_details);

  const [inclusion, setInclusion] = useState(selectedPackage?.insclusion_note);

  const [exclusion, setExclusion] = useState(selectedPackage?.exclusion_note);
  const [termAndCondition, setTermAndCondition] = useState(selectedPackage?.term_Conditions);
  const [cancellation, setCancellation] = useState(selectedPackage?.cancellation_Policy)
  const [overView, setOverView] = useState(selectedPackage?.overview)


  const handleHotel = (e) => {
    setHotelDetails(e.target.value);
  };


  const [sub, setSub] = useState(false);




  // image logic here
  // const [packageImage, setPackageImage] = useState(selectedPackage?.pakage_img);

  // useEffect(() => {
  //   const storedImage = selectedPackage?.pakage_img;
  //   if (storedImage) {
  //     setPackageImage(storedImage);
  //   }
  // }, []);

  // const handleImageChange = (event) => {
  //   const newImage = event.target.files[0];
  //   setPackageImage(newImage);

  // };

  // useEffect(() => {
  //   console.log(packageImage, "package image")
  // }, [packageImage]);





  // Text editor Onchange
  const [html, setHtml] = useState("");
  // const [daysDetailsValues, setDaysDetails] = useState([]);

  const [daysDetailsValues, setDaysDetails] = useState([]);

  useEffect(() => {
    const storedData = selectedPackage.detailed_ltinerary;

    if (storedData) {
      setDaysDetails(storedData);
    }
  }, []);

  const handleDaysDetail = (index, e) => {
    const newValues = [...daysDetailsValues];
    newValues[index] = e.target.value;
    setDaysDetails(newValues);
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

        }
      });

    }
  }, [reducerState?.createPackage]);

  // Form handle code
  const handleEditPackage = async (event) => {
    event.preventDefault();
    setLoader(true);
    setSub(true);

    const file1 = document.getElementById("user_card_document").files[0];

    const formData = new FormData(event.target);
    if (
      exclusion === "" ||
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

      setLoader(false);
      return;
    } else {
      const payload = {
        packageId: selectedPackage?._id,
        pakage_title: formData.get("package_title"),
        destination: inputList,
        country: formData.get("country"),
        days: days,
        flexible: scheduleType,
        pakage_amount: {
          currency: "INR",
          amount: amount,
        },
        currency: "INR",

        insclusions: Object.entries(checkedItem)
          .filter(([key, value]) => value)
          .map(([key]) => ({ [key]: true })),
        hotel_details: hotelDetails,
        insclusion_note: inclusion,
        exclusion_note: exclusion,
        detailed_ltinerary: daysDetailsValues,
        overview: overView,
        select_tags: Object.entries(tag)
          .filter(([key, value]) => value)
          .map(([key]) => ({ [key]: true })),

        term_Conditions: termAndCondition,
        cancellation_Policy: cancellation,
      };
      // console.warn({ ...payload, images: file1 }, "paylod")
      // const formData1 = new FormData();
      // formData1.append("images", file1);
      // formData1.append("data", JSON.stringify(payload));

      try {
        const res = await axios({
          method: "put",
          url: `${apiURL.baseURL}/skyTrails/international/editPackage`,
          data: { ...payload, images: file1 },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle the response
        console.log(res.data);
        setLoader(false);
        onClose();
      } catch (error) {
        console.error('Error editing package', error);
      }
    }
  };

  function validation(event) {
    const formData = new FormData(event.target);
    const file1 = document.getElementById("user_card_document").files[0];
    if (
      formData.get("exclusion_note") === "" ||
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


  // console.log(selectedPackage?.pakage_title, "hii i am on edit package form ")

  return (
    <div className="container-xxl">
      {/* <div className="row">
        <div className="col-lg-12">
          <div className="headerBoxOuter">
            <div className="headerBox">
              <p>Create a Holiday Package</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleEditPackage}>
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
                      value={packageTitle || ""}
                      onChange={(e) => setPackageTitle(e.target.value)}
                    />
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
                  // defaultValue={packageImage}
                  // onChange={handleImageChange}
                  />

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
                    value={packageCountry || ""}
                    onChange={(e) => setPackageCountry(e.target.value)}
                  />
                  {/* {sub &&
                    document.getElementById("user_card_document").files
                      .length === 0 && <span id="error1">Enter Country</span>} */}
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
                          id="fixed"
                          value="fixed_departure"
                          checked={scheduleType.fixed_departure}
                          onChange={handleRadioChange}
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
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap="5px">
                      <Box className="radio">
                        <input
                          type="radio"
                          name="schedule"
                          id="flixible"
                          value="flexible"
                          width="32px"
                          checked={scheduleType.flexible}
                          onChange={handleRadioChange}
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
                        value={amount}
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
                            // checked={checkedItem.flexibility === "true"}
                            checked={checkedItem.flexibility}
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
                            checked={checkedItem.train}
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
                            checked={checkedItem.bus}
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
                            checked={checkedItem.cab}
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
                            checked={checkedItem.moterBike}
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
                            checked={checkedItem.hotel}
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
                            checked={checkedItem.homeStays}
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
                            checked={checkedItem.guestHouse}
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
                            checked={checkedItem.camp}
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
                            checked={checkedItem.cruise}
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
                            checked={checkedItem.sightSeeing}
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
                            checked={checkedItem.guide}
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
                            checked={checkedItem.meals}
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
                            checked={checkedItem.breakfast}
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
                            checked={checkedItem.drink}
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
                            checked={checkedItem.visa}
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
                            checked={checkedItem.travelInsurance}
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
                            checked={checkedItem.safeTravel}
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
                            checked={checkedItem.wildlife}
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
                            checked={checkedItem.heritage}
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
                            checked={checkedItem.adventure}
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
                            checked={checkedItem.beach}
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
                            checked={checkedItem.hillStation}
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
                            checked={checkedItem.nature}
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
                            checked={checkedItem.wellness}
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
                            checked={checkedItem.hiddenGem}
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
                            checked={checkedItem.tax}
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
                            checked={checkedItem.discount}
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
                            checked={checkedItem.waterActivities}
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
                            checked={checkedItem.optionalActivities}
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
                            checked={checkedItem.flexibleBooking}
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
                            checked={checkedItem.wifi}
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
                            >
                              <Editor
                                name="detailed_ltinerary"
                                value={daysDetailsValues[i]}
                                onChange={(event) => handleDaysDetail(i, event)}
                                containerProps={{
                                  style: { resize: "vertical", height: "300px", overflow: "scroll" },
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
                        checked={tag.domestic}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Domestic</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="international"
                        checked={tag.international}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">International</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="budget"
                        checked={tag.budget}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Budget</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="holiday"
                        checked={tag.holiday}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Holiday</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="luxury"
                        checked={tag.luxury}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Luxury</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="couples"
                        checked={tag.couples}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Couples</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="family"
                        checked={tag.family}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">family</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="honeymoon"
                        checked={tag.honeymoon}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Honeymoon</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="solo"
                        checked={tag.solo}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Solo</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="group"
                        checked={tag.group}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Group</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Girl Only"
                        checked={tag.girl_only}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Girl Only</span>
                    </label>
                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Boy Only"
                        checked={tag.boy_only}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Boy Only</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="anniversary"
                        checked={tag.anniversary}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Anniversary</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Business"
                        checked={tag.business}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Business</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Bagpacker"
                        checked={tag.bagpacker}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Bagpacker</span>
                    </label>
                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Nature"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Nature</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Wildlife"
                        checked={tag.wildlife}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Wildlife</span>
                    </label>
                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="historical"
                        checked={tag.historical}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">historical</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="domestic"
                        checked={tag.domestic}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Domestic</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="weekend gateway"
                        checked={tag.weekend_gateway}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Weekend Gateway</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="mid-Range"
                        checked={tag.mid_range}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Mid-Range</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Family With Children"
                        checked={tag.family_with_children}
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
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
                  </div>
                </div>
                <div className="buttonBoxPackage">

                  <button type="submit" class="packageSubmit">
                    {loader ? (
                      <div id="packageloadingdetails"></div>
                    ) : (
                      "Submit Request"
                    )
                    }
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

export default EditHolidayPackage;




