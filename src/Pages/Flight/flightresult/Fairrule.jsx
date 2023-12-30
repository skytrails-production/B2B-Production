import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Grid, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      <CorporateFareIcon
        style={{ color: 'gray' }}
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
          horizontal: "right"
        }}
      >
        <Grid container >
          <Grid item lg={12}>
            <Box style={{ backgroundColor: '#C5C5C5', width: '100%' }} p={2}>
              <Typography color='black' fontWeight='bold'>Fair Rule</Typography>
              <Typography fontSize='10px' color='black'>BOM-DEL</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                <TableHead backgroundColor="wite">
                  <TableRow>
                    <StyledTableCell><Typography  fontWeight='bold' fontSize='14px'>Cancellation</Typography> </StyledTableCell>
                    <StyledTableCell align="right"><Typography  fontWeight='bold' fontSize='14px'>Reissue</Typography> </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row" style={{ color: 'gray', fontWeight: 'bold', fontSize: '12px' }}>
                      INR 3600
                      from 0 To 3 Days before dept
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ color: '#FF8900',  fontSize: '14px' }}>INR 3350
                      from 0 To 3 Days before dept
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row" style={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                      INR 3100
                      from 4 Days & above before dept
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ color: '#FF8900',  fontSize: '14px' }}>INR 2850
                      from 4 Days & above before dept
                    </StyledTableCell>
                  </StyledTableRow>

                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <Typography style={{ color: "red", fontSize: '12px', fontWeight: 'bold',}}>* Mentioned Fee are per pax and per sector</Typography>
              <Typography style={{ color: "red", fontSize: '12px', fontWeight: 'bold', }}>* Apart from airline charges, GST + RAF + applicable charges if any, will be charged</Typography>
            </Box>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
