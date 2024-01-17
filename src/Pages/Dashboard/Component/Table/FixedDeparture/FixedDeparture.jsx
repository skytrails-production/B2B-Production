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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" component="h2" mb="20px">
          Add Sector
        </Typography>
        <TextField
          label="Sector"
          variant="outlined"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          fullWidth
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" onClick={addSector} endIcon={<AddIcon />}>
          Add
        </Button>

        <Typography variant="h5" component="h3" mt="30px" mb="20px">
          Add CSV Fix Departure File
        </Typography>
        <form onSubmit={handleSubmitFile} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <IconButton color="primary" aria-label="upload file" component="span">
              <CloudUploadIcon />
            </IconButton>
          </label>
          <Typography variant="body2" color="textSecondary" mt="10px">
            Select a CSV file
          </Typography>
          <Button variant="contained" type="submit" sx={{ marginTop: "20px" }}>
            Upload
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FixedDeparture;
