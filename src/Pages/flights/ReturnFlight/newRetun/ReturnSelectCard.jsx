import React, { useState } from "react";
import ViewDetails from "./ViewDetails";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { findAirportByCode } from "../../../../utility/flightUtility/BookwarperUtility";
import freeMeal from "../../../../Images/freemeal.png";

const ReturnSelectCard = ({
  item,
  handleSelectedChange,
  key,
  index,
  isOnward,
  selectedIndex,
}) => {
  const type = isOnward ? "onward" : "return";

  const isSelectedIndex = selectedIndex[type] == index;

  const [isFlightDetail, setIsFlightDetail] = useState(false);
  return (
    // <div className="w-full bg-white rounded-sm shadow-md">
    //   <div className="flex items-center justify-between">
    //     <div className="flex justify-between gap-2">
    //       <div>
    //         <img
    //           src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item.flightName}.png`}
    //           alt="flight"
    //           width={"30px"}
    //           height={"30px"}
    //           style={{ borderRadius: "8px" }}
    //         />
    //         <p>{item.flightName}</p>
    //       </div>
    //       <div>
    //         <p>{item.origin}</p>
    //         <span>{item.departureTime}</span>
    //       </div>
    //       <div>
    //         <p>{item.layover}</p>
    //         <span>{item.stopes}</span>
    //       </div>
    //       <div>
    //         <p>{item?.destination}</p>
    //         <span>{item?.departureTime}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="w-full transition-all ease-in-out hover:scale-[1.01]  bg-white shadow-sm rounded-lg overflow-hidden p-2 hover:shadow-sm cursor-pointer border">
      {/* <!-- Flight Image --> */}

      {/* <!-- Flight Name --> */}

      {/* <!-- Flight Times and Duration --> */}
      {item?.isFreeMeal && (
        <div className="absolute -top-2 z-50 left-0  px-2 py-0.5 rounded-sm bg-gradient-to-r from-orange-500 font-semibold   to-orange-300">
          <div className="relative flex flex-row items-center gap-1">
            <img src={freeMeal} className="w-4 h-4" alt="" />
            <p className="text-[10px]">Free Meal</p>
            <div className="absolute inset-0 z-10 opacity-75 bg-gradient-to-r from-transparent via-white to-transparent blur-md animate-slide"></div>
          </div>
        </div>
      )}
      <div
        onClick={() => handleSelectedChange(type, item, index)}
        class="flex justify-between mt-4"
      >
        <div>
          <img
            class="w-[30px] h-[30px] object-cover rounded-md"
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.flightName}.png`}
            alt="Flight Image"
          />
          <div>
            <p class="text-sm text-gray-500">
              {item?.flightName}-{item?.flightNumber}
            </p>
          </div>
        </div>
        {/* <!-- Departure Time --> */}
        <div class="text-center">
          <p class="text-sm text-gray-500">{item?.origin}</p>
          <p class="font-semibold text-gray-700">{item?.departureTime}</p>
        </div>

        {/* <!-- Duration and Stops --> */}
        <div className="relative flex flex-col items-center justify-center gap-0 group">
          {/* <p class="text-sm text-gray-500">{item?.destination}</p> */}
          <p class="font-semibold text-gray-700">{item?.layover}</p>
          <div className=" w-full h-[1.5px]  mt-2" style={{backgroundColor:"#6366F1"}}>
            <div className="">
              {item?.stopes !== 0 && (
                <div className="absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full left-1/2"></div>
              )}
              {/* Tooltip */}
              {item.stopes !== 0 && (
                <div className="absolute hidden px-3 py-1 text-sm text-white transform -translate-x-1/2 bg-white border border-gray-600 rounded shadow-md -top-0 left-1/2 group-hover:block whitespace-nowrap">
                  <p className="text-center text-gray-900 block text-[12px] font-medium">
                    {item.stopes} stop via
                  </p>
                  <ul className="p-0 mb-0 list-disc">
                    {item?.via?.map((i, index) => {
                      return (
                        <>
                          {index < item?.via?.length - 1 && (
                            <li className="block  text-gray-700 text-[11px] font-medium">
                              {i} ({findAirportByCode(i)?.name}){" "}
                            </li>
                          )}
                        </>
                      );
                    })}
                  </ul>
                  <div className="absolute w-2 h-2 transform rotate-45 -translate-x-1/2 translate-y-1/2 bg-white border-b border-r border-gray-300 -bottom-0 left-1/2"></div>
                </div>
              )}
            </div>
          </div>

          <p class="text-xs text-gray-400 mt-2">
            {item.stopes == 0 ? "Non-stop" : `${item.stopes}-stop`}
          </p>
        </div>

        {/* <!-- Arrival Time --> */}
        <div class="text-center">
          <p class="text-sm text-gray-500">{item?.destination}</p>
          <p class="font-semibold text-gray-700">{item?.arrivalTime}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <label className="flex items-center border rounded-lg cursor-pointer hover:bg-gray-100 ">
            {/* Hidden Radio Button */}
            <input
              type="radio"
              name="flight-option"
              value={"dd"}
              checked={true}
              // onChange={() => onChange(value)}
              className="hidden peer"
            />

            {/* Custom Radio Button Style */}
            <div
              className={`w-4 h-4 group-hover:border-indigo-600
                transition-property: all
                 ease-in-out delay-150
                 duration-300 
                rounded-full border-2 ${
                  isSelectedIndex
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-400"
                }`}
            ></div>

            {/* Text Label */}
            <div className="text-gray-700">{""}</div>
          </label>
          {/* <p class="text-gray-500 text-sm">Total Price</p> */}
          <p
            class={`text-lg font-semibold ${
              isSelectedIndex ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* <!-- Flight Route --> */}
      {/* <div class="flex justify-between items-center mt-4">
                     
                      <div class="text-center">
                        <p class="text-sm text-gray-500">From</p>
                        <p class="font-semibold text-gray-700">
                          New York (JFK)
                        </p>
                      </div>

                     
                      <div class="text-center">
                        <p class="text-sm text-gray-500">To</p>
                        <p class="font-semibold text-gray-700">London (LHR)</p>
                      </div>
                    </div> */}

      {/* <!-- Price --> */}
      <div class="flex justify-end items-center mt-2">
        <div>
          {/* <p class="text-gray-500 text-sm">{item?.type}</p> */}
          {/* <p class="text-lg font-semibold text-indigo-600">
                          $450
                        </p> */}
        </div>
        <button
          onClick={() => setIsFlightDetail((pre) => !pre)}
          className="text-indigo-600  flex gap-2 items-center font-semibold text-[14px] hover:text-indigo-700 focus:outline-none text-right"
        >
          View Details{" "}
          {isFlightDetail ? (
            <ChevronsUp size={16} />
          ) : (
            <ChevronsDown size={16} />
          )}
        </button>
      </div>
      {isFlightDetail && <ViewDetails key={index} item={item} />}
    </div>
  );
};

export default ReturnSelectCard;
