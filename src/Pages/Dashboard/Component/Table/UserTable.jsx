import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  TableHead,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../Constants/constant";
import "./UserTable.css";

const Usertables = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getAllUsers`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        setUserData(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching User bookings:", error);
        setLoading(false);
      }
    }
    fetchUserData();
  }, [currentPage, searchTerm]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  return (
    <div className="userData-cotaiiner">
    <h2 style={{textAlign:"center", marginTop:"14px"}}>USER TABLE</h2>
      <div className="headings-div">
      
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
      </div>
      <table className="userTable">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>ProfilePic</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id}>
              <td className="table-cell">{user.username || "No Data"}</td>
              <td className="table-cell">{user.email || "No Data"}</td>
              <td className="table-cell">{user.dob || "No Data"}</td>
              <td className="table-cell">
                {user.phone?.mobile_number || "No Data"}
              </td>
              <td className="table-cell">
              <img
                src={user.profilePic}
                alt="profilepic"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </td>            
            </tr>
          ))}
        </tbody>
      </table>
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

export default Usertables;
