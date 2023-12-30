import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { AiOutlineTable } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import Topbar from "./Topbar";
import { useContext } from "react";
import { openContext } from "../Context-Api/ContextApi";

const Sidebar = () => {
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Table", link: "admin/dashboard/table", icon: AiOutlineTable },
    { name: "Form", link: "/dashboard/form", icon: FiMessageSquare },
  ];
  // const [open, setOpen] = useState(true);
  const {open,dispatch} = useContext(openContext);

  return (
    <>
      <Topbar />
      <section className="flex gap-12 top-0 fixed ">
        <div
          className={`bg-[#6778EF] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
          style={{ height: "110vh" }}
        >
          <div className="py-3 flex justify-around pt-8">
            <h1 className="text-white text-xl ">{open ? `Dasboard` : ""}</h1>
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => dispatch({ type: "toggle" })}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <NavLink
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </NavLink>
            ))}
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Sidebar;
