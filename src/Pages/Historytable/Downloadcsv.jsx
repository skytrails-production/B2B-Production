
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
function Downloadcsv() {
  const [leadsData, setLeadsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/ssdc/leads`
        );
        const { data } = response.data;
       console.log(data);

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
      <button onClick={handleDownloadCsv}>Download CSV</button>
      {/* Displaying the downloaded data */}
      <div>
  <table style={{ backgroundColor: 'lightgray' }}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Country</th>
        <th>Selected Job</th>
      </tr>
    </thead>
    <tbody>
      {leadsData.map((lead, index) => (
        <tr key={index}>
          <td style={{color:'black'}}>{lead.name}</td>
          <td style={{color:'black'}}>{lead.email}</td>
          <td style={{color:'black'}}>{lead.mobile}</td>
          <td style={{color:'black'}}>{lead.country}</td>
          <td style={{color:'black'}}>{lead.subCategory}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default Downloadcsv;

