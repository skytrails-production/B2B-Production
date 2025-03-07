import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAirlineBaggage_onward,
  setAirlineBaggage_retrun,
} from "../../Redux/AirlineSeatMapNew/actionAirlineSeatMap";
import { Minus, Plus } from "lucide-react";
import Threekg from "../../Images/baggage/3kg.jpg";
import Fivekg from "../../Images/baggage/5kg.jpg";
import Tenkg from "../../Images/baggage/10kg.jpg";
import Fifteenkg from "../../Images/baggage/15kg.jpg";
import Twentykg from "../../Images/baggage/20kg.jpg";
import Thirtykg from "../../Images/baggage/30kg.jpg";
import Bagg from "../../Images/baggage/bag.jpg";

const FlightBaggageTBO = ({ BaggageMap, isOnward }) => {
  const dispatch = useDispatch();
  const adultCount = Number(sessionStorage.getItem("adults"));
  const childCount = Number(sessionStorage.getItem("childs"));
  const maximumSelection = adultCount + childCount;

  const reducerState = useSelector((state) => state);
  const initialBagStructure = isOnward
    ? reducerState?.airlineSeatMapNew?.onward?.baggage || []
    : reducerState?.airlineSeatMapNew?.return?.baggage || [];
  const filteredBaggage = BaggageMap.filter((item) => item?.Price !== 0);

  const [baggageList] = useState(filteredBaggage); // This state doesn't change
  const [baggageStructure, setBaggageStructure] = useState(initialBagStructure);

  const addBaggage = (type, index) => {
    setBaggageStructure((prev) => {
      const updatedCounts = [...prev];
      const totalSelected = updatedCounts.reduce(
        (sum, count) => sum + count,
        0
      );

      if (type === "inc") {
        if (
          totalSelected < maximumSelection &&
          updatedCounts[index] < maximumSelection
        ) {
          updatedCounts[index] += 1;
        } else {
          alert(
            totalSelected >= maximumSelection
              ? `Total selection cannot exceed ${maximumSelection} items.`
              : `You can't select more than ${maximumSelection} for this item.`
          );
        }
      } else if (type === "dec") {
        if (updatedCounts[index] > 0) {
          updatedCounts[index] -= 1;
        }
      }

      // Dispatch the updated structure
      if (isOnward) {
        dispatch(setAirlineBaggage_onward(updatedCounts));
      } else {
        dispatch(setAirlineBaggage_retrun(updatedCounts));
      }

      return updatedCounts;
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {baggageList?.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col p-2 mb-1 border rounded-md shadow-sm"
        >
          <div className="flex">
            <div className="w-20 me-4">
              <img
                src={
                  item?.Weight === 3
                    ? Threekg
                    : item?.Weight === 5
                    ? Fivekg
                    : item?.Weight === 10
                    ? Tenkg
                    : item?.Weight === 15
                    ? Fifteenkg
                    : item?.Weight === 20
                    ? Twentykg
                    : item?.Weight === 30
                    ? Thirtykg
                    : Bagg
                }
                className="object-contain w-full rounded-md shadow-md"
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="font-medium">{`${item?.Weight}kg`}</p>
              <p className="font-semibold">₹{item?.Price}</p>
            </div>
            <div className="flex items-center justify-end flex-1 gap-2">
              <button
                className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary-6000 hover:bg-primary-700"
                onClick={() => addBaggage("dec", index)}
                disabled={baggageStructure[index] === 0}
              >
                <Minus size={14} className="text-white" />
              </button>
              <div className="w-6 text-center">
                <p>{baggageStructure?.[index] || 0}</p>
              </div>
              <button
                className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary-6000 hover:bg-primary-700"
                onClick={() => addBaggage("inc", index)}
                disabled={
                  baggageStructure.reduce((sum, count) => sum + count, 0) >=
                  maximumSelection
                }
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold absolute bottom-1 left-28">
              {item?.Text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightBaggageTBO;
