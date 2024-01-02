import scan from "../Images/scan.png";
import React, { useState, useEffect } from "react";
import google from "../Images/google.png"
import app from "../Images/app.png"
import "./Download.css"


const Download = () => {




    return (

        <section className="">
            <div className="container-fluid p-0">
                <div className="qrBox">
                    <div className="qrTextDownload">
                        <div className="downloadHeading">
                            <h3>Download <br /> Our New App</h3>
                        </div>
                        {/* <p>Use code <span>WELCOMESKY</span> and get Up to <span>Rs.5000 OFF</span> on your first domestic hotel booking</p> */}
                        <div className="allImgDownload">
                            <div className="ourQr">
                                <div className="scanPoly"
                                >
                                    <p>Scan Me</p>
                                </div>
                                <img src={scan} className="scan-logo" alt="scan logo" />
                            </div>
                            <div className="PlayQr">
                                <a href="https://play.google.com/store/apps/details?id=com.skytrails" target="_blank">
                                    <img src={google} alt="playstore" />
                                </a>
                                <img src={app} alt="applestore" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Download;
