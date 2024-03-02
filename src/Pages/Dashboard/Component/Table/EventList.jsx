
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



// import React, { useState, useEffect } from 'react';
// import { Paper, Typography, Pagination, Stack } from '@mui/material';
// import { apiURL } from '../../../../Constants/constant';
// import './EventList.css';

// function EventList() {
//     const [events, setEvents] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         const fetchEventData = async () => {
//             try {
//                 const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${currentPage}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const data = await response.json();
//                 // console.log(data);
//                 setEvents(data.result.docs);
//                 setTotalPages(data.result.totalPages);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchEventData();
//     }, [currentPage]);

//     const handlePageChange = (event, newPage) => {
//         setCurrentPage(newPage);
//     };

//     return (
//         <Paper
//             className="event-list-container"
//             elevation={3}
//             style={{
//                 marginTop:'50px',
//                 position: 'relative',
//                 width: '100%',
//                 backgroundColor: 'white',
//                 padding: '20px',
//                 boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//             }}
//         >
//             <Typography variant="h5" className="eventlist-heading">
//                 All Event List
//             </Typography>
//             <div style={{ overflowX: 'auto'}}>
//                 <table className="event-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>City</th>
//                             <th>Profession</th>
//                             <th>Mobile</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {events.map((event, index) => (
//                             <tr key={index}>
//                                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.name}</td>
//                                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.city}</td>
//                                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.profession}</td>
//                                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.contactNo?.mobile_number}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
//                 <Pagination
//                     count={totalPages}
//                     page={currentPage}
//                     onChange={handlePageChange}
//                     color="primary"
//                 />
//             </Stack>
//         </Paper>
//     );
// }

// export default EventList;

// import React, { useState, useEffect } from 'react';
// import { Paper, Typography, Pagination, Stack,TextField, InputAdornment } from '@mui/material';
// import { apiURL } from '../../../../Constants/constant';
// import './EventList.css';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${currentPage}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setEvents(data.result.docs);
//         setTotalPages(data.result.totalPages);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchEventData();
//   }, [currentPage]);

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <Paper
//       className="city-package-container"
//       elevation={3}
//       style={{
//         marginTop: '50px',
//         position: 'relative',
//         width: '100%',
//         backgroundColor: 'white',
//         padding: '20px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <div className="city-package-heading" style={{ position: 'absolute', top: 10, zIndex: 3, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Typography variant="h5">All Event List</Typography>
//       </div>
//       <div style={{ overflowX: 'auto' }}>
//         <table className="city-package-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>City</th>
//               <th>Profession</th>
//               <th>Mobile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((event, index) => (
//               <tr key={index}>
//                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.name}</td>
//                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.city}</td>
//                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.profession}</td>
//                 <td style={{ backgroundColor: 'white', color: 'black' }}>{event.contactNo?.mobile_number}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Stack>
//     </Paper>
//   );
// };

// export default EventList;


import React, { useState, useEffect } from 'react';
import { Paper, Typography, Pagination, Stack, TextField, InputAdornment } from '@mui/material';
import { apiURL } from '../../../../Constants/constant';
import './EventList.css';

const EventList = () => {
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
      className="subada-table-container"
      elevation={3}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: 'absolute',
          top: 10,
          zIndex: 1,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          width: '92%',
        }}
      >
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: '20px', color: 'white',fontWeight:'500'}}>
          All Event List
        </Typography>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="city-package-table">
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
};

export default EventList;



// import React, { useState, useEffect } from 'react';
// import { Paper, Typography, Pagination, Stack, TextField, InputAdornment, CircularProgress } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import axios from 'axios';
// import SearchIcon from '@mui/icons-material/Search';
// import { apiURL } from '../../../../Constants/constant';


// const PAGE_SIZE = 10;

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);

//   const fetchData = async (pageNumber) => {
//     try {
//       const response = await axios.get(
//         `${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${pageNumber}`
//       );
//       setEvents(response.data.result.docs);
//       const totalCount = response.data.result.totalPages;
//       const totalPages = Math.ceil(totalCount / PAGE_SIZE);
//       setTotalPages(totalPages);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage, searchTerm]);

  


//   const columns = [
//     { field: 'name', headerName: 'Name', width: 200 },
//     { field: 'city', headerName: 'City', width: 200 },
//     { field: 'profession', headerName: 'Profession', width: 200 },
//     {
//       field: 'contactNo.mobile_number',
//       headerName: 'Mobile',
//       width: 200,
//     },
 
//   ];

//   return (
//     <>
      
//       <Paper
//         className="app-post-container"
//         elevation={3}
//         style={{
//           marginTop: '50px',
//           position: 'relative',
//           width: '100%',
//           backgroundColor: 'white',
//           padding: '20px',
//           boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <div className="app-post-search-bar">
//           <TextField
//             type="text"
//             value={searchTerm}
//             onChange={handleSearch}
//             placeholder="Search by name, city, profession, etc."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         {loading ? (
//           <div className="loader">
//             <CircularProgress />
//           </div>
//         ) : error ? (
//           <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
//             Error fetching data: {error}
//           </Typography>
//         ) : (
//           <div style={{ width: '100%' }}>
//             <DataGrid
//               rows={events}
//               columns={columns}
//               pageSize={10}
//               pagination
//               page={currentPage}
//               onPageChange={handlePageChange}
//               rowsPerPageOptions={[]}
//               components={{
//                 Toolbar: () => (
//                   <div style={{ marginTop: '10px' }}>
//                     <GridToolbar />
//                   </div>
//                 ),
//                 Pagination: () => null,
//               }}
//               getRowId={(row) => row._id}
//             />
//           </div>
//         )}
//         <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={(event, newPage) => handlePageChange(event, newPage)}
//             color="primary"
//           />
//         </Stack>
//       </Paper>
//     </>
//   );
// };

// export default EventList;


// import React, { useState, useEffect } from 'react';
// import { Paper, Typography, Pagination, Stack, TextField, InputAdornment, CircularProgress, makeStyles } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import axios from 'axios';
// import SearchIcon from '@mui/icons-material/Search';
// import { apiURL } from '../../../../Constants/constant';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(3),
//     position: 'relative',
//     width: '100%',
//     backgroundColor: 'white',
//     padding: theme.spacing(3),
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//   },
//   searchBar: {
//     marginBottom: theme.spacing(2),
//     display: 'flex',
//     alignItems: 'center',
//   },
//   loader: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '300px',
//   },
// }));

// const PAGE_SIZE = 10;

// const EventList = () => {
//   const classes = useStyles();

//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async (pageNumber) => {
//     try {
//       const response = await axios.get(
//         `${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${pageNumber}`
//       );
//       const totalCount = response.data.result.totalPages;
//       const totalPages = Math.ceil(totalCount / PAGE_SIZE);
//       setTotalPages(totalPages);
//       setEvents(response.data.result.docs);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage, searchTerm]);

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 200 },
//     { field: 'city', headerName: 'City', width: 200 },
//     { field: 'profession', headerName: 'Profession', width: 200 },
//     { field: 'contactNo.mobile_number', headerName: 'Mobile', width: 200 },
//   ];

//   return (
//     <Paper className={classes.container} elevation={3}>
//       <div className={classes.searchBar}>
//         <TextField
//           type="text"
//           value={searchTerm}
//           onChange={handleSearch}
//           placeholder="Search by name, city, profession, etc."
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </div>
//       {loading ? (
//         <div className={classes.loader}>
//           <CircularProgress />
//         </div>
//       ) : error ? (
//         <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
//           Error fetching data: {error}
//         </Typography>
//       ) : (
//         <div style={{ width: '100%' }}>
//           <DataGrid
//             rows={events}
//             columns={columns}
//             pageSize={10}
//             pagination
//             page={currentPage}
//             onPageChange={handlePageChange}
//             rowsPerPageOptions={[]}
//             components={{
//               Toolbar: () => (
//                 <div style={{ marginTop: '10px' }}>
//                   <GridToolbar />
//                 </div>
//               ),
//               Pagination: () => null,
//             }}
//             getRowId={(row) => row._id}
//           />
//         </div>
//       )}
//       <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(event, newPage) => handlePageChange(event, newPage)}
//           color="primary"
//         />
//       </Stack>
//     </Paper>
//   );
// };

// export default EventList;







