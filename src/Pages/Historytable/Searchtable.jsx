import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { apiURL } from "../../Constants/constant";

function Searchtable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/userSearchHistory?page=${pageNumber}`
      );
      const result = response.data.result.docs;
      setData(result);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div style={{ marginTop: "64px" }}>
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>Search History</h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table" style={{marginTop:"0px",marginBottom:"0px"}}>
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Journey Date</TableCell>
              <TableCell>Journey Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Search Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{ color: "white" }}>{item.userId}</TableCell>
                <TableCell style={{ color: "white" }}>{item.origin}</TableCell>
                <TableCell style={{ color: "white" }}>
                  {item.destination}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {item.journeyDate}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {item.journeyType}
                </TableCell>
                <TableCell style={{ color: "white" }}>{item.status}</TableCell>
                <TableCell style={{ color: "white" }}>
                  {item.searchType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default Searchtable;
