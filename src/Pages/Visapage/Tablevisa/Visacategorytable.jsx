import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const Visacategorytable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/skyTrails/api/visa/getVisaCategory"
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

  return (
    <div>
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>Visa Category Table</h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>Visa Type</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{color:"white"}}>{item.visaType}</TableCell>
                <TableCell style={{color:"white"}}>{item.categoryName}</TableCell>
                <TableCell style={{color:"white"}}>{item.description}</TableCell>
                <TableCell style={{color:"white"}}>{item.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Visacategorytable;
