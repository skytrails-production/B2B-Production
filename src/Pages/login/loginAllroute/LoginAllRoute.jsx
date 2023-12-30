import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./loginallroute.css";
import Login from "../Login";

const Hotelbookow = () => {
  return (
    <div className="mainBox">
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Hotelbookow;
