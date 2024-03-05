import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import profilePicUrl from "../../../Images/Admin.svg";
// import profilePicUrl from '../../../Images/Admin.svg'
import WebIcon from "@mui/icons-material/Web";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import Tables from "./Table/Table";
import Usertables from "./Table/UserTable";
import SubAdminTable from "./Table/subAdmin";
import MarkUpAmount from "./Table/MarkUpAmount";
import PackageDetails from "./Table/packageUpdate/PackageDetails";
import EditHolidayPackage from "./Table/packageUpdate/EditPackage";
import { useLocation, useNavigate } from "react-router-dom";
import ForexData from "./Table/Forex/ForexData";
import VisaData from "./Table/VisaData/VisaData";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { adminSignOut } from "../../../Redux/Auth/AdminSignOut/actionAdminSignOut";
import STLOGO from "../../../Images/ST-Main-Logo.png";
import RiseLoader from "react-spinners/RiseLoader";
import HotelBookings from "./Table/HotelBookings/HotelBookings";
import FlightBookings from "./Table/FlightBookings/Flightbookings";
import BusBookings from "./Table/BusBookings/BusBookings";
import FixedDeparture from "./Table/FixedDeparture/FixedDeparture";
import FixedDepartureControl from "./Table/FixedDepartureControl/FixedDepartureControl";
import AgentHotelBookings from "./Table/AgentHotelBookings/AgentHotelBookings";
import AgentFlightBookings from "./Table/AgentFlightBookings/AgentFlightBookings";
import AgentBusBookings from "./Table/AgentBusBookings/AgentBusBookings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AgentRequest from "./Table/AgentRequest/AgentRequest";
import AgentHotelChangeRequest from "./Table/ChangeRequest/AgentRequest/AgentChangeHotel";
import AgentBusChangeRequest from "./Table/ChangeRequest/AgentRequest/AgentChangeBusRequest";
import AgentFlightChangeRequest from "./Table/ChangeRequest/AgentRequest/AgentChangeFlight";
import UserHotelChangeRequest from "./Table/ChangeRequest/UserRequest/UserChangeHotelRequest";
import UserBusChangeRequest from "./Table/ChangeRequest/UserRequest/UserChangeBusRequest";
import UserFlightChangeRequest from "./Table/ChangeRequest/UserRequest/UserChangeFlightRequest";
import {
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  InputBase,
  Badge,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormControl, InputLabel, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Groups3Icon from "@mui/icons-material/Groups3";
import AdminDashboard from "./AdminDashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OfferList from "./Table/OfferList/OfferList";
import AgentCancelHotel from "./Table/CancelTicketRequest/AgentCancelHotel";
import AgentCancelFlight from "./Table/CancelTicketRequest/AgentCancelFlight";
import AgentCancelBus from "./Table/CancelTicketRequest/AgentCancelBus";
import UserCancelHotel from "./Table/CancelTicketRequest/UserCancelHotel";
import UserCancelBus from "./Table/CancelTicketRequest/UserCancelBus";
import AllFlightCancelTickets from "./Table/CancelTicketRequest/UserCancelFlight";
// import AddSubadmin from "../Component/Table/AddSubadmin";
// import AddAdvertisement from "../Component/Table/AddAdvertisement"
import AllAdvertisementTable from "./Table/AdvertisementData/AdvertisementTable";
import Visacountry from "../../Visapage/Visacountry";
import Documentcategory from "../../Visapage/Documentcategory";
import Visacategory from "../../Visapage/Visacategory";
import Requireddocument from "../../Visapage/Requireddocument";
import Visacountryselect from "../../Visapage/Visacountryselect";
import Visacategorytable from "../../Visapage/Tablevisa/Visacategorytable";
import Visacountrytable from "../../Visapage/Tablevisa/Visacountrytable";
import Visadoctype from "../../Visapage/Tablevisa/Visadoctype";
import Visadoccategory from "../../Visapage/Tablevisa/Visadoccategory";
import RequireDocument from "../../Visapage/Tablevisa/RequireDocument";
import AllWebAdvertisement from "./Table/AdvertisementData/WebAdvertisement";
import Searchtable from "../../Historytable/Searchtable";
import Getevent from "../../Historytable/Getevent";
import Package from "../../Historytable/Package";
import newlogo from "../../../Images/whitelogo1.png";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from '@mui/icons-material/Image'; // Import the Image icon
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import AdminProfile from "./Table/AdminProfile";
import { apiURL } from "../../../Constants/constant";
import EventList from "./Table/EventList";
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import Citypackage from "../../Historytable/Citypackage";
import Apppost from "../../Historytable/Apppost";

import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import {
  // Groups3 as Groups3Icon,

  // AccountBox as AccountBoxIcon,
  GroupsTwo as Groups2Icon,
  PeopleAlt as Diversity1Icon,
  CollectionsBookmark as CollectionsBookmarkIcon,
  Flight as FlightIcon,
  DirectionsBus as BusIcon,
  // Hotel as HotelIcon,
  CollectionsBookmark as TotalBookingsIcon,
  EmojiEvents as EmojiEventsIcon,

} from "@mui/icons-material";
import { Center } from "@chakra-ui/layout";
import axios from "axios";
import { PiBackpackThin } from "react-icons/pi";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Downloadcsv from "../../Historytable/Downloadcsv";
import UploadFileIcon from '@mui/icons-material/UploadFile';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [showNotification, setSetShowNotification] = useState(false);
  const [showNotificationIcon, setSetShowNotificationIcon] = useState(false);
  const [passesBooked, setPassesBooked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [passload,setPassload]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useNavigate();
  const showNotificationRef = useRef(null);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuItemClick = (menuItem) => {
    // console.log(menuItem,menuData)
    setLoading(true);
    setMenuData(menuItem);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeMenuItemClass = {
    backgroundColor: "#2196F3",
    color: "#fff",
  };
  const inactiveMenuItemClass = {
    backgroundColor: "transparent",
    color: "#000",
  };
  const location = useLocation();
  const signOutAdmin = () => {
    dispatch(adminSignOut());
    navigate("/adminLogin");
  };



  const createSubAdmin = () => {
    navigate("/addSubAdmin");
  };

  const createAgent = () => {
    navigate("/addAgent");
  };

  const createAdvertisemnet = () => {
    navigate("/addAdvertisement");
  };

  const createWebAdvertisemnet = () => {
    navigate("/addWebAdvertisement");
  };

  const createEvents = () => {
    navigate("/addEvents");
  };

  const createMarkup = () => {
    navigate("/addMarkup");
  };

  const handleButtonClick2 = () => {
    // Navigate to the desired route when the button is clicked
    navigate("/addMarkup");
  };

  const createCoupon = () => {
    // Navigate to the desired route when the button is clicked
    navigate("/admin/addCoupons");
  };
  const createNotification = () => {
    navigate("/admin/addnotification")
  }
  // /adminprofile
  // const AdminProfile = () => {
  //   // Navigate to the desired route when the button is clicked
  //   navigate("/adminprofile");
  // };

  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const editHolidayPackage =
  //   location.pathname === "/admin/dashboard/EditHolidayPackage";
  // const { collapseSidebar } = useProSidebar();
  // const [selectedTab, setSelectedTab] = useState("AdminWelcome");

  // const handleTabChange = (tabName) => {
  //   setSelectedTab(tabName);
  // };
  const [notificationData, setNotificationData] = useState([]);
  useEffect(() => {
    async function getNotefication() {

      await axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getAllNotification/656ae08849c268401f98246b`)
        .then(function (response) {
          // handle success
          setNotificationData(response?.data?.result)
          // console.log(response?.data?.result, "ressssssssssssssssssssssssssssssssssssssssssssssssss");
        })
        .catch(function (error) {
          // handle error
          console.log(error, "error");
        })

    }
    getNotefication();
  }, [])
  // let notificationCount = 0;
  // useEffect(() => {
  //   notificationCount = notificationData?.map((item) => (
  //     item?.isRead === true
  //   ));
  // }, [notificationData]);

  // console.log(notificationCount)

  const [openCollapse, setOpenCollapse] = useState(false);

  const handleButtonClick = () => {
    setOpenCollapse(!openCollapse);
  };

  const [openCollapseOne, setOpenCollapseOne] = useState(false);
  const handleButtonClickOne = () => {
    setOpenCollapseOne(!openCollapseOne);
  };

  const [openCollapseTwo, setOpenCollapseTwo] = useState(false);

  const handleButtonClickTwo = () => {
    setOpenCollapseTwo(!openCollapseTwo);
  };
   const handleClickNinetyNine = () => {
     // Make a PUT request to the API endpoint
     setPassload(true);
     
    fetch(`${apiURL.baseURL}/skyTrails/api/user/event/sendPassesUpdate`, {
      method: 'PUT',
      // Add any necessary headers or body data here
    })
    .then(response => {
      if (response.ok) {
        // If the request is successful, set passesBooked to true
        setPassesBooked(true);
        setSnackbarOpen(true); // Open the Snackbar
      } else {
        // Handle errors if needed
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      // Handle network errors
      console.error('Network error:', error);
    })
    .finally(() => {
      setPassload(false); 
      
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };  

  const [openCollapseThree, setOpenCollapseThree] = useState(false);

  const handleButtonClickThree = () => {
    setOpenCollapseThree(!openCollapseThree);
  };

  const [openCollapseFour, setOpenCollapseFour] = useState(false);

  const handleButtonClickFour = () => {
    setOpenCollapseFour(!openCollapseFour);
  };

  const [openCollapseFive, setOpenCollapseFive] = useState(false);

  const handleButtonClickFive = () => {
    setOpenCollapseFive(!openCollapseFive);
  };

  ///////////////////////////////////////////////////////////////////////////////////
  const [openCollapsetwenty, setopenCollapsetwenty] = useState(false);

  const handleButtonClicktwent = () => {
    setopenCollapsetwenty(!openCollapsetwenty);
  };

  // ////////////////////////////////////////////////////////////////////////////////

  const [openCollapseSix, setOpenCollapseSix] = useState(false);

  const handleButtonClickSix = () => {
    setOpenCollapseSix(!openCollapseSix);
  };
  const [openCollapseSeven, setOpenCollapseSeven] = useState(false);

  const handleButtonClickSeven = () => {
    setOpenCollapseSeven(!openCollapseSeven);
  };

  const [openCollapseEight, setOpenCollapseEight] = useState(false);
  const handleButtonClickEight = () => {
    setOpenCollapseEight(!openCollapseEight);
  };

  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const loop = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationRef?.current && !showNotificationRef?.current?.contains(event.target)) {
        // Clicked outside the list, so close it
        setSetShowNotification(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleNotificationClick=(id)=>{
  //   axios.post(`/skyTrails/api/admin/getNotificationById/`)
  // }
  const handleNotificationClick = async (id) => {
    // console.log(apiURL.baseURL);

    // await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/getNotificationById/${id}`);
    await axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getNotificationById/${id}`)
      .then(function (response) {
        // handle success
        setNotificationData(response?.data?.result)
        // console.log(response?.data?.result, response?.data?.result?.length, "ressssssssssssssssssssssssssssssssssssssssssssssssss");
      })
      .catch(function (error) {
        // handle error
        console.log(error, "error");
      })
    handleMenuItemClick("Packageenquiry");
    setSetShowNotification(false);


  };
  function timeAgo(uploadTime) {
    const currentTime = new Date().getTime();
    const uploadTimeMillis = new Date(uploadTime).getTime();
    const timeDifference = currentTime - uploadTimeMillis;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      const weeks = Math.floor(seconds / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    }
  }


  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "#f0f2f5" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "#21325D",
            color: "#2f2f2f",

            fontSize: "1.2rem",
            height: "64px",
            width: "100%", // Set the desired width, you can use pixels or percentage
            margin: "0 auto", // Center the AppBar
            // padding: "0 16px",
            backdropFilter: "blur(5px)",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          <Toolbar>
            <IconButton
              color="white"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              style={{ marginTop: "10px" }}
            >
              <img
                src={newlogo}
                height={50}
                alt="logo"
                style={{ width: "100%" }}
              />
            </Typography>

            {/* Search Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <SearchIcon />
                </div> */}
                {/* <InputBase
                  placeholder="Search..."
                  style={{ paddingLeft: "30px" }}
                /> */}
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <AddIcon  />
                </div>
                <InputBase
                  placeholder="AddAppMarkup"
                  style={{ paddingLeft: "30px" }}
                />
              </div>
            </div> */}


            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px",
              }}
            >
              <InputLabel
                id="dropdown-label"
                style={{ padding: "2px", color: "white", fontSize: "18px" }}
              >
                VISA:
              </InputLabel>
              <FormControl>
                <Select
                  style={{ width: "200px", height: "40px", color: "white", border: "1px solid white" }}
                  labelId="dropdown-label"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                  MenuProps={{ // Use MenuProps to customize the menu
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null // This prevents the menu from being positioned incorrectly
                  }}
                  IconComponent={() => (
                    <div style={{ color: "white", padding: "5px", borderRadius: "0 4px 4px 0" }}>
                      &#9660; {/* Unicode character for down arrow */}
                    </div>
                  )}
                >
                  <MenuItem
                    value="option1"
                    onClick={() => handleMenuItemClick("visacountry")}
                  >
                    Visa Country
                  </MenuItem>
                  <MenuItem
                    value="option2"
                    onClick={() => handleMenuItemClick("visacategory")}
                  >
                    Visa Category
                  </MenuItem>
                  <MenuItem
                    value="option3"
                    onClick={() => handleMenuItemClick("Documenttype")}
                  >
                    Document Type
                  </MenuItem>
                  <MenuItem
                    value="option4"
                    onClick={() => handleMenuItemClick("DocumentCategory")}
                  >
                    Document Category
                  </MenuItem>
                  <MenuItem
                    value="option5"
                    onClick={() => handleMenuItemClick("Requireddocument")}
                  >
                    Required Documents
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Notification Icon */}
              {/* <IconButton
                color="inherit"
                size="large"
                style={{ marginLeft: "auto" }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}

              <Tooltip title="Account">
                <IconButton onClick={handleClick} size="small">
                  {/* <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Admin"
                    src={profilePicUrl}
                  /> */}

                  <PersonIcon sx={{ width: 32, height: 32, color: "white" }} />
                </IconButton>
              </Tooltip>

{/* skyTrails/api/user/event/sendPassesUpdate */}
              
<Tooltip title="Pass Status">
        <IconButton onClick={handleClickNinetyNine } size="small">
          <ConfirmationNumberIcon sx={{ width: 32, height: 32, color: "white" }} />
        </IconButton>
      </Tooltip>
      {passload && (
         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '100px', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <CircularProgress style={{color:'red'}}/>
     </div>
      
      )}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'center', horizontal:'center'}}
        
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <MuiAlert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%', textAlign: 'center' }}
        >
          Congratulations!Pass Booked
        </MuiAlert>
      </Snackbar>
   
              {/* ... rest of the menu items ... */}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAccountMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem onClick={() => { handleClose(); AdminProfile(); }}>
                  <Avatar /> Profile
                </MenuItem> */}
                <MenuItem >
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createSubAdmin(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add SUBADMIN
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createAgent(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Agent
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createAdvertisemnet(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Advertisement
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createWebAdvertisemnet(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Web Advertisement
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createEvents(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Events
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createMarkup(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Markup
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createCoupon(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Coupon
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); createNotification(); }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Notification
                </MenuItem>

                {/* <MenuItem
                  onClick={() => {
                    handleClose();
                    createCoupon();
                  }}
                >
                  <AddPhotoAlternateIcon>
                    <PersonAdd fontSize="small" />
                  </AddPhotoAlternateIcon>
                  Add Coupon
                </MenuItem> */}
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >

                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); signOutAdmin(); }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <div onClick={() => setSetShowNotification((pre) => !pre)} onMouseOver={() => setSetShowNotificationIcon(true)} onMouseLeave={() => setSetShowNotificationIcon(false)} >{showNotificationIcon ? <IoIosNotificationsOutline size='24px' color="white" /> : <IoIosNotifications size='24px' color="white" />}</div>
              <div style={{
                position: 'absolute',
                color: '#f8f1f1fc',
                background: "#21325d",
                width: '17px',
                height: '17px',
                // fontWeight: 100;
                fontSize: '12px',
                textAlign: 'center',
                borderRadius: '50%',
                border: '1px solid white',
                top: '-3px',
                left: '10px'


              }}>{notificationData?.length}</div>
              {showNotification && <div ref={showNotificationRef} className="notification_Icon_Admin" style={{ position: "absolute", top: "25px", right: "0px", width: "300px", backgroundColor: '#ece6e6', padding: '5px', borderRadius: '4px', maxHeight: "500px", overflowY: "scroll" }} >
                {notificationData?.length===0? <div>Stay in touch! You will find all the new updates here</div> : notificationData?.map((item) => (
                  <div
                    onClick={() => {
                      handleNotificationClick(item._id)
                    }}
                    style={{
                      display: "flex", backgroundColor: `${!item?.isRead ? "white" : "ffffff8c"}`, borderRadius: "4px", margin: '5px 7px', paddingBottom: "5px",
                      // backgroundColor:"#ffffff8c"

                    }}>
                    <div >
                      <div style={{ width: "30px", height: "30px", borderRadius: '2px', background: "#8080805e", display: "flex", justifyContent: "center", alignItems: "center", margin: '5px', marginTop: "20px" }}>
                        <PiBackpackThin />
                      </div>
                    </div>
                    <div style={{ paddingLeft: "3px" }}>
                      <div style={{ fontSize: "12px", color: "#21325d96" }} >{timeAgo(item?.updatedAt)}</div>
                      <div style={{ fontSize: "18px", color: "#21325d" }}>{item?.title}</div>
                      <div style={{ fontSize: "13px", color: "#rgb(33 50 93 / 71%)" }}>{item?.description}</div>

                    </div>
                  </div>
                ))}




              </div>}


              {/*  */}
              {/* <InputLabel
                id="dropdown-label"
                style={{ padding: "2px", color: "white", fontSize: "18px " }}
              >
                VISA :{" "}
              </InputLabel> */}
              {/* <FormControl>
                <Select
                  style={{ width: "100%", height: "10%" }}
                  labelId="dropdown-label"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <MenuItem
                    value="option1"
                    onClick={() => handleMenuItemClick("visacountry")}
                    sx={{ color: "white" }}
                  >
                    Visa Country
                  </MenuItem>
                  <MenuItem
                    value="option2"
                    onClick={() => handleMenuItemClick("visacategory")}
                  >
                    Visa Category
                  </MenuItem>
                  <MenuItem
                    value="option3"
                    onClick={() => handleMenuItemClick("Documenttype")}
                  >
                    Document Type
                  </MenuItem>
                  <MenuItem
                    value="option4"
                    onClick={() => handleMenuItemClick("DocumentCategory")}
                  >
                    Document Category
                  </MenuItem>
                  <MenuItem
                    value="option5"
                    onClick={() => handleMenuItemClick("Requireddocument")}
                  >
                    Required Documents
                  </MenuItem>
                </Select>
              </FormControl> */}
              {/* //////////visa/////////////////// */}

              {/* <Tooltip title="Account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, marginLeft: "auto" }}
                  aria-controls={openAccountMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Admin"
                    src={profilePicUrl}
                  />
                </IconButton>
              </Tooltip> */}
              {/* <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAccountMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createSubAdmin();
                  }}
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add SUBADMIN
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createAgent();
                  }}
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Agent
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createAdvertisemnet();
                  }}
                >
                  <AddPhotoAlternateIcon>
                    <PersonAdd fontSize="small" />
                  </AddPhotoAlternateIcon>
                  Add Advertisemnt
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createWebAdvertisemnet();
                  }}
                >
                  <AddPhotoAlternateIcon>
                    <PersonAdd fontSize="small" />
                  </AddPhotoAlternateIcon>
                  Add WebAdvertisemnt
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createEvents();
                  }}
                >
                  <AddPhotoAlternateIcon>
                    <PersonAdd fontSize="small" />
                  </AddPhotoAlternateIcon>
                  Add Events
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    createMarkup();
                  }}
                >
                  <AddPhotoAlternateIcon>
                    <PersonAdd fontSize="small" />
                  </AddPhotoAlternateIcon>
                  Add Markup
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOutAdmin();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu> */}
            </div>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List style={{ backgroundColor: "#21325D" }}>

            <ListItem
              disablePadding
              sx={{ display: "block", color: "white" }}
              onClick={() => handleMenuItemClick("Home")}
              className={
                menuData === "Home" ? "active-menu-item" : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Home"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>

            {/* <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleButtonClick2}
              className={
                menuData === "Home" ? "active-menu-item" : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Markup"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AddCircleOutlineIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Add Markups"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem> */}

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Agent Table")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Agent Table"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Agent Table"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("User Table")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "User Table"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Table"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("SubAdmin Table")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "SubAdmin Table"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Subadmin Table"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("AgentRequest")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "AgentRequest"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Groups3Icon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Agent Request"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "center" : "center",
                  px: 2.5,
                  ...((menuData === "Cancel Ticket"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
                onClick={handleButtonClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openCollapse ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CancelOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Cancel Ticket"
                  sx={{ opacity: open ? 1 : 0, color: "white" ,marginLeft:"20px"}}
                />
              </ListItemButton>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "center" : "center",
                      px: 2.5,
                    }}
                    onClick={handleButtonClickTwo}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: "3",
                        justifyContent: "center",
                      }}
                    >
                      <AccountBoxIcon sx={{ color: "white",marginLeft:"20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Agent  Bookings"
                      sx={{ color: "white" , marginLeft:"10px"}}
                    />
                  </ListItemButton>
                  <Collapse in={openCollapseTwo} timeout="auto" unmountOnExit>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Hotel CancelTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Hotel CancelTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <HotelIcon sx={{ color: "white" }} />
                        </ListItemIcon>

                        <ListItemText
                          primary="Hotel Cancel Ticket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Flight CancelTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,

                          ...((menuData === "Flight CancelTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <AirplaneTicketIcon sx={{ color: "white" }} />
                        </ListItemIcon>

                        <ListItemText
                          primary="Flight Cancel Ticket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Bus CancelTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,

                          ...((menuData === "Bus CancelTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <DirectionsBusIcon sx={{ color: "white" }} />
                        </ListItemIcon>

                        <ListItemText
                          primary="Bus Cancel Ticket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={handleButtonClickOne}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "center" : "center",
                      px: 2.5,
                    }}
                    onClick={handleButtonClickThree}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: "3",
                        justifyContent: "center",
                      }}
                    >
                      <AccountBoxIcon sx={{ color: "white" ,marginLeft:"15px"}} />
                    </ListItemIcon>
                    <ListItemText
                      primary="User Bookings"
                      sx={{ color: "white" ,marginLeft:"10px"}}
                    />
                  </ListItemButton>
                  <Collapse in={openCollapseThree} timeout="auto" unmountOnExit>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Hotel CancelTickets")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Hotel CancelTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <HotelIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel Cancel Tickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() =>
                        handleMenuItemClick("Flight CancelTickets")
                      }
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Flight CancelTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <AirplaneTicketIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Flight Cancel Tickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Bus CancelTickets")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Bus CancelTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <DirectionsBusIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus Cancel Tickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                </ListItem>
              </Collapse>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "center" : "center",
                  px: 2.5,
                  ...((menuData === "Change Request"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
                onClick={handleButtonClickSix}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openCollapse ? 3 : "3",
                    justifyContent: "center",
                  }}
                >
                  <ChangeCircleOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Change Request"
                  sx={{ opacity: open ? 1 : 0, color: "white", marginLeft: "20px" }}
                />
              </ListItemButton>
              <Collapse in={openCollapseSix} timeout="auto" unmountOnExit>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "center" : "center",
                      px: 2.5,
                    }}
                    onClick={handleButtonClickSeven}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: "3",
                        justifyContent: "center",
                      }}
                    >
                      <AccountBoxIcon sx={{ color: "white" ,marginLeft:"15px"}} />
                    </ListItemIcon>
                    <ListItemText primary="Agent" sx={{ color: "white", marginLeft: "20px" }} />
                  </ListItemButton>
                  <Collapse in={openCollapseSeven} timeout="auto" unmountOnExit>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Hotel ChangeTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Hotel ChangeTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <HotelIcon  sx={{ color: "white" ,marginLeft:"10px"}} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel Change Ticket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Flight ChangeTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Flight ChangeTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <AirplaneTicketIcon sx={{ color: "white",marginLeft:"10px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Flight Change Ticket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Bus ChangeTicket")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Bus ChangeTicket"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <DirectionsBusIcon sx={{ color: "white" ,marginLeft:"10px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus ChangeTicket"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "center" : "center",
                      px: 2.5,
                    }}
                    onClick={handleButtonClickEight}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: "3",
                        justifyContent: "center",
                      }}
                    >
                      <AccountBoxIcon sx={{ color: "white",marginLeft:"15px" }} />
                    </ListItemIcon>
                    <ListItemText primary="User" sx={{ color: "white", marginLeft: "20px" }} />
                  </ListItemButton>
                  <Collapse in={openCollapseEight} timeout="auto" unmountOnExit>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Hotel ChangeTickets")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Hotel ChangeTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <HotelIcon sx={{ color: "white",marginLeft:"10px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel ChangeTickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() =>
                        handleMenuItemClick("Flight ChangeTickets")
                      }
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Flight ChangeTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >

                          <AirplanemodeActiveIcon sx={{ color: "white" }} />

                        </ListItemIcon>
                        <ListItemText
                          primary="Flight ChangeTickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => handleMenuItemClick("Bus ChangeTickets")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          ...((menuData === "Bus ChangeTickets"
                            ? activeMenuItemClass
                            : inactiveMenuItemClass) || {}),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <DirectionsBusIcon sx={{ color: "white",marginLeft:"10px" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus ChangeTickets"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                </ListItem>
              </Collapse>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("User MarkUp Amount")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "User MarkUp Amount"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ContactsOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User MarkUp Amount"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Edit Holiday Package")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Edit Holiday Package"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ReceiptOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Edit Holiday Package"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Citypackage")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Citypackage"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <UploadFileIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Upload City Package"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            {/* <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Forex")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Forex"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HelpOutlineOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Forex"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "center" : "center",
                  px: 2.5,
                  ...((menuData === "AGENT Bookings"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
                onClick={handleButtonClickFour}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openCollapse ? 3 : "3",
                    justifyContent: "center",
                  }}
                >
                  <AccountBoxIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Agent Bookings"

                  sx={{ opacity: open ? 1 : 0, color: "white", marginLeft: "20px" }}

                />
              </ListItemButton>
              <Collapse in={openCollapseFour} timeout="auto" unmountOnExit>
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Hotel Bookings")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Hotel Bookings"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <HotelIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotel Bookings"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Flight Bookings")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Flight Bookings"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <AirplaneTicketIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Flight Bookings"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Bus Bookings")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Bus Bookings"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DirectionsBusIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Bus Bookings"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                  ...((menuData === "USER Bookings"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
                onClick={handleButtonClickFive}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: "3",
                    justifyContent: "center",
                  }}
                >
                  <AccountBoxIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Bookings"
                  sx={{ opacity: open ? 1 : 0, color: "white", marginLeft: "20px" }}
                />
              </ListItemButton>
              <Collapse in={openCollapseFive} timeout="auto" unmountOnExit>
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Hotel Booking")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Hotel Booking"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <HotelIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotel Booking"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Flight Booking")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Flight Booking"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <AirplaneTicketIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Flight Booking"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginLeft: "20px" }}
                  onClick={() => handleMenuItemClick("Bus Booking")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Bus Booking"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DirectionsBusIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Bus Booking"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </ListItem>
            {/* <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Visa Request")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Visa Request"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CalendarTodayOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Visa Request"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("OfferList")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "OfferList"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LocalOfferIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Offer List"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("fixedDeparture")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "fixedDeparture"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AirplanemodeActiveIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="fixedDeparture"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("fixedDepartureControl")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "fixedDepartureControl"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AirplanemodeActiveIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="fixedDepartureControl"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Advertisment")}
              className={
                menuData === "Advertisment"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Advertisment"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WebIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Advertisment"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Web Advertisment")}
              className={
                menuData === "Web Advertisment"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Web Advertisment"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LanguageIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Web Advertisment"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Getallevent")}
              className={
                menuData === "Getallevent"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Getallevent"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WebIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Get Events"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("apppost")}
              className={
                menuData === "apppost"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Apppost"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WebIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="App Post"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>


            {/* /////// */}
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Searchdata")}
              className={
                menuData === "Searchdata"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Searchdata"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PersonSearchIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Search Data"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Packageenquiry")}
              className={
                menuData === "Packageenquiry"
                  ? "active-menu-item"
                  : "inactive-menu-item"
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Packageenquiry"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <InventoryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Package Enquiry"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "center" : "center",
                  px: 2.5,
                  ...((menuData === "AGENT Bookings"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
                onClick={handleButtonClicktwent}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openCollapse ? 3 : "3",
                    justifyContent: "center",
                  }}
                >
                  < ArticleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Visa Booking"
                  sx={{ opacity: open ? 1 : 0, color: "white", marginLeft: "20px" }}
                />
              </ListItemButton>
              <Collapse in={openCollapsetwenty} timeout="auto" unmountOnExit>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleMenuItemClick("Visa Category")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Visa Category"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      < ArticleIcon sx={{ color: "white", marginLeft: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Category"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleMenuItemClick("Visa Country")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Visa Country"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      < ArticleIcon sx={{ color: "white", marginLeft: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Country"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleMenuItemClick("Visadoctype")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Visadoctype"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      < ArticleIcon sx={{ color: "white", marginLeft: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Document Type"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleMenuItemClick("Visadoccategory")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "Visadoccategory"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      < ArticleIcon sx={{ color: "white", marginLeft: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Document Category"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleMenuItemClick("RequireDocument")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ...((menuData === "RequireDocument"
                        ? activeMenuItemClass
                        : inactiveMenuItemClass) || {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ArticleIcon sx={{ color: "white", marginLeft: "20px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Require Document"
                      sx={{ opacity: open ? 1 : 0, color: "white", }}
                    />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </ListItem>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("EventList")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "EventList"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ArticleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Event List"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>

            {/* ////////////////////////////////////////////////////// */}
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick("Downloadcsv")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...((menuData === "Downloadcsv"
                    ? activeMenuItemClass
                    : inactiveMenuItemClass) || {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ArticleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="SSDC Leads"
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>


          </List>
          <Divider />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                border: "1px solid",
              }}
            >
              <RiseLoader
                color="#35C7AB"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div>
              {menuData === "profile" && (
                <AdminProfile />
              )}
              {menuData === "profile" && (
                <AdminProfile />
              )}
              {menuData === "Downloadcsv" && <Downloadcsv/>}
              {menuData === "Packageenquiry" && <Package />}
              {menuData === "apppost" && <Apppost/>}
              {menuData==="Citypackage" && <Citypackage/>}
              {menuData === "Getallevent" && <Getevent />}
              {menuData === "Searchdata" && <Searchtable />}
              {menuData === "RequireDocument" && <RequireDocument />}
              {menuData === "Visadoccategory" && <Visadoccategory />}
              {menuData === "Visadoctype" && <Visadoctype />}
              {menuData === "Visa Country" && <Visacountrytable />}
              {menuData === "Visa Category" && <Visacategorytable />}
              {menuData === "visacountry" && <Visacountryselect />}
              {menuData === "Requireddocument" && <Requireddocument />}
              {menuData === "visacategory" && <Visacategory />}
              {menuData === "DocumentCategory" && <Documentcategory />}
              {menuData === "Documenttype" && <Visacountry />}
              {menuData === "Home" && <AdminDashboard />}
              {menuData === "Agent Table" && <Tables />}
              {menuData === "User Table" && <Usertables />}
              {menuData === "EventList" && <EventList />}
              {menuData === "SubAdmin Table" && <SubAdminTable />}
              {menuData === "AgentRequest" && <AgentRequest />}
              {menuData === "Hotel CancelTicket" && <AgentCancelHotel />}
              {menuData === "Flight CancelTicket" && <AgentCancelFlight />}
              {menuData === "Bus CancelTicket" && <AgentCancelBus />}
              {menuData === "Hotel CancelTickets" && <UserCancelHotel />}
              {menuData === "Flight CancelTickets" && (
                <AllFlightCancelTickets />
              )}
              {menuData === "Bus CancelTickets" && <UserCancelBus />}
              {menuData === "Hotel ChangeTicket" && <AgentHotelChangeRequest />}
              {menuData === "Flight ChangeTicket" && (
                <AgentFlightChangeRequest />
              )}
              {menuData === "Bus ChangeTicket" && <AgentBusChangeRequest />}
              {menuData === "Hotel ChangeTickets" && <UserHotelChangeRequest />}
              {menuData === "Flight ChangeTickets" && (
                <UserFlightChangeRequest />
              )}
              {menuData === "Bus ChangeTickets" && <UserBusChangeRequest />}
              {menuData === "User MarkUp Amount" && <MarkUpAmount />}
              {menuData === "Edit Holiday Package" && <PackageDetails />}
              {menuData === "Forex" && <ForexData />}
              {menuData === "Visa Request" && <VisaData />}
              {menuData === "Hotel Bookings" && <AgentHotelBookings />}
              {menuData === "Flight Bookings" && <AgentFlightBookings />}
              {menuData === "Bus Bookings" && <AgentBusBookings />}
              {menuData === "Hotel Booking" && <HotelBookings />}
              {menuData === "Flight Booking" && <FlightBookings />}
              {menuData === "Bus Booking" && <BusBookings />}
              {menuData === "OfferList" && <OfferList />}
              {menuData === "fixedDeparture" && <FixedDeparture />}
              {menuData === "fixedDepartureControl" && (
                <FixedDepartureControl />
              )}
              {menuData === "Advertisment" && <AllAdvertisementTable />}
              {menuData === "Web Advertisment" && <AllWebAdvertisement />}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

