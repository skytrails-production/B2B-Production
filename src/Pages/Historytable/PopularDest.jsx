// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     TextField, InputAdornment, Typography, Stack, Pagination, Paper,Button
// } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import SearchIcon from '@mui/icons-material/Search';
// import { apiURL } from '../../Constants/constant';

// const PopularDest=()=> {
//     const [loading,setLoading]=useState(true);
//     const pageSize=5;
//     const[currentPage,setCurrentPage]=useState(1);
//     const [searchTerm,setSearchTerm]=useState('');
//     const[totalPages,setTotalPages]=useState(0);
//     const[dest,setDest]=useState([]);
//     const[murgi,setMurgi]=useState(null);
//     const [st,setSt]=useState(null);
//     //api fetching
//     useEffect(()=>{
//             async function fetchDest(){
//             try{
//          const response=await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getPopularDestination`,
// {
//     params: {
//         page: currentPage,
//         size: pageSize,
//         search: searchTerm,
//     },
// }
// ); 
//    console.log(response);
//     setDest(response.data.result);
//             }catch(error){
//                 console.error("Error fetching details",error);
//                 setLoading(false);

//             }
//         }
//         fetchDest();
//     },[currentPage,searchTerm]);
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//         setCurrentPage(1);
//     };
//     const handleData =async(destinationId,status)=>{
//         try{
//          setMurgi(destinationId);
//          setSt(status);
//          const res=await axios.put(`${apiURL.baseURL}/skyTrails/api/admin/updatePopularDestination`,
//         {destinationId:destinationId,
//         status:status}

//         );
//         PopularDest();
//         }catch(error){
//             console.error("error",error);
//         }
//     }
    
//     const columns =[
       
//         {field:'images',headerName:'Profile',width:200,
//        renderCell:(params)=>(
//         <img
//         src= {
//             !params?.row?.images
//             ? 'No data'
//             : params?.row?.images
//         }
//         alt="Profile"
//         style={{width:50,height:50,borderRadius:'50%'}}
//         />
//        ),
//     },
//         {field:'city',headerName:'City',width:220,valueGetter:(params)=>params.row.city || 'No Data'},
//         {field:'discount',headerName:'Discount',width:220,valueGetter:(params)=>params.row.discount || 'No Data'},
//         {field:'actions',headerName:'Actions',width:'220',
//         renderCell:(params)=>(
//             <div style={{ display: "flex", justifyContent: "space-between" ,width:'100%'}}>
//             <Button
//               variant="outlined"
//               color="error"
//               size="small"
//               onClick={() => handleData(params.row._id,params.row.status)}
//             >
//                 ReAction
//                 </Button>
//                 </div>
//         ),
//     },

//     ]
//   return (
//     <div className='subada-table-container' style={{ position: 'relative', width: '100%' }}>
//     <div className='adsearch-bar' style={{ position: 'absolute', top: '10', zIndex: 1, fontWeight: 'bold' }}>
//         <TextField
//             type='text'
//             value={searchTerm}
//             onChange={handleSearch}
//             placeholder='Search by name, ID, etc.'
//             InputProps={{
//                 startAdornment: (
//                     <InputAdornment position='start'><SearchIcon /></InputAdornment>
//                 ),
//             }}
//         />
//         <Typography variant='h5' className='adtable-heading'>Popular Destination</Typography>
//     </div>
//     <Paper>
//         <DataGrid
//             rows={dest}
//             columns={columns}
//             pageSize={pageSize}
//             rowsPerPageOptions={[pageSize]}
//             pagination
//             getRowId={(row) => row._id}
//             style={{ width: '100%' }}
//             components={{
//                 Toolbar: () => (
//                     <div style={{ marginTop: '20px' }}>
//                         <GridToolbar />
//                     </div>
//                 ),
//                 Pagination: () => null,
//             }}
//         />
//     </Paper>
//     <div className='paginate' >
//         {/* <Stack spacing={2} direction='row' justifyContent='center'>
//             <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={(event, page) => handlePageChange(page)}
//                 color='primary'
//             />
//         </Stack> */}
//     </div>
// </div>
//   )
// }

// export default PopularDest;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, InputAdornment, Typography, Paper, Button
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../Constants/constant';

const PopularDest = () => {
    const [destinations, setDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getPopularDestination`, {
                params: {
                    page: 1, // Assuming you always want to fetch the first page initially
                    size: 5, // Assuming page size is fixed
                    search: searchTerm,
                },
            });
            setDestinations(response.data.result);
        } catch (error) {
            console.error("Error fetching details", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAction = async (destinationId, action) => {
        try {
            let status;
            switch (action) {
                case 'active':
                    status = 'ACTIVE';
                    break;
                case 'block':
                    status = 'BLOCKED';
                    break;
                case 'delete':
                    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
                    if (!confirmDelete) return;
                    status = 'DELETE';
                    break;
                default:
                    return;
            }

            await axios.put(`${apiURL.baseURL}/skyTrails/api/admin/updatePopularDestination`, {
                destinationId: destinationId,
                status: status
            });
            // Fetch updated data after action
            fetchDestinations();
        } catch (error) {
            console.error("error", error);
        }
    };

    const columns = [
        {
            field: 'images',
            headerName: 'Profile',
            width: 200,
            renderCell: (params) => (
                <img
                    src={params?.row?.images || 'No data'}
                    alt="Profile"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
            ),
        },
        { field: 'city', headerName: 'City', width: 220, valueGetter: (params) => params.row.city || 'No Data' },
        { field: 'discount', headerName: 'Discount', width: 220, valueGetter: (params) => params.row.discount || 'No Data' },
        {field:'status',headerName:'Status',width:220,valueGetter:(params)=>params.row.status|| 'No Data'},
        {
            field: 'actions',
            headerName: 'Actions',
            width: '350',
            renderCell: (params) => (
                <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleAction(params.row._id, 'active')}
                        style={{marginRight:'30px'}}
                    >
                        Active
                    </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        size="small"
                        onClick={() => handleAction(params.row._id, 'block')}
                        style={{marginRight:'30px'}}
                    >
                        Block
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleAction(params.row._id, 'delete')}
                        style={{marginRight:'30px'}}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className='subada-table-container' style={{ position: 'relative', width: '100%' }}>
            <div className='adsearch-bar' style={{ position: 'absolute', top: '10', zIndex: 1, fontWeight: 'bold' }}>
                <TextField
                    type='text'
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='Search by name, ID, etc.'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'><SearchIcon /></InputAdornment>
                        ),
                    }}
                />
                <Typography variant='h5' className='adtable-heading'>Popular Destination</Typography>
            </div>
            <Paper>
                <DataGrid
                    rows={destinations}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    pagination
                    getRowId={(row) => row._id}
                    style={{ width: '100%' }}
                    components={{
                        Toolbar: () => (
                            <div style={{ marginTop: '20px' }}>
                                <GridToolbar />
                            </div>
                        ),
                        Pagination: () => null,
                    }}
                />
            </Paper>
        </div>
    );
}

export default PopularDest;
