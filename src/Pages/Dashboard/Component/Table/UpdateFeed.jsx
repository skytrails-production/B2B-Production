import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Button,Typography,gutterBottom } from "@mui/material";
import './AddCoupons.css';
import './UpdateFeed.css';

const UpdateFeed = () => {
  const [load, setLoad] = useState(false);
  const [iosVersions, setIOSVersions] = useState("");
  const [io,setIo]=useState([]);
  const[andr,setAndr]=useState([]);
  const [androidVersions, setAndroidVersions] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    handleDisplay(); // Fetch version details when component mounts
  }, []);
  const handleDisplay= async(e)=>{
    try{
   const record=await axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getAppVersion`);
   //console.log("record===========================",record);

   if (record.status === 200) {
    const { iosVersion, androidVersion } = record.data.result;
    setIo(iosVersion);
    setAndr(androidVersion);
  }
    }
    catch(error){
     console.error(error)
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createAppVersion`,
        {
          iosVersion: iosVersions,
          androidVersion: androidVersions,
        }
      );
      if (response.status >= 200 && response.status < 300) {
  
        setMessage("Version Updated successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 4000);
      } else {
        
        setMessage("Failed to update Version!");
      }
      // Add any additional handling based on the response if needed
    } catch (error) {
      console.error("API Error:", error.response);
    } finally {
      setLoad(false);
    }
  };
//http://localhost:3000/admin/updateFeed
  return (
    <div className="updateFeed-div" style={{marginTop:'50px',border:'2px solid rgb(255,255,255,0.8)',padding :'80px' ,backgroundColor:'rgb(255,255,255,0.8)' ,borderRadius:'1%',overflowX:'scroll',overflowY:'scroll',boxShadow:'0px 0px 5px #767070'}}>
      {/* <Typography variant ="h6" gutterBottom>Update Version</Typography> */}
      {load && (
           <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
           <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
            </div>
          )} 
          {message && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginBottom: "30px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
      <h3 style={{ textAlign: "center" }} className="addCoupon-heading">
        <strong>Update Version</strong>
      </h3>
      <div className="updio">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center",
      backgroundColor:'rgb(16 18 71 / 87%)',
      borderRadius:'2%',
      padding:'10px',
      color:'white',
      fontSize:'medium',
      fontWeight:'600',
      margin:'10px',
    
    }}>
        Current iOS Version: {io}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'2%',
      padding:'10px',
      color:'white',
      fontSize:'medium',
      fontWeight:'600',
      margin:'10px',
      backgroundColor:'rgb(16 18 71 / 87%)'}}>
        Current Android Version: {andr}
      </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="iOS Version"
          variant="outlined"
          value={iosVersions}
          onChange={(e) => setIOSVersions(e.target.value)}
          fullWidth
          margin="normal"
          padding="25px"
        />
        <TextField
          label="Android Version"
          variant="outlined"
          value={androidVersions}
          onChange={(e) => setAndroidVersions(e.target.value)}
          fullWidth
          margin="normal"
        />
        <button className="button1" type="submit" >
          Submit
        </button>
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
