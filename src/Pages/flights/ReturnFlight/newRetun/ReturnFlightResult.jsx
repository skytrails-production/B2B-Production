import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReturnSelectCard from "./ReturnSelectCard";

import { IoIosArrowRoundDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { setReturnSelectedFlight } from "../../../../Redux/returnSelectedFlight/actionReturnSelectedFlight";
import {
  findAirlineByCode,
  findAirportByCode,
} from "../../../../utility/flightUtility/BookwarperUtility";

const ReturnFlightResult = ({ jornyFlights, retrunFlights }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(jornyFlights, retrunFlights, "jornreturnFlightResult");
  const [isChepest, setIsChepest] = useState(true);
  const [selectedFlights, setSelectedFlights] = useState({
    onward: jornyFlights[0],
    return: retrunFlights[0],
  });
  const [selectedIndex, setSelectedIndex] = useState({
    onward: 0,
    return: 0,
  });
  useEffect(() => {
    setSelectedFlights({
      onward: jornyFlights[0],
      return: retrunFlights[0],
    });
  }, [jornyFlights, retrunFlights]);
  // console.log(selectedFlights, "selected flights");
  function handleSelectedFlightChange(type, flight, index) {
    // console.log(
    //   type,
    //   flight,
    //   index,
    //   "handleSelectedFlightChangeff",
    //   selectedFlights
    // );
    setSelectedFlights((pre) => {
      const newObj = { ...pre };
      newObj[type] = flight;
      // console.log(newObj, "newobject");
      return newObj;
    });
    setSelectedIndex((pre) => {
      const newObj = { ...pre };
      newObj[type] = index;
      // console.log(newObj, "newobjectindex");
      return newObj;
    });
  }
  const CardTop = ({ isOnward }) => {
    const searchFlight = useSelector((state) => state?.searchFlight);
    // console.log(isOnward, "isOnwardddd");
    // console.log(searchFlight);
    // const from = searchFlight?.flightDetails?.from?.name;
    // const to = searchFlight?.flightDetails?.to?.name;
    // const date = searchFlight?.flightDetails?.date;

    // console.log(isOnward, "is onwardddddddd");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");
    const to = queryParams.get("to");
    const dDate = queryParams.get("date");
    const rDate = queryParams.get("retrunDate");
    const Adult = queryParams.get("Adult");
    const Child = queryParams.get("Child");
    const Infant = queryParams.get("Infant");
    const Class = queryParams.get("FlightCabinClass");
    const Class1 = JSON.parse(queryParams.get("class"));
    const formatDate = (date) => {
      const options = { day: "2-digit", month: "short", year: "2-digit" };
      return date.toLocaleDateString("en-US", options);
    };

    // Initialize with a default date
    const [currentDate, setCurrentDate] = useState(
      new Date(isOnward ? dDate : rDate)
    );
    // console.log(currentDate, "currentdate");
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time for comparison
    const navigationFun = (pre, next) => {
      // console.log(pre, "preDate");
      const params = {
        from: from,
        to: to,
        date: isOnward ? formatDate(pre) : dDate,
        retrunDate: isOnward ? rDate : formatDate(pre),
        Adult: Adult,
        Child: Child,
        Infant: Infant,
        class: Class,
        FlightCabinClass: 1,
      };
      const queryString = new URLSearchParams(params).toString();

      navigate(`/ReturnResult?${queryString}`);
    };

    const handlePrev = () => {
      if (isOnward) {
        const newDate = new Date(dDate);
        newDate.setDate(newDate.getDate() - 1); // Subtract one day
        navigationFun(newDate, newDate);
      } else {
        const newDate = new Date(rDate);
        newDate.setDate(newDate.getDate() - 1); // Subtract one day
        navigationFun(newDate, newDate);
      }
    };

    const handleNext = () => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1); // Add one day
        navigationFun(newDate, newDate);
        return newDate;
      });
    };

    return (
      <div
        className="flex px-[8px] py-[10px] border-1 border-gray-300 bg-indigo-200 rounded-md w-full justify-between items-center
      "
      >
        <div className="font-medium sm:text-sm md:text-md xl:text-sm">
          {isOnward
            ? `${findAirportByCode(from)?.name} → ${
                findAirportByCode(to)?.name
              }`
            : `${findAirportByCode(to)?.name} → ${
                findAirportByCode(from)?.name
              }`}
        </div>
        <div className="text-[14px]">{formatDate(currentDate)}</div>
        <div className="flex items-center justify-center p-1 bg-white rounded-full shadow-md">
          <button
            onClick={() => handlePrev()}
            disabled={
              formatDate(currentDate) === formatDate(today) ||
              (!isOnward &&
                formatDate(new Date(rDate)) === formatDate(new Date(dDate)))
            }
            className="px-2 text-sm font-semibold text-center border-r-2 border-gray-300 cursor-pointer border-r-dashed hover:text-primary-6000 disabled:hover:text-gray-500 disabled:text-gray-500"
          >
            Previous
          </button>

          <p
            onClick={() => handleNext()}
            className="px-2 text-sm font-semibold text-center cursor-pointer hover:text-primary-6000"
          >
            Next
          </p>
        </div>
      </div>
    );
  };
  const MainCard = ({
    data,
    chepest,
    isOnward,
    handleSelectedChange,
    selectedIndex,
  }) => {
    // console.log(data, "dtaaaaaaaaaa");
    const [sortedData, setSortedData] = useState(data);

    const filterType = {
      flightName: "airlines",
      layover: "duration",
      departureTime: "arival",
      price: "price",
    };

    const [selectedType, setSelectedType] = useState("price");

    const handleFilter = (key) => {
      // console.log(key, sortedData, "keyclick");
      setSelectedType(key);

      const filterAirline = sortedData.sort((a, b) => {
        let sortItem1;
        let sortItem2;
        // Function to convert layover time to minutes
        function parseLayover(layover) {
          const [hours, minutes] = layover.split(/[hm]/).map(Number);
          return hours * 60 + minutes; // Convert hours to minutes and add the remaining minutes
        }

        sortItem1 = a?.[key];
        sortItem2 = b?.[key];
        switch (key) {
          case "price":
            // console.log("price");
            return a?.price - b?.price;
          case "flightName":
            // console.log("flightName");
            return a?.flightName.localeCompare(b?.flightName);
          case "layover":
            return parseLayover(a?.layover) - parseLayover(b?.layover);
          case "departureTime":
            // Convert departure times to Date objects and compare them
            const timeA = a.departureTime.split(":").map(Number);
            const timeB = b.departureTime.split(":").map(Number);

            return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        }
      });
      // console.log(filterAirline, "filterAirline");

      setSortedData(filterAirline);
    };
    // useEffect(() => {
    //   if (data.length > 0) {
    //     handleFilter(selectedType);
    //     setSelectedIndex({
    //       onward: 0,
    //       return: 0,
    //     });
    //     setSelectedFlights({
    //       onward: jornyFlights[0],
    //       return: retrunFlights[0],
    //     });
    //   }
    // }, [data.length]);

    return (
      <div className="w-full">
        <CardTop isOnward={isOnward} />

        <div className="flex items-center justify-between p-2 mt-2 text-sm">
          {Object.keys(filterType).map((key) => {
            return (
              <p
                className={`flex gap-1 items-center capitalize font-medium cursor-pointer hover:text-primary-6000 ${
                  selectedType == key && "text-primary-6000"
                }`}
                onClick={() => handleFilter(key)}
              >
                {filterType?.[key]}{" "}
                {selectedType == key ? <IoIosArrowRoundDown size={15} /> : " "}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {data?.map((item, index) => {
            // console.log(item, "itemfilghtname");
            return (
              <ReturnSelectCard
                handleSelectedChange={handleSelectedChange}
                item={item}
                key={index}
                isOnward={isOnward}
                index={index}
                selectedIndex={selectedIndex}
              />
            );
          })}
        </div>
      </div>
    );
  };
  const handleBook = () => {
    dispatch(setReturnSelectedFlight(selectedFlights));
    navigate("/ReturnResultNew/PassengerDetails");
  };

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {/* <div className="flex items-center justify-between w-full ">
        <div className="flex items-center gap-2">
          <div className="text-sm">Sort By:</div>
          <div
            className={`flex gap-1 items-center justify-center  py-1 px-3 border-1 rounded-full  ${
              isChepest
                ? "bg-green-300 border-green-500   text-white font-bold"
                : ""
            } `}
            onClick={() => setIsChepest(true)}
          >
            Cheapest <CiMoneyBill />
          </div>
          <div
            className={`flex gap-1  py-1 px-3 border-1  rounded-full   flex-nowrap items-center ${
              !isChepest
                ? "border-orange-500 text-white bg-orange-300 font-bold"
                : ""
            }`}
            onClick={() => setIsChepest(false)}
          >
            Fastest
            <IoTimerOutline />
          </div>
        </div>
        <div>Recommended</div>
      </div> */}
      <div className="flex w-full h-full gap-2">
        <MainCard
          data={jornyFlights}
          chepest={isChepest}
          isOnward={true}
          handleSelectedChange={handleSelectedFlightChange}
          selectedIndex={selectedIndex}
        />
        <MainCard
          data={retrunFlights}
          chepest={isChepest}
          isOnward={false}
          handleSelectedChange={handleSelectedFlightChange}
          selectedIndex={selectedIndex}
        />
      </div>
      {selectedFlights?.onward?.flightName &&
        selectedFlights?.return?.flightName && (
          <div className=" sticky w-[100%+30px] bottom-0 z-50 bg-indigo-800  p-3 shadow-2xl rounded-t-2xl flex text-white justify-between gap-2  ">
            <div className="flex justify-between flex-1 gap-2">
              <div className="flex-1 border-r-2 border-white">
                <div className="flex gap-2">
                  <p className="font-bold ">Onward</p>
                  <p>
                    •{" "}
                    {
                      findAirlineByCode(selectedFlights?.onward?.flightName)
                        ?.airlineName
                    }
                  </p>
                  <p>
                    • {selectedFlights?.onward?.flightName}{" "}
                    {selectedFlights?.onward?.flightNumber}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="content-center ">
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${selectedFlights?.onward?.flightName}.png`}
                      alt=""
                      className="rounded-lg "
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div>
                    <p className="flex items-center content-center text-2xl font-bold ">
                      {selectedFlights?.onward?.departureTime}
                      <HiArrowNarrowRight />
                      {selectedFlights?.onward?.arrivalTime}
                    </p>
                    <p className="text-sm font-light">
                      {selectedFlights?.onward?.layover} •
                      {selectedFlights?.onward?.stopes == 0
                        ? "Non-stop"
                        : `${selectedFlights?.onward?.stopes} stop`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 border-r-2 border-white">
                <div className="flex gap-2">
                  <p className="font-bold ">Return</p>
                  <p>
                    •{" "}
                    {
                      findAirlineByCode(selectedFlights?.return?.flightName)
                        ?.airlineName
                    }
                  </p>
                  <p>
                    • {selectedFlights?.return?.flightName}{" "}
                    {selectedFlights?.return?.flightNumber}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="content-center ">
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${selectedFlights?.return?.flightName}.png`}
                      alt=""
                      className="rounded-lg "
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div>
                    <p className="flex items-center content-center text-2xl font-bold ">
                      {selectedFlights?.return?.departureTime}
                      <HiArrowNarrowRight />
                      {selectedFlights?.return?.arrivalTime}
                    </p>
                    <p className="text-sm font-light">
                      {selectedFlights?.return?.layover} •
                      {selectedFlights?.return?.stopes == 0
                        ? "Non-stop"
                        : `${selectedFlights?.return?.stopes} stop`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              {/* <p>Flight Details</p> */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  <p className="text-xl font-bold ">
                    ₹{" "}
                    {parseInt(selectedFlights?.onward?.price) +
                      parseInt(selectedFlights?.return?.price)}
                  </p>
                  {/* <p className="text-xs">Extra 64% off</p> */}
                </div>
                <div
                  onClick={() => handleBook()}
                  className="items-center content-center justify-center px-4 py-1 font-bold text-center text-indigo-600 bg-white rounded-full"
                >
                  <button className="text-center">Book</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ReturnFlightResult;
