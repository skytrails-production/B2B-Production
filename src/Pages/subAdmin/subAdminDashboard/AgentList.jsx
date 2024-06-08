import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Paper,
  Typography,
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
  const [invites, setInvites] = useState([]);
  const reducerState = useSelector((state) => state);
  const token = reducerState?.subadminLogin?.subadminloginData?.result?.token;

  useEffect(() => {
    async function fetchAgents() {
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

        // Fetch agent referrals count
        const referralsCountResponse = axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAgnetReferralsCount?agentId=${selectedAgent}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        // Fetch all invites
        const allInvitesResponse = axios.get(
          `${apiURL.baseURL}/skyTrails/agent/getAllInvites/${selectedAgent}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const [referralsCount, allInvites] = await Promise.all([
          referralsCountResponse,
          allInvitesResponse,
        ]);

        setRelationshipManagers({
          referralsCount: referralsCount.data,
        });
        setInvites(allInvites.data.result); // Set invites data
        console.log(allInvites.data.result, "+++++++++++++++++++++");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  const handleAgentSelectChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      width: 200,
      valueGetter: (params) => {
        return params.row?.personal_details?.first_name || "No Data";
      },
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 200,
      valueGetter: (params) => {
        return params.row?.personal_details?.last_name || "No Data";
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => {
        return params.row?.personal_details?.email || "No Data";
      },
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      width: 200,
      valueGetter: (params) => {
        return params.row?.personal_details?.mobile?.mobile_number || "No Data";
      },
    },
    // Add more columns as needed
  ];

  // Ensure each row has a unique `id` property
  const rows = invites.map((invite, index) => ({
    id: invite._id, // Assuming `_id` is unique in your data
    ...invite,
  }));

  return (
    <>
      <Paper style={{ width: "50%", margin: "auto", padding: "20px" }}>
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
              {agents.map((agent) => (
                <MenuItem key={agent.agentId} value={agent.agentId}>
                  {agent.agentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={!selectedAgent}
            style={{
              marginLeft: "10px",
              backgroundColor: "#E73C33",
              color: "white",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div>
            <Paper style={{ marginTop: "20px", padding: "10px" }}>
              {relationshipManagers === null ? (
                <Typography>
                  No data available for the selected agent
                </Typography>
              ) : (
                <div>
                  <Typography>
                    Referrals Count:{" "}
                    {JSON.stringify(relationshipManagers.referralsCount.result)}
                  </Typography>
                </div>
              )}
            </Paper>
          </div>
        )}
      </Paper>
      <div style={{marginTop:"10px", width: "85%", margin: "auto" }}>
        <DataGrid
          rows={rows} // Use rows with unique `id`
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default AgentList;
