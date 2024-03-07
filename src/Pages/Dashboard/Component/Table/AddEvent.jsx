import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/logo.jpeg";
import "./AddEvents.css";
import { CircularProgress } from "@mui/material";
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
  const[load,setLoad]=useState(false);
  const[message,setMessage]=useState("");

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
  setLoad(true);
    try {
      const formData = new FormData();

      formData.append("title", formValues.title);
      formData.append("price", formValues.price);
      formData.append("startDate", formValues.startDate);
      formData.append("endDate", formValues.endDate);
      formData.append("age", formValues.age);
      formData.append("venue", formValues.venue);
      formData.append("adultPrice", formValues.adultPrice);
      formData.append("childPrice", formValues.childPrice);
      formData.append("content", formValues.content);
      formData.append("remainingDays", formValues.remainingDays);
      formData.append("bookingPrice", formValues.bookingPrice);
      formData.append("showType", formValues.showType);
      formData.append("images", formValues.images);
      formData.append("startTime", formValues.startTime);
      formData.append("endTime", formValues.endTime);
      formData.append("breakTime", formValues.breakTime);
      formData.append("noOfShows", formValues.noOfShows);
      formData.append("slotTime", formValues.slotTime);
      formData.append("latitude", formValues.latitude);
      formData.append("longitude", formValues.longitude);
      formData.append("couplePrice", formValues.couplePrice);
      formData.append("isPaid", formValues.isPaid);
      // couplePrice
      formData.append("noOfMember", formValues.noOfMember);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/events/createEvents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
       // alert("Event created successfully!");
       setMessage('Event created successfully!')
       setTimeout(()=>{
        navigate("/admin/dashboard");
       },5000);
      
      } else {
        //alert("Failed to create Event!");
        setMessage('Failed to create Event!')
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
    finally{
      setLoad(false);
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
                   {load && (
                <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
                     <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
                </div>
            )}
              {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginBottom: '30px', borderRadius: '5px' }}>{message}</div>}
      <header className="sectionagent headersagent">
        <div className="headead">
          <h2>Create Event</h2>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="addEvent-form">
        <div className="addEvent-page">


          
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  className="addEvent-input addEvent-input-small"
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  className="addEvent-input addEvent-input-small"
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">

                <input
                  type="text"
                  name="bookingPrice"
                  value={formValues.bookingPrice}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="BookingPrice"
                />



                <input
                  type="string"
                  name="showType"
                  value={formValues.showType}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="ShowType"
                />
              </div>
            </div>
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">


                <input
                  type="date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                  className="addEvent-input"
                />


                <input
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                  className="addEvent-input"
                />
              </div>  </div>
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">


                <input
                  type="string"
                  name="age"
                  value={formValues.age}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="Age"
                />


                <input
                  type="text"
                  name="venue"
                  value={formValues.venue}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="Venue"
                />
              </div>
            </div>
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">


                <input
                  type="number"
                  name="adultPrice"
                  value={formValues.adultPrice}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="AdultPrice"
                />


                <input
                  type="number"
                  name="childPrice"
                  value={formValues.childPrice}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="ChildPrice"
                />
              </div>
            </div>
            <div className="addEvent-form-group">
              <div className="addEvent-input-row">

                <textarea
                  type="text"
                  name="content"
                  value={formValues.content}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  style={{ width: "100%" }}
                  placeholder="Content"
                />
              </div></div>


            <div className="addEvent-form-group">
              <div className="addEvent-input-row">
                <input
                  type="time"
                  name="startTime"
                  value={formValues.startTime}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="startTime"

                />
                <input
                  type="time"
                  name="endTime"
                  value={formValues.endTime}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="endTime"

                />



              </div> </div>

            <div className="addEvent-form-group">
              <div className="addEvent-input-row">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="addEvent-input"
                  style={{padding:"5px"}}
                />
                <input
                  type="number"
                  name="breakTime"
                  value={formValues.breakTime}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="BreakTime"
                />


              </div>  </div>

            <div className="addEvent-form-group">
              <div className="addEvent-input-row">

                <input
                  type="number"
                  name="noOfShows"
                  value={formValues.noOfShows}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder=" NoOfShows"
                />


                <input
                  type="number"
                  name="slotTime"
                  value={formValues.slotTime}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="SlotTime"
                />
              </div> </div>

            <div className="addEvent-form-group">
              <div className="addEvent-input-row">

                <input
                  type="number"
                  name="latitude"
                  value={formValues.latitude}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="Latitude"
                />


                <input
                  type="number"
                  name="longitude"
                  value={formValues.longitude}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="longitude"
                />
              </div> </div>


            <div className="addEvent-form-group">
              <div className="addEvent-input-row">



                <input
                  type="number"
                  name="noOfMember"
                  value={formValues.noOfMember}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="No of member"
                />
                <input
                  type="number"
                  name="couplePrice"
                  value={formValues.couplePrice}
                  onChange={handleInputChange}
                  className="addEvent-input"
                  placeholder="couplePrice"
                />
              </div> </div>

            <div className="addEvent-form-group">
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="isPaidCheckbox"
                  name="isPaid"
                  checked={formValues.isPaid}
                  onChange={(e) => handleInputChange({ target: { name: 'isPaid', value: e.target.checked } })}
                  style={{ alignItems: "left" }}

                />

                <button type="submit" className="addEvent-button">
                  <span className="addEvent-button-text">Submit</span>
                  <span className="addEvent-button-icon">&#10004;</span>
                </button>

              </div>
            </div>


          

        </div>
        {/* Pagination buttons */}

      </form>
    </div>
  );
};

export default CreateEventForm;
