import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function Visadoccategory() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/document/getDocumnetCategory`
      );

      const result = response.data.result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "documentTypesId",
      headerName: "Document Name",
      flex: 1,
      valueGetter: (params) =>
        params.row.documentTypesId && params?.row?.documentTypesId?.length
          ? params?.row?.documentTypesId[0]?.documentName
          : "NA",
    },
    {
      field: "documentDescription",
      headerName: "Document Description",
      flex: 1,
      valueGetter: (params) =>
        params.row.documentTypesId && params.row.documentTypesId.length
          ? params.row.documentTypesId[0].description
          : "NA",
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
  ];




  return (
    <Paper className="subada-table-container"
      elevation={3}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}>
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: 10,
          zIndex: 1,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Visa Document Category
        </Typography>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5} // Number of items per page
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        getRowId={(row) => row._id}
      />
    </Paper>
  );
}

export default Visadoccategory;
