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
import Button from "@mui/material/Button";
import { apiURL } from "../../Constants/constant";
import Swal from "sweetalert2";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import the download icon

function Package() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Define searchTerm state

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/getAllPackageEnquiry?page=${pageNumber}`
      );
      const result = response.data.result.docs;
      setData(result);
      setTotalPages(response.data.result.totalPages);
      setTotalDocs(response.data.result.totalDocs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  const handleShowAlert = (params) => {
    const rowDetails = params.row;

    Swal.fire({
      title:
        '<span style="background-color: #21325D; color: #fff; padding: 8px; border-radius: 10px 0px 10px 0px;">View All Details</span>',
      html: `
            <div style="text-align: left;">
              <ol style="list-style-type:disc; padding-left: 20px;">
              <li><strong style="color: #21325D;">Country:</strong> ${
                rowDetails.packageId.country
              }</li>
              <li><strong style="color: #21325D;">Package Title:</strong> ${
                rowDetails.packageId.pakage_title
              }</li> 
              <li><strong style="color: #21325D;">Package Amount:</strong> ${
                rowDetails.packageId.pakage_amount.amount
              } ${rowDetails.packageId.pakage_amount.currency}</li>
      
                <li><strong style="color: #21325D;">Full Name:</strong> ${
                  rowDetails.fullName
                }</li>
                <li><strong style="color: #21325D;">Contact Number:</strong> ${
                  rowDetails.contactNumber.phone
                }</li>
                <li><strong style="color: #21325D;">Email:</strong> ${
                  rowDetails.email
                }</li>
                <li><strong style="color: #21325D;">Departure City:</strong> ${
                  rowDetails.departureCity
                }</li>
                <li><strong style="color: #21325D;">Adults:</strong> ${
                  rowDetails.adults
                }</li>
                <li><strong style="color: #21325D;">Child:</strong> ${
                  rowDetails.child
                }</li>
                <li><strong style="color: #21325D;">Package Type:</strong> ${
                  rowDetails.packageType
                }</li>
                <li><strong style="color: #21325D;">Departure Date:</strong> ${
                  rowDetails.departureDate
                }</li>
                <li><strong style="color: #21325D;">Connected:</strong> ${
                  rowDetails.connected ? "Yes" : "No"
                }</li>
                <li><strong style="color: #21325D;">No Of People:</strong> ${
                  rowDetails.noOfPeople
                }</li>
                <li><strong style="color: #21325D;">Status:</strong> ${
                  rowDetails.status
                }</li>
              </ol>
            </div>
          `,
      showConfirmButton: false, // Remove the OK button
      customClass: {
        popup: "swal-popup-custom", // Custom class for the entire popup
      },
    });
  };

  const handleDownloadAllData = async () => {
    try {
      const totalPages = Math.ceil(totalDocs / 8); // Assuming each page has 8 documents

      let allData = [];

      // Fetch data from all pages
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getAllPackageEnquiry?page=${page}`
        );
        allData = allData.concat(response.data.result.docs);
      }

      // Define column titles
      const columnTitles = [
        "Country",
        "Package Title",
        "Package Amount",
        "Name",
        "Contact Number",
        "Email",
        "Departure City",
        "Adults",
        "Child",
        "Package Type",
        "Departure Date",
        "Connected",
        "No Of People",
        "Status",
      ];

      // Extract specific fields from data
      const extractedData = allData.map((row) => ({
        Country: row.packageId?.country || "N/A",
        "Package Title": row.packageId?.pakage_title || "N/A",
        "Package Amount":
          `${row.packageId?.pakage_amount.amount} ${row.packageId.pakage_amount.currency}` ||
          "N/A",
        Name: row.fullName || "N/A",
        "Contact Number": row.contactNumber?.phone || "N/A",
        Email: row.email || "N/A",
        "Departure City": row.departureCity || "N/A",
        Adults: row.adults || "N/A",
        Child: row.child || "N/A",
        "Package Type": row.packageType || "N/A",
        "Departure Date": row.departureDate || "N/A",
        Connected: row.connected ? "Yes" : "No",
        "No Of People": row.noOfPeople || "N/A",
        Status: row.status || "N/A",
      }));

      // Convert data to CSV format
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [columnTitles.join(",")]
          .concat(extractedData.map((row) => Object.values(row).join(",")))
          .join("\n");

      // Create a download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "all_data.csv");
      document.body.appendChild(link);

      // Click the link to initiate download
      link.click();
    } catch (error) {
      console.error("Error downloading data:", error);
    }
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
            style={{ backgroundColor: "#21325D", color: "#fff" }}
            onClick={() => handleShowAlert(params)}
          >
            View
          </Button>
        );
      },
    },

    {
      field: "packageId.country",
      headerName: "Country",
      width: 130,
      valueGetter: (params) => params.row.packageId?.country || "N/A",
    },
    {
      field: "packageId.pakage_title",
      headerName: "Package Title",
      width: 220,
      valueGetter: (params) => params.row.packageId?.pakage_title || "N/A",
    },
    {
      field: "packageId.pakage_amount",
      headerName: "Package Amount",
      width: 220,
      valueGetter: (params) =>
        `${params.row.packageId?.pakage_amount.amount} ${params.row.packageId.pakage_amount.currency}`,
    },

    { field: "fullName", headerName: "Name", width: 270 },
    {
      field: "contactNumber.phone",
      headerName: "Contact Number",
      width: 220,
      valueGetter: (params) => params.row.contactNumber?.phone || "N/A",
    },
    { field: "email", headerName: "Email", width: 270 },
    { field: "departureCity", headerName: "Departure City", width: 220 },
    { field: "adults", headerName: "Adults", width: 220 },
    { field: "child", headerName: "Child", width: 220 },
    { field: "packageType", headerName: "Package Type", width: 220 },
    { field: "departureDate", headerName: "Departure Date", width: 220 },
    {
      field: "connected",
      headerName: "Connected",
      width: 220,
      valueGetter: (params) => (params.row.connected ? "Yes" : "No"),
    },
    { field: "noOfPeople", headerName: "No Of People", width: 220 },
    { field: "status", headerName: "Status", width: 220 },
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
        <Button
          variant="contained"
          onClick={handleDownloadAllData}
          style={{
            marginLeft: "10px",
            backgroundColor: "#21325D",
            color: "white",
          }}
        >
          Download All Data
          <GetAppIcon style={{ marginLeft: "5px" }} />
        </Button>
        <Typography
          variant="h5"
          className="adtable-heading"
          style={{ marginLeft: "20px" }}
        >
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
              <div style={{ marginTop: "20px", display: "flex" }}>
                <GridToolbar />
              </div>
            ),
            Pagination: () => null,
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
