// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper,TextField,InputAdornment } from '@mui/material';
import '../HotelBookings/HotelBookings.css';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchHotelBookings() {
      console.log("jjjjjjj")
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserHotelBooking`,
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
    // console.log("hotelBookings========", hotelBookings);
    fetchHotelBookings();
  }, [currentPage, searchTerm]);
  const handlePageChange = (page) => {
    // console.log("page", page)
    setCurrentPage(page);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  
  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };
  return (

    <div className='hotel-container'>
    <h3>USER BUSTICKET CANCEL REQUEST</h3>
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
      <table border="1">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Reason</th>
            <th>Hotel ID</th>
            <th>Amount</th>
            <th>CheckInDate</th>
            <th>Stay Duration (Days)</th>
            <th>Destination</th>
            <th>Hotel Name</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {hotelBookings.map(booking => (
            <tr key={booking._id}>
            <td>{booking.bookingId}</td>
            <td>{booking.userDetails?.username}</td>
            <td>{booking.userDetails?.phone?.mobile_number}</td>
            <td>{booking.reason}</td>
            <td>{booking.hotelDetails?.hotelId}</td>
            <td>{booking.hotelDetails?.amount}</td>
            <td>{booking.hotelDetails?.CheckInDate}</td>
            <td>{calculateStayDuration(booking.hotelDetails?.CheckInDate, booking.hotelDetails?.CheckOutDate)}</td>
            <td>{booking.hotelDetails?.cityName}</td>
            <td>{booking.hotelDetails?.hotelName}</td>
            <td><button>APPROVE</button></td>
          </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
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

export default AllHotelCancelTickets;
