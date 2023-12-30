import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";

const Input = styled(MuiInput)`
  width: 100%;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(2000);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 2342) {
      setValue(2342);
    } else if (value > 345232) {
      setValue(345232);
    }
  };

  // console.log('hello');

  return (
    <Box sx={{ width: '100%', display: "flex", justifyContent: "center" ,marginX:'20px'}}>
     
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography>₹2342</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 2342}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            sx={{ color: "#FF8900" }}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="large"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 2000,
              min: 2342,
              max: 345232,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
