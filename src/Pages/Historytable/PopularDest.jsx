import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";

const PopularDest = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterdestination, setFilterDestination] = useState([]);

  // 1. useEffect triggers the fetch function when searchTerm changes (debounced for efficiency)
  useEffect(() => {
    // Debounce the search input to avoid excessive API calls
    const delayDebounceFn = setTimeout(() => {
      fetchDestinations(); // Fetch destinations whenever the search term changes
    }, 500); // 500ms delay to debounce the search input

    return () => clearTimeout(delayDebounceFn); // Clear timeout if input changes within 500ms
  }, [searchTerm]); // Trigger useEffect only when searchTerm changes

  // 2. Fetch destinations from the API, filtering by city using searchTerm
  const fetchDestinations = async () => {
    setLoading(true); // Show loading state while fetching
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/user/getPopularDestination`,
        {
          params: {
            page: 1, // Fetch the first page of data
            size: 5, // Limit the number of records per page
            search: searchTerm, // 3. Pass searchTerm (city name) to API as a query param
          },
        }
      );
      setDestinations(response.data.result); // Update state with fetched destinations

      // Filter the destinations based on the search term
      const filtered = response.data.result.filter((item) =>
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterDestination(filtered);
    } catch (error) {
      console.error("Error fetching details", error); // Handle any API errors
    } finally {
      setLoading(false); // Hide loading state after fetching is done
    }
  };

  // 4. Update searchTerm when the user types into the search bar
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Set searchTerm to filter by city name
  };

  // Other actions logic for active, block, delete
  const handleAction = async (destinationId, action) => {
    try {
      let status;
      switch (action) {
        case "active":
          status = "ACTIVE";
          break;
        case "block":
          status = "BLOCKED";
          break;
        case "delete":
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (!confirmDelete) return;
          status = "DELETE";
          break;
        default:
          return;
      }

      await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/updatePopularDestination`,
        {
          destinationId: destinationId,
          status: status,
        }
      );
      // Fetch updated data after action
      fetchDestinations();
    } catch (error) {
      console.error("error", error);
    }
  };

  const columns = [
    {
      field: "images",
      headerName: "Profile",
      width: 200,
      renderCell: (params) => (
        <img
          src={params?.row?.images || "No data"}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 220,
      valueGetter: (params) => params.row.city || "No Data",
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 220,
      valueGetter: (params) => params.row.discount || "No Data",
    },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      valueGetter: (params) => params.row.status || "No Data",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleAction(params.row._id, "active")}
            style={{ marginRight: "30px" }}
          >
            Active
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => handleAction(params.row._id, "block")}
            style={{ marginRight: "30px" }}
          >
            Block
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleAction(params.row._id, "delete")}
            style={{ marginRight: "30px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: "10",
          zIndex: 1,
          fontWeight: "bold",
        }}
      >
        {/* 5. Search bar for city names */}
        <TextField
          type="text"
          value={searchTerm} // Use searchTerm as the value
          onChange={handleSearch} // 6. Trigger handleSearch on input change
          placeholder="Search by city"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading">
          Popular Destination
        </Typography>
      </div>
      <Paper>
        <DataGrid
          rows={filterdestination.length ? filterdestination : destinations} // Use filtered data if available
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          getRowId={(row) => row._id}
          style={{ width: "100%" }}
          loading={loading} // Show loading indicator when data is being fetched
          components={{
            Toolbar: () => (
              <div style={{ marginTop: "20px" }}>
                <GridToolbar />
              </div>
            ),
            Pagination: () => null,
          }}
        />
      </Paper>
    </div>
  );
};

export default PopularDest;
