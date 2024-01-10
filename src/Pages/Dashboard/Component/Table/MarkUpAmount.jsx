//Orignal code

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
  Button,
} from "@mui/material";
import { apiURL } from "../../../../Constants/constant";

const MarkUpAmount = () => {
  const [markupData, setMarkupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedMarkup, setEditedMarkup] = useState({});

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

  const rowHeadings = [
    "Hotel Markup",
    "Flight Markup",
    "Bus Markup",
    "Holiday Package Markup",
  ];

  const tableHeadings = [
    "Package",
    "MarkupAmount",
    "Status",
    "Created At",
    "Updated At",
    "Edit",
  ];

  return (
    <div className="markup-table-container">
      <h2>Markup Data Table</h2>
      <div className="markup-table">
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadings.map((heading, index) => (
                <TableCell key={index}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowHeadings.map((rowHeading, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell style={{color:"white"}}>{rowHeading}</TableCell>
                
                <TableCell style={{color:"white"}}>
                {editMode ? (
                  // Use a TextField for editing
                  <TextField
                    value={editedMarkup.markupAmount || ""}
                    onChange={(e) =>
                      setEditedMarkup({
                        ...editedMarkup,
                        markupAmount: e.target.value,
                      })
                    }
                  />
                ) : (
                  // Display markupAmount from the API response
                  markupData.length > 0
                    ? `${markupData[0].hotelMarkup || "No Data"} (Hotel), ${markupData[0].flightMarkup || "No Data"} (Flight), ${markupData[0].busMarkup || "No Data"} (Bus), ${markupData[0].holidayPackageMarkup || "No Data"} (Holiday Package)`
                    : "No Data"
                )}
              </TableCell>
              <TableCell style={{color:"white"}}>
                  {editMode ? (
                    <TextField
                      value={editedMarkup.status || ""}
                      onChange={(e) =>
                        setEditedMarkup({
                          ...editedMarkup,
                          status: e.target.value,
                        })
                      }
                    />
                  ) : markupData.length > 0
                    ? markupData[0].status || "No Data"
                    : "No Data"}
                </TableCell>
                <TableCell style={{color:"white"}}>
                  {editMode ? (
                    <TextField
                      value={editedMarkup.createdAt || ""}
                      onChange={(e) =>
                        setEditedMarkup({
                          ...editedMarkup,
                          createdAt: e.target.value,
                        })
                      }
                    />
                  ) : markupData.length > 0
                    ? markupData[0].createdAt || "No Data"
                    : "No Data"}
                </TableCell>
                <TableCell style={{color:"white"}}>
                  {editMode ? (
                    <TextField
                      value={editedMarkup.updatedAt || ""}
                      onChange={(e) =>
                        setEditedMarkup({
                          ...editedMarkup,
                          updatedAt: e.target.value,
                        })
                      }
                    />
                  ) : markupData.length > 0
                    ? markupData[0].updatedAt || "No Data"
                    : "No Data"}
                </TableCell>
                <TableCell style={{color:"white"}}>
                  {editMode ? (
                    <Button onClick={handleSaveClick}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(markupData[0])}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarkUpAmount;


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

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await axios.get(
//   //         `${apiURL.baseURL}/skyTrails/api/admin/getMarkup`
//   //       );
//   //       setMarkupData(response.data.result);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       setLoading(false);
//   //     }
//   //   }

//   //   fetchData();
//   // }, []);

//   // const handleEditClick = (data) => {
//   //   setEditMode(true);
//   //   setEditedMarkup(data);
//   // };

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
//   const handleEditClick = (data) => {
//     setEditMode(true);
//     setEditedMarkup(data);
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
//           <TableRow>
//           {tableHeadings.map((heading, index) => (
//             <TableCell key={index}>{heading}</TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {rowHeadings.map((rowHeading, rowIndex) => (
//           <TableRow key={rowIndex}>
//             <TableCell>{rowHeading}</TableCell>
//             <TableCell>
//               {editMode ? (
//                 <TextField
//                   value={
//                     editedMarkup[`${rowHeading.toLowerCase()}Markup`] || ""
//                   }
//                   onChange={(e) =>
//                     setEditedMarkup({
//                       ...editedMarkup,
//                       [`${rowHeading}Markup`]: e.target.value,
//                     })
//                   }
//                 />
//               ) : (
//                 markupData.length > 0
//                   ? markupData[0][`${rowHeading}Markup`] || "No Data"
//                   : "No Data"
//               )}
//             </TableCell>
//                 <TableCell>
//                   {editMode ? (
//                     <TextField
//                       value={editedMarkup.status || ""}
//                       onChange={(e) =>
//                         setEditedMarkup({
//                           ...editedMarkup,
//                           status: e.target.value,
//                         })
//                       }
//                     />
//                   ) : markupData.length > 0
//                     ? markupData[0].status || "No Data"
//                     : "No Data"}
//                 </TableCell>
//                 <TableCell>
//                   {editMode ? (
//                     <TextField
//                       value={editedMarkup.createdAt || ""}
//                       onChange={(e) =>
//                         setEditedMarkup({
//                           ...editedMarkup,
//                           createdAt: e.target.value,
//                         })
//                       }
//                     />
//                   ) : markupData.length > 0
//                     ? markupData[0].createdAt || "No Data"
//                     : "No Data"}
//                 </TableCell>
//                 <TableCell>
//                   {editMode ? (
//                     <TextField
//                       value={editedMarkup.updatedAt || ""}
//                       onChange={(e) =>
//                         setEditedMarkup({
//                           ...editedMarkup,
//                           updatedAt: e.target.value,
//                         })
//                       }
//                     />
//                   ) : markupData.length > 0
//                     ? markupData[0].updatedAt || "No Data"
//                     : "No Data"}
//                 </TableCell>
//                 <TableCell>
//                   {editMode ? (
//                     <Button onClick={handleSaveClick}>Save</Button>
//                   ) : (
//                     <Button onClick={() => handleEditClick(markupData[0])}>
//                       Edit
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default MarkUpAmount;
