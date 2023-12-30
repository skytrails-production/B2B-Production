import { styled } from "@mui/material/styles";
import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  userData,
} from "../../../../Redux/Auth/UserData/actionUserData";
import {
  Backdrop,
  Button,
  Checkbox,
  Fade,
  Switch,
  TextField,
} from "@mui/material";
import "./Table.css";
import { markUpAction } from "../../../../Redux/Auth/markUp/actionMarkUp";
import { activeStatusAction } from "../../../../Redux/Auth/activeStatus/actionActiveStatus";
import DoneIcon from "@mui/icons-material/Done";
import { vendorAction } from "../../../../Redux/Auth/VendorAmount/vendorAmountData";
import { AiFillEdit } from "react-icons/ai";

// React-bootstrap
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Loader from "../../../Loader/Loader";
import TablePreloader from "../../../Loader/TablePreloader";
import { apiURL } from "../../../../Constants/constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const fromStyle = {
  bgcolor: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables() {
  const [imgUrl, setImgUrl] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const reducerState = useSelector((state) => state);
  const activeData = reducerState?.userTableData?.userData?.data?.data?.map(
    (ele) => ele.is_active
  );

  // console.log(reducerState);
  // console.log("active", activeData);

  const dispatch = useDispatch();
  // const [markUpValues, setMarkUpValues] = useState(markups);

  // Get api;
  const tableData = reducerState?.userTableData?.userData?.data?.data;

  const [markUpValues, setMarkUpValues] = useState({
    flight: "",
    hotel: "",
    holiday: "",
    bus: "",
  });

  // console.log(imgUrl);

  // const [openModal,setOpenModal] = useState(false)
  const [isActive, setIsActive] = useState(
    reducerState?.userTableData?.userData?.data?.data[0]?.is_active
  );

  // const [markUp, setMarkUp] = useState(reducerState?.userTableData?.userData?.data?.data[0]?.markup)

  const markupData = reducerState?.userTableData?.userData?.data?.data.map(
    (ele) => ele.markup
  );

  // useEffect(() => {
  //   dispatch(getUserAction());
  // }, []);

  // useEffect(() => {
  //   // window.location.reload();
  //   dispatch(getUserAction());
  // }, []);
  //MarkupData

  // mui modal
  const [open, setOpen] = React.useState(false);
  // Custom mui modal function
  const handleModal = (e) => {
    setOpen(!open);
  };

  // console.log("open",open);
  // Mui checkbox
  // const [selected, setSelected] = useState([]);
  // const [activeSwitch, setActiveSwitch] = useState(true);

  useEffect(() => {
    axios.get(`${apiURL.baseURL}/skyTrails/user/getallusers`);
  }, []);

  // -------- Activate or Deactivate--------//
  const [activeUsers, setActive] = useState({});

  const [value, setValue] = React.useState("");

  const handleToggle = async (value, userId) => {
    setLoading(true);
    // Get the current status of the user
    const currentStatus = activeUsers[userId];
    // Invert the current status to get the updated status
    const updatedStatus = !currentStatus;
    // Update the activeUsers state with the new status
    // console.log("undated status", updatedStatus);
    setActive({ ...activeUsers, [userId]: updatedStatus });

    // console.log("value", value);

    if (value === "active") {
      const payload = {
        user_id: userId,
        is_active: 1,
      };
      dispatch(activeStatusAction(payload));
    } else if (value == "inactive") {
      const payload = {
        user_id: userId,
        is_active: 0,
      };
      setLoading(false);
      dispatch(activeStatusAction(payload));
    }
    setValue(value);
    window.location.reload();
  };
  // console.log("value", value);
  useEffect(() => {
    dispatch(getUserAction());
  }, [value]);

  // Input field of markup
  const [inputMarkUp, setInputMarkUp] = useState("");
  const [inputid, setId] = useState("");

  const handleMarkUp = (event, id) => {
    const { name, value } = event.target;

    // console.log("name" + name + " " + value);

    setMarkUpValues({
      ...markUpValues,
      [name]: value,
    });

    // console.log(markUpValues);

    setInputMarkUp(event.target.value);

    let oldValue = inputMarkUp;
    let newValue = event.target.value;
    setInputMarkUp(newValue);
    setId(id);
  };

  // Handle update status For flight

  const handleStatusUpdate1 = (e) => {
    const { name, value } = e.target;
    setMarkUpValues({
      ...markUpValues,
      [name]: value,
    });
    const payload = {
      userId: inputid,
      markup: {
        flight: markUpValues.flight,
      },
    };
    dispatch(markUpAction(payload));
  };
  const handleStatusUpdate2 = (e) => {
    const { name, value } = e.target;
    setMarkUpValues({
      ...markUpValues,
      [name]: value,
    });
    const payload = {
      userId: inputid,
      markup: {
        hotel: markUpValues.hotel,
      },
    };
    dispatch(markUpAction(payload));
  };
  const handleStatusUpdate3 = (e) => {
    const { name, value } = e.target;
    setMarkUpValues({
      ...markUpValues,
      [name]: value,
    });
    const payload = {
      userId: inputid,
      markup: {
        bus: markUpValues.bus,
      },
    };
    dispatch(markUpAction(payload));
  };
  // const handleVenderAmount = (e, id) => {
  //   console.log("vender", id);
  //   setVenderOpen(!venderOpen)
  // }
  const handleStatusUpdate4 = () => {
    const payload = {
      userId: inputid,
      markup: {
        holiday: markUpValues.holiday,
      },
    };
    dispatch(markUpAction(payload));
  };

  const [venderOpen, setVenderOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState("INR");
  const [amount, setAmount] = React.useState("");

  const adminCheck = reducerState?.adminAuth?.adminData?.data?.id;
  // console.log("adminCheck", adminCheck);

  const updateVendorAmount = (id) => {
    // console.log("wallet id", id);

    const payload = {
      data: {
        isAdmin: adminCheck,
        balance: amount,
        currency: "INR",
      },
      key: {
        wallet_Id: id,
      },
    };
    dispatch(vendorAction(payload));
  };

  // React - modal
  const [show, setShow] = useState(false);
  const [user_id, setUser_id] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (ele) => {
    // console.log("user Id", ele);
    setUser_id(ele);
    // console.log(user_id);
    setShow(true);
  };

  //  Img Modal POP Up
  const [showImg, setImgShow] = useState(false);
  const [documentImgUrl, setDocumentImgUrl] = useState("");

  const handleImgClose = () => setImgShow(false);

  const handleImgShow = (img) => {
    console.log("imgUrl", img);
    setDocumentImgUrl(img);
    setImgShow(true);
  };

  return (
    <>
      <Box height={100} />
      <TableContainer
        style={{ width: "85%" }}
        sx={{
          margin: "auto",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Document Image</StyledTableCell>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell align="center">Agency Name</StyledTableCell>
              <StyledTableCell align="center">Agency Email</StyledTableCell>
              <StyledTableCell align="center">
                Agency Classification
              </StyledTableCell>
              <StyledTableCell width={300} align="center">
                Agency Address
              </StyledTableCell>
              <StyledTableCell align="center">Contact Person</StyledTableCell>
              <StyledTableCell align="center">
                Provisional GSTIN
              </StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Is Active</StyledTableCell>
              <StyledTableCell align="center">Flight Amount</StyledTableCell>
              <StyledTableCell align="center">Hotel Amount</StyledTableCell>
              <StyledTableCell align="center">Bus Amount</StyledTableCell>
              <StyledTableCell align="center">Holiday Amount</StyledTableCell>
              <StyledTableCell align="center">Vendor Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData || tableData === "undefined"
              ? tableData.map((ele, index) => {
                  return (
                    <>
                      <StyledTableRow key={index}>
                        {/* <img src={ele.agency_details.document_details.pan_card_document}  alt={index} /> */}
                        <StyledTableCell align="right">
                          <Modal show={showImg} onHide={handleImgClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Document Image</Modal.Title>
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
                                <img
                                  style={{
                                    width: "100%",
                                    height: "165px",
                                  }}
                                  src={documentImgUrl}
                                  alt={index}
                                />
                              </Box>
                            </Modal.Body>
                          </Modal>

                          <Button
                            onClick={(e) =>
                              handleImgShow(
                                ele?.agency_details?.document_details
                                  ?.pan_card_document
                              )
                            }
                          >
                            <img
                              style={{
                                width: "112px",
                                height: "65px",
                              }}
                              // src={
                              //   ele.agency_details.document_details
                              //     .pan_card_document
                              // }
                              alt={index}
                            />
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {ele.personal_details?.first_name || "NA"}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {ele.agency_details.agency_name&&
                            ele.agency_details.agency_name 
                            ? ele.agency_details.agency_name
                            : "NA"}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                        {ele.agency_gst_details?.agency_classification || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.agency_details?.address || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.agency_gst_details?.email || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.agency_gst_details?.agency_name || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.agency_gst_details?.provisional_GSTIN || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.personal_details?.mobile?.mobile_number || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.personal_details?.password?.slice(0, 32) || "NA"}
                        <br />
                        {ele.personal_details?.password?.slice(32) || "NA"}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        {ele.is_active == 1 && (
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
                        )}
                        {ele.is_active === 0 && (
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
                          value={ele.is_active}
                          onChange={(e) => handleToggle(e.target.value, ele._id)}
                        >
                          <option>Update</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">
                        <Box
                          sx={{
                            width: 150,
                            maxWidth: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "-10px",
                          }}
                        >
                          <TextField
                            className="mark__Up__Input"
                            placeholder={markUpValues.flight || "0"}
                            defaultValue={markupData[index]?.flight || "0"}
                            sx={{
                              width: "108px",
                              marginRight: "10px",
                              fontSize: "18px",
                            }}
                            variant="standard"
                            fullWidth
                            name="flight"
                            onChange={(event) => handleMarkUp(event, ele._id)}
                          />
                          <button
                            color="success"
                            className="mark__up__btn"
                            onClick={handleStatusUpdate1}
                          >
                            <DoneIcon />
                          </button>
                        </Box>
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">
                        <Box
                          sx={{
                            width: 150,
                            maxWidth: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            placeholder={markupData[index]?.hotel || "0"}
                            defaultValue={markupData[index]?.hotel || "0"}
                            name="hotel"
                            sx={{
                              width: "128px",
                              marginRight: "10px",
                              fontSize: "18px",
                            }}
                            variant="standard"
                            fullWidth
                            onChange={(event) => handleMarkUp(event, ele._id)}
                          />
                          <button
                            color="success"
                            className="mark__up__btn"
                            onClick={handleStatusUpdate2}
                          >
                            <DoneIcon />
                          </button>
                        </Box>
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">
                        <Box
                          sx={{
                            width: 150,
                            maxWidth: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            placeholder={markupData[index]?.bus || "0"}
                            name="bus"
                            defaultValue={markupData[index]?.bus || "0"}
                            sx={{
                              width: "128px",
                              marginRight: "10px",
                              fontSize: "18px",
                            }}
                            variant="standard"
                            fullWidth
                            onChange={(event) => handleMarkUp(event, ele._id)}
                          />
                          <button
                            color="success"
                            className="mark__up__btn"
                            onClick={handleStatusUpdate3}
                          >
                            <DoneIcon />
                          </button>
                        </Box>
                      </StyledTableCell>
                      
                      <StyledTableCell align="center">
                        <Box
                          sx={{
                            width: 250,
                            maxWidth: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            placeholder={markupData[index]?.holiday || "0"}
                            name="holiday"
                            defaultValue={markupData[index]?.holiday || "0"}
                            sx={{
                              width: "85px",
                              marginRight: "10px",
                              fontSize: "18px",
                            }}
                            variant="standard"
                            fullWidth
                            onChange={(event) => handleMarkUp(event, ele._id)}
                          />
                          <button
                            color="success"
                            className="mark__up__btn"
                            onClick={handleStatusUpdate4}
                          >
                            <DoneIcon />
                          </button>
                        </Box>
                      </StyledTableCell>                      
                        <td>
                          <Button
                            className="add_vendor_btn"
                            variant="primary"
                            onClick={(e) => handleShow(ele._id)}
                          >
                            Add Amount
                          </Button>
                          {/* Modal  */}
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Vendor Amount </Modal.Title>
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
                                  label="Vendor Amount"
                                  onChange={(e) => setAmount(e.target.value)}
                                />

                                <Button
                                  className="add_vendor_btn"
                                  variant="contained"
                                  color="success"
                                  onClick={(e) =>
                                    updateVendorAmount(ele?.walletid)
                                  }
                                >
                                  Add Amount
                                </Button>
                              </Box>
                            </Modal.Body>
                          </Modal>
                        </td>
                      </StyledTableRow>
                    </>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
