
import React, { useState, useEffect } from 'react';
import { apiURL } from "../../../../Constants/constant";
import './EventList.css';
function EventList() {
    const [event, setEvent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const handleEventList = async () => {
        try {
            const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings`);
            
                const data = await response.json();
              //  console.log(data); 
                setEvent(data.result.docs);
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        handleEventList();
    }, []);

    // Logic for pagination 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    const currentItems = event.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next Page
    const nextPage = () => {
        if (currentPage < Math.ceil(event.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="event_data">
            {currentItems.length > 0 ? (
    <div style={{ overflowX: 'auto' }}>
        <table className='tableMarginTop'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Profession</th>
                    <th>Mobile</th>
                    <th>Event Name</th>
                    <th>Venue</th>
                    <th>Event Date</th>
                </tr>
            </thead>
            <tbody>
              {currentItems.map((item,index)=>
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.profession}</td>
                <td >{item?.contactNo?.mobile_number}</td>
                <td>{item?.eventDetails?.title}</td>
                <td>{item?.eventDetails?.venue}</td>
                <td style={{color: 'black'}}>{new Date(item?.eventDate).toLocaleDateString()}</td>

              </tr>
              )}
            </tbody>
        </table>
    </div>
) : (
    <p>No Event List</p>
)}

           
            <div className="pagination-container">
    <button className="arrow" onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
    <ul  id="num">
        {Array(Math.ceil(event.length / itemsPerPage))
            .fill()
            .map((_, index) => (
                <li
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </li>
            ))}
    </ul>
    <button
    className="arrow" 
        onClick={nextPage}
        disabled={currentPage === Math.ceil(event.length / itemsPerPage) || currentPage === 0}
    >&gt;</button>
</div>

        </div>
    );
}

export default EventList;

// import React, { useState, useEffect } from 'react';
// import { TextField, InputAdornment, Typography, Stack, Pagination } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Alert } from '@mui/material';
// import { apiURL } from '../../../../Constants/constant';
// import './EventList.css';

// const EventList = () => {
//     const [event, setEvent] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8);
//     const [loading, setLoading] = useState(true);
//     const [dataAvailable, setDataAvailable] = useState(true);

//     useEffect(() => {
//         async function fetchEventData() {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings`);
//                 const data = await response.json();
//                 console.log(data);
//                 setEvent(data.result.docs);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching event data:', error);
//                 setDataAvailable(false);
//                 setLoading(false);
//             }
//         }
//         fetchEventData();
//     }, []);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = event.slice(indexOfFirstItem, indexOfLastItem);

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const nextPage = () => {
//         if (currentPage < Math.ceil(event.length / itemsPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <div className="subada-table-container">
//             <div className="adsearch-bar">
//                 <TextField
//                     type="text"
//                     value={''}
//                     onChange={() => {}}
//                     placeholder="Search by name, ID, etc."
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//                 <Typography variant="h5" className="adtable-heading">
//                     Event List
//                 </Typography>
//             </div>
//             <div>
//                 {loading ? (
//                     <div className="loading-message">Loading...</div>
//                 ) : dataAvailable ? (
//                     <Stack direction="row" spacing={2} mt={2} justifyContent="center">
//                         <Pagination
//                             count={Math.ceil(event.length / itemsPerPage)}
//                             page={currentPage}
//                             onChange={(event, page) => handlePageChange(page)}
//                             color="primary"
//                         />
//                     </Stack>
//                 ) : (
//                     <div className="data-unavailable">
//                         <Alert severity="info" variant="outlined">
//                             Data is not available
//                         </Alert>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventList;



