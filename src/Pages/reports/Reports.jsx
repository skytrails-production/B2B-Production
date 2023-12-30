import { Box, Typography, Input, Stack, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { Flex } from "@chakra-ui/react";
import "./reports.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Reports = () => {
  const options = [
    { label: "International Hotels", value: "1" },
    { label: "Mobile Recharge(Pre Paid)", value: "2" },
    { label: "Visa", value: "3" },
    { label: "Domestic Hotels", value: "4" },
    { label: "Bus", value: "5" },
    { label: "Transfer", value: "6" },
    { label: "Package", value: "7" },
    { label: "Site Seeing", value: "8" },
    { label: "Cruise", value: "9" },
    { label: "Insurance", value: "10" },
    { label: "Misc.", value: "11" },
    { label: "Indian Railway", value: "12" },
    { label: "SMS", value: "13" },
  ];
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  function handleCheckboxChange(event) {
    const { value } = event.target;
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  function handleSelectAllChange(event) {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelected(options.map((item) => item.label));
    } else {
      setSelected([]);
    }
  }

  // end
  return (
    <div className="container-fluid margin-pecentage">
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
        >
          Show My Commission
        </Typography>
        <Typography
          sx={{ color: "#006FFF", fontSize: "14px", fontWeight: "bold" }}
          mx={1}
        >
          {" "}
          From
        </Typography>
        <Input
          type="date"
          style={{
            border: "1px solid #70707059",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <Typography
          sx={{ color: "#006FFF", fontSize: "14px", fontWeight: "bold" }}
          mx={1}
        >
          {" "}
          To
        </Typography>
        <Input
          type="date"
          style={{
            border: "1px solid #70707059",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
      </Box>
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={2}
      >
        <Button
          type="submit"
          sx={{
            backgroundColor: "#006FFF",
            borderRadius: "10px",
            color: "white",
          }}
        >
          Get Report
        </Button>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={2}
      >
        <Button
          type="submit"
          sx={{
            backgroundColor: "#006FFF",
            borderRadius: "10px",
            color: "white",
          }}
        >
          Export To Excel
        </Button>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#006FFF",
            borderRadius: "10px",
            color: "white",
          }}
          pl={2}
        >
          Private Fare Report
        </Button>
      </Stack>
      <Box sx={{ textAlign: "left" }}>
        <Box display="flex" alignItems="center">
          <Checkbox
            {...label}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={
              <RadioButtonCheckedIcon style={{ color: "#FF8900" }} />
            }
          />
          <Box display="flex" justifyContent="space-between">
            <Typography color="#252525" fontSize="14px" fontWeight="bold">
              Include PNR In Excel Sheet(csv)
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box px={10}>
        <Grid container spacing={5} display="flex">
          <Grid item md={6}>
            <Box mb={3} px={5}>
              <Typography color="#FF8900" fontSize="20px" fontWeight="bold">
                AIR
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" px={5}>
              <Box>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  UK Airline
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  {" "}
                  Jet Airways
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  {" "}
                  India Airlines
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  JetLite
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Go Air
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Spicejet
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Indigo
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Air India
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Air India Express
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  International
                </Typography>
                <Typography
                  color="#FF8900"
                  fontSize="15px"
                  fontWeight="bold"
                  my={2}
                >
                  Total Commission
                </Typography>
              </Box>
              <Box>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography
                  color="#006FFF"
                  fontSize="15px"
                  fontWeight="bold"
                  my={2}
                >
                  Rs. 0
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* <Box sx={{ borderLeft: '3px solid #006FFF', height: '500px' }}>

                    </Box> */}
          <Grid item md={6}>
            <Box mb={3} px={5}>
              <Typography color="#FF8900" fontSize="20px" fontWeight="bold">
                Non-AIR
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" px={5}>
              <Box>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Rail{" "}
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  {" "}
                  Hotel Domestic{" "}
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  {" "}
                  Hotel International
                </Typography>
                <Typography color="#252525" fontSize="15px" fontWeight="bold">
                  Insurance{" "}
                </Typography>
                <Typography
                  color="#FF8900"
                  fontSize="15px"
                  fontWeight="bold"
                  my={2}
                >
                  Total Commission{" "}
                </Typography>
              </Box>
              <Box>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography color="#006FFF" fontSize="15px" fontWeight="bold">
                  Rs. 0
                </Typography>
                <Typography
                  color="#006FFF"
                  fontSize="15px"
                  fontWeight="bold"
                  my={2}
                >
                  Rs. 0
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }} mt={5}>
        <Typography color="#252525" fontSize="16px" fontWeight="bold">
          Restrict my Search to:
        </Typography>
        <Typography color="#006FFF" fontSize="16px" fontWeight="bold">
          {" "}
          Select All / Unselect All
        </Typography>
      </Box>
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
        >
          Period Covered{" "}
        </Typography>
        <Typography
          sx={{ color: "#006FFF", fontSize: "12px", fontWeight: "bold" }}
          mx={1}
        >
          {" "}
          From
        </Typography>
        <Input
          type="date"
          style={{
            border: "1px solid #70707059",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <Typography
          sx={{ color: "#006FFF", fontSize: "12px", fontWeight: "bold" }}
          mx={1}
        >
          {" "}
          To
        </Typography>
        <Input
          type="date"
          style={{
            border: "1px solid #70707059",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
      </Box>
      {/* <div>
                <label>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    />
                    Select All
                </label>
                <div className="grid-container">
                    {options.map(({ label, value }) => (
                        <label key={value} >
                            <input
                                type="checkbox"
                                value={label}
                                checked={selectAll ? true : selected.includes(label)}
                                onChange={handleCheckboxChange}
                                disabled={selectAll}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div> */}
      <Box>
        <Grid container spacing={5} mt={4}>
          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      International Hotels
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Package
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      SMS
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Mobile Recharge(Pre Paid)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Site Seeing
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Visa
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Cruise
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Domestic Hotels
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Insurance
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Bus
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Misc.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item md={2}>
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Transfer
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    style={{ color: "#006FFF" }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={
                      <RadioButtonCheckedIcon style={{ color: "#006FFF" }} />
                    }
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      Indian Railway
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="row">
        <Flex direction="row" justifyContent="center">
          <form action="/" className="formFlightSearch">
            <Button
              mt={4}
              variant="contained"
              colorScheme="teal"
              sx={{
                background: "#00BDC4",
                borderRadius: "10px",
                color: "white",
              }}
              type="submit"
            >
              Export To Excel
            </Button>
          </form>
        </Flex>
      </Box>
    </div>
  );
};

export default Reports;
