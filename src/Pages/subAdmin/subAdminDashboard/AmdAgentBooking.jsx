import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Paper,
  Stack,
  Pagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { apiURL } from "../../../Constants/constant";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./amdflight.css";

const AmdAgentBooking = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const reducerState = useSelector((state) => state);
  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  const [openDialog, setOpenDialog] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchFlightBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/flightbooking/amadeus/amadeusagentbooking`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        }
      );
      setFlightBookings(response.data.data);
      console.log(response.data, "==============");
      setTotalPages(response?.data?.result?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flight bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightBookings();
  }, [currentPage, searchTerm]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const openUpdateDialog = (rowData) => {
    setSelectedBooking(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTicketNumber("");
    setSelectedBooking(null);
  };

  const handleUpdate = async () => {
    try {
      const apiUrl = `${apiURL.baseURL}/skyTrails/flightbooking/amadeus/updateticket`;
      const payload = {
        bookingId: selectedBooking._id,
        passengerDetails: selectedBooking.passengerDetails.map((passenger) => ({
          _id: passenger._id,
          TicketNumber:
            passenger._id === selectedBooking.passengerDetails[0]._id
              ? ticketNumber
              : passenger.TicketNumber,
        })),
      };

      const response = await axios.put(apiUrl, payload);
      console.log("Update successful", response.data);

      // Assuming a successful update, close the dialog and refresh data
      handleCloseDialog();
      fetchFlightBookings();
      toast.success("Ticket updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Failed to update ticket. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "Name",
      width: 150,
      valueGetter: (params) =>
        params?.row.passengerDetails[0]?.firstName || "No Data",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.email || "No Data",
    },
    {
      field: "ContactNo",
      headerName: "Phone",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.ContactNo || "No Data",
    },
    {
      field: "DateOfBirth",
      headerName: "DateOfBirth",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.DateOfBirth || "No Data",
    },
    {
      field: "userDetails.passengerDetails.TicketNumber",
      headerName: "TicketNumber",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.TicketNumber || "No Data",
    },
    { field: "destination", headerName: "Destination", width: 180 },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.amount || "No Data",
    },
    {
      field: "passportNo",
      headerName: "Passport No",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.passportNo || "No Data",
    },
    {
      field: "passportExpiry",
      headerName: "passportExpiry",
      width: 180,
      valueGetter: (params) =>
        params?.row?.passengerDetails[0]?.passportExpiry || "No Data",
    },
    { field: "pnr", headerName: "PNR", width: 100 },
    {
      field: "updateTicket",
      headerName: "Update",
      width: 120,
      renderCell: (params) => (
        <Button
          className="update-button"
          onClick={() => openUpdateDialog(params.row)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      {access !== "BOOKING_MANAGER" ? (
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
              Amadeus Agent Booking
            </Typography>
          </div>
          {flightBookings.length === 0 ? (
            <Paper>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <h3>No Data Available</h3>
              </div>
            </Paper>
          ) : (
            <Paper style={{ width: "100%" }}>
              <DataGrid
                rows={flightBookings}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[10, 25, 100]}
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
          <div className="paginate">
            <Stack spacing={2} direction="row" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>

          {/* Update Ticket Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Update Ticket Number</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="ticketNumber"
                label="New Ticket Number"
                type="text"
                fullWidth
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default AmdAgentBooking;
