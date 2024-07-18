// import { styled } from "@mui/material/styles";
// import "./Table.css";
// import Table from "@mui/material/Table";
// import Snackbar from "@mui/material/Snackbar";
// import { CircularProgress } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserAction,
//   userData,
// } from "../../../../Redux/Auth/UserData/actionUserData";
// import {
//   Backdrop,
//   Button,
//   Checkbox,
//   Fade,
//   Switch,
//   TextField,
//   InputAdornment,
//   Typography,
// } from "@mui/material";
// import "./Table.css";
// import { markUpAction } from "../../../../Redux/Auth/markUp/actionMarkUp";
// import { activeStatusAction } from "../../../../Redux/Auth/activeStatus/actionActiveStatus";
// import DoneIcon from "@mui/icons-material/Done";
// import { vendorAction } from "../../../../Redux/Auth/VendorAmount/vendorAmountData";
// import { AiFillEdit } from "react-icons/ai";
// import Pagination from "@mui/material/Pagination";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbarFilterButton,
// } from "@mui/x-data-grid";
// // React-bootstrap
// import Modal from "react-bootstrap/Modal";
// import axios from "axios";
// import Loader from "../../../Loader/Loader";
// import TablePreloader from "../../../Loader/TablePreloader";
// import { apiURL } from "../../../../Constants/constant";
// import SortAscendingIcon from "@mui/icons-material/ArrowUpward";
// import SortDescendingIcon from "@mui/icons-material/ArrowDownward";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",

//   boxShadow: 24,
//   p: 4,
// };

// const fromStyle = {
//   bgcolor: "white",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
// };

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     color: theme.palette.common.black,
//     fontSize: 16,
//     fontWeight: "bold",
//     border: "none",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     border: "none",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const CustomToolbar = ({ handleSortAscending, handleSortDescending }) => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarFilterButton />
//       <GridToolbarExport />
//       <Button
//         onClick={handleSortAscending}
//         startIcon={<SortAscendingIcon />}
//         sx={{
//           marginLeft: "8px",
//           backgroundColor: "white",
//           color: "#5298DD",
//           "&:hover": {
//             backgroundColor: "#f0f0f0",
//           },
//         }}
//         variant="contained"
//       >
//         Sort Ascending
//       </Button>
//       <Button
//         onClick={handleSortDescending}
//         startIcon={<SortDescendingIcon />}
//         sx={{
//           marginLeft: "8px",
//           backgroundColor: "white",
//           color: "#5298DD",
//           "&:hover": {
//             backgroundColor: "#f0f0f0",
//           },
//         }}
//         variant="contained"
//       >
//         Sort Descending
//       </Button>
//     </GridToolbarContainer>
//   );
// };

// export default function Tables() {
//   const [imgUrl, setImgUrl] = useState(null);
//   const [checked, setChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const reducerState = useSelector((state) => state);
//   const activeData = reducerState?.userTableData?.userData?.data?.data?.map(
//     (ele) => ele.is_active
//   );

//   // console.log(reducerState);
//   // console.log("active", activeData);

//   const dispatch = useDispatch();
//   // const [markUpValues, setMarkUpValues] = useState(markups);

//   // Get api;
//   const tableData = reducerState?.userTableData?.userData?.data?.result;

//   const [markUpValues, setMarkUpValues] = useState({
//     flight: "",
//     hotel: "",
//     holiday: "",
//     bus: "",
//   });
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(1);
//   };
//   // console.log(imgUrl);

//   // const [openModal,setOpenModal] = useState(false)
//   const [isActive, setIsActive] = useState(
//     reducerState?.userTableData?.userData?.data?.data?.is_active
//   );

//   // const [markUp, setMarkUp] = useState(reducerState?.userTableData?.userData?.data?.data[0]?.markup)

//   const markupData = reducerState?.userTableData?.userData?.data?.result?.map(
//     (ele) => ele.markup
//   );

//   // useEffect(() => {
//   //   dispatch(getUserAction());
//   // }, []);

//   // useEffect(() => {
//   //   // window.location.reload();
//   //   dispatch(getUserAction());
//   // }, []);
//   //MarkupData

//   // mui modal
//   const [open, setOpen] = React.useState(false);
//   // Custom mui modal function
//   const handleModal = (e) => {
//     setOpen(!open);
//   };

//   // console.log("open",open);
//   // Mui checkbox
//   // const [selected, setSelected] = useState([]);
//   // const [activeSwitch, setActiveSwitch] = useState(true);

//   // useEffect(() => {
//   //   axios.get(`${apiURL.baseURL}/skyTrails/user/getallusers`);
//   //   //console.log(ab);
//   // }, []);

//   // -------- Activate or Deactivate--------//
//   const [activeUsers, setActive] = useState({});
//   const [load, setLoad] = useState(false);
//   const [value, setValue] = React.useState("");

//   const handleToggle = async (value, userId) => {
//     setLoading(true);

//     const currentStatus = activeUsers[userId];
//     const updatedStatus = !currentStatus;

//     setActive({ ...activeUsers, [userId]: updatedStatus });

//     if (value === "active" || value === "inactive") {
//       const payload = {
//         user_id: userId,
//         is_active: value === "active" ? 1 : 0,
//       };

//       try {
//         await dispatch(activeStatusAction(payload));
//         // If the dispatch is successful, you don't need to reload the entire page.
//       } catch (error) {
//         console.error("Error updating status:", error);
//       }
//     }

//     setLoading(false);
//     setValue(value);
//   };

//   // console.log("value", value);
//   useEffect(() => {
//     dispatch(getUserAction());
//   }, [value]);

//   // Input field of markup
//   const [inputMarkUp, setInputMarkUp] = useState("");
//   const [inputid, setId] = useState("");

//   const handleMarkUp = (event, id) => {
//     const { name, value } = event.target;

//     // console.log("name" + name + " " + value);

//     setMarkUpValues({
//       ...markUpValues,
//       [name]: value,
//     });

//     // console.log(markUpValues);

//     setInputMarkUp(event.target.value);

//     let oldValue = inputMarkUp;
//     let newValue = event.target.value;
//     setInputMarkUp(newValue);
//     setId(id);
//   };

//   // Handle update status For flight

//   const handleStatusUpdate1 = (e) => {
//     const { name, value } = e.target;
//     setMarkUpValues({
//       ...markUpValues,
//       [name]: value,
//     });
//     const payload = {
//       userId: inputid,
//       markup: {
//         flight: markUpValues.flight,
//       },
//     };
//     dispatch(markUpAction(payload));
//   };
//   const handleStatusUpdate2 = (e) => {
//     const { name, value } = e.target;
//     setMarkUpValues({
//       ...markUpValues,
//       [name]: value,
//     });
//     const payload = {
//       userId: inputid,
//       markup: {
//         hotel: markUpValues.hotel,
//       },
//     };
//     dispatch(markUpAction(payload));
//   };
//   const handleStatusUpdate3 = (e) => {
//     const { name, value } = e.target;
//     setMarkUpValues({
//       ...markUpValues,
//       [name]: value,
//     });
//     const payload = {
//       userId: inputid,
//       markup: {
//         bus: markUpValues.bus,
//       },
//     };
//     dispatch(markUpAction(payload));
//   };
//   // const handleVenderAmount = (e, id) => {
//   //   console.log("vender", id);
//   //   setVenderOpen(!venderOpen)
//   // }
//   const handleStatusUpdate4 = () => {
//     const payload = {
//       userId: inputid,
//       markup: {
//         holiday: markUpValues.holiday,
//       },
//     };
//     dispatch(markUpAction(payload));
//   };

//   const [venderOpen, setVenderOpen] = React.useState(false);
//   const [currency, setCurrency] = React.useState("INR");
//   const [amount, setAmount] = React.useState("");

//   const adminCheck = reducerState?.adminAuth?.adminData?.data?.id;

// const updateVendorAmount = (id) => {
//   // Check if id is undefined
//   if (id === undefined) {
//     console.error("Error: id is undefined.");
//     return;
//   }

//   // Fetch adminCheck
//   const adminCheck = reducerState?.adminAuth?.adminData?.data?.id;
//   // console.log("adminCheck", adminCheck);

//   // Check if adminCheck is undefined
//   if (adminCheck === undefined) {
//     console.error("Error: adminCheck is undefined.");
//     return;
//   }

//   // console.log("wallet id", id);

//   const payload = {
//     data: {
//       isAdmin: adminCheck,
//       balance: amount, // Assuming amount is defined elsewhere
//       currency: "INR",
//     },
//     key: {
//       walletid: id,
//     },
//   };
//   dispatch(vendorAction(payload));
// };

//   // React - modal
//   const [show, setShow] = useState(false);
//   const [user_id, setUser_id] = useState("");

//   const handleClose = () => setShow(false);

//   const handleShow = (ele) => {
//     // console.log("user Id", ele);
//     setUser_id(ele);
//     // console.log(user_id);
//     setShow(true);
//   };

//   //  Img Modal POP Up
//   const [showImg, setImgShow] = useState(false);
//   const [documentImgUrl, setDocumentImgUrl] = useState("");
// const [bonus, setBonus] = useState("");
// const [selectedUserId, setSelectedUserId] = useState(null);
// // Define handleShowBonusModal function to control bonus modal visibility
// const [showBonusModal, setShowBonusModal] = useState(false);

// const handleShowBonusModal = (userId) => {
//   // console.log("User ID in handleShowBonusModal:", userId);
//   // Logic to show bonus modal
//   setSelectedUserId(userId);
//   setShowBonusModal(true);
// };

//   const handleImgShow = (img) => {
//     // console.log("imgUrl", img);
//     setDocumentImgUrl(img);
//     setImgShow(true);
//   };

// const handleSearch = (event) => {
//   setSearchTerm(event.target.value);
// };

// const handleAddBonus = async (userId) => {
//   try {
//     setLoad(true);
//     //console.log("log",userId);

//     const response = await axios.post(
//       `${apiURL.baseURL}/skyTrails/api/admin/distributeReward`,
//       {
//         agentId: userId,
//         rewardPercentage: parseFloat(bonus),
//       }
//     );
//     // console.log("Bonus added successfully:", response.data);

//     setSuccessMessage(response.data.responseMessage);
//     setShowBonusModal(false);
//   } catch (error) {
//     console.error("Error adding bonus:", error);
//   } finally {
//     setLoad(false);
//   }
// };

//   return (
//     <>
//       {successMessage && (
//         <Snackbar
//           open={!!successMessage}
//           autoHideDuration={4000}
//           onClose={() => setSuccessMessage("")}
//           message={successMessage}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           ContentProps={{
//             style: {
//               backgroundColor: "red",
//             },
//           }}
//         />
//       )}
// <div className="user-table-container" style={{ marginTop: "100px" }}>
//   <div className="adminseacrch">
// <TextField
//   type="text"
//   value={searchTerm}
//   onChange={handleSearch}
//   placeholder="Search by name, ID, etc."
//   InputProps={{
//     startAdornment: (
//       <InputAdornment position="start">
//         <SearchIcon />
//       </InputAdornment>
//     ),
//   }}
// />
//     <Typography variant="h5" className="adtable-heading">
//       Agent Table
//     </Typography>
//   </div>

//         <TableContainer component={Paper} style={{ border: "none" }}>
//           <Table
//             style={{ border: "none" }}
//             aria-label="customized table"
//             // sx={{ overflowX: "auto" }}
//             className="tablead"
//           >
//             <TableHead style={{ border: "none" }} className="tableheadadmin">
//               <TableRow style={{ border: "none" }}>
//                 <StyledTableCell> Document Image</StyledTableCell>
//                 <StyledTableCell> CreateAt</StyledTableCell>
//                 <StyledTableCell> Name</StyledTableCell>
//                 <StyledTableCell align="center">Agency Name</StyledTableCell>
//                 <StyledTableCell align="center">Agency Email</StyledTableCell>
//                 <StyledTableCell align="center">
//                   Agency Classification
//                 </StyledTableCell>
//                 <StyledTableCell width={300} align="center">
//                   Agency Address
//                 </StyledTableCell>
//                 <StyledTableCell align="center">Contact Person</StyledTableCell>
//                 <StyledTableCell align="center">
//                   Provisional GSTIN
//                 </StyledTableCell>
//                 <StyledTableCell align="center">Mobile</StyledTableCell>
//                 <StyledTableCell align="center">Revenue</StyledTableCell>
//                 <StyledTableCell align="center">Reward Amount</StyledTableCell>

//                 <StyledTableCell align="center">Is Active</StyledTableCell>
//                 <StyledTableCell align="center">Flight Amount</StyledTableCell>
//                 <StyledTableCell align="center">Hotel Amount</StyledTableCell>
//                 <StyledTableCell align="center">Bus Amount</StyledTableCell>
//                 <StyledTableCell align="center">Holiday Amount</StyledTableCell>
//                 <StyledTableCell align="center">Vendor Amount</StyledTableCell>
//                 <StyledTableCell align="center">Bonus Amount</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody style={{ border: "none" }}>
//               {tableData
//                 ? tableData
//                     .filter((ele) => {
//                       const fullName = ele.personal_details?.first_name || "";
//                       const lowerCaseFullName = fullName.toLowerCase();
//                       return lowerCaseFullName.includes(
//                         searchTerm.toLowerCase()
//                       );
//                     })
//                     .slice((page - 1) * rowsPerPage, page * rowsPerPage)
//                     .map((ele, index) => {
//                       return (
//                         <>
//                           <StyledTableRow key={index}>
//                             {/* <img src={ele.agency_details.document_details.pan_card_document}  alt={index} /> */}
//                             <StyledTableCell align="right">
//                               {ele?.agency_details?.document_details
//                                 ?.pan_card_document ? (
//                                 <img
//                                   style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     objectFit: "cover",
//                                     borderRadius: "10%",
//                                   }}
//                                   src={
//                                     ele.agency_details.document_details
//                                       .pan_card_document
//                                   }
//                                   alt="PAN Card Document"
//                                 />
//                               ) : (
//                                 <img
//                                   src="https://www.sarojhospital.com/images/testimonials/dummy-profile.png"
//                                   alt="Dummy"
//                                   style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     objectFit: "cover",
//                                   }}
//                                 />
//                               )}
//                             </StyledTableCell>

//                             {/* createdAt */}

//                             <StyledTableCell scope="row">
//                               {ele?.createdAt ? ele?.createdAt : "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell scope="row">
//                               {ele.personal_details?.first_name
//                                 ? ele.personal_details.first_name
//                                 : "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.agency_details?.agency_name || "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.agency_gst_details?.email
//                                 ? ele.agency_gst_details.email
//                                 : "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.agency_gst_details?.agency_classification ||
//                                 "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               <StyledTableCell align="right">
//                                 {ele.agency_details?.address || "No Data"}
//                               </StyledTableCell>
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.agency_gst_details?.contact_person ||
//                                 "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.agency_gst_details?.provisional_GSTIN ||
//                                 "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell align="right">
//                               {ele.personal_details?.mobile?.mobile_number ||
//                                 "No Data"}
//                             </StyledTableCell>
//                             <StyledTableCell align="right">
//                               {ele?.revenue || "No Data"}
//                             </StyledTableCell>
//                             <StyledTableCell align="right">
//                               {ele?.rewardAmount || "No Data"}
//                             </StyledTableCell>

//                             <StyledTableCell
//                               align="right"
//                               style={{ color: "black" }}
//                             >
//                               {ele.is_active == 1 && (
//                                 <span
//                                   style={{
//                                     backgroundColor: "green",
//                                     padding: "5px 10px",
//                                     borderRadius: "7px",
//                                     color: "white",
//                                     marginRight: "8px",
//                                   }}
//                                 >
//                                   Active
//                                 </span>
//                               )}
//                               {ele.is_active === 0 && (
//                                 <span
//                                   style={{
//                                     backgroundColor: "red",
//                                     padding: "5px 20px",
//                                     borderRadius: "7px",
//                                     color: "white",
//                                     marginRight: "8px",
//                                   }}
//                                 >
//                                   Inactive
//                                 </span>
//                               )}
//                               <select
//                                 style={{ width: "100px" }}
//                                 value={ele.is_active}
//                                 onChange={(e) =>
//                                   handleToggle(e.target.value, ele._id)
//                                 }
//                               >
//                                 <option>Update</option>
//                                 <option value="active">Active</option>
//                                 <option value="inactive">Inactive</option>
//                               </select>
//                             </StyledTableCell>

//                             <StyledTableCell align="center">
//                               <Box
//                                 sx={{
//                                   width: 150,
//                                   maxWidth: "100%",
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   marginRight: "-10px",
//                                 }}
//                               >
//                                 <TextField
//                                   className="mark__Up__Input"
//                                   placeholder={markUpValues.flight || "0"}
//                                   defaultValue={
//                                     [index]markupData?.flight || "0"
//                                   }
//                                   sx={{
//                                     width: "108px",
//                                     marginRight: "10px",
//                                     fontSize: "18px",
//                                   }}
//                                   variant="standard"
//                                   fullWidth
//                                   name="flight"
//                                   onChange={(event) =>
//                                     handleMarkUp(event, ele._id)
//                                   }
//                                 />
//                                 <button
//                                   color="success"
//                                   className="mark__up__btn"
//                                   onClick={handleStatusUpdate1}
//                                 >
//                                   <DoneIcon />
//                                 </button>
//                               </Box>
//                             </StyledTableCell>

//                             <StyledTableCell align="center">
//                               <Box
//                                 sx={{
//                                   width: 150,
//                                   maxWidth: "100%",
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <TextField
//                                   placeholder={markupData[index]?.hotel || "0"}
//                                   defaultValue={markupData[index]?.hotel || "0"}
//                                   name="hotel"
//                                   sx={{
//                                     width: "128px",
//                                     marginRight: "10px",
//                                     fontSize: "18px",
//                                   }}
//                                   variant="standard"
//                                   fullWidth
//                                   onChange={(event) =>
//                                     handleMarkUp(event, ele._id)
//                                   }
//                                 />
//                                 <button
//                                   color="success"
//                                   className="mark__up__btn"
//                                   onClick={handleStatusUpdate2}
//                                 >
//                                   <DoneIcon />
//                                 </button>
//                               </Box>
//                             </StyledTableCell>

//                             <StyledTableCell align="center">
//                               <Box
//                                 sx={{
//                                   width: 150,
//                                   maxWidth: "100%",
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <TextField
//                                   placeholder={markupData[index]?.bus || "0"}
//                                   name="bus"
//                                   defaultValue={markupData[index]?.bus || "0"}
//                                   sx={{
//                                     width: "128px",
//                                     marginRight: "10px",
//                                     fontSize: "18px",
//                                   }}
//                                   variant="standard"
//                                   fullWidth
//                                   onChange={(event) =>
//                                     handleMarkUp(event, ele._id)
//                                   }
//                                 />
//                                 <button
//                                   color="success"
//                                   className="mark__up__btn"
//                                   onClick={handleStatusUpdate3}
//                                 >
//                                   <DoneIcon />
//                                 </button>
//                               </Box>
//                             </StyledTableCell>

//                             <StyledTableCell align="center">
//                               <Box
//                                 sx={{
//                                   width: 250,
//                                   maxWidth: "100%",
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <TextField
//                                   style={{ color: "black" }}
//                                   placeholder={
//                                     markupData[index]?.holiday || "0"
//                                   }
//                                   name="holiday"
//                                   defaultValue={
//                                     markupData[index]?.holiday || "0"
//                                   }
//                                   sx={{
//                                     width: "85px",
//                                     marginRight: "10px",
//                                     fontSize: "18px",
//                                   }}
//                                   variant="standard"
//                                   fullWidth
//                                   onChange={(event) =>
//                                     handleMarkUp(event, ele._id)
//                                   }
//                                 />
//                                 <button
//                                   color="success"
//                                   className="mark__up__btn"
//                                   onClick={handleStatusUpdate4}
//                                 >
//                                   <DoneIcon />
//                                 </button>
//                               </Box>
//                             </StyledTableCell>
//                             <StyledTableCell>
//                               <Button
//                                 className="add_vendor_btn"
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleShow(ele?._id)}
//                               >
//                                 Add Amount
//                               </Button>
//                               {/* Modal */}
//                               <Modal show={show} onHide={handleClose} centered>
//                                 <Modal.Header closeButton>
//                                   <Modal.Title>Vendor Amount</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                   <Box
//                                     sx={{
//                                       width: 400,
//                                       maxWidth: "100%",
//                                       textAlign: "left",
//                                       padding: "20px",
//                                     }}
//                                   >
//                                     <TextField
//                                       size="large"
//                                       id="standard-basic"
//                                       placeholder="Vendor Amount"
//                                       onChange={(e) =>
//                                         setAmount(e.target.value)
//                                       }
//                                       fullWidth
//                                       sx={{ marginBottom: 2 }}
//                                     />

//                                     <Button
//                                       className="add_vendor_btn"
//                                       variant="contained"
//                                       color="success"
//                                       onClick={() =>
//                                         updateVendorAmount(ele?.walletid)
//                                       }
//                                       fullWidth
//                                     >
//                                       Add Amount
//                                     </Button>
//                                   </Box>
//                                 </Modal.Body>
//                               </Modal>
//                             </StyledTableCell>
//                             <StyledTableCell>
//                               <Button
//                                 className="add_bonus_btn"
//                                 variant="contained"
//                                 onClick={() => handleShowBonusModal(ele?._id)}
//                                 fullWidth
//                               >
//                                 Add Bonus
//                               </Button>
//                               {/* Modal for adding bonus */}
//                               <Modal
//                                 show={showBonusModal}
//                                 onHide={() => setShowBonusModal(false)}
//                                 centered
//                               >
//                                 <Modal.Header closeButton>
//                                   <Modal.Title>Bonus Amount</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                   {load && (
//                                     <div
//                                       className="loader-overlay"
//                                       style={{
//                                         position: "fixed",
//                                         top: 0,
//                                         left: 0,
//                                         width: "100%",
//                                         height: "100%",
//                                         background: "rgba(255, 255, 255, 0.5))",
//                                         zIndex: 9999,
//                                       }}
//                                     >
//                                       <CircularProgress
//                                         color="primary"
//                                         size={50}
//                                         thickness={3}
//                                         style={{
//                                           position: "absolute",
//                                           top: "50%",
//                                           left: "49.8%",
//                                           transform: "translate(-50%, -50%)",
//                                         }}
//                                       />
//                                     </div>
//                                   )}

//                                   <TextField
//                                     size="large"
//                                     id="bonus-amount"
//                                     label="Bonus Amount"
//                                     placeholder="Enter bonus amount"
//                                     value={bonus}
//                                     onChange={(e) => setBonus(e.target.value)}
//                                     fullWidth
//                                     sx={{ marginBottom: 2 }}
//                                   />

//                                   <Button
//                                     variant="contained"
//                                     color="success"
//                                     onClick={() =>
//                                       handleAddBonus(selectedUserId)
//                                     }
//                                     fullWidth
//                                   >
//                                     Add Bonus
//                                   </Button>
//                                 </Modal.Body>
//                               </Modal>
//                             </StyledTableCell>
//                           </StyledTableRow>
//                         </>
//                       );
//                     })
//                 : ""}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//           <Pagination
//             count={Math.ceil((tableData?.length || 1) / rowsPerPage)}
//             page={page}
//             onChange={handleChangePage}
//             color="primary"
//           />
//         </Box>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
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
import Slider from "@mui/material/Slider";
import { apiURL } from "../../../../Constants/constant";
import SortAscendingIcon from "@mui/icons-material/ArrowUpward";
import SortDescendingIcon from "@mui/icons-material/ArrowDownward";
import "./Table.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { vendorAction } from "../../../../Redux/Auth/VendorAmount/vendorAmountData";
const CustomToolbar = ({ handleSortAscending, handleSortDescending,searchTerm, handleSearch }) => {
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
  // Define handleShowBonusModal function to control bonus modal visibility
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
  const [load, setLoad] = useState(false);
  const updateVendorAmount = (id) => {
    // Check if id is undefined
    if (id === undefined) {
      console.error("Error: id is undefined.");
      return;
    }

    // Fetch adminCheck
    const adminCheck = reducerState?.adminAuth?.adminData?.data?.id;
    // console.log("adminCheck", adminCheck);

    // Check if adminCheck is undefined
    if (adminCheck === undefined) {
      console.error("Error: adminCheck is undefined.");
      return;
    }

    // console.log("wallet id", id);

    const payload = {
      data: {
        isAdmin: adminCheck,
        balance: amount, // Assuming amount is defined elsewhere
        currency: "INR",
      },
      key: {
        walletid: id,
      },
    };
    dispatch(vendorAction(payload));
  };

  const handleShowBonusModal = (userId) => {
    // console.log("User ID in handleShowBonusModal:", userId);
    // Logic to show bonus modal
    setSelectedUserId(userId);
    setShowBonusModal(true);
  };

  const handleAddBonus = async (userId) => {
    try {
      setLoad(true);
      //console.log("log",userId);

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/distributeReward`,
        {
          agentId: userId,
          rewardPercentage: parseFloat(bonus),
        }
      );
      // console.log("Bonus added successfully:", response.data);

      setSuccessMessage(response.data.responseMessage);
      setShowBonusModal(false);
    } catch (error) {
      console.error("Error adding bonus:", error);
    } finally {
      setLoad(false);
    }
  };

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

  const markupData = reducerState?.userTableData?.userData?.data?.result?.map(
    (ele) => ele.markup
  );
  console.log(markupData, "++++++++++++");
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRevenueChange = (event, newValue) => {
    setMinRevenue(newValue[0]);
  };
  const handleBalanceRangeChange = (event, newValue) => {
    setBalanceRange(newValue);
  };
  //const filteredRows = rows.filter((row) => row.totalRevenue >= minRevenue);
  // const filteredRows = rows.filter(
  //   (row) =>
  //     row.totalRevenue >= minRevenue &&
  //     row.balance >= balanceRange[0] &&
  //     row.balance <= balanceRange[1]
  // );
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
                  placeholder="Vendor Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateVendorAmount(params.row.walletid)}
                  fullWidth
                >
                  Add Amount
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
    </>
  );
}
