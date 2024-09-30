import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
//   import LeftArrow from "../../Assests/Dashboard/Left.svg";
import { styled } from "@mui/material/styles";
// import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import DashDateRangeComponent from "../../../reuseableComponents/DashDateRangeComponent";
import VerticalBarChart from "../../Dashboard/VerticalBarChart";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { priceFormate } from "../../../hooks/priceFormate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: "12px",
    paddingLeft: "12px",
    paddingRight: "1px",
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
  // hide last border
  //   "&:last-child td, &:last-child th": {
  //     // border: 0,
  //   },
  "& td, & th": {
    border: "none",
  },
}));

const tableData = [
  {
    store: "Total",
    total: "5000.00",
    col1: "25000.00",
    col2: "2500.00",
    col3: "23000.00",
    col4: "5000.00",
    col5: "86.22%",
    col6: "21000.00",
    col7: "3500.00",
    col8: "20000.00",
    col9: "00.00",
    col10: "00.00",
  },
  {
    store: "Vape Store 1",
    total: "3000",
    col1: "15000.00",
    col2: "1500.00",
    col3: "14000.00",
    col4: "2000.00",
    col5: "98.22%",
    col6: "13500.00",
    col7: "1100.00",
    col8: "15000.00",
    col9: "0.00",
    col10: "0.00",
  },
  {
    store: "Vape Store 3",
    total: "1000",
    col1: "4500.00",
    col2: "450.00",
    col3: "4200.00",
    col4: "1200.00",
    col5: "98.22%",
    col6: "4100.00",
    col7: "900.00",
    col8: "3000.00",
    col9: "0.00",
    col10: "0.00",
  },
  {
    store: "Vape Store 4",
    total: "600",
    col1: "3500.00",
    col2: "30.00",
    col3: "3200.00",
    col4: "1000.00",
    col5: "98.22%",
    col6: "3100.00",
    col7: "800.00",
    col8: "1200.00",
    col9: "0.00",
    col10: "0.00",
  },
  {
    store: "Vape Store 2",
    total: "400",
    col1: "3000.00",
    col2: "30.00",
    col3: "3200.00",
    col4: "800.00",
    col5: "98.22%",
    col6: "3000.00",
    col7: "450.00",
    col8: "800.00",
    col9: "0.00",
    col10: "0.00",
  },
];

const tableRow = [
  { type: "str", name: "title", label: "Location" },
  { type: "num", name: "quantity", label: "Counts Of Sales" },
  { type: "num", name: "upc", label: "Gross Sales" },
  { type: "num", name: "price", label: "Net Discount" },
  { type: "", name: "", label: "Net Sales" },
  { type: "", name: "", label: "Cost" },
  { type: "", name: "", label: "Gross Margin" },
  { type: "", name: "", label: "Gross Profit" },
  { type: "", name: "", label: "Taxes" },
  { type: "", name: "", label: "Cash" },
  { type: "", name: "", label: "Credit" },
  { type: "", name: "", label: "Loyalty Points" },
];

export default function LocationMain({ hide = false }) {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  return (
    <>
    <Grid container sx={{ mt: 2.5 }}>
        {hide ? (
          <DashDateRangeComponent onDateRangeChange={onDateRangeChange} />
        ) : (
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{ mt: 0 }}
      >
        <Grid item xs={12} md={6}>
          <VerticalBarChart title="Top Locations by Sales Count" color="#0A64F9" />
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalBarChart title="Top Locations by Net Sales" color="#FF7700" />
        </Grid>
      </Grid>
      
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableRow.map((col, index) => (
                    <StyledTableCell key={index}>{col.label}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {whiteSpace:"nowrap"}}
                    >
                      {row.store}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {priceFormate(row.total)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col1)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col2)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col3)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col4)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col5)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col6)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col7)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col8)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col9)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      ${priceFormate(row.col10)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
