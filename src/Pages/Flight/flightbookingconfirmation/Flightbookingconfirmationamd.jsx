import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector, useReducer } from "react-redux";

function Flightbookingconfirmationamd() {
  const pnr = sessionStorage.getItem("PNR");
  const [jsonData, setJsonData] = useState("")
  // const navigate = Navigate();
  const { XMLParser } = require("fast-xml-parser");
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const location = useLocation();

  // const { savepnrvalue } = location.state || {};
  // console.log("savepnrvalue", savepnrvalue);


  // console.log("reducerstate",reducerState)

  // useEffect(() => {
  //   console.log("savepnrvalue", savepnrvalue);
  //   console.log("setJsonData",jsonData);
  // },[])


  // const xmldataconverter = () => {
  //   const parser = new XMLParser();
  //   const result = parser.parse(savepnrvalue);
  //   // console.log("result", result);

  //   let valueconvert;
  //   // Check if xmlData is not empty and if the expected property exists in the parsed result
  //   if (savepnrvalue !== "") {
  //     valueconvert =
  //       result["soapenv:Envelope"]["soapenv:Body"][
  //         "Air_SellFromRecommendationReply"
  //       ];
  //     setJsonData(valueconvert); // Assuming setJsonData is a state setter function
  //   }

  //   console.log("xmldataconverter", valueconvert);
  //   return valueconvert; 
  // };

  // useEffect(() =>{
  //   xmldataconverter()
  //   console.log("xmldata////////////////////////////////////",savepnrvalue);
  // },[savepnrvalue])

  // const { pnrvalue } = location.state;
  // // const handledata= ResultIndex;.
  // // console.log("handledata", ResultIndex);
  // const sesstioResultIndex = pnrvalue;
  // console.log("sesstioResultIndex",sesstioResultIndex);

  const Successbutton = () => {
    navigate("/flights");
    sessionStorage.removeItem("PNR");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          fontWeight: "bold",
          flexDirection:"column",
          gap:"12px"
        }}
      >
      <div>Thanks For Booking <br/>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Your PNR is:</div></div>
      
      <div>{pnr}</div>
      {/* <button onClick={Successbutton} style={{padding:"2px",borderRadius:"50%",backgroundColor:"#rgb(235,60,52)"}}>ok</button> */}
      <div className="flightDetButton" style={{ fontSize: "16px",padding:"2px",borderRadius:"50%",backgroundColor:"#rgb(235,60,52)" }}>
            <button
              style={{ fontSize: "16px" }}
              onClick={Successbutton}
              
            >
              {" "}OK
              
            </button>
          </div>
      </div>
    </>
  );
}

export default Flightbookingconfirmationamd;
