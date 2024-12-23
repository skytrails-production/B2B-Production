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
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
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
import { FormControl, Select, MenuItem } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  createPackageAction,
  createPackageActionClear,
} from "../../../Redux/CreatePackage/actionCreatePackage";

// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "react-bootstrap/Accordion";
import { GrAddCircle } from "react-icons/gr";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import loginOtp from "../../../../src/Images/login-01.jpg";
import { IoIosClose } from "react-icons/io";

import { Box, Button, Grid, NativeSelect, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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

import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { Textarea } from "@chakra-ui/react";
import { message } from "antd";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateHolidayPackageNew = () => {
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [currency, setCurrency] = useState("INR");

  const [input, setInput] = useState("");
  const [chipData, setChipData] = useState([]); // Array of objects [{ addMore: "Delhi" }, { addMore: "Himachal Pradesh" }]
  const [isDomesticDisabled, setIsDomesticDisabled] = useState(false);
  const [isInternationalDisabled, setIsInternationalDisabled] = useState(false);
  const [days, setDays] = useState(2);
  const [amount, setAmount] = useState();
  const [termAndCondition, setTermAndCondition] = useState("");

  const [termsArray, setTermsArray] = useState([]);

  const [loader, setLoader] = useState(false);
  const [cancellation, setCancellation] = useState("");
  const [country, setCountry] = useState(""); // For the input field
  const [countryArray, setCountryArray] = useState([]); // For the chip list

  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [inclusionNoteArray, setInclusionNoteArray] = useState([]);
  const [exclusionNoteArray, setExclusionNoteArray] = useState([]);
  const [inclusionNote, setInclusionNote] = useState("");
  const [exclusionNote, setExclusionNote] = useState("");

  const [overView, setOverView] = useState("");
  const [notification, setNotification] = useState(null); // New state for notifications
  const [packageHighLightArray, setPackageHighLightArray] = useState([]);
  // const [packageAmountData, setPackageAmountData] = useState([]); // Dynamic data

  const [packageAmountData, setPackageAmountData] = useState([
    { currency: "INR", packageCategory: "Standard", amount: "" },
  ]);
  const [highlightText, setHighlightText] = useState("");
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const submitRef = useRef(null);
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (submitRef.current && !submitRef.current.contains(event.target)) {
        setOpen(false);
        navigate("/");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [submitRef]);

  const handleAmount = (e) => {
    setAmount(Number(e.target.value));
  };

  // Function to add a chip
  const handleAddChip = () => {
    if (input.trim()) {
      setChipData((prev) => [...prev, { addMore: input.trim() }]);
      setInput("");
    }
  };

  // Function to delete a chip
  const handleDelete = (chipToDelete) => () => {
    setChipData((prev) =>
      prev.filter((chip) => chip.addMore !== chipToDelete.addMore)
    );
  };
  const handleClose = () => {
    setOpen(false);
    // setDisableButton(false);
  };

  const inputList = chipData.map((item) => ({ addMore: item.addMore }));

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
      backgroundColor: "#E73C34",
      color: "#fff",
      borderRadius: "25px",
      marginLeft: "5px",
      marginRight: "5px",
    },
  };

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState({
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
    setTag(() => ({
      ...tag,
      [e.target.name]: e.target.checked,
    }));
  };
  const [checkedItem, setCheckedItem] = useState({
    flexibility: false,
    flight: false,
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
  const [overview, setOverview] = useState("");
  const [packageType, setPackageType] = useState("");

  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAddDestination = (destination) => {
    setDestinations((prev) => [...prev, { addMore: destination }]);
  };
  const handleChange = (event) => {
    setCheckedItem({
      ...checkedItem,
      [event.target.name]: event.target.value,
    });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null); // Hide notification after 4 seconds
    }, 4000);
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   // Validation

  //   if (!title) {
  //     message.error("Title is required!");
  //     return;
  //   }

  //   if (!chipData || chipData.length === 0) {
  //     message.error("At least one destination is required!");
  //     return;
  //   }

  //   if (!countryArray || countryArray.length === 0) {
  //     message.error("At least one country is required!");
  //     return;
  //   }

  //   if (!packageType) {
  //     message.error("packageType is required!");
  //     return;
  //   }

  //   if (!days) {
  //     message.error("Number of days is required!");
  //     return;
  //   }
  //   if (!packageHighLightArray) {
  //     message.error("Package Highlights are required!");
  //     return;
  //   }
  //   if (!overView) {
  //     message.error("Overview is required!");
  //     return;
  //   }

  //   if (!termsArray || termsArray.length === 0) {
  //     message.error("Terms and conditions are required!");
  //     return;
  //   }

  //   if (!cancellationPolicies || cancellationPolicies.length === 0) {
  //     message.error("Cancellation policy is required!");
  //     return;
  //   }

  //   // Prepare payload
  //   const payload = {
  //     userId,
  //     title,
  //     destination: chipData, // Array of destinations
  //     country: countryArray, // Use the array of countries
  //     packageHighLight: packageHighLightArray,

  //     insclusion_note: inclusionNoteArray, // Add inclusion notes

  //     exclusion_note: exclusionNoteArray, // Add exclusion notes

  //     packageType,
  //     days,
  //     // packageAmount: [
  //     //   {
  //     //     currency,
  //     //     amount,
  //     //     packageType,
  //     //   },
  //     // ],

  //     packageAmount: packageAmountData.map((item) => ({
  //       currency: item.currency,
  //       amount: item.amount,
  //       packageCategory: item.packageCategory,
  //     })),

  //     specialTag: [
  //       { budget: tag.budget },
  //       { holiday: tag.holiday },
  //       { mid_range: tag.mid_range },
  //       { luxury: tag.luxury },
  //       { honeymoon: tag.honeymoon },
  //       { anniversary: tag.anniversary },
  //       { weekend_gateway: tag.weekend_gateway },
  //       { couples: tag.couples },
  //       { family: tag.family },
  //       { solo: tag.solo },
  //       { group: tag.group },
  //       { girl_only: tag.girl_only },
  //       { boy_only: tag.boy_only },
  //       { family_with_children: tag.family_with_children },
  //       { bagpacker: tag.bagpacker },
  //       { nature: tag.nature },
  //       { wildlife: tag.wildlife },
  //       { historical: tag.historical },
  //       { piligrimage: tag.piligrimage },
  //       { offbeat: tag.offbeat },
  //       { sightseeing: tag.sightseeing },
  //       { recreation: tag.recreation },
  //       { nature: tag.nature },
  //       { adventure: tag.adventure },
  //       { dining: tag.dining },
  //       { shopping: tag.shopping },
  //       { nightlife: tag.nightlife },
  //       { relaxation: tag.relaxation },
  //       { nature: tag.nature },
  //     ],
  //     inclusions: [
  //       { flexibility: checkedItem.flexibility },
  //       { flight: checkedItem.flight },
  //       { train: checkedItem.train },
  //       { bus: checkedItem.bus },
  //       { cab: checkedItem.cab },
  //       { moterBike: checkedItem.motorbike },
  //       { hotel: checkedItem.hotel },
  //       { homeStays: checkedItem.homeStays },
  //       { guestHouse: checkedItem.guestHouse },
  //       { cruise: checkedItem.cruise },
  //       { sightSeeing: checkedItem.sightSeeing },
  //       { guide: checkedItem.guide },
  //       { meals: checkedItem.meals },
  //       { breakfast: checkedItem.breakfast },
  //       { drink: checkedItem.drink },
  //       { visa: checkedItem.visa },
  //       { travelInsurance: checkedItem.travelInsurance },
  //       { wildlife: checkedItem.wildlife },
  //       { heritage: checkedItem.heritage },
  //       { adventure: checkedItem.adventure },
  //       { beach: checkedItem.beach },
  //       { hillStation: checkedItem.hillStation },
  //       { nature: checkedItem.nature },
  //       { wellness: checkedItem.wellness },
  //       { hiddenGem: checkedItem.hiddenGem },
  //       { tax: checkedItem.tax },
  //       { discount: checkedItem.discount },
  //       { waterActivities: checkedItem.waterActivities },
  //       { optionalActivities: checkedItem.optionalActivities },
  //       { flexibleBooking: checkedItem.flexibleBooking },
  //       { wifi: checkedItem.wifi },
  //     ],
  //     overview: overView,
  //     term_Conditions: termsArray,
  //     cancellation_Policy: cancellationPolicies,
  //   };

  //   // Prepare FormData
  //   const formData = new FormData();
  //   formData.append("data", JSON.stringify(payload));

  //   // Append cover image
  //   const coverImage = document.getElementById("coverImageInput")?.files[0];
  //   if (!coverImage) {
  //     message.error("Cover image is required!");
  //     return; // Stop the submission
  //   }
  //   formData.append("coverImage", coverImage);

  //   // Append multiple files (optional)
  //   const files = document.getElementById("filesInput")?.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("files", files[i]);
  //     }
  //   }

  //   try {
  //     setLoader(true);

  //     const response = await axios.post(
  //       `${apiURL.baseURL}/skyTrails/holidaypackage/create`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     localStorage.setItem("packageid", response.data.data._id);
  //     const dataIdget = localStorage.getItem("packageid");

  //     showNotification("Package Create successfully!", "success");
  //     navigate("/PackagesList");
  //   } catch (error) {
  //     console.error(
  //       "Error creating package:",
  //       error.response?.data || error.message
  //     );
  //     //alert("Failed to create the package. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to show notification
  const formData = new FormData();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validation

    if (!title) {
      message.error("Title is required!");
      return;
    }
    if (!overView) {
      message.error("Overview is required!");
      return;
    }
    if (!packageType) {
      message.error("Package Type is required!");
      return;
    }

    if (!packageHighLightArray || packageHighLightArray.length === 0) {
      message.error("Package Highlights are required!");
      return;
    }

    if (!countryArray || countryArray.length === 0) {
      message.error("At least one country is required!");
      return;
    }

    // Append cover image
    const coverImage = document.getElementById("coverImageInput")?.files[0];
    if (!coverImage) {
      message.error("Cover image is required!");
      return; // Stop the submission
    }
    formData.append("coverImage", coverImage);

    // Append multiple files (optional)
    const files = document.getElementById("filesInput")?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    if (!chipData || chipData.length === 0) {
      message.error("At least one destination is required!");
      return;
    }

    if (!days) {
      message.error("Number of days is required!");
      return;
    }
    if (!packageAmountData) {
      message.error("Package Amount is required!");
      return;
    }

    // Validate inclusions
    const inclusions = [
      "flexibility",
      "flight",
      "train",
      "bus",
      "cab",
      "moterBike",
      "hotel",
      "homeStays",
      "guestHouse",
      "cruise",
      "sightSeeing",
      "guide",
      "meals",
      "breakfast",
      "drink",
      "visa",
      "travelInsurance",
      "wildlife",
      "heritage",
      "adventure",
      "beach",
      "hillStation",
      "nature",
      "wellness",
      "hiddenGem",
      "tax",
      "discount",
      "waterActivities",
      "optionalActivities",
      "flexibleBooking",
      "wifi",
    ];

    // Check if at least one inclusion is selected
    const isValidInclusions = inclusions.some(
      (key) => checkedItem[key] !== undefined && checkedItem[key]
    );
    if (!isValidInclusions) {
      message.error("At least one inclusion must be selected!");
      return;
    }

    if (!inclusionNoteArray || inclusionNoteArray.length === 0) {
      message.error("Inclusion Notes are required!");
      return;
    }
    if (!exclusionNoteArray || exclusionNoteArray.length === 0) {
      message.error("Exclusion Notes are required!");
      return;
    }

    if (!termsArray || termsArray.length === 0) {
      message.error("Terms and conditions are required!");
      return;
    }

    if (!cancellationPolicies || cancellationPolicies.length === 0) {
      message.error("Cancellation policy is required!");
      return;
    }

    const isValidSpecialTag = Object.values(tag).some((value) => value); // Check if any tag is true
    if (!isValidSpecialTag) {
      message.error("At least one special tag is required!");
      return;
    }

    //  Validate packageAmount: Ensure that the array is not empty and contains valid data
    const isValidPackageAmount = packageAmountData.every(
      (item) => item.currency && item.amount && item.packageCategory // Ensure each item has currency, amount, and packageCategory
    );

    if (!isValidPackageAmount) {
      message.error("Please provide valid package amount details!");
      return;
    }
    // Prepare payload
    const payload = {
      userId,
      title,
      destination: chipData, // Array of destinations
      country: countryArray, // Use the array of countries
      packageHighLight: packageHighLightArray,
      insclusion_note: inclusionNoteArray, // Add inclusion notes
      exclusion_note: exclusionNoteArray, // Add exclusion notes
      packageType,
      days,
      packageAmount: packageAmountData.map((item) => ({
        currency: item.currency,
        amount: item.amount,
        packageCategory: item.packageCategory,
      })),
      specialTag: [
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
        { adventure: tag.adventure },
        { dining: tag.dining },
        { shopping: tag.shopping },
        { nightlife: tag.nightlife },
        { relaxation: tag.relaxation },
      ],
      inclusions: [
        { flexibility: checkedItem.flexibility },
        { flight: checkedItem.flight },
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
      overview: overView,
      term_Conditions: termsArray,
      cancellation_Policy: cancellationPolicies,
    };

    // Prepare FormData
   
    formData.append("data", JSON.stringify(payload));

    try {
      setLoader(true);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/holidaypackage/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("packageid", response.data.data._id);
      const dataIdget = localStorage.getItem("packageid");

      showNotification("Package Create successfully!", "success");
      navigate("/PackagesList");
    } catch (error) {
      console.error(
        "Error creating package:",
        error.response?.data || error.message
      );
      //alert("Failed to create the package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateAmount = (selectedCurrency, selectedPackageType) => {
    const selectedPackage = packageAmountData.find(
      (item) =>
        item.currency === selectedCurrency &&
        item.packageType === selectedPackageType
    );
    setAmount(selectedPackage ? selectedPackage.amount : "");
  };
  // Handle input changes for each form entry
  const handleInputChange = (index, field, value) => {
    const newPackageAmountData = [...packageAmountData];
    newPackageAmountData[index][field] = value;
    setPackageAmountData(newPackageAmountData);
  };

  // Add a new form entry
  const addFormField = () => {
    setPackageAmountData([
      ...packageAmountData,
      { currency: "INR", packageType: "Standard", amount: "" },
    ]);
  };
  // Remove a form entry by index
  const removeFormField = (index) => {
    const newPackageAmountData = packageAmountData.filter(
      (_, i) => i !== index
    );
    setPackageAmountData(newPackageAmountData);
  };

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-lg-12">
          <div className="headerBoxOuter">
            <div className="headerBox-new">
              <p>Create a Holiday Package New</p>
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-black transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{notification.message}</p>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleFormSubmit}>
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
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for="floatingInput">
                      Give a Name to this Package
                    </label>
                  </div>
                  {/* {sub &&
                    document.getElementById("package_title").value === "" && (
                      <span id="error1">Package Name is required</span>
                    )} */}
                </div>
                <Grid container>
                  <Grid item lg={12} md={12} sm={12}>
                    <Box my={2}>
                      <label class="form-label">Overview</label>
                      <div class="form-floating">
                        <input
                          class="form-control"
                          name="overview"
                          placeholder="overview"
                          id="exclusion_note"
                          value={overView}
                          containerProps={{ style: { resize: "vertical" } }}
                          onChange={(e) => setOverView(e.target.value)}
                        ></input>
                      </div>
                    </Box>
                  </Grid>
                </Grid>

                <div className="mb-3">
                  <label className="form-label">
                    Package Type <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="packageType"
                    id="packageType"
                    className="form-control input_file"
                    onChange={(e) => setPackageType(e.target.value)}
                    value={packageType}
                  >
                    <option value="" disabled>
                      Select Package Type
                    </option>
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                  </select>
                  {sub && setPackageType === "" && (
                    <span id="error1" style={{ color: "red" }}>
                      Please select a Package Type
                    </span>
                  )}
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Box my={2}>
                    <label className="form-label">
                      Package Highlights <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        border: "1px solid #ccc",
                        padding: "5px",
                        borderRadius: "4px",
                        minHeight: "50px",
                      }}
                    >
                      {packageHighLightArray.map((highlight, index) => (
                        <div
                          key={index}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: "#e0e0e0",
                            padding: "5px 10px",
                            margin: "5px",
                            borderRadius: "16px",
                          }}
                        >
                          <span>{highlight}</span>
                          <button
                            type="button"
                            style={{
                              marginLeft: "5px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setPackageHighLightArray((prev) =>
                                prev.filter(
                                  (_, highlightIndex) =>
                                    highlightIndex !== index
                                )
                              )
                            }
                          >
                            ❌
                          </button>
                        </div>
                      ))}

                      <input
                        type="text"
                        placeholder="Enter a highlight and press Enter"
                        style={{
                          border: "none",
                          outline: "none",
                          flex: "1",
                          minWidth: "150px",
                        }}
                        value={highlightText}
                        onChange={(e) => setHighlightText(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            highlightText.trim() !== ""
                          ) {
                            setPackageHighLightArray((prev) => [
                              ...prev,
                              highlightText.trim(),
                            ]);
                            setHighlightText("");
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>

                    {/* Validation */}
                    {sub && packageHighLightArray.length === 0 && (
                      <span id="error2" style={{ color: "red" }}>
                        Enter at least one Package Highlight
                      </span>
                    )}
                  </Box>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Enter Country <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      border: "1px solid #ccc",
                      padding: "5px",
                      borderRadius: "4px",
                      minHeight: "50px",
                    }}
                  >
                    {countryArray.map((country, index) => (
                      <div
                        key={index}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#e0e0e0",
                          padding: "5px 10px",
                          margin: "5px",
                          borderRadius: "16px",
                        }}
                      >
                        <span>{country}</span>
                        <button
                          type="button"
                          style={{
                            marginLeft: "5px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setCountryArray((prev) =>
                              prev.filter(
                                (_, countryIndex) => countryIndex !== index
                              )
                            )
                          }
                        >
                          ❌
                        </button>
                      </div>
                    ))}

                    <input
                      type="text"
                      placeholder="Enter a country and press Enter"
                      style={{
                        border: "none",
                        outline: "none",
                        flex: "1",
                        minWidth: "150px",
                      }}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && country.trim() !== "") {
                          setCountryArray((prev) => [...prev, country.trim()]);
                          setCountry("");
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  {/* Validation */}
                  {sub && countryArray.length === 0 && (
                    <span id="error1" style={{ color: "red" }}>
                      Enter at least one Country
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Cover Image <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="coverImage"
                    id="coverImageInput" // Match this with your JavaScript reference
                    className="form-control input_file"
                    placeholder="Select up to five images"
                  />
                  {sub &&
                    !document.getElementById("coverImageInput")?.files
                      ?.length && (
                      <span id="error1" style={{ color: "red" }}>
                        Please upload an image
                      </span>
                    )}
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
                      {chipData.map((data, index) => (
                        <ListItem key={index} width="565px" height="50px">
                          <Chip
                            label={data.addMore}
                            onDelete={handleDelete(data)}
                            variant={index % 2 === 0 ? "outlined" : "filled"}
                          />
                        </ListItem>
                      ))}
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
                            e.preventDefault();
                          }
                        }}
                      />
                      <label className="flootting" htmlFor="floatingInput">
                        Add a Destination
                      </label>
                    </div>

                    <Button
                      onClick={handleAddChip}
                      variant="contained"
                      endIcon={<AddIcon />}
                      style={{ backgroundColor: "#1a73e8" }}
                      className="insideButton-new"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* {sub && chipData.length === 0 && (
                  <span id="error1">Package Name is required</span>
                )} */}

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

                <div>
                  <label class="form-label"> Package Amount</label>

                  {/* Render dynamic form entries */}
                  {packageAmountData.map((entry, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <div
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "15px",
                          backgroundColor: "#f9f9f9",
                          marginBottom: "10px",
                        }}
                      >
                        {/* First Row */}
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {/* Currency Dropdown */}
                          <FormControl style={{ flex: "1" }}>
                            <Select
                              value={entry.currency}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "currency",
                                  e.target.value
                                )
                              }
                              style={{
                                fontSize: "14px",
                                width: "100%",
                              }}
                            >
                              <MenuItem value="INR">INR</MenuItem>
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="EUR">EUR</MenuItem>
                            </Select>
                          </FormControl>

                          {/* Package Type Dropdown */}
                          <FormControl style={{ flex: "1" }}>
                            <Select
                              value={entry.packageCategory}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "packageCategory",
                                  e.target.value
                                )
                              }
                              style={{
                                fontSize: "14px",

                                borderRadius: "4px",
                              }}
                            >
                              <MenuItem value="Standard">Standard</MenuItem>
                              <MenuItem value="Deluxe">Deluxe</MenuItem>
                              <MenuItem value="Luxury">Luxury</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                        {/* Second Row */}

                        <div style={{ display: "flex", gap: "10px" }}>
                          {/* Amount Input */}
                          <Box style={{ flex: "1" }}>
                            <input
                              type="text"
                              name="amount"
                              inputMode="numeric"
                              placeholder="Amount"
                              value={entry.amount}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                // Allow only numbers with optional commas in correct positions
                                const formattedValue = inputValue.replace(
                                  /[^0-9,]/g,
                                  ""
                                ); // Remove invalid characters
                                if (
                                  /^\d{1,3}(,\d{3})*$|^\d*$/.test(
                                    formattedValue
                                  )
                                ) {
                                  handleInputChange(
                                    index,
                                    "amount",
                                    formattedValue
                                  ); // Update only if valid
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault(); // Prevent Enter key default behavior
                                }
                              }}
                              style={{
                                fontSize: "14px",
                                padding: "8px",
                                width: "100%",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          </Box>
                        </div>

                        {/* Remove Button */}
                        {packageAmountData.length > 1 && (
                          <div
                            style={{ textAlign: "right", marginTop: "10px" }}
                          >
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => removeFormField(index)}
                              style={{ fontSize: "12px" }}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addFormField}
                      style={{ marginRight: "10px" }}
                    >
                      Add Package
                    </Button>
                  </div>
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
                          <FlightTakeoffIcon />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#252525",
                              fontWeight: "bold",
                            }}
                          >
                            Flight
                          </Typography>
                        </Box>
                        <Box display="flex" gap="10px">
                          <Checkbox
                            value="true"
                            name="flight"
                            onChange={handleChange}
                            checked={checkedItem.flight === "true"}
                            {...label}
                            icon={<CheckCircleOutlineIcon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                          <Checkbox
                            {...label}
                            value="false"
                            name="flight"
                            checked={checkedItem.flight === "false"}
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
                        name="budget"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Budget</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="holiday"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Holiday</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="luxury"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Luxury</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="couples"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Couples</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="family"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">family</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="honeymoon"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Honeymoon</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="solo"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Solo</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="group"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Group</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Girl Only"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Girl Only</span>
                    </label>
                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Boy Only"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Boy Only</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="anniversary"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Anniversary</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Business"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Business</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Bagpacker"
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
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Wildlife</span>
                    </label>
                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="historical"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">historical</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="weekend gateway"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Weekend Gateway</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="mid-Range"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Mid-Range</span>
                    </label>

                    <label class="label__container">
                      <input
                        type="checkbox"
                        name="Family With Children"
                        onChange={handleTagChange}
                      />
                      {/* <div class="checkmark"></div> */}
                      <span className="tag__title">Family With Children</span>
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Inclusion Notes <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      border: "1px solid #ccc",
                      padding: "5px",
                      borderRadius: "4px",
                      minHeight: "50px",
                    }}
                  >
                    {inclusionNoteArray.map((note, index) => (
                      <div
                        key={index}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#e0e0e0",
                          padding: "5px 10px",
                          margin: "5px",
                          borderRadius: "16px",
                        }}
                      >
                        <span>{note}</span>
                        <button
                          type="button"
                          style={{
                            marginLeft: "5px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setInclusionNoteArray((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="Enter an inclusion note and press Enter"
                      style={{
                        border: "none",
                        outline: "none",
                        flex: "1",
                        minWidth: "150px",
                      }}
                      value={inclusionNote}
                      onChange={(e) => setInclusionNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && inclusionNote.trim() !== "") {
                          setInclusionNoteArray((prev) => [
                            ...prev,
                            inclusionNote.trim(),
                          ]);
                          setInclusionNote("");
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {sub && inclusionNoteArray.length === 0 && (
                    <span id="error1" style={{ color: "red" }}>
                      Enter at least one Inclusion Note
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Exclusion Notes <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      border: "1px solid #ccc",
                      padding: "5px",
                      borderRadius: "4px",
                      minHeight: "50px",
                    }}
                  >
                    {exclusionNoteArray.map((note, index) => (
                      <div
                        key={index}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#e0e0e0",
                          padding: "5px 10px",
                          margin: "5px",
                          borderRadius: "16px",
                        }}
                      >
                        <span>{note}</span>
                        <button
                          type="button"
                          style={{
                            marginLeft: "5px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setExclusionNoteArray((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="Enter an exclusion note and press Enter"
                      style={{
                        border: "none",
                        outline: "none",
                        flex: "1",
                        minWidth: "150px",
                      }}
                      value={exclusionNote}
                      onChange={(e) => setExclusionNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && exclusionNote.trim() !== "") {
                          setExclusionNoteArray((prev) => [
                            ...prev,
                            exclusionNote.trim(),
                          ]);
                          setExclusionNote("");
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {sub && exclusionNoteArray.length === 0 && (
                    <span id="error1" style={{ color: "red" }}>
                      Enter at least one Exclusion Note
                    </span>
                  )}
                </div>

                {/* ------------------------------ */}

                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label className="form-label">
                          Terms & Conditions{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            border: "1px solid #ccc",
                            padding: "5px",
                            borderRadius: "4px",
                            minHeight: "50px",
                          }}
                        >
                          {termsArray.map((term, index) => (
                            <div
                              key={index}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                backgroundColor: "#e0e0e0",
                                padding: "5px 10px",
                                margin: "5px",
                                borderRadius: "16px",
                              }}
                            >
                              <span>{term}</span>
                              <button
                                type="button"
                                style={{
                                  marginLeft: "5px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  setTermsArray((prev) =>
                                    prev.filter(
                                      (_, termIndex) => termIndex !== index
                                    )
                                  )
                                }
                              >
                                ❌
                              </button>
                            </div>
                          ))}

                          <input
                            type="text"
                            placeholder="Enter a term and press Enter"
                            style={{
                              border: "none",
                              outline: "none",
                              flex: "1",
                              minWidth: "150px",
                            }}
                            value={termAndCondition}
                            onChange={(e) =>
                              setTermAndCondition(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                termAndCondition.trim() !== ""
                              ) {
                                setTermsArray((prev) => [
                                  ...prev,
                                  termAndCondition.trim(),
                                ]);
                                setTermAndCondition("");
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>

                        {/* Validation */}
                        {sub && termsArray.length === 0 && (
                          <span id="error1" style={{ color: "red" }}>
                            Enter at least one Term & Condition
                          </span>
                        )}
                      </Box>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Box my={2}>
                        <label className="form-label">
                          Cancellation Policy{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            border: "1px solid #ccc",
                            padding: "5px",
                            borderRadius: "4px",
                            minHeight: "50px",
                          }}
                        >
                          {cancellationPolicies.map((policy, index) => (
                            <div
                              key={index}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                backgroundColor: "#e0e0e0",
                                padding: "5px 10px",
                                margin: "5px",
                                borderRadius: "16px",
                              }}
                            >
                              <span>{policy}</span>
                              <button
                                type="button"
                                style={{
                                  marginLeft: "5px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  setCancellationPolicies((prev) =>
                                    prev.filter(
                                      (_, policyIndex) => policyIndex !== index
                                    )
                                  )
                                }
                              >
                                ❌
                              </button>
                            </div>
                          ))}

                          <input
                            type="text"
                            placeholder="Enter a policy and press Enter"
                            style={{
                              border: "none",
                              outline: "none",
                              flex: "1",
                              minWidth: "150px",
                            }}
                            value={cancellation}
                            onChange={(e) => setCancellation(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                cancellation.trim() !== ""
                              ) {
                                setCancellationPolicies((prev) => [
                                  ...prev,
                                  cancellation.trim(),
                                ]);
                                setCancellation("");
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>

                        {/* Validation */}
                        {sub && cancellationPolicies.length === 0 && (
                          <span id="error1" style={{ color: "red" }}>
                            Enter at least one Cancellation Policy
                          </span>
                        )}
                      </Box>
                    </div>
                  </div>
                </div>

                <div className="buttonBoxPackage-new">
                  {/* <button className="draft">Save As Draft</button> */}
                  <button type="submit" class="packageSubmit">
                    {loader ? (
                      <div id="packageloadingdetails"></div>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "999" }}
      >
        <div className="packageModelContainer">
          <div ref={submitRef} className="packageModelContainerInner">
            <div
              className="packageModelimageContainerClose"
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}
            >
              <IoIosClose size={"30px"} color="#fff" />
            </div>
            <div className="packageModelimageContainer">
              <img src={loginOtp} alt="loginGif" />
            </div>
            <div className="packageModelContainerInneritem">
              <div>
                <p>Please Compleate your profile </p>
              </div>
              <div>
                <button
                  className="packageModelBtnn"
                  onClick={() => navigate("/onbording")}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateHolidayPackageNew;
