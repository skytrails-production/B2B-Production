import React, { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { apiURL } from "../../Constants/constant";
import UploadFileIcon from '@mui/icons-material/UploadFile';
const Citypackage = () => {
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false); 
  const [display,setDisplay]=useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    //validation
    if (!cityName || !description || !file) {
      setDisplay("Please fill out all required fields.")
      return;
    }
    setSubmitting(true); // Set submitting to true when form submission starts
    try {
      const formData = new FormData();
      formData.append('cityName', cityName);
      formData.append('description', description);
      formData.append('file', file);

      const response = await axios.post(`${apiURL.baseURL}/skyTrails/package/packageCityData`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCityName('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setSubmitting(false); 
      setDisplay('');
      // Reset file input value
    document.getElementById('fileInput').value = '';
    }
  };

  return (
    <div className="subada-table-container" style={{ position: 'relative', width: '100%' }}>
      {submitting && (
        <div className="loader-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5)', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5">Uploading...</Typography>
        </div>
      )}
      <div className="adsearch-bar" id="adssearch" style={{ position: "absolute", top: 10, zIndex: 3, fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" className="adtable-heading">
          Upload City Package
        </Typography>
      </div>
     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City Name"
          value={cityName}
          onChange={(e) => {setCityName(e.target.value); setDisplay('');}}

        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {setDescription(e.target.value);   setDisplay('');}}
        />
        <input type="file"
         id="fileInput"
          accept=".jpeg,.jpg,.png"
          onChange={(e) => {setFile(e.target.files[0]);   setDisplay('');}} />
        <button type="submit" style={{
              backgroundColor: 'aqua',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '10px',
              width: '250px',
              marginLeft: '35%'
          }}>Submit</button>'
      </form>
      {display && (
        <Typography variant="body1" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          {display}
        </Typography>
      )}
    </div>
  );
};

export default Citypackage;

  