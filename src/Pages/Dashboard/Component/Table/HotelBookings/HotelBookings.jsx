// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper,TextField,InputAdornment } from '@mui/material';
import './HotelBookings.css';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
const AllHotelBooking = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllHotelBookingList`,
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
  return (

    <div className='hotel-container'>
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
            <th>User Name</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>CheckInDate</th>
            <th>CheckOutDate</th>
            <th>HotelName</th>
            <th>CityName</th>
            {/* Add more table headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {hotelBookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.hotelId||"No Data"}</td>
              <td>{booking.userDetails?.username||"No Data"}</td>
              <td>{booking.name||"No Data"}</td>
              <td>{booking.phone||"No Data"}</td>
              <td>{booking.email||"No Data"}</td>
              <td>{new Date(booking.CheckInDate).toDateString()||"No Data"}</td>
              <td>{new Date(booking.CheckOutDate).toDateString()||"No Data"}</td>
              <td>{booking.hotelName||"No Data"}</td>
              <td>{booking.cityName||"No Data"}</td>
              {/* Add more table data cells based on your data */}
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

export default AllHotelBooking;
