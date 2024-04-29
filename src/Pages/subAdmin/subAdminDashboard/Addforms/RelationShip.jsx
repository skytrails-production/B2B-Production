// CreateSubAdminPage.js
import React, { useState } from "react";
import "./AddSubadmin.css";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/whitelogo1.png";
import { useSelector } from "react-redux";

const RelationShip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });
  const reducerState = useSelector((state) => state);
  const 
  token =
  reducerState?.subadminLogin?.subadminloginData?.result?.
  token;
  console.log(
    token,"token:localStorage.getItem('token')")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/subAdmin/createRM`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Relationship Manager created successfully!");
        // navigate("/admin/dashboard");
      } else {
        if (response.status === 409) {
          alert(
            "Relationship Manager with this username or email already exists!"
          );
          console.error(
            "Relationship Manager already exists:",
            response.statusText
          );
        } else {
          alert("Failed to create Relationship Manager!");
          console.error(
            "Failed to create Relationship Manager:",
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error creating Relationship Manager:", error.message);
    }
  };

  return (
    <div className="form-containers">
      <header
        className="sectionagent headersagent"
        style={{ backgroundColor: "#E73C33" }}
      >
        <div className="headead">
          {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
          <h2>RelationShip Manager</h2>
        </div>
      </header>
      <form className="form-agent" onSubmit={handleSubmit}>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            User Name:
          </label>
          <input
            type="text"
            id="name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            Last Name:
          </label>
          <input
            type="text"
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
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group-agent">
          <label htmlFor="panNumber" className="form-label-subAdmin">
            Pin code:
          </label>
          <input
            type="text"
            id="panNumber"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            City name:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            State:
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group-agent">
          <label htmlFor="agency_name" className="form-label-subAdmin">
            Country:
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group-agent">
          <button
            type="submit"
            className="form-button-agents"
            style={{ backgroundColor: "#E73C33" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelationShip;
