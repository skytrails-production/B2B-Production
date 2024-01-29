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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../../../Constants/constant';
import './style.css'; // Import your custom styles if needed

const AllFlightCancelTickets = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatusMap, setSelectedStatusMap] = useState(new Map());

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelAgentUserFlightBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
            },
          }
        );
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight bookings:', error);
        setLoading(false);
      }
    }

    fetchFlightBookings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = flightBookings.filter((booking) => {
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
    console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };
  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    { field: 'agencyName', headerName: 'Agency Name', width: 200, valueGetter: (params) => params.row.userDetails.agency_details.agency_name || 'NA' },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.userDetails.personal_details.first_name || 'NA'} ${params.row.userDetails.personal_details.last_name || 'NA'}` },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row.userDetails.personal_details.mobile.mobile_number || 'NA' },
    { field: 'email', headerName: 'Email', width: 200, valueGetter: (params) => params.row.userDetails.personal_details.email || 'NA' },
    { field: 'reason', headerName: 'Reason', width: 150, valueGetter: (params) => params.row.reason || 'NA' },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row.pnr || 'NA' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.flightDetails.totalAmount || 'NA' },
    { field: 'origin', headerName: 'Origin', width: 150, valueGetter: (params) => params.row.flightDetails.origin || 'NA' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.flightDetails.destination || 'NA' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', width: 180, valueGetter: (params) => params.row.flightDetails.airlineDetails[0].Origin.DepTime || 'NA' },
    { field: 'airlineName', headerName: 'Airline Name', width: 150, valueGetter: (params) => params.row.flightDetails.airlineDetails[0].Airline.AirlineName || 'NA' },
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
    <div className="subada-table-container"style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar"  style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
          Agent Flight Cancel Ticket Request
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

export default AllFlightCancelTickets;
