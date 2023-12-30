import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { getForexAction } from "../../../../../Redux/Auth/forexData/actionForexData";
import { getForex4CustomerAction } from "../../../../../Redux/Auth/ForexData4Customer/actionForex4CustomerData";

const ForexDataWithMe = [
  { field: "id", headerName: "User ID", width: 90 },
  {
    field: "amount	",
    headerName: "Amount",
    width: 90,
    editable: true,
  },
  {
    field: "commissionType",
    headerName: "Commission Type",
    width: 110,
    editable: true,
  },
  {
    field: "enterCity",
    headerName: "Enter City",
    width: 100,
    editable: true,
  },
  {
    field: "enterLocation",
    headerName: "Enter Location",
    width: 110,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 110,
    editable: true,
  },
  {
    field: "services",
    headerName: "Services",
    width: 110,
    editable: true,
  },
];
const forexDataWithCustomer = [
  { field: "id", headerName: "User ID", width: 90 },
  {
    field: "amount	",
    headerName: "Amount",
    width: 90,
    editable: true,
  },
  {
    field: "commissionType",
    headerName: "Commission Type",
    width: 110,
    editable: true,
  },
  {
    field: "enterCity",
    headerName: "Enter City",
    width: 100,
    editable: true,
  },
  {
    field: "enterLocation",
    headerName: "Enter Location",
    width: 110,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 110,
    editable: true,
  },
  {
    field: "services",
    headerName: "Services",
    width: 110,
    editable: true,
  },
];
const ForexData = () => {
  const reducerState = useSelector((state) => state);
  // console.log(reducerState);

  const forexData = reducerState?.getForex?.forexData?.data?.data;
  const ForexData4Customer =
    reducerState?.getForex4Customer?.forexData4Customer?.data?.data;
  // console.log("forexData", forexData);
  // console.log("forexDataCus", ForexData4Customer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForexAction());
    dispatch(getForex4CustomerAction());
  }, []);
  return (
    <>
      <Box height={100} />
      <h3 style={{ textAlign: "center" }}>Forex Data With Me</h3>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={[]}
          columns={ForexDataWithMe}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <h3 className="mt-5" style={{ textAlign: "center" }}>
        Forex Data With Customer
      </h3>
      <Box height={50} />
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={[]}
          columns={forexDataWithCustomer}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default ForexData;
