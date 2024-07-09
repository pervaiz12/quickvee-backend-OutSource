import React, { useEffect, useState } from "react";

import { fetchOrderTypeData } from "../../../Redux/features/OrderType/OrderTypeSlice";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { priceFormate } from "../../../hooks/priceFormate";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PasswordShow from "../../../Common/passwordShow";
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
}));

const Itemdatadetails = ({
  data,
  selectedOrderSource,
  handleGetDetailsClick,
}) => {
  const dispatch = useDispatch();

  const [orderReport, setorderReport] = useState([]);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const orderReportDataState = useSelector((state) => state.orderTypeList);
  console.log("data", orderReportDataState.loading);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    getOrderTypeData();
  }, [dispatch, data]);
  const getOrderTypeData = async () => {
    try {
      await dispatch(fetchOrderTypeData(data)).unwrap();
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    if (!orderReportDataState.loading && orderReportDataState.orderTypeData) {
      setorderReport(orderReportDataState.orderTypeData);
    }
  }, [
    orderReportDataState,
    orderReportDataState.loading,
    orderReportDataState.orderTypeData,
  ]);

  if (!data || data.length === 0) {
    return (
      <Grid container sx={{ padding: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <p>No. Data found.</p>
        </Grid>
      </Grid>
    );
  }

  const renderDataTable = () => {
    if (
      orderReport.success === false &&
      orderReport.message === "No data found for the specified criteria"
    ) {
      return (
        <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
          No data available
        </Grid>
      );
    } else if (orderReport && orderReport.length >= 1) {
      return (
        <>
          <div className="q-attributes-bottom-detail-section text-center">
            <Grid container className="box_shadow_div">
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell># Of Payments</StyledTableCell>
                    <StyledTableCell>Net Revenue Without Tips</StyledTableCell>
                    <StyledTableCell>Tips</StyledTableCell>
                    <StyledTableCell>Net Revenue With Tips</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {orderReport.map((orderReportDa, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <p>{orderReportDa.order_method}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{priceFormate(orderReportDa.total_count)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>
                            ${Number(orderReportDa.amt_without_tip).toFixed(2)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${Number(orderReportDa.tip).toFixed(2)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>
                            ${Number(orderReportDa.amount_with_tip).toFixed(2)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          {/* {selectedOrderSource !== "All" ? (
                          <Link
                            to={`/order/${data.start_date}/${data.end_date}/${data.order_env}/${orderReportDa.order_method}`}
                            target="_blank"
                          >
                            <p className="q-employee-in">Details</p>
                          </Link>
                        ): "-"} */}
                          {selectedOrderSource !== "All" ? (
                            <button>
                              <p className="q-employee-in">View Details</p>
                            </button>
                          ) : (
                            "-"
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </div>
        </>
      );
    }
  };

  return (
    <>
      {/* {orderReportDataState.loading ? (
        <SkeletonTable
          columns={[
            "Name",
            "# Of Payments",
            "Net Revenue Without Tips",
            "Tips",
            "Net Revenue With Tips",
            "Details",
          ]}
        />
      ) : (
        renderDataTable()
      )} */}
      <div className="q-attributes-bottom-detail-section text-center">
        <Grid container className="box_shadow_div">
          {orderReportDataState.loading ? (
            <SkeletonTable
              columns={[
                "Name",
                "# Of Payments",
                "Net Revenue Without Tips",
                "Tips",
                "Net Revenue With Tips",
                "Details",
              ]}
            />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell># Of Payments</StyledTableCell>
                  <StyledTableCell>Net Revenue Without Tips</StyledTableCell>
                  <StyledTableCell>Tips</StyledTableCell>
                  <StyledTableCell>Net Revenue With Tips</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                </TableHead>
                <TableBody>
                  {orderReport.length > 0 ? (
                    orderReport?.map((orderReportDa, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <p>{orderReportDa.order_method}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{priceFormate(orderReportDa.total_count)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>
                            ${Number(orderReportDa.amt_without_tip).toFixed(2)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${Number(orderReportDa.tip).toFixed(2)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>
                            ${Number(orderReportDa.amount_with_tip).toFixed(2)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell className="">
                          {/* {selectedOrderSource !== "All" ? (
                  <Link
                    to={`/order/${data.start_date}/${data.end_date}/${data.order_env}/${orderReportDa.order_method}`}
                    target="_blank"
                  >
                    <p className="q-employee-in">Details</p>
                  </Link>
                ): "-"} */}
                          {selectedOrderSource !== "All" ? (
                            <button
                              onClick={() =>
                                handleGetDetailsClick(
                                  data.start_date,
                                  data.end_date,
                                  data.order_env,
                                  orderReportDa.order_method
                                )
                              }
                            >
                              <p className="q-employee-in whitespace-nowrap">View Details</p>
                            </button>
                          ) : (
                            "-"
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <Grid container>
                      <Grid item sx={{ p: 2.5 }}>
                        <p>No Data Available</p>
                      </Grid>
                    </Grid>
                  )}
                </TableBody>
              </StyledTable>
            </TableContainer>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Itemdatadetails;
