import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./FlightTicket.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { apiURL } from "../../Constants/constant";

const Spinner = () => {
    return (
        <div className="spinner">

        </div>
    );
};

const HolidayChangeReq = () => {
    const reducerState = useSelector((state) => state);
    const userId = reducerState?.logIn?.loginData?.data?.data?.id;
    const [holidayData, setHolidayData] = useState([]);
    const [loading, setLoading] = useState(false);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModalTwo, setOpenModalTwo] = React.useState(false);
    const handleModalOpenTwo = () => setOpenModalTwo(true);
    const handleModalCloseTwo = () => setOpenModalTwo(false);

    const [reason, setReason] = useState('');
    const [selectedHoliday, setSelectedHoliday] = useState(null);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    const fetchHolidayData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL.baseURL}/skytrails/user/getAllAgentHolidayBookingList?userId=${userId}`, {
                params: {
                    page: currentPage,
                    size: pageSize,
                    search: searchTerm,
                }
            });
            setHolidayData(response.data.result.docs);
            setTotalPages(response.data.result.totalPages);
        } catch (error) {
            console.error('Error fetching hotel bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitHoliday = async (event) => {
        event.preventDefault();

        if (!selectedHoliday) {
            // Handle error, no hotel selected
            return;
        }

        const selectedReason = document.querySelector('input[type=radio]:checked');
        const selectedCheckboxValue = selectedReason ? selectedReason.value : null;

        const formData = {
            "reason": reason,
            "changerequest": selectedCheckboxValue,
            "bookingId": selectedHoliday.bookingId,
            "id": selectedHoliday?._id,
            "agentId": selectedHoliday?.userId,
            "contactNumber": selectedHoliday?.phone,
            "amount": selectedHoliday?.amount,
        };
        // console.log(formData)

        try {
            const response = await axios.post(`${apiURL.baseURL}/skytrails/user/HolidayDetailsRequest`, formData);
            // console.log('Response from the server:', response.data);
            setOpenModalTwo(false);

        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };

    useEffect(() => {
        fetchHolidayData();
    }, [currentPage, searchTerm]);

    return (
        <div>
            {
                loading ? (<Spinner />)
                    : (
                        holidayData.map((holiday, index) => (
                            <div className="ticket" key={index}>
                                <div className="ticketcart">
                                    <div className="innerdiv1">
                                        <p>Customer Name: {holiday.name}</p>
                                        <p>Package Name: {holiday.packageName}</p>
                                        <p>Origin: {holiday.origin}</p>
                                        <p>Destination: {holiday.destination}</p>
                                    </div>
                                    <div className="innerdiv2">
                                        <p>PNR: {holiday.pnr}</p>
                                        <p>No Of Seats: {holiday.noOfSeats }</p>
                                        <p>Status: {holiday.bookingStatus}</p>
                                    </div>
                                    <div className="btn-request">
                                        <button onClick={() => {
                                            handleModalOpenTwo();
                                            setSelectedHoliday(holiday);
                                        }}>Change Request</button>
                                    </div>
                                </div>
                                <div className="action">
                                    <div className="link">
                                        <a href="http://">Fare Rule</a>
                                        <a href="http://">View Ticket</a>
                                        <Link onClick={() => {
                                            handleModalOpenTwo();
                                            setSelectedHoliday(holiday);
                                        }} to="">Change Request</Link>
                                    </div>
                                    <div className="view">
                                        <button>View Invoice</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
            }

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
                            {selectedHoliday && (
                    <p>
                        <span>PNR:- </span> {selectedHoliday.pnr}
                    </p>
                )}
                        </div>
                        <form action="">
                            <div className="input-text" >
                                <label className="bold" htmlFor="reason">Write Your Valid Reason</label>
                                <input type="text" id="reason" onChange={handleReasonChange} />
                            </div>
                            <label className="bold" htmlFor="">Please Select a Valid Reason </label>
                            <div className="input-check">

                                <div className="formGroup">
                                    <input
                                        type="radio"
                                        name="checkbox1"
                                        value={"Change in Travel Plans"}
                                    />
                                    <label>Change in Travel Plans
                                    </label>
                                </div>

                                <div className="formGroup">
                                    <input
                                        type="radio"
                                        name="checkbox2"
                                        value={"Travel Advisory or Warnings"}
                                    />
                                    <label> Travel Advisory or Warnings
                                    </label>
                                </div>

                                <div className="formGroup">
                                    <input
                                        type="radio"
                                        name="checkbox3"
                                        value={"Visa or Documentation Problems"}
                                    />
                                    <label>Visa or Documentation Problems
                                    </label>
                                </div>

                                <div className="formGroup">
                                    <input
                                        type="radio"
                                        name="checkbox4"
                                        value={"Medical Issues"}
                                    />
                                    <label>Medical Issues
                                    </label>
                                </div>

                                <div className="formGroup">
                                    <input
                                        type="radio"
                                        name="checkbox5"
                                        value={"Other"}
                                    />
                                    <label> Other
                                    </label>
                                </div>
                            </div>
                            <div className="modal-button">
                                <button type="button" onClick={handleModalCloseTwo}>Cancel</button>
                                <button className="second" type="submit" onClick={handleSubmitHoliday}>Send Request</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default HolidayChangeReq;
