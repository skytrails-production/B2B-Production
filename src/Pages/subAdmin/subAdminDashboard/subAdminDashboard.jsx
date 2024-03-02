import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import Usertable from "./Usertable";
import stlogo from "../../../Images/ST-Main-Logo.png";
import AgentRequest from "./AgentRequest";

import { Menu, MenuItem } from "@mui/material";
import newlogo from "../../../Images/whitelogo1.png";
import Home from "./Home";
import Agenttable from "./Agenttable";
import AgentBusCancel from "./AgentBusCancel";
import AgentFlightCancel from "./AgentFlightCancel";
import AgentHotelCancel from "./AgentHotelCancel";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';
import UserBusCancel from "./UserBusCancel";
import UserFlightCancel from "./UserFlightCancel";
import UserHotelCancel from "./UserHotelCancel";
import AgentChangeBus from "./AgentChangeBus";
import AgentChangeFlight from "./AgentChangeFlight";
import AgentChangeHotel from "./AgentChangeHotel";
import UserChangeFlight from "./UserChangeFlight";
import UserChangeBus from "./UserChangeBus";
import UserChangeHotel from "./UserChangeHotel";
import AgentFlightBooking from "./AgentFlightBooking";
import AgentBusBooking from "./AgentBusBooking";
import AgentHotelBooking from "./AgentHotelBooking";
import UserBusBooking from "./UserBusBooking";
import UserFlightBooking from "./UserFlightBooking";
import UserHotelBooking from "./UserHotelBooking";
import MarkupAmount from "./MarkupAmount";
import FixedDeparture from "./FixedDeparture";
import FixedDepartureControlSub from "./FixedDepartureControlSub";
import Webadvertisement from "./Webadvertisement";
import Advertisement from "./Advertisement";
import EventGet from "./EventsGet";
import SearchData from "./SearchData";
import PackageEnquary from "./PackageEnquary";
import WebIcon from "@mui/icons-material/Web";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Visacategory from "./Visacategory";
import VisaCountry from "./VisaCountry";
import VisaDocumentCategory from "./VisaDocumentCategory";
import VisaDocumenttype from "./VisaDocumenttype";
import VisaRequireDoc from "./VisaRequireDoc";
import SubadminAll from "./SubadminAll";
import { SupervisorAccount } from '@mui/icons-material'; // Import the SupervisorAccount icon
import AddSubadmin from "./Addforms/AddSubadmin";
import AddAgent from "./Addforms/AddAgent";
import AddAdvertisement from "./Addforms/AddAdvertisement";
import AddMarkup from "./Addforms/AddMarkup";
import CategoryIcon from '@mui/icons-material/Category'; // Import the CategoryIcon component
import PublicIcon from '@mui/icons-material/Public'; // Import the PublicIcon component
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddCoupons from "./Addforms/AddCoupons";
import AddNotification from "./Addforms/AddNotification";
import AddWebAdvertisement from "./Addforms/AddWebAdvertisement";
import DomainIcon from '@mui/icons-material/Domain';
import DescriptionIcon from '@mui/icons-material/Description'; // Import the DescriptionIcon component

import AddEvent from "./Addforms/AddEvent";
import { FaPassport } from "react-icons/fa";
import { FormControl, InputLabel, Select } from "@mui/material";
import Visacountryselect from "./Visapagesub/Visacountryselect";
import VisacountrysForm from "./Visapagesub/VisacountrysForm";
import PackageDetails from "./packageUpdate/PackageDetails";
import Visacategorys from "./Visapagesub/Visacategory";

import RequireddocumentFrom from "./Visapagesub/Requireddocument";
import Documentcategorys from "./Visapagesub/Documentcategorys";

import { apiURL } from "../../../Constants/constant";

import { PiBackpackThin } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { subAdminLogout } from "../../../Redux/SubAdminLogin/actionsubadminlogin"

const drawerWidth = 240;
function ResponsiveDrawer(props) {



  const { window } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAgentData, setShowAgentData] = React.useState(false);
  const [showAgentRequest, setshowAgentRequest] = React.useState(false);
  const [showSubadmin, setshowSubadmin] = React.useState(false);

  const [showHome, setShowHome] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [markupData, setShowMarkupData] = React.useState(false);
  const [fixedDepartures, setfixedDeparture] = React.useState(false);

  const [fixedDeparturescontrol, setfixedDepartureControl] = React.useState(false);
  const [advertisements, setAdvertisement] = React.useState(false);
  const [visaCountryforms, setvisaCountryform] = React.useState(false);
  const [visaCountrysforms, setvisaCountrysform] = React.useState(false);
  const [visaCategoryforms, setvisaCategoryforms] = React.useState(false);
  const [visaDocumentsCategorys, setvisaDocumentsCategorys] = React.useState(false);
  const [DocumentsCategorys, setDocumentsCategorys] = React.useState(false);


  const [requireDocuments, setrequireDocuments] = React.useState(false);


  const [webadvertisements, setwebadvertisement] = React.useState(false);
  const [addsubadmin, setaddSubadmins] = useState(false);
  const [addAgents, setaddAgents] = useState(false);
  const [addwebAdvertisement, setwebaddAdvertisement] = useState(false);
  const [addCoupons, setaddCoupons] = React.useState(false);
  const [addNotifications, setaddNotification] = React.useState(false);
  const [addMarkups, setaddMarkups] = React.useState(false);
  const [addEvents, setaddEvents] = React.useState(false);
  const [holidayPackages, setHolidayPackage] = React.useState(false);
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  // console.log(access, "------------------");
  const homeView = location.pathname === "/subAdmin/dashboard";
  const agentTableView = location.pathname === "/subAdmin/dashboard/Agenttable";
  const subadminTableView = location.pathname === "/subAdmin/dashboard/Subadmintable";
  const holidayPackage = location.pathname === "/subAdmin/dashboard/holidaypackage";

  const agentUserView = location.pathname === "/subAdmin/dashboard/Usertable";
  const agentRequestView = location.pathname === "/subAdmin/dashboard/AgentrequestTable";
  const agentflightCancel = location.pathname === "/subAdmin/dashboard/Agentflightcancel";
  const agenthotelCancel = location.pathname === "/subAdmin/dashboard/Agenthotelcancel";
  const agentbusCancel = location.pathname === "/subAdmin/dashboard/Agentbuscancel";

  const userflightCancel = location.pathname === "/subAdmin/dashboard/Userflightcancel";
  const userhotelCancel = location.pathname === "/subAdmin/dashboard/Userhotelcancel";
  const userbusCancel = location.pathname === "/subAdmin/dashboard/Userbuscancel";

  const agentflightChange = location.pathname === "/subAdmin/dashboard/agentflightchange";
  const agenthotelChange = location.pathname === "/subAdmin/dashboard/agenthotelchange";
  const agentbusChange = location.pathname === "/subAdmin/dashboard/agentbuschange";

  const userflightChange = location.pathname === "/subAdmin/dashboard/userflightchange";
  const userhotelChange = location.pathname === "/subAdmin/dashboard/userhotelchange";
  const userbusChange = location.pathname === "/subAdmin/dashboard/userbuschange";


  const AgentflightBooking = location.pathname === "/subAdmin/dashboard/AgentflightBooking";
  const AgenthotelBooking = location.pathname === "/subAdmin/dashboard/AgenthotelBooking";
  const AgentbusBooking = location.pathname === "/subAdmin/dashboard/AgentbusBooking";

  const userflightBooking = location.pathname === "/subAdmin/dashboard/userflightBooking";
  const userhotelBooking = location.pathname === "/subAdmin/dashboard/userhotelBooking";
  const userbusBooking = location.pathname === "/subAdmin/dashboard/userbusBooking";

  const markupAmount = location.pathname === "/subAdmin/dashboard/markupamount";
  const fixedDeparture = location.pathname === "/subAdmin/dashboard/fixedDeparture";
  const addSubadmin = location.pathname === "/subAdmin/dashboard/addsubadmins";
  const addAgent = location.pathname === "/subAdmin/dashboard/addagent";
  const addAdvertisements = location.pathname === "/subAdmin/dashboard/addAdvertisements";
  const addwebAdvertisements = location.pathname === "/subAdmin/dashboard/addwebAdvertisements";
  const addCouponscode = location.pathname === "/subAdmin/dashboard/addcouponscode";
  const addNotification = location.pathname === "/subAdmin/dashboard/addnotification";
  const addMarkup = location.pathname === "/subAdmin/dashboard/addmarkups";
  const addEvent = location.pathname === "/subAdmin/dashboard/addEvents";
  const fixedDeparturecontrol = location.pathname === "/subAdmin/dashboard/fixedDeparturecontrol";

  const advertisement = location.pathname === "/subAdmin/dashboard/advertisement";
  const webadvertisement = location.pathname === "/subAdmin/dashboard/webadvertisement";

  const getevent = location.pathname === "/subAdmin/dashboard/getevent";
  const searchdata = location.pathname === "/subAdmin/dashboard/searchdata";
  const visaCountryform = location.pathname === "/subAdmin/dashboard/visacountryform";
  const visaCountrysform = location.pathname === "/subAdmin/dashboard/visacountrysform";
  const visaCategorysform = location.pathname === "/subAdmin/dashboard/visacategorysform";
  const visadocumentsCategorys = location.pathname === "/subAdmin/dashboard/visadocumentcategorysform";
  const requiredocuments = location.pathname === "/subAdmin/dashboard/requiredocuments";
  // setrequireDocuments
  const packageEnquary = location.pathname === "/subAdmin/dashboard/packageEnquary";
  const visacategory = location.pathname === "/subAdmin/dashboard/visacategory";
  const visacountry = location.pathname === "/subAdmin/dashboard/visacountry";
  const visadocumenttype = location.pathname === "/subAdmin/dashboard/visadocumenttype";
  const visadocumentcategory = location.pathname === "/subAdmin/dashboard/visadocumentcategory";
  const visarequiredocument = location.pathname === "/subAdmin/dashboard/visarequiredocument";
  const [menuData, setMenuData] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  useEffect(() => {
    if (reducerState?.subadminLogin?.subadminloginData?.statusCode !== 200) {
      // console.log(reducerState?.subadminLogin?.subadminloginData?.statusCode,reducerState,"statuscode  bchjfbfhfbhj")
      // dispatch(subAdminLogout());
      navigate("/subAdminLogin");
    }
  }, [reducerState?.subadminLogin?.subadminloginData?.statusCode])
  const handleMenuItemClick = (menuItem) => {
    // console.log(menuItem,menuData)
    setLoading(true);
    setMenuData(menuItem);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // handleVisaCategory


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAgentTable = () => {
    setShowAgentData(true);
    navigate('./Agenttable');

  }

  const handleSubadminTable = () => {
    setshowSubadmin(true)
    navigate('./Subadmintable');
  }


  const handleMarkUpAmount = () => {
    setShowMarkupData(true);
    navigate('./markupamount');

  }

  const handleFixedDeparture = () => {
    setfixedDeparture(true);
    navigate('./fixedDeparture');

  }

  const handleAddSubadmin = () => {
    setaddSubadmins(true);
    navigate('/subAdmin/dashboard/addsubadmins')
  }

  const handleVisaCountryForm = () => {
    setvisaCountryform(true);
    navigate('/subAdmin/dashboard/visacountryform')
  }

  const handleVisaCountrysForm = () => {
    setvisaCountrysform(true);
    navigate('/subAdmin/dashboard/visacountrysform')
  }

  const handleVisaCategoryForm = () => {
    setvisaCategoryforms(true);
    navigate('/subAdmin/dashboard/visacategorysform')
  }


  const handleVisadocumentsCategory = () => {
    setDocumentsCategorys(true);
    navigate('/subAdmin/dashboard/visadocumentcategorysform')
  }

  const handleRequireDocuemts = () => {
    setrequireDocuments(true);
    navigate('/subAdmin/dashboard/requiredocuments')
  }





  const handleAddAdvertisment = () => {
    setAdvertisement(true);
    navigate('/subAdmin/dashboard/addAdvertisements')
  }

  const handleWebAdvertisment = () => {
    setwebaddAdvertisement(true);
    navigate('/subAdmin/dashboard/addwebAdvertisements')
  }

  const handleCoupons = () => {
    setaddCoupons(true);
    navigate('/subAdmin/dashboard/addcouponscode')
  }
  const handleNotification = () => {
    setaddNotification(true);
    navigate('/subAdmin/dashboard/addnotification')
  }



  const handleMarkup = () => {
    setaddMarkups(true);
    navigate('/subAdmin/dashboard/addmarkups')
  }
  const handleAddAdgent = () => {
    setaddAgents(true);
    navigate('/subAdmin/dashboard/addagent')
  }

  const handleAddEvents = () => {
    setaddEvents(true);
    navigate('/subAdmin/dashboard/addEvents');
  }
  const handleFixedDepartureControl = () => {
    setfixedDepartureControl(true);
    navigate('./fixedDeparturecontrol');

  }


  const handleUserTable = () => {
    setShowAgentData(true);
    navigate('./Usertable');

  }

  const handleAgentRequest = () => {
    setshowAgentRequest(true);
    navigate('./AgentrequestTable')
  }


  const handleAgentFlightCancel = () => {
    setShowAgentData(true);
    navigate('./Agentflightcancel');

  }
  const handleAgentBusCancel = () => {
    setShowAgentData(true);
    navigate('./Agentbuscancel');

  }
  const handleAgentHotelCancel = () => {
    setShowAgentData(true);
    navigate('./Agenthotelcancel');

  }




  const handleUserFlightCancel = () => {
    setShowAgentData(true);
    navigate('./Userflightcancel');

  }
  const handleUserBusCancel = () => {
    setShowAgentData(true);
    navigate('./Userbuscancel');

  }
  const handleUserHotelCancel = () => {
    setShowAgentData(true);
    navigate('./Userhotelcancel');

  }


  const handleAgentFlightChange = () => {
    setShowAgentData(true);
    navigate('./agentflightchange');

  }
  const handleAgentBusChange = () => {
    setShowAgentData(true);
    navigate('./agentbuschange');

  }
  const handleAgentHotelChange = () => {
    setShowAgentData(true);
    navigate('./agenthotelchange');

  }


  const handleUserHotelChange = () => {
    setShowAgentData(true);
    navigate('./userhotelchange');

  }
  const handleUserFlightChange = () => {
    setShowAgentData(true);
    navigate('./userflightchange');

  }
  const handleUserBusChange = () => {
    setShowAgentData(true);
    navigate('./userbuschange');

  }

  const handleUserFlightBooking = () => {
    setShowAgentData(true);
    navigate('./userflightBooking');

  }

  const handleUserHotelBooking = () => {
    setShowAgentData(true);
    navigate('./userhotelBooking');

  }
  const handleUserBusBooking = () => {
    setShowAgentData(true);
    navigate('./userbusBooking');

  }


  const handleAgentFlightBooking = () => {
    setShowAgentData(true);
    navigate('./AgentflightBooking');

  }

  const handleAgentHotelBooking = () => {
    setShowAgentData(true);
    navigate('./AgenthotelBooking');

  }
  const handleAgentBusBooking = () => {
    setShowAgentData(true);
    navigate('./AgentbusBooking');

  }


  const handleAdvertisment = () => {
    setShowAgentData(true);
    navigate('./advertisement');

  }
  const handleWebadvertisement = () => {
    setShowAgentData(true);
    navigate('./webadvertisement');

  }

  const handleEvents = () => {
    setShowAgentData(true);
    navigate('./getevent');

  }

  const handleHolidayPackage = () => {
    setHolidayPackage(true);
    navigate('./holidaypackage');

  }




  const handleSearchData = () => {
    setShowAgentData(true);
    navigate('./searchdata');

  }

  const handleVisaCategory = () => {

    navigate('./visacategory');

  }

  const handleVisaCountry = () => {

    navigate('./visacountry');

  }
  const handleVisaDocumentCategory = () => {

    navigate('./visadocumentcategory');

  }
  const handleReduireDocument = () => {

    navigate('./visarequiredocument');

  }

  const handleVisaDocumentType = () => {

    navigate('./visadocumenttype');

  }




  const handlePackage = () => {
    setShowAgentData(true);
    navigate('./packageEnquary');

  }

  const handleHome = () => {
    setShowHome(true)
    navigate("/subAdmin/dashboard")
  }

  const handleLogout = () => {
    dispatch(subAdminLogout());
    navigate('/subAdminLogin');

  };

  const handleLogoutConfirm = () => {
    handleLogout();
    setLogoutDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUserCancel, setAnchorElUserCancel] = useState(null);
  const [anchorElAgentChange, setAnchorElAgentChange] = useState(null);
  const [anchorElUserChange, setAnchorElUserChange] = useState(null);
  const [anchorElUserBooking, setAnchorElUserBooking] = useState(null);
  const [anchorElAgentBooking, setAnchorElAgentBooking] = useState(null);
  const [visaBooking, setVisaBooking] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  const [showNotification, setSetShowNotification] = useState(false);
  const [showNotificationIcon, setSetShowNotificationIcon] = useState(false);
  const showNotificationRef = useRef(null);
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
    // handleMenuItemClick("Packageenquiry");
    handlePackage();
    setSetShowNotification(false);


  };
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

  const handleUserBooking = (event) => {
    setAnchorElUserBooking(event.currentTarget);
  };
  const handleAgentBooking = (event) => {
    setAnchorElAgentBooking(event.currentTarget);
  };
  const handleVisaBooking = (event) => {
    setVisaBooking(event.currentTarget);
  };

  const handleAgentCancel = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickUserChange = (event) => {
    setAnchorElUserChange(event.currentTarget);
  };

  const handleClickUserCancel = (event) => {
    setAnchorElUserCancel(event.currentTarget);
  };

  const handleClickAgentChange = (event) => {
    setAnchorElAgentChange(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElUserBooking(null);
    setAnchorElUserCancel(null);
    setAnchorElAgentChange(null);
    setAnchorElUserChange(null);
    setAnchorElAgentBooking(null);
    setVisaBooking(null);
  };


  const drawer = (
    <div style={{ backgroundColor: "#E73C33", height: "100vh", overflowY: "scroll" }}>
      <div className="logo-container">
        <img src={newlogo} alt="" style={{ width: '100%' }} />
      </div>
      <List>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleHome}>
            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Home</ListItemText>
          </ListItemButton>
        </ListItem>

        {access === "AGENT_MANAGER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Table</ListItemText>


          </ListItemButton>
        </ListItem>}



        {access === "USER_MANAGER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleUserTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Table</ListItemText>


          </ListItemButton>
        </ListItem>}

        {access === "REQUEST_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentRequest}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Request Table</ListItemText>


          </ListItemButton>
        </ListItem>}

        {/* <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleSubadminTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>SubAdmin Table</ListItemText>


          </ListItemButton>
        </ListItem> */}




        {access === "REQUEST_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentCancel}>
            <DomainIcon style={{ color: "white", fontSize: "10px", marginRight: "2px" }} />
            <ListItemText style={{ color: "white" }}>B2B Cancel Request</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleAgentFlightCancel()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Cancel
          </MenuItem>
          <MenuItem onClick={() => handleAgentBusCancel()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Cancel
          </MenuItem>
          <MenuItem onClick={() => handleAgentHotelCancel()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Cancel
          </MenuItem>
        </Menu>


        {access === "REQUEST_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickUserCancel}>
            <PersonPinIcon style={{ color: "white", fontSize: "40px" }} />
            <ListItemText style={{ color: "white" }}>B2C Cancel Request</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorElUserCancel}
          open={Boolean(anchorElUserCancel)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleUserFlightCancel()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Cancel
          </MenuItem>
          <MenuItem onClick={() => handleUserBusCancel()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Cancel
          </MenuItem>
          <MenuItem onClick={() => handleUserHotelCancel()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Cancel
          </MenuItem>
        </Menu>





        {access === "REQUEST_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", flexWrap: "wrap", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickAgentChange}>
            <DomainIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "1px", fontSize: "15px" }}>B2B Change Request</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorElAgentChange}
          open={Boolean(anchorElAgentChange)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleAgentFlightChange()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Change
          </MenuItem>
          <MenuItem onClick={() => handleAgentBusChange()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Change
          </MenuItem>
          <MenuItem onClick={() => handleAgentHotelChange()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Change
          </MenuItem>
        </Menu>



        {access === "REQUEST_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickUserChange}>
            <PersonPinIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "1px", fontSize: "15px" }}>B2C Change Request</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorElUserChange}
          open={Boolean(anchorElUserChange)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleUserFlightChange()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Change
          </MenuItem>
          <MenuItem onClick={() => handleUserBusChange()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Change
          </MenuItem>
          <MenuItem onClick={() => handleUserHotelChange()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Change
          </MenuItem>
        </Menu>


        {access === "BOOKING_MANAGER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleUserBooking}>
            <PersonPinIcon style={{ color: "white", fontSize: "30px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>B2C Booking</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorElUserBooking}
          open={Boolean(anchorElUserBooking)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleUserFlightBooking()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Booking
          </MenuItem>
          <MenuItem onClick={() => handleUserBusBooking()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Booking
          </MenuItem>
          <MenuItem onClick={() => handleUserHotelBooking()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Booking
          </MenuItem>
        </Menu>


        {access === "BOOKING_MANAGER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentBooking}>
            <DomainIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>B2B Booking</ListItemText>
          </ListItemButton>
        </ListItem>}
        <Menu
          anchorEl={anchorElAgentBooking}
          open={Boolean(anchorElAgentBooking)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleAgentFlightBooking()}>
            <FlightIcon style={{ marginRight: "10px" }} />
            Flight Booking
          </MenuItem>
          <MenuItem onClick={() => handleAgentBusBooking()}>
            <DirectionsBusIcon style={{ marginRight: "10px" }} />
            Bus Booking
          </MenuItem>
          <MenuItem onClick={() => handleAgentHotelBooking()}>
            <HotelIcon style={{ marginRight: "10px" }} />
            Hotel Booking
          </MenuItem>
        </Menu>

        {/* <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleMarkUpAmount}>
            <AttachMoneyIcon style={{ color: "white", fontSize: "30px" }} /> 
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Markup Amount</ListItemText>
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleFixedDeparture}>
            <AirplaneTicketIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>FixedDeparture</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleFixedDepartureControl}>
            <AirplanemodeActiveIcon sx={{ color: "white", fontSize: "12px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>FixedDeparture Control</ListItemText>
          </ListItemButton>
        </ListItem> */}

        {access === "ADS_HANDLER" && <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAdvertisment}>
            <WebIcon sx={{ color: "white", fontSize: "1rem" }} />
            <ListItemText style={{ color: "white", marginLeft: "10" }}>Advertisement</ListItemText>
          </ListItemButton>
        </ListItem>}
        {access === "ADS_HANDLER" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handleWebadvertisement}>
              <HomeOutlinedIcon sx={{ color: "white", fontSize: "1.2rem" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>Webadvertisement</ListItemText>
            </ListItemButton>
          </ListItem>}

        {access === "EVENT_HANDLER" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handleEvents}>
              <WebIcon sx={{ color: "white", fontSize: "15px" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>Events</ListItemText>
            </ListItemButton>
          </ListItem>}

        {access === "PACKAGE_HANDLER" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handleHolidayPackage}>
              <WebIcon sx={{ color: "white", fontSize: "15px" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>Edit Holiday Package</ListItemText>
            </ListItemButton>
          </ListItem>}
        {access === "USER_MANAGER" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handleSearchData}>
              <PersonSearchIcon sx={{ color: "white", fontSize: "15px" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>SearchData</ListItemText>
            </ListItemButton>
          </ListItem>}
        {access === "PACKAGE_HANDLER" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handlePackage}>

              <InventoryIcon sx={{ color: "white", fontSize: "15px" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>Package Enquiry</ListItemText>
            </ListItemButton>
          </ListItem>}
        {access === "VISA_PROCESSING" &&
          <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
            <ListItemButton onClick={handleVisaBooking}>

              <FaPassport style={{ color: "white", fontSize: "15px" }} />
              <ListItemText style={{ color: "white", marginLeft: "5px" }}>Visa Booking</ListItemText>
            </ListItemButton>
          </ListItem>}
        <Menu
          anchorEl={visaBooking}
          open={Boolean(visaBooking)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleVisaCategory()}>
            <CategoryIcon style={{ marginRight: "10px" }} />
            Visa Category
          </MenuItem>
          <MenuItem onClick={() => handleVisaCountry()}>
            <PublicIcon style={{ marginRight: "10px" }} />
            Visa Country
          </MenuItem>
          <MenuItem onClick={() => handleVisaDocumentType()}>
            <DescriptionIcon style={{ marginRight: "10px" }} />
            Visa Document type
          </MenuItem>
          <MenuItem onClick={() => handleVisaDocumentCategory()}>
            <DescriptionIcon style={{ marginRight: "10px" }} />
            Visa Document Category
          </MenuItem>
          <MenuItem onClick={() => handleReduireDocument()}>
            <DescriptionIcon style={{ marginRight: "10px" }} />
            Require Document
          </MenuItem>
        </Menu>

        {/* handleUserBooking */}

      </List>

    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleIconClick = () => {
    setIsBoxOpen(true);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* topnavbar */}

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ backgroundColor: '#E73C33' }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="user"
            onClick={handleIconClick}

          >
            <SupervisorAccount />
          </IconButton>
          {isBoxOpen && (
            <div
              style={{
                position: 'absolute',
                top: '40px', // Adjust as needed to position the box below the icon
                left: '0',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                zIndex: '999', // Ensure the box appears above other elements
              }}
            >
              {/* <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleAddSubadmin}> Add subadmin </Typography> */}
              {access === "REQUEST_HANDLER" && <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleAddAdgent}> Add Agent </Typography>}
              {access === "ADS_HANDLER" && <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleAddAdvertisment}> Add Advertisement</Typography>}
              {access === "ADS_HANDLER" && <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleWebAdvertisment}> Add WebAdvertisement </Typography>}
              {access === "EVENT_HANDLER" && <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleAddEvents}> Add Events </Typography>}
              {/* <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleMarkup}> Add Markup </Typography> */}
              <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleCoupons}> Add Coupon </Typography>
              {access === "ADS_HANDLER" && <Typography sx={{ color: "black", cursor: "pointer" }} onClick={handleNotification}> Add Notification </Typography>}
              <button
                onClick={() => setIsBoxOpen(false)}
                style={{
                  border: "1px solid #E73C33",
                  borderRadius: "4px",
                  backgroundColor: "#E73C33",
                  color: "#fff",
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  outline: "none",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                Close
              </button>

            </div>
          )}



          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {access === "VISA_PROCESSING" && <div> <InputLabel
              id="dropdown-label"
              style={{ padding: "2px", color: "white", fontSize: "18px", marginLeft: "20px" }}
            >
              Visa:
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
                    onClick={handleVisaCountryForm}
                  >
                    Visa Country
                  </MenuItem>
                  <MenuItem
                    value="option2"
                    onClick={handleVisaCategoryForm}
                  >
                    Visa Category
                  </MenuItem>
                  <MenuItem
                    value="option3"
                    onClick={handleVisaCountrysForm}
                  >
                    Document Type
                  </MenuItem>
                  <MenuItem
                    value="option4"
                    onClick={handleVisadocumentsCategory}
                  >
                    Document Category
                  </MenuItem>
                  <MenuItem
                    value="option5"
                    onClick={handleRequireDocuemts}
                  >
                    Required Documents
                  </MenuItem>
                </Select>
              </FormControl></div>}
            {/* <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            sx={{ ml: 'auto' }}
            onClick={() => setLogoutDialogOpen(true)}
          >
            <ExitToAppIcon />
          </IconButton> */}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "60px" }}>

              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <div onClick={() => setSetShowNotification((pre) => !pre)} onMouseOver={() => setSetShowNotificationIcon(true)} onMouseLeave={() => setSetShowNotificationIcon(false)} >{showNotificationIcon ? <IoIosNotificationsOutline size='24px' color="white" /> : <IoIosNotifications size='24px' color="white" />}</div>
                <div style={{
                  position: 'absolute',
                  color: '#f8f1f1fc',
                  background: "#E73C33",
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
                  {notificationData?.length === 0 ? <div style={{ color: "#E73C33" }}>Stay in touch! You will find all the new updates here</div> : notificationData?.map((item) => (
                    <div
                      onClick={() => {
                        handleNotificationClick(item._id)
                      }}
                      className="SubAdminNotificationContainer_innerDev"
                      style={{
                        display: "flex", backgroundColor: `${!item?.isRead ? "#fdfdfdcf" : "#fdfdfdcf"}`, borderRadius: "4px", margin: '5px 7px', paddingBottom: "5px",
                        // backgroundColor:"#ffffff8c"

                      }}>
                      <div >
                        <div style={{ width: "30px", height: "30px", borderRadius: '2px', background: "#e73c33ad", display: "flex", justifyContent: "center", alignItems: "center", margin: '5px', marginTop: "20px" }}>
                          <PiBackpackThin />
                        </div>
                      </div>
                      <div style={{ paddingLeft: "3px" }}>
                        <div style={{ fontSize: "12px", color: "#e73c33ad" }} >{timeAgo(item?.updatedAt)}</div>
                        <div style={{ fontSize: "18px", color: "#E73C33" }}>{item?.title}</div>
                        <div style={{ fontSize: "13px", color: "#e73c33ad" }}>{item?.description}</div>

                      </div>
                    </div>
                  ))}
                </div>}
              </div>
              <IconButton
                color="inherit"
                aria-label="logout"
                edge="end"
                sx={{ ml: 'auto' }}
                onClick={() => setLogoutDialogOpen(true)}
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* topnavbar */}

      {/* sidebar */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >


        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>



      </Box>

      {/* sidebar */}


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          {homeView && <Home />}

        </Typography>
        <Typography paragraph>
          {agentTableView && <Agenttable />}
        </Typography>
        <Typography paragraph>
          {subadminTableView && <SubadminAll />}
        </Typography>
        <Typography paragraph>
          {markupAmount && <MarkupAmount />}
        </Typography>
        <Typography paragraph>
          {agentUserView && <Usertable />}
        </Typography>
        <Typography paragraph>
          {agentRequestView && <AgentRequest />}
        </Typography>
        <Typography paragraph>
          {agentflightCancel && <AgentFlightCancel />}
        </Typography>
        <Typography paragraph>
          {agenthotelCancel && <AgentHotelCancel />}
        </Typography>
        <Typography paragraph>
          {agentbusCancel && <AgentBusCancel />}
        </Typography>
        <Typography paragraph>
          {userflightCancel && <UserFlightCancel />}
        </Typography>
        <Typography paragraph>
          {userhotelCancel && <UserHotelCancel />}
        </Typography>
        <Typography paragraph>
          {userbusCancel && <UserBusCancel />}
        </Typography>

        <Typography paragraph>
          {agentflightChange && <AgentChangeFlight />}
        </Typography>
        <Typography paragraph>
          {agenthotelChange && <AgentChangeHotel />}
        </Typography>
        <Typography paragraph>
          {agentbusChange && <AgentChangeBus />}
        </Typography>
        <Typography paragraph>
          {userflightChange && <UserChangeFlight />}
        </Typography>
        <Typography paragraph>
          {userhotelChange && <UserChangeHotel />}
        </Typography>
        <Typography paragraph>
          {userbusChange && <UserChangeBus />}
        </Typography>


        <Typography paragraph>
          {AgentflightBooking && <AgentFlightBooking />}
        </Typography>

        <Typography paragraph>
          {AgenthotelBooking && <AgentHotelBooking />}
        </Typography>

        <Typography paragraph>
          {AgentbusBooking && <AgentBusBooking />}
        </Typography>


        <Typography paragraph>
          {userflightBooking && <UserFlightBooking />}
        </Typography>

        <Typography paragraph>
          {userhotelBooking && <UserHotelBooking />}
        </Typography>

        <Typography paragraph>
          {userbusBooking && <UserBusBooking />}
        </Typography>
        <Typography paragraph>
          {fixedDeparture && <FixedDeparture />}
        </Typography>
        <Typography paragraph>
          {addSubadmin && <AddSubadmin />}
        </Typography>

        <Typography paragraph>
          {addAgent && <AddAgent />}
        </Typography>
        <Typography paragraph>
          {addAdvertisements && <AddAdvertisement />}
        </Typography>

        <Typography paragraph>
          {addwebAdvertisements && <AddWebAdvertisement />}
        </Typography>



        {/* addsubadmin */}
        <Typography paragraph>
          {fixedDeparturecontrol && <FixedDepartureControlSub />}
        </Typography>


        <Typography paragraph>
          {advertisement && <Advertisement />}
        </Typography>

        <Typography paragraph>
          {webadvertisement && <Webadvertisement />}
        </Typography>

        <Typography paragraph>
          {getevent && <EventGet />}
        </Typography>

        <Typography paragraph>
          {searchdata && <SearchData />}
        </Typography>
        <Typography paragraph>
          {packageEnquary && <PackageEnquary />}
        </Typography>
        <Typography paragraph>
          {visacategory && <Visacategory />}
        </Typography>

        <Typography paragraph>
          {visacountry && <VisaCountry />}
        </Typography>
        <Typography paragraph>
          {visaCategorysform && <Visacategorys />}
        </Typography>

        <Typography paragraph>
          {requiredocuments && <RequireddocumentFrom />}
        </Typography>


        <Typography paragraph>
          {visaCountryform && <Visacountryselect />}
        </Typography>
        <Typography paragraph>
          {visaCountrysform && <VisacountrysForm />}
        </Typography>

        <Typography paragraph>
          {visadocumenttype && <VisaDocumenttype />}
        </Typography>

        <Typography paragraph>
          {visadocumentcategory && <VisaDocumentCategory />}
        </Typography>

        <Typography paragraph>
          {visarequiredocument && <VisaRequireDoc />}
        </Typography>

        <Typography paragraph>
          {addCouponscode && <AddCoupons />}
        </Typography>
        <Typography paragraph>
          {addNotification && <AddNotification />}
        </Typography>

        <Typography paragraph>
          {addMarkup && <AddMarkup />}
        </Typography>
        <Typography paragraph>
          {addEvent && <AddEvent />}
        </Typography>

        <Typography paragraph>
          {visadocumentsCategorys && <Documentcategorys />}
        </Typography>





        <Typography paragraph>
          {holidayPackage && <PackageDetails />}
        </Typography>
        <Typography paragraph>
          {/* {visacountry && <VisaCountryform />} */}
          {menuData === "Documenttype" && <Visacountryselect />}
        </Typography>







      </Box>




      <div>





        <Dialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Logout'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleLogoutConfirm()} autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
export default ResponsiveDrawer;




