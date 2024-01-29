import React, { useState } from 'react';
import './AddSubadmin.css';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';

import profilePicUrl from '../../../../Images/logo.jpeg';
import './AddAgent.css';

// Define or import authArray
const authArray = [
  'ADS_HANDLER',
  'PACKAGE_HANDLER',
  'REQUEST_HANDLER',
  'BOOKING_MANAGER',
  'CUSTOMER_SUPPORT',
  'CONTENT_MANAGER',
  'FINANCIAL_SUBADMIN',
  'USER_MANAGER',
  'MARKETING_PROMOTIONS',
  'ANALYTICS_SUBADMIN',
  'VISA_PROCESSING',
  'SECURITY_COMPLIANCE',
  'LOCALIZATION_TRANSLATION',
  'EVENT_HANDLER',
  'COUPON_CODE_HANDLER',
  'AGENT_MANAGER'
];


const CreateSubAdminPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile_number: '',
    dynamicProperties: {},
    authType: ''
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
        alert('Subadmin created successfully!');
        navigate('/admin/dashboard');
      } else {
        if (response.status === 409) {
          alert('Subadmin with this username or email already exists!');
          console.error('SubAdmin already exists:', response.statusText);
        } else {
          alert('Failed to create subadmin!');
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


        <div className="form-group">

          <label htmlFor="authType" className="form-label-subAdmin">
            Auth Type:
          </label>
          <select
            name="authType"
            value={formData.authType}
            onChange={handleChange}
            className="form-input-authType"
          >
            {authArray.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dynamicProperties" className="form-label-subAdmin">
            Dynamic Properties:
          </label>
          <input
            type="text"
            id="dynamicProperties"
            name="dynamicProperties"
            value={JSON.stringify(formData.dynamicProperties)} // Convert object to string
            onChange={handleChange}
            className="form-input"
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
