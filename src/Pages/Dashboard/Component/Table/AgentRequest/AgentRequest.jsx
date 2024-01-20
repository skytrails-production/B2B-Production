import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
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

const AllAdvertisementTable = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const [approveStatus, setApproveStatus] = useState("all");

  const handleApproveStatusChange = (event, newStatus) => {
    if (newStatus !== null) {
      setApproveStatus(newStatus);
    }
  };
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
        setAdvertisement(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setFilteredData(response.data.result.docs);
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

  const handleSorting = (field) => {
    setSortOrder({
      field,
      order: sortOrder.field === field ? (sortOrder.order === "asc" ? "desc" : "asc") : "asc",
    });
  };

  const columns = [
    { field: "agentName", headerName: "Agent Name", width: 200, sortable: false, valueGetter: (params) => `${params.row.personal_details?.first_name || ""} ${params.row.personal_details?.last_name || ""}` },
    { field: "contact", headerName: "Contact", width: 150, sortable: false, valueGetter: (params) => params.row.personal_details?.mobile?.mobile_number || "No Data" },
    { field: "email", headerName: "Email", width: 200, sortable: false, valueGetter: (params) => params.row.personal_details?.email || "No Data" },
    { field: "agencyLocation", headerName: "Agency Location", width: 200, sortable: false, valueGetter: (params) => params.row.agency_details?.address || "No Data" },
    { field: "panNumber", headerName: "Pan Number", width: 150, sortable: false, valueGetter: (params) => params.row.agency_details?.pan_number || "No Data" },
    {
      field: "approveStatus",
      headerName: "APPROVE STATUS",
      width: 150,
      renderCell: (params) => (
        <ToggleButtonGroup
          value={params.row.approveStatus}
          exclusive
          onChange={(event, value) => handleApproveStatusChange(params.row.id, value)}
        >
          <ToggleButton value="approved" style={{ backgroundColor: "#21325D", color: "#FFFFFF" }}>
            <ApprovalIcon />
          </ToggleButton>
          <ToggleButton value="notApproved" style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}>
            Not Approved
          </ToggleButton>
        </ToggleButtonGroup>
      ),
      sortable: false,
    },
  ];
  


  return (
    <div className="subada-table-container"style={{ position: 'relative', width: "100%" }}>
      <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
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
      <div style={{width: "100%",backgroundColor:"#fff" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[]}
          page={currentPage - 1}
          onPageChange={(params) => handlePageChange(params.page + 1)}
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

export default AllAdvertisementTable;
