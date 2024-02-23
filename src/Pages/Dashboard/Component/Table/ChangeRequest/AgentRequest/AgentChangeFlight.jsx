import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  Pagination,
  Button,
  Modal,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2'; // Import SweetAlert
import "./AgentChangeFlight.css";

const AllFlightChangeTickets = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  
  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeFlightRequestAgent`,
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight change requests:', error);
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
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };
  
  const handleShowAlert = (booking) => {
    const rowDetails = booking;
    const passengerCount = rowDetails.flightDetails.passengerDetails.length;
    const passengerDetailsHtml = rowDetails.flightDetails.passengerDetails.map(passenger => `
      <div class="passenger-details">
        <div><strong>Title:</strong> ${passenger.title}</div>
        <div><strong>First Name:</strong> ${passenger.firstName}</div>
        <div><strong>Last Name:</strong> ${passenger.lastName}</div>
        <div><strong>Gender:</strong> ${passenger.gender || 'No Data'}</div>
        <div><strong>Contact No:</strong> ${passenger.ContactNo || 'No Data'}</div>
        <div><strong>Date of Birth:</strong> ${passenger.DateOfBirth || 'No Data'}</div>
        <div><strong>Email:</strong> ${passenger.email || 'No Data'}</div>
        <div><strong>Address Line 1:</strong> ${passenger.addressLine1 || 'No Data'}</div>
        <div><strong>City:</strong> ${passenger.city || 'No Data'}</div>
        <div><strong>Ticket Number:</strong> ${passenger.TicketNumber || 'No Data'}</div>
        <div><strong>Amount:</strong> ${passenger.amount || 'No Data'}</div>
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
    { field: 'bookingId', headerName: 'Booking ID', width: 120 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      valueGetter: (params) => `${params.row.flightDetails.passengerDetails[0].firstName} ${params.row.flightDetails.passengerDetails[0].lastName}`
      // {
      //   const passenger1 = params.row.flightDetails.passengerDetails[0];
      //   const passenger2 = params.row.flightDetails.passengerDetails[1];
      //   const name1 = passenger1 ? `${passenger1.firstName} ${passenger1.lastName}` : 'No Data';
      //   const name2 = passenger2 ? `${passenger2.firstName} ${passenger2.lastName}` : 'No Data';
      //   return `${name1}, ${name2}`;
      // },
      
    },

    {
      field: 'phone',
      headerName: 'Phone',
      width: 160,
      valueGetter: (params) => params.row.flightDetails.passengerDetails[0].ContactNo
      // {
      //   const passenger1 = params.row.flightDetails.passengerDetails[0];
      //   const passenger2 = params.row.flightDetails.passengerDetails[1];
      //   return passenger1 ? passenger1.ContactNo : 'No Data';
      // }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      valueGetter: (params) => {
        const passenger1 = params.row.flightDetails.passengerDetails[0];
        const passenger2 = params.row.flightDetails.passengerDetails[1];
        return passenger1 ? passenger1.email : 'No Data';
      }
    },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'pnr', headerName: 'PNR', width: 120, valueGetter: (params) => params.row.flightDetails?.pnr || 'No Data' },
    { field: 'amount', headerName: 'Amount', width: 120, valueGetter: (params) => params.row.flightDetails?.totalAmount || 'No Data' },
    { field: 'origin', headerName: 'Origin', width: 120, valueGetter: (params) => params.row.flightDetails?.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width: 150, valueGetter: (params) => params.row.flightDetails?.destination || 'No Data' },
    {
      field: 'dateOfJourney',
      headerName: 'Date Of Journey',
      width: 180,
      valueGetter: (params) => {
        const depTime = params.row.flightDetails?.airlineDetails[0]?.Origin?.DepTime;
        if (depTime) {
          const date = new Date(depTime);
          return date.toLocaleDateString(); // Adjust the format as needed
        } else {
          return 'No Data';
        }
      }
    },

    { field: 'airlineName', headerName: 'Airline Name', width: 150, valueGetter: (params) => params.row.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data' },
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
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
          AGENT FLIGHT TICKET CHANGE REQUEST
        </Typography>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
          {/* Modal content to display booking details */}
          {selectedBooking && (
            <>
              <Typography variant='h5'>Booking Details</Typography>
             
              {/* Display other booking details */}
            </>
          )}
        </Box>
      </Modal>
      <div style={{ width: '100%', backgroundColor: "#fff" }}>
        <DataGrid
          rows={flightBookings}
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
            Pagination:()=>null,
          }}
        />
      </div>

      {/* Pagination */}
      <Stack spacing={2} direction='row' justifyContent='center' mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color='primary'
        />
      </Stack>
    </div>
  );
};

export default AllFlightChangeTickets;
