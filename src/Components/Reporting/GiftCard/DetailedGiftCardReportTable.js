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
import React, { useEffect, useState } from "react";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { useSelector } from "react-redux";
import { priceFormate } from "../../../hooks/priceFormate";
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

export default function DetailedGiftCardReportTable({
  totalValueIssued,
  totalValueRedeemed,
  outStandingsBalance,
  setTotalValueIssued,
  setTotalValueRedeemed,
  setOutStandingsBalance,
}) {
  const GiftCardReportDataState = useSelector(
    (state) => state.GiftCardReportList
  );
  const [dataArr, setDataArr] = useState([]);

  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    if (
      !GiftCardReportDataState.loading &&
      GiftCardReportDataState.GiftCardReportData
    ) {
      setTotalValueIssued(GiftCardReportDataState?.TotalDebit);
      setTotalValueRedeemed(GiftCardReportDataState?.TotalCredit);
      setOutStandingsBalance(GiftCardReportDataState?.Totalbalance);
      setDataArr(GiftCardReportDataState.GiftCardReportData);
    } else {
      setDataArr([]);
    }
  }, [GiftCardReportDataState, GiftCardReportDataState.GiftCardReportData]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate}`;
  };

  const tableRow = [
    { type: "str", name: "number", label: "Gift Card Number" },
    // { type: "str", name: "created_at", label: "Date Sold" },
    { type: "num", name: "total_debit", label: "Total Sold" },
    { type: "num", name: "total_credit", label: "Total Redeemed" },
    { type: "num", name: "total_balance", label: "Balance" },
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
      <Grid
        container
        className="box_shadow_div"
        style={{ display: "inlineBlock" }}
      >
        {GiftCardReportDataState.loading ||
        (GiftCardReportDataState.status && !dataArr.length) ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <Grid container>
            <Grid item xs={12}>
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
                              <p>{item.number}</p>
                            </StyledTableCell>
                            {/* <StyledTableCell>
                              <p>{formatDateTime(item.created_at) || "-"}</p>
                            </StyledTableCell> */}
                            <StyledTableCell>
                              <p>${priceFormate(item.total_debit)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>${priceFormate(item.total_credit)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>${priceFormate(item.total_balance)}</p>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    {dataArr.length > 0 && (
                      <StyledTableRow>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-sort totalReport">Total</p>
                        </StyledTableCell>
                        {/* <StyledTableCell className="trBG_Color"></StyledTableCell> */}
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            <p>${priceFormate(totalValueIssued || "0.00")}</p>
                          </p>
                        </StyledTableCell>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            <p>${priceFormate(totalValueRedeemed || "0.00")}</p>
                          </p>
                        </StyledTableCell>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            <p>
                              ${priceFormate(outStandingsBalance || "0.00")}
                            </p>
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </StyledTable>
                {!dataArr.length && <NoDataFound />}
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
