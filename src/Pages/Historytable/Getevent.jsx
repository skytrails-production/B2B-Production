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

function Getevent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/getAllEvents?page=${pageNumber}`
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
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>All Events </h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table" style={{marginTop:"0px"}}>
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Slot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((event) => (
          <TableRow key={event._id}>
            <TableCell style={{color:"white"}}>
              <img src={event.image} alt="Event" style={{ width: "50px", height: "50px" }} />
            </TableCell>
            <TableCell style={{color:"white"}}>{event.title}</TableCell>
            <TableCell style={{color:"white"}}>{event.content}</TableCell>
            <TableCell style={{color:"white"}}>{new Date(event.startDate).toLocaleDateString()}</TableCell>
            <TableCell style={{color:"white"}}>{new Date(event.endDate).toLocaleDateString()}</TableCell>
            <TableCell style={{color:"white"}}>{event.location.coordinates.join(', ')}</TableCell>
            <TableCell style={{color:"white"}}>{event.slot.length}</TableCell>
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

export default Getevent;
