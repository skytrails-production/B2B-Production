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
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { apiURL } from '../../../Constants/constant';

const UserChangeFlight = () => {
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
    { field: 'bookingId', headerName: 'Booking ID', minWidth: 150 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      valueGetter: (params) =>
        `${params.row.flightDetails?.passengerDetails[0]?.firstName} ${params.row.flightDetails?.passengerDetails[0]?.lastName}` ||
        'No Data',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 200,
      valueGetter: (params) =>
        params.row.flightDetails?.passengerDetails[0]?.ContactNo || 'No Data',
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 250,
      valueGetter: (params) =>
        params.row.flightDetails?.passengerDetails[0]?.email || 'No Data',
    },
    { field: 'reason', headerName: 'Reason', minWidth: 200, },
    { field: 'pnr', headerName: 'PNR', minWidth: 200, valueGetter: (params) => params.row.flightDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', minWidth: 200, valueGetter: (params) => params.row.flightDetails?.totalAmount || 'No Data' },
    { field: 'origin', headerName: 'Origin', minWidth: 200, valueGetter: (params) => params.row.flightDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', minWidth: 200, valueGetter: (params) => params.row.flightDetails?.destination || 'No Data' },
    {
      field: 'dateOfJourney',
      headerName: 'Date Of Journey',
      minWidth: 200,
      valueGetter: (params) => {
        const depTime = params.row.flightDetails?.airlineDetails[0]?.Origin?.DepTime;
        if (depTime) {
          const date = new Date(depTime);
          // Format the date as needed, for example: DD/MM/YYYY HH:MM AM/PM
          const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          return formattedDate;
        } else {
          return 'No Data';
        }
      }
    },

    { field: 'airlineName', headerName: 'AirlineName', minWidth: 200, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0].Airline.AirlineName || 'No Data' },
    {
      field: 'approve',
      headerName: 'Approve',
      minWidth: 200,
      renderCell: (params) => (
        <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
          <ApprovalIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
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
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '10px' }}>
                <GridToolbar />
              </div>
            ),
            Pagination:()=>null,
          }}
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

export default UserChangeFlight;
