import React,{useEffect, useState} from 'react';
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

function Package() {
    const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/getAllPackageEnquiry?page=${pageNumber}`
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
    <h4 style={{ textAlign: "center", fontSize: "30px" }}>All Package Enquiry</h4>
    <TableContainer component={Paper} style={{marginTop:"0px"}}>
      <Table aria-label="customized table" style={{marginTop:"0px",marginBottom:"0px"}}>
        <TableHead style={{ background: "#16113A" }}>
          <TableRow>
        
          <TableCell>User Id</TableCell>
          <TableCell>Full Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Departure City</TableCell>
            <TableCell>Adults</TableCell>
            <TableCell>Child</TableCell>
            <TableCell>Package Type</TableCell>
            <TableCell>Departure Date</TableCell>
            <TableCell>Connected</TableCell>
            <TableCell>No Of People</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {data.map((packageItem) => (
    <TableRow key={packageItem._id}>
      
      <TableCell style={{color:"white"}}>{packageItem.userId}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.fullName}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.contactNumber.phone}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.email}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.departureCity}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.adults}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.child}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.packageType}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.departureDate}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.connected ? "Yes" : "No"}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.noOfPeople}</TableCell>
      <TableCell style={{color:"white"}}>{packageItem.status}</TableCell>
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
    
  )
}

export default Package