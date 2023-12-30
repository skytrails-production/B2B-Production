import React from "react";
import { Button } from "react-bootstrap";
import { Flex,Grid,GridItem } from "@chakra-ui/react";
import transfer from "../../../Images/transfer.png";
const Calander = () => {
  return (
    <form action="" className="formFlightSearch">
      {/* Type of return  */}

      {/* arrival and departure input box */}

      <div className="row p-2">
        <div className="col-12 col-md-3 col-lg-3 pe-0">
          <div className="form_input">
            <label for="from" className="form_lable">
              FROM
            </label>
            <input placeholder="Enter city or airport" />
          </div>
        </div>
        <div className="col-md-1 d-flex justify-content-center align-items-center">
          <img src={transfer} alt="name" className=" align-self-center" />
        </div>
        <div className="col-12 col-md-3 col-lg-3 ps-0 ">
          <div className="form_input">
            <label for="to" className="form_lable">
              TO
            </label>
            <input placeholder="Enter city or airport" />
          </div>
        </div>

        <div className="col-12 col-md-3 col-lg-3">
          <div className="form_input">
            <label className="form_lable">Months & Year</label>
            <input type="month" placeholder="Enter Months & Year" />
          </div>
        </div>
      </div>

      {/*  All fair components  */}

      <div className="col-12 col-md-6 col-lg-3 mt-1">
        <div className="form_input ps-2">
          <label for="departure" className="form_lable">
            preffered carrier
          </label>

          <input
            type="input"
            name="departure"
            id="departure"
            className="deaprture_input"
            placeholder="Enter city or airport"
          ></input>
        </div>
      </div>

      <label
        style={{ fontSize: "20px", fontWeight: "400", marginBottom: "10px",paddingLeft:"10px" }}
      >
        Restrict my Search to:{" "}
        <span style={{ color: "#00BDC4" }}>Select All/ Unselect All</span>
      </label>

      {/* All select tags start from here */}
      <Grid templateColumns="repeat(6, 1fr)" gap={6} paddingLeft={12}>
        <GridItem w="100%" h="30">
          <input
            className="inputSelect"
            type="checkbox"
            defaultChecked="checked"
          />{" "}
          <span>GDS</span>
        </GridItem>
        <GridItem w="100%" h="30">
          <input
            className="inputSelect"
            type="checkbox"
            defaultChecked="checked"
          />{" "}
          <span>Indigo</span>
        </GridItem>
       

        
      </Grid>

      {/* All select tags start from here */}

      <div>
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
  );
};

export default Calander;
