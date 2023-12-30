import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Link,
  FormControl,
  NativeSelect,
  Input,
} from "@mui/material";

const GuestPriceDetails = () => {
  return (
    <div>
      <Box
        p={3}
        backgroundColor="#FCFFFF"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        alignItems="center"
      >
       <Box  textAlign="center" >
              <Typography  color="#252525" fontSize="16px" fontWeight="bold">
                Price Details
              </Typography>
            </Box>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  Age Group
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#666666"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  Price
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  1-70 Yrs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  ₹100
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  (1 to 70 Yrs X 1)
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  ₹100
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  Total
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  INR 100
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  Commission (-)
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  ₹20
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#666666" fontSize="12px" fontWeight="bold">
                  Tds (+)
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  ₹1
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#006FFF" fontSize="12px" fontWeight="bold">
                  Grand Total
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#FF8900"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  ₹81
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GuestPriceDetails;
