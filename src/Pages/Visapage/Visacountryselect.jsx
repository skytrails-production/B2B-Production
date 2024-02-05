import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import "./Visacountry.css";
import { apiURL } from "../../Constants/constant";

function Visacountryselect() {
  const [formData, setFormData] = useState({
    countryName: "",
    issuedType: "",
    continent: "",
    daysToProcess: "",
    visaCategoryName: "",
  });

  const [formErrors, setFormErrors] = useState({
    countryName: "",
    issuedType: "",
    continent: "",
    daysToProcess: "",
    visaCategoryName: "",
    governmentFee: "",
    platFormFees: "",
  });

  const [visaCategories, setVisaCategories] = useState([]);

  const [additionalFields, setAdditionalFields] = useState({
    governmentFee: "",
    platFormFees: "",
    daysToProcess: "",
  });

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country Name is required"),
    issuedType: Yup.string().required("Issued Type is required"),
    continent: Yup.string().required("Continent is required"),
    daysToProcess: Yup.string().required("Days To Process is required"),
    visaCategoryName: Yup.string().required("Visa Category Name is required"),
    governmentFee: Yup.string().when('issuedType', {
      is: (val) => val === 'WEEKLY VISA' || val === 'MONTHLY VISA',
      then: Yup.string().required('Government Fee is required'),
    }),
    platFormFees: Yup.string().when('issuedType', {
      is: (val) => val === 'WEEKLY VISA' || val === 'MONTHLY VISA',
      then: Yup.string().required('PlatForm Fees is required'),
    }),
    daysToProcess: Yup.string().when('issuedType', {
      is: (val) => val === 'WEEKLY VISA' || val === 'MONTHLY VISA',
      then: Yup.string().required('DaysToProcess Fees is required'),
    }),
  });

  useEffect(() => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/api/visa/getVisaCategory`)
      .then((response) => {
        const categories = response.data.result;
        if (categories && categories.length > 0) {
          setVisaCategories(categories);
          setFormData({
            ...formData,
            visaCategoryName: categories[0].categoryName,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching visa categories:", error);
      });
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "issuedType" && (value === "WEEKLY VISA" || value === "MONTHLY VISA")) {
      setAdditionalFields({
        governmentFee: "",
        platFormFees: "",
        daysToProcess: "",
      });
    } else {
      setAdditionalFields({});
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((error) =>
        setFormErrors({ ...formErrors, [name]: error.message })
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios
          .post(`${apiURL.baseURL}/skyTrails/api/visa/createVisa`, formData)
          .then((response) => {
            setFormData({
              countryName: '',
              issuedType: '',
              continent: '',

              visaCategoryName: '',
            });
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
          });
      })
      .catch((errors) => {
        const newErrors = {};
        errors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setFormErrors(newErrors);
      });
  };

  return (
    <>
      <>
        <Container component="main" maxWidth="sm" className="visaform" style={{ paddingTop: "80px" }}>
          <form className="formacontainer2" onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "white",
                backgroundColor: "rgb(22,17,58)",
                fontWeight: "bold",
              }}
            >
              Visa Country
            </Typography>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="issuedType-label">Issued Type</InputLabel>
                <Select
                  labelId="issuedType-label"
                  label="Issued Type"
                  name="issuedType"
                  value={formData.issuedType}
                  onChange={handleInputChange}
                  error={formErrors.issuedType !== ""}
                >
                  <MenuItem value="NO VISA">NO VISA</MenuItem>
                  <MenuItem value="WEEKLY VISA">WEEKLY VISA</MenuItem>
                  <MenuItem value="MONTHLY VISA">MONTHLY VISA</MenuItem>
                  <MenuItem value="VISA ON ARRIVAL">VISA ON ARRIVAL</MenuItem>
                </Select>
              </FormControl>
              {formErrors.issuedType && (
                <p style={{ color: "red" }}>{formErrors.issuedType}</p>
              )}
            </Box>
            <Box mb={2}>
              <TextField
                label="Continent"
                variant="outlined"
                fullWidth
                multiline
                name="continent"
                value={formData.continent}
                onChange={handleInputChange}
                error={formErrors.continent !== ""}
                helperText={formErrors.continent}
              />

              {formErrors.continent && (
                <p style={{ color: "red" }}>{formErrors.continent}</p>
              )}
            </Box>
            {/* <Box mb={2}>
              <TextField
                label="Days To Process"
                variant="outlined"
                fullWidth
                multiline
                name="daysToProcess"
                value={formData.daysToProcess}
                onChange={handleInputChange}
                error={formErrors.daysToProcess !== ""}
                helperText={formErrors.daysToProcess}
              />
            </Box> */}
            <Box mb={2}>
              <TextField
                label="Country Name"
                variant="outlined"
                fullWidth
                multiline
                name="countryName"
                value={formData.countryName}
                onChange={handleInputChange}
                error={formErrors.countryName !== ""}
                helperText={formErrors.countryName}
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="visaCategoryName-label">
                  Visa Category Name
                </InputLabel>
                <Select
                  labelId="visaCategoryName-label"
                  label="Visa Category Name"
                  name="visaCategoryName"
                  value={formData.visaCategoryName}
                  onChange={handleInputChange}
                  error={formErrors.visaCategoryName !== ""}
                >
                  {visaCategories.map((category) => (
                    <MenuItem key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formErrors.visaCategoryName && (
                <p style={{ color: "red" }}>{formErrors.visaCategoryName}</p>
              )}
            </Box>
            <Box mb={2}>
              <TextField
                label="Government Fee"
                variant="outlined"
                fullWidth
                multiline
                name="governmentFee"
                value={additionalFields.governmentFee}
                onChange={(e) => setAdditionalFields({ ...additionalFields, governmentFee: e.target.value })}
                error={formErrors.governmentFee !== ""}
                helperText={formErrors.governmentFee}
                style={{ display: (formData.issuedType === "WEEKLY VISA" || formData.issuedType === "MONTHLY VISA") ? 'block' : 'none' }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="PlatForm Fees"
                variant="outlined"
                fullWidth
                multiline
                name="platFormFees"
                value={additionalFields.platFormFees}
                onChange={(e) => setAdditionalFields({ ...additionalFields, platFormFees: e.target.value })}
                error={formErrors.platFormFees !== ""}
                helperText={formErrors.platFormFees}
                style={{ display: (formData.issuedType === "WEEKLY VISA" || formData.issuedType === "MONTHLY VISA") ? 'block' : 'none' }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Days To Process"
                variant="outlined"
                fullWidth
                multiline
                name="daysToProcess"
                value={additionalFields.daysToProcess}
                onChange={(e) => setAdditionalFields({ ...additionalFields, daysToProcess: e.target.value })}
                error={formErrors.daysToProcess !== ""}
                helperText={formErrors.daysToProcess}
                style={{ display: (formData.issuedType === "WEEKLY VISA" || formData.issuedType === "MONTHLY VISA") ? 'block' : 'none' }}
              />
            </Box>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "rgb(22,17,58)" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </>
    </>
  );
}

export default Visacountryselect;
