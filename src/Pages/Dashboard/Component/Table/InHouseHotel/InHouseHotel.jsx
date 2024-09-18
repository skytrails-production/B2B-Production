import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  Box,
  Modal,
  Grid,
  Rating,
} from "@mui/material";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiURL } from "../../../../../Constants/constant";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Example icon, can be replaced
import PolicyIcon from "@mui/icons-material/Policy"; // Example icon for hotel policies
import BuildCircleIcon from "@mui/icons-material/BuildCircle"; // Example icon for facilities
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Icon for address
import HotelIcon from "@mui/icons-material/Hotel"; // Icon for total rooms
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // Icon for available rooms

//import { message, Modal, Input } from "antd"; // Import the message component from antd
import "./InHouseHotel.css";
import { Card, CardContent } from "@mui/material";

const InHouseHotel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [newApproveStatus, setNewApproveStatus] = useState("");
  const [reason, setReason] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [loadingApproval, setLoadingApproval] = useState({}); // Map for tracking loading states
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [InHouseHotel, setInHouseHotel] = useState(null); // Store package details
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/inventory/getAllInhouseHotels`,
          {
            params: {
              page: currentPage,
              limit: pageSize,
              search: searchTerm,
            },
          }
        );

        console.log("API response:", response.data.result.docs);
        if (response.data && Array.isArray(response.data.result.docs)) {
          setData(response.data.result.docs); // Corrected to use docs
          setTotalRecords(response.data.result.totalDocs || 0); // Handle total records count
        } else {
          setData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1); // DataGrid pages are 0-based
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const handleOpenViewDetails = async (row) => {
    const hotelId = row._id; // Get the hotel ID from the row
    try {
      const res = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/inventory/getInventoryDataById?hotelId=${hotelId}` // Use hotelId in the API call
      );

      if (res.status === 200 && res.data) {
        // Handle the response data (e.g., save to state or show in the modal)
        setInHouseHotel(res.data.result);
        console.log(res.data.result, "++++++++++++++++++++");
        // Open the modal
        setOpenViewDetails(true);
      } else {
        toast.error("Failed to fetch hotel details.");
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      toast.error("Error fetching hotel details. Please try again.");
    }
  };

  const handleCloseViewDetails = () => {
    setOpenViewDetails(false);
  };

  const columns = [
    {
      field: "channelMngrName",
      headerName: "Channel Manager Name",
      width: 220,
      valueGetter: (params) => params.row.partnerId?.channelMngrName || "", // Access nested channelMngrName
    },
    {
      field: "channelMngrName",
      headerName: "Hotel Name",
      width: 220,
      valueGetter: (params) => params.row.hotelName || "", // Access nested channelMngrName
    },

    { field: "CompanyName", headerName: "CompanyName", width: 220 },
    { field: "availableDate", headerName: "AvailableDate", width: 220 },
    {
      field: "startFrom",
      headerName: "Start Date",
      width: 220,
    },
    { field: "hotelCity", headerName: "City", width: 220 },
    {
      field: "hotelCountry",
      headerName: "Country",
      width: 220,
      valueGetter: (params) => params.row.hotelCountry || "", // Access nested channelMngrName
    },
    {
      field: "panCard",
      headerName: "Pan Card",
      width: 220,
      valueGetter: (params) => params.row.panCard || "No Data", // Access nested channelMngrName
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 220,
      valueGetter: (params) => params.row.rating || "No Data", // Access nested channelMngrName
    },

    { field: "status", headerName: "Status", width: 220 },
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className="adsearch-bar"
        style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold" }}
      >
        <Typography variant="h5" className="adtable-heading">
          In-House Hotels
        </Typography>
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
            style: {
              // Change the placeholder color to black
              color: "black",
            },
          }}
          inputProps={{
            style: {
              // Inline style for placeholder
              color: "black", // This affects the text color inside the input
              "::placeholder": {
                color: "black", // This affects the placeholder color
              },
            },
          }}
          style={{ backgroundColor: "#fff", borderRadius: "5px" }}
        />
      </div>

      <Paper>
        {data.length === 0 && !loading ? (
          <Typography
            variant="h6"
            style={{ padding: "16px", textAlign: "center" }}
          >
            No data available
          </Typography>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            rowCount={totalRecords}
            paginationMode="server"
            pagination
            onPageChange={handlePageChange}
            getRowId={(row) => row._id}
            style={{ width: "100%" }}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: "10px" }}>
                  <GridToolbar />
                </div>
              ),
            }}
          />
        )}
      </Paper>

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
            width: "100%", // Adjusted for better screen usage
            maxWidth: "90%", // Max width for responsiveness
            maxHeight: "85vh",
            bgcolor: "background.paper",
            borderRadius: "1px", // Rounded corners for modern look
            boxShadow: 24,
            p: 4,
            overflow: "scroll",
          }}
        >
          {InHouseHotel ? (
            <Box>
              {/* Hotel Name Section */}

              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "50px" }}
              >
                <div>
                  {InHouseHotel.hotelImages &&
                  InHouseHotel.hotelImages.length > 0 ? (
                    <div>
                      <img
                        src={InHouseHotel.hotelImages[0]} // Display the first image only
                        alt="Hotel Image 1"
                        style={{
                          width: "300px", // Adjust size as needed
                          height: "250px",
                          objectFit: "cover", // Maintain aspect ratio
                        }}
                      />
                    </div>
                  ) : (
                    <p>No images available</p>
                  )}
                </div>

                {/* Hotel Description */}
                <Typography
                  variant="body1"
                  sx={{
                    // fontStyle: "italic",
                    color: "#555",
                    textAlign: "center",
                    mb: 3,
                    textAlign: "justify",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#21325D",
                      mb: 2,
                    }}
                  >
                    {InHouseHotel.hotelName}
                  </Typography>
                  {InHouseHotel.description}
                </Typography>
                {/* hotelState */}
              </Box>

              {/* Hotel Address */}
              {/* <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Address:
                </Typography>
                <Typography variant="body1">
                  {InHouseHotel.hotelAddress}, {InHouseHotel.hotelCity},{" "}
                  {InHouseHotel.hotelState}, {InHouseHotel.hotelCountry}
                </Typography>
              </Box> */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333", mb: 1, mt: 1 }}
                >
                  Address:
                </Typography>
                <Box display="flex" alignItems="center">
                  <LocationOnIcon
                    sx={{ color: "#21325D", mr: 1, fontsize: "100px" }}
                  />
                  <Typography variant="body1">
                    {InHouseHotel.hotelAddress}, {InHouseHotel.hotelCity},{" "}
                    {InHouseHotel.hotelState}, {InHouseHotel.hotelCountry}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mb: 2, gap: "5rem" }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Start Date:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.startFrom}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Available Date:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.availableDate}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2, // Gap between items
                  mb: 2, // Margin bottom for overall container
                }}
              >
                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Hotel State:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.hotelState}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Locality:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.locality}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Hotel City:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.hotelCity}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Hotel Code:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.hotelCode}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Hotel Country:
                  </Typography>
                  <Typography variant="body1">
                    {InHouseHotel.hotelCountry}
                  </Typography>
                </Box>
              </Box>

              {/* cityCode */}

              {/* Hotel Amenities */}
              <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#21325D", mb: 2 }}
                >
                  Amenities:
                </Typography>
                <Grid container spacing={3}>
                  {InHouseHotel.amenities &&
                  InHouseHotel.amenities.length > 0 ? (
                    InHouseHotel.amenities.map((amenity, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            p: 2,
                            borderRadius: 1,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1 }} />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "500", color: "#333" }}
                          >
                            {amenity}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1">
                      No amenities available
                    </Typography>
                  )}
                </Grid>
              </Paper>

              {/* Hotel Policies */}
              <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#21325D", mb: 2 }}
                >
                  Hotel Policies:
                </Typography>
                <Grid container spacing={3}>
                  {InHouseHotel.hotelPolicy &&
                  InHouseHotel.hotelPolicy.length > 0 ? (
                    InHouseHotel.hotelPolicy.map((policy, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            p: 2,
                            borderRadius: 1,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <PolicyIcon sx={{ color: "#4caf50", mr: 1 }} />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "500", color: "#333" }}
                          >
                            {policy}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1">
                      No policies available
                    </Typography>
                  )}
                </Grid>
              </Paper>

              {/* Hotel Facilities */}
              <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#21325D", mb: 2 }}
                >
                  Facilities:
                </Typography>
                <Grid container spacing={3}>
                  {InHouseHotel.facilities &&
                  InHouseHotel.facilities.length > 0 ? (
                    InHouseHotel.facilities.map((facility, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            p: 2,
                            borderRadius: 1,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <BuildCircleIcon sx={{ color: "#4caf50", mr: 1 }} />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "500", color: "#333" }}
                          >
                            {facility}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1">
                      No facilities available
                    </Typography>
                  )}
                </Grid>
              </Paper>

              {/* Hotel Rating */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Rating:
                </Typography>
                {InHouseHotel.rating ? (
                  <Box display="flex" alignItems="center">
                    <Rating
                      name="hotel-rating"
                      value={InHouseHotel.rating}
                      precision={0.5} // Allows for half-star ratings
                      readOnly
                    />
                    {/* <Typography variant="body1" sx={{ ml: 1 }}>
                      {InHouseHotel.rating} stars
                    </Typography> */}
                  </Box>
                ) : (
                  <Typography variant="body1">No Rating</Typography>
                )}
              </Box>

              {/* Rooms Information */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Rooms:
                </Typography>
                <Typography variant="body1">
                  Total: {InHouseHotel.totalRooms} | Available:{" "}
                  {InHouseHotel.availableRooms}
                </Typography>
              </Box>

              <Box>
                {/* Iterate over each room */}
                {InHouseHotel.rooms && InHouseHotel.rooms.length > 0 ? (
                  InHouseHotel.rooms.map((room, index) => (
                    <Card
                      key={index}
                      sx={{ mb: 4, border: "1px solid #21325D" }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
                        >
                          Room {index + 1}: {room.room_type}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {room.description}
                        </Typography>

                        {/* Room Images */}
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#333" }}
                        >
                          Images:
                        </Typography>
                        <Grid container spacing={2}>
                          {room.roomsImages.map((image, imgIndex) => (
                            <Grid item xs={6} key={imgIndex}>
                              <img
                                src={image}
                                alt={`Room ${imgIndex + 1}`}
                                style={{ width: "70%", borderRadius: "8px" }}
                              />
                            </Grid>
                          ))}
                        </Grid>

                        {/* Room Information */}
                        <Paper
                          elevation={3}
                          sx={{ p: 3, mt: 3, borderRadius: 2 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
                          >
                            Room Information:
                          </Typography>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            sx={{ alignItems: "center" }}
                          >
                            {/* Total Rooms */}
                            <Box display="flex" alignItems="center">
                              <HotelIcon sx={{ color: "#1976d2", mr: 1 }} />
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "medium" }}
                              >
                                Total Rooms: {room.totalRooms}
                              </Typography>
                            </Box>

                            {/* Available Rooms */}
                            <Box display="flex" alignItems="center">
                              <MeetingRoomIcon
                                sx={{ color: "#4caf50", mr: 1 }}
                              />
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "medium" }}
                              >
                                Available Rooms: {room.availableRooms}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                        {/* Room Amenities */}
                        <Paper
                          elevation={3}
                          sx={{ p: 3, borderRadius: 2, mt: 1 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#21325D", mb: 2 }}
                          >
                            Room Amenities:
                          </Typography>
                          {room.roomAmineties &&
                          room.roomAmineties.length > 0 ? (
                            <Grid container spacing={3}>
                              {room.roomAmineties.map((amenity, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                      backgroundColor: "#f5f5f5",
                                      p: 2,
                                      borderRadius: 1,
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                  >
                                    <CheckCircleIcon
                                      sx={{ color: "#4caf50", mr: 1 }}
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{ fontWeight: "500", color: "#333" }}
                                    >
                                      {amenity}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1">
                              No amenities available
                            </Typography>
                          )}
                        </Paper>

                        {/* Price Details (Weekday) */}
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333", mt: 3 }}
                          >
                            Price Details (Weekday):
                          </Typography>
                          {room.priceDetails.Weekday.map(
                            (priceDetail, priceIndex) => (
                              <Typography key={priceIndex} variant="body1">
                                Adults: {priceDetail.noOfAdult}, Children:{" "}
                                {priceDetail.noOfChildren}, Price:{" "}
                                {priceDetail.room_Price} INR
                                {priceDetail.isCP && " (Breakfast included)"}
                                {priceDetail.isMAP &&
                                  " (Breakfast + Dinner/Breakfast + Lunch)included"}
                                {priceDetail.isAP &&
                                  " (All meals: Breakfast + Dinner/Lunch included)"}
                              </Typography>
                            )
                          )}
                        </Box>

                        {/* Price Details (Weekend) */}
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#333", mt: 3 }}
                        >
                          Price Details (Weekend):
                        </Typography>
                        {room.priceDetails.Weekend.length > 0 ? (
                          room.priceDetails.Weekend.map(
                            (weekendDetail, weekendIndex) => (
                              <Typography key={weekendIndex} variant="body1">
                                Adults: {weekendDetail.noOfAdult}, Children:{" "}
                                {weekendDetail.noOfChildren}, Price:{" "}
                                {weekendDetail.room_Price} INR
                                {weekendDetail.isCP && " (Breakfast included)"}
                                {weekendDetail.isMAP &&
                                  " (Breakfast + Dinner/Breakfast + Lunch)included"}
                                {weekendDetail.isAP &&
                                  " (All meals: Breakfast + Dinner/Lunch included)"}
                              </Typography>
                            )
                          )
                        ) : (
                          <Typography variant="body1">
                            No weekend pricing available
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body1">No rooms available</Typography>
                )}
              </Box>

              {/* Close Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  onClick={handleCloseViewDetails}
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Softer button shadow
                    backgroundColor: "#21325D",
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default InHouseHotel;
