import React, { useEffect, useState } from "react";
import { fetchPaymentMethodReportData } from "../../../Redux/features/PaymentMethodReport/PaymentMethodSlice";

import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { priceFormate } from "../../../hooks/priceFormate";
import PasswordShow from "../../../Common/passwordShow";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
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
    
  },
  "&:last-child td, &:last-child th": {
    backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));

const PaymentMethodList = ({ data }) => {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const [paymentReport, setpaymentReport] = useState([]);
  const [total, setTotal] = useState(0);
  console.log("paymentReport", paymentReport);
  const paymentReportDataState = useSelector(
    (state) => state.paymentDetailReport
  );

  useEffect(() => {
    fetchPaymentReportData();
  }, [data]);

  const fetchPaymentReportData = async () => {
    try {
      let newData = { ...data };
      if (newData?.merchant_id) {
        await dispatch(fetchPaymentMethodReportData(newData)).unwrap();
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
      !paymentReportDataState.loading &&
      paymentReportDataState.paymentMethodData
    ) {
      const arr = Object.keys(paymentReportDataState?.paymentMethodData).map(
        (key) => ({
          card_type: key,
          amt: paymentReportDataState?.paymentMethodData[key],
        })
      );
      console.log("arr");
      setpaymentReport(arr);
      const gotTotal = arr.reduce((acc, item) => {
        console.log("item.amt",item.amt,"acc",acc)
        return acc + (isNaN(parseFloat(item.amt)) ? 0 : parseFloat(item.amt));
      }, 0);
      setTotal(gotTotal);
      console.log("gotTotal", gotTotal);
    }
  }, [
    paymentReportDataState,
    paymentReportDataState.loading,
    paymentReportDataState.paymentMethodData,
  ]);

  
  








  

  return (
    <>
      <Grid container style={{ marginBottom: 0 }} className="box_shadow_div">
        <Grid item xs={12}>
          {paymentReportDataState.loading ? (
            <SkeletonTable columns={["Card type", "Total"]} />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Card type</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                </TableHead>
                <TableBody>
                  {total ? (
                    paymentReport.map((paymentData, index) => {
                      if (paymentData.amt > 0) {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p className="report-title">
                                {paymentData.card_type}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p className="report-title">
                                {typeof paymentData.amt != ""
                                  ? `$${priceFormate(
                                      Number(paymentData.amt).toFixed(2)
                                    )}`
                                  : "N/A"}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <Grid container sx={{ padding: 2.5 }}>
                      <Grid item xs={12}>
                        <p>No. Data found.</p>
                      </Grid>
                    </Grid>
                  )}
                </TableBody>
              </StyledTable>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentMethodList;
