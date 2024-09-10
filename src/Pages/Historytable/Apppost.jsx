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
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";
import ConfirmationDialog from "./ConfirmationDialog";
import appPost from "../../../src/Images/appPost.png";
import { RingLoader } from "react-spinners";
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
  const [love, setLove] = useState(null);
  const [trendedPosts, setTrendedPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const showImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage("");
  };

  const [ap, setAp] = useState(null);
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/admin/forumPost/getPost?page=${pageNumber}&searchTerm=${searchTerm}`
      );
    
      const val = response.data.result.post;
      setPosts(val);
      const totalCount = response.data.result.totalCount;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
   
    setSearchTerm(newSearchTerm);
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
     
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/approvePost`, // URL endpoint
        { storyId: storyId } // Data to be sent in the request body
      );

      const updatedPosts = posts.map((post) =>
        post.storyId === storyId ? { ...post, status: "ACTIVE" } : post
      );

      setPosts(updatedPosts);

    
      fetchData(currentPage);
    } catch (error) {
      console.error("Error approving post:", error);
    } finally {
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
     
      fetchData(currentPage);
      
    } catch (error) {
      console.error("Error marking post as trending:", error);
    } finally {
      setLove(null);
    }
  };
  
  const handleApproveMultiple = async () => {
    try {
      if (selectedPostIds.length === 0) {
        alert("No posts selected for approval.");
        return;
      }
      setAp(true);
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/approveMultiplePost`,
        { storiyIds: selectedPostIds }
      );
      const updatedPosts = posts.map((post) =>
        selectedPostIds.includes(post._id)
          ? { ...post, status: "ACTIVE" }
          : post
      );
      setPosts(updatedPosts);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error approving posts:", error);
    } finally {
      setAp(false);
      setSelectedPostIds([]);
    }
  };

  const handleSelectionChange = (params) => {
    const newSelection = params.selectionModel;
    setSelectedPostIds(newSelection);
  };

  const filteredRows = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    const username = post.userDetail?.username?.toLowerCase() || "";
    return (
      username.includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  });

 
  const columns = [
    {
      field: "checkbox",
      headerName: "",
      width: 70,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedPostIds.includes(params.row._id)}
          onChange={() =>
            handleSelectionChange({
              selectionModel: selectedPostIds.includes(params.row._id)
                ? selectedPostIds.filter((id) => id !== params.row._id)
                : [...selectedPostIds, params.row._id],
            })
          }
        />
      ),
    },
    {
      field: "userDetail.profilePic",
      headerName: "Images",
      width: 180,
      renderCell: (params) => (
        <img
          src={!params?.row?.image ? appPost : params?.row?.image}
          alt="Profile"
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() =>
            showImageModal(params?.row?.image ? params?.row?.image : appPost)
          }
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
            color={ap === params.row._id ? "secondary" : "primary"}
            size="small"
            onClick={() => handleApprove(params.row._id)}
            disabled={ap === params.row._id}
            style={{ position: "relative" }}
          >
            {ap === params.row._id ? (
              <>
                <CircularProgress
                  disableShrink
                  size={15}
                  thickness={4}
                  variant="determinate"
                  value={75}
                  style={{ color: "darkgreen" }}
                />
                {/* {"Approving"} */}
              </>
            ) : (
              "Approve"
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
                <CircularProgress
                  disableShrink
                  size={15}
                  thickness={4}
                  variant="determinate"
                  value={75}
                  style={{ color: "darkgreen" }}
                />
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
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "0",
            right: "0",
            width: "100%",
            height: "290%",
            backdropFilter: "blur(4.5px)",
            backgroundColor: "#d8d5e663",
            zIndex: 1,
          }}
        ></div>
      ) : null}

      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <Modal open={isModalVisible} onClose={handleCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            boxShadow: 24,
            width: "22%",
            height: "57%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <IconButton
            sx={{
              alignSelf: "flex-end",
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={handleCancel}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Modal>

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
          <Button
            variant="contained"
            color="primary"
            onClick={handleApproveMultiple}
            style={{ marginTop: "5px" }}
          >
            {ap ? <CircularProgress size={15} /> : "Approve Multiple Posts"}
          </Button>
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
            <CircularProgress
              disableShrink
              color="primary"
              size={69}
              thickness={4}
              style={{
                position: "absolute",
                top: "50%",
                left: "49.8%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            />
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
              rows={filteredRows} // Use filteredRows here
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
              }}
              getRowId={(row) => row._id}
              rowHeight={80}
              onSelectionModelChange={handleSelectionChange}
              selectionModel={selectedPostIds}
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

