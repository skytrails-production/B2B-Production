import { useEffect, useState } from "react";
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
import WebIcon from '@mui/icons-material/Web';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { FormControl, InputLabel, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Groups3Icon from "@mui/icons-material/Groups3";
import AdminDashboard from "./AdminDashboard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useNavigate();
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
    navigate('/addMarkup');
  };

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

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            color: "#2f2f2f",
            borderBottom: "none",
            fontSize: "1.2rem",
            height: "64px",
            // padding: "0 16px",
            backdropFilter: "blur(5px)",
            transition: "background-color 0.3s ease-in-out",
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              style={{ marginTop: "10px" }}
            >
              <img src={STLOGO} height={50} alt="logo" />
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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search..."
                  style={{ paddingLeft: "30px" }}
                />
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


            <IconButton color="inherit" sx={{ fontSize: 80,'&:hover': {
          backgroundColor: 'black',
        }, }} size="large" onClick={handleButtonClick2}>
                
                  <AddCircleOutlineIcon  />
               
              </IconButton>

            <div style={{ display: "flex", alignItems: "center"  }}>
              {/*  */}
              <InputLabel id="dropdown-label"  style={{padding:"2px", color:"black", fontSize:"18px "}}>VISA : </InputLabel>
              <FormControl>
                <Select
                style={{width:"100%", height:"10%"}}
                  labelId="dropdown-label"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <MenuItem value="option1" onClick={() => handleMenuItemClick("visacountry")}>Visa Country</MenuItem>
                  <MenuItem value="option2" onClick={() => handleMenuItemClick("visacategory")}>Visa Category</MenuItem>
                  <MenuItem value="option3" onClick={() => handleMenuItemClick("Documenttype")}>Document Type</MenuItem>
                  <MenuItem value="option4" onClick={() => handleMenuItemClick("DocumentCategory")}>Document Category</MenuItem>                                                                                       
                  <MenuItem value="option5" onClick={() => handleMenuItemClick("Requireddocument")}>Required Documents</MenuItem>
                  
                </Select>
              </FormControl>
              {/* //////////visa/////////////////// */}

              {/* Notification Icon */}
              <IconButton color="inherit" size="large">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Tooltip title="Account">
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
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAccountMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
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
              </Menu>
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
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
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
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
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
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Agent Table"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="User Table"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SubAdmin Table"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <Groups3Icon />
                </ListItemIcon>
                <ListItemText
                  primary="AgentRequest"
                  sx={{ opacity: open ? 1 : 0 }}
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
                    mr: openCollapse ? 3 : "3",
                    justifyContent: "center",
                  }}
                >
                  <CalendarTodayOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Cancel Ticket"
                  sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="AGENT CancelBookings" />
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
                          <AccountBoxIcon />
                        </ListItemIcon>

                        <ListItemText
                          primary="Hotel CancelTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>

                        <ListItemText
                          primary="Flight CancelTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>

                        <ListItemText
                          primary="Bus CancelTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="USER CancelBookings" />
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel CancelTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Flight CancelTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus CancelTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                  <CalendarTodayOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Change Request"
                  sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="AGENT" />
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel ChangeTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Flight ChangeTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus ChangeTicket"
                          sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="USER" />
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Hotel ChangeTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Flight ChangeTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                          <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bus ChangeTickets"
                          sx={{ opacity: open ? 1 : 0 }}
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
                  <ContactsOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="User MarkUp Amount"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <ReceiptOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Edit Holiday Package"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
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
                  <HelpOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Forex" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
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
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AGENT Bookings"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              <Collapse in={openCollapseFour} timeout="auto" unmountOnExit>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotel Bookings"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Flight Bookings"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Bus Bookings"
                      sx={{ opacity: open ? 1 : 0 }}
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
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="USER Bookings"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              <Collapse in={openCollapseFive} timeout="auto" unmountOnExit>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotel Booking"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Flight Booking"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Bus Booking"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </ListItem>
            <ListItem
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
                  <CalendarTodayOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Visa Request"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
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
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="OfferList"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <AirplaneTicketIcon />
                </ListItemIcon>
                <ListItemText
                  primary="fixedDeparture"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <AirplanemodeActiveIcon />
                </ListItemIcon>
                <ListItemText
                  primary="fixedDepartureControl"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Advertisment"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Web Advertisment"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Get Events"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Search Data"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Package Enquiry"
                  sx={{ opacity: open ? 1 : 0 }}
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
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="VISA BOOKING"
                  sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Category"
                      sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Country"
                      sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Document Type"
                      sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visa Document Category"
                      sx={{ opacity: open ? 1 : 0 }}
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
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Require Document"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            </ListItem>


{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            
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
            {menuData === "Packageenquiry" && <Package/>}
            {menuData === "Getallevent" && <Getevent/>}
            {menuData === "Searchdata" && <Searchtable/>}
            {menuData === "RequireDocument" && <RequireDocument/>}
            {menuData === "Visadoccategory" && <Visadoccategory/>}
            {menuData === "Visadoctype" && <Visadoctype/>}
            {menuData === "Visa Country" && <Visacountrytable/>}
            {menuData === "Visa Category" && <Visacategorytable/>}
            {menuData === "visacountry" && <Visacountryselect/>}
            {menuData === "Requireddocument" && <Requireddocument/>}
            {menuData === "visacategory" && <Visacategory/>}
            {menuData === "DocumentCategory" && <Documentcategory/>}
              {menuData === "Documenttype" && <Visacountry/>}
              {menuData === "Home" && <AdminDashboard />}
              {menuData === "Agent Table" && <Tables />}
              {menuData === "User Table" && <Usertables />}
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
              {menuData==="Web Advertisment"&&<AllWebAdvertisement/>}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
