import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createForexAction } from "../../../Redux/CreateForxWithMe/actionCreateForex";
import { useDispatch } from "react-redux";
import color from "../../../color/color"
const DealForex = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    enterCity: "",
    enterLocation: "",
    services: "",
    amount: "",
    currency: "",
    commissionType: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateForex = (event) => {
    event.preventDefault();
    // console.log("formData", formData);

    const payload = {
      enterCity: formData.enterCity,
      enterLocation: formData.enterLocation,
      services: formData.services,
      amount: formData.amount,
      currency: formData.currency,
      commissionType : formData.commissionType,
      mobile: formData.mobile,
    };

    dispatch(createForexAction(payload));
    event.target.reset();
  };
  return (
    <div className="container">
      <form onSubmit={handleCreateForex}>
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Enter City</label>
              <input type="text" name="enterCity" onChange={handleChange} />
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Enter Location</label>
              <input
                type="text"
                name="enterLocation"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Service</label>
              <input
                type="text"
                name="services"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
              ></input>
            </div>
          </div>


        </div>
        <div className="row" style={{ display: "flex", alignItems: "center" }}>
          
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Currency</label>
              <input
                type="text"
                name="currency"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Commission Type</label>
              {/* <select name="commissionType" className="form_input_select"  onChange={handleChange}>
                            <option value="Per Unit" mx={5}>Paisa Per Unit</option>
                            <option mx={5}>Paisa Per Unit</option>
                        </select> */}
              <select
                name="commissionType"
                className="form_input_select"
                value={formData.commissionType}
                onChange={handleChange}
              >
                <option value="Per Unit">Paisa Per Unit</option>
                <option value="Another option">Another option</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">My Commission</label>
              <input
                type="text"
                name="mycommission"
                className="deaprture_input"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form_input">
              <label className="form_lable">Mobile No.</label>
              <input
                type="number"
                name="mobile"
                onChange={handleChange}
              ></input>
            </div>
          </div>

        </div>

       
      

        <div className="row">
          <div className="col-xs-12">
            <Typography
              sx={{ fontSize: "16px", color:color.red1, fontWeight: "bold" }}
              textAlign="left"
            >
              Note : Customer KYC Document Required
            </Typography>

            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                my={4}
                colorScheme="color.red"
                type="submit"
                
                sx={{ backgroundColor:color.bluedark, borderRadius: "20px",marginTop:"-30px" }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DealForex;
