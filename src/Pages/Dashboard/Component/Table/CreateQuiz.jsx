import React ,{useState}from 'react';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, TextField, Button,Typography,gutterBottom } from "@mui/material";
function CreateQuiz() {
    const [load,setLoad]=useState(false);
    const[question,setQuestion]=useState("");
    const[answer,setAnswer]=useState("");
    const [opt1,setOpt1]=useState("");
    const [opt2,setOpt2]=useState("");
    const [opt3,setOpt3]=useState("");
    const [opt4,setOpt4]=useState("");
    const[message,setMessage]=useState("");
    const navigate=useNavigate();
    const payload={
      question:question,
      answer:answer,
      opt1:opt1,
      opt2:opt2,
      opt3:opt3,
      opt4:opt4,
  }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoad(true);                

        try{
            const response=await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/createDailyQuiz`,
              payload  
            );
                setMessage(" Quiz Added successfully!");
                setTimeout(() => {
                  navigate("/admin/dashboard");
                }, 4000);
              
            } catch (error) {
                console.error("API Error:", error.response);
                setMessage("Failed to add Quiz!");
              } finally {
                setLoad(false);
              }
    };
  return (
    <>
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
      <strong>QUIZ</strong>
    </h3>
    <form onSubmit={handleSubmit}>
      {/* I added div so that if need to display data horizontally,you can */}
      <div className='quizzzzz'>
      <div>
        <TextField
          label="question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
          padding="25px"
        />
        </div>
        <div>
        <TextField
          label="answer"
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          fullWidth
          margin="normal"
        /></div><div>
          <TextField
          label="opt1"
          variant="outlined"
          value={opt1}
          onChange={(e) => setOpt1(e.target.value)}
          fullWidth
          margin="normal"
        /></div><div>
          <TextField
          label="opt2"
          variant="outlined"
          value={opt2}
          onChange={(e) => setOpt2(e.target.value)}
          fullWidth
          margin="normal"
        /></div><div>
          <TextField
          label="opt3"
          variant="outlined"
          value={opt3}
          onChange={(e) => setOpt3(e.target.value)}
          fullWidth
          margin="normal"
        /></div><div>
          <TextField
          label="opt4"
          variant="outlined"
          value={opt4}
          onChange={(e) => setOpt4(e.target.value)}
          fullWidth
          margin="normal"
        /></div>
        </div>
        <Button className="button1" type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
  </div>
  </>
  )
}
export default CreateQuiz