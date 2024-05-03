import React, { useEffect, useState } from "react";
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Button,Typography,gutterBottom } from "@mui/material";
import axios from 'axios';
const AddReward = () => {
  const [load, setLoad] = useState(false);
  const [iosVersions, setIOSVersions] = useState("");
  const [io,setIo]=useState([]);
  const[andr,setAndr]=useState([]);
  const [androidVersions, setAndroidVersions] = useState("");
  const [message, setMessage] = useState("");
  const [coinValue,setCoinValue]=useState("");
  const [likeCoins,setLikeCoins]=useState("");
  const [hotelBookingCoin,setHotelBookingCoin]=useState("");
  const [flightBookingCoin,setFlightBookingCoin]=useState("");
  const [busBookingCoin,setBusBookingCoin]=useState("");
  const [packageBookingCoin,setPackageBookingCoin]=useState("");
  const [flight,setFlight]=useState([]);
  const[hotel,setHotel]=useState([]);
  const[bus,setBus]=useState([]);
  const[pack,setPack]=useState([]);

  const[co,setCo] =useState([]);
  const[li,setLi]=useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    handleDisplay(); 
  }, []);
  const handleDisplay= async(e)=>{
    try{
   const record=await axios.get(`${apiURL.baseURL}/skyTrails/api/admin/reward/getReward`);
   //console.log("record===========================",record);
   setIo(record.data.result.refereeAmount);
   setAndr(record.data.result. referrerAmount);
   setCo(record.data.result.coinValue);
   setLi(record.data.result.likeCoins);
   setFlight(record.data.result.flightBookingCoin);
   setBus(record.data.result.busBookingCoin);
   setHotel(record.data.result.hotelBookingCoin);
   setPack(record.data.result.packageBookingCoin);
    }
    catch(err){
      console.error("error",err);
    }
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/refferral/createReferralAmount`,
        {
          refereeAmount: iosVersions,
          referrerAmount: androidVersions,
          coinValue:coinValue,
          likeCoins:likeCoins,
          flightBookingCoin:flightBookingCoin,
          hotelBookingCoin:hotelBookingCoin,
          busBookingCoin:busBookingCoin,
          packageBookingCoin:packageBookingCoin,
        }
      );
      
      if (response.status >= 200 && response.status < 300) {
  
        setMessage(" Reward Added successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 4000);
      } else {
        
        setMessage("Failed to add reward!");
      }
      // Add any additional handling based on the response if needed
    } catch (error) {
      console.error("API Error:", error.response);
    } finally {
      setLoad(false);
    }
  };
  return (
    <div className="updateFeed-div" style={{marginTop:'50px',border:'2px solid white',padding :'80px' ,backgroundColor:'rgb(255,255,255,0.8)' ,borderRadius:'10%',boxShadow:'8px 5px 8px 5px darkgray'}}>
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
        <strong>Reward</strong>
      </h3>
      <div className="updio">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center",
      backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',
    
    }}>
        Current Referee Amount: {io}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Referrer Amount: {andr}
      </Typography>
      </div>
      {/* for coins */}
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Coin Value: {co}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Coin Likes: {li}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Flight Booking Coins: {flight}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Hotel Booking Coin: {hotel}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Bus Booking Coin: {bus}
      </Typography>
      </div>
      <div className="updandr">
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      borderRadius:'20px',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Package Booking Coin: {pack}
      </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Referee Amount"
          variant="outlined"
          value={iosVersions}
          onChange={(e) => setIOSVersions(e.target.value)}
          fullWidth
          margin="normal"
          padding="25px"
        />
        <TextField
          label="Referrer Amount"
          variant="outlined"
          value={androidVersions}
          onChange={(e) => setAndroidVersions(e.target.value)}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Coin Value"
          variant="outlined"
          value={coinValue}
          onChange={(e) => setCoinValue(e.target.value)}
          fullWidth
          margin="normal"
        />
          <TextField
          label="Like Coins"
          variant="outlined"
          value={likeCoins}
          onChange={(e) => setLikeCoins(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
        label="flight booking coin"
        variant="outlined"
        value={flightBookingCoin}
        onChange={(e)=>setFlightBookingCoin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
      label="hotel booking coin"
      variant="outlined"
      value={hotelBookingCoin}
      onChange={(e)=>setHotelBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
      />
      <TextField
      label="bus boking coin"
      variant="outlined"
      value={busBookingCoin}
      onChange={(e)=>setBusBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
      
      />
      <TextField
      label="package booking coin"
      variant="outlined"
      value={packageBookingCoin}
      onChange={(e)=>setPackageBookingCoin(e.target.value)}
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

export default AddReward;