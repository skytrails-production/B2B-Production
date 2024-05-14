import React, { useState, useEffect } from "react";
import "./AddSubadmin.css";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/whitelogo1.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const AgentWise = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const reducerState = useSelector((state) => state);
  const token = reducerState?.subadminLogin?.subadminloginData?.result?.token;
  console.log(token, "token:localStorage.getItem('token')");

  const handleAgentSelectChange = (e) => {
    setSelectedAgentId(e.target.value);
  };

  useEffect(() => {
    async function fetchRelationshipManagers() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAgenList`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        setAgents(response.data.result);
      } catch (error) {
        console.error("Error fetching Relationship Managers:", error);
      }
    }

    fetchRelationshipManagers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bookingType: type,
      agentId: selectedAgentId,
    };

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/subAdmin/getBookingAgentWise`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setResponseData(data);
        setSubmitButtonClicked(true);
      } else {
        // Handle error responses
      }
    } catch (error) {
      console.error("Error creating Relationship Manager:", error.message);
    }
  };

  const renderTable = (bookingType) => {
    if (submitButtonClicked && responseData) {
      const rows = responseData?.result?.[`${bookingType}Booking`] || [];

      const columns = [
        // Define columns based on booking type
        { field: "bookingId", headerName: "Booking ID", width: 150 },
        { field: "origin", headerName: "Origin", width: 150 },
        { field: "destination", headerName: "Destination", width: 150 },
        { field: "amount", headerName: "Total Amount", width: 150 },
        //{ field: "pnr", headerName: "PNR", width: 150 },
      ]; // You can adjust column definitions as needed for other types

      return (
        <div>
          <h2>
            {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}{" "}
            Bookings
          </h2>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            autoHeight
            components={{ LoadingOverlay: () => null }} // To remove loading overlay
            getRowId={(row) => row._id}
            component={{
              Pagination:()=>null
            }}
          
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ width: "80%",margin:"auto"}}>
      <div className="form-containers">
        <header
          className="sectionagent headersagent"
          style={{ backgroundColor: "#E73C33" }}
        >
          <div className="headead">
            <h2>AgentWise Booking</h2>
          </div>
        </header>
        <div className="form-agent">
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            <select
              name="agentId"
              onChange={handleAgentSelectChange}
              style={{ padding: "0px" }}
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent.agentId} value={agent.agentId}>
                  {agent.agentName}
                </option>
              ))}
            </select>
            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              style={{ padding: "0px" }}
            >
              <option value="">Select Type</option>
              <option value="all">all</option>
              <option value="flight">flight</option>
              <option value="bus">bus</option>
              <option value="hotel">hotel</option>
            </select>
            <div className="form-group-agent">
              <button
                type="submit"
                className="form-button-agents"
                style={{ backgroundColor: "#E73C33" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {responseData && (
        <>
          {type === "all" && (
            <>
              {renderTable("flight")}
              {renderTable("hotel")}
              {renderTable("bus")}
            </>
          )}
          {type !== "all" && type && renderTable(type)}
        </>
      )}
    </div>
  );
};

export default AgentWise;
