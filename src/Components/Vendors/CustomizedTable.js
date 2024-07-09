import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "./../../Assests/Vendors/DeleteIcon.svg";
import { priceFormate } from "../../hooks/priceFormate";

import EditTransactionAmountRemark from "./EditTransactionAmountRemark";
import { useState } from "react";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import sortIcon from "../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
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

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  return `${formattedDate} ${formattedTime}`;
};

export default function CustomizedTable({
  tableRowData,
  vendorDetails,
  handleDeleteClick,
  dateRangeState,
  handleGetReport,
  total,
  setTotal,
  loading,
  setVendorDetails,
}) {
  const totalFormatted = total && total.toFixed(2);
  const [sortOrder, setSortOrder] = useState("asc");
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      vendorDetails,
      type,
      name,
      sortOrder
    );
    setVendorDetails(sortedItems);
    setSortOrder(newOrder);
  };

  return (
    <>
      {loading ? (
        <>
          <SkeletonTable columns={tableRowData} />
        </>
      ) : (
        <>
          <TableContainer sx={{borderTopLeftRadius:"0",borderTopRightRadius:"0"}} component={Paper}>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* {tableRowData.map((row) => (
                    <StyledTableCell>{row}</StyledTableCell>
                  ))} */}
                  <StyledTableCell>Sr No.</StyledTableCell>
                  <StyledTableCell>
                    <button
                      className="flex items-center"
                      onClick={() => sortByItemName("num", "pay_amount")}
                    >
                      <p className="whitespace-nowrap">Amount</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                      className="flex items-center"
                      onClick={() => sortByItemName("date", "updated_datetime")}
                    >
                      <p className="whitespace-nowrap">Transaction Date</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                      className="flex items-center"
                      onClick={() => sortByItemName("str", "remark")}
                    >
                      <p className="whitespace-nowrap">Remark</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendorDetails && vendorDetails.length > 0 ? (
                  vendorDetails.map((vendor, index) => {
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>
                            {vendor.pay_amount
                              ? `$${priceFormate(vendor.pay_amount)}`
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {formatDateTime(vendor.updated_datetime)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {vendor.remark || "-"}
                          </StyledTableCell>
                          <StyledTableCell>
                            <EditTransactionAmountRemark
                              vendor={vendor}
                              dateRangeState={dateRangeState}
                              handleGetReport={handleGetReport}
                              setTotal={setTotal}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <img
                              src={DeleteIcon}
                              onClick={() => {
                                handleDeleteClick(vendor.id, vendor.vendor_id);
                              }}
                              className="cursor-pointer"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })
                ) : (
                  <div className="p-3">
                    <p>No record found.</p>
                  </div>
                )}
                {vendorDetails.length > 0 ? (
                  <StyledTableRow>
                    <StyledTableCell>
                      <p className="text-[#0A64F9]">total</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="text-[#0A64F9]">
                        ${priceFormate(totalFormatted)}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                ) : (
                  ""
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </>
      )}
    </>
  );
}
