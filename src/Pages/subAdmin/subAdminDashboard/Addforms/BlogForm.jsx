import React, { useState } from "react";
import { apiURL } from "../../../../Constants/constant";
import axios from "axios";
function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    trending: false,
    location: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "images") {
      // For images, get the files and update formData
      setFormData((prevState) => ({
        ...prevState,
        [name]: files ? Array.from(files) : [], // Ensure images is always an array
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.images, "images");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("trending", formData.trending);
      formDataToSend.append("location", formData.location);

      formData.images.forEach((images, index) => {
        formDataToSend.append("images", images);
      });

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/blog/createBlog`,
        formDataToSend
      );

      console.log("Blog post created successfully:", response.data);
      // Optionally, redirect to a success page or update UI
    } catch (error) {
      console.error("Error creating blog post:", error);
      // Optionally, display an error message to the user
      alert("Error creating blog post. Please try again later.");
    }
  };

  return (
    <div className="form-containers" style={{ width: "50%", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Create Blog</h1>
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
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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
            required
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
            required
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
            required
            multiple // Allow multiple file selection
            onChange={handleChange}
            style={{
              width: "100%",
              paddingTop: "5px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
