import {
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { priceFormate } from "../../../hooks/priceFormate";
import { formatDateTime } from "../../../Constants/utils";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));

export default function RegisterClosuresTable({ table }) {
  const totals = {
    cash: table?.cash_collected || 0,
    card: table?.card_collected || 0,
    foodEbt: table?.food_ebt_collected || 0,
    cashEbt: table?.cash_ebt_collected || 0,
    storeCredit: table?.store_credit_collected || 0,
    loyalty: table?.loyality_amt_collected || 0,
    giftCard: table?.giftcard_amt_collected || 0,
    lottery: 0, // Replace with the actual value if available
  };

  const totalSum = Object.values(totals).reduce((sum, value) => sum + value, 0);

  return (
    <Grid container sx={{ mt: 0 }} className="box_shadow_div">
      <Grid
        item
        xs={12}
        sx={{ padding: 2.5 }}
        container
        justifyContent="space-between"
        alignItems="center"
        className="cursor-pointer"
      >
        <Link
          state={{ table: table }}
          to={"/store-reporting/register-closures/register-closures-summery"}
        >
          <h1
            className="text-[#0A64F9] text-[18px]"
            style={{ marginBottom: 0 }}
          >
            {typeof table?.device_name === "string"
              ? `${table.device_name}`
              : ""}
          </h1>
        </Link>

        <Grid item>
          <Grid container spacing={2}>
            {["Open:", "Close:"].map((label, idx) => (
              <Grid key={label} item sx={{ display: "flex", gap: 1 }}>
                <p
                  className={`text-[16px] font-semibold ${
                    label === "Close:" ? "text-[#F90A0A]" : "text-[#0A64F9]"
                  }`}
                >
                  {label}
                </p>
                <p className="text-[#000000] text-[16px] font-semibold">
                  {idx === 0
                    ? formatDateTime(table?.in_time)
                    : table?.out_time === "Open"
                      ? "Still Open"
                      : formatDateTime(table?.out_time)}
                </p>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <StyledTable sx={{ minWidth: 500 }}>
            <TableHead>
              <StyledTableRow>
                {[
                  "Cash",
                  "Credit/Debit Card",
                  "EBT Food",
                  "EBT Cash",
                  "Store Credit",
                  "Loyalty",
                  "Gift Card",
                  "Lottery",
                  "Total",
                ].map((header) => (
                  <StyledTableCell key={header}>{header}</StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  {priceFormate(table?.cash_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.card_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.food_ebt_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.cash_ebt_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.store_credit_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.loyality_amt_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell>
                  {priceFormate(table?.giftcard_amt_collected.toFixed(2))}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  {priceFormate(totalSum.toFixed(2))}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
