
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, InputAdornment, Typography, Stack, Pagination, Paper
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../Constants/constant';

const Grnuser = () => {
    const [hotelBookings, setHotelBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    //api fetching logic here
    useEffect(() => {
        async function fetchHotelBookings() {
            try {
                const response = await axios.get(
                    `${apiURL.baseURL}/skytrails/api/admin/getAllGrnHotelBookingList`,
                    {
                        params: {
                            page: currentPage,
                            size: pageSize,
                            search: searchTerm,
                        },
                    }
                );
                //console.log(response.data.data);
                setHotelBookings(response.data.data.data);
                setTotalPages(response.data.data. totalPages);
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
        { field: 'booking_id', headerName: 'Booking ID', width: 220 },
        { field: 'holder.email', headerName: 'Email', width: 300 ,valueGetter:(params)=> params.row.holder.email||'No Data' },
        {
            field: 'nameSurname',
            headerName: 'Name',
            width: 220,
            valueGetter: (params) => {
                const { title,name, surname } = params.row.holder;
                return `${title} ${name} ${surname}` || 'No Data';
            },
        },
        {field: 'hotel.name',headerName :'Hotel',width:220,valueGetter:(params)=>params.row.hotel.name||'No Data'},
        {field:'hotel.price',headerName:'Price',width:220,valueGetter:(params)=>params.row.hotel.price||'No Data'},
        {
            field: 'paxesLength',
            headerName: 'Total Guest',
            width: 220,
            valueGetter: (params) => params.row.hotel.paxes.length || 'No Data',
        },
        {
            field:'roomsLength',
            headerName:'Rooms Booked',
            width:220,
            valueGetter:(params)=>params.row.hotel.rooms.length ||'No Data',
        },
        {
            field:'checkin',
            headerName:'CheckIn',
            width:220,
            valueGetter:(params)=>params.row.checkin ||'No Data',            
        },
        {
            field:'checkout',
            headerName:'Checkout',
            width:220,
            valueGetter:(params)=>params.row.checkout ||'No Data',            
        }

    ];
    return (
        
            <div className='subada-table-container' style={{ position: 'relative', width: '100%' }}>
                <div className='adsearch-bar' style={{ position: 'absolute', top: '10', zIndex: 1, fontWeight: 'bold' }}>
                    <TextField
                        type='text'
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder='Search by name, ID, etc.'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'><SearchIcon /></InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant='h5' className='adtable-heading'>GRN Bookings</Typography>
                </div>
                <Paper>
                    <DataGrid
                        rows={hotelBookings}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[pageSize]}
                        pagination
                        getRowId={(row) => row._id}
                        style={{ width: '100%' }}
                        components={{
                            Toolbar: () => (
                                <div style={{ marginTop: '20px' }}>
                                    <GridToolbar />
                                </div>
                            ),
                            Pagination: () => null,
                        }}
                    />
                </Paper>
                <div className='paginate' >
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

export default Grnuser;
