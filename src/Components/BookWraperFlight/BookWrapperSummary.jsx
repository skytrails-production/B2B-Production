import React, { useEffect, useState } from "react";

import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { standardizeFlightFareResponse } from "../../utility/flightUtility/standardizeFlightResponse";
import { findSeatMealBaggagePrice } from "../../utility/flightUtility/BookwarperUtility";
import { Baby } from "lucide-react";

const BookWrapperSummary = ({ widdthh }) => {
  const adult = Number(sessionStorage.getItem("adults"));
  const child = Number(sessionStorage.getItem("childs"));
  const infant = Number(sessionStorage.getItem("infants"));
  const [FlightFareOnward, setFlightFareOnward] = useState([]);
  const [FlightFareReturn, setFlightFareReturn] = useState([]);
  const reducerState = useSelector((state) => state);
  const markUP =
    reducerState?.markup?.markUpData?.data?.result?.[0]?.flightMarkup;
   console.log(markUP, "markUp");
  const seatbaggagePrice = findSeatMealBaggagePrice();
  // console.log(seatbaggagePrice, "seatbaggagePriceee");

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;

  const [isOpenAddOn, setIsOpenAddOn] = useState(false);
  const [isOpenBaseFare, setIsOpenBaseFare] = useState(false);

  const combinedAddOnPrice =
    (seatbaggagePrice?.seatPrice > 0 ? seatbaggagePrice?.seatPrice : 0) +
    (seatbaggagePrice?.mealPrice > 0 ? seatbaggagePrice?.mealPrice : 0) +
    (seatbaggagePrice?.baggagePrice > 0 ? seatbaggagePrice?.baggagePrice : 0);
  useEffect(() => {
    if (Onward) {
      const onwardData = standardizeFlightFareResponse(
        Onward,
        adult,
        child,
        infant
      ); // Get standardized data
      setFlightFareOnward(onwardData); // Update state with data
    }
    if (Return) {
      const returnData = standardizeFlightFareResponse(
        Return,
        adult,
        child,
        infant
      ); // Get standardized data

      setFlightFareReturn(returnData); // Update state with data
    }
  }, []);

  if (!FlightFareOnward || !FlightFareReturn) {
    return <div>Loading...</div>;
  }
  // const totalBase =
  //   FlightFareOnward?.Adt?.Basic +
  //   FlightFareOnward?.Chd?.Basic +
  //   FlightFareOnward?.Inf?.Basic +
  //   FlightFareReturn?.Adt?.Basic +
  //   FlightFareReturn?.Chd?.Basic +
  //   FlightFareReturn?.Inf?.Basic;
  // const totalTax =
  //   FlightFareOnward?.Adt?.Taxes +
  //   FlightFareOnward?.Chd?.Taxes +
  //   FlightFareOnward?.Inf?.Taxes +
  //   FlightFareReturn?.Adt?.Taxes +
  //   FlightFareReturn?.Chd?.Taxes +
  //   FlightFareReturn?.Inf?.Taxes;
  // const grandTotal =
  //   FlightFareOnward?.Adt?.Total +
  //   FlightFareOnward?.Chd?.Total +
  //   FlightFareOnward?.Inf?.Total +
  //   FlightFareReturn?.Adt?.Total +
  //   FlightFareReturn?.Chd?.Total +
  //   FlightFareReturn?.Inf?.Total;

  const totalOnward =
    FlightFareOnward?.Adt?.Total +
    FlightFareOnward?.Chd?.Total +
    FlightFareOnward?.Inf?.Total;

  const totalReturn =
    FlightFareReturn?.Adt?.Total +
    FlightFareReturn?.Chd?.Total +
    FlightFareReturn?.Inf?.Total;

  // console.log(combinedAddOnPrice, "combinedAddOnPrice");

  const baseFare = Number(totalOnward + (Return ? totalReturn : 0));

  const grandTotal = Number(totalOnward + (Return ? totalReturn : 0));
  const newGrandTotal = (grandTotal + grandTotal * markUP)?.toFixed();
  console.log(grandTotal, "grand total");
  let lastFinalPrice = (
    Number(newGrandTotal) + Number(combinedAddOnPrice)
  )?.toFixed();

  const passengersStr = `${0 < adult ? adult + " Adult" : ""} ${
    0 < child ? child + "Child" : ""
  }${0 < infant ? infant + "Infant" : ""} `;

  // console.log(adult, child, "adult and child");

  return (
    <div className={`${widdthh}`}>
      <div className="sticky p-4 overflow-y-scroll border-gray-200 rounded-md top-24 border-1" style={{backgroundColor:"#FFFFFF"}}>
        <div className="flex flex-col gap-2 bg-white rounded-md">
          <div className="p-2 py-2 md:px-4">
            <p className="text-lg font-bold">FARE SUMMARY</p>
            {/* <p>{passengersStr}</p> */}
            <div className="flex items-center justify-start gap-2 fle-row">
              <div className="flex flex-row items-center gap-2 font-semibold text-[14px] text-gray-700">
                <i class="fa-regular fa-user text-purple text-lg"></i>
                {adult} Adult
              </div>

              {child > 0 && (
                <div className="flex flex-row items-center gap-2 font-semibold text-[14px] text-gray-700">
                  <Baby className="w-5 h-5 text-purple" />
                  {child} child
                </div>
              )}
              {infant > 0 && (
                <div className="flex flex-row items-center gap-2 font-semibold text-[14px] text-gray-700">
                  <Baby className="w-5 h-5 text-purple" />
                  {infant} infant
                </div>
              )}
            </div>
          </div>
          <div className="border-t-[1px] border-gray-200 w-full"></div>
          <div className="flex  flex-1 flex-col justify-between mx-2 md:mx-4 border-b-[1px] border-gray-200">
            {
              // Return ?
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpenBaseFare(!isOpenBaseFare)}
              >
                <div className="flex items-center gap-2">
                  {isOpenBaseFare ? <GrSubtractCircle /> : <GrAddCircle />}
                  <p className="font-semibold">Base Fare</p>
                </div>
                <p className="font-bold">₹{baseFare?.toFixed(0)}</p>
              </div>
              // : (
              //   <div className="flex items-center justify-between cursor-pointer">
              //     <div className="flex items-center gap-2">
              //       {Return &&
              //         (isOpenBaseFare ? <GrSubtractCircle /> : <GrAddCircle />)}
              //       <p className="font-semibold">Base Fare</p>
              //     </div>
              //     <p className="font-bold">₹{baseFare?.toFixed(0)}</p>
              //   </div>
              // )
            }

            {isOpenBaseFare && (
              <div className="mt-2 transition-all duration-300 rounded-md">
                {!adult == 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="text-sm font-medium"> Adult X {adult} </p>
                    </div>
                    <p className="font-medium">
                      ₹
                      {FlightFareOnward?.Adt?.Total +
                        Number(FlightFareReturn?.Adt?.Total || 0)}
                    </p>
                    {/* <p className="font-medium">₹{totalOnward}</p>
                    <p className="font-medium">₹{totalOnward}</p> */}
                  </div>
                )}
                {child > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="text-sm font-medium"> Child X {child} </p>
                    </div>
                    <p className="font-medium">
                      ₹
                      {FlightFareOnward?.Chd?.Total +
                        Number(FlightFareReturn?.Chd?.Total || 0)}
                    </p>
                  </div>
                )}
                {infant > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="text-sm font-medium"> Infant X {infant} </p>
                    </div>
                    <p className="font-medium">
                      ₹
                      {FlightFareOnward?.Inf?.Total +
                        Number(FlightFareReturn?.Inf?.Total || 0)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {(seatbaggagePrice?.seatPrice > 0 ||
              seatbaggagePrice?.mealPrice > 0 ||
              seatbaggagePrice?.baggagePrice > 0) && (
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpenAddOn(!isOpenAddOn)}
              >
                <div className="flex items-center gap-2">
                  {isOpenAddOn ? <GrSubtractCircle /> : <GrAddCircle />}
                  <p className="font-semibold">Add On's</p>
                </div>
                <p className="font-bold">₹{combinedAddOnPrice}</p>
              </div>
            )}
            {isOpenAddOn && (
              <div className="mt-2 transition-all duration-300 rounded-md">
                {seatbaggagePrice?.seatPrice > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="font-medium"> Seat Price:</p>
                    </div>
                    <p className="font-medium">
                      ₹{seatbaggagePrice?.seatPrice}
                    </p>
                  </div>
                )}
                {seatbaggagePrice?.mealPrice > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="font-medium"> Meal Price:</p>
                    </div>
                    <p className="font-medium">
                      ₹{seatbaggagePrice?.mealPrice}
                    </p>
                  </div>
                )}

                {seatbaggagePrice?.baggagePrice > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <p className="font-semibold"> Baggage Price:</p>
                    </div>
                    <p className="font-bold">
                      ₹{seatbaggagePrice?.baggagePrice}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex  flex-1 justify-between mx-2 md:mx-4 border-0 border-t-[1px] border-gray-200">
            <div className="flex items-center gap-2 ">
              <p className="font-semibold">Other Taxes </p>
            </div>
            <p className="font-bold">₹{(grandTotal * markUP)?.toFixed(0)}</p>
          </div>
          {/* <div className="border-0 border-t-[1px]  w-full"></div> */}
          <div className="flex items-center justify-between p-2 py-2 text-indigo-600 border-t border-gray-200 md:px-4">
            <p className="font-semibold text-md">Grand Total</p>
            <p className="text-lg font-semibold ">₹{lastFinalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookWrapperSummary;
