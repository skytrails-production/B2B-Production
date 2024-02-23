import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import "./Agenttable.css";
const AgentChangeHotel = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeHotelRequestAgent`,
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

  useEffect(() => {
    // Update filtered data when searchTerm changes
    const filteredResults = hotelBookings.filter((booking) =>
      Object.values(booking)
        .join('') // Combine all values into a single string
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [hotelBookings, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    { field: 'agencyName', headerName: 'Agency Name', width: 150, valueGetter: (params) => params.row.userDetails.agency_details.agency_name || 'No Data' },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.userDetails?.personal_details.first_name} ${params.row.userDetails?.personal_details.last_name}` || 'No Data' },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row.userDetails?.personal_details.mobile.mobile_number || 'No Data' },
    { field: 'email', headerName: 'Email', width: 150, valueGetter: (params) => params.row.userDetails?.personal_details.email || 'No Data' },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'hotelId', headerName: 'Hotel ID', width: 120, valueGetter: (params) => params.row.hotelDetails.hotelId || 'No Data' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.hotelDetails.amount || 'No Data' },
    { field: 'checkInDate', headerName: 'CheckIn Date', width: 180, valueGetter: (params) => params.row.hotelDetails.CheckInDate || 'No Data' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.hotelDetails.destination || 'No Data' },
    { field: 'rooms', headerName: 'Rooms', width: 120, valueGetter: (params) => params.row.hotelDetails.room || 'No Data' },
    { field: 'hotelName', headerName: 'Hotel Name', width: 150, valueGetter: (params) => params.row.hotelDetails.hotelName || 'No Data' },
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
        <Typography variant='h5' className='adtable-heading'>
          AGENT HOTEL TICKET CHANGE REQUEST
        </Typography>
      </div>

      <div style={{width: '100%',backgroundColor:"#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row._id}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '10px' }}>
                <GridToolbar />
              </div>
            ),
            Pagination:()=>null,
          }}
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

export default AgentChangeHotel;
