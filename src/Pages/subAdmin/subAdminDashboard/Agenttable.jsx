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
import { Typography, TextField, CircularProgress } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
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
export default function Agenttable() {
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [minRevenue, setMinRevenue] = useState(MIN_REVENUE);
  const [balanceRange, setBalanceRange] = useState([MIN_BALANCE, MAX_BALANCE]);

  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

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

  const handleImageClick = (url) => {
    setModalImageUrl(url);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
    setModalImageUrl("");
  };

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (tableData) {
      const formattedRows = tableData.map((ele) => {
        return {
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
          totalRevenue: ele.totalRevenue || 0,
        };
      });
      setRows(formattedRows);
    }
    setLoading(false);
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

  const handleRevenueChange = (event, newValue) => {
    setMinRevenue(newValue[0]);
  };
  const handleBalanceRangeChange = (event, newValue) => {
    setBalanceRange(newValue);
  };
  //const filteredRows = rows.filter((row) => row.totalRevenue >= minRevenue);
  const filteredRows = rows.filter(
    (row) =>
      row.totalRevenue >= minRevenue &&
      row.balance >= balanceRange[0] &&
      row.balance <= balanceRange[1]
  );
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
              top: 5,
              zIndex: 1,
              fontWeight: "bold",
              backgroundColor: "#E73C33",
            }}
          >
            <Typography variant="h5" className="adtable-heading">
              Agent Table
            </Typography>
            <Box sx={{ display: "flex", width: "30%", gap: "10px" }}>
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
            <Box sx={{ display: "flex", width: "30%", gap: "10px" }}>
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

          <Box sx={{ height: 600, width: "100%", marginTop: "8px" }}>
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
      )}
    </>
  );
}
