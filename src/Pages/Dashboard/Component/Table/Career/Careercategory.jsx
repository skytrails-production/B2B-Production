import React, { useState,useEffect } from 'react';
import { CircularProgress } from "@mui/material";
import { Form, Input, Button, TextArea } from 'antd';
import {  TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { apiURL } from '../../../../../Constants/constant';
import Swal from "sweetalert2";
import "./Career.css";
function Careercategory() {
    const [load, setLoad] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [load, setLoad] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { TextArea } = Input;

    const onFinish = async (values) => {
      const categoryName = values.Categoryname.toUpperCase();

      // Check if categoryName contains only alphabetic characters
      if (!/^[A-Z\s]+$/.test(categoryName)) {
        Swal.fire("Category Name should contain only letters and spaces.");
        return;
    }

        setLoad(true);
        try {
            const response = await axios.post( `${apiURL.baseURL}/skyTrails/api/career/jobcategory`, {
                categoryName: categoryName,
                description: values.description,
                
            });
            if (response.data.message === "success") {
              form.resetFields();
              Swal.fire("Success", "Form submitted successfully!", "success");
              fetchData();
          } else {
              Swal.fire( (response.data.message).toUpperCase());
              form.resetFields();
          }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoad(false);
        }
    };




    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true when fetching data
          const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/career/getjobcategory`);
        //   if (response.status === 404) {
            // setErrorMessage(response.data.responseMessage);
        //   } else {
            setData(response.data.data.result);
            // console.log("responsehhhhhhhhhhhhhhh",response);
        //   }
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
            await axios.delete(`${apiURL.baseURL}/skyTrails/api/career/deletejobcategory?id=${record._id}`);
            Swal.fire('Category deleted successfully!', '', 'success');
            fetchData(); // Refetch data after deletion
          } catch (error) {
            console.error('Error deleting category:', error);
            Swal.fire('Failed to delete category', 'An error occurred', 'error');
          } finally {
            setLoad(false);
          }
        }
      };
    
    

  
    return (
        <>
      <div className="subada-table-container" elevation={3} style={{ backgroundColor: "white" }}>
          {load && (
              <div
                  className="loader-overlay"
                  style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(255, 255, 255, 0.5)",
                      zIndex: 9999,
                  }}
              >
                  <CircularProgress
                      color="primary"
                      size={50}
                      thickness={3}
                      style={{
                          position: "absolute",
                          top: "50%",
                          left: "49.8%",
                          transform: "translate(-50%, -50%)",
                      }}
                  />
              </div>
          )}
          <header className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="adtable-heading" style={{ marginLeft: "20px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h2>Career Department</h2>
              </div>
          </header>
          <Form
              form={form}
              name="demo_form"
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: "60px" }}
          >
              <Form.Item
                  name="Categoryname"
                  label="Department"
                  rules={[{ required: true, message: 'Fill this field' }]}
              >
                  <Input placeholder="IT, SALES, MARKETING" />
              </Form.Item>

             
              <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please input your message!' }]}
              >
                  <TextArea rows={4} placeholder="Write Description" />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
          </Form>
      </div>
      <div>

      <header className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="adtable-heading" style={{ marginLeft: "20px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h2>Career Department Table</h2>
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
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell>Action</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell scope="row" style={{color:"white"}}>{index + 1}</TableCell>
                    <TableCell align="center" style={{color:"white"}}>{row.categoryName}</TableCell>
                    <TableCell align='center' style={{color:"white"}}>{row.description}</TableCell>
                    <TableCell align="right" style={{color:"white"}}>
                      <Button type="primary" danger onClick={() => handleDelete(row)} style={{ border: '1px solid red' }}>
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
      </>
  );
}

export default Careercategory;
