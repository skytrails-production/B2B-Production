import React, { useState } from "react";
import "./FlightTicket.css";
import HolidayChangeReq from "./HolidayChangeReq";
import { useSelector } from "react-redux";
import UploadLogo from "./ControlsPages/UploadLogo";
import UploadSocailId from "./ControlsPages/UploadSocialId";
import UploadStaticContent from "./ControlsPages/UploadStaticContent";
import UploadCompanyDomain from "./ControlsPages/UploadCompanyDomain";

const Controls = () => {
    const reducerState = useSelector((state) => state);
    const userId=reducerState?.logIn?.loginData?.data?.data?.id;
    // console.log("data",userId)
  const [showUploadLogo, setShowUploadLogo] = useState(true);
  const [showStaticContent, setShowStaticContent] = useState(false);
  const [showSocialId, setShowSocialId] = useState(false);
  const [showHolidayChangeReq, setShowHolidayChangeReq]=useState(false);
  const [showCompanyDomain, setShowCompanyDomain] = useState(false);



  const handleAgentLogoClick = () => {

    console.log("data",reducerState)
    setShowUploadLogo(true);
    setShowStaticContent(false);
    setShowSocialId(false);
    setShowHolidayChangeReq(false);
    setShowCompanyDomain(false);

  };

  const handleUploadStaicClick = () => {
    setShowUploadLogo(false);
    setShowStaticContent(true);
    setShowSocialId(false);
    setShowHolidayChangeReq(false);
    setShowCompanyDomain(false);

  };

  const handleSocialAccountClick = () => {
    setShowUploadLogo(false);
    setShowStaticContent(false);
    setShowSocialId(true);
    setShowHolidayChangeReq(false);
    setShowCompanyDomain(false);

  };
  const handleStaticContentClick = () => {
    setShowUploadLogo(false);
    setShowStaticContent(false);
    setShowSocialId(false);
    setShowHolidayChangeReq(true);
    setShowCompanyDomain(false)

  };

  const handleCompanyDomainClick = () => {
    setShowUploadLogo(false);
    setShowStaticContent(false);
    setShowSocialId(false);
    setShowHolidayChangeReq(false);
    setShowCompanyDomain(true)

  };


  return (
    <div className="container">
      <div className="buttonBox-new">
        <button onClick={handleAgentLogoClick}>Agent Logo</button>
        <button onClick={handleUploadStaicClick}>Upload Static</button>
        <button onClick={handleSocialAccountClick}>Social Account</button>
        {/* <button onClick={handleStaticContentClick}>Static Content</button> */}
        <button onClick={handleCompanyDomainClick}>Upload Domain</button>
      </div>
      {showUploadLogo && <UploadLogo userId={userId} />}
      {showStaticContent && <UploadStaticContent userId={userId} />}
      {showSocialId && <UploadSocailId userId={userId}/>}
      {showHolidayChangeReq && <HolidayChangeReq />}

       {showCompanyDomain && <UploadCompanyDomain userId={userId} />}
    </div>
  );
};

export default Controls;
