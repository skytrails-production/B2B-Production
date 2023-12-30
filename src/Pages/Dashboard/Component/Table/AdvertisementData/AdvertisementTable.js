import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdvertisementTable.css';
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

const AllAdvertisementTable = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAdvertisementData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/getadvertisement`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setAdvertisement(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bus bookings:", error);
        setLoading(false);
      }
    }

    fetchAdvertisementData();
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
    "Remaining Days",
    "Image",
  ];
  return (
    <div className="bus-container">
      <h2>Advertisement Table</h2>
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
      <div className="advertisement-container">
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Remaining Days</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {advertisement.map((ad) => (
              <tr key={ad._id} className="table-row">
                <td className="table-cell">{ad.title || "No Data"}</td>
                <td className="table-cell">{ad.content || "No Data"}</td>
                <td className="table-cell">{ad.startDate || "No Data"}</td>
                <td className="table-cell">{ad.endDate || "No Data"}</td>
                <td className="table-cell">{ad.remainingDays || "No Data"}</td>
                <td className="table-cell">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginate">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className="adsButton"
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

export default AllAdvertisementTable;
