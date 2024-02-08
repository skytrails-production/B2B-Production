import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Stack,
  Pagination,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllBusBookingListAgent`, {
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
    { field: 'busId', headerName: 'Bus ID', width: 220, valueGetter: (params) => params.row.busId || 'No Data' },
    {
      field: 'passenger[0]?.firstName',
      headerName: 'Passenger Name',
      width: 220,
      valueGetter: (params) => {
        const firstName = params.row.passenger[0]?.firstName || 'No Data';
        const lastName = params.row.passenger[0]?.lastName || 'No Data';
        return `${firstName} ${lastName}`;
      }
    },
    // {
    //   field: 'passenger[1]?.firstName',
    //   headerName: 'Passenger Name',
    //   width: 220,
    //   valueGetter: (params) => {
    //     const firstName = params.row.passenger[1]?.firstName || 'No Data';
    //     const lastName = params.row.passenger[1]?.lastName || 'No Data';
    //     return `${firstName} ${lastName}`;
    //   }
    // },

    { field: 'userDetails.personal_details.email', headerName: 'Email', width: 300, valueGetter: (params) => params.row.passenger[0]?.Email || 'No Data' },
    {
      field: 'userDetails.personal_details.mobile',
      headerName: 'Phone',
      width: 220,
      valueGetter: (params) =>
        params.row.passenger[0]?.Phone

    },
    { field: 'destination', headerName: 'Destination', width: 220, valueGetter: (params) => params.row.destination || 'No Data' },
    { field: 'origin', headerName: 'Origin', width: 220, valueGetter: (params) => params.row.origin || 'No Data' },
    { field: 'amountv', headerName: 'Amount', width: 220, valueGetter: (params) => params.row.passenger[0]?.Price || 'No Data' },
    { field: 'busType', headerName: 'Bus Type', width: 300, valueGetter: (params) => params.row.busType || 'No Data' },
    { field: 'pnr', headerName: 'PNR', width: 220, valueGetter: (params) => params.row.pnr || 'No Data' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', width: 220, valueGetter: (params) => new Date(params.row.departureTime).toDateString() || 'No Data' },
    { field: 'noOfSeats', headerName: 'No Of Seats', width: 220, valueGetter: (params) => params.row.noOfSeats || 'No Data' },
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
          Agent Bus Booking
        </Typography>
      </div>
      {busBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <Paper style={{ width: '100%' }}>
          <DataGrid
            rows={busBookings}
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
