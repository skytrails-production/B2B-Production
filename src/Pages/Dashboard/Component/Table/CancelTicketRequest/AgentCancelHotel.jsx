// AllHotelCancelTickets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Typography, IconButton, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { apiURL } from '../../../../../Constants/constant';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline"; // Import an approval icon

const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelAgentHotelBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,

            }
          }
        );
        setHotelBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
        setLoading(false);
      }
    }

    fetchHotelBookings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = hotelBookings.filter((booking) => {
      const nameMatch =
        `${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`
          .toLowerCase()
          .includes(term) || false;
      const phoneMatch =
        booking.userDetails.personal_details.mobile.mobile_number
          .toLowerCase()
          .includes(term) || false;

      return nameMatch || phoneMatch;
    });

    setFilteredData(filtered);
  };


  return (
    <div className="subada-table-container">
      <div className="adsearch-bar">
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="h5" className="adtable-heading">
        Agent Bus Cancel Ticket Request
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table style={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Agency Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Hotel ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>CheckInDate</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Hotel Name</TableCell>
              <TableCell>APPROVE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableadagent">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ border: "none" }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell>{booking.bookingId}</TableCell>
                  <TableCell>{booking.userDetails.agency_details.agency_name}</TableCell>
                  <TableCell>{`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`}</TableCell>
                  <TableCell>{booking.userDetails.personal_details.mobile.mobile_number}</TableCell>
                  <TableCell>{booking.userDetails.personal_details.email}</TableCell>
                  <TableCell>{booking.reason}</TableCell>
                  <TableCell>{booking.hotelDetails.hotelId}</TableCell>
                  <TableCell>{booking.hotelDetails.amount}</TableCell>
                  <TableCell>{booking.hotelDetails.CheckInDate}</TableCell>
                  <TableCell>{booking.hotelDetails.destination}</TableCell>
                  <TableCell>{booking.hotelDetails.room}</TableCell>
                  <TableCell>{booking.hotelDetails.hotelName}</TableCell>
                  <TableCell style={{ border: "none", alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <IconButton
                      size="small"
                      style={{ backgroundColor: "#21325D", color: "#FFFFFF" }}
                    >
                      <ApprovalIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
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
    </div>
  );
};

export default AllHotelCancelTickets;
