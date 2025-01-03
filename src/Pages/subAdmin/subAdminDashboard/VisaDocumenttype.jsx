import React, { useState, useEffect } from "react";
import { Typography, Paper, Pagination, Stack } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
function VisaDocumenttype() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

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
    
  ];

  return (
    <>
     {access !== "VISA_PROCESSING" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> : <Paper
      className="subada-table-container"
      elevation={3}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginTop:"-15px"
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
          backgroundColor:"#E73C33",
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
        components={{
          Toolbar: () => (
            <div style={{ marginTop: '10px' }}>
            <GridToolbarColumnsButton />
            <GridToolbarExport/>
          </div>
          ),
          Pagination:()=>null,
        }}
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
    </Paper>}
    </>
   
  );
}

export default VisaDocumenttype;
