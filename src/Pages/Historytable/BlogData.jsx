import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Pagination,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { apiURL } from "../../Constants/constant";
import Editor from "react-simple-wysiwyg";

function BlogData() {
  const [blog, setBlog] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Store filtered blogs
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    blogId: null,
  });
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    content: "",
    location: "",
    status: "",
  });
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
        );
        const totalBlogs = response.data.result.length;
        const calculatedTotalPages = Math.ceil(totalBlogs / 10);
        setBlog(response.data.result);
        setFilteredBlogs(response.data.result); // Set filtered blogs initially
        setTotalPages(calculatedTotalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter the blog based on title or location
    const filtered = blog.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handlStatus = async (blogId, status) => {
    try {
      await axios.put(`${apiURL.baseURL}/skyTrails/api/blog/activeStatus`, {
        blogId: blogId,
        status: status,
      });
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
      );
      setBlog(response.data.result);
      setFilteredBlogs(response.data.result); // Update filtered data after status change
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteConfirmation = (blogId) => {
    setDeleteConfirmation({ isOpen: true, blogId });
  };

  const handleDelete = async () => {
    try {
      await axios.put(`${apiURL.baseURL}/skyTrails/api/blog/deleteBlog`, {
        blogId: deleteConfirmation.blogId,
      });
      const updatedBlog = blog.filter(
        (item) => item._id !== deleteConfirmation.blogId
      );
      setBlog(updatedBlog);
      setFilteredBlogs(updatedBlog); // Update filtered data after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setDeleteConfirmation({ isOpen: false, blogId: null });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, blogId: null });
  };

  const handleUpdatePopupOpen = (rowData) => {
    setUpdateData({
      id: rowData._id,
      title: rowData.title,
      content: rowData.content,
      location: rowData.location,
    });
    setUpdatePopupOpen(true);
  };

  const handleUpdatePopupClose = () => {
    setUpdatePopupOpen(false);
  };

  const handleUpdateDataChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`${apiURL.baseURL}/skyTrails/api/blog/updateBlog`, {
        blogId: updateData.id,
        title: updateData.title,
        content: updateData.content,
        location: updateData.location,
      });
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
      );
      setBlog(response.data.result);
      setFilteredBlogs(response.data.result); // Update filtered data after blog update
      setUpdatePopupOpen(false); // Close the update popup
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const columns = [
    {
      field: "media",
      headerName: "Media",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value[0]}
          alt="Media"
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "content",
      headerName: "Content",
      width: 330,
      valueGetter: (params) => params.row.content || "No Data",
      cellRenderer: (params) =>
        `<div style="max-height: 200px; overflow-y: auto;">${params.value}</div>`,
    },
    {
      field: "location",
      headerName: "Location",
      width: 180,
      valueGetter: (params) => params.row.location || "No Data",
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      valueGetter: (params) => params.row.status || "No Data",
    },
    {
      field: "action",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDeleteConfirmation(params.row._id)}
            style={{ marginRight: "30px" }}
          >
            Delete
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => handleUpdatePopupOpen(params.row)}
            style={{ marginRight: "30px" }}
          >
            Update
          </Button>
          <select
            style={{ display: "inline-flex", width: "auto" }}
            onChange={(event) =>
              handlStatus(params.row._id, event.target.value)
            }
          >
            <option value="ACTIVE">ACTIVE</option>

            <option value="DELETE">INACTIVE</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%", marginTop: "100px" }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: "10",
          zIndex: 1,
          fontWeight: "bold",
        }}
      >
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title, location, etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading">
          Blog Data
        </Typography>
      </div>
      <Paper>
        {filteredBlogs.length > 0 ? (
          <DataGrid
            rows={filteredBlogs} // Use filteredBlogs here
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            pagination
            getRowId={(row) => row._id}
            style={{ width: "100%" }}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: "20px" }}>
                  <GridToolbar />
                </div>
              ),
              Pagination: () => null,
            }}
          />
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{ padding: "20px", color: "gray" }}
          >
            Data is not available
          </Typography>
        )}
      </Paper>
      <div className="paginate">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            shape="rounded"
            variant="outlined"
            color="secondary"
          />
        </Stack>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmation.isOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Popup */}
      <Dialog
        open={updatePopupOpen}
        onClose={handleUpdatePopupClose}
        fullWidth={true}
      >
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={updateData.title}
            onChange={handleUpdateDataChange}
            name="title"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={updateData.location}
            onChange={handleUpdateDataChange}
            name="location"
            fullWidth
            margin="normal"
          />
          <Editor
            value={updateData.content}
            onChange={(e) =>
              setUpdateData((prevData) => ({
                ...prevData,
                content: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatePopupClose}>Cancel</Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BlogData;
