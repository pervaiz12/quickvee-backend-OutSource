import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import Pagination from "../../../AllUserComponents/Users/UnverifeDetails/Pagination";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import { Link } from "react-router-dom";

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
    
  },
  "& td, & th": {
    border: "none",
  },
  "& td, & th": {
    border: "none",
  },
}));

export default function OrderDetailTableList({
  orderDetailDataList,
  totalCount,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  paginate,
  loading,
  merchant_id,
}) {
  function capitalizeFirstLetter(string, payemnt, status) {
    
    return payemnt == "Cash" && status == "5"
      ? "Cancelled"
      : payemnt == "Cash"
        ? "Cash-Paid"
        : "Online-Paid";
    
  }
  const orderStatus = (data) => {
    let PayStatus = "";
    let OrderStatus = "";

    if (data.m_status == 5) {
      OrderStatus = "Cancelled";
    } else if (data.m_status == "7") {
      OrderStatus = "Refunded";
    } else if (data.m_status === "4" && data.order_method === "pickup") {
      OrderStatus = "Completed";
    } else if (data.m_status === "4" && data.order_method == "delivery") {
      OrderStatus = "Delivered";
    } else if (data.payment_id === "Cash") {
      OrderStatus = "Cash";
    } else {
      OrderStatus = "Online-Paid";
    }
    return OrderStatus;
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={paginate}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
                showEntries={true}
                data={orderDetailDataList}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <SkeletonTable
                  columns={["Customer", "Order", "Amount", "Order Status"]}
                />
              ) : (
                <>
                  <TableContainer
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <StyledTable>
                      <TableHead>
                        <StyledTableCell>
                          <p className="whitespace-nowrap">Customer</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>Order</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>Amount</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>Order Status</p>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {orderDetailDataList &&
                        orderDetailDataList.length > 0 ? (
                          orderDetailDataList.map((data, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <p className="text-[#000000] order_method">
                                  {data.deliver_name || data.billing_name || ""}
                                  {data?.customer_type ? (
                                    <span className="existignCustomerData">
                                      ({data?.customer_type})
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                                <p className="text-[#818181]">
                                  {data.email || ""}
                                </p>
                                <p className="text-[#818181]">
                                  {data.delivery_phn || ""}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="text-[#000000] order_method">
                                  {data.order_id || ""}
                                </p>
                                <p className="text-[#818181]">
                                  {data.merchant_time || ""}
                                </p>
                                <p className="text-[#818181] order_method">
                                  {data.order_method || ""}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>{"$" + data.amt || ""}</p>
                                <p className="existignCustomerData1">
                                  {capitalizeFirstLetter(
                                    data.order_status || "",
                                    data.payment_id || "",
                                    data.m_status
                                  )}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                {orderStatus(data)}
                              </StyledTableCell>
                              <StyledTableCell>
                                <Link
                                  className="whitespace-nowrap text-[#0A64F9]"
                                  to={`/order/store-reporting/order-summary/${merchant_id}/${data?.order_id}`}
                                  
                                  target="_blank"
                                >
                                  View Details
                                  
                                  
                                </Link>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sx={{ p: 2.5 }}>
                              <p>No Data Available</p>
                            </Grid>
                          </Grid>
                        )}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={paginate}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
                showEntries={false}
                data={orderDetailDataList}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
