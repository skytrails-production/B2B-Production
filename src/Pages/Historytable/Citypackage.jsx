import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { apiURL } from "../../Constants/constant";

const Citypackage = () => {
  const [cityName, setCityName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [display, setDisplay] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //validation
    if (!cityName || !description || !file) {
      setDisplay("Please fill out all required fields.");
      return;
    }
    setSubmitting(true); // Set submitting to true when form submission starts
    try {
      const formData = new FormData();
      formData.append("cityName", cityName);
      formData.append("description", description);
      formData.append("file", file);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/package/packageCityData`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCityName("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setSubmitting(false);
      setDisplay("");
      // Reset file input value
      document.getElementById("fileInput").value = "";
    }
  };

  return (
    <Box
      mt={8}
      p={3}
      width="100%"
      maxWidth="500px"
      mx="auto"
      component={Paper}
      elevation={3}
      borderRadius={5}
    >
      <Typography variant="h4" gutterBottom align="center">
        Upload City Package
      </Typography>
      {submitting && (
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <CircularProgress />
          <Typography variant="h6" ml={2}>
            Uploading...
          </Typography>
        </Box>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="City Name"
          variant="outlined"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
            setDisplay("");
          }}
          fullWidth
          margin="normal"
          sx={{
            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
              height: "2.4375em",
            },
          }}
        />

        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setDisplay("");
          }}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Box display="flex" alignItems="center" width="100%" mb={2}>
          <label htmlFor="fileInput">
            <IconButton component="span">
              <CloudUpload />
            </IconButton>
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".jpeg,.jpg,.png"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setDisplay("");
            }}
            style={{ display: "none" }}
          />
          <Typography variant="body1" ml={1}>
            {file ? file.name : "Choose file"}
          </Typography>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      {display && (
        <Typography variant="body1" color="error" align="center" mt={2}>
          {display}
        </Typography>
      )}
    </Box>
  );
};

export default Citypackage;
