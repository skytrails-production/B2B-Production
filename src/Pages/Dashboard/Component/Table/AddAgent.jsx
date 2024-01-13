// CreateSubAdminPage.js
import React, { useState } from 'react';
import './AddSubadmin.css';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import profilePicUrl from '../../../../Images/logo.jpeg';

const CreateAgentPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile_number: '',
    panNumber: '',
    agency_name:''
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
      const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/createAgent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Agent created successfully:', data);
        alert('Agent created successfully!');
        navigate('/admin/dashboard');
      } else {
        if (response.status === 409) {
          alert('Agent with this username or email already exists!');
          console.error('agent already exists:', response.statusText);
        } else {
          alert('Failed to create agent!');
          console.error('Failed to create agent:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error creating agent:', error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-agent" onSubmit={handleSubmit}>
        <img src={profilePicUrl} height={50} alt="logo" className="agent-image image-div" />
        <h1 className="form-title">
          <strong>Create Agent</strong>
        </h1>

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

        <div className="form-group-agent">
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

        <div className="form-group-agent">
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

        <div className="form-group-agent">
          <label htmlFor="panNumber" className="form-label-subAdmin">
            PAN Number:
          </label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            Agency Name:
          </label>
          <input
            type="text"
            id="agency_name"
            name="agency_name"
            value={formData.agency_name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group-agent">
          <button type="submit" className="form-button-agent">
            Create Agent
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgentPage;
