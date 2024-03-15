import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import{Typography,Paper}from "@mui/material"; 
function Downloadcsv() {
  const [leadsData, setLeadsData] = useState([]);

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
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: 'absolute',
          top: 10,
          zIndex: 1,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          width: '92%',
        }}
      >
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: '20px', color: 'white',fontWeight:'500'}}>
          SSDC Leads
        </Typography>
      </div>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button style={{backgroundColor:'green',color:'white',marginTop:'30px',padding:"8px",borderRadius: '5px'}} onClick={handleDownloadCsv}>Download CSV</button>
      </div>
      <div style={{ overflowX: "auto", backgroundColor:'white'}}>
        <table style={{ width: "100%", borderCollapse: "collapse",border:'none' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>Name</th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>Email</th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>Mobile</th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>Country</th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>Selected Job</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead, index) => (
              <tr key={index}>
                <td style={{ borderBottom: "1px solid black", padding: "8px",backgroundColor:'white' ,color:'black'}}>{lead.name}</td>
                <td style={{ borderBottom: "1px solid black", padding: "8px",backgroundColor:'white',color:'black'}}>{lead.email}</td>
                <td style={{ borderBottom: "1px solid black", padding: "8px",backgroundColor:'white',color:'black'}}>{lead.mobile}</td>
                <td style={{ borderBottom: "1px solid black", padding: "8px" ,backgroundColor:'white',color:'black'}}>{lead.country}</td>
                <td style={{ borderBottom: "1px solid black", padding: "8px",backgroundColor:'white',color:'black' }}>{lead.subCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Paper>
    </div>
  );
}

export default Downloadcsv;


