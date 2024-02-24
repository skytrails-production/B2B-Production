import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  Pagination,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';

const AgentChangeBus = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeBusRequestAgent`,
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
        setFilteredData(response.data.result.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bus change requests:', error);
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
  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const rowDetails = booking;
    const passengerCount = rowDetails?.busDetails?.passenger.length;
    const passengerDetailsHtml = rowDetails?.busDetails?.passenger.map(passenger => `
      <div class="passenger-details">
        <div><strong>Title:</strong> ${passenger.title}</div>
        <div><strong>First Name:</strong> ${passenger.firstName}</div>
        <div><strong>Last Name:</strong> ${passenger.lastName}</div>
        
        <div><strong>Contact No:</strong> ${passenger.Phone || 'No Data'}</div>
       
        <div><strong>Email:</strong> ${passenger.Email || 'No Data'}</div>
        <div><strong>Address Line 1:</strong> ${passenger.Address || 'No Data'}</div>
       
        <div><strong>seatNumber:</strong> ${passenger.seatNumber || 'No Data'}</div>
        <div><strong>Amount:</strong> ${passenger.Price || 'No Data'}</div>
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
    { field: 'name', headerName: 'Name', width: 150, valueGetter: (params) => `${params.row?.busDetails?.passenger[0]?.firstName} ${params.row?.busDetails?.passenger[0]?.lastName}` || 'No Data' },
    { field: 'phone', headerName: 'Phone', width: 130, valueGetter: (params) => params.row?.busDetails?.passenger[0]?.Phone || 'No Data' },
    { field: 'email', headerName: 'Email', width: 200, valueGetter: (params) => params.row?.busDetails?.passenger[0]?.Email || 'No Data' },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row?.busDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row?.busDetails?.amount || 'No Data' },
    { field: 'origin', headerName: 'Origin', width: 120, valueGetter: (params) => params.row?.busDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row?.busDetails?.destination || 'No Data' },
    {
      field: 'dateOfJourney', headerName: 'Date Of Journey', width: 180, valueGetter: (params) => {
        const departureTime = params.row?.busDetails?.departureTime;
        if (departureTime) {
          const date = new Date(departureTime);
          return date.toLocaleDateString(); // Adjust the format as needed
        } else {
          return 'No Data';
        }
      }
    },
    { field: 'busType', headerName: 'Bus Type', width: 200, valueGetter: (params) => params.row?.busDetails?.busType || 'No Data' },
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
    <div className='subada-table-container' style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
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
          AGENT BUS TICKET CHANGE REQUEST
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
    </div>
  );
};

export default AgentChangeBus;
