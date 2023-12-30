import React, { useState } from "react";
import "./InnerNavbar.css";
import { Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { InnerBarLogo } from "../data";
import color from "../color/color";

// Custom component to render the icon and name with the ability to access 'isActive'
function NavigationItem({ avatar, name, path, isActive }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "30px",
          color: isActive ? "white" : color.bluedark,
        }}
      >
        {avatar}
      </div>      <span
        style={{
          textAlign: "center",
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          color: isActive ? "white" : color.bluedark,
        }}
      >
        {name}
      </span>
    </div>
  );
}