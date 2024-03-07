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
import { DataGrid,GridToolbar,GridToolbarExport } from '@mui/x-data-grid';
import { apiURL } from "../../../Constants/constant";
const EventGet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationNames, setLocationNames] = useState({});
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
    {
      field: "title",
      headerName: "Title",
      width: 400,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>{params.row.title}</div>
      ),
    },
    { 
      field: "content", 
      headerName: "Content", 
      width: 220,
      renderCell: (params) => (
        // <div style={{ padding: '8px' }}>
          <textarea
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '4px',
              resize: 'none',
              boxSizing: 'border-box',
            }}
            readOnly
            value={params.row.content}
          />
        // </div>
      ),
    },
    { 
      field: "startDate", 
      headerName: "Start Date", 
      width: 220,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleDateString()}</div>
      ),
    },
    { 
      field: "endDate", 
      headerName: "End Date", 
      width: 220,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleDateString()}</div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 220,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <strong>Latitude:</strong> {params.row.location.coordinates[1]}
          </div>
          <div>
            <strong>Longitude:</strong> {params.row.location.coordinates[0]}
          </div>
        </div>
      ),
    },
    {
      field: "slot",
      headerName: "Slot",
      width: 220,
      renderCell: (params) => (
        <div>
          {params.row.slot.filter((s) => s.isAvailable).length} Available
        </div>
      ),
    },
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
          backgroundColor:"#E73C33"
        }}
      >
       
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
          components={{
            Toolbar: () => (
                <div style={{ marginTop: '10px' }}>
                <GridToolbar />
               
              </div>
            ),
            Pagination:()=>null,
          }}
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

export default EventGet;
