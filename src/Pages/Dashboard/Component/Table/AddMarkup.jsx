// CreateMarkup.js
import React, { useState } from 'react';
import './AddMarkup.css';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import profilePicUrl from '../../../../Images/logo.jpeg';

const CreateMarkup = ({ formId }) => {
  const [formData, setFormData] = useState({
    hotelMarkup: 0, // Assuming markup values are numeric
    flightMarkup: 0,
    busMarkup: 0,
    packageMarkup: 0,
  });
  const [error, setError] = useState('');

// console.log("formI=============",formId)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnyValueNotGreaterThanZero = Object.values(formData).some((value) => value <= 0);

    if (isAnyValueNotGreaterThanZero) {
      alert('All markup values must be greater than 0');
      return;
    }
    try {
      const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/createMarkup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Markup created successfully:', data);
        alert('Markup created successfully!');
        navigate('/admin/dashboard');
      } else {
        if (response.status === 409) {
          alert('Markup with this username or email already exists!');
          console.error('Markup already exists:', response.statusText);
        } else {
          alert('Failed to create markup!');
          console.error('Failed to create markup:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error creating markup:', error.message);
    }
  };

  return (
    <div className="form-containers">
       <header className="sectionagent headersagent">
        <div className="headead">
          {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
          <h2>Add Markup</h2>
        </div>
      </header>
      <form className={`markup-form ${formId}`} onSubmit={handleSubmit}>
        <div className="mark-form-group">
          <label htmlFor="hotelMarkup" className="form-label-subAdmin">
            Hotel Markup:
          </label>
          <input
            type="number"
            id="hotelMarkup"
            name="hotelMarkup"
            value={formData.hotelMarkup}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="mark-form-group">
          <label htmlFor="flightMarkup" className="form-label-subAdmin">
            Flight Markup:
          </label>
          <input
            type="number"
            id="flightMarkup"
            name="flightMarkup"
            value={formData.flightMarkup}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="mark-form-group">
          <label htmlFor="busMarkup" className="form-label-subAdmin">
            Bus Markup:
          </label>
          <input
            type="number"
            id="busMarkup"
            name="busMarkup"
            value={formData.busMarkup}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="mark-form-group">
          <label htmlFor="packageMarkup" className="form-label-subAdmin">
            Package Markup:
          </label>
          <input
            type="number"
            id="packageMarkup"
            name="packageMarkup"
            value={formData.packageMarkup}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="mark-form-group">
          <button type="submit" className="mark-form-button">
            Create Markup
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMarkup;
