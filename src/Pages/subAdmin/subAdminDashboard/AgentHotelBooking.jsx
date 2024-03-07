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
import { apiURL } from '../../../Constants/constant';
import { DataGrid,GridToolbar,GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const AgentHotelBooking = () => {
  const [busBookings, setBusBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

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
    { field: 'bookingId', headerName: 'Booking ID', width:100, headerClassName: 'bold-header'},
    { field: 'userDetails?.personal_details.first_name', headerName: 'Name', width:150, valueGetter: (params) => params.row.name || 'No Data' },
    { field: 'userDetails?.personal_details.email', headerName: 'Email', width:250, valueGetter: (params) => params.row.email || 'No Data' },
    { field: 'userDetails?.personal_details.mobile.mobile_number', headerName: 'Phone', width:180, valueGetter: (params) => params.row.phone || 'No Data' },
    { field: 'destination', headerName: 'Destination', width:180, valueGetter: (params) => params.row.destination || 'No Data' },
    { field: 'hotelName', headerName: 'Hotel Name', width:250, valueGetter: (params) => params.row.hotelName || 'No Data' },
    { field: 'amount', headerName: 'Amount', width:180, valueGetter: (params) => params.row.amount || 'No Data' },
    { field: 'hotelId', headerName: 'Hotel ID', width:180, valueGetter: (params) => params.row.hotelId || 'No Data' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', width:180, valueGetter: (params) => new Date(params.row.CheckInDate).toDateString() || 'No Data' },
    { field: 'room', headerName: 'Rooms', width:180, valueGetter: (params) => params.row.room || 'No Data' },
  ];

  return (
    <>
     {access !== "BOOKING_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :
      <div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
      <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
       
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
            rowsPerPageOptions={[10,25,100]}
            pagination
            getRowId={(row) => row._id}
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
    </div>}</>
   
  );
};

export default AgentHotelBooking;
