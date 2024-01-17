import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Stack,
  Pagination,
  TableContainer,
  TableHead,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
const AllFlightChangeTickets = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeFlightRequestAgent`,
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight change requests:', error);
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
      <div className='adsearch-bar'>
        <TextField
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search by name, ID, etc.'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant='h5' className='adtable-heading'>
          AGENT FLIGHT TICKET CHANGE REQUEST
        </Typography>
      </div>

      <TableContainer component={Paper} className='custom-table-container'>
        <Table>
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
              <TableCell>Approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableadagent">
            {flightBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>
                  {booking.userDetails?.agency_details?.agency_name || 'No Data'}
                </TableCell>
                <TableCell>
                  {`${booking.userDetails?.personal_details?.first_name} ${booking.userDetails?.personal_details?.last_name}` ||
                    'No Data'}
                </TableCell>
                <TableCell>
                  {booking.userDetails?.personal_details?.mobile?.mobile_number ||
                    'No Data'}
                </TableCell>
                <TableCell>{booking.userDetails.personal_details.email || 'No Data'}</TableCell>
                <TableCell>{booking.reason || 'No Data'}</TableCell>
                <TableCell>{booking.flightDetails?.pnr || 'No Data'}</TableCell>
                <TableCell>{booking.flightDetails?.totalAmount || 'No Data'}</TableCell>
                <TableCell>{booking.flightDetails?.origin || 'No Data'}</TableCell>
                <TableCell>{booking.flightDetails?.destination || 'No Data'}</TableCell>
                <TableCell>
                  {booking.flightDetails?.airlineDetails[0]?.Origin?.DepTime || 'No Data'}
                </TableCell>
                <TableCell>
                  {booking.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data'}
                </TableCell>
                <TableCell style={{ border: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
                      <ApprovalIcon />
                    </IconButton>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} direction='row' justifyContent='center' mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color='primary'
        />
      </Stack>
    </div>
  );
};

export default AllFlightChangeTickets;
