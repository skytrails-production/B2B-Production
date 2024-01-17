// //Orignal code

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   TableHead,
// //   TextField,
// //   Button,
// // } from "@mui/material";
// // import { apiURL } from "../../../../Constants/constant";

// // const MarkUpAmount = () => {
// //   const [markupData, setMarkupData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [editMode, setEditMode] = useState(false);
// //   const [editedMarkup, setEditedMarkup] = useState({});

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const response = await axios.get(
// //           `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
// //         );
// //         setMarkupData(response.data.result);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     }

// //     fetchData();
// //   }, []);

// //   const handleEditClick = (data) => {
// //     setEditMode(true);
// //     setEditedMarkup(data);
// //   };

// //   const handleSaveClick = async () => {
// //     try {
// //       const response = await axios.put(
// //         `${apiURL.baseURL}/skyTrails/api/admin/updateMarkup/${editedMarkup._id}`,
// //         editedMarkup
// //       );

// //       // Handle success, update local state or trigger a refetch
// //       console.log("Update successful:", response.data);

// //       // Reset edit mode and clear edited data
// //       setEditMode(false);
// //       setEditedMarkup({});
// //     } catch (error) {
// //       console.error("Error updating markup:", error);
// //     }
// //   };

// //   const rowHeadings = [
// //     "Hotel Markup",
// //     "Flight Markup",
// //     "Bus Markup",
// //     "Holiday Package Markup",
// //   ];

// //   const tableHeadings = [
// //     "Package",
// //     "MarkupAmount",
// //     "Status",
// //     "Created At",
// //     "Updated At",
// //     "Edit",
// //   ];

// //   return (
// //     <div className="markup-table-container">
// //       <h2>Markup Data Table</h2>
// //       <div className="markup-table">
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               {tableHeadings.map((heading, index) => (
// //                 <TableCell key={index}>{heading}</TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {rowHeadings.map((rowHeading, rowIndex) => (
// //               <TableRow key={rowIndex}>
// //                 <TableCell style={{color:"white"}}>{rowHeading}</TableCell>

// //                 <TableCell style={{color:"white"}}>
// //                 {editMode ? (
// //                   // Use a TextField for editing
// //                   <TextField
// //                     value={editedMarkup.markupAmount || ""}
// //                     onChange={(e) =>
// //                       setEditedMarkup({
// //                         ...editedMarkup,
// //                         markupAmount: e.target.value,
// //                       })
// //                     }
// //                   />
// //                 ) : (
// //                   // Display markupAmount from the API response
// //                   markupData.length > 0
// //                     ? `${markupData[0].hotelMarkup || "No Data"} (Hotel), ${markupData[0].flightMarkup || "No Data"} (Flight), ${markupData[0].busMarkup || "No Data"} (Bus), ${markupData[0].holidayPackageMarkup || "No Data"} (Holiday Package)`
// //                     : "No Data"
// //                 )}
// //               </TableCell>
// //               <TableCell style={{color:"white"}}>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.status || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           status: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].status || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell style={{color:"white"}}>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.createdAt || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           createdAt: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].createdAt || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell style={{color:"white"}}>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.updatedAt || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           updatedAt: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].updatedAt || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell style={{color:"white"}}>
// //                   {editMode ? (
// //                     <Button onClick={handleSaveClick}>Save</Button>
// //                   ) : (
// //                     <Button onClick={() => handleEditClick(markupData[0])}>
// //                       Edit
// //                     </Button>
// //                   )}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MarkUpAmount;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   TableHead,
// //   TextField,
// //   Button,
// // } from "@mui/material";
// // import { apiURL } from "../../../../Constants/constant";

// // const MarkUpAmount = () => {
// //   const [markupData, setMarkupData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [editMode, setEditMode] = useState(false);
// //   const [editedMarkup, setEditedMarkup] = useState({});

// //   // useEffect(() => {
// //   //   async function fetchData() {
// //   //     try {
// //   //       const response = await axios.get(
// //   //         `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
// //   //       );
// //   //       setMarkupData(response.data.result);
// //   //       setLoading(false);
// //   //     } catch (error) {
// //   //       console.error("Error fetching data:", error);
// //   //       setLoading(false);
// //   //     }
// //   //   }

// //   //   fetchData();
// //   // }, []);

// //   // const handleEditClick = (data) => {
// //   //   setEditMode(true);
// //   //   setEditedMarkup(data);
// //   // };

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const response = await axios.get(
// //           `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
// //         );
// //         setMarkupData(response.data.result);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     }

// //     fetchData();
// //   }, []);

// //   const handleSaveClick = async () => {
// //     try {
// //       const response = await axios.put(
// //         `${apiURL.baseURL}/skyTrails/api/admin/updateMarkup/${editedMarkup._id}`,
// //         editedMarkup
// //       );

// //       // Handle success, update local state or trigger a refetch
// //       console.log("Update successful:", response.data);

// //       // Reset edit mode and clear edited data
// //       setEditMode(false);
// //       setEditedMarkup({});
// //     } catch (error) {
// //       console.error("Error updating markup:", error);
// //     }
// //   };
// //   const handleEditClick = (data) => {
// //     setEditMode(true);
// //     setEditedMarkup(data);
// //   };

// //   const rowHeadings = [
// //     "Hotel Markup",
// //     "Flight Markup",
// //     "Bus Markup",
// //     "Holiday Package Markup",
// //   ];

// //   const tableHeadings = [
// //     "Package",
// //     "MarkupAmount",
// //     "Status",
// //     "Created At",
// //     "Updated At",
// //     "Edit",
// //   ];

// //   return (
// //     <div className="markup-table-container">
// //       <h2>Markup Data Table</h2>
// //       <div className="markup-table">
// //         <Table>
// //           <TableHead>
// //           <TableRow>
// //           {tableHeadings.map((heading, index) => (
// //             <TableCell key={index}>{heading}</TableCell>
// //           ))}
// //         </TableRow>
// //       </TableHead>
// //       <TableBody>
// //         {rowHeadings.map((rowHeading, rowIndex) => (
// //           <TableRow key={rowIndex}>
// //             <TableCell>{rowHeading}</TableCell>
// //             <TableCell>
// //               {editMode ? (
// //                 <TextField
// //                   value={
// //                     editedMarkup[`${rowHeading.toLowerCase()}Markup`] || ""
// //                   }
// //                   onChange={(e) =>
// //                     setEditedMarkup({
// //                       ...editedMarkup,
// //                       [`${rowHeading}Markup`]: e.target.value,
// //                     })
// //                   }
// //                 />
// //               ) : (
// //                 markupData.length > 0
// //                   ? markupData[0][`${rowHeading}Markup`] || "No Data"
// //                   : "No Data"
// //               )}
// //             </TableCell>
// //                 <TableCell>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.status || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           status: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].status || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.createdAt || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           createdAt: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].createdAt || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell>
// //                   {editMode ? (
// //                     <TextField
// //                       value={editedMarkup.updatedAt || ""}
// //                       onChange={(e) =>
// //                         setEditedMarkup({
// //                           ...editedMarkup,
// //                           updatedAt: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   ) : markupData.length > 0
// //                     ? markupData[0].updatedAt || "No Data"
// //                     : "No Data"}
// //                 </TableCell>
// //                 <TableCell>
// //                   {editMode ? (
// //                     <Button onClick={handleSaveClick}>Save</Button>
// //                   ) : (
// //                     <Button onClick={() => handleEditClick(markupData[0])}>
// //                       Edit
// //                     </Button>
// //                   )}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MarkUpAmount;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableHead,
//   TextField,
//   Button,
// } from "@mui/material";
// import { apiURL } from "../../../../Constants/constant";

// const MarkUpAmount = () => {
//   const [markupData, setMarkupData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [editedMarkup, setEditedMarkup] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(
//           `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
//         );
//         setMarkupData(response.data.result);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleEditClick = (data) => {
//     setEditMode(true);
//     setEditedMarkup(data);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const response = await axios.put(
//         `${apiURL.baseURL}/skyTrails/api/admin/updateMarkup/${editedMarkup._id}`,
//         editedMarkup
//       );

//       // Handle success, update local state or trigger a refetch
//       console.log("Update successful:", response.data);

//       // Reset edit mode and clear edited data
//       setEditMode(false);
//       setEditedMarkup({});
//     } catch (error) {
//       console.error("Error updating markup:", error);
//     }
//   };

//   const rowHeadings = [
//     "Hotel Markup",
//     "Flight Markup",
//     "Bus Markup",
//     "Holiday Package Markup",
//   ];

//   const tableHeadings = [
//     "Package",
//     "MarkupAmount",
//     "Status",
//     "Created At",
//     "Updated At",
//     "Edit",
//   ];

//   return (
//     <div className="markup-table-container">
//       <h2>Markup Data Table</h2>
//       <div className="markup-table">
//         <Table>
//           <TableHead>
//             <TableRow>
//               {tableHeadings.map((heading, index) => (
//                 <TableCell key={index}>{heading}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow key={0}>
//               <TableCell>{"Hotel Markup"}</TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.hotelMarkup || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         hotelMarkup: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].hotelMarkup || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.status || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         status: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].status || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.createdAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         createdAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].createdAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.updatedAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         updatedAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].updatedAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <Button onClick={handleSaveClick}>Save</Button>
//                 ) : (
//                   <Button onClick={() => handleEditClick(markupData[0])}>
//                     Edit
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>

//             <TableRow key={1}>
//               <TableCell>{"Flight Markup"}</TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.flightMarkup || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         flightMarkup: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].flightMarkup || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.status || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         status: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].status || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.createdAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         createdAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].createdAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.updatedAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         updatedAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].updatedAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <Button onClick={handleSaveClick}>Save</Button>
//                 ) : (
//                   <Button onClick={() => handleEditClick(markupData[0])}>
//                     Edit
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>

//             <TableRow key={0}>
//               <TableCell>{"Bus Markup"}</TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.busMarkup || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         busMarkup: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].busMarkup || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.status || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         status: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].status || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.createdAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         createdAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].createdAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.updatedAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         updatedAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].updatedAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <Button onClick={handleSaveClick}>Save</Button>
//                 ) : (
//                   <Button onClick={() => handleEditClick(markupData[0])}>
//                     Edit
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>

//             <TableRow key={0}>
//               <TableCell>{"holiday Package Markup"}</TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.holidayPackageMarkup || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         holidayPackageMarkup: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].holidayPackageMarkup || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.status || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         status: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].status || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.createdAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         createdAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].createdAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <TextField
//                     value={editedMarkup.updatedAt || ""}
//                     onChange={(e) =>
//                       setEditedMarkup({
//                         ...editedMarkup,
//                         updatedAt: e.target.value,
//                       })
//                     }
//                   />
//                 ) : markupData.length > 0 ? (
//                   markupData[0].updatedAt || "No Data"
//                 ) : (
//                   "No Data"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editMode ? (
//                   <Button onClick={handleSaveClick}>Save</Button>
//                 ) : (
//                   <Button onClick={() => handleEditClick(markupData[0])}>
//                     Edit
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default MarkUpAmount;

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { apiURL } from "../../../../Constants/constant";
import {
  Paper,
  InputAdornment,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
const MarkUpAmount = () => {
  const [markupData, setMarkupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedMarkup, setEditedMarkup] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
        );
        setMarkupData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEditClick = (data) => {
    setEditMode(true);
    setEditedMarkup(data);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page when performing a new search
  };
  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/updateMarkup/${editedMarkup._id}`,
        editedMarkup
      );

      // Handle success, update local state or trigger a refetch
      console.log("Update successful:", response.data);

      // Reset edit mode and clear edited data
      setEditMode(false);
      setEditedMarkup({});
    } catch (error) {
      console.error("Error updating markup:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "package", headerName: "Package", flex: 1 },
    { field: "markupAmount", headerName: "Markup Amount", flex: 1, editable: true },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    { field: "createdAt", headerName: "Created At", flex: 1, editable: true },
    { field: "updatedAt", headerName: "Updated At", flex: 1, editable: true },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <Button onClick={() => handleEditClick(params.row)}>Edit</Button>
      ),
    },
  ];


  const rows = rowHeadings.map((rowHeading, index) => ({
    id: index,
    package: rowHeading,
    markupAmount: editMode ? editedMarkup[`${rowHeading.toLowerCase()}Markup`] || "" : markupData.length > 0 ? markupData[0][`${rowHeading.toLowerCase()}Markup`] || "No Data" : "No Data",
    status: editMode ? editedMarkup.status || "" : markupData.length > 0 ? markupData[0].status || "No Data" : "No Data",
    createdAt: editMode ? editedMarkup.createdAt || "" : markupData.length > 0 ? markupData[0].createdAt || "No Data" : "No Data",
    updatedAt: editMode ? editedMarkup.updatedAt || "" : markupData.length > 0 ? markupData[0].updatedAt || "No Data" : "No Data",
  }));

  return (

    <Paper
      className="subada-table-container"
      elevation={3}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: 10,
          zIndex: 1,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
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
        />
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: "20px" }}>
          Markup Data Table
        </Typography>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          onEditCellChange={(params, event) => {
            setEditedMarkup({
              ...editedMarkup,
              [params.field]: event.props.value,
            });
          }}
        />

        {editMode && (
          <Button onClick={handleSaveClick}>Save</Button>
        )}
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
          color="primary"
        />
      </Stack>
    </Paper>
  );
};

const rowHeadings = [
  "Hotel Markup",
  "Flight Markup",
  "Bus Markup",
  "Holiday Package Markup",
];

export default MarkUpAmount;

