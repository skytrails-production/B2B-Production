import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPackageAction } from "../../../../../Redux/SearchPackage/actionSearchPackage";
import { apiURL } from "../../../../../Constants/constant";
import {
  Box,
} from "@mui/material";
import "./packageUpdate.css";

import axios from "axios";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditHolidayPackage from "./EditPackage";
import ViewPackage from "./ViewPackage";


function PackageDetails() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };





  const [open, setOpen] = React.useState(false);
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedPackageApprove, setSelectedPackageApprove] = useState("");
  const [selectedPackageDelete, setSelectedPackageDelete] = useState("");



  // view modal

  const [openView, setOpenView] = useState(false);

  const handleOpenView = (item) => {
    sessionStorage.setItem("selectedPackage", JSON.stringify(item));
    setOpenView(true);
  }


  const handleCloseView = () => {
    setOpenView(false);
  }


  // view modal 


  // approve modal

  const handleOpenApprove = (item) => {
    setSelectedPackageApprove(item);
    setOpenApprove(true);
    // console.log(selectedPackageApprove, "selected pacakge for approve")
  }

  const handleCloseApprove = () => setOpenApprove(false);

  const handleApprove = async () => {
    // console.log("approved")
    const packageId = selectedPackageApprove?._id;
    try {
      const res = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/international/setactive`,
        data: {
          "pakageId": packageId,
          "isAdmin": isAdmin,
          "activeStatus": 1
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.status === 200) {
        handleCloseApprove();
      }
    } catch (error) {
      console.log("error while deleting this package")
    }
  }

  // approve modal 


  const handleOpenEdit = (item) => {
    setOpenEdit(true);
    sessionStorage.setItem("selectedPackage", JSON.stringify(item));
    // console.log(item, "selected package")
  }
  const handleCloseEdit = () => setOpenEdit(false);


  const handleOpen = (item) => {
    setOpen(true);
    setSelectedPackageDelete(item);
    // console.log(selectedPackageDelete, "selected package")
  }
  const handleClose = () => setOpen(false);


  const reducerState = useSelector((state) => state);
  const holidayPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
  const isAdmin = reducerState?.adminAuth?.adminData?.data?.id;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      destination: "",
      days: 0,
    };
    dispatch(searchPackageAction(payload));
  }, []);

  useEffect(() => {

  }, [holidayPackage])


  // const handleEdit = (item) => {
  //   sessionStorage.setItem("selectedPackage", JSON.stringify(item));
  //   navigate("/admin/dashboard/EditHolidayPackage");
  // };


  const handleDelete = async () => {
    const packageId = selectedPackageDelete?._id;

    try {
      const res = await axios({
        method: "delete",
        url: `${apiURL.baseURL}/skyTrails/international/deleteone/${packageId}`,
        data: {
          "isAdmin": isAdmin
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.log("error while deleting this package")
    }
  };


  return (
    <>
      <Box height={100} />
      <h2>Package Details</h2>
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          margin: "auto",
          textAlign: "center",
          width: "500px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "grey" }}>
            {/* <th>IMG</th> */}
            <th>Package Title</th>
            <th>Days</th>
            <th>Package Amount</th>
            {/* <th>Hotel Detail</th> */}
            {/* <th>Inclusion Note</th> */}
            {/* <th>Exclusion Note</th> */}
            {/* <th>Overview</th> */}
            {/* <th>Detailed Itinerary</th> */}
            {/* <th>Select Tags</th> */}
            {/* <th>Term And Condition</th> */}
            {/* <th>Cancellation Policy</th> */}
            <th>Edit</th>
            <th>Delete</th>
            <th>Approve</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {holidayPackage?.map((ele, index) => {
            return (
              <>
                <tr>
                  {/* <td>
                    <img
                      style={{
                        width: "120px",
                        height: "90px",
                        border: "1px solid black",
                      }}
                      src={ele.pakage_img}
                    />{" "}
                  </td> */}
                  <td style={{ color: "white" }}>{ele?.pakage_title}</td>
                  <td style={{ color: "white" }}>{ele?.days}</td>
                  <td style={{ color: "white" }}>{ele?.pakage_amount?.amount}</td>
                  {/* <td style={{ color: "white" }}>{ele?.hotel_details}</td> */}
                  {/* <td style={{ color: "white" }}>{ele?.insclusion_note}</td> */}
                  {/* <td style={{ color: "white" }}>{ele?.exclusion_note}</td> */}
                  {/* <td style={{ color: "white" }}>
                    <div style={{ width: "350px", color: "white" }}>{ele?.overview}</div>{" "}
                  </td> */}
                  {/* <td style={{ color: "white" }}>{ele?.detailed_ltinerary[0]?.slice(7, 55) + "..."}</td> */}
                  {/* <td style={{ color: "white" }}>
                    <div>
                      {ele?.select_tags?.map((tag, index) => {
                        return (
                          <>
                            {tag?.domestic && <span>Domestic</span>}
                            {tag?.anniversary && <span>Anniversary</span>}
                          </>
                        );
                      })}
                    </div>
                  </td> */}
                  {/* <td style={{ color: "white" }}>{ele?.term_Conditions}</td> */}
                  {/* <td style={{ color: "white" }} >{ele?.cancellation_Policy}</td> */}
                  <td style={{ color: "white" }}>
                    {/* <button onClick={(e) => handleEdit(ele)}>Edit</button> */}
                    <button onClick={(e) => handleOpenEdit(ele)}>Edit</button>
                  </td>
                  <td style={{ color: "white" }}>
                    <button onClick={(e) => handleOpen(ele)}>Delete</button>
                  </td>
                  <td style={{ color: "white" }}>
                    <button onClick={(e) => handleOpenApprove(ele)}>Approve</button>
                  </td>
                  <td style={{ color: "white" }}>
                    <button onClick={(e) => handleOpenView(ele)} >View</button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure You want to delete this package
          </Typography>
          <button onClick={handleClose}>No</button>
          <button onClick={handleDelete}>Yes</button>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '80%',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}
        >
          <Box>
            <EditHolidayPackage />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: 'center'
            }}
          >
            <button onClick={handleCloseEdit}>Close</button>
          </Box>
        </Box>


      </Modal>



      {/* approve modal  */}


      <Modal
        open={openApprove}
        onClose={handleCloseApprove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure You want to Approve this package
          </Typography>
          <button onClick={handleCloseApprove}>No</button>
          <button onClick={handleApprove}>Yes</button>
        </Box>
      </Modal>

      {/* approve modal  */}


      {/* view modal  */}

      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '80%',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}>




          <Box>
            <ViewPackage />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: 'center'
            }}
          >
            <button onClick={handleCloseView}>Close</button>
          </Box>
        </Box>
      </Modal>


      {/* view modal  */}
    </>
  );
}

export default PackageDetails;
// // export default PackageDetails
