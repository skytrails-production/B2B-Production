import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";
import "./RegionDashboard.css";
import { IoHome } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";

const RegionDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if token is not present
        navigate('/relationshipManager/Login');
      } else {
        try {
          const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
            headers: {
              token: token
            }
          });
          setAgents(response.data.result);
        } catch (error) {
          console.error("error", error);
          // Redirect to login if there's an error in fetching data
          navigate('/relationshipManager/Login');
        }
      }
    };

    checkAuthentication(); 
  }, [navigate]);

  // Event handlers for navigation
  const handleHomeClick = () => {
    navigate('/relationshipManager/dashboard');
    setSelectedNavItem('home'); // Reset selected item
  };

  const handleBookingsClick = () => {
    navigate('/relationShipManager/getAgentBookings');
    setSelectedNavItem('bookings');
  };

  const handleCancelReq = () => {
    navigate('/relationShipManager/getAgentCancelReq');
    setSelectedNavItem('cancel')
  };

  const handleChangeReq = () => {
    navigate('/relationShipManager/getAgentChangeReq');
    setSelectedNavItem('change')
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/relationshipManager/Login');
  };

  return (
    <>
    <div style={{ display: 'flex', height: '100vh', position:'fixed', top:'0',left: '0', right: '0', width: '100%', overflow: 'auto' }}>
      {/* Left Side Navigation */}
      <div style={{ flex: '0 0 290px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
        <img
          src={ab}
          alt='Skytrails'
          style={{ width: '250px' }}
        />
        <ul style={{paddingLeft:'0px'}}>
        
          <li
            style={{
              fontSize: '25px',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: 'lightgray',
              color: selectedNavItem === 'home' ? 'white' : 'black',
              textAlign:'start',
              cursor: 'pointer',
              paddingLeft: '10px',
              display:"flex",
              gap:"8px",
              letterSpacing:'-2px',
              alignItems:'center',
              marginBottom: '10px' ,// Space between list items
              boxShadow:'0px 0px 4px',
            }}
            onClick={handleHomeClick}
          > <IoHome/>
          
            <div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray', color: selectedNavItem === 'home' ? 'white' : 'black',}}>Home</div>
            
          </li>
  
          <li
            style={{
              fontSize: '25px',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: 'lightgray',
              color: selectedNavItem === 'bookings' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              paddingLeft: '10px',
              display:"flex",
              gap:"8px",
              letterSpacing:'-2px',
              alignItems:'center',
              marginBottom: '10px', // Space between list items
              boxShadow:'0px 0px 4px',
            
            }}
            onClick={handleBookingsClick}
          ><MdSupportAgent /><div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray',  color: selectedNavItem === 'bookings' ? 'white' : 'black'}}>Booking</div>
        
          </li>
      
          <li
            style={{
              fontSize: '25px',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: 'lightgray',
              color: selectedNavItem === 'cancel' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              paddingLeft: '10px',
              display:"flex",
              gap:"8px",
              letterSpacing:'-2px',
              alignItems:'center',
              marginBottom: '10px' ,// Space between list items
        
              boxShadow:'0px 0px 4px',
            
            }}
            onClick={handleCancelReq}
          ><MdCancel /><div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray', color: selectedNavItem === 'cancel' ? 'white' : 'black'}}>Cancel Request</div>
      
          </li>
      
          <li
            style={{
              fontSize: '25px',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: 'lightgray',
              color: selectedNavItem === 'change' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              paddingLeft: '10px',
              display:"flex",
              gap:"8px",
              letterSpacing:'-2px',
              alignItems:'center',
              marginBottom: '10px', // Space between list items
          
              boxShadow:'0px 0px 4px',
        
            }}
            onClick={handleChangeReq}
          ><LiaExchangeAltSolid /><div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray', color: selectedNavItem === 'change' ? 'white' : 'black'}}>Change Request</div>
            
          </li>
        </ul>
      </div>

      {/* Agent Table */}
      
      <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
    
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
          <div onClick={handleLogout} style={{cursor:'pointer',color:'red',fontSize:'large'}}>
          <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }}  />Logout</div>
        </div> 
        <div style={{overflow:'scroll',height:'79%',WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitScrollbar: { display: 'none' },marginTop:'50px' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' ,color:'black !important',boxShadow:'0px 0px 12px'}}>
          <thead>
            <tr className='dash1'>
              <th style={{ textAlign: 'center' }}>Pan Card</th>
              <th style={{ textAlign: 'center' }}>Agency Name</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Number</th>

            </tr>
          </thead>
      
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id} className='dash' >
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>
                  <img src={agent.agency_details.document_details.pan_card_document} alt="PAN Card" style={{ maxWidth: '100px' }} />
                </td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.agency_details.agency_name}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.first_name} {agent.personal_details.last_name}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.email}</td>
                <td style={{ padding: '10px 0', borderBottom: 'none', textAlign: 'center' }}>{agent.personal_details.mobile.mobile_number}</td>
              </tr>
            ))}
          </tbody>
      
        </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegionDashboard;











