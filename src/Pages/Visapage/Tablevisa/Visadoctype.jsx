import React, { useState, useEffect } from "react";
import { Typography, Paper, Pagination, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";

function Visadoctype() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/document/getDocType?page=${pageNumber}`
      );
      const result = response.data.result;
      setData(result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const columns = [
    { field: "documentName", headerName: "Document Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
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
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Visa Document Type
        </Typography>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5} // Number of items per page
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        getRowId={(row) => row._id}
      />

      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Paper>
  );
}

export default Visadoctype;
