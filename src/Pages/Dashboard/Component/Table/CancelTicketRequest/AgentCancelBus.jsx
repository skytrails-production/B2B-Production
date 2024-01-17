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
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { apiURL } from '../../../../../Constants/constant';
import './style.css'; // Import your custom styles if needed
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
const AllBusCancelTickets = () => {
  const [busBookings, setBusBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchBusBookings() {
      try {
        setLoading(true); // Set loading to true when fetching data
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/agent/getCancelBusBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setBusBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bus bookings:', error);
        setLoading(false);
      }
    }

    fetchBusBookings();
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
          AGENT BUS TICKET CANCEL REQUEST
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table style={{ border: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell>Bus ID</TableCell>
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
              <TableCell>Bus Type</TableCell>
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
                  <TableCell style={{color: "black"  }}>{booking.busId}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.userDetails.agency_details.agency_name}</TableCell>
                  <TableCell style={{color: "black"  }}>{`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.userDetails.personal_details.mobile.mobile_number}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.userDetails.personal_details.email}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.reason}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.pnr}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.amount}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.origin}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.destination}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.departureTime}</TableCell>
                  <TableCell style={{color: "black"  }}>{booking.bustDetails.busType}</TableCell>
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

export default AllBusCancelTickets;
