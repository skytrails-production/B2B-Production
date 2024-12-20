import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { searchPackageAction } from "../../../../../Redux/SearchPackage/actionSearchPackage";
import { searchPackageAction } from "../../../../Redux/SearchPackage/actionSearchPackage";
import { apiURL } from "../../../../Constants/constant";
import { Box, Button, MenuItem, Select } from "@mui/material";
import "./packageUpdate.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditHolidayPackage from "./EditPackage";
import ViewPackage from "./ViewPackage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Alert } from "@mui/material";
import LinearProgress from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ViewPackageDetails from "./ViewPackageDetails";
function PackageDetails() {
  const reducerState = useSelector((state) => state);
  const access =
    reducerState?.subadminLogin?.subadminloginData?.result?.data?.authType;

  // const holidayPackage = reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;

  // useEffect(() => {
  //     const payload = {
  //         destination: "",
  //         days: 0,
  //     };
  //     dispatch(searchPackageAction(payload));
  // }, []);

  const [holidayPackage, setHolidayPackage] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHolidayPackages = async () => {
    try {
      const response = await axios.get(
        ` ${apiURL.baseURL}/skyTrails/international/getAllAdminPackage`
      );
      const data = response.data.data.pakage;
      const reversedData = data.reverse();
      setHolidayPackage(reversedData);
    } catch (error) {
      console.error("Error fetching holiday packages:", error);
    }
  };

  // useEffect(() => {
  //   fetchHolidayPackages();
  // }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const styles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      width: 400,
    },
    buttonContainer: {
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      margin: "0 10px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      color: "#333",
      fontSize: "14px",
      fontWeight: "bold",
    },
  };

  const [open, setOpen] = React.useState(false);
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editPackageData, setEditPackageData] = useState(null);
  const [selectedPackageApprove, setSelectedPackageApprove] = useState("");
  const [selectedPackageDelete, setSelectedPackageDelete] = useState("");
  const [loadingApproval, setLoadingApproval] = useState({}); // Map for tracking loading states

  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [packageDetails, setPackageDetails] = useState(null); // Store package details
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility

  // const fetchHolidayPackages = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiURL.baseURL}/skyTrails/international/getAllAdminPackage`
  //     );
  //     // console.log(response.data, "----------------------");
  //     setHolidayPackage(response.data.data.pakage);
  //   } catch (error) {
  //     console.error("Error fetching holiday packages:", error);
  //   }
  // };
  // view modal
  const [openView, setOpenView] = useState(false);

  const handleOpenView = (item) => {
    sessionStorage.setItem("selectedPackage", JSON.stringify(item));
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  // view modal

  // approve modal
  const handleOpenApprove = (item) => {
    setSelectedPackageApprove(item);
    setOpenApprove(true);
  };

  const handleCloseApprove = () => setOpenApprove(false);

  const handleApprove = async (event, row) => {
    const packageId = row._id;
    const activeStatus = event.target.value;
    try {
      const res = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/international/setactive`,
        data: {
          pakageId: packageId,
          isAdmin: isAdmin,
          activeStatus: activeStatus,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        handleCloseApprove();
        fetchHolidayPackages();
        toast.success("Package approved successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log("error while approving this package");
    }
  };

  const handleOpenEdit = (item) => {
    setOpenEdit(true);
    sessionStorage.setItem("selectedPackage", JSON.stringify(item));
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedPackageDelete(item);
  };

  const handleClose = () => setOpen(false);

  const isAdmin = reducerState?.adminAuth?.adminData?.data?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const packageId = selectedPackageDelete?._id;
    setLoading(true);

    try {
      const res = await axios({
        method: "delete",
        url: `${apiURL.baseURL}/skyTrails/international/deleteone/${packageId}`,
        data: {
          isAdmin: isAdmin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        fetchHolidayPackages();
        setLoading(false);
        handleClose();
        // Show success notification
        toast.success("Package deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // console.log("Error while deleting this package");
      // Show error notification
      toast.error("Error deleting the package. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetchHolidayPackages();
  }, []);

  const handleOpenViewDetails = async (row) => {
    const packageId = row._id;

    // Set loading state for the specific package
    setLoadingApproval((prevState) => ({ ...prevState, [packageId]: true }));

    try {
      // Fetch the package details using the provided GET API
      const res = await axios.get(
        `${apiURL.baseURL}/skyTrails/international/getone/${packageId}`
      );

      if (res.status === 200 && res.data) {
        const packageDetails = res.data;

        // Save the fetched package details in localStorage
        localStorage.setItem("packageDetails", JSON.stringify(packageDetails));

        // Retrieve and console the stored package details
        const storedPackageDetails = JSON.parse(
          localStorage.getItem("packageDetails")
        );
        console.log("Stored package details:", storedPackageDetails);

        setOpenViewDetails(true);

        // Handle the fetched package details (e.g., show in modal or console)
        setPackageDetails(packageDetails);

        // Open a modal to show the details
        setIsModalVisible(true);
      } else {
        toast.error("Failed to fetch package details.");
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      toast.error("Error fetching package details. Please try again.");
    } finally {
      // Reset loading state for the specific package
      setLoadingApproval((prevState) => ({ ...prevState, [packageId]: false }));
    }
  };

  const handleCloseViewDetails = () => {
    setOpenViewDetails(false);
  };
  const columns = [
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      headerClassName: "custom-header",
      valueGetter: (params) => {
        const createdAt = params.row.createdAt;
        return createdAt
          ? new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "N/A";
      },
    },
    {
      field: "pakage_title",
      headerName: "Package Title",
      width: 350,
      headerClassName: "custom-header",
      valueGetter: (params) => params.row.pakage_title || "N/A",
    },
    {
      field: "days",
      headerName: "Days",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "pakage_amount.amount",
      headerName: "Package Amount",
      headerClassName: "custom-header",
      width: 150,
      valueGetter: (params) => params.row.pakage_amount?.amount || "N/A",
    },

    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "custom-header",
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ color: "#21325D", border: "1px solid #21325D" }}
          onClick={() => handleOpenEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
    // { field: "delete", headerName: "Delete", headerClassName: 'custom-header',  width:150, renderCell: (params) => <Button style={{ color: "#21325D" }} onClick={() => handleOpen(params.row)}>Delete</Button> },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "custom-header",
      width: 150,
      renderCell: (params) => {
        // Check if the package is approved (is_active === 1)
        const isApproved = params.row.is_active === 1;

        // Define the button content based on approval status
        const buttonContent = isApproved ? (
          <>
            <DeleteOutlineIcon style={{ marginRight: "4px", color: "gray" }} />
            <span style={{ color: "red" }}>Delete</span>
          </>
        ) : (
          <>
            <DeleteOutlineIcon style={{ marginRight: "4px" }} />
            <span>Delete</span>
          </>
        );

        // Define the button style based on approval status
        const buttonStyle = isApproved
          ? {
              color: "gray",
              backgroundColor: "#f5f5f5", // Add background color here
              border: "1px solid #FF392F",
              cursor: "not-allowed",
              // Disable pointer events when button is disabled
            }
          : {
              color: "black",
              border: "1px solid #FF392F",
              cursor: "pointer",
            };

        return (
          <Button
            style={buttonStyle}
            onClick={() => handleOpen(params.row)}
            disabled={isApproved}
          >
            {buttonContent}
          </Button>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      headerClassName: "custom-header",
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.row.is_active}
          onChange={(event) => handleApprove(event, params.row)}
          style={{ border: "none", width: "145px" }}
        >
          <MenuItem value={1}>
            <span style={{ color: "green" }}>Approved</span>
          </MenuItem>
          <MenuItem value={0}>
            <span style={{ color: "#21325D" }}>Not-approved</span>
          </MenuItem>
          <MenuItem value={2}>
            <span style={{ color: "#FFA500" }}>Archive</span>
          </MenuItem>
        </Select>
      ),
    },

    {
      field: "view",
      headerName: "View",
      headerClassName: "custom-header",
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ color: "#21325D" }}
          onClick={() => handleOpenView(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: "viewDetails",
      headerName: "View-Details",
      headerClassName: "custom-header",
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ color: "#21325D" }}
          onClick={() => handleOpenViewDetails(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div
      className="subad-table-container"
      style={{ position: "relative", width: "130%", marginTop: "-20px" }}
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
          Holiday Package
        </Typography>
      </div>
      {access !== "PACKAGE_HANDLER" ? (
        <div>access not granted</div>
      ) : (
        <div style={{ width: "100%", backgroundColor: "#fff" }}>
          {holidayPackage.length === 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              Loading.....
            </div>
          ) : (
            <DataGrid
              rows={holidayPackage}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row._id}
              // components={{
              //   Toolbar: () => (
              //     <div style={{ marginTop: "10px" }}>
              //       <GridToolbar />
              //     </div>
              //   ),
              //   Pagination: () => null,
              // }}
            />
          )}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this package?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {loading ? (
              "Loading..." // Render loading text or spinner while loading is true
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={handleDelete}
                  style={{
                    padding: "10px 20px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  No
                </Button>
              </>
            )}
          </Box>
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "80%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Box>
            <EditHolidayPackage
              onClose={handleCloseEdit}
              packageData={editPackageData}
            />
          </Box>
          {/* <Box
                        sx={{
                            display: "flex",
                            justifyContent: 'center'
                        }}
                    >
                        <button onClick={handleCloseEdit}>Close</button>
                    </Box> */}
        </Box>
      </Modal>

      <Modal
        open={openApprove}
        onClose={handleCloseApprove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={styles.modal}
      >
        <Box sx={styles.modalContent}>
          <Typography variant="h6" component="h2">
            Are you sure you want to approve this package?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleApprove}
              style={{
                padding: "10px 20px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseApprove}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff0000",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "80%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Box>
            <ViewPackage />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handleCloseView}>Close</button>
          </Box>
        </Box>
      </Modal>


      <Modal
          open={openViewDetails}
          onClose={handleCloseViewDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: "80%",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              overflowY: "auto",
              borderRadius: "8px", // Optional: Add border radius for rounded corners
              position: "relative", // Add relative positioning for the close icon
            }}
          >
            {/* Close Icon */}
            <CloseIcon
              onClick={handleCloseViewDetails}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "#000",
                fontSize: "1.5rem", // Adjust the font size as needed
              }}
            />
            {/* Modal Content */}
            <Box>
              <ViewPackageDetails />
            </Box>
            {/* Optional: Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2, // Margin top for spacing
              }}
            >
              <button
                onClick={handleCloseViewDetails}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "70px",
                  borderRadius: "5px",
                  boxShadow: "2px 5px grey",
                  border: "none",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </Box>
          </Box>
        </Modal>
    </div>
  );
}

export default PackageDetails;
