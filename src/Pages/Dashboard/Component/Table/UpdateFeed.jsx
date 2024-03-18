import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Button,Typography,gutterBottom } from "@mui/material";
import './AddCoupons.css';
import './UpdateFeed.css';

const UpdateFeed = () => {
  const [load, setLoad] = useState(false);
  const [iosVersion, setIOSVersion] = useState("");
  const [androidVersion, setAndroidVersion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createAppVersion`,
        {
          iosVersion: iosVersion,
          androidVersion: androidVersion,
        }
      );
      setTimeout(()=>{
        navigate('/admin/dashboard')
      },3000);
      // Add any additional handling based on the response if needed
    } catch (error) {
      console.error("API Error:", error.response);
    } finally {
      setLoad(false);
    }
  };
//http://localhost:3000/admin/updateFeed
  return (
    <div className="updateFeed-div" style={{marginTop:'50px',border:'2px solid white',padding :'80px' ,backgroundColor:'rgb(255,255,255,0.8)' ,borderRadius:'10%',boxShadow:'8px 5px 8px 5px darkgray'}}>
      {/* <Typography variant ="h6" gutterBottom>Update Version</Typography> */}
      <h3 style={{ textAlign: "center" }} className="addCoupon-heading">
        <strong>Update Version</strong>
      </h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="iOS Version"
          variant="outlined"
          value={iosVersion}
          onChange={(e) => setIOSVersion(e.target.value)}
          fullWidth
          margin="normal"
          padding="25px"
        />
        <TextField
          label="Android Version"
          variant="outlined"
          value={androidVersion}
          onChange={(e) => setAndroidVersion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button className="button1" type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {load && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress
            color="primary"
            size={50}
            thickness={3}
            style={{
              position: "absolute",
              top: "50%",
              left: "49.8%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateFeed;
