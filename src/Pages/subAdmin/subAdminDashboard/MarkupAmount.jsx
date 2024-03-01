import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { Typography } from "@mui/material";

const MarkUpAmount = () => {
  const [markupData, setMarkupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedMarkup, setEditedMarkup] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
        );
        setMarkupData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEditClick = (data) => {
    setEditMode(true);
    setEditedMarkup(data);
  };

  const handleSaveClick = async (markupId) => {
    try {
      const dataToUpdate = {
        busMarkup: editedMarkup.busMarkup,
        flightMarkup: editedMarkup.flightMarkup,
        holidayPackageMarkup: editedMarkup.holidayPackageMarkup,
        hotelMarkup: editedMarkup.hotelMarkup,
        markupId: markupId,
      };

      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/updateMarkup`,
        dataToUpdate
      );

      // console.log("Update successful:", response.data);

      setEditMode(false);
      setEditedMarkup({});
    } catch (error) {
      console.error("Error updating markup:", error);
    }
  };

  const rowHeadings = [
    "hotelMarkup",
    "flightMarkup",
    "busMarkup",
    "holidayPackageMarkup",
  ];

  return (
    <div className="subad-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 30, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
        <Typography variant="h5" className="adtable-heading">
         Markup table
        </Typography>
      </div>
      <div className="markup-table-container">
        <div className="markup-table" >
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)" }}>
            <thead>
              <tr>
                {rowHeadings.map((heading, index) => (
                  <th key={index} style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#f0f0f0", color: "black" }}>{heading}</th>
                ))}
                <th style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#f0f0f0", color: "black" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {markupData.map((data, index) => (
                <tr key={index}>
                  {rowHeadings.map((heading, subIndex) => (
                    <td key={subIndex} style={{  padding: "10px", borderRadius: "10px", color: "black", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                      {editMode ? (
                        <input
                          type="text"
                          value={editedMarkup[heading] || ""}
                          onChange={(e) =>
                            setEditedMarkup({
                              ...editedMarkup,
                              [heading]: e.target.value,
                            })
                          }
                          style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                        />
                      ) : (
                        data[heading] || "No Data"
                      )}
                    </td>
                  ))}
                  <td style={{  padding: "10px", borderRadius: "10px", color: "black", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                    {editMode && data._id ? (
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSaveClick(data._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#21325D",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditClick(data)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarkUpAmount;
