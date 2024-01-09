import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserTable.css';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../../Constants/constant";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getAllEvents`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setEvents(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    }

    fetchEventData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const tableHeadings = [
    "Title",
    "Content",
    "Start Date",
    "End Date",
    "Price",
    "Venue",
    "Location",
    "Image",
  ];

  return (
    <div className="events-container">
      <h2>Events Table</h2>
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
      <div className="events-table-container">
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadings.map((heading, index) => (
                <TableCell key={index}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id} className="table-row">
                <TableCell>{event.title || "No Data"}</TableCell>
                <TableCell>{event.content || "No Data"}</TableCell>
                <TableCell>{event.startDate || "No Data"}</TableCell>
                <TableCell>{event.endDate || "No Data"}</TableCell>
                <TableCell>{event.price || "No Data"}</TableCell>
                <TableCell>{event.venue || "No Data"}</TableCell>
                <TableCell>
                  {event.location &&
                    event.location.coordinates &&
                    event.location.coordinates.length === 2 && (
                      <span>
                        Lat: {event.location.coordinates[1]}, Long:{" "}
                        {event.location.coordinates[0]}
                      </span>
                    )}
                </TableCell>
                <TableCell>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="paginate">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className="eventsButton"
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            <h5>{i + 1}</h5>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
