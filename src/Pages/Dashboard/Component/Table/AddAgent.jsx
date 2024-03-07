// CreateSubAdminPage.js
import React, { useState } from 'react';
import './AddSubadmin.css';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import profilePicUrl from '../../../../Images/whitelogo1.png';
import { CircularProgress } from '@mui/material';
const CreateAgentPage = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    mobile_number: '',
    panNumber: '',
    agency_name:''
  });
const[load,setLoad]=useState(false);
const[message,setMessage]=useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoad(true);
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
       // alert('Agent created successfully!');
        setMessage(`Agent ${formData.firstName}created successfully!`);
        setTimeout(()=>{
          navigate('/admin/dashboard');
        },5000)
       
      } else {
        if (response.status === 409) {
         // alert('Agent with this username or email already exists!');
          setMessage(`Agent ${formData.firstName} already created`)
          console.error('agent already exists:', response.statusText);
        } else {
         // alert('Failed to create agent!');
          setMessage("Error occured retry");
          console.error('Failed to create agent:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error creating agent:', error.message);
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
          <h2>Create Agent</h2>
        </div>
      </header>
      <form className="form-agent" onSubmit={handleSubmit}>
       
      <div className="form-group-agent">
      <label htmlFor="mobile_number" className="form-label-subAdmin">
        First Name:
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="form-input"
      />
    </div>
    <div className="form-group-agent">
          <label htmlFor="mobile_number" className="form-label-subAdmin">
          Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
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
          <button type="submit" className="form-button-agents">
            Create Agent
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgentPage;
