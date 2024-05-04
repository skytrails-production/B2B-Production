import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";
const RegionDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
          headers: {
            token: `${localStorage.getItem("token")}`
          }
        });
        setAgents(response.data.result);
      } catch (error) {
        console.error("error", error);
        navigate('/relationshipManager/Login');
      }
    }

    fetchData(); 
  }, [navigate]);

  const handleHomeClick = () => {
    // Navigate to the dashboard
    navigate('/relationshipManager/dashboard');
    setSelectedNavItem(null); // Reset selected item
  };

  const handleBookingsClick = () => {
    // Navigate to the bookings page
    navigate('/relationShipManager/getAgentBookings');
    setSelectedNavItem('bookings');
  };
  const handleCancelReq=()=>{
    //navigate to cancel req page
    navigate('/relationShipManager/getAgentCancelReq');
    setSelectedNavItem(null)
  }
  const handleChangeReq=()=>{
    //navigate to cancel req page
    navigate('/relationShipManager/getAgentChangeReq');
    setSelectedNavItem('change')
  }
  const handlemove=()=>{
    navigate('/relationshipManager/Login');
  }

  return (
    <div style={{ display: 'flex', height: '100vh' ,position:'fixed',top:'0',left:'0',right:'0',width:'100%',overflow:'auto'}}>
      {/* Left Side Navigation */}
      <div style={{ flex: '0 0 275px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
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
              backgroundColor: selectedNavItem === 'home' ? 'skyblue' : 'white', 
              color: selectedNavItem === 'home' ? 'white' : 'black', 
              textAlign: 'center', 
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' // Space between list items
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
              backgroundColor: selectedNavItem === 'bookings' ? 'skyblue' : 'white', 
              color: selectedNavItem === 'bookings' ? 'white' : 'black', 
              textAlign: 'center', 
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' // Space between list items
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
              backgroundColor: selectedNavItem === 'cancel' ? 'skyblue' : 'white',
              color: selectedNavItem === 'cancel' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' // Space between list items
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
              backgroundColor: selectedNavItem === 'change' ? 'skyblue' : 'white',
              color: selectedNavItem === 'change' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' // Space between list items
            }}
            onClick={handleChangeReq}
          >
            Change Request
          </li>
        </ul>
      </div>

      {/* Agent Table */}
      <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 

        <h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
        <FiLogOut  style={{cursor:'pointer',fontSize:'30px'}} onClick={handlemove}/>
        </div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Pan Card</th>
              <th style={{textAlign:'center'}}>Agency Name</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Number</th>
             
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id}>
                <td style={{ padding: '10px 0', borderBottom: 'none',textAlign:'center' }}>
                  <img src={agent.agency_details.document_details.pan_card_document} alt="PAN Card" style={{ maxWidth: '100px' }} />
                </td>
                <td style={{padding:'10px 0',borderBottom:'none',textAlign:'center'}}>{agent.agency_details.agency_name}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.first_name} {agent.personal_details.last_name}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.email}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.mobile.mobile_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionDashboard;










