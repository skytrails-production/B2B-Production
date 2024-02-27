import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Button, TextField, Typography, Box, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import "./Visacountry.css";
import { apiURL } from "../../../../Constants/constant";
function Documentcategorys() {
  const [formData, setFormData] = useState({
    categoryName: '',
    documentTypes: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({
    categoryName: '',
    documentTypes: '',
    description: '',
  });

  const [documentOptions, setDocumentOptions] = useState([]);

  useEffect(() => {
    axios.get(`${apiURL.baseURL}/skyTrails/api/visa/document/getDocType`)
      .then(response => {
        const result = response.data.result;
        setDocumentOptions(result);
      })
      .catch(error => {
        console.error('Error fetching document types:', error);
      });
  }, []);

  const validationSchema = Yup.object({
    categoryName: Yup.string().required('Category Name is required'),
    documentTypes: Yup.string().required('Document Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Manually validate the changed field
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch((error) => setFormErrors({ ...formErrors, [name]: error.message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios.post(`${apiURL.baseURL}/skyTrails/api/visa/document/createDocumentCategory`, formData)
          .then(response => {
            setFormData({
              categoryName: '',
              documentTypes: '',
              description: '',
            });

            // console.log('Document Category created successfully!');
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
      })
      .catch(errors => {
        const newErrors = {};
        errors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setFormErrors(newErrors);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="sm" className='visaform' >
        <form className="formacontainer2" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontSize: '2rem', color: 'white', backgroundColor: '#E73C33', fontWeight: 'bold' }}>
            Document Category
          </Typography>
          <Box
            mb={2}
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="documentTypes-label">Document Name</InputLabel>
              <Select
                labelId="documentTypes-label"
                id="documentTypes"
                label="Document Name"
                name="documentTypes"
                value={formData.documentTypes}
                onChange={handleInputChange}
                error={formErrors.documentTypes !== ''}
                displayEmpty
              >
                <MenuItem value="" disabled></MenuItem>
                {documentOptions.map(option => (
                  <MenuItem key={option._id} value={option.documentName}>{option.documentName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              multiline
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              error={formErrors.categoryName !== ''}
              helperText={formErrors.categoryName}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={formErrors.description !== ''}
              helperText={formErrors.description}
            />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#E73C33'}}>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Documentcategorys;
