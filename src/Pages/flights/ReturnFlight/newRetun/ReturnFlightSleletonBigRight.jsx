import React from "react";
import logo from "../../../../../src/Images/The hawai yatra final logo.png";

const ReturnFlightSleletonBigRight = ({ text }) => {
  return (
    
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-500 bg-opacity-30 backdrop-blur-sm">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-20 mb-4 animate-pulse" />
      {/* Text */}
      <p className="text-lg font-semibold text-center text-primary-6000">
        {text}
      </p>
    </div>
  );
};

export default ReturnFlightSleletonBigRight;