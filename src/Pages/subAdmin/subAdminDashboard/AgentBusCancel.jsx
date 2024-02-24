import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { apiURL } from '../../../Constants/constant';
import './Agenttable.css';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
const AgentBusCancel = () => {
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
          `${apiURL.baseURL}/skytrails/api/agent/getCancelBusBooking`,
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
    console.log(`Status changed to ${selectedValue} for row with id ${id}`);
    // Add additional logic as needed
  };

  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const row = booking;
    const passengerCount = row.bustDetails?.passenger.length;
    const passengerDetailsHtml = row.bustDetails?.passenger.map(passenger => `
      <div class="passenger-details">
        <div><strong>Title:</strong> ${passenger.title}</div>
        <div><strong>First Name:</strong> ${passenger.firstName}</div>
        <div><strong>Last Name:</strong> ${passenger.lastName}</div>
        <div><strong>Email:</strong> ${passenger.Email || 'No Data'}</div>
        <div><strong>Phone:</strong> ${passenger.Phone || 'No Data'}</div>
        <div><strong>Address:</strong> ${passenger.Address || 'No Data'}</div>
        <div><strong>SeatNumber:</strong> ${passenger.seatNumber || 'No Data'}</div>
        <div><strong>Price:</strong> ${passenger.Price || 'No Data'}</div>
       
      </div>
    `).join('');

    Swal.fire({
      title: '<span class="swal-title">View All Details</span>',
      html: `
        <div class="passenger-details-container">
          <div class="passenger-count">Total Passengers: ${passengerCount}</div>
          ${passengerDetailsHtml}
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        container: 'swal-container',
        title: 'swal-title',
        htmlContainer: 'swal-html-container'
      }
    });
  };
  const columns = [
    {
      field: 'view',
      headerName: 'View All Passenger',
      width: 200,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => handleViewDetails(params.row)}
        >
          View
        </Button>

      ),
    },
    { field: 'busId', headerName: 'Bus ID', width: 120 },

    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row.bustDetails?.passenger[0]?.firstName || 'NA'} ${params.row.bustDetails?.passenger[0]?.lastName || 'NA'}` },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row.bustDetails?.passenger[0]?.Phone || 'NA' },
    { field: 'email', headerName: 'Email', width: 200, valueGetter: (params) => params.row.bustDetails?.passenger[0]?.Email || 'NA' },
    { field: 'reason', headerName: 'Reason', width: 150, valueGetter: (params) => params.row.reason || 'NA' },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row.bustDetails?.pnr || 'NA' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.bustDetails?.amount || 'NA' },
    { field: 'origin', headerName: 'Origin', width: 150, valueGetter: (params) => params.row.bustDetails?.origin || 'NA' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.bustDetails?.destination || 'NA' },
    { field: 'dateOfJourney', headerName: 'Date Of Journey', width: 180, valueGetter: (params) => new Date(params.row.bustDetails?.departureTime).toLocaleString() || 'NA' },
    { field: 'busType', headerName: 'Bus Type', width: 200, valueGetter: (params) => params.row.bustDetails?.busType || 'NA' },
    {
      field: 'approve', headerName: 'APPROVE', width: 120, renderCell: (params) => (
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
      )
    },
  ];


  return (
    <div className="subuser-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
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
          AGENT BUS TICKET CANCEL REQUEST
        </Typography>
      </div>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row._id}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '30px' }}>
                <GridToolbarColumnsButton />
                <GridToolbarExport/>
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
    </div>
  );
};

export default AgentBusCancel;
