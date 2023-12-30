import { Box, Grid, Typography, label, Input } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import './servicefilter.css';
import color from "../../../color/color"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';




const ServicesFilter = () => {



  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setExpanded(false);
      } else {
        setExpanded('panel1');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  return (
    <>







      <div className="packResFilterBox" >
        <Accordion ref={accordionRef} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ width: '100%', border: "none" }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

              <Typography style={{
                fontFamily: 'Montserrat',
                fontSize: '12px',
                fontWeight: '400',
                textAlign: 'center'

              }} ><FilterAltIcon style={{ fontWeight: "600", fontFamily: "Montserrat", fontSize: '14px' }} /> Filter</Typography>

            </div>
          </AccordionSummary>
          <div style={{ color: '#0048FF', textDecoration: 'underline', textAlign: "right", paddingRight: "15px" }} >

          </div>
          <AccordionDetails>
            <div className="cheapestFilter">
              <p>Type</p>
              <div className="serviceFilterOne">
                <div>
                  <input type="checkbox" id="Open" name="Open" value="Open" />
                  <label>Open</label>
                </div>
                <div>
                  <input type="checkbox" id="Progress" name="Progress" value="Progress" />
                  <label > In Progress</label>
                </div>
                <div>
                  <input type="checkbox" id="Hold" name="Hold" value="Hold" />
                  <label > Hold</label>
                </div>
                <div>
                  <input type="checkbox" id="Hold" name="Hold" value="Hold" />
                  <label > Closed</label>
                </div>
                <div>
                  <input type="checkbox" id="Hold" name="Hold" value="Hold" />
                  <label > Rejected</label>
                </div>
                <div>
                  <input type="checkbox" id="Hold" name="Hold" value="Hold" />
                  <label > Re Open</label>
                </div>
              </div>
            </div>

            <div className="demographicFilter">
              <p>Demographic Type</p>
              <div className="demographicButton">
                <div>
                  <button>Non Set</button>
                </div>
                <div>
                  <button>Domestic</button>
                </div>
                <div>
                  <button>International</button>
                </div>
              </div>
            </div>

            <div className="fareFilter mt-3">
              <p>Restrict By Category</p>
              <div>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label > Amendment Request</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >BeddingTypeIssue</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >BeddingTypeIssue</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >Booking Cancelled at Hotel End</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >Book-out</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >Domestic Package</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >
                  Hotel Refund</label>
              </div>
              <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label >Hotel Cancellation/Amendment</label>
              </div>
            </div>

            <div className="airlinesFilter">
              <p>Restrict By Request Id</p>
              <div>
                <input className="input_date" type="text" style={{ border: '2px solid grey', marginLeft: '10px' }} />
              </div>

            </div>



            <div className="Request ">
              <p>Restrict By Request Date</p>
              <div>
                <label htmlFor="">From</label>
                <input className="input_date" type="text" style={{ border: '2px solid grey', }} />
              </div>
              <div>
                <label htmlFor="">To</label>
                <input mt={1} className="input_date" type="date" style={{ border: '2px solid grey', }} />
              </div>

            </div>

            <div className="Request mt-4">
              <p>Restrict By Reminder Date</p>
              <div>
                <label htmlFor="">From</label>
                <input className="input_date" type="text" style={{ border: '2px solid grey', }} />
              </div>
              <div>
                <label htmlFor="">To</label>
                <input mt={1} className="input_date" type="date" style={{ border: '2px solid grey', }} />
              </div>

            </div>

            <div className="serviceButtonBox">
              <button>Apply</button>
              <button>Reset</button>
            </div>

          </AccordionDetails>
        </Accordion>

      </div>



    </>
  );
};

export default ServicesFilter;
