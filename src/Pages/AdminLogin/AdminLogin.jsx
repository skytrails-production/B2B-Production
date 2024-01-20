import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthAction } from "../../Redux/Auth/AdminAuth/actionAdminAuth";
import newlogo from "../../Images/whitelogo1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";
import bg from "../../Images/bg-cover.jpeg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  let adminData = reducerState?.adminAuth?.adminData?.data?.roles[0];

  useEffect(() => {
    if (adminData === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [adminData, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }

    const payload = {
      username: email,
      password: password,
    };

    dispatch(adminAuthAction(payload));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div
        className="coverletter"
        style={{

          borderRadius: "15px",
          width: "100%",
          margin: "auto",
          height: "250px", // Adjusted height
          overflow: "hidden", // Ensures the border radius is applied correctly
        }}
      >
        <img
          src={bg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="Adminwrapper">
        {/* Cover Layout */}
        <header className="sectionad headers" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          <div className="headead">
            <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
            <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Admin Login</h2>
          </div>
        </header>

        <section className="section sign-in">
          <form onSubmit={handleSubmit} className="formadmin">
            <div className="password-container">
              <input
                name="username"
                type="text"
                placeholder="Enter your Email Address"
                value={email}
                className="admininput"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="password-container">
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admininput"
              />
            </div>
            <button className="btnadmin">Sign In</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
