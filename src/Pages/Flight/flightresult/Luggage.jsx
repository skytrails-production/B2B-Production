import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Luggage from "@mui/icons-material/Luggage";
import { fontWeight } from "@mui/system";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "white"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("DEL-BOM", 7, 15)];

export default function BasicPopover(props) {
  // console.log("Props", props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results || reducerState?.return?.returnData?.data?.data?.Response?.Results;
  // console.log("Redux State", results);

  const origin = props.origin;
  const destination = props.destination;
  const cabin = props.cabin;
  const checkin = props.checkin;
  const fareClass = props.fareClass;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Luggage
        style={{ color: "gray" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Grid container>
          <Grid item lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold",textAlign: "center" }}>
                        Sector
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold",textAlign: "center" }}>
                        Cabin
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold",textAlign: "center" }}>
                        Check-In
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" , textAlign: "center",display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center"}}>
                        Fare Class
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {origin}-{destination}
                    </StyledTableCell>
                    <StyledTableCell align="right">{cabin}</StyledTableCell>
                    <StyledTableCell align="right">{checkin}</StyledTableCell>
                    <StyledTableCell align="right">{fareClass}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
