// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { apiURL } from '../../Constants/constant';
// import ab from '../../Images/The hawai yatra final logo.png';
// import { FiLogOut } from "react-icons/fi";
// const  RegionChangeReq=()=> {
//     const [selectedNavItem, setSelectedNavItem] = useState(null);
//     const [type, setType] = useState("");
//     const [options, setOptions] = useState([]); // State to hold options for the select element
//     const [selectedId, setSelectedId] = useState(""); // State to hold the selected ID
//     const [agents, setAgents] = useState([]); // State to hold agents for the second select element
//     const [selectedAgentId, setSelectedAgentId] = useState(""); // State to hold the selected agent ID
//     const [responseData, setResponseData] = useState([]);
//     const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             // Fetch agents for the second select element
//             const result = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
//               headers: {
//                 token: localStorage.getItem("token")
//               }
//             });
//             setAgents(result.data.result);
//           } catch (error) {
//             console.error("Error fetching agents:", error);
//           }
//         };
    
//         fetchData();
//       }, []);
    
//       const fetchData = async () => {
//         const payload = {
//           searchType: type,
//           agentId: selectedAgentId,
//         };
      
//         try {
//           const token = localStorage.getItem("token");
//           if (!token) {
//             // Handle the case when the token is not available
//             console.error("Token not available.");
//             return;
//           }
      
//           const response = await axios.post(
//             `${apiURL.baseURL}/skyTrails/api/relationShipManager/getAgentChangeReq`,
//             payload,
//             {
//               headers: {
//                 token: token,
//               },
//             }
//           );
//           setResponseData(response.data); // Store the response data in state
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       const handleHomeClick = () => {
//         // Navigate to the dashboard
//         navigate('/relationshipManager/dashboard');
//         setSelectedNavItem('home'); // Reset selected item
//       };
    
//       const handleBookingsClick = () => {
//         // Navigate to the bookings page
//         navigate('/relationShipManager/getAgentBookings');
//         setSelectedNavItem('bookings');
//       };
//       const handleCancelReq=()=>{
//         //navigate to cancel req page
//         navigate('/relationShipManager/getAgentCancelReq');
//         setSelectedNavItem('cancel')
//       }
//       const handleChangeReq=()=>{
//         //navigate to cancel req page
//         navigate('/relationShipManager/getAgentChangeReq');
//         setSelectedNavItem(null)
//       }
//       const handleAgentSelectChange = (e) => {
//         setSelectedAgentId(e.target.value);
//       };
//       const handleSelectChange = (e) => {
//         setSelectedId(e.target.value);
//       };
//       const handlemove=()=>{
//         navigate('/relationshipManager/Login');
//       }
//       const handleSubmit = async(e) => {
//         e.preventDefault();
//         setSubmitButtonClicked(true);
//         await fetchData(); // Call fetchData when the form is submitted
        
//       };
//       useEffect(()=>{
//         setSubmitButtonClicked(false);
//       },[type]);

//        const renderTable = (bookingType) => {
//     if (submitButtonClicked && responseData) {
//       return (
//         <div>
//           {/* Render flight cancellation requests */}
//           <div className="flight_data">
//             <h2>Flight Cancellation Requests</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Booking ID</th>
//                   <th>PNR</th>
//                   <th>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {responseData?.result?.flightCancelReq?.map(cancelReq => (
//                   <tr key={cancelReq._id}>
//                     <td>{cancelReq?.bookingId}</td>
//                     <td>{cancelReq?.pnr}</td>
//                     <td>{cancelReq.reason}</td>
//                   </tr>
                
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Render bus cancellation requests */}
//           <div className="bus_data">
//             <h2>Bus Cancellation Requests</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Booking ID</th>
//                   <th>User ID</th>
//                   <th>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {responseData?.result?.busCancelReq?.map(cancelReq => (
//                   <tr key={cancelReq._id}>
//                     <td>{cancelReq.bookingId}</td>
//                     <td>{cancelReq.userId}</td>
//                     <td>{cancelReq.reason}</td>
//                   </tr>
                
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Render hotel cancellation requests */}
//           <div className="hotel_data">
//             <h2>Hotel Cancellation Requests</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Booking ID</th>
//                   <th>User name</th>
//                   <th>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {responseData.result.hotelCancelReq.map(cancelReq => (
//                   <tr key={cancelReq._id}>
//                     <td>{cancelReq.bookingId}</td>
//                     <td>{cancelReq.hotelBookingId.name}</td>
//                     <td>{cancelReq.reason}</td>
//                   </tr>
                  
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else {
//       // Return null if responseData is not available
//       return "";
//     }
    
//   };
  

     

//   return (
//     <div style={{position:'fixed',top:'0',left:'0',right:'0',width:'100%',overflow:'auto',display:'flex',height:'100vh'}}>
//     <div style={{ flex: '0 0 250px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
//     <img
//         src={ab}
//         alt='Skytrails'
//         style={{ width: '250px' }}
//       />
//       <ul>
//         <li
//           style={{
//             fontSize: '1.8rem',
//             fontWeight: '700',
//             listStyle: 'none',
//             backgroundColor: selectedNavItem === 'home' ? 'skyblue' : 'white',
//             color: selectedNavItem === 'home' ? 'white' : 'black',
//             textAlign: 'center',
//             cursor: 'pointer',
//             padding: '10px',
//             borderRadius: '5px',
//             marginBottom: '10px' // Space between list items
//           }}
//           onClick={handleHomeClick}
//         >
//           Home
//         </li>
//         <li
//           style={{
//             fontSize: '1.8rem',
//             fontWeight: '700',
//             listStyle: 'none',
//             backgroundColor: selectedNavItem === 'bookings' ? 'skyblue' : 'white',
//             color: selectedNavItem === 'bookings' ? 'white' : 'black',
//             textAlign: 'center',
//             cursor: 'pointer',
//             padding: '10px',
//             borderRadius: '5px',
//             marginBottom: '10px' // Space between list items
//           }}
//           onClick={handleBookingsClick}
//         >
//           Booking
//         </li>
//         <li
//           style={{
//             fontSize: '1.8rem',
//             fontWeight: '700',
//             listStyle: 'none',
//             backgroundColor: selectedNavItem === 'cancel' ? 'skyblue' : 'white',
//             color: selectedNavItem === 'cancel' ? 'white' : 'black',
//             textAlign: 'center',
//             cursor: 'pointer',
//             padding: '10px',
//             borderRadius: '5px',
//             marginBottom: '10px' // Space between list items
//           }}
//           onClick={handleCancelReq}
//         >
//           Cancel Request
//         </li>
//         <li
//           style={{
//             fontSize: '1.8rem',
//             fontWeight: '700',
//             listStyle: 'none',
//             backgroundColor: selectedNavItem === 'change' ? 'skyblue' : 'white',
//             color: selectedNavItem === 'change' ? 'white' : 'black',
//             textAlign: 'center',
//             cursor: 'pointer',
//             padding: '10px',
//             borderRadius: '5px',
//             marginBottom: '10px' // Space between list items
//           }}
//           onClick={handleChangeReq}
//         >
//           Change Request
//         </li>
//       </ul>
//       </div>  
//       <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
//       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 

// <h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
// <FiLogOut  style={{cursor:'pointer',fontSize:'30px'}} onClick={handlemove}/>
// </div>
//       <div className='relationType' style={{marginLeft:'auto',marginRight:'auto',width:'50%'}}>
//         <form onSubmit={handleSubmit} style={{backgroundColor:'white',borderRadius:'10px',marginTop:'30px'}}>
         
//           <select name="agentId" onChange={handleAgentSelectChange} style={{ padding: '0px'}}>
//             <option value="">Select Agent</option>
//             {/* Mapping over agents to create select options with first name */}
//             {agents?.map(agent => (
//               <option key={agent?._id} value={agent?._id}>{agent?.personal_details?.first_name}</option>
//             ))}
//           </select>
//           <select name="type" onChange={(e) => setType(e.target.value)} style={{ padding: '0px' }}>
//             <option value="">Select Type</option>
//             <option value="all">all</option>
//             <option value="flight">flight</option>
//             <option value="bus">bus</option>
//             <option value="hotel">hotel</option>
//           </select>
//           <button type="submit" style={{ height:'33px',borderRadius:'5px',backgroundColor:'skyblue',color:'black' }}>Submit</button>
//         </form>
//       </div>
//       {responseData && (
//           <>
//             {type === 'all' && (
//               <>
//                 {renderTable('flight')}
//                 {renderTable('hotel')}
//                 {renderTable('bus')}
//               </>
//             )}
//             {type !== 'all' && type && renderTable(type)}
//           </>
//         )}
//       </div>
//   </div>
//   )
// }

// export default RegionChangeReq;
import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import ab from '../../Images/The hawai yatra final logo.png';
import { FiLogOut } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";
const RegionChangeReq=()=> {
    const [selectedNavItem,setSelectedNavItem]=useState(null);
    const [type, setType] = useState("");
    const [options, setOptions] = useState([]); // State to hold options for the select element
  const [selectedId, setSelectedId] = useState(""); // State to hold the selected ID
  const [agents, setAgents] = useState([]); // State to hold agents for the second select element
  const [selectedAgentId, setSelectedAgentId] = useState(""); // State to hold the selected agent ID
  const [responseData, setResponseData] = useState(null);
  console.log(responseData,"responseData")
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
          `${apiURL.baseURL}/skyTrails/api/relationShipManager/getAgentChangeReq`,
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
        localStorage.removeItem("token")
        navigate('/relationshipManager/Login');
      }
      useEffect(() => {
        setResponseData(null);
      }, [type]);
  return (
    <div style={{position:'fixed',top:'0',left:'0',right:'0',width:'100%',overflow:'auto',display:'flex',height:'100vh'}}>
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
            onClick={handleHomeClick}
          ><IoHome/><div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray',color:'#514141'}}>Home</div>
            
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
          ><MdSupportAgent />
            <div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray',color:'#514141'}}>Booking</div>
          </li>
          <li
            style={{
              fontSize: '25px',
              fontWeight: '700',
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
          ><MdCancel />
            <div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray',color:'#514141'}}>Cancel Request</div>
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
              marginBottom: '10px' ,// Space between list items
          
              boxShadow:'0px 0px 4px',
              
            }}
            onClick={handleChangeReq}
          > <LiaExchangeAltSolid />
            <div style={{border:'none',fontWeight:'400',backgroundColor:'lightgray',color:'#514141'}}>Change Request</div>
          </li>
        </ul>
        </div>  
        <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 

<h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
<span  onClick={handlemove}style={{cursor:'pointer',color:'red',fontSize:'large'}} >
          <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }} />Logout
          </span>
</div>
        <div className='relationType' style={{marginLeft:'auto',marginRight:'auto',width:'50%'}}>
          <form onSubmit={handleSubmit} style={{backgroundColor:'white',borderRadius:'10px',marginTop:'30px',boxShadow:'0px 0px 12px #0c0c0f'}}>
          <p style={{color:'#0d4ce0',fontSize:'large'}}>Change Booking Details</p>
            <select name="agentId" onChange={handleAgentSelectChange} style={{ padding: '0px'}}>
              <option value="">Select Agent</option>
              {/* Mapping over agents to create select options with first name */}
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
            <button type="submit" style={{ height:'33px',borderRadius:'5px',backgroundColor:'skyblue',color:'black' }}>Submit</button>
          </form>
        </div>
        {responseData && (
          <>
            {/* Conditionally render based on the selected type */}
            {(type === 'all' || type === 'flight') && (
              <div className='flight_data'>
                <h2>Changed Flight Bookings</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Reason </th>
                  
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.flightCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.agentId.personal_details.email}</td>
                        <td>{item.agentId.personal_details.first_name}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.changerequest}</td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(type === 'all' || type === 'hotel') && (
              <div className='hotel_data'>
                <h2>Changed Hotel Bookings</h2>
                <table>
                  <thead>
                    <tr>
                      
                      <th>Email</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Cancelled Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.hotelCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                    
                        <td>{item.agentId.personal_details.email}</td>
                        <td>{item.agentId.personal_details.first_name}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.changerequest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(type === 'all' || type === 'bus') && (
              <div className='bus_data'>
                <h2>Changed Bus Bookings</h2>
                <table>
                  <thead>
                    <tr>
                    <th>Email</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Cancelled Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.result?.busCancelReq?.map((item, index) => (
                      <tr key={item._id}>
                       <td>{item.agentId.personal_details.email}</td>
                       <td>{item.agentId.personal_details.first_name}</td>
                       <td>{item.agentId.personal_details.mobile.mobile_number}</td>
                       <td>{item.changerequest}</td>
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

export default RegionChangeReq;