
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./FlightTicket.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { apiURL } from "../../Constants/constant";

const Spinner = () => {
  return <div className="spinner"></div>;
};

const FlightChangeReq = () => {
  const reducerState = useSelector((state) => state);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingFareRule, setFetchingFareRule] = useState(false); // Changed initialization to 'false'
  const [fareRuleContent, setFareRuleContent] = useState(''); // State to store fetched fare rule content
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModalTwo, setOpenModalTwo] = useState(false);
  const [openModalFareRule, setOpenModalFareRule]=useState(false);
  const handleModalOpenFareRule = () => setOpenModalFareRule(true);
  const handleModalCloseFareRule =() => setOpenModalFareRule(false);
  const [openModalCancelRequest, setOpenModalCancelRequest]=useState(false);
  const handleModalOpenCancelRequest = () => setOpenModalCancelRequest(true);
  const handleModalCloseCancelRequest =() => setOpenModalCancelRequest(false);
  const handleModalOpenTwo = () => setOpenModalTwo(true);
  const handleModalCloseTwo = () => setOpenModalTwo(false);

  const [reason, setReason] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
  };

  const fetchFlightData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skytrails/user/getAllAgentFlightBookingList?userId=${userId}`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        }
      );
      setFlightData(response.data.result.docs);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error("Error fetching hotel bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFlight = async (event) => {
    event.preventDefault();

    if (!selectedFlight) {
      // Handle error, no hotel selected
      return;
    }

    const selectedReason = document.querySelector("input[type=radio]:checked");
    const selectedCheckboxValue = selectedReason ? selectedReason.value : null;

    const formData = {
      reason: reason,
      changerequest: selectedCheckboxValue,
      bookingId: selectedFlight?.bookingId,
      id: selectedFlight?._id,
      agentId: selectedFlight?.userId,
      contactNumber: selectedFlight?.passengerDetails[0]?.ContactNo,
      amount: Number(selectedFlight?.amount),
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skytrails/user/changeFlightDetailsRequest`,
        formData
      );
      // console.log("Response from the server:", response.data);
      setOpenModalTwo(false);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  const handleSubmitFlightCancelRequest = async (event) => {
    event.preventDefault();

    if (!selectedFlight) {
      // Handle error, no hotel selected
      return;
    }

    const selectedReason = document.querySelector("input[type=radio]:checked");
    const selectedCheckboxValue = selectedReason ? selectedReason.value : null;

    const formData = {
      reason: reason,
      // changerequest: selectedCheckboxValue,
      bookingId: selectedFlight?.bookingId,
      flightBookingId: selectedFlight?._id,
      agentId: selectedFlight?.userId,
      pnr: selectedFlight?.pnr,
      
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skytrails/api/agent/cancelFlightBooking`,
        formData
      );
      // console.log("Response from the server:", response.data);
      setOpenModalCancelRequest(false);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchFlightData();
  }, [currentPage, searchTerm]);


  const formatDate = (dateString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

 
  const handleSubmitFareRule= async ()=>{
    // e.preventDefault();

    if (!selectedFlight) {
      return;
    }

    setFetchingFareRule(true); // Set fetching state to true

    const formData = {
      BookingId: selectedFlight?.bookingId,
      // TokenId: "1fcfa856-769f-4804-a1fd-fffac430b8e0",
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      PNR: selectedFlight?.pnr      
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/flight/getbookingdetails`,
        formData
      );
      // console.log("Response from the server:", response?.data?.data?.Response?.FlightItinerary?.FareRules[0]?.FareRuleDetail);
      const fetchedFareRule =response?.data?.data?.Response?.FlightItinerary?.FareRules[0]?.FareRuleDetail;

      setFareRuleContent(fetchedFareRule); // Set fetched content to state
      setFetchingFareRule(false); // Reset fetching state to false after fetching data
      setOpenModalFareRule(true); // Open modal after fetching fare rule data
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }

  }

  const handleFareRuleClick = async (flight) => {
    setSelectedFlight(flight);
    setFareRuleContent(''); // Reset fare rule content when initiating a new fetch
    setFetchingFareRule(true); // Set fetching state to true
    await handleSubmitFareRule(); // Wait for fare rule data
  };

  
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        flightData.map((flight, index) => {
          
          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth() + 1; 
          const day = today.getDate();
          const currentDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

          const journeyDate = flight?.airlineDetails[0]?.Origin?.DepTime;
          const differenceInMs = new Date(journeyDate) - new Date(currentDate);
          const millisecondsInADay = 1000 * 60 * 60 * 24;
          const differenceInDays = Math.floor(differenceInMs / millisecondsInADay);
          return (
          <div className="ticket" key={index}>
            <div className="ticketcart">
            <div className="innerdiv1">
  <p>
    Passenger Name:{" "}
    {flight.passengerDetails?.[0]?.firstName} {flight.passengerDetails?.[0]?.lastName}
  </p>
  <p>Flight Name: {flight?.airlineDetails?.[0]?.Airline?.AirlineName}</p>
  <p>Departure: {formatDate(flight?.airlineDetails?.[0]?.Origin?.DepTime)}</p>
  <p>
    {flight?.airlineDetails?.[0]?.Origin?.CityName}
    <ArrowForwardIcon /> {flight?.airlineDetails?.[0]?.Destination?.CityName}
    {flight?.airlineDetails?.length > 1 && <ArrowForwardIcon />}
    {flight?.airlineDetails?.[1]?.Destination?.CityName}
  </p>
</div>

              <div className="innerdiv2">
                <p>PNR: {flight.pnr}</p>
                <p>Reference Code: {flight.bookingId}</p>
                <p>Status: {flight.bookingStatus}</p>
              </div>
              {/* <div className="btn-request">
                <button type="submit">Change Request</button>
              </div> */}
            </div>
            <div className="action">
              <div className="link">
                <Link 
                onClick={() => {
                  handleFareRuleClick(flight)
                }}
                to="">Fare Rule</Link>
                <Link to={`/FlightEticket/${flight._id}`}>View Ticket</Link>
                {differenceInDays<0?(null):(
                  <Link
                    onClick={() => {
                      handleModalOpenTwo();
                      setSelectedFlight(flight);
                    }}
                    to=""
                  >
                    Change Request
                  </Link>
               )}
               {differenceInDays<0?(null):(
                  <Link
                    onClick={() => {
                      handleModalOpenCancelRequest();
                      setSelectedFlight(flight);
                    }}
                    to=""
                  >
                    Cancel Request
                  </Link>
              )}
              </div>
              {/* <Link to={`/FlightConfirmBooking/${flight._id}`}>
              <div className="view">
                <button >Open</button>
              </div></Link> */}
              <Link to=''>
              <div className="view">
                <button >Open</button>
              </div></Link>
            </div>
          </div>
        )
                })
      )}

      {/* Add pagination controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <Modal
        open={openModalFareRule}
        onClose={handleModalCloseFareRule}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalBox">
          <div className="modalContent">
            {fetchingFareRule ? (
              <div className="loading">Loading...</div>
            ) : (
              <div
                className="fare-rule-content"
                dangerouslySetInnerHTML={{ __html: fareRuleContent }}
              ></div>
            )}
          </div>
          <div className="modalButton">
            <button type="button" className="buttonClose" onClick={handleModalCloseFareRule}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openModalTwo}
        onClose={handleModalCloseTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-box">
            <div className="modal-header">
              <h2>Change Request</h2>
              {selectedFlight && (
                <p>
                  <span>PNR:-</span> {selectedFlight.pnr}
                </p>
              )}
            </div>
            <form action="">
              <div className="input-text">
                <label className="bold" htmlFor="reason">
                  Write Your Valid Reason
                </label>
                <input type="text" id="reason" onChange={handleReasonChange} />
              </div>
              <label className="bold" htmlFor="">
                Please Select a Valid Reason{" "}
              </label>
              <div className="input-check">
                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox1"
                    value={"Change in Travel Plans"}
                  />
                  <label>Change in Travel Plans</label>
                </div>

                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox2"
                    value={"Travel Advisory or Warnings"}
                  />
                  <label> Travel Advisory or Warnings</label>
                </div>

                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox3"
                    value={"Visa or Documentation Problems"}
                  />
                  <label>Visa or Documentation Problems</label>
                </div>

                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox4"
                    value={"Medical Issues"}
                  />
                  <label>Medical Issues</label>
                </div>

                <div className="formGroup">
                  <input type="radio" name="checkbox5" value={"Other"} />
                  <label> Other</label>
                </div>
              </div>
              <div className="modal-button">
                <button type="button" onClick={handleModalCloseTwo}>
                  Cancel
                </button>
                <button
                  className="second"
                  type="submit"
                  onClick={handleSubmitFlight}
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      {/* Modal  */}

      <Modal
        open={openModalCancelRequest}
        onClose={handleModalCloseCancelRequest}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-box">
            <div className="modal-header">
              <h2>Cancel Request</h2>
              {selectedFlight && (
                <p>
                  <span>PNR:-</span> {selectedFlight.pnr}
                </p>
              )}
            </div>
            <form action="">
            <label className="bold" htmlFor="">
                Please Select a Valid Reason{" "}
              </label>
              <div className="input-check">
                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox1"
                    value={"Cancel Flight Booking Request"}
                    checked
                  />
                  <label>Cancel Flight Booking Request</label>
                </div>


                {/* <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox2"
                    value={"Travel Advisory or Warnings"}
                  />
                  <label> Travel Advisory or Warnings</label>
                </div>

                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox3"
                    value={"Visa or Documentation Problems"}
                  />
                  <label>Visa or Documentation Problems</label>
                </div>

                <div className="formGroup">
                  <input
                    type="radio"
                    name="checkbox4"
                    value={"Medical Issues"}
                  />
                  <label>Medical Issues</label>
                </div>

                 <div className="formGroup">
                  <input type="radio" name="checkbox5" value={"Other"} />
                  <label> Other</label>
                </div> */}
              </div>
              <div className="input-text">
                <label className="bold" htmlFor="reason">
                  Write Your Valid Reason
                </label>
                <input type="text" id="reason" onChange={handleReasonChange} />
              </div>
              
              <div className="modal-button">
                <button type="button" onClick={handleModalCloseCancelRequest}>
                  Cancel
                </button>
                <button
                  className="second"
                  type="submit"
                  onClick={handleSubmitFlightCancelRequest}
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FlightChangeReq;
