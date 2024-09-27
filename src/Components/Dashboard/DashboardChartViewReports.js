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
import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import LeftArrow from "../../Assests/Dashboard/Left.svg";
import { styled } from "@mui/material/styles";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { getSelectedData, useAuthDetails } from "../../Common/cookiesHelper";
import dayjs from "dayjs";
import axios from "axios";

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

const CustomButton = styled(Button)(({ theme }) => ({
  height: "40px",
  width: "94.5px",
  border: "1px solid #E1E1E1", // Custom border
  fontFamily: "CircularRegular",
  fontSize: "14px",
  textTransform: "none",
}));

const productFilterByList = [
  "Main Outlet",
  "Sub Outlet",
  "Outlet",
  "Store",
  "Customer",
  "User",
];

const tableRow = [
  { type: "str", name: "title", label: "Outlet" },
  { type: "num", name: "quantity", label: "Jun 24" },
  { type: "num", name: "upc", label: "Jul 24" },
  { type: "num", name: "price", label: "Aug 24" },
  { type: "", name: "", label: "Sep 24" },
  { type: "", name: "", label: "Oct 24" },
  { type: "", name: "", label: "Nov 24" },
];

const tableData = [
  {
    store: "Total",
    total: "$0.00",
    col1: "$0.00",
    col2: "$0.00",
    col3: "$1800.00",
    col4: "$0.00",
    col5: "$0.00",
    col6: "$6000.00",
    col7: "$7800.00",
  },
  {
    store: "Vape Store 1",
    total: "$0.00",
    col1: "$0.00",
    col2: "$0.00",
    col3: "$1800.00",
    col4: "$0.00",
    col5: "$0.00",
    col6: "$6000.00",
    col7: "$7800.00",
  },
  {
    store: "Vape Store 3",
    total: "$0.00",
    col1: "$0.00",
    col2: "$0.00",
    col3: "$0.00",
    col4: "$0.00",
    col5: "$0.00",
    col6: "$6000.00",
    col7: "$0.00",
  },
  {
    store: "Vape Store 4",
    total: "$0.00",
    col1: "$0.00",
    col2: "$0.00",
    col3: "$0.00",
    col4: "$0.00",
    col5: "$0.00",
    col6: "$0.00",
    col7: "$0.00",
  },
  {
    store: "Vape Store 2",
    total: "$0.00",
    col1: "$0.00",
    col2: "$0.00",
    col3: "$0.00",
    col4: "$0.00",
    col5: "$0.00",
    col6: "$0.00",
    col7: "$0.00",
  },
];

export default function DashboardChartViewReports() {
  let { state } = useLocation();
  let curr_date = dayjs().format("YYYY-MM-DD");
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const [revenueRecord, setRevenueRecord] = useState([]);
  const [getDateMonth, setGetMonth] = useState([]);
  console.log("LoginGetDashBoardRecordJson", LoginGetDashBoardRecordJson);
  console.log("userTypeData", userTypeData);
  let merchant_id = !!LoginGetDashBoardRecordJson?.data?.merchant_id
    ? LoginGetDashBoardRecordJson?.data?.merchant_id
    : "";
  let email = !!LoginGetDashBoardRecordJson?.data?.email
    ? LoginGetDashBoardRecordJson?.data?.email
    : "";
  let token_id = !!LoginGetDashBoardRecordJson?.token_id
    ? LoginGetDashBoardRecordJson?.token_id
    : "";
  let token = !!LoginGetDashBoardRecordJson?.token
    ? LoginGetDashBoardRecordJson?.token
    : "";

  // console.log(state?.activeType);
  const [activeType, setActiveType] = useState(state?.activeType);
  const [selectedOption, setSelectedOption] = useState("Main Outlet");
  const handleOptionClick = (option) => {
    setSelectedOption(option.title);
  };
  useEffect(() => {
    getRecord();
    // console.log("response", response);
    // console.log("merchant_id", merchant_id);
    // console.log("token_id", token_id);
    // console.log("token", token);
  }, [activeType]);
  const getRecord = async () => {
    let getDateForm = getSelectedData(curr_date, activeType);
    let data = {
      merchant_id,
      date_range: getDateForm?.getDate,
      email,
      token_id,
      // token,
    };
    // console.log(":getDateForm", getDateForm);
    const formattedDates = getDateForm?.allMonth?.map((date) => {
      const options = { month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    });
    console.log("formattedDates", formattedDates);
    formattedDates.unshift("Outlet");
    formattedDates.push("Total");
    setGetMonth(formattedDates);
    let response = await axios.post(
      "https://production.quickvee.net/ReportingReactapi/revenue_data_api_outlet",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // setGetMonth,setRevenueRecord
    console.log("response", response);
    if (response?.data?.status == true) {
    }
  };
  return (
    <>
      <Grid item xs={12}>
        <Grid
          onClick={() => window.history.back()}
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img src={LeftArrow} alt="left-arrow" />
          <h1 style={{ marginBottom: 0 }} className="heading">
            Revenue
          </h1>
        </Grid>
      </Grid>
      <Grid
        container
        className="box_shadow_div q-attributes-bottom-header"
        justifyContent="start"
        gap={3}
        sx={{ mt: 2 }}
      >
        <Grid item>
          <div className="q-add-categories-single-input">
            <label for="description">View</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["Day", "Week", "Month"].map((type) => (
                <span
                  key={type}
                  className={`single-box-type ${
                    type === activeType ? "active" : ""
                  }`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <label style={{ whiteSpace: "nowrap" }}>Outlet</label>
          <div className="mt-2">
            <SelectDropDown
              // heading={"All"}
              title={"title"}
              listItem={productFilterByList.map((item) => ({
                title: item,
              }))}
              // selectedOption={productByImages}
              selectedOption={selectedOption}
              onClickHandler={handleOptionClick}
              dropdownFor={"outlets"}
              // disabled={loading}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>aauaau</StyledTableCell> */}
                  {getDateMonth?.map((col, index) => (
                    <StyledTableCell key={index}>{col}</StyledTableCell>
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
                      {row.col1}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {row.col2}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {row.col3}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {row.col4}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {row.col5}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={index === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {row.total}
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
