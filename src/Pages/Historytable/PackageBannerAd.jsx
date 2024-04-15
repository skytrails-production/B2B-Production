// import React,{ useState,useEffect} from 'react';
// import axios from 'axios';
// import{
//     TextField,InputAdornment,Typography,Stack,Pagination,Paper,Button} from '@mui/material';
//    import { DataGrid,GridToolbar} from '@mui/x-data-grid';
//    import { apiURL } from '../../Constants/constant';
//    import SearchIcon  from '@mui/icons-material/Search';
//       const PackageBannerAd=()=> {
//     const [loading,setLoading] =useState(true);
//     const pageSize=5;
//     const [currentPage,setCurrentPage]=useState(1);
//     const [totalPages,setTotalPages]=useState(0);
//     const [searchTerm,setSearchTerm]=useState('');
//     const[pac,setPac]=useState([]);
//     const[bhej,setBhej]=useState(null);
//     const[dhoom,setDhoom]=useState(null);

//     //api fetching
//     useEffect(()=>{
//         async function fetchData(){
//             try{
//                 const response =await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getPackageBanner`,
//                 {
//                     params: {
//                         page: currentPage,
//                         size: pageSize,
//                         search: searchTerm,
//                     },
//                 }
//             );
//             setPac(response.data.result);
//             setLoading(false)
//             console.log(response);
//             }catch(error){
//                 console.error('Error fetching package Banner',error);
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     },[currentPage,searchTerm]);
//     const handlePageChange=(page)=>{
//         setCurrentPage(page);
//     }
//     const handleSearch=(event)=>{
//         setSearchTerm(event.target.value);
//         setCurrentPage(1);
//     }
//     //  const handleDatas =async(bannerId,status)=>{
//     //      try{
//     //         setBhej(bannerId);
//     //         setDhoom(status);
//     //       const res=await axios.put(`${apiURL.baseURL}/skyTrails/api/admin/updatePackageBanner`,
//     //       {bannerId:bannerId,
//     //        status:status
//     //     }
        
//     //     );
//     //      }catch(error){
//     //         console.error("error",error);
//     //      }
//     // }
//     const handleDatas = async (bannerId, status) => {
//         try {
//             // Toggle status between 'Active' and 'Deactive'
//             const newStatus = status === 'Active' ? 'Deactive' : 'Active';
            
//             // Update the status locally before the API call
//             const updatedPac = pac.map(item => {
//                 if (item._id === bannerId) {
//                     return { ...item, status: newStatus };
//                 }
//                 return item;
//             });
//             setPac(updatedPac);
    
//             // Call API to update the status
//             const res = await axios.put(`${apiURL.baseURL}/skyTrails/api/admin/updatePackageBanner`, {
//                 bannerId: bannerId,
//                 status: newStatus
//             });
            
//             // Optionally, handle response or errors here
//         } catch (error) {
//             console.error("error", error);
//         }
//     }
//     const columns =[
      
//        {field:'packageImage', headerName:'Images',width:200,
//        renderCell:(params)=>(
//         <img
//         src={
//             !params?.row?.packageImage
//             ?'no data'
//             : params?.row?.packageImage            
//         }
//         alt="Profile"
//         style={{width:50,height:50,borderRadius:'50%'}}
//         />
//        )
//     },
//        {field:'packageType',headerName:'Package Type',width:220,valueGetter:(params)=>params.row.packageType || 'No Data'},
//        {field:'status',headerName:'Status',width:220,valueGetter:(params)=>params.row.status || 'No Data'},
//        {field:'actions',headerName:'Actions',width:220,
//        renderCell:(params)=>(
//         <div style={{ display: "flex", justifyContent: "space-between" ,width:'100%'}}>
//             <Button
//               variant="outlined"
//               color="error"
//               size="small"
//               onClick={() => handleDatas(params.row._id,params.row.status)}
//             >
//                 ReAction
//                 </Button>
//                 </div>
//        ),
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
//         <Typography variant='h5' className='adtable-heading'>Package Banner</Typography>
//     </div>
//     <Paper>
//         <DataGrid
//             rows={pac}
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

// export default PackageBannerAd
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, InputAdornment, Typography, Paper, Button
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../Constants/constant';

const PackageBannerAd = () => {
    const [loading, setLoading] = useState(true);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [pac, setPac] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getPackageBanner`, {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchTerm,
                    },
                });
                setPac(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching package Banner', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

    const handleAction = async (bannerId, action) => {
        try {
            let newStatus;
            if (action === 'Delete') {
                newStatus = 'DELETE';
            } else if (action === 'Block') {
                newStatus = 'BLOCKED';
            } else { // Assuming 'ReAction' changes status to 'Active'
                newStatus = 'ACTIVE';
            }

            // Update status locally and call API
            const updatedPac = pac.map(item => {
                if (item._id === bannerId) {
                    return { ...item, status: newStatus };
                }
                return item;
            });
            setPac(updatedPac);

            await axios.put(`${apiURL.baseURL}/skyTrails/api/admin/updatePackageBanner`, {
                bannerId: bannerId,
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    const columns = [
        {field:'packageImage', headerName:'Images',width:200,
                renderCell:(params)=>(
                 <img
                 src={
                     !params?.row?.packageImage
                     ?'no data'
                     : params?.row?.packageImage            
                 }
                 alt="Profile"
                 style={{width:50,height:50,borderRadius:'50%'}}
                 />
                )
           },
        { field: 'packageType', headerName: 'Package Type', width: 220 },
        { field: 'status', headerName: 'Status', width: 220 },
        {
            field: 'actions', headerName: 'Actions', width: 350,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handleAction(params.row._id, params.row.status)}
                        style={{marginRight:'30px'}}
                    >
                        Active
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={() => handleAction(params.row._id, 'Block')}
                        style={{marginRight:'30px'}}
                    >
                        Block
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleAction(params.row._id, 'Delete')}
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
                 <Typography variant='h5' className='adtable-heading'>Package Banner</Typography>
            </div>
             <Paper>
                 <DataGrid
                     rows={pac}
                     columns={columns}
                     pageSize={pageSize}
                     rowsPerPageOptions={[pageSize]}
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
             <div className='paginate' >
                 {/* <Stack spacing={2} direction='row' justifyContent='center'>
        //             <Pagination
        //                 count={totalPages}
        //                 page={currentPage}
        //                 onChange={(event, page) => handlePageChange(page)}
        //                 color='primary'
        //             />
        //         </Stack> */}
             </div>
        </div>
        // <div style={{ height: 400, width: '100%' }}>
        //     <div style={{ marginBottom: 20 }}>
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
        //         <Typography variant='h5'>Package Banner</Typography>
        //     </div>
        //     <Paper>
        //         <DataGrid
        //             rows={pac}
        //             columns={columns}
        //             pageSize={pageSize}
        //             rowsPerPageOptions={[pageSize]}
        //             pagination
        //             getRowId={(row) => row._id}
        //             components={{
        //                 Toolbar: () => (
        //                     <div>
        //                         <GridToolbar />
        //                     </div>
        //                 ),
        //                 Pagination: () => null,
        //             }}
        //         />
        //     </Paper>
        // </div>
    );
}

export default PackageBannerAd;


