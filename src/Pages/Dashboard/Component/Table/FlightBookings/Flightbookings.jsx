import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
} from "@mui/material";
import "./FlightBooking.css";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../../Constants/constant";
const AllFlightBooking = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchFlightBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingList`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setFlightBookings(response.data.result.docs);
        // console.log("=>>>", response.data.result.totalPages)
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight bookings:", error);
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
    setCurrentPage(1); // Reset to the first page when performing a new search
  };
  return (
    <div className="flight-container">
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
            <th>PNR</th>
            <th>User Name</th>
            <th>Passenger Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Flight Name</th>
            <th>Origin</th>
            <th>Destination </th>
          </tr>
        </thead>
        <tbody>
          {flightBookings.map((booking) => (
            <tr key={booking._id}>

              <td>{booking.bookingId||"No Data"}</td>
              <td>{booking.pnr||"No Data"}</td>
              <td>{booking.UserDetails.username||"No Data"}</td>
              <td>{`${booking.passengerDetails[0]?.firstName} ${booking.passengerDetails[0]?.lastName}`||"No Data"}</td>
              <td>{booking.passengerDetails[0]?.email||"No Data"}</td>
              <td>{booking.passengerDetails[0]?.ContactNo || "N/A"}</td>
              <td>{booking.airlineDetails[0]?.Airline.AirlineName||"No Data"}</td>
              <td>{booking.origin||"No Data"}</td>
              <td>{booking.destination||"No Data"}</td>

            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="paginate">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          className={`flightButton ${currentPage === i + 1 ? 'activePage' : ''}`}
          key={i}
          onClick={() => handlePageChange(i + 1)}
          disabled={currentPage === i + 1 || i + 1 > totalPages}
        >
          <h5 className="flightButton">{i + 1}</h5>
        </button>
      ))}
      
      </div>
    </div>
  );
};

export default AllFlightBooking;
