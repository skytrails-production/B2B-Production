// Usertables.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../Constants/constant";
import "./UserTable.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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

  return (
    <div className="user-table-container">

      <div className="adsearch-bar">
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
      <TableContainer component={Paper} style={{border:"none"}} >
        <Table style={{border:"none"}}>
          <TableHead style={{border:"none"}}>
            <TableRow style={{border:"none"}}>
              <TableCell >UserName</TableCell>
              <TableCell >Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>ProfilePic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tablead" style={{border:"none"}}>
            {userData.map((user) => (
              <TableRow key={user._id} style={{border:"none"}} >
                <TableCell>{user.username || "No Data"}</TableCell>
                <TableCell>{user.email || "No Data"}</TableCell>
                <TableCell>{user.dob || "No Data"}</TableCell>
                <TableCell>{user.phone?.mobile_number || "No Data"}</TableCell>
                <TableCell>
                  <img
                    src={user.profilePic}
                    alt="profilepic"
                    className="profile-image rounded-circle"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
