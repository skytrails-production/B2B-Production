import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { apiURL } from "../../Constants/constant";

function Cotactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name.trim()) {
      setFormError("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      setFormError("Please enter your email");
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setFormError("Please enter a valid email address");
      return;
    }

    if (!formData.phone.trim()) {
      setFormError("Please enter your phone number");
      return;
    }

    if (!validatePhone(formData.phone.trim())) {
      setFormError("Please enter a valid phone number");
      return;
    }

    if (!formData.content.trim()) {
      setFormError("Please enter your message");
      return;
    }

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skytrails/api/user/query/createuserInquiry`,
        formData
      );
      console.log(response.data); // Handle response from the server
      // Optionally, you can reset the form data after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        content: "",
      });
      setFormError(""); // Clear any previous form errors
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone number validation regex
    const re = /^\d{10}$/; // Assumes a 10-digit phone number
    return re.test(phone);
  };
  return (
    <>
      <div className="conatiner">
        <div className="heading1">Connect with us</div>
        
          <div className="container">
          <div className="contactuscontainer">
            <div className="row">
              <div className="col-md-6">
                <div className="need-assistance">
                  <div className="need-assistance1">
                    Need Assistance. <br />
                    Don’t Hesitate to reach out to us
                  </div>
                  <div className="need-assistance2">
                    <div className="contact-mail">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19.875 4.5H4.125C3.08947 4.5 2.25 5.33947 2.25 6.375V17.625C2.25 18.6605 3.08947 19.5 4.125 19.5H19.875C20.9105 19.5 21.75 18.6605 21.75 17.625V6.375C21.75 5.33947 20.9105 4.5 19.875 4.5Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.25 7.5L12 12.75L18.75 7.5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>{" "}
                      info@theskytrails.com
                    </div>
                    <div className="contact-mail">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.7741 15.0282L16.3453 13.0435C16.1447 12.9575 15.9257 12.9229 15.7083 12.9429C15.4909 12.9629 15.282 13.0368 15.1003 13.1579C15.0819 13.1697 15.0643 13.1829 15.0478 13.1972L12.7331 15.166C12.7091 15.1791 12.6824 15.1864 12.655 15.1874C12.6277 15.1884 12.6005 15.183 12.5756 15.1716C11.0878 14.4535 9.54657 12.9216 8.82564 11.4544C8.81363 11.4299 8.80739 11.403 8.80739 11.3757C8.80739 11.3484 8.81363 11.3214 8.82564 11.2969L10.8009 8.95318C10.8151 8.93584 10.8283 8.91768 10.8403 8.8988C10.9598 8.71646 11.0319 8.50725 11.0502 8.29006C11.0685 8.07286 11.0325 7.85452 10.9453 7.65474L8.9747 3.23349C8.86279 2.9725 8.66925 2.75484 8.42313 2.61319C8.17701 2.47154 7.89159 2.41353 7.6097 2.44787C6.3846 2.60893 5.26006 3.21056 4.44622 4.14034C3.63238 5.07011 3.18494 6.26441 3.18751 7.50005C3.18751 14.8407 9.15939 20.8126 16.5 20.8126C17.7356 20.8149 18.9298 20.3674 19.8595 19.5536C20.7893 18.7398 21.3909 17.6154 21.5522 16.3904C21.5865 16.1098 21.5292 15.8257 21.389 15.5802C21.2488 15.3348 21.0332 15.1412 20.7741 15.0282ZM16.5 19.6876C9.78001 19.6876 4.31251 14.2201 4.31251 7.50005C4.30938 6.53811 4.65658 5.60793 5.28924 4.88331C5.9219 4.15869 6.79675 3.6892 7.75032 3.56255H7.77189C7.80967 3.56326 7.84635 3.57536 7.87713 3.59728C7.90791 3.61919 7.93136 3.6499 7.94439 3.68537L9.92251 8.10193C9.93379 8.12648 9.93963 8.15319 9.93963 8.18021C9.93963 8.20723 9.93379 8.23394 9.92251 8.25849L7.94345 10.6079C7.92868 10.6246 7.91521 10.6425 7.90314 10.6613C7.7793 10.8504 7.70637 11.0682 7.69143 11.2937C7.67648 11.5192 7.72002 11.7447 7.81782 11.9485C8.64939 13.651 10.365 15.3535 12.0863 16.1851C12.2912 16.2823 12.5178 16.3248 12.7441 16.3084C12.9703 16.2919 13.1885 16.2172 13.3772 16.0913C13.395 16.0791 13.4128 16.066 13.4297 16.0519L15.7434 14.0832C15.7663 14.0709 15.7915 14.0637 15.8174 14.0621C15.8433 14.0605 15.8692 14.0645 15.8934 14.0738L20.3231 16.0585C20.3593 16.0739 20.3897 16.1003 20.4101 16.1339C20.4305 16.1676 20.4397 16.2068 20.4366 16.246C20.3106 17.2 19.8415 18.0755 19.1171 18.7089C18.3926 19.3422 17.4623 19.6901 16.5 19.6876Z"
                          fill="white"
                        />
                      </svg>{" "}
                      9209793097
                    </div>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="wrapper d-flex align-items-center justify-content-end h-100 bg-rgba(235, 245, 255, 0.50);">
                  <div
                    className="card login-form-contact"
                    style={{ width: "100%" }}
                  >
                    <div className="card-body">
                    <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your Phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Message
                </label>
                <textarea
                  name="content"
                  placeholder="Enter your message"
                  className="form-control"
                  value={formData.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div  className="contact-button">

              <button
                type="submit"
               
                style={{color:"#fff", border:"none"}}
                onClick={handleSubmit}
              >
                Submit
              </button>

              </div>
              
              {formError && (
                <p style={{ color: "red", marginTop: "10px" }}>{formError}</p>
              )}
            </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cotactus;



{/* <button
                          type="submit"
                          className="contact-button"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button> */}