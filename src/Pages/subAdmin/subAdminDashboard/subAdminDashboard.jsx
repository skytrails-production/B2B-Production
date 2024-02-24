import * as React from "react";
import { useEffect, useState } from "react";
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

import { SupervisorAccount } from '@mui/icons-material'; // Import the SupervisorAccount icon
import AddSubadmin from "./Addforms/AddSubadmin";
import AddAgent from "./Addforms/AddAgent";
import AddAdvertisement from "./Addforms/AddAdvertisement";
import CategoryIcon from '@mui/icons-material/Category'; // Import the CategoryIcon component
import PublicIcon from '@mui/icons-material/Public'; // Import the PublicIcon component
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddCoupons from "./Addforms/AddCoupons";
import AddNotification from "./Addforms/AddNotification";
import AddWebAdvertisement from "./Addforms/AddWebAdvertisement";
import DomainIcon from '@mui/icons-material/Domain';
import DescriptionIcon from '@mui/icons-material/Description'; // Import the DescriptionIcon component

import { FaPassport } from "react-icons/fa";
const drawerWidth = 240;
function ResponsiveDrawer(props) {



  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAgentData, setShowAgentData] = React.useState(false);
  const [showHome, setShowHome] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [markupData, setShowMarkupData] = React.useState(false);
  const [fixedDepartures, setfixedDeparture] = React.useState(false);

  const [fixedDeparturescontrol, setfixedDepartureControl] = React.useState(false);
  const [advertisements, setAdvertisement] = React.useState(false);

  const [webadvertisements, setwebadvertisement] = React.useState(false);
  const [addsubadmin, setaddSubadmins] = useState(false);
  const [addAgents, setaddAgents] = useState(false);
  const [addwebAdvertisement, setwebaddAdvertisement] = useState(false);
  const homeView = location.pathname === "/subAdmin/dashboard";
  const agentTableView = location.pathname === "/subAdmin/dashboard/Agenttable";
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

  const fixedDeparturecontrol = location.pathname === "/subAdmin/dashboard/fixedDeparturecontrol";

  const advertisement = location.pathname === "/subAdmin/dashboard/advertisement";
  const webadvertisement = location.pathname === "/subAdmin/dashboard/webadvertisement";

  const getevent = location.pathname === "/subAdmin/dashboard/getevent";
  const searchdata = location.pathname === "/subAdmin/dashboard/searchdata";

  const packageEnquary = location.pathname === "/subAdmin/dashboard/packageEnquary";
  const visacategory = location.pathname === "/subAdmin/dashboard/visacategory";
  const visacountry = location.pathname === "/subAdmin/dashboard/visacountry";
  const visadocumenttype = location.pathname === "/subAdmin/dashboard/visadocumenttype";
  const visadocumentcategory = location.pathname === "/subAdmin/dashboard/visadocumentcategory";
  const visarequiredocument = location.pathname === "/subAdmin/dashboard/visarequiredocument";


  // handleVisaCategory


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAgentTable = () => {
    setShowAgentData(true);
    navigate('./Agenttable');

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

  const handleAddAdvertisment = () => {
    setAdvertisement(true);
    navigate('/subAdmin/dashboard/addAdvertisements')
  }

  const handleWebAdvertisment = () => {
    setwebaddAdvertisement(true);
    navigate('/subAdmin/dashboard/addwebAdvertisements')
  }


  const handleAddAdgent = () => {
    setaddAgents(true);
    navigate('/subAdmin/dashboard/addagent')
  }
  const handleFixedDepartureControl = () => {
    setfixedDepartureControl(true);
    navigate('./fixedDeparturecontrol');

  }


  const handleUserTable = () => {
    setShowAgentData(true);
    navigate('./Usertable');

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
    <div style={{ backgroundColor: "#E73C33", height: "auto" }}>
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

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Table</ListItemText>


          </ListItemButton>
        </ListItem>



        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleUserTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Table</ListItemText>


          </ListItemButton>
        </ListItem>


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentCancel}>
            <DomainIcon style={{ color: "white", fontSize: "10px", marginRight: "2px" }} />
            <ListItemText style={{ color: "white" }}>B2B Cancel Request</ListItemText>
          </ListItemButton>
        </ListItem>
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickUserCancel}>
            <PersonPinIcon style={{ color: "white", fontSize: "40px" }} />
            <ListItemText style={{ color: "white" }}>B2C Cancel Request</ListItemText>
          </ListItemButton>
        </ListItem>
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





        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", flexWrap: "wrap", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickAgentChange}>
            <DomainIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "1px", fontSize: "15px" }}>B2B Change Request</ListItemText>
          </ListItemButton>
        </ListItem>
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



        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleClickUserChange}>
            <PersonPinIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "1px", fontSize: "15px" }}>B2C Change Request</ListItemText>
          </ListItemButton>
        </ListItem>
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleUserBooking}>
            <PersonPinIcon style={{ color: "white", fontSize: "30px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>B2C Booking</ListItemText>
          </ListItemButton>
        </ListItem>
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAgentBooking}>
            <DomainIcon style={{ color: "white", fontSize: "10px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>B2B Booking</ListItemText>
          </ListItemButton>
        </ListItem>
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

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleMarkUpAmount}>
            <AttachMoneyIcon style={{ color: "white", fontSize: "30px" }} /> {/* Replace GroupIcon with AttachMoneyIcon */}
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Markup Amount</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
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
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleAdvertisment}>
            <WebIcon sx={{ color: "white", fontSize: "1rem" }} />
            <ListItemText style={{ color: "white", marginLeft: "10" }}>Advertisement</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleWebadvertisement}>
            <HomeOutlinedIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Webadvertisement</ListItemText>
          </ListItemButton>
        </ListItem>


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleEvents}>
            <WebIcon sx={{ color: "white", fontSize: "15px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Events</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleSearchData}>
            <PersonSearchIcon sx={{ color: "white", fontSize: "15px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>SearchData</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handlePackage}>
            
            <InventoryIcon sx={{ color: "white", fontSize: "15px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Package Enquiry</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px", paddingLeft: "0px" }}>
          <ListItemButton onClick={handleVisaBooking}>

            <FaPassport  style={{ color: "white", fontSize: "15px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Visa Booking</ListItemText>
          </ListItemButton>
        </ListItem>
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
        <Toolbar>
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
              <Typography sx={{ color: "black" }} onClick={handleAddSubadmin}> Add subadmin </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdgent}> Add Agent </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdvertisment}> Add Advertisement</Typography>
              <Typography sx={{ color: "black" }} onClick={handleWebAdvertisment}> Add WebAdvertisement </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdvertisment}> Add Events </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdvertisment}> Add Markup </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdvertisment}> Add Coupon </Typography>
              <Typography sx={{ color: "black" }} onClick={handleAddAdvertisment}> Add Notification </Typography>
              <button onClick={() => setIsBoxOpen(false)}>Close</button>
            </div>
          )}
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            sx={{ ml: 'auto' }}
            onClick={() => setLogoutDialogOpen(true)}
          >
            <ExitToAppIcon />
          </IconButton>
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
          {visadocumenttype && <VisaDocumenttype />}
        </Typography>

        <Typography paragraph>
          {visadocumentcategory && <VisaDocumentCategory />}
        </Typography>

        <Typography paragraph>
          {visarequiredocument && <VisaRequireDoc />}
        </Typography>




      </Box>






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
          <Button onClick={handleLogoutConfirm} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
export default ResponsiveDrawer;




