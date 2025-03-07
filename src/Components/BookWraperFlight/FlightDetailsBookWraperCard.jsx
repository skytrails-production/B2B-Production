import React, { useState, useEffect } from "react";
import {
  standardizeFlightDetailResponse,
  standardizeFlightFareResponse,
  standardizeFlightBaggageResponse,
} from "../../utility/flightUtility/standardizeFlightResponse";
import {
  findAirlineByCode,
  findAirportByCode,
} from "../../utility/flightUtility/BookwarperUtility";
import { useSelector } from "react-redux";

const FlightDetailsBookWraperCard = ({ type, flight }) => {
  const [flightDetail, setFlightDetail] = useState(null); // Set initial state to null to check later
  const [FlightBaggage, setFlightBaggage] = useState([]);
  const reducerState = useSelector((state) => state?.searchFlight);

  useEffect(() => {
    if (flight) {
      const data = standardizeFlightDetailResponse(flight); // Get standardized data
      const baggage = standardizeFlightBaggageResponse(flight); // Get standardized data
      setFlightDetail(data); // Update state with data
      setFlightBaggage(baggage);
    }
  }, [flight]);

  const FlightDetailsCard = ({ item }) => {
    // console.log(item, "itemmm");
    const {
      arrivalTime,
      dateOfArrival,
      dateOfDeparture,
      departureTime,
      destination,
      duration,
      flightName,
      flightNumber,
      origin,
      terminal1,
      terminal2,
      layover,
      type,
    } = item || {};
    const airportOrigin = findAirportByCode(origin);
    const airportDestination = findAirportByCode(destination);

    // console.log(item, "item in the fdbwc");

    return (
      <>
        <div className="flex flex-col gap-2 p-2 mb-2 bg-white border-gray-200 rounded-md shadow-sm border-1 md:p-4">
          <div className="flex justify-between w-full ">
            <div className="flex gap-2">
              <img
                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightName}.png`}
                alt=""
                width="32px"
                height="32px"
                className="object-contain rounded-md"
              />
              <div className="flex flex-col justify-between ">
                <p className="text-sm font-semibold md:text-lg">
                  {findAirlineByCode(flightName)?.airlineName || flightName} |{" "}
                  {flightName} {flightNumber}
                </p>
                {/* <p className="text-xs opacity-75 md:text-sm">Airbus A321</p> */}
              </div>
            </div>
            <div className="text-sm md:text-lg">
              {reducerState?.flightDetails?.FlightCabinClass}{" "}
              {/* <span className="font-semibold">| SAVER</span> */}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="px-2 bg-indigo-100 rounded-sm ">
              <p className="text-xs md:text-sm ">
                Start on{" "}
                <span className="font-semibold ">- {dateOfDeparture}</span>
              </p>
            </div>
            <div className="px-2 bg-indigo-100 rounded-sm ">
              <p className="text-xs md:text-sm">
                Ends on{" "}
                <span className="font-semibold ">- {dateOfArrival}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-1 md:gap-2">
            <div>
              <p className="text-xl font-semibold">{departureTime}</p>
              <p className="text-base font-semibold">{origin}</p>
            </div>
            <div className="relative flex flex-col w-full my-3 ">
              <div className="absolute w-full border-t-2 border-gray-400 border-dashed top-3"></div>
              <div className="absolute top-0 left-0 right-0 flex justify-center px-2 bg-transparent ">
                <div className="flex flex-col px-1 bg-white">
                  <span className="text-lg font-semibold text-center ">
                    {duration}
                  </span>
                  <span className="text-sm text-center">Duration</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold text-right">{arrivalTime}</p>
              <p className="text-base font-semibold text-right">
                {destination}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div>
              <p className="font-semibold text-md">
                {airportOrigin?.name || ""}
              </p>
              <p className="text-sm opacity-75 text-zinc-700">
                {airportOrigin?.code || ""}
                {airportOrigin?.CountryName || ""}
              </p>
              <p className="text-sm font-semibold text-indigo-500">
                {terminal1 && `Terminal ${terminal1}`}
              </p>
            </div>

            <div>
              <p className="font-semibold text-right text-md">
                {airportDestination?.name}
              </p>
              <p className="text-sm text-right opacity-75 text-zinc-700">
                {airportDestination?.code || ""}{" "}
                {airportDestination?.CountryName || ""}
              </p>
              <p className="text-sm font-semibold text-right text-indigo-500">
                {terminal2 && `Terminal ${terminal2}`}
              </p>
            </div>
          </div>
          <div className="w-full border-t-[1px] border-gray-200"></div>
          <div className="flex flex-col items-start justify-between w-full gap-2 md:items-center md:flex-row">
            <div
              className="flex flex-col justify-start w-full text-xs md:text-sm font-gray-400 md:justify-between md:flex-row "
            >
              <p>Baggage - {FlightBaggage?.[0]?.Baggage}</p>
              <p>Cabin - {FlightBaggage?.[0]?.CabinBaggage}</p>
            </div>
            {/* <div className="flex items-end justify-end w-full md:w-auto">
            <button className="text-sm font-semibold text-indigo-500 md:text-md text-nowrap">
              View Baggage Details
            </button>
          </div> */}
          </div>
        </div>
        {layover && (
          <div className="relative flex items-center justify-center">
            <p className="z-10 inline-block px-3 py-1 text-sm font-semibold text-center text-gray-800 bg-white rounded-full shadow-md">
              {layover?.toLowerCase()} Layover in {airportDestination?.name}
            </p>
            <div className="absolute left-0 w-full border-b border-gray-400 -z-0 "></div>
          </div>
        )}
      </>
    );
  };

  // Show a loader or placeholder while waiting for the data
  if (!flightDetail) {
    return <div>Loading...</div>;
  }

  // console.log(flightDetail, "flightDetailAMDd");
  return (
    <div className="flex flex-col gap-2 px-2 py-2 bg-gray-100 md:px-4" style={{backgroundColor:"#F3F4F6"}}>
      <div className="flex flex-col ">
        <div className="flex items-center gap-2">
          <p className="px-2 py-1 text-sm text-white rounded-md md:text-base " style={{backgroundColor:"#4338ca"}}>
            {type}
          </p>
          <p className="text-sm font-bold md:text-xl">
            {flight?.origin} - {flight?.destination}
          </p>
        </div>
        <div>
          <p className="mt-1 text-xs opacity-75 md:text-sm">
            {flight?.stopes == 0 ? "Non" : flight?.stopes} Stop | All
            departure/arrival times are in local time
          </p>
        </div>
      </div>
      {flightDetail?.map((item) => {
        return <FlightDetailsCard item={item} />;
      })}
    </div>
  );
};

export default FlightDetailsBookWraperCard;
