import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, InputAdornment, Typography, Stack, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Alert } from "@mui/material";
import { apiURL } from "../../../../../Constants/constant";
import "./OfferList.css";
import {CircularProgress} from "@mui/material";
const AllOfferList = () => {
  const [offerList, setOfferList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    async function fetchOfferData() {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/offers/getAllOffer`, {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
          }
        });
        setTotalPages(response.data.result.totalPages);
        setOfferList(response.data.result.offerList);
        setDataAvailable(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offer list:', error);
        setDataAvailable(false);
        setLoading(false);
      }
    }
    fetchOfferData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {loading ? (
        <div style={{ position: 'absolute', top: '-20%', left: '0', right: '0', width: '100%', height: '290%', backdropFilter: 'blur(4.5px)', backgroundColor: '#d8d5e663', zIndex: 1 }}></div>
      ) : null}
    <div className="subada-table-container" style={{ position: "relative", width: "92%" }}>
      <div className="adsearch-bar" id="adssearch"style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold",width:'88%'}}>
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
        <Typography variant="h5" className="adtable-heading">
          Offer List
        </Typography>
      </div>
      <div style={{ marginTop:"0px", width: "100%", backgroundColor: "#fff" }}>
        {loading ? (
           <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             height: "300px",
           }}
         >
           <CircularProgress color="primary" size={69} thickness={4} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
         </div>
        ) : dataAvailable ? (
          <div className="paginate">
            {Array.from({ length: totalPages }, (_, i) => (
              <button className="agentButton" key={i + 1} onClick={() => handlePageChange(i + 1)}>
                <h5>{i + 1}</h5>
              </button>
            ))}
          </div>
        ) : (
          <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <Alert severity="info" variant="outlined">
              Data is not available
            </Alert>
          </div>
        )}
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Stack>
    </div>
    </>
  );
};

export default AllOfferList;
