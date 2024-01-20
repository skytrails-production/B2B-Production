import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  Pagination,
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

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    { field: 'agencyName', headerName: 'Agency Name', width: 150, valueGetter: (params) => params.row.userDetails?.agency_details?.agency_name || 'No Data' },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.userDetails?.personal_details?.first_name} ${params.row.userDetails?.personal_details?.last_name}` || 'No Data' },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row.userDetails?.personal_details?.mobile?.mobile_number || 'No Data' },
    { field: 'email', headerName: 'Email', width: 150, valueGetter: (params) => params.row.userDetails?.personal_details?.email || 'No Data' },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row.flightDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.flightDetails?.totalAmount || 'No Data' },
    { field: 'origin', headerName: 'Origin', width: 120, valueGetter: (params) => params.row.flightDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.flightDetails?.destination || 'No Data' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', width: 180, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0]?.Origin?.DepTime || 'No Data' },
    { field: 'airlineName', headerName: 'Airline Name', width: 150, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data' },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 120,
      renderCell: (params) => (
        <IconButton
          size="small"
          style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}
        >
          <ApprovalIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="subada-table-container" style={{position: 'relative', width: "100%"}}>
      <div className='adsearch-bar' style={{position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold'}}>
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

      <div style={{  width: '100%',backgroundColor:"#fff"  }}>
        <DataGrid
          rows={flightBookings}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>

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
