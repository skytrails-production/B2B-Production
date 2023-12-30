import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import "./AddAgent.css"; // Import the CSS file
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";

const SubAdminTable = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserStatusMap, setSelectedUserStatusMap] = useState({}); // Map to store status for each user
  
    // Declare the fetchUserData function
    const fetchUserData = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getSubAdmin`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
          }
        );
        // Initialize status for each user
        const initialStatusMap = {};
        response.data.result.docs.forEach((user) => {
          initialStatusMap[user._id] = "ACTIVE"; // Default status
        });
        setSelectedUserStatusMap(initialStatusMap);
        setUserData(response.data.result.docs);
        setTotalPages(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching User bookings:", error);
        setLoading(false);
      }
    }, [currentPage, searchTerm]);
  
    useEffect(() => {
      // Fetch user data when the component mounts or when dependencies change
      fetchUserData();
    }, [fetchUserData]); // Ensure that useEffect depends on the callback
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    };
  
    const handleStatusChange = async (userId) => {
        console.log("handleStatusChange called for userId:", userId);
        console.log("selectedUserStatusMap[userId]",selectedUserStatusMap[userId])
      const status = selectedUserStatusMap[userId];
      console.log("status",status)
      try {
        const response = await axios.put(
          `${apiURL.baseURL}/skytrails/api/admin/updateSubAdminStatus`,
          {
            userId: [userId],
            status,
          }
        );
  
        // Log the response for debugging (you can remove this in production)
        console.log(response);
  
        // Refetch the user data after updating the status
        fetchUserData();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };
  
    const handleStatusSelectChange = (userId, status) => {
      setSelectedUserStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [userId]: status,
      }));
    };
  
    return (
      <div className="subadmin-container">
        <div className="top-search button">
          <input
            type="text"
            placeholder="Search by username or email"
            onChange={handleSearch}
            value={searchTerm}
            className="input-class"
          />
        </div>
  
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Auth Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.contactNumber}</td>
                <td>{user.authType}</td>
                <td>
                <select
                  value={selectedUserStatusMap[user._id]}
                  onChange={(e) => {
                    handleStatusSelectChange(user._id, e.target.value);
                    handleStatusChange(user._id);
                  }}
                >
                    <option value="ACTIVE">Active</option>
                    <option value="BLOCK">Block</option>
                    <option value="DELETE">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    );
  };
  
  export default SubAdminTable;