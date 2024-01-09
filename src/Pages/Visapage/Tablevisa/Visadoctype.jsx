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
import { apiURL } from "../../../Constants/constant";

function Visadoctype() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/visa/document/getDocType`
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
   
    <div  style={{marginTop:"64px"}}>
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>Visa Document Type</h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table" style={{marginTop:"0px",marginBottom:"0px"}}>
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>Document Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{color:"white"}}>{item.documentName}</TableCell>
                <TableCell style={{color:"white"}}>{item.description}</TableCell>
                <TableCell style={{color:"white"}}>{item.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Visadoctype