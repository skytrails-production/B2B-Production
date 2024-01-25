import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./AddAgent.css"; // Import the CSS file
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import "./UserTable.css";
import SearchIcon from "@mui/icons-material/Search";
import "./subAdmin.css";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";

const SubAdminTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserStatusMap, setSelectedUserStatusMap] = useState({}); // Map to store status for each user

  // Declare the fetchUserData function
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skytrails/api/admin/getSubAdmin`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        }
      );
      // Initialize status for each user
      const initialStatusMap = {};
      response.data.result.docs.forEach((user) => {
        initialStatusMap[user._id] = ""; // Default status
      });
      setSelectedUserStatusMap(initialStatusMap);
      setUserData(response.data.result.docs);
      setTotalPages(response.data.result.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching User bookings:", error);
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    // Fetch user data when the component mounts or when dependencies change
    fetchUserData();
  }, [fetchUserData]); // Ensure that useEffect depends on the callback

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = async (userId,status) => {
    
    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skytrails/api/admin/updateSubAdminStatus`,
        {
          userId: userId,
          approveStatus: status,
        }
      );

      // Log the response for debugging (you can remove this in production)
      // console.log(response);

      // Refetch the user data after updating the status
      fetchUserData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusSelectChange = (userId, status) => {
    setSelectedUserStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [userId]: status,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "BLOCK":
        return "red";
      case "DELETE":
        return "orange";
      default:
        return "black";
    }
  };
  const getStatusForbackgroundColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "white";
      default:
        return "black"; // Default text color
    }
  };
  const columns = [
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "authType", headerName: "Auth Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const selectedValue = selectedUserStatusMap[params.id] || params.row.status;
  
        return (
          <select
            value={selectedValue}
            onChange={(event) => {
              handleStatusSelectChange(params.id, event.target.value);
              handleStatusChange(params.id, event.target.value);
            }}
            style={{ color: getStatusColor(selectedValue),
            
            }}
          >
            <option value="">{params.row.status}</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCK">Block</option>
            <option value="DELETE">Delete</option>
          </select>
        );
      },
    },
  ];
  
  
  
  

  return (
    <div className="subad-table-container" style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
        <Typography variant="h5" className="adtable-heading">
          Subadmin Table
        </Typography>
      </div>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={pageSize}
          page={currentPage - 1}
          onPageChange={(params) => handlePageChange(params.page + 1)}
          pagination
          getRowId={(row) => row._id}
        />
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default SubAdminTable;
