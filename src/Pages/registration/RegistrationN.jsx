import React, { useState, useRef } from "react";
import { Paper } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { signUpAction } from "../../Redux/Auth/SignUp/actionSignUp";
import Alert from "@mui/material/Alert";
import tra from "../../Images/tra.png";

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./registration.css";

function LinaerStepper() {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  // console.log("reducerState", reducerState);
  function handleSubmit(event) {
    event.preventDefault();

    const file = document.getElementById("pan_card_document").files[0];

    const formData = new FormData(event.target);
    const payload = {
      personal_details: {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        mobile: {
          country_code: "+91",
          mobile_number: formData.get("mobile_number"),
        },
        address_details: {
          residential_address: formData.get("residential_address"),
          address_2: formData.get("address_2"),
          telephone_number: formData.get("telephone_number"),
          pincode: formData.get("pincode"),
          country: formData.get("country"),
          state: formData.get("state"),
          city: formData.get("city"),
        },
        password: formData.get("password"),
      },
      agency_details: {
        agency_name: formData.get("agency_name"),
        pan_number: formData.get("agency_pan_number"),
        agency_mobile: {
          country_code: "+91",
          mobile_number: formData.get("agency_mobile_number"),
        },
        address: formData.get("agency_address"),
        address_2: formData.get("agency_address_2"),
        fax: formData.get("agency_fax"),
        pincode: formData.get("agency_pincode"),
        country: formData.get("agency_country"),
        state: formData.get("agency_state"),
        city: formData.get("agency_city"),
        business_type: formData.get("agency_business_type"),
        office_space: formData.get("agency_office_space"),
        IATA_registration_id: formData.get("agency_IATA_registration_id"),
        IATA_code: formData.get("agency_IATA_code"),
        TDS: formData.get("agency_TDS"),
        TDS_percentage: formData.get("agency_TDS_percentage"),
        references: formData.get("agency_references"),
        consolidators: formData.get("agency_consolidators"),
        remarks: formData.get("agency_remarks"),
        // document_details: {
        //   pan_card_document: formData.append('file', file),
        // },
      },
      agency_gst_details: {
        agency_name: formData.get("agency_gst_details_agency_name"),
        agency_classification: formData.get(
          "agency_gst_details_agency_classification"
        ),
        agency_GSTIN: formData.get("agency_gst_details_agency_GSTIN"),
        state: formData.get("agency_gst_details_state"),
        state_code: formData.get("agency_gst_details_state_code"),
        provisional_GSTIN: formData.get("agency_gst_details_provisional_GSTIN"),
        contact_person: formData.get("agency_gst_details_contact_person"),
        phone_number: formData.get("agency_gst_details_phone_number"),
        telephone_number: formData.get("agency_gst_details_telephone_number"),
        email: formData.get("agency_gst_details_email"),
        correspondance_mail_id: formData.get(
          "agency_gst_details_correspondance_mail_id"
        ),
        GST_registration_status: formData.get(
          "agency_gst_details_GST_registration_status"
        ),
        HSN_SAC_code: formData.get("agency_gst_details_HSN_SAC_code"),
        composition_levy: formData.get("agency_gst_details_composition_levy"),
        address_line1: formData.get("agency_gst_details_address_line1"),
        address_line2: formData.get("agency_gst_details_address_line2"),
        pincode: formData.get("agency_gst_details_pincode"),
        agency_city: formData.get("agency_gst_details_agency_city"),
        supply_type: formData.get("agency_gst_details_supply_type"),
      },
    };
    const formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("data", JSON.stringify(payload));
    dispatch(signUpAction(formData1));
  }

  return (
    <>
      <Box
        display="flex"
        justifyContant="center"
        alignItems="center"
        textAlign="center"
        font="Quicksand, Bold"
      >
        <Box
          sx={{
            width: "69px",
            height: "69px",
          }}
        >
          <img src={tra}  style={{ width: "100%" }}></img>
        </Box>
        <Typography className="logo_text">skyTrails</Typography>
      </Box>

      <Paper style={{ height: "500px", overflow: "scroll" }}>
        {reducerState.signUp?.showSuccessMessage && (
          <Alert onClick={()=>navigate("/Login")} severity="success">
            Thankyou ! for Registering, we'll contact you ASAP
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div
            className="registrationContainer"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              backgroundSize: "100% 100%",
            }}
          >
            <Box>
              <Typography>Personal Details</Typography>
              <div>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="center"
                  p={3}
                >
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box
                      py={2}
                      display="flex"
                      justifyContent="space-between"
                      style={{ gap: "10px" }}
                    >
                      <div className="form_input" mx={2}>
                        <label htmlFor="first_name" className="form_lable">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          placeholder=" Enter First Name"
                          className="input_size"
                          required
                        />
                      </div>
                      <div className="form_input" mx={2}>
                        <label className="form_lable">Last Name*</label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder=" Enter Last Name"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>

                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Residential Address*
                        </label>
                        <input
                          type="text"
                          name="residential_address"
                          placeholder="Residential Address"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Pin Code*</label>
                        <input
                          type="number"
                          name="pincode"
                          placeholder=" Enter Pin Code"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">State/Province*</label>
                        <input
                          type="text"
                          name="state"
                          placeholder=" State"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Mobile Number</label>
                        <input
                          type="text"
                          name="mobile_number"
                          placeholder="+91"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable"> Address 2</label>
                        <input
                          type="text"
                          name="address_2"
                          placeholder=" Enter Address 2"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">City*</label>
                        <input
                          type="text"
                          name="city"
                          placeholder=" Enter Your City"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Password*</label>
                        <input
                          type="text"
                          name="password"
                          placeholder="Enter Your Password"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Email*</label>
                        <input
                          type="email"
                          name="email"
                          placeholder=" Enter Your Email"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable"> TelePhone Number </label>
                        <input
                          type="number"
                          name="telephone_number"
                          placeholder=" Enter Your TelePhone Number"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Country*</label>
                        <input
                          type="text"
                          name="country"
                          placeholder=" Enter Your Country"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
          <div
            className="registrationContainer"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              backgroundSize: "100% 100%",
            }}
          >
            <Box>
              <Typography>Agency Details</Typography>
              <div>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  p={3}
                >
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Agency Name*</label>
                        <input
                          type="text"
                          name="agency_name"
                          placeholder=" Enter Agency Name"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Mobile No.*</label>
                        <input
                          type="number"
                          name="agency_mobile_number"
                          placeholder=" Enter Mobile No."
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Fax*</label>
                        <input
                          type="number"
                          name="agency_fax"
                          placeholder=" Enter Fax code"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">State/Province*</label>
                        <input
                          type="text"
                          name="agency_state"
                          placeholder="State"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form-row d-flex">
                        <div className="px-3 py-2">
                          Office Space: <input type="checkbox" required />{" "}
                          Ownered
                        </div>
                        <div className="px-3 py-2">
                          <input type="checkbox" name="agency_office_space" />{" "}
                          Rented
                        </div>
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">TDS</label>
                        <input
                          type="text"
                          name="agency_TDS"
                          className="input_size"
                          placeholder="TDS Exemption:"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          References: (optional)
                        </label>
                        <textarea
                          name="agency_references"
                          className="form-control Input_box"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">PAN*</label>
                        <input
                          name="pan_card_document"
                          id="pan_card_document"
                          type="file"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Agency Address*</label>
                        <input
                          type="text"
                          name="agency_address"
                          placeholder=" Enter Agency Address"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Pin Code*</label>
                        <input
                          type="text"
                          name="agency_pincode"
                          placeholder=" Enter Your Pin Code"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">City*</label>
                        <input
                          type="text"
                          name="agency_city"
                          placeholder=" Enter Your City"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form-row d-flex">
                        <div className="px-3 py-2">
                          IATA Registered: <input type="checkbox" required />{" "}
                          Yes
                        </div>
                        <div className="px-3 py-2">
                          <input
                            type="checkbox"
                            name="agency_IATA_registration_id"
                          />{" "}
                          No
                        </div>
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          TDS(% for exemption)*
                        </label>
                        <input
                          type="text"
                          name="agency_TDS_percentage"
                          className="input_size"
                          placeholder="TDS(% for exemption)"
                          aria-label="Text input with segmented dropdown button"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Consolidators: (optional)
                        </label>
                        <textarea
                          name="agency_consolidators"
                          className="form-control Input_box"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">PAN Number*</label>
                        <input
                          type="text"
                          name="agency_pan_number"
                          placeholder=" Enter PAN Number"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Address 2</label>
                        <input
                          type="text"
                          name="agency_address_2"
                          placeholder=" Enter Your Address 2"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Country*</label>
                        <input
                          type="text"
                          name="agency_country"
                          placeholder=" Enter Your Country"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Business Type*</label>
                        <select
                          name="agency_business_type"
                          id=""
                          className="form_input_select"
                        >
                          <option px={5}>Sole Proprietor</option>
                          <option mx={5}>Partnership</option>
                          <option px={5}>Joint Venture</option>
                          <option px={5}>PVT LTD. CO.</option>
                          <option mx={5}>HUF</option>
                          <option px={5}>Limited</option>
                        </select>
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">IATA Code*</label>
                        <input
                          type="text"
                          name="agency_IATA_code"
                          placeholder="IATA Code"
                          required
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={4.6}></Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Remarks:(optional)</label>
                        <textarea
                          className="form-control Input_box"
                          name="agency_remarks"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
          <div
            className="registrationContainer"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              backgroundSize: "100% 100%",
            }}
          >
            <Box>
              <Typography>Agency GST Details</Typography>
              <div>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="center"
                  p={3}
                >
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Agency Name</label>
                        <input
                          name="agency_gst_details_agency_name"
                          type="text"
                          placeholder=" Enter Agency Name"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">State*</label>
                        <input
                          name="agency_gst_details_state"
                          type="text"
                          placeholder=" Enter Your State"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Contact Person</label>
                        <input
                          name="agency_gst_details_contact_person"
                          type="text"
                          placeholder=" Enter Contact Person"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Email*</label>
                        <input
                          name="agency_gst_details_email"
                          type="email"
                          placeholder=" Enter Email Id"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>

                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">HSN/SAC code*</label>
                        <input
                          name="agency_gst_details_HSN_SAC_code"
                          type="text"
                          className="input_size"
                          placeholder="HSN/SAC code"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Address Line 2*</label>
                        <input
                          name="agency_gst_details_address_line2"
                          type="text"
                          className="input_size"
                          placeholder="Enter Your Address"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Supply Type</label>
                        <select className="form_input_select" name="">
                          <option mx={5}>Tax</option>
                          <option px={5}>SEZWOP</option>
                        </select>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} alignItems="center">
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Agency Classificaion*
                        </label>
                        <select
                          className="form_input_select"
                          name="agency_gst_details_agency_classification"
                        >
                          <option px={5}>Registered</option>
                          <option mx={5}>Unregistered</option>
                          <option px={5}>AppliedFor</option>
                        </select>
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">State Code*</label>
                        <input
                          name="agency_gst_details_state_code"
                          type="number"
                          placeholder=" Enter Your State Code"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">TelePhone Number</label>
                        <input
                          name="agency_gst_details_telephone_number"
                          type="text"
                          placeholder=" Enter Your Number"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Correspondance Mail Id
                        </label>
                        <input
                          name="agency_gst_details_correspondance_mail_id"
                          type="email"
                          placeholder=" Enter Your Correspondance Mail Id"
                          className="input_size"
                        />
                      </div>
                    </Box>

                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Composition Levy as per Section 10 of CGST
                        </label>
                        <select
                          name="agency_gst_details_composition_levy"
                          id=""
                          className="form_input_select"
                        >
                          <option
                            mx={5}
                            sx={{ fontSize: "9px", fontWeight: "bold" }}
                          >
                            Yes
                          </option>
                          <option px={5}>No</option>
                        </select>
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Pin Code*</label>
                        <input
                          name="agency_gst_details_pincode"
                          type="number"
                          className="input_size"
                          placeholder=" Enter Pin Code"
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Agency GSTIN</label>
                        <input
                          name="agency_gst_details_agency_GSTIN"
                          type="text"
                          placeholder=" Enter Your Agency GSTIN"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          Provisinal GST Number
                        </label>
                        <input
                          name="agency_gst_details_provisional_GSTIN"
                          type="text"
                          placeholder=" Enter Your Provisinal GST Number"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Mobile Number</label>
                        <input
                          name="agency_gst_details_phone_number"
                          type="number"
                          placeholder=" Enter Your Mobile Number"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">
                          GST Registration Status
                        </label>
                        <input
                          name="agency_gst_details_GST_registration_status"
                          type="text"
                          placeholder=" Enter GST Registration Status"
                          className="input_size"
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Address Line 1*</label>
                        <input
                          name="agency_gst_details_address_line1"
                          type="text"
                          placeholder=" Enter Address Line 1"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                    <Box py={2}>
                      <div className="form_input">
                        <label className="form_lable">Agency City*</label>
                        <input
                          name="agency_gst_details_agency_city"
                          type="text"
                          placeholder=" Enter Your City"
                          className="input_size"
                          required
                        />
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}

export default LinaerStepper;
