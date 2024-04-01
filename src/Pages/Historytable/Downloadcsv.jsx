
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import { Typography, Paper } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import the download icon

function Downloadcsv() {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/ssdc/leads`
        );
        const { data } = response.data;

        if (Array.isArray(data)) {
          setLeadsData(data); // Store data in state
        } else {
          console.error("Invalid data format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCsv = () => {
    // CSV download logic
    const headers = Object.keys(leadsData[0]);
    const csvData = [
      headers.join(","),
      ...leadsData.map((item) => Object.values(item).join(",")),
    ].join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "ssdcLeads.csv";
    link.click();
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Paper
        className="subada-table-container"
        elevation={3}
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="adsearch-bar"
          style={{
            position: "absolute",
            top: 10,
            zIndex: 1,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            className="adtable-heading"
            style={{ color: "white", fontWeight: "500" }}
          >
            SSDC Leads
          </Typography>

          <button
            style={{
              backgroundColor: "#21325D",
              color: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
            onClick={handleDownloadCsv}
          >
            Download CSV
            <GetAppIcon style={{ marginLeft: "5px" }} />
          </button>
        </div>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : leadsData.length === 0 ? (
          <Typography style={{ marginTop: '100px', marginLeft: '30%', fontSize: '2.5rem' }}>Data is not available.</Typography>
        ) : (
          <div style={{ overflowX: "auto", backgroundColor: "white" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "none",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                    Email
                  </th>
                  <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                    Mobile
                  </th>
                  <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                    Country
                  </th>
                  <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                    Selected Job
                  </th>
                </tr>
              </thead>
              <tbody>
                {leadsData.map((lead, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      {lead.name}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      {lead.email}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      {lead.mobile}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      {lead.country}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      {lead.subCategory}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Downloadcsv;
