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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../../../../Constants/constant';
import { DataGrid } from '@mui/x-data-grid';
const AllBusChangeTickets = () => {
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

  

  const columns = [
    { field: 'busDetails.busId', headerName: 'Bus ID', flex: 5, valueGetter: (params) => params.row.busDetails.busId || 'No Data', },
    {
      field: 'userDetails?.personal_details.first_name',
      headerName: 'First Name',
      width: 200,
      flex: 5,
      valueGetter: (params) => params.row.userDetails?.personal_details.first_name || 'No Data',
    },
    {
      field: 'userDetails?.personal_details.last_name',
      headerName: 'Last Name',
      flex: 5,
      valueGetter: (params) => params.row.userDetails?.personal_details.last_name || 'No Data',
    },
    {
      field: 'userDetails?.personal_details.mobile.mobile_number',
      headerName: 'Phone',
      flex: 5,
      width: 500,
      valueGetter: (params) => params.row.userDetails?.personal_details.mobile.mobile_number || 'No Data',
    },
    { field: 'userDetails?.personal_details.email', headerName: 'Email', flex: 5, valueGetter: (params) => params.row.userDetails?.personal_details.email || 'No Data' },
    {
      field: 'busDetails.pnr',
      headerName: 'PNR',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.pnr || 'No Data',
    },
    {
      field: 'busDetails.amount',
      headerName: 'Amount',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.amount || 'No Data',
    },
    {
      field: 'busDetails.origin',
      headerName: 'Origin',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.origin || 'No Data',
    },
    {
      field: 'busDetails.destination',
      headerName: 'Destination',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.destination || 'No Data',
    },
    {
      field: 'busDetails.departureTime',
      headerName: 'DateOfJourney',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.departureTime || 'No Data',
    },
    {
      field: 'busDetails.busType',
      headerName: 'BusType',
      flex: 5,
      valueGetter: (params) => params.row.busDetails?.busType || 'No Data',
    },
    {
      field: 'approve',
      headerName: 'Approve',
      flex: 5,
      renderCell: (params) => (
        <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
          <ApprovalIcon />
        </IconButton>
      ),
    },];


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
        <Typography variant='h5' className='adtable-heading' style={{ fontWeight: 'bold' }}>
          Agent Bus Ticket Change Request
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

export default AllBusChangeTickets;
