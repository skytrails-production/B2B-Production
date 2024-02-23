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
const drawerWidth = 240;
function ResponsiveDrawer(props) {



  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAgentData, setShowAgentData] = React.useState(false);
  const [showHome, setShowHome] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();


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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAgentTable = () => {
    setShowAgentData(true);
    navigate('./Agenttable');

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
  const [booking, setUSerBooking] = useState(null);


  const handleUserBooking = (event) => {
    setAnchorElUserBooking(event.currentTarget);
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
  };


  const drawer = (
    <div style={{ backgroundColor: "#E73C33", height: "100%" }}>
      <div className="logo-container">
        <img src={newlogo} alt="" style={{ width: '100%' }} />
      </div>
      <List>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleHome}>
            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Home</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleAgentTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Table</ListItemText>


          </ListItemButton>
        </ListItem>


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleUserTable}>

            <GroupIcon style={{ color: "white" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Table</ListItemText>


          </ListItemButton>
        </ListItem>


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleAgentCancel}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Cancel</ListItemText>
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleClickUserCancel}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Cancel</ListItemText>
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





        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleClickAgentChange}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Change</ListItemText>
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



        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleClickUserChange}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Change</ListItemText>
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleUserBooking}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>User Booking</ListItemText>
          </ListItemButton>
        </ListItem>
        <Menu
          anchorEl={anchorElUserBooking}
          open={Boolean(anchorElUserBooking)}
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


        <ListItem style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
          <ListItemButton onClick={handleUserBooking}>
            <ExpandMoreIcon style={{ color: "white", fontSize: "20px" }} />
            <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agent Booking</ListItemText>
          </ListItemButton>
        </ListItem>
        <Menu
          anchorEl={anchorElUserBooking}
          open={Boolean(anchorElUserBooking)}
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

        {/* handleUserBooking */}

      </List>

    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;


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
          <Typography variant="h6" noWrap component="div">
          </Typography>
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




