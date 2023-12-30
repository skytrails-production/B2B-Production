import React from 'react'
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


const BusBoardingPoint = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%'}} aria-label="customized table">
        <TableHead backgroundColor="red">
          <TableRow>
            <StyledTableCell>Boarding Point</StyledTableCell>
            <StyledTableCell align="right">LandMark</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" >
              95 Khanna Market (6 hours Stop in Mandsaur)
              </StyledTableCell>
              <StyledTableCell>95 Khanna Market Near Tees Hazari Metro Station</StyledTableCell>
              <StyledTableCell>95 Khanna Market Near Tees Hazari Metro Station Mandsaur</StyledTableCell>
              <StyledTableCell>19:00</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow >
              <StyledTableCell component="th" scope="row" >
              Other
              </StyledTableCell>
              <StyledTableCell>Mahipalpur</StyledTableCell>
              <StyledTableCell>Shivmruti Radision Hotel Delhi (6 Hour Hold in Mandsaur )</StyledTableCell>
              <StyledTableCell>19:40</StyledTableCell>
            </StyledTableRow>
            
         
        </TableBody>
      </Table>
      <Table sx={{ minWidth: '100%'}} aria-label="customized table">
        <TableHead backgroundColor="red">
          <TableRow>
            <StyledTableCell>Dropping Point</StyledTableCell>
            <StyledTableCell align="right">LandMark</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody padding ='20px'>
        
            <tr>
                <td>Kalyan</td>
                <td></td>
                <td></td>
                <td align="right">08:00</td>
            </tr>
            <tr>
                <td>Thane West</td>
                <td></td>
                <td></td>
                <td  align="right">09:00</td>
            </tr>
         
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BusBoardingPoint
