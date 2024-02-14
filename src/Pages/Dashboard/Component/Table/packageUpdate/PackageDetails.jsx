import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPackageAction } from "../../../../../Redux/SearchPackage/actionSearchPackage";
import { apiURL } from "../../../../../Constants/constant";
import {
    Box,
    Button,
} from "@mui/material";
import "./packageUpdate.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditHolidayPackage from "./EditPackage";
import ViewPackage from "./ViewPackage";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PackageDetails() {


    const reducerState = useSelector((state) => state);
    // const holidayPackage = reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;

    // useEffect(() => {
    //     const payload = {
    //         destination: "",
    //         days: 0,
    //     };
    //     dispatch(searchPackageAction(payload));
    // }, []);
    const [holidayPackage, setHolidayPackage] = useState([]);

    useEffect(() => {
        const fetchHolidayPackages = async () => {
            try {
                const response = await axios.get(
                    `${apiURL.baseURL}/skyTrails/international/getAllAdminPackage`
                );
                // console.log(response.data, "----------------------");
                setHolidayPackage(response.data.data.pakage);
            } catch (error) {
                console.error("Error fetching holiday packages:", error);
            }
        };

        fetchHolidayPackages();
    }, []);




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const styles = {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        },
        modalContent: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            width: 400,
        },
        buttonContainer: {
            marginTop: '20px',
        },
        button: {
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            color: '#333',
            fontSize: '14px',
            fontWeight: 'bold',
        },
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
    }

    const handleCloseApprove = () => setOpenApprove(false);



    const handleApprove = async () => {
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

                toast.success('Package approved successfully!', {
                    position: 'top-right',
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
    }







    const handleOpenEdit = (item) => {
        setOpenEdit(true);
        sessionStorage.setItem("selectedPackage", JSON.stringify(item));
    }

    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpen = (item) => {
        setOpen(true);
        setSelectedPackageDelete(item);
    }

    const handleClose = () => setOpen(false);

    const isAdmin = reducerState?.adminAuth?.adminData?.data?.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleDelete = async () => {
        const packageId = selectedPackageDelete?._id;


        try {
            const res = await axios({
                method: 'delete',
                url: `${apiURL.baseURL}/skyTrails/international/deleteone/${packageId}`,
                data: {
                    isAdmin: isAdmin,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                handleClose();
                // Show success notification
                toast.success('Package deleted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log('Error while deleting this package');
            // Show error notification
            toast.error('Error deleting the package. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }


    const columns = [
        {
            field: "pakage_title",
            headerName: "Package Title",
            width: 350,
            headerClassName: 'custom-header',
            valueGetter: (params) => params.row.pakage_title || 'N/A'
        },
        { field: "days", headerName: "Days", flex: 1, headerClassName: 'custom-header' },
        {
            field: "pakage_amount.amount",
            headerName: "Package Amount",
            headerClassName: 'custom-header',
            width: 150,
            valueGetter: (params) => params.row.pakage_amount?.amount || 'N/A'
        },

        { field: "edit", headerName: "Edit", headerClassName: 'custom-header', width: 150, renderCell: (params) => <Button style={{ color: "#21325D" }} onClick={() => handleOpenEdit(params.row)}>Edit</Button> },
        // { field: "delete", headerName: "Delete", headerClassName: 'custom-header',  width:150, renderCell: (params) => <Button style={{ color: "#21325D" }} onClick={() => handleOpen(params.row)}>Delete</Button> },
        {
            field: "delete",
            headerName: "Delete",
            headerClassName: 'custom-header',
            width: 150,
            renderCell: (params) => {
                // Check if the package is approved (is_active === 1)
                const isApproved = params.row.is_active === 1;

                // If approved, disable the delete button, otherwise, enable it
                return (
                    <Button
                        style={{ color: "#21325D" }}
                        onClick={() => handleOpen(params.row)}
                        disabled={isApproved}
                    >
                        Delete
                    </Button>
                );
            }
        },

        {
            field: "status",
            headerName: "Status",
            headerClassName: 'custom-header',
            width: 150,
            renderCell: (params) => (
                params.row.is_active === 1 ? (
                    <span style={{ color: 'green' }}>Approved</span>
                ) : (
                    <span style={{ color: "#21325D" }} onClick={() => handleOpenApprove(params.row)}> Not approve</span>
                )
            )
        },
        { field: "view", headerName: "View", headerClassName: 'custom-header', width: 150, renderCell: (params) => <Button style={{ color: "#21325D" }} onClick={() => handleOpenView(params.row)}>View</Button> },
    ];

    return (
        <div className="subad-table-container" style={{ position: 'relative', width: "100%" }}>
            <div className="adsearch-bar" style={{ position: 'absolute', top: 10, zIndex: 1, fontWeight: 'bold' }}>
                <Typography variant="h5" className="adtable-heading">
                    Edit Holiday Package
                </Typography>
            </div>
            <div style={{ width: "100%", backgroundColor: "#fff" }}>


                <DataGrid
                    rows={holidayPackage}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    getRowId={(row) => row._id}
                    components={{
                        Toolbar: () => (
                            <div style={{ marginTop: '10px' }}>
                                <GridToolbar />
                            </div>
                        ),
                    }}
                />


            </div>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="outlined" onClick={handleDelete} style={{ padding: '10px 20px', color: '#333', fontWeight: 'bold' }}>
                            Yes
                        </Button>
                        <Button variant="contained" onClick={handleClose} style={{ padding: '10px 20px', backgroundColor: '#ff0000', color: '#fff', fontWeight: 'bold' }}>
                            No
                        </Button>
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
                    {/* <Box sx={styles.buttonContainer}>
                        <button style={styles.button} onClick={handleCloseApprove}>
                            No
                        </button>
                        <button style={styles.button} onClick={handleApprove}>
                            Yes
                        </button>
                    </Box> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="outlined" onClick={handleApprove} style={{ padding: '10px 20px', color: '#333', fontWeight: 'bold' }}>
                            Yes
                        </Button>
                        <Button variant="contained" onClick={handleCloseApprove} style={{ padding: '10px 20px', backgroundColor: '#ff0000', color: '#fff', fontWeight: 'bold' }}>
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
        </div>
    );
}

export default PackageDetails;
