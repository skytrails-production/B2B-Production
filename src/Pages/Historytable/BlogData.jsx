
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, InputAdornment, Typography, Stack, Pagination, Paper
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../Constants/constant'
function BlogData() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      async function fetchBlog() {
          try {
              const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/blog/getAllBlogs`);
              setBlog(response.data.result); // Assuming your API returns data in the response
              setLoading(false);
              console.log(response);
          } catch (error) {
              console.error('Error fetching blog data:', error);
              setLoading(false);
          }
      }
      fetchBlog();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
};

const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
};
  const columns = [
    {field:'title',headerName:'Title',width:'180'},
    {
        field: 'content',
        headerName: 'Content',
        width: '330',
        valueGetter: (params) => params.row.content || 'No Data',
        cellRenderer: (params) => `<div style="max-height: 200px; overflow-y: auto;">${params.value}</div>`
      }
      

  ]
  return (
    <div className='subada-table-container' style={{ position: 'relative', width: '100%' ,marginTop:'50px'}}>
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
        <Typography variant='h5' className='adtable-heading'>Blog Data</Typography>
    </div>
    <Paper>
        <DataGrid
            rows={blog}
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
        <Stack spacing={2} direction='row' justifyContent='center'>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
                color='primary'
            />
        </Stack>
    </div>
</div>

  )
}

export default BlogData