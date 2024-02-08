import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Paper, Typography ,Stack,Pagination} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';

const AllFlightBooking = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingList`, {
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
    { field: 'bookingId', headerName: 'Booking ID', width:220, valueGetter: (params) => params.row.bookingId || 'No Data' },
    { field: 'pnr', headerName: 'PNR', width:220, valueGetter: (params) => params.row.pnr || 'No Data' },
    {
      field: 'passengerDetails',
      headerName: 'Passenger Name',
      width:220,
      valueGetter: (params) => {
        const firstName = params.row.passengerDetails[0]?.firstName || '';
        const lastName = params.row.passengerDetails[0]?.lastName || '';
        return `${firstName} ${lastName}` || 'No Data';
      },
    },
    { field: 'totalAmount', headerName: 'Amount', width:220, valueGetter: (params) => params.row.totalAmount || 'No Data' },

    { field: 'passengerDetails[0].email', headerName: 'Email', width:220, valueGetter: (params) => params.row.passengerDetails[0]?.email || 'No Data' },
    { field: 'passengerDetails[0].ContactNo', headerName: 'Phone Number', width:220, valueGetter: (params) => params.row.passengerDetails[0]?.ContactNo || 'No Data' },
  
    { field: 'airlineDetails[0].Airline.AirlineName', headerName: 'Flight Name', width:220, valueGetter: (params) => params.row.airlineDetails[0]?.Airline?.AirlineName || 'No Data' },
    { field: 'airlineDetails[0].Airline.FlightNumber', headerName: 'Flight Number', width:220, valueGetter: (params) => params.row.airlineDetails[0]?.Airline?.FlightNumber || 'No Data' },

    // FlightNumber
    { field: 'origin', headerName: 'Origin', width:220, valueGetter: (params) => params.row.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width:220, valueGetter: (params) => params.row.destination || 'No Data' },
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
        <Typography variant='h5' className='adtable-heading'>
        User  Flight Booking
        </Typography>
      </div>
      {flightBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <Paper style={{width: '100%' }}>
          <DataGrid
            rows={flightBookings}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            pagination
            getRowId={(row) => row._id}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: '10px' }}>
                  <GridToolbar />
                </div>
              ),
            }}
          />
        </Paper>
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

export default AllFlightBooking;
