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
  Typography,
  Stack,
  Pagination,
  TableContainer,
  TableHead,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { DataGrid } from '@mui/x-data-grid';
import { apiURL } from '../../../../../../Constants/constant';

const AllFlightChangeTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getUserchangeFlightRequest`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setHotelBookings(response.data.result.docs);
        setFilteredData(response.data.result.docs); // Set filtered data initially
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
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

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (params) =>
        `${params.row.userDetails?.personal_details.first_name} ${params.row.userDetails?.personal_details.last_name}` ||
        'No Data',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      valueGetter: (params) =>
        params.row.userDetails?.personal_details.mobile.mobile_number || 'No Data',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      valueGetter: (params) =>
        params.row.userDetails?.personal_details.email || 'No Data',
    },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'pnr', headerName: 'PNR', flex: 1, valueGetter: (params) => params.row.flightDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', flex: 1, valueGetter: (params) => params.row.flightDetails?.totalAmount || 'No Data' },
    { field: 'origin', headerName: 'Origin', flex: 1, valueGetter: (params) => params.row.flightDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', flex: 1, valueGetter: (params) => params.row.flightDetails?.destination || 'No Data' },
    { field: 'dateOfJourney', headerName: 'DateOfJourney', flex: 1, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0].Origin.DepTime || 'No Data' },
    { field: 'airlineName', headerName: 'AirlineName', flex: 1, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0].Airline.AirlineName || 'No Data' },
    {
      field: 'approve',
      headerName: 'Approve',
      flex: 1,
      renderCell: (params) => (
        <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
          <ApprovalIcon />
        </IconButton>
      ),
    },
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
          User Flight Ticket Change Request
        </Typography>
      </div>

      <TableContainer component={Paper} style={{ position: "relative" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          pagination
          getRowId={(row) => row._id}
          style={{ width: "100%" }}
        />
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
