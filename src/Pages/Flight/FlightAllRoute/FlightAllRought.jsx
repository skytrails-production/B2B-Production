import React from "react";
import { Route, Routes } from "react-router-dom";
import AdvanceSearch from "../FlightForm/AdvanceSearch";
import Calander from "../FlightForm/Calendar";
import MultiStop from "../FlightForm/MultiStop";
import OffShare from "../FlightForm/OffShare";

import OneWay from "../FlightForm/OneWay";
import Return from "../FlightForm/Return";
import Flightresult from "../flightresult/Flightresult";
import Booknow from "../booknow/Booknow";
import FlightresultReturn from "../flightresult/FlightresultReturn/FlightresultReturn";

// import MultiStop from '../Flight/FlightForm/MultiStop'
// import Calander from '../Flight/FlightForm/Calander'
//  import Return from '../Flight/FlightForm/Return'
const FlightAllRoute = () => {
  return (
    <div>
      <Routes>
        {/* <Route exact path="/" element={<OneWay />} />
        <Route exact path="/oneway/*" element={<OneWay />}>
          {/* 
          <Route exact path="flightresult" element={<Flightresult />} /> */}

        {/* </Route>  */}

        <Route exact path="offshare" element={<OffShare />} />
        <Route exact path="multiStop" element={<MultiStop />} />
        <Route exact path="calenderfare" element={<Calander />} />
        <Route exact path="flightresult" element={<Flightresult />} />
        <Route exact path="flight/booknow" element={<Booknow />} />
        <Route exact path="return" element={<Return />} />
        <Route
          exact
          path="FlightresultReturn"
          element={<FlightresultReturn />}
        />

        <Route exact path="advanceSearch" element={<AdvanceSearch />} />
      </Routes>
    </div>
  );
};

export default FlightAllRoute;
