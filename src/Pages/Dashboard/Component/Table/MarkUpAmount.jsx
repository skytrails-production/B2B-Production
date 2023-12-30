import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "User ID", width: 90 },
  {
    field: "flight",
    headerName: "Flight Markup",
    width: 150,
    editable: true,
  },
  {
    field: "hotel",
    headerName: "Hotel Markup",
    width: 110,
    editable: true,
  },
  {
    field: "holiday",
    headerName: "HHoliday Markup",
    width: 150,
    editable: true,
  },
  {
    field: "bus",
    headerName: "Bus Markup",
    width: 110,
    editable: true,
  },
];
const markup = [
  {
    id: 1,
    flight: 0.1,
    hotel: 0.15,
    holiday: 0.12,
    bus: 0.08,
  },
  {
    id: 2,
    flight: 0.08,
    hotel: 0.12,
    holiday: 0.1,
    bus: 0.06,
  },
  {
    id: 3,
    flight: 0.12,
    hotel: 0.18,
    holiday: 0.15,
    bus: 0.1,
  },
  {
    id: 4,
    flight: 0.09,
    hotel: 0.14,
    holiday: 0.11,
    bus: 0.07,
  },
  {
    id: 5,
    flight: 0.11,
    hotel: 0.16,
    holiday: 0.13,
    bus: 0.09,
  },
  {
    id: 6,
    flight: 0.11,
    hotel: 0.16,
    holiday: 0.13,
    bus: 0.09,
  },
  {
    id: 7,
    flight: 0.11,
    hotel: 0.16,
    holiday: 0.13,
    bus: 0.09,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function MarkUpAmount() {
  const reducerState = useSelector((state) => state);

  // Table data to be rendered
  const tableData = reducerState?.userTableData?.userData?.data?.data;
  // console.log(reducerState, "tableData", tableData);
  return (
    <>
      <Box height={100} />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={markup}
          columns={columns}
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
}
