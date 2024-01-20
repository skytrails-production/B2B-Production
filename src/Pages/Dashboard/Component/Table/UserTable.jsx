import React, { useState, useEffect } from "react";
import axios from "axios";
import {
 
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../Constants/constant";
import "./UserTable.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid } from '@mui/x-data-grid';
const Usertables = () => {
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
          `${apiURL.baseURL}/skyTrails/api/admin/getAllUsers`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setUserData(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching User bookings:", error);
        setLoading(false);
      }
    }
    fetchUserData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: "username", headerName: "UserName", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dob", headerName: "DOB", flex: 1 },
    {
      field: "phone.mobile_number",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (params) => params.row.phone?.mobile_number || "No Data",
    },
    {
      field: "profilePic",
      headerName: "ProfilePic",
      flex: 1,
      renderCell: (params) => (
        <div style={{ borderRadius: "50%", overflow: "hidden", width: 50, height: 50 }}>
          <img
            src={params.value}
            alt="profilepic"
            className="profile-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className="user-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
        <Typography variant="h5" className="adtable-heading">
          User Table
        </Typography>
      </div>
      <div style={{ width: "100%",backgroundColor:"#fff" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={pageSize}
          page={currentPage - 1}
          pagination
          rowCount={totalPages * pageSize}
          onPageChange={(params) => handlePageChange(params.page + 1)}
          loading={loading}
          getRowId={(row) => row._id}
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

export default Usertables;
