import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";

function Package() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/getAllPackageEnquiry?page=${pageNumber}`
      );
      const result = response.data.result.docs;
      setData(result);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const columns = [
    { field: "userId", headerName: "User Id", flex: 1 },
    { field: "fullName", headerName: "Full Name", flex: 1 },

    {
      field: "contactNumber.phone",
      headerName: "Contact Number",
      flex: 2,
      valueGetter: (params) => params.row.contactNumber?.phone || 'N/A',
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "departureCity", headerName: "Departure City", flex: 1 },
    { field: "adults", headerName: "Adults", flex: 1 },
    { field: "child", headerName: "Child", flex: 1 },
    { field: "packageType", headerName: "Package Type", flex: 1 },
    { field: "departureDate", headerName: "Departure Date", flex: 1 },
    {
      field: "connected",
      headerName: "Connected",
      flex: 1,
      valueGetter: (params) => (params.row.connected ? "Yes" : "No"),
    },
    { field: "noOfPeople", headerName: "No Of People", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

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
        }}
      >
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, ID, etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          All Package Enquiry
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          pagination
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[]}
          // components={{
          //   Toolbar: GridToolbar,
          // }}
          getRowId={(row) => row._id}
        />
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(event, newPage)}
          color="primary"
        />

      </Stack>
    </Paper>
  );
}

export default Package;
