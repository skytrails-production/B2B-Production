import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Spin } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../../Redux/Auth/UserData/actionUserData";
//import { activeStatusAction } from "../../../../../Redux/Auth/activeStatus/actionActiveStatus";
import { activeStatusAction } from "../../../../Redux/Auth/activeStatus/actionActiveStatus";
import {
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { message } from "antd";
import Slider from "@mui/material/Slider";
import { apiURL } from "../../../../Constants/constant";
import SortAscendingIcon from "@mui/icons-material/ArrowUpward";
import SortDescendingIcon from "@mui/icons-material/ArrowDownward";
import "./Table.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { vendorAction } from "../../../../Redux/Auth/VendorAmount/vendorAmountData";
const CustomToolbar = ({
  handleSortAscending,
  handleSortDescending,
  searchTerm,
  handleSearch,
}) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <Button
        onClick={handleSortAscending}
        startIcon={<SortAscendingIcon />}
        sx={{
          marginLeft: "8px",
          backgroundColor: "white",
          color: "#5298DD",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
        variant="contained"
      >
        Sort Ascending
      </Button>
      <Button
        onClick={handleSortDescending}
        startIcon={<SortDescendingIcon />}
        sx={{
          marginLeft: "8px",
          backgroundColor: "white",
          color: "#5298DD",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
        variant="contained"
      >
        Sort Descending
      </Button>
      {/* <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, ID, etc."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      /> */}
    </GridToolbarContainer>
  );
};

const MAX_REVENUE = 100000;
const MIN_REVENUE = 0;
const marks = [
  {
    value: MIN_REVENUE,
    label: "",
  },
  {
    value: MAX_REVENUE,
    label: "",
  },
];

const MAX_BALANCE = 100000;
const MIN_BALANCE = 0;

const balanceMarks = [
  {
    value: MIN_BALANCE,
    label: "",
  },
  {
    value: MAX_BALANCE,
    label: "",
  },
];
export default function Tables() {
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [minRevenue, setMinRevenue] = useState(MIN_REVENUE);
  const [balanceRange, setBalanceRange] = useState([MIN_BALANCE, MAX_BALANCE]);
  const [bonus, setBonus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);

  // Define handleShowBonusModal function to control bonus modal visibility
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  console.log(reducerState, "+++++++++++++++");
  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  const tableData = reducerState?.userTableData?.userData?.data?.result;
  console.log(reducerState?.userTableData);

  const [rows, setRows] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [sortingOrder, setSortingOrder] = useState({ field: "", sort: "" });
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [load, setLoad] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState("");

  const adminId = useSelector((state) => state.adminAuth.adminData.data.id);

  const [showVendorModal, setShowVendorModal] = useState(false);

  const handleShowVendorModal = (agentId) => {
    setSelectedAgentId(agentId);
    setShowVendorModal(true);
  };

  const handleCloseVendorModal = () => {
    setShowVendorModal(false);
    setAmount("");
    setSelectedAgentId("");
  };

  // const Adminid = reducerState.adminAuth.adminData.data.id;

  const handleShowBonusModal = (agentId) => {
    setSelectedUserId({});
    setShowBonusModal(true);
  };

  const handleSortAscending = () => {
    setSortingOrder({ field: "firstName", sort: "asc" });
  };

  const handleSortDescending = () => {
    setSortingOrder({ field: "firstName", sort: "desc" });
  };

  const handleShow = (agentId) => {
    setSelectedAgentId(agentId);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setAmount("");
    setSelectedAgentId("");
  };

  const handleImageClick = (url) => {
    setModalImageUrl(url);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
    setModalImageUrl("");
  };

  const markupData = reducerState?.userTableData?.userData?.data?.result?.map(
    (ele) => ele.markup
  );
  console.log(markupData, "++++++++++++");
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("++++++++++++++++tabledat");
    if (tableData) {
      const formattedRows = tableData.map((ele) => {
        return {
          id: ele._id,
          createdAt: ele?.createdAt || "No Data",
          balance: ele?.balance || 0,
          firstName: ele.personal_details?.first_name || "No Data",

          email: ele.personal_details?.email || "No Data",

          agencyName: ele.agency_details?.agency_name || "No Data",
          agencyEmail: ele.agency_gst_details?.email || "No Data",
          agencyClassification:
            ele.agency_gst_details?.agency_classification || "No Data",
          agencyAddress: ele.agency_details?.address || "No Data",
          contactPerson: ele.agency_gst_details?.contact_person || "No Data",
          provisionalGSTIN:
            ele.agency_gst_details?.provisional_GSTIN || "No Data",
          mobile: ele.personal_details?.mobile?.mobile_number || "No Data",
          isActive: ele.is_active,
          panCardDocument:
            ele.agency_details?.document_details?.pan_card_document ||
            "https://www.sarojhospital.com/images/testimonials/dummy-profile.png",
          totalRevenue: ele.totalRevenue || 0,
          flight: ele.markup?.flight || 0,
          hotel: ele.markup?.hotel || 0,
          bus: ele.markup?.bus || 0,

          holiday: ele.markup?.holiday || 0,
          walletid: ele.walletid,
        };
      });
      setRows(formattedRows);
    }
    setLoading(false);
  }, [tableData]);

  // const updateVendorAmount = async () => {
  //   const amountNumber = Number(amount);
  //   if (isNaN(amountNumber) || amountNumber <= 0) {
  //     console.error('Invalid amount');
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(`${apiURL.baseURL}/skyTrails/api/agent/addBalance`, {
  //       adminId,
  //       amount: amountNumber,
  //       agentId: selectedAgentId,
  //     });
  //     console.log('Response:', response.data);
  //     handleClose(); // Close the modal after successful update
  //     dispatch(getUserAction());

  //   } catch (error) {
  //     console.error('Error updating vendor amount:', error);
  //   }
  // };

  const updateVendorAmount = async () => {
    const amountNumber = Number(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      message.error("Invalid amount. Please enter a positive number.");
      return;
    }

    try {
      setLoad(true); // Show loader
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/agent/addBalance`,
        {
          adminId,
          amount: amountNumber,
          agentId: selectedAgentId,
        }
      );
      console.log("Response:", response.data);
      message.success("Amount updated successfully!");
      setShow(false); // Close modal on success
      dispatch(getUserAction()); // Update state
    } catch (error) {
      console.error("Error updating vendor amount:", error);
      message.error("Failed to update amount!");
    } finally {
      setLoad(false); // Always hide loader, even after an error
    }
  };

  const handleAddBonus = async (userId) => {
    try {
      setLoad(true); // Show loader
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/distributeReward`,
        {
          agentId: userId,
          rewardPercentage: parseFloat(bonus),
        }
      );
      setSuccessMessage(response.data.responseMessage);
      setShowBonusModal(false); // Close modal on success
      message.success("Bonus added successfully!"); // Optional success message
    } catch (error) {
      console.error("Error adding bonus:", error);
      message.error("Failed to add bonus!"); // Optional error message
    } finally {
      setLoad(false); // Hide loader
    }
  };

  useEffect(() => {
    if (sortingOrder.field) {
      const sortedRows = [...rows].sort((a, b) => {
        if (sortingOrder.sort === "asc") {
          return a[sortingOrder.field].localeCompare(b[sortingOrder.field]);
        }
        if (sortingOrder.sort === "desc") {
          return b[sortingOrder.field].localeCompare(a[sortingOrder.field]);
        }
        return 0;
      });
      setRows(sortedRows);
    }
  }, [sortingOrder, rows]);

  const [loadingRows, setLoadingRows] = React.useState({}); // Object to track loading state for each row

  console.log(loadingRows, "loadingjjjjjjjj");

  // const handleToggle = async (value, userId) => {
  //   // Set the specific row's loading state to true
  //   setLoadingRows((prev) => ({ ...prev, [userId]: true }));

  //   const payload = {
  //     user_id: userId,
  //     is_active: value === "active" ? 1 : 0,
  //   };

  //   try {
  //     console.log(payload, "payload=========");
  //     const res = await dispatch(activeStatusAction(payload)); // Perform API call
  //     dispatch(getUserAction());
  //     console.log(dispatch(getUserAction()), res, "response=========");
  //     //setLoadingRows((prev) => ({ ...prev, [userId]: false })); // Set loading state back to false
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     alert("Failed to update status. Please try again.");
  //   }

  //   // finally{
  //   //   setLoadingRows((prev) => ({...prev, [userId]: false })); // Set loading state back to false
  //   // }
  //   // Refresh data
  //   setTimeout(() => {
  //     setLoadingRows((prev) => ({ ...prev, [userId]: false }));
  //   }, 500);
  // };

  const getAllAgentData = (userId) => {};

  const handleToggle = async (value, userId) => {
    // Set the specific row's loading state to true
    setLoadingRows((prev) => ({ ...prev, [userId]: true }));

    const payload = {
      user_id: userId,
      is_active: value === "active" ? 1 : 0,
    };

    try {
      // Direct API call using fetch
      const res = await fetch(`${apiURL.baseURL}/skyTrails/user/update`, {
        method: "POST", // Assuming it's a POST request, adjust if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send payload in the body
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const data = await res.json(); // Parse the response JSON
      console.log(data, "response");
      dispatch(getUserAction()); // Refresh the user data
      setLoadingRows((prev) => ({ ...prev, [userId]: false }));

      // Optionally, handle success actions (e.g., updating the UI with response data)
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
    setLoadingRows((prev) => ({ ...prev, [userId]: false }));
    // Set loading state to false after the API call is done (whether success or failure)

    // Refresh the user data if needed (optional)
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRevenueChange = (event, newValue) => {
    setMinRevenue(newValue[0]);
  };
  const handleBalanceRangeChange = (event, newValue) => {
    setBalanceRange(newValue);
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.agencyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRevenue = row.totalRevenue >= minRevenue;
    const matchesBalance =
      row.balance >= balanceRange[0] && row.balance <= balanceRange[1];

    return matchesSearch && matchesRevenue && matchesBalance;
  });

  const columns = [
    {
      field: "panCardDocument",
      headerName: "Document",
      filterable: false,
      renderCell: (params) => (
        <div
          onClick={() => handleImageClick(params.value)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={params.value}
            alt="Document"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      ),
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    { field: "firstName", headerName: "Name", width: 150, sortable: true },
    {
      field: "balance",
      headerName: "Balance",
      width: 100,
      sortable: true,
      valueGetter: (params) => {
        return params.row?.balance || "0";
      },
    },
    {
      field: "agencyName",
      headerName: "Agency Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "agencyClassification",
      headerName: "Agency Classification",
      width: 200,
      filterable: false,
    },
    { field: "mobile", headerName: "Mobile", width: 200 },
    {
      field: "totalRevenue",
      headerName: "Agent Revenue",
      width: 150,

      renderCell: (params) => <div>{params.value}</div>,
    },
    {
      field: "flight",
      headerName: "Flight Amount",
      width: 150,

      renderCell: (params) => <div>{params.value}</div>,
    },

    {
      field: "hotel",
      headerName: "Hotel Amount",
      width: 150,

      renderCell: (params) => <div>{params.value}</div>,
    },

    {
      field: "bus",
      headerName: "Bus Amount",
      width: 150,

      renderCell: (params) => <div>{params.value}</div>,
    },

    {
      field: "holiday",
      headerName: "Holiday Amount",
      width: 150,

      renderCell: (params) => <div>{params.value}</div>,
    },

    {
      field: "vendorAmount",
      headerName: "Vendor Amount",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShow(params.row.id)}
          >
            Add Amount
          </Button>
          <Modal
            className="tableModal"
            show={show}
            onHide={handleClose}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Vendor Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Box
                sx={{
                  width: 400,
                  maxWidth: "100%",
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <TextField
                  size="large"
                  placeholder="Vendor Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={updateVendorAmount}
                  fullWidth
                  disabled={load}
                >
                  {load ? <CircularProgress size={20} /> : "Add Amount"}
                </Button>
              </Box>
            </Modal.Body>
          </Modal>
        </>
      ),
    },

    {
      field: "addBonus",
      headerName: "Add Bonus",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            onClick={() => handleShowBonusModal(params.row.id)}
            fullWidth
          >
            Add Bonus
          </Button>
          <Modal
            show={showBonusModal}
            onHide={() => setShowBonusModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Bonus Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {load && (
                <div
                  className="loader-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.5)",
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress
                    color="primary"
                    size={50}
                    thickness={3}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              )}
              <TextField
                size="large"
                label="Bonus Amount"
                placeholder="Enter bonus amount"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAddBonus(params.row.id)}
                fullWidth
              >
                Add Bonus
              </Button>
            </Modal.Body>
          </Modal>
        </>
      ),
    },
    {
      field: "isActive",
      headerName: "Is Active",
      width: 500,
      filterable: false,
      renderCell: (params) => {
        const isLoading = loadingRows[params.row.id]; // Check if the specific row is loading

        return (
          <>
            {params.value === 1 ? (
              <span
                style={{
                  backgroundColor: "green",
                  padding: "5px 10px",
                  borderRadius: "7px",
                  color: "white",
                  marginRight: "8px",
                }}
              >
                Active
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "red",
                  padding: "5px 10px",
                  borderRadius: "7px",
                  color: "white",
                  marginRight: "8px",
                }}
              >
                Inactive
              </span>
            )}

            <div
              style={{
                position: "relative", // Ensures positioning of loader relative to the dropdown
                display: "inline-block",
                minWidth: "150px",
              }}
            >
              <select
                value={params.value === 1 ? "active" : "inactive"}
                onChange={(e) => handleToggle(e.target.value, params.row.id)}
                style={{ width: "150px" }}
                disabled={isLoading} // Disable dropdown while loading
              >
                <option>Update</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {isLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Center the loader
                    zIndex: 10, // Ensure the loader is above the dropdown
                    pointerEvents: "none", // Prevent interaction with the loader overlay
                  }}
                >
                  <Spin size="small" /> {/* Ant Design Loader */}
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div
        className="subada-table-container"
        style={{ position: "relative", width: "100%", marginTop: "100px" }}
      >
        <div
          className="adsearch-bar"
          style={{
            position: "absolute",
            top: 5,
            zIndex: 1,
            fontWeight: "bold",
            backgroundColor: "#21325D",
          }}
        >
          <Typography variant="h6" className="adtable-heading">
            Agent Table
          </Typography>

          <TextField
            type="text"
            sx={{
              border: "1px solid white",
              color: "white",
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
            }}
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, ID, etc."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "white" }}>
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", width: "27%", gap: "10px" }}>
            <Typography gutterBottom>Revenue: </Typography>
            <Slider
              value={[minRevenue, MAX_REVENUE]}
              onChange={handleRevenueChange}
              valueLabelDisplay="auto"
              min={MIN_REVENUE}
              max={MAX_REVENUE}
              step={100}
              marks={marks}
              // style={{ width: "100px", marginLeft: "16px" }}
            />
          </Box>
          <Box sx={{ display: "flex", width: "27%", gap: "10px" }}>
            <Typography gutterBottom>Balance</Typography>
            <Slider
              value={balanceRange}
              onChange={handleBalanceRangeChange}
              valueLabelDisplay="auto"
              min={MIN_BALANCE}
              max={MAX_BALANCE}
              marks={balanceMarks}
            />
          </Box>
        </div>

        <Box sx={{ height: 600, width: "100%" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div>
              <DataGrid
                rows={filteredRows.slice(
                  (page - 1) * pageSize,
                  page * pageSize
                )} // Display only the first 10 rows
                columns={columns}
                pageSize={pageSize}
                components={{
                  Toolbar: () => (
                    <CustomToolbar
                      handleSortAscending={handleSortAscending}
                      handleSortDescending={handleSortDescending}
                    />
                  ),
                  Pagination: () => null,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <Pagination
                  count={Math.ceil((filteredRows.length || 1) / pageSize)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </div>
          )}
        </Box>

        <Modal
          show={imageModalOpen}
          onHide={handleImageModalClose}
          style={{ marginTop: "50px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Document Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={modalImageUrl}
              alt="Document"
              style={{ width: "100%", height: "auto" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleImageModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
