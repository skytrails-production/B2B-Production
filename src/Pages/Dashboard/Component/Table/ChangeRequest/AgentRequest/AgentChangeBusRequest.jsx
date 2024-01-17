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
  TableHead,
  Button,
  Typography,
  Stack,
  Pagination,
  TableContainer,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
const AllBusChangeTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeBusRequestAgent`,
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
        console.error('Error fetching bus change requests:', error);
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

  return (
    <div className='subada-table-container'>
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
          AGENT BUS TICKET CHANGE REQUEST
        </Typography>
      </div>

      <TableContainer component={Paper} className="custom-table-container">
        <Table>
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
                <TableCell>{booking.busDetails.busId || "No Data"}</TableCell>
                <TableCell>{booking.userDetails.agency_details.agency_name || "No Data"}</TableCell>
                <TableCell>{`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}` || "No Data"}</TableCell>
                <TableCell>{booking.userDetails.personal_details.mobile.mobile_number || "No Data"}</TableCell>
                <TableCell>{booking.userDetails.personal_details.email || "No Data"}</TableCell>
                <TableCell>{booking.reason || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.pnr || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.amount || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.origin || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.destination || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.dateOfJourney || "No Data"}</TableCell>
                <TableCell>{booking.busDetails.busType || "No Data"}</TableCell>
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

export default AllBusChangeTickets;
