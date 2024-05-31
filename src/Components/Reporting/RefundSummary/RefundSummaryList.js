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
  const dispatch = useDispatch();
  const [refundata, setrefundData] = useState("");
  const RefundReportData = useSelector((state) => state.RefundDataList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (data) {
      let fetdata = {
        ...data,
        ...userTypeData,
        merchant_id,
      };
      dispatch(fetchRefundData(fetdata));
    }
  }, [data]);

  useEffect(() => {
    if (!RefundReportData.loading && RefundReportData?.refundreportData) {
      setrefundData(RefundReportData.refundreportData);
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
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };
      return (
        <>
          <Grid container className="box_shadow_div">
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Item Name</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Reason</StyledTableCell>
                  <StyledTableCell>Refund Qty</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                </TableHead>
                <TableBody>
                  {refundata.map((data, dataIndex) => (
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
                          <p>{data.refund_qty}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${(data.refund_qty * data.price).toFixed(2)}</p>
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
                        {totalAmt}
                      </StyledTableCell>

                      <StyledTableCell>
                        <p style={{ color: "#0A64F9" }}>
                          ${totalRefundAmount.toFixed(2)}
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
