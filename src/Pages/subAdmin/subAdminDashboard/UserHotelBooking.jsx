// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Pagination,
  Paper,
} from '@mui/material';
import { DataGrid,GridToolbar,GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';

const UserHotelBooking = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllHotelBookingList`,
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
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const columns = [
    { field: 'hotelId', headerName: 'Booking ID', width:220, valueGetter: (params) => params.row.hotelId || 'No Data' },
    { field: 'userDetails.username', headerName: 'User Name', width:220, valueGetter: (params) => params.row.userDetails?.username || 'No Data' },
    { field: 'name', headerName: 'Name', width:220, valueGetter: (params) => params.row.name || 'No Data' },
    { field: 'phone', headerName: 'Phone', width:220, valueGetter: (params) => params.row.phone || 'No Data' },
    { field: 'email', headerName: 'Email', width:220, valueGetter: (params) => params.row.email || 'No Data' },
    { field: 'CheckInDate', headerName: 'CheckInDate', width:220, valueGetter: (params) => new Date(params.row.CheckInDate).toDateString() || 'No Data' },
    { field: 'CheckOutDate', headerName: 'CheckOutDate', width:220, valueGetter: (params) => new Date(params.row.CheckOutDate).toDateString() || 'No Data' },
    { field: 'hotelName', headerName: 'Hotel Name', width:220, valueGetter: (params) => params.row.hotelName || 'No Data' },
    { field: 'cityName', headerName: 'City Name', width:220, valueGetter: (params) => params.row.cityName || 'No Data' },
    // Add more columns based on your data
  ];
  

  return (
    <>
     {access !== "BOOKING_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> : <div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
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
           User Hotel Booking
        </Typography>
      </div>

      <Paper>
        <DataGrid
          rows={hotelBookings}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          pagination
          getRowId={(row) => row._id} // Use _id as the unique identifier
          style={{ width: '100%' }}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '10px' }}>
                <GridToolbar />
              
              </div>
            ),
            Pagination: () => null,
          }}
        />

      </Paper>

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
    </div>}
    </>
   
  );
};

export default UserHotelBooking;
