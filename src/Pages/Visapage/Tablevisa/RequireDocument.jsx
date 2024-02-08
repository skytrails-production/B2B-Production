import React, { useState, useEffect } from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { Pagination, Paper, Typography } from "@mui/material";
function RequireDocument() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/document/getRequireDocument`
      );

      const result = response.data.result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "requiredDocCategory",
      headerName: "Required Document Category",
      width: 220,
      valueGetter: (params) => params.row.requiredDocCategory || "No Data",
    },
    {
      field: "visaType", headerName: "Visa Type", width: 220,
      valueGetter: (params) =>
        params.row.visaType ? params.row.visaType : "No Data"

    },
    { field: "visaCountry", headerName: "Visa Country", width: 220, valueGetter: (params) => params.row.visaCountry?.countryName || "No Data" },
    { field: "visaCategory", headerName: "Visa Category", width: 220, valueGetter: (params) => params.row.visaCategory?.categoryName || "No Data" },
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
          Required Document
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}  // Adjust as needed
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id}
          components={{
            Toolbar: () => (
              <div style={{ marginTop: '10px' }}>
                <GridToolbar />
              </div>
            ),
          }}
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
}

export default RequireDocument;
