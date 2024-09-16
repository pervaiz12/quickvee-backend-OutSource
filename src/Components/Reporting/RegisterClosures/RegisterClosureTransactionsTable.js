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
import { priceFormate } from "../../../hooks/priceFormate";

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
                <StyledTableCell width="25%" sx={{ verticalAlign: "top" }}>
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
                <StyledTableCell
                  sx={{ verticalAlign: "top", height: "50px", p: 0 }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    direction="column"
                    sx={{ height: "100%" }}
                  >
                    <Grid item sx={{ px: 2, pt: 2 }}>
                      {row.cart_data.map((product, i) => (
                        <Typography
                          sx={{ pb: 2 }}
                          className="CircularSTDBook-13px"
                          key={i}
                        >
                          {product?.name}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item sx={{ borderTop: "1px solid #ECECEC", px: 2 }}>
                      <Typography sx={{ py: 1 }} className="CircularBold-13px">
                        Total Sale
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell
                  sx={{ verticalAlign: "top", height: "50px", p: 0 }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    direction="column"
                    sx={{ height: "100%" }}
                  >
                    <Grid item sx={{ px: 2, pt: 2 }}>
                      {row.cart_data.map((product, i) => {
                        const price = parseFloat(product?.price) || 0;
                        const taxRate = parseFloat(product?.taxRates) || 0;
                        const quantity = parseFloat(product?.qty) || 0;
                        const otherTaxesAmount =
                          parseFloat(product?.other_taxes_amount) || 0;
                        const totalPrice =
                          (price + price * (taxRate / 100)) * quantity +
                          otherTaxesAmount;
                        return (
                          <Typography
                            sx={{ pb: 2 }}
                            className="CircularSTDBook-13px"
                            key={i}
                          >
                            ${parseFloat(totalPrice).toFixed(2)}
                          </Typography>
                        );
                      })}
                    </Grid>
                    <Grid item sx={{ borderTop: "1px solid #ECECEC", px: 2 }}>
                      <Typography sx={{ py: 1 }} className="CircularBold-13px">
                        {row.cart_data
                          .reduce((acc, product) => {
                            const price = parseFloat(product?.price) || 0;
                            const taxRate = parseFloat(product?.taxRates) || 0;
                            const quantity = parseFloat(product?.qty) || 0;
                            const otherTaxesAmount =
                              parseFloat(product?.other_taxes_amount) || 0;
                            const totalPrice =
                              (price + price * (taxRate / 100)) * quantity +
                              otherTaxesAmount;
                            return acc + totalPrice;
                          }, 0)
                          .toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell
                  sx={{ verticalAlign: "top", height: "50px", p: 0 }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    direction="column"
                    sx={{ height: "100%" }}
                  >
                    <Grid item sx={{ px: 2, pt: 2 }}></Grid>
                    <Grid item sx={{ borderTop: "1px solid #ECECEC", px: 2 }}>
                      <Typography sx={{ py: 1 }} className="CircularBold-13px">
                        Total Sale
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledTableCell>
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
                {tableData?.arr
                  ?.reduce(
                    (acc, product) => acc + (parseFloat(product?.amt) || 0),
                    0
                  )
                  .toFixed(2)}
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
