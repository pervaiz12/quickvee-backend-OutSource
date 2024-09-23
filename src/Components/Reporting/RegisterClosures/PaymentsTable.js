import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

// Styled Components using MUI's styled utility
const StyledTable = styled(Table)(({ theme }) => ({
  padding: theme.spacing(2), // Adjust padding
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td, & th": {
    border: "none",
  },
}));

export default function PaymentsTable() {
  const rows = [
    {
      paymentType: "Cash",
      expected: "627.00",
      counted: "650.00",
      difference: "22.90",
    },
    {
      paymentType: "Store Credit",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "Loyalty",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "Gift Card",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "Online Payments",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "Credit Card",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "Debit Card",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "EBT Food",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
    {
      paymentType: "EBT Cash",
      expected: "0.00",
      counted: "0.00",
      difference: "0.00",
    },
  ];

  return (
    <TableContainer
      sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
    >
      <StyledTable>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Payment Type</StyledTableCell>
            <StyledTableCell>Expected</StyledTableCell>
            <StyledTableCell>Counted</StyledTableCell>
            <StyledTableCell>Difference</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.paymentType}>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                {row.paymentType}
              </StyledTableCell>
              <StyledTableCell>{row.expected}</StyledTableCell>
              <StyledTableCell>{row.counted}</StyledTableCell>
              <StyledTableCell>{row.difference}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
