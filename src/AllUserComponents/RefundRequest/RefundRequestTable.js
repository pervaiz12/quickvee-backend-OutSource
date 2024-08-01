import React, { useEffect, useState } from "react";
import {
  Grid,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import sortIcon from "../../Assests/Category/SortingW.svg";
import Pagination from "../Users/UnverifeDetails/Pagination";
import { priceFormate } from "../../hooks/priceFormate";
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
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));
export default function RefundRequestTable({
  currentPage,
  totalCount,
  rowsPerPage,
  paginate,
  setRowsPerPage,
  setCurrentPage,
  setTotalCount,
}) {
  const RefundRequestReduxState = useSelector(
    (state) => state.RefundRequestList
  );
  const [dataArr, setDataArr] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (
      !RefundRequestReduxState.loading &&
      RefundRequestReduxState.RefundRequestArr
    ) {
      setDataArr(RefundRequestReduxState.RefundRequestArr);
    } else {
      setDataArr([]);
    }
  }, [RefundRequestReduxState, RefundRequestReduxState.RefundRequestArr]);

  useEffect(() => {
    if (
      !RefundRequestReduxState.loading &&
      RefundRequestReduxState.RefundRequestCount
    ) {
      setTotalCount(RefundRequestReduxState.RefundRequestCount);
    } else {
      setTotalCount(0);
    }
  }, [RefundRequestReduxState, RefundRequestReduxState.RefundRequestCount]);
  const tableRow = [
    { type: "str", name: "merchant_name", label: "Merchant Name" },
    { type: "date", name: "order_date_time", label: "Order Date And Time" },
    { type: "str", name: "merchant_id", label: "Merchat Id" },
    { type: "num", name: "refund_amt", label: "Refund Amount" },
    { type: "str", name: "order_id", label: "Order Id" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      dataArr,
      type,
      name,
      sortOrder
    );
    setDataArr(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        {RefundRequestReduxState.loading ||
        (RefundRequestReduxState.status && !dataArr.length) ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <>
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
                    data={dataArr}
                  />
                </Grid>
              </Grid>

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
                    {dataArr.length > 0 &&
                      dataArr?.map((item, index) => (
                        <>
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>{item.merchant_name}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{item.order_date_time}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{item.merchant_id}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>${priceFormate(item.refund_amt)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link
                                className="whitespace-nowrap text-[#0A64F9]"
                                to={`/unapprove/refund-request/order-summary/${item.merchant_id}/${item?.order_id}`}
                                // onClick={() => handleSummeryPage(row.order_id)}
                                target="_blank"
                              >
                                <p>{item.order_id}</p>
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
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
                    data={dataArr}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
