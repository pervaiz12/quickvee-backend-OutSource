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
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDBook !important",
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

const RefundSummaryList = ({ data }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const dispatch = useDispatch();
  const [refundata, setrefundData] = useState([]);
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
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };

  useEffect(() => {
    if (
      !RefundReportData.loading &&
      Array.isArray(RefundReportData?.refundreportData) &&
      RefundReportData.refundreportData.length > 0
    ) {
      console.log("Refunding", RefundReportData?.refundreportData);
      const updatedItems = RefundReportData.refundreportData.map((item) => ({
        ...item,
        total: (item.refund_qty * item.price).toFixed(2),
      }));
      setrefundData(updatedItems);
      // setrefundData(RefundReportData.refundreportData);
    } else {
      setrefundData("");
    }
  }, [
    RefundReportData,
    RefundReportData.loading,
    RefundReportData.refundreportData,
  ]);

  if (!refundata || refundata.length === 0) {
    return (
      <>
        <Grid container sx={{ padding: 2.5 }} className="box_shadow_div ">
          <Grid item xs={12}>
            No data Found.
          </Grid>
        </Grid>
      </>
    );
  }

  const renderDataTable = () => {
    if (refundata && refundata.length >= 1) {
      const totalAmt = refundata.reduce(
        (total, report) => total + parseFloat(report.refund_qty),
        0
      );
      const totalRefundAmount = refundata.reduce(
        (total, report) => total + report.refund_qty * report.price,
        0
      );
      const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
          "en-US",
          options
        );
        return formattedDate;
      };

      const tableRow = [
        { type: "str", name: "name", label: "Item Name" },
        { type: "date", name: "create_date", label: "Date" },
        { type: "str", name: "reason", label: "Reason" },
        { type: "num", name: "refund_qty", label: "Refund Qty" },
        { type: "num", name: "total", label: "Total" },
      ];

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
                  {refundata &&
                    refundata.length > 0 &&
                    refundata.map((data, dataIndex) => (
                      <>
                        <StyledTableRow>
                          <StyledTableCell>
                            <p>{data.name}</p>
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
                            {/* <p>${priceFormate((data.refund_qty * data.price).toFixed(2))}</p> */}
                            <p>${priceFormate(data.total)}</p>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  {refundata && (
                    <StyledTableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>
                        <p
                          style={{
                            color: "#0A64F9",
                          }}
                        >
                          Total
                        </p>
                      </StyledTableCell>
                      <StyledTableCell style={{ color: "#0A64F9" }}>
                        {priceFormate(totalAmt)}
                      </StyledTableCell>

                      <StyledTableCell>
                        <p style={{ color: "#0A64F9" }}>
                          ${priceFormate(totalRefundAmount.toFixed(2))}
                        </p>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default RefundSummaryList;
