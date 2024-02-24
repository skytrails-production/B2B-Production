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
  Button
} from '@mui/material';
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
// Import your flight bookings CSS if needed
import Swal from 'sweetalert2';
import './Agenttable.css';
const UserFlightCancel = () => {
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
  const handleViewDetails = (booking) => {
    handleShowAlert(booking);
  };

  const handleShowAlert = (booking) => {
    const row = booking;
    const passengerCount = row.flightDetails?.passengerDetails?.length || 0;
    const passengerDetailsHtml = row.flightDetails?.passengerDetails?.length > 0 ?
      row.flightDetails.passengerDetails.map(passenger => `
    <div class="passenger-details" style="font-size: 14px;">
      <div><strong>Title:</strong> ${passenger.title || 'No Data'}</div>
      <div><strong>First Name:</strong> ${passenger.firstName || 'No Data'}</div>
      <div><strong>Last Name:</strong> ${passenger.lastName || 'No Data'}</div>
      <div><strong>Email:</strong> ${passenger.email || 'No Data'}</div>
      <div><strong>Phone:</strong> ${passenger.ContactNo || 'No Data'}</div>
      <div><strong>Address:</strong> ${passenger.city || 'No Data'}</div>
      <div><strong>TicketNumber:</strong> ${passenger.TicketNumber || 'No Data'}</div>
      <div><strong>Amount:</strong> ${passenger.amount || 'No Data'}</div>
    </div>
  `).join('')
      :
      '<div>No passenger details available</div>';


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
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Button
          style={{ backgroundColor: "#21325D", color: "#fff" }}
          onClick={() => handleViewDetails(params.row)}
        >
          View
        </Button>

      ),
    },
    { field: 'bookingId', headerName: 'Booking ID', minWidth: 120, },
    {
      field: 'passengerDetails.firstName',
      headerName: 'Name',

      minWidth: 150,
      valueGetter: (params) => {
        const passenger = params.row?.flightDetails?.passengerDetails[0];
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
      valueGetter: (params) => params.row?.flightDetails?.passengerDetails[0]?.ContactNo || 'No Data',
    },
    {
      field: 'reason',
      headerName: 'Reason',
      minWidth: 120,
    },
    {
      field: 'flightDetails.pnr',
      headerName: 'PNR',
      minWidth: 120,
      valueGetter: (params) => params.row?.pnr || 'No Data',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 120,
      valueGetter: (params) => params.row?.amount || 'No Data',
    },
    {
      field: 'flightDetails.origin',
      headerName: 'Origin',
      minWidth: 150,
      valueGetter: (params) => params.row?.flightDetails?.origin || 'No Data',
    },
    {
      field: 'flightDetails.destination',
      headerName: 'Destination',
      minWidth: 120,
      valueGetter: (params) => params.row?.flightDetails?.destination || 'No Data',
    },
    {
      field: 'flightDetails.airlineDetails[0].Origin.DepTime',
      headerName: 'Date Of Journey',
      minWidth: 150,
      valueGetter: (params) => {
        const depTime = params.row?.flightDetails?.airlineDetails[0]?.Origin?.DepTime;
        if (depTime) {
          const date = new Date(depTime);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return 'No Data';
      },
    },
    {
      field: 'flightDetails.airlineDetails[0].Airline.AirlineName',
      headerName: 'Airline Name',
      minWidth: 120,
      valueGetter: (params) => params.row?.flightDetails?.airlineDetails[0]?.Airline?.AirlineName || 'No Data',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
    },
  ];




  return (
    <div className="subada-table-container" style={{ position: 'relative', width: "100%", marginTop: "-15px" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold', backgroundColor: "#E73C33" }}>
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

      <div style={{ width: '100%', backgroundColor: "#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          pageSize={pageSize}
          page={currentPage - 1}
          onPageChange={(params) => handlePageChange(params.page + 1)}
          pagination
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

export default UserFlightCancel;
