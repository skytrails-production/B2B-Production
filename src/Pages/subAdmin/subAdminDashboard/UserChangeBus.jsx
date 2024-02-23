import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {

  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Stack,
  Pagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../Constants/constant';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
const UserChangeBus = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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
        const fetchedData = response.data.result.docs;
        setFilteredData(fetchedData);
        setHotelBookings(fetchedData);
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

  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const rowDetails = booking;
    const passengerCount = rowDetails.busDetails?.passenger.length;
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
    { field: 'busDetails.busId', headerName: 'Bus ID', width:150, valueGetter: (params) => params.row.busDetails.busId || 'No Data', },
    {
      field: 'userDetails?.personal_details.first_name',
      headerName: 'First Name',
      width: 200,
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.passenger[0].firstName || 'No Data',
    },
    {
      field: 'userDetails?.personal_details.last_name',
      headerName: 'Last Name',
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.passenger[0].lastName || 'No Data',
    },
    {
      field: 'userDetails?.personal_details.mobile.mobile_number',
      headerName: 'Phone',
      minWidth:120,
     
      valueGetter: (params) => params.row.busDetails?.passenger[0].Phone || 'No Data',
    },
    { field: 'userDetails?.personal_details.email', headerName: 'Email', minWidth:200, valueGetter: (params) => params.row.busDetails?.passenger[0].Email || 'No Data' },
    {
      field: 'busDetails.pnr',
      headerName: 'PNR',
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.pnr || 'No Data',
    },
    {
      field: 'busDetails.amount',
      headerName: 'Amount',
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.amount || 'No Data',
    },
    {
      field: 'busDetails.origin',
      headerName: 'Origin',
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.origin || 'No Data',
    },
    {
      field: 'busDetails.destination',
      headerName: 'Destination',
      minWidth:120,
      valueGetter: (params) => params.row.busDetails?.destination || 'No Data',
    },
    {
      field: 'busDetails.departureTime',
      headerName: 'DateOfJourney',
      minWidth:200,
      valueGetter: (params) => params.row.busDetails?.departureTime || 'No Data',
    },
    {
      field: 'busDetails.busType',
      headerName: 'BusType',
      minWidth:200,
      valueGetter: (params) => params.row.busDetails?.busType || 'No Data',
    },
    {
      field: 'approve',
      headerName: 'Approve',
      minWidth:120,
      renderCell: (params) => (
        <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
          <ApprovalIcon />
        </IconButton>
      ),
    },];


  return (
    <div className="subada-table-container" style={{ position: 'relative', width: "100%" }}>
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
        <Typography variant='h5' className='adtable-heading' style={{ fontWeight: 'bold' }}>
          User Bus Ticket Change Request
        </Typography>
      </div>
      {filteredData.length === 0 ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} align="center" style={{ border: 'none' }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
        <Paper>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            pagination
            getRowId={(row) => row.busDetails.busId}
            style={{ width: '100%' }}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: '10px' }}>
                  <GridToolbar />
                </div>
              ),
            }}
          />

        </Paper>
      )}
      <div className="paginate">
        <Stack spacing={2} direction='row' justifyContent='center'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color='primary'
          />
        </Stack>
      </div>
    </div>
  );
};

export default UserChangeBus;
