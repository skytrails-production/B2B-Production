import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import {
  TextField,
  InputAdornment,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const Quiz = () => {
  const [filterQuiz, setFilterQuiz] = useState([]);
  const [game, setGame] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/user/quiz/getAllQuiz`,
        {
          params: {
            page: 1,
            size: 5,
            search: searchTerm,
          },
        }
      );
      setGame(response.data.result);
      setFilterQuiz(response.data.result);
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter the quiz based on question
    const filtered = game.filter((item) =>
      item.question.toLowerCase().includes(searchTerm)
    );
    setFilterQuiz(filtered);
  };

  const handleAction = async (quizId, action) => {
    try {
      let status;
      switch (action) {
        case "active":
          status = "ACTIVE";
          break;
        case "block":
          status = "BLOCKED";
          break;
        case "delete":
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (!confirmDelete) return;
          status = "DELETE";
          break;
        default:
          return;
      }
      await axios.put(
        `${apiURL.baseURL}/skyTrails/api/admin/updateQuizStatus`,
        {
          quizId: quizId,
          status: status,
        }
      );
      fetchData();
    } catch (error) {
      console.error("error", error);
    }
  };

  const columns = [
    {
      field: "question",
      headerName: "Question",
      width: 400,
      valueGetter: (params) => params.row.question || "No Data",
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 200,
      valueGetter: (params) => params.row.answer || "No Data",
    },
    {
      field: "options?.opt1",
      headerName: "Option1",
      width: 200,
      valueGetter: (params) => params.row.options.opt1 || "No Data",
    },
    {
      field: "options?.opt2",
      headerName: "Option2",
      width: 200,
      valueGetter: (params) => params.row.options.opt2 || "No Data",
    },
    {
      field: "options?.opt3",
      headerName: "Option3",
      width: 200,
      valueGetter: (params) => params.row.options.opt3 || "No Data",
    },
    {
      field: "options?.opt4",
      headerName: "Option4",
      width: 200,
      valueGetter: (params) => params.row.options.opt4 || "No Data",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      valueGetter: (params) => params.row.status || "No Data",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleAction(params.row._id, "active")}
            style={{ marginRight: "30px" }}
          >
            Active
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => handleAction(params.row._id, "block")}
            style={{ marginRight: "30px" }}
          >
            Block
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleAction(params.row._id, "delete")}
            style={{ marginRight: "30px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="subada-table-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: "absolute",
          top: "10px",
          zIndex: 1,
          fontWeight: "bold",
        }}
      >
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by question"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" className="adtable-heading">
          Quiz Data
        </Typography>
      </div>
      <Paper>
        {filterQuiz.length > 0 ? (
          <DataGrid
            rows={filterQuiz} // Pass filterQuiz here
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            pagination
            getRowId={(row) => row._id}
            style={{ width: "100%" }}
            components={{
              Toolbar: () => (
                <div style={{ marginTop: "20px" }}>
                  <GridToolbar />
                </div>
              ),
              Pagination: () => null,
            }}
          />
        ) : (
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            No Quiz data found
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default Quiz;
