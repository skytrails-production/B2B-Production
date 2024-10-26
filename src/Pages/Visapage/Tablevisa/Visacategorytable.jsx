import React, { useState, useEffect } from "react";
import {Pagination, Paper, Typography } from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
const Visacategorytable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/getVisaCategory`,
        {
          params: {
            page: pageNumber,
          },
        }
      );
      const result = response.data.result;
      setData(result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = [
    { field: "visaType", headerName: "Visa Type", flex: 1 },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    
  ];

  return (
    <Paper 
    className="subada-table-container"
    elevation={3}
    style={{
      position: "relative",
      width: "100%",
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    }}
    >
       <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: 10,
          zIndex: 1,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <TextField
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
        /> */}
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
         Visa Category Table
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5} // Number of items per page
        pagination
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]}
        components={{
          Toolbar: () => (
            <div style={{ marginTop: '10px' }}>
              <GridToolbar />
            </div>
          ),
          Pagination:()=>null,
        }}
        getRowId={(row) => row._id}
      />
      </div>
     

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ margin: "20px", display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default Visacategorytable;
