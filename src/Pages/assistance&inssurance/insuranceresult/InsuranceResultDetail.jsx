import React from 'react'
import { Grid, Box, Typography, Button, Link } from "@mui/material";


const InsuranceResultDetail = () => {
  return (
    <div>
              <Box
                p={3}
                mt={3}
                backgroundColor="#FCFFFF"
                boxShadow="1px 1px 8px gray"
                borderRadius="10px"
                alignItems="center"
            >


                <Grid container alignItems="center">
                    <Grid md={7} sm={6}>
                        <Box display="flex" alignItems="center">
                            <Box px={1}>
                                <Typography color="#252525" fontSize="18px">
                                Private Standard
                                </Typography>
                                <Typography color="#252525" fontSize="12px" fontWeight="300">
                                             Domestic INR 50000 15 Days
                                </Typography>
                                <Link color="#006FFF" fontSize="10px" fontWeight="bold">
                                Cover Details
                                </Link>
                                <Link ml={2} color="#006FFF" fontSize="10px" fontWeight="bold">
                                Price Break Up
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid md={5} sm={6} display="flex" >
                        <Box display="flex" justifyContent='right' width='100%'>

                            <Box display="block" alignItems="right" textAlign="end" >
                                <Typography color="#FF8900" fontSize="20px" fontWeight="bold">
                                   Price:1040
                                </Typography>
                                <form action="InsuranceGuestDetails">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{background:'#006FFF',borderRadius:'10px'}}
                                    >
                                        <Typography color="white" fontSize="10px" alignItems="center" justifyContent="center" >
                                            Book
                                        </Typography>
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>


    </div>
  )
}

export default InsuranceResultDetail
