import React, { useState } from "react";
import { apiURL } from "../../../../Constants/constant";
import axios from "axios";
import Editor from "react-simple-wysiwyg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BlogForm() {
  const initialFormData = {
    title: "",
    content: "",
    tags: "",
    trending: false,
    location: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New loading state
  const [success, setSuccess] = useState(false); // New success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Clear the error for the specific field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "images") {
      const newImages = files ? Array.from(files) : [];
      const oversizedImages = newImages.filter(file => file.size > 1024 * 1024);

      if (oversizedImages.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: "Each image must be less than 1MB",
        }));
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        [name]: newImages,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.content.trim()) {
      errors.content = "Content is required";
    }
    if (!formData.tags.trim()) {
      errors.tags = "Tags are required";
    }
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    if (formData.images.length === 0) {
      errors.images = "At least one image is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("trending", formData.trending);
      formDataToSend.append("location", formData.location);

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/blog/createBlog`,
        formDataToSend
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Blog post created successfully!",
      }).then(() => {
        setSuccess(true);
        setFormData({
          ...initialFormData, // Reset all form fields to their initial values
          images: [], // Clear the images field by setting it to an empty array
        });
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Error creating blog post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="form-containers"
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "-45px",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Create Blog</h1>

      {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div>
          <label
            htmlFor="content"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Content:
          </label>
          <Editor
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              overflowY: "auto",
              maxHeight: "100px", // or any height you prefer
              cursor: "pointer",
            }}
          />
          {errors.content && <p style={{ color: "red" }}>{errors.content}</p>}
        </div>

        <div>
          <label
            htmlFor="tags"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Tags (comma-separated):
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.tags && <p style={{ color: "red" }}>{errors.tags}</p>}
        </div>

        <div>
          <label
            htmlFor="trending"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Trending:
          </label>
          <input
            type="checkbox"
            id="trending"
            name="trending"
            checked={formData.trending}
            onChange={handleChange}
            style={{ marginRight: "5px" }}
          />
        </div>

        <div>
          <label
            htmlFor="location"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
        </div>

        <div>
          <label
            htmlFor="images"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Images:
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleChange}
            style={{
              width: "100%",
              paddingTop: "5px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#E73C33",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
