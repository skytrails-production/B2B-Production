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
import imageCompression from "browser-image-compression"; // Import image compression library
import "./Visacountry.css";
import { apiURL } from "../../../../Constants/constant";

function Visacountryselect() {
  const [formData, setFormData] = useState({
    countryName: "",
    issuedType: "",
    continent: "",
    visaCategoryName: "",
    images: [], // Handle images as an array
  });

  const [formErrors, setFormErrors] = useState({
    countryName: "",
    issuedType: "",
    continent: "",
    visaCategoryName: "",
    images: "", // Error message for image upload
  });

  const [visaCategories, setVisaCategories] = useState([]);

  const [additionalFields, setAdditionalFields] = useState({
    governmentFees: "",
    platFormFees: "",
    daysToProcess: "",
  });

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country Name is required"),
    issuedType: Yup.string().required("Issued Type is required"),
    continent: Yup.string().required("Continent is required"),
    visaCategoryName: Yup.string().required("Visa Category Name is required"),
    images: Yup.mixed().required("Images are required"),
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
    const { name, value, files } = e.target;

    // Handle image upload
    if (name === "images") {
      setFormData({
        ...formData,
        images: [...files], // Update images to an array of files
      });
    } else if (
      name === "governmentFees" ||
      name === "platFormFees" ||
      name === "daysToProcess"
    ) {
      // Handle additional fields separately
      setAdditionalFields({
        ...additionalFields,
        [name]: value, // Update the relevant additional field
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((error) =>
        setFormErrors({ ...formErrors, [name]: error.message })
      );
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 1, // Max size for the compressed image
      maxWidthOrHeight: 800, // Max width or height for the compressed image
      useWebWorker: true, // Use web worker for better performance
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return imageFile; // If compression fails, return the original file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const formDataToSend = new FormData();
  
        // Append other form data
        formDataToSend.append("countryName", formData.countryName);
        formDataToSend.append("issuedType", formData.issuedType);
        formDataToSend.append("continent", formData.continent);
        formDataToSend.append("visaCategoryName", formData.visaCategoryName);
  
        // Append additional fields if applicable
        if (
          formData.issuedType === "WEEKLY VISA" || 
          formData.issuedType === "MONTHLY VISA"
        ) {
          formDataToSend.append("governmentFees", additionalFields.governmentFees);
          formDataToSend.append("platFormFees", additionalFields.platFormFees);
          formDataToSend.append("daysToProcess", additionalFields.daysToProcess);
        }
  
        // Check if images exist before appending
        if (formData.images.length > 0) {
          for (let i = 0; i < formData.images.length; i++) {
            const compressedImage = await compressImage(formData.images[i]);
            formDataToSend.append("images", compressedImage); // Ensure correct key ("images")
          }
        } else {
          console.error("No images selected");
        }
  
        axios
          .post(`${apiURL.baseURL}/skyTrails/api/visa/createVisa`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file upload
            },
          })
          .then((response) => {
            setFormData({
              countryName: "",
              issuedType: "",
              continent: "",
              images: [],
              visaCategoryName: "",
            });
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      })
      .catch((errors) => {
        const newErrors = {};
        if (errors.inner && Array.isArray(errors.inner)) {
          errors.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
        }
        setFormErrors(newErrors);
      });
  };
  

  return (
    <Container component="main" maxWidth="sm" className="visaform">
      <form className="formacontainer2" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "white",
            backgroundColor: "#E73C33",
            fontWeight: "bold",
          }}
        >
          Visa CountryList
        </Typography>

        {/* Issued Type */}
        <Box mb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="issuedType-label">Issued Type</InputLabel>
            <Select
              labelId="issuedType-label"
              label="Issued Type"
              name="issuedType"
              value={formData.issuedType}
              onChange={handleInputChange}
            >
              <MenuItem value="NO VISA">NO VISA</MenuItem>
              <MenuItem value="WEEKLY VISA">WEEKLY VISA</MenuItem>
              <MenuItem value="MONTHLY VISA">MONTHLY VISA</MenuItem>
              <MenuItem value="VISA ON ARRIVAL">VISA ON ARRIVAL</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Continent */}
        <Box mb={2}>
          <TextField
            label="Continent"
            variant="outlined"
            fullWidth
            name="continent"
            value={formData.continent}
            onChange={handleInputChange}
            error={formErrors.continent !== ""}
            helperText={formErrors.continent}
          />
        </Box>

        {/* Country Name */}
        <Box mb={2}>
          <TextField
            label="Country Name"
            variant="outlined"
            fullWidth
            name="countryName"
            value={formData.countryName}
            onChange={handleInputChange}
            error={formErrors.countryName !== ""}
            helperText={formErrors.countryName}
          />
        </Box>

        {/* Visa Category Name */}
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
                <MenuItem
                  key={category.categoryId}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formErrors.visaCategoryName && (
            <p style={{ color: "red" }}>{formErrors.visaCategoryName}</p>
          )}
        </Box>

        {/* Image Upload */}
        <Box mb={2}>
          <input
            type="file"
            multiple
            onChange={handleInputChange}
            name="images"
            accept="image/*"
          />
          {formErrors.images && (
            <p style={{ color: "red" }}>{formErrors.images}</p>
          )}
        </Box>

        {/* Government Fee */}
        {formData.issuedType === "WEEKLY VISA" ||
        formData.issuedType === "MONTHLY VISA" ? (
          <>
            <Box mb={2}>
              <TextField
                label="Government Fee"
                variant="outlined"
                fullWidth
                name="governmentFees"
                value={additionalFields.governmentFees}
                onChange={handleInputChange}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Platform Fees"
                variant="outlined"
                fullWidth
                name="platFormFees"
                value={additionalFields.platFormFees}
                onChange={handleInputChange}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Days to Process"
                variant="outlined"
                fullWidth
                name="daysToProcess"
                value={additionalFields.daysToProcess}
                onChange={handleInputChange}
              />
            </Box>
          </>
        ) : null}

        <Button
          variant="contained"
          type="submit"
          fullWidth
          style={{
            backgroundColor: "#E73C33",
            color: "white",
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Visacountryselect;