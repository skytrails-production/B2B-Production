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
import "./AgentHotelBookings.css";
const AllBusBooking = () => {
  const [busBookings, setBusBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBusBookings() {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllHotelBookingListAgent`, {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          }
        });
        setBusBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Bus bookings:', error);
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
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', flex: 4 , headerClassName: 'bold-header'},
    { field: 'userDetails.agency_details.agency_name', headerName: 'Agency Name', flex: 4, valueGetter: (params) => params.row.userDetails.agency_details.agency_name || 'No Data' },
    { field: 'userDetails.personal_details.first_name', headerName: 'First Name', flex: 4, valueGetter: (params) => params.row.userDetails.personal_details.first_name || 'No Data' },
    { field: 'userDetails.personal_details.last_name', headerName: 'Last Name', flex: 4, valueGetter: (params) => params.row.userDetails.personal_details.last_name || 'No Data' },
    { field: 'userDetails.personal_details.email', headerName: 'Email', flex: 4, valueGetter: (params) => params.row.userDetails.personal_details.email || 'No Data' },
    { field: 'userDetails.personal_details.mobile.mobile_number', headerName: 'Phone', flex: 4, valueGetter: (params) => params.row.userDetails.personal_details.mobile.mobile_number || 'No Data' },
    { field: 'destination', headerName: 'Destination', flex: 4, valueGetter: (params) => params.row.destination || 'No Data' },
    { field: 'hotelName', headerName: 'Hotel Name', flex: 4, valueGetter: (params) => params.row.hotelName || 'No Data' },
    { field: 'amount', headerName: 'Amount', flex: 4, valueGetter: (params) => params.row.amount || 'No Data' },
    { field: 'hotelId', headerName: 'Hotel ID', flex: 4, valueGetter: (params) => params.row.hotelId || 'No Data' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', flex: 4, valueGetter: (params) => new Date(params.row.dateOfJourney).toDateString() || 'No Data' },
    { field: 'room', headerName: 'Rooms', flex: 4, valueGetter: (params) => params.row.room || 'No Data' },
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
          Agent Hotel Booking
        </Typography>
      </div>
      {busBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <Paper style={{width: '100%'}}>
          <DataGrid
            rows={busBookings}
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

export default AllBusBooking;
