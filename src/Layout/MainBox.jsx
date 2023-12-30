

import React from "react";
import { InnerBarLogo } from "../data";
import { Link } from "react-router-dom";
import color from "../color/color";
import { useDispatch, useSelector } from "react-redux";
import "./maixBox.css"
import { motion } from "framer-motion";



const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};


function MainBox() {
  const reducerState = useSelector((state) => state);
  // console.log(reducerState, "jfglkdsja;edj");
  return (


    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="centeredBox"
    >
      <div className="centered-box-top">
        <p>Services We Provide</p>
      </div>
      {InnerBarLogo.map(({ avatar, name, path }, index) => (
        <Link to={path} key={index} style={{ textDecoration: "none" }}>
          <motion.div
            className={`centeredBox-content ${index === 0 || index === 1 || index === 3 || index === 4 ? 'border-right-dashed' : ''} ${index < 3 ? 'border-bottom' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}

              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.9
              }}
              className="centeredBox-avatar">{avatar}</motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}

              transition={{
                delay: 1,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.9
              }}
              className="centeredBox-name">{name}</motion.div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}

export default MainBox;
