import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Visacategorytable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/getAllVisaCountry?page=${pageNumber}`
      );
      const result = response.data.result;
      setData(result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = [
    { field: "countryName", headerName: "Country Name", flex: 5 },
    { field: "daysToProcess", headerName: "Days To Process", flex: 5 },
    {
      field: "gallery",
      headerName: "Gallery",
      flex: 5,
      renderCell: (params) => (
        <img
          src={params.row.gallery.length > 0 ? params.row.gallery[0] : ""}
          alt={params.row.countryName}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "status", headerName: "Status", flex: 5 },
    { field: "issuedType", headerName: "Issued Type", flex: 5 },
    { field: "createdAt", headerName: "Created At", flex: 5 },
    {
      field: "requireDocumentId.visaType",
      headerName: "Visa Type",
      flex: 5,
      renderCell: (params) =>
        params.row.requireDocumentId?.visaType || "N/A", // Use "N/A" or any default value if not present
    },

    {
      field: "requireDocumentId.requiredDocCategory",
      headerName: "Required Document Category",
      flex: 7,
      renderCell: (params) => params.row.requireDocumentId?.requiredDocCategory?.join(", ") || "N/A",
    },

  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
          Visa Country Table
        </Typography>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5} // Number of items per page
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        pagination
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]}
        getRowId={(row) => row._id}
      />

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default Visacategorytable;
