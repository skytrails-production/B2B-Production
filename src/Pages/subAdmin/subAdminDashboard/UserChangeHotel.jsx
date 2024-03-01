import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../Constants/constant';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const  UserChangeHotel = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/agent/getCancelHotelBooking`,
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
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      valueGetter: (params) =>
        params?.row?.hotelDetails?.name ||
        'No Data',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 130,
      valueGetter: (params) =>
        params.row?.hotelDetails?.phone || 'No Data',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      valueGetter: (params) =>
        params.row?.hotelDetails?.email || 'No Data',
    },
    { field: 'reason', headerName: 'Reason', width: 150 },
    {
      field: 'hotelId', headerName: 'Hotel ID', width: 120, valueGetter: (params) =>
        params.row.hotelDetails?.hotelId || 'No Data',
    },
    {
      field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) =>
        params.row.hotelDetails?.amount || 'No Data',
    },
    {
      field: 'CheckInDate',
      headerName: 'Check In Date',
      width: 180,
      valueGetter: (params) => {
        const checkInDate = params.row.hotelDetails?.CheckInDate;
        if (checkInDate) {
          const date = new Date(checkInDate);
          // Format the date as needed, for example: DD/MM/YYYY
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          return formattedDate;
        } else {
          return 'No Data';
        }
      }
    },

    {
      field: 'destination',
      headerName: 'Destination',
      width: 150,
      valueGetter: (params) =>
        params.row.hotelDetails?.destination || 'No Data',
    },
    {
      field: 'room',
      headerName: 'Rooms',
      width: 120,
      valueGetter: (params) =>
        params.row.hotelDetails?.room || 'No Data',
    },
    {
      field: 'hotelName',
      headerName: 'Hotel Name',
      width: 150,
      valueGetter: (params) =>
        params.row.hotelDetails?.hotelName || 'No Data',
    },
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

<>
{access !== "REQUEST_HANDLER" ? <div><subAdminaccess /></div> :
 <div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
 <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
   <TextField
     type="text"
     value={searchTerm}
     onChange={handleSearch}
     placeholder="Search by name, ID, etc."
     InputProps={{
       startAdornment: (
         <InputAdornment position="start">
           <SearchIcon />
         </InputAdornment>
       ),
     }}
   />
   <Typography variant="h5" className="adtable-heading">
     USER HOTEL TICKET CHANGE REQUEST
   </Typography>
 </div>

 <div style={{ width: '100%', backgroundColor: "white" }}>
   <DataGrid
     rows={filteredData}
     columns={columns}
     pageSize={5}
     autoHeight
     disableSelectionOnClick
     getRowId={(row) => row._id}
     components={{
       Toolbar: () => (
         <div style={{ marginTop: '10px' }}>
           <GridToolbarColumnsButton />
           <GridToolbarExport/>
         </div>
       ),

       Pagination: () => null,

     }}
   />
 </div>

 {/* Pagination */}
 <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
   <Pagination
     count={totalPages}
     page={currentPage}
     onChange={(event, page) => handlePageChange(page)}
     color="primary"
   />
 </Stack>
</div>}
</>

   
  );
};

export default UserChangeHotel;
