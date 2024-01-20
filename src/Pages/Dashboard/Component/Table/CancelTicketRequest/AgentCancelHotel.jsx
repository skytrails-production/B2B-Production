import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { apiURL } from '../../../../../Constants/constant';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline";

const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    { field: 'agencyName', headerName: 'Agency Name', width: 200, valueGetter: (params) => params.row.userDetails.agency_details.agency_name },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.userDetails.personal_details.first_name} ${params.row.userDetails.personal_details.last_name}` },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row.userDetails.personal_details.mobile.mobile_number },
    { field: 'email', headerName: 'Email', width: 200, valueGetter: (params) => params.row.userDetails.personal_details.email },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'hotelId', headerName: 'Hotel ID', width: 120, valueGetter: (params) => params.row.hotelDetails.hotelId },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.hotelDetails.amount },
    { field: 'checkInDate', headerName: 'CheckIn Date', width: 150, valueGetter: (params) => params.row.hotelDetails.CheckInDate },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.hotelDetails.destination },
    { field: 'rooms', headerName: 'Rooms', width: 120, valueGetter: (params) => params.row.hotelDetails.room },
    { field: 'hotelName', headerName: 'Hotel Name', width: 150, valueGetter: (params) => params.row.hotelDetails.hotelName },
    {
      field: 'approve',
      headerName: 'APPROVE',
      width: 120,
      renderCell: (params) => (
        <IconButton
          size="small"
          style={{ backgroundColor: "#21325D", color: "#FFFFFF" }}
        >
          <ApprovalIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading">
          Agent Hotel Cancel Ticket Request
        </Typography>
      </div>
      <div style={{width: '100%',backgroundColor:"#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row._id}
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
    </div>
  );
};

export default AllHotelCancelTickets;
