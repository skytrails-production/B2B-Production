import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { apiURL } from "../../Constants/constant";
const AllEventsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getAllEvents`,
          {
            params: {
              page,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setData(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "slot", headerName: "Slot", flex: 1 },
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
          All Events
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          pagination
          page={page}
          onPageChange={(newPage) => handlePageChange(newPage)}
          getRowId={(row) => row._id}
        />
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
          color="primary"
        />
      </Stack>
    </Paper>
  );
};

export default AllEventsTable;
