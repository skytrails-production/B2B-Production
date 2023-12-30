import React, { useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import profilePicUrl from '../../../../Images/logo.jpeg';
import "./AddAdvertisement.css";
const CreateAdvertisementForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    remainingDays: '',
    images: '',
  });

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
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference >= 0 ? daysDifference : 0;
    }
    return '';
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('content', formValues.content);
      formData.append('startDate', formValues.startDate);
      formData.append('endDate', formValues.endDate);
      formData.append('remainingDays', formValues.remainingDays);
      formData.append('images', formValues.images);
  
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createadvertisment`,
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
        alert('Advertisement created successfully!');
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        alert('Failed to create Advertisement!');
        console.error('Failed to create Advertisement:', response.statusText);
      }
      // console.log('API Response:', response.data);
      // Handle success or further actions as needed
    } catch (error) {
      console.error('API Error:', error.response.data);
      // Handle error or show error message
    }
  };
  
  return (
    <div className='advertisement-div'>
    <div className='web-heading'><h1><strong>Add Advertisemnet</strong></h1></div>
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

      <label className="form-label-image">
        Image:
        <input type="file" accept="image/*" onChange={handleFileChange} className="form-input-image-ads" />
      </label>
      <button type="submit" className="form-button">Submit</button>
    </form>
    </div>
    
  );
};

export default CreateAdvertisementForm;
