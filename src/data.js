// import { fontSize } from "@mui/system";

// export const InnerBarLogo = [
//   {
//     avatar: require("./Images/flight.png"),
//     name: "Flights",
//     path: "/flights",
//   },
//   {
//     avatar: require("./Images/hotelbed.png"),
//     name: "Hotels",   
//     path: "/hotel",
//   },
 
//   {
//     avatar: require("./Images/beach-chair.png"),
//     name: "Islandhopper",
//     path: "/holidaypackage",
//   },
 
//   {
//     avatar: require("./Images/schoolbus.png"),
//     name: "Transfer",
//     path: "/bus", 
//   },
//   {
//     avatar: require("./Images/binoculars.png"),
//     name: "Sightseeing",
//     path: "/sightseeing",
//   },

//   {
//     avatar: require("./Images/passport.png"),
//     name: "Visa",
//     path: "/visa",
//   },
//   {
//     avatar: require("./Images/Safety.png"),
//     name: "Insurance",
//     path: "/visa",
//   },
//   {
//     avatar: require("./Images/group.png"),
//     name: "Administration",
//     path: "/Account",
//   }
  
// ];
import React from 'react';
import {
  FaPlane, // Flight icon
  FaHotel, // Hotel icon
  // Add more icons here for other items
  FaPackage, // Islandhopper icon
  FaBus, // Transfer icon
  FaBinoculars, // Sightseeing icon
  FaPassport, // Visa icon
  FaShieldAlt, // Insurance icon
  FaUser, // Administration icon
} from 'react-icons/fa'; // You need to import the specific icons you want to use
import { GiCardboardBox } from 'react-icons/gi';

export const InnerBarLogo = [
  {
    avatar: <FaPlane />,
    name: "Flights",
    path: "/flights",
  },
  {
    avatar: <FaHotel />,
    name: "Hotels",
    path: "/hotel",
  },
  // Add more items with icons as needed
  {
    avatar: <GiCardboardBox />,
    name: "Package",
    path: "/holidaypackage",
  },
  {
    avatar: <FaBus />,
    name: "Bus",
    path: "/bus",
  },
  // {
  //   avatar: <FaBinoculars />,
  //   name: "Sightseeing",
  //   path: "/sightseeing",
  // },
  {
    avatar: <FaPassport />,
    name: "Visa",
    path: "/visa",
  },
  // {
  //   avatar: <FaShieldAlt />,
  //   name: "Insurance",
  //   path: "/insurance",
  // },
  {
    avatar: <FaUser />,
    name: "Administration",
    path: "/Administration",
  }
];


