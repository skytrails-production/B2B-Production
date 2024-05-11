// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { apiURL } from '../../Constants/constant';
// import ab from '../../Images/The hawai yatra final logo.png';
// import { FiLogOut } from "react-icons/fi";

// const RegionBookings = () => {
//   const [type, setType] = useState(""); 
//   const [agents, setAgents] = useState([]); 
//   const [selectedAgentId, setSelectedAgentId] = useState(""); 
//   const [responseData, setResponseData] = useState(null); 
//   const [submitButtonClicked, setSubmitButtonClicked] = useState(false); 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchAgents = async () => {
//       const token = localStorage.getItem("token");
//       if(!token){
//         navigate('/relationshipManager/Login');
//       } else{
//       try {
//         const result = await axios.get(`${apiURL.baseURL}/skyTrails/api/relationShipManager/getAllRMOfAGENT`, {
//           headers: {
//             token: localStorage.getItem("token")
//           }
//         });
//         setAgents(result.data.result); 
//       } catch (error) {
//         console.error("Error fetching agents:", error);
//       }
//     }
//     };

//     fetchAgents(); 
//   }, [navigate]);

//   const fetchData = async () => {
//     const payload = {
//       bookingType: type,
//       agentId: selectedAgentId,
//     };
  
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not available."); 
//         return;
//       }
  
//       const response = await axios.post(
//         `${apiURL.baseURL}/skyTrails/api/relationShipManager/getAgentBookings`,
//         payload,
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setResponseData(response.data); 
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
  
//   const handleHomeClick = () => {
//     navigate('/relationshipManager/dashboard');
//   };

//   const handleBookingsClick = () => {
//     navigate('/relationShipManager/getAgentBookings');
//   };

//   const handleCancelReq = () => {
//     navigate('/relationShipManager/getAgentCancelReq');
//   };

//   const handleChangeReq = () => {
//     navigate('/relationShipManager/getAgentChangeReq');
//   };

//   const handleAgentSelectChange = (e) => {
//     setSelectedAgentId(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitButtonClicked(true); // Set submit button clicked to true
//     await fetchData();
//   };
//   useEffect(() => {
//     setSubmitButtonClicked(false);
//   }, [type]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate('/relationshipManager/Login');
//   }
//   const renderTable = (bookingType) => {
//     // Check if responseData is available and not null
//     if (submitButtonClicked && responseData) {
//       return (
//         <div className={`${bookingType}_data`}>
//           <h2>{bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Bookings</h2>
//           <table>
//             <thead>
//               <tr>
//                 {/* Table headers based on booking type */}
//                 {bookingType === 'flight' && (
//                   <>
//                     <th>Booking ID</th>
//                     <th>Origin</th>
//                     <th>Destination</th>
//                     <th>Total Amount</th>
//                     <th>PNR</th>
//                     <th>Action</th>
//                   </>
//                 )}
//                 {bookingType === 'hotel' && (
//                   <>
//                     <th>Booking ID</th>
//                     <th>Hotel Name</th>
//                     <th>Destination</th>
//                     <th>Address</th>
//                     <th>Total Amount</th>
//                     <th>Action</th>
//                   </>
//                 )}
//                 {bookingType === 'bus' && (
//                   <>
//                     <th>Booking ID</th>
//                     <th>Bus Type</th>
//                     <th>Origin</th>
//                     <th>Destination</th>
//                     <th>Total Amount</th>
//                     <th>Action</th>
//                   </>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {/* Render table rows based on booking type */}
//               {responseData?.result?.[`${bookingType}Booking`]?.map(booking => (
//                 <tr key={booking._id}>
//                   {/* Render table cells based on booking type */}
//                   {bookingType === 'flight' && (
//                     <>
//                       <td>{booking?.bookingId || 'No Data'} </td>
//                       <td>{booking?.origin || 'No Data'}</td>
//                       <td>{booking?.destination || 'No Data'}</td>
//                       <td>{booking?.totalAmount || 'No Data'}</td>
//                       <td>{booking?.pnr || 'No Data'}</td>
//                     </>
//                   )}
//                   {bookingType === 'hotel' && (
//                     <>
//                       <td>{booking?.bookingId || 'No Data'}</td>
//                       <td>{booking?.hotelName || 'No Data'}</td>
//                       <td>{booking?.destination || 'No Data'}</td>
//                       <td>{booking?.address || 'No Data'}</td>
//                       <td>{booking?.amount || 'No Data'}</td>
//                     </>
//                   )}
//                   {bookingType === 'bus' && (
//                     <>
//                       <td>{booking?.busId || 'No Data'}</td>
//                       <td>{booking?.busType || 'No Data'}</td>
//                       <td>{booking?.origin || 'No Data'}</td>
//                       <td>{booking?.destination || 'No Data'}</td>
//                       <td>{booking?.amount || 'No Data'}</td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     } else {
//       // Return null if responseData is not available
//       return null;
//     }
//   };
//   return (
//     <div style={{ position: 'fixed', top: '0', left: '0', right: '0', width: '100%', overflow: 'auto', display: 'flex', height: '100vh' }}>
//       <div style={{ flex: '0 0 290px', backgroundColor: 'lightgray', padding: '20px', borderRight: '1px solid gray', overflow: 'auto' }}>
//         <img
//           src={ab}
//           alt='Skytrails'
//           style={{ width: '250px' }}
//         />
//         <ul>
//           <li
//             style={{
//               fontSize: '1.8rem',
//               fontWeight: '700',
//               listStyle: 'none',
//               backgroundColor: type === 'home' ? 'skyblue' : 'white',
//               color: type === 'home' ? 'white' : 'black',
//               textAlign: 'center',
//               cursor: 'pointer',
//               padding: '10px',
//               borderRadius: '5px',
//               marginBottom: '10px'
//             }}
//             onClick={handleHomeClick}
//           >
//             Home
//           </li>
//           <li
//             style={{
//               fontSize: '1.8rem',
//               fontWeight: '700',
//               listStyle: 'none',
//               backgroundColor: type === 'bookings' ? 'skyblue' : 'white',
//               color: type === 'bookings' ? 'white' : 'black',
//               textAlign: 'center',
//               cursor: 'pointer',
//               padding: '10px',
//               borderRadius: '5px',
//               marginBottom: '10px'
//             }}
//             onClick={handleBookingsClick}
//           >
//             Booking
//           </li>
//           <li
//             style={{
//               fontSize: '1.8rem',
//               fontWeight: '700',
//               listStyle: 'none',
//               backgroundColor: type === 'cancel' ? 'skyblue' : 'white',
//               color: type === 'cancel' ? 'white' : 'black',
//               textAlign: 'center',
//               cursor: 'pointer',
//               padding: '10px',
//               borderRadius: '5px',
//               marginBottom: '10px'
//             }}
//             onClick={handleCancelReq}
//           >
//             Cancel Request
//           </li>
//           <li
//             style={{
//               fontSize: '1.8rem',
//               fontWeight: '700',
//               listStyle: 'none',
//               backgroundColor: type === 'change' ? 'skyblue' : 'white',
//               color: type === 'change' ? 'white' : 'black',
//               textAlign: 'center',
//               cursor: 'pointer',
//               padding: '10px',
//               borderRadius: '5px',
//               marginBottom: '10px'
//             }}
//             onClick={handleChangeReq}
//           >
//             Change Request
//           </li>
//         </ul>
//       </div>
//       <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h2 style={{ color: 'blue' }}>Welcome to Relationship Manager Portal</h2>
//           <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleLogout} />
//         </div>
//         <div className='relationType' style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
//           <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: '30px' ,boxShadow:'0px 0px 12px #0c0c0f'}}>
//             <select name="agentId" onChange={handleAgentSelectChange} style={{ padding: '0px' }}>
//               <option value="">Select Agent</option>
//               {agents.map(agent => (
//                 <option key={agent._id} value={agent._id}>{agent.personal_details.first_name}</option>
//               ))}
//             </select>
//             <select name="type" onChange={(e) => setType(e.target.value)} style={{ padding: '0px' }}>
//               <option value="">Select Type</option>
//               <option value="all">all</option>
//               <option value="flight">flight</option>
//               <option value="bus">bus</option>
//               <option value="hotel">hotel</option>
//             </select>
//             <button type="submit" style={{ height: '33px', borderRadius: '5px', backgroundColor: 'skyblue', color: 'black' }}>Submit</button>
//           </form>
//         </div>
//         {responseData && (
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
//     </div>
//   );
// };

// export default RegionBookings;


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
  const [popupData, setPopupData] = useState(null); 
  const [popupBus, setPopupBus] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      if(!token){
        navigate('/relationshipManager/Login');
      } else{
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
      }
    };

    fetchAgents(); 
  }, [navigate]);

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
    localStorage.removeItem("token");
    navigate('/relationshipManager/Login');
  }

  const renderTable = (bookingType) => {
    // Check if responseData is available and not null
    if (submitButtonClicked && responseData) {
      return (
        <div className={`${bookingType}_data`}>
          <h2>{bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Bookings</h2>
          <div>
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
                    <th>Airline</th>
                    <th>Passenger Details</th>

                  </>
                )}
                {bookingType === 'hotel' && (
                  <>
                    <th>Booking ID</th>
                    <th>Hotel Name</th>
                    <th>Destination</th>
                    <th>Address</th>
                    <th>Total Amount</th>
                    <th>Customer Details</th>
                  </>
                )}
                {bookingType === 'bus' && (
                  <>
                    <th>Booking ID</th>
                    <th>Bus Type</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Total Amount</th>
                    <th>Passenger Details</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Render table rows based on booking type */}
              {responseData?.result?.[`${bookingType}Booking`]?.map(booking => (
                <tr key={booking._id}>
                  {/* Render table cells based on booking type */}
                  {bookingType === 'flight' &&(
                    <>
                      <td>{booking?.bookingId || 'No Data'} </td>
                      <td>{booking?.origin || 'No Data'}</td>
                      <td>{booking?.destination || 'No Data'}</td>
                      <td>{booking?.totalAmount || 'No Data'}</td>
                      <td>{booking?.pnr || 'No Data'}</td>
                      <td>{booking?.airlineDetails[0]?.Airline?.AirlineName}</td>
                      <td>
                        <button onClick={() => handleViewFlightPassengerDetails(booking.passengerDetails)
                        }style={{width:'100px',border:'1px solid blue',boxShadow:'0px 0px 12px #24706e78',fontWeight:'700',color:'green',borderRadius:'5px',height:'35px'}}>View</button>
                      </td>
                    </>
                  )}
                  {bookingType === 'hotel' && (
                    <>
                      <td>{booking?.bookingId || 'No Data'}</td>
                      <td>{booking?.hotelName || 'No Data'}</td>
                      <td>{booking?.destination || 'No Data'}</td>
                      <td>{booking?.address || 'No Data'}</td>
                      <td>{booking?.amount || 'No Data'}</td>
                      <td>
                        <button onClick={() => handleViewHotelDetails(booking.name, booking.phone,booking.email,booking.noOfPeople,booking.room)} style={{width:'100px',border:'1px solid blue',boxShadow:'0px 0px 12px #24706e78',fontWeight:'700',color:'green',borderRadius:'5px',height:'35px'}}>View</button>
                      </td>
                    </>
                  )}
                  {bookingType === 'bus' && (
                    <>
                      <td>{booking?.busId || 'No Data'}</td>
                      <td>{booking?.busType || 'No Data'}</td>
                      <td>{booking?.origin || 'No Data'}</td>
                      <td>{booking?.destination || 'No Data'}</td>
                      <td>{booking?.amount || 'No Data'}</td>
                      <td>
                        <button onClick={() => handleViewBusPassengerDetails(booking.passenger)} style={{width:'100px',border:'1px solid blue',boxShadow:'0px 0px 12px #24706e78',fontWeight:'700',color:'green',borderRadius:'5px',height:'35px'}}>View</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      );
    } else {
      // Return null if responseData is not available
      return (
        <div></div>
      );
    }
  };

  const handleViewFlightPassengerDetails = (passengerDetails) => {
    setPopupData(passengerDetails);
  };

  const handleViewBusPassengerDetails = (passenger) => {
    setPopupBus(passenger); // Set the bus popup data
  };
  

  const handleViewHotelDetails = (name, phone,email,noOfPeople,room) => {
    setPopupData({ name, phone,email,noOfPeople,room });
  };

  const handleClosePopup = () => {
    setPopupData(null);
    setPopupBus(null);
  };

  return (
    <div>
    <div style={{ position: 'fixed', top: '0', left: '0', right: '0', width: '100%', overflow: 'auto', display: 'flex', height: '100vh' }}>
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
              backgroundColor: type === 'home' ? 'skyblue' : 'white',
              color: type === 'home' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
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
              backgroundColor: type === 'bookings' ? 'skyblue' : 'white',
              color: type === 'bookings' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleBookingsClick}
          ><button style={{border:'none',fontWeight:'400',color:'#514141',backgroundColor:'white'}}>Booking</button>
            
          </li>
          <li
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: type === 'cancel' ? 'skyblue' : 'white',
              color: type === 'cancel' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
              width:'220px',
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleCancelReq}
          ><button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>  Cancel Request</button>
            
          </li>
          <li
            style={{
              fontSize: '1.69rem',
              fontWeight: '500',
              listStyle: 'none',
              backgroundColor: type === 'change' ? 'skyblue' : 'white',
              color: type === 'change' ? 'white' : 'black',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
              width:'220px',
              boxShadow:'0px 0px 5px',
              fontFamily:'fantasy',
            }}
            onClick={handleChangeReq}
          ><button style={{border:'none',fontWeight:'400',backgroundColor:'white',color:'#514141'}}>Change Request</button>
            
          </li>
        </ul>
      </div>
      <div style={{ flex: '1', padding: '20px', overflow: 'auto' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: 'blue',fontFamily:'fantasy' }}>Welcome to Relationship Manager Portal</h2>
          <span  onClick={handleLogout}style={{cursor:'pointer',color:'red',fontFamily:'fantasy',fontSize:'large'}} >
          <FiLogOut style={{ cursor: 'pointer', fontSize: '30px' }} />Logout
          </span>
        
        </div>
        <div className='relationType' style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: '30px' ,boxShadow:'0px 0px 12px #0c0c0f'}}>
            <p style={{color:'#0d4ce0',fontSize:'large'}}>Booking Details</p>
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
     
      {popupData && (
  <div className="popup" style={{paddingLeft:'20px',backgroundColor:'lightgray'}}>
    <div className="popup-content" style={{position:'relative',zIndex:'999',textAlign:'left',width:'299px',marginTop:'30px',color:'black',fontSize:'medium',fontWeight:'500'}}>
      <button onClick={handleClosePopup} style={{color:'red',width:'20%',borderRadius:'5px',fontWeight:'700'}}>X</button>
      {Array.isArray(popupData) ? (
        <ul>
          {popupData.map((passenger, index) => (
            <li key={index}>
              <h3>Passenger {index + 1}</h3>
              <p>Name: {passenger.firstName} {passenger.lastName}</p>
              <p>Gender: {passenger.gender === '1' ? 'Male' : 'Female'}</p>
              <p>Contact No: {passenger.ContactNo}</p>
              <p>Date of Birth: {new Date(passenger.DateOfBirth || "No data").toLocaleDateString()}</p>
              <p>Email: {passenger.email}</p>
              <p>City: {passenger.city}</p>
              <p>Ticket Number: {passenger.TicketNumber}</p>
              <p>Amount: {passenger.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <h5>Name: {popupData.name}</h5>
          <p>Phone: {popupData.phone}</p>
          <p>Email: {popupData.email}</p>
          <p>No Of People: {popupData.noOfPeople}</p>
          <p>Room: {popupData.room}</p>
        </>
      )}
    </div>
  </div>
)}

{popupBus && (
  <div className="popup" style={{paddingLeft:'20px',backgroundColor:'lightgray'}}>
    <div className="popup-content" style={{position:'relative',zIndex:'999',textAlign:'left',width:'299px',marginTop:'30px',color:'black',fontSize:'medium',fontWeight:'500'}}>
      <button onClick={handleClosePopup} style={{color:'red',width:'20%',borderRadius:'5px',fontWeight:'700'}}>X</button>
      <ul>
        {popupBus.map((passenger, index) => (
          <li key={index}>
            <h3>Passenger {index + 1}</h3>
            <p>Name: {passenger.firstName} {passenger.lastName}</p>
            <p>Contact No: {passenger.Phone}</p>
            <p>Email: {passenger.Email}</p>
            <p>City: {passenger.Address}</p>
            <p>Seat Number: {passenger.seatNumber}</p>
            <p>Amount: {passenger.Price}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default RegionBookings;


