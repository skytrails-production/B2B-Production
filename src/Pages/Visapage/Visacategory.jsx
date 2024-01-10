import React, { useState } from 'react';
import * as Yup from 'yup';
// import { Button, TextField, Typography, Box, Container, Box, TextField, MenuItem, Select, FormControl,InputLabel} from '@mui/material';
import { Button, TextField, Typography, Box, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import "./Visacountry.css";
import { apiURL } from '../../Constants/constant';

function Visacategory() {
  const [formData, setFormData] = useState({
    visaType: '',
    categoryName: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({
    visaType: '',
    categoryName: '',
    description: '',
  });

  const validationSchema = Yup.object({
    visaType: Yup.string().required('Visa Type is required'),
    categoryName: Yup.string().required('Category Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

   
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
        axios.post(`${apiURL.baseURL}/skyTrails/api/visa/createVisaCategory`, formData)
          .then(response => {
            setFormData({
              visaType: '',
              categoryName: '',
              description: '',
            });
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
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontSize: '2rem', color: 'white', backgroundColor: 'rgb(22,17,58)', fontWeight: 'bold' }}>
            Visa Category
          </Typography>
          <Box
      mb={2}
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FormControl fullWidth variant="outlined">
        <InputLabel id="visaType-label">Visa Type</InputLabel>
        <Select
          labelId="visaType-label"
          label="Visa Type"
          name="visaType"
          value={formData.visaType}
          onChange={handleInputChange}
          error={formErrors.visaType !== ''}
        >
          <MenuItem value="Tourist">Tourist</MenuItem>
          <MenuItem value="Employment">Employment</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Companion">Companion</MenuItem>
          <MenuItem value="Crewmember">Crewmember</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="PR">PR</MenuItem>
        </Select>
      </FormControl>
      {/* Display error message if there is any */}
      {formErrors.visaType && (
        <p style={{ color: 'red' }}>{formErrors.visaType}</p>
      )}
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
            <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: "rgb(22,17,58)" }}>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}

export default Visacategory;
