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
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
  
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
      store: ["total"],
      total: "1390",
      col1: "3275",
      col2: "37833.86",
      col3: "2.4",
      col4: "26.06%",
      col5: "",
    },
    {
      store: ["John Smith","158-259-6853","john@gmail.com"],
      total: "1390",
      col1: "3275",
      col2: "37833.86",
      col3: "2.4",
      col4: "26.06%",
      col5: "0.00%",
    },
    {
      store:["John Smith","158-259-6853","john@gmail.com"],
      total: "1390",
      col1: "3275",
      col2: "37833.86",
      col3: "2.4",
      col4: "26.06%",
      col5: "0.00%",
    },
   
  ];
  
  const tableRow = [
    { type: "str", name: "title", label: "Customer info" },
    { type: "num", name: "quantity", label: "Sales Count" },
    { type: "num", name: "upc", label: "Quantity Sold" },
    { type: "num", name: "price", label: "Sales Amount" },
    { type: "", name: "", label: "Avg. Item Per Sale" },
    { type: "", name: "", label: "Avg. Sale Amount" },
    { type: "", name: "", label: "Last Sale Date" },
  ];
  
  export default function CustomerReportMain({ hide = false }) {
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryOptions, setCategoryOptions] = useState([1, 2, 4, 5]);
    const handleOptionClick = () => {};
    const onDateRangeChange = (dateRange) => {
      setSelectedDateRange(dateRange);
    };



    const [searchRecord, setSearchRecord] = useState("");
    const handleSearchInputChange = (value) => {
      setSearchRecord(value);
  
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
            <VerticalBarChart title="Top Vendors by Quantity Sold" color="#0A64F9" />
          </Grid>
          <Grid item xs={12} md={6}>
            <VerticalBarChart title="Top Vendors by Sales Amount" color="#FF7700" />
          </Grid>
        </Grid>
  
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <Grid container sx={{ padding: 2.5 }}>
              <Grid item xs={12}>
                <InputTextSearch
                  className=""
                  type="text"
                  value={searchRecord}
                  handleChange={handleSearchInputChange}
                  placeholder="Search customers by phone number, name, email"
                  autoComplete="off"
                />
              </Grid>
          </Grid>

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
                        {row.store.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {priceFormate(row.total)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {priceFormate(row.col1)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        ${priceFormate(row.col2)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {priceFormate(row.col3)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {priceFormate(row.col4)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {priceFormate(row.col5)}
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
  