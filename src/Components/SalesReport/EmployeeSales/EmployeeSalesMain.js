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
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

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
    total: "0",
    col1: "0.00",
    col2: "0.00",
    col3: "0.00",
    col4: "0.00",
  },
  {
    store: "Vendor 1",
    total: "0",
    col1: "0.00",
    col2: "0.00",
    col3: "0.00",
    col4: "0.00",
  },
  {
    store: "Vendor 1",
    total: "0",
    col1: "0.00",
    col2: "0.00",
    col3: "0.00",
    col4: "0.00",
  },
  {
    store: "Vendor 1",
    total: "0",
    col1: "0.00",
    col2: "0.00",
    col3: "0.00",
    col4: "0.00",
  },
  {
    store: "Vendor 1",
    total: "0",
    col1: "0.00",
    col2: "0.00",
    col3: "0.00",
    col4: "0.00",
  },
];

const tableRow = [
  { type: "str", name: "title", label: "User" },
  { type: "num", name: "quantity", label: "Aug 2024" },
  { type: "num", name: "upc", label: "Sep" },
  { type: "num", name: "price", label: "Cost" },
  { type: "", name: "", label: "Net Sales" },
  { type: "", name: "", label: "Gross Margin" },
];

export default function EmployeeSalesMain({ hide = false }) {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Measure");
  const [categoryOptions, setCategoryOptions] = useState([
    "Measure",
    "Avg. items per sale",
    "Avg. sale value",
    "Avg. sale value(incl. tax)",
    "Cost of goods sold",
    "Customer count",
    "Discounted",
    "Discounted (%)",
    "First Sale",
  ]);
  const handleOptionClick = () => {};
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  return (
    <>
      <Grid container sx={{ p: 2.5, mb: 0 }} className="box_shadow_div">
        <Grid item xs={12}>
          <div className="heading">Filter By</div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <label className="q-details-page-label" htmlFor="orderTypeFilter">
            Measure
          </label>
          <SelectDropDown
            listItem={categoryOptions.map((item) => ({
              title: item,
            }))}
            title="title"
            dropdownFor="category"
            selectedOption={selectedCategory}
            onClickHandler={handleOptionClick}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2.5 }}>
        {hide ? (
          <DashDateRangeComponent onDateRangeChange={onDateRangeChange} />
        ) : (
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        )}
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
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
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
