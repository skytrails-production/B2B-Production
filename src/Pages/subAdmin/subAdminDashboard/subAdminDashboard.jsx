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

import stlogo from "../../../Images/ST-Main-Logo.png";



import newlogo from "../../../Images/whitelogo1.png";
import Home from "./Home";
import Agenttable from "./Agenttable";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAgentTable = () => {
    setShowAgentData(true);
    navigate('./Agenttable');

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


  const drawer = (
    <div style={{ backgroundColor: "#E73C33",height:"100%" }}>
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

        
        <ListItem disablePadding>
      <ListItemButton>
            <GroupIcon style={{ color: "white" }} />
             <ListItemText style={{ color: "white", marginLeft: "5px" }}>Agents</ListItemText>
          </ListItemButton> 
       </ListItem> 
           



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




