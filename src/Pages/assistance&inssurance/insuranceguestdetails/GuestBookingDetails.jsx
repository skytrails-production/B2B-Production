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
import './GuestBookingDetails.css'


const GuestBookingDetails = () => {
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
              <Grid item xs={8}>
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
                    <Box className="input_option" ml={1} >
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>Mr.</option>
                          <option value={20}>Miss.</option>
                          <option value={30}>Mrs.</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                    <Box className="input_area" ml={1}>
                      <Input
                        type="text"
                         fontSize="12px"
                        placeholder="First Name"
                        disableUnderline
                        border="none"
                        name="First Name"
                      ></Input>
                    </Box>
                    <Box className="input_area" ml={1}>
                      <Input
                        type="text"
                        fontSize="12px"
                        placeholder="Last Name"
                        disableUnderline
                        border="none"
                        name="Last Name"
                      ></Input>
                    </Box>
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
                      Beneficiary Name*
                    </Typography>
                    <Box className="input_option" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>Mr.</option>
                          <option value={20}>Miss.</option>
                          <option value={30}>Mrs.</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                    <Box className="input_area" ml={1}>
                      <Input
                        type="text"
                         fontSize="12px"
                        placeholder="First Name"
                        border="none"
                        disableUnderline
                        name="First Name"
                      ></Input>
                    </Box>
                    <Box className="input_area" ml={1}>
                      <Input
                        type="text"
                        fontSize="12px"
                        placeholder="Last Name"
                        border="none"
                        disableUnderline
                        name="Last Name"
                      ></Input>
                    </Box>
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
                      Date of Birth:*
                    </Typography>
                    <Box className="input_option" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline  >
                          <option value={10}>DD</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                    <Box className="input_area" ml={1}>
                    <FormControl>
                        <NativeSelect disableUnderline  >
                          <option value={10}>MM</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                    <Box className="input_area" ml={1}>
                    <FormControl>
                        <NativeSelect disableUnderline  >
                          <option value={10}>YYYY</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
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
                  
                    <Box className="input_area" width="300px" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        disableUnderline
                        border="none"
                        name="Last Name"
                      ></Input>
                    </Box>
                  </Box>
                  <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" width="200px" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        placeholder="6879847"
                        border="none"
                        disableUnderline
                      ></Input>
                    </Box>
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
                    <Box className="input_option" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline  >
                          <option value={10}>+91</option>
                          <option value={10}>+91</option>
                          <option value={10}>+91</option>
                          <option value={10}>+91</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                    <Box className="input_area" width="150px" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        border="none"
                        placeholder="Eg. 9999999999"
                        disableUnderline
                      ></Input>
                    </Box>
                  </Box>

                </Box>
              </Grid>

{/* ----------------------------------------------------------------- */}
              <Grid item xs={4}>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>Brother</option>
                          <option value={20}>Sister</option>
                          <option value={30}>Brother</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>India</option>
                          <option value={20}>India</option>
                          <option value={30}>India</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>India</option>
                          <option value={20}>India</option>
                          <option value={30}>India</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>Male</option>
                          <option value={20}>FeMale</option>
                          <option value={30}>Male</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                      <FormControl>
                        <NativeSelect disableUnderline
                          defaultValue={10}
                          inputProps={{
                            name: "price",
                          }}
                        >
                          <option value={10}>India</option>
                          <option value={20}>India</option>
                          <option value={30}>India</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        border="none"
                        disableUnderline
                      ></Input>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        border="none"
                        disableUnderline
                      ></Input>
                    </Box>
                  </Box>
              <Box mt={2} display="flex"  alignItems="center">
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
                    <Box className="input_area" width="200px" ml={1}>
                    <Input
                        type="text"
                        fontSize="12px"
                        border="none"
                        disableUnderline
                      ></Input>
                    </Box>
                  </Box>


              </Grid>
            </Grid>
          </Box>
        </Grid>
        <div className="row">
        <div className="col-xs-12">
          <form action="/InsuranceReviewBooking">
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                my={4}
                colorScheme="teal"
                type="submit"
                m
                sx={{fontSize:"16px", backgroundColor: "#00BDC4", borderRadius: "20px" }}
              >
                
              </Button>
            </Box>
          </form>
        </div>
      </div>
      </Box>
    </div>
  );
};

export default GuestBookingDetails;
