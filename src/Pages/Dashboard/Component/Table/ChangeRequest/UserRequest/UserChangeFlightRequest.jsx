import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userChangeFlightRequest.css";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Pagination,
  TableContainer,
  TableHead,
  IconButton,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiURL } from "../../../../../../Constants/constant";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

const AllFlightChangeTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [globalBookingIds, setGlobalBookingIds] = useState(null); // New state for storing _id globally
  const [recordId, setRecordId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const reducerState = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getUserchangeFlightRequest`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setHotelBookings(response.data.result.docs);
        setFilteredData(response.data.result.docs); // Set filtered data initially
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel bookings:", error);
        setLoading(false);
      }
    }
    fetchHotelBookings();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCancelClick = (row) => {
    setSelectedBookingId(row.bookingId); // Use the correct field from your data
    setRecordId(row._id);
    setOpenModal(true);
  };

  const handleCancelTicket = async () => {
    const payload = {
      BookingId: selectedBookingId,
      RequestType: 2,
      CancellationType: 3,
      Remarks: remarks,
      EndUserIp: reducerState.ip.ipData,
      TokenId: reducerState.ip.tokenData,
    };

    try {
      // First API call to cancel the ticket
      const responseData = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/flight/cancelChangeFlight`,
        payload
      );

      // Check if the first API call was successful
      if (responseData.status === 200) {
        console.log("Ticket canceled successfully:", responseData.data);

        // Prepare the payload for the second API call
        const updatePayload = {
          procesStatus: "APPROVED",
          requestId: recordId, // Include the _id in the payload
          type: "flight",
        };

        // Second API call to update process status
        const updateResponse = await axios.put(
          `${apiURL.baseURL}/skyTrails/api/admin/flight/updateProcessStatus`,
          updatePayload
        );

        console.log("Process status updated:", updateResponse.data);
      }

      // Close the modal after both successful requests
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error occurred during ticket cancellation or status update:",
        error
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBookingId(null);
    setRemarks(""); // Clear the remarks input
    setIsModalVisible(false);
  };
  const columns = [
    { field: "bookingId", headerName: "Booking ID", minWidth: 150 },
    {
      field: "Change Ticket",
      headerName: "Change Ticket",
      width: 200,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => handleCancelClick(params.row)}
        >
          Change Ticket
        </Button>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      valueGetter: (params) =>
        `${params.row.flightDetails?.passengerDetails[0]?.firstName} ${params.row.flightDetails?.passengerDetails[0]?.lastName}` ||
        "No Data",
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
      valueGetter: (params) =>
        params.row.flightDetails?.passengerDetails[0]?.ContactNo || "No Data",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      valueGetter: (params) =>
        params.row.flightDetails?.passengerDetails[0]?.email || "No Data",
    },
    { field: "reason", headerName: "Reason", minWidth: 200 },
    {
      field: "pnr",
      headerName: "PNR",
      minWidth: 200,
      valueGetter: (params) => params.row.flightDetails?.pnr || "No Data",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 200,
      valueGetter: (params) =>
        params.row.flightDetails?.totalAmount || "No Data",
    },
    {
      field: "origin",
      headerName: "Origin",
      minWidth: 200,
      valueGetter: (params) => params.row.flightDetails?.origin || "No Data",
    },
    {
      field: "destination",
      headerName: "Destination",
      minWidth: 200,
      valueGetter: (params) =>
        params.row.flightDetails?.destination || "No Data",
    },
    {
      field: "dateOfJourney",
      headerName: "Date Of Journey",
      minWidth: 200,
      valueGetter: (params) => {
        const depTime =
          params.row.flightDetails?.airlineDetails[0]?.Origin?.DepTime;
        if (depTime) {
          const date = new Date(depTime);
          // Format the date as needed, for example: DD/MM/YYYY HH:MM AM/PM
          const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          return formattedDate;
        } else {
          return "No Data";
        }
      },
    },

    {
      field: "airlineName",
      headerName: "AirlineName",
      minWidth: 200,
      valueGetter: (params) =>
        params.row.flightDetails?.airlineDetails[0].Airline.AirlineName ||
        "No Data",
    },
    {
      field: "approve",
      headerName: "Approve",
      minWidth: 200,
      renderCell: (params) => (
        <IconButton
          size="small"
          style={{ backgroundColor: "#21325D", color: "#FFFFFF" }}
        >
          <ApprovalIcon />
        </IconButton>
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
        style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold" }}
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
        <Typography
          variant="h5"
          className="adtable-heading"
          style={{ fontWeight: "bold" }}
        >
          User Flight Ticket Change Request
        </Typography>
      </div>

      <TableContainer component={Paper} style={{ position: "relative" }}>
        <DataGrid
          rows={filteredData}
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
          style={{ width: "100%" }}
        />
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Stack>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2, // Optional: Adds some border radius for a better look
          }}
        >
          {/* Close Icon */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Change Ticket
          </Typography>

          {/* Remarks Text Field */}
          <TextField
            fullWidth
            label="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />

          {/* Confirm Cancel Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancelTicket}
            sx={{ mt: 2 }}
          >
            Confirm Change
          </Button>

          <Button
            variant="outlined"
            onClick={handleCloseModal}
            sx={{
              mt: 2,
              ml: 2,
              borderColor: "red", // Red border
              color: "red", // Red text
              "&:hover": {
                borderColor: "darkred", // Darker red on hover
                backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background on hover
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AllFlightChangeTickets;
