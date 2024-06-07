import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../Redux/Auth/UserData/actionUserData";
import { activeStatusAction } from "../../../Redux/Auth/activeStatus/actionActiveStatus";
import { Typography, TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import Button from "@mui/material/Button";
import SortAscendingIcon from "@mui/icons-material/ArrowUpward";
import SortDescendingIcon from "@mui/icons-material/ArrowDownward";
import "./Agenttable.css";

const CustomToolbar = ({ handleSortAscending, handleSortDescending }) => {
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
    </GridToolbarContainer>
  );
};

export default function Agenttable() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  const tableData = reducerState?.userTableData?.userData?.data?.data;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [sortingOrder, setSortingOrder] = useState({ field: "", sort: "" });

  const handleSortAscending = () => {
    setSortingOrder({ field: "firstName", sort: "asc" });
  };

  const handleSortDescending = () => {
    setSortingOrder({ field: "firstName", sort: "desc" });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUser_id(id);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    axios.get(`${apiURL.baseURL}/skyTrails/user/getallusers`);
  }, []);

  useEffect(() => {
    const fetchAgentRevenue = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/agent/getAllAgentRevenue`
        );
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching agent revenue:", error);
      }
    };

    fetchAgentRevenue();
  }, []);

  useEffect(() => {
    if (tableData) {
      const formattedRows = tableData.map((ele) => ({
        id: ele._id,
        createdAt: ele?.createdAt || "No Data",
        balance: ele?.balance || 0,
        firstName: ele.personal_details?.first_name || "No Data",
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
      }));
      setRows(formattedRows);
    }
  }, [tableData]);

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

  const handleToggle = async (value, userId) => {
    const payload = {
      user_id: userId,
      is_active: value === "active" ? 1 : 0,
    };
    try {
      await dispatch(activeStatusAction(payload));
    } catch (error) {
      console.error("Error updating status:", error);
    }
    dispatch(getUserAction());
  };

  const columns = [
    {
      field: "panCardDocument",
      headerName: "Document Image",
      width: 200,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Document"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    { field: "firstName", headerName: "Name", width: 200, sortable: true },
    {
      field: "balance",
      headerName: "Balance",
      width: 200,
      sortable: true,
      valueGetter: (params) => {
        // Access balance directly from params.row
        return params.row?.balance || "0";
      },
    },
    {
      field: "agencyName",
      headerName: "Agency Name",
      width: 200,
    },
    {
      field: "agencyEmail",
      headerName: "Agency Email",
      width: 200,
      valueGetter: (params) => {
        return params?.row?.agencyEmail || "N/A";
      },
    },
    {
      field: "agencyClassification",
      headerName: "Agency Classification",
      width: 200,
      filterable: false,
    },
    { field: "mobile", headerName: "Mobile", width: 200 },
    { field: "AgentRevenue", headerName: "AgentRevenue", width: 200 },

    {
      field: "isActive",
      headerName: "Is Active",
      width: 200,
      filterable: false,
      renderCell: (params) => (
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
          <select
            value={params.value}
            onChange={(e) => handleToggle(e.target.value, params.row.id)}
            style={{ width: "150px" }}
          >
            <option>Update</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </>
      ),
    },
  ];

  return (
    <>
      {access !== "BOOKING_MANAGER" ? (
        <div style={{ textAlign: "center" }}>INVALID PAGE</div>
      ) : (
        <div
          className="subada-table-container"
          style={{ position: "relative", width: "100%", marginTop: "-15px" }}
        >
          <div
            className="adsearch-bar"
            style={{
              position: "absolute",
              top: 10,
              zIndex: 1,
              fontWeight: "bold",
              backgroundColor: "#E73C33",
            }}
          >
            <Typography variant="h5" className="adtable-heading">
              Agent Table
            </Typography>
          </div>
          <Box sx={{ height: 600, width: "100%", marginTop: "8px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 20, 30]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              components={{
                Toolbar: () => (
                  <CustomToolbar
                    handleSortAscending={handleSortAscending}
                    handleSortDescending={handleSortDescending}
                  />
                ),
              }}
              pagination
            />
          </Box>
          <Modal show={show} onHide={handleClose} centered>
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
                  id="standard-basic"
                  placeholder="Vendor Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              </Box>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
