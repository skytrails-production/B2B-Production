// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper,TextField,InputAdornment,TableHead } from '@mui/material';
// import '../HotelBookings/HotelBookings.css';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';


const AllBusChangeTickets = () => {
    const [hotelBookings, setHotelBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      async function fetchHotelBookings() {
        try {
          setLoading(true); // Set loading to true when fetching data
          const response = await axios.get(
            `${apiURL.baseURL}/skyTrails/api/admin/getchangeBusRequestAgent`,
            {
              params: {
                page: currentPage,
                size: pageSize,
                search: searchTerm,
              }
            }
          );
          setHotelBookings(response.data.result.docs);
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
  
    return (
      <div className='hotel-container'>
      <h3>USER BUSTICKET CHANGE REQUEST</h3>
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bus ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>PNR</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>DateOfJourney</TableCell>
                  <TableCell>busType</TableCell>
                  <TableCell>Approve</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotelBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.busDetails.busId||"No Data"}</TableCell>
                    <TableCell>{`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`||"No Data"}</TableCell>
                    <TableCell>{booking.userDetails.personal_details.mobile.mobile_number||"No Data"}</TableCell>
                    <TableCell>{booking.userDetails.personal_details.email||"No Data"}</TableCell>
                    <TableCell>{booking.reason||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.pnr||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.amount||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.origin||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.destination||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.departureTime||"No Data"}</TableCell>
                    <TableCell>{booking.busDetails.busType||"No Data"}</TableCell>
                    <TableCell><button>APPROVE</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        <div className="paginate">
          {Array.from({ length: totalPages }, (_, i) => (
            <button className='hotelButton' key={i + 1} onClick={() => handlePageChange(i + 1)}>
              <h5>{i + 1}</h5>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default AllBusChangeTickets;
