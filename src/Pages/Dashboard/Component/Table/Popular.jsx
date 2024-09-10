import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Button, Input } from "@mui/material";
import { useSelector } from "react-redux";
function Popular() {
  const reducerState = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  // const[uniqueId,setUniqueId]=useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const formData = new FormData();
      formData.append("city", city);
      formData.append("images", image);
      formData.append("description", description);
      formData.append("discount", discount);
      formData.append("uniqueId", reducerState.adminAuth.adminData.data.id);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createPopularDestination`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage("PopularDestination successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 4000);
      } else {
        setMessage("Failed to add Popular Destination!");
      }
    } catch (error) {
      console.error("API Error", error.response);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div
      className="updateFeed-div"
      style={{
        marginTop: "50px",
        border: "2px solid rgb(255,255,255,0.8)",
        padding: "80px",
        backgroundColor: "rgb(255,255,255,0.8)",
        borderRadius: "1%",
        boxShadow: "0px 0px 5px #767070",
      }}
    >
      {load && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.5))",
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
              left: "49.8%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      {message && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginBottom: "30px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
      <h3 style={{ textAlign: "center" }} className="addCoupon-heading">
        <strong>Popular Destination</strong>
      </h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Discount"
          variant="outlined"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
          type="file"
          accept=".jpeg,.jpg,.png"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ padding: "4.5px" }}
        />
        <button
          className="button1"
          type="submit"
          style={{ backgroundColor: "#21325d !important" }}
        >
          Submit
        </button>
      </form>
      {load && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.5)",
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
              left: "49.8%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Popular;
