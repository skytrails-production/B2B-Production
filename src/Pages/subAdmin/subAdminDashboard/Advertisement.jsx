import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  TextField,
  InputAdornment,
  Typography,
  Paper,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import { apiURL } from "../../../Constants/constant";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const Advertisement = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchAdvertisementData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/getadvertisement`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setAdvertisement(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Advertisement data:", error);
        setLoading(false);
      }
    }

    fetchAdvertisementData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };



  const columns = [
    { field: "title", headerName: "Title", width: 200, },
    { field: "content", headerName: "Content", width: 200 },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleString()}</span>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleString()}</span>
      ),
    },
    { field: "remainingDays", headerName: "Remaining Days", width: 150, },

    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden" }}>
            <img
              src={params.value}
              alt={params.row.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      ),
    },

  ];

  return (
    <>
      {access !== "ADS_HANDLER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> : <Paper className="subada-table-container" elevation={3} style={{ marginTop:"-15px",position: "relative", width: "100%", backgroundColor: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      <div className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center",backgroundColor: "#E73C33" }}>
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title, content, etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Advertisement Table
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        {advertisement && advertisement.length > 0 ? (
          <DataGrid
            rows={advertisement}
            columns={columns}
            pageSize={pageSize}
            pagination
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[pageSize]}
            getRowId={(row) => row._id}
            onPointerMove={(event) => console.log('Pointer moved!', event)}
          />
        ) : (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <Alert severity="info" variant="outlined">
              Data is not available
            </Alert>
          </div>
        )}
      </div>

      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
        <Pagination color="primary" count={totalPages} page={currentPage} onChange={(event, page) => handlePageChange(page)} />
      </Stack>
    </Paper>}
    </>
   
  );
};

export default Advertisement;