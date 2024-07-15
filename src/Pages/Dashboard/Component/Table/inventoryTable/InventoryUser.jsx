import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../../Constants/constant";
import "./InventoryUser.css";

const InventoryUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/inventory/getAllInventoryData`,
          {
            params: {
              page: currentPage,
              limit: pageSize,
              search: searchTerm,
            },
          }
        );
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.result)) {
          setData(response.data.result);
          setTotalRecords(response.data.totalRecords);
        } else {
          setData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1); // DataGrid pages are 0-based
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: "hotelName", headerName: "Hotel Name", width: 220 },
    { field: "description", headerName: "Description", width: 220 },
    { field: "hotelCity", headerName: "Hotel City", width: 220 },
    { field: "hotelCountry", headerName: "Hotel Country", width: 220 },
    { field: "hotelState", headerName: "Hotel State", width: 220 },
    { field: "hotelAddress", headerName: "Hotel Address", width: 220 },

    { field: "totalRooms", headerName: "TotalRooms", width: 220 },
    { field: "rating", headerName: "Rating", width: 220 },
    {
      field: "mealType",
      headerName: "Meal",
      width: 220,
      valueGetter: (params) => params.row.mealType.join(", ") || "No Data",
    },
    { field: "cityCode", headerName: "City Code", width: 220 },

    // { field: "location", headerName: "Location", width: 220 },
    { field: "locality", headerName: "Locality", width: 220 },
    { field: "hotelCode", headerName: "HotelCode", width: 220 },

    {
      field: "room_Price",
      headerName: "Price Per Night",
      width: 220,
      valueGetter: (params) => params.row.rooms?.[0]?.room_Price || "No Data",
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className="adsearch-bar"
        style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold" }}
      >
        {/* <TextField
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
        /> */}
        <Typography variant="h5" className="adtable-heading">
          Inventory User
        </Typography>
      </div>

      <Paper>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          rowCount={totalRecords}
          paginationMode="server"
          pagination
          onPageChange={handlePageChange}
          getRowId={(row) => row._id} // Use _id as the unique identifier
          style={{ width: "100%" }}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: "10px" }}>
                <GridToolbar />
              </div>
            ),
          }}
        />
      </Paper>

      {/* <div className="paginate">
        <Stack spacing={2} direction="row" justifyContent="center">
          <Pagination
            count={Math.ceil(totalRecords / pageSize)}
            page={currentPage}
            onChange={(event, page) => handlePageChange({ page: page - 1 })}
            color="primary"
          />
        </Stack>
      </div> */}
    </div>
  );
};

export default InventoryUser;
