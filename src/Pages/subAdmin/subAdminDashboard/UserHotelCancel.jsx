import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Stack,
  Pagination,

} from '@mui/material';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import { apiURL } from '../../../Constants/constant';
import './Agenttable.css';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const UserHotelCancel = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatusMap, setSelectedStatusMap] = useState(new Map());
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserHotelBooking`,
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
  const handleStatusChange = (id, selectedValue) => {
    setSelectedStatusMap(new Map(selectedStatusMap.set(id, selectedValue)));

    console.log(`Status changed to ${selectedValue} for row with id ${id}`);

  };
  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const columns = [
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      minWidth:150,
      valueGetter: (params) => params.row.bookingId || 'No Data',
    },
    {
      field: 'userDetails.username',
      headerName: 'Name',
      minWidth:150,
      valueGetter: (params) => params.row.userDetails?.username || 'No Data',
    },
    {
      field: 'userDetails.phone.mobile_number',
      headerName: 'Phone',
      minWidth:150,
      valueGetter: (params) => params.row.userDetails?.phone?.mobile_number || 'No Data',
    },
    {
      field: 'reason',
      headerName: 'Reason',
      minWidth:150,
      valueGetter: (params) => params.row.reason || 'No Data',
    },
    {
      field: 'hotelDetails.hotelId',
      headerName: 'Hotel ID',
      minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.hotelId || 'No Data',
    },
    {
      field: 'hotelDetails.amount',
      headerName: 'Amount',
      minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.amount || 'No Data',
    },
    {
      field: 'hotelDetails.CheckInDate',
      headerName: 'Check In Date',
      minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.CheckInDate
        ? new Date(params.row.hotelDetails.CheckInDate).toLocaleDateString()
        : 'No Data',
    },
    {
      field: 'stayDuration',
      headerName: 'Stay Duration (Days)',
      minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.CheckInDate && params.row.hotelDetails?.CheckOutDate
        ? calculateStayDuration(
          params.row.hotelDetails.CheckInDate,
          params.row.hotelDetails.CheckOutDate
        )
        : 'No Data',
    },
    {
      field: 'hotelDetails.cityName',
      headerName: 'Destination',
      minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.cityName || 'No Data',
    },
    {
      field: 'hotelDetails.hotelName',
      headerName: 'Hotel Name',
       minWidth:150,
      valueGetter: (params) => params.row.hotelDetails?.hotelName || 'No Data',
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
<>
{access !== "REQUEST_HANDLER" ? <div><subAdminaccess /></div> : <div className="subada-table-container" style={{ position: 'relative', width: "100%",marginTop:"-15px" }}>
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
          User Hotel Ticket Cancel Request
        </Typography>
      </div>

      <div style={{ width: '100%', backgroundColor: "#fff" }}>
        {loading ? (
          <div className="loading-message" style={{
            fontSize: '18px',
            color: '#555',
            textAlign: 'center',
            marginTop: '20px',

          }}>Loading...</div>
        ) : filteredData.length === 0 ? (
          <div className="no-data-message">No data available</div>
        ) : (
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
        )}
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
    </div>}
</>
    
   
  );
};

// const GridToolbar = () => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// };

export default UserHotelCancel;
