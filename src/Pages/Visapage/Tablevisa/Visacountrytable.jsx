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


const Visacategorytable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/getAllVisaCountry`
      );
      const result = response.data.result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
    return (
      <div style={{marginTop:"64px"}}>
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>Visa Country</h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table" style={{marginTop:"0px",marginBottom:"0px"}}>
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>Country Name</TableCell>
              <TableCell>Days To Process</TableCell>
              <TableCell>Gallery</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Issued Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Visa Type</TableCell>
              <TableCell>Required Document Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((visaCountry) => (
    <TableRow key={visaCountry._id}>
      <TableCell style={{ color: "white" }}>{visaCountry.countryName}</TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.daysToProcess}</TableCell>
      <TableCell>
        {visaCountry.gallery.length > 0 && (
          <img src={visaCountry.gallery[0]} alt={visaCountry.countryName} style={{ width: "50px", height: "50px" }} />
        )}
      </TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.status}</TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.issuedType}</TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.createdAt}</TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.requireDocumentId?.visaType}</TableCell>
      <TableCell style={{ color: "white" }}>{visaCountry.requireDocumentId?.requiredDocCategory.join(", ")}</TableCell>
    </TableRow>
  ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Visacategorytable;
