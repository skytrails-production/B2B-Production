import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Paper,
  Stack,
  Pagination,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../../Constants/constant";
import "../FlightBookings/Flightbookings"; // Import your flight bookings CSS if needed
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

const AllFlightCancelTicketsUser = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatusMap, setSelectedStatusMap] = useState(new Map());
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [globalBookingIds, setGlobalBookingIds] = useState(null); // New state for storing _id globally
  const [recordId, setRecordId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log(globalBookingIds, "globalBookingIdsjjjjjjjjjjjjjj");
  const reducerState = useSelector((state) => state);
  console.log(reducerState, "reducerState");
  const handleCancelClick = (row) => {
    setSelectedBookingId(row.bookingId); // Use the correct field from your data
    setRecordId(row._id);
    setOpenModal(true);
  };

  const handleRejectClick = (row) => {
    setRecordId(row._id);
    setIsModalVisible(true); // Show the modal
  };

  const handleConfirmReject = async () => {
    try {
      const updatePayload = {
        procesStatus: "REJECT",
        requestId: recordId, // Include the _id in the payload
        type: "flight",
      };

      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/flight/updateProcessStatus`,
        updatePayload
      );

      console.log("Ticket rejected successfully:", response.data);
      setIsModalVisible(false); // Close the modal after successful rejection
    } catch (error) {
      console.error("Error rejecting the ticket:", error);
      setIsModalVisible(false);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBookingId(null);
    setRemarks(""); // Clear the remarks input
    setIsModalVisible(false);
  };

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserFlightBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        const fetchedDocs = response.data.result.docs;
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setGlobalBookingIds(fetchedDocs.map((doc) => doc._id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight bookings:", error);
        setLoading(false);
      }
    }

    fetchFlightBookings();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (id, selectedValue) => {
    setSelectedStatusMap(new Map(selectedStatusMap.set(id, selectedValue)));
    // Add logic to update the status in your data or trigger an API call
    // console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };

  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const row = booking;
    const passengerCount = row.flightDetails?.passengerDetails.length || 0;
    //     const passengerDetailsHtml = row.flightDetails?.passengerDetails.map(passenger => `
    //     <div class="passenger-details" style="font-size: 14px;">
    //     <div><strong>Title:</strong> ${passenger.title}</div>
    //     <div><strong>First Name:</strong> ${passenger.firstName}</div>
    //     <div><strong>Last Name:</strong> ${passenger.lastName}</div>
    //     <div><strong>Email:</strong> ${passenger.email || 'No Data'}</div>
    //     <div><strong>Phone:</strong> ${passenger.ContactNo || 'No Data'}</div>
    //     <div><strong>Address:</strong> ${passenger.city || 'No Data'}</div>
    //     <div><strong>TicketNumber:</strong> ${passenger.TicketNumber || 'No Data'}</div>
    //     <div><strong>Amount:</strong> ${passenger.amount || 'No Data'}</div>
    // </div>
    const passengerDetailsHtml =
      row.flightDetails?.passengerDetails?.length > 0
        ? row.flightDetails.passengerDetails
            .map(
              (passenger) => `
<div class="passenger-details" style="font-size: 14px;">
<div><strong>Title:</strong> ${passenger.title || "No Data"}</div>
<div><strong>First Name:</strong> ${passenger.firstName || "No Data"}</div>
<div><strong>Last Name:</strong> ${passenger.lastName || "No Data"}</div>
<div><strong>Email:</strong> ${passenger.email || "No Data"}</div>
<div><strong>Phone:</strong> ${passenger.ContactNo || "No Data"}</div>
<div><strong>Address:</strong> ${passenger.city || "No Data"}</div>
<div><strong>TicketNumber:</strong> ${passenger.TicketNumber || "No Data"}</div>
<div><strong>Amount:</strong> ${passenger.amount || "No Data"}</div>
</div>
`
            )
            .join("")
        : "<div>No passenger details available</div>";

    Swal.fire({
      title: '<span class="swal-title">View All Details</span>',
      html: `
        <div class="passenger-details-container">
          <div class="passenger-count">Total Passengers: ${passengerCount}</div>
          ${passengerDetailsHtml}
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        container: "swal-container",
        title: "swal-title",
        htmlContainer: "swal-html-container",
      },
    });
  };

  const IpData = reducerState.ip.ipData;
  console.log(IpData, "IpData");

  const TokenData = reducerState.ip.tokenData;
  console.log(TokenData, "TokenData");

  const handleCancelTicket = async () => {
    const payload = {
      BookingId: selectedBookingId,
      RequestType: 1,
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

  const columns = [
    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => handleViewDetails(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: "Cancel Ticket",
      headerName: "Cancel Ticket",
      width: 200,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => handleCancelClick(params.row)}
        >
          Cancel Ticket
        </Button>
      ),
    },
    {
      field: "Reject Request",
      headerName: "Reject Request",
      width: 200,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => showModal(params.row)}
        >
          Reject Request
        </Button>
      ),
    },
    {
      field: "_id",
      headerName: "_id",
      minWidth: 50,
      valueGetter: (params) => params.row?._id,
    },
    { field: "bookingId", headerName: "Booking ID", minWidth: 120 },
    {
      field: "passengerDetails.firstName",
      headerName: "Name",

      minWidth: 150,
      valueGetter: (params) => {
        const passenger = params.row?.flightDetails?.passengerDetails[0];
        if (passenger) {
          return (
            `${passenger.title} ${passenger.firstName} ${passenger.lastName}` ||
            "No Data"
          );
        }
        return "No Data";
      },
    },
    {
      field: "passengerDetails.ContactNo",
      headerName: "Phone",
      minWidth: 120,
      valueGetter: (params) =>
        params.row?.flightDetails?.passengerDetails[0]?.ContactNo || "No Data",
    },
    {
      field: "reason",
      headerName: "Reason",
      minWidth: 120,
    },
    {
      field: "flightDetails.pnr",
      headerName: "PNR",
      minWidth: 120,
      valueGetter: (params) => params.row?.pnr || "No Data",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 120,
      valueGetter: (params) => params.row?.amount || "No Data",
    },
    {
      field: "flightDetails.origin",
      headerName: "Origin",
      minWidth: 150,
      valueGetter: (params) => params.row?.flightDetails?.origin || "No Data",
    },
    {
      field: "flightDetails.destination",
      headerName: "Destination",
      minWidth: 120,
      valueGetter: (params) =>
        params.row?.flightDetails?.destination || "No Data",
    },
    {
      field: "flightDetails.airlineDetails[0].Origin.DepTime",
      headerName: "Date Of Journey",
      minWidth: 150,
      valueGetter: (params) => {
        const depTime =
          params.row?.flightDetails?.airlineDetails[0]?.Origin?.DepTime;
        if (depTime) {
          const date = new Date(depTime);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
        return "No Data";
      },
    },
    {
      field: "flightDetails.airlineDetails[0].Airline.AirlineName",
      headerName: "Airline Name",
      minWidth: 120,
      valueGetter: (params) =>
        params.row?.flightDetails?.airlineDetails[0]?.Airline?.AirlineName ||
        "No Data",
    },
    {
      field: "processStatus",
      headerName: "processStatus",
      minWidth: 120,
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

        <Typography variant="h5" className="adtable-heading">
          User Flight Ticket Cancel Request
        </Typography>
      </div>

      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          pageSize={pageSize}
          page={currentPage - 1}
          onPageChange={(params) => handlePageChange(params.page + 1)}
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
      </div>

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
            Cancel Ticket
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
            Confirm Cancel
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
      {/* Modal for Reject Ticket Confirmation */}
      <Modal
        open={isModalVisible}
        onClose={handleCloseModal}
        aria-labelledby="reject-modal-title"
        aria-describedby="reject-modal-description"
      >
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
            borderRadius: 2,
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
            Are you sure?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to reject this Request?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="outlined">
              No, Cancel
            </Button>
            <Button
              onClick={handleConfirmReject}
              variant="contained"
              color="error"
            >
              Yes, Reject
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AllFlightCancelTicketsUser;
