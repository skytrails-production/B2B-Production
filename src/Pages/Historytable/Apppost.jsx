import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";
import ConfirmationDialog from "./ConfirmationDialog";
import appPost from "../../../src/Images/appPost.png";

const PAGE_SIZE = 10;
function Apppost() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const fetchData = async (pageNumber) => {
    try { 
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/forumPost/getPost?page=${pageNumber}&searchTerm=${searchTerm}`
      );
      const val = response.data.result.post;
      const filteredPosts = val.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.userDetail && post.userDetail.username.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setPosts(filteredPosts);
     // setTotalPages(response.data.result.totalPages);
     // Calculate total pages based on the total number of items and page size
    const totalCount = response.data.result.totalCount;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage,searchTerm]);
  const handleDelete = (postId) => {
    setSelectedPostId(postId); // Set the postId of the post to delete
    setConfirmationOpen(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async (id) => {
    try {
      // Send a request to delete the post with the selectedPostId
      await axios.delete(
        `${apiURL.baseURL}/skyTrails/api/admin/deletePost/${selectedPostId}`
      );
      // If deletion is successful, update the posts state by filtering out the deleted post
      const updatedPosts = posts.filter((post) => post._id !== selectedPostId);
      setPosts(updatedPosts);
      // Close the confirmation dialog
      setConfirmationOpen(false);
    } catch (error) {
      //console.error("Error deleting post:", error);
      // Handle error appropriately
    }
  };

  const columns = [
    {
      field: "userDetail.profilePic",
      headerName: "Images",
      width: 180,
      renderCell: (params) => (
        <img
          src={
           !params?.row?.image
              ? appPost
              : params?.row?.image
          }
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },

    {
      field: "userDetail.username",
      headerName: "Name",
      width: 200,
      valueGetter: (params) =>
        params.row.userDetail && params.row.userDetail.username,
    },

    {
      field: "content",
      headerName: "Content",
      width: 400,
      valueGetter: (params) => params.row.content,
    },
    {
        field:"likesCount",
        headerName: "Likes",
        width:150,
        valueGetter: (params)=>params.row.likesCount,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => (params.row.status === "ACTIVE" ? "Active" : "Deactive"),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
    {loading?(
       <div style={{position: 'absolute', top: '-20%', left: '0', right:'0' ,width: '100%', height: '100%', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 230, 220, 0.5)', zIndex: 1}}></div>
    ):null}
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <Paper
        className="subada-table-container"
        elevation={3}
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
          }}
        >
          <TextField
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by content, user, etc."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="h5"
            className="adtable-heading"
            style={{ marginLeft: "20px" }}
          >
            App Posts
          </Typography>
        </div>
        {loading ? (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
           <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)',zIndex:2 }} />
        </div>
        ) : error ? (
          <Typography
            variant="body1"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Error fetching data: {error}
          </Typography>
        ) : (
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={posts}
              columns={columns}
              pageSize={10}
              pagination
              page={currentPage}
              onPageChange={handlePageChange}
              rowsPerPageOptions={[]}
              components={{
                Toolbar: () => (
                  <div style={{ marginTop: "10px" }}>
                    <GridToolbar />
                  </div>
                ),
                Pagination: () => null,
              }}
              getRowId={(row) => row._id}
              rowHeight={80}
            />
          </div>
        )}
        <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, newPage) => handlePageChange(event, newPage)}
            color="primary"
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Apppost;
