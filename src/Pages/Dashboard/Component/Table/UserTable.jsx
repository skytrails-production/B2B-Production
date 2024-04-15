import React, { useState, useEffect } from "react";
import axios from "axios";
import {

  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../../../Constants/constant";
import "./UserTable.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
const Usertables = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalDocs,setTotalDocs] = useState(0);

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
        setTotalDocs(response.data.result.totalDocs);
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
  const handleDownloadAllData = async () => {
    try {
      const totalPages = Math.ceil(totalDocs / 8);
      let allData = [];
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getAllUsers?page=${page}`
        );
        allData = allData.concat(response.data.result.docs);
      }
      const columnTitles = ["UserName", "Email", "DOB", "Phone Number"];
      const extractedData = allData.map((row) => ({
        UserName: row.username || "N/A",
        Email: row.email || "N/A",
        DOB: row.dob || "N/A",
        "Phone Number": row.phone?.mobile_number || "N/A",
      }));
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [columnTitles.join(",")]    
          .concat(extractedData.map((row) => Object.values(row).join(",")))
          .join("\n");
  
      // Create blob object
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link element
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "all_data.csv");
      link.style.display = "none"; // Hide the link
  
      // Append the link to the body and trigger the click event
      document.body.appendChild(link);
      link.click();
  
      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };
  
  
//   const handleDownloadAllData = async () =>{
//     try{
//       const totalPages =Math.ceil(totalDocs/8);
//       let allData =[];
//       for(let page=1; page<=totalPages; page++){
//         const response =await axios.get(
//         `${apiURL.baseURL}/skyTrails/api/admin/getAllUsers?page=${page}`
//         );
//         allData =allData.concat(response.data.result.docs);
//       }
// const columnTitles = [
//    "UserName",
//    "Email",
//    "DOB",
//    "Phone Number",
// ];
// const extractedData = allData.map((row) =>({
//   UserName:row.username || "N/A",
//   Email:row.email ||"N/A",
//   DOB:row.dob ||"N/A",
//   "Phone Number":row.phone?.mobile_number ||"N/A",  
// })
// );
// const csvContent =
// "data:text/csv;charset=utf-8," +
// [columnTitles.join(",")]
//   .concat(extractedData.map((row) => Object.values(row).join(",")))
//   .join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "all_data.csv");
//   document.body.appendChild(link);

//   // Click the link to initiate download
//   link.click();
//     }catch (error) {
//       console.error("Error downloading data:", error);
//     }
//   }
  
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
    // Add more columns here if needed or add more data if needed
  ];



  return (
    <div className="user-table-container" style={{ position: 'relative', width: "100%",marginTop:"100px" }}>
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
         <Button
          variant="contained"
          onClick={handleDownloadAllData}
          style={{
            marginLeft: "10px",
            backgroundColor: "#21325D",
            color: "white",
          }}
        >
          Download All Data
          <GetAppIcon style={{ marginLeft: "5px" }} />
        </Button>
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
              <div style={{ marginTop: "10px" }}>
                <GridToolbar />
              </div>
            ),
            Pagination:()=>null,
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
    </div>
  );
};

export default Usertables;
