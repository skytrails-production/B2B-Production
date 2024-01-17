import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Pagination,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import { DataGrid } from '@mui/x-data-grid';

const AllFlightBooking = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingListAgent`, {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        });
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
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
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking Id', flex: 1 },
    { field: 'pnr', headerName: 'PNR', flex: 1, valueGetter: (params) => params.row.pnr || 'No Data' },
    { field: 'UserDetails[0]?.agency_details?.agency_name', headerName: 'Agency Name', flex: 1, valueGetter: (params) => params.row.UserDetails[0]?.agency_details?.agency_name || 'No Data' },
    { field: 'passengerDetails[0]?.firstName', headerName: 'Passenger First Name', flex: 1, valueGetter: (params) => params.row.passengerDetails[0]?.firstName || 'No Data' },
    { field: 'passengerDetails[0]?.lastName', headerName: 'Passenger Last Name', flex: 1, valueGetter: (params) => params.row.passengerDetails[0]?.lastName || 'No Data' },
    { field: 'passengerDetails[0]?.email', headerName: 'Passenger Email', flex: 1, valueGetter: (params) => params.row.passengerDetails[0]?.email || 'No Data' },
    { field: 'UserDetails[0]?.personal_details.mobile.mobile_number', headerName: 'Phone Number', flex: 1, valueGetter: (params) => params.row.UserDetails[0]?.personal_details.mobile?.mobile_number || 'No Data' },
    { field: 'airlineDetails[0]?.Airline.AirlineName', headerName: 'Flight Name', flex: 1, valueGetter: (params) => params.row.airlineDetails[0]?.Airline?.AirlineName || 'No Data' },
    { field: 'airlineDetails[0]?.Origin?.DepTime', headerName: 'Departure Time', flex: 1, valueGetter: (params) => params.row.airlineDetails[0]?.Origin?.DepTime || 'No Data' },
    { field: 'origin', headerName: 'Origin', flex: 1, valueGetter: (params) => params.row.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', flex: 1, valueGetter: (params) => params.row.destination || 'No Data' },
    { field: 'totalAmount', headerName: 'Amount', flex: 1, valueGetter: (params) => params.row.totalAmount || 'No Data' },
  ];

  return (
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
    <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
      <Typography variant='h5' className='adtable-heading' style={{ fontWeight: 'bold' }}>
        Agent Flight Booking
      </Typography>
    </div>
      {flightBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <Paper style={{  width: '100%' }}>
          <DataGrid
            rows={flightBookings}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            pagination
            getRowId={(row) => row._id}
          />
        </Paper>
      )}

      {/* Pagination */}
      <div className="paginate">
        <Stack spacing={2} direction="row" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllFlightBooking;
