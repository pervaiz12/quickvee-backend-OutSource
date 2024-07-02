import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorSalesData } from "../../../Redux/features/Reports/VendorSales/VendorSalesSlice";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { priceFormate } from "../../../hooks/priceFormate";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import SortIconW from "../../../Assests/Category/SortingW.svg";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const VendorSalesReportList = (props) => {
  const dispatch = useDispatch();
  const [allVendorData, setallVendorData] = useState("");
  const AllVendorDataState = useSelector((state) => state.VendorSalesList);
  const [sortOrder, setSortOrder] = useState("asc");
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  // console.log(AllVendorDataState)
  useEffect(() => {
    if (props && props.selectedDateRange) {
      // console.log(props.selectedDateRange)
      // console.log(props.selectedDateRange)
      // const StartDateData = props.selectedDateRange.startDate.toISOString().split('T')[0];
      // const EndDateData = props.selectedDateRange.endDate.toISOString().split('T')[0];
      const StartDateData = props.selectedDateRange.start_date;
      const EndDateData = props.selectedDateRange.end_date;

      let data = {
        merchant_id: merchant_id,
        start_date: StartDateData,
        end_date: EndDateData,
        vendor_id: props.VendorIdData,
      };
      // console.log(data)
      if (data) {
        dispatch(fetchVendorSalesData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (!AllVendorDataState.loading && AllVendorDataState.VendorSalesData) {
      // console.log(AllVendorDataState.VendorSalesData)
      setallVendorData(AllVendorDataState.VendorSalesData);
    } else {
      setallVendorData("");
    }
  }, [
    AllVendorDataState,
    AllVendorDataState.loading,
    AllVendorDataState.VendorSalesData,
  ]);

  const calculateTotal = (vendorData) => {
    // Calculate the total amount for a specific vendor
    return vendorData.reduce(
      (total, salesData) => total + parseFloat(salesData.pay_amount),
      0
    );
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };
  const sortByItemName = (type, name) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const updatedAllVendorsData = Object.fromEntries(
      Object.entries(allVendorData).map(([data, items]) => {
        const { sortedItems } = SortTableItemsHelperFun(
          items,
          type,
          name,
          sortOrder
        );
        return [data, sortedItems];
      })
    );
    setallVendorData(updatedAllVendorsData);
    setSortOrder(newOrder);
  };
  return (
    <>
      {allVendorData && Object.keys(allVendorData).length >= 1 ? (
        <>
          {/* <div className="box">
            <div className="q-category-bottom-categories-listing"> */}
          {Object.entries(allVendorData).map(([vendorName, vendorIndex]) => (
            <React.Fragment key={vendorName}>
              <Grid container className="box_shadow_div">
                <Grid item xs={12}>
                  <div className="q-attributes-bottom-header bg-[#ffffff] ">
                    <span>{vendorName}</span>
                  </div>
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        {/* <StyledTableCell>
                          <p>Sr. No</p>
                        </StyledTableCell> */}
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("date", "payment_datetime")
                            }
                          >
                            <p>Transaction Date</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "remark")}
                          >
                            <p>Description</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("num", "pay_amount")}
                          >
                            <p>Amount</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {vendorIndex?.map((salesData, index) => (
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell>
                              <p>{`${index + 1}`}</p>
                            </StyledTableCell> */}
                            <StyledTableCell>
                              <p>
                                {formatDateTime(salesData.payment_datetime)}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{salesData.remark}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>
                                $
                                {priceFormate(
                                  parseFloat(salesData.pay_amount).toFixed(2)
                                )}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                        <StyledTableRow>
                          {/* <StyledTableCell> </StyledTableCell> */}
                          <StyledTableCell> </StyledTableCell>
                          <StyledTableCell align="right">
                            <p style={{ color: "#0A64F9" }}>Total</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p style={{ color: "#0A64F9" }}>
                              $
                              {priceFormate(
                                parseFloat(
                                  calculateTotal(allVendorData[vendorName])
                                ).toFixed(2)
                              )}{" "}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                </Grid>
              </Grid>
              {/* <h2 className="q-category-bottom-categories-single-category">
                {vendorName}
              </h2>
              <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Sr. No</p>
                <p className="report-sort">Transaction Date</p>
                <p className="report-sort">Remark</p>
                <p className="report-sort">Amount</p>
         
              </div>
              {allVendorData[vendorName].map((salesData, index) => (
                <div
                  key={index}
                  className="q-category-bottom-categories-single-category"
                >
                  <p className="report-title">{`${index + 1}`}</p>
                  <p className="report-title">{salesData.payment_datetime}</p>
                  <p className="report-title">{salesData.remark}</p>
                  <p className="report-title">
                    ${parseFloat(salesData.pay_amount).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">
                  Total: $
                  {parseFloat(
                    calculateTotal(allVendorData[vendorName])
                  ).toFixed(2)}
                </p>
              </div> */}
            </React.Fragment>
          ))}
        </>
      ) : (
        <div className="box">
          <div className="q-category-bottom-categories-single-category">
            <p>No data found</p>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorSalesReportList;
