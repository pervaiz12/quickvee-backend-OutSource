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
  Typography,
  Grid,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { formatDateTime } from "../../../Constants/utils";

// Styled Components
const StyledTable = styled(Table)(({ theme }) => ({
  padding: theme.spacing(2),
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
    borderBottom: "none",
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

export default function RegisterClosureTransactionsTable({ tableData }) {
  console.log("tableData", tableData);

  return (
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Order Info</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Payments</StyledTableCell>
            <StyledTableCell>Paid</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {tableData?.arr?.length > 0 &&
            tableData?.arr?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {[
                    {
                      label: "Employee",
                      value: row?.emp_name,
                      bold: true,
                    },
                    { label: "Order Id", value: row?.order_id },
                    {
                      label: "Date",
                      value: formatDateTime(row?.merchant_time),
                    },
                    { label: "Customer", value: row?.billing_name },
                    { label: "Email", value: row?.customer_email },
                  ].map(
                    (detail, idx) =>
                      detail.value && (
                        <Typography
                          className={`${
                            detail.bold
                              ? "CircularSTDBook-13px"
                              : "CircularSTDBook-12px font-semibold	"
                          }`}
                          key={idx}
                          sx={
                            detail.bold
                              ? { fontWeight: "bold" }
                              : { color: "#414141", fontSize: "12px", py: 0.1 }
                          }
                        >
                          {detail.label}: {detail.value}
                        </Typography>
                      )
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <Grid
                    container
                    direction="column"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <Grid item>
                      {row.cart_data.map((product, i) => (
                        <Typography key={i}>{product?.name}</Typography>
                      ))}
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Total Sale
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledTableCell>

                {/* <StyledTableCell>
                {row.products.map((product, i) => (
                  <Typography key={i}>
                    {i === 0 ? "$269.90" : i === 1 ? "$269.90" : "$49.90"}
                  </Typography>
                ))}
                <Typography sx={{ fontWeight: "bold" }}>
                  {row.totalSale}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>{row.payment}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>Total Paid</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>{row.paid}</Typography>
              </StyledTableCell> */}
              </StyledTableRow>
            ))}
          {/* Total row at the bottom */}
          <StyledTableRow>
            <StyledTableCell colSpan={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Total
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "18px", color: "#0A64F9" }}
              >
                $1627.10
              </Typography>
            </StyledTableCell>
            <StyledTableCell />
            <StyledTableCell>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "18px", color: "#0A64F9" }}
              >
                $1627.10
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
