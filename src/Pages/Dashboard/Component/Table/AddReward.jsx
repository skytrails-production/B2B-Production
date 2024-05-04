import React, { useEffect, useState } from "react";
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Button,Typography,gutterBottom } from "@mui/material";
import axios from 'axios';
const AddReward = () => {
  const [load, setLoad] = useState(false);
  const [referreamount, setReferreAmount ]= useState("");
  const [referre,setReferre]=useState([]);
  const[referrer,setReferrer]=useState([]);
  const [referrerAmount, setReferrerAmount] = useState("");
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
  const[coinQuantity,setCoinQuantity]=useState("");
  const [quant,setQuant]=useState([]);
  const[coin,setCoin] =useState([]);
  const[like,setLike]=useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    handleDisplay(); 
  }, []);
  const handleDisplay= async(e)=>{
    try{
   const record=await axios.get(`${apiURL.baseURL}/skyTrails/api/admin/reward/getReward`);
   //console.log("record===========================",record);
   setReferre(record.data.result.refereeAmount);
   setReferrer(record.data.result. referrerAmount);
   setCoin(record.data.result.coinValue);
   setLike(record.data.result.likeCoins);
   setFlight(record.data.result.flightBookingCoin);
   setBus(record.data.result.busBookingCoin);
   setHotel(record.data.result.hotelBookingCoin);
   setPack(record.data.result.packageBookingCoin);
   setQuant(record.data.result.coinQuantity);
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
          refereeAmount: referreamount,
          referrerAmount: referrerAmount,
          coinValue:coinValue,
          likeCoins:likeCoins,
          flightBookingCoin:flightBookingCoin,
          hotelBookingCoin:hotelBookingCoin,
          busBookingCoin:busBookingCoin,
          packageBookingCoin:packageBookingCoin,
          coinQuantity:coinQuantity,
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
    <div className="updateFeed-div" style={{marginTop:'50px',border:'2px solid rgb(255,255,255,0.8)',padding :'80px' ,paddingBottom:'0px',backgroundColor:'rgb(255,255,255,0.8)' ,borderRadius:'2%',overflowX:'scroll',overflowY:'scroll',marginBottom:'10%'}}>
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
      <div className="sta_curr" style={{display:'grid',
           gridTemplateColumns: 'repeat(2, 1fr)',
           gap:'20px',
           justifyContent:'center',
    }}>
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current total Coin Value: {coin}
      </Typography>
  
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current total Coin Likes: {like}
      </Typography>

      <Typography variant="body1" gutterBottom style={{ textAlign: "center",
      backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',
    
    }}>
        Current Referee Amount: {referre}
      </Typography>

      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Referrer Amount: {referrer}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Flight Booking Coins: {flight}
      </Typography>
      
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Hotel Booking Coin: {hotel}
      </Typography>
      
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
    
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Bus Booking Coin: {bus}
      </Typography>
      
      
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',}}>
        Current Package  Coin: {pack}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ textAlign: "center" ,backgroundColor:'#090962de',
      
      padding:'10px',
      color:'white',
      fontSize:'larger',
      fontWeight:'700',
      margin:'10px',
      height:'70%'}}>
        Current Quantity of Coin: {quant}
      </Typography>
      <TextField
      label="Coin Quantity"
      variant="outlined"
      value={coinQuantity}
      onChange={(e) => setCoinQuantity(e.target.value)}
      fullWidth
      margin="normal"
    />
    
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextField
      label="Referee Amount"
      variant="outlined"
      value={referreamount}
      onChange={(e) => setReferreAmount(e.target.value)}
      fullWidth
      margin="normal"
      style={{ marginRight: '10px' }}
    />
    <TextField
      label="Referrer Amount"
      variant="outlined"
      value={referrerAmount}
      onChange={(e) => setReferrerAmount(e.target.value)}
      fullWidth
      margin="normal"
    />
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextField
      label="Coin Value"
      variant="outlined"
      value={coinValue}
      onChange={(e) => setCoinValue(e.target.value)}
      fullWidth
      margin="normal"
      style={{ marginRight: '10px' }}
    />
    <TextField
      label="Like Coins"
      variant="outlined"
      value={likeCoins}
      onChange={(e) => setLikeCoins(e.target.value)}
      fullWidth
      margin="normal"
    />
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextField
      label="Flight Booking Coin"
      variant="outlined"
      value={flightBookingCoin}
      onChange={(e) => setFlightBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
      style={{ marginRight: '10px' }}
    />
    <TextField
      label="Hotel Booking Coin"
      variant="outlined"
      value={hotelBookingCoin}
      onChange={(e) => setHotelBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
    />
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextField
      label="Bus Booking Coin"
      variant="outlined"
      value={busBookingCoin}
      onChange={(e) => setBusBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
      style={{ marginRight: '10px' }}
    />
    <TextField
      label="Package Booking Coin"
      variant="outlined"
      value={packageBookingCoin}
      onChange={(e) => setPackageBookingCoin(e.target.value)}
      fullWidth
      margin="normal"
    />
  </div>
  <button className="button1" type="submit"  style={{ marginTop: '10px' ,marginLeft:'auto',marginRight:'auto',width:'40%'}}>
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

export default AddReward;