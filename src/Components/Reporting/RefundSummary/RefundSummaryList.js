import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { fetchRefundData } from "../../../Redux/features/Reports/RefundReport/RefundReportSlice";
import { priceFormate } from "../../../hooks/priceFormate";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
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

const RefundSummaryList = ({ data }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [refundata, setrefundData] = useState([]);
  const [totalRefundAmountState, setTotalRefundAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const RefundReportData = useSelector((state) => state.RefundDataList);
  const [sortOrder, setSortOrder] = useState("asc");
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getRefundData();
  }, [data]);
  const getRefundData = async () => {
    try {
      if (data) {
        let fetdata = {
          ...data,
          ...userTypeData,
          merchant_id,
        };
        await dispatch(fetchRefundData(fetdata)).unwrap();
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
    if (
      !RefundReportData.loading &&
      Array.isArray(RefundReportData?.refundreportData) &&
      RefundReportData.refundreportData.length > 0
    ) {
      const updatedItems = RefundReportData.refundreportData.map((item) => ({
        ...item,
        total: (item.refund_qty * item.price).toFixed(2),
      }));
      setrefundData(updatedItems);
      const totalAmt = updatedItems.reduce(
        (total, report) => total + parseFloat(report.refund_qty),
        0
      );
      setTotal(totalAmt);
      const totalRefundAmount = updatedItems.reduce(
        (total, report) => total + report.refund_qty * report.price,
        0
      );
      setTotalRefundAmount(totalRefundAmount);
    } else {
      setrefundData("");
    }
  }, [
    RefundReportData,
    RefundReportData.loading,
    RefundReportData.refundreportData,
  ]);

  const tableRow = [
    { type: "str", name: "name", label: "Item Name" },
    { type: "str", name: "f_name", label: "Employee Name" },
    { type: "date", name: "create_date", label: "Date" },
    { type: "str", name: "reason", label: "Reason" },
    { type: "num", name: "refund_qty", label: "Refund Qty" },
    { type: "num", name: "total", label: "Total" },
  ];
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      refundata,
      type,
      name,
      sortOrder
    );
    setrefundData(sortedItems);
    setSortOrder(newOrder);
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        {RefundReportData.loading ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                {tableRow.map((item, index) => (
                  <StyledTableCell key={index}>
                    <button
                      className="flex items-center"
                      onClick={() => sortByItemName(item.type, item.name)}
                    >
                      <p>{item.label}</p>
                      <img src={sortIcon} alt="sortImage" className="pl-1" />
                    </button>
                  </StyledTableCell>
                ))}
              </TableHead>

              <TableBody>
                {refundata && refundata.length > 0 ? (
                  refundata.map((data, dataIndex) => (
                    <>
                      <StyledTableRow>
                        <StyledTableCell>
                          <p>{data.name}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          {data?.f_name || data?.l_name ? (
                            <p>
                              {data?.f_name || ""} {data?.l_name || ""}
                            </p>
                          ) : (
                            ""
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{formatDate(data.create_date)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{data.reason}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{priceFormate(data.refund_qty)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(data.total)}</p>
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  ))
                ) : (
                  ""
                )}
                {refundata && (
                  <StyledTableRow className="trBG_Color">
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      <p className="totalReport">
                        Total
                      </p>
                    </StyledTableCell>
                    <StyledTableCell >
                    <p className="totalReport">{priceFormate(total)} </p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <p className="totalReport">
                        ${priceFormate(totalRefundAmountState.toFixed(2))}
                      </p>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </StyledTable>
            {!refundata.length && <NoDataFound />}
          </TableContainer>
        )}
      </Grid>
    </>
  );
};

export default RefundSummaryList;
