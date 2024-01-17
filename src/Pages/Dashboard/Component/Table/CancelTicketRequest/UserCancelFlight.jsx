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
  Typography,
  Button,
  IconButton
} from '@mui/material';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { apiURL } from '../../../../../Constants/constant';
import '../FlightBookings/Flightbookings'; // Import your flight bookings CSS if needed

const AllFlightCancelTicketsUser = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight bookings:', error);
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
         
          User Flight Ticket Cancel Request
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table style={{ border: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>PNR</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Date Of Journey</TableCell>
              <TableCell>Airline Name</TableCell>
              <TableCell>Approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableadagent">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ border: 'none' }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking?.bookingId}</TableCell>
                  <TableCell>{booking?.userDetails?.username || 'No Data'}</TableCell>
                  <TableCell>{booking?.userDetails?.phone?.mobile_number || 'No Data'}</TableCell>
                  <TableCell>{booking?.reason}</TableCell>
                  <TableCell>{booking?.flightDetails?.pnr || 'No Data'}</TableCell>
                  <TableCell>{booking?.flightDetails?.totalAmount || 'No Data'}</TableCell>
                  <TableCell>{booking?.flightDetails?.origin || 'No Data'}</TableCell>
                  <TableCell>{booking?.flightDetails?.destination || 'No Data'}</TableCell>
                  <TableCell>{booking?.flightDetails?.airlineDetails[0]?.Origin?.DepTime || 'No Data'}</TableCell>
                  <TableCell>{booking?.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data'}</TableCell>
                  <TableCell style={{ border: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
                      <ApprovalIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
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

export default AllFlightCancelTicketsUser;
