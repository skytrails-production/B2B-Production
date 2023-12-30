import React from 'react'
import  "./Button.css"
import color from "../../src/color/color"
const Custombutton = ({title,type,onClick}) => {
  return (
    <>
      <button className="button" type={type} onClick={onClick} style={{backgroundColor:color.bluedark}}>
        <span className="button-content">{title} </span>
      </button>
    </>
  );
}

export default Custombutton