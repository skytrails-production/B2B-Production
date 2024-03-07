import React, { useState, useEffect } from "react";
import axios from "axios";
import {

  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../Constants/constant";
import "./Usertable.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
const Usertable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

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

  const columns = [
    {
      field: "username",
      headerName: "UserName",
      minWidth: 200,
      valueGetter: (params) => params.row.username || "No Data"
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 240,
      valueGetter: (params) => params.row.email || "No Data"
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
      valueGetter: (params) => params.row.dob || "No Data"
    },
    {
      field: "phone.mobile_number",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (params) => params.row.phone?.mobile_number || "No Data",
    },
    {
      field: "profilePic",
      headerName: "ProfilePic",
      flex: 1,
      //valueGetter: (params) => params.row.profilePic || "No Data",
      renderCell: (params) => (
        <div style={{ borderRadius: "50%", overflow: "hidden", width: 50, height: 50 }}>
          {params.value ? (
            <img
              src={params.value}
              alt="profilepic"
              className="profile-image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src="https://www.sarojhospital.com/images/testimonials/dummy-profile.png" // Replace "/path_to_dummy_image.png" with the path to your dummy image
              alt="dummy"
              className="profile-image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      ),


    },
    // Add more columns here if needed
  ];



  return (

    <>
      {access !== "USER_MANAGER" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :
        <div className="user-table-container" style={{ position: 'relative', width: "100%" }}>
          <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold', backgroundColor: "#E73C33" }}>
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
              User Table
            </Typography>
          </div>
          <div style={{ width: "100%", backgroundColor: "#fff" }}>
            <DataGrid
              rows={userData}
              columns={columns}
              pageSize={pageSize}
              checkboxSelection


              getRowId={(row) => row._id}
              components={{
                Toolbar: () => (
                  <div style={{ marginTop: '10px' }}>
                    <GridToolbar />
                    
                  </div>
                ),
                Pagination: () => null,
              }}
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
        </div>}
    </>

  );
};

export default Usertable;
