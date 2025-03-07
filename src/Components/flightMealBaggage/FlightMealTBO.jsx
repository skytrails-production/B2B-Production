import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "flowbite-react";
import {
  setAirlineMeal_retrun,
  setAirlineMeal_onward,
} from "../../Redux/AirlineSeatMapNew/actionAirlineSeatMap";
// import {setAirlineMeal_onward,setAirlineMeal_retrun} from
// import bowlfood from "../../images/meals/bowlfood.png";
import chicken from "../../Images/meals/chicken.jpg";
// import chicken2 from "../../images/meals/chicken2.png";
import fruit from "../../Images/meals/fruit.jpg";
import hotdog from "../../Images/meals/hotdog.jpg";
import juice from "../../Images/meals/juice.jpg";
import rice from "../../Images/meals/rice.jpg";
import sandwich from "../../Images/meals/sandwich.jpg";
import tea from "../../Images/meals/tea.jpg";
import nonveg from "../../Images/meals/non-veg.jpg";
import freeMeal from "../../Images/freemeal.png";
import veg from "../../Images/meals/veg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { findAirportByCode } from "../../utility/flightUtility/BookwarperUtility";
import { Minus, Plus } from "lucide-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const MealComponent = ({
  mealData,
  origin,
  destination,
  maximumSelection,
  isOnward,
  keyss,
}) => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const mealStructure = isOnward
    ? reducerState?.airlineSeatMapNew?.onward?.meals
    : reducerState?.airlineSeatMapNew?.return?.meals;
  const [mealCounts, setMealCounts] = useState(mealStructure[keyss]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  // console.log(mealData, "mealCounts");

  const totalCount = mealCounts.reduce((sum, count) => sum + count, 0);

  const addMeal = (typeParam, index) => {
    setMealCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      // console.log(updatedCounts, "updatedCounts");
      if (typeParam === "inc") {
        if (totalCount < maximumSelection) {
          if (updatedCounts[index] < maximumSelection) {
            updatedCounts[index] += 1;
            if (isOnward) {
              dispatch(
                setAirlineMeal_onward({
                  ...mealStructure,
                  [keyss]: updatedCounts,
                })
              );
            } else {
              dispatch(
                setAirlineMeal_retrun({
                  ...mealStructure,
                  [keyss]: updatedCounts,
                })
              );
            }
          } else {
            // alert(
            //   `You can't select more than ${maximumSelection} for this meal.`
            // );
            setToast({
              show: true,
              message: `You can't select more than ${maximumSelection} for this meal.`,
              type: "success",
            });
          }
        } else {
          // alert(`Total selection cannot exceed ${maximumSelection} meals.`);
          setToast({
            show: true,
            message: `Total selection cannot exceed ${maximumSelection} meals.`,
            type: "success",
          });
        }
      } else if (typeParam === "dec") {
        if (updatedCounts[index] > 0) {
          updatedCounts[index] -= 1;
          if (isOnward) {
            dispatch(
              setAirlineMeal_onward({
                ...mealStructure,
                [keyss]: updatedCounts,
              })
            );
          } else {
            dispatch(
              setAirlineMeal_retrun({
                ...mealStructure,
                [keyss]: updatedCounts,
              })
            );
          }
        }
      }

      return updatedCounts;
    });
  };

  // const findMealPrice = () => {
  //   console.log(mealData, "mealDatamealDatamealData");
  // };

  // findMealPrice();

  return (
    <div>
      {/* <h1>{`${origin} - ${destination}`}</h1> */}

      {toast.show && (
        <div className="fixed transform -translate-x-1/2 bottom-5 left-1/2">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toast.type === "success"
                  ? "bg-red-100 text-red-500"
                  : "bg-red-100 text-red-500 "
              }`}
            >
              <HiX className="w-5 h-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <Toast.Toggle
              className="items-center justify-center"
              onClick={() => setToast({ ...toast, show: false })}
            />
          </Toast>
        </div>
      )}

      <div className="sticky top-0 z-10 w-full overflow-hidden">
        <div className="px-2 py-2 bg-indigo-100 rounded-md seat-navbar-left-1">
          <p>{findAirportByCode(mealData?.[0]?.Origin)?.name}</p>
          <IoIosArrowRoundForward />
          <p>{findAirportByCode(mealData?.[0]?.Destination)?.name}</p>
        </div>
        <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-white">
          <p className="flex-1 text-center text-primary-6000 "></p>
          <p className="flex-1 text-center text-primary-6000 ">Meal Type</p>
          <p className="flex-1 text-center text-primary-6000 ">Price Rate</p>
          <p className="flex-1 text-primary-6000 text-end">Quantity</p>
        </div>
      </div>
      {mealData.map((item, index) => {
        let vegImage = null;
        let icon = null;

        if (item?.AirlineDescription) {
          const description = item.AirlineDescription.toLowerCase();

          // Determine vegImage based on the description
          if (
            description.includes("non veg") ||
            description.includes("non-veg") ||
            description.includes("nonveg") ||
            description.includes("chicken")
          ) {
            vegImage = (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                  src={nonveg}
                  alt="Non Veg"
                  className="absolute object-contain w-4 h-4 top-1 left-1"
                />
              </div>
            );
          } else if (description.includes("veg")) {
            vegImage = (
              <img
                src={veg}
                alt="Veg"
                className="absolute object-contain w-4 h-4 top-1 left-1"
              />
            );
          }

          // Determine icon based on the description
          if (description.includes("hotdog")) {
            icon = (
              <img
                src={hotdog}
                alt="Hotdog"
                className="object-contain w-[50%] rounded-md"
                // style={{ height: "50px", width: "50px" }}
              />
            );
          } else if (description.includes("fruit")) {
            icon = (
              <img
                src={fruit}
                alt="Fruit"
                className="object-contain w-[50%] rounded-md"
                // style={{ height: "50px", width: "50px" }}
              />
            );
          } else if (description.includes("rice")) {
            icon = (
              <img
                src={rice}
                alt="Rice"
                className="object-contain w-[50%] rounded-md"
                // style={{ height: "50px", width: "50px" }}
              />
            );
          } else if (description.includes("chicken")) {
            icon = (
              <img
                src={chicken}
                alt="Chicken"
                className="object-contain w-[50%] rounded-md"
                // style={{ height: "50px", width: "50px" }}
              />
            );
          } else if (description.includes("sandwich")) {
            icon = (
              <img
                src={sandwich}
                alt="Sandwich"
                className="object-contain w-[50%] rounded-md"
                // style={{ height: "50px", width: "50px" }}
              />
            );
          } else if (
            description.includes("beverage") ||
            description.includes("juice")
          ) {
            icon = (
              <img
                src={juice}
                alt="Juice"
                className="object-contain w-[50%] rounded-md"
              />
            );
          } else if (
            description.includes("tea") ||
            description.includes("coffee")
          ) {
            icon = (
              <img
                src={tea}
                alt="Tea/Coffee"
                className="object-contain w-[50%] rounded-md"
              />
            );
          } else {
            icon = (
              <img
                src={hotdog}
                alt="Default Icon"
                className="object-contain w-[50%] rounded-md"
              />
            );
          }
        }

        return (
          <div
            key={index}
            className="flex flex-row justify-between p-2 mb-2 rounded-md shadow-sm border-1 mx-"
          >
            <div className="relative flex items-center justify-center flex-1 ">
              <div className="z-0 ">
                {vegImage}
                {icon}
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <p className="text-sm font-medium">
                {item.AirlineDescription || "Meal Option"}
              </p>
            </div>
            <div className="flex items-center justify-center flex-1">
              <p className="font-bold">{item?.Price}</p>
            </div>
            <div className="flex items-center justify-end flex-1 gap-2">
              <button
                className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary-6000 hover:bg-primary-700"
                onClick={() => addMeal("dec", index)}
              >
                <Minus size={14} className="text-white" />
              </button>
              <p style={{ margin: "0 10px" }}>{mealCounts[index]}</p>
              <button
                className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary-6000 hover:bg-primary-700"
                onClick={() => addMeal("inc", index)}
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FlightMealTBO = ({ MealMap, isOnward, isFreeMeal }) => {
  let seatKeys = [];
  const separatedObj = separateFunction(MealMap);
  // console.log(separatedObj, "separatedObj");

  // console.log(MealMap, "");
  const adultCount = Number(sessionStorage.getItem("adults"));
  const childCount = Number(sessionStorage.getItem("childs"));
  const numberToSelect = adultCount + childCount;

  function separateFunction(param) {
    seatKeys = [];
    const groupedMeals = new Map();

    param?.forEach((item) => {
      if (item.Code !== "NoMeal") {
        const flightNumber = item.FlightNumber;
        if (!groupedMeals.has(flightNumber)) {
          groupedMeals.set(flightNumber, []);
          seatKeys.push(flightNumber);
        }
        groupedMeals.get(flightNumber).push(item);
      }
    });
    // console.log(seatKeys, "seatkeysss");

    // Convert Map to an object and preserve order
    const result = {};
    for (const [key, value] of groupedMeals) {
      result[key] = value;
    }

    return result;
  }

  // console.log(separateFunction(MealMap), "MealMap");

  return (
    <>
      {isFreeMeal ? (
        <div className="relative flex flex-row items-center justify-center gap-1">
          <img src={freeMeal} className="w-10 h-10" alt="" />
          <p className="text-[15px]">Free Meal will be included </p>
        </div>
      ) : (
        <div className="">
          <div class="swiper favSwiper-active mt-2">
            <div class="swiper-wrapper  relative ">
              <div className="custom-navigation">
                <button className="custom-prev">
                  <div className="flex items-center justify-center w-6 h-6">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                </button>
                <button className=" custom-next">
                  <div className="flex items-center justify-center w-6 h-6">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </button>
              </div>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                // loop={true}
                spaceBetween={25}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
                  },
                  1280: {
                    slidesPerView: 1,
                  },
                  1280: {
                    slidesPerView: 1,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
              >
                {seatKeys.map((key) => (
                  <SwiperSlide>
                    <div className="max-h-[35rem] w-[90%] mx-auto overflow-hidden overflow-y-scroll">
                      <MealComponent
                        key={key}
                        mealData={separatedObj[key]}
                        origin={"BOM"}
                        destination={"DEL"}
                        maximumSelection={numberToSelect}
                        isOnward={isOnward}
                        keyss={key}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightMealTBO;
