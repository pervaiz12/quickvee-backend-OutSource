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
import NoDataFound from "../../../reuseableComponents/NoDataFound";

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

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    data && getOrderTypeData();
  }, [dispatch, data, selectedOrderSource]);
  const getOrderTypeData = async () => {
    try {
      await dispatch(fetchOrderTypeData(data)).unwrap();
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
    if (!orderReportDataState.loading && orderReportDataState.orderTypeData) {
      setorderReport(orderReportDataState.orderTypeData);
      getTotalRecord(orderReportDataState.orderTypeData);
    }
  }, [
    orderReportDataState,
    orderReportDataState.loading,
    orderReportDataState.orderTypeData,
    data,
  ]);

  const [totalCost, setTotalCost] = useState({
    OfPayments: 0.0,
    withoutTip: 0.0,
    Tip: 0.0,
    withTip: 0.0,
  });


  const getTotalRecord = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const { OfPayments, withoutTip,Tip, withTip } = data.reduce(
        (acc, item) => {
          const OfPayments = item?.total_count || 0;
          const withoutTip = parseFloat(item?.amt_without_tip || 0);
          const Tip = parseFloat(item?.tip || 0);
          const withTip = parseFloat(item?.amount_with_tip || 0);

          return {
            OfPayments: parseInt(acc.OfPayments) + parseInt(OfPayments),
            withoutTip: parseFloat(acc.withoutTip) + withoutTip,
            Tip: parseFloat(acc.Tip) + Tip,
            withTip: parseFloat(acc.withTip) + withTip,
          };
        },
        { OfPayments: 0, withoutTip: 0, Tip: 0, withTip: 0 } // Initial values including totalCost
      );
      setTotalCost({
        OfPayments: OfPayments,
        withoutTip: withoutTip.toFixed(2),
        Tip: Tip.toFixed(2),
        withTip: withTip.toFixed(2),
      });
    } else {
      console.log("No report data available");
    }
  };

  if (!data || data.length === 0) {
    return (
      <Grid container sx={{ padding: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <p>No. Data found.</p>
        </Grid>
      </Grid>
    );
  }


  return (
    <>
      <div className="q-attributes-bottom-detail-section text-center">
        <Grid container className="box_shadow_div">
          {orderReportDataState.loading ? (
            <SkeletonTable
              columns={[
                "Name",
                "# Of Payments",
                "Total without Tips",
                "Tips",
                "Total with Tips",
                "Details",
              ]}
            />
          ) : (
            <>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell># Of Payments</StyledTableCell>
                    <StyledTableCell>Total without Tips</StyledTableCell>
                    <StyledTableCell>Tips</StyledTableCell>
                    <StyledTableCell>Total with Tips</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {orderReport.length > 0 
                      ? orderReport?.map((orderReportDa, index) => (
                        orderReportDa.total_count > 0 &&
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>
                              {orderReportDa.is_online === "1"
                              ? orderReportDa.order_method === "pickup"
                                ? "Online Pickup"
                                : orderReportDa.order_method === "delivery"
                                ? "Online Delivery"
                                : "In-Store"
                              : "In-Store"}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{priceFormate(orderReportDa.total_count)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>
                                $
                                {Number(orderReportDa.amt_without_tip).toFixed(
                                  2
                                )}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>${Number(orderReportDa.tip).toFixed(2)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>
                                $
                                {Number(orderReportDa.amount_with_tip).toFixed(
                                  2
                                )}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell className="">
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
                                  <p className="q-employee-in whitespace-nowrap">
                                    View Details
                                  </p>
                                </button>
                              ) : (
                                "-"
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      : ""}
                      { orderReport.length > 0 ? (
                          <>
                            <StyledTableRow className="trBG_Color">
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport ">Total</p>
                              </StyledTableCell>
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport">
                                  {priceFormate(totalCost?.OfPayments)}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport">{`$${priceFormate(
                                  totalCost?.withoutTip
                                )}`}</p>
                              </StyledTableCell>
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport">{`$${priceFormate(
                                  totalCost?.Tip
                                )}`}</p>
                              </StyledTableCell>
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport">{`$${priceFormate(
                                  totalCost?.withTip
                                )}`}</p>
                              </StyledTableCell>
                              <StyledTableCell className="trBG_Color">
                                <p className=" totalReport "></p>
                              </StyledTableCell>
                            </StyledTableRow>
                          </>
                        ):("")}
                  </TableBody>
                </StyledTable>
              </TableContainer>
              {!orderReport.length && (
                <NoDataFound />
              )}
            </>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Itemdatadetails;
