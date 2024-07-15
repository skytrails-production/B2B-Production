import React, { useState, useEffect } from 'react';
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import { apiURL } from '../../../../../Constants/constant';
import Swal from "sweetalert2";
import { Form, Input, Select, Button, Empty } from 'antd';
import {  Spin } from 'antd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Career.css";

function Careercategoryvalue() {
  const [load, setLoad] = useState(false);
  const [parentcategory, setParentCategory] = useState();
  const [loaded, setLoaded] = useState(false);
  const [jobtable, setJobTable] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/career/getjobcategory`);
        setCategories(response.data.data.result);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // setErrorMessage(response.data.responseMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchtable = async () => {
    setLoaded(false);
    try {
      const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/career/getskyjobcategory`);
      setJobTable(response.data.data.result);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchtable();
  }, []);

  const onFinish = async (values) => {
    const categoryName = values.Categoryname.toUpperCase();

    if (!/^[A-Z\s]+$/.test(categoryName)) {
      Swal.fire("Category Name should contain only letters and spaces.");
      return;
    }

    setLoad(true);
    try {
      const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/career/skyjobcategory`, {
        categoryName,
        description: values.description,
        parentCategory: values.parentcategory 
      });
      form.resetFields();
      Swal.fire("Form submitted successfully!");
      fetchtable();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoad(false);
    }
  };

  const handleDelete = async (record) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this category?",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        setLoad(true);
        const response = await axios.delete(`${apiURL.baseURL}/skyTrails/api/career/deleteskyjobcategory?id=${record._id}`);
        if (response.data.success === 1) {
          Swal.fire("Category deleted successfully!", "", "success");
          fetchtable();
        } else {
          Swal.fire("Failed to delete category", response.data.message, "error");
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire("Failed to delete category", "An error occurred");
      } finally {
        setLoad(false);
      }
    }
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
        title: 'Department Name',
        key: 'departmentName',
        render: (text, record) => (
          record.parentCategory ? record.parentCategory.categoryName : 'N/A'
        ),
      },
      
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

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
            <h2>Job Category</h2>
          </div>
        </header>
        <Form
          form={form}
          name="demo_form"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "60px" }}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "4px" }}>
            <Form.Item
              style={{ width: "100%" }}
              name="Categoryname"
              label="Category Name"
              rules={[{ required: true, message: 'Fill this field' }]}
            >
              <Input  />
            </Form.Item>

            {/* <Form.Item
              style={{ width: "100%" }}
              name="parentcategory"
              label="Skyjob SubCategory"
              rules={[{ required: true, message: 'Please select an option' }]}
            >
              <Select loading={loading} placeholder="Select a category">
                {categories.map(category => (
                  <Option key={category._id} value={category._id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
      style={{ width: "100%" }}
      name="parentcategory"
      label="Skyjob SubCategory"
      rules={[{ required: true, message: 'Please select an option' }]}
    >
       {categories && categories.length > 0 ? (
        <Select loading={loading} placeholder="Select a category">
          {categories.map(category => (
            <Option key={category._id} value={category._id}>
              {category.categoryName}
            </Option>
          ))}
        </Select>
      ) : (
     <div>No data Found</div>
      )}
    </Form.Item>
          </div>

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

      <div className="subada-table-container" elevation={3} style={{ backgroundColor: "white" }}>
        <header className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="adtable-heading" style={{ marginLeft: "20px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h2>Job Category Table</h2>
          </div>
        </header>
        {/* <Spin spinning={!loaded}>
          <Table dataSource={jobtable} columns={columns} rowKey="_id" style={{color: "black" }} />
        </Spin> */}
        <Spin spinning={!loaded}>
    <TableContainer component={Paper} className="career-table-container">
      {errorMessage ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>{errorMessage}</p>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell align="center" >Category Name</TableCell>
              <TableCell align="center" >Department Name</TableCell>
              <TableCell align="center" >Description</TableCell>
              <TableCell align="center" >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobtable && jobtable.length > 0 ? (
              jobtable.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell scope="row" style={{color:"white"}}>{index + 1}</TableCell>
                  <TableCell align="center" style={{color:"white"}}>{row.categoryName}</TableCell>
                  <TableCell align="center" style={{color:"white"}}>{row.parentCategory ? row.parentCategory.categoryName : 'N/A'}</TableCell>
                  <TableCell align="center" style={{color:"white"}}>{row.description}</TableCell>
                  <TableCell align="center">
                    <Button type="primary" danger onClick={() => handleDelete(row)} style={
                      {color:"red",border:"1px solid red"}
                    }>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{color:"white",fontSize:"18px"}}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  </Spin>
      </div>
    </>
  );
}

export default Careercategoryvalue;
