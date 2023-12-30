import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  makeStyles,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { NavLink } from 'react-router-dom';
import { InnerBarMoreLogo } from '../../src/data1.js';
import add from '../Images/FlightImages/add.png';

const useStyles = makeStyles({
  button: {
    height: '50px',
    borderRadius: '8px',
    border: '2px solid #2980b9',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    padding: '0 20px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  image: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  menu: {
    marginTop: '68px',
    marginLeft:'-10px'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',

  },
  menuItemText: {
    borderRadius: '8px',
    fontWeight: 'bold',
    width:'80px',
    textAlign:'center',
    boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"

  },
});

const Dropdown = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
         width:'85px',
          height: '80px',
         borderRadius: '8px',
          
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '18px',
          transition: 'background-color 0.3s ease-in-out',
        }}
      >
        <img src={add} alt="" style={{width:'90%',height:'40px'}}/>
      </Button> */}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        {InnerBarMoreLogo.map(({ name, path }, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            className={classes.menuItem}
          >
           
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? 'active-nav logoname' : 'logoname'
              }
              style={{
                textDecoration: 'none',
                color: '#252525',
                font: 'Quicksand, Bold',
              }}
            >
              <Typography variant="body1" className={classes.menuItemText}>
                {name}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
