
import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import { apiURL } from "../../../../../Constants/constant";

const ItenaryCreate = () => {
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [dayAtList, setDayAtList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [display, setDisplay] = useState("");

  const handleAddDayAt = () => {
    setDayAtList([
      ...dayAtList,
      { title: "", description: "", price: "", type: "" },
    ]);
  };

  const handleRemoveDayAt = (index) => {
    setDayAtList(dayAtList.filter((_, i) => i !== index));
  };

  const handleAddActivity = () => {
    setActivitiesList([
      ...activitiesList,
      { title: "", description: "", timing: "", price: "" },
    ]);
  };

  const handleRemoveActivity = (index) => {
    setActivitiesList(activitiesList.filter((_, i) => i !== index));
  };

  const handleDayAtChange = (index, field, value) => {
    const newDayAtList = [...dayAtList];
    newDayAtList[index][field] = value;
    setDayAtList(newDayAtList);
  };

  const handleActivityChange = (index, field, value) => {
    const newActivitiesList = [...activitiesList];
    newActivitiesList[index][field] = value;
    setActivitiesList(newActivitiesList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        destination,
        origin,
        noOfDays,
        dayAt: dayAtList,
        activities: activitiesList,
      };

      await axios.post(
        `${apiURL.baseURL}/skyTrails/api/itinerary/dayWise/createDayWise`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setDestination("");
      setOrigin("");
      setNoOfDays("");
      setDayAtList([]);
      setActivitiesList([]);
      setDisplay("Submitted successfully!");

      setTimeout(() => {
        setDisplay("");
      }, 3000);
    } catch (error) {
      console.error("Error sending data:", error);
      setDisplay("An error occurred while submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      mt={8}
      p={3}
      width="100%"
      maxWidth="500px"
      mx="auto"
      component={Paper}
      elevation={3}
      borderRadius={5}
    >
      <Typography variant="h4" gutterBottom align="center">
        Create Itinerary Plan
      </Typography>
      {submitting && (
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <CircularProgress />
          <Typography variant="h6" ml={2}>
            Submitting...
          </Typography>
        </Box>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Destination, Origin, and No of Days Fields */}
        <TextField
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Origin"
          variant="outlined"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number of Days"
          variant="outlined"
          type="number"
          value={noOfDays}
          onChange={(e) => setNoOfDays(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Day At Section */}
        <Box mt={2} width="100%">
          <Typography variant="h6">Day-At</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDayAt}
            fullWidth
          >
            Add Day At
          </Button>
          {dayAtList.map((dayAt, index) => (
            <Box key={index} mt={2} p={2} border={1} borderRadius={5}>
              <TextField
                label="Title"
                variant="outlined"
                value={dayAt.title}
                onChange={(e) =>
                  handleDayAtChange(index, "title", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                variant="outlined"
                value={dayAt.description}
                onChange={(e) =>
                  handleDayAtChange(index, "description", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                value={dayAt.price}
                onChange={(e) =>
                  handleDayAtChange(index, "price", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Type"
                variant="outlined"
                value={dayAt.type}
                onChange={(e) =>
                  handleDayAtChange(index, "type", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveDayAt(index)}
                fullWidth
                style={{ marginTop: 10 }}
              >
                Remove Day At
              </Button>
            </Box>
          ))}
        </Box>

        {/* Activities Section */}
        <Box mt={2} width="100%">
          <Typography variant="h6">Activities</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddActivity}
            fullWidth
          >
            Add Activity
          </Button>
          {activitiesList.map((activity, index) => (
            <Box key={index} mt={2} p={2} border={1} borderRadius={5}>
              <TextField
                label="Title"
                variant="outlined"
                value={activity.title}
                onChange={(e) =>
                  handleActivityChange(index, "title", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                variant="outlined"
                value={activity.description}
                onChange={(e) =>
                  handleActivityChange(index, "description", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Timing"
                variant="outlined"
                value={activity.timing}
                onChange={(e) =>
                  handleActivityChange(index, "timing", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                value={activity.price}
                onChange={(e) =>
                  handleActivityChange(index, "price", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveActivity(index)}
                fullWidth
                style={{ marginTop: 10 }}
              >
                Remove Activity
              </Button>
            </Box>
          ))}
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      {display && (
        <Typography variant="body1" color="error" align="center" mt={2}>
          {display}
        </Typography>
      )}
    </Box>
  );
};

export default ItenaryCreate;
