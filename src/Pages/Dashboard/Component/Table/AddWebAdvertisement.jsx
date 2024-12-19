import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/logo.jpeg";
import "./AddAdvertisement.css";
import { CircularProgress } from "@mui/material";

const CreateAdvertisementForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    remainingDays: "",
    images: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      remainingDays: calculateRemainingDays(
        name === "startDate" ? value : formValues.startDate,
        name === "endDate" ? value : formValues.endDate
      ),
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      images: file,
    }));
    if (errors.images) {
      setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
    }
  };

  const calculateRemainingDays = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference >= 0 ? daysDifference : 0;
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.title.trim()) newErrors.title = "Title is required.";
    if (!formValues.content.trim()) newErrors.content = "Content is required.";
    if (!formValues.startDate) newErrors.startDate = "Start date is required.";
    if (!formValues.endDate) newErrors.endDate = "End date is required.";
    if (
      formValues.startDate &&
      formValues.endDate &&
      new Date(formValues.startDate) > new Date(formValues.endDate)
    ) {
      newErrors.endDate = "End date cannot be earlier than start date.";
    }
    if (!formValues.images) newErrors.images = "An image file is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoad(true);
    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      formData.append("startDate", formValues.startDate);
      formData.append("endDate", formValues.endDate);
      formData.append("remainingDays", formValues.remainingDays);
      formData.append("images", formValues.images);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createadvertisment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage("Advertisement created successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 5000);
      } else {
        setMessage("Failed to create Advertisement.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessage("An error occurred while creating the advertisement.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="form-containers">
      {load && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress
            color="primary"
            size={50}
            thickness={3}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      {message && (
        <div className="message-container success-message">{message}</div>
      )}
      <header className="sectionagent headersagent">
        <div className="headead">
          <h2>Create Advertisement</h2>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="advertisement-form">
        <label className="form-label-add">
          Title:
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            className={`form-input-ads ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </label>

        <label className="form-label-add">
          Content:
          <textarea
            name="content"
            value={formValues.content}
            onChange={handleInputChange}
            className={`form-textarea ${errors.content ? "input-error" : ""}`}
          />
          {errors.content && (
            <span className="error-message">{errors.content}</span>
          )}
        </label>

        <label className="form-label-add">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleInputChange}
            className={`form-input-ads ${errors.startDate ? "input-error" : ""}`}
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate}</span>
          )}
        </label>

        <label className="form-label-add">
          End Date:
          <input
            type="date"
            name="endDate"
            value={formValues.endDate}
            onChange={handleInputChange}
            className={`form-input-ads ${errors.endDate ? "input-error" : ""}`}
          />
          {errors.endDate && (
            <span className="error-message">{errors.endDate}</span>
          )}
        </label>

        <label className="form-label-add">
          Remaining Days:
          <input
            type="number"
            name="remainingDays"
            value={formValues.remainingDays}
            className="form-input-ads"
            readOnly
          />
        </label>

        <label className="form-label-add-image">
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`form-input-image-ads ${errors.images ? "input-error" : ""}`}
          />
          {errors.images && (
            <span className="error-message">{errors.images}</span>
          )}
        </label>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAdvertisementForm;
