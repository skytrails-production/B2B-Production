import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
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
import { apiURL } from "../../../Constants/constant";
import { htmlToText } from "html-to-text";
import Editor from "react-simple-wysiwyg";

function AllBlogs() {
  const [blog, setBlog] = useState([]);
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
  const [updateMediaPopupOpen, setUpdateMediaPopupOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
        );
        const totalBlogs = response.data.result.length;
        const calculatedTotalPages = Math.ceil(totalBlogs / 10);
        setBlog(response.data.result);
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
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlStatus = async (blogId, status) => {
    try {
      await axios.put(`${apiURL.baseURL}/skyTrails/api/blog/activeStatus`, {
        blogId: blogId,
        status: status,
      });
      // Refresh blog data after status update
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
      );
      setBlog(response.data.result);
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
      setBlog(blog.filter((item) => item._id !== deleteConfirmation.blogId));
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
      // Refresh blog data after update
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`
      );
      setBlog(response.data.result);
      // Close the update popup
      setUpdatePopupOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleUpdateMediaPopupOpen = (rowData) => {
    setSelectedBlogId(rowData._id);
    setUpdateMediaPopupOpen(true);
  };

  const handleUpdateMediaPopupClose = () => {
    setUpdateMediaPopupOpen(false);
    setSelectedImages([]);
  };

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  const handleUpdateImagesSubmit = async () => {
    const formData = new FormData();
    formData.append('blogId', selectedBlogId);
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.put(`${apiURL.baseURL}/skyTrails/api/blog/editImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Refresh blog data after image update
      const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/blog/getAllBlogsAdmin`);
      setBlog(response.data.result);
      setUpdateMediaPopupOpen(false);
    } catch (error) {
      console.error("Error updating images:", error);
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
    { field: "title", headerName: "Title", width: 600 },
    {
      field: "updateImage",
      headerName: "Update Image",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleUpdateMediaPopupOpen(params.row)}
        >
          Update Image
        </Button>
      ),
    },
    {
      field: "content",
      headerName: "Content",
      width: 330,
      valueGetter: (params) => {
        // Convert HTML to plain text
        const plainText = htmlToText(params.row.content || "No Data", {
          wordwrap: 130,
        });
        return plainText;
      },
      renderCell: (params) => {
        return (
          <div
            style={{
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: "500px",
              width: "500px",
            }}
          >
            {params.value}
          </div>
        );
      },
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
      width: 450,
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
      style={{ position: "relative", width: "100%", marginTop: "-20px" }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: "2",
          zIndex: 1,
          fontWeight: "bold",
          backgroundColor: "#E73C33",
        }}
      >
        <Typography variant="h5" className="adtable-heading">
          All Blogs
        </Typography>
      </div>
      <Paper>
        <DataGrid
          rows={blog}
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
      </Paper>
      <div className="paginate">
        <Stack spacing={2} direction="row" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            color="primary"
          />
        </Stack>
      </div>
      <Dialog
        open={deleteConfirmation.isOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updatePopupOpen} onClose={handleUpdatePopupClose}>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            name="title"
            fullWidth
            value={updateData.title}
            onChange={handleUpdateDataChange}
          />
          <Editor
            margin="dense"
            label="Content"
            type="text"
            name="content"
            fullWidth
            value={updateData.content}
            onChange={handleUpdateDataChange}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            name="location"
            fullWidth
            value={updateData.location}
            onChange={handleUpdateDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatePopupClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateMediaPopupOpen} onClose={handleUpdateMediaPopupClose}>
        <DialogTitle>Update Blog Images</DialogTitle>
        <DialogContent>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateMediaPopupClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateImagesSubmit} color="primary">
            Update Images
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AllBlogs;
