import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiURL } from "../../../../../Constants/constant";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Typography,
  Paper,
  Button,

} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import userApi from "../../../../../Redux/API/api";


// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     marginTop:"15px",
//   },
//   toolbarButton: {
//     marginLeft: theme.spacing(2),
//   },
// }));


const FixedDepartureControl = () => {
  // const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllFixDepartureBooking`
        );
        setData(response.data?.result?.docs || []);
        // console.log(response.data.result.docs);
        setTotalPages(response.data?.result?.totalPages || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (flightId, seat) => {
    const payload = {
      _id: flightId,
      noOfBooking: seat,
    };

    userApi.updateFlightBookingSeat(payload);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const filteredData = data.filter(
    (item) =>
      item.loginName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numberOfSeats.toString().includes(searchTerm.toLowerCase()) ||
      item.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.soldTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.finalSalePrice.toString().includes(searchTerm.toLowerCase()) ||
      item.names.some(
        (itemName) =>
          itemName.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemName.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemName.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemName.passport.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemName.passportExpiry.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const columns = [
    { field: "loginName", headerName: "Login Name", width: 220, },
    { field: "numberOfSeats", headerName: "Number Of Seat", width: 220, },
    { field: "phoneNo", headerName: "Phone Number", width: 220, },
    { field: "soldTo", headerName: "Sold To", width: 220, },
    { field: "emailId", headerName: "Email", width: 220, },
    { field: "status", headerName: "Status", width: 220, },
    { field: "finalSalePrice", headerName: "Final Sale Price", width: 220, },
    {
      field: "names",
      headerName: "Passenger",
      width: 220,
      renderCell: (params) => (
        <ul>
          {params.row.names.map((itemName, index) => (
            <li key={index}>
              {`${itemName?.firstName} ${itemName?.lastName} - ${itemName?.title} - ${itemName?.passport} - ${itemName?.passportExpiry}`}
            </li>
          ))}
        </ul>
      ),
    },
    {
      field: "update",
      headerName: "Update Seat",
      width: 220,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate(params.row.flightId, params.row.numberOfSeats)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Paper className="subada-table-container" elevation={3} style={{ position: "relative", width: "100%", backgroundColor: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      <div className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          placeholder="Search by name, ID, etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Fixed Departure Control
        </Typography>
      </div>
      <div style={{ width: "100%" ,marginTop:'25px',marginLeft:'20px'}}>
        {filteredData.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={pageSize}
            pagination
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={handlePageSizeChange}
            disableSelectionOnClick
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
    </Paper>
  );


};

export default FixedDepartureControl;
