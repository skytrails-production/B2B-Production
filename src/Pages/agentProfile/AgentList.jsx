import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { apiURL } from "../../Constants/constant";
import { MdOutlineFlight } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { FaBusAlt } from "react-icons/fa";
import "./AgentList.css";
import RiseLoader from "react-spinners/RiseLoader";
const AgentList = () => {
  const [data, setData] = useState(null);
  const reducerState = useSelector((state) => state);
  const agentData = reducerState?.agentProfileReducer;

  const fetchData = async () => {
    // const Data = await axios.get(`${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/${reducerState?.
    //     agentProfileReducer?.agentProfileloginData?.
    //     data?.data?.
    //     id}`)
    const Data = await axios.get(
      `${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/65e959e675e669a23dfd9bb7`
    );
    setData(Data?.data);
    console.log(Data?.data, "data");
  };
  useEffect(() => {
    if (!agentData.isLogin) {
      Navigate("/agentProfile/Login");
    } else {
      fetchData();
    }
  }, [agentData.isLogin]);
  if (!data?.agentInviteData)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RiseLoader size={50} color="#31304d" />
      </div>
    );
  return (
    <div className="agentProfileListContainer">
      <div className="agentProfileListH1">
        Total Agents {data?.agentInviteData?.length}
      </div>
      <div className="agentProfileListCardContainer">
        {data?.agentInviteData?.map((item) => (
          <div className="agentProfileListCard">
            <div className="agentProfileListName">{item.agencyName}</div>
            <div className="agentProfileListCardDiv">
              <div className="agentProfileListCardDivItem">
                <div className="agentProfileListCardDivItemProflie">
                  <div className="agentProfileListCardDivItemIcon">
                    {" "}
                    <MdOutlineFlight size={30} />
                  </div>
                  <div className="agentProfileListCardDivItemProflieFlightBooking">
                    {" "}
                    Flight Booking
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">Total</div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.flightBookings}
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">
                    Total Revenue{" "}
                  </div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.flightBookingRevenue}
                  </div>
                </div>
              </div>
              <div className="agentProfileListCardDivItem">
                <div className="agentProfileListCardDivItemProflie">
                  <div className="agentProfileListCardDivItemIcon">
                    {" "}
                    <LuHotel size={30} />
                  </div>
                  <div className="agentProfileListCardDivItemProflieFlightBooking">
                    {" "}
                    Hotel Booking
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">Total</div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.hotelBookings}
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">
                    Total Revenue{" "}
                  </div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.hotelBookingRevenue}
                  </div>
                </div>
              </div>
              <div className="agentProfileListCardDivItem">
                <div className="agentProfileListCardDivItemProflie">
                  <div className="agentProfileListCardDivItemIcon">
                    {" "}
                    <FaBusAlt size={30} />
                  </div>
                  <div className="agentProfileListCardDivItemProflieFlightBooking">
                    {" "}
                    Bus Booking
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">Total</div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.busBookings}
                  </div>
                </div>
                <div className="agentProfileCardTotalAmountDiv">
                  <div className="agentProfileCardTotalAmountStr">
                    Total Revenue{" "}
                  </div>
                  <div className="agentProfileCardTotalAmount">
                    {item?.hotelBookingRevenue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
