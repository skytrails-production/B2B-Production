import React from "react";
import logo from "../Images/logoLoader.png";

const BlurredLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-300 bg-opacity-30 backdrop-blur-sm">
      {/* <img src={logo} className="h-20 mb-4 animate-pulse" alt="" /> */}
      {/* Text */}

      <div className="pulserEffect">
        <img src={logo} alt="Logo" className="h-20 mb-4 " />
      </div>
      <p className="text-lg font-semibold text-center text-black">
        Hold on! We are searching for the Hotels for you
      </p>
    </div>
  );
};

export default BlurredLoader;
