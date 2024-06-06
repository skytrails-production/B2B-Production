import React from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button, TextField, Box } from "@mui/material";

const CustomToolbar = ({ searchTerm, setSearchTerm, setSortModel, handleFilterClick }) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          sx={{ marginRight: 2 }}
        />
        <Box>
          <Button
            variant="contained"
            onClick={() => setSortModel([{ field: "firstName", sort: "asc" }])}
            sx={{ mr: 1, backgroundColor: "#21325D" }}
          >
            Sort Asc
          </Button>
          <Button
            variant="contained"
            onClick={() => setSortModel([{ field: "firstName", sort: "desc" }])}
            sx={{ mr: 1, backgroundColor: "#21325D" }}
          >
            Sort Desc
          </Button>
          <Button
            variant="contained"
            onClick={handleFilterClick}
            sx={{ backgroundColor: "#21325D" }}
          >
            Filter
          </Button>
        </Box>
      </Box>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
