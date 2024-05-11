import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";
const RegionCancelReq=()=> {
    const [selectedNavItem,setSelectedNavItem]=useState(null);
    const [type, setType] = useState("");
    const [options, setOptions] = useState([]); // State to hold options for the select element
  const [selectedId, setSelectedId] = useState(""); // State to hold the selected ID
  const [agents, setAgents] = useState([]); // State to hold agents for the second select element
  const [selectedAgentId, setSelectedAgentId] = useState(""); // State to hold the selected agent ID
  const [responseData, setResponseData] = useState(null);
 // console.log(responseData,"responseData")
    const navigate=useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        if(!token){
          navigate('/relationshipManager/Login');
        }else{
        try {
          // Fetch agents for the second select element
          const result = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
            headers: {
              token: localStorage.getItem("token")
            }
          });
          setAgents(result.data.result);
        } catch (error) {
          console.error("Error fetching agents:", error);
        }
      }
      };
  
      fetchData();
    }, [navigate]);
  
    const fetchData = async () => {
      const payload = {
        searchType: type,
        agentId: selectedAgentId,
      };
    
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle the case when the token is not available
          console.error("Token not available.");
          return;
        }
    
        const response = await axios.post(
          `${apiURL.baseURL}/skyTrails/api/relationShipManager/getAgentCancelReq`,
          payload,
          {
            headers: {
              token: token,
            },
          }
        );
        setResponseData(response.data); // Store the response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const handleHomeClick = () => {
        // Navigate to the dashboard
        navigate('/relationshipManager/dashboard');
        setSelectedNavItem('home'); // Reset selected item
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
    
      const handleAgentSelectChange = (e) => {
        setSelectedAgentId(e.target.value);
      };
      const handleSelectChange = (e) => {
        setSelectedId(e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(); // Call fetchData when the form is submitted
      };
      const handlemove=()=>{
        localStorage.removeItem("token");
        navigate('/relationshipManager/Login');
      }
      useEffect(() => {
        setResponseData(null);
      }, [type,agents]);
  return (
    <div style={{position:'fixed',top:'0',left:'0',right:'0',width:'100%',overflow:'auto',display:'flex',height:'100vh'}}>
      <div style={{ flex: '0 0 290px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
      <img
          src={ab}
          alt='Skytrails'
          style={{ width: '250px' }}
        />
        <ul>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: selectedNavItem === 'home' ? 'skyblue' : 'white',
              color: selectedNavItem === 'home' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' ,// Space between list items
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleHomeClick}
          ><button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>Home</button>
            
          </li>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: selectedNavItem === 'bookings' ? 'skyblue' : 'white',
              color: selectedNavItem === 'bookings' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px', // Space between list items
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleBookingsClick}
          >
            <button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>Booking</button>
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
              marginBottom: '10px' ,// Space between list items
              width:'220px',
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleCancelReq}
          >
            <button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>Cancel Request</button>
          </li>
          <li
            style={{
              fontSize: '1.69rem',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: selectedNavItem === 'change' ? 'skyblue' : 'white',
              color: selectedNavItem === 'change' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px' ,// Space between list items
              width:'220px',
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleChangeReq}
          >
            <button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>Change Request</button>
          </li>
        </ul>
        </div>  
        <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 

<h2 style={{ color: 'blue' ,fontFamily:'fantasy'}}>Welcome to Relationship Manager Portal</h2>
<span  onClick={handlemove}style={{cursor:'pointer',color:'red',fontFamily:'fantasy',fontSize:'large'}} >
          <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }} />Logout
          </span>
</div>
        <div className='relationType' style={{marginLeft:'auto',marginRight:'auto',width:'50%'}}>
          <form onSubmit={handleSubmit} style={{backgroundColor:'white',borderRadius:'10px',marginTop:'30px',boxShadow:'0px 0px 12px #0c0c0f'}}>
          <p style={{color:'#0d4ce0',fontSize:'large'}}>Cancel Booking Details</p>
            <select name="agentId" onChange={handleAgentSelectChange} style={{ padding: '0px'}}>
              <option value="">Select Agent</option>
              {/* Mapping over agents to create select options with first name */}
              {agents.map(agent => (
                <option key={agent._id} value={agent._id}>{agent.personal_details.first_name}</option>
              ))}
            </select >
            <select name="type" onChange={(e) => setType(e.target.value)} style={{ padding: '0px' }}>
              <option value="">Select Type</option>
              <option value="all">all</option>
              <option value="flight">flight</option>
              <option value="bus">bus</option>
              <option value="hotel">hotel</option>
            </select>
            <button type="submit" style={{ height:'33px',borderRadius:'5px',backgroundColor:'skyblue',color:'black' }}>Submit</button>
          </form>
        </div>
        {responseData && (
          <>
            {/* Conditionally render based on the selected type */}
            {(type === 'all' || type === 'flight') && (
              <div className='flight_data'>
                <h2>Cancelled Flight Bookings</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>PNR</th>
                      <th>Cancelled Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.flightCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.bookingId}</td>
                        <td>{item.pnr}</td>
                        <td>{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(type === 'all' || type === 'hotel') && (
              <div className='hotel_data'>
                <h2>Cancelled Hotel Bookings</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Hotel</th>
                      <th>Cancelled Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.hotelCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.bookingId}</td>
                        <td>{item.userId.personal_details.email}</td>
                        <td>{item.userId.personal_details.first_name}</td>
                        <td>{item.userId.personal_details.mobile.mobile_number}</td>
                        <td>{item.hotelBookingId.hotelName}</td>
                        <td>{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(type === 'all' || type === 'bus') && (
              <div className='bus_data'>
                <h2>Cancelled Bus Bookings</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Cancelled Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.busCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.busId}</td>
                        <td>{item.userId.personal_details.email}</td>
                        <td>{item.userId.personal_details.first_name}</td>
                        <td>{item.userId.personal_details.mobile.mobile_number}</td>
                        <td>{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        </div>
    </div>
  )
}

export default RegionCancelReq;