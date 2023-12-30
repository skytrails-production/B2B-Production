import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgentHotelBookings.css';
import { Table, TableBody, TableCell, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
const AllBusBooking = () => {
  const [busBookings, setBusBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchBusBookings() {
      try {
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllHotelBookingListAgent`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            }
          }
        )
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
  return (
    <div className="bus-container">
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
            <th>Agency Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Destination</th>
            <th>Hotel Name</th>
            <th>Amount</th>
            <th>Hotel Id</th>
            <th>Date Of Journey</th>
            <th>Rooms</th>
          </tr>
        </thead>
        <tbody>
          {busBookings.map(bookings => (
            <tr key={bookings._id}>
              <td>{bookings.bookingId}</td>
              <td>{bookings.userDetails.agency_details.agency_name||"No Data"}</td>
              <td>{`${bookings.userDetails.personal_details.first_name}${bookings.userDetails.personal_details.last_name}`||"No Data"}</td>
              <td>{bookings.userDetails ? `${bookings.userDetails.personal_details.email||"No Data"}` : "Empty"}</td>
              <td>{bookings.userDetails.personal_details.mobile.mobile_number||"No Data"}</td>
              <td>{bookings.destination||"No Data"}</td>
              <td>{bookings.hotelName||"No Data"}</td>
              <td>{bookings.amount||"No Data"}</td>
              <td>{bookings.hotelId||"No Data"}</td>
              <td>{new Date(bookings.dateOfJourney).toDateString()||"No Data"}</td>
              <td>{bookings.room||"No Data"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginate">
        {Array.from({ length: totalPages }, (_, i) => (
          <button className="busButton" key={i + 1} onClick={() => handlePageChange(i + 1)}>
            <h5>{i + 1}</h5>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBusBooking;
