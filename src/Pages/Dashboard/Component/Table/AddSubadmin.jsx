// CreateSubAdminPage.js
import React, { useState } from 'react';
import './AddSubadmin.css'; // Import the CSS file
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';

import { Select, MenuItem } from '@mui/material';
import profilePicUrl from '../../../../Images/logo.jpeg'
import "./AddAgent.css";
const CreateSubAdminPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile_number: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("============",e)
    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/subAdmin/createSubAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Subadmin created successfully:', data);
        alert('Subadmin created successfully!');
        navigate('/admin/dashboard');
      } else {
        if (response.status === 409) {
          alert('Subadmin with this username or email already exists!');
          console.error('SubAdmin already exist:.', response.statusText);
        } else {
          alert('Failed to create subadmin:!');
          console.error('Failed to create subadmin:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error creating subadmin:', error.message);
    }
  };

  return (
    <div className="form-containers">

      <header className="sectionagent headersagent">
        <div className="headead">
          {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
          <h2>Create Subadmin</h2>
        </div>
      </header>
      <form className="form-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label-subAdmin">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label-subAdmin">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label-subAdmin">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile_number" className="form-label-subAdmin">
            Mobile Number:
          </label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="authType" className="form-label-subAdmin">
            Auth Type:
          </label>
          <input
            type="text"
            id="authType" 
            name="authType"
            value={formData.authType}
            onChange={handleChange}
            className="form-input"
            placeholder='REQUEST_HANDLER,ADS_HANDLER,PACKAGE_HANDLER'
          />
        </div> */}
        <div className="form-group" style={{width:"95%"}}>
          <label htmlFor="authType" className="form-label-subAdmin">
            Auth Type:
          </label>
          <Select
            id="authType"
            name="authType"
            value={formData.authType}
            onChange={handleChange}
            style={{ width: "100%",height:"10%", padding: "-100px 10px" }}
          >
            <MenuItem value="ADS_HANDLER">ADS_HANDLER</MenuItem>
            <MenuItem value="PACKAGE_HANDLER">PACKAGE_HANDLER</MenuItem>
            <MenuItem value="REQUEST_HANDLER">REQUEST_HANDLER</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </div>
        <div className="form-group-sub">
          <button type="submit" className="form-button-sub">
            Create Subadmin
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubAdminPage;
