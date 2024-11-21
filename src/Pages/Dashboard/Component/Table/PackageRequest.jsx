import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, InputAdornment, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./UserTable.css";
import { apiURL } from "../../../../Constants/constant";

const PackageRequest = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/user/callBackRequests/getAllCallBackRequests`
        );
        const data = response.data.result;

        setUserData(data);
        setTotalPages(Math.ceil(data.length / pageSize));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching callback requests:", error);
        setLoading(false);
      }
    }
    fetchUserData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const filteredData = userData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { field: "name", headerName: "Name", minWidth: 150 },
    { field: "email", headerName: "Email", minWidth: 200 },
    { field: "phone", headerName: "Phone Number", minWidth: 150 },
    { field: "departureCity", headerName: "Departure City", minWidth: 150 },
    { field: "destination", headerName: "Destination", minWidth: 150 },

    { field: "status", headerName: "Status", minWidth: 100 },
  ];

  return (
    <div
      className="user-table-container"
      style={{ position: "relative", width: "100%", marginTop: "100px" }}
    >
      <div
        className="adsearch-bar"
        style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold" }}
      >
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="h5"
          className="adtable-heading"
          style={{ marginLeft: "20px" }}
        >
          Package Callback Requests
        </Typography>
      </div>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={paginatedData}
          columns={columns}
          pageSize={pageSize}
          checkboxSelection
          getRowId={(row) => row._id}
          loading={loading}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: "10px" }}>
                <GridToolbar />
              </div>
            ),
            Pagination: () => null,
          }}
        />
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PackageRequest;
