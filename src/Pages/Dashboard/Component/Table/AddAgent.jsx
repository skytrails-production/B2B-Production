// CreateSubAdminPage.js
import React, { useState } from 'react';
import './AddAgent.css'; // Import the CSS file
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import profilePicUrl from '../../../../Images/logo.jpeg'

const CreateAgentPage = () => {
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
console.log("============",e)
    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/agent/createAgent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Agent created successfully:', data);
        alert('Agent created successfully!');
        navigate('/admin/dashboard');
      } else{
        if(response.status === 409){
          alert('Agent with this username or email already exists!');
          console.error('SubAdmin already exist:.', response.statusText);
        }else {
          alert('Failed to create subadmin:!');
        console.error('Failed to create subadmin:', response.statusText);
      }
      }
    } catch (error) {
      console.error('Error creating subadmin:', error.message);
    }
  };

  return (
    <div className="form-container-agent">
      <form className="form-agent" onSubmit={handleSubmit}>
    <img  src={profilePicUrl} height={50}  alt='logo' className="agent-image"/>
      <h1 className="form-title-agent"><strong>Create Agent</strong></h1>
        <div className="form-group-agent">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input-agent"
          />
        </div>

        <div className="form-group-agent">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input-agent"
          />
        </div>

        <div className="form-group-agent">
          <label htmlFor="password" className="form-label">
           Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input-agent"
          />
        </div>

        <div className="form-group-agent">
          <label htmlFor="mobile_number" className="form-label">
            Mobile Number:
          </label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="form-input-agent"
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
