import React from 'react'
import {Flex} from "@chakra-ui/react"
import { Button } from 'react-bootstrap'
import transfer from "../../../Images/transfer.png";
const OffShare = () => {
  return (
    <div>
      <form action="" className="formFlightSearch">
        {/* radio button for Advance return  */}

        <div className="d-flex flex-row mb-3 gap-4">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              type="radio"
              className="form-check-input mt-0"
              id="option1"
              name="returnType"
            ></input>
            <label>One Way</label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              type="radio"
              className="form-check-input mt-0"
              id="option2"
              name="returnType"
            ></input>
            <label>Return</label>
          </div>
        </div>

        {/* arrival and departure input box */}
        <div className="row">
          <div className="col-12 col-md-8 col-lg-3  align-self-center pe-0">
            <div className="form_input">
              <label for="from" className="form_lable">
                FROM
              </label>

              <input placeholder="Enter city or airport" />
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <img src={transfer} alt="name" className="align-self-center" />
          </div>
          <div className="col-12 col-md-6 col-lg-3  ps-0">
            <div className="form_input">
              <label for="to" className="form_lable">
                TO
              </label>
              <input placeholder="Enter city or airport" />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 ">
            <div className="form_input">
              <label for="departure" className="form_lable">
                DEPARTURE
              </label>

              <input
                type="date"
                name="departure"
                id="departure"
                className="deaprture_input"
                placeholder="Enter city or airport"
              ></input>
            </div>
          </div>

          <div className="col-12 col-md-2 col-lg-2 ">
            <div className="form_input">
              <label className="form_lable"></label>
              <select name="" id="" className="form_input_select">
                <option mx={5}>Any Time</option>
                <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>
                  Morning
                </option>

                <option px={5}>Evening</option>
                <option px={5}>Afternoon</option>
                <option mx={5}>Night</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-9">
            <div className="row">
              <div className="col-3 col-md-3 col-lg-2 mb-3">
                <div className="form_input">
                  <label className="form_lable">Adult(12+)</label>

                  <select name="adult" id="" className="form_input_select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>

              <div className="col-3 col-md-3 col-lg-2 mb-3">
                <div className="form_input">
                  <label className="form_lable">Child(2-11)</label>
                  <select name="child" id="" className="form_input_select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>
              <div className="col-3 col-md-3 col-lg-3 mb-3">
                <div className="form_input">
                  <label className="form_lable">Infant(Under 2 Yrs)</label>
                  <select name="infant" id="" className="form_input_select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>

              <div className="col-3 col-md-3 col-lg-2 mb-3">
                <div className="form_input">
                  <label className="form_lable">Class</label>
                  <select name="class" id="" className="form_input_select">
                    <option value="1">All</option>
                    <option value="2">Ecomomy</option>
                    <option value="3">Premimum Economy</option>
                    <option value="4">Business</option>
                    <option value="5">Premimum Business</option>
                    <option value="6">First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All select tags start from here */}

        <div className="row">
          <Flex direction="row" justifyContent="center">
            <Button
              mt={4}
              colorScheme="teal"
              // isLoading={props.isSubmitting}
              type="submit"
            >
              Flight Search
            </Button>
          </Flex>
        </div>
      </form>
    </div>
  );
}

export default OffShare
