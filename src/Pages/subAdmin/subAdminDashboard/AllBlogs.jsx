import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Pagination,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../Constants/constant";
import { DataGrid, GridToolbar, GridToolbarExport } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import subAdminaccess from "./subAdminaccess";
import Swal from "sweetalert2";
import { width } from "@mui/system";
import "./Blog.css";
const AllBlogs = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const reducerState = useSelector((state) => state);
  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setFlightBookings(response.data.result);
        console.log(response.data.result.allBlogs, "allBlogsssss");
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight bookings:", error);
        setLoading(false);
      }
    }
    fetchFlightBookings();
  }, [currentPage, searchTerm]);

  const handleHide = async (row) => {
    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/blog/hideBlog`,
        { blogId: row._id }
      );
      console.log("Blog hidden successfully:", response.data);
      // Optionally, update UI or show a success message
    } catch (error) {
      console.error("Error hiding blog:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/blog/deleteBlog`,
        { blogId: row._id }
      );
      console.log("Blog deleted successfully:", response.data);
      // Optionally, update UI or show a success message
    } catch (error) {
      console.error("Error deleting blog:", error);
      // Optionally, show an error message to the user
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 400 },
    { field: "views", headerName: "Views", width: 120 },
    { field: "likesCount", headerName: "Likes", width: 120 },
    { field: "location", headerName: "Location", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "deleteAction",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "hideAction",
      headerName: "Hide",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{
            backgroundColor: params.row.status === "DELETE" ? "grey" : "green",
            color: "white",
          }}
          onClick={() => handleHide(params.row)}
        >
          Hide
        </Button> 
      ),
    },
  ];

  return (
    <>
      {access !== "CONTENT_MANAGER" ? (
        <div style={{ textAlign: "center" }}>INVALID PAGE</div>
      ) : (
        <div
          className="subada-table-container"
          style={{ position: "relative", width: "100%", marginTop: "-15px" }}
        >
          <div
            className="adsearch-bar"
            style={{
              position: "absolute",
              top: 10,
              zIndex: 1,
              fontWeight: "bold",
              backgroundColor: "#E73C33",
            }}
          >
            <Typography
              variant="h5"
              className="adtable-heading"
              style={{ fontWeight: "bold" }}
            >
              Agent Flight Booking
            </Typography>
          </div>
          {flightBookings && flightBookings.length > 0 && (
            <Paper style={{ width: "100%" }}>
              <DataGrid
                rows={flightBookings}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[pageSize]}
                pagination
                getRowId={(row) => row._id}
                components={{
                  Toolbar: () => (
                    <div style={{ marginTop: "10px" }}>
                      <GridToolbar />
                    </div>
                  ),
                  Pagination: () => null,
                }}
              />
            </Paper>
          )}

          {/* Pagination */}
        </div>
      )}
    </>
  );
};

export default AllBlogs;
