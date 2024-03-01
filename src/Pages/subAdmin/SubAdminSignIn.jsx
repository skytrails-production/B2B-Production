import React, { useState, useEffect } from 'react';
import { apiURL } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import './SubAdminSignIn.css';
import newlogo from "../../Images/whitelogo1.png";
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { subAdminLogin, subAdminFailure, subAdminRequest, subAdminLogout } from '../../Redux/SubAdminLogin/actionsubadminlogin';
const SubAdminLoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  useEffect(() => {
    console.log(reducerState, "reducerState subadminlogin")
    dispatch(subAdminLogout())
  }, [])
  useEffect(() => {
    if (reducerState?.subadminLogin?.subadminloginData?.statusCode === 200) {

      navigate('/subAdmin/dashboard');
    }
  }, [reducerState?.subadminLogin?.subadminloginData])
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(subAdminRequest());
    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/subAdmin/subAdminLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();
      if (data?.statusCode === 200) {
        localStorage.setItem('token', data.token);
        // console.log(data);
        dispatch(subAdminLogin(data));


      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        dispatch(subAdminFailure(data?.errormessage?.response?.data));
      }
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };


  return (
    <div class="mainsubadmin">
      {/* <header className="sectionad headers" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          <div className="headead">
            <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
            <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Subadmin Login</h2>
          </div>
      </header>
      <section className="section sign-in">
      <form className="subAdminForm" onSubmit={handleSubmit}>
      <div className="password-container">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input-subAdmin"
            required
          />
      </div>
       
      <div className="password-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input-subAdmin"
            required
          />
       </div>
        <br />
        <button type="submit" className="subAdminsubmit-button">
          Login
        </button>
      </form>
      </section> */}

      <div class="containersubadmin" style={{ marginTop: "50px" }}>

        <div class="screensub">
          {/* <header className="sectionad headers" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          <div className="headead">
            <img src={newlogo} style={{ width: "80%" }} alt="Logo" />
            <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Subadmin Login</h2>
          </div>
      </header> */}

          <div class="screen__contentsub">

            <form class="loginsubadmin" onSubmit={(e) => handleSubmit(e)}>
              {/* <h3 style={{  textAlign: "center" }}>Subadmin Login</h3> */}
              <div class="login__fieldsub">
                <i className="login__iconsub"><FaUser /></i>
                <input type="text"
                  class="login__inputsub"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}

                  required />
              </div>
              <div class="login__fieldsub">
                <i class="login__iconsub fas fa-lock"><FaLock /></i>
                <input type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                  required
                  class="login__inputsub"
                  placeholder="password" />
              </div>
              <button class="button login__submitsub" type="submit">
                <span class="button__text">Login</span>
                <i class="button__iconsub fas fa-chevron-right"><FaSignInAlt /></i>
              </button>
            </form>

          </div>
          <div class="screen__backgroundsub">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SubAdminLoginForm;
