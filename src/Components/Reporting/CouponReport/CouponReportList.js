import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCouponReportData } from "../../../Redux/features/Reports/CouponReport/CouponReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
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

const CouponReportList = (props) => {
  const dispatch = useDispatch();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [CouponReportData, setCouponReportData] = useState([]);
  const CouponReportDataState = useSelector((state) => state.CouponReportList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      const startDateData = props.selectedDateRange.start_date;
      const endDateData = props.selectedDateRange.end_date;
      let data = {
        merchant_id,
        start_date: startDateData,
        end_date: endDateData,
        ...userTypeData,
      };

      if (data) {
        dispatch(fetchCouponReportData(data));
      }
    }
  }, [props, dispatch]);

  useEffect(() => {
    if (
      !CouponReportDataState.loading &&
      CouponReportDataState.CouponReportData
    ) {
      setCouponReportData(CouponReportDataState.CouponReportData);
    } else {
      setCouponReportData([]);
    }
  }, [CouponReportDataState.loading, CouponReportDataState.CouponReportData]);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Coupon Type</StyledTableCell>
                <StyledTableCell>Total Coupon Used</StyledTableCell>
              </TableHead>
              <TableBody>
                {CouponReportData.length > 0 &&
                  CouponReportData.map((couponData, index) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <p className="report-title">{couponData.date}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="report-title">
                          {couponData.coupon_type === "Discount"
                            ? "Direct Discount By App"
                            : couponData.coupon_type}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="report-title">
                          {couponData.total_coupons_used}
                        </p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                {!CouponReportData.length > 0 && (
                  <div className="box">
                    <div className="q-category-bottom-categories-single-category">
                      <p>No data found</p>
                    </div>
                  </div>
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-title">Date</p>
          <p className="report-title">Coupon Type</p>
          <p className="report-title">Total Coupon Used</p>
   
        </div>
        {CouponReportData.length > 0 ? (
          CouponReportData.map((couponData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{couponData.date}</p>
                <p className="report-title">
                  {couponData.coupon_type === "Discount"
                    ? "Direct Discount By App"
                    : couponData.coupon_type}
                </p>
                <p className="report-title">{couponData.total_coupons_used}</p>
     
              </div>
            </div>
          ))
        ) : (
          <div className="q-category-bottom-categories-listing">
            <div className="q-category-bottom-categories-single-category">
              <p className="report-title">No data found</p>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default CouponReportList;
