import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Stack,
  Pagination,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import "./style.css";
const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserHotelBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
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
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  return (
    <div className="subada-table-container">
      <div className="adsearch-bar">
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
         
          USer Hotel Ticket Cancel Request
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Hotel ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Check In Date</TableCell>
              <TableCell>Stay Duration (Days)</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableadagents">
          {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ border: 'none' }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>{booking.userDetails?.username}</TableCell>
                <TableCell>{booking.userDetails?.phone?.mobile_number}</TableCell>
                <TableCell>{booking.reason}</TableCell>
                <TableCell>{booking.hotelDetails?.hotelId}</TableCell>
                <TableCell>{booking.hotelDetails?.amount}</TableCell>
                <TableCell>{booking.hotelDetails?.CheckInDate}</TableCell>
                <TableCell>{calculateStayDuration(booking.hotelDetails?.CheckInDate, booking.hotelDetails?.CheckOutDate)}</TableCell>
                <TableCell>{booking.hotelDetails?.cityName}</TableCell>
                <TableCell>{booking.hotelDetails?.hotelName}</TableCell>
                <TableCell style={{ border: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
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
