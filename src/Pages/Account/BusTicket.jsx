import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../../Constants/constant";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Modal, Box, TextField, Button,Typography } from '@mui/material';
import "./FlightTicket.css";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
const pdfLogo = "https://travvolt.s3.amazonaws.com/ST-Main-LogoPdf.png";
const Spinner = () => {
  return <div className="spinner"></div>;
};

const BusTicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailTicket,setEmailTicket]=useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/BusBooking/getoneBusBookingById/${id}`
        );
        if (response?.data) {
          setData(response?.data);
          // console.log("Data fetched:", response.data);
        } else {
          console.error("No data received.");
        }
      } catch (error) {
        console.error("Error fetching Bus booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Display loading spinner or message while fetching data
  if (loading) {
    return <Spinner />;
  }

  // Check if data exists and has elements before accessing its properties
  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return <div style={{ overflow: 'hidden',
    padding: '10px',
    width: '800px',
    border: '1px solid #D6D8E7',
    color:'red',
    fontSize: '16px',
    height: '500px',
    fontFamily: 'arial, sans-serif',
    margin: '10px auto'}}>Unable to open ticket. Unable to open ticket because Required parameters are missing.</div>;
  }
  // console.log(data, "data");

  const currentDate = new Date(data?.data[0]?.createdAt);
  
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  // dateFormate

  function formatDate(dateString, format) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  }

  const boardingTimeFormatted = formatDate(data?.data[0]?.departureTime, 'DD MMMM YYYY hh:mm A');
  const journeyDateFormatted = formatDate(data?.data[0]?.departureTime, 'ddd, DD MMM YYYY');
  const depTimeFormatted = formatDate(data?.data[0]?.departureTime, 'hh:mm A');

 

  // Function to handle printing
  const handlePrintTicket = () => {
    const element = document.getElementById("pdf-content");
    const content = element.innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailTicket=()=>{
    setShowEmailModal(true);

  }
  const handleCloseEmailModal = () => {
    // Close the modal and reset the form fields
    setShowEmailModal(false);
    setEmailTicket('')
  };

  const handleInputChangeEmail=(e)=>{
    setEmailTicket(e.target.value);
  }

  const handleSubmitEmail = async (e) => {
    

    e.preventDefault();
    // Send data to the API
    if (!isValidEmail(emailTicket)) {
    await Swal.fire({
        title: "Invalid Email Id",
        text: "Please Enter Valid Email",
        icon: "error",
        confirmButtonText: "OK",
      });
      
      return;
    }
    

   
    const TicketId = id;
    // const payload={
    //    TicketId,
    //   ...formData
    // }
    // console.log('Form Data:',emailTicket);    
    setLoading(true);
    try {
      const response = await axios.post(`${apiURL.baseURL}/skyTrails/bus/emailTicket`,
        { TicketId,
          emailTicket}
      );
      if (response && response.data) {
        setLoading(false);
        const { data } = response.data;
        // Display the API response message in a SweetAlert
        await Swal.fire({
          title: "Sent Email",
          text: data,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // Close the modal and reset the form fields after sending data
    handleCloseEmailModal();
  };

 

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              background: "#fff",
              overflow: "hidden",
              padding: "10px",
              width: "800px",
              border: "1px solid #D6D8E7",
              fontSize: "12px",
              fontFamily: "Montserrat, sans-serif",
              margin: "10px auto",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
                display: "flex",
              }}
            >
              <button
                onClick={handleBack}
                style={{ color: "blue", border: "none" }}
              >
                <KeyboardBackspaceIcon sx={{ width: 80 }} />
              </button>

              {/* Button to download as PDF */}
              <button
                onClick={handleEmailTicket}
                style={{
                  padding: "0.2rem",
                  background: "red",
                  color: "#fff",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                Email Ticket
              </button>

              {/* Button to print ticket */}
              <button
                onClick={handlePrintTicket}
                style={{
                  padding: "0.2rem",
                  background: "red",
                  color: "#fff",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                Print Ticket
              </button>
            </div>

            <div id="pdf-content">

            
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "flex",
                  marginTop: "24px",
                }}
              >
                <img
                  src={pdfLogo}
                  alt="logo"
                  style={{ width: "25%", marginTop: "-10px" }}
                />
                <div
                  style={{
                    color: "black",
                    fontSize: "24px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  E - Ticket
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Booking Id:
                    </div>
                    <div
                      style={{
                        color: "#071c2c",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.data?.length > 0 && data?.data[0]?.pnr}
                    </div>
                  </div>

                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      PNR:
                    </div>
                    <div
                      style={{
                        color: "#071c2c",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.data?.length > 0 && data?.data[0]?.pnr}
                    </div>
                  </div>

                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      (Booked on {formattedDate})
                    </div>
                  </div>
                </div>
              </div>

              
                {/* Passenger Details */}
                



                <div style={{marginTop: '15px',width: '100%',}}>
              <b>Ticket Reservation</b> Please take a print of this ticket. A copy of the ticket has to be produced at the
              time of boarding. Please be present atleast 15 mins prior to time of departure at the boarding point
            </div>

    <div style={{ width: '100%', marginTop: '20px', border: '1px solid #D6D8E7' }}>
      <div style={{ width: '100%', display: 'flex', background: '#004684', fontWeight: 'bold', padding: '5px', paddingRight: '0', color: '#fff', overflow: 'hidden' }}>
        <p style={{ width: '40%',margin: '0 4px 0 0' }}>
          Passenger Name
        </p>
        <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
          Ticket Number
        </p>
        <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
          Seat Number
        </p>
        <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
          Price
        </p>
      </div>

      {data?.data?.length > 0 && data?.data[0]?.passenger.map((item, index) => (
        <div key={index} style={{ width: '100%', display: 'flex', padding: '5px 0 0 5px', overflow: 'hidden' }}>
          <p style={{ width: '40%',margin: '0 4px 0 0' }}>
            {`${item?.title} ${item?.firstName} ${item?.lastName}`}
          </p>
          <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
            {data?.data[0].pnr}
          </p>
          <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
            {item.seatNumber}
          </p>
          <p style={{ width: '20%', textAlign: 'center',margin: '0 4px 0 0' }}>
            Rs. {item.Price}
          </p>
        </div>
      ))}
    </div>



    <div style={{ width: '100%', float: 'left', marginTop: '15px', border: '1px solid #D6D8E7' }}>
      <div style={{ width: '100%', background: '#004684', float: 'left', fontWeight: 'bold', padding: '5px', paddingRight: '0px', borderBottom: '1px solid #D6D8E7', color: '#fff' }}>
        <div style={{ width: '100%', float: 'left', marginRight: '0' }}>
          Bus Details
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '5px 0 1px 5px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <p style={{margin: '0 4px 0 0'}}><strong>From:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Travels:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Journey Date:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>PNR:</strong></p>
          </div>
          <div>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.origin}</p>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.travelName}</p>
            <p style={{margin: '0 4px 0 0'}}>{journeyDateFormatted}</p>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.pnr}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <p style={{margin: '0 4px 0 0'}}><strong>To:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Bus Type:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Dep time:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Price:</strong></p>
          </div>
          <div>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.destination}</p>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.busType}</p>
            <p style={{margin: '0 4px 0 0'}}>{depTimeFormatted}</p>
            <p style={{margin: '0 4px 0 0'}}>₹ {data?.data[0]?.amount}.00</p>
          </div>
        </div>
      </div>
    </div>



    <div style={{ width: '100%', float: 'left', marginTop: '15px', border: '1px solid #D6D8E7' }}>
      <div style={{ width: '100%', background: '#004684', display: 'flex', fontWeight: 'bold', padding: '5px', paddingRight: '0px', borderBottom: '1px solid #D6D8E7', color: '#fff' }}>
        <div style={{ width: '50%', marginRight: '0' }}>
          Boarding Address
        </div>
        <div style={{ width: '50%', marginRight: '0' }}>
          Bus Support No: 080-30916657
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '20%', padding: '5px 0 0px 5px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <p style={{margin: '0 4px 0 0'}}><strong>Location:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Landmark:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Address:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Boarding time:</strong></p>
            <p style={{margin: '0 4px 0 0'}}><strong>Contact number:</strong></p>
          </div>
          <div>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.BoardingPoint?.Location}</p>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.BoardingPoint?.Landmark}</p>
            <p style={{margin: '0 4px 0 0'}}>{data?.data[0]?.BoardingPoint?.Address}</p>
            <p style={{margin: '0 4px 0 0'}}>{boardingTimeFormatted}</p>
            <p style={{margin: '0 4px 0 0'}}>1234567890</p>
          </div>
        </div>
        <div>
          <div>Bus Help Line Numbers</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <p style={{margin: '0 4px 0 0'}}><strong>Ahmedabad</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Bangalore</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Chennai</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Delhi</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Hyderabad</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Mumbai</strong></p>
              <p style={{margin: '0 4px 0 0'}}><strong>Pune</strong></p>
            </div>
            <div>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
              <p style={{margin: '0 4px 0 0'}}>:</p>
            </div>
            <div>
              <p style={{margin: '0 4px 0 0'}}>079-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>080-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>044-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>011-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>040-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>022-39412345</p>
              <p style={{margin: '0 4px 0 0'}}>020-39412345</p>
            </div>
          </div>
        </div>
      </div>
      </div>
   


    <div style={{ width: '100%', float: 'left', marginTop: '15px', border: '1px solid #D6D8E7' }}>
      <div style={{ width: '100%', background: '#004684', float: 'left', fontWeight: 'bold', padding: '5px', paddingRight: '0px', borderBottom: '1px solid #D6D8E7', color: '#fff' }}>
        <div style={{ width: '100%', float: 'left', marginRight: '0' }}>
          Cancellation Details
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '5px 0 0px 5px' }}>
        <div >
          <p style={{margin: '0 4px 0 0'}}><strong>Cancellation time</strong></p>
          {data?.data?.length > 0 && data?.data[0]?.CancelPolicy.map(policy => <p style={{margin: '0 4px 0 0'}} key={policy.PolicyString}>{policy.PolicyString}</p>)}
        </div>
        <div>
          <p style={{margin: '0 4px 0 0'}}><strong>Cancellation charges</strong></p>
          {data?.data?.length > 0 && data?.data[0]?.CancelPolicy.map(policy => <p style={{margin: '0 4px 0 0'}} key={policy.CancellationCharge}>{policy.CancellationCharge}%</p>)}
        </div>
      </div>
    </div>
                

                
               
               


                <div
                  style={{
                    marginTop: "5px",

                    paddingTop: "24px",
                    paddingBottom: "24px",
                    background: "white",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "12px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "24px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      color: "#e73c33",
                      fontSize: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      wordWrap: "break-word",
                    }}
                  >
                    The Skytrails Support
                  </div>
                  <div
                    style={{
                      width: "80%",
                      height: "48px",
                      justifyContent: "center",
                      alignItems: " center",
                      gap: "40px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px",
                        
                        borderRadius: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        display: "flex",
                      }}
                    >
                      <p
                        style={{
                          color: "#e73c33",
                          fontSize: " 20px",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                          wordWrap: "break-word",
                          margin: "0",
                        }}
                      >
                        +91 9209793097
                      </p>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "8px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            left: "0px",
                            top: "0px",
                            position: "absolute",
                            background: "#21325d",
                          }}
                        ></div>
                        <div
                          style={{
                            width: " 16.67px",
                            height: " 13.33px",
                            left: "1.67px",
                            top: "3.33px",
                            position: "absolute",
                            backgroundColor: "#e73c33",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          color: "#e73c33",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          wordwrap: "break-word",
                        }}
                      >
                        Info@theskytrails.com
                      </div>
                    </div>
                  </div>
                </div>

                <div  style={{ width: '100%', margin:'0px', padding:0}}>
            <img src="https://travvolt.s3.amazonaws.com/app_banner.png" alt="SkyTrails_banner" style={{width: '100%',
              marginTop: '15px',
              borderRadius: '15px'}} />
          </div>
                </div>

                <div
                  style={{
                    marginTop: "5px",

                    paddingTop: "24px",
                    paddingBottom: "24px",
                    background: "white",
                    borderRadius: "12px",
                    text: "center",
                    gap: "24px",
                    display: "flex",
                  }}
                >
                   <button
                     onClick={handleEmailTicket}
                    style={{
                      padding: "0.2rem",
                    }}
                  >
                    Email Ticket
                  </button>
                  <button
                    onClick={handlePrintTicket}
                    style={{
                      padding: "0.2rem",
                    }}
                  >
                    Print Ticket
                  </button>
                </div>

              
            
          </div>

          {showEmailModal && (
       <Modal
       onClose={handleCloseEmailModal}
       open={showEmailModal}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box
         sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '90%', // Adjust the width as needed
           maxWidth: 400, // Maximum width for responsiveness
           backgroundColor: 'white',
           borderRadius: 8,
           p: 1, // Padding
           textAlign: 'center',
           display: 'flex',
           flexDirection: 'column',
           gap: '0.5em',
         }}
       >
         <Typography variant="h6">Please Enter Email</Typography>
         <form onSubmit={handleSubmitEmail} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <TextField
             label="Email"
             type="text"
             name="email"
             value={emailTicket}
             onChange={handleInputChangeEmail}
             fullWidth
             margin="normal"
             InputLabelProps={{ shrink: true }}
           />
          
           
           <div style={{ display: 'flex',alignItems:'center', justifyContent:'center', gap:10 }}>
             <Button type="submit" variant="contained" color="primary" disabled={!emailTicket}>
               Send
             </Button>
             <Button type="button" variant="contained" color="error" onClick={handleCloseEmailModal}>
               Cancel
             </Button>
           </div>
         </form>
       </Box>
     </Modal>
     
      )}
        </>
      )}
    </>
  );
};

export default BusTicket;
