import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderRefundData } from "../../../Redux/features/Reports/OrderRefundReport/OrderRefundReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";

import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
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
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));

const OrderRefundReportList = (props) => {
  // console.log(props)
  const [sortOrder, setSortOrder] = useState("asc");
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [allOrderData, setOrderData] = useState([]);
  const AllOrderRefundData = useSelector((state) => state.OrderRefundList);
  // console.log(AllOrderRefundData)
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getOrderRefundData();
  }, [props]);
  const getOrderRefundData = async () => {
    try {
      if (props && props.selectedDateRange) {
        // const StartDateData = props.selectedDateRange.startDate.toISOString().split('T')[0];
        // const EndDateData = props.selectedDateRange.endDate.toISOString().split('T')[0];

        const StartDateData = props.selectedDateRange.start_date;
        const EndDateData = props.selectedDateRange.end_date;

        let data = {
          merchant_id,
          start_date: StartDateData,
          end_date: EndDateData,
          // category_id: props.categoryId,
          reason_name: props.reasonTitle === "All" ? "all" : props.reasonTitle,
          ...userTypeData,
        };
        console.log(data);
        if (data) {
          await dispatch(fetchOrderRefundData(data)).unwrap();
        }
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    if (!AllOrderRefundData.loading && AllOrderRefundData.OrderRefundData) {
      console.log(AllOrderRefundData.OrderRefundData);
      setOrderData(AllOrderRefundData.OrderRefundData);
    } else {
      setOrderData("");
    }
  }, [
    AllOrderRefundData,
    AllOrderRefundData.loading,
    AllOrderRefundData.OrderRefundData,
  ]);

  const calculateGrandTotal = (allOrderData, key) => {
    // Calculate the grand total for a specific key in the dataset
    return allOrderData.reduce(
      (total, order) => total + parseFloat(order[key]),
      0
    );
  };

  const isAllOrderDataValid =
    Array.isArray(allOrderData) && allOrderData.length > 0;
  function formatAmount(value) {
    // Convert empty or undefined values to 0
    const formattedValue = value || 0;

    // Format the number to have two decimal places
    const roundedValue = Number(formattedValue).toFixed(2);

    return roundedValue;
  }
  const dateFormattedFunction = (createdAtDate) => {
    return new Date(createdAtDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const tableRow = [
    { type: "id", name: "order_id", label: "Order ID" },
    { type: "date", name: "created_at", label: "Date" },
    { type: "str", name: "employee", label: "Employee" },
    { type: "str", name: "reason", label: "Reason" },
    { type: "num", name: "debit_amt", label: "Debit/Credit" },
    { type: "num", name: "cash_amt", label: "Cash" },
    { type: "num", name: "loyalty_point_amt", label: "LP" },
    { type: "num", name: "store_credit_amt", label: "SC" },
    { type: "num", name: "nca_amt", label: "NCA" },
    { type: "num", name: "tip_amt", label: "TIP" },
    { type: "num", name: "amount", label: "Total" },
  ];

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allOrderData,
      type,
      name,
      sortOrder
    );
    setOrderData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {AllOrderRefundData.loading ? (
            <SkeletonTable columns={tableRow.map((item) => item.label)} />
          ) : (
            <>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    {tableRow.map((item, index) => (
                      <StyledTableCell key={index}>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName(item.type, item.name)}
                        >
                          <p>{item.label}</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                    ))}
                  </TableHead>

                  <TableBody>
                    {Array.isArray(allOrderData) &&
                      allOrderData.length > 0 &&
                      allOrderData?.map((CheckData, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <p className="text-[#0A64F9]">
                              <Link
                                to={`/order/store-reporting/order-summary/${merchant_id}/${CheckData.order_id}`}
                                target="_blank"
                              >
                                {CheckData.order_id}{" "}
                              </Link>
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              {dateFormattedFunction(CheckData?.created_at)}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>{CheckData.employee}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>{CheckData.reason}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${priceFormate(formatAmount(CheckData.debit_amt))}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${priceFormate(formatAmount(CheckData.cash_amt))}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              $
                              {priceFormate(
                                formatAmount(CheckData.loyalty_point_amt)
                              )}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              $
                              {priceFormate(
                                formatAmount(CheckData.store_credit_amt)
                              )}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${priceFormate(formatAmount(CheckData.nca_amt))}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${priceFormate(formatAmount(CheckData.tip_amt))}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${priceFormate(formatAmount(CheckData.amount))}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    {allOrderData.length > 0 && (
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>
                          <p
                            style={{
                              color: "#0A64F9",
                            }}
                          >
                            Grand Total
                          </p>
                        </StyledTableCell>
                        <StyledTableCell style={{ color: "#0A64F9" }}>
                          $
                          {parseFloat(
                            calculateGrandTotal(allOrderData, "amount")
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </StyledTable>
              </TableContainer>
              {!isAllOrderDataValid && (
                <div className="box">
                  <div className="q-category-bottom-categories-single-category">
                    <p>No data found</p>
                  </div>
                </div>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {/* 
      {isAllOrderDataValid && (
        <div className="box">
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Order ID</p>
            <p className="report-sort">Date</p>
            <p className="report-sort">Employee</p>
            <p className="report-sort">Reason</p>
            <p className="report-sort">Debit/Credit</p>
            <p className="report-sort">Cash</p>
            <p className="report-sort">LP</p>
            <p className="report-sort">SC</p>
            <p className="report-sort">NCA</p>
            <p className="report-sort">TIP</p>
            <p className="report-sort">Total</p>
       
          </div>
        </div>
      )} */}

      {/* {isAllOrderDataValid ? (
        <>
          {allOrderData.map((CheckData, index) => {
            return (
              <div className="box">
                <div
                  key={index}
                  className="q-category-bottom-categories-listing"
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-title">{CheckData.order_id}</p>
                    <p className="report-title">
                      {dateFormattedFunction(CheckData?.created_at)}
                    </p>
                    <p className="report-title">{CheckData.employee}</p>
                    <p className="report-title">{CheckData.reason}</p>
                    <p className="report-title">
                      ${formatAmount(CheckData.debit_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.cash_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.loyalty_point_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.store_credit_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.nca_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.tip_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        
          <div className="box">
            <div className="q-category-bottom-categories-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title"></p>
                <p className="report-title"></p>
                <p className="report-title">Grand Total</p>
                
                <p className="report-title">
                  $
                  {parseFloat(
                    calculateGrandTotal(allOrderData, "amount")
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="box">
          <div className="q-category-bottom-categories-single-category">
            <p>No data found</p>
          </div>
        </div>
      )} */}
    </>
  );
};

export default OrderRefundReportList;
