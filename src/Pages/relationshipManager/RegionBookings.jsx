import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";

const RegionBookings = () => {
  const [type, setType] = useState(""); 
  const [agents, setAgents] = useState([]); 
  const [selectedAgentId, setSelectedAgentId] = useState(""); 
  const [responseData, setResponseData] = useState(null); 
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const result = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
          headers: {
            token: localStorage.getItem("token")
          }
        });
        setAgents(result.data.result); 
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents(); 
  }, []);

  const fetchData = async () => {
    const payload = {
      bookingType: type,
      agentId: selectedAgentId,
    };
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not available."); 
        return;
      }
  
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/relationShipManager/getAgentBookings`,
        payload,
        {
          headers: {
            token: token,
          },
        }
      );
      setResponseData(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleHomeClick = () => {
    navigate('/relationshipManager/dashboard');
  };

  const handleBookingsClick = () => {
    navigate('/relationShipManager/getAgentBookings');
  };

  const handleCancelReq = () => {
    navigate('/relationShipManager/getAgentCancelReq');
  };

  const handleChangeReq = () => {
    navigate('/relationShipManager/getAgentChangeReq');
  };

  const handleAgentSelectChange = (e) => {
    setSelectedAgentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonClicked(true); // Set submit button clicked to true
    await fetchData();
  };
  useEffect(() => {
    setSubmitButtonClicked(false);
  }, [type]);

  const handleLogout = () => {
    navigate('/relationshipManager/Login');
  }
  const renderTable = (bookingType) => {
    // Check if responseData is available and not null
    if (submitButtonClicked && responseData) {
      return (
        <div className={`${bookingType}_data`}>
          <h2>{bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Bookings</h2>
          <table>
            <thead>
              <tr>
                {/* Table headers based on booking type */}
                {bookingType === 'flight' && (
                  <>
                    <th>Booking ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Total Amount</th>
                    <th>PNR</th>
                  </>
                )}
                {bookingType === 'hotel' && (
                  <>
                    <th>Booking ID</th>
                    <th>Hotel Name</th>
                    <th>Destination</th>
                    <th>Address</th>
                    <th>Total Amount</th>
                  </>
                )}
                {bookingType === 'bus' && (
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
              {responseData?.result?.[`${bookingType}Booking`]?.map(booking => (
                <tr key={booking._id}>
                  {/* Render table cells based on booking type */}
                  {bookingType === 'flight' && (
                    <>
                      <td>{booking.bookingId}</td>
                      <td>{booking.origin}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.totalAmount}</td>
                      <td>{booking.pnr}</td>
                    </>
                  )}
                  {bookingType === 'hotel' && (
                    <>
                      <td>{booking.bookingId}</td>
                      <td>{booking.hotelName}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.address}</td>
                      <td>{booking.amount}</td>
                    </>
                  )}
                  {bookingType === 'bus' && (
                    <>
                      <td>{booking.busId}</td>
                      <td>{booking.busType}</td>
                      <td>{booking.origin}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.amount}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      // Return null if responseData is not available
      return  "";
    }
  };
  

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', right: '0', width: '100%', overflow: 'auto', display: 'flex', height: '100vh' }}>
      <div style={{ flex: '0 0 250px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
        <img
          src={ab}
          alt='Skytrails'
          style={{ width: '250px' }}
        />
        <ul>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              listStyle: 'none',
              backgroundColor: type === 'home' ? 'skyblue' : 'white',
              color: type === 'home' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
            onClick={handleHomeClick}
          >
            Home
          </li>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              listStyle: 'none',
              backgroundColor: type === 'bookings' ? 'skyblue' : 'white',
              color: type === 'bookings' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
            onClick={handleBookingsClick}
          >
            Booking
          </li>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              listStyle: 'none',
              backgroundColor: type === 'cancel' ? 'skyblue' : 'white',
              color: type === 'cancel' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
            onClick={handleCancelReq}
          >
            Cancel Request
          </li>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              listStyle: 'none',
              backgroundColor: type === 'change' ? 'skyblue' : 'white',
              color: type === 'change' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
            onClick={handleChangeReq}
          >
            Change Request
          </li>
        </ul>
      </div>
      <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
          <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleLogout} />
        </div>
        <div className='relationType' style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: '30px' }}>
            <select name="agentId" onChange={handleAgentSelectChange} style={{ padding: '0px' }}>
              <option value="">Select Agent</option>
              {agents.map(agent => (
                <option key={agent._id} value={agent._id}>{agent.personal_details.first_name}</option>
              ))}
            </select>
            <select name="type" onChange={(e) => setType(e.target.value)} style={{ padding: '0px' }}>
              <option value="">Select Type</option>
              <option value="all">all</option>
              <option value="flight">flight</option>
              <option value="bus">bus</option>
              <option value="hotel">hotel</option>
            </select>
            <button type="submit" style={{ height: '33px', borderRadius: '5px', backgroundColor: 'skyblue', color: 'black' }}>Submit</button>
          </form>
        </div>
        {responseData && (
          <>
            {type === 'all' && (
              <>
                {renderTable('flight')}
                {renderTable('hotel')}
                {renderTable('bus')}
              </>
            )}
            {type !== 'all' && type && renderTable(type)}
          </>
        )}
      </div>
    </div>
  );
};

export default RegionBookings;


