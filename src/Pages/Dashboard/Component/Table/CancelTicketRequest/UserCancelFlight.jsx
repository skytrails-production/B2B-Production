// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper,TextField,InputAdornment } from '@mui/material';
import '../FlightBookings/Flightbookings';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';
const AllFlightCancelTicketsUser = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchflightBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getCancelUserFlightBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            }
          }
        );
        setFlightBookings(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
        setLoading(false);
      }
    }
    fetchflightBookings();
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
    <h3>USER FLIGHTTICKET CANCEL REQUEST</h3>
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
            <th>PNR</th>
            <th>Amount</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>DateOfJourney</th>
            <th>AirlineName</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {flightBookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.bookingId}</td>
              <td>{booking.userDetails.username||"No Data"}</td>
              <td>{booking.userDetails.phone.mobile_number||"No Data"}</td>
              <td>{booking.reason}</td>
              <td>{booking.flightDetails.pnr||"No Data "}</td>
              <td>{booking.flightDetails.totalAmount||" No Data"}</td>
              <td>{booking.flightDetails.origin||"No Data "}</td>
              <td>{booking.flightDetails.destination||"No Data"}</td>
              <td>{booking.flightDetails.airlineDetails[0].Origin.DepTime||" No Data"}</td>
              <td>{booking.flightDetails.airlineDetails[0].Airline.AirlineName||" No Data"}</td>
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

export default AllFlightCancelTicketsUser;
