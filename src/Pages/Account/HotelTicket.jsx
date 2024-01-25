import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../../Constants/constant";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import "./FlightTicket.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
const pdfLogo = "https://travvolt.s3.amazonaws.com/ST-Main-LogoPdf.png";
const Spinner = () => {
  return <div className="spinner"></div>;
};

const HotelTicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailTicket, setEmailTicket] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/HotelBooking/getoneHotelBookingById/${id}`
        );
        if (response?.data) {
          setData(response?.data);
          // console.log("Data fetched:", response.data);
        } else {
          console.error("No data received.");
        }
      } catch (error) {
        console.error("Error fetching Hotel booking:", error);
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
    return (
      <div
        style={{
          overflow: "hidden",
          padding: "10px",
          width: "800px",
          border: "1px solid #D6D8E7",
          color: "red",
          fontSize: "16px",
          height: "500px",
          fontFamily: "arial, sans-serif",
          margin: "10px auto",
        }}
      >
        Unable to open ticket. Unable to open ticket because Required parameters
        are missing.
      </div>
    );
  }
  // console.log(data, "data");

  // dateFormate

  

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

  const handleEmailTicket = () => {
    setShowEmailModal(true);
  };
  const handleCloseEmailModal = () => {
    // Close the modal and reset the form fields
    setShowEmailModal(false);
    setEmailTicket("");
  };

  const handleInputChangeEmail = (e) => {
    setEmailTicket(e.target.value);
  };

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
    // console.log("Form Data:", emailTicket, TicketId);
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/hotel/emailTicket`,
        { TicketId, emailTicket }
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

  const currentDate = new Date(data?.data[0]?.createdAt);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const noOfNights = () => {
    const checkInDateOld = new Date(data?.data[0]?.CheckInDate);
    const checkOutDateOld = new Date(data?.data[0]?.CheckOutDate);
    const timeDifference = checkOutDateOld.getTime() - checkInDateOld.getTime();
    return timeDifference / (1000 * 60 * 60 * 24);
  };

  const checkInDate = () => {
    const date = new Date(data?.data[0]?.CheckInDate);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  //Check Out Date formate
  const checkOutDate = () => {
    const date = new Date(data?.data[0]?.CheckOutDate);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
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
                      {data?.data?.length > 0 && data?.data[0]?.bookingId}
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
                      {data?.data?.length > 0 && data?.data[0]?.bookingId}
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

              <div
                style={{
                  width: "100%",                 
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display:'flex',
                  marginTop:'10px'
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "4px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      wordWrap: "break-word",
                    }}
                  >
                    {data?.data?.length > 0 && data?.data[0]?.hotelName}
                  </div>
                </div>
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      color: "#E73C33",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      wordWrap: "break-word",
                    }}
                  >
                    CONFIRMED
                  </div>
                  <div
                    style={{
                      color: "#071C2C",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      wordWrap: "break-word",
                    }}
                  >
                    THANK YOU
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                 
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "8px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    color: "#868686",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    wordWrap: "break-word",
                  }}
                >
                  {data?.data?.length > 0 && data?.data[0]?.address}
                </div>
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "inline-flex",
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
                      }}
                    ></div>
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        left: "2.50px",
                        top: "2.50px",
                        position: "absolute",
                      }}
                    >
                      <PhoneIcon />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#21325D",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      wordWrap: "break-word",
                    }}
                  >
                    98173678181, 8912731729
                  </div>
                </div>
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "inline-flex",
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
                      }}
                    ></div>
                    <div
                      style={{
                        width: "16.67px",
                        height: "13.33px",
                        left: "1.67px",
                        top: "3.33px",
                        position: "absolute",
                      }}
                    >
                      <EmailIcon />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#21325D",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      wordWrap: "break-word",
                    }}
                  >
                    HB374-RE@Skytrails.com
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: "12px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "36px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "0px",
                    border: "1px black solid",
                  }}
                ></div>
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "66.33px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{ flex: "1 1 0", alignSelf: "stretch" }}
                      ></div>
                     
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#E73C33",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {noOfNights()}-Nights Stay
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Check-in
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color: "#071C2C",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        {checkInDate()}
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      After 03:00 PM
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Check-out
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color: "#071C2C",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        {checkOutDate()}
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Before 12:00 PM
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "0px",
                    border: "1px black solid",
                  }}
                ></div>
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "66.33px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "120px",
                    display: "inline-flex",
                  }}
                >
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
                          background: "#D9D9D9",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "18.33px",
                          height: "13.33px",
                          left: "0.83px",
                          top: "3.33px",
                          position: "absolute",
                          background: "#E73C33",
                        }}
                      ></div>
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#E73C33",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                          wordWrap: "break-word",
                        }}
                      >
                        {data?.data?.length > 0 && data?.data[0]?.noOfPeople}{" "}
                        Guests
                        <br />
                      </span>
                      <span
                        style={{
                          color: "#868686",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                          wordWrap: "break-word",
                        }}
                      >
                        ({data?.data?.length > 0 && data?.data[0]?.noOfPeople}{" "}
                        Adults)
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "20px",
                      display: "inline-flex",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color: "#071C2C",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                          wordWrap: "break-word",
                        }}
                      >
                        {data?.data?.length > 0 && data?.data[0]?.name}{" "}
                      </span>
                      <span
                        style={{
                          color: "#868686",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                          wordWrap: "break-word",
                        }}
                      >
                        (Primary Guest)
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.data?.length > 0 && data?.data[0]?.email},{" "}
                      {data?.data?.length > 0 && data?.data[0]?.phone}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "0px",
                    border: "1px black solid",
                  }}
                ></div>
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "136px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
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
                          background: "#071C2C",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "16.67px",
                          height: "11.67px",
                          left: "1.67px",
                          top: "4.17px",
                          position: "absolute",
                          background: "#E73C33",
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#E73C33",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.data?.length > 0 && data?.data[0]?.room} Room
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "8px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Standard Room With 2 Single Beds
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "58px",
                          display: "inline-flex",
                        }}
                      >
                        <div
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "10px",
                            display: "inline-flex",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          color: "#071C2C",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                          wordWrap: "break-word",
                        }}
                      >
                        Restaurant
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "8px",
                        display: "inline-flex",
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
                            background: "#D9D9D9",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "18.33px",
                            height: "13.33px",
                            left: "0.83px",
                            top: "3.33px",
                            position: "absolute",
                            background: "#071C2C",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          color: "#071C2C",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                          wordWrap: "break-word",
                        }}
                      >
                        {data?.data?.length > 0 && data?.data[0]?.noOfPeople}{" "}
                        Adults
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "5px",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  background: "white",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "12px",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "20px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      paddingLeft: "28px",
                      paddingRight: "28px",
                      alignItems: "flex-start",
                      gap: "12px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "24px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.data?.length > 0 && data?.data[0]?.hotelName}
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "24px",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "120px",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          display: "flex",
                        }}
                      >
                        {/* ...Icons */}
                      </div>
                      <div
                        style={{
                          padding: "4px",
                          borderRadius: "4px",
                          border: "2px #E73C33 solid",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#071C2C",
                            fontSize: "8px",
                            fontFamily: "Montserrat",
                            fontWeight: "700",
                            wordWrap: "break-word",
                          }}
                        >
                          Couple Friendly
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    style={{
                      width: "247px",
                      height: "117px",
                      background:
                        "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                      borderRadius: "8px",
                    }}
                    src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/201610072207462380-180447-1ba3a1c68aaf11e898ae0a9df65c8753.jpg"
                    alt="Room"
                  />
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "28px",
                    paddingRight: "28px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 0",
                      color: "#BBBBBB",
                      fontSize: "12px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      letterSpacing: "0.48px",
                      wordWrap: "break-word",
                    }}
                  >
                    {checkInDate()} - {checkOutDate()} |{" "}
                    {data?.data?.length > 0 && data?.data[0]?.room} Room |{" "}
                    {data?.data?.length > 0 && data?.data[0]?.noOfPeople} Adults
                    ({data?.data?.length > 0 && data?.data[0]?.name} +{" "}
                    {data?.data?.length > 0 && data?.data[0]?.noOfPeople - 1})
                  </div>
                </div>
                {/* Room Type & Amenities Section */}
                <div
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "24px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      color: "#071C2C",
                      fontSize: "24px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      wordWrap: "break-word",
                    }}
                  >
                    Room Type & Amenities
                  </div>
                  <div
                    style={{
                      padding: "24px",
                      borderRadius: "12px",
                      border: "1px #868686 solid",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "24px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Standard Room With 2 Single Beds
                    </div>
                    {/* ...Amenities */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#071C2C",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      TV, Telephone, Centre Table, Bathroom, Chair, Seating
                      Area, Cupboards with Locks, Hot & Cold Water, Dining
                      Table, Sofa, Blackout Curtains, Blanket, Electronic Safe,
                      Living Area, Room Service, Western Toilet Seat, Bidet,
                      Housekeeping, Dining Area, Shaving Mirror, Toiletries,
                      Mineral Water, Wi-Fi, Bathroom Phone, Balcony, Hairdryer,
                      Geyser/Water Heater, Shower Cap, Mini Fridge, Kettle, Air
                      Conditioning, Dental Kit, Charging Points, Slippers,
                      In-room Dining.
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "12px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          color: "black",
                          fontSize: "20px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        INCLUSIONS
                      </div>
                      <div
                        style={{
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "12px",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "21px",
                            display: "inline-flex",
                          }}
                        >
                          <div
                            style={{
                              width: "472px",
                              color: "#071C2C",
                              fontSize: "12px",
                              fontFamily: "Montserrat",
                              fontWeight: "500",
                              wordWrap: "break-word",
                            }}
                          >
                            All transfers on private basis to airport and
                            sightseeing places.
                          </div>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "21px",
                            display: "inline-flex",
                          }}
                        >
                          <div
                            style={{
                              color: "#071C2C",
                              fontSize: "12px",
                              fontFamily: "Montserrat",
                              fontWeight: "500",
                              wordWrap: "break-word",
                            }}
                          >
                            Tickets to Miracle Garden
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* cancel refund policy start  */}

              <div
                style={{
                  width: "100%",
                  height: "100px",
                  marginTop: "5px",
                  background: "white",
                  boxShadow: "0px 2px 8px 2px rgba(0, 0, 0, 0.25)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "20px",
                    paddingLeft: "24px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "26px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      Cancellation Refund Policy
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "24px",
                    color: "#868686",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    wordWrap: "break-word",
                  }}
                >
                  {" "}
                  Free Cancellation (100% refund) Before {checkInDate()} .
                </div>
              </div>

              {/* cancel refund policy end  */}

              {/* fare break-down start */}

              <div
                style={{
                  width: "100%",
                  marginTop: "5px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px #868686 solid",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "10px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      color: "#071C2C",
                      fontSize: "24px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      wordWrap: "break-word",
                    }}
                  >
                    Booking Price Break-up
                  </div>
                </div>
                <div
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "20px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "64px",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Accommodation charges collected on behalf of hotel (incl.
                      applicable hotel taxes)
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      INR {data?.data?.length > 0 && data?.data[0]?.amount}
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "0px",
                      border: "1px #868686 solid",
                    }}
                  ></div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        color: "#E73C33",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      TOTAL
                    </div>
                    <div
                      style={{
                        color: "#E73C33",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      INR {data?.data?.length > 0 && data?.data[0]?.amount}
                    </div>
                  </div>
                </div>
              </div>

              {/* fare break-down end */}

              {/* hotel Amenities start */}

              <div
                style={{
                  width: "100%",
                  marginTop: "5px",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "24px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    color: "#071C2C",
                    fontSize: "24px",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  Hotel Amenities
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px #868686 solid",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "20px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Common Area
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Lounge, Lawn, Reception, Library, Seating Area, Outdoor
                      Furniture
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Outdoor Activities and Sports
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Water Sports, Outdoor Sports
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Business Center and Conferences
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Business Centre, Conference Room, Banquet
                    </div>
                  </div>
                </div>
              </div>

              {/* hotel amenities end */}

              {/* hotel rule start  */}

              <div
                style={{
                  width: "100%",
                  marginTop: "30px",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "24px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    color: "#071C2C",
                    fontSize: "24px",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  Rules & Policies
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px #868686 solid",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "20px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Food Arrangement
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Non veg food is allowed
                      <br />
                      Food delivery service is not available at the property
                      <br />
                      Outside food is not allowed
                    </div>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Smoking/alcohol Consumption Rules
                    </div>
                    <div
                      style={{
                        color: "#071C2C",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      There are no restrictions on alcohol consumption.
                      <br />
                      Smoking within the premises is not allowed
                    </div>
                  </div>
                </div>
              </div>

              {/* hotel rule end */}

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
                      +91 8917972301
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
                      support@theskytrails.com
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", margin: "0px", padding: 0 }}>
                <img
                  src="https://travvolt.s3.amazonaws.com/app_banner.png"
                  alt="SkyTrails_banner"
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    borderRadius: "15px",
                  }}
                />
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
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%", // Adjust the width as needed
                  maxWidth: 400, // Maximum width for responsiveness
                  backgroundColor: "white",
                  borderRadius: 8,
                  p: 1, // Padding
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <Typography variant="h6">Please Enter Email</Typography>
                <form
                  onSubmit={handleSubmitEmail}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!emailTicket}
                    >
                      Send
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={handleCloseEmailModal}
                    >
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

export default HotelTicket;
