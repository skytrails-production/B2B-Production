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
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAgnetReferralsCount?agentId=${selectedAgent}`,
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

  return (
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
          color="primary"
          disabled={!selectedAgent}
          style={{ marginLeft: "10px", backgroundColor: "#E73C33" }}
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
              <Typography>No data available for the selected agent</Typography>
            ) : (
              <Typography>Result: {relationshipManagers.result}</Typography>
            )}
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default AgentList;
