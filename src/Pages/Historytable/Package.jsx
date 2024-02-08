import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";
import Button from '@mui/material/Button'; // Assuming you're using Material-UI
import Swal from 'sweetalert2'; // Import SweetAlert

function Package() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/getAllPackageEnquiry?page=${pageNumber}`
      );
      const result = response.data.result.docs;
      setData(result);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleShowAlert = (params) => {
    const rowDetails = params.row;

    Swal.fire({
      title: '<span style="background-color: #21325D; color: #fff; padding: 8px; border-radius: 10px 0px 10px 0px;">View All Details</span>',
      html: `
        <div style="text-align: left;">
          <ol style="list-style-type:disc; padding-left: 20px;">
            <li><strong style="color: #21325D;">Full Name:</strong> ${rowDetails.fullName}</li>
            <li><strong style="color: #21325D;">Contact Number:</strong> ${rowDetails.contactNumber.phone}</li>
            <li><strong style="color: #21325D;">Email:</strong> ${rowDetails.email}</li>
            <li><strong style="color: #21325D;">Departure City:</strong> ${rowDetails.departureCity}</li>
            <li><strong style="color: #21325D;">Adults:</strong> ${rowDetails.adults}</li>
            <li><strong style="color: #21325D;">Child:</strong> ${rowDetails.child}</li>
            <li><strong style="color: #21325D;">Package Type:</strong> ${rowDetails.packageType}</li>
            <li><strong style="color: #21325D;">Departure Date:</strong> ${rowDetails.departureDate}</li>
            <li><strong style="color: #21325D;">Connected:</strong> ${rowDetails.connected ? "Yes" : "No"}</li>
            <li><strong style="color: #21325D;">No Of People:</strong> ${rowDetails.noOfPeople}</li>
            <li><strong style="color: #21325D;">Status:</strong> ${rowDetails.status}</li>
          </ol>
        </div>
      `,
      showConfirmButton: false, // Remove the OK button
      customClass: {
        popup: 'swal-popup-custom' // Custom class for the entire popup
      }
    });
  };




  const columns = [
    {
      field: "viewDetails",
      headerName: "View All Details",
      width: 220,
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            style={{ backgroundColor: "#21325D",color:"#fff" }}
           

            onClick={() => handleShowAlert(params)}
          >
            View
          </Button>
        );
      }
    },
    { field: "fullName", headerName: "Full Name", width: 220, width: 130 },

    {
      field: "contactNumber.phone",
      headerName: "Contact Number",
      width: 220,
      valueGetter: (params) => params.row.contactNumber?.phone || 'N/A',
    },
    { field: "email", headerName: "Email", width: 270 },
    { field: "departureCity", headerName: "Departure City", width: 220, },
    { field: "adults", headerName: "Adults", width: 220, },
    { field: "child", headerName: "Child", width: 220, },
    { field: "packageType", headerName: "Package Type", width: 220, },
    { field: "departureDate", headerName: "Departure Date", width: 220, },
    {
      field: "connected",
      headerName: "Connected",
      width: 220,
      valueGetter: (params) => (params.row.connected ? "Yes" : "No"),
    },
    { field: "noOfPeople", headerName: "No Of People", width: 220, },
    { field: "status", headerName: "Status", width: 220, },
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
          All Package Enquiry
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          pagination
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[]}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '10px' }}>
                <GridToolbar />
              </div>
            ),
          }}
          getRowId={(row) => row._id}
        />
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(event, newPage)}
          color="primary"
        />

      </Stack>
    </Paper>
  );
}

export default Package;
