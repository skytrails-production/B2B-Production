// CreateSubAdminPage.js
import React, { useState, useEffect } from "react";
import "./AddSubadmin.css";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import profilePicUrl from "../../../../Images/whitelogo1.png";
import { useSelector } from "react-redux";
import axios from "axios";
const CancelAgentWise = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const reducerState = useSelector((state) => state);
  const token = reducerState?.subadminLogin?.subadminloginData?.result?.token;
  console.log(token, "token:localStorage.getItem('token')");

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleAgentSelectChange = (e) => {
    setSelectedAgentId(e.target.value);
  };

  useEffect(() => {
    async function fetchRelationshipManagers() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/subAdmin/getAgenList`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        setAgents(response.data.result);
      } catch (error) {
        console.error("Error fetching Relationship Managers:", error);
      }
    }

    fetchRelationshipManagers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      searchType: type,
      agentId: selectedAgentId,
    };

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/subAdmin/getCancelRequestAgentWise`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setResponseData(data);
        setSubmitButtonClicked(true); // Set submitButtonClicked to true after form submission
      } else {
        // Handle error responses
        // For example, show an alert message
      }
    } catch (error) {
      console.error("Error creating Relationship Manager:", error.message);
    }
  };

  const renderTable = (bookingType) => {
    // Check if responseData is available and not null
    console.log("rendertableooooooooooooooo");
    if (submitButtonClicked && responseData) {
      return (
        <div className={`${bookingType}_data`}>
          <h2>
            {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}{" "}
            Bookings
          </h2>
          <table>
            <thead>
              <tr>
                {/* Table headers based on booking type */}
                {bookingType === "flight" && (
                  <>
                    <th>Booking ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Total Amount</th>
                    <th>PNR</th>
                  </>
                )}
                {bookingType === "hotel" && (
                  <>
                    <th>Booking ID</th>
                    <th>Hotel Name</th>
                    <th>Destination</th>
                    <th>Address</th>
                    <th>Total Amount</th>
                  </>
                )}
                {bookingType === "bus" && (
                  <>
                    <th>Booking ID</th>
                    <th>Bus Type</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Total Amount</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Render table rows based on booking type */}
              {responseData?.result?.[`${bookingType}Booking`]?.map(
                (booking) => (
                  <tr key={booking._id}>
                    {/* Render table cells based on booking type */}
                    {bookingType === "flight" && (
                      <>
                        <td>{booking.bookingId}</td>
                        <td>{booking.origin}</td>
                        <td>{booking.destination}</td>
                        <td>{booking.totalAmount}</td>
                        <td>{booking.pnr}</td>
                      </>
                    )}
                    {bookingType === "hotel" && (
                      <>
                        <td>{booking.bookingId}</td>
                        <td>{booking.hotelName}</td>
                        <td>{booking.destination}</td>
                        <td>{booking.address}</td>
                        <td>{booking.amount}</td>
                      </>
                    )}
                    {bookingType === "bus" && (
                      <>
                        <td>{booking.busId}</td>
                        <td>{booking.busType}</td>
                        <td>{booking.origin}</td>
                        <td>{booking.destination}</td>
                        <td>{booking.amount}</td>
                      </>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      // Return null if responseData is not available
      return "";
    }
  };
  return (

    <div style={{ width: "80%",margin:"auto"}}>
       <div className="form-containers">
      <header
        className="sectionagent headersagent"
        style={{ backgroundColor: "#E73C33" }}
      >
        <div className="headead">
          {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
          <h2>Cancel AgentWise</h2>
        </div>
      </header>
      <div className="form-agent">
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            marginTop: "30px",
          }}
        >
          <select
            name="agentId"
            onChange={handleAgentSelectChange}
            style={{ padding: "0px" }}
          >
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.agentId} value={agent.agentId}>
                {agent.agentName}
              </option>
            ))}
          </select>
          <select
            name="type"
            onChange={(e) => setType(e.target.value)}
            style={{ padding: "0px" }}
          >
            <option value="">Select Type</option>
            <option value="all">all</option>
            <option value="flight">flight</option>
            <option value="bus">bus</option>
            <option value="hotel">hotel</option>
          </select>
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
      </div>
      {responseData && (
        <>
          {type === "all" && (
            <>
              {renderTable("flight")}
              {renderTable("hotel")}
              {renderTable("bus")}
            </>
          )}
          {type !== "all" && type && renderTable(type)}
        </>
      )}
    
    </div>
   
  );
};

export default CancelAgentWise;
