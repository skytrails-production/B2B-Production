import React from "react";
import MyPackages from './MyPackages';
import "./Queue.css";
import SearchIcon from "../../Images/search.svg";

// const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";
const HolidayPackages = () => {
 
  return (
    <>
      <div className="container-fluid margin-pecentage">
        
        <div className="main-search">
          <div className="heading">
            <h3>Your Packages</h3>
          </div>
        </div>
        <MyPackages />
      </div>
    </>
  );
};

export default HolidayPackages;
