import React, { useEffect, useState } from "react";
import "./hotelstepper.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Hotelform from "./Hotelform";

const Hotelstepper = () => {
 
 
  return (
    <div
      className="container-fluids "
      id="margin-pecentage-large-hotel"
      style={{width:"100%" }}
    >
      <div>
        <Hotelform />
        {/* <Loader /> */}
      </div>
    </div>
  );
};

export default Hotelstepper;

