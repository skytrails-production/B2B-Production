import { Center, Square, Text, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { data } from "./MenuItem";
import "./NavBarBox.css";
import Box from "@mui/material/Box";
import { Holiday } from "./HolidayMenu";
import color from "../color/color.js";
const NavBarBox = ({ avatar, name, path }, index) => {
  const [hover, setHover] = useState(false);

  return (
    <Square w="auto" h="100%" borderRadius="15px" >
      <Flex
        direction="column"
        w="auto"
        h="100%"
        alignItems="center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* <Center pt="10px">
          <div>
            <img src={avatar}  alt="" className="avatarImage" style={{width:"34px",height:"34px"}}/>
            
          
          </div>
        </Center>
        <Text fontWeight="bold" fontSize="12px" style={{ textAlign: "center" }}>
          {name}
        </Text> */}

        {hover && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              zIndex: 1,
              width: "73%",
              margin: "0px 30px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              textAlign: "left",
              marginTop: "-12px"

            }}
          >
            {data.map((k, l) => {
              if (name === "Flights") {
                return (
                  <ul>
                    <Box>
                      <Link
                        to={k.path}
                        onClick={() => setHover(false)}
                        style={{
                          textDecoration: "none",
                          color: "grey",
                          fontWeight: "bold",
                          textAlign: "right",
                          fontSize: "14px",
                        }}
                      >
                        <p
                          style={{
                            color: "black",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            width: "130px",
                            textAlign: "center",
                            marginLeft: "-20px",
                            marginTop: "5px",
                            boxShadow:
                              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          }}
                        >
                          {k.tittle}
                        </p>
                      </Link>
                    </Box>
                  </ul>
                );
              }
            })}
          </div>
        )}
        {/* -------- */}
        {hover && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",

              marginRight: "-6px",
              zIndex: 1,
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              textAlign: "left",
              width: "140px",
            }}
          >
            {Holiday.map((k, l) => {
              if (name === "Package") {
                return (
                  <ul>
                    <Box>
                      <Link
                        to={k.path}
                        onClick={() => setHover(false)}
                        style={{
                          textDecoration: "none",
                          color: "grey",
                          fontWeight: "bold",
                          textAlign: "right",
                          fontSize: "14px",
                        }}
                      >
                        <p
                          style={{
                            color: "black",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            width: "110px",
                            textAlign: "center",
                            marginLeft: "-20px",
                            marginTop: "5px",
                            boxShadow:
                              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          }}
                        >
                          {k.tittle}
                        </p>
                      </Link>
                    </Box>
                  </ul>
                );
              }
            })}
          </div>
        )}
      </Flex>
    </Square>
  );
};

export default NavBarBox;