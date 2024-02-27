import React, { useEffect, useState } from "react";
import SingleDataReturn from "./SingleDataReturn";
import MultipleDataReturn from "./MultipleDataReturn";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
import FlightLoader from "../../FlightLoader/FlightLoader";

const FlightresultOne = ({ sendDataToParent, filteredDeparture }) => {
  const reducerState = useSelector((state) => state);
  const [filter, setFilter] = useState(1);
  const [Loading, setLoading] = useState(true);
  const setToSearchResults =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;
  // console.log("+++++++++++++", setToSearchResults[0]);

  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);

  // console.warn("+++++++++++++", setToSearchResults);

  const sendData = (e) => {
    const data = e.target;
    // console.log("dataaaaaaaaaaa",data)
    sendDataToParent(data);
  };
  useEffect(() => {
    if (setToSearchResults !== undefined) {
      return setLoading(false);
    }
  }, [setToSearchResults]);
  {
    Loading && (
      <div>
        <FlightLoader />
      </div>
    );
  }

  if (!Loading) {
    return filteredDeparture?.map((flight1) => {
      // result = res.sort((a, b) => a.Segments[0][0].Duration - b.Fare.OfferedFare);
      return (
        <div key={flight1?.ResultIndex}>
          {flight1?.Segments?.map((flight, Index) => {
            // console.log("flight", flight);
            const length = flight.length;
            // console.log("ResultIndex1", flight1?.ResultIndex);
            return length === 1 ? (
              <div
                onClick={(e) => {
                  sendData(e);
                }}
              >
                <SingleDataReturn
                  flight={flight[0]}
                  stop={length}
                  wholeFlight={flight1}
                  index={flight1?.ResultIndex}
                  fare={flight1?.Fare?.PublishedFare}
                  IsLCC={flight1.IsLCC}
                  isSelected={flight1?.ResultIndex === selectedFlightIndex}
                  onSelect={(e) => {
                    setSelectedFlightIndex(flight1?.ResultIndex);
                  }}
                  showRadio={true}
                />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  sendData(e);
                }}
              >
                <MultipleDataReturn
                  flight={flight}
                  wholeFlight={flight1}
                  stop={length}
                  index={flight1?.ResultIndex}
                  fare={flight1?.Fare?.PublishedFare}
                  IsLCC={flight1.IsLCC}
                  isSelected={flight1?.ResultIndex === selectedFlightIndex}
                  onSelect={() => setSelectedFlightIndex(flight1?.ResultIndex)}
                  showRadio={true}
                />
              </div>
            );
          })}
        </div>
      );
    });
  }
};

export default FlightresultOne;
