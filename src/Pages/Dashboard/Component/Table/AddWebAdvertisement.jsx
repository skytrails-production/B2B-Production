import React, { useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import "./AddAdvertisement.css";
import { CircularProgress } from '@mui/material';
const CreateWebAdvertisementForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    remainingDays: '',
    addType:'',
    images: '',
  });
   const[load,setLoad]=useState(false);
   const[message,setMessage]=useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
      remainingDays: calculateRemainingDays(formValues.startDate, formValues.endDate)
    });
  };

  const handleFileChange = (e) => {
    // console.log("e==============>>>>", e)
    const file = e.target.files[0];
  // console.log("file", file)
    setFormValues({
      ...formValues,
      images: file,
    });
  };

  const calculateRemainingDays = (startDate, endDate) => {
    // Calculate the remaining days here
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end.getTime() - start.getTime();

    // Calculate the remaining days using Math.floor
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference >= 0 ? daysDifference : 0;
    }
    return '';
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoad(true);
    try {
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('content', formValues.content);
      formData.append('startDate', formValues.startDate);
      formData.append('endDate', formValues.endDate);
      formData.append('remainingDays', formValues.remainingDays);
      formData.append('addType', formValues.addType);
      formData.append('images', formValues.images);
  
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createWebAdvertisment`,
        formData,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        // console.log('Advertisement created successfully:', response.data);
        //alert('Advertisement created successfully!');
        setMessage('Advertisement created successfully');
        setTimeout(()=>{
          navigate('/admin/dashboard'); 
        },5000);
  // Redirect to admin dashboard
      } else {
       // alert('Failed to create Advertisement!');
       setMessage('Failed to create Advertisement');
        console.error('Failed to create Advertisement:', response.statusText);
      }
      // console.log('API Response:', response.data);
      // Handle success or further actions as needed
    } catch (error) {
      console.error('API Error:', error.response.data);
      // Handle error or show error message
    }
    finally{
      setLoad(false);
    }
  };
  
  return (
    <div className="form-containers">
           {load && (
                <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
                     <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
                </div>
            )}
              {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginBottom: '30px', borderRadius: '5px' }}>{message}</div>}
     <header className="sectionagent headersagent">
        <div className="headead">
          {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
          <h2>Create WebAdvertisement</h2>
        </div>
      </header>
    <form onSubmit={handleSubmit} className="advertisement-form">
      <label className="form-label">
        Title:
        <input type="text" name="title" value={formValues.title} onChange={handleInputChange} className="form-input-ads" />
      </label>

      <label className="form-label">
        Content:
        <textarea type="text" name="content" value={formValues.content} onChange={handleInputChange} className="form-textarea" />
      </label>

      <label className="form-label">
        Start Date:
        <input type="date" name="startDate" value={formValues.startDate} onChange={handleInputChange} className="form-input-ads" />
      </label>

      <label className="form-label">
        End Date:
        <input type="date" name="endDate" value={formValues.endDate} onChange={handleInputChange} className="form-input-ads" />
      </label>

      <label className="form-label">
          Remaining Days:
          <input
            type="number" // Change to number input
            name="remainingDays"
            value={formValues.remainingDays}
            onChange={handleInputChange}
            className="form-input-ads"
            readOnly // make it read-only to prevent direct user input
          />
        </label>
        <label className="form-label">
        Banner Type:
        <input type="text" name="addType" value={formValues.addType} onChange={handleInputChange} className="form-input-ads" />
        <label>[FLIGHTS, HOTELS, HOLIDAYS, TRAINS, CABS, BANKOFFERS, BUS]</label>
      </label>
      <label className="form-label-image">
        Image:
        <input type="file" accept="image/*" onChange={handleFileChange} className="form-input-image-ads" />
      </label>
      <button type="submit" className="form-button">Submit</button>
    </form>
    </div>
    
  );
};

export default CreateWebAdvertisementForm;
