import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { parse } from "fast-xml-parser";
import Leftdetailamd from "../passengerdetail/Leftdetailamd";
import Rightdetailamd from "../passengerdetail/Rightdetailamd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import { swalModal } from "../../../";
import FlightLoader from "../FlightLoader/FlightLoader";

function Passengerdetailamd() {
  const location = useLocation();
  const { XMLParser } = require("fast-xml-parser");
  const [status, setStatus] = useState(" ");
  const [airsellRes, setAirsellRes] = useState("");
  const [xmlData, setXmlData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState(null);

  // sessionStorage.setItem("statusaircell", status);

  const { ResultIndex } = location.state;
  // const handledata= ResultIndex;.
  // console.log("handledata", ResultIndex);
  const sesstioResultIndex = ResultIndex;

  const xmldataconverter = () => {
    const parser = new XMLParser();
    const result = parser.parse(xmlData);
   
    let valueconvert;
    // Check if xmlData is not empty and if the expected property exists in the parsed result
    if (xmlData !== "") {
      valueconvert =
        result["soapenv:Envelope"]["soapenv:Body"][
          "Air_SellFromRecommendationReply"
        ];
      setJsonData(valueconvert); // Assuming setJsonData is a state setter function
    }

    // console.log("xmldataconverter", valueconvert);
    return valueconvert; // Return the extracted valueconvert2
  };

  useEffect(() => {
    xmldataconverter();
    // console.log(xmlData, "xmldata");
  }, [xmlData]);

  useEffect(() => {
    if (
      jsonData?.itineraryDetails?.segmentInformation?.actionDetails?.statusCode
    ) {
      if (
        jsonData?.itineraryDetails?.segmentInformation?.actionDetails
          ?.statusCode !== "OK"
      ) {
        setStatus(false);
        Swal.fire("Booking Class is not Available");
        navigate("/flights");
      } else {
        setStatus(true);
      }
    } else {
      jsonData?.itineraryDetails?.segmentInformation?.map((i) => {
        if (i?.actionDetails?.statusCode !== "OK") {
          setStatus(false);
        }
      });
    }
  }, [jsonData]);

  const adultCount = sessionStorage.getItem("adults");
  const childCount = sessionStorage.getItem("childs");
  const infantCount = sessionStorage.getItem("infants");

  // console.log(
  //   "sesstioResultIndex[0]?.fareDetails?.groupOfFares[0]?.productInformation?.cabinProduct?.rbd",
  //   sesstioResultIndex?.fareDetails?.groupOfFares[0]?.productInformation?.cabinProduct[0]?.rbd
  // );

  const segmentImformation = sesstioResultIndex?.flightDetails
    ?.flightInformation
    ? `<segmentInformation>
                        <travelProductInformation>
                            <flightDate>
                                <departureDate>${
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails[0]
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture
                                }</departureDate>
                            </flightDate>
                            <boardPointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[0]?.locationId
                                }</trueLocationId>
                            </boardPointDetails>
                            <offpointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[1]?.locationId
                                }</trueLocationId>
                            </offpointDetails>
                            <companyDetails>
                                <marketingCompany>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.companyId
                                    ?.marketingCarrier
                                }</marketingCompany>
                            </companyDetails>
                            <flightIdentification>
                                <flightNumber>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.flightOrtrainNumber
                                }</flightNumber>
                                <bookingClass>${
                                  // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   ?.productInformation
                                  //   ? sesstioResultIndex?.fareDetails
                                  //       ?.groupOfFares?.productInformation
                                  //       ?.cabinProduct?.rbd
                                  //   : sesstioResultIndex[0]?.fareDetails
                                  //       ?.groupOfFares[0]?.productInformation
                                  //       ?.cabinProduct?.rbd

                                  // sesstioResultIndex[0]?.fareDetails
                                  //   ?.groupOfFares?.productInformation
                                  //   ?.cabinProduct?.rbd ||
                                  // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   ?.productInformation?.cabinProduct?.rbd ||
                                  // sesstioResultIndex[0]?.fareDetails
                                  //   ?.groupOfFares?.productInformation
                                  //   ?.cabinProduct?.rbd ||
                                  // sesstioResultIndex?.fareDetails
                                  //   ?.groupOfFares[0]?.productInformation
                                  //   ?.cabinProduct?.rbd ||
                                  // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   ?.productInformation?.cabinProduct?.rbd ||
                                  // sesstioResultIndex?.fareDetails
                                  //   ?.groupOfFares[0]?.productInformation
                                  //   ?.cabinProduct?.rbd
                                  // <bookingClass>${
                                  //   // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   //   ?.productInformation
                                  //   //   ? sesstioResultIndex?.fareDetails
                                  //   //       ?.groupOfFares?.productInformation
                                  //   //       ?.cabinProduct?.rbd
                                  //   //   : sesstioResultIndex[0]?.fareDetails
                                  //   //       ?.groupOfFares[0]?.productInformation
                                  //   //       ?.cabinProduct?.rbd
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.productInformation?.cabinProduct[0]?.rbd
                                  // }</bookingClass>
                                }</bookingClass>
                            </flightIdentification>
                        </travelProductInformation>
                        <relatedproductInformation>
                            <quantity>${
                              Number(adultCount) + Number(childCount)
                            }</quantity>
                            <statusCode>NN</statusCode>
                        </relatedproductInformation>
                    </segmentInformation>
  `
    : appendSegment();

  function appendSegment() {
    let text = "";
    // console.log(
    //   sesstioResultIndex,
    //   "sesstioResultIndex?.flightDetails?.length"
    // );
    for (let i = 0; i < sesstioResultIndex?.flightDetails?.length; i++) {
      let isOther = false;
      let index = 0;
      if (0 < childCount || 0 < infantCount) {
        isOther = true;
        if (i < adultCount) {
          index = 0;
          // console.log(index, "index appendSegment");
        } else if (adultCount < i && i < childCount) {
          index = 1;
          // console.log(index, "index appendSegment");
        } else if (adultCount < i && childCount < i && i < infantCount) {
          index = 2;
          // console.log(index, "index appendSegment");
        }
      }
      isOther = false;
      // console.log(ResultIndex?.[0], "index appendSegmendddddddddddddddddt");

      text += ` <segmentInformation>
                            <travelProductInformation>
                                <flightDate>
                                    <departureDate>${
                                      isOther
                                        ? sesstioResultIndex[0]?.flightDetails[
                                            i
                                          ]?.flightInformation?.productDateTime
                                            ?.dateOfDeparture
                                        : sesstioResultIndex?.flightDetails[i]
                                            ?.flightInformation?.productDateTime
                                            ?.dateOfDeparture
                                    }</departureDate>
                                </flightDate>
                                <boardPointDetails>
                                    <trueLocationId>${
                                      isOther
                                        ? sesstioResultIndex[0]?.flightDetails[
                                            i
                                          ]?.flightInformation?.location[0]
                                            ?.locationId
                                        : sesstioResultIndex?.flightDetails[i]
                                            ?.flightInformation?.location[0]
                                            ?.locationId
                                    }</trueLocationId>
                                </boardPointDetails>
                                <offpointDetails>
                                    <trueLocationId>${
                                      isOther
                                        ? sesstioResultIndex[0]?.flightDetails[
                                            i
                                          ]?.flightInformation?.location[1]
                                            ?.locationId
                                        : sesstioResultIndex?.flightDetails[i]
                                            ?.flightInformation?.location[1]
                                            ?.locationId
                                    }</trueLocationId>
                                </offpointDetails>
                                <companyDetails>
                                    <marketingCompany>${
                                      isOther
                                        ? sesstioResultIndex[0]?.flightDetails[
                                            i
                                          ]?.flightInformation?.companyId
                                            ?.marketingCarrier
                                        : sesstioResultIndex?.flightDetails[i]
                                            ?.flightInformation?.companyId
                                            ?.marketingCarrier
                                    }</marketingCompany>
                                </companyDetails>
                                <flightIdentification>
                                    <flightNumber>${
                                      isOther
                                        ? sesstioResultIndex[0]?.flightDetails[
                                            i
                                          ]?.flightInformation
                                            ?.flightOrtrainNumber
                                        : sesstioResultIndex?.flightDetails[i]
                                            ?.flightInformation
                                            ?.flightOrtrainNumber
                                    }</flightNumber>
                                    <bookingClass>${
                                      sesstioResultIndex[0]?.fareDetails
                                        ?.groupOfFares?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex[0]?.fareDetails
                                        ?.groupOfFares?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares[0]?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares[0]?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares[0]?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex[0]?.fareDetails
                                        ?.groupOfFares[0]?.productInformation
                                        ?.cabinProduct?.rbd ||
                                      sesstioResultIndex?.fareDetails
                                        ?.groupOfFares[0]?.productInformation
                                        ?.cabinProduct[0]?.rbd||  sesstioResultIndex?.fareDetails?.groupOfFares[0]?.productInformation?.cabinProduct[0]?.rbd
                                    }</bookingClass>
                                </flightIdentification>
                            </travelProductInformation>
                            <relatedproductInformation>
                                <quantity>${
                                  Number(adultCount) + Number(childCount)
                                }</quantity>
                                <statusCode>NN</statusCode>
                            </relatedproductInformation>
                        </segmentInformation>
      `;
    }
    // console.log(text, "textttttttttttttttttttttttttt");
    return text;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: `${apiURL.baseURL}/skyTrails/amadeus/airsell`,
        data: `<Air_SellFromRecommendation>
                    <messageActionDetails>
                        <messageFunctionDetails>
                            <messageFunction>183</messageFunction>
                            <additionalMessageFunction>M1</additionalMessageFunction>
                        </messageFunctionDetails>
                    </messageActionDetails>
                    <itineraryDetails>
                        <originDestinationDetails>
                            <origin>${
                              sesstioResultIndex?.flightDetails
                                ?.flightInformation
                                ? sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[0]?.locationId
                                : sesstioResultIndex?.flightDetails[0]
                                    ?.flightInformation?.location[0]?.locationId
                            }</origin>
                            <destination>${
                              sesstioResultIndex?.flightDetails
                                ?.flightInformation
                                ? sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[1]?.locationId
                                : sesstioResultIndex?.flightDetails[
                                    sesstioResultIndex?.flightDetails?.length -
                                      1
                                  ]?.flightInformation?.location[1]?.locationId
                            }</destination>
                        </originDestinationDetails>
                        <message>
                            <messageFunctionDetails>
                                <messageFunction>183</messageFunction>
                            </messageFunctionDetails>
                        </message>
                      
                       ${segmentImformation}
    
                    </itineraryDetails>
                </Air_SellFromRecommendation>`,
        headers: {
          "Content-Type": "text/xml",
          //  token: token,
        },
      });
      if(res.status != 200){
        navigate("/Flightresult")
      }
      else{
        setAirsellRes(res?.data);
        setXmlData(res?.data?.data?.data);
       setLoading(false);
      }
      
    };
    fetchData();
  }, []);

  if (loading) {
    return <FlightLoader />;
  }

  return (
    <>
      <div className="container-fluid margin-pecentage">
        {loading ? ( // Conditionally render loader
          <FlightLoader />
        ) : (
          <div className="row">
            <div className="col-lg-9">
              <Leftdetailamd amdata={ResultIndex} airesellRes={airsellRes} />
            </div>
            <div className="col-lg-3">
              <Rightdetailamd amdata={ResultIndex} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Passengerdetailamd;
