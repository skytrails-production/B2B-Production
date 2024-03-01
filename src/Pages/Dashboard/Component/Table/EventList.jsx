
// import React, { useState, useEffect } from 'react';
// import { apiURL } from "../../../../Constants/constant";
// import './EventList.css';

// function EventList() {
//     const [event, setEvent] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);
//     const [totalDocs, setTotalDocs] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         const fetchEventData = async () => {
//             try {
//                 const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${currentPage}&limit=${itemsPerPage}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const data = await response.json();
//                // setEvent(prevState => [...prevState, ...data.result.docs]); // Append new data to existing data
//                setEvent(data.result.docs);  
//                setTotalDocs(data.result.totalDocs || 0);
//                 setTotalPages(data.result.totalPages || 0);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchEventData();
//     }, [currentPage, itemsPerPage]);

//     const nextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };
//     const prevPage=()=>{
//         if(currentPage!==1){
//             setCurrentPage(prevPage => prevPage - 1);
//         }
//     }

//     return (
//         <div className="event_data">
//             {event.length > 0 ? (
//                 <div style={{ overflowX: 'auto' }}>
//                     <table className='tableMarginTop'>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>City</th>
//                                 <th>Profession</th>
//                                 <th>Mobile</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {event.map((item, index) =>
//                                 <tr key={index}>
//                                     <td>{item?.name}</td>
//                                     <td>{item?.city}</td>
//                                     <td>{item?.profession}</td>
//                                     <td>{item?.contactNo?.mobile_number}</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No Event List</p>
//             )}

//              <div className="pagination-container">
//                 <button className="arrow" onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
//                 <span> {currentPage} </span>
//                 <button className="arrow" onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
//             </div>
//         </div>
//     );
// }

// export default EventList;

// function EventList() {
//     const [event, setEvent] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8);

//     const handleEventList = async () => {
//         try {
//             const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings`);
            
//                 const data = await response.json();
//                console.log(data); 
//                 setEvent(data.result.docs);
//         } catch (error) {
//             // Handle error
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect(() => {
//         handleEventList();
//     }, []);

//     // Logic for pagination 
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
//     const currentItems = event.slice(indexOfFirstItem, indexOfLastItem);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Previous page
//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Next Page
//     const nextPage = () => {
//         if (currentPage < Math.ceil(event.length / itemsPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <div className="event_data">
//             {currentItems.length > 0 ? (
//     <div style={{ overflowX: 'auto' }}>
//         <table className='tableMarginTop'>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Profession</th>
//                     <th>Mobile</th>
//                     <th>Event Name</th>
//                     <th>Venue</th>
//                     <th>Event Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item,index)=>
//               <tr key={index}>
//                 <td>{item?.name}</td>
//                 <td>{item?.profession}</td>
//                 <td >{item?.contactNo?.mobile_number}</td>
//                 <td>{item?.eventDetails?.title}</td>
//                 <td>{item?.eventDetails?.venue}</td>
//                 <td style={{color: 'black'}}>{new Date(item?.eventDate).toLocaleDateString()}</td>

//               </tr>
//               )}
//             </tbody>
//         </table>
//     </div>
// ) : (
//     <p>No Event List</p>
// )}

           
//             <div className="pagination-container">
//     <button className="arrow" onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
//     <ul  id="num">
//         {Array(Math.ceil(event.length / itemsPerPage))
//             .fill()
//             .map((_, index) => (
//                 <li
//                     key={index}
//                     onClick={() => paginate(index + 1)}
//                     className={currentPage === index + 1 ? 'active' : ''}
//                 >
//                     {index + 1}
//                 </li>
//             ))}
//     </ul>
//     <button
//     className="arrow" 
//         onClick={nextPage}
//         disabled={currentPage === Math.ceil(event.length / itemsPerPage) || currentPage === 0}
//     >&gt;</button>
// </div>

//         </div>
//     );
// }

// export default EventList;



import React, { useState, useEffect } from 'react';
import { Paper, Typography, Pagination, Stack } from '@mui/material';
import { apiURL } from '../../../../Constants/constant';
import './EventList.css';

function EventList() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEvents(data.result.docs);
                setTotalPages(data.result.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEventData();
    }, [currentPage]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Paper
            className="event-list-container"
            elevation={3}
            style={{
                marginTop:'50px',
                position: 'relative',
                width: '100%',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" className="eventlist-heading">
                All Event List
            </Typography>
            <div style={{ overflowX: 'auto'}}>
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Profession</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.name}</td>
                                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.city}</td>
                                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.profession}</td>
                                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.contactNo?.mobile_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Paper>
    );
}

export default EventList;







