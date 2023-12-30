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

const ReviewBookingDetails = () => {
  return (
    <div>
      <Box
        p={3}
        backgroundColor="#FCFFFF"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        alignItems="center"
      >
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <Typography color="#252525" fontSize="16px" fontWeight="bold">
                  SNAKASH50D15Days
                </Typography>
                <Typography color="#252525" fontSize="14px" fontWeight="300">
                  India
                </Typography>
                <Link color="#006FFF" fontSize="14px" fontWeight="bold">
                  Choose Another Plan
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography
                  display="flex"
                  color="#252525"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  Start Date:
                  <Typography color="#FF8900" fontSize="14px" fontWeight="bold">
                    21 Jan, 2023
                  </Typography>
                </Typography>
                <Typography
                  display="flex"
                  color="#252525"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  End Date:
                  <Typography color="#FF8900" fontSize="14px" fontWeight="bold">
                    31 Jan, 2023
                  </Typography>
                </Typography>
                <Typography
                  display="flex"
                  color="#252525"
                  fontSize="14px"
                  fontWeight="bold"
                  justifyContent="end"
                >
                  No. PAX:
                  <Typography color="#FF8900" fontSize="14px" fontWeight="bold">
                    1
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        p={3}
        mt={2}
        backgroundColor="#FCFFFF"
        boxShadow="0px 3px 6px #00000029"
        borderRadius="10px"
        alignItems="center"
      >
        <Grid container alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Typography fontSize="16px" color="#252525" fontWeight="bold">
                    Enter Passenger Details
                  </Typography>
                  <Typography fontSize="16px" color="#252525" fontWeight="bold">
                    Passenger 1 - Adult(6-99)
                  </Typography>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Name:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Mr. Ramu Chai Wala
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Relation Insured:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Wife
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Date of Birth: *
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      10-02-1978
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Major Destination*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      India
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Country:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      India
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      State*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      New Delhi
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Mobile No.*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      +91 98878 65565
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Box mt={8} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Beneficiary Name*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Mrs. Ramu Ki Mehraru
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Insured: Relation*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Female
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Passport No.:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      6876875645
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Address:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Bhutani B Tower
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      City:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      New Delhi
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Pincode*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      110055
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666666",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Email:*
                    </Typography>
                    <Typography fontSize="12px" color="#006FFF">
                      Ramulob@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <div className="row">
          <div className="col-xs-12">
            <form action="/InsuranceBookingConfirmation">
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  my={4}
                  colorScheme="teal"
                  type="submit"
                  m
                  sx={{
                    fontSize: "16px",
                    backgroundColor: "#00BDC4",
                    borderRadius: "18px",
                  }}
                >
                  Generate Insurance
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ReviewBookingDetails;
