// LoadingSpinner.js
import React from "react";
import loadingGif from "../../src/Images/onload.gif";
import "./loadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <img src={loadingGif} alt="Loading" className="loading-gif" />
        </div>
    );
};

export default LoadingSpinner;