import React from "react";
import CustomSlider from "./components/custom.slider";
import Images from "./images";
import "./styles.css";

export default function Slider() {
  return (
    <div className="App">
      <CustomSlider>
        {Images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} style={{height:"450px"}}/>
        })}
      </CustomSlider>
    
    </div>
  );
}
