import React, { useState } from 'react';
import './AddSubadmin.css';
import { Select, MenuItem } from '@mui/material';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaPlus } from 'react-icons/fa';

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
    dynamicProperties: '',
    authType: ''
  });

  const [input, setInput] = useState('');
  const [chipData, setChipData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddChip = () => {
    if (input.trim() !== "") {
      const nextTaskNumber = Object.keys(chipData).length + 1;
      setChipData((chips) => ({ ...chips, [`task${nextTaskNumber}`]: input }));
      setInput("");
    }
  };


  const handleRemoveChip = (chipKey) => {
    const { [chipKey]: removedChip, ...remainingChips } = chipData;
    setChipData(remainingChips);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert dynamicProperties array to object


    // Convert dynamicProperties object to string
    // const dynamicPropertiesString = JSON.stringify(chipData);

    // console.log(dynamicPropertiesString,"formattedDynamicProperties")
    const dynamicPropertiesString = JSON.stringify(chipData);

    const requestData = {
      ...formData,
      // dynamicProperties: dynamicPropertiesString,
      dynamicProperties: chipData
    };

    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/subAdmin/createSubAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Handle response
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


      

        {/* <div className="form-group">
          <label htmlFor="dynamicProperties" className="form-label-subAdmin">
            Dynamic Properties:
          </label>
          <input
            type="text"
            id="dynamicProperties"
            name="dynamicProperties"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-input"
          />
          <button type="button" onClick={handleAddChip}>Add</button>
          {Object.entries(chipData).map(([key, value]) => (
            <div key={key}>
              <span>{value}</span>
              <button onClick={() => handleRemoveChip(key)}>Remove</button>
            </div>
          ))}
        </div> */}

        <div className="form-group" style={{marginLeft:"-35px"}}>
        <label htmlFor="mobile_number" className="form-label-subAdmin" style={{marginLeft:"50px"}}>
            Properties:
          </label>
          <div className="dynamic-properties-container">
            <div className="chip-container">
              {Object.entries(chipData).map(([key, value]) => (
                <div key={key} className="chip" >
                  <span>{value}</span>
                  <button onClick={() => handleRemoveChip(key)} style={{padding:"2px 2px"}}>
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <div className="chip-input-container">
              <input
                type="text"
                id="dynamicProperties"
                name="dynamicProperties"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input"
                placeholder="Add dynamic property..."
                style={{width:"100%"}}
              />
              <button type="button" onClick={handleAddChip} className="add-button-plus" >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>



        <div className="form-group" style={{ width: "95%" }}>
          <label htmlFor="authType" className="form-label-subAdmin">
            Auth Type:
          </label>
          <Select
            id="authType"
            name="authType"
            value={formData.authType}
            onChange={handleChange}
            style={{ width: "100%", height: "10%", padding: "-100px 10px" }}
          >
            {authArray.map((authType) => (
              <MenuItem key={authType} value={authType}>{authType}</MenuItem>
            ))}
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