import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Paper, Typography ,Stack,Pagination,Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
import { DataGrid,GridToolbar,GridToolbarExport } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const UserFlightBooking = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingList`, {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        });
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
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
    setCurrentPage(1); // Reset to the first page when performing a new search
  };
  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const rowDetails = booking;
    const passengerCount = rowDetails.passengerDetails.length;
    const passengerDetailsHtml = rowDetails?.passengerDetails.map(passenger => `
      <div class="passenger-details" style="font-size: 14px">
        <div><strong>Title:</strong> ${passenger.title}</div>
        <div><strong>First Name:</strong> ${passenger.firstName}</div>
        <div><strong>Last Name:</strong> ${passenger.lastName}</div>
        
        <div><strong>Contact No:</strong> ${passenger.ContactNo || 'No Data'}</div>
       
        <div><strong>Email:</strong> ${passenger.email || 'No Data'}</div>
        <div><strong>Address Line 1:</strong> ${passenger.addressLine1 || 'No Data'}</div>
       
        <div><strong>seatNumber:</strong> ${passenger.TicketNumber || 'No Data'}</div>
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
    { field: 'bookingId', headerName: 'Booking ID', width:220, valueGetter: (params) => params.row.bookingId || 'No Data' },
    { field: 'pnr', headerName: 'PNR', width:220, valueGetter: (params) => params.row.pnr || 'No Data' },
    {
      field: 'passengerDetails',
      headerName: 'Passenger Name',
      width:220,
      valueGetter: (params) => {
        const firstName = params.row.passengerDetails[0]?.firstName || '';
        const lastName = params.row.passengerDetails[0]?.lastName || '';
        return `${firstName} ${lastName}` || 'No Data';
      },
    },
    { field: 'totalAmount', headerName: 'Amount', width:220, valueGetter: (params) => params.row.totalAmount || 'No Data' },

    { field: 'passengerDetails[0].email', headerName: 'Email', width:220, valueGetter: (params) => params.row.passengerDetails[0]?.email || 'No Data' },
    { field: 'passengerDetails[0].ContactNo', headerName: 'Phone Number', width:220, valueGetter: (params) => params.row.passengerDetails[0]?.ContactNo || 'No Data' },
  
    { field: 'airlineDetails[0].Airline.AirlineName', headerName: 'Flight Name', width:220, valueGetter: (params) => params.row.airlineDetails[0]?.Airline?.AirlineName || 'No Data' },
    { field: 'airlineDetails[0].Airline.FlightNumber', headerName: 'Flight Number', width:220, valueGetter: (params) => params.row.airlineDetails[0]?.Airline?.FlightNumber || 'No Data' },

    // FlightNumber
    { field: 'origin', headerName: 'Origin', width:220, valueGetter: (params) => params.row.origin || 'No Data' },
    { field: 'destination', headerName: 'Destination', width:220, valueGetter: (params) => params.row.destination || 'No Data' },
  ];

  return (
    <>
     {access !== "BOOKING_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :<div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
      <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold',backgroundColor:"#E73C33" }}>
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
        User Flight Booking
        </Typography>
      </div>
      {flightBookings.length === 0 ? (
        <Paper>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>No Data Available</h3>
          </div>
        </Paper>
      ) : (
        <Paper style={{width: '100%' }}>
          <DataGrid
            rows={flightBookings}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
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
      <div className='paginate'>
        <Stack spacing={2} direction='row' justifyContent='center'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color='primary'
          />
        </Stack>
      </div>
    </div>}</>
    
  );
};

export default UserFlightBooking;
