import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Pagination,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { apiURL } from "../../../../../Constants/constant";
import "./AgentRequest.css";
import { Alert } from "@mui/material";
const AllAdvertisementTable = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const [selectedUserStatusMap, setSelectedUserStatusMap] = useState({}); // Map to store status for each user

  useEffect(() => {
    async function fetchAdvertisementData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAgents`,
          {
            params: {
              page: currentPage,
              size: pageSize,
            },
          }
        );
        console.log("API Request URL:", response.config.url);
        const initialStatusMap = {};
        response.data.result.docs.forEach((user) => {
          initialStatusMap[user._id] = ""; // Default status
        });
        setAdvertisement(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
        setSelectedUserStatusMap(initialStatusMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bus bookings:", error);
        setLoading(false);
      }
    }

    fetchAdvertisementData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = advertisement.filter((item) => {
      const usernameMatch =
        item.personal_details?.first_name?.toLowerCase().includes(term) || false;
      const dobMatch =
        item.personal_details?.email?.toLowerCase().includes(term) || false;
      const mobileNumberMatch =
        item.personal_details?.mobile?.mobile_number
          .toLowerCase()
          .includes(term) || false;

      return usernameMatch || dobMatch || mobileNumberMatch;
    });

    setFilteredData(filtered);
  };

  const handleStatusChange = async (userId, status) => {
    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skytrails/api/admin/approveAgent`,
        {
          userId: userId,
          approveStatus: status,
        }
      );

      // Log the response for debugging (you can remove this in production)
      // console.log(response);

      // Refetch the user data after updating the status
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

  const columns = [
    {
      field: "agentName",
      headerName: "Agent Name",
      width: 200,
      sortable: false,
      valueGetter: (params) =>
        `${params.row.personal_details?.first_name || ""} ${params.row.personal_details?.last_name || ""
        }`,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
      sortable: false,
      valueGetter: (params) =>
        params.row.personal_details?.mobile?.mobile_number || "No Data",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
      valueGetter: (params) =>
        params.row.personal_details?.email || "No Data",
    },
    {
      field: "agencyLocation",
      headerName: "Agency Location",
      width: 200,
      sortable: false,
      valueGetter: (params) =>
        params.row.agency_details?.address || "No Data",
    },
    {
      field: "panNumber",
      headerName: "Pan Number",
      width: 150,
      sortable: false,
      valueGetter: (params) => params.row.agency_details?.pan_number || "No Data",
    },
    {
      field: "Approve",
      headerName: "Approve",
      width: 200,
      renderCell: (params) => {
        const selectedValue =
          selectedUserStatusMap[params.id] || params.row.status;

        return (
          <select
            value={selectedValue}
            onChange={(event) => {
              handleStatusSelectChange(params.id, event.target.value);
              handleStatusChange(params.id, event.target.value);
            }}
          >
            <option value="">{params.row.status}</option>
            <option value="APPROVED">Approve</option>
            <option value="REJECT">Reject</option>
          </select>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      sortable: false,
      valueGetter: (params) => {
        if (params.row.approveStatus === "PENDING") {
          return "Pending";
        } else {
          return params.row.status || "No Data";
        }
      },
    },
  ];

  return (
    <div className="subada-table-container" style={{ position: "relative", width: "100%" }}>
      <div className="adsearch-bar" id="adssearch"style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold"}}>
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading">
          Agent Request Table
        </Typography>
      </div>
      <div style={{ marginTop:"0px", width: "100%", backgroundColor: "#fff" }}>
        {loading ? (
          <div  className="loading-message" style={{marginTop:"25px", display:"flex",justifyContent:"center",alignItems:"center"}}>Loading...</div>
        ) : filteredData.length === 0 ? (


          <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <Alert severity="info" variant="outlined">
              Data is not available
            </Alert>
          </div>
        ) : (
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[]}
            page={currentPage - 1}
            onPageChange={(params) => handlePageChange(params.page + 1)}
            getRowId={(row) => row._id}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: '10px' }}>
                  <GridToolbar />
                </div>
              ),
              Pagination:()=>null,
            }}
          />
        )}
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

export default AllAdvertisementTable;
