
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

const FixDeparture = () => {
  const reducerState = useSelector((state) => state);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [fixDepartureData, setFixDepartureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModalTwo, setOpenModalTwo] = useState(false);
  
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

  const fetchFixDepartureData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/getallfixdeparture?userId=${userId}`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          },
        }
      );
      setFixDepartureData(response.data.result.docs);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error("Error fetching hotel bookings:", error);
    } finally {
      setLoading(false);
    }
  };

 



  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchFixDepartureData();
  }, [currentPage, searchTerm]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        fixDepartureData.map((flight, index) => {
          
       
          return (
          <div className="ticket" key={index}>
            <div className="ticketcart">
              <div className="innerdiv1">
                
                <p>Seats: {flight.numberOfSeats}</p>
                <p>Total Price: {flight.finalSalePrice}</p>
                <p>
                  {" "}
                  {/* {flight.origin} */}
                  {/* <ArrowForwardIcon /> {flight.destination}*/}
                </p> 
              </div>
              <div className="innerdiv2">
                {/* <p>Seats: {flight.noOfSeats}</p>
                <p>Total Price: {flight.finaleSalePrice}</p>
                <p>Status: {flight.status}</p> */}
              </div>
            </div>
            <div className="action">
              <div className="link">
                
                {/* {differenceInDays<0?(null):( */}
                  {/* <Link
                    onClick={() => {
                      handleModalOpenTwo();
                      setSelectedFlight(flight);
                    }}
                    to=""
                  >
                    Change Request
                  </Link> */}
               {/* )} */}
              
              </div>
              {/* <div className="view">
                <button>View Invoice</button>
              </div> */}
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

 

      {/* Modal  */}

      
    </div>
  );
};

export default FixDeparture;
