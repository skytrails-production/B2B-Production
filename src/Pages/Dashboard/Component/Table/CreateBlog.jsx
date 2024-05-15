// import React, { useState } from 'react';
// import { apiURL } from '../../../../Constants/constant';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { CircularProgress, TextField } from "@mui/material";

// function CreateBlog() {
//   const [load, setLoad] = useState(false);
//   const [images, setImages] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [trending, setTrending] = useState("");
//   const [location, setLocation] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     console.log("images",images)
//     e.preventDefault();
//     setLoad(true);

//     try {
//       const formData = new FormData();
//       // images.map((image) => {
//       //   formData.append('images', image); 
//       // });
//       formData.append("images",images)
//       formData.append('title', title);
//       formData.append('content', content);
//       formData.append('tags', tags);
//       formData.append('trending', trending);
//       formData.append('location', location);

//       const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/blog/createBlog`, formData);
//       setLoad(false);
//       setMessage("Hurrah! Blog Added successfully");
//       setTimeout(() => {
//         navigate('/admin/dashboard');
//       }, 4000);
//     } catch (err) {
//       console.log("error:", err);
//       setMessage('Failed to upload Blog');
//     } finally {
//       setLoad(false);
//       console.log("finally");
//     }
//   }

//   return (
//     <div className="updateFeed-blog" style={{ marginTop: '50px', border: '2px solid rgb(255,255,255,0.8)', padding: '80px', backgroundColor: 'rgb(255,255,255,0.8)', borderRadius: '1%', overflowX: 'scroll', overflowY: 'scroll', boxShadow: '0px 0px 5px #767070' }}>
//       {load && (
//         <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
//           <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
//         </div>
//       )}
//       {message && (
//         <div
//           style={{
//             backgroundColor: '#d4edda',
//             color: '#155724',
//             padding: '10px',
//             marginBottom: '30px',
//             borderRadius: '5px',
//           }}
//         >
//           {message}
//         </div>
//       )}
//       <h3 style={{ textAlign: 'center' }} className="addCoupon-heading">
//         <strong>Create Blog</strong>
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <input type="file" multiple onChange={(e) => setImages([...e.target.files])} style={{ padding: '4.5px' }} /> {/* Allow multiple file selection */}
//         <TextField
//           label="title"
//           variant="outlined"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <TextField
//           label="content"
//           variant="outlined"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <TextField
//           label="tags"
//           variant="outlined"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />
//         <TextField
//           label="trending"
//           variant="outlined"
//           value={trending}
//           onChange={(e) => setTrending(e.target.value)}
//         />

//         <TextField
//           label="location"
//           variant="outlined"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <button className="button1" type="submit"  style={{ backgroundColor: '#21325d !important' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// export default CreateBlog;
import React, { useState } from "react";

import { apiURL } from "../../../../Constants/constant";
import axios from "axios";
import { CircularProgress, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Editor from "react-simple-wysiwyg"
function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    trending: false,
    location: "",
    images: [],
  });
  const [load, setLoad] = useState(false);
  const [message,setMessage]=useState("");
  const [errors,setErrors]=useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "", // Clear the error message for the current field
  }));
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "images") {
      const allowedTypes = ["image/jpeg", "image/png"]; // Allowed image types
      const selectedFiles = Array.from(files);
    
      // Check if all selected files have valid types
      const isValidFileType = selectedFiles.every((file) =>
        allowedTypes.includes(file.type)
      );
    
      if (!isValidFileType) {
        // Set error message if any file has an invalid type
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only JPG or PNG images are allowed.",
        }));
      } else {
        // For valid files, update formData
        setFormData((prevState) => ({
          ...prevState,
          [name]: selectedFiles,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const validateForm=()=>{
    const errors={};
    if(!formData.title.trim()){
      errors.title="Title is required";
    }
    if(!formData.content.trim()){
      errors.content="content is required";
    }
    if(!formData.tags.trim()){
      errors.tags="tags required";
    }
    if(!formData.location.trim()){
      errors.location="location required";
    }
    if(formData.images.length===0){
      errors.images="upload image";
    }
    setErrors(errors);
    return Object.keys(errors).length===0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!validateForm()){
      return;
    }
    const isValidFileType = formData.images.every((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
  
    if (!isValidFileType) {
      // Set error message if any file has an invalid type
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Only JPG or PNG images are allowed.",
      }));
      return;
    }
   
    console.log(formData.images,"images")

    try {
      setLoad(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("trending", formData.trending);
      formDataToSend.append("location", formData.location);

      formData.images.forEach((images, index) => {
        formDataToSend.append("images", images);
      });

      const response = await axios.post(`
        ${apiURL.baseURL}/skyTrails/api/blog/createBlog`,
        formDataToSend
      );
      setMessage("Hurrah! Blog Added successfully");
      setTimeout(() => {
                navigate('/admin/dashboard');
              }, 4000);
     // console.log("Blog post created successfully:", response.data);
      // Optionally, redirect to a success page or update UI
    } catch (error) {
      //console.error("Error creating blog post:", error);
      // Optionally, display an error message to the user
      setMessage('Failed to upload Blog');
    }
    finally{
      setLoad(false);
    }
  };
  

  return (
    <div style={{  marginTop: '50px', border: '2px solid rgb(255,255,255,0.8)', padding: '80px', backgroundColor: 'rgb(255,255,255,0.8)', borderRadius: '1%', overflowX: 'scroll', overflowY: 'scroll', boxShadow: '0px 0px 5px #767070'}}>
       {load && (
         <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
           <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
         </div>
     )}
      {message && (
       <div
           style={{
             backgroundColor: '#d4edda',
             color: '#155724',
             padding: '15px',
             marginBottom: '30px',
             borderRadius: '5px',
           }}
         >
           {message}
         </div>
      )}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a New Blog Post
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
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
          {errors.title && <p style={{color:'red'}}>{errors.title}</p>}
        </div>

         <div style={{ marginBottom: "15px" }}>
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
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.content && <p style={{color:'red'}}>{errors.content}</p>}
        </div> 
        

        <div style={{ marginBottom: "15px" }}>
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
          {errors.tags && <p style={{color:'red'}}>{errors.tags}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
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
          {errors.trending && <p style={{color:'red'}}>{errors.trending}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
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
          {errors.location && <p style={{color:'red'}}>{errors.location}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
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
            multiple // Allow multiple file selection
            onChange={handleChange}
          />
          {errors.images && <p style={{color:'red'}}>{errors.images}</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
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

export default CreateBlog ;
