import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
// import VisaCountry from "../../Visapage/Visacountry";

const VisaCountry = () => {
  const [data, setData] = useState([]); // Initializing state for data
  const [page, setPage] = useState(1); // Initializing state for page number
  const [totalPages, setTotalPages] = useState(1); // Initializing state for total pages

  // Function to fetch data from the API
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/getAllVisaCountry?page=${pageNumber}`
      );
      const result = response.data.result;
      setData(result); // Updating state with fetched data
      setTotalPages(response.data.totalPages); // Updating state with total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch data when the page state changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Define columns for the data grid
  const columns = [
    { field: "countryName", headerName: "Country Name", flex: 5 },
    { field: "daysToProcess", headerName: "Days To Process", flex: 5 },
    { field: "status", headerName: "Status", flex: 5 },
    { field: "issuedType", headerName: "Issued Type", flex: 5 },
    {
      field: "requireDocumentId.visaType",
      headerName: "Visa Type",
      flex: 5,
      renderCell: (params) =>
        params.row.requireDocumentId?.visaType || "N/A", // Render "N/A" if visaType is not present
    },
    {
      field: "requireDocumentId.requiredDocCategory",
      headerName: "Required Document Category",
      flex: 7,
      renderCell: (params) => params.row.requireDocumentId?.requiredDocCategory?.join(", ") || "N/A", // Join categories with comma if present
    },
  ];

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Update page state
  };

  // JSX rendering
  return (
    <Paper
      className="subada-table-container"
      elevation={3}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginTop:"-15px"
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
          backgroundColor:"#E73C33",
        }}
      >
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Visa Country Table
        </Typography>
      </div>

      <>
        {data && data.length > 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            pagination
            page={page}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[]}
            getRowId={(row) => row._id}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: '10px' }}>
                <GridToolbarColumnsButton />
                <GridToolbarExport/>
              </div>
              ),
              Pagination:()=>null,
            }}
          />
        ) : (
          <Typography variant="body1" style={{ marginTop: 20, textAlign: "center" }}>
            No data available
          </Typography>
        )}



        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
        />
      </>

    </Paper>
  );
};

export default VisaCountry;
