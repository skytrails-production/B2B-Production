import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import userApi from "../../../../../Redux/API/api";
import axios from "axios";
import { apiURL } from "../../../../../Constants/constant";
const FixedDeparture = () => {
  const [sector, setSector] = useState("");
  // upload file

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

  const addSector=()=>{
    const payload = {
      Sector: sector,
    };
   userApi.fixedDepartureAddSector(payload)
   setSector("")
  }
  return (
    <>
     
     <Grid container direction="column" justifyContent="center" alignItems="center" height="100vh" spacing={2}>
      <Grid item>
        <Typography variant="h3" component="h2" mb="10px">
          Add Sector Below
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Sector"
              variant="outlined"
              value={sector}
              onChange={(e) => { setSector(e.target.value) }}
              fullWidth
              sx={{padding:"5px"}}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={addSector}>Add</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h3" mb="10px">
          Add CSV Fix Departure File Below
        </Typography>
        <form onSubmit={handleSubmitFile}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <Button variant="contained" type="submit">Upload</Button>
        </form>
      </Grid>
    </Grid>
         
      
    </>
  );
};

export default FixedDeparture;
