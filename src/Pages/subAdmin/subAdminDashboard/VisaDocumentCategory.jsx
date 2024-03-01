import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
function VisaDocumentCategory() {
  const [data, setData] = useState([]);
  const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/document/getDocumnetCategory`
      );

      const result = response.data.result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "categoryName", headerName: "Category Name", width: 220 },
    { field: "description", headerName: "Description", width: 220 },
    {
      field: "documentTypesId",
      headerName: "Document Name",
      width: 220,
      valueGetter: (params) =>
        params.row.documentTypesId ? params.row.documentTypesId.documentName : "NA",
    },
    {
      field: "documentDescription",
      headerName: "Document Description",
      width: 220,
      valueGetter: (params) =>
        params.row.documentTypesId ? params.row.documentTypesId.description : "NA",
    },
  ];





  return (

    <>
     {access !== "VISA_PROCESSING" ? <div style={{textAlign:"center"}}>INVALID PAGE</div> :<Paper className="subada-table-container"
      elevation={3}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginTop:"-15px"
      }}>
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
          Visa Document Category
        </Typography>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5} // Number of items per page
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
    </Paper>}
    </>
    
  );
}

export default VisaDocumentCategory;
