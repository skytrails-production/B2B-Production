import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { apiURL } from '../../../../../Constants/constant';
import './Career.css';

function Carrertable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/career/getallopening`);
      if (response.status === 404) {
        setErrorMessage(response.data.responseMessage);
      } else {
        setData(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to fetch data'); // Set a generic error message
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleDelete = async (record) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        setLoad(true); // Set load to true when deleting
        await axios.delete(`${apiURL.baseURL}/skyTrails/api/career/deleteopening`, { data: { id: record._id } });
        Swal.fire('Category deleted successfully!', '', 'success');
        fetchData(); // Refetch data after deletion
      } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('Failed to delete category', 'An error occurred', 'error');
      } finally {
        setLoad(false); // Set load to false after deletion
      }
    }
  };

  return (
    <div className="subada-table-container" style={{ backgroundColor: 'white', padding: '20px' }}>
      {loading && (
        <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5)', zIndex: 9999 }}>
          <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
        </div>
      )}

      <header className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="adtable-heading" style={{ marginLeft: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Career Table</h2>
        </div>
      </header>

      <TableContainer component={Paper} className="career-table-container">
        {errorMessage ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>{errorMessage}</p>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell align="center">Desired Profile</TableCell>
                <TableCell align="center">Experience</TableCell>
                <TableCell align="center">Job Type</TableCell>
                <TableCell align="center">Preferred Industry</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell scope="row" style={{color:"white"}}>{index + 1}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>{row.desiredProfile}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>{row.expirience}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>{row.jobType}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>{row.preferredIndustry}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>
                      <Button type="primary" danger onClick={() => handleDelete(row)} style={{ border: '1px solid red', color: 'red' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{color:"white",fontSize:"18px"}}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

export default Carrertable;
