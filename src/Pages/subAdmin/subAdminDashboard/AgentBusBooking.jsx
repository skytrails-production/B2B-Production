import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
import {
    TextField,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Stack,
    Pagination,
    Typography,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../Constants/constant';
import { DataGrid, GridToolbarColumnsButton, GridToolbarExport } from '@mui/x-data-grid';


import Swal from 'sweetalert2';
const AgentBusBooking = () => {
    const [busBookings, setBusBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 10; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const reducerState = useSelector((state) => state);
    const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

    useEffect(() => {
        async function fetchBusBookings() {
            try {
                setLoading(true);
                const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllBusBookingListAgent`, {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchTerm,
                    },
                });
                setBusBookings(response.data.result.docs);
                setTotalPages(response.data.result.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Bus bookings:', error);
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
        setCurrentPage(1); // Reset to the first page when performing a new search
    };
    const handleViewDetails = (booking) => {
        handleShowAlert(booking);
    };

    const handleShowAlert = (booking) => {
        const row = booking;
        const passengerCount = row.passenger.length;
        const passengerDetailsHtml = row.passenger.map(passenger => `
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
        { field: 'busId', headerName: 'Bus ID', width: 220, valueGetter: (params) => params.row.busId || 'No Data' },
        {
            field: 'passenger[0]?.firstName',
            headerName: 'Passenger Name',
            width: 220,
            valueGetter: (params) => {
                const firstName = params.row.passenger[0]?.firstName || 'No Data';
                const lastName = params.row.passenger[0]?.lastName || 'No Data';
                return `${firstName} ${lastName}`;
            }
        },
        // {
        //   field: 'passenger[1]?.firstName',
        //   headerName: 'Passenger Name',
        //   width: 220,
        //   valueGetter: (params) => {
        //     const firstName = params.row.passenger[1]?.firstName || 'No Data';
        //     const lastName = params.row.passenger[1]?.lastName || 'No Data';
        //     return `${firstName} ${lastName}`;
        //   }
        // },

        { field: 'userDetails.personal_details.email', headerName: 'Email', width: 300, valueGetter: (params) => params.row.passenger[0]?.Email || 'No Data' },
        {
            field: 'userDetails.personal_details.mobile',
            headerName: 'Phone',
            width: 220,
            valueGetter: (params) =>
                params.row.passenger[0]?.Phone

        },
        { field: 'destination', headerName: 'Destination', width: 220, valueGetter: (params) => params.row.destination || 'No Data' },
        { field: 'origin', headerName: 'Origin', width: 220, valueGetter: (params) => params.row.origin || 'No Data' },
        { field: 'amountv', headerName: 'Amount', width: 220, valueGetter: (params) => params.row.passenger[0]?.Price || 'No Data' },
        { field: 'busType', headerName: 'Bus Type', width: 300, valueGetter: (params) => params.row.busType || 'No Data' },
        { field: 'pnr', headerName: 'PNR', width: 220, valueGetter: (params) => params.row.pnr || 'No Data' },
        { field: 'dateOfJourney', headerName: 'Date Of Journey', width: 220, valueGetter: (params) => new Date(params.row.departureTime).toDateString() || 'No Data' },
        { field: 'noOfSeats', headerName: 'No Of Seats', width: 220, valueGetter: (params) => params.row.noOfSeats || 'No Data' },
    ];

    return (
        <>
            {access !== "BOOKING_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :
                <div className="subada-table-container" style={{ position: 'relative', width: "100%", marginTop: "-15px" }}>
                    <div className='adsearch-bar' style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold', backgroundColor: "#E73C33" }}>
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
                            Agent Bus Booking
                        </Typography>
                    </div>
                    {busBookings.length === 0 ? (
                        <Paper>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h3>No Data Available</h3>
                            </div>
                        </Paper>
                    ) : (
                        <Paper style={{ width: '100%' }}>
                            <DataGrid
                                rows={busBookings}
                                columns={columns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                getRowId={(row) => row._id}
                                components={{
                                    Toolbar: () => (
                                        <div style={{ marginTop: '10px' }}>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarExport />
                                        </div>
                                    ),

                                    Pagination: () => null, // Hide the pagination component
                                }}
                            />



                            {/* //   <DataGrid
    //   rows={busBookings}
    //   columns={columns}
       
        
    //     checkboxSelection
    //     disableRowSelectionOnClick
    //   /> */}


                        </Paper>
                    )}

                    {/* Pagination */}
                    <div className="paginate">
                        <Stack spacing={2} direction="row" justifyContent="center">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, page) => handlePageChange(page)}
                                color="primary"
                            />
                        </Stack>
                    </div>
                </div>
            }
        </>

    );
};

export default AgentBusBooking;
