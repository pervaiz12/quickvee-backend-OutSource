import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)({
  padding: 2,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#253338",
  color: theme.palette.common.white,
  fontFamily: "CircularSTDMedium",
  fontSize: 14,
  "&:not(th)": {
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

export default function RegisterClosuresTable({ table }) {
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
        <Link to={"/store-reporting/register-closures/register-closures-summery"}>
          <h1
            className="text-[#0A64F9] text-[18px]"
            style={{ marginBottom: 0 }}
          >
            Station #{table}
          </h1>
        </Link>

        <Grid item>
          <Grid container spacing={2}>
            {["open:", "close:"].map((label, idx) => (
              <Grid key={label} item sx={{ display: "flex", gap: 1 }}>
                <p
                  className={`text-[16px] font-semibold ${
                    label === "close:" ? "text-[#F90A0A]" : "text-[#0A64F9]"
                  }`}
                >
                  {label}
                </p>
                <p className="text-[#000000] text-[16px] font-semibold">
                  {idx === 0 ? "Aug 27,2024-3:28PM" : "Aug 27,2024-10:28PM"}
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
                  "ETB Cash",
                  "ETB Food",
                  "Credit/Debit Card",
                  "Loyalty",
                  "Gift Card",
                  "Store Credit",
                  "Lottery",
                  "Cash",
                  "Total",
                ].map((header) => (
                  <StyledTableCell key={header}>{header}</StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
          </StyledTable>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
