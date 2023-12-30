import * as React from 'react';
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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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



export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%'}} aria-label="customized table">
        <TableHead backgroundColor="red">
          <TableRow>
            <StyledTableCell>Cancellation Time</StyledTableCell>
            <StyledTableCell align="right">Cancellation Charges</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              Between 07:00 on 09 Jan 2023 - 07:00 on 10 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right" style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>40%</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              Till 07:00 on 09 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right" style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>10%</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              Between 07:00 on 10 Jan 2023 - 19:00 on 10 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right" style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>50%</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              Between 19:00 on 10 Jan 2023 - 23:00 on 10 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right" style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>80%</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              Between 23:00 on 10 Jan 2023 - 04:00 on 11 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right" style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>100%</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row"  style={{color:'#252525' , fontWeight:'bold' , fontSize:'14px'}}>
              After 04:00 on 11 Jan 2023
              </StyledTableCell>
              <StyledTableCell align="right"  style={{color:'#FF8900' , fontWeight:'bold' , fontSize:'14px'}}>100%</StyledTableCell>
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}
