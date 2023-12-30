import React, { useEffect,useState } from 'react';
import './SubAdminSignIn.css';
import { apiURL } from '../../Constants/constant';
import { background } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, useReducer } from "react-redux";
const SubAdminLoginForm = () => {
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
 const [userName, setUserName] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
//  useEffect(() => {
//     if (reducerState?.subAdmin?.subAdminData?.data?.data) {
//       navigate("/subAdmin");
//     }
//   }, [reducerState, navigate]);
function handleclick(){
  navigate('/subAdmin/dashboard')
}
 const handleSubmit = async (e) => {
    e.preventDefault();
console.log("e",e)
    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/subAdmin/subAdminLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and redirect to dashboard
        localStorage.setItem('token', data.token);
        navigate('/subAdmin/dashboard');
        // Extract and store user information
        const user = {
          username: data.data.userName,
          email: data.data.email,
          userType: data.data.userType,
          authType:data.data.authType
          // Add other relevant details as needed
        };
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
 }

 return (
    <div className="sub-admin-login-form">
      <h2 className='subAdminheading'>SubAdmin Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="subAdminForm" onSubmit={handleSubmit}>
        <label className="form-label">
          UserName:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <br />
        <button type="submit" onClick={handleclick}className="subAdminsubmit-button" >
          Login
        </button>
      </form>
    </div>
 );
};

export default SubAdminLoginForm;