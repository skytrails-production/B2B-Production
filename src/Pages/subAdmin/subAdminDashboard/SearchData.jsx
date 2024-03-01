import React, { useState, useEffect } from "react";
import { Pagination, Stack, Paper, Typography, TextField, InputAdornment } from "@mui/material";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { DataGrid,GridToolbarColumnsButton,GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import subAdminaccess from './subAdminaccess';
function SearchData() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const reducerState = useSelector((state) => state);
  const access = reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;


    const fetchData = async (pageNumber) => {
        try {
            const response = await axios.get(
                `${apiURL.baseURL}/skyTrails/api/admin/userSearchHistory?page=${pageNumber}`,
                {
                    params: {
                        search: searchTerm,
                    },
                }
            );
            const result = response.data.result.docs;
            setData(result);
            setTotalPages(response.data.result.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to the first page when performing a new search
    };

    useEffect(() => {
        fetchData(page);
    }, [page, searchTerm]);


    // const handlePageChange = (event, value) => {
    //   setPage(value);
    // };



    useEffect(() => {
        fetchData(page);
    }, [page, searchTerm]);
    const columns = [

        { field: "origin", headerName: "Origin", width: 220, },
        { field: "destination", headerName: "Destination", width: 220, },
        {
            field: "journeyDate",
            headerName: "Journey Date",
            width: 220,
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        { field: "status", headerName: "Status", width: 220, },
        { field: "searchType", headerName: "Search Type", width: 220, },
    ];

    return (
        <>
         {access !== "USER_MANAGER" ? <div><subAdminaccess /></div> : <Paper
            className="subada-table-container"
            elevation={3}
            style={{
                position: "relative",
                width: "100%",
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                marginTop: "-15px"
            }}
        >
            <div
                className="adsearch-bar"
                style={{
                    position: "absolute",
                    top: 10,
                    zIndex: 1,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#E73C33"
                }}
            >
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
                <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
                    Search Data
                </Typography>
            </div>
            <div style={{ width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10} // Number of items per page
                    pagination
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={[]}

                    getRowId={(row) => row._id}
                    components={{
                        Toolbar: () => (
                            <div style={{ marginTop: '10px' }}>
                            <GridToolbarColumnsButton />
                            <GridToolbarExport/>
                          </div>
                        ),
                        Pagination: () => null,
                    }}
                />
            </div>


        </Paper >}
        </>
       
    );
}

export default SearchData;
