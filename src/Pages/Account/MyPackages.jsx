import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import "./FlightTicket.css";
import axios from "axios";
import { apiURL } from "../../Constants/constant";

const MyPackages = () => {
  const reducerState = useSelector((state) => state);
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  const [allPackages, setAllPackages] = useState(true);
  const [approvedPackages, setApprovedPackages] = useState(false);
  const [rejectPackages, setRejectPackages] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (status) => {
    try {
      let endpoint;
      if (status === "all") {
        endpoint = `${apiURL.baseURL}/skyTrails/agent/packages?userId=${userId}`;
      } else {
        endpoint = `${apiURL.baseURL}/skyTrails/agent/packages?userId=${userId}&isActive=${status}`;
      }

      const response = await axios.get(endpoint);

      if (response?.data) {
        setData(response?.data.data.length);
        console.log("Data fetched:", response.data.data);
      } else {
        console.error("No data received.");
      }
    } catch (error) {
      console.error("Error fetching Packages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("all");
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const handleAllPackagesClick = () => {
    setLoading(true);
    setAllPackages(true);
    setApprovedPackages(false);
    setRejectPackages(false);
    fetchData("all");
  };

  const handleApprovedPackagesClick = () => {
    setLoading(true);
    setAllPackages(false);
    setApprovedPackages(true);
    setRejectPackages(false);
    fetchData(1);
  };

  const handleRejectPackagesClick = () => {
    setLoading(true);
    setAllPackages(false);
    setApprovedPackages(false);
    setRejectPackages(true);
    fetchData(0);
  };

  return (
    <div className="container">
      <div className="buttonBox">
        <button onClick={handleAllPackagesClick}>All Packages</button>
        <button onClick={handleApprovedPackagesClick}>Approved Packages</button>
        <button onClick={handleRejectPackagesClick}>Hold Packages</button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {allPackages && <h1>Total packages {memoizedData}</h1>}
          {approvedPackages && <h1>Approved Packages {memoizedData}</h1>}
          {rejectPackages && <h1>Reject Packages {memoizedData}</h1>}
        </>
      )}
    </div>
  );
};

export default MyPackages;
