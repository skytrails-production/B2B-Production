import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
//import "./Visacountry.css";
import { apiURL } from '../../../../Constants/constant';

function VisacountrysForm() {
  const [formData, setFormData] = useState({
    documentName: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({
    documentName: '',
    description: '',
  });

  const validationSchema = Yup.object({
    documentName: Yup.string().required('Document Name is required'),
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

    // Validate all fields
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios.post(`${apiURL.baseURL}/skyTrails/api/visa/document/createDocType`, formData)
          .then(response => {
            // console.log('API Response:', response.data.result);
            setFormData({
              documentName: '',
              description: '',
            });

            // const createdDocument = response.data.result;
            // console.log('Document Type created successfully!');
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
      <Container component="main" maxWidth="sm" className='visaform'>
        <form className="formacontainer2" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontSize: '2rem', color: 'white', backgroundColor: '#E73C33', fontWeight: 'bold' }}>
            Document Type
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
            <TextField
              label="Document Name"
              variant="outlined"
              fullWidth
              multiline
              name="documentName"
              value={formData.documentName}
              onChange={handleInputChange}
              error={formErrors.documentName !== ''}
              helperText={formErrors.documentName}
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

export default VisacountrysForm;
