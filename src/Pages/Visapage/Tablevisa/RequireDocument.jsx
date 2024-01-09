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

function RequireDocument() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/visa/document/getRequireDocument`
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
    <div style={{ marginTop: "64px" }}>
      <h4 style={{ textAlign: "center", fontSize: "30px" }}>
        Required Document 
      </h4>

      <TableContainer component={Paper}>
        <Table aria-label="customized table" style={{marginTop:"0px",marginBottom:"0px"}}>
          <TableHead style={{ background: "#16113A" }}>
            <TableRow>
              <TableCell>Required Document Category</TableCell>
              <TableCell>Visa Type</TableCell>
              <TableCell>visa Country</TableCell>
              <TableCell>visa Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{ color: "white" }}>
                  {item.requiredDocCategory
                    ? item.requiredDocCategory.join(" , ")
                    : ""}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {item.visaType}
                </TableCell>

                <TableCell style={{ color: "white" }}>
                {item.visaCountry
                    ? item.visaCountry.countryName
                    : ""}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                {item.visaCategory
                    ? item.visaCategory.categoryName
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RequireDocument;
