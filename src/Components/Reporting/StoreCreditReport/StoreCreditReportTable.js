import {
  Grid,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
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
export default function StoreCreditReportTable() {
 
  const tableRow = [
    { type: "date", name: "created_at", label: "Customer" },
    { type: "num", name: "amount", label: "Total issued" },
    { type: "num", name: "amount", label: "Total redeemed" },
    { type: "num", name: "amount", label: "Balance" },
  ];
  // const sortByItemName = (type, name) => {
  //   const { sortedItems, newOrder } = SortTableItemsHelperFun(
  //     PayinReportData,
  //     type,
  //     name,
  //     sortOrder
  //   );
  //   setPayinReportData(sortedItems);
  //   setSortOrder(newOrder);
  // };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                {tableRow.map((item, index) => (
                  <StyledTableCell key={index}>
                    <button
                      className="flex items-center"
                      // onClick={() => sortByItemName(item.type, item.name)}
                    >
                      <p>{item.label}</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>
                ))}
              </TableHead>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
