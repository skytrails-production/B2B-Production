import React, { useState } from "react";
import Admini from "../../Images/Admin.svg";
import { useNavigate } from "react-router-dom";
import "./Administration.css";
import { motion } from "framer-motion";



const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};


const Administration = () => {



  const [hovered, setHovered] = useState({
    Services: false,
    Accounts: false,
    Reports: false,
    Queues: false,
    GST: false,
    Service_Request: false,
    Forex: false,
    AgentPackages:false
  });

  const handleHover = (item) => {
    setHovered((prev) => ({ ...prev, [item]: true }));
  };

  const handleHoverLeave = (item) => {
    setHovered((prev) => ({ ...prev, [item]: false }));
  };



  const navigate = useNavigate();
  const Services = () => {
    navigate("/Services");
  };
  const Accounts = () => {
    navigate("/accounts");
  };
  const Reports = () => {
    navigate("/Reports");
  };
  const Queues = () => {
    navigate("/Queue");
  };
  const GST = () => {
    navigate("/GST");
  };
  const Service_Request = () => {
    navigate("/ServiceRequest");
  };
  const Forex = () => {
    navigate("/Forex");
  };

  const AgentPackages=()=>{
    navigate("/holidayPackages");
  }
  return (

    <div className="container-fluid " id="margin-pecentage-large">
      <div className="administrationBoxMain">
        <motion.div className="row" variants={variants} initial="initial"
          whileInView="animate">
          <motion.div className="col-lg-3" variants={variants}>
            <div className="adminsImg">
              <img src={Admini} alt="" />
            </div>
          </motion.div>
          {/* <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Services}><p >Services</p></div>
          </motion.div> */}
          <motion.div
            className="col-lg-3"
            variants={variants}
            onMouseEnter={() => handleHover("Services")}
            onMouseLeave={() => handleHoverLeave("Services")}
          >
            <div>
              <p>{hovered.Services ? "Coming Soon" : "Services"}</p>
            </div>
          </motion.div>
          <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Accounts}><p >Accounts</p></div>
          </motion.div>
          
          <motion.div className="col-lg-3" variants={variants}>
            <div onClick={AgentPackages}><p >My Packges</p></div>
          </motion.div>
          {/* <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Reports}><p >Reports</p></div>
          </motion.div> */}

          <motion.div
            className="col-lg-3"
            variants={variants}
            onMouseEnter={() => handleHover("Reports")}
            onMouseLeave={() => handleHoverLeave("Reports")}
          >
            <div>
              <p>{hovered.Reports ? "Coming Soon" : "Reports"}</p>
            </div>
          </motion.div>
          <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Queues}><p  >Bookings</p></div>
          </motion.div>
          {/* <motion.div className="col-lg-3" variants={variants}>
            <div onClick={GST}><p >GST</p></div>
          </motion.div>
          <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Service_Request}><p>Service Request</p></div>
          </motion.div>
          <motion.div className="col-lg-3" variants={variants}>
            <div onClick={Forex}><p >Forex</p></div>
          </motion.div> */}
          <motion.div
            className="col-lg-3"
            variants={variants}
            onMouseEnter={() => handleHover("GST")}
            onMouseLeave={() => handleHoverLeave("GST")}
          >
            <div>
              <p>{hovered.GST ? "Coming Soon" : "GST"}</p>
            </div>
          </motion.div>

          <motion.div
            className="col-lg-3"
            variants={variants}
            onMouseEnter={() => handleHover("Service_Request")}
            onMouseLeave={() => handleHoverLeave("Service_Request")}
          >
            <div>
              <p>{hovered.Service_Request ? "Coming Soon" : "Service Request"}</p>
            </div>
          </motion.div>
          <motion.div
            className="col-lg-3"
            variants={variants}
            onMouseEnter={() => handleHover("Forex")}
            onMouseLeave={() => handleHoverLeave("Forex")}
          >
            <div>
              <p>{hovered.Forex ? "Coming Soon" : "Forex"}</p>
            </div>
          </motion.div>


        </motion.div>
      </div>
    </div>
  );
};

export default Administration;
