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
  const [totalLeads, setTotalLeads] = useState(false);
  const [data, setData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
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
        setData(response?.data.data);
        // console.log("Data fetched:", response.data.data);
      } else {
        console.error("No data received.");
      }
    } catch (error) {
      console.error("Error fetching Packages", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchLeads= async()=>{
    try {
      setLoading(true);     
      const  endpoint = `${apiURL.baseURL}/skyTrails/agent/leads?userId=${userId}`;
      

      const response = await axios.get(endpoint);

      if (response?.data) {
        setLeadsData(response?.data.data);
        // console.log("Leads Data fetched:", response.data.data);
      } else {
        console.error("No data received.");
      }
    } catch (error) {
      console.error("Error fetching Packages", error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchData("all");
    
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const handleAllPackagesClick = () => {
    setLoading(true);
    setAllPackages(true);
    setApprovedPackages(false);
    setRejectPackages(false);
    setTotalLeads(false);
    fetchData("all");
  };

  const handleApprovedPackagesClick = () => {
    setLoading(true);
    setAllPackages(false);
    setApprovedPackages(true);
    setRejectPackages(false);
    setTotalLeads(false);
    fetchData(1);
  };

  const handleRejectPackagesClick = () => {
    setLoading(true);
    setAllPackages(false);
    setApprovedPackages(false);
    setRejectPackages(true);
    setTotalLeads(false);
    fetchData(0);
  };

  const handleLeadsClick = () =>{
    setLoading(true);
    setAllPackages(false);
    setApprovedPackages(false);
    setRejectPackages(false);
    setTotalLeads(true);
    fetchLeads();

  }
  const TotalPackage=()=>{

    return ( 
    <>
    <h1>Total Packages {data?.length}</h1>
    </>
    )
   }

   const ApprovedPackage=()=>{

    return ( 
    <>
    <h1>Approved Packages {data?.length}</h1>
    </>
    )
   }

   const HoldPackage=()=>{

    return ( 
    <>
    <h1>Approved Packages {data?.length}</h1>
    </>
    )
   }         

 
    
   const Leads=()=>{
    const agentLeads=Number(leadsData?.userBookings?.length)+Number(leadsData?.agentBookings?.length);
   

    return ( 
    <>
    <h1>Total Leads {leadsData? agentLeads:null}</h1>
    </>
    )
   } 
   

  return (
    <div className="container">
      <div className="buttonBox-new">
        <button onClick={handleAllPackagesClick}>All Packages</button>
        <button onClick={handleApprovedPackagesClick}>Approved Packages</button>
        <button onClick={handleRejectPackagesClick}>Hold Packages</button>
        <button onClick={handleLeadsClick}>Total Lead</button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {allPackages && <TotalPackage />}
          {approvedPackages && <ApprovedPackage />}
          {rejectPackages && <HoldPackage />} 
          {totalLeads && <Leads />}
        </>
      )}
    </div>
  );
};

export default MyPackages;


