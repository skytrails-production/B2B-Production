import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { apiURL } from '../../../../../Constants/constant';
import './CancelTicketRequest.css'; // Import your custom styles if needed
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';

const AllBusCancelTickets = () => {
  const [busBookings, setBusBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatusMap, setSelectedStatusMap] = useState(new Map());

  useEffect(() => {
    async function fetchBusBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserBusBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setBusBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bus bookings:', error);
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
    setCurrentPage(1);
  };
  const handleStatusChange = (id, selectedValue) => {
    setSelectedStatusMap(new Map(selectedStatusMap.set(id, selectedValue)));
    // Add logic to update the status in your data or trigger an API call
    // console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };

  const columns = [
    { field: 'busId', headerName: 'Bus ID', width: 120 },
    {
      field: 'passengerDetails.firstName',
      headerName: 'Name',

      minWidth: 200,
      valueGetter: (params) => {
        const passenger = params.row?.busDetails?.passenger[0];
        if (passenger) {
          return `${passenger.title} ${passenger.firstName} ${passenger.lastName}` || 'No Data';
        }
        return 'No Data';
      },
    },
    {
      field: 'passengerDetails.ContactNo',
      headerName: 'Phone',
      minWidth: 120,
      valueGetter: (params) => params.row?.busDetails?.passenger[0]?.Phone || 'No Data',
    },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row.busDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.busDetails?.amount || 'No Data' },
    { field: 'origin', headerName: 'Origin', width: 150, valueGetter: (params) => params.row.busDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.busDetails?.destination || 'No Data' },
    {
      field: 'dateOfJourney',
      headerName: 'Date Of Journey',
      width: 180,
      valueGetter: (params) => {
        const departureTime = params.row.busDetails?.departureTime;
        if (departureTime) {
          const date = new Date(departureTime);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return 'No Data';
      }
    },
    { field: 'busType', headerName: 'Bus Type', width: 200, valueGetter: (params) => params.row.busDetails?.busType || 'No Data' },
    { field: 'noOfSeats', headerName: 'No of Seats', width: 150, valueGetter: (params) => params.row.busDetails?.noOfSeats || 'No Data' },
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
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
          User Bus Ticket Cancel Request
        </Typography>
      </div>
      <div style={{ width: '100%', backgroundColor: "#fff" }}>
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

export default AllBusCancelTickets;
