import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  Chip,
  Checkbox,
  ListItemText,
  FormGroup
} from "@mui/material";
import axios from "axios";
import "./Visacountry.css";
import { apiURL } from "../../Constants/constant";

function Requireddocument() {
  const [formData, setFormData] = useState({
    visaCountry: "",
    requiredDocCategory: [],
    visaCategory: "",
  });

  const [formErrors, setFormErrors] = useState({
    visaCountry: "",
    requiredDocCategory: "",
    visaCategory: "",
  });

  const [visaCountries, setVisaCountries] = useState([]);
  const [visaCategories, setVisaCategories] = useState([]);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/api/visa/getAllVisaCountry`)
      .then((response) => {setVisaCountries(response.data.result);})
      
      .catch((error) => console.error("Error fetching visa countries:", error));

    axios
      .get(`${apiURL.baseURL}/skyTrails/api/visa/getVisaCategory`)
      .then((response) => {
        {setVisaCategories(response.data.result);};
      })
      .catch((error) =>
        console.error("Error fetching visa categories:", error)
      );

    axios
      .get(`${apiURL.baseURL}/skyTrails/api/visa/document/getDocumnetCategory`)
      .then((response) => {setDocumentCategories(response.data.result);})
      
      .catch((error) =>
        console.error("Error fetching document categories:", error)
      )
      .finally(() => setLoading(false));
  }, []);

  const validationSchema = Yup.object({
    visaCountry: Yup.string().required("Visa Country is required"),
    requiredDocCategory: Yup.array().min(
      1,
      "At least one Document Category is required"
    ),
    visaCategory: Yup.string().required("Visa Category is required"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
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
    console.log(formData,"formData");
    e.preventDefault();

    try {
        await validationSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/visa/document/createRequireDocument`,
        {...formData}
      );
      console.log(formData,"formData");
      console.log("Visa Country:", formData.visaCountry);
console.log("Required Document Categories:", formData.requiredDocCategory);


      console.log("API Response:", response.data);
    } catch (errors) {
        const newFormErrors = {};
        errors.inner.forEach((error) => {
          newFormErrors[error.path] = error.message;
        });
        setFormErrors(newFormErrors);
    }
  };

  const handleDocumentCheckboxChange = (category) => (event) => {
    const { checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requiredDocCategory: checked
        ? [...prevFormData.requiredDocCategory, category.categoryName]
        : prevFormData.requiredDocCategory.filter(
            (doc) => doc !== category.categoryName
          ),
    }));
  };
  

  return (
    <>
      <Container component="main" maxWidth="sm" className="visaform">
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
            Required Document
          </Typography>

          <Box
            mb={2}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Visa Country */}
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="visaCountry-label">Visa Country</InputLabel>
              <Select
                labelId="visaCountry"
                label="Visa Country"
                name="visaCountry"
                value={formData.visaCountry}
                onChange={handleInputChange}
                error={formErrors.visaCountry !== ""}
              >
                {visaCountries.map((country) => (
                  <MenuItem key={country._id} value={country.countryName}>
                    {country.countryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="visaCategory-label">Visa Category</InputLabel>
              <Select
                labelId="visaCategory-label"
                label="Visa Category"
                name="visaCategory"
                value={formData.visaCategory}
                onChange={handleInputChange}
                error={formErrors.visaCategory !== ""}
              >
                {visaCategories.map((category) => (
                  <MenuItem key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <InputLabel id="requiredDocuments-label">
              Required Documents
            </InputLabel>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormGroup>
                {documentCategories.map((category) => (
                  <FormControlLabel
                    key={category._id}
                    control={
                      <Checkbox
                        checked={formData.requiredDocCategory.includes(category.categoryName)}
                        onChange={handleDocumentCheckboxChange(category)}
                        name={category.categoryName}
                      />
                    }
                    label={category.categoryName}
                  />
                ))}
              </FormGroup>
            </FormControl>
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
  );
}

export default Requireddocument;
