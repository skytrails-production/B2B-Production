// AllAdvertisementTable.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
  IconButton, // Import IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { apiURL } from "../../../../../Constants/constant";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Import ArrowUpwardIcon
import "./AgentRequest.css";
import FilterListIcon from "@mui/icons-material/FilterList"; // Import FilterListIcon
import TuneIcon from "@mui/icons-material/Tune"; // Import TuneIcon
import Button from "@mui/material/Button"; // Import Button
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline"; // Import an approval icon

const AllAdvertisementTable = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: "", order: "" });

  useEffect(() => {
    async function fetchAdvertisementData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAgents`,
          {
            params: {
              page: currentPage,
              size: pageSize,
            },
          }
        );
        console.log("API Request URL:", response.config.url);
        setAdvertisement(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bus bookings:", error);
        setLoading(false);
      }
    }

    fetchAdvertisementData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = advertisement.filter((item) => {
      const usernameMatch =
        item.personal_details?.first_name?.toLowerCase().includes(term) || false;
      const dobMatch = item.personal_details?.email?.toLowerCase().includes(term) || false;
      const mobileNumberMatch =
        item.personal_details?.mobile?.mobile_number.toLowerCase().includes(term) || false;

      return usernameMatch || dobMatch || mobileNumberMatch;
    });

    setFilteredData(filtered);
  };

  const handleSorting = (columnName) => {
    const isAsc = sortOrder.column === columnName && sortOrder.order === "asc";
    const order = isAsc ? "desc" : "asc";

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a.personal_details[columnName] || "";
      const bValue = b.personal_details[columnName] || "";

      if (order === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredData(sortedData);
    setSortOrder({ column: columnName, order: order });
  };

  return (
    <div className="subada-table-container">
      <div className="adsearch-bar">
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="h5" className="adtable-heading">
          Agent Request Table
        </Typography>
      </div>
      <TableContainer className="custom-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleSorting("first_name")}
              >
                Agent Name
                {sortOrder.column === "first_name" && sortOrder.order === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}
                <TuneIcon style={{ marginLeft: 4, verticalAlign: "middle" }} />
              </TableCell>
              <TableCell
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleSorting("mobile_number")}
              >
                Contact
                {sortOrder.column === "mobile_number" && sortOrder.order === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}
                <TuneIcon style={{ marginLeft: 4, verticalAlign: "middle" }} />
              </TableCell>
              <TableCell
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleSorting("email")}
              >
                Email
                {sortOrder.column === "email" && sortOrder.order === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}
                <TuneIcon style={{ marginLeft: 4, verticalAlign: "middle" }} />
              </TableCell>

              <TableCell
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleSorting("address")}
              >
                Agency Location
                {sortOrder.column === "address" && sortOrder.order === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </TableCell>
              <TableCell
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleSorting("pan_number")}
              >
                Pan Number
                {sortOrder.column === "pan_number" && sortOrder.order === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </TableCell>
              <TableCell style={{ border: "none" }}>APPROVE STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tablead">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ border: "none" }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell style={{ border: "none" }}>
                    {`${ad.personal_details?.first_name} ${ad.personal_details?.last_name}` ||
                      "No Data"}
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    {ad.personal_details?.mobile?.mobile_number || "No Data"}
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    {ad.personal_details?.email || "No Data"}
                  </TableCell>

                  <TableCell style={{ border: "none" }}>
                    {ad.agency_details?.address || "No Data"}
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    {ad.agency_details?.pan_number || "No Data"}
                  </TableCell>
                  <TableCell style={{ border: "none", alignItems: "center",justifyContent:"center",display:"flex" }}>
                    <IconButton
                      size="small"
                      style={{ backgroundColor: "#21325D", color: "#FFFFFF" }}
                    >
                      <ApprovalIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
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

export default AllAdvertisementTable;
