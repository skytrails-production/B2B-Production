import React from "react";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const SingleTripForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <div className="form_input">
            <label className="form_lable">Destination</label>
            <select name="" id="" className="form_input_select">
              <option mx={5}>Domestic</option>
              <option mx={5}>Domestic</option>
              <option mx={5}>Domestic</option>
              <option mx={5}>Domestic</option>
              <option mx={5}>Domestic</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row" style={{display:'flex',alignItems:'center'}}>
        <div className="col-xs-12 col-md-2">
          <div className="form_input">
            <label className="form_lable">Departure</label>
            <input
              type="date"
              name="departure"
              id="departure"
              className="deaprture_input"
            ></input>
          </div>
        </div>
        <div className="col-xs-12 col-md-2">
          <div className="form_input">
            <label className="form_lable">Return</label>
            <input
              type="date"
              name="departure"
              id="departure"
              className="deaprture_input"
            ></input>
          </div>
        </div>
        <div className="col-xs-12 col-md-2">
          <div className="form_input">
            <label className="form_lable">Duration</label>
            <input
              type="duration"
              name="departure"
              id="departure"
              className="deaprture_input"
            ></input>
          </div>
        </div>
        <div className="col-xs-12 col-md-1" textAlign="center" display="flex">
          <Typography>Day</Typography>
        </div>
        
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-2">
          <div className="hotel_form_input">
            <label for="departure" className="form_lable">
              Passengers
            </label>
            <select className="hotel_input_select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12 col-md-2">
          <div className="form_input">
            <label className="form_lable">PAX 1 Age</label>
            <input
              type="age"
              name="departure"
              id="departure"
              className="deaprture_input"
            ></input>
          </div>
        </div>
        <Typography sx={{fontSize:'12px',color:'#4E4C4C'}}>Minimum Age:6 Months & Maximum Age:70 Years</Typography>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <form action="/InsuranceResult">
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                my={4}
                colorScheme="teal"
                type="submit"
                m
                sx={{ backgroundColor: "#00BDC4", borderRadius: "20px" }}
              >
                Insurance Search
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleTripForm;
