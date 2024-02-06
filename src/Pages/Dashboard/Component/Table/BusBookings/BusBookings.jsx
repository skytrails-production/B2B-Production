import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Paper, Typography, Stack, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import { DataGrid } from '@mui/x-data-grid';
import "./BusBookings.css";
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
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllBusBookingList`, {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
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
    { field: 'busId', minWidth:100, headerName: 'Bus ID',  valueGetter: (params) => params.row.busId || 'No Data' },
    {
      field: 'passenger[0].firstName',
      headerName: 'Name',
      
      minWidth:100,
      valueGetter: (params) => params.row.passenger[0]?.firstName || 'No Data'
    },

    { field: 'passenger[0].Email', minWidth:230, headerName: 'Email',cellClassName: 'cell-padding',valueGetter: (params) => params.row.passenger[0]?.Email || 'No Data' },
    { field: 'passenger[0].Phone', headerName: 'Phone',minWidth:100, valueGetter: (params) => params.row.passenger[0].Phone || 'No Data' },
    { field: 'destination', headerName: 'Destination', minWidth:100, valueGetter: (params) => params.row.destination || 'No Data' },
    { field: 'origin', headerName: 'Origin', minWidth:120, valueGetter: (params) => params.row.origin || 'No Data' },
    { field: 'travelName', headerName: 'Bus Name', minWidth:200, valueGetter: (params) => params.row.travelName || 'No Data' },
    { field: 'busType', headerName: 'Bus Type',minWidth:350, valueGetter: (params) => params.row.busType || 'No Data' },
    { field: 'pnr', headerName: 'PNR', minWidth:150, valueGetter: (params) => params.row.pnr || 'No Data' },
    { field: 'departureTime', headerName: 'Date Of Journey', minWidth:150, valueGetter: (params) => new Date(params.row.departureTime).toDateString() || 'No Data' },
    { field: 'noOfSeats', headerName: 'No Of Seats', minWidth:150, valueGetter: (params) => params.row.noOfSeats || 'No Data' },
  ];

  return (
    <div className="subada-table-container">
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
        <Typography variant='h5' className='adtable-heading'>
          Bus Booking
        </Typography>
      </div>
      {busBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Paper >
            <DataGrid
              rows={busBookings}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[pageSize]}
              pagination
              getRowId={(row) => row._id}
              showToolbar={true}
            />
          </Paper>
        </div>
      )}

      {/* Pagination */}
      <div className='paginate'>
        <Stack spacing={2} direction='row' justifyContent='center'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color='primary'
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllBusBooking;
