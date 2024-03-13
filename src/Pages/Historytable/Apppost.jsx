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
import {
  RingLoader,
} from "react-spinners";
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
  const[love,setLove]=useState(null);
  const [trendedPosts, setTrendedPosts] = useState([]);
  const [ap,setAp]=useState(null);
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/forumPost/getPost?page=${pageNumber}&searchTerm=${searchTerm}`
      );
      const val = response.data.result.post;
      //console.log(val);
      const filteredPosts = val.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.userDetail && post.userDetail.username.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setPosts(filteredPosts);
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
  }, [currentPage, searchTerm]);

  const handleDelete = (postId) => {
    setSelectedPostId(postId);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${apiURL.baseURL}/skyTrails/api/admin/deletePost/${selectedPostId}`
      );
      const updatedPosts = posts.filter((post) => post._id !== selectedPostId);
      setPosts(updatedPosts);
      setConfirmationOpen(false);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleApprove = async (storyId) => {
    try {
      setAp(storyId);
    //console.log("Payload:", { storyId: storyId });
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/approvePost`, // URL endpoint
        { storyId: storyId } // Data to be sent in the request body
      );
      
      const updatedPosts = posts.map((post) =>
        post.storyId === storyId ? { ...post, status: "ACTIVE" } : post
      );
      
      
    setPosts(updatedPosts); 
     
      //console.log("Post approved successfully!");
      fetchData(currentPage);
    } catch (error) {
      console.error("Error approving post:", error);
    }
    finally{
      setAp(null);
    }
  };
  const handleTrend = async (storyId) => {
    try {
      setLove(storyId);
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/addOnTrending`,
        { storyId: storyId }
      );
      console.log('fetched');
      fetchData(currentPage);
      console.log('Response from server:', response.data);
      console.log("Post marked as trending successfully!");
    } catch (error) {
      console.error("Error marking post as trending:", error);
    }
    finally{
      setLove(null);
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
      field: "likesCount",
      headerName: "Likes",
      width: 150,
      valueGetter: (params) => params.row.likesCount,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => {
        if (params.row.status === "ACTIVE") {
          return "Active";
        } else if (params.row.status === "DEACTIVE") {
          return "Deactivate";
        } else {
          return "Pending";
        }
      },
    },
    
  
  {
    field: "actions",
    headerName: "Actions",
    width: 400,
    renderCell: (params) => (
      <div style={{ display: "flex", justifyContent: "space-between" ,width:'100%'}}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
        <div style={{ width: "10px" }} />
          <Button
            variant="outlined"
            color={ap === params.row._id? "secondary":"primary"}
            size="small"
            onClick={() => handleApprove(params.row._id)}
            disabled={ap=== params.row._id}
            style={{position : "relative"}}
        >
            {ap === params.row._id ? (
    <>
        <CircularProgress size={15} thickness={4}  variant="determinate" value={75} style={{ color: 'darkgreen' }} />
        {/* {"Approving"} */}
    </>
) : (
    "Approved"
)}
          </Button>
      
       <div style={{ width: "10px" }} />
       <Button
  variant="outlined"
  color={love === params.row._id ? "success" : "secondary"}
  size="small"
  onClick={() => handleTrend(params.row._id)}
  disabled={love === params.row._id}
  style={{ position: "relative" }} 
>
{/* {love === params.row._id ? (
    <CircularProgress size={20} color="inherit" />
    {"Added to Trend"}
):
  // ) : (
  //   love === params.row._id ? (
  //     <CircularProgress size={20} color="inherit" />
  //   ) : (
    (
      "Trending"
    )
  )} */}
  {love === params.row._id ? (
    <>
        {/* <CircularProgress size={15} thickness={4} style={{ color: 'darkgreen' }} /> */}
        <CircularProgress size={15} thickness={4}  variant="determinate" value={75} style={{ color: 'darkgreen' }} />
        {/* {"Added to Trend"} */}
    </>
) : (
    "Trending"
)}


</Button>

      </div>
    ),
  },
  
  ];
  return (
    <>
      {loading ? (
        <div style={{ position: 'absolute', top: '-20%', left: '0', right: '0', width: '100%', height: '290%', backdropFilter: 'blur(4.5px)', backgroundColor: '#d8d5e663', zIndex: 1 }}></div>
      ) : null}
      
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
            <CircularProgress color="primary" size={69} thickness={4} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
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
                // Pagination: () => null,
              }}
              getRowId={(row) => row._id}
              rowHeight={80}
            />
          </div>
        )}
        {/* <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, newPage) => handlePageChange(event, newPage)}
            color="primary"
          />
        </Stack> */}
      </Paper>
    </>
  );
}

export default Apppost; 