import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbar,GridToolbarExport } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Agenttable.css';
import { apiURL } from '../../../Constants/constant';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const AgentHotelCancel = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatusMap, setSelectedStatusMap] = useState(new Map());
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelAgentHotelBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
            }
          }
        );
        setHotelBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
        setLoading(false);
      }
    }

    fetchHotelBookings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = hotelBookings.filter((booking) => {
      const nameMatch =
        `${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`
          .toLowerCase()
          .includes(term) || false;
      const phoneMatch =
        booking.userDetails.personal_details.mobile.mobile_number
          .toLowerCase()
          .includes(term) || false;

      return nameMatch || phoneMatch;
    });

    setFilteredData(filtered);
  };
  const handleStatusChange = (id, selectedValue) => {
    setSelectedStatusMap(new Map(selectedStatusMap.set(id, selectedValue)));
    // Add logic to update the status in your data or trigger an API call
    // console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    // { field: 'agencyName', headerName: 'Agency Name', width: 200, valueGetter: (params) => params.row.userDetails?.agency_details?.agency_name },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params?.row?.hotelDetails?.name}` },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row?.hotelDetails?.phone },
    { field: 'email', headerName: 'Email', width: 200, valueGetter: (params) => params?.row?.hotelDetails?.email },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'hotelId', headerName: 'Hotel ID', width: 120, valueGetter: (params) => params?.row?.hotelDetails?.hotelId },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params?.row?.hotelDetails?.amount },
     { 
        field: 'checkInDate', 
        headerName: 'CheckIn Date', 
        width: 200, 
        valueGetter: (params) => {
            const checkInDate = new Date(params?.row?.hotelDetails?.CheckInDate);
            return checkInDate.toLocaleString();
        } 
    },
    { 
        field: 'checkOutDate', 
        headerName: 'CheckOut Date', 
        width: 200, 
        valueGetter: (params) => {
            const checkOutDate = new Date(params?.row?.hotelDetails?.CheckOutDate);
            return checkOutDate.toLocaleString();
        } 
    },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params?.row?.hotelDetails?.destination },
    { field: 'rooms', headerName: 'Rooms', width: 120, valueGetter: (params) => params?.row?.hotelDetails?.room },
    { field: 'hotelName', headerName: 'Hotel Name', width: 150, valueGetter: (params) => params.row.hotelDetails.hotelName },
    {
      field: 'approve',
      headerName: 'APPROVE',
      width: 120,
      renderCell: (params) => (
        <div>
          <select
            value={selectedStatusMap.get(params.row._id) || params.row.status || ''}
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
            style={{
              backgroundColor: selectedStatusMap.get(params.row._id) === 'ACTIVE' ? '#008000' : '#FF0000',
              color: '#FFFFFF',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <option value="">{params.row.status}</option>
            <option value="ACTIVE">Active</option>
            <option value="NOT ACTIVE">Not Active</option>
          </select>
        </div>
      ),
    },

  ];

  return (
    <>
     {access !== "BOOKING_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :
      <div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
       
        <Typography variant="h5" className="adtable-heading">
          Agent Hotel Cancel Ticket Request
        </Typography>
      </div>
      <div style={{ width: '100%', backgroundColor: "#fff" }}>
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
                <GridToolbar />
               
              </div>
            ),
            Pagination: () => null,
          }}
        />
      </div>
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

export default AgentHotelCancel;
