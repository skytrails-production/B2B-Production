import React, { useEffect } from "react";
import { Container } from "@mui/material";
import {useSelector } from "react-redux";

const AdminProfile = () => {

  const adminData = useSelector((state) => state?.adminAuth?.adminData);
  console.log(adminData, "---------------");
  // Assuming your Redux state structure matches the provided data

  const username = adminData?.data?.username;
  console.log(username, "username------------")

  const roles = adminData?.data?.roles;
  console.log(roles, "==============");
  
  return (
    <Container maxWidth="md">

      <div>
        <h2>Welcome, {username}</h2>
        <h3>{roles}</h3>
        {/* You can add more profile information here */}
      </div>

    </Container>
  );
};

export default AdminProfile;
