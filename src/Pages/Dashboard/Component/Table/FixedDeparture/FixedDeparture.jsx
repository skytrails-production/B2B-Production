import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import userApi from "../../../../../Redux/API/api";
import axios from "axios";
import { apiURL } from "../../../../../Constants/constant";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FixedDeparture = () => {
  const [sector, setSector] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${apiURL.baseURL}/upload/fixDepartureData`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // File uploaded successfully
      // Add any necessary actions after successful upload
    } catch (error) {
      // Handle errors if file upload fails
      console.error('Error uploading file:', error);
    }
  };

  const addSector = () => {
    const payload = {
      Sector: sector,
    };
    userApi.fixedDepartureAddSector(payload);
    setSector("");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "10%" }}>
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" component="h2" mb="20px" sx={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", color: "#1976D2", textTransform: "uppercase", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", }}>
          Fixed Departure
        </Typography>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <TextField
            variant="outlined"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            fullWidth
            placeholder="Enter sector..."
          />
          <Button variant="contained" onClick={addSector} endIcon={<AddIcon />} sx={{ marginLeft: "10px" }}>
            Add
          </Button>
        </Box>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <label htmlFor="fileInput" style={{ flex: "1" }}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "100%" }}
            >
              Upload CSV
            </Button>
          </label>
          <Button variant="contained" type="submit" sx={{ marginLeft: "10px" }}>
            Upload
          </Button>
        </Box>

      </Paper>
    </Container>
  );
};

export default FixedDeparture;
