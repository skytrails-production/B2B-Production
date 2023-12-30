import React, { useState } from 'react';
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createForex4CustomerAction } from "../../../Redux/CreateForexWithCustomer/actionCreateForex";
import { useDispatch } from 'react-redux';
import color from "../../../color/color"
const CustomerDealForex = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "", 
        mobile: "", 
        service: "", 
        amount: "", 
        currency: "", 
        commissionType: "", 
        myCommission: "", 
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
            name: formData.name, 
            mobile: formData.mobile, 
            service: formData.service, 
            amount: formData.amount, 
            currency: formData.currency, 
            commissionType: formData.commissionType, 
            myCommission: formData.myCommission, 
        };
    
        dispatch(createForex4CustomerAction(payload));
        event.target.reset();
      };
    return (
        <div className="container">
             <form onSubmit={handleCreateForex}>
            <div className="row">
                <div className="col-xs-12 col-md-3">
                    <div className="form_input">
                        <label className="form_lable">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter Customer Name'
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="form_input">
                        <label className="form_lable">Customer Mobile Number</label>
                        <input
                            type="number"
                            name="mobile"
                            placeholder='Enter Mobile Number'
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
            </div>
            <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Service</label>
                       
                        <select
                name="service"
                className="form_input_select"
                value={formData.service}
                onChange={handleChange}
              >
                <option defaultChecked>Select Service Type</option>
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                    <label className="form_lable">Currency</label>
                        <select
                name="currency"
                className="form_input_select"
                value={formData.currency}
                onChange={handleChange}
              >
                <option defaultChecked>Select Currency</option>
                <option value="INR">INR</option>
              </select>

                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Commission Type</label>
                       
                          <select
                name="commissionType" value={formData.commissionType}
                className="form_input_select"
                onChange={handleChange}
              >
                <option defaultChecked>Select Commission</option>
                <option value="Per Unit">Per Unit</option>
                <option value="Another option">Another option</option>
              </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">My Commission</label>
                        <input
                            type="text"
                            name="myCommission"
                            id="departure"
                            className="deaprture_input"
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>

               
            </div>
           

            <div className="row">
                <div className="col-xs-12">
                <Typography sx={{ fontSize: '16px', color: '#FF8900',fontWeight:'bold' }} textAlign='left'>Note : Customer KYC Document Required</Typography>
                   
                        <Box display="flex" justifyContent="center">
                       
                            <Button
                                variant="contained"
                                my={4}
                                colorScheme="teal"
                                type="submit"
                                sx={{ backgroundColor:color.bluedark, borderRadius: "20px" }}
                            >
                                Submit
                            </Button>
                        </Box>
                </div>
            </div>
            </form>
        </div>
    )
}

export default CustomerDealForex
