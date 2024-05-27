import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "./../../Assests/Vendors/DeleteIcon.svg";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTable({
  tableRowData,
  vendorDetails,
  handleDeleteClick,
}) {
  return (
    <TableContainer component={Paper}>
      <StyledTable
        sx={{ minWidth: 500, }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {tableRowData.map((row) => (
              <StyledTableCell>{row}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))} */}
          {vendorDetails.map((vendor, index) => {
            return (
              <>
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{vendor.pay_amount}</StyledTableCell>
                  <StyledTableCell>{vendor.payment_datetime}</StyledTableCell>
                  <StyledTableCell>{vendor.remark || "-"}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={DeleteIcon}
                      onClick={() => {
                        handleDeleteClick(vendor.id, vendor.vendor_id);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              </>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
