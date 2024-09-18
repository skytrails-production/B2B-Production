import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiURL } from "../../../../../Constants/constant";
import { message, Modal, Input } from "antd"; // Import the message component from antd
import "./InventoryUser.css";

const InventoryUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [newApproveStatus, setNewApproveStatus] = useState("");
  const [reason, setReason] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/inventory/partnergetPartnerList`,
          {
            params: {
              page: currentPage,
              limit: pageSize,
              search: searchTerm,
            },
          }
        );
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.result)) {
          setData(response.data.result);
          setTotalRecords(response.data.totalRecords);
        } else {
          setData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1); // DataGrid pages are 0-based
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const handleApproveStatusChange = async () => {
    let newStatus = "";
    switch (newApproveStatus) {
      case "APPROVED":
        newStatus = "ACTIVE";
        break;
      case "REJECT":
        newStatus = "DELETE";
        break;
      default:
        newStatus = "BLOCKED";
    }

    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/approvePartnerAccountStatus`,
        {
          partnerId: selectedRow._id,
          status: newStatus,
          approveStatus: newApproveStatus,
          reason: reason,
        }
      );
      if (response.data.statusCode === 200) {
        message.success("Status updated successfully");
        setData((prevData) =>
          prevData.map((item) =>
            item._id === selectedRow._id
              ? { ...item, approveStatus: newApproveStatus, status: newStatus }
              : item
          )
        );
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status. Please try again.");
    } finally {
      setSelectedRow(null);
      setNewApproveStatus("");
      setReason("");
      setIsModalVisible(false);
    }
  };

  const openReasonModal = (row, newApproveStatus) => {
    setSelectedRow(row);
    setNewApproveStatus(newApproveStatus);
    setIsModalVisible(true);
  };

  const columns = [
    { field: "hotelName", headerName: "Hotel Name", width: 220 },
    { field: "propertyType", headerName: "Property Type", width: 220 },
    {
      field: "channelMngrName",
      headerName: "Channel Manager Name",
      width: 220,
    },
    { field: "hotelCity", headerName: "Hotel City", width: 220 },
    { field: "managerName", headerName: "Manager Name", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phoneNumber", headerName: "Phone Number", width: 220 },
    { field: "reason", headerName: "Reason", width: 220 },
    {
      field: "approveStatus",
      headerName: "Approve Status",
      width: 220,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => openReasonModal(params.row, event.target.value)}
          style={{
            color:
              params.value === "APPROVED"
                ? "green"
                : params.value === "PENDING"
                ? "orange"
                : "red",
          }}
        >
          <MenuItem value="APPROVED" style={{ color: "green" }}>
            APPROVED
          </MenuItem>
          <MenuItem value="PENDING" style={{ color: "orange" }}>
            PENDING
          </MenuItem>
          <MenuItem value="REJECT" style={{ color: "red" }}>
            REJECT
          </MenuItem>
        </Select>
      ),
    },
    { field: "status", headerName: "Status", width: 220 },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className="adsearch-bar"
        style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold" }}
      >
        <Typography variant="h5" className="adtable-heading">
          Hotel Partner
        </Typography>
      </div>

      <Paper>
        {data.length === 0 && !loading ? (
          <Typography
            variant="h6"
            style={{ padding: "16px", textAlign: "center" }}
          >
            No data available
          </Typography>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            rowCount={totalRecords}
            paginationMode="server"
            pagination
            onPageChange={handlePageChange}
            getRowId={(row) => row._id}
            style={{ width: "100%" }}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: "10px" }}>
                  <GridToolbar />
                </div>
              ),
            }}
          />
        )}
      </Paper>

      <Modal
        title="Enter Reason"
        visible={isModalVisible}
        onOk={handleApproveStatusChange}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default InventoryUser;
