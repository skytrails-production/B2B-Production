import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Importing useSelector
import axios from "axios";
import { Paper, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiURL } from "../../../Constants/constant";

const RelationshipCreate = () => {
  const [relationshipManagers, setRelationshipManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const reducerState = useSelector((state) => state);
  const token = reducerState?.subadminLogin?.subadminloginData?.result?.token;

  useEffect(() => {
    async function fetchRelationshipManagers() {
      //console.log("+++++++++++++++++++++++++++++++++++++")
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAllRM`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        setRelationshipManagers(response.data.result);
        // console.log(token, "888888888888888");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Relationship Managers:", error);
        setLoading(false);
      }
    }

    fetchRelationshipManagers();
  }, [token]); // Dependency on token to refetch when token changes

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
      valueGetter: (params) => params.row.addressDetails?.city || "N/A",
    },
    {
      field: "pincode",
      headerName: "Pincode",
      width: 200,
      valueGetter: (params) => params.row.addressDetails?.pincode || "N/A",
    },
    {
      field: "state",
      headerName: "State",
      width: 200,
      valueGetter: (params) => params.row.addressDetails?.state || "N/A",
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
      valueGetter: (params) => params.row.addressDetails?.country || "N/A",
    },
  ];

  return (
    <div>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : relationshipManagers && relationshipManagers.length > 0 ? (
        <Paper style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={relationshipManagers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            getRowId={(row) => row._id}
          />
        </Paper>
      ) : (
        <Typography sx={{ textAlign: "center" }}>No data available</Typography>
      )}
    </div>
  );
};

export default RelationshipCreate;







