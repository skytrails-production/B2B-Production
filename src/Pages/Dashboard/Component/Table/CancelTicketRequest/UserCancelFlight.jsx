import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
 
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Paper,
  Stack,
  Pagination,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
import '../FlightBookings/Flightbookings'; // Import your flight bookings CSS if needed

const AllFlightCancelTicketsUser = () => {
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
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserFlightBooking`,
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
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight bookings:', error);
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

  const handleStatusChange = (id, selectedValue) => {
    setSelectedStatusMap(new Map(selectedStatusMap.set(id, selectedValue)));
    // Add logic to update the status in your data or trigger an API call
    console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', flex: 1 },
    { 
      field: 'userDetails.username', 
      headerName: 'Name', 
      flex: 1,
      valueGetter: (params) => params.row.userDetails?.username || 'No Data',
    },
    { 
      field: 'userDetails.phone.mobile_number', 
      headerName: 'Phone', 
      flex: 1,
      valueGetter: (params) => params.row.userDetails?.phone?.mobile_number || 'No Data',
    },
    { 
      field: 'reason', 
      headerName: 'Reason', 
      flex: 1,
    },
    { 
      field: 'flightDetails.pnr', 
      headerName: 'PNR', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.pnr || 'No Data',
    },
    { 
      field: 'flightDetails.totalAmount', 
      headerName: 'Amount', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.totalAmount || 'No Data',
    },
    { 
      field: 'flightDetails.origin', 
      headerName: 'Origin', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.origin || 'No Data',
    },
    { 
      field: 'flightDetails.destination', 
      headerName: 'Destination', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.destination || 'No Data',
    },
    { 
      field: 'flightDetails.airlineDetails[0].Origin.DepTime', 
      headerName: 'Date Of Journey', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.airlineDetails[0]?.Origin?.DepTime || 'No Data',
    },
    { 
      field: 'flightDetails.airlineDetails[0].Airline.AirlineName', 
      headerName: 'Airline Name', 
      flex: 1,
      valueGetter: (params) => params.row.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data',
    },
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
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar"  style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
          User Flight Ticket Cancel Request
        </Typography>
      </div>

      <div style={{width: '100%',backgroundColor: "#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          pageSize={pageSize}
          page={currentPage - 1}
          onPageChange={(params) => handlePageChange(params.page + 1)}
          pagination
          getRowId={(row) => row._id}
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
    </div>
  );
};

export default AllFlightCancelTicketsUser;
