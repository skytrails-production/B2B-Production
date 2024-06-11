import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Paper,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { apiURL } from "../../../Constants/constant";

const AgentList = () => {
  const [relationshipManagers, setRelationshipManagers] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState("");
  const reducerState = useSelector((state) => state);
  const token = reducerState?.subadminLogin?.subadminloginData?.result?.token;

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAllRM`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        setAgents(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Agents:", error);
        setLoading(false);
      }
    }

    fetchAgents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAgent) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getRMAgentList?rmId=${selectedAgent}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        setRelationshipManagers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Relationship Managers:", error);
        setLoading(false);
      }
    }
  };

  const handleAgentSelectChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  const columns = [
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      width: 150,
      valueGetter: (params) => params.row.personal_details.mobile.mobile_number,
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      valueGetter: (params) => params.row.personal_details.first_name,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      valueGetter: (params) => params.row.personal_details.last_name,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.personal_details.email,
    },
  ];

  return (
    <>
      <Paper
        style={{
          width: "50%",
          margin: "auto",
          padding: "20px",
          marginBottom: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <Select
              value={selectedAgent}
              onChange={handleAgentSelectChange}
              displayEmpty
              style={{ minWidth: "200px" }}
            >
              <MenuItem value="" disabled>
                Select Agent
              </MenuItem>
              {agents?.map((agent) => (
                <MenuItem key={agent.agentId} value={agent._id}>
                  {agent.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!selectedAgent}
            style={{ marginLeft: "10px", backgroundColor: "#E73C33" }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Paper>
      {!loading && relationshipManagers && (
        <div style={{ width: "70%", margin: "auto" }}>
          <DataGrid
            rows={relationshipManagers.result}
            columns={columns}
            pageSize={5}
            autoHeight
            getRowId={(row) => row._id}
          />
        </div>
      )}
    </>
  );
};

export default AgentList;
