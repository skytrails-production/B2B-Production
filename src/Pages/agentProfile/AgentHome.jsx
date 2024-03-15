import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import RiseLoader from "react-spinners/RiseLoader";
import { dialogActionsClasses } from "@mui/material";

const AgentHome = ({ data }) => {
  console.log("agent profile data", data);
  const [TotalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    function getTotalRevenue(agentInviteData) {
      // Check if agentInviteData is an array
      if (!Array.isArray(agentInviteData)) {
        throw new Error(
          "Invalid data format: agentInviteData must be an array"
        );
      }

      // Reduce the array to a single value (total revenue)
      const totalRevenue = agentInviteData.reduce((sum, agent) => {
        // Check if agent object has a totalRevenue property
        if (!agent.hasOwnProperty("totalRevenue")) {
          throw new Error(
            'Missing property: agent object must have a "totalRevenue" property'
          );
        }

        return sum + agent.totalRevenue; // Add each agent's totalRevenue to the sum
      }, 0); // Initial value for the accumulator (0)

      return totalRevenue;
    }
    if (data?.agentInviteData) {
      setTotalRevenue(getTotalRevenue(data?.agentInviteData));
    }
  }, [data]);
  // useEffect(()=>{

  // },[data])
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
    <div>
      <div className="AgentHomeH1">Welcome to the VIP Agent Portal</div>
      <div>
        {data?.agentInviteData?.length > 0 && data?.statusCode ? (
          <div className="agentHomeDataContainer">
            <div className="agentHomeDataItem">
              <div className="agentHomeDataItemleft">
                <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                  Your Total Agents
                </div>
                <div>{data?.agentInviteData?.length}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdSupportAgent size={30} />{" "}
              </div>
            </div>
            <div className="agentHomeDataItem">
              <div className="agentHomeDataItemleft">
                <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                  Total Revenue
                </div>
                <div>{TotalRevenue}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LiaMoneyBillWaveSolid size={30} />{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="agentNotAccess">
            <div
              style={{
                width: "500px",
                // backgroundColor: 'red',
                height: "100px",
              }}
            >
              <div>You are not authorized to Access this Feature</div>

              <div>
                <IoLogoWhatsapp />
                <span>+91987654321</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentHome;
