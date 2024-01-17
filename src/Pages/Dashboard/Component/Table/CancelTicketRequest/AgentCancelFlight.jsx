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
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../../../Constants/constant';
import './style.css'; // Import your custom styles if needed

const AllFlightCancelTickets = () => {
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
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelAgentUserFlightBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
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
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = flightBookings.filter((booking) => {
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
           Agent Flight Cancel Ticket Request
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table style={{ border: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Agency Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>PNR</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Date Of Journey</TableCell>
              <TableCell>Airline Name</TableCell>
              <TableCell>APPROVE</TableCell>
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
                <TableRow key={booking.bookingId}>
                  <TableCell>{booking.bookingId || 'NA'}</TableCell>
                  <TableCell>{booking.userDetails.agency_details.agency_name || 'NA'}</TableCell>
                  <TableCell>{`${booking.userDetails.personal_details.first_name || 'NA'} ${
                    booking.userDetails.personal_details.last_name || 'NA'
                  }`}</TableCell>
                  <TableCell>{booking.userDetails.personal_details.mobile.mobile_number || 'NA'}</TableCell>
                  <TableCell>{booking.userDetails.personal_details.email || 'NA'}</TableCell>
                  <TableCell>{booking.reason || 'NA'}</TableCell>
                  <TableCell>{booking.pnr || 'NA'}</TableCell>
                  <TableCell>{booking.flightDetails.totalAmount || 'NA'}</TableCell>
                  <TableCell>{booking.flightDetails.origin || 'NA'}</TableCell>
                  <TableCell>{booking.flightDetails.destination || 'NA'}</TableCell>
                  <TableCell>{booking.flightDetails.airlineDetails[0].Origin.DepTime || 'NA'}</TableCell>
                  <TableCell>{booking.flightDetails.airlineDetails[0].Airline.AirlineName || 'NA'}</TableCell>
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

export default AllFlightCancelTickets;
