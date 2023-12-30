import React, { useContext } from "react";
import carts from "../../utils/carts.png";
import chat from "../../utils/chat.png";
import date from "../../utils/date.png";
import group from "../../utils/group.png";
import { openContext } from "../../Context-Api/ContextApi";
import ProductSold from "./ProductSold";
import Invoice from "./Invoice";

const HomeContainer = () => {
  const data = [
    {
      name: "Earning",
      icon: date,
      num: "$40,000",
      growth: "Since Last Month",
      upDown: "3.8%",
    },
    {
      name: "Sales",
      icon: carts,
      num: "505",
      growth: "Since Last Month",
      upDown: "6.8%",
    },
    {
      name: "New User",
      icon: chat,
      num: "375",
      growth: "Since Last Month",
      upDown: "7.8%",
    },
    {
      name: "Pending Request",
      icon: group,
      num: "25",
      growth: "Since Yesterday",
      upDown: "1.8%",
    },
  ];
  const { open } = useContext(openContext);

  return (
    <>
      <div
        className={open ? "ml-72" : "ml-16"}
        style={{
          transitionDelay: "200ms",
          marginTop: "5.9rem",
          height:'110vh'
        }}
      >
        <h1 className="text-3xl ml-5 mt-5">Dashboard</h1>
        {/* Four cards */}
        <div className="card-container flex justify-between m-5">
          {data?.map((menu, i) => (
            <div className="bg-white flex " style={{ width: "24%" }}>
              <div className="p-5">
                <h5>{menu.name}</h5>
                <h2 className="text-xl py-1">{menu.num}</h2>
                <div className="flex">
                  <h4 className={` text-green-700 mr-2 `}>{menu.upDown}</h4>
                  <h4>{menu.growth}</h4>
                </div>
              </div>
              <img src={menu.icon} className="w-12 h-12 mt-9 ml-3" />
            </div>
          ))}
        </div>
        <ProductSold />
      </div>
    </>
  );
};

export default HomeContainer;
