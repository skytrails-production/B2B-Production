import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/logo.jpeg";
import "./AddEvents.css";

const CreateEventForm = () => {
  const [page, setPage] = useState(1);

  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    images: "",
    price: "",
    bookingPrice: "",
    showType: "",
    age: "",
    venue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
      remainingDays: calculateRemainingDays(
        formValues.startDate,
        formValues.endDate
      ),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      images: file,
    });
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      formData.append("startDate", formValues.startDate);
      formData.append("endDate", formValues.endDate);
      formData.append("remainingDays", formValues.remainingDays);
      formData.append("images", formValues.images);
      formData.append("price", formValues.price);
      formData.append("bookingPrice", formValues.bookingPrice);
      formData.append("showType", formValues.showType);
      formData.append("age", formValues.age);
      formData.append("venue", formValues.venue);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/events/createEvents`,
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Event created successfully!");
        navigate("/admin/dashboard");
      } else {
        alert("Failed to create Event!");
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="addEvent-div">
      <h3 style={{ textAlign: "center" }}>
        <strong>Add Events Form</strong>
      </h3>
      <form
        onSubmit={page === 2 ? handleSubmit : nextPage}
        className="addEvent-form"
      >
        {page === 1 && (
          <>
            <label className="event-form-label-p1">
              Title:
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                className="event-form-input-ads-p1"
              />
            </label>
            <label className="event-form-label-p1">
            Price:
            <input
              type="number"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              className="event-form-input-ads-p1"
            />
          </label>
            <label className="event-form-label-p1">
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formValues.startDate}
                onChange={handleInputChange}
                className="event-form-input-ads-p1"
              />
            </label>

            <label className="event-form-label-p1">
              End Date:
              <input
                type="date"
                name="endDate"
                value={formValues.endDate}
                onChange={handleInputChange}
                className="event-form-input-ads-p1"
              />
            </label>
            <label className="event-form-label-p1">
              Age:
              <input
                type="text"
                name="age"
                value={formValues.age}
                onChange={handleInputChange}
                className="event-form-input-ads-p1"
              />
            </label>
            <label className="event-form-label-p1">
              Venue:
              <input
                type="text"
                name="venue"
                value={formValues.venue}
                onChange={handleInputChange}
                className="event-form-input-ads-p1"
              />
            </label>
          </>
        )}
        {page === 2 && (
          <>
            <label className="event-form-label">
              Content:
              <textarea
                type="text"
                name="content"
                value={formValues.content}
                onChange={handleInputChange}
                className="event-form-textarea"
              />
            </label>
            <label className="event-form-label">
              Remaining Days:
              <input
                type="number" // Change to number input
                name="remainingDays"
                value={formValues.remainingDays}
                onChange={handleInputChange}
                className="event-form-input-ads"
                readOnly // make it read-only to prevent direct user input
              />
            </label>
            <label className="event-form-label-image">
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="event-form-input-image-ads"
              />
            </label>
            <label className="event-form-label">
              Booking Price:
              <input
                type="number"
                name="bookingPrice"
                value={formValues.bookingPrice}
                onChange={handleInputChange}
                className="event-form-input-ads"
              />
            </label>

            <label className="event-form-label">
              Show Type:
              <input
                type="text"
                name="showType"
                value={formValues.showType}
                onChange={handleInputChange}
                className="event-form-input-ads"
              />
            </label>
          </>
        )}

        {page === 1 && (
          <button type="button" onClick={nextPage} className="event-form-button">
            Next
          </button>
        )}

        {page === 2 && (
          <div className="event-p-form-button">
            <button type="button" onClick={prevPage} >
              Previous
            </button>
            <button type="submit">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateEventForm;
