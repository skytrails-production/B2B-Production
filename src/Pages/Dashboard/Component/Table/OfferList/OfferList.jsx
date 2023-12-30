import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './OfferList.css';
import { apiURL } from '../../../../../Constants/constant';

const AllOfferList = () => {
    const [offerList, setOfferList] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        async function fetchAgentRequestData() {
            setLoading(true); // Set loading state to true
            try {
                const response = await axios.get(`${apiURL.baseURL}/skyTrails/offers/getAllOffer`, {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchTerm,

                    }
                });
                setTotalPages(response.data.result.totalPages);
            } catch (error) {
                console.error('Error fetching Agent request List:', error);
            }
            setLoading(false);
        }
        fetchAgentRequestData();
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="agent-container">
<TextField
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name, ID, etc."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <div className="paginate">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button className="agentButton" key={i + 1} onClick={() => handlePageChange(i + 1)}>
                            <h5>{i + 1}</h5>
                        </button>
                    ))}
                </div>
        </div>)
}



export default AllOfferList;